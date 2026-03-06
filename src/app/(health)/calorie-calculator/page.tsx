"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function CalorieCalculator() {
  const [age, setAge] = useState("25");
  const [gender, setGender] = useState("male");
  const [heightFt, setHeightFt] = useState("5");
  const [heightIn, setHeightIn] = useState("10");
  const [weightLbs, setWeightLbs] = useState("160");
  const [activity, setActivity] = useState("1.55"); // Active default

  const [results, setResults] = useState<{
    maintain: number;
    mildWeightLoss: number; // -0.5 lb/week
    weightLoss: number; // -1 lb/week
    extremeWeightLoss: number; // -2 lb/week
    weightGain: number; // +1 lb/week
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
      const heightCm = (hFt * 12 + hIn) * 2.54;

      // BMR Calculation
      let bmr = 10 * weightKg + 6.25 * heightCm - 5 * a;
      if (gender === "male") {
        bmr += 5;
      } else {
        bmr -= 161;
      }

      // TDEE (Total Daily Energy Expenditure)
      const tdee = bmr * act;

      setResults({
        maintain: Math.round(tdee),
        mildWeightLoss: Math.round(tdee - 250), // 0.5 lb/week (3500 kcal / lb / 7 days * 0.5) = 250
        weightLoss: Math.round(tdee - 500), // 1 lb/week
        extremeWeightLoss: Math.round(tdee - 1000), // 2 lb/week
        weightGain: Math.round(tdee + 500), // 1 lb/week gain
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-rose-900 border-b pb-4">
        Calorie Calculator
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Estimate the number of calories you need to consume daily to maintain,
        lose, or gain weight.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="bg-rose-50 p-6 rounded-xl border border-rose-100 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Age
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-rose-500 font-medium"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Gender
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-rose-500 bg-white cursor-pointer font-medium text-gray-700"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Height (Feet)
              </label>
              <input
                type="number"
                value={heightFt}
                onChange={(e) => setHeightFt(e.target.value)}
                className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-rose-500 font-medium"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Height (Inches)
              </label>
              <input
                type="number"
                value={heightIn}
                onChange={(e) => setHeightIn(e.target.value)}
                className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-rose-500 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Weight (lbs)
            </label>
            <input
              type="number"
              value={weightLbs}
              onChange={(e) => setWeightLbs(e.target.value)}
              className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-rose-500 font-bold text-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Activity Level
            </label>
            <select
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-rose-500 bg-white cursor-pointer"
            >
              <option value="1.2">Sedentary (Little or no exercise)</option>
              <option value="1.375">
                Lightly active (Exercise 1-3 times/week)
              </option>
              <option value="1.55">
                Moderately active (Exercise 3-5 times/week)
              </option>
              <option value="1.725">
                Very active (Hard exercise 6-7 times/week)
              </option>
              <option value="1.9">
                Extra active (Very hard exercise/sports & physical job)
              </option>
            </select>
          </div>

          <button
            onClick={calculateCalories}
            className="w-full bg-rose-600 text-white font-bold py-4 rounded-xl hover:bg-rose-700 transition shadow-lg uppercase tracking-wide mt-2"
          >
            Calculate Calories
          </button>
        </div>

        {/* Results Table */}
        <div className="bg-white border-2 border-rose-100 rounded-xl overflow-hidden shadow-sm flex flex-col justify-center">
          {results !== null ? (
            <>
              <div className="p-6 bg-rose-600 text-white text-center">
                <h3 className="font-semibold uppercase tracking-wider text-sm opacity-90 mb-1">
                  Maintain Weight
                </h3>
                <div className="text-5xl font-black">
                  {results.maintain.toLocaleString()}{" "}
                  <span className="text-2xl font-medium opacity-80">
                    kcal/day
                  </span>
                </div>
                <p className="text-sm opacity-80 mt-2">
                  100% of daily energy expenditure
                </p>
              </div>

              <table className="min-w-full text-left">
                <tbody className="divide-y divide-gray-100 text-lg">
                  <tr className="bg-orange-50">
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-800">
                        Mild Weight Loss
                      </div>
                      <div className="text-xs text-gray-500">
                        0.5 lb/week (88%)
                      </div>
                    </td>
                    <td className="px-6 py-4 font-black text-orange-700 text-right">
                      {results.mildWeightLoss.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="bg-orange-100">
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-800">Weight Loss</div>
                      <div className="text-xs text-gray-500">
                        1 lb/week (78%)
                      </div>
                    </td>
                    <td className="px-6 py-4 font-black text-orange-800 text-right">
                      {results.weightLoss.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="bg-orange-200">
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-800">
                        Extreme Weight Loss
                      </div>
                      <div className="text-xs text-gray-600">
                        2 lb/week (56%)
                      </div>
                    </td>
                    <td className="px-6 py-4 font-black text-orange-900 text-right">
                      {results.extremeWeightLoss.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="bg-blue-50">
                    <td className="px-6 py-4 border-t-4 border-white">
                      <div className="font-bold text-gray-800">
                        Mild Weight Gain
                      </div>
                      <div className="text-xs text-gray-500">
                        1 lb/week (+500 kcal)
                      </div>
                    </td>
                    <td className="px-6 py-4 font-black text-blue-700 text-right">
                      {results.weightGain.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </>
          ) : (
            <div className="h-full flex items-center justify-center p-8 text-center text-rose-300 font-medium text-lg">
              Adjust your metrics and hit calculate to receive your customized
              daily caloric intake schedules.
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
            name: "Calorie Calculator",
            operatingSystem: "All",
            applicationCategory: "HealthApplication",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

      <CalculatorSEO
        title="Calorie Calculator"
        whatIsIt={
          <>
            <p>
              Our <strong>Calorie Calculator</strong> helps you estimate your
              Total Daily Energy Expenditure (TDEE). Your TDEE is the exact
              number of calories your body burns in a 24-hour period, accounting
              for both your resting metabolism and your daily physical activity
              level.
            </p>
            <p>
              Once you know your exact TDEE, the calculator provides customized
              macro pathways outlining exactly how many calories you should eat
              per day to maintain your current weight, enter a caloric deficit
              to lose fat, or enter an anabolic surplus to build muscle.
            </p>

            <p className="mt-4 text-sm text-gray-500">
              <strong>Related Terms:</strong> Calorie Deficit Calculator,
              Calorie Calculator, Calorie Calculator To Lose Weight, Macro
              Calculator For Weight Loss, Calorie Intake Calculator, Keto Macro
              Calculator, Keto Calculator, Tdee, Free Macro Calculator,
              Maintenance Calorie Calculator, Protein Intake Calculator, Calorie
              Calculator To Gain Weight, Macronutrient Calculator, Iifym
              Calculator
            </p>
          </>
        }
        formula={
          <>
            <p>
              Our tool utilizes the widely respected{" "}
              <strong>Mifflin-St Jeor Equation</strong> to mathematically deduce
              your Basal Metabolic Rate (BMR), and then multiplies that BMR by
              your unique Activity Multiplier to find your TDEE.
            </p>
            <div className="bg-white p-4 rounded-lg font-mono text-center text-lg shadow-sm my-4 overflow-x-auto space-y-4 text-rose-900 border border-rose-100">
              <p>
                <strong>Men:</strong> BMR = (10 × weight in kg) + (6.25 × height
                in cm) - (5 × age in years) + 5
              </p>
              <p>
                <strong>Women:</strong> BMR = (10 × weight in kg) + (6.25 ×
                height in cm) - (5 × age in years) - 161
              </p>
              <p className="border-t border-rose-100 pt-4 mt-4">
                <strong>TDEE</strong> = BMR × Activity Level (1.2 to 1.9)
              </p>
            </div>
          </>
        }
        example={
          <>
            <p>
              Let's look at a <strong>25-year-old active male</strong> who is{" "}
              <strong>5'10" (177.8cm)</strong> and weighs{" "}
              <strong>160 lbs (72.5kg)</strong>.
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>
                <strong>Step 1 (Find BMR):</strong> (10 × 72.5) + (6.25 × 177.8)
                - (5 × 25) + 5 = <strong>1,716 Calories</strong>. This is what
                his body burns if he stays in bed all day.
              </li>
              <li>
                <strong>Step 2 (Apply Activity Multiplier):</strong> Because he
                exercises 3-5 times a week, we multiply by 1.55.
              </li>
              <li>
                <strong>Step 3 (Find TDEE):</strong> 1,716 × 1.55 ={" "}
                <strong>2,660 Calories</strong>.
              </li>
              <li>
                <strong>Step 4 (Goal):</strong> To lose 1 pound of fat per week
                (a 500-calorie daily deficit), he should eat{" "}
                <strong>2,160 Calories</strong> daily.
              </li>
            </ul>
          </>
        }
        useCases={
          <ul className="list-disc pl-6 space-y-4">
            <li>
              <strong>Weight Loss (Cutting):</strong> Identifying the exact
              500-calorie daily deficit needed to safely and sustainably lose 1
              pound of fat per week without crashing your metabolism.
            </li>
            <li>
              <strong>Muscle Gain (Bulking):</strong> Bodybuilders calculating a
              clean 300 to 500 calorie surplus to provide the energy required to
              synthesize new muscle tissue without gaining excess fat.
            </li>
            <li>
              <strong>Athletic Maintenance:</strong> Elite marathon runners
              ensuring they are eating enough thousands of calories to properly
              fuel their massive physical expenditure.
            </li>
          </ul>
        }
        faqs={[
          {
            question: "What is BMR versus TDEE?",
            answer:
              "BMR (Basal Metabolic Rate) is the raw number of calories your body burns just keeping your organs functioning while completely at rest. TDEE (Total Daily Energy Expenditure) is your BMR plus all the calories you burn walking, talking, digesting food, and exercising.",
          },
          {
            question: "Is it safe to eat below my BMR to lose weight faster?",
            answer:
              "Medical professionals generally advise against eating below your BMR. Doing so forces your body to cannibalize muscle tissue for energy and severely down-regulates your metabolism, making future weight loss much harder.",
          },
          {
            question: "Why does gender matter in the equation?",
            answer:
              "On average, men organically carry a higher percentage of lean muscle mass than women of the exact same height and weight. Because muscle tissue burns significantly more calories at rest than fat tissue, men inherently have a slightly higher BMR.",
          },
        ]}
        relatedCalculators={[
          {
            name: "BMI Calculator",
            path: "/bmi-calculator",
            desc: "Check your Body Mass Index based on your height and weight.",
          },
          {
            name: "Body Fat Calculator",
            path: "/body-fat-calculator",
            desc: "Estimate your total body fat percentage based on U.S. Navy methods.",
          },
          {
            name: "Ideal Weight Calculator",
            path: "/ideal-weight-calculator",
            desc: "Discover exactly how much you should weigh based on clinical formulas.",
          },
        ]}
      />
    </div>
  );
}
