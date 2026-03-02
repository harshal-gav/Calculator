'use client';

import { useState } from 'react';

export default function TimeCardCalculator() {
    const [startTime, setStartTime] = useState('08:00');
    const [endTime, setEndTime] = useState('17:00');
    const [breakMinutes, setBreakMinutes] = useState('30');
    const [hourlyRate, setHourlyRate] = useState('15.00');

    const [result, setResult] = useState<{
        grossHours: number;
        netHours: number;
        grossPay: number;
    } | null>(null);

    const [error, setError] = useState('');

    const calculate = () => {
        setError('');

        if (!startTime || !endTime) {
            setError('Please enter both start and end times.');
            setResult(null);
            return;
        }

        const [startH, startM] = startTime.split(':').map(Number);
        const [endH, endM] = endTime.split(':').map(Number);
        const breaks = parseInt(breakMinutes) || 0;
        const rate = parseFloat(hourlyRate) || 0;

        let startTotalMins = startH * 60 + startM;
        let endTotalMins = endH * 60 + endM;

        // Handle overnight shifts
        if (endTotalMins < startTotalMins) {
            endTotalMins += 24 * 60;
        }

        const grossMins = endTotalMins - startTotalMins;
        const netMins = grossMins - breaks;

        if (netMins < 0) {
            setError('Break duration is longer than the shift duration.');
            setResult(null);
            return;
        }

        const grossHours = grossMins / 60;
        const netHours = netMins / 60;
        const grossPay = netHours * rate;

        setResult({
            grossHours,
            netHours,
            grossPay
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-emerald-900 flex items-center justify-center font-serif">
                    <span className="mr-3">⏱️</span> Time Card Calculator
                </h1>
                <p className="text-emerald-700 text-lg max-w-2xl mx-auto">
                    Calculate your exact work hours, deduct unpaid break time, and estimate gross pay.
                </p>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-zinc-200 mb-8 max-w-2xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">Start Time</label>
                        <input
                            type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)}
                            className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-emerald-500 font-bold font-mono text-2xl transition-all outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">End Time</label>
                        <input
                            type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)}
                            className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-emerald-500 font-bold font-mono text-2xl transition-all outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">Unpaid Break (Minutes)</label>
                        <input
                            type="number" step="1" min="0" value={breakMinutes} onChange={(e) => setBreakMinutes(e.target.value)}
                            className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-emerald-500 font-bold font-mono text-2xl transition-all outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">Hourly Rate ($)</label>
                        <div className="relative">
                            <span className="absolute left-4 top-4 text-zinc-400 font-bold text-xl">$</span>
                            <input
                                type="number" step="any" min="0" value={hourlyRate} onChange={(e) => setHourlyRate(e.target.value)}
                                className="w-full rounded-xl border-zinc-300 shadow-sm p-4 pl-10 border focus:border-emerald-500 font-bold font-mono text-2xl transition-all outline-none"
                                onKeyDown={(e) => e.key === 'Enter' && calculate()}
                            />
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl font-bold text-center text-sm">
                        {error}
                    </div>
                )}

                <button
                    onClick={calculate}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-emerald-600/30 uppercase tracking-widest text-lg"
                >
                    Calculate Timesheet
                </button>
            </div>

            {result !== null && (
                <div className="bg-slate-900 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

                    <h2 className="text-emerald-400 font-bold uppercase tracking-widest text-xs mb-8 z-10 text-center">Calculated Shift</h2>

                    <div className="w-full max-w-2xl z-10 grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {/* Hours */}
                        <div className="bg-black/40 border border-emerald-500/30 p-6 rounded-3xl shadow-inner text-center">
                            <span className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-3 block">Total Net Hours</span>
                            <div className="font-mono font-black text-5xl text-white tracking-tight drop-shadow-lg p-2">
                                {result.netHours.toFixed(2)}<span className="text-xl text-white/50 ml-1">h</span>
                            </div>
                            <div className="text-white/40 text-xs mt-2 uppercase tracking-widest">
                                Gross: {result.grossHours.toFixed(2)}h
                            </div>
                        </div>

                        {/* Pay */}
                        <div className="bg-emerald-900/40 border border-emerald-400/50 p-6 rounded-3xl shadow-inner text-center">
                            <span className="text-emerald-300 text-[10px] font-bold uppercase tracking-widest mb-3 block">Gross Pay Estimator</span>
                            <div className="font-mono font-black text-5xl text-emerald-400 tracking-tight drop-shadow-lg p-2 flex items-center justify-center">
                                <span className="text-3xl mr-1">$</span>{result.grossPay.toFixed(2)}
                            </div>
                            <div className="text-emerald-200/50 text-[10px] mt-2 uppercase tracking-widest">
                                Pre-tax estimation
                            </div>
                        </div>
                    </div>

                </div>
            )}

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Time Card Calculator", "operatingSystem": "All", "applicationCategory": "UtilitiesApplication" }) }} />
        </div>
    );
}
