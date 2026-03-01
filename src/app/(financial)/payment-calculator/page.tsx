'use client';

import { useState } from 'react';

export default function PaymentCalculator() {
    const [loanAmount, setLoanAmount] = useState('10000');
    const [loanTerm, setLoanTerm] = useState('60'); // Months
    const [interestRate, setInterestRate] = useState('6.0');

    const [result, setResult] = useState<{
        monthlyPayment: number;
        totalInterestPaid: number;
        totalCost: number;
    } | null>(null);

    const calculatePayment = () => {
        const pPrincipal = parseFloat(loanAmount) || 0;
        const pTerm = parseInt(loanTerm) || 0;
        const pRate = (parseFloat(interestRate) || 0) / 100 / 12;

        if (pPrincipal > 0 && pTerm > 0) {
            let monthly = 0;
            if (pRate === 0) {
                monthly = pPrincipal / pTerm;
            } else {
                monthly = (pPrincipal * pRate * Math.pow(1 + pRate, pTerm)) / (Math.pow(1 + pRate, pTerm) - 1);
            }

            const totalInt = (monthly * pTerm) - pPrincipal;
            const tCost = pPrincipal + totalInt;

            setResult({
                monthlyPayment: monthly,
                totalInterestPaid: totalInt,
                totalCost: tCost
            });
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <h1 className="text-4xl font-extrabold mb-4 text-gray-900 border-b pb-4">Payment Calculator</h1>
            <p className="mb-8 text-gray-600 text-lg">
                Calculate your monthly payments for any type of fixed-term loan (personal, auto, or mortgage).
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Input Form */}
                <div className="lg:col-span-7 bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Loan Amount ($)</label>
                            <input type="number" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} className="w-full rounded-lg border-gray-300 shadow-sm p-4 border focus:border-green-500 focus:ring-green-500 font-bold text-xl" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Loan Term (Months)</label>
                            <input type="number" value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} className="w-full rounded-lg border-gray-300 shadow-sm p-3 border focus:border-green-500 focus:ring-green-500 font-medium" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Interest Rate (%)</label>
                            <input type="number" step="0.1" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="w-full rounded-lg border-gray-300 shadow-sm p-3 border focus:border-green-500 focus:ring-green-500 font-medium" />
                        </div>
                    </div>

                    <button onClick={calculatePayment} className="mt-8 w-full bg-green-600 text-white font-bold py-4 px-4 rounded-xl hover:bg-green-700 transition shadow-lg text-lg uppercase tracking-wide">
                        Calculate Monthly Payment
                    </button>
                </div>

                {/* Results Screen */}
                <div className="lg:col-span-5 bg-green-50 rounded-xl p-8 border border-green-200 shadow-inner flex flex-col justify-center">
                    {result !== null ? (
                        <div>
                            <h2 className="text-xl font-bold text-green-900 mb-2 text-center">Monthly Payment</h2>
                            <div className="text-4xl sm:text-5xl font-black text-center text-green-700 mb-8 pb-8 border-b border-green-200">
                                ${result.monthlyPayment.toFixed(2)}
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-lg">
                                    <span className="text-gray-600">Total Principal</span>
                                    <span className="font-bold text-gray-800">${parseFloat(loanAmount).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center text-lg">
                                    <span className="text-gray-600">Total Interest Paid</span>
                                    <span className="font-bold text-red-600">${result.totalInterestPaid.toFixed(2)}</span>
                                </div>
                                <div className="mt-4 pt-4 border-t border-green-200 flex justify-between items-center text-xl font-bold">
                                    <span className="text-gray-800">Total Cost of Loan</span>
                                    <span className="text-green-900">${result.totalCost.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center text-green-800 opacity-60 font-medium">
                            Complete the form and click calculate to see your detailed breakdown here.
                        </div>
                    )}
                </div>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Payment Calculator", "operatingSystem": "All", "applicationCategory": "FinanceApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } }) }} />
        </div>
    );
}
