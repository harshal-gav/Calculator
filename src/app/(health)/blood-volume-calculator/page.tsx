'use client';

import { useState } from 'react';

export default function BloodVolumeCalculator() {
    const [gender, setGender] = useState('male');
    const [weight, setWeight] = useState('75');
    const [weightUnit, setWeightUnit] = useState('kg');
    const [height, setHeight] = useState('175');
    const [heightUnit, setHeightUnit] = useState('cm');

    const w = parseFloat(weight);
    const h = parseFloat(height);

    let weightInKg = w;
    if (weightUnit === 'lbs') {
        weightInKg = w / 2.20462;
    }

    let heightInCm = h;
    let heightInMeters = h / 100;
    if (heightUnit === 'in') {
        heightInCm = h * 2.54;
        heightInMeters = heightInCm / 100;
    }

    let nadlerVolume = 0;
    let lemMensVolume = 0;
    let avgVolume = 0;
    let isValid = false;

    if (!isNaN(weightInKg) && !isNaN(heightInMeters) && weightInKg > 0 && heightInMeters > 0) {
        isValid = true;

        // 1. Nadler's Formula
        if (gender === 'male') {
            nadlerVolume = (0.3669 * Math.pow(heightInMeters, 3)) + (0.03219 * weightInKg) + 0.6041;
        } else {
            nadlerVolume = (0.3561 * Math.pow(heightInMeters, 3)) + (0.03308 * weightInKg) + 0.1833;
        }

        // 2. Lemmens-Bernstein-Brodsky Formula
        // BV = Body Weight * 70 / Math.sqrt(BMI / 22)
        const bmi = weightInKg / Math.pow(heightInMeters, 2);
        lemMensVolume = (weightInKg * 70) / Math.sqrt(bmi / 22);
        // Convert mL to Liters
        lemMensVolume = lemMensVolume / 1000;

        avgVolume = (nadlerVolume + lemMensVolume) / 2;
    }

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-red-900 flex items-center justify-center">
                    <span className="mr-3">🩸</span> Blood Volume Calculator
                </h1>
                <p className="text-zinc-600 text-lg max-w-2xl mx-auto">
                    Estimate your total blood volume using the scientifically established Nadler and Lemmens formulas.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

                {/* Inputs */}
                <div className="lg:col-span-2 space-y-6 bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
                    <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">Biological Sex</label>
                        <select
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            className="w-full rounded-xl border-zinc-200 p-4 shadow-sm focus:border-red-500 font-semibold bg-zinc-50 cursor-pointer text-lg"
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">Height</label>
                        <div className="flex">
                            <input
                                type="number" min="1" step="0.1"
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                                className="w-full rounded-l-xl border-zinc-200 p-4 shadow-sm focus:border-red-500 font-bold text-xl bg-zinc-50"
                                placeholder="175"
                            />
                            <select
                                value={heightUnit}
                                onChange={(e) => setHeightUnit(e.target.value)}
                                className="border-y border-r border-zinc-200 bg-zinc-200 text-zinc-800 font-bold p-4 rounded-r-xl cursor-pointer hover:bg-zinc-300 transition-colors"
                            >
                                <option value="cm">cm</option>
                                <option value="in">in</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">Weight</label>
                        <div className="flex">
                            <input
                                type="number" min="1" step="0.1"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                className="w-full rounded-l-xl border-zinc-200 p-4 shadow-sm focus:border-red-500 font-bold text-xl bg-zinc-50"
                                placeholder="75"
                            />
                            <select
                                value={weightUnit}
                                onChange={(e) => setWeightUnit(e.target.value)}
                                className="border-y border-r border-zinc-200 bg-zinc-200 text-zinc-800 font-bold p-4 rounded-r-xl cursor-pointer hover:bg-zinc-300 transition-colors"
                            >
                                <option value="kg">kg</option>
                                <option value="lbs">lbs</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Dashboard Output */}
                <div className="lg:col-span-3">
                    {isValid ? (
                        <div className="h-full bg-red-900 rounded-2xl p-8 shadow-xl relative overflow-hidden flex flex-col justify-center text-white border border-red-800">
                            {/* Decorative element */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-500/30 via-transparent to-transparent pointer-events-none"></div>

                            <div className="relative z-10">
                                <h2 className="text-red-300 font-bold uppercase tracking-widest text-xs mb-8 text-center border-b border-red-800/50 pb-4">Estimated Total Blood Volume</h2>

                                <div className="flex flex-col items-center justify-center mb-10">
                                    <div className="text-7xl font-black tracking-tighter text-white drop-shadow-xl flex items-baseline">
                                        {avgVolume.toFixed(2)}
                                        <span className="text-3xl font-bold text-red-400 ml-2 tracking-wide uppercase">Liters</span>
                                    </div>
                                    <div className="text-sm font-medium text-red-200 mt-3 opacity-90 text-center px-4">
                                        Equivalent to {(avgVolume * 1000).toLocaleString(undefined, { maximumFractionDigits: 0 })} milliliters (mL)
                                    </div>
                                </div>

                                <div className="bg-red-950/60 rounded-xl p-5 border border-red-800/40 grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="text-[10px] text-red-400 uppercase font-bold tracking-widest mb-1">Nadler's Formula</div>
                                        <div className="text-xl font-bold font-mono">{nadlerVolume.toFixed(2)} L</div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] text-red-400 uppercase font-bold tracking-widest mb-1">Lemmens Formula</div>
                                        <div className="text-xl font-bold font-mono">{lemMensVolume.toFixed(2)} L</div>
                                    </div>
                                </div>

                                <div className="mt-6 text-[11px] text-red-300 text-center px-4 opacity-75">
                                    <span className="font-bold underline">Note:</span> These values are estimations based on statistical averages. Actual blood volume can vary based-on medical conditions, pregnancy, or altitude.
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full rounded-2xl border-2 border-dashed border-red-200 bg-red-50 flex flex-col items-center justify-center p-8 text-center">
                            <div className="text-6xl mb-4 drop-shadow-sm opacity-60">🩸</div>
                            <h3 className="text-red-900 font-bold text-xl mb-2">Awaiting Input</h3>
                            <p className="text-red-700/80 text-sm">Please provide your height and weight to estimate your blood volume.</p>
                        </div>
                    )}
                </div>

            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Blood Volume Calculator", "operatingSystem": "All", "applicationCategory": "HealthApplication" }) }} />
        </div>
    );
}
