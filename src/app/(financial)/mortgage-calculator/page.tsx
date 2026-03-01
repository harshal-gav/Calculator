'use client';

import { useState } from 'react';

export default function MortgageCalculator() {
    const [homePrice, setHomePrice] = useState('400000');
    const [downPayment, setDownPayment] = useState('80000');
    const [loanTerm, setLoanTerm] = useState('30');
    const [interestRate, setInterestRate] = useState('6.5');

    const [propertyTax, setPropertyTax] = useState('1.2'); // percentage
    const [homeInsurance, setHomeInsurance] = useState('1500'); // annual
    const [hoaFees, setHoaFees] = useState('0'); // monthly

    const [result, setResult] = useState<{
        principalInterest: number;
        taxes: number;
        insurance: number;
        hoa: number;
        total: number;
        totalInterest: number;
    } | null>(null);

    const calculateMortgage = () => {
        const p = parseFloat(homePrice) - parseFloat(downPayment);
        const r = parseFloat(interestRate) / 100 / 12;
        const n = parseFloat(loanTerm) * 12;

        if (p > 0 && n > 0) {
            const pi = (r === 0) ? (p / n) : ((p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));

            const taxes = (parseFloat(homePrice) * (parseFloat(propertyTax) / 100)) / 12;
            const insurance = parseFloat(homeInsurance) / 12;
            const hoa = parseFloat(hoaFees) || 0;

            const totalMonthly = pi + taxes + insurance + hoa;
            const totalInt = (pi * n) - p;

            setResult({
                principalInterest: pi,
                taxes: taxes || 0,
                insurance: insurance || 0,
                hoa: hoa || 0,
                total: totalMonthly,
                totalInterest: totalInt || 0
            });
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <h1 className="text-4xl font-extrabold mb-4 text-gray-900 border-b pb-4">Mortgage Calculator</h1>
            <p className="mb-4 text-gray-600 text-lg">
                Estimate your monthly payments, including taxes, insurance, and HOA fees, with our advanced mortgage calculator.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Input Form */}
                <div className="lg:col-span-7 bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <h2 className="text-xl font-bold mb-6 text-gray-800">Loan Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Home Price ($)</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 font-bold">$</span>
                                <input
                                    type="number"
                                    value={homePrice}
                                    onChange={(e) => setHomePrice(e.target.value)}
                                    className="pl-8 w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-3 border text-lg font-medium"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Down Payment ($)</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 font-bold">$</span>
                                <input
                                    type="number"
                                    value={downPayment}
                                    onChange={(e) => setDownPayment(e.target.value)}
                                    className="pl-8 w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-3 border text-lg font-medium"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Loan Term (Years)</label>
                            <select
                                value={loanTerm}
                                onChange={(e) => setLoanTerm(e.target.value)}
                                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-3 border text-lg font-medium"
                            >
                                <option value="10">10 Years</option>
                                <option value="15">15 Years</option>
                                <option value="20">20 Years</option>
                                <option value="30">30 Years</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Interest Rate (%)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    step="0.01"
                                    value={interestRate}
                                    onChange={(e) => setInterestRate(e.target.value)}
                                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-3 border text-lg font-medium"
                                />
                                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 font-bold">%</span>
                            </div>
                        </div>
                    </div>

                    <h2 className="text-xl font-bold mt-8 mb-6 text-gray-800 border-t pt-6">Optional Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Property Tax/yr</label>
                            <div className="relative">
                                <input type="number" step="0.1" value={propertyTax} onChange={(e) => setPropertyTax(e.target.value)} className="w-full rounded-lg border-gray-300 p-2 border" />
                                <span className="absolute inset-y-0 right-0 flex items-center pr-3">%</span>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Home Insur./yr ($)</label>
                            <input type="number" value={homeInsurance} onChange={(e) => setHomeInsurance(e.target.value)} className="w-full rounded-lg border-gray-300 p-2 border" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">HOA Fees/mo ($)</label>
                            <input type="number" value={hoaFees} onChange={(e) => setHoaFees(e.target.value)} className="w-full rounded-lg border-gray-300 p-2 border" />
                        </div>
                    </div>

                    <button
                        onClick={calculateMortgage}
                        className="mt-8 w-full bg-green-600 text-white font-bold py-4 px-4 rounded-xl hover:bg-green-700 transition shadow-lg text-lg uppercase tracking-wide"
                    >
                        Calculate Payment
                    </button>
                </div>

                {/* Results Sidebar */}
                <div className="lg:col-span-5 bg-green-50 rounded-xl p-8 border border-green-200 shadow-inner flex flex-col justify-center">
                    {result !== null ? (
                        <div>
                            <h2 className="text-xl font-bold text-green-900 mb-2 text-center">Monthly Payment</h2>
                            <div className="text-4xl sm:text-5xl font-black text-center text-green-700 mb-8 pb-8 border-b border-green-200">
                                ${result.total.toFixed(2)}
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-lg">
                                    <span className="flex items-center gap-2"><div className="w-3 h-3 bg-green-600 rounded-full"></div> Principal & Interest</span>
                                    <span className="font-bold text-gray-800">${result.principalInterest.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center text-lg">
                                    <span className="flex items-center gap-2"><div className="w-3 h-3 bg-purple-500 rounded-full"></div> Property Taxes</span>
                                    <span className="font-bold text-gray-800">${result.taxes.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center text-lg">
                                    <span className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-500 rounded-full"></div> Home Insurance</span>
                                    <span className="font-bold text-gray-800">${result.insurance.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center text-lg">
                                    <span className="flex items-center gap-2"><div className="w-3 h-3 bg-yellow-500 rounded-full"></div> HOA Fees</span>
                                    <span className="font-bold text-gray-800">${result.hoa.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-green-200 flex justify-between font-bold text-xl">
                                <span className="text-gray-700">Total Interest Paid:</span>
                                <span className="text-red-600">${result.totalInterest.toFixed(2)}</span>
                            </div>

                            <div className="mt-4 w-full h-4 rounded-full overflow-hidden flex">
                                <div className="bg-green-600 h-full" style={{ width: `${(result.principalInterest / result.total) * 100}%` }}></div>
                                <div className="bg-purple-500 h-full" style={{ width: `${(result.taxes / result.total) * 100}%` }}></div>
                                <div className="bg-blue-500 h-full" style={{ width: `${(result.insurance / result.total) * 100}%` }}></div>
                                <div className="bg-yellow-500 h-full" style={{ width: `${(result.hoa / result.total) * 100}%` }}></div>
                            </div>
                        </div >
                    ) : (
                        <div className="text-center text-green-800 opacity-60 font-medium">
                            Complete the form and click calculate to see your detailed breakdown here.
                        </div>
                    )
                    }
                </div>
            </div>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Mortgage Calculator", "operatingSystem": "All", "applicationCategory": "FinanceApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } }) }} />
        </div>
    );
}
