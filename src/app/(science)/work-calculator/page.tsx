'use client';

import { useState } from 'react';

export default function WorkCalculator() {
    // W = F * d * cos(theta)
    const [calcTarget, setCalcTarget] = useState('work');

    // Inputs
    const [work, setWork] = useState('');
    const [force, setForce] = useState('100'); // Newtons
    const [distance, setDistance] = useState('25'); // Meters
    const [angle, setAngle] = useState('0'); // Degrees

    const [result, setResult] = useState<{ value: number; unit: string; formula: string } | null>(null);

    const calculate = () => {
        let res = 0;
        let resUnit = '';
        let formula = '';

        const angRad = parseFloat(angle) * (Math.PI / 180);

        if (calcTarget === 'work') {
            const f = parseFloat(force);
            const d = parseFloat(distance);
            if (isNaN(f) || isNaN(d) || isNaN(angRad)) return setResult(null);

            res = f * d * Math.cos(angRad);
            resUnit = 'Joules (J)';
            formula = 'W = F × d × cos(θ)';

        } else if (calcTarget === 'force') {
            const w = parseFloat(work);
            const d = parseFloat(distance);
            if (isNaN(w) || isNaN(d) || isNaN(angRad) || d === 0 || Math.cos(angRad) === 0) return setResult(null);

            res = w / (d * Math.cos(angRad));
            resUnit = 'Newtons (N)';
            formula = 'F = W / (d × cos(θ))';

        } else if (calcTarget === 'distance') {
            const w = parseFloat(work);
            const f = parseFloat(force);
            if (isNaN(w) || isNaN(f) || isNaN(angRad) || f === 0 || Math.cos(angRad) === 0) return setResult(null);

            res = w / (f * Math.cos(angRad));
            resUnit = 'Meters (m)';
            formula = 'd = W / (F × cos(θ))';
        }

        setResult({ value: res, unit: resUnit, formula });
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-emerald-900 flex items-center justify-center font-serif">
                    <span className="mr-3">⚙️</span> Work Calculator
                </h1>
                <p className="text-emerald-700 text-lg max-w-2xl mx-auto">
                    Calculate mechanical Work (W), Force (F), or displacement Distance (d) in physics.
                </p>
            </div>

            <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-zinc-200 mb-8">
                <div className="mb-8 p-4 bg-emerald-50 rounded-xl border border-emerald-100 flex flex-col md:flex-row items-center gap-4">
                    <label className="font-bold text-emerald-900 whitespace-nowrap uppercase tracking-widest text-sm">Target Variable:</label>
                    <div className="flex bg-white rounded-lg p-1 shadow-sm border border-zinc-200 w-full">
                        {[
                            { id: 'work', label: 'Work (W)' },
                            { id: 'force', label: 'Force (F)' },
                            { id: 'distance', label: 'Distance (d)' }
                        ].map((m) => (
                            <button
                                key={m.id}
                                onClick={() => { setCalcTarget(m.id); setResult(null); }}
                                className={`flex-1 py-2 text-xs md:text-sm font-bold uppercase tracking-wider rounded-md transition-colors ${calcTarget === m.id ? 'bg-emerald-600 text-white shadow-md' : 'text-zinc-500 hover:bg-zinc-50'}`}
                            >
                                {m.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {calcTarget !== 'work' && (
                        <div>
                            <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">Work (W)</label>
                            <div className="relative">
                                <input
                                    type="number" step="any"
                                    value={work}
                                    onChange={(e) => setWork(e.target.value)}
                                    className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-emerald-500 font-bold bg-zinc-50 pr-20"
                                    placeholder="e.g. 2500"
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-zinc-400">Joules</span>
                            </div>
                        </div>
                    )}

                    {calcTarget !== 'force' && (
                        <div>
                            <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">Force (F)</label>
                            <div className="relative">
                                <input
                                    type="number" step="any" min="0"
                                    value={force}
                                    onChange={(e) => setForce(e.target.value)}
                                    className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-emerald-500 font-bold bg-zinc-50 pr-24"
                                    placeholder="e.g. 100"
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-zinc-400">Newtons</span>
                            </div>
                        </div>
                    )}

                    {calcTarget !== 'distance' && (
                        <div>
                            <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">Distance (d)</label>
                            <div className="relative">
                                <input
                                    type="number" step="any" min="0"
                                    value={distance}
                                    onChange={(e) => setDistance(e.target.value)}
                                    className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-emerald-500 font-bold bg-zinc-50 pr-20"
                                    placeholder="e.g. 25"
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-zinc-400">Meters</span>
                            </div>
                        </div>
                    )}

                    <div className={`${calcTarget === 'work' ? '' : 'md:col-span-2'}`}>
                        <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">Angle of Force (θ)</label>
                        <div className="relative">
                            <input
                                type="number" step="any" min="0" max="360"
                                value={angle}
                                onChange={(e) => setAngle(e.target.value)}
                                className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-emerald-500 font-bold bg-zinc-50 pr-24"
                                placeholder="e.g. 0 (Parallel)"
                                onKeyDown={(e) => e.key === 'Enter' && calculate()}
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-zinc-400">Degrees</span>
                        </div>
                        <p className="text-xs text-zinc-400 mt-2 ml-1">Angle between Force vector & Displacement vector. Default is 0°.</p>
                    </div>

                </div>

                <div className="mt-8">
                    <button
                        onClick={calculate}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-5 px-6 rounded-xl transition-colors shadow-lg shadow-emerald-600/30 uppercase tracking-widest text-lg"
                    >
                        Calculate
                    </button>
                </div>
            </div>

            {result && (
                <div className="bg-emerald-950 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

                    <h2 className="text-emerald-400 font-bold uppercase tracking-widest text-xs mb-2 z-10">Calculated Result</h2>
                    <div className="text-emerald-600 font-mono text-sm mb-6 z-10 bg-black/40 px-3 py-1 rounded">Using {result.formula}</div>

                    <div className="flex flex-col items-center justify-center bg-black/30 px-8 py-6 rounded-2xl border border-white/10 z-10 shadow-inner w-full max-w-md text-center">
                        <span className="text-5xl md:text-6xl font-black font-mono tracking-tight text-white mb-2 break-all">
                            {Number.isInteger(result.value) ? result.value : parseFloat(result.value.toFixed(6))}
                        </span>
                        <span className="text-xl font-bold text-emerald-400 uppercase tracking-widest">{result.unit}</span>
                    </div>
                </div>
            )}

            <div className="mt-8 bg-zinc-100 p-6 rounded-xl border border-zinc-200 text-sm text-zinc-600 max-w-2xl mx-auto text-center">
                <p className="font-bold text-zinc-800 uppercase tracking-widest mb-4">Understanding Work</p>
                <div className="inline-block bg-white p-4 rounded-lg shadow-sm font-mono border border-zinc-200 text-lg">
                    W = F × d × cos(θ)
                </div>
                <p className="mt-4 text-xs font-mono">Work only occurs when a force causes an object to move. If θ = 90° (perpendicular), Work = 0 Joules.</p>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Work Calculator", "operatingSystem": "All", "applicationCategory": "EducationalApplication" }) }} />
        </div>
    );
}
