'use client';

import { useState } from 'react';

export default function FatCalculator() {
    const [age, setAge] = useState('30');
    const [gender, setGender] = useState('male');
    const [weight, setWeight] = useState('75');
    const [weightUnit, setWeightUnit] = useState('kg');
    const [height, setHeight] = useState('175');
    const [heightUnit, setHeightUnit] = useState('cm');
    const [activityLevel, setActivityLevel] = useState('moderate');
    const [dietType, setDietType] = useState('standard'); // standard, low_fat, high_fat, keto

    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseInt(age, 10);

    let weightInKg = w;
    if (weightUnit === 'lbs') {
        weightInKg = w / 2.20462;
    }

    let heightInCm = h;
    if (heightUnit === 'in') {
        heightInCm = h * 2.54;
    }

    let recommendedFat = 0;
    let minFat = 0;
    let maxFat = 0;
    let totalCalories = 0;
    let isValid = false;

    if (!isNaN(weightInKg) && !isNaN(heightInCm) && !isNaN(a) && weightInKg > 0 && heightInCm > 0 && a > 0) {
        isValid = true;

        // 1. Calculate BMR using Mifflin-St Jeor Equation
        let bmr = (10 * weightInKg) + (6.25 * heightInCm) - (5 * a);
        bmr += (gender === 'male' ? 5 : -161);

        // 2. Determine TDEE (Total Daily Energy Expenditure)
        const ACTIVITY_MULTIPLIERS: Record<string, number> = {
            sedentary: 1.2,
            light: 1.375,
            moderate: 1.55,
            active: 1.725,
            very_active: 1.9,
        };
        totalCalories = bmr * ACTIVITY_MULTIPLIERS[activityLevel];

        // 3. Determine Fat Percentage based on established Diet Types
        // Fat provides 9 calories per gram.
        let fatPercentage = 0.30; // Standard diet (30%)

        switch (dietType) {
            case 'low_fat': fatPercentage = 0.20; break;
            case 'standard': fatPercentage = 0.30; break; // 30%
            case 'high_fat': fatPercentage = 0.45; break;
            case 'keto': fatPercentage = 0.70; break; // 70% fats
        }

        const fatCalories = totalCalories * fatPercentage;
        recommendedFat = fatCalories / 9; // 9 kcal per gram

        // Established Ranges (20% to 35% typically, except for keto)
        if (dietType === 'keto') {
            minFat = (totalCalories * 0.65) / 9;
            maxFat = (totalCalories * 0.80) / 9;
        } else {
            minFat = (totalCalories * 0.20) / 9; // Minimum healthy fat threshold
            maxFat = (totalCalories * 0.35) / 9; // Max recommended for standard diets
        }
    }

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-2xl shadow-xl border border-yellow-100">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-yellow-900 flex items-center justify-center">
                    <span className="mr-3">🥑</span> Fat Calculator
                </h1>
                <p className="text-yellow-700 text-lg max-w-2xl mx-auto">
                    Calculate your optimal daily dietary fat intake based on your body metrics and diet style.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

                {/* Inputs */}
                <div className="lg:col-span-3 space-y-6 bg-yellow-50/50 p-6 rounded-2xl border border-yellow-100 shadow-inner">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-yellow-800 mb-2 uppercase tracking-wide">Age</label>
                            <input
                                type="number" min="15" max="100"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                className="w-full rounded-xl border-yellow-200 p-3 shadow-sm focus:border-yellow-500 font-semibold"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-yellow-800 mb-2 uppercase tracking-wide">Gender</label>
                            <select
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                className="w-full rounded-xl border-yellow-200 p-3 shadow-sm focus:border-yellow-500 font-semibold bg-white cursor-pointer"
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-yellow-800 mb-2 uppercase tracking-wide">Height</label>
                            <div className="flex">
                                <input
                                    type="number" min="1" step="0.1"
                                    value={height}
                                    onChange={(e) => setHeight(e.target.value)}
                                    className="w-full rounded-l-xl border-yellow-200 p-3 shadow-sm focus:border-yellow-500 font-semibold text-lg"
                                />
                                <select
                                    value={heightUnit}
                                    onChange={(e) => setHeightUnit(e.target.value)}
                                    className="border-y border-r border-yellow-200 bg-yellow-100 text-yellow-800 font-bold p-3 rounded-r-xl cursor-pointer hover:bg-yellow-200"
                                >
                                    <option value="cm">cm</option>
                                    <option value="in">in</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-yellow-800 mb-2 uppercase tracking-wide">Weight</label>
                            <div className="flex">
                                <input
                                    type="number" min="1" step="0.1"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    className="w-full rounded-l-xl border-yellow-200 p-3 shadow-sm focus:border-yellow-500 font-semibold text-lg"
                                />
                                <select
                                    value={weightUnit}
                                    onChange={(e) => setWeightUnit(e.target.value)}
                                    className="border-y border-r border-yellow-200 bg-yellow-100 text-yellow-800 font-bold p-3 rounded-r-xl cursor-pointer hover:bg-yellow-200"
                                >
                                    <option value="kg">kg</option>
                                    <option value="lbs">lbs</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-yellow-800 mb-2 uppercase tracking-wide">Activity Level</label>
                        <select
                            value={activityLevel}
                            onChange={(e) => setActivityLevel(e.target.value)}
                            className="w-full rounded-xl border-yellow-200 p-3 shadow-sm focus:border-yellow-500 font-semibold bg-white cursor-pointer"
                        >
                            <option value="sedentary">Sedentary (Little to no exercise)</option>
                            <option value="light">Lightly Active (1-3 days/week)</option>
                            <option value="moderate">Moderately Active (3-5 days/week)</option>
                            <option value="active">Very Active (6-7 days/week)</option>
                            <option value="very_active">Extra Active (Physical job)</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-yellow-800 mb-2 uppercase tracking-wide">Diet Style</label>
                        <select
                            value={dietType}
                            onChange={(e) => setDietType(e.target.value)}
                            className="w-full rounded-xl border-yellow-200 p-3 shadow-sm focus:border-yellow-500 font-semibold bg-white cursor-pointer"
                        >
                            <option value="standard">Standard Balanced Diet (~30% Fats)</option>
                            <option value="low_fat">Low Fat Diet (~20% Fats)</option>
                            <option value="high_fat">High Fat Diet (~45% Fats)</option>
                            <option value="keto">Ketogenic Diet (~70% Fats)</option>
                        </select>
                    </div>
                </div>

                {/* Dashboard Output */}
                <div className="lg:col-span-2">
                    {isValid ? (
                        <div className="h-full bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-2xl p-8 shadow-2xl relative overflow-hidden flex flex-col justify-center text-white border border-yellow-600">
                            {/* Decorative element */}
                            <div className="absolute bottom-0 right-0 p-8 opacity-20 pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-48 w-48 text-white filter drop-shadow-2xl" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1.828-9.172a4 4 0 015.656 0l-5.656 5.656a4 4 0 010-5.656z" clipRule="evenodd" />
                                </svg>
                            </div>

                            <div className="relative z-10 text-center">
                                <h2 className="text-yellow-100 font-bold uppercase tracking-widest text-sm mb-6 drop-shadow-md border-b border-yellow-400/30 pb-3">Daily Fat Target</h2>

                                <div className="flex flex-col items-center justify-center space-y-2 mb-8">
                                    <div className="text-7xl font-black tracking-tight text-white drop-shadow-xl border-4 border-yellow-400/50 rounded-full w-48 h-48 flex items-center justify-center bg-yellow-600/30 backdrop-blur-sm">
                                        {Math.round(recommendedFat)}<span className="text-3xl items-end mt-4 ml-1">g</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-yellow-900/40 rounded-xl p-4 border border-yellow-800/30 backdrop-blur-sm shadow-inner">
                                        <div className="text-[10px] text-yellow-200 uppercase font-bold mb-1 tracking-wider">Range</div>
                                        <div className="text-lg font-bold text-white">
                                            {Math.round(minFat)} - {Math.round(maxFat)}g
                                        </div>
                                    </div>
                                    <div className="bg-yellow-900/40 rounded-xl p-4 border border-yellow-800/30 backdrop-blur-sm shadow-inner">
                                        <div className="text-[10px] text-yellow-200 uppercase font-bold mb-1 tracking-wider">Daily Energy</div>
                                        <div className="text-lg font-bold text-white">
                                            {Math.round(totalCalories)}<span className="text-sm font-normal text-yellow-100"> kcal</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full rounded-2xl border-2 border-dashed border-yellow-200 bg-yellow-50/50 flex flex-col items-center justify-center p-8 text-center">
                            <div className="text-6xl mb-4 opacity-70 filter saturate-50">🥑</div>
                            <h3 className="text-yellow-900 font-bold text-xl mb-2">Awaiting Input</h3>
                            <p className="text-yellow-600 text-sm">Please provide your metrics to calculate your dietary fat recommendations.</p>
                        </div>
                    )}
                </div>

            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Fat Calculator", "operatingSystem": "All", "applicationCategory": "HealthApplication" }) }} />
        </div>
    );
}
