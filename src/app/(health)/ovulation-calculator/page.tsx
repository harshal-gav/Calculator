'use client';

import { useState, useEffect } from 'react';

export default function OvulationCalculator() {
    const [lmpDate, setLmpDate] = useState('');
    const [cycleLength, setCycleLength] = useState('28');
    const [lutealPhase, setLutealPhase] = useState('14'); // Standard luteal phase is 14 days

    const [result, setResult] = useState<{
        fertileWindowStart: Date;
        fertileWindowEnd: Date;
        ovulationDate: Date;
        nextPeriodDate: Date;
        pregnancyTestDate: Date;
        months: any[];
    } | null>(null);

    useEffect(() => {
        const d = new Date();
        setLmpDate(d.toISOString().split('T')[0]);
    }, []);

    const calculate = () => {
        if (!lmpDate) return;

        const lmp = new Date(lmpDate);
        const cycle = parseInt(cycleLength);
        const luteal = parseInt(lutealPhase);

        if (isNaN(cycle) || isNaN(luteal)) return;

        // Ovulation is roughly (Cycle Length - Luteal Phase) days after LMP
        const daysToOvulation = cycle - luteal;

        const generateMonth = (startLmp: Date) => {
            const ovulation = new Date(startLmp);
            ovulation.setDate(startLmp.getDate() + daysToOvulation);

            const fertileStart = new Date(ovulation);
            fertileStart.setDate(ovulation.getDate() - 5);

            const fertileEnd = new Date(ovulation);
            fertileEnd.setDate(ovulation.getDate() + 1); // Egg lives 12-24 hours

            const nextPeriod = new Date(startLmp);
            nextPeriod.setDate(startLmp.getDate() + cycle);

            const testDate = new Date(nextPeriod); // Usually can test on the day of missed period

            return { fertileStart, fertileEnd, ovulation, nextPeriod, testDate };
        };

        const currentMonth = generateMonth(new Date(lmp));

        // Generate next 3 cycles
        const months = [];
        let nextLmp = new Date(lmp);
        for (let i = 0; i < 3; i++) {
            months.push(generateMonth(new Date(nextLmp)));
            nextLmp.setDate(nextLmp.getDate() + cycle);
        }

        setResult({
            fertileWindowStart: currentMonth.fertileStart,
            fertileWindowEnd: currentMonth.fertileEnd,
            ovulationDate: currentMonth.ovulation,
            nextPeriodDate: currentMonth.nextPeriod,
            pregnancyTestDate: currentMonth.testDate,
            months: months
        });
    };

    const formatDateRange = (start: Date, end: Date) => {
        const startStr = start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        const endStr = end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        return `${startStr} - ${endStr}`;
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-rose-900 flex items-center justify-center font-serif">
                    <span className="mr-3">🌺</span> Ovulation Calculator
                </h1>
                <p className="text-rose-700 text-lg max-w-2xl mx-auto">
                    Track your most fertile days. Discover your predicted ovulation date and fertile window to maximize your chances of pregnancy.
                </p>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-zinc-200 mb-8 max-w-2xl mx-auto">
                <div className="space-y-6 mb-8">

                    <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">First Day of Last Period (LMP)</label>
                        <input
                            type="date"
                            value={lmpDate}
                            onChange={(e) => setLmpDate(e.target.value)}
                            className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-rose-500 font-bold bg-zinc-50"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">Average Cycle Length</label>
                            <div className="relative">
                                <input
                                    type="number" min="20" max="45" value={cycleLength} onChange={(e) => setCycleLength(e.target.value)}
                                    className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-rose-500 font-bold bg-zinc-50"
                                />
                                <span className="absolute right-4 top-4 text-zinc-500 font-bold text-sm">Days</span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">Luteal Phase <span className="text-zinc-400 font-normal text-xs">(Usually 14)</span></label>
                            <div className="relative">
                                <input
                                    type="number" min="10" max="16" value={lutealPhase} onChange={(e) => setLutealPhase(e.target.value)}
                                    className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-rose-500 font-bold bg-zinc-50"
                                />
                                <span className="absolute right-4 top-4 text-zinc-500 font-bold text-sm">Days</span>
                            </div>
                        </div>
                    </div>

                </div>

                <div>
                    <button
                        onClick={calculate}
                        className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-rose-600/30 uppercase tracking-widest text-lg"
                    >
                        Calculate My Fertile Window
                    </button>
                </div>
            </div>

            {result !== null && (
                <div className="space-y-6">
                    <div className="bg-rose-950 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

                        <h2 className="text-rose-300 font-bold uppercase tracking-widest text-xs mb-8 z-10 text-center">Your Current Cycle</h2>

                        <div className="w-full max-w-2xl bg-black/40 p-8 rounded-2xl border border-rose-500/30 z-10 relative mb-6">
                            <span className="text-white/80 text-sm font-bold uppercase tracking-widest text-center block mb-2">Prime Fertile Window</span>
                            <div className="text-center font-bold text-3xl md:text-5xl text-white mb-6 drop-shadow-md">
                                {formatDateRange(result.fertileWindowStart, result.fertileWindowEnd)}
                            </div>

                            <div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-6 pt-6 border-t border-rose-800/50">
                                <div className="text-center">
                                    <span className="text-rose-400 text-[10px] font-bold uppercase tracking-widest mb-1 block">Expected Ovulation</span>
                                    <span className="text-rose-100 font-bold text-xl">{result.ovulationDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                                </div>
                                <div className="hidden md:block w-px h-10 bg-rose-800/50"></div>
                                <div className="text-center">
                                    <span className="text-rose-400 text-[10px] font-bold uppercase tracking-widest mb-1 block">Next Period</span>
                                    <span className="text-rose-100 font-bold text-xl">{result.nextPeriodDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                                </div>
                                <div className="hidden md:block w-px h-10 bg-rose-800/50"></div>
                                <div className="text-center">
                                    <span className="text-rose-400 text-[10px] font-bold uppercase tracking-widest mb-1 block">Pregnancy Test</span>
                                    <span className="text-rose-100 font-bold text-xl">{result.pregnancyTestDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-200">
                        <h3 className="font-bold text-zinc-800 text-lg mb-4 border-b pb-2">Upcoming Cycles</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[500px]">
                                <thead>
                                    <tr className="bg-zinc-50 border-b border-zinc-200">
                                        <th className="p-3 font-bold text-zinc-600 text-sm">Month</th>
                                        <th className="p-3 font-bold text-zinc-600 text-sm">Fertile Window</th>
                                        <th className="p-3 font-bold text-zinc-600 text-sm">Ovulation Day</th>
                                        <th className="p-3 font-bold text-zinc-600 text-sm">Next Period</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {result.months.slice(1).map((month, idx) => (
                                        <tr key={idx} className="border-b border-zinc-100 last:border-0 hover:bg-rose-50/30 transition-colors">
                                            <td className="p-3 font-bold text-zinc-800">{month.fertileStart.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</td>
                                            <td className="p-3 font-medium text-rose-600 bg-rose-50/50">{formatDateRange(month.fertileStart, month.fertileEnd)}</td>
                                            <td className="p-3 font-medium text-zinc-700">{month.ovulation.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td>
                                            <td className="p-3 font-medium text-zinc-700">{month.nextPeriod.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Ovulation Calculator", "operatingSystem": "All", "applicationCategory": "HealthApplication" }) }} />
        </div>
    );
}
