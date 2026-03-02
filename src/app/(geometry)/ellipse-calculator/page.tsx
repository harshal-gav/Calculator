'use client';

import { useState } from 'react';

export default function EllipseCalculator() {
    const [aStr, setAStr] = useState('5');
    const [bStr, setBStr] = useState('3');

    const [result, setResult] = useState<{
        area: number;
        circumference: number;
        eccentricity: number;
    } | null>(null);

    const calculate = () => {
        const a = parseFloat(aStr);
        const b = parseFloat(bStr);

        if (isNaN(a) || isNaN(b) || a <= 0 || b <= 0) {
            setResult(null);
            return;
        }

        const maxAxis = Math.max(a, b);
        const minAxis = Math.min(a, b);

        const area = Math.PI * a * b;

        // Ramanujan approximation for circumference
        const h = Math.pow(a - b, 2) / Math.pow(a + b, 2);
        const circumference = Math.PI * (a + b) * (1 + (3 * h) / (10 + Math.sqrt(4 - 3 * h)));

        // Eccentricity e = sqrt(1 - (min/max)^2)
        const eccentricity = Math.sqrt(1 - Math.pow(minAxis / maxAxis, 2));

        setResult({
            area,
            circumference,
            eccentricity
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-rose-900 flex items-center justify-center font-serif">
                    <span className="mr-3">0</span> Ellipse Calculator
                </h1>
                <p className="text-rose-700 text-lg max-w-2xl mx-auto">
                    Calculate the area, perimeter (circumference), and eccentricity of an ellipse.
                </p>
            </div>

            <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-zinc-200 mb-8 max-w-2xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                        <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">Semi-Major Axis (a)</label>
                        <input
                            type="number" step="any" min="0"
                            value={aStr} onChange={(e) => setAStr(e.target.value)}
                            className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-rose-500 font-bold bg-zinc-50 text-xl"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">Semi-Minor Axis (b)</label>
                        <input
                            type="number" step="any" min="0"
                            value={bStr} onChange={(e) => setBStr(e.target.value)}
                            className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-rose-500 font-bold bg-zinc-50 text-xl"
                            onKeyDown={(e) => e.key === 'Enter' && calculate()}
                        />
                    </div>
                </div>

                <div>
                    <button
                        onClick={calculate}
                        className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-rose-600/30 uppercase tracking-widest text-lg"
                    >
                        Calculate Ellipse
                    </button>
                </div>
            </div>

            {result !== null && (
                <div className="bg-rose-950 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-rose-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 z-10 relative">
                        <div className="bg-black/30 p-6 rounded-xl border border-rose-500/30 shadow-inner flex flex-col items-center">
                            <span className="text-rose-400 text-xs font-bold uppercase tracking-wide mb-2">Area</span>
                            <div className="font-mono text-white tracking-tight font-bold text-2xl mt-2 truncate max-w-full">
                                {result.area.toLocaleString('en-US', { maximumFractionDigits: 5 })}
                            </div>
                        </div>

                        <div className="bg-black/30 p-6 rounded-xl border border-rose-500/30 shadow-inner flex flex-col items-center">
                            <span className="text-rose-400 text-xs font-bold uppercase tracking-wide mb-2">Perimeter (Approx)</span>
                            <div className="font-mono text-white tracking-tight font-bold text-2xl mt-2 truncate max-w-full">
                                {result.circumference.toLocaleString('en-US', { maximumFractionDigits: 5 })}
                            </div>
                        </div>

                        <div className="bg-black/30 p-6 rounded-xl border border-rose-500/30 shadow-inner flex flex-col items-center">
                            <span className="text-rose-400 text-xs font-bold uppercase tracking-wide mb-2">Eccentricity (e)</span>
                            <div className="font-mono text-white tracking-tight font-bold text-2xl mt-2 truncate max-w-full">
                                {result.eccentricity.toLocaleString('en-US', { maximumFractionDigits: 5 })}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-8 bg-zinc-100 p-6 rounded-xl border border-zinc-200 text-sm text-zinc-600 max-w-2xl mx-auto space-y-2 text-center">
                <p className="font-bold text-zinc-800 uppercase tracking-widest mb-2">Formulas Used</p>
                <div className="inline-block text-left text-zinc-500 font-mono text-sm leading-relaxed border border-zinc-200 bg-white p-4 rounded-lg shadow-sm">
                    <p>Area = π * a * b</p>
                    <p>Perimeter ≈ Ramanujan&apos;s 2nd Approx</p>
                    <p>Eccentricity = √(1 - (b²/a²))</p>
                </div>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Ellipse Calculator", "operatingSystem": "All", "applicationCategory": "EducationalApplication" }) }} />
        </div>
    );
}
