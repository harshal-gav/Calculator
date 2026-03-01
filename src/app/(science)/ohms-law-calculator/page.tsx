'use client';

import { useState } from 'react';

export default function OhmsLawCalculator() {
    // V = I * R
    // P = V * I = I^2 * R = V^2 / R
    const [voltage, setVoltage] = useState('12');  // V
    const [current, setCurrent] = useState('2');   // I
    const [resistance, setResistance] = useState(''); // R
    const [power, setPower] = useState('');        // P

    const [msg, setMsg] = useState('');

    const calculate = () => {
        setMsg('');
        const v = parseFloat(voltage);
        const i = parseFloat(current);
        const r = parseFloat(resistance);
        const p = parseFloat(power);

        // Count non-NaN inputs
        const vals = { v: !isNaN(v), i: !isNaN(i), r: !isNaN(r), p: !isNaN(p) };
        const count = Object.values(vals).filter(Boolean).length;

        if (count < 2) {
            setMsg('Please enter exactly 2 values to calculate the others.');
            return;
        }
        if (count > 2) {
            setMsg('Please enter ONLY 2 values. Clear the others to recalculate.');
            return;
        }

        let newV = v; let newI = i; let newR = r; let newP = p;

        if (vals.v && vals.i) {
            newR = v / i;
            newP = v * i;
        } else if (vals.v && vals.r) {
            newI = v / r;
            newP = (v * v) / r;
        } else if (vals.v && vals.p) {
            newI = p / v;
            newR = (v * v) / p;
        } else if (vals.i && vals.r) {
            newV = i * r;
            newP = i * i * r;
        } else if (vals.i && vals.p) {
            newV = p / i;
            newR = p / (i * i);
        } else if (vals.r && vals.p) {
            newV = Math.sqrt(p * r);
            newI = Math.sqrt(p / r);
        }

        setVoltage(newV.toFixed(4).replace(/\.0000$/, ''));
        setCurrent(newI.toFixed(4).replace(/\.0000$/, ''));
        setResistance(newR.toFixed(4).replace(/\.0000$/, ''));
        setPower(newP.toFixed(4).replace(/\.0000$/, ''));
    };

    const clearAll = () => {
        setVoltage('');
        setCurrent('');
        setResistance('');
        setPower('');
        setMsg('');
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-emerald-900 flex items-center justify-center font-serif">
                    <span className="mr-3">⚡</span> Ohm's Law Calculator
                </h1>
                <p className="text-emerald-700 text-lg max-w-2xl mx-auto">
                    Enter any two values to instantly calculate the remaining properties in the circuit.
                </p>
            </div>

            <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-zinc-200 mb-8">

                {msg && (
                    <div className="mb-6 bg-rose-50 border border-rose-200 text-rose-600 p-4 rounded-xl text-center font-bold text-sm uppercase tracking-wide">
                        {msg}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    <div className="bg-zinc-50 p-6 rounded-xl border border-zinc-200 shadow-inner group focus-within:bg-white focus-within:border-emerald-300 transition-colors">
                        <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">Voltage (V)</label>
                        <div className="relative">
                            <input
                                type="number" step="any" min="0"
                                value={voltage}
                                onChange={(e) => setVoltage(e.target.value)}
                                className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-emerald-500 font-bold bg-white text-emerald-900 text-2xl pr-20"
                                placeholder="Enter value"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-emerald-600 font-mono text-xl">V</span>
                        </div>
                        <p className="text-xs text-zinc-400 font-bold mt-2 uppercase tracking-widest pl-1">Volts</p>
                    </div>

                    <div className="bg-zinc-50 p-6 rounded-xl border border-zinc-200 shadow-inner group focus-within:bg-white focus-within:border-emerald-300 transition-colors">
                        <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">Current (I)</label>
                        <div className="relative">
                            <input
                                type="number" step="any" min="0"
                                value={current}
                                onChange={(e) => setCurrent(e.target.value)}
                                className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-emerald-500 font-bold bg-white text-emerald-900 text-2xl pr-20"
                                placeholder="Enter value"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-emerald-600 font-mono text-xl">A</span>
                        </div>
                        <p className="text-xs text-zinc-400 font-bold mt-2 uppercase tracking-widest pl-1">Amps</p>
                    </div>

                    <div className="bg-zinc-50 p-6 rounded-xl border border-zinc-200 shadow-inner group focus-within:bg-white focus-within:border-emerald-300 transition-colors">
                        <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">Resistance (R)</label>
                        <div className="relative">
                            <input
                                type="number" step="any" min="0"
                                value={resistance}
                                onChange={(e) => setResistance(e.target.value)}
                                className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-emerald-500 font-bold bg-white text-emerald-900 text-2xl pr-20"
                                placeholder="Enter value"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-emerald-600 font-mono text-xl">Ω</span>
                        </div>
                        <p className="text-xs text-zinc-400 font-bold mt-2 uppercase tracking-widest pl-1">Ohms</p>
                    </div>

                    <div className="bg-zinc-50 p-6 rounded-xl border border-zinc-200 shadow-inner group focus-within:bg-white focus-within:border-emerald-300 transition-colors">
                        <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">Power (P)</label>
                        <div className="relative">
                            <input
                                type="number" step="any" min="0"
                                value={power}
                                onChange={(e) => setPower(e.target.value)}
                                className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-emerald-500 font-bold bg-white text-emerald-900 text-2xl pr-20"
                                placeholder="Enter value"
                                onKeyDown={(e) => e.key === 'Enter' && calculate()}
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-emerald-600 font-mono text-xl">W</span>
                        </div>
                        <p className="text-xs text-zinc-400 font-bold mt-2 uppercase tracking-widest pl-1">Watts</p>
                    </div>

                </div>

                <div className="mt-8 flex flex-col md:flex-row gap-4">
                    <button
                        onClick={calculate}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-5 px-6 rounded-xl transition-colors shadow-lg shadow-emerald-600/30 uppercase tracking-widest text-lg"
                    >
                        Calculate Missing
                    </button>
                    <button
                        onClick={clearAll}
                        className="md:w-32 bg-zinc-200 hover:bg-zinc-300 text-zinc-700 font-bold py-5 px-6 rounded-xl transition-colors shadow-sm uppercase tracking-widest text-sm"
                    >
                        Clear
                    </button>
                </div>
            </div>

            <div className="mt-8 bg-zinc-100 p-8 rounded-xl border border-zinc-200 text-sm text-zinc-600 max-w-2xl mx-auto text-center shadow-inner">
                <p className="font-bold text-zinc-800 uppercase tracking-widest mb-6">Ohm's Law Wheel</p>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 font-mono font-bold">
                    <div className="bg-white p-4 rounded-lg shadow border border-zinc-200 flex flex-col items-center justify-center min-h-[5rem]">
                        <span className="text-emerald-700 block mb-2 font-serif text-lg border-b border-emerald-100 pb-1 w-full">V =</span>
                        <span className="text-lg">I × R</span>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow border border-zinc-200 flex flex-col items-center justify-center min-h-[5rem]">
                        <span className="text-emerald-700 block mb-2 font-serif text-lg border-b border-emerald-100 pb-1 w-full">I =</span>
                        <span className="text-lg">V / R</span>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow border border-zinc-200 flex flex-col items-center justify-center min-h-[5rem]">
                        <span className="text-emerald-700 block mb-2 font-serif text-lg border-b border-emerald-100 pb-1 w-full">R =</span>
                        <span className="text-lg">V / I</span>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow border border-zinc-200 flex flex-col items-center justify-center min-h-[5rem]">
                        <span className="text-emerald-700 block mb-2 font-serif text-lg border-b border-emerald-100 pb-1 w-full">P =</span>
                        <span className="text-lg">V × I</span>
                    </div>
                </div>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Ohm's Law Calculator", "operatingSystem": "All", "applicationCategory": "EducationalApplication" }) }} />
        </div>
    );
}
