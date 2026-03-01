'use client';

import { useState } from 'react';

export default function AmortizationCalculator() {
    const [loanAmount, setLoanAmount] = useState('200000');
    const [loanTerm, setLoanTerm] = useState('15'); // Years
    const [interestRate, setInterestRate] = useState('5.0');

    const [schedule, setSchedule] = useState<{
        month: number;
        principal: number;
        interest: number;
        balance: number;
    }[]>([]);

    const [summary, setSummary] = useState<{
        monthlyPayment: number;
        totalInterest: number;
        totalCost: number;
    } | null>(null);

    const calculateAmortization = () => {
        const pPrincipal = parseFloat(loanAmount) || 0;
        const pTermYears = parseInt(loanTerm) || 0;
        const pTermMonths = pTermYears * 12;
        const pRateAnnual = parseFloat(interestRate) || 0;
        const pRateMonthly = pRateAnnual / 100 / 12;

        if (pPrincipal > 0 && pTermMonths > 0) {
            let monthly = 0;
            if (pRateMonthly === 0) {
                monthly = pPrincipal / pTermMonths;
            } else {
                monthly = (pPrincipal * pRateMonthly * Math.pow(1 + pRateMonthly, pTermMonths)) / (Math.pow(1 + pRateMonthly, pTermMonths) - 1);
            }

            let balance = pPrincipal;
            let totalInterest = 0;
            const newSchedule = [];

            // Prevent massive array if user enters 100 years
            const maxMonths = Math.min(pTermMonths, 1200);

            for (let i = 1; i <= maxMonths; i++) {
                const interestPayment = balance * pRateMonthly;
                const principalPayment = monthly - interestPayment;
                balance = balance - principalPayment;

                totalInterest += interestPayment;

                newSchedule.push({
                    month: i,
                    principal: principalPayment,
                    interest: interestPayment,
                    balance: Math.max(0, balance)
                });
            }

            setSummary({
                monthlyPayment: monthly,
                totalInterest: totalInterest,
                totalCost: pPrincipal + totalInterest
            });

            setSchedule(newSchedule);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <h1 className="text-4xl font-extrabold mb-4 text-gray-900 border-b pb-4">Amortization Calculator</h1>
            <p className="mb-8 text-gray-600 text-lg">
                View a detailed month-by-month breakdown of your loan payoff schedule.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                {/* Inputs */}
                <div className="lg:col-span-1 bg-gray-50 p-6 rounded-xl border border-gray-200 h-fit">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Loan Amount ($)</label>
                            <input type="number" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 border focus:border-blue-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Loan Term (Years)</label>
                            <input type="number" value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 border focus:border-blue-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Interest Rate (%)</label>
                            <input type="number" step="0.1" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 border focus:border-blue-500" />
                        </div>
                        <button onClick={calculateAmortization} className="w-full bg-blue-600 text-white font-bold py-3 mt-4 rounded-lg hover:bg-blue-700 transition">
                            Generate Schedule
                        </button>
                    </div>
                </div>

                {/* Summary */}
                {summary && (
                    <div className="lg:col-span-2 bg-blue-50 rounded-xl p-6 border border-blue-200 shadow-inner flex flex-col justify-center text-center">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <h3 className="text-gray-500 font-semibold mb-1">Monthly Payment</h3>
                                <p className="text-3xl font-black text-blue-700 border-b pb-2">${summary.monthlyPayment.toFixed(2)}</p>
                            </div>
                            <div>
                                <h3 className="text-gray-500 font-semibold mb-1">Total Interest</h3>
                                <p className="text-3xl font-black text-red-600 border-b pb-2">${summary.totalInterest.toFixed(2)}</p>
                            </div>
                            <div>
                                <h3 className="text-gray-500 font-semibold mb-1">Total Cost</h3>
                                <p className="text-3xl font-black text-blue-900 border-b pb-2">${summary.totalCost.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Schedule Table */}
            {schedule.length > 0 && (
                <div className="overflow-x-auto rounded-lg border border-gray-200 max-h-[600px] overflow-y-auto">
                    <table className="min-w-full text-sm text-left text-gray-600">
                        <thead className="bg-gray-800 text-white sticky top-0 uppercase font-semibold">
                            <tr>
                                <th className="px-6 py-4">Month</th>
                                <th className="px-6 py-4">Principal ($)</th>
                                <th className="px-6 py-4">Interest ($)</th>
                                <th className="px-6 py-4">Total Payment ($)</th>
                                <th className="px-6 py-4">Remaining Balance ($)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 bg-white">
                            {schedule.map((row) => (
                                <tr key={row.month} className="hover:bg-gray-50">
                                    <td className="px-6 py-3 font-bold">{row.month}</td>
                                    <td className="px-6 py-3 text-green-700 font-medium">{row.principal.toFixed(2)}</td>
                                    <td className="px-6 py-3 text-red-600 font-medium">{row.interest.toFixed(2)}</td>
                                    <td className="px-6 py-3 text-gray-900 font-bold">{(row.principal + row.interest).toFixed(2)}</td>
                                    <td className="px-6 py-3 text-blue-900 font-bold">{row.balance.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Amortization Calculator", "operatingSystem": "All", "applicationCategory": "FinanceApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } }) }} />
        </div>
    );
}
