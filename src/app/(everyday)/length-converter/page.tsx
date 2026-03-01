'use client';

import { useState, useEffect } from 'react';

const rates: Record<string, number> = {
    'meter': 1,
    'kilometer': 1000,
    'centimeter': 0.01,
    'millimeter': 0.001,
    'micrometer': 0.000001,
    'nanometer': 0.000000001,
    'mile': 1609.344,
    'yard': 0.9144,
    'foot': 0.3048,
    'inch': 0.0254,
    'lightyear': 9.461e15,
};

const labels: Record<string, string> = {
    'meter': 'Meter (m)',
    'kilometer': 'Kilometer (km)',
    'centimeter': 'Centimeter (cm)',
    'millimeter': 'Millimeter (mm)',
    'micrometer': 'Micrometer (µm)',
    'nanometer': 'Nanometer (nm)',
    'mile': 'Mile (mi)',
    'yard': 'Yard (yd)',
    'foot': 'Foot (ft)',
    'inch': 'Inch (in)',
    'lightyear': 'Light Year (ly)',
};

export default function LengthConverter() {
    const [amount, setAmount] = useState('1');
    const [fromUnit, setFromUnit] = useState('meter');
    const [toUnit, setToUnit] = useState('foot');
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

        // Convert whatever we have to meters first (the base), then to the target
        const inMeters = val * rates[fromUnit];
        const finalValue = inMeters / rates[toUnit];

        // Formatting
        if (finalValue < 0.0001 || finalValue > 10000) {
            setResult(finalValue.toExponential(4));
        } else {
            setResult(finalValue.toLocaleString('en-US', { maximumFractionDigits: 4 }));
        }
    };

    const handleSwap = () => {
        const temp = fromUnit;
        setFromUnit(toUnit);
        setToUnit(temp);
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <h1 className="text-4xl font-extrabold mb-4 text-emerald-700 border-b pb-4">Length Converter</h1>
            <p className="mb-8 text-gray-600 text-lg">
                Instantly convert between metric, imperial, and astronomical units of length.
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
                                {Object.keys(rates).map(key => (
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
                                {Object.keys(rates).map(key => (
                                    <option key={`to-${key}`} value={key}>{labels[key]}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                </div>
            </div>

            <div className="mt-8 text-center text-sm text-gray-500 bg-gray-50 p-4 rounded-lg">
                <strong>Formula:</strong> Multiplying by the conversion factor relative to meters (m).
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Length Converter", "operatingSystem": "All", "applicationCategory": "UtilityApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } }) }} />
        </div>
    );
}
