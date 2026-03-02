'use client';

import { useState } from 'react';
import CalculatorSEO from '@/components/CalculatorSEO';

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

            <CalculatorSEO
                title="Standard Deviation Calculator"
                whatIsIt={
                    <>
                        <p>Our <strong>Standard Deviation Calculator</strong> is a statistical analysis tool that measures the amount of variation or dispersion in a set of numerical values. Essentially, it tells you how spread out your data is from the mathematical average (the mean).</p>
                        <p>A low standard deviation means most of your numbers are clustered tightly around the average, indicating consistency. A high standard deviation means your numbers are spread out over a wide range, indicating high volatility or variance.</p>
                    </>
                }
                formula={
                    <>
                        <p>The calculation requires first finding the Mean, then finding the squared differences (Variance), and finally taking the square root. Crucially, the formula changes slightly depending on if your data is a Sample or the entire Population:</p>
                        <div className="bg-white p-4 rounded-lg font-mono text-center text-lg shadow-sm my-4 overflow-x-auto space-y-4 text-cyan-900 border border-cyan-100">
                            <p><strong>Sample (N-1):</strong> <em>s</em> = √( Σ(x - x̄)² / (n - 1) )</p>
                            <p><strong>Population (N):</strong> <em>σ</em> = √( Σ(x - μ)² / N )</p>
                        </div>
                        <p className="mt-4"><strong>Note:</strong> We automatically default to the <em>Sample (N-1)</em> formula as it provides an unbiased estimate of population variance, which is what 95% of real-world statistical applications require.</p>
                    </>
                }
                example={
                    <>
                        <p>Let's find the Standard Deviation of five test scores: <strong>85, 90, 88, 92, and 85</strong>.</p>
                        <ul className="list-disc pl-6 space-y-2 mt-4">
                            <li><strong>Step 1 (Find the Mean):</strong> (85+90+88+92+85) / 5 = <strong>88</strong>.</li>
                            <li><strong>Step 2 (Find the Deviations):</strong> Subtract the mean from each score: (-3, 2, 0, 4, -3).</li>
                            <li><strong>Step 3 (Square them):</strong> (9, 4, 0, 16, 9).</li>
                            <li><strong>Step 4 (Find Variance):</strong> Sum them up (38) and divide by N-1 (4). Variance = <strong>9.5</strong>.</li>
                            <li><strong>Step 5 (Square Root):</strong> √9.5 = <strong>3.08</strong> Standard Deviation.</li>
                        </ul>
                    </>
                }
                useCases={
                    <ul className="list-disc pl-6 space-y-4">
                        <li><strong>Finance & Investing:</strong> Measuring the historic volatility of a mutual fund or stock. High standard deviation implies a high-risk, high-reward investment.</li>
                        <li><strong>Manufacturing & Quality Control:</strong> Ensuring factory machines are producing parts to the exact millimeter. A low deviation means high consistency on the assembly line.</li>
                        <li><strong>Meteorology:</strong> Analyzing daily temperature fluctuations to determine if a specific month is experiencing unusually extreme weather compared to historical averages.</li>
                        <li><strong>Education:</strong> Grading "on a curve" by determining how far above or below the class average a specific student's test score lies.</li>
                    </ul>
                }
                faqs={[
                    {
                        question: "Should I use the Sample or Population formula?",
                        answer: "Use 'Population' ONLY if your data contains every single member of the group you are studying (e.g., the heights of every player currently in the NBA). Use 'Sample' if your data is just a subset representing a larger group (e.g., the heights of 100 random people at the mall). When in doubt, use Sample."
                    },
                    {
                        question: "What is Variance?",
                        answer: "Variance is simply the Standard Deviation squared. It is the intermediate step in the formula. While mathematically useful, Variance is measured in 'squared units' (like 'squared dollars' or 'squared degrees'), which makes it hard to interpret intuitively. Taking the square root gives you the Standard Deviation, which returns the measurement to its original units."
                    },
                    {
                        question: "Can standard deviation be negative?",
                        answer: "No. Because the formula requires squaring the differences (which turns all negatives into positives) and then taking the principal square root, standard deviation can never be a negative number. The absolute minimum is zero, which only occurs if every single number in your dataset is exactly the same."
                    }
                ]}
                relatedCalculators={[
                    { name: "Percentage Calculator", path: "/percentage-calculator", desc: "Easily compute advanced percentage problems in one click." },
                    { name: "Fraction Calculator", path: "/fraction-calculator", desc: "Add, subtract, multiply, and divide standard fractions." },
                    { name: "Random Number Generator", path: "/random-number-generator", desc: "Generate true random numbers within custom ranges." }
                ]}
            />
        </div>
    );
}
