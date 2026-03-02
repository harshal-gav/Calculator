'use client';

import { useState } from 'react';

export default function EmpiricalRuleCalculator() {
    const [mean, setMean] = useState('100');
    const [stdDev, setStdDev] = useState('15');

    const [result, setResult] = useState<{
        sd1Lower: number; sd1Upper: number;
        sd2Lower: number; sd2Upper: number;
        sd3Lower: number; sd3Upper: number;
    } | null>(null);

    const [error, setError] = useState('');

    const calculate = () => {
        setError('');

        const m = parseFloat(mean);
        const s = parseFloat(stdDev);

        if (isNaN(m) || isNaN(s)) {
            setError('Please enter valid numbers for Mean and Standard Deviation.');
            setResult(null);
            return;
        }

        if (s < 0) {
            setError('Standard deviation cannot be negative.');
            setResult(null);
            return;
        }

        setResult({
            sd1Lower: m - s,
            sd1Upper: m + s,
            sd2Lower: m - 2 * s,
            sd2Upper: m + 2 * s,
            sd3Lower: m - 3 * s,
            sd3Upper: m + 3 * s,
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-emerald-900 flex items-center justify-center font-serif">
                    <span className="mr-3">🔔</span> Empirical Rule Calculator
                </h1>
                <p className="text-emerald-700 text-lg max-w-2xl mx-auto">
                    Calculate the 68-95-99.7 rule distribution ranges for normal datasets.
                </p>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-zinc-200 mb-8 max-w-2xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">Mean (μ)</label>
                        <input
                            type="number" step="any" value={mean} onChange={(e) => setMean(e.target.value)}
                            className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-emerald-500 font-bold font-mono text-xl transition-all outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">Standard Deviation (σ)</label>
                        <input
                            type="number" step="any" min="0" value={stdDev} onChange={(e) => setStdDev(e.target.value)}
                            className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-emerald-500 font-bold font-mono text-xl transition-all outline-none"
                            onKeyDown={(e) => e.key === 'Enter' && calculate()}
                        />
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
                    Calculate 68-95-99.7 Ranges
                </button>
            </div>

            {result !== null && (
                <div className="bg-slate-900 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

                    <h2 className="text-emerald-400 font-bold uppercase tracking-widest text-xs mb-8 z-10 text-center">Distribution Ranges</h2>

                    <div className="w-full max-w-2xl z-10 space-y-4">
                        {/* 68% */}
                        <div className="bg-black/40 border-l-4 border-emerald-400 p-5 rounded-r-2xl border-y border-r border-white/5 flex items-center justify-between">
                            <div className="flex-1">
                                <span className="text-emerald-400 font-black text-2xl drop-shadow-md">68%</span>
                                <span className="text-white/50 text-xs font-bold uppercase tracking-widest ml-3">Appx. Data Within 1σ</span>
                            </div>
                            <div className="font-mono font-bold text-white text-xl">
                                {result.sd1Lower.toLocaleString('en-US', { maximumFractionDigits: 4 })} <span className="text-white/30 mx-2">to</span> {result.sd1Upper.toLocaleString('en-US', { maximumFractionDigits: 4 })}
                            </div>
                        </div>

                        {/* 95% */}
                        <div className="bg-black/40 border-l-4 border-teal-400 p-5 rounded-r-2xl border-y border-r border-white/5 flex items-center justify-between">
                            <div className="flex-1">
                                <span className="text-teal-400 font-black text-2xl drop-shadow-md">95%</span>
                                <span className="text-white/50 text-xs font-bold uppercase tracking-widest ml-3">Appx. Data Within 2σ</span>
                            </div>
                            <div className="font-mono font-bold text-white text-xl">
                                {result.sd2Lower.toLocaleString('en-US', { maximumFractionDigits: 4 })} <span className="text-white/30 mx-2">to</span> {result.sd2Upper.toLocaleString('en-US', { maximumFractionDigits: 4 })}
                            </div>
                        </div>

                        {/* 99.7% */}
                        <div className="bg-black/40 border-l-4 border-cyan-400 p-5 rounded-r-2xl border-y border-r border-white/5 flex items-center justify-between">
                            <div className="flex-1">
                                <span className="text-cyan-400 font-black text-2xl drop-shadow-md">99.7%</span>
                                <span className="text-white/50 text-xs font-bold uppercase tracking-widest ml-3">Appx. Data Within 3σ</span>
                            </div>
                            <div className="font-mono font-bold text-white text-xl">
                                {result.sd3Lower.toLocaleString('en-US', { maximumFractionDigits: 4 })} <span className="text-white/30 mx-2">to</span> {result.sd3Upper.toLocaleString('en-US', { maximumFractionDigits: 4 })}
                            </div>
                        </div>
                    </div>

                </div>
            )}

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Empirical Rule Calculator", "operatingSystem": "All", "applicationCategory": "EducationalApplication" }) }} />
        </div>
    );
}
