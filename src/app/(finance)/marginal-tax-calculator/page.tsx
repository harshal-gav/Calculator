'use client';

import { useState } from 'react';

// Example 2024 Single Filer Brackets for demonstration
const brackets = [
    { upTo: 11600, rate: 0.10 },
    { upTo: 47150, rate: 0.12 },
    { upTo: 100525, rate: 0.22 },
    { upTo: 191950, rate: 0.24 },
    { upTo: 243725, rate: 0.32 },
    { upTo: 609350, rate: 0.35 },
    { upTo: Infinity, rate: 0.37 }
];

export default function MarginalTaxRateCalculator() {
    const [income, setIncome] = useState('85000');

    const [result, setResult] = useState<{
        totalTax: number;
        effectiveRate: number;
        marginalRate: number;
        takeHomePay: number;
        breakdown: { rate: number; taxedAmount: number; tax: number; maxBracket: boolean }[];
    } | null>(null);

    const calculate = () => {
        const taxableIncome = parseFloat(income);

        if (isNaN(taxableIncome) || taxableIncome < 0) {
            setResult(null);
            return;
        }

        let remainingIncome = taxableIncome;
        let totalTax = 0;
        let previousLimit = 0;
        let marginalRate = 0;
        const breakdown = [];

        for (const bracket of brackets) {
            const bracketSize = bracket.upTo - previousLimit;
            const taxedAmount = Math.min(bracketSize, remainingIncome);

            if (taxedAmount > 0) {
                const taxForBracket = taxedAmount * bracket.rate;
                totalTax += taxForBracket;
                marginalRate = bracket.rate;
                remainingIncome -= taxedAmount;

                breakdown.push({
                    rate: bracket.rate,
                    taxedAmount,
                    tax: taxForBracket,
                    maxBracket: remainingIncome > 0 // False when it's the last bracket they hit
                });
            }

            previousLimit = bracket.upTo;

            if (remainingIncome <= 0) {
                // Mark the last populated bracket
                if (breakdown.length > 0) {
                    breakdown[breakdown.length - 1].maxBracket = true;
                }
                break;
            }
        }

        setResult({
            totalTax,
            effectiveRate: taxableIncome > 0 ? (totalTax / taxableIncome) * 100 : 0,
            marginalRate: marginalRate * 100,
            takeHomePay: taxableIncome - totalTax,
            breakdown
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-emerald-900 flex items-center justify-center font-serif">
                    <span className="mr-3">🏛️</span> Marginal Tax Calculator
                </h1>
                <p className="text-emerald-700 text-lg max-w-2xl mx-auto">
                    Understand how your taxable income is taxed across brackets (Example based on 2024 US limits). Calculate your True Effective Tax Rate vs your Marginal Tax Rate.
                </p>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-zinc-200 mb-8 max-w-2xl mx-auto">
                <div className="mb-6">
                    <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">Enter Taxable Income</label>
                    <div className="relative">
                        <span className="absolute left-4 top-4 text-zinc-400 font-bold text-xl">$</span>
                        <input
                            type="number" step="any" min="0" value={income} onChange={(e) => setIncome(e.target.value)}
                            className="w-full rounded-xl border-zinc-300 shadow-sm p-4 pl-10 border focus:border-emerald-500 font-bold font-mono text-2xl transition-all outline-none"
                            onKeyDown={(e) => e.key === 'Enter' && calculate()}
                        />
                    </div>
                </div>

                <button
                    onClick={calculate}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-emerald-600/30 uppercase tracking-widest text-lg"
                >
                    Calculate Tax Brackets
                </button>
            </div>

            {result !== null && (
                <div className="bg-emerald-950 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

                    <h2 className="text-emerald-300 font-bold uppercase tracking-widest text-xs mb-8 z-10 text-center">Tax Breakdown</h2>

                    <div className="w-full max-w-3xl z-10 grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                        <div className="bg-black/40 border border-emerald-500/30 p-6 rounded-2xl shadow-inner text-center">
                            <span className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-2 block">Top Marginal Rate</span>
                            <div className="font-mono font-black text-4xl text-white break-all tracking-tight drop-shadow-lg">
                                {result.marginalRate.toFixed(1)}%
                            </div>
                            <span className="text-white/40 text-[10px] mt-2 block">Tax on your last dollar</span>
                        </div>

                        <div className="bg-black/40 border border-emerald-500/30 p-6 rounded-2xl shadow-inner text-center">
                            <span className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-2 block">Effective Rate</span>
                            <div className="font-mono font-black text-4xl text-white break-all tracking-tight drop-shadow-lg">
                                {result.effectiveRate.toFixed(2)}%
                            </div>
                            <span className="text-white/40 text-[10px] mt-2 block">True percentage paid</span>
                        </div>

                        <div className="bg-white/10 border border-emerald-500/50 p-6 rounded-2xl shadow-inner text-center">
                            <span className="text-emerald-200 text-[10px] font-bold uppercase tracking-widest mb-2 block">Total Tax Owed</span>
                            <div className="font-mono font-black text-3xl md:text-3xl text-emerald-300 break-all tracking-tight drop-shadow-lg">
                                ${result.totalTax.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                            </div>
                            <span className="text-emerald-200/60 text-[10px] mt-2 block w-full whitespace-nowrap overflow-hidden text-ellipsis">Take Home: ${result.takeHomePay.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                        </div>
                    </div>

                    <div className="w-full max-w-2xl z-10">
                        <span className="text-emerald-500 text-xs font-bold uppercase tracking-widest mb-4 block text-center border-b border-emerald-900 pb-2">How your income is chunked</span>

                        <div className="space-y-3">
                            {result.breakdown.map((b, i) => (
                                <div key={i} className={`flex justify-between items-center p-4 rounded-xl border ${b.maxBracket ? 'bg-emerald-900/40 border-emerald-400' : 'bg-black/20 border-white/5'} transition-all`}>
                                    <div className="flex flex-col">
                                        <span className={`font-mono font-bold text-lg ${b.maxBracket ? 'text-emerald-300' : 'text-emerald-100'}`}>
                                            {(b.rate * 100).toFixed(1)}% Bracket
                                        </span>
                                        <span className="text-emerald-500/50 text-[10px] uppercase font-bold tracking-wider">
                                            Taxed: ${b.taxedAmount.toLocaleString('en-US')}
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <span className="block font-mono font-bold text-emerald-100">+ ${b.tax.toLocaleString('en-US', { maximumFractionDigits: 2 })}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Marginal Tax Calculator", "operatingSystem": "All", "applicationCategory": "FinancialApplication" }) }} />
        </div>
    );
}
