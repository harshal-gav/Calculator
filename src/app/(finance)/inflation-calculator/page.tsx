'use client';

import { useState } from 'react';

export default function InflationCalculator() {
    const [initialAmount, setInitialAmount] = useState('100');
    const [startYear, setStartYear] = useState('2000');
    const [endYear, setEndYear] = useState('2024');
    const [avgRate, setAvgRate] = useState('2.5'); // Average historical inflation rate

    const [result, setResult] = useState<{
        futureValue: number;
        totalInflationPercentage: number;
        buyingPowerLoss: number;
    } | null>(null);

    const calculate = () => {
        const principal = parseFloat(initialAmount);
        const start = parseInt(startYear, 10);
        const end = parseInt(endYear, 10);
        const rate = parseFloat(avgRate) / 100;

        if (isNaN(principal) || isNaN(start) || isNaN(end) || isNaN(rate) || start >= end) {
            setResult(null);
            return;
        }

        const years = end - start;

        // Future Value = P * (1 + r)^t
        const futureValue = principal * Math.pow(1 + rate, years);

        // Cumulative Inflation = ((Future / Principal) - 1) * 100
        const totalInflationPercentage = ((futureValue / principal) - 1) * 100;

        // If an item cost $100 in startYear, how much is $100 from endYear worth in startYear dollars?
        // It's 100 / (1 + r)^t
        const buyingPowerLoss = 100 - (100 / Math.pow(1 + rate, years)) * 100;

        setResult({
            futureValue,
            totalInflationPercentage,
            buyingPowerLoss
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-emerald-900 flex items-center justify-center font-serif">
                    <span className="mr-3">📈</span> Inflation Calculator
                </h1>
                <p className="text-emerald-700 text-lg max-w-2xl mx-auto">
                    Calculate how inflation decreases the purchasing power of money over time.
                </p>
            </div>

            <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-zinc-200 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div>
                        <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">Initial Amount</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-zinc-400">$</span>
                            <input
                                type="number" step="any" min="0"
                                value={initialAmount}
                                onChange={(e) => setInitialAmount(e.target.value)}
                                className="w-full rounded-xl border-zinc-300 shadow-sm p-4 pl-8 border focus:border-emerald-500 font-bold bg-zinc-50 text-xl"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">Average Annual Inflation Rate</label>
                        <div className="relative">
                            <input
                                type="number" step="any"
                                value={avgRate}
                                onChange={(e) => setAvgRate(e.target.value)}
                                className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-emerald-500 font-bold bg-zinc-50 text-xl"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-zinc-400">%</span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">Start Year</label>
                        <input
                            type="number" step="1"
                            value={startYear}
                            onChange={(e) => setStartYear(e.target.value)}
                            className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-emerald-500 font-bold bg-white text-xl"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">End Year</label>
                        <input
                            type="number" step="1"
                            value={endYear}
                            onChange={(e) => setEndYear(e.target.value)}
                            className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-emerald-500 font-bold bg-white text-xl"
                            onKeyDown={(e) => e.key === 'Enter' && calculate()}
                        />
                    </div>
                </div>

                <div className="mt-8">
                    <button
                        onClick={calculate}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-emerald-600/30 uppercase tracking-widest text-lg"
                    >
                        Calculate Inflation
                    </button>
                </div>
            </div>

            {result && (
                <div className="bg-emerald-950 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center text-center">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

                    <h2 className="text-emerald-400 font-bold uppercase tracking-widest text-xs mb-6 z-10">Calculated Value in {endYear}</h2>

                    <div className="flex items-baseline bg-black/30 px-8 py-6 rounded-2xl border border-white/10 z-10 shadow-inner mb-6">
                        <span className="text-3xl font-bold text-emerald-400 mr-2">$</span>
                        <span className="text-5xl md:text-6xl font-black font-mono tracking-tight text-white">
                            {result.futureValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full z-10 max-w-2xl">
                        <div className="bg-black/30 p-4 rounded-xl border border-white/10 flex flex-col items-center">
                            <span className="text-zinc-400 text-xs font-bold uppercase tracking-wide mb-1">Cumulative Inflation</span>
                            <span className="font-mono text-emerald-100 font-bold text-2xl">+{result.totalInflationPercentage.toFixed(2)}%</span>
                        </div>
                        <div className="bg-rose-900/40 p-4 rounded-xl border border-rose-500/20 flex flex-col items-center">
                            <span className="text-rose-300 text-xs font-bold uppercase tracking-wide mb-1">Lost Purchasing Power</span>
                            <span className="font-mono text-rose-100 font-bold text-2xl">-{result.buyingPowerLoss.toFixed(2)}%</span>
                        </div>
                    </div>

                    <p className="mt-6 text-emerald-200/80 text-sm z-10 italic">
                        An item that cost ${initialAmount} in {startYear} would cost around ${result.futureValue.toLocaleString('en-US', { maximumFractionDigits: 2 })} in {endYear}.
                    </p>
                </div>
            )}

            <div className="mt-8 bg-zinc-100 p-6 rounded-xl border border-zinc-200 text-sm text-zinc-600 max-w-2xl mx-auto space-y-2 text-center">
                <p className="font-bold text-zinc-800 uppercase tracking-widest mb-2">How it works</p>
                <p>This calculator uses a simplified compound interest formula to project historical or future inflation based on a static average rate. Actual historical inflation varies month by month and year by year based on CPI data.</p>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Inflation Calculator", "operatingSystem": "All", "applicationCategory": "FinancialApplication" }) }} />
        </div>
    );
}
