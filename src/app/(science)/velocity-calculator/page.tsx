'use client';

import { useState } from 'react';

export default function VelocityCalculator() {
    const [calcTarget, setCalcTarget] = useState('velocity'); // velocity, distance, time

    // Inputs
    const [velocity, setVelocity] = useState('');
    const [distance, setDistance] = useState('100');
    const [time, setTime] = useState('9.58');

    // Units
    const [vUnit, setVUnit] = useState('m/s');
    const [dUnit, setDUnit] = useState('m');
    const [tUnit, setTUnit] = useState('s');

    const [result, setResult] = useState<{ value: number; unit: string; formula: string } | null>(null);

    const unitFactors: Record<string, number> = {
        // Distance base: meters (m)
        'm': 1,
        'km': 1000,
        'cm': 0.01,
        'mi': 1609.344,
        'ft': 0.3048,

        // Time base: seconds (s)
        's': 1,
        'min': 60,
        'h': 3600,

        // Velocity base: m/s
        'm/s': 1,
        'km/h': 1 / 3.6,
        'mph': 0.44704,
        'ft/s': 0.3048
    };

    const calculate = () => {
        let res = 0;
        let resUnit = '';
        let formula = '';

        if (calcTarget === 'velocity') {
            const d = parseFloat(distance);
            const t = parseFloat(time);
            if (isNaN(d) || isNaN(t) || t === 0) return setResult(null);

            // Convert to base (m and s)
            const dBase = d * unitFactors[dUnit];
            const tBase = t * unitFactors[tUnit];

            // v = d / t (in m/s)
            const vBase = dBase / tBase;

            // Convert to requested vUnit
            res = vBase / unitFactors[vUnit];
            resUnit = vUnit;
            formula = 'v = d / t';

        } else if (calcTarget === 'distance') {
            const v = parseFloat(velocity);
            const t = parseFloat(time);
            if (isNaN(v) || isNaN(t)) return setResult(null);

            const vBase = v * unitFactors[vUnit];
            const tBase = t * unitFactors[tUnit];

            // d = v * t (in m)
            const dBase = vBase * tBase;

            res = dBase / unitFactors[dUnit];
            resUnit = dUnit;
            formula = 'd = v × t';

        } else if (calcTarget === 'time') {
            const v = parseFloat(velocity);
            const d = parseFloat(distance);
            if (isNaN(v) || isNaN(d) || v === 0) return setResult(null);

            const vBase = v * unitFactors[vUnit];
            const dBase = d * unitFactors[dUnit];

            // t = d / v (in s)
            const tBase = dBase / vBase;

            res = tBase / unitFactors[tUnit];
            resUnit = tUnit;
            formula = 't = d / v';
        }

        setResult({ value: res, unit: resUnit, formula });
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-emerald-900 flex items-center justify-center font-serif">
                    <span className="mr-3">🚀</span> Velocity Calculator
                </h1>
                <p className="text-emerald-700 text-lg max-w-2xl mx-auto">
                    Calculate velocity, average speed, distance, or time using the kinematic formula v = d / t.
                </p>
            </div>

            <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-zinc-200 mb-8">
                <div className="mb-8 p-4 bg-emerald-50 rounded-xl border border-emerald-100 flex flex-col md:flex-row items-center gap-4">
                    <label className="font-bold text-emerald-900 whitespace-nowrap uppercase tracking-widest text-sm">Calculate:</label>
                    <div className="flex bg-white rounded-lg p-1 shadow-sm border border-zinc-200 w-full">
                        {['velocity', 'distance', 'time'].map((t) => (
                            <button
                                key={t}
                                onClick={() => { setCalcTarget(t); setResult(null); }}
                                className={`flex-1 py-2 text-sm font-bold uppercase tracking-wider rounded-md transition-colors ${calcTarget === t ? 'bg-emerald-600 text-white shadow-md' : 'text-zinc-500 hover:bg-zinc-50'}`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {calcTarget !== 'velocity' && (
                        <div>
                            <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">Velocity (v)</label>
                            <div className="flex gap-2">
                                <input
                                    type="number" step="any"
                                    value={velocity}
                                    onChange={(e) => setVelocity(e.target.value)}
                                    className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-emerald-500 font-bold bg-zinc-50"
                                    placeholder="Enter velocity"
                                />
                                <select
                                    value={vUnit}
                                    onChange={(e) => setVUnit(e.target.value)}
                                    className="rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-emerald-500 font-bold bg-white w-32"
                                >
                                    <option value="m/s">m/s</option>
                                    <option value="km/h">km/h</option>
                                    <option value="mph">mph</option>
                                    <option value="ft/s">ft/s</option>
                                </select>
                            </div>
                        </div>
                    )}

                    {calcTarget !== 'distance' && (
                        <div>
                            <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">Distance (d)</label>
                            <div className="flex gap-2">
                                <input
                                    type="number" step="any" min="0"
                                    value={distance}
                                    onChange={(e) => setDistance(e.target.value)}
                                    className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-emerald-500 font-bold bg-zinc-50"
                                    placeholder="Enter distance"
                                />
                                <select
                                    value={dUnit}
                                    onChange={(e) => setDUnit(e.target.value)}
                                    className="rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-emerald-500 font-bold bg-white w-32"
                                >
                                    <option value="m">m</option>
                                    <option value="km">km</option>
                                    <option value="cm">cm</option>
                                    <option value="mi">mi</option>
                                    <option value="ft">ft</option>
                                </select>
                            </div>
                        </div>
                    )}

                    {calcTarget !== 'time' && (
                        <div>
                            <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">Time (t)</label>
                            <div className="flex gap-2">
                                <input
                                    type="number" step="any" min="0"
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-emerald-500 font-bold bg-zinc-50"
                                    placeholder="Enter time"
                                    onKeyDown={(e) => e.key === 'Enter' && calculate()}
                                />
                                <select
                                    value={tUnit}
                                    onChange={(e) => setTUnit(e.target.value)}
                                    className="rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-emerald-500 font-bold bg-white w-32"
                                >
                                    <option value="s">s</option>
                                    <option value="min">min</option>
                                    <option value="h">h</option>
                                </select>
                            </div>
                        </div>
                    )}

                    {/* Output Unit Selector */}
                    <div>
                        <label className="block text-sm font-bold text-emerald-700 mb-2 uppercase tracking-wide">Result Unit</label>
                        <select
                            value={calcTarget === 'velocity' ? vUnit : calcTarget === 'distance' ? dUnit : tUnit}
                            onChange={(e) => {
                                if (calcTarget === 'velocity') setVUnit(e.target.value);
                                else if (calcTarget === 'distance') setDUnit(e.target.value);
                                else setTUnit(e.target.value);
                            }}
                            className="w-full rounded-xl border-emerald-300 shadow-sm p-4 border focus:border-emerald-500 font-bold bg-emerald-50 text-emerald-900"
                        >
                            {calcTarget === 'velocity' && (
                                <>
                                    <option value="m/s">Meters per second (m/s)</option>
                                    <option value="km/h">Kilometers per hour (km/h)</option>
                                    <option value="mph">Miles per hour (mph)</option>
                                    <option value="ft/s">Feet per second (ft/s)</option>
                                </>
                            )}
                            {calcTarget === 'distance' && (
                                <>
                                    <option value="m">Meters (m)</option>
                                    <option value="km">Kilometers (km)</option>
                                    <option value="cm">Centimeters (cm)</option>
                                    <option value="mi">Miles (mi)</option>
                                    <option value="ft">Feet (ft)</option>
                                </>
                            )}
                            {calcTarget === 'time' && (
                                <>
                                    <option value="s">Seconds (s)</option>
                                    <option value="min">Minutes (min)</option>
                                    <option value="h">Hours (h)</option>
                                </>
                            )}
                        </select>
                    </div>

                </div>

                <div className="mt-8">
                    <button
                        onClick={calculate}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-5 px-6 rounded-xl transition-colors shadow-lg shadow-emerald-600/30 uppercase tracking-widest text-lg"
                    >
                        Calculate {calcTarget}
                    </button>
                </div>
            </div>

            {result && (
                <div className="bg-emerald-950 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

                    <h2 className="text-emerald-400 font-bold uppercase tracking-widest text-xs mb-2 z-10">Calculated {calcTarget}</h2>
                    <div className="text-emerald-600 font-mono text-sm mb-6 z-10 bg-black/40 px-3 py-1 rounded">Using {result.formula}</div>

                    <div className="flex items-baseline bg-black/30 px-8 py-6 rounded-2xl border border-white/10 z-10 shadow-inner">
                        <span className="text-5xl md:text-6xl font-black font-mono tracking-tight text-white mr-4">
                            {Number.isInteger(result.value) ? result.value : parseFloat(result.value.toFixed(6))}
                        </span>
                        <span className="text-2xl font-bold text-emerald-400">{result.unit}</span>
                    </div>
                </div>
            )}

            <div className="mt-8 bg-zinc-100 p-6 rounded-xl border border-zinc-200 text-sm text-zinc-600 max-w-2xl mx-auto space-y-2">
                <p className="font-bold text-zinc-800 uppercase tracking-widest mb-4">Kinematics Reference</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ul className="list-disc pl-5 space-y-1 font-mono">
                        <li>Velocity (v) = d / t</li>
                        <li>Distance (d) = v × t</li>
                        <li>Time (t) = d / v</li>
                    </ul>
                    <ul className="list-disc pl-5 space-y-1 font-mono">
                        <li>1 km/h ≈ 0.27778 m/s</li>
                        <li>1 mph ≈ 0.44704 m/s</li>
                        <li>1 mile = 1609.344 m</li>
                    </ul>
                </div>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Velocity Calculator", "operatingSystem": "All", "applicationCategory": "EducationalApplication" }) }} />
        </div>
    );
}
