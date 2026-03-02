'use client';

import { useState } from 'react';

export default function ConfidenceIntervalCalculator() {
    const [sampleMean, setSampleMean] = useState('100');
    const [sampleSize, setSampleSize] = useState('50');
    const [stdDev, setStdDev] = useState('15');
    const [confidenceLevel, setConfidenceLevel] = useState('95');

    const [result, setResult] = useState<{
        lowerBounds: number;
        upperBounds: number;
        marginOfError: number;
        confidenceVal: number;
    } | null>(null);

    const [error, setError] = useState('');

    const calculate = () => {
        setError('');

        const m = parseFloat(sampleMean);
        const n = parseInt(sampleSize);
        const s = parseFloat(stdDev);
        const conf = parseFloat(confidenceLevel);

        if (isNaN(m) || isNaN(n) || isNaN(s) || isNaN(conf)) {
            setError('Please enter valid numbers in all fields.');
            setResult(null);
            return;
        }

        if (n <= 1) {
            setError('Sample size must be strictly greater than 1.');
            setResult(null);
            return;
        }

        if (s < 0) {
            setError('Standard deviation cannot be negative.');
            setResult(null);
            return;
        }

        // Z-scores for standard confidence levels (assuming normal distribution, n>30 typically, but we simplify)
        let z = 1.96;
        if (conf === 99) z = 2.576;
        else if (conf === 90) z = 1.645;
        else if (conf === 95) z = 1.96;
        else if (conf === 98) z = 2.326;
        else if (conf === 80) z = 1.282;
        else if (conf === 85) z = 1.440;
        else {
            setError('Please use a standard confidence level: 80, 85, 90, 95, 98, or 99.');
            setResult(null);
            return;
        }

        const standardError = s / Math.sqrt(n);
        const marginError = z * standardError;

        setResult({
            lowerBounds: m - marginError,
            upperBounds: m + marginError,
            marginOfError: marginError,
            confidenceVal: conf
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-teal-900 flex items-center justify-center font-serif">
                    <span className="mr-3">⚖️</span> Confidence Interval
                </h1>
                <p className="text-teal-700 text-lg max-w-2xl mx-auto">
                    Calculate the confidence interval for a sample mean using standard deviation and sample size.
                </p>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-zinc-200 mb-8 max-w-2xl mx-auto">
                <div className="space-y-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">Sample Mean (x̄)</label>
                            <input
                                type="number" step="any" value={sampleMean} onChange={(e) => setSampleMean(e.target.value)}
                                className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-teal-500 font-bold font-mono text-xl transition-all outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">Sample Size (n)</label>
                            <input
                                type="number" step="1" min="2" value={sampleSize} onChange={(e) => setSampleSize(e.target.value)}
                                className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-teal-500 font-bold font-mono text-xl transition-all outline-none"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">Standard Dev (s)</label>
                            <input
                                type="number" step="any" min="0" value={stdDev} onChange={(e) => setStdDev(e.target.value)}
                                className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-teal-500 font-bold font-mono text-xl transition-all outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">Confidence Level (%)</label>
                            <select
                                value={confidenceLevel} onChange={(e) => setConfidenceLevel(e.target.value)}
                                className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-teal-500 font-bold font-mono text-xl transition-all outline-none bg-white"
                                onKeyDown={(e) => e.key === 'Enter' && calculate()}
                            >
                                <option value="80">80%</option>
                                <option value="85">85%</option>
                                <option value="90">90%</option>
                                <option value="95">95% (Standard)</option>
                                <option value="98">98%</option>
                                <option value="99">99%</option>
                            </select>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl font-bold text-center text-sm">
                        {error}
                    </div>
                )}

                <button
                    onClick={calculate}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-teal-600/30 uppercase tracking-widest text-lg"
                >
                    Calculate Interval
                </button>
            </div>

            {result !== null && (
                <div className="bg-slate-900 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-teal-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

                    <h2 className="text-teal-400 font-bold uppercase tracking-widest text-xs mb-8 z-10 text-center">{result.confidenceVal}% Confidence Interval</h2>

                    <div className="z-10 relative mb-8 w-full max-w-xl">
                        <div className="p-8 rounded-3xl border-4 bg-teal-900/40 border-teal-500/30 shadow-inner flex flex-col items-center justify-center">
                            <span className="text-teal-300 text-[10px] font-bold uppercase tracking-widest mb-3 block border-b border-teal-500/50 pb-2 w-full text-center">Interval Bounds</span>
                            <div className="font-mono font-black text-3xl md:text-5xl text-white tracking-tight drop-shadow-lg p-2 text-center break-all flex flex-col items-center gap-3">
                                <span className="text-teal-200">{result.lowerBounds.toLocaleString('en-US', { maximumFractionDigits: 4 })}</span>
                                <span className="text-xl text-teal-500/50 block">to</span>
                                <span className="text-teal-200">{result.upperBounds.toLocaleString('en-US', { maximumFractionDigits: 4 })}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-black/30 px-6 py-4 rounded-xl border border-white/5 text-center flex flex-col items-center z-10 text-sm">
                        <span className="text-white/40 font-bold uppercase tracking-widest text-[10px] mb-2 block">Margin of Error</span>
                        <span className="font-mono text-xl font-bold text-teal-300">
                            ± {result.marginOfError.toLocaleString('en-US', { maximumFractionDigits: 4 })}
                        </span>
                    </div>

                </div>
            )}

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Confidence Interval Calculator", "operatingSystem": "All", "applicationCategory": "EducationalApplication" }) }} />
        </div>
    );
}
