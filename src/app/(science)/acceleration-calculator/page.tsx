'use client';

import { useState } from 'react';

export default function AccelerationCalculator() {
    // a = (v_f - v_i) / t
    const [calcTarget, setCalcTarget] = useState('acceleration');

    // Inputs
    const [a, setA] = useState('');
    const [vi, setVi] = useState('0');
    const [vf, setVf] = useState('27.778'); // ~100 km/h
    const [t, setT] = useState('5');

    const [result, setResult] = useState<{ value: number; unit: string; formula: string } | null>(null);

    const calculate = () => {
        let res = 0;
        let resUnit = '';
        let formula = '';

        if (calcTarget === 'acceleration') {
            const v_i = parseFloat(vi);
            const v_f = parseFloat(vf);
            const time = parseFloat(t);
            if (isNaN(v_i) || isNaN(v_f) || isNaN(time) || time === 0) return setResult(null);

            res = (v_f - v_i) / time;
            resUnit = 'm/s²';
            formula = 'a = (v_f - v_i) / t';

        } else if (calcTarget === 'finalVelocity') {
            const acc = parseFloat(a);
            const v_i = parseFloat(vi);
            const time = parseFloat(t);
            if (isNaN(acc) || isNaN(v_i) || isNaN(time)) return setResult(null);

            res = v_i + (acc * time);
            resUnit = 'm/s';
            formula = 'v_f = v_i + (a × t)';

        } else if (calcTarget === 'initialVelocity') {
            const acc = parseFloat(a);
            const v_f = parseFloat(vf);
            const time = parseFloat(t);
            if (isNaN(acc) || isNaN(v_f) || isNaN(time)) return setResult(null);

            res = v_f - (acc * time);
            resUnit = 'm/s';
            formula = 'v_i = v_f - (a × t)';

        } else if (calcTarget === 'time') {
            const acc = parseFloat(a);
            const v_i = parseFloat(vi);
            const v_f = parseFloat(vf);
            if (isNaN(acc) || isNaN(v_i) || isNaN(v_f) || acc === 0) return setResult(null);

            res = (v_f - v_i) / acc;
            resUnit = 's';
            formula = 't = (v_f - v_i) / a';
        }

        setResult({ value: res, unit: resUnit, formula });
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-emerald-900 flex items-center justify-center font-serif">
                    <span className="mr-3">🏎️</span> Acceleration Calculator
                </h1>
                <p className="text-emerald-700 text-lg max-w-2xl mx-auto">
                    Determine acceleration, final velocity, initial velocity, or time using kinematic equations.
                </p>
            </div>

            <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-zinc-200 mb-8">
                <div className="mb-8 p-4 bg-emerald-50 rounded-xl border border-emerald-100 flex flex-col items-center gap-4">
                    <label className="font-bold text-emerald-900 whitespace-nowrap uppercase tracking-widest text-sm text-center">Solve For:</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 bg-white rounded-lg p-1 shadow-sm border border-zinc-200 w-full gap-1">
                        {[
                            { id: 'acceleration', label: 'Acceleration (a)' },
                            { id: 'finalVelocity', label: 'Final Velocity (v_f)' },
                            { id: 'initialVelocity', label: 'Initial Velocity (v_i)' },
                            { id: 'time', label: 'Time (t)' }
                        ].map((m) => (
                            <button
                                key={m.id}
                                onClick={() => { setCalcTarget(m.id); setResult(null); }}
                                className={`py-3 px-2 text-xs font-bold uppercase tracking-wide rounded-md transition-colors ${calcTarget === m.id ? 'bg-emerald-600 text-white shadow-md' : 'text-zinc-500 hover:bg-zinc-50'}`}
                            >
                                {m.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {calcTarget !== 'acceleration' && (
                        <div>
                            <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">Acceleration (a)</label>
                            <div className="relative">
                                <input
                                    type="number" step="any"
                                    value={a}
                                    onChange={(e) => setA(e.target.value)}
                                    className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-emerald-500 font-bold bg-zinc-50 pr-16"
                                    placeholder="e.g. 5.5"
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-zinc-400">m/s²</span>
                            </div>
                        </div>
                    )}

                    {calcTarget !== 'initialVelocity' && (
                        <div>
                            <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">Initial Velocity (v_i)</label>
                            <div className="relative">
                                <input
                                    type="number" step="any"
                                    value={vi}
                                    onChange={(e) => setVi(e.target.value)}
                                    className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-emerald-500 font-bold bg-zinc-50 pr-16"
                                    placeholder="e.g. 0"
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-zinc-400">m/s</span>
                            </div>
                        </div>
                    )}

                    {calcTarget !== 'finalVelocity' && (
                        <div>
                            <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">Final Velocity (v_f)</label>
                            <div className="relative">
                                <input
                                    type="number" step="any"
                                    value={vf}
                                    onChange={(e) => setVf(e.target.value)}
                                    className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-emerald-500 font-bold bg-zinc-50 pr-16"
                                    placeholder="e.g. 27.7"
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-zinc-400">m/s</span>
                            </div>
                        </div>
                    )}

                    {calcTarget !== 'time' && (
                        <div>
                            <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">Time (t)</label>
                            <div className="relative">
                                <input
                                    type="number" step="any" min="0"
                                    value={t}
                                    onChange={(e) => setT(e.target.value)}
                                    className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-emerald-500 font-bold bg-zinc-50 pr-16"
                                    placeholder="e.g. 5"
                                    onKeyDown={(e) => e.key === 'Enter' && calculate()}
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-zinc-400">s</span>
                            </div>
                        </div>
                    )}

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

                    <div className="flex items-baseline bg-black/30 px-8 py-6 rounded-2xl border border-white/10 z-10 shadow-inner max-w-full overflow-hidden">
                        <span className="text-5xl md:text-6xl font-black font-mono tracking-tight text-white mr-4 truncate">
                            {Number.isInteger(result.value) ? result.value : parseFloat(result.value.toFixed(6))}
                        </span>
                        <span className="text-2xl font-bold text-emerald-400">{result.unit}</span>
                    </div>
                </div>
            )}

            <div className="mt-8 bg-zinc-100 p-6 rounded-xl border border-zinc-200 text-sm text-zinc-600 max-w-2xl mx-auto text-center">
                <p className="font-bold text-zinc-800 uppercase tracking-widest mb-4">Acceleration Formula</p>
                <div className="inline-block bg-white p-4 rounded-lg shadow-sm font-mono border border-zinc-200 text-lg">
                    a = (v<sub>f</sub> - v<sub>i</sub>) / ∆t
                </div>
                <p className="mt-4 text-xs font-mono">Note: This calculator assumes constant acceleration and standard metric units (meters and seconds).</p>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Acceleration Calculator", "operatingSystem": "All", "applicationCategory": "EducationalApplication" }) }} />
        </div>
    );
}
