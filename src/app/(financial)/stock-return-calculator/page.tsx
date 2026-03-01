'use client';

import { useState } from 'react';

export default function StockReturnCalculator() {
    const [shares, setShares] = useState('100');
    const [buyPrice, setBuyPrice] = useState('50.00');
    const [buyCommission, setBuyCommission] = useState('4.95');

    const [sellPrice, setSellPrice] = useState('75.00');
    const [sellCommission, setSellCommission] = useState('4.95');

    const [dividends, setDividends] = useState('125.00');

    // Results
    const [initialCost, setInitialCost] = useState<number | null>(null);
    const [grossProceeds, setGrossProceeds] = useState<number | null>(null);
    const [netProceeds, setNetProceeds] = useState<number | null>(null);
    const [netProfit, setNetProfit] = useState<number | null>(null);
    const [roi, setRoi] = useState<number | null>(null);

    const calculateReturn = () => {
        const s = parseFloat(shares) || 0;
        const bp = parseFloat(buyPrice) || 0;
        const bc = parseFloat(buyCommission) || 0;

        const sp = parseFloat(sellPrice) || 0;
        const sc = parseFloat(sellCommission) || 0;

        const d = parseFloat(dividends) || 0;

        if (s <= 0 || bp <= 0) return;

        // Total Cost Basis
        const costBasis = (s * bp) + bc;

        // Raw sale value
        const rawProceeds = s * sp;

        // Net Proceeds (After commission, before cost basis)
        const proceedsAfterFees = rawProceeds + d - sc;

        // Net Profit
        const profit = proceedsAfterFees - costBasis;

        // Return on Investment (ROI)
        const returnPct = costBasis > 0 ? (profit / costBasis) * 100 : 0;

        setInitialCost(costBasis);
        setGrossProceeds(rawProceeds);
        setNetProceeds(proceedsAfterFees);
        setNetProfit(profit);
        setRoi(returnPct);
    };

    return (
        <div className="max-w-5xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-emerald-900 flex items-center justify-center font-serif">
                    <span className="mr-3">📈</span> Stock Return Calculator
                </h1>
                <p className="text-emerald-700 text-lg max-w-2xl mx-auto">
                    Calculate your exact Net Profit and Return on Investment (ROI) for individual stock trades.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

                {/* Inputs */}
                <div className="lg:col-span-3 space-y-8 bg-white p-6 md:p-8 rounded-2xl border border-zinc-200 shadow-sm relative h-max">
                    <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500 rounded-l-2xl"></div>

                    {/* Buy Section */}
                    <div>
                        <h3 className="text-lg font-bold text-zinc-800 border-b border-zinc-100 pb-2 mb-4 uppercase tracking-wider flex items-center">
                            <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs mr-2">1</span>
                            Purchase Details
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-zinc-600 mb-2 uppercase tracking-wide">Shares</label>
                                <input
                                    type="number" step="any" min="0"
                                    value={shares}
                                    onChange={(e) => setShares(e.target.value)}
                                    className="w-full rounded-xl border-zinc-300 p-3 shadow-sm focus:border-emerald-500 font-bold"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-zinc-600 mb-2 uppercase tracking-wide">Buy Price</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 font-bold">$</span>
                                    <input
                                        type="number" step="0.01" min="0"
                                        value={buyPrice}
                                        onChange={(e) => setBuyPrice(e.target.value)}
                                        className="w-full rounded-xl border-zinc-300 pl-7 p-3 shadow-sm focus:border-emerald-500 font-bold"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-zinc-600 mb-2 uppercase tracking-wide">Buy Fee/Commission</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 font-bold">$</span>
                                    <input
                                        type="number" step="0.01" min="0"
                                        value={buyCommission}
                                        onChange={(e) => setBuyCommission(e.target.value)}
                                        className="w-full rounded-xl border-zinc-300 pl-7 p-3 shadow-sm focus:border-emerald-500 font-bold text-zinc-500 bg-zinc-50"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sell Section */}
                    <div>
                        <h3 className="text-lg font-bold text-zinc-800 border-b border-zinc-100 pb-2 mb-4 uppercase tracking-wider flex items-center">
                            <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs mr-2">2</span>
                            Sale Details
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-zinc-600 mb-2 uppercase tracking-wide">Sell Price</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 font-bold">$</span>
                                    <input
                                        type="number" step="0.01" min="0"
                                        value={sellPrice}
                                        onChange={(e) => setSellPrice(e.target.value)}
                                        className="w-full rounded-xl border-zinc-300 pl-7 p-3 shadow-sm focus:border-emerald-500 font-bold"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-zinc-600 mb-2 uppercase tracking-wide">Sell Fee/Commission</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 font-bold">$</span>
                                    <input
                                        type="number" step="0.01" min="0"
                                        value={sellCommission}
                                        onChange={(e) => setSellCommission(e.target.value)}
                                        className="w-full rounded-xl border-zinc-300 pl-7 p-3 shadow-sm focus:border-emerald-500 font-bold text-zinc-500 bg-zinc-50"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Extras */}
                    <div>
                        <h3 className="text-lg font-bold text-zinc-800 border-b border-zinc-100 pb-2 mb-4 uppercase tracking-wider flex items-center">
                            <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs mr-2">3</span>
                            Dividends (Optional)
                        </h3>

                        <div>
                            <label className="block text-xs font-bold text-zinc-600 mb-2 uppercase tracking-wide">Total Dividends Received</label>
                            <div className="relative md:w-1/2">
                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500 font-bold">$</span>
                                <input
                                    type="number" step="0.01" min="0"
                                    value={dividends}
                                    onChange={(e) => setDividends(e.target.value)}
                                    className="w-full rounded-xl border-emerald-200 pl-7 p-3 shadow-sm focus:border-emerald-500 font-bold bg-emerald-50/30"
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={calculateReturn}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-emerald-600/30 uppercase tracking-widest text-sm mt-4"
                    >
                        Calculate Return
                    </button>
                </div>

                {/* Dashboard Output */}
                <div className="lg:col-span-2">
                    {netProfit !== null && roi !== null ? (
                        <div className={`h-full rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center text-white border ${netProfit >= 0 ? 'bg-emerald-950 border-emerald-800' : 'bg-red-950 border-red-800'}`}>
                            {/* Decorative element */}
                            <div className={`absolute top-0 right-0 w-64 h-64 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none ${netProfit >= 0 ? 'bg-emerald-600' : 'bg-red-600'}`}></div>

                            <div className="relative z-10 w-full text-center">
                                <h2 className={`font-bold uppercase tracking-widest text-xs mb-4 ${netProfit >= 0 ? 'text-emerald-300' : 'text-red-300'}`}>Net Profit/Loss</h2>

                                <div className="text-5xl lg:text-6xl font-black tracking-tight text-white mb-2 drop-shadow-lg break-all">
                                    ${Math.abs(netProfit).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </div>

                                <div className={`text-lg font-bold mb-8 flex items-center justify-center space-x-2 ${netProfit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                                    {netProfit >= 0 ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" /></svg>
                                    )}
                                    <span>{roi > 0 ? '+' : ''}{roi.toFixed(2)}% ROI</span>
                                </div>

                                <div className={`space-y-4 w-full pt-6 border-t ${netProfit >= 0 ? 'border-emerald-800/50' : 'border-red-800/50'}`}>
                                    <div className="flex justify-between items-center text-sm px-2">
                                        <span className="text-zinc-300 font-medium">Initial Cost Basis</span>
                                        <span className="font-bold font-mono text-zinc-100">${(initialCost || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm px-2">
                                        <span className="text-zinc-300 font-medium">Gross Return</span>
                                        <span className="font-bold font-mono text-zinc-100">${(grossProceeds || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                    </div>

                                    <div className={`mt-4 pt-4 border-t ${netProfit >= 0 ? 'border-emerald-800/30' : 'border-red-800/30'} flex justify-between items-center`}>
                                        <span className={`text-[10px] font-bold uppercase tracking-wider ${netProfit >= 0 ? 'text-emerald-200' : 'text-red-200'}`}>Net Proceeds (incl. div)</span>
                                        <span className="font-bold font-mono text-lg text-white">${(netProceeds || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full rounded-2xl border-2 border-dashed border-emerald-200 bg-emerald-50/50 flex flex-col items-center justify-center p-8 text-center text-emerald-600">
                            <span className="text-6xl mb-4 opacity-50 grayscale pt-6">📊</span>
                            <h3 className="font-bold text-xl mb-2 text-emerald-800">Ready to Trade</h3>
                            <p className="text-sm font-medium opacity-80">Enter your trade details to evaluate your performance.</p>
                        </div>
                    )}
                </div>

            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Stock Return Calculator", "operatingSystem": "All", "applicationCategory": "FinanceApplication" }) }} />
        </div>
    );
}
