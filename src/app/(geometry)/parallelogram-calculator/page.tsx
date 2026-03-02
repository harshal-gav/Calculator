'use client';

import { useState } from 'react';

export default function ParallelogramCalculator() {
    const [base, setBase] = useState('10');
    const [height, setHeight] = useState('5');
    const [side, setSide] = useState('6');

    const [result, setResult] = useState<{
        area: number;
        perimeter: number;
    } | null>(null);

    const calculate = () => {
        const b = parseFloat(base);
        const h = parseFloat(height);
        const s = parseFloat(side);

        let area = 0;
        let perimeter = 0;

        if (!isNaN(b) && !isNaN(h) && b > 0 && h > 0) {
            area = b * h;
        }

        if (!isNaN(b) && !isNaN(s) && b > 0 && s > 0) {
            perimeter = 2 * (b + s);
        }

        if (area > 0 || perimeter > 0) {
            setResult({ area, perimeter });
        } else {
            setResult(null);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-emerald-900 flex items-center justify-center font-serif">
                    <span className="mr-3">▱</span> Parallelogram Calculator
                </h1>
                <p className="text-emerald-700 text-lg max-w-2xl mx-auto">
                    Calculate the exact area and perimeter of any parallelogram.
                </p>
            </div>

            <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-zinc-200 mb-8 max-w-2xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div>
                        <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">Base (b)</label>
                        <input
                            type="number" step="any" min="0" value={base} onChange={(e) => setBase(e.target.value)}
                            className="w-full rounded-xl border-zinc-300 shadow-sm p-3 border focus:border-emerald-500 font-bold bg-zinc-50 text-xl"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">Height (h)</label>
                        <input
                            type="number" step="any" min="0" value={height} onChange={(e) => setHeight(e.target.value)}
                            className="w-full rounded-xl border-zinc-300 shadow-sm p-3 border focus:border-emerald-500 font-bold bg-zinc-50 text-xl"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">Slant Side</label>
                        <input
                            type="number" step="any" min="0" value={side} onChange={(e) => setSide(e.target.value)}
                            className="w-full rounded-xl border-zinc-300 shadow-sm p-3 border focus:border-emerald-500 font-bold bg-zinc-50 text-xl"
                            onKeyDown={(e) => e.key === 'Enter' && calculate()}
                        />
                    </div>
                </div>

                <div>
                    <button
                        onClick={calculate}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-emerald-600/30 uppercase tracking-widest text-lg"
                    >
                        Calculate Parallelogram
                    </button>
                    <p className="text-xs text-center text-zinc-400 font-bold mt-4 uppercase tracking-widest">
                        Base + Height for Area. Base + Slant Side for Perimeter.
                    </p>
                </div>
            </div>

            {result !== null && (
                <div className="bg-emerald-950 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 z-10 relative">
                        <div className="bg-black/30 p-6 rounded-xl border border-emerald-500/30 shadow-inner flex flex-col items-center text-center">
                            <span className="text-emerald-400 text-xs font-bold uppercase tracking-wide mb-2">Area (A) = b × h</span>
                            <div className="font-mono text-white tracking-tight font-bold text-4xl mt-2 truncate w-full">
                                {result.area > 0 ? result.area.toLocaleString('en-US', { maximumFractionDigits: 5 }) : '-'}
                            </div>
                        </div>

                        <div className="bg-black/30 p-6 rounded-xl border border-emerald-500/30 shadow-inner flex flex-col items-center text-center">
                            <span className="text-emerald-400 text-xs font-bold uppercase tracking-wide mb-2">Perimeter (P) = 2(b + a)</span>
                            <div className="font-mono text-white tracking-tight font-bold text-4xl mt-2 truncate w-full">
                                {result.perimeter > 0 ? result.perimeter.toLocaleString('en-US', { maximumFractionDigits: 5 }) : '-'}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Parallelogram Calculator", "operatingSystem": "All", "applicationCategory": "EducationalApplication" }) }} />
        </div>
    );
}
