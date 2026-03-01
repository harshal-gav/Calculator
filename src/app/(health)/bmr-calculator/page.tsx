'use client';

import { useState } from 'react';

export default function BmrCalculator() {
    const [gender, setGender] = useState('male');
    const [age, setAge] = useState('30');
    const [weight, setWeight] = useState('75'); // kg
    const [height, setHeight] = useState('175'); // cm

    const [result, setResult] = useState<{
        mifflin: number;
        harrisBenedict: number;
    } | null>(null);

    const calculateBMR = () => {
        const a = parseFloat(age) || 0;
        const w = parseFloat(weight) || 0;
        const h = parseFloat(height) || 0;

        if (a > 0 && w > 0 && h > 0) {
            let mifflin = 0;
            let harris = 0;

            if (gender === 'male') {
                mifflin = (10 * w) + (6.25 * h) - (5 * a) + 5;
                harris = 88.362 + (13.397 * w) + (4.799 * h) - (5.677 * a);
            } else {
                mifflin = (10 * w) + (6.25 * h) - (5 * a) - 161;
                harris = 447.593 + (9.247 * w) + (3.098 * h) - (4.330 * a);
            }

            setResult({
                mifflin: Math.max(0, mifflin),
                harrisBenedict: Math.max(0, harris)
            });
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <h1 className="text-4xl font-extrabold mb-4 text-orange-600 border-b pb-4">BMR Calculator</h1>
            <p className="mb-8 text-gray-600 text-lg">
                Calculate your Basal Metabolic Rate (BMR) — the exact number of calories your body burns while at complete rest.
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
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Age (Years)</label>
                        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-orange-500 font-bold text-lg" />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Weight (kg)</label>
                        <input type="number" step="0.1" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-orange-500 font-bold text-lg" />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Height (cm)</label>
                        <input type="number" step="1" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-orange-500 font-bold text-lg" />
                    </div>

                    <button onClick={calculateBMR} className="w-full bg-orange-600 text-white font-bold py-4 rounded-xl hover:bg-orange-700 transition shadow-lg uppercase tracking-wide mt-2">
                        Calculate BMR
                    </button>
                    <p className="text-center text-xs text-gray-400 mt-2 px-4">Utilizes the gold-standard Mifflin-St Jeor and Revised Harris-Benedict equations.</p>
                </div>

                {/* Results Screen */}
                <div className="bg-white border-2 border-orange-100 rounded-xl overflow-hidden shadow-sm flex flex-col justify-center p-8">
                    {result !== null ? (
                        <div className="w-full text-center space-y-8">
                            <div>
                                <h3 className="text-orange-800 font-bold uppercase tracking-widest text-[11px] mb-2">Mifflin-St Jeor Equation <span className="text-gray-400 normal-case">(Most Accurate)</span></h3>
                                <div className="text-6xl font-black text-gray-900 border-b border-orange-100 pb-4">
                                    {Math.round(result.mifflin).toLocaleString()} <span className="text-2xl text-gray-500 font-medium tracking-tight">kcal/day</span>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-left flex justify-between items-center shadow-inner">
                                <h4 className="text-gray-500 font-bold uppercase text-[10px] tracking-wider leading-tight w-1/2">Revised Harris-Benedict Equation</h4>
                                <p className="text-xl font-bold text-orange-600 w-1/2 text-right">{Math.round(result.harrisBenedict).toLocaleString()} <span className="text-sm font-normal text-gray-500">kcal</span></p>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex items-center justify-center text-center text-orange-300 font-medium text-lg leading-relaxed">
                            Enter your biological metrics to determine your baseline metabolic foundation.
                        </div>
                    )}
                </div>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "BMR Calculator", "operatingSystem": "All", "applicationCategory": "HealthApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } }) }} />
        </div>
    );
}
