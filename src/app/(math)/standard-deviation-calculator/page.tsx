'use client';

import { useState } from 'react';

export default function StandardDeviationCalculator() {
    const [inputData, setInputData] = useState('10, 12, 23, 23, 16, 23, 21, 16');
    const [isPopulation, setIsPopulation] = useState(false); // sample vs population

    const [results, setResults] = useState<{
        count: number;
        sum: number;
        mean: number;
        variance: number;
        stdDev: number;
        min: number;
        max: number;
    } | null>(null);
    const [errorMsg, setErrorMsg] = useState('');

    const calculateStats = () => {
        setErrorMsg('');
        // Parse the input string into an array of numbers
        const arr = inputData.split(/[\s,]+/).filter(x => x.length > 0).map(Number);

        if (arr.some(isNaN)) {
            setErrorMsg('Please enter a valid list of numbers separated by commas or spaces.');
            return;
        }

        const count = arr.length;
        if (count < 2) {
            setErrorMsg('Please enter at least two numbers to calculate standard deviation.');
            return;
        }

        const sum = arr.reduce((a, b) => a + b, 0);
        const mean = sum / count;

        // Calculate variance
        const squareDiffs = arr.map(value => {
            const diff = value - mean;
            return diff * diff;
        });

        const sumSquareDiffs = squareDiffs.reduce((a, b) => a + b, 0);

        // Sample standard deviation uses N-1, Population uses N
        const denominator = isPopulation ? count : (count - 1);
        const variance = sumSquareDiffs / denominator;
        const stdDev = Math.sqrt(variance);

        const min = Math.min(...arr);
        const max = Math.max(...arr);

        setResults({
            count,
            sum,
            mean,
            variance,
            stdDev,
            min,
            max
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <h1 className="text-4xl font-extrabold mb-4 text-cyan-900 border-b pb-4">Standard Deviation Calculator</h1>
            <p className="mb-8 text-gray-600 text-lg">
                Calculate the standard deviation, variance, mean, and sum of a data set.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="bg-cyan-50 p-6 rounded-xl border border-cyan-100">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Enter data values (separated by commas or spaces)</label>
                            <textarea
                                value={inputData}
                                onChange={(e) => setInputData(e.target.value)}
                                rows={4}
                                className="w-full rounded-lg border-gray-300 p-4 shadow-sm focus:border-cyan-500 text-lg font-medium"
                                placeholder="e.g. 1.2, 3.4, 5.6"
                            />
                        </div>

                        <div className="flex gap-4">
                            <label className={`flex-1 flex justify-center items-center p-3 rounded-lg border cursor-pointer font-bold transition ${!isPopulation ? 'bg-cyan-600 border-cyan-700 text-white shadow-inner' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                                <input type="radio" checked={!isPopulation} onChange={() => setIsPopulation(false)} className="hidden" />
                                Sample (N-1)
                            </label>
                            <label className={`flex-1 flex justify-center items-center p-3 rounded-lg border cursor-pointer font-bold transition ${isPopulation ? 'bg-cyan-600 border-cyan-700 text-white shadow-inner' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                                <input type="radio" checked={isPopulation} onChange={() => setIsPopulation(true)} className="hidden" />
                                Population (N)
                            </label>
                        </div>

                        {errorMsg && <div className="text-red-600 text-sm font-bold bg-red-50 p-3 rounded-lg">{errorMsg}</div>}

                        <button onClick={calculateStats} className="w-full bg-cyan-600 text-white font-bold py-4 rounded-xl hover:bg-cyan-700 transition shadow-lg uppercase tracking-wide">
                            Calculate Statistics
                        </button>
                    </div>
                </div>

                {/* Results Screen */}
                <div className="bg-white border-2 border-cyan-100 rounded-xl overflow-hidden shadow-sm">
                    {results !== null ? (
                        <table className="min-w-full text-left">
                            <tbody className="divide-y divide-gray-100 text-lg">
                                <tr className="bg-cyan-600 text-white">
                                    <td className="px-6 py-5 font-bold">Standard Deviation</td>
                                    <td className="px-6 py-5 font-black text-right text-2xl">{parseFloat(results.stdDev.toFixed(5))}</td>
                                </tr>
                                <tr className="bg-cyan-50">
                                    <td className="px-6 py-4 font-semibold text-gray-600">Variance</td>
                                    <td className="px-6 py-4 font-black text-cyan-800 text-right">{parseFloat(results.variance.toFixed(5))}</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-medium text-gray-500">Mean (Average)</td>
                                    <td className="px-6 py-4 font-bold text-gray-800 text-right">{parseFloat(results.mean.toFixed(5))}</td>
                                </tr>
                                <tr className="bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-500">Count (N)</td>
                                    <td className="px-6 py-4 font-bold text-gray-800 text-right">{results.count}</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-medium text-gray-500">Sum (Σx)</td>
                                    <td className="px-6 py-4 font-bold text-gray-800 text-right">{parseFloat(results.sum.toFixed(5))}</td>
                                </tr>
                                <tr className="bg-gray-50">
                                    <td className="px-6 py-3 font-medium text-gray-500 text-sm">Min / Max</td>
                                    <td className="px-6 py-3 font-bold text-gray-800 text-right text-sm">{results.min} / {results.max}</td>
                                </tr>
                            </tbody>
                        </table>
                    ) : (
                        <div className="h-full flex items-center justify-center p-8 text-center text-cyan-400 font-medium">
                            Enter your dataset and hit calculate to see the full statistical breakdown.
                        </div>
                    )}
                </div>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Standard Deviation Calculator", "operatingSystem": "All", "applicationCategory": "EducationalApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } }) }} />
        </div>
    );
}
