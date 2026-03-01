'use client';

import { useState } from 'react';

export default function TrapezoidCalculator() {
    const [baseA, setBaseA] = useState('10');
    const [baseB, setBaseB] = useState('15');
    const [height, setHeight] = useState('8');

    // Optional side lengths for perimeter
    const [sideC, setSideC] = useState('');
    const [sideD, setSideD] = useState('');

    const [results, setResults] = useState<{
        area: number;
        median: number;
        perimeter: number | null;
    } | null>(null);

    const calculate = () => {
        const a = parseFloat(baseA);
        const b = parseFloat(baseB);
        const h = parseFloat(height);

        if (isNaN(a) || isNaN(b) || isNaN(h) || a <= 0 || b <= 0 || h <= 0) {
            setResults(null);
            return;
        }

        const area = ((a + b) / 2) * h;
        const median = (a + b) / 2;

        const c = parseFloat(sideC);
        const d = parseFloat(sideD);

        let perimeter = null;
        if (!isNaN(c) && !isNaN(d) && c > 0 && d > 0) {
            perimeter = a + b + c + d;
        }

        setResults({ area, median, perimeter });
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-emerald-900 flex items-center justify-center font-serif">
                    <span className="mr-3">📐</span> Trapezoid Calculator
                </h1>
                <p className="text-emerald-700 text-lg max-w-2xl mx-auto">
                    Calculate the area, median, and perimeter of a trapezoid instantly.
                </p>
            </div>

            <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-zinc-200 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">Base (a)</label>
                        <input
                            type="number" step="any" min="0"
                            value={baseA}
                            onChange={(e) => setBaseA(e.target.value)}
                            className="w-full rounded-xl border-zinc-300 shadow-sm p-3 border focus:border-emerald-500 font-bold"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">Base (b)</label>
                        <input
                            type="number" step="any" min="0"
                            value={baseB}
                            onChange={(e) => setBaseB(e.target.value)}
                            className="w-full rounded-xl border-zinc-300 shadow-sm p-3 border focus:border-emerald-500 font-bold"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">Height (h)</label>
                        <input
                            type="number" step="any" min="0"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            className="w-full rounded-xl border-zinc-300 shadow-sm p-3 border focus:border-emerald-500 font-bold"
                        />
                    </div>
                </div>

                <div className="border-t border-zinc-100 pt-6 mt-2 mb-6">
                    <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-4">Optional: Side Lengths (for Perimeter)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-zinc-400 mb-2 uppercase tracking-wide">Side (c)</label>
                            <input
                                type="number" step="any" min="0"
                                value={sideC}
                                onChange={(e) => setSideC(e.target.value)}
                                className="w-full rounded-xl border-zinc-200 bg-zinc-50 shadow-sm p-3 border focus:border-emerald-500 font-bold text-zinc-500"
                                placeholder="Optional"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-zinc-400 mb-2 uppercase tracking-wide">Side (d)</label>
                            <input
                                type="number" step="any" min="0"
                                value={sideD}
                                onChange={(e) => setSideD(e.target.value)}
                                className="w-full rounded-xl border-zinc-200 bg-zinc-50 shadow-sm p-3 border focus:border-emerald-500 font-bold text-zinc-500"
                                placeholder="Optional"
                                onKeyDown={(e) => e.key === 'Enter' && calculate()}
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <button
                        onClick={calculate}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-emerald-600/30 uppercase tracking-widest"
                    >
                        Calculate Trapezoid
                    </button>
                </div>
            </div>

            {results && (
                <div className="bg-emerald-950 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

                    <h2 className="text-emerald-400 font-bold uppercase tracking-widest text-xs mb-6 z-10">Calculated Results</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full z-10 max-w-xl">
                        <div className="bg-emerald-900/60 p-4 rounded-xl border border-emerald-500/30 flex justify-between items-center shadow-inner md:col-span-2">
                            <span className="text-emerald-400 text-lg font-bold uppercase tracking-wide">Area (A)</span>
                            <span className="font-mono text-white font-bold text-4xl">{results.area.toFixed(4)}</span>
                        </div>
                        <div className="bg-black/30 p-4 rounded-xl border border-white/10 flex justify-between items-center">
                            <span className="text-zinc-400 text-xs font-bold uppercase tracking-wide">Median (m)</span>
                            <span className="font-mono text-emerald-100 font-bold text-xl">{results.median.toFixed(4)}</span>
                        </div>

                        {results.perimeter !== null ? (
                            <div className="bg-black/30 p-4 rounded-xl border border-white/10 flex justify-between items-center">
                                <span className="text-zinc-400 text-xs font-bold uppercase tracking-wide">Perimeter (P)</span>
                                <span className="font-mono text-emerald-100 font-bold text-xl">{results.perimeter.toFixed(4)}</span>
                            </div>
                        ) : (
                            <div className="bg-black/10 p-4 rounded-xl border border-white/5 flex justify-center items-center opacity-50">
                                <span className="text-zinc-500 text-xs font-bold uppercase tracking-wide text-center">Missing Side Lengths for Perimeter</span>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <div className="mt-8 bg-zinc-100 p-6 rounded-xl border border-zinc-200 text-sm text-zinc-600 max-w-2xl mx-auto space-y-2">
                <p className="font-bold text-zinc-800 uppercase tracking-widest mb-4">Formulas</p>
                <ul className="list-disc pl-5 space-y-1 font-mono">
                    <li>Area = ½ × (a + b) × h</li>
                    <li>Median = ½ × (a + b)</li>
                    <li>Perimeter = a + b + c + d</li>
                </ul>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Trapezoid Calculator", "operatingSystem": "All", "applicationCategory": "EducationalApplication" }) }} />
        </div>
    );
}
