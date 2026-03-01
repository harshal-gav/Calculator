'use client';

import { useState } from 'react';

export default function BodyFatCalculator() {
    const [gender, setGender] = useState('male');
    const [age, setAge] = useState('25');
    const [weightLbs, setWeightLbs] = useState('160');

    // Tape measurements (inches)
    const [heightInches, setHeightInches] = useState('70'); // 5'10"
    const [neck, setNeck] = useState('15');
    const [waist, setWaist] = useState('32');
    const [hip, setHip] = useState('38'); // Required for females in US Navy method

    const [result, setResult] = useState<{
        bodyFatPct: number;
        fatMassLbs: number;
        leanMassLbs: number;
        category: string;
    } | null>(null);

    const calculateBodyFat = () => {
        const w = parseFloat(weightLbs) || 0;
        const h = parseFloat(heightInches) || 0;
        const n = parseFloat(neck) || 0;
        const wa = parseFloat(waist) || 0;
        const hi = parseFloat(hip) || 0;

        if (w > 0 && h > 0 && n > 0 && wa > 0) {
            let bf = 0;

            // US Navy Method Formulas (Imperial)
            if (gender === 'male') {
                // Males: %BF = 86.010 x log10(waist - neck) - 70.041 x log10(height) + 36.76
                bf = 86.010 * Math.log10(wa - n) - 70.041 * Math.log10(h) + 36.76;
            } else {
                // Females: %BF = 163.205 x log10(waist + hip - neck) - 97.684 x log10(height) - 78.387
                if (hi > 0) {
                    bf = 163.205 * Math.log10(wa + hi - n) - 97.684 * Math.log10(h) - 78.387;
                }
            }

            // Guard against impossible log values or extreme results
            if (isNaN(bf) || bf < 1 || bf > 70) return;

            const fatMass = (bf / 100) * w;
            const leanMass = w - fatMass;

            // Basic American Council on Exercise categorization
            let cat = 'Average';
            if (gender === 'male') {
                if (bf < 6) cat = 'Essential Fat';
                else if (bf <= 13) cat = 'Athletes';
                else if (bf <= 17) cat = 'Fitness';
                else if (bf <= 24) cat = 'Average';
                else cat = 'Obese';
            } else {
                if (bf < 14) cat = 'Essential Fat';
                else if (bf <= 20) cat = 'Athletes';
                else if (bf <= 24) cat = 'Fitness';
                else if (bf <= 31) cat = 'Average';
                else cat = 'Obese';
            }

            setResult({
                bodyFatPct: bf,
                fatMassLbs: fatMass,
                leanMassLbs: leanMass,
                category: cat
            });
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <h1 className="text-4xl font-extrabold mb-4 text-red-900 border-b pb-4">Body Fat Calculator</h1>
            <p className="mb-8 text-gray-600 text-lg">
                Estimate your body fat percentage using the accurate US Navy tape measurement method.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="bg-red-50 p-6 rounded-xl border border-red-100 space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Gender</label>
                            <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-red-500 bg-white">
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Age</label>
                            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-red-500" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Weight (lbs)</label>
                            <input type="number" value={weightLbs} onChange={(e) => setWeightLbs(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-red-500 font-bold" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Height (inches)</label>
                            <input type="number" value={heightInches} onChange={(e) => setHeightInches(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-red-500" />
                        </div>
                    </div>

                    <div className="pt-4 border-t border-red-200">
                        <h3 className="font-bold text-red-800 mb-4 uppercase text-sm tracking-widest">Tape Measurements</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Neck Circumference (inches)</label>
                                <input type="number" step="0.5" value={neck} onChange={(e) => setNeck(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-red-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Waist Circumference (inches)</label>
                                <input type="number" step="0.5" value={waist} onChange={(e) => setWaist(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-red-500" />
                                <p className="text-xs text-gray-500 mt-1">Measure at the navel for males, or the narrowest point for females.</p>
                            </div>

                            {/* Females require Hip measurement for US Navy calculation */}
                            <div className={`transition-opacity duration-300 ${gender === 'female' ? 'opacity-100 max-h-40' : 'opacity-50 max-h-0 overflow-hidden'}`}>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Hip Circumference (inches)</label>
                                <input type="number" step="0.5" value={hip} onChange={(e) => setHip(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-red-500 bg-white" disabled={gender !== 'female'} />
                                <p className="text-xs text-gray-500 mt-1">Measure at the widest point of the buttocks.</p>
                            </div>
                        </div>
                    </div>

                    <button onClick={calculateBodyFat} className="w-full bg-red-600 text-white font-bold py-4 rounded-xl hover:bg-red-700 transition shadow-lg uppercase tracking-wide mt-2">
                        Calculate Body Fat
                    </button>
                </div>

                {/* Results Screen */}
                <div className="bg-white border-2 border-red-100 rounded-xl overflow-hidden shadow-sm flex flex-col items-center justify-center p-8">
                    {result !== null ? (
                        <div className="w-full text-center space-y-8">
                            <div>
                                <h3 className="text-red-800 font-semibold uppercase tracking-wider text-sm mb-2">Estimated Body Fat</h3>
                                <div className="text-7xl font-black text-gray-900 drop-shadow-sm">
                                    {result.bodyFatPct.toFixed(1)}<span className="text-4xl text-red-600 ml-1">%</span>
                                </div>
                                <div className="mt-4 bg-red-100 text-red-800 font-bold py-1 px-4 rounded-full inline-block uppercase tracking-widest text-sm">
                                    {result.category}
                                </div>
                            </div>

                            <div className="h-px w-full bg-red-100"></div>

                            <div className="grid grid-cols-2 gap-4 text-left">
                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                    <h4 className="text-gray-500 font-bold uppercase text-xs mb-1">Lean Body Mass</h4>
                                    <p className="text-2xl font-bold text-gray-800">{result.leanMassLbs.toFixed(1)} <span className="text-sm font-normal">lbs</span></p>
                                </div>
                                <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                                    <h4 className="text-gray-500 font-bold uppercase text-xs mb-1">Total Fat Mass</h4>
                                    <p className="text-2xl font-bold text-red-600">{result.fatMassLbs.toFixed(1)} <span className="text-sm font-normal text-gray-600">lbs</span></p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-red-300 font-medium text-center text-lg max-w-xs">
                            Enter your tape measurements to determine your body fat percentage and fitness category.
                        </div>
                    )}
                </div>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Body Fat Calculator", "operatingSystem": "All", "applicationCategory": "HealthApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } }) }} />
        </div>
    );
}
