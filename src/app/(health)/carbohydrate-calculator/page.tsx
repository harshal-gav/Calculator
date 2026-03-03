'use client';

import { useState } from 'react';
import CalculatorSEO from '@/components/CalculatorSEO';

export default function CarbohydrateCalculator() {
    const [age, setAge] = useState('30');
    const [gender, setGender] = useState('male');
    const [weight, setWeight] = useState('75');
    const [weightUnit, setWeightUnit] = useState('kg');
    const [height, setHeight] = useState('175');
    const [heightUnit, setHeightUnit] = useState('cm');
    const [activityLevel, setActivityLevel] = useState('moderate');
    const [goal, setGoal] = useState('maintain'); // maintain, lose_weight, gain_muscle

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

    let recommendedCarbs = 0;
    let minRange = 0;
    let maxRange = 0;
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

        // 3. Adjust Calories for Goal
        if (goal === 'lose_weight') {
            totalCalories *= 0.8; // 20% deficit
        } else if (goal === 'gain_muscle') {
            totalCalories *= 1.1; // 10% surplus
        }

        // 4. Calculate Carb targets based on standard AMDR (Acceptable Macronutrient Distribution Range)
        // Generally 45-65% of total calories should come from carbs.
        // Carbs have 4 calories per gram.

        let carbPercentage = 0.50; // default 50%
        if (goal === 'lose_weight') carbPercentage = 0.40; // Lower carbs for deficit
        if (goal === 'gain_muscle') carbPercentage = 0.55; // Higher carbs for performance/muscle sparing

        // Overwrite based on extreme activity
        if (activityLevel === 'very_active') carbPercentage = 0.60;
        if (activityLevel === 'sedentary' && goal === 'lose_weight') carbPercentage = 0.35; // Lower boundary

        const carbCalories = totalCalories * carbPercentage;
        recommendedCarbs = carbCalories / 4; // 4 kcal per gram

        // Established Ranges (40% to 65%)
        minRange = (totalCalories * 0.40) / 4;
        maxRange = (totalCalories * 0.65) / 4;
    }

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-2xl shadow-xl border border-amber-100">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-amber-900 flex items-center justify-center">
                    <span className="mr-3">🍞</span> Carbohydrate Calculator
                </h1>
                <p className="text-amber-700 text-lg max-w-2xl mx-auto">
                    Determine exactly how many grams of carbohydrates you should eat daily based on your metabolic rate and fitness goals.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

                {/* Inputs */}
                <div className="lg:col-span-3 space-y-6 bg-amber-50/50 p-6 rounded-2xl border border-amber-100 shadow-inner">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-amber-800 mb-2 uppercase tracking-wide">Age</label>
                            <input
                                type="number" min="15" max="100"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                className="w-full rounded-xl border-amber-200 p-3 shadow-sm focus:border-amber-500 font-semibold"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-amber-800 mb-2 uppercase tracking-wide">Gender</label>
                            <select
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                className="w-full rounded-xl border-amber-200 p-3 shadow-sm focus:border-amber-500 font-semibold bg-white cursor-pointer"
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-amber-800 mb-2 uppercase tracking-wide">Height</label>
                            <div className="flex">
                                <input
                                    type="number" min="1" step="0.1"
                                    value={height}
                                    onChange={(e) => setHeight(e.target.value)}
                                    className="w-full rounded-l-xl border-amber-200 p-3 shadow-sm focus:border-amber-500 font-semibold text-lg"
                                />
                                <select
                                    value={heightUnit}
                                    onChange={(e) => setHeightUnit(e.target.value)}
                                    className="border-y border-r border-amber-200 bg-amber-100 text-amber-800 font-bold p-3 rounded-r-xl cursor-pointer"
                                >
                                    <option value="cm">cm</option>
                                    <option value="in">in</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-amber-800 mb-2 uppercase tracking-wide">Weight</label>
                            <div className="flex">
                                <input
                                    type="number" min="1" step="0.1"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    className="w-full rounded-l-xl border-amber-200 p-3 shadow-sm focus:border-amber-500 font-semibold text-lg"
                                />
                                <select
                                    value={weightUnit}
                                    onChange={(e) => setWeightUnit(e.target.value)}
                                    className="border-y border-r border-amber-200 bg-amber-100 text-amber-800 font-bold p-3 rounded-r-xl cursor-pointer"
                                >
                                    <option value="kg">kg</option>
                                    <option value="lbs">lbs</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-amber-800 mb-2 uppercase tracking-wide">Activity Level</label>
                        <select
                            value={activityLevel}
                            onChange={(e) => setActivityLevel(e.target.value)}
                            className="w-full rounded-xl border-amber-200 p-3 shadow-sm focus:border-amber-500 font-semibold bg-white cursor-pointer"
                        >
                            <option value="sedentary">Sedentary (Office job, little exercise)</option>
                            <option value="light">Lightly Active (Exercise 1-3 days/week)</option>
                            <option value="moderate">Moderately Active (Exercise 3-5 days/week)</option>
                            <option value="active">Very Active (Exercise 6-7 days/week)</option>
                            <option value="very_active">Extra Active (Physical job or training 2x/day)</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-amber-800 mb-2 uppercase tracking-wide">Primary Goal</label>
                        <select
                            value={goal}
                            onChange={(e) => setGoal(e.target.value)}
                            className="w-full rounded-xl border-amber-200 p-3 shadow-sm focus:border-amber-500 font-semibold bg-white cursor-pointer"
                        >
                            <option value="lose_weight">Lose Weight / Cut</option>
                            <option value="maintain">Maintain Current Weight</option>
                            <option value="gain_muscle">Gain Muscle / Bulk</option>
                        </select>
                    </div>
                </div>

                {/* Dashboard Output */}
                <div className="lg:col-span-2">
                    {isValid ? (
                        <div className="h-full bg-gradient-to-br from-amber-600 to-amber-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden flex flex-col justify-center text-white border border-amber-700">
                            {/* Decorative element */}
                            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-yellow-400/20 to-transparent pointer-events-none"></div>

                            <div className="relative z-10 text-center">
                                <h2 className="text-amber-200 font-bold uppercase tracking-widest text-sm mb-6">Daily Carb Intake</h2>

                                <div className="bg-amber-900/40 rounded-3xl p-6 backdrop-blur-sm border border-amber-500/30 mb-6 shadow-inner">
                                    <div className="text-6xl md:text-7xl font-black tracking-tight text-white mb-2">
                                        {Math.round(recommendedCarbs)}
                                    </div>
                                    <div className="text-lg font-bold text-amber-300 uppercase tracking-widest">
                                        Grams
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-amber-950/50 rounded-xl p-4 border border-amber-800/50">
                                        <div className="text-xs text-amber-300 uppercase font-bold mb-1 tracking-wider">Acceptable Range</div>
                                        <div className="text-lg font-bold text-white">
                                            {Math.round(minRange)} - {Math.round(maxRange)}<span className="text-sm font-normal text-amber-200">g</span>
                                        </div>
                                    </div>
                                    <div className="bg-amber-950/50 rounded-xl p-4 border border-amber-800/50">
                                        <div className="text-xs text-amber-300 uppercase font-bold mb-1 tracking-wider">Total Calories</div>
                                        <div className="text-lg font-bold text-white">
                                            {Math.round(totalCalories)}<span className="text-sm font-normal text-amber-200"> kcal</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 text-xs text-amber-100 text-center opacity-80">
                                    Assumes carbs provide 4 calories per gram. Focus on complex carbohydrates like whole grains, vegetables, and legumes.
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full rounded-2xl border-2 border-dashed border-amber-200 bg-amber-50/50 flex flex-col items-center justify-center p-8 text-center">
                            <div className="text-6xl mb-4 opacity-70">🍞</div>
                            <h3 className="text-amber-900 font-bold text-xl mb-2">Awaiting Input</h3>
                            <p className="text-amber-600">Please provide all necessary details to calculate your carbohydrate needs.</p>
                        </div>
                    )}
                </div>

            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Carbohydrate Calculator", "operatingSystem": "All", "applicationCategory": "HealthApplication" }) }} />

            <div className="mt-8 text-left">
                <CalculatorSEO
                    title="Daily Carb Target & Energy Macro Calculator"
                    whatIsIt={
                        <p>The <strong>Carbohydrate Calculator</strong> determines the specific amount of carbohydrates you need to fuel your body every day. Carbs are your brain and muscles' primary and preferred energy source. By utilizing your Total Daily Energy Expenditure (TDEE) and adjusting for your fitness goals, it finds the perfect macro ratio to keep you energized without spilling over into fat storage.</p>
                    }
                    formula={
                        <>
                            <p>This calculator first establishes your baseline BMR, scales it by your physical activity to find your total daily calories, applies your goal's caloric deficit or surplus, and finally assigns a percentage of those calories to carbohydrates.</p>
                            <div className="bg-amber-50 p-4 rounded-lg font-mono text-center text-[15px] shadow-sm my-4 flex flex-col gap-2 border border-amber-100 text-amber-900">
                                <p><strong>Target Calories = TDEE ± Goal Adjustment</strong></p>
                                <p className="mt-2 pt-2 border-t border-amber-200"><strong>Carb Calories = Target Calories × Diet Ratio (Usually ~50%)</strong></p>
                                <p className="mt-2 pt-2 border-t border-amber-200"><strong>Daily Carbs (g) = Carb Calories ÷ 4</strong></p>
                            </div>
                        </>
                    }
                    example={
                        <>
                            <p>Let's map out carbs for an active woman attempting to maintain her current weight.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4 text-amber-800">
                                <li><strong>The Energy Need:</strong> Her age, height, weight, and activity level establish that she burns 2,000 calories a day.</li>
                                <li><strong>The Ratio:</strong> To maintain high energy for her workouts, she allocates a healthy 50% of her diet strictly to carbs.</li>
                                <li><strong>The Math:</strong> 50% of 2,000 calories = 1,000 calories dedicated to carbohydrates.</li>
                                <li><strong>The Gram Conversion:</strong> Because there are exactly 4 calories in every gram of carbohydrate: 1,000 ÷ 4 = <strong>250 Grams</strong>.</li>
                            </ul>
                        </>
                    }
                    useCases={
                        <ul className="list-disc pl-6 space-y-4 text-amber-800">
                            <li><strong>Marathon Training:</strong> Endurance runners dramatically increasing their carb percentages (up to 65% of their diet) during 'carb loading' phases to ensure their muscle glycogen stores are absolutely full before race day.</li>
                            <li><strong>Low-Carb Dieting:</strong> Individuals attempting to lose weight by restricting carbs. This tool allows them to find their mathematical baseline, ensuring they don't drop their carbs dangerously low and crash their energy levels.</li>
                            <li><strong>Insulin Management:</strong> Diabetics calculating exact carb ratios relative to their overall diet size to safely predict and administer corresponding insulin units.</li>
                        </ul>
                    }
                    faqs={[
                        {
                            question: "Are all carbohydrates equal?",
                            answer: "No. 'Complex Carbs' (oats, brown rice, sweet potatoes) digest slowly, providing stable, long-lasting energy. 'Simple Carbs' (sugar, candy, white bread) digest instantly, physically spiking your blood sugar and leading to inevitable energy crashes."
                        },
                        {
                            question: "Does eating carbs at night make you fat?",
                            answer: "This is a widespread myth. Weight gain is dictated exclusively by total caloric surplus over time (eating more calories than you burn), absolutely regardless of the time of day you consume those calories."
                        },
                        {
                            question: "What is Fiber and does it count as a carb?",
                            answer: "Dietary Fiber is a carbohydrate. However, the human body cannot digest most fiber, meaning it generally provides 0 usable calories and does not spike blood sugar. Many dieters track 'Net Carbs' (Total Carbs - Fiber)."
                        }
                    ]}
                    relatedCalculators={[
                        { name: "Protein Calculator", path: "/protein-calculator", desc: "Calculate your daily muscle building macro needs." },
                        { name: "Fat Calculator", path: "/fat-calculator", desc: "Calculate the dietary fats needed for your organs and hormones." },
                        { name: "Calorie Calculator", path: "/calorie-calculator", desc: "Focus strictly on the total energy limit rather than the splits." }
                    ]}
                />
            </div>
        </div>
    );
}
