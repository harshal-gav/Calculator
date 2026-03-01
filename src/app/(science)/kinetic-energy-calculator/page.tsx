'use client';

import { useState } from 'react';

export default function KineticEnergyCalculator() {
    const [calcType, setCalcType] = useState('ke'); // ke, mass, velocity

    // Values
    const [ke, setKe] = useState('100'); // Joules (J)
    const [mass, setMass] = useState('2'); // kg
    const [velocity, setVelocity] = useState('10'); // m/s

    // Units
    const [keUnit, setKeUnit] = useState('J');
    const [massUnit, setMassUnit] = useState('kg');
    const [velocityUnit, setVelocityUnit] = useState('m_s');

    // Unit conversions to base SI (J, kg, m/s)
    const massToKg: Record<string, number> = {
        'kg': 1,
        'g': 0.001,
        'lb': 0.453592,
        'oz': 0.0283495,
        'ton': 1000
    };

    const velocityToMS: Record<string, number> = {
        'm_s': 1,
        'km_h': 1 / 3.6,
        'mph': 0.44704,
        'ft_s': 0.3048,
        'knots': 0.514444
    };

    const keToJoules: Record<string, number> = {
        'J': 1,
        'kJ': 1000,
        'MJ': 1000000,
        'cal': 4.184,
        'kcal': 4184,
        'Wh': 3600,
        'kWh': 3600000,
        'eV': 1.60218e-19
    };

    const computeResult = () => {
        const energy = parseFloat(ke);
        const m = parseFloat(mass);
        const v = parseFloat(velocity);

        if (calcType === 'ke') {
            if (!isNaN(m) && !isNaN(v)) {
                // KE = 1/2 * m * v^2
                const m_kg = m * massToKg[massUnit];
                const v_ms = v * velocityToMS[velocityUnit];
                const ke_j = 0.5 * m_kg * Math.pow(v_ms, 2);
                const result = ke_j / keToJoules[keUnit];
                return { value: result, unitLabel: keUnit };
            }
        } else if (calcType === 'mass') {
            if (!isNaN(energy) && !isNaN(v) && v !== 0) {
                // m = 2 * KE / v^2
                const ke_j = energy * keToJoules[keUnit];
                const v_ms = v * velocityToMS[velocityUnit];
                const m_kg = (2 * ke_j) / Math.pow(v_ms, 2);
                const result = m_kg / massToKg[massUnit];
                return { value: result, unitLabel: massUnit };
            }
        } else if (calcType === 'velocity') {
            if (!isNaN(energy) && !isNaN(m) && m > 0 && energy >= 0) {
                // v = sqrt(2 * KE / m)
                const ke_j = energy * keToJoules[keUnit];
                const m_kg = m * massToKg[massUnit];
                const v_ms = Math.sqrt((2 * ke_j) / m_kg);
                const result = v_ms / velocityToMS[velocityUnit];

                let outLabel = velocityUnit;
                if (outLabel === 'm_s') outLabel = 'm/s';
                if (outLabel === 'km_h') outLabel = 'km/h';
                if (outLabel === 'ft_s') outLabel = 'ft/s';

                return { value: result, unitLabel: outLabel };
            }
        }
        return { value: null, unitLabel: '' };
    };

    const resultData = computeResult();

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-rose-900 flex items-center justify-center">
                    <span className="mr-3">⚡</span> Kinetic Energy Calculator
                </h1>
                <p className="text-zinc-600 text-lg max-w-2xl mx-auto">
                    Determine the energy of an object in motion. Calculate Kinetic Energy (KE), Mass (m), or Velocity (v).
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

                {/* Inputs */}
                <div className="lg:col-span-3 space-y-6 bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm relative">
                    <div className="absolute top-0 left-0 w-2 h-full bg-rose-500 rounded-l-2xl"></div>

                    <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">Solve For</label>
                        <select
                            value={calcType}
                            onChange={(e) => setCalcType(e.target.value)}
                            className="w-full rounded-xl border-zinc-300 p-4 shadow-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all font-bold bg-zinc-50 cursor-pointer text-rose-900"
                        >
                            <option value="ke">Kinetic Energy (KE)</option>
                            <option value="mass">Mass (m)</option>
                            <option value="velocity">Velocity (v)</option>
                        </select>
                    </div>

                    <div className="space-y-4">
                        {calcType !== 'ke' && (
                            <div>
                                <label className="block text-xs font-bold text-zinc-500 mb-1 uppercase tracking-widest">Kinetic Energy (KE)</label>
                                <div className="flex">
                                    <input
                                        type="number" step="any" min="0"
                                        value={ke}
                                        onChange={(e) => setKe(e.target.value)}
                                        className="w-full rounded-l-xl border-zinc-200 p-3 shadow-sm focus:border-rose-500 font-mono font-bold"
                                    />
                                    <select
                                        value={keUnit}
                                        onChange={(e) => setKeUnit(e.target.value)}
                                        className="border-y border-r border-zinc-200 bg-zinc-100 text-zinc-700 font-bold px-3 rounded-r-xl"
                                    >
                                        <option value="J">Joules (J)</option>
                                        <option value="kJ">Kilojoules (kJ)</option>
                                        <option value="MJ">Megajoules (MJ)</option>
                                        <option value="cal">Calories (cal)</option>
                                        <option value="kcal">Kilocalories (kcal)</option>
                                        <option value="Wh">Watt-hours (Wh)</option>
                                        <option value="kWh">Kilowatt-hours (kWh)</option>
                                        <option value="eV">Electron-volts (eV)</option>
                                    </select>
                                </div>
                            </div>
                        )}
                        {calcType !== 'mass' && (
                            <div>
                                <label className="block text-xs font-bold text-zinc-500 mb-1 uppercase tracking-widest">Mass (m)</label>
                                <div className="flex">
                                    <input
                                        type="number" step="any" min="0"
                                        value={mass}
                                        onChange={(e) => setMass(e.target.value)}
                                        className="w-full rounded-l-xl border-zinc-200 p-3 shadow-sm focus:border-rose-500 font-mono font-bold"
                                    />
                                    <select
                                        value={massUnit}
                                        onChange={(e) => setMassUnit(e.target.value)}
                                        className="border-y border-r border-zinc-200 bg-zinc-100 text-zinc-700 font-bold px-3 rounded-r-xl"
                                    >
                                        <option value="kg">Kilograms (kg)</option>
                                        <option value="g">Grams (g)</option>
                                        <option value="lb">Pounds (lb)</option>
                                        <option value="oz">Ounces (oz)</option>
                                        <option value="ton">Metric Tons (t)</option>
                                    </select>
                                </div>
                            </div>
                        )}
                        {calcType !== 'velocity' && (
                            <div>
                                <label className="block text-xs font-bold text-zinc-500 mb-1 uppercase tracking-widest">Velocity (v)</label>
                                <div className="flex">
                                    <input
                                        type="number" step="any" min="0"
                                        value={velocity}
                                        onChange={(e) => setVelocity(e.target.value)}
                                        className="w-full rounded-l-xl border-zinc-200 p-3 shadow-sm focus:border-rose-500 font-mono font-bold"
                                    />
                                    <select
                                        value={velocityUnit}
                                        onChange={(e) => setVelocityUnit(e.target.value)}
                                        className="border-y border-r border-zinc-200 bg-zinc-100 text-zinc-700 font-bold px-3 rounded-r-xl"
                                    >
                                        <option value="m_s">m/s</option>
                                        <option value="km_h">km/h</option>
                                        <option value="mph">mph</option>
                                        <option value="ft_s">ft/s</option>
                                        <option value="knots">knots</option>
                                    </select>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Select Output Unit */}
                    {calcType === 'ke' && (
                        <div className="pt-4 border-t border-zinc-100">
                            <label className="block text-xs font-bold text-rose-700 mb-2 uppercase tracking-wide">Output Unit (Energy)</label>
                            <select
                                value={keUnit}
                                onChange={(e) => setKeUnit(e.target.value)}
                                className="w-full rounded-xl border-rose-200 p-3 shadow-sm focus:border-rose-500 font-semibold bg-rose-50/50"
                            >
                                <option value="J">Joules (J)</option>
                                <option value="kJ">Kilojoules (kJ)</option>
                                <option value="MJ">Megajoules (MJ)</option>
                                <option value="cal">Calories (cal)</option>
                                <option value="kcal">Kilocalories (kcal)</option>
                                <option value="Wh">Watt-hours (Wh)</option>
                                <option value="kWh">Kilowatt-hours (kWh)</option>
                                <option value="eV">Electron-volts (eV)</option>
                            </select>
                        </div>
                    )}
                    {calcType === 'mass' && (
                        <div className="pt-4 border-t border-zinc-100">
                            <label className="block text-xs font-bold text-rose-700 mb-2 uppercase tracking-wide">Output Unit (Mass)</label>
                            <select
                                value={massUnit}
                                onChange={(e) => setMassUnit(e.target.value)}
                                className="w-full rounded-xl border-rose-200 p-3 shadow-sm focus:border-rose-500 font-semibold bg-rose-50/50"
                            >
                                <option value="kg">Kilograms (kg)</option>
                                <option value="g">Grams (g)</option>
                                <option value="lb">Pounds (lb)</option>
                                <option value="oz">Ounces (oz)</option>
                                <option value="ton">Metric Tons (t)</option>
                            </select>
                        </div>
                    )}
                    {calcType === 'velocity' && (
                        <div className="pt-4 border-t border-zinc-100">
                            <label className="block text-xs font-bold text-rose-700 mb-2 uppercase tracking-wide">Output Unit (Velocity)</label>
                            <select
                                value={velocityUnit}
                                onChange={(e) => setVelocityUnit(e.target.value)}
                                className="w-full rounded-xl border-rose-200 p-3 shadow-sm focus:border-rose-500 font-semibold bg-rose-50/50"
                            >
                                <option value="m_s">m/s</option>
                                <option value="km_h">km/h</option>
                                <option value="mph">mph</option>
                                <option value="ft_s">ft/s</option>
                                <option value="knots">knots</option>
                            </select>
                        </div>
                    )}
                </div>

                {/* Dashboard Output */}
                <div className="lg:col-span-2">
                    {resultData.value !== null ? (
                        <div className="h-full bg-slate-900 rounded-2xl p-8 shadow-2xl relative overflow-hidden flex flex-col justify-center text-white border border-rose-800">
                            {/* Decorative element map dots */}
                            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-rose-600 rounded-full mix-blend-screen filter blur-[60px] opacity-40 pointer-events-none"></div>

                            <div className="relative z-10 text-center">
                                <h2 className="text-rose-200 font-bold uppercase tracking-widest text-xs mb-8 border-b border-rose-800/50 pb-4">
                                    Calculated {calcType === 'ke' ? 'Kinetic Energy' : calcType === 'mass' ? 'Mass' : 'Velocity'}
                                </h2>

                                <div className="text-5xl lg:text-5xl font-black tracking-tight text-white mb-4 drop-shadow-lg break-all font-mono">
                                    {(resultData.value > 1e6 || (Math.abs(resultData.value) < 1e-4 && resultData.value !== 0))
                                        ? resultData.value.toExponential(4)
                                        : parseFloat(resultData.value.toPrecision(7))}
                                </div>
                                <div className="text-rose-400 font-bold text-xl tracking-wider">
                                    {resultData.unitLabel}
                                </div>

                                <div className="mt-8 pt-6 border-t border-rose-800/50">
                                    <div className="text-rose-200 text-[10px] uppercase font-bold tracking-widest text-center mb-2">Kinetic Energy Equation</div>
                                    <div className="text-rose-100 font-mono bg-black/40 backdrop-blur-sm p-4 rounded-xl text-xl font-bold flex items-center justify-center border border-rose-700/50">
                                        <span className="italic mr-2">KE</span> = <span className="ml-2 font-normal text-lg leading-none pt-1 inline-block">½</span><span className="mx-2">m v<sup className="text-xs">2</sup></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full rounded-2xl border-2 border-dashed border-zinc-300 bg-zinc-100 flex flex-col items-center justify-center p-8 text-center text-zinc-500">
                            <span className="text-5xl mb-4 opacity-50 filter grayscale pt-10">⚡</span>
                            <h3 className="text-zinc-700 font-bold text-lg mb-2">Awaiting Variables</h3>
                            <p className="text-sm">Enter the two known parameters to calculate the missing one.</p>
                        </div>
                    )}
                </div>

            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Kinetic Energy Calculator", "operatingSystem": "All", "applicationCategory": "EducationalApplication" }) }} />
        </div>
    );
}
