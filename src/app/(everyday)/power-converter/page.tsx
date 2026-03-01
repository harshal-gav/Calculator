'use client';

import { useState, useEffect } from 'react';

const units = [
    { id: 'watt', name: 'Watt (W)', factor: 1 },
    { id: 'kilowatt', name: 'Kilowatt (kW)', factor: 1000 },
    { id: 'megawatt', name: 'Megawatt (MW)', factor: 1000000 },
    { id: 'horsepower_mech', name: 'Horsepower (Mechanical - HP)', factor: 745.69987158227022 },
    { id: 'horsepower_metric', name: 'Horsepower (Metric - PS)', factor: 735.49875 },
    { id: 'btu_per_hour', name: 'BTU per hour (BTU/h)', factor: 0.293071 },
    { id: 'calorie_per_second', name: 'Calorie per second (cal/s)', factor: 4.184 }
];

export default function PowerConverter() {
    const [inputValue, setInputValue] = useState('1');
    const [fromUnit, setFromUnit] = useState('kilowatt');
    const [toUnit, setToUnit] = useState('horsepower_mech');
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
            // Convert everything to base (Watts), then to target
            const valueInWatts = val * fromNode.factor;
            const finalValue = valueInWatts / toNode.factor;

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
            <h1 className="text-4xl font-extrabold mb-4 text-yellow-600 border-b pb-4">Power Converter</h1>
            <p className="mb-8 text-gray-600 text-lg">
                Convert electrical and mechanical power ratings between Watts, Kilowatts, Horsepower, and BTUs instantly.
            </p>

            <div className="bg-yellow-50 p-6 md:p-10 rounded-2xl border border-yellow-200 relative">
                <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-6 items-center">

                    {/* From */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">From Value</label>
                            <input
                                type="number"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                className="w-full rounded-xl border-gray-300 p-4 shadow-inner focus:border-yellow-500 font-black text-3xl text-gray-800 bg-white"
                            />
                        </div>
                        <div>
                            <select
                                value={fromUnit}
                                onChange={(e) => setFromUnit(e.target.value)}
                                className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-yellow-500 font-bold bg-white text-gray-700 hover:border-yellow-300 cursor-pointer"
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
                            className="bg-yellow-500 text-white p-4 rounded-full shadow-lg hover:bg-yellow-600 hover:scale-110 active:scale-95 transition-all focus:outline-none focus:ring-4 focus:ring-yellow-200"
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
                                className="w-full rounded-xl border-transparent p-4 shadow-inner font-black text-3xl text-yellow-800 bg-yellow-100/60 focus:outline-none"
                                placeholder="0"
                            />
                        </div>
                        <div>
                            <select
                                value={toUnit}
                                onChange={(e) => setToUnit(e.target.value)}
                                className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-yellow-500 font-bold bg-white text-gray-700 hover:border-yellow-300 cursor-pointer"
                            >
                                {units.map(u => (
                                    <option key={u.id} value={u.id}>{u.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                </div>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Power Converter", "operatingSystem": "All", "applicationCategory": "UtilitiesApplication" }) }} />
        </div>
    );
}
