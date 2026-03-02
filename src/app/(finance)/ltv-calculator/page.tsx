'use client';

import { useState } from 'react';

export default function LTVCalculator() {
    const [loanAmount, setLoanAmount] = useState('240000');
    const [propertyValue, setPropertyValue] = useState('300000');
    const [downPayment, setDownPayment] = useState('');

    const [result, setResult] = useState<{
        ltv: number;
        loanAmount: number;
        propertyValue: number;
        downPayment: number;
        downPaymentPercent: number;
        needsPMI: boolean;
    } | null>(null);

    const calculate = () => {
        let loan = parseFloat(loanAmount);
        let value = parseFloat(propertyValue);
        let down = parseFloat(downPayment);

        if (isNaN(value) || value <= 0) {
            setResult(null);
            return;
        }

        // Logic to allow entering EITHER loan amount OR down payment
        if (!isNaN(down) && isNaN(loan)) {
            loan = value - down;
            setLoanAmount(loan.toString());
        } else if (!isNaN(loan) && isNaN(down)) {
            down = value - loan;
            setDownPayment(down.toString());
        }

        if (isNaN(loan) || isNaN(down)) {
            setResult(null);
            return;
        }

        const ltv = (loan / value) * 100;
        const downPaymentPercent = (down / value) * 100;

        setResult({
            ltv,
            loanAmount: loan,
            propertyValue: value,
            downPayment: down,
            downPaymentPercent,
            needsPMI: ltv > 80
        });
    };

    const clearAll = () => {
        setLoanAmount('');
        setPropertyValue('');
        setDownPayment('');
        setResult(null);
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-sky-900 flex items-center justify-center font-serif">
                    <span className="mr-3">🏠</span> LTV Calculator
                </h1>
                <p className="text-sky-700 text-lg max-w-2xl mx-auto">
                    Calculate your Loan-to-Value (LTV) ratio to instantly determine mortgage risk and Private Mortgage Insurance (PMI) requirements.
                </p>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-zinc-200 mb-8 max-w-2xl mx-auto">
                <div className="space-y-6 mb-8">

                    <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">Property Appraisal Value</label>
                        <div className="relative">
                            <span className="absolute left-4 top-3 text-zinc-400 font-bold">$</span>
                            <input
                                type="number" step="any" min="0" value={propertyValue} onChange={(e) => { setPropertyValue(e.target.value); setResult(null); }}
                                className="w-full rounded-xl border-zinc-300 shadow-sm p-3 pl-8 text-lg border focus:border-sky-500 font-bold bg-zinc-50 focus:bg-white transition-colors"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-100 text-zinc-400 font-bold text-[10px] px-2 py-1 rounded-full uppercase tracking-widest hidden md:block z-10 border border-zinc-200">OR</div>

                        <div>
                            <label className="block text-xs font-bold text-sky-700 mb-2 uppercase tracking-wide">Total Loan Amount</label>
                            <div className="relative">
                                <span className="absolute left-4 top-3 text-zinc-400 font-bold">$</span>
                                <input
                                    type="number" step="any" min="0" value={loanAmount} onChange={(e) => { setLoanAmount(e.target.value); setDownPayment(''); setResult(null); }}
                                    className="w-full rounded-xl border-sky-200 shadow-sm p-3 pl-8 border focus:border-sky-500 font-bold bg-sky-50/30"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-teal-700 mb-2 uppercase tracking-wide">Down Payment</label>
                            <div className="relative">
                                <span className="absolute left-4 top-3 text-zinc-400 font-bold">$</span>
                                <input
                                    type="number" step="any" min="0" value={downPayment} onChange={(e) => { setDownPayment(e.target.value); setLoanAmount(''); setResult(null); }}
                                    className="w-full rounded-xl border-teal-200 shadow-sm p-3 pl-8 border focus:border-teal-500 font-bold bg-teal-50/30"
                                    onKeyDown={(e) => e.key === 'Enter' && calculate()}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={clearAll}
                        className="bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold py-4 px-6 rounded-xl transition-colors w-1/3"
                    >
                        Clear
                    </button>
                    <button
                        onClick={calculate}
                        className="w-2/3 bg-sky-600 hover:bg-sky-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-sky-600/30 uppercase tracking-widest text-lg"
                    >
                        Calculate LTV
                    </button>
                </div>
            </div>

            {result !== null && (
                <div className={`p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center rounded-2xl border ${result.needsPMI ? 'bg-rose-950 border-rose-800' : 'bg-teal-950 border-teal-800'}`}>
                    <div className={`absolute top-0 right-0 w-64 h-64 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none ${result.needsPMI ? 'bg-rose-500' : 'bg-teal-500'}`}></div>

                    <h2 className="text-white/60 font-bold uppercase tracking-widest text-xs mb-8 z-10 text-center">Calculated Loan-to-Value Ratio</h2>

                    <div className="z-10 relative mb-8 w-full max-w-sm">
                        <div className={`p-8 rounded-full aspect-square border-4 flex flex-col items-center justify-center shadow-inner ${result.needsPMI ? 'bg-rose-900/40 border-rose-500/50 shadow-rose-900/50' : 'bg-teal-900/40 border-teal-500/50 shadow-teal-900/50'}`}>
                            <div className={`font-mono font-black text-6xl break-all drop-shadow-lg ${result.needsPMI ? 'text-rose-400' : 'text-teal-400'}`}>
                                {result.ltv.toFixed(2)}<span className="text-3xl">%</span>
                            </div>
                            <span className="text-white/50 text-[10px] uppercase tracking-widest mt-2 font-bold">LTV Ratio</span>
                        </div>
                    </div>

                    <div className="w-full max-w-2xl z-10 bg-black/30 p-6 rounded-2xl border border-white/10 mb-6">
                        <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/10">
                            <span className="text-white text-sm font-bold tracking-wide">Property Value</span>
                            <span className="font-mono text-white text-lg font-bold">${result.propertyValue.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/10">
                            <span className="text-sky-300 text-sm font-bold tracking-wide">Loan Amount</span>
                            <span className="font-mono text-sky-200 text-lg font-bold">${result.loanAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-teal-300 text-sm font-bold tracking-wide">Down Payment</span>
                            <div className="text-right">
                                <span className="font-mono text-teal-200 text-lg font-bold block">${result.downPayment.toLocaleString()}</span>
                                <span className="text-teal-500/80 text-[10px] uppercase tracking-widest font-bold">({result.downPaymentPercent.toFixed(2)}%)</span>
                            </div>
                        </div>
                    </div>

                    <div className={`z-10 w-full max-w-2xl p-4 rounded-xl border flex items-start gap-4 ${result.needsPMI ? 'bg-rose-900/40 border-rose-500/30' : 'bg-teal-900/40 border-teal-500/30'}`}>
                        <div className="text-3xl">{result.needsPMI ? '⚠️' : '✅'}</div>
                        <div>
                            <h3 className={`font-bold uppercase tracking-widest text-xs mb-1 ${result.needsPMI ? 'text-rose-300' : 'text-teal-300'}`}>
                                {result.needsPMI ? 'PMI Required' : 'No PMI Required'}
                            </h3>
                            <p className="text-white/80 text-sm">
                                {result.needsPMI
                                    ? `Because your LTV is above 80% (${result.ltv.toFixed(2)}%), lenders will typically require you to pay Private Mortgage Insurance (PMI) until the LTV drops below 80%.`
                                    : `Because your LTV is ${result.ltv.toFixed(2)}% (80% or below), you typically will not be required to pay Private Mortgage Insurance (PMI).`}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "LTV Calculator", "operatingSystem": "All", "applicationCategory": "FinancialApplication" }) }} />
        </div>
    );
}
