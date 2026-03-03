'use client';

import { useState } from 'react';
import CalculatorSEO from '@/components/CalculatorSEO';

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

            <div className="mt-8">
                <CalculatorSEO
                    title="Acceleration Calculator"
                    whatIsIt={
                        <>
                            <p>Our <strong>Acceleration Calculator</strong> measures the rate at which an object changes its velocity over time. Using fundamental kinematic equations, it allows you to solve for uniform acceleration, initial velocity, final velocity, or elapsed duration.</p>
                            <p>In physics, any change in speed or direction means an object is accelerating. Even if a car remains at exactly 60 mph, if it goes around a curve, it is technically accelerating because its directional vector is changing.</p>
                        </>
                    }
                    formula={
                        <>
                            <p>The standard formula for constant straight-line acceleration requires you to subtract the original speed from the final speed, and divide by the amount of time that passed.</p>
                            <div className="bg-emerald-50 p-4 rounded-lg font-mono text-center text-[15px] shadow-sm my-4 flex flex-col gap-2 border border-emerald-100 text-emerald-900">
                                <p><strong>a = (v<sub>f</sub> - v<sub>i</sub>) ÷ t</strong></p>
                                <p className="text-sm mt-2 font-sans text-emerald-800">
                                    <em>Where <strong>a</strong> is acceleration, <strong>v<sub>f</sub></strong> is final velocity, <strong>v<sub>i</sub></strong> is initial velocity, and <strong>t</strong> is time.</em>
                                </p>
                            </div>
                        </>
                    }
                    example={
                        <>
                            <p>Let's calculate the acceleration of a sports car merging onto a highway.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                                <li><strong>The Scenario:</strong> A car enters a highway on-ramp at <strong>10 m/s</strong> (Initial Velocity). The driver steps on the gas, and <strong>5 seconds</strong> later (Time), the car is traveling at <strong>30 m/s</strong> (Final Velocity).</li>
                                <li><strong>The Change in Velocity:</strong> 30 m/s - 10 m/s = 20 m/s increase in speed.</li>
                                <li><strong>The Calculation:</strong> 20 m/s ÷ 5 seconds = <strong>4</strong>.</li>
                                <li><strong>Result:</strong> The car accelerated at a constant rate of <strong>4 m/s²</strong>. For every second that passed, the car's speed increased by 4 meters per second.</li>
                            </ul>
                        </>
                    }
                    useCases={
                        <ul className="list-disc pl-6 space-y-4 text-gray-700">
                            <li><strong>Automotive Engineering:</strong> Car manufacturers use acceleration metrics to define vehicle performance. The famous "0 to 60 mph in 3 seconds" metric is a pure measurement of intense positive acceleration.</li>
                            <li><strong>Space Exploration:</strong> NASA must perfectly calculate orbital acceleration. If a rocket accelerates too slowly, it will succumb to Earth's gravity and crash. If it accelerates too rapidly, the G-forces will crush the astronauts inside.</li>
                            <li><strong>Accident Reconstruction:</strong> Forensic experts calculate "negative acceleration" (deceleration) by measuring tire skid marks to determine exactly how fast a vehicle was traveling before it slammed on the brakes.</li>
                        </ul>
                    }
                    faqs={[
                        {
                            question: "Can acceleration be a negative number?",
                            answer: "Yes. Negative acceleration (often called deceleration) simply means the object is slowing down relative to its direction of travel. If a car goes from 60 mph to 0 mph, its acceleration is a negative value."
                        },
                        {
                            question: "What does 'm/s²' actually mean?",
                            answer: "Meters per second squared (m/s²) is the standard metric unit for acceleration. It simply means 'meters per second, per second.' If gravity is 9.8 m/s², it means every single second an object falls, its speed increases by an additional 9.8 m/s."
                        },
                        {
                            question: "Is 'g-force' the same thing as acceleration?",
                            answer: "Yes. G-force is just a way of expressing extreme acceleration relative to Earth's standard gravitational pull (1G = 9.8 m/s²). A fighter jet pulling '5Gs' is accelerating 5 times faster than standard freefall."
                        }
                    ]}
                    relatedCalculators={[
                        { name: "Force Calculator", path: "/force-calculator", desc: "Calculate the exact physical force required to generate a specific acceleration." },
                        { name: "Velocity Calculator", path: "/velocity-calculator", desc: "Calculate constant speeds without using acceleration variables." },
                        { name: "Projectile Motion Calculator", path: "/projectile-motion-calculator", desc: "Track objects accelerating continuously downward due to standard gravity." }
                    ]}
                />
            </div>
        </div>
    );
}
