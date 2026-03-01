'use client';

import { useState } from 'react';

export default function IdealWeightCalculator() {
    const [gender, setGender] = useState('male');
    const [heightFt, setHeightFt] = useState('5');
    const [heightIn, setHeightIn] = useState('10');

    const [results, setResults] = useState<{
        robinson: number;
        miller: number;
        devine: number;
        hamwi: number;
        bmiRange: [number, number];
    } | null>(null);

    const calculateWeight = () => {
        const ft = parseInt(heightFt) || 0;
        const inc = parseInt(heightIn) || 0;

        let totalInches = (ft * 12) + inc;
        let heightCm = totalInches * 2.54;
        let heightMeters = heightCm / 100;

        if (totalInches > 0) {
            const inchesOver5Ft = Math.max(0, totalInches - 60);

            let robinson = 0, miller = 0, devine = 0, hamwi = 0;

            if (gender === 'male') {
                robinson = 52 + (1.9 * inchesOver5Ft);
                miller = 56.2 + (1.41 * inchesOver5Ft);
                devine = 50.0 + (2.3 * inchesOver5Ft);
                hamwi = 48.0 + (2.7 * inchesOver5Ft);
            } else {
                robinson = 49 + (1.7 * inchesOver5Ft);
                miller = 53.1 + (1.36 * inchesOver5Ft);
                devine = 45.5 + (2.3 * inchesOver5Ft);
                hamwi = 45.5 + (2.2 * inchesOver5Ft);
            }

            // Convert Kg back to Lbs for all formula results
            const kgToLbs = 2.20462;

            // Healthy BMI Range is 18.5 to 24.9
            const minHealthyKg = 18.5 * (heightMeters * heightMeters);
            const maxHealthyKg = 24.9 * (heightMeters * heightMeters);

            setResults({
                robinson: robinson * kgToLbs,
                miller: miller * kgToLbs,
                devine: devine * kgToLbs,
                hamwi: hamwi * kgToLbs,
                bmiRange: [minHealthyKg * kgToLbs, maxHealthyKg * kgToLbs]
            });
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <h1 className="text-4xl font-extrabold mb-4 text-emerald-900 border-b pb-4">Ideal Weight Calculator</h1>
            <p className="mb-8 text-gray-600 text-lg">
                Discover your medically recommended ideal body weight based on multiple popular scientific formulas.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100 space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Gender</label>
                        <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-emerald-500 bg-white">
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Height (Feet)</label>
                            <input type="number" value={heightFt} onChange={(e) => setHeightFt(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-emerald-500 font-bold text-lg" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Height (Inches)</label>
                            <input type="number" value={heightIn} onChange={(e) => setHeightIn(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-emerald-500 font-bold text-lg" />
                        </div>
                    </div>

                    <button onClick={calculateWeight} className="w-full bg-emerald-600 text-white font-bold py-4 rounded-xl hover:bg-emerald-700 transition shadow-lg uppercase tracking-wide mt-4">
                        Calculate Ideal Weight
                    </button>
                </div>

                {/* Results Screen */}
                <div className="bg-white border-2 border-emerald-100 rounded-xl overflow-hidden shadow-sm flex flex-col justify-center p-6">
                    {results !== null ? (
                        <div className="space-y-6">
                            <div className="text-center pb-6 border-b border-emerald-100">
                                <h3 className="text-emerald-800 font-semibold uppercase tracking-wider text-sm mb-2">Healthy BMI Weight Range</h3>
                                <div className="text-3xl font-black text-gray-900">
                                    {results.bmiRange[0].toFixed(1)} <span className="text-xl font-normal text-gray-500 mx-1">to</span> {results.bmiRange[1].toFixed(1)} <span className="text-xl font-bold ml-1">lbs</span>
                                </div>
                            </div>

                            <div>
                                <h4 className="font-bold text-gray-500 uppercase tracking-widest text-xs mb-3 text-center">Specific Scientific Formulas</h4>
                                <table className="min-w-full text-left">
                                    <tbody className="divide-y divide-gray-100">
                                        <tr className="hover:bg-emerald-50">
                                            <td className="py-3 font-semibold text-gray-700 border-none">J. D. Robinson (1983)</td>
                                            <td className="py-3 font-bold text-emerald-800 text-right">{results.robinson.toFixed(1)} lbs</td>
                                        </tr>
                                        <tr className="hover:bg-emerald-50">
                                            <td className="py-3 font-semibold text-gray-700 border-none">D. R. Miller (1983)</td>
                                            <td className="py-3 font-bold text-emerald-800 text-right">{results.miller.toFixed(1)} lbs</td>
                                        </tr>
                                        <tr className="hover:bg-emerald-50">
                                            <td className="py-3 font-semibold text-gray-700 border-none">B. J. Devine (1974)</td>
                                            <td className="py-3 font-bold text-emerald-800 text-right">{results.devine.toFixed(1)} lbs</td>
                                        </tr>
                                        <tr className="hover:bg-emerald-50">
                                            <td className="py-3 font-semibold text-gray-700 border-none">G. J. Hamwi (1964)</td>
                                            <td className="py-3 font-bold text-emerald-800 text-right">{results.hamwi.toFixed(1)} lbs</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex items-center justify-center text-center text-emerald-400 font-medium">
                            Enter your height and gender to view your medically recommended healthy weight ranges.
                        </div>
                    )}
                </div>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Ideal Weight Calculator", "operatingSystem": "All", "applicationCategory": "HealthApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } }) }} />
        </div>
    );
}
