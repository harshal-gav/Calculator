'use client';

import { useState, useEffect } from 'react';

const volumes = [
    { id: 'tsp', name: 'Teaspoon (tsp)', ml: 4.92892 },
    { id: 'tbsp', name: 'Tablespoon (tbsp)', ml: 14.7868 },
    { id: 'floz', name: 'Fluid Ounce (fl oz)', ml: 29.5735 },
    { id: 'cup', name: 'Cup (US legal)', ml: 240 },
    { id: 'pt', name: 'Pint (US)', ml: 473.176 },
    { id: 'qt', name: 'Quart (US)', ml: 946.353 },
    { id: 'gal', name: 'Gallon (US)', ml: 3785.41 },
    { id: 'ml', name: 'Milliliter (mL)', ml: 1 },
    { id: 'l', name: 'Liter (L)', ml: 1000 }
];

const weights = [
    { id: 'oz', name: 'Ounce (oz)', g: 28.3495 },
    { id: 'lb', name: 'Pound (lb)', g: 453.592 },
    { id: 'g', name: 'Gram (g)', g: 1 },
    { id: 'kg', name: 'Kilogram (kg)', g: 1000 }
];

export default function CookingConverter() {
    const [mode, setMode] = useState<'volume' | 'weight'>('volume');

    // Variables for both sets
    const units = mode === 'volume' ? volumes : weights;
    const standardFactor = mode === 'volume' ? 'ml' : 'g';

    const [fromValue, setFromValue] = useState('1');
    const [fromUnit, setFromUnit] = useState(mode === 'volume' ? 'cup' : 'lb');
    const [toValue, setToValue] = useState('');
    const [toUnit, setToUnit] = useState(mode === 'volume' ? 'ml' : 'g');
    const [editing, setEditing] = useState<'from' | 'to'>('from');

    useEffect(() => {
        // Reset defaults when switching mode
        if (mode === 'volume') {
            setFromUnit('cup');
            setToUnit('ml');
        } else {
            setFromUnit('lb');
            setToUnit('g');
        }
        setFromValue('1');
        setEditing('from');
    }, [mode]);

    useEffect(() => {
        calculate();
    }, [fromValue, toValue, fromUnit, toUnit, editing]);

    const calculate = () => {
        const fromMultiplier = units.find(u => u.id === fromUnit)?.[standardFactor as keyof typeof units[0]] as any as number || 1;
        const toMultiplier = units.find(u => u.id === toUnit)?.[standardFactor as keyof typeof units[0]] as any as number || 1;

        if (editing === 'from') {
            const val = parseFloat(fromValue);
            if (!isNaN(val)) {
                const baseValue = val * fromMultiplier;
                const result = baseValue / toMultiplier;
                setToValue(result.toPrecision(5).replace(/\\.0+$/, '').replace(/(\\.[0-9]*[1-9])0+$/, '$1'));
            } else {
                setToValue('');
            }
        } else {
            const val = parseFloat(toValue);
            if (!isNaN(val)) {
                const baseValue = val * toMultiplier;
                const result = baseValue / fromMultiplier;
                setFromValue(result.toPrecision(5).replace(/\\.0+$/, '').replace(/(\\.[0-9]*[1-9])0+$/, '$1'));
            } else {
                setFromValue('');
            }
        }
    };

    const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFromValue(e.target.value);
        setEditing('from');
    };

    const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setToValue(e.target.value);
        setEditing('to');
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-orange-50 rounded-xl shadow-lg border border-orange-100">
            <h1 className="text-4xl font-extrabold mb-4 text-orange-800 border-b pb-4 flex items-center">
                <span className="mr-3">👨‍🍳</span> Cooking Measurement Converter
            </h1>
            <p className="mb-8 text-orange-700 text-lg">
                Instantly convert recipe volumes and weights between metric and imperial systems.
            </p>

            {/* Mode Switcher */}
            <div className="flex justify-center mb-8">
                <div className="bg-white p-1 rounded-xl shadow-sm border border-orange-200 inline-flex">
                    <button
                        onClick={() => setMode('volume')}
                        className={`px-8 py-3 rounded-lg font-bold transition-all ${mode === 'volume' ? 'bg-orange-500 text-white shadow-md' : 'text-orange-600 hover:bg-orange-100'}`}
                    >
                        Liquid & Dry Volume
                    </button>
                    <button
                        onClick={() => setMode('weight')}
                        className={`px-8 py-3 rounded-lg font-bold transition-all ${mode === 'weight' ? 'bg-orange-500 text-white shadow-md' : 'text-orange-600 hover:bg-orange-100'}`}
                    >
                        Weight & Mass
                    </button>
                </div>
            </div>

            <div className="bg-white p-6 md:p-10 rounded-2xl border border-orange-200 shadow-sm relative">

                {/* Decorative background element */}
                <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-48 w-48 text-orange-900" viewBox="0 0 24 24" fill="currentColor">
                        {mode === 'volume' ? (
                            <path d="M11 20H5a2 2 0 01-2-2V8l2-4h14l2 4v10a2 2 0 01-2 2h-6zm-6-2h14V9H5v9zm2-11h10L19 4H5l2 3zm4 4h4v2h-4v-2z" />
                        ) : (
                            <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zm-1-11V7h2v2h-2zm-3 4v-2h8v2H8zm3 4v-2h2v2h-2z" />
                        )}
                    </svg>
                </div>

                <div className="relative z-10 grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-6 items-center">

                    {/* From Input */}
                    <div className="space-y-3">
                        <label className="block text-sm font-bold text-orange-800 uppercase tracking-widest text-center shadow-sm py-2 rounded-t-lg bg-orange-100 border-x border-t border-orange-200 -mb-3 z-0 relative">Convert From</label>
                        <div className="relative flex shadow-md rounded-b-xl overflow-hidden border border-orange-200">
                            <input
                                type="number" step="any" min="0"
                                value={fromValue}
                                onChange={handleFromChange}
                                className={`w-full p-6 text-3xl font-black text-slate-800 outline-none transition-colors rounded-bl-xl ${editing === 'from' ? 'bg-orange-50 focus:bg-white' : 'bg-slate-50'}`}
                                placeholder="0"
                            />
                            <select
                                value={fromUnit}
                                onChange={(e) => { setFromUnit(e.target.value); setEditing('from'); }}
                                className="bg-orange-500 text-white font-bold p-4 outline-none border-l border-orange-600 appearance-none cursor-pointer hover:bg-orange-600 transition-colors w-24 text-center rounded-br-xl"
                            >
                                {units.map(u => <option key={u.id} value={u.id}>{u.id}</option>)}
                            </select>
                        </div>
                        <div className="text-center text-sm font-medium text-orange-600 mt-2">
                            {units.find(u => u.id === fromUnit)?.name}
                        </div>
                    </div>

                    {/* Swap Icon */}
                    <div className="flex justify-center py-4">
                        <div
                            className="bg-orange-100 rounded-full p-4 text-orange-500 hover:bg-orange-200 hover:text-orange-600 cursor-pointer transition-colors shadow-inner border border-orange-200"
                            onClick={() => {
                                const tempU = fromUnit;
                                setFromUnit(toUnit);
                                setToUnit(tempU);
                                setEditing('from');
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                            </svg>
                        </div>
                    </div>

                    {/* To Input */}
                    <div className="space-y-3">
                        <label className="block text-sm font-bold text-emerald-800 uppercase tracking-widest text-center shadow-sm py-2 rounded-t-lg bg-emerald-100 border-x border-t border-emerald-200 -mb-3 z-0 relative">Convert To</label>
                        <div className="relative flex shadow-md rounded-b-xl overflow-hidden border border-emerald-200">
                            <input
                                type="number" step="any" min="0"
                                value={toValue}
                                onChange={handleToChange}
                                className={`w-full p-6 text-3xl font-black text-slate-800 outline-none transition-colors rounded-bl-xl ${editing === 'to' ? 'bg-emerald-50 focus:bg-white' : 'bg-slate-50'}`}
                                placeholder="0"
                            />
                            <select
                                value={toUnit}
                                onChange={(e) => { setToUnit(e.target.value); setEditing('to'); }}
                                className="bg-emerald-500 text-white font-bold p-4 outline-none border-l border-emerald-600 appearance-none cursor-pointer hover:bg-emerald-600 transition-colors w-24 text-center rounded-br-xl"
                            >
                                {units.map(u => <option key={u.id} value={u.id}>{u.id}</option>)}
                            </select>
                        </div>
                        <div className="text-center text-sm font-medium text-emerald-600 mt-2">
                            {units.find(u => u.id === toUnit)?.name}
                        </div>
                    </div>

                </div>
            </div>

            {/* Quick Reference Chart */}
            <div className="mt-8 bg-white p-6 rounded-2xl border border-orange-200 shadow-sm">
                <h3 className="font-bold text-orange-900 border-b border-orange-100 pb-2 mb-4 uppercase tracking-wider text-sm">Equivalent Chart</h3>

                {mode === 'volume' ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="bg-orange-50 p-3 rounded-lg border border-orange-100 flex justify-between">
                            <span className="font-bold text-orange-800">1 tbsp</span>
                            <span className="text-orange-600">= 3 tsp</span>
                        </div>
                        <div className="bg-orange-50 p-3 rounded-lg border border-orange-100 flex justify-between">
                            <span className="font-bold text-orange-800">1/4 cup</span>
                            <span className="text-orange-600">= 4 tbsp</span>
                        </div>
                        <div className="bg-orange-50 p-3 rounded-lg border border-orange-100 flex justify-between">
                            <span className="font-bold text-orange-800">1 cup</span>
                            <span className="text-orange-600">= 16 tbsp</span>
                        </div>
                        <div className="bg-orange-50 p-3 rounded-lg border border-orange-100 flex justify-between">
                            <span className="font-bold text-orange-800">1 cup</span>
                            <span className="text-orange-600">~ 240 mL</span>
                        </div>
                        <div className="bg-orange-50 p-3 rounded-lg border border-orange-100 flex justify-between">
                            <span className="font-bold text-orange-800">1 pint</span>
                            <span className="text-orange-600">= 2 cups</span>
                        </div>
                        <div className="bg-orange-50 p-3 rounded-lg border border-orange-100 flex justify-between">
                            <span className="font-bold text-orange-800">1 quart</span>
                            <span className="text-orange-600">= 2 pints</span>
                        </div>
                        <div className="bg-orange-50 p-3 rounded-lg border border-orange-100 flex justify-between">
                            <span className="font-bold text-orange-800">1 gallon</span>
                            <span className="text-orange-600">= 4 quarts</span>
                        </div>
                        <div className="bg-orange-50 p-3 rounded-lg border border-orange-100 flex justify-between">
                            <span className="font-bold text-orange-800">1 fl oz</span>
                            <span className="text-orange-600">= 2 tbsp</span>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="bg-orange-50 p-3 rounded-lg border border-orange-100 flex justify-between">
                            <span className="font-bold text-orange-800">1 lb</span>
                            <span className="text-orange-600">= 16 oz</span>
                        </div>
                        <div className="bg-orange-50 p-3 rounded-lg border border-orange-100 flex justify-between">
                            <span className="font-bold text-orange-800">1 kg</span>
                            <span className="text-orange-600">= 1000 g</span>
                        </div>
                        <div className="bg-orange-50 p-3 rounded-lg border border-orange-100 flex justify-between">
                            <span className="font-bold text-orange-800">1 kg</span>
                            <span className="text-orange-600">~ 2.2 lb</span>
                        </div>
                        <div className="bg-orange-50 p-3 rounded-lg border border-orange-100 flex justify-between">
                            <span className="font-bold text-orange-800">1 oz</span>
                            <span className="text-orange-600">~ 28.35 g</span>
                        </div>
                    </div>
                )}
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Cooking Measurement Converter", "operatingSystem": "All", "applicationCategory": "UtilitiesApplication" }) }} />
        </div>
    );
}
