'use client';

import { useState } from 'react';
import CalculatorSEO from '@/components/CalculatorSEO';

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

            <CalculatorSEO
                title="Amortization Calculator"
                whatIsIt={
                    <>
                        <p>An <strong>Amortization Calculator</strong> provides a complete, month-by-month breakdown of your loan payoff schedule. "Amortization" is the financial process of gradually writing off the initial cost of an asset over time.</p>
                        <p>When you take out an amortized loan (like a mortgage or car loan), your monthly payment remains fixed, but the <em>ratio</em> of principal to interest changes every single month. In the beginning, you pay mostly interest. Toward the end of the loan, your payments go almost entirely toward paying off the principal.</p>
                    </>
                }
                formula={
                    <>
                        <p>The mathematical generation of an amortization schedule requires iterative calculation. For a given month <em>m</em>:</p>
                        <div className="bg-white p-4 rounded-lg font-mono text-center text-xl shadow-sm my-4 overflow-x-auto space-y-2">
                            <p>Interest Payment = Outstanding Balance * Monthly Interest Rate</p>
                            <p>Principal Payment = Total Monthly Payment - Interest Payment</p>
                            <p>New Balance = Outstanding Balance - Principal Payment</p>
                        </div>
                        <ul className="list-disc pl-6 space-y-2 mt-4">
                            <li><strong>Outstanding Balance:</strong> The remaining principal from the previous month.</li>
                            <li><strong>Monthly Interest Rate:</strong> Your annual rate divided by 12.</li>
                        </ul>
                    </>
                }
                example={
                    <>
                        <p>Suppose you have a <strong>$200,000</strong> mortgage at exactly <strong>5.0%</strong> interest for <strong>15 years</strong>.</p>
                        <p>Your fixed monthly payment is calculated to be <strong>$1,581.59</strong>.</p>
                        <ul className="list-disc pl-6 space-y-2 mt-4">
                            <li><strong>Month 1:</strong> Interest is $833.33 ($200,000 * 0.05 / 12). The remaining $748.26 goes to principal. Your new balance is $199,251.74.</li>
                            <li><strong>Month 2:</strong> Interest is $830.22 ($199,251.74 * 0.05 / 12). Now, $751.37 goes to principal.</li>
                            <li><strong>Month 180 (Final):</strong> Interest is just $6.56. The remaining $1,575.03 completely wipes out the principal balance!</li>
                        </ul>
                    </>
                }
                useCases={
                    <ul className="list-disc pl-6 space-y-4">
                        <li><strong>Home Equity Tracking:</strong> Seeing exactly how much equity you will have in your home 5, 10, or 20 years from now.</li>
                        <li><strong>Extra Payments Impact:</strong> Visualizing how an extra $100 towards the principal each month dramatically shortens the amortization schedule and saves thousands in total interest.</li>
                        <li><strong>Refinance Strategy:</strong> Comparing your current position on the amortization curve vs restarting the curve with a new 30-year refinanced loan at a slightly lower rate.</li>
                    </ul>
                }
                faqs={[
                    {
                        question: "Why do I pay so much interest at the beginning?",
                        answer: "Because interest is calculated based on the outstanding principal balance. In the first year, your balance is at its highest, so the interest charge is at its peak. As you slowly pay down the principal, the interest charge naturally drops, allowing more of your fixed payment to attack the principal."
                    },
                    {
                        question: "Does paying extra principal help?",
                        answer: "Yes, immensely. Any extra money paid toward the principal strictly bypasses the interest calculation. This permanently reduces your outstanding balance, which means all future interest charges will be permanently lower."
                    },
                    {
                        question: "What is negative amortization?",
                        answer: "Negative amortization occurs when your monthly payment isn't large enough to cover the interest due. The unpaid interest is added to your principal balance, meaning your debt actually grows each month instead of shrinking."
                    }
                ]}
                relatedCalculators={[
                    { name: "Mortgage Calculator", path: "/mortgage-calculator", desc: "Calculate your monthly mortgage payments including taxes and insurance." },
                    { name: "Auto Loan Calculator", path: "/auto-loan-calculator", desc: "Calculate your exact monthly car payment including dealer fees and taxes." },
                    { name: "Payment Calculator", path: "/payment-calculator", desc: "Determine your monthly payment for any standard amortized loan." }
                ]}
            />
        </div>
    );
}
