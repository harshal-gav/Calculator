'use client';

import { useState } from 'react';

export default function CrossProductCalculator() {
    // Vector 1: u = (u1, u2, u3)
    const [u1, setU1] = useState('1');
    const [u2, setU2] = useState('-7');
    const [u3, setU3] = useState('1');

    // Vector 2: v = (v1, v2, v3)
    const [v1, setV1] = useState('5');
    const [v2, setV2] = useState('2');
    const [v3, setV3] = useState('4');

    const [result, setResult] = useState<{
        i: number;
        j: number;
        k: number;
        magnitude: number;
    } | null>(null);

    const calculate = () => {
        const numU1 = parseFloat(u1);
        const numU2 = parseFloat(u2);
        const numU3 = parseFloat(u3);
        const numV1 = parseFloat(v1);
        const numV2 = parseFloat(v2);
        const numV3 = parseFloat(v3);

        if (isNaN(numU1) || isNaN(numU2) || isNaN(numU3) || isNaN(numV1) || isNaN(numV2) || isNaN(numV3)) {
            setResult(null);
            return;
        }

        // Cross Product: u x v = (u2v3 - u3v2)i - (u1v3 - u3v1)j + (u1v2 - u2v1)k
        const cx = (numU2 * numV3) - (numU3 * numV2);
        const cy = (numU3 * numV1) - (numU1 * numV3); // Note: standard is -(u1v3 - u3v1)
        const cz = (numU1 * numV2) - (numU2 * numV1);

        const magnitude = Math.sqrt((cx * cx) + (cy * cy) + (cz * cz));

        setResult({
            i: cx,
            j: cy,
            k: cz,
            magnitude: magnitude
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-violet-900 flex items-center justify-center font-serif">
                    <span className="mr-3">✖️</span> Cross Product
                </h1>
                <p className="text-violet-700 text-lg max-w-2xl mx-auto">
                    Calculate the cross product (vector product) of two 3D vectors.
                </p>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-zinc-200 mb-8 max-w-2xl mx-auto">

                <div className="space-y-8 mb-8">
                    {/* Vector u */}
                    <div className="p-5 rounded-xl border border-violet-100 bg-violet-50/50">
                        <div className="font-bold text-violet-900 border-b border-violet-200 pb-2 mb-4 flex items-center">
                            <span className="bg-violet-600 text-white rounded w-6 h-6 flex items-center justify-center text-sm mr-2 italic">u</span>
                            Vector 1
                        </div>
                        <div className="flex justify-between items-center gap-4">
                            <div className="w-1/3">
                                <label className="block text-xs font-bold text-zinc-500 mb-1 text-center font-mono">x (i)</label>
                                <input type="number" step="any" value={u1} onChange={(e) => setU1(e.target.value)} className="w-full rounded-xl border-zinc-300 shadow-sm p-3 border focus:border-violet-500 font-bold bg-white text-center font-mono" />
                            </div>
                            <div className="w-1/3">
                                <label className="block text-xs font-bold text-zinc-500 mb-1 text-center font-mono">y (j)</label>
                                <input type="number" step="any" value={u2} onChange={(e) => setU2(e.target.value)} className="w-full rounded-xl border-zinc-300 shadow-sm p-3 border focus:border-violet-500 font-bold bg-white text-center font-mono" />
                            </div>
                            <div className="w-1/3">
                                <label className="block text-xs font-bold text-zinc-500 mb-1 text-center font-mono">z (k)</label>
                                <input type="number" step="any" value={u3} onChange={(e) => setU3(e.target.value)} className="w-full rounded-xl border-zinc-300 shadow-sm p-3 border focus:border-violet-500 font-bold bg-white text-center font-mono" />
                            </div>
                        </div>
                    </div>

                    {/* Vector v */}
                    <div className="p-5 rounded-xl border border-fuchsia-100 bg-fuchsia-50/50">
                        <div className="font-bold text-fuchsia-900 border-b border-fuchsia-200 pb-2 mb-4 flex items-center">
                            <span className="bg-fuchsia-600 text-white rounded w-6 h-6 flex items-center justify-center text-sm mr-2 italic">v</span>
                            Vector 2
                        </div>
                        <div className="flex justify-between items-center gap-4">
                            <div className="w-1/3">
                                <label className="block text-xs font-bold text-zinc-500 mb-1 text-center font-mono">x (i)</label>
                                <input type="number" step="any" value={v1} onChange={(e) => setV1(e.target.value)} className="w-full rounded-xl border-zinc-300 shadow-sm p-3 border focus:border-fuchsia-500 font-bold bg-white text-center font-mono" />
                            </div>
                            <div className="w-1/3">
                                <label className="block text-xs font-bold text-zinc-500 mb-1 text-center font-mono">y (j)</label>
                                <input type="number" step="any" value={v2} onChange={(e) => setV2(e.target.value)} className="w-full rounded-xl border-zinc-300 shadow-sm p-3 border focus:border-fuchsia-500 font-bold bg-white text-center font-mono" />
                            </div>
                            <div className="w-1/3">
                                <label className="block text-xs font-bold text-zinc-500 mb-1 text-center font-mono">z (k)</label>
                                <input type="number" step="any" value={v3} onChange={(e) => setV3(e.target.value)} className="w-full rounded-xl border-zinc-300 shadow-sm p-3 border focus:border-fuchsia-500 font-bold bg-white text-center font-mono" onKeyDown={(e) => e.key === 'Enter' && calculate()} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center">
                    <button
                        onClick={calculate}
                        className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-violet-600/30 uppercase tracking-widest text-lg"
                    >
                        Calculate (u × v)
                    </button>
                </div>
            </div>

            {result !== null && (
                <div className="bg-slate-900 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-fuchsia-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

                    <h2 className="text-white/60 font-bold uppercase tracking-widest text-xs mb-8 z-10 text-center">Cross Product Result (w)</h2>

                    <div className="z-10 relative mb-8 w-full max-w-lg bg-black/40 border border-violet-500/30 p-8 rounded-3xl shadow-inner text-center">
                        <div className="text-violet-300 text-[10px] font-bold uppercase tracking-widest mb-3">Cartesian Vector Format</div>
                        <div className="font-mono font-black text-3xl md:text-5xl text-white break-all tracking-tight drop-shadow-lg">
                            ( <span className="text-violet-400">{result.i.toLocaleString()}</span>, <span className="text-fuchsia-400">{result.j.toLocaleString()}</span>, <span className="text-sky-400">{result.k.toLocaleString()}</span> )
                        </div>
                    </div>

                    <div className="w-full max-w-2xl z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-black/30 p-5 rounded-2xl border border-white/5 text-center">
                            <span className="text-white/50 text-[10px] font-bold uppercase tracking-widest mb-2 block">Standard Unit Vector Notation</span>
                            <div className="font-mono text-white text-xl">
                                {result.i}i {result.j >= 0 ? '+' : ''} {result.j}j {result.k >= 0 ? '+' : ''} {result.k}k
                            </div>
                        </div>
                        <div className="bg-black/30 p-5 rounded-2xl border border-white/5 text-center">
                            <span className="text-white/50 text-[10px] font-bold uppercase tracking-widest mb-2 block">Magnitude |w|</span>
                            <div className="font-mono text-violet-300 font-bold text-2xl">
                                {result.magnitude.toLocaleString('en-US', { maximumFractionDigits: 6 })}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Cross Product Calculator", "operatingSystem": "All", "applicationCategory": "EducationalApplication" }) }} />
        </div>
    );
}
