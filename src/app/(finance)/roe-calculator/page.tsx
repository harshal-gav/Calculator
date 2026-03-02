'use client';

import { useState } from 'react';

export default function ROECalculator() {
    const [netIncome, setNetIncome] = useState('500000');
    const [shareholderEquity, setShareholderEquity] = useState('2500000');

    const [result, setResult] = useState<{
        roe: number;
        analysis: string;
    } | null>(null);

    const evaluateROE = (roe: number) => {
        if (roe < 0) return "Negative ROE: The company is operating at a net loss.";
        if (roe < 10) return "Below Average: Less efficient at generating profits from equity.";
        if (roe >= 10 && roe <= 15) return "Average: Generating decent returns, standard for many industries.";
        if (roe > 15 && roe <= 20) return "Good: Efficiently using shareholder capital to generate profits.";
        return "Excellent: Highly efficient capital management or potentially high leverage (debt).";
    };

    const calculate = () => {
        const income = parseFloat(netIncome);
        const equity = parseFloat(shareholderEquity);

        if (isNaN(income) || isNaN(equity) || equity === 0) {
            setResult(null);
            return;
        }

        const roe = (income / equity) * 100;

        setResult({
            roe,
            analysis: evaluateROE(roe)
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-emerald-900 flex items-center justify-center font-serif">
                    <span className="mr-3">📈</span> ROE Calculator
                </h1>
                <p className="text-emerald-700 text-lg max-w-2xl mx-auto">
                    Calculate Return on Equity to evaluate how efficiently a company generates profits from shareholder capital.
                </p>
            </div>

            <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-zinc-200 mb-8 max-w-xl mx-auto">
                <div className="space-y-6 mb-8">
                    <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">Net Income (Annual)</label>
                        <div className="relative">
                            <span className="absolute left-4 top-4 text-zinc-400 font-bold">$</span>
                            <input
                                type="number" step="any" value={netIncome} onChange={(e) => setNetIncome(e.target.value)}
                                className="w-full rounded-xl border-zinc-300 shadow-sm p-4 pl-8 border focus:border-emerald-500 font-bold font-mono text-xl transition-all outline-none focus:ring-4 focus:ring-emerald-100"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">Average Shareholder's Equity</label>
                        <div className="relative">
                            <span className="absolute left-4 top-4 text-zinc-400 font-bold">$</span>
                            <input
                                type="number" step="any" value={shareholderEquity} onChange={(e) => setShareholderEquity(e.target.value)}
                                className="w-full rounded-xl border-zinc-300 shadow-sm p-4 pl-8 border focus:border-emerald-500 font-bold font-mono text-xl transition-all outline-none focus:ring-4 focus:ring-emerald-100"
                                onKeyDown={(e) => e.key === 'Enter' && calculate()}
                            />
                        </div>
                    </div>
                </div>

                <button
                    onClick={calculate}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-emerald-600/30 uppercase tracking-widest text-lg"
                >
                    Calculate ROE
                </button>
            </div>

            {result !== null && (
                <div className="bg-emerald-950 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

                    <h2 className="text-emerald-300 font-bold uppercase tracking-widest text-xs mb-8 z-10 text-center">Return on Equity</h2>

                    <div className="z-10 relative mb-8 w-full max-w-sm">
                        <div className="p-8 rounded-full aspect-square border-4 bg-emerald-900/40 border-emerald-400/30 shadow-inner flex flex-col items-center justify-center">
                            <div className="font-bold text-6xl text-emerald-400 text-center drop-shadow-lg leading-tight font-mono break-all pt-2">
                                {result.roe.toLocaleString('en-US', { maximumFractionDigits: 2 })}%
                            </div>
                        </div>
                    </div>

                    <div className="w-full max-w-lg z-10 bg-black/40 border border-emerald-500/30 p-6 rounded-xl text-center">
                        <span className="text-emerald-500 text-[10px] font-bold uppercase tracking-widest mb-2 block">Performance Analysis</span>
                        <p className="text-emerald-100 font-medium">{result.analysis}</p>
                    </div>
                </div>
            )}

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "ROE Calculator", "operatingSystem": "All", "applicationCategory": "FinancialApplication" }) }} />
        </div>
    );
}
