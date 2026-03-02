'use client';

import { useState } from 'react';

export default function PrismCalculator() {
    const [baseArea, setBaseArea] = useState('50');
    const [basePerimeter, setBasePerimeter] = useState('30');
    const [height, setHeight] = useState('10');

    const [result, setResult] = useState<{
        volume: number;
        lateralArea: number;
        surfaceArea: number;
    } | null>(null);

    const calculate = () => {
        const a = parseFloat(baseArea);
        const p = parseFloat(basePerimeter);
        const h = parseFloat(height);

        if (isNaN(a) || isNaN(p) || isNaN(h) || a <= 0 || p <= 0 || h <= 0) {
            setResult(null);
            return;
        }

        const volume = a * h;
        const lateralArea = p * h;
        const surfaceArea = 2 * a + lateralArea;

        setResult({
            volume,
            lateralArea,
            surfaceArea
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-cyan-900 flex items-center justify-center font-serif">
                    <span className="mr-3">🧊</span> Prism Calculator
                </h1>
                <p className="text-cyan-700 text-lg max-w-2xl mx-auto">
                    Calculate the total volume, lateral surface area, and total surface area of any right prism.
                </p>
            </div>

            <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-zinc-200 mb-8 max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div>
                        <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">Base Area (B)</label>
                        <input
                            type="number" step="any" min="0" value={baseArea} onChange={(e) => setBaseArea(e.target.value)}
                            className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-cyan-500 font-bold bg-zinc-50 text-xl"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">Base Perimeter (p)</label>
                        <input
                            type="number" step="any" min="0" value={basePerimeter} onChange={(e) => setBasePerimeter(e.target.value)}
                            className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-cyan-500 font-bold bg-zinc-50 text-xl"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">Prism Height (h)</label>
                        <input
                            type="number" step="any" min="0" value={height} onChange={(e) => setHeight(e.target.value)}
                            className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-cyan-500 font-bold bg-zinc-50 text-xl"
                            onKeyDown={(e) => e.key === 'Enter' && calculate()}
                        />
                    </div>
                </div>

                <div>
                    <button
                        onClick={calculate}
                        className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-cyan-600/30 uppercase tracking-widest text-lg"
                    >
                        Calculate Prism
                    </button>
                    <p className="text-xs text-center text-zinc-400 font-bold mt-4 uppercase tracking-widest">
                        Applicable to right triangular, rectangular, pentagonal prisms, etc.
                    </p>
                </div>
            </div>

            {result !== null && (
                <div className="bg-cyan-950 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

                    <h2 className="text-cyan-400 font-bold uppercase tracking-widest text-xs mb-6 z-10 text-center">Computed Measurements</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 z-10 relative">
                        <div className="bg-black/30 p-6 rounded-xl border border-cyan-500/30 shadow-inner flex flex-col items-center text-center">
                            <span className="text-cyan-400 text-xs font-bold uppercase tracking-wide mb-2">Volume (V = B·h)</span>
                            <div className="font-mono text-white tracking-tight font-bold text-3xl mt-2 truncate w-full">
                                {result.volume.toLocaleString('en-US', { maximumFractionDigits: 5 })}
                            </div>
                        </div>

                        <div className="bg-black/30 p-6 rounded-xl border border-cyan-500/30 shadow-inner flex flex-col items-center text-center">
                            <span className="text-cyan-400 text-[11px] font-bold uppercase tracking-wide mb-2">Lateral Area (L = p·h)</span>
                            <div className="font-mono text-white tracking-tight font-bold text-3xl mt-2 truncate w-full">
                                {result.lateralArea.toLocaleString('en-US', { maximumFractionDigits: 5 })}
                            </div>
                        </div>

                        <div className="bg-black/30 p-6 rounded-xl border border-cyan-500/30 shadow-inner flex flex-col items-center text-center">
                            <span className="text-cyan-400 text-[11px] font-bold uppercase tracking-wide mb-2">Total Surface Area (2B+L)</span>
                            <div className="font-mono text-white tracking-tight font-bold text-3xl mt-2 truncate w-full">
                                {result.surfaceArea.toLocaleString('en-US', { maximumFractionDigits: 5 })}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Prism Calculator", "operatingSystem": "All", "applicationCategory": "EducationalApplication" }) }} />
        </div>
    );
}
