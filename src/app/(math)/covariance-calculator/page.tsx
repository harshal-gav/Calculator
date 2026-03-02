'use client';

import { useState } from 'react';

export default function CovarianceCalculator() {
    const [xData, setXData] = useState('2, 4, 6, 8, 10');
    const [yData, setYData] = useState('3, 7, 5, 12, 14');

    const [result, setResult] = useState<{
        popCov: number;
        sampCov: number;
        meanX: number;
        meanY: number;
        count: number;
    } | null>(null);

    const [error, setError] = useState('');

    const calculate = () => {
        setError('');

        const parseData = (str: string) => str.split(',').map(s => s.trim()).filter(s => s !== '').map(Number);
        const xArr = parseData(xData);
        const yArr = parseData(yData);

        if (xArr.some(isNaN) || yArr.some(isNaN)) {
            setError("Please enter valid numbers separated by commas.");
            setResult(null);
            return;
        }

        if (xArr.length !== yArr.length) {
            setError(`Data mismatch: X has ${xArr.length} values, Y has ${yArr.length} values. They must have the same number of data points.`);
            setResult(null);
            return;
        }

        const n = xArr.length;
        if (n < 2) {
            setError("Please enter at least two data points to calculate covariance.");
            setResult(null);
            return;
        }

        const meanX = xArr.reduce((a, b) => a + b, 0) / n;
        const meanY = yArr.reduce((a, b) => a + b, 0) / n;

        let sumCrossDiff = 0;
        for (let i = 0; i < n; i++) {
            sumCrossDiff += (xArr[i] - meanX) * (yArr[i] - meanY);
        }

        const popCov = sumCrossDiff / n;
        const sampCov = sumCrossDiff / (n - 1);

        setResult({
            popCov,
            sampCov,
            meanX,
            meanY,
            count: n
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-purple-900 flex items-center justify-center font-serif">
                    <span className="mr-3">📈</span> Covariance Calculator
                </h1>
                <p className="text-purple-700 text-lg max-w-2xl mx-auto">
                    Calculate population and sample covariance for two distinct datasets (X and Y).
                </p>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-zinc-200 mb-8 max-w-3xl mx-auto">
                <div className="space-y-6 mb-8">
                    <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">Data Set X</label>
                        <p className="text-xs text-zinc-500 mb-2">Enter numbers separated by commas (e.g., 2, 4, 6, 8, 10)</p>
                        <textarea
                            value={xData} onChange={(e) => setXData(e.target.value)}
                            className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-purple-500 font-mono text-sm transition-all"
                            rows={3}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">Data Set Y</label>
                        <p className="text-xs text-zinc-500 mb-2">Enter numbers separated by commas (e.g., 3, 7, 5, 12, 14)</p>
                        <textarea
                            value={yData} onChange={(e) => setYData(e.target.value)}
                            className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-purple-500 font-mono text-sm transition-all"
                            rows={3}
                        />
                    </div>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl font-bold text-center">
                        {error}
                    </div>
                )}

                <button
                    onClick={calculate}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-purple-600/30 uppercase tracking-widest text-lg"
                >
                    Calculate Covariance
                </button>
            </div>

            {result !== null && (
                <div className="bg-purple-950 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

                    <h2 className="text-purple-300 font-bold uppercase tracking-widest text-xs mb-8 z-10 text-center">Covariance Statistics</h2>

                    <div className="w-full max-w-3xl z-10 grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-black/40 border border-purple-500/30 p-8 rounded-3xl shadow-inner text-center">
                            <span className="text-fuchsia-400 text-[10px] font-bold uppercase tracking-widest mb-3 block">Sample Covariance (n-1)</span>
                            <div className="font-mono font-black text-4xl md:text-5xl text-white break-all tracking-tight drop-shadow-lg">
                                {result.sampCov.toLocaleString('en-US', { maximumFractionDigits: 4 })}
                            </div>
                        </div>

                        <div className="bg-black/40 border border-purple-500/30 p-8 rounded-3xl shadow-inner text-center">
                            <span className="text-purple-400 text-[10px] font-bold uppercase tracking-widest mb-3 block">Population Covariance (n)</span>
                            <div className="font-mono font-black text-4xl md:text-5xl text-white break-all tracking-tight drop-shadow-lg">
                                {result.popCov.toLocaleString('en-US', { maximumFractionDigits: 4 })}
                            </div>
                        </div>
                    </div>

                    <div className="w-full max-w-2xl z-10 grid grid-cols-3 gap-4">
                        <div className="bg-black/20 p-4 rounded-xl border border-white/5 text-center">
                            <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-1 block">Data Points (N)</span>
                            <div className="font-mono text-purple-100 font-bold text-xl">{result.count}</div>
                        </div>
                        <div className="bg-black/20 p-4 rounded-xl border border-white/5 text-center">
                            <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-1 block">Mean (X̄)</span>
                            <div className="font-mono text-fuchsia-100 font-bold text-xl">{result.meanX.toLocaleString('en-US', { maximumFractionDigits: 4 })}</div>
                        </div>
                        <div className="bg-black/20 p-4 rounded-xl border border-white/5 text-center">
                            <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-1 block">Mean (Ȳ)</span>
                            <div className="font-mono text-purple-100 font-bold text-xl">{result.meanY.toLocaleString('en-US', { maximumFractionDigits: 4 })}</div>
                        </div>
                    </div>
                </div>
            )}

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Covariance Calculator", "operatingSystem": "All", "applicationCategory": "EducationalApplication" }) }} />
        </div>
    );
}
