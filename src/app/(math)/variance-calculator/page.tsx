'use client';

import { useState } from 'react';

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
        </div>
    );
}
