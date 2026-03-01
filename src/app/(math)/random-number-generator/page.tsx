'use client';

import { useState } from 'react';

export default function RandomNumberGenerator() {
    const [min, setMin] = useState('1');
    const [max, setMax] = useState('100');
    const [count, setCount] = useState('1');
    const [allowDuplicates, setAllowDuplicates] = useState(true);

    const [results, setResults] = useState<number[]>([]);
    const [errorMsg, setErrorMsg] = useState('');

    const generateNumbers = () => {
        setErrorMsg('');
        const minVal = parseInt(min);
        const maxVal = parseInt(max);
        const qty = parseInt(count);

        if (isNaN(minVal) || isNaN(maxVal) || isNaN(qty)) {
            setErrorMsg('Please enter valid integers.');
            return;
        }

        if (minVal >= maxVal) {
            setErrorMsg('Minimum must be less than maximum.');
            return;
        }

        if (qty < 1 || qty > 10000) {
            setErrorMsg('Count must be between 1 and 10,000.');
            return;
        }

        if (!allowDuplicates && qty > (maxVal - minVal + 1)) {
            setErrorMsg(`Cannot generate ${qty} unique numbers between ${minVal} and ${maxVal}.`);
            return;
        }

        const newResults: number[] = [];
        const used = new Set<number>();

        for (let i = 0; i < qty; i++) {
            let num;
            if (allowDuplicates) {
                num = Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
                newResults.push(num);
            } else {
                do {
                    num = Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
                } while (used.has(num));
                used.add(num);
                newResults.push(num);
            }
        }

        setResults(newResults);
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <h1 className="text-4xl font-extrabold mb-4 text-purple-900 border-b pb-4">Random Number Generator</h1>
            <p className="mb-8 text-gray-600 text-lg">
                Generate true random numbers instantly. Customize the range, quantity, and duplication rules.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Inputs */}
                <div className="md:col-span-5 bg-purple-50 p-6 rounded-xl border border-purple-100">
                    <div className="space-y-5">
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Min Value</label>
                                <input type="number" value={min} onChange={(e) => setMin(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-purple-500 font-bold" />
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Max Value</label>
                                <input type="number" value={max} onChange={(e) => setMax(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-purple-500 font-bold" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">How many numbers?</label>
                            <input type="number" value={count} onChange={(e) => setCount(e.target.value)} className="w-full text-lg rounded-lg border-gray-300 p-3 shadow-sm focus:border-purple-500" />
                        </div>

                        <label className="flex items-center gap-3 cursor-pointer p-3 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition">
                            <input type="checkbox" checked={allowDuplicates} onChange={(e) => setAllowDuplicates(e.target.checked)} className="w-5 h-5 text-purple-600 rounded" />
                            <span className="text-gray-700 font-medium">Allow Duplicates</span>
                        </label>

                        {errorMsg && <div className="text-red-600 text-sm font-bold bg-red-50 p-3 rounded-lg">{errorMsg}</div>}

                        <button onClick={generateNumbers} className="w-full bg-purple-600 text-white font-bold py-4 rounded-xl hover:bg-purple-700 transition shadow-lg uppercase tracking-wide">
                            Generate
                        </button>
                    </div>
                </div>

                {/* Results Screen */}
                <div className="md:col-span-7 bg-white border-2 border-purple-100 rounded-xl p-8 flex flex-col justify-center items-center shadow-sm min-h-[300px]">
                    {results.length > 0 ? (
                        <div className="w-full h-full">
                            <div className="flex justify-between items-end border-b border-purple-100 pb-2 mb-4">
                                <h3 className="text-gray-500 font-semibold uppercase tracking-wider text-xs">Results ({results.length})</h3>
                                <button onClick={() => navigator.clipboard.writeText(results.join(', '))} className="text-purple-600 text-xs font-bold hover:underline">Copy All</button>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-[400px] overflow-y-auto pr-2">
                                {results.map((num, i) => (
                                    <div key={i} className="bg-purple-50 text-purple-900 font-black text-2xl py-3 px-2 rounded-lg text-center border border-purple-200">
                                        {num}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="text-purple-300 text-6xl font-black opacity-20 text-center animate-pulse">
                            ???
                        </div>
                    )}
                </div>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Random Number Generator", "operatingSystem": "All", "applicationCategory": "UtilitiesApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } }) }} />
        </div>
    );
}
