'use client';

import { useState } from 'react';

export default function DiscountCalculator() {
    const [originalPrice, setOriginalPrice] = useState('100');
    const [discountType, setDiscountType] = useState('percentage'); // or 'amount'
    const [discountValue, setDiscountValue] = useState('20');

    // Optional additional discount (e.g., an extra 10% off the reduced price)
    const [extraDiscount, setExtraDiscount] = useState('0');

    const [result, setResult] = useState<{
        finalPrice: number;
        totalSaved: number;
        effectiveDiscountPercent: number;
    } | null>(null);

    const calculateDiscount = () => {
        const price = parseFloat(originalPrice) || 0;
        const discount = parseFloat(discountValue) || 0;
        const extra = parseFloat(extraDiscount) || 0;

        if (price > 0) {
            let firstDiscountAmount = 0;

            if (discountType === 'percentage') {
                firstDiscountAmount = price * (discount / 100);
            } else {
                firstDiscountAmount = discount; // Flat amount
            }

            // Price after first discount
            const reducedPrice1 = Math.max(0, price - firstDiscountAmount);

            // Calculate extra stacked discount (which applies to the NEW price, not original)
            const extraDiscountAmount = reducedPrice1 * (extra / 100);

            const finalPrice = Math.max(0, reducedPrice1 - extraDiscountAmount);
            const totalSaved = price - finalPrice;

            // Avoid division by zero
            const effectivePercent = price > 0 ? (totalSaved / price) * 100 : 0;

            setResult({
                finalPrice,
                totalSaved,
                effectiveDiscountPercent: effectivePercent
            });
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <h1 className="text-4xl font-extrabold mb-4 text-pink-900 border-b pb-4">Discount Calculator</h1>
            <p className="mb-8 text-gray-600 text-lg">
                Calculate your final price and exact savings after single or stacked store discounts.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="bg-pink-50 p-6 rounded-xl border border-pink-100 space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Original Price ($)</label>
                        <input type="number" value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-pink-500 font-bold text-xl text-gray-800 bg-white" />
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-pink-100 shadow-sm relative">
                        <div className="absolute top-0 right-0 -mt-3 mr-4 bg-pink-100 text-pink-800 text-xs font-bold uppercase tracking-widest px-2 py-1 rounded shadow-sm">Primary Discount</div>
                        <div className="grid grid-cols-5 gap-2 mt-2">
                            <div className="col-span-3">
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Value</label>
                                <input type="number" value={discountValue} onChange={(e) => setDiscountValue(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-pink-500 font-bold text-lg" />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Type</label>
                                <select value={discountType} onChange={(e) => setDiscountType(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-pink-500 font-bold text-gray-700 h-[52px]">
                                    <option value="percentage">% Off</option>
                                    <option value="amount">$ Off</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Extra Discount Percentage (optional)</label>
                        <input type="number" value={extraDiscount} onChange={(e) => setExtraDiscount(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-pink-500 font-medium" />
                        <p className="text-xs text-gray-500 mt-1">Example: A clearance item that's "take an additional 10% off"</p>
                    </div>

                    <button onClick={calculateDiscount} className="w-full bg-pink-600 text-white font-bold py-4 rounded-xl hover:bg-pink-700 transition shadow-lg uppercase tracking-wide mt-2">
                        Calculate Savings
                    </button>
                </div>

                {/* Results Screen */}
                <div className="bg-white border-2 border-pink-100 rounded-xl overflow-hidden shadow-sm flex flex-col justify-center p-8">
                    {result !== null ? (
                        <div className="w-full text-center space-y-8">
                            <div>
                                <h3 className="text-pink-800 font-semibold uppercase tracking-wider text-sm mb-2">Final Price You Pay</h3>
                                <div className="text-6xl font-black text-gray-900 border-b border-pink-100 pb-4">
                                    ${result.finalPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-left">
                                <div className="bg-green-50 p-4 rounded-xl border border-green-100 shadow-inner">
                                    <h4 className="text-green-800 font-bold uppercase text-xs mb-1">Total Amount Saved</h4>
                                    <p className="text-2xl font-black text-green-700">${result.totalSaved.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                    <h4 className="text-gray-500 font-bold uppercase text-[10px] tracking-wider mb-1">Effective Total Discount</h4>
                                    <p className="text-2xl font-bold text-gray-800">{result.effectiveDiscountPercent.toFixed(1)}%</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex items-center justify-center text-center text-pink-300 font-medium">
                            Stack your discounts and see exactly how much cash you keep in your wallet.
                        </div>
                    )}
                </div>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Discount Calculator", "operatingSystem": "All", "applicationCategory": "ShoppingApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } }) }} />
        </div>
    );
}
