'use client';

import { useState } from 'react';

export default function CircleCalculator() {
    const [inputType, setInputType] = useState('radius');
    const [inputValue, setInputValue] = useState('5');

    // Output state
    const [result, setResult] = useState<{
        radius: number;
        diameter: number;
        circumference: number;
        area: number;
    } | null>(null);

    const calculateCircle = () => {
        const val = parseFloat(inputValue) || 0;

        if (val > 0) {
            let r = 0;

            // Derive radius from whatever input they gave
            if (inputType === 'radius') r = val;
            if (inputType === 'diameter') r = val / 2;
            if (inputType === 'circumference') r = val / (2 * Math.PI);
            if (inputType === 'area') r = Math.sqrt(val / Math.PI);

            const d = 2 * r;
            const c = 2 * Math.PI * r;
            const a = Math.PI * Math.pow(r, 2);

            setResult({
                radius: r,
                diameter: d,
                circumference: c,
                area: a
            });
        } else {
            setResult(null);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <h1 className="text-4xl font-extrabold mb-4 text-indigo-900 border-b pb-4">Circle Calculator</h1>
            <p className="mb-8 text-gray-600 text-lg">
                Enter any single known value (radius, diameter, circumference, or area) to instantly calculate the other three geometric properties of the circle.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100 space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">I know the circle's:</label>
                        <select value={inputType} onChange={(e) => { setInputType(e.target.value); setResult(null); }} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-indigo-500 font-bold bg-white text-indigo-900 cursor-pointer">
                            <option value="radius">Radius (r)</option>
                            <option value="diameter">Diameter (d)</option>
                            <option value="circumference">Circumference (C)</option>
                            <option value="area">Area (A)</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1 capitalize">Enter {inputType} value</label>
                        <input type="number" value={inputValue} onChange={(e) => setInputValue(e.target.value)} className="w-full rounded-lg border-gray-300 p-4 shadow-sm focus:border-indigo-500 font-black text-2xl text-gray-800" />
                    </div>

                    <button onClick={calculateCircle} className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-700 transition shadow-lg uppercase tracking-wide mt-2">
                        Solve Circle
                    </button>
                </div>

                {/* Results Screen */}
                <div className="bg-white border-2 border-indigo-100 rounded-xl shadow-sm flex flex-col p-6 space-y-4 justify-center">
                    {result !== null ? (
                        <>
                            <div className="grid grid-cols-1 gap-4">
                                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                                    <span className="font-bold text-gray-500 uppercase text-xs tracking-widest">Radius (r)</span>
                                    <span className="font-black text-xl text-gray-900">{result.radius.toLocaleString('en-US', { maximumFractionDigits: 4 })}</span>
                                </div>
                                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                                    <span className="font-bold text-gray-500 uppercase text-xs tracking-widest">Diameter (d)</span>
                                    <span className="font-black text-xl text-gray-900">{result.diameter.toLocaleString('en-US', { maximumFractionDigits: 4 })}</span>
                                </div>
                                <div className="flex justify-between items-center p-4 bg-indigo-50 rounded-lg border border-indigo-200 shadow-inner">
                                    <span className="font-bold text-indigo-800 uppercase text-xs tracking-widest">Circumference (C)</span>
                                    <span className="font-black text-2xl text-indigo-700">{result.circumference.toLocaleString('en-US', { maximumFractionDigits: 4 })}</span>
                                </div>
                                <div className="flex justify-between items-center p-4 bg-indigo-600 rounded-lg shadow-md text-white">
                                    <span className="font-bold text-indigo-200 uppercase text-xs tracking-widest">Area (A)</span>
                                    <span className="font-black text-3xl">{result.area.toLocaleString('en-US', { maximumFractionDigits: 4 })}<span className="text-sm font-medium text-indigo-200 ml-1">units²</span></span>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="h-full flex items-center justify-center text-center text-indigo-300 font-medium p-4">
                            Provide one metric of the circle to solve the entire geometry instantly.
                        </div>
                    )}
                </div>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Circle Calculator", "operatingSystem": "All", "applicationCategory": "EducationalApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } }) }} />
        </div>
    );
}
