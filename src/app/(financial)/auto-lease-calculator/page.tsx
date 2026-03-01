'use client';

import { useState } from 'react';

export default function AutoLeaseCalculator() {
    const [msrp, setMsrp] = useState('35000');
    const [negotiatedPrice, setNegotiatedPrice] = useState('33000');
    const [downPayment, setDownPayment] = useState('2000');
    const [tradeIn, setTradeIn] = useState('0');
    const [leaseTerm, setLeaseTerm] = useState('36');
    const [interestRate, setInterestRate] = useState('4.5'); // APR
    const [salesTax, setSalesTax] = useState('7');
    const [residualValuePct, setResidualValuePct] = useState('55'); // % of MSRP

    const [result, setResult] = useState<{
        monthlyPaymentTotal: number;
        monthlyDepreciation: number;
        monthlyFinance: number;
        monthlyTax: number;
        totalLeaseCost: number;
    } | null>(null);

    const calculateLease = () => {
        const pMsrp = parseFloat(msrp) || 0;
        const pNeg = parseFloat(negotiatedPrice) || 0;
        const pDown = parseFloat(downPayment) || 0;
        const pTrade = parseFloat(tradeIn) || 0;
        const term = parseInt(leaseTerm) || 0;
        const apr = parseFloat(interestRate) || 0;
        const taxRate = (parseFloat(salesTax) || 0) / 100;
        const residualPct = (parseFloat(residualValuePct) || 0) / 100;

        if (pMsrp > 0 && term > 0) {
            // Money Factor = APR / 2400
            const moneyFactor = apr / 2400;

            // Residual Value = MSRP * Residual %
            const residualValue = pMsrp * residualPct;

            // Capitalized Cost (Adjusted) = Negotiated Price - Down Payment - Trade In
            const capCost = Math.max(0, pNeg - pDown - pTrade);

            // Monthly Depreciation = (Cap Cost - Residual Value) / Term
            const monthlyDepreciation = Math.max(0, (capCost - residualValue) / term);

            // Monthly Finance Charge (Rent Charge) = (Cap Cost + Residual Value) * Money Factor
            const monthlyFinance = (capCost + residualValue) * moneyFactor;

            // Monthly Base Payment
            const basePayment = monthlyDepreciation + monthlyFinance;

            // Monthly Tax (Most states tax the monthly payment)
            const monthlyTaxAmount = basePayment * taxRate;

            const totalMonthly = basePayment + monthlyTaxAmount;

            // Total Lease Cost = Total Monthly Payments + Down Payment + Trade In
            // (Excludes upfront fees for simplicity)
            const totalCost = (totalMonthly * term) + pDown + pTrade;

            setResult({
                monthlyPaymentTotal: totalMonthly,
                monthlyDepreciation,
                monthlyFinance,
                monthlyTax: monthlyTaxAmount,
                totalLeaseCost: totalCost
            });
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <h1 className="text-4xl font-extrabold mb-4 text-slate-800 border-b pb-4">Auto Lease Calculator</h1>
            <p className="mb-8 text-gray-600 text-lg">
                Calculate your exact monthly car lease payment including depreciation, rent charges, and sales tax.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">MSRP ($)</label>
                            <input type="number" value={msrp} onChange={(e) => setMsrp(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-slate-500 font-bold" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Negotiated Price ($)</label>
                            <input type="number" value={negotiatedPrice} onChange={(e) => setNegotiatedPrice(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-slate-500 font-bold text-slate-700" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-t border-slate-200 pt-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Down Payment ($)</label>
                            <input type="number" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-slate-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Trade-in Value ($)</label>
                            <input type="number" value={tradeIn} onChange={(e) => setTradeIn(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-slate-500" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-t border-slate-200 pt-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Lease Term (Months)</label>
                            <input type="number" value={leaseTerm} onChange={(e) => setLeaseTerm(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-slate-500 font-bold" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Interest Rate / APR (%)</label>
                            <input type="number" step="0.1" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-slate-500" />
                            <p className="text-xs text-slate-500 mt-1">Converted to Money Factor.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Residual Value (%)</label>
                            <input type="number" step="1" value={residualValuePct} onChange={(e) => setResidualValuePct(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-slate-500" />
                            <p className="text-xs text-slate-500 mt-1">% of the original MSRP.</p>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Local Sales Tax (%)</label>
                            <input type="number" step="0.1" value={salesTax} onChange={(e) => setSalesTax(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-slate-500" />
                        </div>
                    </div>

                    <button onClick={calculateLease} className="w-full bg-slate-800 text-white font-bold py-4 rounded-xl hover:bg-slate-900 transition shadow-lg uppercase tracking-wide mt-4">
                        Calculate Payment
                    </button>
                </div>

                {/* Results Screen */}
                <div className="bg-white border-2 border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col items-center justify-center p-8">
                    {result !== null ? (
                        <div className="w-full text-center space-y-6">
                            <div>
                                <h3 className="text-slate-800 font-semibold uppercase tracking-wider text-sm mb-2">Total Monthly Payment</h3>
                                <div className="text-6xl font-black text-gray-900 drop-shadow-sm border-b border-slate-100 pb-4">
                                    ${result.monthlyPaymentTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}<span className="text-2xl text-slate-400 font-medium">/mo</span>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-slate-500 font-bold uppercase text-xs mb-3 text-left">Monthly Breakdown</h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center bg-slate-50 p-3 rounded text-sm text-slate-700">
                                        <span>Depreciation (Principal)</span>
                                        <span className="font-bold">${result.monthlyDepreciation.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center bg-slate-50 p-3 rounded text-sm text-slate-700">
                                        <span>Rent Charge (Interest)</span>
                                        <span className="font-bold border-b border-slate-300">${result.monthlyFinance.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center bg-slate-100 p-3 rounded text-sm text-slate-800 font-semibold border border-slate-200">
                                        <span>Base Payment Before Tax</span>
                                        <span>${(result.monthlyDepreciation + result.monthlyFinance).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm text-red-600 px-3 py-1">
                                        <span>+ Monthly Sales Tax</span>
                                        <span className="font-bold">${result.monthlyTax.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-green-50 p-4 rounded border border-green-200 text-left">
                                <h4 className="text-green-800 font-bold uppercase text-xs mb-1">Total Cost of Lease</h4>
                                <p className="text-2xl font-black text-green-700">${result.totalLeaseCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                <p className="text-xs text-green-600 mt-1 font-medium">Sum of all {(leaseTerm)} payments + Down Payment + Trade-In</p>
                            </div>
                        </div>
                    ) : (
                        <div className="text-slate-400 font-medium text-center text-lg max-w-xs">
                            Enter the vehicle pricing and lease terms to see your accurate monthly lease breakdown.
                        </div>
                    )}
                </div>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Auto Lease Calculator", "operatingSystem": "All", "applicationCategory": "FinanceApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } }) }} />
        </div>
    );
}
