'use client';

import { useState } from 'react';

export default function InvestmentCalculator() {
    const [startingBalance, setStartingBalance] = useState('25000');
    const [annualContribution, setAnnualContribution] = useState('6000');
    const [expectedReturn, setExpectedReturn] = useState('8'); // %
    const [investmentYears, setInvestmentYears] = useState('20');

    const [taxRate, setTaxRate] = useState('15'); // Expected capital gains or income tax

    const [result, setResult] = useState<{
        grossFutureValue: number;
        taxesowed: number;
        netFutureValue: number;
        totalContributions: number;
    } | null>(null);

    const calculateInvestment = () => {
        const P = parseFloat(startingBalance) || 0;
        const C = parseFloat(annualContribution) || 0;
        const r = (parseFloat(expectedReturn) || 0) / 100;
        const years = parseInt(investmentYears) || 0;
        const tax = (parseFloat(taxRate) || 0) / 100;

        if (years > 0) {
            // Future Value of Initial Balance
            let A1 = P * Math.pow(1 + r, years);

            // Future Value of Annual Contributions (assuming end of year)
            let A2 = 0;
            if (r > 0 && C > 0) {
                A2 = C * ((Math.pow(1 + r, years) - 1) / r);
            } else if (r === 0) {
                A2 = C * years;
            }

            const grossValue = A1 + A2;
            const totalPrincipal = P + (C * years);
            const rawGains = grossValue - totalPrincipal;

            const estimatedTaxes = rawGains * tax;
            const netValue = grossValue - estimatedTaxes;

            setResult({
                grossFutureValue: grossValue,
                taxesowed: estimatedTaxes,
                netFutureValue: netValue,
                totalContributions: totalPrincipal
            });
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <h1 className="text-4xl font-extrabold mb-4 text-slate-800 border-b pb-4">Investment Calculator</h1>
            <p className="mb-8 text-gray-600 text-lg">
                Forecast the long term growth of your investment portfolio and estimate future tax liabilities.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Starting Balance ($)</label>
                        <input type="number" value={startingBalance} onChange={(e) => setStartingBalance(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-slate-500 font-bold text-xl" />
                    </div>

                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Annual Additions ($)</label>
                            <input type="number" value={annualContribution} onChange={(e) => setAnnualContribution(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-slate-500 font-medium" />
                        </div>
                        <div className="w-1/2">
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Years to Grow</label>
                            <input type="number" value={investmentYears} onChange={(e) => setInvestmentYears(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-slate-500 font-medium" />
                        </div>
                    </div>

                    <div className="border-t border-slate-200 pt-4 mt-2">
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Expected Return Rate (%)</label>
                        <input type="number" step="0.1" value={expectedReturn} onChange={(e) => setExpectedReturn(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-slate-500 font-bold" />
                        <p className="text-xs text-slate-500 mt-1">S&P 500 historical average is ~10% before inflation.</p>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Estimated Tax Rate on Gains (%)</label>
                        <input type="number" step="1" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-slate-500 font-medium" />
                        <p className="text-xs text-slate-500 mt-1">E.g., 15% long-term Capital Gains.</p>
                    </div>

                    <button onClick={calculateInvestment} className="w-full bg-slate-800 text-white font-bold py-4 rounded-xl hover:bg-slate-900 transition shadow-lg uppercase tracking-wide mt-2">
                        Project Investment
                    </button>
                </div>

                {/* Results Screen */}
                <div className="bg-white border-2 border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col justify-center">
                    {result !== null ? (
                        <>
                            <div className="p-8 pb-4 text-center">
                                <h3 className="text-slate-800 font-bold uppercase tracking-widest text-sm mb-2">Net Portfolio Value (After Taxes)</h3>
                                <div className="text-5xl font-black text-slate-900 tracking-tight text-green-700">
                                    ${result.netFutureValue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                </div>
                            </div>

                            <div className="p-6 bg-slate-50 space-y-4 border-t border-slate-200 flex-grow">
                                <div className="flex justify-between items-center pb-3 border-b border-white">
                                    <span className="text-slate-600 font-semibold text-sm">Gross Future Value</span>
                                    <span className="font-bold text-slate-800">${result.grossFutureValue.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                                </div>
                                <div className="flex justify-between items-center pb-3 border-b border-white">
                                    <span className="text-slate-600 font-semibold text-sm">Total Principal Invested</span>
                                    <span className="font-bold text-slate-800">${result.totalContributions.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                                </div>
                                <div className="flex justify-between items-center bg-red-50 p-3 rounded-lg border border-red-100">
                                    <span className="text-red-800 font-bold text-sm tracking-wide uppercase">Taxes Owed</span>
                                    <span className="font-black text-red-600">-${result.taxesowed.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="h-full flex items-center justify-center text-center p-8 text-slate-400 font-medium leading-relaxed">
                            Dial in your initial capital, yearly injections, and expected returns to forecast your wealth building journey.
                        </div>
                    )}
                </div>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Investment Calculator", "operatingSystem": "All", "applicationCategory": "FinanceApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } }) }} />
        </div>
    );
}
