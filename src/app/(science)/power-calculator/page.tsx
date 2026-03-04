'use client';

import { useState } from 'react';
import CalculatorSEO from '@/components/CalculatorSEO';

export default function PowerCalculator() {
    // P = W / t OR P = E / t
    const [calcTarget, setCalcTarget] = useState('power');

    // Inputs
    const [power, setPower] = useState('');
    const [work, setWork] = useState('500'); // Joules
    const [time, setTime] = useState('10');  // Seconds

    const [result, setResult] = useState<{ value: number; unit: string; formula: string } | null>(null);

    const calculate = () => {
        let res = 0;
        let resUnit = '';
        let formula = '';

        if (calcTarget === 'power') {
            const w = parseFloat(work);
            const t = parseFloat(time);
            if (isNaN(w) || isNaN(t) || t === 0) return setResult(null);

            res = w / t;
            resUnit = 'Watts (W)';
            formula = 'P = W / t';

        } else if (calcTarget === 'work') {
            const p = parseFloat(power);
            const t = parseFloat(time);
            if (isNaN(p) || isNaN(t)) return setResult(null);

            res = p * t;
            resUnit = 'Joules (J)';
            formula = 'W = P × t';

        } else if (calcTarget === 'time') {
            const p = parseFloat(power);
            const w = parseFloat(work);
            if (isNaN(p) || isNaN(w) || p === 0) return setResult(null);

            res = w / p;
            resUnit = 'Seconds (s)';
            formula = 't = W / P';
        }

        setResult({ value: res, unit: resUnit, formula });
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-emerald-900 flex items-center justify-center font-serif">
                    <span className="mr-3">⚡</span> Power Calculator
                </h1>
                <p className="text-emerald-700 text-lg max-w-2xl mx-auto">
                    Calculate mechanical or electrical power, work (energy), or time.
                </p>
            </div>

            <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-zinc-200 mb-8">
                <div className="mb-8 p-4 bg-emerald-50 rounded-xl border border-emerald-100 flex flex-col md:flex-row items-center gap-4">
                    <label className="font-bold text-emerald-900 whitespace-nowrap uppercase tracking-widest text-sm">Target:</label>
                    <div className="flex bg-white rounded-lg p-1 shadow-sm border border-zinc-200 w-full">
                        {[
                            { id: 'power', label: 'Power (P)' },
                            { id: 'work', label: 'Work/Energy (W)' },
                            { id: 'time', label: 'Time (t)' }
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

                    {calcTarget !== 'power' && (
                        <div>
                            <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">Power (P)</label>
                            <div className="relative">
                                <input
                                    type="number" step="any" min="0"
                                    value={power}
                                    onChange={(e) => setPower(e.target.value)}
                                    className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-emerald-500 font-bold bg-zinc-50 pr-20"
                                    placeholder="e.g. 50"
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-zinc-400">Watts</span>
                            </div>
                        </div>
                    )}

                    {calcTarget !== 'work' && (
                        <div>
                            <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">Work / Energy (W)</label>
                            <div className="relative">
                                <input
                                    type="number" step="any" min="0"
                                    value={work}
                                    onChange={(e) => setWork(e.target.value)}
                                    className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-emerald-500 font-bold bg-zinc-50 pr-20"
                                    placeholder="e.g. 500"
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-zinc-400">Joules</span>
                            </div>
                        </div>
                    )}

                    {calcTarget !== 'time' && (
                        <div>
                            <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">Time (t)</label>
                            <div className="relative">
                                <input
                                    type="number" step="any" min="0"
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-emerald-500 font-bold bg-zinc-50 pr-24"
                                    placeholder="e.g. 10"
                                    onKeyDown={(e) => e.key === 'Enter' && calculate()}
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-zinc-400">Seconds</span>
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

                    <div className="flex flex-col items-center justify-center bg-black/30 px-8 py-6 rounded-2xl border border-white/10 z-10 shadow-inner w-full max-w-md text-center">
                        <span className="text-5xl md:text-6xl font-black font-mono tracking-tight text-white mb-2 break-all">
                            {Number.isInteger(result.value) ? result.value : parseFloat(result.value.toFixed(6))}
                        </span>
                        <span className="text-xl font-bold text-emerald-400 uppercase tracking-widest">{result.unit}</span>
                    </div>

                    {calcTarget === 'power' && result.value > 0 && (
                        <div className="mt-6 z-10 pt-4 border-t border-emerald-800/50 w-full max-w-md flex justify-between px-4">
                            <div className="text-center">
                                <div className="text-emerald-500 text-xs font-bold uppercase tracking-wider mb-1">Kilowatts</div>
                                <div className="text-white font-mono">{(result.value / 1000).toFixed(4)} kW</div>
                            </div>
                            <div className="text-center">
                                <div className="text-emerald-500 text-xs font-bold uppercase tracking-wider mb-1">Horsepower</div>
                                <div className="text-white font-mono">{(result.value / 745.7).toFixed(4)} hp</div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Power Calculator", "operatingSystem": "All", "applicationCategory": "EducationalApplication" }) }} />

            <div className="mt-8">
                <CalculatorSEO
                    title="Physics Power Calculator (Watts, Joules & Seconds)"
                    whatIsIt={
                        <>
                            <p>The <strong>Power Calculator</strong> is a classical mechanics tool that computes the exact rate at which work is done or energy is transferred within a physical system.</p>
                            <p>In physics, "Power" is not a measure of total strength, but rather a measure of how <em>fast</em> energy is being used. Doing 100 Joules of work over 10 seconds requires very little power. Doing that exact same 100 Joules of work in 0.1 seconds requires massive power. This tool calculates the exact relationship between Energy (Joules), Time (Seconds), and Power (Watts/Horsepower).</p>
                        </>
                    }
                    formula={
                        <>
                            <p>The core relationship is defined by the standard classical mechanics formula:</p>
                            <div className="bg-emerald-50 p-4 rounded-xl mt-4 border border-emerald-100 italic text-center text-lg text-emerald-800">
                                <strong>P = W / t</strong>
                            </div>
                            <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                                <li><strong>Power (P):</strong> Measured in Watts (W). 1 Watt equals exactly 1 Joule per second.</li>
                                <li><strong>Work/Energy (W):</strong> Measured in Joules (J). The total absolute amount of energy transferred.</li>
                                <li><strong>Time (t):</strong> Measured in Seconds (s). The duration over which the work is performed.</li>
                            </ul>
                        </>
                    }
                    example={
                        <>
                            <p>Imagine a motor lifting a 50kg box up to a 10-meter high shelf. The total Work (Energy) required to fight gravity is roughly <strong>4,900 Joules</strong>.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                                <li><strong>Scenario A (Slow Motor):</strong> The motor takes <strong>10 seconds</strong> to lift the box.<br />Calculation: 4900 Joules / 10 seconds = <strong>490 Watts</strong> of Power.</li>
                                <li><strong>Scenario B (Fast Motor):</strong> The motor lifts the box in just <strong>2 seconds</strong>.<br />Calculation: 4900 Joules / 2 seconds = <strong>2,450 Watts</strong> of Power.</li>
                            </ul>
                            <p className="mt-2 text-sm text-gray-600">Both motors did the exact same amount of "Work", but the fast motor required five times more "Power".</p>
                        </>
                    }
                    useCases={
                        <ul className="list-disc pl-6 space-y-4 text-gray-700">
                            <li><strong>Mechanical Engineering:</strong> Sizing the exact motor required to operate an elevator, balancing the maximum load capacity (Joules) against the desired travel speed (Seconds).</li>
                            <li><strong>Electrical Consumption Analysis:</strong> Calculating how long (Time) a battery storing 50,000 Joules of energy can run a 500-Watt appliance before dying.</li>
                            <li><strong>Athletic Performance:</strong> Cyclists calculating their exact physical Watt output by dividing the mechanical work done pushing the pedals by the duration of their uphill sprint.</li>
                        </ul>
                    }
                    faqs={[
                        {
                            question: "How does this relate to Electrical Power?",
                            answer: "The underlying physics is identical (1 Watt = 1 Joule/second). However, electrical power is usually calculated using Ohm's Law (Volts × Amps) rather than raw mechanical work over time. If you need circuit calculations, see our Ohm's Law tool."
                        },
                        {
                            question: "What exactly is a 'Horsepower'?",
                            answer: "It is an outdated imperial unit of mechanical power originally invented by James Watt to compare steam engines to draft horses. 1 standard mechanical Horsepower is exactly equal to 745.7 Watts."
                        },
                        {
                            question: "Why do my electricity bills use 'Kilowatt-Hours' instead of Joules?",
                            answer: "A Joule is a very small amount of energy. A 100W lightbulb uses 360,000 Joules in just one hour. To make the numbers manageable, utility companies use 'kWh'. 1 kWh is equal to exactly 3.6 million Joules."
                        }
                    ]}
                    relatedCalculators={[
                        { name: "Ohm's Law Calculator", path: "/ohms-law-calculator", desc: "Calculate Electrical Power (Watts) purely from Voltage, Current (Amps), and Resistance." },
                        { name: "Kinetic Energy Calculator", path: "/kinetic-energy-calculator", desc: "Find the total energy in Joules of a moving object using its mass and velocity." },
                        { name: "Velocity Calculator", path: "/velocity-calculator", desc: "Determine how fast an object is moving by dividing total distance by time." }
                    ]}
                />
            </div>
        </div>
    );
}
