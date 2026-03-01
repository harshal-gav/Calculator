'use client';

import { useState, useEffect } from 'react';

const units = [
    { id: 'joule', name: 'Joule (J)', factor: 1 },
    { id: 'kilojoule', name: 'Kilojoule (kJ)', factor: 1000 },
    { id: 'calorie', name: 'Gram calorie (cal)', factor: 4.184 }, // Thermochemical
    { id: 'kcal', name: 'Kilocalorie / Food Calorie (kcal)', factor: 4184 },
    { id: 'watt_hour', name: 'Watt-hour (Wh)', factor: 3600 },
    { id: 'kilowatt_hour', name: 'Kilowatt-hour (kWh)', factor: 3600000 },
    { id: 'electron_volt', name: 'Electron-volt (eV)', factor: 1.602176634e-19 },
    { id: 'btu', name: 'British Thermal Unit (BTU)', factor: 1055.05585262 },
    { id: 'foot_pound', name: 'Foot-pound (ft-lbf)', factor: 1.3558179483314 }
];

export default function EnergyConverter() {
    const [inputValue, setInputValue] = useState('1');
    const [fromUnit, setFromUnit] = useState('joule');
    const [toUnit, setToUnit] = useState('calorie');
    const [result, setResult] = useState('');

    useEffect(() => {
        calculateConversion();
    }, [inputValue, fromUnit, toUnit]);

    const calculateConversion = () => {
        const val = parseFloat(inputValue);
        if (isNaN(val)) {
            setResult('');
            return;
        }

        const fromNode = units.find(u => u.id === fromUnit);
        const toNode = units.find(u => u.id === toUnit);

        if (fromNode && toNode) {
            // Convert everything to base (Joules), then to target
            const valueInJoules = val * fromNode.factor;
            const finalValue = valueInJoules / toNode.factor;

            // Format scientifically if extreme, else fixed
            if (finalValue > 1e9 || (finalValue < 1e-4 && finalValue > 0)) {
                setResult(finalValue.toExponential(6));
            } else {
                setResult(parseFloat(finalValue.toFixed(6)).toString());
            }
        }
    };

    const handleSwap = () => {
        setFromUnit(toUnit);
        setToUnit(fromUnit);
        setInputValue(result || '1');
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <h1 className="text-4xl font-extrabold mb-4 text-amber-600 border-b pb-4">Energy Converter</h1>
            <p className="mb-8 text-gray-600 text-lg">
                Convert energy, work, and heat metrics between Joules, Calories, kWh, BTUs, and Electron-volts.
            </p>

            <div className="bg-amber-50 p-6 md:p-10 rounded-2xl border border-amber-200 relative">
                <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-6 items-center">

                    {/* From */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">From Value</label>
                            <input
                                type="number"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                className="w-full rounded-xl border-gray-300 p-4 shadow-inner focus:border-amber-500 font-black text-3xl text-gray-800 bg-white"
                            />
                        </div>
                        <div>
                            <select
                                value={fromUnit}
                                onChange={(e) => setFromUnit(e.target.value)}
                                className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-amber-500 font-bold bg-white text-gray-700 hover:border-amber-300 cursor-pointer"
                            >
                                {units.map(u => (
                                    <option key={u.id} value={u.id}>{u.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Swap Button */}
                    <div className="flex justify-center -my-2 md:my-0 z-10">
                        <button
                            onClick={handleSwap}
                            className="bg-amber-500 text-white p-4 rounded-full shadow-lg hover:bg-amber-600 hover:scale-110 active:scale-95 transition-all focus:outline-none focus:ring-4 focus:ring-amber-200"
                            title="Swap units"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                            </svg>
                        </button>
                    </div>

                    {/* To */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">To Value</label>
                            <input
                                type="text"
                                readOnly
                                value={result}
                                className="w-full rounded-xl border-transparent p-4 shadow-inner font-black text-3xl text-amber-800 bg-amber-100/60 focus:outline-none"
                                placeholder="0"
                            />
                        </div>
                        <div>
                            <select
                                value={toUnit}
                                onChange={(e) => setToUnit(e.target.value)}
                                className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-amber-500 font-bold bg-white text-gray-700 hover:border-amber-300 cursor-pointer"
                            >
                                {units.map(u => (
                                    <option key={u.id} value={u.id}>{u.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                </div>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Energy Converter", "operatingSystem": "All", "applicationCategory": "UtilitiesApplication" }) }} />
        </div>
    );
}
