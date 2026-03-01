'use client';

import { useState } from 'react';

export default function AutoLoanCalculator() {
    const [autoPrice, setAutoPrice] = useState('25000');
    const [loanTerm, setLoanTerm] = useState('60');
    const [interestRate, setInterestRate] = useState('4.5');
    const [downPayment, setDownPayment] = useState('5000');
    const [tradeInValue, setTradeInValue] = useState('0');
    const [salesTax, setSalesTax] = useState('7.0');

    const [result, setResult] = useState<{
        monthlyPayment: number;
        totalLoanAmount: number;
        salesTaxAmount: number;
        totalInterestPaid: number;
        totalCost: number;
    } | null>(null);

    const calculateLoan = () => {
        const pPrice = parseFloat(autoPrice) || 0;
        const pTerm = parseInt(loanTerm) || 0;
        const pRate = (parseFloat(interestRate) || 0) / 100 / 12;
        const pDown = parseFloat(downPayment) || 0;
        const pTrade = parseFloat(tradeInValue) || 0;
        const pTaxRate = (parseFloat(salesTax) || 0) / 100;

        // Trade-in usually reduces the taxable amount of the car
        const taxableAmount = Math.max(0, pPrice - pTrade);
        const calcSalesTax = taxableAmount * pTaxRate;
        const totalLoanPrincipal = pPrice + calcSalesTax - pDown - pTrade;

        if (totalLoanPrincipal > 0 && pTerm > 0) {
            let monthly = 0;
            if (pRate === 0) {
                monthly = totalLoanPrincipal / pTerm;
            } else {
                monthly = (totalLoanPrincipal * pRate * Math.pow(1 + pRate, pTerm)) / (Math.pow(1 + pRate, pTerm) - 1);
            }

            const totalInt = (monthly * pTerm) - totalLoanPrincipal;
            const tCost = pPrice + calcSalesTax + totalInt;

            setResult({
                monthlyPayment: monthly,
                totalLoanAmount: totalLoanPrincipal,
                salesTaxAmount: calcSalesTax,
                totalInterestPaid: totalInt,
                totalCost: tCost
            });
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <h1 className="text-4xl font-extrabold mb-4 text-gray-900 border-b pb-4">Auto Loan Calculator</h1>
            <p className="mb-8 text-gray-600 text-lg">
                Find out how much your monthly car payment will be and the total interest paid over the life of the loan.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Input Form */}
                <div className="lg:col-span-7 bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Auto Price ($)</label>
                            <input type="number" value={autoPrice} onChange={(e) => setAutoPrice(e.target.value)} className="w-full rounded-lg border-gray-300 shadow-sm p-3 border focus:border-blue-500 focus:ring-blue-500 font-medium" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Loan Term (Months)</label>
                            <select value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} className="w-full rounded-lg border-gray-300 shadow-sm p-3 border focus:border-blue-500 focus:ring-blue-500 font-medium">
                                <option value="12">12 Months (1 Year)</option>
                                <option value="24">24 Months (2 Years)</option>
                                <option value="36">36 Months (3 Years)</option>
                                <option value="48">48 Months (4 Years)</option>
                                <option value="60">60 Months (5 Years)</option>
                                <option value="72">72 Months (6 Years)</option>
                                <option value="84">84 Months (7 Years)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Interest Rate (%)</label>
                            <input type="number" step="0.1" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="w-full rounded-lg border-gray-300 shadow-sm p-3 border focus:border-blue-500 focus:ring-blue-500 font-medium" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Down Payment ($)</label>
                            <input type="number" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} className="w-full rounded-lg border-gray-300 shadow-sm p-3 border focus:border-blue-500 focus:ring-blue-500 font-medium" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Trade-in Value ($)</label>
                            <input type="number" value={tradeInValue} onChange={(e) => setTradeInValue(e.target.value)} className="w-full rounded-lg border-gray-300 shadow-sm p-3 border focus:border-blue-500 focus:ring-blue-500 font-medium" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Sales Tax (%)</label>
                            <input type="number" step="0.1" value={salesTax} onChange={(e) => setSalesTax(e.target.value)} className="w-full rounded-lg border-gray-300 shadow-sm p-3 border focus:border-blue-500 focus:ring-blue-500 font-medium" />
                        </div>
                    </div>

                    <button onClick={calculateLoan} className="mt-8 w-full bg-blue-600 text-white font-bold py-4 px-4 rounded-xl hover:bg-blue-700 transition shadow-lg text-lg uppercase tracking-wide">
                        Calculate Auto Loan
                    </button>
                </div>

                {/* Results Screen */}
                <div className="lg:col-span-5 bg-blue-50 rounded-xl p-8 border border-blue-200 shadow-inner flex flex-col justify-center">
                    {result !== null ? (
                        <div>
                            <h2 className="text-xl font-bold text-blue-900 mb-2 text-center">Monthly Payment</h2>
                            <div className="text-4xl sm:text-5xl font-black text-center text-blue-700 mb-8 pb-8 border-b border-blue-200">
                                ${result.monthlyPayment.toFixed(2)}
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-lg">
                                    <span className="text-gray-600">Total Loan Amount</span>
                                    <span className="font-bold text-gray-800">${result.totalLoanAmount.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center text-lg">
                                    <span className="text-gray-600">Sales Tax (Upfront)</span>
                                    <span className="font-bold text-gray-800">${result.salesTaxAmount.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center text-lg">
                                    <span className="text-gray-600">Total Interest Paid</span>
                                    <span className="font-bold text-red-600">${result.totalInterestPaid.toFixed(2)}</span>
                                </div>
                                <div className="mt-4 pt-4 border-t border-blue-200 flex justify-between items-center text-xl font-bold">
                                    <span className="text-gray-800">Total Cost of Vehicle</span>
                                    <span className="text-blue-900">${result.totalCost.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center text-blue-800 opacity-60 font-medium">
                            Complete the form and click calculate to see your detailed breakdown here.
                        </div>
                    )}
                </div>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Auto Loan Calculator", "operatingSystem": "All", "applicationCategory": "FinanceApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } }) }} />
        </div>
    );
}
