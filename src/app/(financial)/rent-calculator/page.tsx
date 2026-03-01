'use client';

import { useState, useEffect } from 'react';

export default function RentCalculator() {
    const [monthlyIncome, setMonthlyIncome] = useState('5000');
    const [monthlyDebts, setMonthlyDebts] = useState('500');

    const [result, setResult] = useState({
        recommendedRent: 0,
        maxRent: 0,
        incomeRequired30X: 0
    });

    useEffect(() => {
        calculateRent();
    }, [monthlyIncome, monthlyDebts]);

    const calculateRent = () => {
        const income = parseFloat(monthlyIncome) || 0;
        const debts = parseFloat(monthlyDebts) || 0;

        // 30% rule: standard recommended rent is 30% of gross income
        const recommendedRent = income * 0.30;

        // 43% DTI rule: max rent + debts should not exceed 43% of gross income
        const maxDTI = income * 0.43;
        let maxRent = maxDTI - debts;
        if (maxRent < 0) maxRent = 0;

        // 30x rule: Annual rent should be no more than 1/30th of annual income 
        // Or your annual income must be 40x your monthly rent to get approved anywhere natively
        const incomeRequired30X = recommendedRent * 40; // the 40x rule

        setResult({
            recommendedRent,
            maxRent,
            incomeRequired30X
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <h1 className="text-4xl font-extrabold mb-4 text-sky-800 border-b pb-4">Rent Calculator</h1>
            <p className="mb-8 text-gray-600 text-lg">
                Discover exactly how much rent you can afford based on the 30% rule and your debt-to-income ratio.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="bg-sky-50 p-6 rounded-xl border border-sky-100 space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Gross Monthly Income</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-600 font-bold text-lg">$</span>
                            <input
                                type="number" min="0" step="100"
                                value={monthlyIncome}
                                onChange={(e) => setMonthlyIncome(e.target.value)}
                                className="w-full rounded-xl border-gray-300 p-4 pl-10 shadow-sm focus:border-sky-500 font-bold text-2xl text-gray-800"
                            />
                        </div>
                        <p className="text-[10px] text-gray-500 mt-1 pl-1">Before taxes and deductions</p>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Total Monthly Debts</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-600 font-bold text-lg">$</span>
                            <input
                                type="number" min="0" step="50"
                                value={monthlyDebts}
                                onChange={(e) => setMonthlyDebts(e.target.value)}
                                className="w-full rounded-xl border-gray-300 p-4 pl-10 shadow-sm focus:border-sky-500 font-bold text-2xl text-gray-800"
                            />
                        </div>
                        <p className="text-[10px] text-gray-500 mt-1 pl-1">Minimum payments on student loans, CCs, car loans, etc.</p>
                    </div>
                </div>

                {/* Results Screen */}
                <div className="bg-white border-2 border-sky-100 rounded-xl overflow-hidden shadow-sm flex flex-col justify-center">
                    <div className="w-full flex flex-col h-full">
                        <div className="p-8 pb-6 text-center bg-sky-600 border-b border-sky-700 text-white">
                            <h3 className="text-sky-200 font-bold uppercase tracking-widest text-[11px] mb-2">Recommended Rent Target</h3>
                            <div className="text-5xl font-black drop-shadow-sm">
                                <span className="text-3xl text-sky-300 mr-1">$</span>{result.recommendedRent.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                            </div>
                            <div className="text-sky-200 text-sm mt-2 font-medium">per month (30% Rule)</div>
                        </div>

                        <div className="p-6 flex-grow space-y-4 bg-gray-50 flex flex-col justify-center">
                            <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-200">
                                <div>
                                    <span className="block font-bold text-gray-500 uppercase text-[10px] tracking-widest">Absolute Maximum Rent</span>
                                    <span className="text-[9px] text-gray-400">Based on 43% max DTI</span>
                                </div>
                                <span className="font-black text-2xl text-rose-600">${result.maxRent.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                            </div>
                            <div className="flex justify-between items-center bg-white p-4 rounded-xl border flex-col sm:flex-row border-gray-200">
                                <div>
                                    <span className="block font-bold text-gray-500 uppercase text-[10px] tracking-widest">Annual Income Required</span>
                                    <span className="text-[9px] text-gray-400">For landlord's 40x rule check</span>
                                </div>
                                <span className="font-bold text-xl text-sky-800 mt-2 sm:mt-0">${result.incomeRequired30X.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Rent Calculator", "operatingSystem": "All", "applicationCategory": "FinanceApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } }) }} />
        </div>
    );
}
