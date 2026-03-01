'use client';

import { useState, useEffect } from 'react';

export default function MarginCalculator() {
    const [cost, setCost] = useState('50');
    const [revenue, setRevenue] = useState('100');

    const [result, setResult] = useState({
        grossProfit: 0,
        margin: 0,
        markup: 0
    });

    useEffect(() => {
        calculateMargin();
    }, [cost, revenue]);

    const calculateMargin = () => {
        const c = parseFloat(cost) || 0;
        const r = parseFloat(revenue) || 0;

        const grossProfit = r - c;
        const margin = r > 0 ? (grossProfit / r) * 100 : 0;
        const markup = c > 0 ? (grossProfit / c) * 100 : 0;

        setResult({
            grossProfit,
            margin,
            markup
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <h1 className="text-4xl font-extrabold mb-4 text-blue-800 border-b pb-4">Margin Calculator</h1>
            <p className="mb-8 text-gray-600 text-lg">
                Calculate gross profit margin, profit dollars, and markup percentage from your cost and revenue.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Cost of Goods Sold (COGS)</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600 font-bold text-lg">$</span>
                            <input
                                type="number" min="0" step="0.01"
                                value={cost}
                                onChange={(e) => setCost(e.target.value)}
                                className="w-full rounded-xl border-gray-300 p-4 pl-10 shadow-sm focus:border-blue-500 font-bold text-2xl text-gray-800"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Revenue (Selling Price)</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600 font-bold text-lg">$</span>
                            <input
                                type="number" min="0" step="0.01"
                                value={revenue}
                                onChange={(e) => setRevenue(e.target.value)}
                                className="w-full rounded-xl border-gray-300 p-4 pl-10 shadow-sm focus:border-blue-500 font-bold text-2xl text-gray-800"
                            />
                        </div>
                    </div>
                </div>

                {/* Results Screen */}
                <div className="bg-white border-2 border-blue-100 rounded-xl overflow-hidden shadow-sm flex flex-col justify-center">
                    <div className="w-full flex flex-col h-full">
                        <div className="p-8 pb-6 text-center bg-blue-600 border-b border-blue-700 text-white">
                            <h3 className="text-blue-200 font-bold uppercase tracking-widest text-[11px] mb-2">Gross Profit Margin</h3>
                            <div className="text-5xl font-black drop-shadow-sm">
                                {result.margin.toFixed(2)}<span className="text-3xl text-blue-300">%</span>
                            </div>
                        </div>

                        <div className="p-6 flex-grow space-y-4 bg-gray-50 flex flex-col justify-center">
                            <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-200">
                                <span className="font-bold text-gray-500 uppercase text-[10px] tracking-widest">Gross Profit ($)</span>
                                <span className="font-black text-2xl text-emerald-600">${result.grossProfit.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-200">
                                <span className="font-bold text-gray-500 uppercase text-[10px] tracking-widest">Calculated Markup</span>
                                <span className="font-black text-2xl text-blue-800">{result.markup.toFixed(2)}%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 text-center text-xs text-gray-500 bg-gray-50 p-4 rounded-lg">
                <strong>Formula:</strong> Margin = (Revenue - Cost) / Revenue × 100
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Margin Calculator", "operatingSystem": "All", "applicationCategory": "FinanceApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } }) }} />
        </div>
    );
}
