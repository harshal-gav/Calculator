'use client';

import { useState } from 'react';

export default function LeanBodyMassCalculator() {
    const [gender, setGender] = useState('male');
    const [weight, setWeight] = useState('75'); // kg
    const [height, setHeight] = useState('175'); // cm

    const [result, setResult] = useState<{
        boer: number;
        james: number;
        hume: number;
        average: number;
        bodyFatPct: number;
    } | null>(null);

    const calculateLBM = () => {
        const w = parseFloat(weight) || 0;
        const h = parseFloat(height) || 0; // needs to be cm

        if (w > 0 && h > 0) {
            let boer = 0;
            let james = 0;
            let hume = 0;

            if (gender === 'male') {
                boer = (0.407 * w) + (0.267 * h) - 19.2;
                james = (1.1 * w) - (128 * Math.pow((w / h), 2));
                hume = (0.32810 * w) + (0.33929 * h) - 29.5336;
            } else {
                boer = (0.252 * w) + (0.473 * h) - 48.3;
                james = (1.07 * w) - (148 * Math.pow((w / h), 2));
                hume = (0.29569 * w) + (0.41813 * h) - 43.2933;
            }

            const validBoer = Math.max(0, boer);
            const validJames = Math.max(0, james);
            const validHume = Math.max(0, hume);

            const avg = (validBoer + validJames + validHume) / 3;
            const fatMass = w - avg;
            const bfPct = (fatMass / w) * 100;

            setResult({
                boer: validBoer,
                james: validJames,
                hume: validHume,
                average: avg,
                bodyFatPct: Math.max(0, bfPct)
            });
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <h1 className="text-4xl font-extrabold mb-4 text-orange-600 border-b pb-4">Lean Body Mass Calculator</h1>
            <p className="mb-8 text-gray-600 text-lg">
                Calculate the exact weight of your body minus all fat content using three different scientific formulas.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="bg-orange-50 p-6 rounded-xl border border-orange-100 space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Biological Sex</label>
                        <div className="flex gap-4">
                            <label className={`flex-1 flex items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition ${gender === 'male' ? 'border-orange-500 bg-orange-100 text-orange-700 font-bold' : 'border-gray-200 bg-white text-gray-600'}`}>
                                <input type="radio" value="male" checked={gender === 'male'} onChange={() => setGender('male')} className="hidden" />
                                Male
                            </label>
                            <label className={`flex-1 flex items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition ${gender === 'female' ? 'border-orange-500 bg-orange-100 text-orange-700 font-bold' : 'border-gray-200 bg-white text-gray-600'}`}>
                                <input type="radio" value="female" checked={gender === 'female'} onChange={() => setGender('female')} className="hidden" />
                                Female
                            </label>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Total Body Weight (kg)</label>
                        <input type="number" step="0.1" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-orange-500 font-bold text-lg" />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Height (cm)</label>
                        <input type="number" step="1" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-orange-500 font-bold text-lg" />
                    </div>

                    <button onClick={calculateLBM} className="w-full bg-orange-600 text-white font-bold py-4 rounded-xl hover:bg-orange-700 transition shadow-lg uppercase tracking-wide mt-2">
                        Calculate LBM
                    </button>
                </div>

                {/* Results Screen */}
                <div className="bg-white border-2 border-orange-100 rounded-xl overflow-hidden shadow-sm flex flex-col justify-center p-8">
                    {result !== null ? (
                        <div className="w-full text-center space-y-6">
                            <div>
                                <h3 className="text-orange-800 font-bold uppercase tracking-widest text-[11px] mb-2">Average Lean Body Mass</h3>
                                <div className="text-6xl font-black text-gray-900 border-b border-orange-100 pb-4">
                                    {result.average.toFixed(1)} <span className="text-2xl text-gray-500 font-medium tracking-tight">kg</span>
                                </div>
                            </div>

                            <div className="space-y-2 text-left">
                                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Formula Breakdown</h4>
                                <div className="flex justify-between items-center bg-gray-50 p-2 rounded border border-gray-100">
                                    <span className="text-sm font-semibold text-gray-600">Boer Formula</span>
                                    <span className="font-bold text-gray-800">{result.boer.toFixed(1)} kg</span>
                                </div>
                                <div className="flex justify-between items-center bg-gray-50 p-2 rounded border border-gray-100">
                                    <span className="text-sm font-semibold text-gray-600">James Formula</span>
                                    <span className="font-bold text-gray-800">{result.james.toFixed(1)} kg</span>
                                </div>
                                <div className="flex justify-between items-center bg-gray-50 p-2 rounded border border-gray-100">
                                    <span className="text-sm font-semibold text-gray-600">Hume Formula</span>
                                    <span className="font-bold text-gray-800">{result.hume.toFixed(1)} kg</span>
                                </div>
                            </div>

                            <div className="mt-4 bg-orange-50 border border-orange-200 p-3 rounded-lg flex justify-between items-center text-left">
                                <span className="text-[11px] font-bold text-orange-800 uppercase tracking-widest">Implied Body Fat</span>
                                <span className="font-black text-orange-600 text-lg">{result.bodyFatPct.toFixed(1)}%</span>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex items-center justify-center text-center text-orange-300 px-6 font-medium text-lg leading-relaxed">
                            Input your weight and height to break down your exact lean body mass using the Boer, James, and Hume algorithms.
                        </div>
                    )}
                </div>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Lean Body Mass Calculator", "operatingSystem": "All", "applicationCategory": "HealthApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } }) }} />
        </div>
    );
}
