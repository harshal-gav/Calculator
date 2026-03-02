'use client';

import { useState } from 'react';

export default function LeverageRatioCalculator() {
    const [totalDebt, setTotalDebt] = useState('500000');
    const [totalEquity, setTotalEquity] = useState('1000000');
    const [ebitda, setEbitda] = useState('200000');

    const [result, setResult] = useState<{
        debtToEquity: number;
        debtToEbitda: number;
        leverageMultiplier: number; // Assets / Equity = (Debt+Equity)/Equity
    } | null>(null);

    const calculate = () => {
        const debt = parseFloat(totalDebt);
        const equity = parseFloat(totalEquity);
        const earn = parseFloat(ebitda);

        if (isNaN(debt) || isNaN(equity) || isNaN(earn)) {
            setResult(null);
            return;
        }

        const devToEq = equity !== 0 ? debt / equity : 0;
        const devToEb = earn !== 0 ? debt / earn : 0;
        const assets = debt + equity; // Simplistic view: Assets = Liabilities + Equity
        const levMult = equity !== 0 ? assets / equity : 0; // Financial Leverage Ratio

        setResult({
            debtToEquity: devToEq,
            debtToEbitda: devToEb,
            leverageMultiplier: levMult
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-slate-900 flex items-center justify-center font-serif">
                    <span className="mr-3">⚖️</span> Leverage Ratio
                </h1>
                <p className="text-slate-700 text-lg max-w-2xl mx-auto">
                    Evaluate financial risk and capital structure using core corporate leverage metrics.
                </p>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-zinc-200 mb-8 max-w-2xl mx-auto">
                <div className="space-y-6 mb-8">
                    <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">Total Debt / Liabilities</label>
                        <div className="relative">
                            <span className="absolute left-4 top-4 text-zinc-400 font-bold">$</span>
                            <input
                                type="number" step="any" min="0" value={totalDebt} onChange={(e) => setTotalDebt(e.target.value)}
                                className="w-full rounded-xl border-zinc-300 shadow-sm p-4 pl-8 border focus:border-slate-500 font-bold font-mono text-xl transition-all"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">Total Equity</label>
                        <div className="relative">
                            <span className="absolute left-4 top-4 text-zinc-400 font-bold">$</span>
                            <input
                                type="number" step="any" min="0" value={totalEquity} onChange={(e) => setTotalEquity(e.target.value)}
                                className="w-full rounded-xl border-zinc-300 shadow-sm p-4 pl-8 border focus:border-slate-500 font-bold font-mono text-xl transition-all"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">Operating Earnings (EBITDA)</label>
                        <div className="relative">
                            <span className="absolute left-4 top-4 text-zinc-400 font-bold">$</span>
                            <input
                                type="number" step="any" min="0" value={ebitda} onChange={(e) => setEbitda(e.target.value)}
                                className="w-full rounded-xl border-zinc-300 shadow-sm p-4 pl-8 border focus:border-slate-500 font-bold font-mono text-xl transition-all"
                                onKeyDown={(e) => e.key === 'Enter' && calculate()}
                            />
                        </div>
                        <p className="text-xs text-zinc-400 mt-2 font-medium italic">Used to evaluate ability to pay down debt.</p>
                    </div>
                </div>

                <button
                    onClick={calculate}
                    className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-slate-800/30 uppercase tracking-widest text-lg"
                >
                    Calculate Leverage
                </button>
            </div>

            {result !== null && (
                <div className="bg-slate-900 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-slate-600 rounded-full mix-blend-screen filter blur-[80px] opacity-10 pointer-events-none"></div>

                    <h2 className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-8 z-10 text-center">Leverage Analysis</h2>

                    <div className="w-full max-w-3xl z-10 grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-black/40 border border-slate-500/30 p-8 rounded-3xl shadow-inner text-center">
                            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-3 block">Debt-to-Equity</span>
                            <div className="font-mono font-black text-4xl text-white break-all tracking-tight drop-shadow-lg">
                                {result.debtToEquity.toFixed(2)}
                            </div>
                            <span className="text-white/40 text-[10px] mt-2 block">Standard target: 1.0 - 2.0</span>
                        </div>

                        <div className="bg-black/40 border border-slate-500/30 p-8 rounded-3xl shadow-inner text-center">
                            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-3 block">Debt/EBITDA</span>
                            <div className="font-mono font-black text-4xl text-white break-all tracking-tight drop-shadow-lg">
                                {result.debtToEbitda.toFixed(2)}x
                            </div>
                            <span className="text-white/40 text-[10px] mt-2 block">Years to pay off debt</span>
                        </div>

                        <div className="bg-black/40 border border-slate-500/30 p-8 rounded-3xl shadow-inner text-center">
                            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-3 block">Financial Leverage</span>
                            <div className="font-mono font-black text-4xl text-white break-all tracking-tight drop-shadow-lg">
                                {result.leverageMultiplier.toFixed(2)}
                            </div>
                            <span className="text-white/40 text-[10px] mt-2 block">Assets / Equity multiplier</span>
                        </div>
                    </div>
                </div>
            )}

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Leverage Ratio Calculator", "operatingSystem": "All", "applicationCategory": "FinancialApplication" }) }} />
        </div>
    );
}
