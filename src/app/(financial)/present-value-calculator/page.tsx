'use client';

import { useState } from 'react';

export default function PresentValueCalculator() {
    const [futureValue, setFutureValue] = useState('10000');
    const [interestRate, setInterestRate] = useState('5');
    const [years, setYears] = useState('10');
    const [autoFormat, setAutoFormat] = useState(true);

    const [result, setResult] = useState<{
        pv: number;
        discountedAmount: number;
    } | null>(null);

    const calculatePV = () => {
        const fv = parseFloat(futureValue) || 0;
        const r = (parseFloat(interestRate) || 0) / 100;
        const n = parseFloat(years) || 0;

        if (n > 0 || n < 0) { // Time can theoretically be negative for projection mechanics, but standard is positive
            // PV = FV / (1 + r)^n
            const pv = fv / Math.pow(1 + r, n);
            const discounted = fv - pv;

            setResult({
                pv,
                discountedAmount: discounted
            });
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <h1 className="text-4xl font-extrabold mb-4 text-emerald-900 border-b pb-4">Present Value Calculator</h1>
            <p className="mb-8 text-gray-600 text-lg">
                Calculate the current worth of a future sum of money given a specific rate of return.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100 space-y-6 flex flex-col justify-center">
                    <div>
                        <label className="block text-sm font-semibold text-emerald-900 mb-1">Expected Future Value ($)</label>
                        <input type="number" value={futureValue} onChange={(e) => setFutureValue(e.target.value)} className="w-full rounded-lg border-gray-300 p-4 shadow-sm focus:border-emerald-500 font-black text-2xl text-gray-800 tracking-wide" />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Discount Rate / Interest (%)</label>
                        <input type="number" step="0.1" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-emerald-500 font-bold text-lg" />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Number of Periods (Years)</label>
                        <input type="number" step="1" value={years} onChange={(e) => setYears(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-emerald-500 font-bold text-lg" />
                    </div>

                    <button onClick={calculatePV} className="w-full bg-emerald-600 text-white font-black py-4 rounded-xl hover:bg-emerald-700 transition shadow-lg uppercase tracking-widest text-lg">
                        Calculate PV
                    </button>

                    <p className="text-xs text-emerald-700 text-center uppercase font-bold tracking-widest opacity-60">
                        Formula: PV = FV / (1 + r)^n
                    </p>
                </div>

                {/* Results Screen */}
                <div className="bg-white border-2 border-emerald-100 rounded-xl overflow-hidden shadow-sm flex flex-col justify-center p-8">
                    {result !== null ? (
                        <div className="w-full text-center space-y-8">
                            <div>
                                <h3 className="text-emerald-800 font-bold uppercase tracking-widest text-sm mb-2">Required Present Value</h3>
                                <div className="text-5xl lg:text-6xl font-black text-gray-900 tracking-tighter">
                                    ${result.pv.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </div>
                                <p className="text-sm font-medium text-gray-500 mt-4 leading-relaxed px-4">
                                    You must invest <strong className="text-emerald-600">${result.pv.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong> today at exactly a <strong className="text-emerald-600">{interestRate}%</strong> interest rate to reach <strong className="text-gray-900">${parseFloat(futureValue).toLocaleString()}</strong> in {years} years.
                                </p>
                            </div>

                            <div className="h-px border-b border-dashed border-gray-300 w-full"></div>

                            <div className="text-left bg-gray-50 p-4 rounded-lg border border-gray-100 flex justify-between items-center shadow-inner">
                                <h4 className="text-gray-500 font-bold uppercase text-[10px] tracking-wider">Total Investment Return</h4>
                                <p className="text-xl font-black text-green-600">+${result.discountedAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex items-center justify-center text-center text-emerald-400 font-medium p-4">
                            Determine exactly how much you need to invest today to reach a target financial goal in the future.
                        </div>
                    )}
                </div>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Present Value Calculator", "operatingSystem": "All", "applicationCategory": "FinanceApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } }) }} />
        </div>
    );
}
