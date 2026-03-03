'use client';

import { useState } from 'react';
import CalculatorSEO from '@/components/CalculatorSEO';

export default function MacroCalculator() {
    const [goal, setGoal] = useState('maintenance'); // 'lose', 'maintenance', 'gain'
    const [calories, setCalories] = useState('2000');

    // Macros breakdown selection (e.g. 30/35/35, 40/30/30, etc.)
    const [splitPlan, setSplitPlan] = useState('balanced');

    const [result, setResult] = useState<{
        proteinGrams: number;
        fatGrams: number;
        carbGrams: number;
        totalCals: number;
    } | null>(null);

    const calculateMacros = () => {
        const baseCals = parseFloat(calories) || 0;

        if (baseCals > 0) {
            let targetCals = baseCals;
            if (goal === 'lose') targetCals -= 500;
            if (goal === 'gain') targetCals += 300;

            let proteinPct = 0.30;
            let fatPct = 0.30;
            let carbPct = 0.40;

            if (splitPlan === 'balanced') {
                proteinPct = 0.30; fatPct = 0.35; carbPct = 0.35;
            } else if (splitPlan === 'low-carb') {
                proteinPct = 0.40; fatPct = 0.40; carbPct = 0.20;
            } else if (splitPlan === 'high-protein') {
                proteinPct = 0.40; fatPct = 0.30; carbPct = 0.30;
            }

            // Macros calories
            const pCals = targetCals * proteinPct;
            const fCals = targetCals * fatPct;
            const cCals = targetCals * carbPct;

            // Macros grams (Protein = 4 kcal/g, Fat = 9 kcal/g, Carbs = 4 kcal/g)
            const pGrams = pCals / 4;
            const fGrams = fCals / 9;
            const cGrams = cCals / 4;

            setResult({
                proteinGrams: pGrams,
                fatGrams: fGrams,
                carbGrams: cGrams,
                totalCals: targetCals
            });
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <h1 className="text-4xl font-extrabold mb-4 text-orange-600 border-b pb-4">Macronutrient Calculator</h1>
            <p className="mb-8 text-gray-600 text-lg">
                Discover exactly how many grams of protein, fats, and carbs you should eat per day based on your dietary goals.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="bg-orange-50 p-6 rounded-xl border border-orange-100 space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Your Total Daily Calories (TDEE)</label>
                        <input type="number" value={calories} onChange={(e) => setCalories(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-orange-500 font-bold text-xl" />
                        <p className="text-xs text-gray-500 mt-1">Visit the TDEE calculator first if you do not know this number.</p>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Primary Goal</label>
                        <select value={goal} onChange={(e) => setGoal(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-orange-500 font-medium bg-white">
                            <option value="lose">Weight Loss (-500 kcal)</option>
                            <option value="maintenance">Maintenance (+0 kcal)</option>
                            <option value="gain">Muscle Gain (+300 kcal)</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Diet / Split Preference</label>
                        <select value={splitPlan} onChange={(e) => setSplitPlan(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-orange-500 font-medium bg-white">
                            <option value="balanced">Balanced (30% P / 35% F / 35% C)</option>
                            <option value="low-carb">Low Carb / Keto (40% P / 40% F / 20% C)</option>
                            <option value="high-protein">High Protein (40% P / 30% F / 30% C)</option>
                        </select>
                    </div>

                    <button onClick={calculateMacros} className="w-full bg-orange-600 text-white font-bold py-4 rounded-xl hover:bg-orange-700 transition shadow-lg uppercase tracking-wide mt-2">
                        Calculate Macros
                    </button>
                </div>

                {/* Results Screen */}
                <div className="bg-white border-2 border-orange-100 rounded-xl overflow-hidden shadow-sm flex flex-col justify-center">
                    {result !== null ? (
                        <>
                            <div className="p-8 pb-6 text-center bg-gray-50 border-b border-gray-100">
                                <h3 className="text-gray-500 font-bold uppercase tracking-widest text-[11px] mb-2">Adjusted Daily Target</h3>
                                <div className="text-5xl font-black text-gray-900 tracking-tight">
                                    {Math.round(result.totalCals).toLocaleString()} <span className="text-lg text-gray-500 font-medium normal-case tracking-normal">kcal/day</span>
                                </div>
                            </div>

                            <div className="p-6 space-y-4">
                                <div className="flex justify-between items-center p-4 bg-red-50 rounded-xl border border-red-100">
                                    <div>
                                        <span className="block font-bold text-red-800 uppercase text-sm tracking-widest">Protein</span>
                                        <span className="text-[10px] text-red-600 font-medium">4 kcal per gram</span>
                                    </div>
                                    <span className="font-black text-2xl text-red-600">{Math.round(result.proteinGrams)} <span className="text-sm font-normal">g</span></span>
                                </div>

                                <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-xl border border-yellow-100">
                                    <div>
                                        <span className="block font-bold text-yellow-800 uppercase text-sm tracking-widest">Fats</span>
                                        <span className="text-[10px] text-yellow-700 font-medium">9 kcal per gram</span>
                                    </div>
                                    <span className="font-black text-2xl text-yellow-600">{Math.round(result.fatGrams)} <span className="text-sm font-normal">g</span></span>
                                </div>

                                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-xl border border-blue-100">
                                    <div>
                                        <span className="block font-bold text-blue-800 uppercase text-sm tracking-widest">Carbs</span>
                                        <span className="text-[10px] text-blue-600 font-medium">4 kcal per gram</span>
                                    </div>
                                    <span className="font-black text-2xl text-blue-600">{Math.round(result.carbGrams)} <span className="text-sm font-normal">g</span></span>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="h-full flex items-center justify-center text-center text-orange-300 px-8 font-medium">
                            Set your daily caloric burn, your weight goals, and diet preference to view your custom macronutrient split.
                        </div>
                    )}
                </div>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Macro Calculator", "operatingSystem": "All", "applicationCategory": "HealthApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } }) }} />

            <div className="mt-8">
                <CalculatorSEO
                    title="Macronutrient (Macros) Calculator"
                    whatIsIt={
                        <>
                            <p>The <strong>Macronutrient Calculator</strong> converts your total daily caloric requirement into precise daily targets for grams of Protein, Fat, and Carbohydrates based on your specific body composition goals.</p>
                            <p>While total calories dictate whether you gain or lose raw mass on the scale, <i>Macros</i> dictate what that mass is made of (fat vs. muscle). Tracking macros ensures you don't just lose weight, but actively improve your metabolic health and athletic performance.</p>
                        </>
                    }
                    formula={
                        <>
                            <p>The basic thermodynamic translation from energy (calories) to physical food weight (grams) is strictly fixed by biology:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                                <li><strong>Protein:</strong> Contains exactly <strong>4 kilocalories per gram</strong>.</li>
                                <li><strong>Carbohydrates:</strong> Contains exactly <strong>4 kilocalories per gram</strong>.</li>
                                <li><strong>Fats:</strong> Are much more energy-dense, containing <strong>9 kilocalories per gram</strong>.</li>
                            </ul>
                            <div className="bg-orange-50 p-4 rounded-lg font-mono text-center text-[15px] shadow-sm my-4 text-orange-900 border border-orange-100">
                                <strong>Macro Grams</strong> = (Total Daily Calories × Macro %) ÷ (4 or 9 kcal/g)
                            </div>
                        </>
                    }
                    example={
                        <>
                            <p>Suppose you have a daily maintenance TDEE of <strong>2,500 Calories</strong>. Your goal is <strong>Weight Loss (-500 cal)</strong> using a strict <strong>High Protein Split</strong> (40% Protein / 30% Fat / 30% Carbs).</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                                <li><strong>Adjusted Target:</strong> 2,500 − 500 deficit = <strong>2,000 Calories/day</strong>.</li>
                                <li><strong>Proteins (40%):</strong> 800 calories allocated to protein. 800 ÷ 4 = <strong>200g of Protein</strong>.</li>
                                <li><strong>Fats (30%):</strong> 600 calories allocated to fat. 600 ÷ 9 = <strong>67g of Fat</strong>.</li>
                                <li><strong>Carbs (30%):</strong> 600 calories allocated to carbs. 600 ÷ 4 = <strong>150g of Carbs</strong>.</li>
                            </ul>
                        </>
                    }
                    useCases={
                        <ul className="list-disc pl-6 space-y-4 text-gray-700">
                            <li><strong>Body Recomposition:</strong> Simultaneously burning body fat while building muscle by maintaining a slight caloric deficit but keeping protein mathematically fixed above 1.0g per pound of body weight.</li>
                            <li><strong>Keto Diets:</strong> Calculating strict Low-Carb constraints showing exactly how few grams of carbs (typically {"<"}20%) you can ingest before exiting nutritional ketosis.</li>
                            <li><strong>Endurance Loading:</strong> Shifting to a carb-heavy split (e.g., 50%+) in the days leading up to a marathon to maximize muscular glycogen stores before the race.</li>
                        </ul>
                    }
                    faqs={[
                        {
                            question: "Which macro split should I choose?",
                            answer: "For general fitness and muscle retention, the 'Balanced' or 'High Protein' splits are ideal. The 'Low-Carb' (Keto-style) split is best for aggressive short-term fat loss or people managing insulin resistance, though it can hinder high-intensity anaerobic athletic performance."
                        },
                        {
                            question: "Does alcohol count as a macro?",
                            answer: "Yes, ethanol represents a 'fourth' macronutrient containing 7 kilocalories per gram. Because it lacks nutritional value, most tracking apps require you to manually subtract alcohol calories from your daily Carbohydrate or Fat allowance to keep the math balanced."
                        },
                        {
                            question: "Why does the weight loss goal subtract exactly 500 calories?",
                            answer: "One pound of human adipose tissue (body fat) contains roughly 3,500 calories of stored energy. By enforcing a 500-calorie daily deficit, you force your body to burn exactly 3,500 calories of its own fat per week, resulting in a safe, sustainable baseline of 1 lb of fat loss per week."
                        }
                    ]}
                    relatedCalculators={[
                        { name: "TDEE Calculator", path: "/tdee-calculator", desc: "Find your Total Daily Energy Expenditure before using this calculator." },
                        { name: "Protein Calculator", path: "/protein-calculator", desc: "Calculate protein specifically based on lean body mass metrics." },
                        { name: "Calories Burned Calculator", path: "/calories-burned-calculator", desc: "Track how exercise allows you to increase your daily macro allowances." }
                    ]}
                />
            </div>
        </div>
    );
}
