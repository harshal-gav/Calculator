'use client';

import { useState } from 'react';

export default function ProteinCalculator() {
    const [age, setAge] = useState('30');
    const [gender, setGender] = useState('male');
    const [weight, setWeight] = useState('75');
    const [weightUnit, setWeightUnit] = useState('kg');
    const [activityLevel, setActivityLevel] = useState('sedentary');
    const [goal, setGoal] = useState('maintain'); // maintain, build_muscle, lose_fat

    // Base protein multipliers (grams of protein per kg of body weight)
    const ACTIVITY_MULTIPLIERS: Record<string, number> = {
        sedentary: 0.8,    // Minimum recommended
        light: 1.1,        // Light exercise 1-3 days/week
        moderate: 1.4,     // Moderate exercise 3-5 days/week
        active: 1.7,       // Hard exercise 6-7 days/week
        very_active: 2.0   // Very hard exercise/physical job
    };

    // Goal adjustments (add/subtract g/kg)
    const GOAL_ADJUSTMENTS: Record<string, number> = {
        maintain: 0.0,
        build_muscle: 0.3,
        lose_fat: 0.2 // Higher protein helps preserve muscle during deficit
    };

    const w = parseFloat(weight);
    const a = parseInt(age, 10);

    let weightInKg = w;
    if (weightUnit === 'lbs') {
        weightInKg = w / 2.20462;
    }

    let recommendedProtein = 0;
    let minProtein = 0;
    let maxProtein = 0;
    let isValid = false;

    if (!isNaN(weightInKg) && !isNaN(a) && weightInKg > 0 && a > 0) {
        isValid = true;

        let baseMultiplier = ACTIVITY_MULTIPLIERS[activityLevel];
        baseMultiplier += GOAL_ADJUSTMENTS[goal];

        // Ensure absolute minimum (RDA) is met
        if (baseMultiplier < 0.8) baseMultiplier = 0.8;

        recommendedProtein = weightInKg * baseMultiplier;

        // Establish range
        minProtein = weightInKg * (baseMultiplier - 0.2 < 0.8 ? 0.8 : baseMultiplier - 0.2);
        maxProtein = weightInKg * (baseMultiplier + 0.3);
    }

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-2xl shadow-xl border border-rose-100">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-rose-900 flex items-center justify-center">
                    <span className="mr-3">🥩</span> Protein Calculator
                </h1>
                <p className="text-rose-700 text-lg max-w-2xl mx-auto">
                    Calculate your optimal daily protein intake based on your body weight, activity level, and fitness goals.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

                {/* Inputs */}
                <div className="lg:col-span-3 space-y-6 bg-rose-50/50 p-6 rounded-2xl border border-rose-100 shadow-inner">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-rose-800 mb-2 uppercase tracking-wide">Age</label>
                            <input
                                type="number" min="1" max="120"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                className="w-full rounded-xl border-rose-200 p-3 shadow-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all font-semibold"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-rose-800 mb-2 uppercase tracking-wide">Gender</label>
                            <select
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                className="w-full rounded-xl border-rose-200 p-3 shadow-sm focus:border-rose-500 font-semibold bg-white cursor-pointer"
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-rose-800 mb-2 uppercase tracking-wide">Weight</label>
                        <div className="flex">
                            <input
                                type="number" min="1" step="0.1"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                className="w-full rounded-l-xl border-rose-200 p-3 shadow-sm focus:border-rose-500 font-bold text-lg"
                            />
                            <select
                                value={weightUnit}
                                onChange={(e) => setWeightUnit(e.target.value)}
                                className="border-y border-r border-rose-200 bg-rose-100 text-rose-800 font-bold p-3 rounded-r-xl cursor-pointer hover:bg-rose-200 transition-colors"
                            >
                                <option value="kg">kg</option>
                                <option value="lbs">lbs</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-rose-800 mb-2 uppercase tracking-wide">Activity Level</label>
                        <select
                            value={activityLevel}
                            onChange={(e) => setActivityLevel(e.target.value)}
                            className="w-full rounded-xl border-rose-200 p-3 shadow-sm focus:border-rose-500 font-semibold bg-white cursor-pointer"
                        >
                            <option value="sedentary">Sedentary (Little to no exercise)</option>
                            <option value="light">Lightly Active (1-3 days/week)</option>
                            <option value="moderate">Moderately Active (3-5 days/week)</option>
                            <option value="active">Very Active (6-7 days/week)</option>
                            <option value="very_active">Extra Active (Physical job/training 2x a day)</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-rose-800 mb-2 uppercase tracking-wide">Fitness Goal</label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <button
                                onClick={() => setGoal('maintain')}
                                className={`p-3 rounded-xl border font-bold text-sm transition-all ${goal === 'maintain' ? 'bg-rose-600 text-white border-rose-700 shadow-md transform scale-105' : 'bg-white text-rose-600 border-rose-200 hover:bg-rose-50'}`}
                            >
                                Maintain Weight
                            </button>
                            <button
                                onClick={() => setGoal('build_muscle')}
                                className={`p-3 rounded-xl border font-bold text-sm transition-all ${goal === 'build_muscle' ? 'bg-rose-600 text-white border-rose-700 shadow-md transform scale-105' : 'bg-white text-rose-600 border-rose-200 hover:bg-rose-50'}`}
                            >
                                Build Muscle
                            </button>
                            <button
                                onClick={() => setGoal('lose_fat')}
                                className={`p-3 rounded-xl border font-bold text-sm transition-all ${goal === 'lose_fat' ? 'bg-rose-600 text-white border-rose-700 shadow-md transform scale-105' : 'bg-white text-rose-600 border-rose-200 hover:bg-rose-50'}`}
                            >
                                Lose Fat / Cut
                            </button>
                        </div>
                    </div>
                </div>

                {/* Dashboard Output */}
                <div className="lg:col-span-2">
                    {isValid ? (
                        <div className="h-full bg-gradient-to-br from-rose-700 to-rose-900 rounded-2xl p-8 shadow-2xl relative overflow-hidden flex flex-col justify-center text-white border border-rose-800">
                            {/* Decorative element */}
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-rose-500 rounded-full mix-blend-multiply filter blur-2xl opacity-50 pointer-events-none"></div>

                            <div className="relative z-10 text-center">
                                <h2 className="text-rose-200 font-bold uppercase tracking-widest text-sm mb-6">Recommended Daily Protein</h2>

                                <div className="flex flex-col items-center justify-center space-y-2 mb-8">
                                    <div className="text-7xl font-black tracking-tight text-white drop-shadow-md">
                                        {Math.round(recommendedProtein)}
                                    </div>
                                    <div className="text-xl font-bold text-rose-300 uppercase tracking-widest">
                                        Grams / Day
                                    </div>
                                </div>

                                <div className="bg-rose-950/50 rounded-xl p-5 backdrop-blur-sm border border-rose-800/50">
                                    <h3 className="text-xs font-bold text-rose-400 uppercase tracking-widest mb-3 border-b border-rose-800/50 pb-2">Target Range</h3>
                                    <div className="flex justify-between items-center px-2">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-white mb-1">{Math.round(minProtein)}g</div>
                                            <div className="text-[10px] text-rose-300 uppercase">Minimum</div>
                                        </div>
                                        <div className="h-8 border-l border-rose-700 mx-4"></div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-white mb-1">{Math.round(maxProtein)}g</div>
                                            <div className="text-[10px] text-rose-300 uppercase">Maximum</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 text-xs text-rose-200 text-left bg-rose-800/30 p-4 rounded-xl">
                                    <span className="font-bold text-rose-300 block mb-1">Dietary Tip:</span>
                                    Spread your protein intake evenly across {goal === 'build_muscle' ? '4-5' : '3-4'} meals for optimal muscle protein synthesis and digestion.
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full rounded-2xl border-2 border-dashed border-rose-200 bg-rose-50/50 flex flex-col items-center justify-center p-8 text-center">
                            <div className="text-6xl mb-4 opacity-70">🥩</div>
                            <h3 className="text-rose-900 font-bold text-xl mb-2">Awaiting Input</h3>
                            <p className="text-rose-600">Please provide valid age and weight to calculate your protein needs.</p>
                        </div>
                    )}
                </div>

            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Protein Calculator", "operatingSystem": "All", "applicationCategory": "HealthApplication" }) }} />
        </div>
    );
}
