'use client';

import { useState } from 'react';

export default function RegularPolygonCalculator() {
    const [sides, setSides] = useState('5'); // Pentagon default
    const [sideLength, setSideLength] = useState('10');

    const [result, setResult] = useState<{
        area: number;
        perimeter: number;
        interiorAngle: number;
        inradius: number;
        circumradius: number;
    } | null>(null);

    const calculate = () => {
        const n = parseInt(sides);
        const s = parseFloat(sideLength);

        if (isNaN(n) || isNaN(s) || n < 3 || s <= 0) {
            setResult(null);
            return;
        }

        const perimeter = n * s;
        // Area = (s^2 * n) / (4 * tan(pi / n))
        const area = (s * s * n) / (4 * Math.tan(Math.PI / n));
        const interiorAngle = ((n - 2) * 180) / n;

        // Inradius r = s / (2 * tan(pi / n))
        const inradius = s / (2 * Math.tan(Math.PI / n));

        // Circumradius R = s / (2 * sin(pi / n))
        const circumradius = s / (2 * Math.sin(Math.PI / n));

        setResult({
            area, perimeter, interiorAngle, inradius, circumradius
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-blue-900 flex items-center justify-center font-serif">
                    <span className="mr-3">🛑</span> Regular Polygon Calculator
                </h1>
                <p className="text-blue-700 text-lg max-w-2xl mx-auto">
                    Calculate area, perimeter, internal angles, and radii for any regular polygon.
                </p>
            </div>

            <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-zinc-200 mb-8 max-w-2xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                        <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">Number of Sides (n)</label>
                        <input
                            type="number" step="1" min="3" value={sides} onChange={(e) => setSides(e.target.value)}
                            className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-blue-500 font-bold bg-zinc-50 text-xl"
                        />
                        <p className="text-xs text-zinc-400 mt-2 font-bold">Must be ≥ 3</p>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">Side Length (s)</label>
                        <input
                            type="number" step="any" min="0" value={sideLength} onChange={(e) => setSideLength(e.target.value)}
                            className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-blue-500 font-bold bg-zinc-50 text-xl"
                            onKeyDown={(e) => e.key === 'Enter' && calculate()}
                        />
                    </div>
                </div>

                <div>
                    <button
                        onClick={calculate}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-blue-600/30 uppercase tracking-widest text-lg"
                    >
                        Calculate Polygon
                    </button>
                </div>
            </div>

            {result !== null && (
                <div className="bg-blue-950 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

                    <h2 className="text-blue-400 font-bold uppercase tracking-widest text-xs mb-6 z-10 text-center">Geometric Properties</h2>

                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 z-10 relative">
                        <div className="bg-black/30 p-4 lg:p-6 rounded-xl border border-blue-500/30 flex flex-col items-center text-center">
                            <span className="text-blue-300 text-[10px] md:text-xs font-bold uppercase tracking-wide mb-2">Area</span>
                            <div className="font-mono text-white font-bold text-xl md:text-2xl mt-1 break-all">
                                {result.area.toLocaleString('en-US', { maximumFractionDigits: 4 })}
                            </div>
                        </div>
                        <div className="bg-black/30 p-4 lg:p-6 rounded-xl border border-blue-500/30 flex flex-col items-center text-center">
                            <span className="text-blue-300 text-[10px] md:text-xs font-bold uppercase tracking-wide mb-2">Perimeter</span>
                            <div className="font-mono text-white font-bold text-xl md:text-2xl mt-1 break-all">
                                {result.perimeter.toLocaleString('en-US', { maximumFractionDigits: 4 })}
                            </div>
                        </div>
                        <div className="bg-black/30 p-4 lg:p-6 rounded-xl border border-blue-500/30 flex flex-col items-center text-center">
                            <span className="text-blue-300 text-[10px] md:text-xs font-bold uppercase tracking-wide mb-2">Internal Angle</span>
                            <div className="font-mono text-white font-bold text-xl md:text-2xl mt-1 break-all">
                                {result.interiorAngle.toLocaleString('en-US', { maximumFractionDigits: 2 })}°
                            </div>
                        </div>
                        <div className="bg-black/30 p-4 lg:p-6 rounded-xl border border-blue-500/30 flex flex-col items-center text-center">
                            <span className="text-blue-300 text-[10px] md:text-xs font-bold uppercase tracking-wide mb-2">Inradius (Apothem)</span>
                            <div className="font-mono text-white font-bold text-xl md:text-2xl mt-1 break-all">
                                {result.inradius.toLocaleString('en-US', { maximumFractionDigits: 4 })}
                            </div>
                        </div>
                        <div className="bg-black/30 p-4 lg:p-6 rounded-xl border border-blue-500/30 flex flex-col items-center text-center col-span-2 lg:col-span-1">
                            <span className="text-blue-300 text-[10px] md:text-xs font-bold uppercase tracking-wide mb-2">Circumradius</span>
                            <div className="font-mono text-white font-bold text-xl md:text-2xl mt-1 break-all">
                                {result.circumradius.toLocaleString('en-US', { maximumFractionDigits: 4 })}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Regular Polygon Calculator", "operatingSystem": "All", "applicationCategory": "EducationalApplication" }) }} />
        </div>
    );
}
