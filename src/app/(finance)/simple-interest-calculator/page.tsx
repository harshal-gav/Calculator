'use client';

import { useState } from 'react';

export default function SimpleInterestCalculator() {
    // I = P * r * t
    const [principal, setPrincipal] = useState('10000');
    const [rate, setRate] = useState('5');
    const [time, setTime] = useState('5');
    const [timeUnit, setTimeUnit] = useState('years'); // years, months, days

    const [result, setResult] = useState<{
        interest: number;
        total: number;
    } | null>(null);

    const calculate = () => {
        const p = parseFloat(principal);
        const r = parseFloat(rate) / 100;
        let t = parseFloat(time);

        if (isNaN(p) || isNaN(r) || isNaN(t) || p < 0 || t < 0) {
            setResult(null);
            return;
        }

        // Convert time to years
        if (timeUnit === 'months') {
            t = t / 12;
        } else if (timeUnit === 'days') {
            t = t / 365; // standard 365 day year assumption
        }

        const interest = p * r * t;
        const total = p + interest;

        setResult({
            interest,
            total
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-emerald-900 flex items-center justify-center font-serif">
                    <span className="mr-3">💵</span> Simple Interest Calculator
                </h1>
                <p className="text-emerald-700 text-lg max-w-2xl mx-auto">
                    Calculate total interest accrued on a loan or investment using the standard I = Prt formula.
                </p>
            </div>

            <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-zinc-200 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-end">

                    <div>
                        <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">Principal Amount (P)</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-zinc-400">$</span>
                            <input
                                type="number" step="any" min="0"
                                value={principal}
                                onChange={(e) => setPrincipal(e.target.value)}
                                className="w-full rounded-xl border-zinc-300 shadow-sm p-4 pl-8 border focus:border-emerald-500 font-bold bg-zinc-50 text-xl"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">Annual Interest Rate (r)</label>
                        <div className="relative">
                            <input
                                type="number" step="any"
                                value={rate}
                                onChange={(e) => setRate(e.target.value)}
                                className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-emerald-500 font-bold bg-zinc-50 text-xl"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-zinc-400">%</span>
                        </div>
                    </div>

                    <div className="flex gap-2 lg:col-span-1 md:col-span-2">
                        <div className="flex-1">
                            <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">Time (t)</label>
                            <input
                                type="number" step="any" min="0"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-emerald-500 font-bold bg-zinc-50 text-xl"
                                onKeyDown={(e) => e.key === 'Enter' && calculate()}
                            />
                        </div>
                        <div className="w-32 flex flex-col justify-end">
                            <select
                                value={timeUnit}
                                onChange={(e) => setTimeUnit(e.target.value)}
                                className="rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-emerald-500 font-bold bg-white"
                            >
                                <option value="years">Years</option>
                                <option value="months">Months</option>
                                <option value="days">Days</option>
                            </select>
                        </div>
                    </div>

                </div>

                <div className="mt-8">
                    <button
                        onClick={calculate}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-emerald-600/30 uppercase tracking-widest text-lg"
                    >
                        Calculate Interest
                    </button>
                </div>
            </div>

            {result && (
                <div className="bg-emerald-950 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center text-center">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

                    <h2 className="text-emerald-400 font-bold uppercase tracking-widest text-xs mb-6 z-10">Calculated Results</h2>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full z-10 max-w-3xl">

                        <div className="bg-emerald-900/60 p-6 rounded-xl border border-emerald-500/30 flex flex-col items-center flex-1 w-full shadow-inner">
                            <span className="text-emerald-400 text-xs font-bold uppercase tracking-wide mb-2">Total Interest (I)</span>
                            <div className="flex items-baseline text-white">
                                <span className="text-2xl mr-1 font-bold text-emerald-400">$</span>
                                <span className="text-4xl md:text-5xl font-black font-mono">{result.interest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            </div>
                        </div>

                        <div className="text-emerald-500 text-4xl hidden md:block">+</div>
                        <div className="text-emerald-500 text-4xl md:hidden">+</div>

                        <div className="bg-black/30 p-6 rounded-xl border border-white/10 flex flex-col items-center flex-1 w-full relative">
                            <span className="text-zinc-400 text-xs font-bold uppercase tracking-wide mb-2">Original Principal</span>
                            <div className="flex items-baseline text-zinc-300">
                                <span className="text-xl mr-1 font-bold text-zinc-500">$</span>
                                <span className="text-3xl font-bold font-mono">{parseFloat(principal).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            </div>
                        </div>

                    </div>

                    <div className="mt-8 pt-8 border-t border-emerald-800/50 w-full z-10">
                        <span className="text-white/60 text-xs font-bold uppercase tracking-wide mb-2 block">Total Amount (A)</span>
                        <div className="flex justify-center items-baseline text-white">
                            <span className="text-3xl mr-2 font-bold text-emerald-400">$</span>
                            <span className="text-6xl font-black font-mono tracking-tight">{result.total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </div>
                    </div>
                </div>
            )}

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Simple Interest Calculator", "operatingSystem": "All", "applicationCategory": "FinancialApplication" }) }} />
        </div>
    );
}
