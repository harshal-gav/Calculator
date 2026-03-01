'use client';

import { useState } from 'react';

export default function APYCalculator() {
    const [rate, setRate] = useState('5.0');
    const [compoundingFreq, setCompoundingFreq] = useState('12'); // Monthly default

    const [result, setResult] = useState<{
        apy: number;
        rate: number;
    } | null>(null);

    const calculate = () => {
        const r = parseFloat(rate) / 100;
        const n = parseInt(compoundingFreq, 10);

        if (isNaN(r) || isNaN(n) || n <= 0) {
            setResult(null);
            return;
        }

        // APY = (1 + r/n)^n - 1
        let apyValue = 0;

        if (n === -1) {
            // Continuous compounding: APY = e^r - 1
            apyValue = Math.exp(r) - 1;
        } else {
            apyValue = Math.pow(1 + (r / n), n) - 1;
        }

        setResult({
            apy: apyValue * 100,
            rate: parseFloat(rate)
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-emerald-900 flex items-center justify-center font-serif">
                    <span className="mr-3">🏦</span> APY Calculator
                </h1>
                <p className="text-emerald-700 text-lg max-w-2xl mx-auto">
                    Calculate Annual Percentage Yield (APY) from quoted interest rate and compounding frequency.
                </p>
            </div>

            <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-zinc-200 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">

                    <div>
                        <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">Nominal Interest Rate</label>
                        <div className="relative">
                            <input
                                type="number" step="any" min="0"
                                value={rate}
                                onChange={(e) => setRate(e.target.value)}
                                className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-emerald-500 font-bold bg-zinc-50 text-xl"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-zinc-400">%</span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">Compounding Frequency</label>
                        <select
                            value={compoundingFreq}
                            onChange={(e) => setCompoundingFreq(e.target.value)}
                            className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-emerald-500 font-bold bg-white text-xl"
                        >
                            <option value="365">Daily (365/year)</option>
                            <option value="52">Weekly (52/year)</option>
                            <option value="12">Monthly (12/year)</option>
                            <option value="4">Quarterly (4/year)</option>
                            <option value="2">Semi-Annually (2/year)</option>
                            <option value="1">Annually (1/year)</option>
                            <option value="-1">Continuously</option>
                        </select>
                    </div>

                </div>

                <div className="mt-8">
                    <button
                        onClick={calculate}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-emerald-600/30 uppercase tracking-widest text-lg"
                    >
                        Calculate APY
                    </button>
                </div>
            </div>

            {result && (
                <div className="bg-emerald-950 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center text-center">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

                    <h2 className="text-emerald-400 font-bold uppercase tracking-widest text-xs mb-2 z-10">Real Returns</h2>
                    <p className="text-emerald-200/60 text-sm z-10 mb-6">Annual Percentage Yield (APY)</p>

                    <div className="flex items-baseline bg-emerald-900/60 px-8 py-6 rounded-2xl border border-emerald-500/30 z-10 shadow-inner mb-6">
                        <span className="text-5xl md:text-6xl font-black font-mono tracking-tight text-white">
                            {result.apy.toFixed(3)}
                        </span>
                        <span className="text-3xl font-bold text-emerald-400 ml-2">%</span>
                    </div>

                    <div className="bg-black/30 p-4 rounded-xl border border-white/10 flex flex-col items-center w-full max-w-sm z-10">
                        <span className="text-zinc-400 text-xs font-bold uppercase tracking-wide mb-1">Difference from Nominal</span>
                        <span className="font-mono text-emerald-100 font-bold text-xl">+{Math.max(0, result.apy - result.rate).toFixed(3)}%</span>
                    </div>
                </div>
            )}

            <div className="mt-8 bg-zinc-100 p-6 rounded-xl border border-zinc-200 text-sm text-zinc-600 max-w-2xl mx-auto space-y-2 text-center">
                <p className="font-bold text-zinc-800 uppercase tracking-widest mb-2">The APY Formula</p>
                <div className="inline-block bg-white p-4 rounded-lg shadow-sm font-mono border border-zinc-200 text-lg">
                    APY = (1 + r/n)ⁿ - 1
                </div>
                <p className="mt-4 text-xs font-mono">r = nominal rate, n = number of compounding periods per year.</p>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "APY Calculator", "operatingSystem": "All", "applicationCategory": "FinancialApplication" }) }} />
        </div>
    );
}
