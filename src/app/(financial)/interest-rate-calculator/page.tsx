'use client';

import { useState } from 'react';

export default function InterestRateCalculator() {
    const [principal, setPrincipal] = useState('10000');
    const [rate, setRate] = useState('5.0'); // Annual rate percentage
    const [time, setTime] = useState('10'); // Years
    const [compound, setCompound] = useState('12'); // Times per year (12 = monthly)

    const [result, setResult] = useState<{
        futureValue: number;
        totalInterest: number;
    } | null>(null);

    const calculateInterest = () => {
        const P = parseFloat(principal) || 0;
        const r = (parseFloat(rate) || 0) / 100;
        const t = parseFloat(time) || 0;
        const n = parseInt(compound) || 1;

        if (P > 0 && t > 0) {
            // Compound Interest Formula: A = P(1 + r/n)^(nt)
            const A = P * Math.pow((1 + r / n), n * t);
            const interestEarned = A - P;

            setResult({
                futureValue: A,
                totalInterest: interestEarned
            });
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <h1 className="text-4xl font-extrabold mb-4 text-indigo-900 border-b pb-4">Interest Rate Calculator</h1>
            <p className="mb-8 text-gray-600 text-lg">
                Calculate the future accumulated value of an investment or loan with compound interest.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Input Form */}
                <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Principal Amount ($)</label>
                            <input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} className="w-full rounded-lg border-gray-300 shadow-sm p-3 border focus:border-indigo-500 text-lg font-bold" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Annual Interest Rate (%)</label>
                            <input type="number" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} className="w-full rounded-lg border-gray-300 shadow-sm p-3 border focus:border-indigo-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Time (Years)</label>
                            <input type="number" value={time} onChange={(e) => setTime(e.target.value)} className="w-full rounded-lg border-gray-300 shadow-sm p-3 border focus:border-indigo-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Compound Frequency</label>
                            <select value={compound} onChange={(e) => setCompound(e.target.value)} className="w-full rounded-lg border-gray-300 shadow-sm p-3 border focus:border-indigo-500">
                                <option value="365">Daily (365/yr)</option>
                                <option value="12">Monthly (12/yr)</option>
                                <option value="4">Quarterly (4/yr)</option>
                                <option value="1">Annually (1/yr)</option>
                            </select>
                        </div>
                    </div>

                    <button onClick={calculateInterest} className="mt-6 w-full bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-700 transition shadow-lg uppercase tracking-wide">
                        Calculate Future Value
                    </button>
                </div>

                {/* Results Screen */}
                <div className="bg-white border-2 border-indigo-100 rounded-xl p-8 flex flex-col justify-center items-center shadow-sm">
                    {result !== null ? (
                        <div className="w-full text-center space-y-6">
                            <div>
                                <h3 className="text-gray-500 font-semibold uppercase tracking-wider text-sm mb-2">Total Accumulated Value</h3>
                                <div className="text-5xl font-black text-indigo-700">
                                    ${result.futureValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </div>
                            </div>
                            <div className="h-px bg-indigo-100 w-full"></div>
                            <div className="grid grid-cols-2 gap-4 text-left">
                                <div>
                                    <h4 className="text-gray-400 text-sm font-medium">Starting Principal</h4>
                                    <p className="text-xl font-bold text-gray-800">${parseFloat(principal).toLocaleString()}</p>
                                </div>
                                <div>
                                    <h4 className="text-gray-400 text-sm font-medium">Total Interest Earned</h4>
                                    <p className="text-xl font-bold text-green-600">${result.totalInterest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-indigo-300 font-medium text-center">
                            Results will appear here
                        </div>
                    )}
                </div>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Interest Rate Calculator", "operatingSystem": "All", "applicationCategory": "FinanceApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } }) }} />
        </div>
    );
}
