'use client';

import { useState, useEffect } from 'react';

export default function BreakEvenCalculator() {
    const [fixedCosts, setFixedCosts] = useState('10000');
    const [variableCostPerUnit, setVariableCostPerUnit] = useState('10');
    const [pricePerUnit, setPricePerUnit] = useState('25');

    const [result, setResult] = useState<{
        breakEvenUnits: number;
        breakEvenRevenue: number;
        unitContributionMargin: number;
        contributionMarginRatio: number;
        isValid: boolean;
    }>({
        breakEvenUnits: 0,
        breakEvenRevenue: 0,
        unitContributionMargin: 0,
        contributionMarginRatio: 0,
        isValid: true
    });

    useEffect(() => {
        calculateBreakEven();
    }, [fixedCosts, variableCostPerUnit, pricePerUnit]);

    const calculateBreakEven = () => {
        const fc = parseFloat(fixedCosts) || 0;
        const vc = parseFloat(variableCostPerUnit) || 0;
        const price = parseFloat(pricePerUnit) || 0;

        const unitContributionMargin = price - vc;

        // If VC is >= Price, you will never break even (taking a loss per unit)
        if (unitContributionMargin <= 0 && fc > 0) {
            setResult({
                breakEvenUnits: 0,
                breakEvenRevenue: 0,
                unitContributionMargin,
                contributionMarginRatio: 0,
                isValid: false
            });
            return;
        }

        const breakEvenUnits = fc / unitContributionMargin;
        const breakEvenRevenue = breakEvenUnits * price;
        const contributionMarginRatio = (unitContributionMargin / price) * 100;

        setResult({
            breakEvenUnits,
            breakEvenRevenue,
            unitContributionMargin,
            contributionMarginRatio,
            isValid: true
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <h1 className="text-4xl font-extrabold mb-4 text-rose-800 border-b pb-4">Break Even Calculator</h1>
            <p className="mb-8 text-gray-600 text-lg">
                Determine the exact number of units you need to sell to cover your costs and start making a profit.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="bg-rose-50 p-6 rounded-xl border border-rose-100 space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Fixed Costs (Total)</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-600 font-bold text-lg">$</span>
                            <input
                                type="number" min="0" step="100"
                                value={fixedCosts}
                                onChange={(e) => setFixedCosts(e.target.value)}
                                className="w-full rounded-xl border-gray-300 p-4 pl-10 shadow-sm focus:border-rose-500 font-bold text-xl text-gray-800"
                            />
                        </div>
                        <p className="text-[10px] text-gray-500 mt-1 pl-1">e.g., Rent, salaries, insurance</p>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Variable Cost (Per Unit)</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-600 font-bold text-lg">$</span>
                            <input
                                type="number" min="0" step="0.01"
                                value={variableCostPerUnit}
                                onChange={(e) => setVariableCostPerUnit(e.target.value)}
                                className="w-full rounded-xl border-gray-300 p-4 pl-10 shadow-sm focus:border-rose-500 font-bold text-xl text-gray-800"
                            />
                        </div>
                        <p className="text-[10px] text-gray-500 mt-1 pl-1">e.g., Materials, direct labor, shipping</p>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Selling Price (Per Unit)</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-600 font-bold text-lg">$</span>
                            <input
                                type="number" min="0" step="0.01"
                                value={pricePerUnit}
                                onChange={(e) => setPricePerUnit(e.target.value)}
                                className="w-full rounded-xl border-gray-300 p-4 pl-10 shadow-sm focus:border-rose-500 font-bold text-xl text-gray-800"
                            />
                        </div>
                    </div>
                </div>

                {/* Results Screen */}
                <div className="bg-white border-2 border-rose-100 rounded-xl overflow-hidden shadow-sm flex flex-col justify-center">
                    {result.isValid ? (
                        <div className="w-full flex flex-col h-full">
                            <div className="p-8 pb-6 text-center bg-rose-700 border-b border-rose-800 text-white">
                                <h3 className="text-rose-200 font-bold uppercase tracking-widest text-[11px] mb-2">Break Even Point (Units)</h3>
                                <div className="text-6xl font-black drop-shadow-sm">
                                    {Math.ceil(result.breakEvenUnits).toLocaleString('en-US')}
                                </div>
                                <div className="text-rose-200 text-sm mt-2 font-medium">units must be sold</div>
                            </div>

                            <div className="p-6 flex-grow space-y-4 bg-gray-50 flex flex-col justify-center">
                                <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-200">
                                    <span className="font-bold text-gray-500 uppercase text-[10px] tracking-widest">Break Even Revenue</span>
                                    <span className="font-black text-xl text-gray-800">${result.breakEvenRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                </div>
                                <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-200">
                                    <span className="font-bold text-gray-500 uppercase text-[10px] tracking-widest">Unit Contribution Margin</span>
                                    <span className="font-bold text-lg text-emerald-600">${result.unitContributionMargin.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-200">
                                    <span className="font-bold text-gray-500 uppercase text-[10px] tracking-widest">Contribution Margin Ratio</span>
                                    <span className="font-bold text-lg text-blue-600">{result.contributionMarginRatio.toFixed(2)}%</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex items-center justify-center text-center p-8 bg-red-50 text-red-800 border-2 border-red-200 rounded-xl m-4">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                <h3 className="text-lg font-bold mb-2">Unprofitable Structure</h3>
                                <p className="text-sm">Your Variable Cost per Unit is greater than or equal to your Selling Price. You are losing money on every unit sold, making it impossible to cover fixed costs and break even.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Break Even Calculator", "operatingSystem": "All", "applicationCategory": "BusinessApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } }) }} />
        </div>
    );
}
