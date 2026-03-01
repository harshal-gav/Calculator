'use client';

import { useState } from 'react';

const FREQUENCY_UNITS = [
    { id: 'hz', name: 'Hertz (Hz)', factor: 1 },
    { id: 'khz', name: 'Kilohertz (kHz)', factor: 1000 },
    { id: 'mhz', name: 'Megahertz (MHz)', factor: 1e6 },
    { id: 'ghz', name: 'Gigahertz (GHz)', factor: 1e9 },
    { id: 'thz', name: 'Terahertz (THz)', factor: 1e12 },
    { id: 'rpm', name: 'Revolutions per minute (RPM)', factor: 1 / 60 },
];

export default function FrequencyConverter() {
    const [inputValue, setInputValue] = useState('60');
    const [inputUnit, setInputUnit] = useState('hz');
    const [outputUnit, setOutputUnit] = useState('rpm');

    const handleSwap = () => {
        setInputUnit(outputUnit);
        setOutputUnit(inputUnit);
    };

    let result = '';
    const val = parseFloat(inputValue);

    if (!isNaN(val)) {
        // Convert to base Hz
        const inUnit = FREQUENCY_UNITS.find(u => u.id === inputUnit);
        const outUnit = FREQUENCY_UNITS.find(u => u.id === outputUnit);

        if (inUnit && outUnit) {
            const valueInHz = val * inUnit.factor;
            const convertedValue = valueInHz / outUnit.factor;

            // Format to avoid extreme long decimals, but allow scientific if very large/small
            if (convertedValue === 0) {
                result = '0';
            } else if (Math.abs(convertedValue) < 1e-6 || Math.abs(convertedValue) > 1e9) {
                result = convertedValue.toExponential(4);
            } else {
                result = convertedValue % 1 === 0 ? convertedValue.toString() : convertedValue.toFixed(6).replace(/\.?0+$/, '');
            }
        }
    }

    return (
        <div className="max-w-3xl mx-auto p-4 md:p-8 bg-white rounded-2xl shadow-xl border border-teal-100">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-teal-900 flex items-center justify-center">
                    <span className="mr-3">📡</span> Frequency Converter
                </h1>
                <p className="text-teal-700 text-lg">
                    Convert frequency between Hertz, Kilohertz, Megahertz, RPM, and more.
                </p>
            </div>

            <div className="bg-teal-50/50 p-6 md:p-8 rounded-2xl border border-teal-100 shadow-inner space-y-8 relative">

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center relative z-10">

                    {/* Input */}
                    <div className="md:col-span-2 space-y-2">
                        <label className="block text-xs font-bold text-teal-800 uppercase tracking-widest">From</label>
                        <div className="relative border border-teal-200 shadow-sm rounded-xl bg-white overflow-hidden transition-all focus-within:ring-2 focus-within:ring-teal-300 focus-within:border-teal-400">
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
                                className="w-full bg-slate-50 border-t border-teal-100 p-3 outline-none cursor-pointer font-semibold text-teal-900"
                            >
                                {FREQUENCY_UNITS.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* Swap Button */}
                    <div className="md:col-span-1 flex justify-center py-4 md:py-0">
                        <button
                            onClick={handleSwap}
                            className="bg-teal-600 hover:bg-teal-700 text-white rounded-full p-4 shadow-lg transform transition hover:scale-110 active:scale-95 border-4 border-white"
                            title="Swap Units"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                            </svg>
                        </button>
                    </div>

                    {/* Output */}
                    <div className="md:col-span-2 space-y-2">
                        <label className="block text-xs font-bold text-teal-800 uppercase tracking-widest">To</label>
                        <div className="relative border border-teal-200 shadow-sm rounded-xl bg-teal-900 overflow-hidden transition-all">
                            <div className="w-full p-4 rounded-t-xl font-bold text-2xl text-white overflow-x-auto min-h-[64px] flex items-center">
                                {result || '0'}
                            </div>
                            <select
                                value={outputUnit}
                                onChange={(e) => setOutputUnit(e.target.value)}
                                className="w-full bg-teal-950 border-t border-teal-800 p-3 outline-none cursor-pointer font-semibold text-teal-200"
                            >
                                {FREQUENCY_UNITS.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Frequency Converter", "operatingSystem": "All", "applicationCategory": "UtilitiesApplication" }) }} />
        </div>
    );
}
