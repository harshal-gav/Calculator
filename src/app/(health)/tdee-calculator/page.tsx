'use client';

import { useState } from 'react';

export default function TDEECalculator() {
    const [gender, setGender] = useState('male');
    const [age, setAge] = useState('30');
    const [weight, setWeight] = useState('180');
    const [heightFt, setHeightFt] = useState('5');
    const [heightIn, setHeightIn] = useState('11');
    const [activityMultiplier, setActivityMultiplier] = useState('1.55');

    const [tdee, setTdee] = useState<number | null>(null);
    const [bmr, setBmr] = useState<number | null>(null);

    const calculateTDEE = () => {
        const a = parseInt(age);
        const wLbs = parseFloat(weight);
        const hFt = parseFloat(heightFt);
        const hIn = parseFloat(heightIn);
        const act = parseFloat(activityMultiplier);

        if (a > 0 && wLbs > 0) {
            // Conversions
            const wKg = wLbs * 0.453592;
            const hCm = ((hFt * 12) + hIn) * 2.54;

            // Mifflin-St Jeor Equation for Basal Metabolic Rate (BMR)
            let baseBmr = (10 * wKg) + (6.25 * hCm) - (5 * a);
            if (gender === 'male') {
                baseBmr += 5;
            } else {
                baseBmr -= 161;
            }

            setBmr(Math.round(baseBmr));
            setTdee(Math.round(baseBmr * act));
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <h1 className="text-4xl font-extrabold mb-4 text-orange-900 border-b pb-4">TDEE Calculator</h1>
            <p className="mb-8 text-gray-600 text-lg">
                Calculate your Total Daily Energy Expenditure (TDEE), which is the exact number of calories your body burns per day.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Inputs */}
                <div className="md:col-span-7 bg-orange-50 p-6 rounded-xl border border-orange-100 space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Gender</label>
                            <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-orange-500 bg-white cursor-pointer transition">
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Age</label>
                            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-orange-500 font-medium transition" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Height (Feet)</label>
                            <input type="number" value={heightFt} onChange={(e) => setHeightFt(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-orange-500 font-medium transition" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Height (Inches)</label>
                            <input type="number" value={heightIn} onChange={(e) => setHeightIn(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-orange-500 font-medium transition" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Weight (lbs)</label>
                        <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-orange-500 font-bold transition" />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Daily Activity</label>
                        <select value={activityMultiplier} onChange={(e) => setActivityMultiplier(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-orange-500 bg-white cursor-pointer transition">
                            <option value="1.2">Sedentary (office job)</option>
                            <option value="1.375">Light Exercise (1-3 days/week)</option>
                            <option value="1.55">Moderate Exercise (3-5 days/week)</option>
                            <option value="1.725">Heavy Exercise (6-7 days/week)</option>
                            <option value="1.9">Athlete (2x per day)</option>
                        </select>
                    </div>

                    <button onClick={calculateTDEE} className="w-full bg-orange-600 text-white font-bold py-4 rounded-xl hover:bg-orange-700 transition shadow-lg uppercase tracking-wide mt-4">
                        Calculate TDEE
                    </button>
                </div>

                {/* Results Screen */}
                <div className="md:col-span-5 bg-white border-2 border-orange-100 rounded-xl overflow-hidden shadow-sm flex flex-col items-center justify-center p-8">
                    {tdee !== null ? (
                        <div className="w-full text-center space-y-6">
                            <div>
                                <h3 className="text-orange-800 font-semibold uppercase tracking-widest text-sm mb-2">Your Maintenance Calories</h3>
                                <div className="text-6xl font-black text-gray-900 drop-shadow-sm">
                                    {tdee.toLocaleString()}
                                </div>
                                <div className="text-orange-600 font-bold mt-1 uppercase tracking-wide">Calories per day</div>
                            </div>

                            <div className="h-px bg-orange-100 w-full"></div>

                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                                <h4 className="text-gray-500 font-bold uppercase text-xs mb-1">Resting BMR</h4>
                                <p className="text-2xl font-bold text-gray-800">{bmr?.toLocaleString()} <span className="text-sm font-normal text-gray-500">kcal/day</span></p>
                                <p className="text-xs text-gray-400 mt-2 leading-tight">This is what your body burns if you stay in bed all day doing absolutely nothing.</p>
                            </div>
                        </div>
                    ) : (
                        <div className="text-orange-300 font-medium text-center text-lg max-w-[200px]">
                            Input your bodily metrics to reveal your exact Energy Expenditure.
                        </div>
                    )}
                </div>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "TDEE Calculator", "operatingSystem": "All", "applicationCategory": "HealthApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } }) }} />
        </div>
    );
}
