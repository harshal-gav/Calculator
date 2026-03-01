'use client';

import { useState, useEffect } from 'react';

const labels: Record<string, string> = {
    'celsius': 'Celsius (°C)',
    'fahrenheit': 'Fahrenheit (°F)',
    'kelvin': 'Kelvin (K)',
};

export default function TemperatureConverter() {
    const [amount, setAmount] = useState('0');
    const [fromUnit, setFromUnit] = useState('celsius');
    const [toUnit, setToUnit] = useState('fahrenheit');
    const [result, setResult] = useState('');

    useEffect(() => {
        calculateConversion();
    }, [amount, fromUnit, toUnit]);

    const calculateConversion = () => {
        const val = parseFloat(amount);
        if (isNaN(val)) {
            setResult('');
            return;
        }

        let inCelsius = 0;

        // Convert to Celsius first
        if (fromUnit === 'celsius') inCelsius = val;
        else if (fromUnit === 'fahrenheit') inCelsius = (val - 32) * (5 / 9);
        else if (fromUnit === 'kelvin') inCelsius = val - 273.15;

        let finalValue = 0;

        // Convert from Celsius to Target
        if (toUnit === 'celsius') finalValue = inCelsius;
        else if (toUnit === 'fahrenheit') finalValue = (inCelsius * (9 / 5)) + 32;
        else if (toUnit === 'kelvin') finalValue = inCelsius + 273.15;

        setResult(finalValue.toLocaleString('en-US', { maximumFractionDigits: 3 }));
    };

    const handleSwap = () => {
        const temp = fromUnit;
        setFromUnit(toUnit);
        setToUnit(temp);
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <h1 className="text-4xl font-extrabold mb-4 text-emerald-700 border-b pb-4">Temperature Converter</h1>
            <p className="mb-8 text-gray-600 text-lg">
                Instantly convert degrees between Celsius, Fahrenheit, and Kelvin scales.
            </p>

            <div className="bg-emerald-50 rounded-2xl p-6 md:p-10 border border-emerald-100 shadow-inner">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">

                    {/* From Section */}
                    <div className="md:col-span-2 space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Value</label>
                            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full rounded-xl border-gray-300 p-4 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 font-black text-2xl" placeholder="Enter amount" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">From</label>
                            <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} className="w-full rounded-xl border-gray-300 p-4 shadow-sm focus:border-emerald-500 font-semibold bg-white cursor-pointer text-gray-700">
                                {Object.keys(labels).map(key => (
                                    <option key={`from-${key}`} value={key}>{labels[key]}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Swap Button */}
                    <div className="md:col-span-1 flex justify-center py-4 md:py-0">
                        <button onClick={handleSwap} className="bg-white p-4 rounded-full shadow hover:shadow-md border border-gray-200 transition-all hover:rotate-180 hover:bg-emerald-100 text-emerald-600 focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                            </svg>
                        </button>
                    </div>

                    {/* To Section */}
                    <div className="md:col-span-2 space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Result</label>
                            <input type="text" readOnly value={result} className="w-full rounded-xl border-emerald-300 bg-emerald-100/50 p-4 shadow-sm font-black text-2xl text-emerald-900 outline-none" placeholder="0" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">To</label>
                            <select value={toUnit} onChange={(e) => setToUnit(e.target.value)} className="w-full rounded-xl border-gray-300 p-4 shadow-sm focus:border-emerald-500 font-semibold bg-white cursor-pointer text-gray-700">
                                {Object.keys(labels).map(key => (
                                    <option key={`to-${key}`} value={key}>{labels[key]}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                </div>
            </div>

            <div className="mt-8 text-center text-sm font-mono text-gray-500 bg-gray-50 p-4 rounded-lg">
                <strong>°C to °F:</strong> (°C × 9/5) + 32 &emsp; | &emsp; <strong>°F to °C:</strong> (°F − 32) × 5/9
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Temperature Converter", "operatingSystem": "All", "applicationCategory": "UtilityApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } }) }} />
        </div>
    );
}
