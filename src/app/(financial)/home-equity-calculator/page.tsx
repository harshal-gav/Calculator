'use client';

import { useState, useEffect } from 'react';

export default function HomeEquityCalculator() {
    const [homeValue, setHomeValue] = useState('400000');
    const [currentMortgage, setCurrentMortgage] = useState('250000');
    const [maxLTVPercent, setMaxLTVPercent] = useState('80');

    const [result, setResult] = useState({
        totalEquity: 0,
        equityPercent: 0,
        maxBorrowingPower: 0,
        helocLimit: 0,
        isValid: true
    });

    useEffect(() => {
        calculateEquity();
    }, [homeValue, currentMortgage, maxLTVPercent]);

    const calculateEquity = () => {
        const value = parseFloat(homeValue) || 0;
        const mortgage = parseFloat(currentMortgage) || 0;
        const ltv = parseFloat(maxLTVPercent) || 80;

        const totalEquity = value - mortgage;
        const equityPercent = value > 0 ? (totalEquity / value) * 100 : 0;

        // Formally: Max Loan Amount allowed across ALL mortgages = Home Value * Max LTV
        const maxTotalLoans = value * (ltv / 100);

        // HELOC Limit / Max Borrowing Power = Max Total Loans - Current Mortgage
        let helocLimit = maxTotalLoans - mortgage;

        let isValid = true;

        if (helocLimit <= 0) {
            helocLimit = 0;
            if (value > 0) isValid = false; // "Under water" based on the LTV limit
        }

        setResult({
            totalEquity,
            equityPercent,
            maxBorrowingPower: helocLimit,
            helocLimit,
            isValid
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <h1 className="text-4xl font-extrabold mb-4 text-teal-800 border-b pb-4">Home Equity Calculator</h1>
            <p className="mb-8 text-gray-600 text-lg">
                Discover your total home equity and calculate exactly how much cash you can borrow via a HELOC or Home Equity Loan.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="bg-teal-50 p-6 rounded-xl border border-teal-100 space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Current Home Value</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-600 font-bold text-xl">$</span>
                            <input
                                type="number" min="0" step="1000"
                                value={homeValue}
                                onChange={(e) => setHomeValue(e.target.value)}
                                className="w-full rounded-xl border-gray-300 p-4 pl-10 shadow-sm focus:border-teal-500 font-bold text-2xl text-gray-800"
                            />
                        </div>
                        <p className="text-[10px] text-gray-500 mt-1 pl-1">Estimated appraisal value</p>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Remaining Mortgage Balance</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-600 font-bold text-xl">$</span>
                            <input
                                type="number" min="0" step="1000"
                                value={currentMortgage}
                                onChange={(e) => setCurrentMortgage(e.target.value)}
                                className="w-full rounded-xl border-gray-300 p-4 pl-10 shadow-sm focus:border-teal-500 font-bold text-2xl text-gray-800"
                            />
                        </div>
                        <p className="text-[10px] text-gray-500 mt-1 pl-1">Total of all current liens</p>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Max LTV Limit (%)</label>
                        <div className="flex flex-wrap gap-2 mb-3">
                            {[80, 85, 90].map(pct => (
                                <button
                                    key={pct}
                                    onClick={() => setMaxLTVPercent(pct.toString())}
                                    className={`flex-1 py-2 px-3 rounded-lg font-bold text-sm transition ${parseFloat(maxLTVPercent) === pct ? 'bg-teal-600 text-white shadow-md' : 'bg-white text-teal-700 border border-teal-200 hover:bg-teal-100'}`}
                                >
                                    {pct}% Maximum
                                </button>
                            ))}
                        </div>
                        <div className="relative">
                            <input
                                type="number" min="0" step="1"
                                value={maxLTVPercent}
                                onChange={(e) => setMaxLTVPercent(e.target.value)}
                                className="w-full rounded-lg border-gray-300 p-3 pr-10 shadow-sm focus:border-teal-500 font-bold text-gray-800"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">%</span>
                        </div>
                        <p className="text-[10px] text-gray-500 mt-1 pl-1">Banks typically lend up to 80% or 85% of home value</p>
                    </div>
                </div>

                {/* Results Screen */}
                <div className="bg-white border-2 border-teal-100 rounded-xl overflow-hidden shadow-sm flex flex-col justify-center">
                    <div className="w-full flex flex-col h-full">
                        <div className="p-8 pb-6 text-center bg-teal-700 border-b border-teal-800 text-white">
                            <h3 className="text-teal-200 font-bold uppercase tracking-widest text-[11px] mb-2">Max Borrowing Limit (HELOC/Loan)</h3>
                            <div className="text-5xl font-black drop-shadow-sm">
                                <span className="text-3xl text-teal-300 mr-1">$</span>
                                {result.helocLimit.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                            </div>
                            {!result.isValid && (
                                <div className="text-red-200 text-sm mt-3 font-medium bg-red-900/50 inline-block px-3 py-1 rounded-full border border-red-600">
                                    Insufficient equity to borrow at {maxLTVPercent}% LTV
                                </div>
                            )}
                        </div>

                        <div className="p-6 flex-grow space-y-4 bg-gray-50 flex flex-col justify-center">
                            <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-200">
                                <div>
                                    <span className="block font-bold text-gray-500 uppercase text-[10px] tracking-widest">Total Home Equity</span>
                                </div>
                                <span className="font-black text-2xl text-teal-700">
                                    ${result.totalEquity > 0 ? result.totalEquity.toLocaleString('en-US', { maximumFractionDigits: 0 }) : '0'}
                                </span>
                            </div>
                            <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-200">
                                <span className="font-bold text-gray-500 uppercase text-[10px] tracking-widest">Current Equity %</span>
                                <span className={`font-bold text-xl ${result.equityPercent < 20 ? 'text-orange-600' : 'text-teal-600'}`}>
                                    {result.equityPercent.toFixed(1)}%
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Home Equity Calculator", "operatingSystem": "All", "applicationCategory": "FinanceApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } }) }} />
        </div>
    );
}
