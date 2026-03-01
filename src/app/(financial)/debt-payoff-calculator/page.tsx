'use client';

import { useState, useEffect } from 'react';

export default function DebtPayoffCalculator() {
    const [balance, setBalance] = useState('10000');
    const [interestRate, setInterestRate] = useState('18.9');
    const [monthlyPayment, setMonthlyPayment] = useState('300');

    const [result, setResult] = useState<{
        monthsToPayoff: number;
        totalInterest: number;
        totalPaid: number;
        isValid: boolean;
        message: string;
    }>({
        monthsToPayoff: 0,
        totalInterest: 0,
        totalPaid: 0,
        isValid: true,
        message: ''
    });

    useEffect(() => {
        calculatePayoff();
    }, [balance, interestRate, monthlyPayment]);

    const calculatePayoff = () => {
        const principal = parseFloat(balance) || 0;
        const rate = parseFloat(interestRate) || 0;
        const payment = parseFloat(monthlyPayment) || 0;

        if (principal <= 0) {
            setResult({ monthsToPayoff: 0, totalInterest: 0, totalPaid: 0, isValid: true, message: '' });
            return;
        }

        const monthlyRate = rate / 100 / 12;
        const minimumInterestPayment = principal * monthlyRate;

        if (payment <= minimumInterestPayment && rate > 0) {
            setResult({
                monthsToPayoff: 0,
                totalInterest: 0,
                totalPaid: 0,
                isValid: false,
                message: "Your monthly payment doesn't even cover the interest. The debt will grow forever."
            });
            return;
        }

        let currentBalance = principal;
        let months = 0;
        let totalInterestPaid = 0;

        // Simulate amortization safely (cap at 1200 months / 100 years max loop)
        while (currentBalance > 0 && months < 1200) {
            const interestForMonth = currentBalance * monthlyRate;
            totalInterestPaid += interestForMonth;

            const principalForMonth = payment - interestForMonth;
            currentBalance -= principalForMonth;
            months++;
        }

        if (months >= 1200) {
            setResult({
                monthsToPayoff: 0,
                totalInterest: 0,
                totalPaid: 0,
                isValid: false,
                message: "This will take over 100 years to pay off. Please increase your monthly payment."
            });
            return;
        }

        setResult({
            monthsToPayoff: months,
            totalInterest: totalInterestPaid,
            totalPaid: principal + totalInterestPaid,
            isValid: true,
            message: ''
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <h1 className="text-4xl font-extrabold mb-4 text-red-800 border-b pb-4">Debt Payoff Calculator</h1>
            <p className="mb-8 text-gray-600 text-lg">
                Discover how long it will take to become debt-free and exactly how much interest you'll pay the bank.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="bg-red-50 p-6 rounded-xl border border-red-100 space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Total Debt Balance</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-red-600 font-bold text-lg">$</span>
                            <input
                                type="number" min="0" step="100"
                                value={balance}
                                onChange={(e) => setBalance(e.target.value)}
                                className="w-full rounded-xl border-gray-300 p-4 pl-10 shadow-sm focus:border-red-500 font-bold text-xl text-gray-800"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Annual Interest Rate (APR)</label>
                        <div className="relative">
                            <input
                                type="number" min="0" step="0.1"
                                value={interestRate}
                                onChange={(e) => setInterestRate(e.target.value)}
                                className="w-full rounded-xl border-gray-300 p-4 pr-10 shadow-sm focus:border-red-500 font-bold text-xl text-gray-800"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-lg">%</span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Expected Monthly Payment</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-red-600 font-bold text-lg">$</span>
                            <input
                                type="number" min="0" step="10"
                                value={monthlyPayment}
                                onChange={(e) => setMonthlyPayment(e.target.value)}
                                className="w-full rounded-xl border-gray-300 p-4 pl-10 shadow-sm focus:border-red-500 font-bold text-xl text-gray-800"
                            />
                        </div>
                    </div>
                </div>

                {/* Results Screen */}
                <div className="bg-white border-2 border-red-100 rounded-xl overflow-hidden shadow-sm flex flex-col justify-center">
                    {result.isValid ? (
                        <div className="w-full flex flex-col h-full">
                            <div className="p-8 pb-6 text-center bg-red-700 border-b border-red-800 text-white">
                                <h3 className="text-red-200 font-bold uppercase tracking-widest text-[11px] mb-2">Time Until Completely Debt Free</h3>
                                <div className="text-6xl font-black drop-shadow-sm">
                                    {Math.floor(result.monthsToPayoff / 12) > 0 && <span>{Math.floor(result.monthsToPayoff / 12)}<span className="text-2xl font-medium text-red-300 mx-1">yrs</span></span>}
                                    {result.monthsToPayoff % 12}<span className="text-2xl font-medium text-red-300 ml-1">moss</span>
                                </div>
                                <div className="text-red-200 text-sm mt-3 font-medium bg-red-800/50 inline-block px-3 py-1 rounded-full border border-red-600">{result.monthsToPayoff} total payments</div>
                            </div>

                            <div className="p-6 flex-grow space-y-4 bg-gray-50 flex flex-col justify-center">
                                <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-200">
                                    <span className="font-bold text-gray-500 uppercase text-[10px] tracking-widest">Total Interest Paid</span>
                                    <span className="font-black text-xl text-red-600">${result.totalInterest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                </div>
                                <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-200">
                                    <span className="font-bold text-gray-500 uppercase text-[10px] tracking-widest">Total Amount Paid</span>
                                    <span className="font-bold text-lg text-gray-800">${result.totalPaid.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex items-center justify-center text-center p-8 bg-black text-white rounded-xl m-4">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                <h3 className="text-xl font-bold mb-2 text-red-400">Payment Too Low</h3>
                                <p className="text-gray-300 font-medium leading-relaxed">{result.message}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Debt Payoff Calculator", "operatingSystem": "All", "applicationCategory": "FinanceApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } }) }} />
        </div>
    );
}
