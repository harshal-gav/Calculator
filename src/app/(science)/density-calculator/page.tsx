'use client';

import { useState } from 'react';

export default function DensityCalculator() {
    const [calcType, setCalcType] = useState('density'); // density, mass, volume
    const [density, setDensity] = useState('1000'); // kg/m^3 (water)
    const [mass, setMass] = useState('100'); // kg
    const [volume, setVolume] = useState('0.1'); // m^3

    const [densityUnit, setDensityUnit] = useState('kg_m3');
    const [massUnit, setMassUnit] = useState('kg');
    const [volumeUnit, setVolumeUnit] = useState('m3');

    // Unit conversions to base SI (kg, m^3, kg/m^3)
    const massToKg: Record<string, number> = {
        'kg': 1,
        'g': 0.001,
        'mg': 0.000001,
        'lb': 0.453592,
        'oz': 0.0283495,
        'ton': 1000
    };

    const volumeToM3: Record<string, number> = {
        'm3': 1,
        'cm3': 0.000001, // same as mL
        'l': 0.001,
        'ml': 0.000001,
        'ft3': 0.0283168,
        'in3': 0.000016387,
        'gal_us': 0.00378541
    };

    const densityToKgM3: Record<string, number> = {
        'kg_m3': 1,
        'g_cm3': 1000,
        'g_ml': 1000,
        'kg_l': 1000,
        'lb_ft3': 16.0185,
        'lb_in3': 27679.9
    };

    const computeResult = () => {
        const p = parseFloat(density);
        const m = parseFloat(mass);
        const v = parseFloat(volume);

        if (calcType === 'density') {
            if (!isNaN(m) && !isNaN(v) && v !== 0) {
                // p = m/v
                const m_kg = m * massToKg[massUnit];
                const v_m3 = v * volumeToM3[volumeUnit];
                const p_kg_m3 = m_kg / v_m3;
                const result = p_kg_m3 / densityToKgM3[densityUnit];
                return { value: result, unitLabel: densityUnit.replace('_', '/') };
            }
        } else if (calcType === 'mass') {
            if (!isNaN(p) && !isNaN(v)) {
                // m = p*v
                const p_kg_m3 = p * densityToKgM3[densityUnit];
                const v_m3 = v * volumeToM3[volumeUnit];
                const m_kg = p_kg_m3 * v_m3;
                const result = m_kg / massToKg[massUnit];
                return { value: result, unitLabel: massUnit };
            }
        } else if (calcType === 'volume') {
            if (!isNaN(p) && !isNaN(m) && p !== 0) {
                // v = m/p
                const p_kg_m3 = p * densityToKgM3[densityUnit];
                const m_kg = m * massToKg[massUnit];
                const v_m3 = m_kg / p_kg_m3;
                const result = v_m3 / volumeToM3[volumeUnit];
                return { value: result, unitLabel: volumeUnit };
            }
        }
        return { value: null, unitLabel: '' };
    };

    const resultData = computeResult();

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-cyan-900 flex items-center justify-center">
                    <span className="mr-3">⚖️</span> Density Calculator
                </h1>
                <p className="text-zinc-600 text-lg max-w-2xl mx-auto">
                    Calculate Density (ρ), Mass (m), or Volume (V) of an object using the standard density formula.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

                {/* Inputs */}
                <div className="lg:col-span-3 space-y-6 bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm relative">
                    <div className="absolute top-0 left-0 w-2 h-full bg-cyan-500 rounded-l-2xl"></div>

                    <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">Solve For</label>
                        <select
                            value={calcType}
                            onChange={(e) => setCalcType(e.target.value)}
                            className="w-full rounded-xl border-zinc-300 p-4 shadow-sm focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all font-bold bg-zinc-50 cursor-pointer text-cyan-900"
                        >
                            <option value="density">Density (ρ)</option>
                            <option value="mass">Mass (m)</option>
                            <option value="volume">Volume (V)</option>
                        </select>
                    </div>

                    <div className="space-y-4">
                        {calcType !== 'density' && (
                            <div>
                                <label className="block text-xs font-bold text-zinc-500 mb-1 uppercase tracking-widest">Density (ρ)</label>
                                <div className="flex">
                                    <input
                                        type="number" step="any"
                                        value={density}
                                        onChange={(e) => setDensity(e.target.value)}
                                        className="w-full rounded-l-xl border-zinc-200 p-3 shadow-sm focus:border-cyan-500 font-mono font-bold"
                                    />
                                    <select
                                        value={densityUnit}
                                        onChange={(e) => setDensityUnit(e.target.value)}
                                        className="border-y border-r border-zinc-200 bg-zinc-100 text-zinc-700 font-bold px-3 rounded-r-xl"
                                    >
                                        <option value="kg_m3">kg/m³</option>
                                        <option value="g_cm3">g/cm³</option>
                                        <option value="kg_l">kg/L</option>
                                        <option value="lb_ft3">lb/ft³</option>
                                    </select>
                                </div>
                            </div>
                        )}
                        {calcType !== 'mass' && (
                            <div>
                                <label className="block text-xs font-bold text-zinc-500 mb-1 uppercase tracking-widest">Mass (m)</label>
                                <div className="flex">
                                    <input
                                        type="number" step="any"
                                        value={mass}
                                        onChange={(e) => setMass(e.target.value)}
                                        className="w-full rounded-l-xl border-zinc-200 p-3 shadow-sm focus:border-cyan-500 font-mono font-bold"
                                    />
                                    <select
                                        value={massUnit}
                                        onChange={(e) => setMassUnit(e.target.value)}
                                        className="border-y border-r border-zinc-200 bg-zinc-100 text-zinc-700 font-bold px-3 rounded-r-xl"
                                    >
                                        <option value="kg">kg</option>
                                        <option value="g">g</option>
                                        <option value="lb">lb</option>
                                        <option value="oz">oz</option>
                                        <option value="ton">ton (metric)</option>
                                    </select>
                                </div>
                            </div>
                        )}
                        {calcType !== 'volume' && (
                            <div>
                                <label className="block text-xs font-bold text-zinc-500 mb-1 uppercase tracking-widest">Volume (V)</label>
                                <div className="flex">
                                    <input
                                        type="number" step="any"
                                        value={volume}
                                        onChange={(e) => setVolume(e.target.value)}
                                        className="w-full rounded-l-xl border-zinc-200 p-3 shadow-sm focus:border-cyan-500 font-mono font-bold"
                                    />
                                    <select
                                        value={volumeUnit}
                                        onChange={(e) => setVolumeUnit(e.target.value)}
                                        className="border-y border-r border-zinc-200 bg-zinc-100 text-zinc-700 font-bold px-3 rounded-r-xl"
                                    >
                                        <option value="m3">m³</option>
                                        <option value="cm3">cm³</option>
                                        <option value="l">Liters (L)</option>
                                        <option value="ml">mL</option>
                                        <option value="ft3">ft³</option>
                                        <option value="gal_us">gal (US)</option>
                                    </select>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* Select Output Unit for the solved variable */}
                    {calcType === 'density' && (
                        <div className="pt-4 border-t border-zinc-100">
                            <label className="block text-xs font-bold text-cyan-700 mb-2 uppercase tracking-wide">Result Unit (Density)</label>
                            <select
                                value={densityUnit}
                                onChange={(e) => setDensityUnit(e.target.value)}
                                className="w-full rounded-xl border-cyan-200 p-3 shadow-sm focus:border-cyan-500 font-semibold bg-cyan-50/50"
                            >
                                <option value="kg_m3">kg/m³</option>
                                <option value="g_cm3">g/cm³</option>
                                <option value="kg_l">kg/L</option>
                                <option value="lb_ft3">lb/ft³</option>
                            </select>
                        </div>
                    )}
                    {calcType === 'mass' && (
                        <div className="pt-4 border-t border-zinc-100">
                            <label className="block text-xs font-bold text-cyan-700 mb-2 uppercase tracking-wide">Result Unit (Mass)</label>
                            <select
                                value={massUnit}
                                onChange={(e) => setMassUnit(e.target.value)}
                                className="w-full rounded-xl border-cyan-200 p-3 shadow-sm focus:border-cyan-500 font-semibold bg-cyan-50/50"
                            >
                                <option value="kg">kg</option>
                                <option value="g">g</option>
                                <option value="lb">lb</option>
                                <option value="oz">oz</option>
                                <option value="ton">ton (metric)</option>
                            </select>
                        </div>
                    )}
                    {calcType === 'volume' && (
                        <div className="pt-4 border-t border-zinc-100">
                            <label className="block text-xs font-bold text-cyan-700 mb-2 uppercase tracking-wide">Result Unit (Volume)</label>
                            <select
                                value={volumeUnit}
                                onChange={(e) => setVolumeUnit(e.target.value)}
                                className="w-full rounded-xl border-cyan-200 p-3 shadow-sm focus:border-cyan-500 font-semibold bg-cyan-50/50"
                            >
                                <option value="m3">m³</option>
                                <option value="cm3">cm³</option>
                                <option value="l">Liters (L)</option>
                                <option value="ml">mL</option>
                                <option value="ft3">ft³</option>
                                <option value="gal_us">gal (US)</option>
                            </select>
                        </div>
                    )}
                </div>

                {/* Dashboard Output */}
                <div className="lg:col-span-2">
                    {resultData.value !== null ? (
                        <div className="h-full bg-cyan-900 rounded-2xl p-8 shadow-2xl relative overflow-hidden flex flex-col justify-center text-white border border-cyan-800">
                            {/* Decorative element map dots */}
                            <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none"></div>

                            <div className="relative z-10 text-center">
                                <h2 className="text-cyan-200 font-bold uppercase tracking-widest text-xs mb-8 border-b border-cyan-800/50 pb-4">
                                    Calculated {calcType === 'density' ? 'Density' : calcType === 'mass' ? 'Mass' : 'Volume'}
                                </h2>

                                <div className="text-5xl lg:text-5xl font-black tracking-tight text-white mb-4 drop-shadow-lg break-all font-mono">
                                    {parseFloat(resultData.value.toPrecision(7))}
                                </div>
                                <div className="text-cyan-400 font-bold text-xl tracking-wider">
                                    {resultData.unitLabel}
                                </div>

                                <div className="mt-8 pt-6 border-t border-cyan-800/50">
                                    <div className="text-cyan-300 text-[10px] uppercase font-bold tracking-widest text-center">Standard Formula</div>
                                    <div className="text-cyan-100 font-mono mt-2 bg-black/30 backdrop-blur-sm p-4 rounded-xl text-lg font-bold text-center border border-cyan-700/50">
                                        ρ = m/V
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full rounded-2xl border-2 border-dashed border-zinc-300 bg-zinc-100 flex flex-col items-center justify-center p-8 text-center text-zinc-500">
                            <span className="text-5xl mb-4 opacity-50 filter grayscale pt-10">⚖️</span>
                            <h3 className="text-zinc-700 font-bold text-lg mb-2">Awaiting Variables</h3>
                            <p className="text-sm">Enter the two known parameters to calculate the missing one.</p>
                        </div>
                    )}
                </div>

            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Density Calculator", "operatingSystem": "All", "applicationCategory": "EducationalApplication" }) }} />
        </div>
    );
}
