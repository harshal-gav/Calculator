"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function FatCalculator() {
  const [age, setAge] = useState("30");
  const [gender, setGender] = useState("male");
  const [weight, setWeight] = useState("75");
  const [weightUnit, setWeightUnit] = useState("kg");
  const [height, setHeight] = useState("175");
  const [heightUnit, setHeightUnit] = useState("cm");
  const [activityLevel, setActivityLevel] = useState("moderate");
  const [dietType, setDietType] = useState("standard"); // standard, low_fat, high_fat, keto

  const w = parseFloat(weight);
  const h = parseFloat(height);
  const a = parseInt(age, 10);

  let weightInKg = w;
  if (weightUnit === "lbs") {
    weightInKg = w / 2.20462;
  }

  let heightInCm = h;
  if (heightUnit === "in") {
    heightInCm = h * 2.54;
  }

  let recommendedFat = 0;
  let minFat = 0;
  let maxFat = 0;
  let totalCalories = 0;
  let isValid = false;

  if (
    !isNaN(weightInKg) &&
    !isNaN(heightInCm) &&
    !isNaN(a) &&
    weightInKg > 0 &&
    heightInCm > 0 &&
    a > 0
  ) {
    isValid = true;

    // 1. Calculate BMR using Mifflin-St Jeor Equation
    let bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * a;
    bmr += gender === "male" ? 5 : -161;

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
    let fatPercentage = 0.3; // Standard diet (30%)

    switch (dietType) {
      case "low_fat":
        fatPercentage = 0.2;
        break;
      case "standard":
        fatPercentage = 0.3;
        break; // 30%
      case "high_fat":
        fatPercentage = 0.45;
        break;
      case "keto":
        fatPercentage = 0.7;
        break; // 70% fats
    }

    const fatCalories = totalCalories * fatPercentage;
    recommendedFat = fatCalories / 9; // 9 kcal per gram

    // Established Ranges (20% to 35% typically, except for keto)
    if (dietType === "keto") {
      minFat = (totalCalories * 0.65) / 9;
      maxFat = (totalCalories * 0.8) / 9;
    } else {
      minFat = (totalCalories * 0.2) / 9; // Minimum healthy fat threshold
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
          Calculate your optimal daily dietary fat intake based on your body
          metrics and diet style.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Inputs */}
        <div className="lg:col-span-3 space-y-6 bg-yellow-50/50 p-6 rounded-2xl border border-yellow-100 shadow-inner">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-yellow-800 mb-2 uppercase tracking-wide">
                Age
              </label>
              <input
                type="number"
                min="15"
                max="100"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full rounded-xl border-yellow-200 p-3 shadow-sm focus:border-yellow-500 font-semibold"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-yellow-800 mb-2 uppercase tracking-wide">
                Gender
              </label>
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
              <label className="block text-sm font-bold text-yellow-800 mb-2 uppercase tracking-wide">
                Height
              </label>
              <div className="flex">
                <input
                  type="number"
                  min="1"
                  step="0.1"
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
              <label className="block text-sm font-bold text-yellow-800 mb-2 uppercase tracking-wide">
                Weight
              </label>
              <div className="flex">
                <input
                  type="number"
                  min="1"
                  step="0.1"
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
            <label className="block text-sm font-bold text-yellow-800 mb-2 uppercase tracking-wide">
              Activity Level
            </label>
            <select
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value)}
              className="w-full rounded-xl border-yellow-200 p-3 shadow-sm focus:border-yellow-500 font-semibold bg-white cursor-pointer"
            >
              <option value="sedentary">
                Sedentary (Little to no exercise)
              </option>
              <option value="light">Lightly Active (1-3 days/week)</option>
              <option value="moderate">
                Moderately Active (3-5 days/week)
              </option>
              <option value="active">Very Active (6-7 days/week)</option>
              <option value="very_active">Extra Active (Physical job)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-yellow-800 mb-2 uppercase tracking-wide">
              Diet Style
            </label>
            <select
              value={dietType}
              onChange={(e) => setDietType(e.target.value)}
              className="w-full rounded-xl border-yellow-200 p-3 shadow-sm focus:border-yellow-500 font-semibold bg-white cursor-pointer"
            >
              <option value="standard">
                Standard Balanced Diet (~30% Fats)
              </option>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-48 w-48 text-white filter drop-shadow-2xl"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1.828-9.172a4 4 0 015.656 0l-5.656 5.656a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              <div className="relative z-10 text-center">
                <h2 className="text-yellow-100 font-bold uppercase tracking-widest text-sm mb-6 drop-shadow-md border-b border-yellow-400/30 pb-3">
                  Daily Fat Target
                </h2>

                <div className="flex flex-col items-center justify-center space-y-2 mb-8">
                  <div className="text-7xl font-black tracking-tight text-white drop-shadow-xl border-4 border-yellow-400/50 rounded-full w-48 h-48 flex items-center justify-center bg-yellow-600/30 backdrop-blur-sm">
                    {Math.round(recommendedFat)}
                    <span className="text-3xl items-end mt-4 ml-1">g</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-yellow-900/40 rounded-xl p-4 border border-yellow-800/30 backdrop-blur-sm shadow-inner">
                    <div className="text-[10px] text-yellow-200 uppercase font-bold mb-1 tracking-wider">
                      Range
                    </div>
                    <div className="text-lg font-bold text-white">
                      {Math.round(minFat)} - {Math.round(maxFat)}g
                    </div>
                  </div>
                  <div className="bg-yellow-900/40 rounded-xl p-4 border border-yellow-800/30 backdrop-blur-sm shadow-inner">
                    <div className="text-[10px] text-yellow-200 uppercase font-bold mb-1 tracking-wider">
                      Daily Energy
                    </div>
                    <div className="text-lg font-bold text-white">
                      {Math.round(totalCalories)}
                      <span className="text-sm font-normal text-yellow-100">
                        {" "}
                        kcal
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full rounded-2xl border-2 border-dashed border-yellow-200 bg-yellow-50/50 flex flex-col items-center justify-center p-8 text-center">
              <div className="text-6xl mb-4 opacity-70 filter saturate-50">
                🥑
              </div>
              <h3 className="text-yellow-900 font-bold text-xl mb-2">
                Awaiting Input
              </h3>
              <p className="text-yellow-600 text-sm">
                Please provide your metrics to calculate your dietary fat
                recommendations.
              </p>
            </div>
          )}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Fat Calculator",
            operatingSystem: "All",
            applicationCategory: "HealthApplication",
          }),
        }}
      />

      <div className="mt-8 text-left">
        <CalculatorSEO
          title="Daily Dietary Fat & Macro Calculator"
          whatIsIt={
            <p>
              The <strong>Fat Calculator</strong> pinpoints exactly how many
              grams of dietary fat you should consume daily. Despite its bad
              reputation from 1990s diet culture, dietary fat is an essential
              macronutrient required for absorbing vitamins, brain function, and
              testosterone/estrogen hormone production. This tool perfectly
              calibrates your fat intake based on your chosen diet style
              (Standard, Low-Fat, or Keto).
            </p>
          }
          formula={
            <>
              <p>
                Like the overarching Macro Calculator, this tool computes your
                baseline daily energy expenditure (TDEE). Once total calories
                are established, it assigns a specific percentage of those
                calories to fat, and divides by the caloric density of fat.
              </p>
              <div className="bg-yellow-50 p-4 rounded-lg font-mono text-center text-[15px] shadow-sm my-4 flex flex-col gap-2 border border-yellow-100 text-yellow-900">
                <p>
                  <strong>
                    Fat Calories = Daily Calories × Diet Ratio (e.g., 30%)
                  </strong>
                </p>
                <p className="mt-2 pt-2 border-t border-yellow-200">
                  <strong>Daily Fat (g) = Fat Calories ÷ 9</strong>
                </p>
                <p className="mt-2 text-xs italic text-yellow-700">
                  Note: Fat is dense! It contains 9 calories per gram (more than
                  double the 4 calories in protein/carbs).
                </p>
              </div>
            </>
          }
          example={
            <>
              <p>
                Let's find the fat target for a man eating a standard 2,500
                calorie diet.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-yellow-800">
                <li>
                  <strong>The Goal/Ratio:</strong> He selects a 'Standard
                  Balanced' diet, which generally allocates exactly 30% of total
                  dietary energy to fats.
                </li>
                <li>
                  <strong>The Math:</strong> 30% of 2,500 total calories = 750
                  calories dedicated exclusively to dietary fat.
                </li>
                <li>
                  <strong>The Gram Conversion:</strong> Because dietary fat
                  contains 9 calories per gram: 750 ÷ 9 = roughly{" "}
                  <strong>83 Grams</strong>.
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-yellow-800">
              <li>
                <strong>Ketogenic Dieters:</strong> Extreme low-carb dieters
                forcing their bodies to adapt to burn fat for fuel. They select
                the Keto diet style, pushing their fat allocation up to an
                astronomical 70% of total calories.
              </li>
              <li>
                <strong>Hormonal Recovery:</strong> Men and women recovering
                from extreme weight loss or crash dieting who crashed their
                testosterone/estrogen levels by consuming too little fat, using
                this tool to ensure they hit their absolute healthy baseline
                minimums (usually ~50g+).
              </li>
              <li>
                <strong>Performance Athletes:</strong> High-volume athletes
                utilizing a higher-fat diet (40%+) to easily consume massive
                amounts of dense calories (via nuts, oils, avocados) when they
                physically cannot stomach any more voluminous carbohydrates.
              </li>
            </ul>
          }
          faqs={[
            {
              question: "Does eating dietary fat make me physically fat?",
              answer:
                "Absolutely not. Eating in a CALORIC SURPLUS (eating more overall energy than you burn) makes you gain body fat. You could eat a diet of 100% pure butter and lose weight, as long as the total butter calories were less than your daily burn (though you would be severely malnourished).",
            },
            {
              question:
                "What is the difference between saturated and unsaturated fats?",
              answer:
                "Unsaturated fats (olive oil, avocados, almonds) are generally heart-healthy and improve cholesterol profiles. Saturated fats (butter, bacon fat, cheese) are solid at room temperature and should be limited as they can negatively impact cardiovascular health in high amounts.",
            },
            {
              question: "What are Trans Fats?",
              answer:
                "Trans fats are artificially created industrial fats (partially hydrogenated oils) found in cheap processed foods. They are universally agreed by science to be terrible for human health, actively causing heart disease. Your goal for Trans Fats should always be 0 grams.",
            },
          ]}
          relatedCalculators={[
            {
              name: "Protein Calculator",
              path: "/protein-calculator",
              desc: "Calculate your daily muscle building macro needs.",
            },
            {
              name: "Carbohydrate Calculator",
              path: "/carbohydrate-calculator",
              desc: "Calculate your daily energy macro needs.",
            },
            {
              name: "TDEE Calculator",
              path: "/tdee-calculator",
              desc: "Calculate the exact number of calories you burn natively every single day.",
            },
          ]}
        />
      </div>
    </div>
  );
}
