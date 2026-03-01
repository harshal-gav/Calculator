'use client';

import { useState } from 'react';

export default function ROICalculator() {
    const [amountInvested, setAmountInvested] = useState('10000');
    const [amountReturned, setAmountReturned] = useState('12500');
    const [investmentTimeYears, setInvestmentTimeYears] = useState('2');

    const [result, setResult] = useState<{
        roi: number;
        netReturn: number;
        annualizedRoi: number;
    } | null>(null);

    const calculateROI = () => {
        const invested = parseFloat(amountInvested) || 0;
        const returned = parseFloat(amountReturned) || 0;
        const years = parseFloat(investmentTimeYears) || 0;

        if (invested > 0) {
            const netReturn = returned - invested;
            const roi = (netReturn / invested) * 100;

            let annualizedRoi = 0;
            if (years > 0) {
                // Annualized ROI = [(Ending / Beginning) ^ (1 / Years)] - 1
                annualizedRoi = (Math.pow((returned / invested), (1 / years)) - 1) * 100;
            }

            setResult({
                roi,
                netReturn,
                annualizedRoi
            });
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <h1 className="text-4xl font-extrabold mb-4 text-emerald-900 border-b pb-4">ROI Calculator</h1>
            <p className="mb-8 text-gray-600 text-lg">
                Calculate your exact Return on Investment and Annualized ROI across any time period.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100 space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Amount Invested ($)</label>
                        <input type="number" value={amountInvested} onChange={(e) => setAmountInvested(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-emerald-500 font-bold text-xl" />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Amount Returned ($)</label>
                        <input type="number" value={amountReturned} onChange={(e) => setAmountReturned(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-emerald-500 font-bold text-xl" />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Investment Duration (Years)</label>
                        <input type="number" step="0.5" value={investmentTimeYears} onChange={(e) => setInvestmentTimeYears(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-emerald-500 font-medium" />
                        <p className="text-xs text-gray-500 mt-1">Required to calculate annualized ROI.</p>
                    </div>

                    <button onClick={calculateROI} className="w-full bg-emerald-600 text-white font-bold py-4 rounded-xl hover:bg-emerald-700 transition shadow-lg uppercase tracking-wide mt-2">
                        Calculate ROI
                    </button>
                </div>

                {/* Results */}
                <div className="bg-white border-2 border-emerald-100 rounded-xl overflow-hidden shadow-sm flex flex-col justify-center p-8">
                    {result !== null ? (
                        <div className="w-full text-center space-y-8">
                            <div>
                                <h3 className="text-emerald-800 font-semibold uppercase tracking-wider text-sm mb-2">Total ROI</h3>
                                <div className={`text-6xl font-black ${result.roi >= 0 ? 'text-emerald-600' : 'text-red-500'} border-b border-emerald-100 pb-4`}>
                                    {result.roi > 0 && '+'}{result.roi.toFixed(2)}%
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-left">
                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                    <h4 className="text-gray-500 font-bold uppercase text-xs mb-1">Net Investment Gain</h4>
                                    <p className={`text-2xl font-bold ${result.netReturn >= 0 ? 'text-emerald-700' : 'text-red-600'}`}>
                                        {result.netReturn >= 0 ? '+' : '-'}${Math.abs(result.netReturn).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </p>
                                </div>
                                <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                                    <h4 className="text-emerald-800 font-bold uppercase text-[11px] tracking-wide mb-1">Annualized ROI</h4>
                                    <p className={`text-2xl font-bold ${result.annualizedRoi >= 0 ? 'text-gray-900' : 'text-red-600'}`}>
                                        {result.annualizedRoi > 0 && '+'}{result.annualizedRoi.toFixed(2)}% <span className="text-xs text-gray-500 font-normal">/yr</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex items-center justify-center text-center text-emerald-400 font-medium">
                            Enter your initial investment and final return to view your exact ROI.
                        </div>
                    )}
                </div>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "ROI Calculator", "operatingSystem": "All", "applicationCategory": "FinanceApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } }) }} />
        </div>
    );
}
