"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
export default function BmrCalculator() {
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("30");
  const [weight, setWeight] = useState("75"); // kg
  const [height, setHeight] = useState("175"); // cm

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

      if (gender === "male") {
        mifflin = 10 * w + 6.25 * h - 5 * a + 5;
        harris = 88.362 + 13.397 * w + 4.799 * h - 5.677 * a;
      } else {
        mifflin = 10 * w + 6.25 * h - 5 * a - 161;
        harris = 447.593 + 9.247 * w + 3.098 * h - 4.33 * a;
      }

      setResult({
        mifflin: Math.max(0, mifflin),
        harrisBenedict: Math.max(0, harris),
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-orange-600 border-b pb-4">
        BMR Calculator
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Calculate your Basal Metabolic Rate (BMR) — the exact number of calories
        your body burns while at complete rest.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="bg-orange-50 p-6 rounded-xl border border-orange-100 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Biological Sex
            </label>
            <div className="flex gap-4">
              <label
                className={`flex-1 flex items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition ${gender === "male" ? "border-orange-500 bg-orange-100 text-orange-700 font-bold" : "border-gray-200 bg-white text-gray-600"}`}
              >
                <input
                  type="radio"
                  value="male"
                  checked={gender === "male"}
                  onChange={() => setGender("male")}
                  className="hidden"
                />
                Male
              </label>
              <label
                className={`flex-1 flex items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition ${gender === "female" ? "border-orange-500 bg-orange-100 text-orange-700 font-bold" : "border-gray-200 bg-white text-gray-600"}`}
              >
                <input
                  type="radio"
                  value="female"
                  checked={gender === "female"}
                  onChange={() => setGender("female")}
                  className="hidden"
                />
                Female
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Age (Years)
            </label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-orange-500 font-bold text-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Weight (kg)
            </label>
            <input
              type="number"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-orange-500 font-bold text-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Height (cm)
            </label>
            <input
              type="number"
              step="1"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-orange-500 font-bold text-lg"
            />
          </div>

          <button
            onClick={calculateBMR}
            className="w-full bg-orange-600 text-white font-bold py-4 rounded-xl hover:bg-orange-700 transition shadow-lg uppercase tracking-wide mt-2"
          >
            Calculate BMR
          </button>
          <p className="text-center text-xs text-gray-400 mt-2 px-4">
            Utilizes the gold-standard Mifflin-St Jeor and Revised
            Harris-Benedict equations.
          </p>
        </div>

        {/* Results Screen */}
        <div className="bg-white border-2 border-orange-100 rounded-xl overflow-hidden shadow-sm flex flex-col justify-center p-8">
          {result !== null ? (
            <div className="w-full text-center space-y-8">
              <div>
                <h3 className="text-orange-800 font-bold uppercase tracking-widest text-[11px] mb-2">
                  Mifflin-St Jeor Equation{" "}
                  <span className="text-gray-400 normal-case">
                    (Most Accurate)
                  </span>
                </h3>
                <div className="text-6xl font-black text-gray-900 border-b border-orange-100 pb-4">
                  {Math.round(result.mifflin).toLocaleString()}{" "}
                  <span className="text-2xl text-gray-500 font-medium tracking-tight">
                    kcal/day
                  </span>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-left flex justify-between items-center shadow-inner">
                <h4 className="text-gray-500 font-bold uppercase text-[10px] tracking-wider leading-tight w-1/2">
                  Revised Harris-Benedict Equation
                </h4>
                <p className="text-xl font-bold text-orange-600 w-1/2 text-right">
                  {Math.round(result.harrisBenedict).toLocaleString()}{" "}
                  <span className="text-sm font-normal text-gray-500">
                    kcal
                  </span>
                </p>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-center text-orange-300 font-medium text-lg leading-relaxed">
              Enter your biological metrics to determine your baseline metabolic
              foundation.
            </div>
          )}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "BMR Calculator",
            operatingSystem: "All",
            applicationCategory: "HealthApplication",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title="Basal Metabolic Rate Calculator"
          whatIsIt={
            <>
              <p>
                A <strong>Basal Metabolic Rate (BMR) Calculator</strong>{" "}
                determines the absolute minimum number of calories your body
                requires to function while at complete physical and mental rest.
                Think of it as the energy cost just to keep you alive—powering
                your heart, lungs, brain, and cellular regeneration while you
                sleep.
              </p>
              <p>
                Your BMR makes up the vast majority (about 60% to 75%) of your
                total daily energy expenditure. Knowing this baseline number is
                the critical first step before building any accurate weight
                loss, muscle gain, or body recomposition diet plan.
              </p>

              <p className="mt-4 text-sm text-gray-500">
                <strong>Related Terms:</strong> Bmr Calculator, Basal Metabolic
                Rate Calculator, Bmr Calculator To Lose Weight, Resting
                Metabolic Rate Calculator, Metabolic Rate Calculator, Bmr
                Formula
              </p>
            </>
          }
          formula={
            <>
              <p>
                This calculator provides results for two of the most widely
                accepted and scientifically validated formulas in clinical
                nutrition:
              </p>
              <ul className="list-disc pl-6 space-y-3 mt-4 text-zinc-700">
                <li>
                  <strong>The Mifflin-St Jeor Equation (Recommended):</strong>{" "}
                  Developed in 1990, this is considered the gold-standard modern
                  formula by the Academy of Nutrition and Dietetics. It is
                  notably more accurate than older formulas, especially for
                  modern populations.
                </li>
                <li>
                  <strong>The Revised Harris-Benedict Equation:</strong>{" "}
                  Originally published in 1919 and revised in 1984, this is a
                  classic equation still used widely in historical medical
                  texts, though it tends to slightly overestimate BMR in some
                  individuals.
                </li>
              </ul>
            </>
          }
          example={
            <>
              <p>
                Here is how the <strong>Mifflin-St Jeor Equation</strong> works
                for a hypothetical <strong>30-year-old male</strong> who weighs{" "}
                <strong>75kg</strong> and is <strong>175cm</strong> tall.
              </p>
              <ul className="list-none space-y-2 mt-4 font-mono text-sm bg-orange-50 p-4 rounded-xl border border-orange-200">
                <li>
                  <strong>Formula (Male):</strong> (10 × weight in kg) + (6.25 ×
                  height in cm) - (5 × age) + 5
                </li>
                <li>
                  <strong>Step 1 (Weight):</strong> 10 × 75 = 750
                </li>
                <li>
                  <strong>Step 2 (Height):</strong> 6.25 × 175 = 1093.75
                </li>
                <li>
                  <strong>Step 3 (Age):</strong> 5 × 30 = 150
                </li>
                <li>
                  <strong>Step 4 (Calculate):</strong> 750 + 1093.75 - 150 + 5
                </li>
                <li className="pt-2 mt-2 font-bold text-orange-800 border-t border-orange-200">
                  Result: 1,699 kcal/day
                </li>
              </ul>
              <p className="mt-4 text-sm text-zinc-700">
                This individual will naturally burn ~1,700 calories per day even
                if they never get out of bed.
              </p>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4">
              <li>
                <strong>Setting a Dietary Floor:</strong> Nutritionists strongly
                advise against eating <em>below</em> your BMR on a regular
                basis, as it can cause metabolic adaptation (slowdown), nutrient
                deficiencies, and severe fatigue.
              </li>
              <li>
                <strong>Calculating Total Macros:</strong> BMR is Step 1. You
                use your BMR outcome, multiply it by an activity modifier to get
                your TDEE, and then divide that final number into protein, carb,
                and fat goals.
              </li>
            </ul>
          }
          faqs={[
            {
              question: "How is BMR different from TDEE?",
              answer:
                "BMR is just what you burn in a coma. TDEE (Total Daily Energy Expenditure) is your BMR multiplied by your physical activity level. Your TDEE is always higher than your BMR. If you want to lose weight, you eat below your TDEE, but generally not below your BMR.",
            },
            {
              question: "Does muscle mass affect BMR?",
              answer:
                "Yes, significantly. Muscle tissue is far more metabolically active than fat tissue. If two people weigh exactly the same, but Person A is 10% body fat and Person B is 30% body fat, Person A will have a noticeably higher BMR. Standard BMR equations (like Mifflin-St Jeor) estimate this based on typical population averages. For highly muscular athletes, the Katch-McArdle formula (which requires knowing your exact body fat percentage) is more accurate.",
            },
            {
              question: "Does my BMR slow down as I get older?",
              answer:
                "Yes. Starting in your mid-20s, BMR naturally drops by roughly 1% to 2% per decade. This is primarily driven by the natural, age-related loss of muscle mass (sarcopenia) and slowing cellular metabolic processes.",
            },
          ]}
          relatedCalculators={[
            {
              name: "TDEE Calculator",
              path: "/tdee-calculator",
              desc: "Take your BMR and add exercise to figure out your total daily calorie burn.",
            },
            {
              name: "Macro Calculator",
              path: "/macro-calculator",
              desc: "Break your calories down into precise grams of protein, carbs, and fats.",
            },
            {
              name: "BMI Calculator",
              path: "/bmi-calculator",
              desc: "Check if your weight falls within standard medical guidelines for your height.",
            },
          ]}
        />
      </div>
    </div>
  );
}
