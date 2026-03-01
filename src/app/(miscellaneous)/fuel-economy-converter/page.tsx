'use client';

import { useState, useEffect } from 'react';

const units = [
    { id: 'mpg_us', name: 'Miles per US Gallon (mpg)', factorId: 'mpg_us' },
    { id: 'mpg_uk', name: 'Miles per UK Gallon (mpg)', factorId: 'mpg_uk' },
    { id: 'l100km', name: 'Liters per 100 km (L/100km)', factorId: 'l100km' },
    { id: 'km_l', name: 'Kilometers per Liter (km/L)', factorId: 'km_l' }
];

export default function FuelEconomyConverter() {
    const [fromValue, setFromValue] = useState('25');
    const [fromUnit, setFromUnit] = useState('mpg_us');
    const [toValue, setToValue] = useState('');
    const [toUnit, setToUnit] = useState('l100km');
    const [editing, setEditing] = useState<'from' | 'to'>('from');

    useEffect(() => {
        calculate();
    }, [fromValue, toValue, fromUnit, toUnit, editing]);

    // Conversion formulas:
    // mpg (US) to L/100km = 235.214583 / mpg
    // mpg (UK) to L/100km = 282.481 / mpg
    // km/L to L/100km = 100 / kmL

    // Everything converts to L/100km first, then to the target
    const convertToL100km = (val: number, unit: string) => {
        if (unit === 'l100km') return val;
        if (unit === 'mpg_us') return 235.214583 / val;
        if (unit === 'mpg_uk') return 282.481 / val;
        if (unit === 'km_l') return 100 / val;
        return 0;
    };

    const convertFromL100km = (val_l100km: number, targetUnit: string) => {
        if (targetUnit === 'l100km') return val_l100km;
        if (targetUnit === 'mpg_us') return 235.214583 / val_l100km;
        if (targetUnit === 'mpg_uk') return 282.481 / val_l100km;
        if (targetUnit === 'km_l') return 100 / val_l100km;
        return 0;
    };

    const calculate = () => {
        if (editing === 'from') {
            const val = parseFloat(fromValue);
            if (!isNaN(val) && val > 0) {
                const asL100 = convertToL100km(val, fromUnit);
                const result = convertFromL100km(asL100, toUnit);
                setToValue(result.toFixed(2));
            } else {
                setToValue('');
            }
        } else {
            const val = parseFloat(toValue);
            if (!isNaN(val) && val > 0) {
                const asL100 = convertToL100km(val, toUnit);
                const result = convertFromL100km(asL100, fromUnit);
                setFromValue(result.toFixed(2));
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

    const swapUnits = () => {
        const temp = fromUnit;
        setFromUnit(toUnit);
        setToUnit(temp);
        setEditing('from');
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-slate-800 rounded-xl shadow-2xl border border-slate-700 text-slate-100">
            <h1 className="text-4xl font-extrabold mb-4 text-emerald-400 border-b border-slate-700 pb-4 flex items-center">
                <span className="mr-3">⛽</span> Fuel Economy Converter
            </h1>
            <p className="mb-8 text-slate-300 text-lg">
                Convert gas mileage values between US MPG, UK MPG, L/100km, and km/L.
            </p>

            <div className="bg-slate-900 p-6 md:p-10 rounded-2xl border border-slate-700 shadow-inner">
                <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-6 items-center">

                    {/* From Input */}
                    <div className="space-y-4">
                        <select
                            value={fromUnit}
                            onChange={(e) => { setFromUnit(e.target.value); setEditing('from'); }}
                            className="w-full bg-slate-800 text-white font-bold p-4 rounded-xl border border-slate-600 outline-none focus:border-emerald-500 transition-colors shadow-sm"
                        >
                            {units.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                        </select>
                        <input
                            type="number" step="any" min="0.1"
                            value={fromValue}
                            onChange={handleFromChange}
                            className={`w-full rounded-xl border-2 p-6 text-4xl font-black text-center text-white outline-none transition-colors ${editing === 'from' ? 'bg-emerald-900 border-emerald-500' : 'bg-slate-800 border-slate-600'}`}
                            placeholder="0"
                        />
                    </div>

                    {/* Swap Icon */}
                    <div className="flex justify-center py-4">
                        <button
                            className="bg-slate-700 rounded-full p-4 text-slate-300 hover:bg-slate-600 hover:text-white transition-colors shadow-md border border-slate-500"
                            onClick={swapUnits}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                            </svg>
                        </button>
                    </div>

                    {/* To Input */}
                    <div className="space-y-4">
                        <select
                            value={toUnit}
                            onChange={(e) => { setToUnit(e.target.value); setEditing('to'); }}
                            className="w-full bg-slate-800 text-white font-bold p-4 rounded-xl border border-slate-600 outline-none focus:border-emerald-500 transition-colors shadow-sm"
                        >
                            {units.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                        </select>
                        <input
                            type="number" step="any" min="0.1"
                            value={toValue}
                            onChange={handleToChange}
                            className={`w-full rounded-xl border-2 p-6 text-4xl font-black text-center text-white outline-none transition-colors ${editing === 'to' ? 'bg-emerald-900 border-emerald-500' : 'bg-slate-800 border-slate-600'}`}
                            placeholder="0"
                        />
                    </div>

                </div>
            </div>

            {/* Quick Chart */}
            <div className="mt-8 bg-slate-900 p-6 rounded-2xl border border-slate-700">
                <h3 className="font-bold text-slate-400 tracking-wider text-sm mb-4 border-b border-slate-800 pb-2 uppercase">Quick Reference</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm font-mono text-center">
                    <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                        <div className="text-white font-bold text-lg mb-1">10 L/100km</div>
                        <div className="text-slate-400">= 23.5 MPG (US)</div>
                    </div>
                    <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                        <div className="text-white font-bold text-lg mb-1">5 L/100km</div>
                        <div className="text-slate-400">= 47.0 MPG (US)</div>
                    </div>
                    <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                        <div className="text-white font-bold text-lg mb-1">30 MPG (US)</div>
                        <div className="text-slate-400">= 7.8 L/100km</div>
                    </div>
                    <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                        <div className="text-white font-bold text-lg mb-1">40 MPG (US)</div>
                        <div className="text-slate-400">= 5.9 L/100km</div>
                    </div>
                </div>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Fuel Economy Converter", "operatingSystem": "All", "applicationCategory": "UtilitiesApplication" }) }} />
        </div>
    );
}
