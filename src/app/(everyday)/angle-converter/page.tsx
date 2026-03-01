'use client';

import { useState } from 'react';

const ANGLE_UNITS = [
    { id: 'degrees', name: 'Degrees (°)', toDegrees: 1 },
    { id: 'radians', name: 'Radians (rad)', toDegrees: 180 / Math.PI },
    { id: 'gradians', name: 'Gradians (grad)', toDegrees: 0.9 },
    { id: 'arcminutes', name: 'Arcminutes (\')', toDegrees: 1 / 60 },
    { id: 'arcseconds', name: 'Arcseconds (")', toDegrees: 1 / 3600 },
    { id: 'turns', name: 'Turns (cycles)', toDegrees: 360 },
];

export default function AngleConverter() {
    const [inputValue, setInputValue] = useState('180');
    const [inputUnit, setInputUnit] = useState('degrees');
    const [outputUnit, setOutputUnit] = useState('radians');

    const handleSwap = () => {
        setInputUnit(outputUnit);
        setOutputUnit(inputUnit);
    };

    let result = '';
    const val = parseFloat(inputValue);

    if (!isNaN(val)) {
        // Convert input to degrees first
        const inUnit = ANGLE_UNITS.find(u => u.id === inputUnit);
        const outUnit = ANGLE_UNITS.find(u => u.id === outputUnit);

        if (inUnit && outUnit) {
            const valueInDegrees = val * inUnit.toDegrees;
            const convertedValue = valueInDegrees / outUnit.toDegrees;

            // Format nicely, avoiding scientific notation for reasonable numbers
            result = convertedValue % 1 === 0 ? convertedValue.toString() : convertedValue.toFixed(6).replace(/\.?0+$/, '');
        }
    }

    return (
        <div className="max-w-3xl mx-auto p-4 md:p-8 bg-white rounded-2xl shadow-xl border border-indigo-100">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-indigo-900 flex items-center justify-center">
                    <span className="mr-3">📐</span> Angle Converter
                </h1>
                <p className="text-indigo-700 text-lg">
                    Instantly convert angles between degrees, radians, gradians, and more.
                </p>
            </div>

            <div className="bg-indigo-50/50 p-6 md:p-8 rounded-2xl border border-indigo-100 shadow-inner space-y-8 relative">

                {/* Decorative background circle */}
                <div className="absolute right-0 top-0 w-32 h-32 bg-indigo-200/40 rounded-full blur-2xl pointer-events-none transform translate-x-1/2 -translate-y-1/2"></div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center relative z-10">

                    {/* Input */}
                    <div className="md:col-span-2 space-y-2">
                        <label className="block text-xs font-bold text-indigo-800 uppercase tracking-widest">From</label>
                        <div className="relative border border-indigo-200 shadow-sm rounded-xl bg-white overflow-hidden transition-all focus-within:ring-2 focus-within:ring-indigo-300 focus-within:border-indigo-400">
                            <input
                                type="number" step="any"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                className="w-full p-4 rounded-t-xl outline-none font-bold text-2xl text-slate-800"
                                placeholder="0"
                            />
                            <select
                                value={inputUnit}
                                onChange={(e) => setInputUnit(e.target.value)}
                                className="w-full bg-slate-50 border-t border-indigo-100 p-3 outline-none cursor-pointer font-semibold text-indigo-900"
                            >
                                {ANGLE_UNITS.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* Swap Button */}
                    <div className="md:col-span-1 flex justify-center py-4 md:py-0">
                        <button
                            onClick={handleSwap}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-4 shadow-lg transform transition hover:scale-110 active:scale-95 border-4 border-white"
                            title="Swap Units"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                            </svg>
                        </button>
                    </div>

                    {/* Output */}
                    <div className="md:col-span-2 space-y-2">
                        <label className="block text-xs font-bold text-indigo-800 uppercase tracking-widest">To</label>
                        <div className="relative border border-indigo-200 shadow-sm rounded-xl bg-indigo-900 overflow-hidden transition-all">
                            <div className="w-full p-4 rounded-t-xl font-bold text-2xl text-white overflow-x-auto min-h-[64px] flex items-center">
                                {result || '0'}
                            </div>
                            <select
                                value={outputUnit}
                                onChange={(e) => setOutputUnit(e.target.value)}
                                className="w-full bg-indigo-950 border-t border-indigo-800 p-3 outline-none cursor-pointer font-semibold text-indigo-200"
                            >
                                {ANGLE_UNITS.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Common Conversions Quick Reference */}
                <div className="pt-8 border-t border-indigo-200 relative z-10">
                    <h3 className="text-xs font-bold text-indigo-700 uppercase tracking-widest mb-4">Quick Reference (Degrees to Radians)</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[
                            { deg: 30, rad: 'π/6' },
                            { deg: 45, rad: 'π/4' },
                            { deg: 60, rad: 'π/3' },
                            { deg: 90, rad: 'π/2' },
                            { deg: 180, rad: 'π' },
                            { deg: 270, rad: '3π/2' },
                            { deg: 360, rad: '2π' },
                            { deg: 1, rad: '≈ 0.0175' }
                        ].map(q => (
                            <button
                                key={q.deg}
                                onClick={() => { setInputValue(q.deg.toString()); setInputUnit('degrees'); setOutputUnit('radians'); }}
                                className="bg-white border border-indigo-100 p-3 rounded-lg text-center hover:bg-indigo-50 hover:border-indigo-300 transition-colors shadow-sm cursor-pointer"
                            >
                                <div className="font-bold text-indigo-900">{q.deg}°</div>
                                <div className="text-xs text-indigo-500 font-mono mt-1">{q.rad}</div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Angle Converter", "operatingSystem": "All", "applicationCategory": "UtilitiesApplication" }) }} />
        </div>
    );
}
