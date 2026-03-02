'use client';

import { useState } from 'react';

export default function PyramidCalculator() {
    const [baseLength, setBaseLength] = useState('10');
    const [baseWidth, setBaseWidth] = useState('10');
    const [height, setHeight] = useState('15');

    const [result, setResult] = useState<{
        volume: number;
        baseArea: number;
        slantHeightL: number;
        slantHeightW: number;
        surfaceArea: number;
    } | null>(null);

    const calculate = () => {
        const l = parseFloat(baseLength);
        const w = parseFloat(baseWidth);
        const h = parseFloat(height);

        if (isNaN(l) || isNaN(w) || isNaN(h) || l <= 0 || w <= 0 || h <= 0) {
            setResult(null);
            return;
        }

        const baseArea = l * w;
        const volume = (l * w * h) / 3;

        // Slant heights for rectangular pyramid
        const slantHeightL = Math.sqrt(Math.pow(h, 2) + Math.pow(w / 2, 2));
        const slantHeightW = Math.sqrt(Math.pow(h, 2) + Math.pow(l / 2, 2));

        const lateralArea = l * slantHeightL + w * slantHeightW;
        const surfaceArea = baseArea + lateralArea;

        setResult({
            volume,
            baseArea,
            slantHeightL,
            slantHeightW,
            surfaceArea
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-amber-900 flex items-center justify-center font-serif">
                    <span className="mr-3">🔺</span> Pyramid Calculator
                </h1>
                <p className="text-amber-700 text-lg max-w-2xl mx-auto">
                    Calculate the volume, surface area, and slant heights of any right rectangular pyramid.
                </p>
            </div>

            <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-zinc-200 mb-8 max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div>
                        <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">Base Length (l)</label>
                        <input
                            type="number" step="any" min="0" value={baseLength} onChange={(e) => setBaseLength(e.target.value)}
                            className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-amber-500 font-bold bg-zinc-50 text-xl"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">Base Width (w)</label>
                        <input
                            type="number" step="any" min="0" value={baseWidth} onChange={(e) => setBaseWidth(e.target.value)}
                            className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-amber-500 font-bold bg-zinc-50 text-xl"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">Pyramid Height (h)</label>
                        <input
                            type="number" step="any" min="0" value={height} onChange={(e) => setHeight(e.target.value)}
                            className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-amber-500 font-bold bg-zinc-50 text-xl"
                            onKeyDown={(e) => e.key === 'Enter' && calculate()}
                        />
                    </div>
                </div>

                <div>
                    <button
                        onClick={calculate}
                        className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-amber-600/30 uppercase tracking-widest text-lg"
                    >
                        Calculate Pyramid
                    </button>
                    <p className="text-xs text-center text-zinc-400 font-bold mt-4 uppercase tracking-widest">
                        For square pyramids, just make Base Length equal to Base Width
                    </p>
                </div>
            </div>

            {result !== null && (
                <div className="bg-amber-950 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

                    <h2 className="text-amber-400 font-bold uppercase tracking-widest text-xs mb-6 z-10 text-center">Results</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 z-10 relative">
                        <div className="bg-black/30 p-6 rounded-xl border border-amber-500/30 shadow-inner flex flex-col items-center">
                            <span className="text-amber-400 text-xs font-bold uppercase tracking-wide mb-2">Volume (V)</span>
                            <div className="font-mono text-white tracking-tight font-bold text-3xl mt-2 truncate w-full text-center">
                                {result.volume.toLocaleString('en-US', { maximumFractionDigits: 4 })}
                            </div>
                        </div>

                        <div className="bg-black/30 p-6 rounded-xl border border-amber-500/30 shadow-inner flex flex-col items-center">
                            <span className="text-amber-400 text-xs font-bold uppercase tracking-wide mb-2">Total Surface Area</span>
                            <div className="font-mono text-white tracking-tight font-bold text-3xl mt-2 truncate w-full text-center">
                                {result.surfaceArea.toLocaleString('en-US', { maximumFractionDigits: 4 })}
                            </div>
                        </div>

                        <div className="bg-black/30 p-6 rounded-xl border border-amber-500/30 shadow-inner flex flex-col items-center lg:col-span-1 md:col-span-2">
                            <span className="text-amber-400 text-xs font-bold uppercase tracking-wide mb-2">Base Area</span>
                            <div className="font-mono text-white tracking-tight font-bold text-3xl mt-2 truncate w-full text-center">
                                {result.baseArea.toLocaleString('en-US', { maximumFractionDigits: 4 })}
                            </div>
                        </div>

                        <div className="bg-black/30 p-6 rounded-xl border border-amber-500/30 shadow-inner flex flex-col items-center md:col-span-1">
                            <span className="text-amber-400 text-[10px] md:text-xs font-bold uppercase tracking-wide mb-2">Slant Height (Length Side)</span>
                            <div className="font-mono text-white tracking-tight font-bold text-2xl mt-2 truncate w-full text-center">
                                {result.slantHeightL.toLocaleString('en-US', { maximumFractionDigits: 4 })}
                            </div>
                        </div>

                        <div className="bg-black/30 p-6 rounded-xl border border-amber-500/30 shadow-inner flex flex-col items-center md:col-span-1 lg:col-span-2">
                            <span className="text-amber-400 text-[10px] md:text-xs font-bold uppercase tracking-wide mb-2">Slant Height (Width Side)</span>
                            <div className="font-mono text-white tracking-tight font-bold text-2xl mt-2 truncate w-full text-center">
                                {result.slantHeightW.toLocaleString('en-US', { maximumFractionDigits: 4 })}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Pyramid Calculator", "operatingSystem": "All", "applicationCategory": "EducationalApplication" }) }} />
        </div>
    );
}
