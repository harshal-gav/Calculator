'use client';

import { useState } from 'react';

export default function MeanMedianModeCalculator() {
    const [inputData, setInputData] = useState('10, 20, 30, 40, 50, 50, 60');

    const [result, setResult] = useState<{
        mean: number;
        median: number;
        modes: number[];
        range: number;
        count: number;
        sum: number;
        sorted: number[];
    } | null>(null);

    const calculateStats = () => {
        // Parse input safely
        const rawValues = inputData.split(/[\s,]+/).filter(Boolean);
        const numbers = rawValues.map(v => parseFloat(v)).filter(v => !isNaN(v));

        if (numbers.length === 0) {
            setResult(null);
            return;
        }

        const count = numbers.length;
        const sum = numbers.reduce((a, b) => a + b, 0);
        const mean = sum / count;

        // Sort ascending for median and range
        const sorted = [...numbers].sort((a, b) => a - b);

        let median = 0;
        if (count % 2 === 0) {
            median = (sorted[(count / 2) - 1] + sorted[count / 2]) / 2;
        } else {
            median = sorted[Math.floor(count / 2)];
        }

        const range = sorted[count - 1] - sorted[0];

        // Mode
        const frequency: Record<number, number> = {};
        let maxFreq = 0;
        numbers.forEach(num => {
            frequency[num] = (frequency[num] || 0) + 1;
            if (frequency[num] > maxFreq) maxFreq = frequency[num];
        });

        const modes = [];
        for (const num in frequency) {
            if (frequency[num] === maxFreq) {
                modes.push(parseFloat(num));
            }
        }

        // If all numbers appear the exact same number of times and freq > 0, it means no specific mode formally.
        // We'll just return the array anyway, UI handles "All numbers appear..."

        setResult({
            mean,
            median,
            modes: modes.sort((a, b) => a - b),
            range,
            count,
            sum,
            sorted
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <h1 className="text-4xl font-extrabold mb-4 text-indigo-700 border-b pb-4">Mean, Median, Mode Calculator</h1>
            <p className="mb-8 text-gray-600 text-lg">
                Enter a raw data set to instantly calculate its central tendencies, range, sum, processing count, and sorted order.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100 space-y-6 flex flex-col justify-center">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Enter Data Values (separated by commas or spaces)</label>
                        <textarea
                            value={inputData}
                            onChange={(e) => setInputData(e.target.value)}
                            className="w-full rounded-xl border-gray-300 p-4 shadow-sm focus:border-indigo-500 font-mono text-lg text-gray-800 h-40 resize-none"
                            placeholder="e.g. 12, 18, 24, 33"
                        ></textarea>
                        <p className="text-xs text-gray-500 mt-2 font-medium">Invalid or empty entries are automatically stripped.</p>
                    </div>

                    <button onClick={calculateStats} className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-700 transition shadow-lg uppercase tracking-wide mt-2">
                        Calculate Statistics
                    </button>
                </div>

                {/* Results Screen */}
                <div className="bg-white border-2 border-indigo-100 rounded-xl overflow-hidden shadow-sm flex flex-col justify-center">
                    {result !== null ? (
                        <div className="w-full h-full flex flex-col">
                            {/* Top Core Metrics */}
                            <div className="grid grid-cols-3 gap-0 border-b border-indigo-100">
                                <div className="p-6 text-center border-r border-indigo-50 bg-indigo-500 text-white">
                                    <h3 className="text-indigo-200 font-bold uppercase tracking-widest text-[10px] mb-1">Mean</h3>
                                    <div className="text-2xl font-black">{result.mean.toLocaleString('en-US', { maximumFractionDigits: 4 })}</div>
                                </div>
                                <div className="p-6 text-center border-r border-indigo-50 bg-indigo-600 text-white shadow-inner z-10">
                                    <h3 className="text-indigo-200 font-bold uppercase tracking-widest text-[10px] mb-1">Median</h3>
                                    <div className="text-3xl font-black">{result.median.toLocaleString('en-US', { maximumFractionDigits: 4 })}</div>
                                </div>
                                <div className="p-6 text-center bg-indigo-700 text-white">
                                    <h3 className="text-indigo-200 font-bold uppercase tracking-widest text-[10px] mb-1">Mode</h3>
                                    <div className="text-2xl font-black overflow-hidden text-ellipsis whitespace-nowrap" title={result.modes.join(', ')}>
                                        {result.count === result.modes.length ? 'None' : result.modes.map(n => n.toLocaleString('en-US', { maximumFractionDigits: 4 })).join(', ')}
                                    </div>
                                </div>
                            </div>

                            {/* Secondary Metrics */}
                            <div className="p-6 flex-grow bg-gray-50 space-y-3">
                                <div className="flex justify-between items-center p-3 rounded-lg bg-white border border-gray-200 shadow-sm">
                                    <span className="font-bold text-gray-500 uppercase text-xs tracking-widest">Range</span>
                                    <span className="font-black text-xl text-gray-800">{result.range.toLocaleString('en-US', { maximumFractionDigits: 4 })}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 rounded-lg bg-white border border-gray-200 shadow-sm">
                                    <span className="font-bold text-gray-500 uppercase text-xs tracking-widest">Sum</span>
                                    <span className="font-bold text-lg text-gray-800">{result.sum.toLocaleString('en-US', { maximumFractionDigits: 4 })}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 rounded-lg bg-white border border-gray-200 shadow-sm">
                                    <span className="font-bold text-gray-500 uppercase text-xs tracking-widest">Valid Count</span>
                                    <span className="font-bold text-lg text-gray-800">{result.count}</span>
                                </div>

                                <div className="mt-4 pt-4 border-t border-gray-200">
                                    <span className="block font-bold text-gray-400 uppercase text-[10px] tracking-widest mb-2">Sorted Data Set</span>
                                    <div className="w-full max-h-24 overflow-y-auto bg-gray-100 p-3 rounded border border-gray-200 font-mono text-xs text-gray-600 leading-relaxed break-all">
                                        {result.sorted.join(', ')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex items-center justify-center text-center text-indigo-300 font-medium px-8 text-lg leading-relaxed py-10">
                            Provide a sequence of numbers to instantly break down the statistical distribution of the dataset.
                        </div>
                    )}
                </div>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Mean, Median, Mode Calculator", "operatingSystem": "All", "applicationCategory": "EducationalApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } }) }} />
        </div>
    );
}
