'use client';

import { useState } from 'react';

export default function DiscountCalculator() {
    const [originalPrice, setOriginalPrice] = useState('100');
    const [discountPercent, setDiscountPercent] = useState('25');

    // Multiple modes: standard discount, or find the discount % if we know final price
    const [mode, setMode] = useState('standard'); // standard, findDiscount
    const [finalPriceInput, setFinalPriceInput] = useState('75');

    const [result, setResult] = useState<{
        finalPrice: number;
        savedAmount: number;
        discountPercentOut?: number;
    } | null>(null);

    const calculate = () => {
        const orig = parseFloat(originalPrice);

        if (isNaN(orig) || orig < 0) {
            setResult(null);
            return;
        }

        if (mode === 'standard') {
            const perc = parseFloat(discountPercent);
            if (isNaN(perc) || perc < 0 || perc > 100) return setResult(null);

            const savedAmount = orig * (perc / 100);
            const finalPrice = orig - savedAmount;

            setResult({
                finalPrice,
                savedAmount
            });
        } else {
            const finalP = parseFloat(finalPriceInput);
            if (isNaN(finalP) || finalP < 0 || finalP > orig) return setResult(null);

            const savedAmount = orig - finalP;
            const computedPerc = (savedAmount / orig) * 100;

            setResult({
                finalPrice: finalP,
                savedAmount,
                discountPercentOut: computedPerc
            });
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-emerald-900 flex items-center justify-center font-serif">
                    <span className="mr-3">🏷️</span> Discount Calculator
                </h1>
                <p className="text-emerald-700 text-lg max-w-2xl mx-auto">
                    Calculate sale price, or figure out the exact discount percentage you're getting.
                </p>
            </div>

            <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-zinc-200 mb-8">

                <div className="mb-8 p-1 bg-zinc-100 rounded-lg flex">
                    <button
                        onClick={() => { setMode('standard'); setResult(null); }}
                        className={`flex-1 py-3 text-sm font-bold uppercase tracking-wider rounded-md transition-colors ${mode === 'standard' ? 'bg-white text-emerald-700 shadow border border-zinc-200' : 'text-zinc-500'}`}
                    >
                        Calculate Final Price
                    </button>
                    <button
                        onClick={() => { setMode('findDiscount'); setResult(null); }}
                        className={`flex-1 py-3 text-sm font-bold uppercase tracking-wider rounded-md transition-colors ${mode === 'findDiscount' ? 'bg-white text-emerald-700 shadow border border-zinc-200' : 'text-zinc-500'}`}
                    >
                        Calculate Discount %
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">

                    <div>
                        <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">Original Price</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-zinc-400">$</span>
                            <input
                                type="number" step="any" min="0"
                                value={originalPrice}
                                onChange={(e) => setOriginalPrice(e.target.value)}
                                className="w-full rounded-xl border-zinc-300 shadow-sm p-4 pl-8 border focus:border-emerald-500 font-bold bg-zinc-50 text-xl"
                            />
                        </div>
                    </div>

                    {mode === 'standard' ? (
                        <div>
                            <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">Discount Percentage</label>
                            <div className="relative">
                                <input
                                    type="number" step="any" min="0" max="100"
                                    value={discountPercent}
                                    onChange={(e) => setDiscountPercent(e.target.value)}
                                    className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-emerald-500 font-bold bg-zinc-50 text-xl"
                                    onKeyDown={(e) => e.key === 'Enter' && calculate()}
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-zinc-400">% off</span>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">Final Sale Price</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-zinc-400">$</span>
                                <input
                                    type="number" step="any" min="0"
                                    value={finalPriceInput}
                                    onChange={(e) => setFinalPriceInput(e.target.value)}
                                    className="w-full rounded-xl border-zinc-300 shadow-sm p-4 pl-8 border focus:border-emerald-500 font-bold bg-zinc-50 text-xl"
                                    onKeyDown={(e) => e.key === 'Enter' && calculate()}
                                />
                            </div>
                        </div>
                    )}

                </div>

                <div className="mt-8">
                    <button
                        onClick={calculate}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-emerald-600/30 uppercase tracking-widest text-lg"
                    >
                        Calculate
                    </button>
                </div>
            </div>

            {result && (
                <div className="bg-emerald-950 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-evenly text-center gap-8">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

                    <div className="z-10 flex flex-col items-center">
                        <span className="text-zinc-400 text-xs font-bold uppercase tracking-wide mb-2">Amount Saved</span>
                        <div className="flex items-baseline text-emerald-400 px-4 py-2">
                            <span className="text-xl mr-1 font-bold">$</span>
                            <span className="text-4xl font-black font-mono">{result.savedAmount.toFixed(2)}</span>
                        </div>
                    </div>

                    {mode === 'findDiscount' && result.discountPercentOut !== undefined && (
                        <div className="z-10 flex flex-col items-center bg-rose-900/40 p-6 rounded-xl border border-rose-500/20">
                            <span className="text-rose-300 text-xs font-bold uppercase tracking-wide mb-2">Discount Percent</span>
                            <div className="flex items-baseline text-rose-100">
                                <span className="text-5xl font-black font-mono">{result.discountPercentOut.toFixed(2)}</span>
                                <span className="text-2xl ml-1 font-bold">%</span>
                            </div>
                        </div>
                    )}

                    {mode === 'standard' && (
                        <div className="z-10 flex flex-col items-center bg-emerald-900/60 p-6 rounded-xl border border-emerald-500/30 shadow-inner">
                            <span className="text-emerald-400 text-xs font-bold uppercase tracking-wide mb-2">Final Sale Price</span>
                            <div className="flex items-baseline text-white">
                                <span className="text-2xl mr-1 font-bold text-emerald-400">$</span>
                                <span className="text-5xl font-black font-mono">{result.finalPrice.toFixed(2)}</span>
                            </div>
                        </div>
                    )}
                </div>
            )}

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Discount Calculator", "operatingSystem": "All", "applicationCategory": "ShoppingApplication" }) }} />
        </div>
    );
}
