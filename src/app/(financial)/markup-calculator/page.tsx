'use client';

import { useState, useEffect } from 'react';

export default function MarkupCalculator() {
    const [cost, setCost] = useState('50');
    const [markup, setMarkup] = useState('50');

    const [result, setResult] = useState({
        revenue: 0,
        grossProfit: 0,
        margin: 0
    });

    useEffect(() => {
        calculateMarkup();
    }, [cost, markup]);

    const calculateMarkup = () => {
        const c = parseFloat(cost) || 0;
        const m = parseFloat(markup) || 0;

        const grossProfit = c * (m / 100);
        const revenue = c + grossProfit;
        const margin = revenue > 0 ? (grossProfit / revenue) * 100 : 0;

        setResult({
            revenue,
            grossProfit,
            margin
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <h1 className="text-4xl font-extrabold mb-4 text-cyan-800 border-b pb-4">Markup Calculator</h1>
            <p className="mb-8 text-gray-600 text-lg">
                Calculate your final selling price, profit dollars, and derived margin based on your cost and desired markup percentage.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="bg-cyan-50 p-6 rounded-xl border border-cyan-100 space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Cost of Goods Sold (COGS)</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-600 font-bold text-lg">$</span>
                            <input
                                type="number" min="0" step="0.01"
                                value={cost}
                                onChange={(e) => setCost(e.target.value)}
                                className="w-full rounded-xl border-gray-300 p-4 pl-10 shadow-sm focus:border-cyan-500 font-bold text-2xl text-gray-800"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Markup Percentage</label>
                        <div className="relative">
                            <input
                                type="number" min="0" step="0.1"
                                value={markup}
                                onChange={(e) => setMarkup(e.target.value)}
                                className="w-full rounded-xl border-gray-300 p-4 pr-10 shadow-sm focus:border-cyan-500 font-bold text-2xl text-gray-800"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-lg">%</span>
                        </div>
                    </div>
                </div>

                {/* Results Screen */}
                <div className="bg-white border-2 border-cyan-100 rounded-xl overflow-hidden shadow-sm flex flex-col justify-center">
                    <div className="w-full flex flex-col h-full">
                        <div className="p-8 pb-6 text-center bg-cyan-600 border-b border-cyan-700 text-white">
                            <h3 className="text-cyan-200 font-bold uppercase tracking-widest text-[11px] mb-2">Target Revenue (Selling Price)</h3>
                            <div className="text-5xl font-black drop-shadow-sm">
                                <span className="text-3xl text-cyan-300 mr-1">$</span>{result.revenue.toFixed(2)}
                            </div>
                        </div>

                        <div className="p-6 flex-grow space-y-4 bg-gray-50 flex flex-col justify-center">
                            <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-200">
                                <span className="font-bold text-gray-500 uppercase text-[10px] tracking-widest">Gross Profit ($)</span>
                                <span className="font-black text-2xl text-emerald-600">${result.grossProfit.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-200">
                                <span className="font-bold text-gray-500 uppercase text-[10px] tracking-widest">Calculated Margin</span>
                                <span className="font-black text-2xl text-cyan-800">{result.margin.toFixed(2)}%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 text-center text-xs text-gray-500 bg-gray-50 p-4 rounded-lg">
                <strong>Formula:</strong> Revenue = Cost + (Cost × Markup)
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Markup Calculator", "operatingSystem": "All", "applicationCategory": "FinanceApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } }) }} />
        </div>
    );
}
