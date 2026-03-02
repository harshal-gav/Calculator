'use client';

import { useState } from 'react';

export default function WACCCalculator() {
    // Equity
    const [marketEq, setMarketEq] = useState('10000000');
    const [costEq, setCostEq] = useState('10'); // %

    // Debt
    const [marketDebt, setMarketDebt] = useState('5000000');
    const [costDebt, setCostDebt] = useState('6'); // %

    // Tax
    const [corpTax, setCorpTax] = useState('21'); // %

    const [result, setResult] = useState<{
        wacc: number;
        equityWeight: number;
        debtWeight: number;
    } | null>(null);

    const calculate = () => {
        const E = parseFloat(marketEq);
        const Re = parseFloat(costEq) / 100;

        const D = parseFloat(marketDebt);
        const Rd = parseFloat(costDebt) / 100;

        const Tc = parseFloat(corpTax) / 100;

        if (isNaN(E) || isNaN(Re) || isNaN(D) || isNaN(Rd) || isNaN(Tc)) {
            setResult(null);
            return;
        }

        const V = E + D;
        if (V === 0) {
            setResult(null);
            return;
        }

        const wE = E / V;
        const wD = D / V;

        // WACC = (E/V * Re) + ((D/V * Rd) * (1 - Tc))
        const wacc = (wE * Re) + ((wD * Rd) * (1 - Tc));

        setResult({
            wacc: wacc * 100,
            equityWeight: wE * 100,
            debtWeight: wD * 100
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-emerald-900 flex items-center justify-center font-serif">
                    <span className="mr-3">⚖️</span> WACC Calculator
                </h1>
                <p className="text-emerald-700 text-lg max-w-2xl mx-auto">
                    Calculate the Weighted Average Cost of Capital to determine a firm's average cost of financing.
                </p>
            </div>

            <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-zinc-200 mb-8 max-w-3xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">

                    {/* Equity Block */}
                    <div className="p-5 rounded-xl border border-emerald-100 bg-emerald-50/50 space-y-4">
                        <div className="font-bold text-emerald-900 border-b border-emerald-200 pb-2 flex items-center">
                            Equity Financing
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-zinc-500 mb-1 uppercase tracking-wide">Market Value of Equity ($)</label>
                            <input
                                type="number" step="any" min="0" value={marketEq} onChange={(e) => setMarketEq(e.target.value)}
                                className="w-full rounded-xl border-zinc-300 shadow-sm p-3 border focus:border-emerald-500 font-bold font-mono"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-zinc-500 mb-1 uppercase tracking-wide">Cost of Equity (%)</label>
                            <input
                                type="number" step="any" min="0" value={costEq} onChange={(e) => setCostEq(e.target.value)}
                                className="w-full rounded-xl border-zinc-300 shadow-sm p-3 border focus:border-emerald-500 font-bold font-mono"
                            />
                        </div>
                    </div>

                    {/* Debt Block */}
                    <div className="p-5 rounded-xl border border-teal-100 bg-teal-50/50 space-y-4">
                        <div className="font-bold text-teal-900 border-b border-teal-200 pb-2 flex items-center">
                            Debt Financing
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-zinc-500 mb-1 uppercase tracking-wide">Market Value of Debt ($)</label>
                            <input
                                type="number" step="any" min="0" value={marketDebt} onChange={(e) => setMarketDebt(e.target.value)}
                                className="w-full rounded-xl border-zinc-300 shadow-sm p-3 border focus:border-teal-500 font-bold font-mono"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-zinc-500 mb-1 uppercase tracking-wide">Cost of Debt (%)</label>
                            <input
                                type="number" step="any" min="0" value={costDebt} onChange={(e) => setCostDebt(e.target.value)}
                                className="w-full rounded-xl border-zinc-300 shadow-sm p-3 border focus:border-teal-500 font-bold font-mono"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-zinc-500 mb-1 uppercase tracking-wide">Corporate Tax Rate (%)</label>
                            <input
                                type="number" step="any" min="0" value={corpTax} onChange={(e) => setCorpTax(e.target.value)}
                                className="w-full rounded-xl border-zinc-300 shadow-sm p-3 border focus:border-teal-500 font-bold font-mono"
                                onKeyDown={(e) => e.key === 'Enter' && calculate()}
                            />
                        </div>
                    </div>

                </div>

                <button
                    onClick={calculate}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-emerald-600/30 uppercase tracking-widest text-lg"
                >
                    Calculate WACC
                </button>
            </div>

            {result !== null && (
                <div className="bg-slate-900 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

                    <h2 className="text-white/70 font-bold uppercase tracking-widest text-xs mb-8 z-10 text-center">Cost of Capital</h2>

                    <div className="z-10 relative mb-8 w-full max-w-sm">
                        <div className="p-8 rounded-full aspect-square border-4 bg-emerald-900/60 border-emerald-400/30 shadow-inner flex flex-col items-center justify-center">
                            <span className="text-white/60 text-[10px] uppercase tracking-widest mb-2 font-bold block text-center border-b border-emerald-800 pb-2 w-3/4">WACC</span>
                            <div className="font-bold text-5xl md:text-6xl text-white text-center drop-shadow-lg leading-tight font-mono break-all pt-2">
                                {result.wacc.toLocaleString('en-US', { maximumFractionDigits: 2 })}%
                            </div>
                        </div>
                    </div>

                    <div className="w-full max-w-xl z-10 flex gap-4">
                        <div className="flex-1 bg-black/40 border border-emerald-500/20 p-5 rounded-xl text-center">
                            <span className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-2 block">Weight of Equity</span>
                            <div className="font-mono text-white text-2xl font-bold">
                                {result.equityWeight.toLocaleString('en-US', { maximumFractionDigits: 1 })}%
                            </div>
                        </div>

                        <div className="flex-1 bg-black/40 border border-teal-500/20 p-5 rounded-xl text-center">
                            <span className="text-teal-400 text-[10px] font-bold uppercase tracking-widest mb-2 block">Weight of Debt</span>
                            <div className="font-mono text-white text-2xl font-bold">
                                {result.debtWeight.toLocaleString('en-US', { maximumFractionDigits: 1 })}%
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "WACC Calculator", "operatingSystem": "All", "applicationCategory": "FinancialApplication" }) }} />
        </div>
    );
}
