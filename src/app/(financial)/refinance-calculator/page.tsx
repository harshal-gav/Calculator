'use client';

import { useState, useEffect } from 'react';

export default function RefinanceCalculator() {
    const [currentLoan, setCurrentLoan] = useState('200000');
    const [currentRate, setCurrentRate] = useState('6.5');
    const [currentMonthsRemaining, setCurrentMonthsRemaining] = useState('240');

    const [newRate, setNewRate] = useState('4.5');
    const [newTermMonths, setNewTermMonths] = useState('240'); // 20 years
    const [closingCosts, setClosingCosts] = useState('3000');

    const [result, setResult] = useState({
        currentPayment: 0,
        newPayment: 0,
        monthlySavings: 0,
        totalSavings: 0,
        breakEvenMonths: 0,
        shouldRefinance: false
    });

    useEffect(() => {
        calculateRefi();
    }, [currentLoan, currentRate, currentMonthsRemaining, newRate, newTermMonths, closingCosts]);

    const PMT = (rateParams: number, nper: number, pv: number) => {
        if (rateParams === 0) return pv / nper;
        return (pv * rateParams * Math.pow(1 + rateParams, nper)) / (Math.pow(1 + rateParams, nper) - 1);
    };

    const calculateRefi = () => {
        const principal = parseFloat(currentLoan) || 0;
        const curRate = (parseFloat(currentRate) || 0) / 100 / 12;
        const curMonths = parseInt(currentMonthsRemaining) || 1;

        const nRate = (parseFloat(newRate) || 0) / 100 / 12;
        const nMonths = parseInt(newTermMonths) || 1;
        const fees = parseFloat(closingCosts) || 0;

        const currentPayment = PMT(curRate, curMonths, principal);
        const newPayment = PMT(nRate, nMonths, principal + fees); // Usually fees are rolled into the loan

        const monthlySavings = currentPayment - newPayment;

        // Total cost of remaining current loan
        const totalCurrentCost = currentPayment * curMonths;
        // Total cost of new loan
        const totalNewCost = newPayment * nMonths;

        // Note: the true total savings accounts for the fees if rolled in. 
        // Here we just compare the total cash outlay over the life of both plans.
        const totalSavings = totalCurrentCost - totalNewCost;

        // Break even is Fees / Monthly Savings (assuming you pay fees upfront. If rolled in, you'll still use this as a proxy for timeline payoff)
        const breakEvenMonths = monthlySavings > 0 ? fees / monthlySavings : 0;

        setResult({
            currentPayment,
            newPayment,
            monthlySavings,
            totalSavings,
            breakEvenMonths,
            shouldRefinance: totalSavings > 0 && breakEvenMonths < nMonths
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <h1 className="text-4xl font-extrabold mb-4 text-emerald-800 border-b pb-4">Refinance Calculator</h1>
            <p className="mb-8 text-gray-600 text-lg">
                Determine if refinancing your mortgage or loan makes financial sense by analyzing your breakeven timeline and total savings.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100 space-y-6">
                    <h3 className="font-bold text-gray-800 border-b border-gray-300 pb-2">Current Loan</h3>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1">Remaining Balance</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-600 font-bold">$</span>
                                <input type="number" value={currentLoan} onChange={(e) => setCurrentLoan(e.target.value)} className="w-full rounded-md border-gray-300 p-2 pl-7 shadow-sm focus:border-emerald-500 font-bold" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1">Interest Rate</label>
                            <div className="relative">
                                <input type="number" step="0.1" value={currentRate} onChange={(e) => setCurrentRate(e.target.value)} className="w-full rounded-md border-gray-300 p-2 pr-7 shadow-sm focus:border-emerald-500 font-bold" />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">%</span>
                            </div>
                        </div>
                        <div>
                            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1">Months Left</label>
                            <input type="number" value={currentMonthsRemaining} onChange={(e) => setCurrentMonthsRemaining(e.target.value)} className="w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-emerald-500 font-bold" />
                        </div>
                    </div>

                    <h3 className="font-bold text-gray-800 border-b border-gray-300 pb-2 pt-2">Proposed New Loan</h3>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1">Closing Costs / Fees</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-600 font-bold">$</span>
                                <input type="number" value={closingCosts} onChange={(e) => setClosingCosts(e.target.value)} className="w-full rounded-md border-gray-300 p-2 pl-7 shadow-sm focus:border-emerald-500 font-bold" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1">New Rate</label>
                            <div className="relative">
                                <input type="number" step="0.1" value={newRate} onChange={(e) => setNewRate(e.target.value)} className="w-full rounded-md border-gray-300 p-2 pr-7 shadow-sm focus:border-emerald-500 font-bold" />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">%</span>
                            </div>
                        </div>
                        <div>
                            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1">New Term (Mos)</label>
                            <input type="number" value={newTermMonths} onChange={(e) => setNewTermMonths(e.target.value)} className="w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-emerald-500 font-bold" />
                        </div>
                    </div>
                </div>

                {/* Results Screen */}
                <div className="bg-white border-2 border-emerald-100 rounded-xl overflow-hidden shadow-sm flex flex-col justify-center">
                    <div className="w-full flex flex-col h-full">

                        {result.monthlySavings > 0 ? (
                            <div className="p-6 pb-6 text-center bg-emerald-600 border-b border-emerald-700 text-white shadow-inner">
                                <h3 className="text-emerald-200 font-bold uppercase tracking-widest text-[11px] mb-1">Monthly Payment Savings</h3>
                                <div className="text-5xl font-black drop-shadow-md">
                                    +${result.monthlySavings.toFixed(2)}
                                </div>
                                <div className="text-emerald-200 text-sm mt-2 font-medium">New Payment: ${result.newPayment.toFixed(2)}/mo</div>
                            </div>
                        ) : (
                            <div className="p-6 pb-6 text-center bg-red-600 border-b border-red-700 text-white shadow-inner">
                                <h3 className="text-red-200 font-bold uppercase tracking-widest text-[11px] mb-1">Monthly Payment Increase</h3>
                                <div className="text-5xl font-black drop-shadow-md">
                                    -${Math.abs(result.monthlySavings).toFixed(2)}
                                </div>
                                <div className="text-red-200 text-sm mt-2 font-medium">New Payment: ${result.newPayment.toFixed(2)}/mo</div>
                            </div>
                        )}

                        <div className="p-6 flex-grow space-y-4 bg-gray-50 flex flex-col justify-center">
                            <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-200">
                                <span className="font-bold text-gray-500 uppercase text-[10px] tracking-widest">Total Lifetime Savings</span>
                                <span className={`font-black text-2xl ${result.totalSavings > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                                    {result.totalSavings > 0 ? '+' : '-'}${Math.abs(result.totalSavings).toLocaleString('en-US', { maximumFractionDigits: 0 })}
                                </span>
                            </div>

                            {result.monthlySavings > 0 && result.breakEvenMonths > 0 && (
                                <div className="flex justify-between items-center bg-gradient-to-r from-emerald-50 to-white p-4 rounded-xl border border-emerald-200">
                                    <div>
                                        <span className="block font-bold text-gray-500 uppercase text-[10px] tracking-widest">Break-Even Timeline</span>
                                        <span className="text-[9px] text-gray-400 font-medium">Time to recoup closing costs</span>
                                    </div>
                                    <span className="font-bold text-lg text-emerald-800">
                                        {Math.ceil(result.breakEvenMonths)} months
                                    </span>
                                </div>
                            )}

                            {result.shouldRefinance ? (
                                <div className="text-center font-bold text-emerald-700 bg-emerald-100 p-3 rounded-lg mt-2">
                                    ✅ Refinancing is a mathematically sound move.
                                </div>
                            ) : (
                                <div className="text-center font-bold text-red-700 bg-red-100 p-3 rounded-lg mt-2">
                                    ❌ Refinancing does not save you money.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Refinance Calculator", "operatingSystem": "All", "applicationCategory": "FinanceApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } }) }} />
        </div>
    );
}
