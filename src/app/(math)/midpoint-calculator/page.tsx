'use client';

import { useState } from 'react';

export default function MidpointCalculator() {
    const [x1, setX1] = useState('0');
    const [y1, setY1] = useState('0');
    const [x2, setX2] = useState('4');
    const [y2, setY2] = useState('6');

    const [result, setResult] = useState<{
        midpointX: number;
        midpointY: number;
        steps: string;
    } | null>(null);

    const calculate = () => {
        const p1x = parseFloat(x1);
        const p1y = parseFloat(y1);
        const p2x = parseFloat(x2);
        const p2y = parseFloat(y2);

        if (isNaN(p1x) || isNaN(p1y) || isNaN(p2x) || isNaN(p2y)) {
            setResult(null);
            return;
        }

        const mx = (p1x + p2x) / 2;
        const my = (p1y + p2y) / 2;

        const steps = `M = ( (x₁ + x₂) / 2 , (y₁ + y₂) / 2 )
M = ( (${p1x} + ${p2x}) / 2 , (${p1y} + ${p2y}) / 2 )
M = ( ${p1x + p2x} / 2 , ${p1y + p2y} / 2 )
M = ( ${mx}, ${my} )`;

        setResult({
            midpointX: mx,
            midpointY: my,
            steps: steps
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-orange-900 flex items-center justify-center font-serif">
                    <span className="mr-3">🎯</span> Midpoint Calculator
                </h1>
                <p className="text-orange-700 text-lg max-w-2xl mx-auto">
                    Find the exact midpoint halfway between two given coordinates on a Cartesian plane.
                </p>
            </div>

            <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-zinc-200 mb-8">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    <div className="bg-amber-50 p-6 rounded-xl border border-amber-100">
                        <h3 className="font-bold text-amber-900 mb-4 uppercase tracking-widest text-sm border-b border-amber-200 pb-2">Point 1 (A)</h3>
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="block text-xs font-bold text-zinc-500 mb-1">X₁ Coordinate</label>
                                <input
                                    type="number" step="any"
                                    value={x1} onChange={(e) => setX1(e.target.value)}
                                    className="w-full rounded-lg border-zinc-300 shadow-sm p-3 border focus:border-orange-500 font-bold bg-white text-lg"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block text-xs font-bold text-zinc-500 mb-1">Y₁ Coordinate</label>
                                <input
                                    type="number" step="any"
                                    value={y1} onChange={(e) => setY1(e.target.value)}
                                    className="w-full rounded-lg border-zinc-300 shadow-sm p-3 border focus:border-orange-500 font-bold bg-white text-lg"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-orange-50 p-6 rounded-xl border border-orange-100">
                        <h3 className="font-bold text-orange-900 mb-4 uppercase tracking-widest text-sm border-b border-orange-200 pb-2">Point 2 (B)</h3>
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="block text-xs font-bold text-zinc-500 mb-1">X₂ Coordinate</label>
                                <input
                                    type="number" step="any"
                                    value={x2} onChange={(e) => setX2(e.target.value)}
                                    className="w-full rounded-lg border-zinc-300 shadow-sm p-3 border focus:border-orange-500 font-bold bg-white text-lg"
                                    onKeyDown={(e) => e.key === 'Enter' && calculate()}
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block text-xs font-bold text-zinc-500 mb-1">Y₂ Coordinate</label>
                                <input
                                    type="number" step="any"
                                    value={y2} onChange={(e) => setY2(e.target.value)}
                                    className="w-full rounded-lg border-zinc-300 shadow-sm p-3 border focus:border-orange-500 font-bold bg-white text-lg"
                                    onKeyDown={(e) => e.key === 'Enter' && calculate()}
                                />
                            </div>
                        </div>
                    </div>

                </div>

                <div className="mt-8">
                    <button
                        onClick={calculate}
                        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-orange-600/30 uppercase tracking-widest text-lg"
                    >
                        Calculate Midpoint
                    </button>
                </div>
            </div>

            {result !== null && (
                <div className="bg-orange-950 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

                    <h2 className="text-orange-400 font-bold uppercase tracking-widest text-xs mb-6 z-10">Calculated Midpoint (M)</h2>

                    <div className="font-mono text-white font-black text-5xl md:text-7xl break-all z-10 tracking-tight bg-black/40 px-10 py-6 rounded-2xl border border-orange-500/30 shadow-inner">
                        ( {result.midpointX}, {result.midpointY} )
                    </div>

                    <div className="w-full max-w-xl mx-auto mt-8 bg-black/40 p-6 rounded-xl border border-white/10 z-10 text-left">
                        <h3 className="text-orange-300 font-bold uppercase tracking-wider text-[10px] mb-3">Step-by-step Solution</h3>
                        <pre className="font-mono text-zinc-300 text-sm whitespace-pre-wrap">{result.steps}</pre>
                    </div>
                </div>
            )}

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Midpoint Calculator", "operatingSystem": "All", "applicationCategory": "EducationalApplication" }) }} />
        </div>
    );
}
