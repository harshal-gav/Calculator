'use client';

import { useState } from 'react';

export default function CAPMCalculator() {
    const [riskFree, setRiskFree] = useState('4.0');
    const [beta, setBeta] = useState('1.2');
    const [marketReturn, setMarketReturn] = useState('10.0');

    const [result, setResult] = useState<{
        expectedReturn: number;
        riskPremium: number;
    } | null>(null);

    const calculate = () => {
        const rf = parseFloat(riskFree) / 100;
        const b = parseFloat(beta);
        const rm = parseFloat(marketReturn) / 100;

        if (isNaN(rf) || isNaN(b) || isNaN(rm)) {
            setResult(null);
            return;
        }

        // CAPM Formula: Er = Rf + Beta(Rm - Rf)
        const rp = rm - rf;
        const er = rf + (b * rp);

        setResult({
            expectedReturn: er * 100,
            riskPremium: rp * 100
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-indigo-900 flex items-center justify-center font-serif">
                    <span className="mr-3">📊</span> CAPM Calculator
                </h1>
                <p className="text-indigo-700 text-lg max-w-2xl mx-auto">
                    Calculate the expected return on an asset using the Capital Asset Pricing Model.
                </p>
            </div>

            <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-zinc-200 mb-8 max-w-xl mx-auto">
                <div className="space-y-6 mb-8">
                    <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">Risk-Free Rate (Rf)</label>
                        <div className="relative">
                            <input
                                type="number" step="any" value={riskFree} onChange={(e) => setRiskFree(e.target.value)}
                                className="w-full rounded-xl border-zinc-300 shadow-sm p-4 pr-10 border focus:border-indigo-500 font-bold font-mono text-xl transition-all"
                            />
                            <span className="absolute right-4 top-4 text-zinc-400 font-bold">%</span>
                        </div>
                        <p className="text-xs text-zinc-500 mt-2 font-medium">Typically the yield on a 10-year Treasury bond.</p>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">Beta (β)</label>
                        <input
                            type="number" step="any" value={beta} onChange={(e) => setBeta(e.target.value)}
                            className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-indigo-500 font-bold font-mono text-xl transition-all"
                        />
                        <p className="text-xs text-zinc-500 mt-2 font-medium">Measure of the asset's volatility compared to the market.</p>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">Expected Market Return (Rm)</label>
                        <div className="relative">
                            <input
                                type="number" step="any" value={marketReturn} onChange={(e) => setMarketReturn(e.target.value)}
                                className="w-full rounded-xl border-zinc-300 shadow-sm p-4 pr-10 border focus:border-indigo-500 font-bold font-mono text-xl transition-all"
                                onKeyDown={(e) => e.key === 'Enter' && calculate()}
                            />
                            <span className="absolute right-4 top-4 text-zinc-400 font-bold">%</span>
                        </div>
                        <p className="text-xs text-zinc-500 mt-2 font-medium">Historical average return of the broad market (e.g., S&P 500).</p>
                    </div>
                </div>

                <button
                    onClick={calculate}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-indigo-600/30 uppercase tracking-widest text-lg"
                >
                    Calculate CAPM
                </button>
            </div>

            {result !== null && (
                <div className="bg-slate-900 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

                    <h2 className="text-indigo-400 font-bold uppercase tracking-widest text-xs mb-8 z-10 text-center">Valuation Results</h2>

                    <div className="z-10 relative mb-8 w-full max-w-sm">
                        <div className="p-8 rounded-3xl border-4 bg-indigo-900/40 border-indigo-500/30 shadow-inner flex flex-col items-center justify-center">
                            <span className="text-indigo-300 text-[10px] font-bold uppercase tracking-widest mb-3 block border-b border-indigo-500/50 pb-2 w-full text-center">Expected Return</span>
                            <div className="font-mono font-black text-5xl md:text-6xl text-white break-all tracking-tight drop-shadow-lg p-2">
                                {result.expectedReturn.toLocaleString('en-US', { maximumFractionDigits: 2 })}%
                            </div>
                        </div>
                    </div>

                    <div className="bg-black/30 p-5 rounded-xl border border-white/5 text-center flex flex-col items-center z-10 w-full max-w-sm">
                        <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-2 block">Market Risk Premium</span>
                        <div className="font-mono text-indigo-200 text-2xl font-bold">
                            {result.riskPremium.toLocaleString('en-US', { maximumFractionDigits: 2 })}%
                        </div>
                        <span className="text-white/30 text-[10px] mt-2 block">(Rm - Rf)</span>
                    </div>
                </div>
            )}

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "CAPM Calculator", "operatingSystem": "All", "applicationCategory": "FinancialApplication" }) }} />
        </div>
    );
}
