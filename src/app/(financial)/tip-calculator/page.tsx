'use client';

import { useState, useEffect } from 'react';

export default function TipCalculator() {
    const [billAmount, setBillAmount] = useState('100');
    const [tipPercent, setTipPercent] = useState('15');
    const [splitCount, setSplitCount] = useState('1');

    const [result, setResult] = useState({
        tipAmount: 0,
        totalAmount: 0,
        tipPerPerson: 0,
        totalPerPerson: 0
    });

    useEffect(() => {
        calculateTip();
    }, [billAmount, tipPercent, splitCount]);

    const calculateTip = () => {
        const bill = parseFloat(billAmount) || 0;
        const tipPct = parseFloat(tipPercent) || 0;
        let split = parseInt(splitCount) || 1;
        if (split < 1) split = 1;

        const tipAmount = bill * (tipPct / 100);
        const totalAmount = bill + tipAmount;
        const tipPerPerson = tipAmount / split;
        const totalPerPerson = totalAmount / split;

        setResult({
            tipAmount,
            totalAmount,
            tipPerPerson,
            totalPerPerson
        });
    };

    const presetTips = [10, 15, 18, 20, 25];

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <h1 className="text-4xl font-extrabold mb-4 text-emerald-700 border-b pb-4">Tip Calculator</h1>
            <p className="mb-8 text-gray-600 text-lg">
                Calculate gratuity instantly, split the bill evenly among your party, and find the exact per-person cost.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100 space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Bill Amount</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600 font-bold text-xl">$</span>
                            <input
                                type="number" min="0" step="0.01"
                                value={billAmount}
                                onChange={(e) => setBillAmount(e.target.value)}
                                className="w-full rounded-xl border-gray-300 p-4 pl-10 shadow-sm focus:border-emerald-500 font-black text-2xl text-gray-800"
                                placeholder="0.00"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Tip Percentage (%)</label>
                        <div className="flex flex-wrap gap-2 mb-3">
                            {presetTips.map(pct => (
                                <button
                                    key={pct}
                                    onClick={() => setTipPercent(pct.toString())}
                                    className={`flex-1 py-2 px-3 rounded-lg font-bold text-sm transition ${parseFloat(tipPercent) === pct ? 'bg-emerald-600 text-white shadow-md' : 'bg-white text-emerald-700 border border-emerald-200 hover:bg-emerald-100'}`}
                                >
                                    {pct}%
                                </button>
                            ))}
                        </div>
                        <input
                            type="number" min="0" step="1"
                            value={tipPercent}
                            onChange={(e) => setTipPercent(e.target.value)}
                            className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-emerald-500 font-bold text-gray-800"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Split Count (Number of People)</label>
                        <div className="flex items-center">
                            <button onClick={() => setSplitCount(Math.max(1, parseInt(splitCount || '1') - 1).toString())} className="bg-emerald-100 text-emerald-700 p-3 rounded-l-lg hover:bg-emerald-200 font-black text-xl w-12">-</button>
                            <input
                                type="number" min="1" step="1"
                                value={splitCount}
                                onChange={(e) => setSplitCount(Math.max(1, parseInt(e.target.value) || 1).toString())}
                                className="w-full border-y border-gray-300 p-3 text-center focus:outline-none focus:ring-0 font-bold text-xl text-gray-800"
                            />
                            <button onClick={() => setSplitCount((parseInt(splitCount || '1') + 1).toString())} className="bg-emerald-100 text-emerald-700 p-3 rounded-r-lg hover:bg-emerald-200 font-black text-xl w-12">+</button>
                        </div>
                    </div>
                </div>

                {/* Results Screen */}
                <div className="bg-emerald-900 border-2 border-emerald-800 rounded-xl overflow-hidden shadow-xl flex flex-col justify-center text-white">
                    <div className="w-full h-full flex flex-col">
                        <div className="p-8 pb-6 border-b border-emerald-700/50">
                            <div className="flex justify-between items-end mb-1">
                                <h3 className="text-emerald-300 font-bold uppercase tracking-widest text-xs">Tip Amount</h3>
                                {parseInt(splitCount) > 1 && <span className="text-emerald-400 text-[10px] uppercase font-bold tracking-widest">/ person</span>}
                            </div>
                            <div className="text-5xl font-black text-white drop-shadow-md">
                                ${parseInt(splitCount) > 1 ? result.tipPerPerson.toFixed(2) : result.tipAmount.toFixed(2)}
                            </div>
                            {parseInt(splitCount) > 1 && (
                                <div className="text-emerald-400 font-medium text-sm mt-1">Total Tip: ${result.tipAmount.toFixed(2)}</div>
                            )}
                        </div>

                        <div className="p-8 pt-6 flex-grow bg-emerald-800/30">
                            <div className="flex justify-between items-end mb-1">
                                <h3 className="text-emerald-300 font-bold uppercase tracking-widest text-xs">Total Bill</h3>
                                {parseInt(splitCount) > 1 && <span className="text-emerald-400 text-[10px] uppercase font-bold tracking-widest">/ person</span>}
                            </div>
                            <div className="text-4xl font-black text-zinc-100 drop-shadow-md">
                                ${parseInt(splitCount) > 1 ? result.totalPerPerson.toFixed(2) : result.totalAmount.toFixed(2)}
                            </div>
                            {parseInt(splitCount) > 1 && (
                                <div className="text-emerald-400 font-medium text-sm mt-1">Grand Total: ${result.totalAmount.toFixed(2)}</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Tip Calculator", "operatingSystem": "All", "applicationCategory": "FinanceApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } }) }} />
        </div>
    );
}
