'use client';

import { useState } from 'react';

export default function CalorieCalculator() {
    const [age, setAge] = useState('25');
    const [gender, setGender] = useState('male');
    const [heightFt, setHeightFt] = useState('5');
    const [heightIn, setHeightIn] = useState('10');
    const [weightLbs, setWeightLbs] = useState('160');
    const [activity, setActivity] = useState('1.55'); // Active default

    const [results, setResults] = useState<{
        maintain: number;
        mildWeightLoss: number; // -0.5 lb/week
        weightLoss: number;     // -1 lb/week
        extremeWeightLoss: number; // -2 lb/week
        weightGain: number;     // +1 lb/week
    } | null>(null);

    const calculateCalories = () => {
        const a = parseInt(age) || 0;
        const hFt = parseInt(heightFt) || 0;
        const hIn = parseInt(heightIn) || 0;
        const wLbs = parseFloat(weightLbs) || 0;
        const act = parseFloat(activity) || 1.2;

        if (a > 0 && wLbs > 0) {
            // Convert to metric for Mifflin-St Jeor Equation
            const weightKg = wLbs * 0.453592;
            const heightCm = ((hFt * 12) + hIn) * 2.54;

            // BMR Calculation
            let bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * a);
            if (gender === 'male') {
                bmr += 5;
            } else {
                bmr -= 161;
            }

            // TDEE (Total Daily Energy Expenditure)
            const tdee = bmr * act;

            setResults({
                maintain: Math.round(tdee),
                mildWeightLoss: Math.round(tdee - 250), // 0.5 lb/week (3500 kcal / lb / 7 days * 0.5) = 250
                weightLoss: Math.round(tdee - 500),     // 1 lb/week
                extremeWeightLoss: Math.round(tdee - 1000), // 2 lb/week
                weightGain: Math.round(tdee + 500)      // 1 lb/week gain
            });
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <h1 className="text-4xl font-extrabold mb-4 text-rose-900 border-b pb-4">Calorie Calculator</h1>
            <p className="mb-8 text-gray-600 text-lg">
                Estimate the number of calories you need to consume daily to maintain, lose, or gain weight.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="bg-rose-50 p-6 rounded-xl border border-rose-100 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Age</label>
                            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-rose-500 font-medium" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Gender</label>
                            <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-rose-500 bg-white cursor-pointer font-medium text-gray-700">
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Height (Feet)</label>
                            <input type="number" value={heightFt} onChange={(e) => setHeightFt(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-rose-500 font-medium" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Height (Inches)</label>
                            <input type="number" value={heightIn} onChange={(e) => setHeightIn(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-rose-500 font-medium" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Weight (lbs)</label>
                        <input type="number" value={weightLbs} onChange={(e) => setWeightLbs(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-rose-500 font-bold text-lg" />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Activity Level</label>
                        <select value={activity} onChange={(e) => setActivity(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-rose-500 bg-white cursor-pointer">
                            <option value="1.2">Sedentary (Little or no exercise)</option>
                            <option value="1.375">Lightly active (Exercise 1-3 times/week)</option>
                            <option value="1.55">Moderately active (Exercise 3-5 times/week)</option>
                            <option value="1.725">Very active (Hard exercise 6-7 times/week)</option>
                            <option value="1.9">Extra active (Very hard exercise/sports & physical job)</option>
                        </select>
                    </div>

                    <button onClick={calculateCalories} className="w-full bg-rose-600 text-white font-bold py-4 rounded-xl hover:bg-rose-700 transition shadow-lg uppercase tracking-wide mt-2">
                        Calculate Calories
                    </button>
                </div>

                {/* Results Table */}
                <div className="bg-white border-2 border-rose-100 rounded-xl overflow-hidden shadow-sm flex flex-col justify-center">
                    {results !== null ? (
                        <>
                            <div className="p-6 bg-rose-600 text-white text-center">
                                <h3 className="font-semibold uppercase tracking-wider text-sm opacity-90 mb-1">Maintain Weight</h3>
                                <div className="text-5xl font-black">
                                    {results.maintain.toLocaleString()} <span className="text-2xl font-medium opacity-80">kcal/day</span>
                                </div>
                                <p className="text-sm opacity-80 mt-2">100% of daily energy expenditure</p>
                            </div>

                            <table className="min-w-full text-left">
                                <tbody className="divide-y divide-gray-100 text-lg">
                                    <tr className="bg-orange-50">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-gray-800">Mild Weight Loss</div>
                                            <div className="text-xs text-gray-500">0.5 lb/week (88%)</div>
                                        </td>
                                        <td className="px-6 py-4 font-black text-orange-700 text-right">{results.mildWeightLoss.toLocaleString()}</td>
                                    </tr>
                                    <tr className="bg-orange-100">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-gray-800">Weight Loss</div>
                                            <div className="text-xs text-gray-500">1 lb/week (78%)</div>
                                        </td>
                                        <td className="px-6 py-4 font-black text-orange-800 text-right">{results.weightLoss.toLocaleString()}</td>
                                    </tr>
                                    <tr className="bg-orange-200">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-gray-800">Extreme Weight Loss</div>
                                            <div className="text-xs text-gray-600">2 lb/week (56%)</div>
                                        </td>
                                        <td className="px-6 py-4 font-black text-orange-900 text-right">{results.extremeWeightLoss.toLocaleString()}</td>
                                    </tr>
                                    <tr className="bg-blue-50">
                                        <td className="px-6 py-4 border-t-4 border-white">
                                            <div className="font-bold text-gray-800">Mild Weight Gain</div>
                                            <div className="text-xs text-gray-500">1 lb/week (+500 kcal)</div>
                                        </td>
                                        <td className="px-6 py-4 font-black text-blue-700 text-right">{results.weightGain.toLocaleString()}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </>
                    ) : (
                        <div className="h-full flex items-center justify-center p-8 text-center text-rose-300 font-medium text-lg">
                            Adjust your metrics and hit calculate to receive your customized daily caloric intake schedules.
                        </div>
                    )}
                </div>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Calorie Calculator", "operatingSystem": "All", "applicationCategory": "HealthApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } }) }} />
        </div>
    );
}
