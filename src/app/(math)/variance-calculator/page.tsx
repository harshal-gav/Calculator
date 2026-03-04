'use client';

import { useState } from 'react';
import CalculatorSEO from '@/components/CalculatorSEO';

export default function VarianceCalculator() {
    const [dataInput, setDataInput] = useState('2, 4, 4, 4, 5, 5, 7, 9');

    const [result, setResult] = useState<{
        popVariance: number;
        sampVariance: number;
        popStdDev: number;
        sampStdDev: number;
        mean: number;
        count: number;
        sumSquares: number;
    } | null>(null);

    const [error, setError] = useState('');

    const calculate = () => {
        setError('');

        // Parse input
        const rawValues = dataInput.split(',').map(s => s.trim()).filter(s => s !== '');
        const data = rawValues.map(Number);

        if (data.some(isNaN)) {
            setError("Please enter valid numbers separated by commas.");
            setResult(null);
            return;
        }

        const n = data.length;
        if (n < 2) {
            setError("Please enter at least two numbers to calculate variance.");
            setResult(null);
            return;
        }

        // Calculate Mean
        const mean = data.reduce((sum, val) => sum + val, 0) / n;

        // Calculate Sum of Squared Differences
        let sumSquaredDiffs = 0;
        for (let i = 0; i < n; i++) {
            sumSquaredDiffs += Math.pow(data[i] - mean, 2);
        }

        // Variances
        const popVar = sumSquaredDiffs / n;
        const sampVar = sumSquaredDiffs / (n - 1);

        // Standard Deviations
        const popStdDev = Math.sqrt(popVar);
        const sampStdDev = Math.sqrt(sampVar);

        setResult({
            popVariance: popVar,
            sampVariance: sampVar,
            popStdDev,
            sampStdDev,
            mean,
            count: n,
            sumSquares: sumSquaredDiffs
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-rose-900 flex items-center justify-center font-serif">
                    <span className="mr-3">📈</span> Variance Calculator
                </h1>
                <p className="text-rose-700 text-lg max-w-2xl mx-auto">
                    Calculate Population Variance (σ²) and Sample Variance (s²) from a dataset, along with Standard Deviation.
                </p>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-zinc-200 mb-8 max-w-3xl mx-auto">
                <div className="mb-6">
                    <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">Enter Data Set</label>
                    <p className="text-xs text-zinc-500 mb-3 font-medium">Numbers separated by commas (e.g., 2, 4, 4, 4, 5, 5, 7, 9)</p>
                    <textarea
                        rows={3}
                        value={dataInput}
                        onChange={(e) => setDataInput(e.target.value)}
                        className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-rose-500 font-bold font-mono text-lg transition-all outline-none"
                    />
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl font-bold text-center text-sm">
                        {error}
                    </div>
                )}

                <button
                    onClick={calculate}
                    className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-rose-600/30 uppercase tracking-widest text-lg"
                >
                    Calculate Variance
                </button>
            </div>

            {result !== null && (
                <div className="bg-slate-900 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-rose-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

                    <h2 className="text-rose-400 font-bold uppercase tracking-widest text-xs mb-8 z-10 text-center">Variance Analysis</h2>

                    <div className="w-full max-w-3xl z-10 grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {/* Sample Stats */}
                        <div className="bg-black/40 border border-rose-500/30 p-6 rounded-3xl shadow-inner text-center">
                            <span className="text-pink-400 text-[10px] font-bold uppercase tracking-widest mb-3 block">Sample Variance (s²)</span>
                            <div className="font-mono font-black text-4xl text-white break-all tracking-tight drop-shadow-lg mb-4">
                                {result.sampVariance.toLocaleString('en-US', { maximumFractionDigits: 5 })}
                            </div>
                            <div className="bg-black/30 py-2 rounded-lg border border-white/5 inline-block px-4">
                                <span className="text-white/40 text-[10px] uppercase font-bold mr-2">Sample Std Dev (s):</span>
                                <span className="text-pink-200 font-mono font-bold">{result.sampStdDev.toLocaleString('en-US', { maximumFractionDigits: 4 })}</span>
                            </div>
                        </div>

                        {/* Population Stats */}
                        <div className="bg-black/40 border border-rose-500/30 p-6 rounded-3xl shadow-inner text-center">
                            <span className="text-rose-400 text-[10px] font-bold uppercase tracking-widest mb-3 block">Population Variance (σ²)</span>
                            <div className="font-mono font-black text-4xl text-white break-all tracking-tight drop-shadow-lg mb-4">
                                {result.popVariance.toLocaleString('en-US', { maximumFractionDigits: 5 })}
                            </div>
                            <div className="bg-black/30 py-2 rounded-lg border border-white/5 inline-block px-4">
                                <span className="text-white/40 text-[10px] uppercase font-bold mr-2">Pop. Std Dev (σ):</span>
                                <span className="text-rose-200 font-mono font-bold">{result.popStdDev.toLocaleString('en-US', { maximumFractionDigits: 4 })}</span>
                            </div>
                        </div>
                    </div>

                    <div className="w-full max-w-2xl z-10 grid grid-cols-3 gap-4">
                        <div className="bg-black/20 p-4 rounded-xl border border-white/5 text-center flex flex-col justify-center">
                            <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-1 block">Data Points (N)</span>
                            <div className="font-mono text-rose-100 font-bold text-xl">{result.count}</div>
                        </div>
                        <div className="bg-black/20 p-4 rounded-xl border border-white/5 text-center flex flex-col justify-center">
                            <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-1 block">Mean (μ / x̄)</span>
                            <div className="font-mono text-pink-100 font-bold text-xl">{result.mean.toLocaleString('en-US', { maximumFractionDigits: 4 })}</div>
                        </div>
                        <div className="bg-black/20 p-4 rounded-xl border border-white/5 text-center flex flex-col justify-center">
                            <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-1 block">Sum of Squares</span>
                            <div className="font-mono text-rose-100 font-bold text-xl">{result.sumSquares.toLocaleString('en-US', { maximumFractionDigits: 2 })}</div>
                        </div>
                    </div>
                </div>
            )}

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Variance Calculator", "operatingSystem": "All", "applicationCategory": "EducationalApplication" }) }} />

            <div className="mt-8">
                <CalculatorSEO
                    title="Variance & Standard Deviation Calculator"
                    whatIsIt={
                        <>
                            <p>The <strong>Variance Calculator</strong> precisely measures mathematical spread. By analyzing a dataset, it determines exactly how far, on average, the individual numbers are spread out or dispersed away from the average (mean).</p>
                            <p>A "low" variance means all the numbers are tightly clustered together, nearly identical. A "high" variance indicates widespread extreme volatility, with numbers scattered far from the center.</p>
                        </>
                    }
                    formula={
                        <>
                            <p>To calculate variance mathematically, you must find the distance of each number from the mean, square that distance (so negative numbers do not cancel out positives), and average those squared results. The core difference is the denominator:</p>
                            <div className="bg-rose-50 p-4 rounded-lg font-mono text-[14px] shadow-sm my-4 text-rose-900 border border-rose-100 flex flex-col gap-2">
                                <div><strong>Population (σ²):</strong> Σ (xi - μ)² / N</div>
                                <div><strong>Sample (s²):</strong> Σ (xi - x̄)² / (n - 1)</div>
                            </div>
                            <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                                <li><strong>(xi - μ)²:</strong> The squared difference between an individual data point and the mean.</li>
                                <li><strong>N:</strong> The total number of data points.</li>
                                <li><strong>(n - 1):</strong> "Bessel's Correction", used strictly for Samples to correct artificial downward bias.</li>
                            </ul>
                        </>
                    }
                    example={
                        <>
                            <p>Consider the recent test scores of a small class of 5 students: <strong>80, 85, 90, 95, 100</strong>.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                                <li><strong>1. Find the Mean:</strong> (80+85+90+95+100) / 5 = 90.</li>
                                <li><strong>2. Find Squared Differences:</strong> (80-90)² = 100. (85-90)² = 25. (90-90)² = 0. (95-90)² = 25. (100-90)² = 100.</li>
                                <li><strong>3. Sum the Squares:</strong> 100 + 25 + 0 + 25 + 100 = 250.</li>
                                <li><strong>4. Calculate Population Variance:</strong> 250 / 5 = <strong>50</strong>.</li>
                                <li><strong>5. Standard Deviation:</strong> √50 = <strong>7.07</strong> (The average test score fluctuates by 7 points).</li>
                            </ul>
                        </>
                    }
                    useCases={
                        <ul className="list-disc pl-6 space-y-4 text-gray-700">
                            <li><strong>Finance & Investing:</strong> Measuring stock market volatility. A stock with high variance is considered high risk (wild price swings), while low variance implies a stable, predictable blue-chip asset.</li>
                            <li><strong>Manufacturing Quality Control:</strong> Outputting identical machine parts. If a factory making screws has a high variance in screw length, many screws will be defective and rejected.</li>
                            <li><strong>Academic Grading:</strong> Detecting extreme outliers in student performance. If a class has an average score of 75 but a massive variance, half the class likely failed while the other half got A's.</li>
                        </ul>
                    }
                    faqs={[
                        {
                            question: "Should I use Population or Sample variance?",
                            answer: "Use Population (σ²) if your dataset contains EVERY single possible piece of data (e.g., surveying all 50 employees in your company). Use Sample (s²) if you only pulled a fraction of the data to estimate the whole (e.g., surveying 50 random citizens to predict the national election)."
                        },
                        {
                            question: "Why do we mathematically square the differences?",
                            answer: "Because we need to cancel out negative numbers. If you score 10 points below average (-10) and 10 points above average (+10), simply adding them together equals 0—implying no variance. Squaring forces all distances to be purely positive."
                        },
                        {
                            question: "How does Variance differ from Standard Deviation?",
                            answer: "Standard Deviation is simply the square root of the Variance. Variance mathematically inflates the units (e.g., 'dollars squared'), making it hard to read. Taking the square root converts the stat back into standard human-readable units."
                        }
                    ]}
                    relatedCalculators={[
                        { name: "Mean, Median, Mode", path: "/mean-median-mode-calculator", desc: "Calculate the exact mathematical center or average of your data set." },
                        { name: "Z-Score Calculator", path: "/z-score-calculator", desc: "Use your computed standard deviation to identify extreme outliers." },
                        { name: "Percentile Calculator", path: "/percentile-calculator", desc: "Identify exactly where a specific data point falls within the overall curve." }
                    ]}
                />
            </div>
        </div>
    );
}
