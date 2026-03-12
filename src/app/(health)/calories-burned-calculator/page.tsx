"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

// Common MET values
const activities = [
  { name: "Walking (3 mph)", met: 3.5 },
  { name: "Running (6 mph)", met: 9.8 },
  { name: "Cycling (10-12 mph)", met: 6.8 },
  { name: "Swimming (freestyle, moderate)", met: 8.3 },
  { name: "Weightlifting (vigorous)", met: 6.0 },
  { name: "Yoga (Hatha)", met: 2.5 },
  { name: "High-Impact Aerobics", met: 7.3 },
  { name: "Sitting/Resting", met: 1.0 },
  { name: "Custom MET Value", met: 0 },
];

export default function CaloriesBurnedCalculator() {
  const [weight, setWeight] = useState("150");
  const [unit, setUnit] = useState("lbs");
  const [duration, setDuration] = useState("30");
  const [selectedActivity, setSelectedActivity] = useState(0);
  const [customMet, setCustomMet] = useState("5.0");

  const [result, setResult] = useState<{
    calories: number;
  } | null>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const d = parseFloat(duration);

    if (isNaN(w) || isNaN(d) || w <= 0 || d <= 0) {
      setResult(null);
      return;
    }

    // Convert weight to kg
    const wKg = unit === "lbs" ? w * 0.453592 : w;

    // Duration in hours
    const dHours = d / 60;

    let metValue = activities[selectedActivity].met;
    if (metValue === 0) {
      metValue = parseFloat(customMet);
      if (isNaN(metValue) || metValue <= 0) {
        setResult(null);
        return;
      }
    }

    // Calories burned = MET * weight(kg) * time(hours)
    const calories = metValue * wKg * dHours;

    setResult({ calories });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-rose-900 flex items-center justify-center font-serif">
          <span className="mr-3">🔥</span> Calories Burned Calculator
        </h1>
        <p className="text-rose-700 text-lg max-w-2xl mx-auto">
          Calculate exactly how many calories you burn during various exercises
          and activities.
        </p>
      </div>

      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-zinc-200 mb-8 max-w-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">
              Your Weight
            </label>
            <div className="flex bg-zinc-50 border border-zinc-300 rounded-xl overflow-hidden shadow-sm focus-within:border-rose-500 transition-colors">
              <input
                type="number"
                step="any"
                min="0"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full p-4 font-bold bg-transparent text-xl outline-none"
              />
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="bg-zinc-100 font-bold px-4 text-zinc-600 outline-none border-l border-zinc-300"
              >
                <option value="lbs">lbs</option>
                <option value="kg">kg</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">
              Duration (Minutes)
            </label>
            <input
              type="number"
              step="any"
              min="1"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-rose-500 font-bold bg-zinc-50 text-xl"
            />
          </div>
        </div>

        <div className="mb-8">
          <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">
            Activity Type
          </label>
          <select
            value={selectedActivity}
            onChange={(e) => setSelectedActivity(parseInt(e.target.value))}
            className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-rose-500 font-bold bg-zinc-50 text-xl cursor-pointer"
          >
            {activities.map((act, idx) => (
              <option key={idx} value={idx}>
                {act.name} {act.met > 0 ? `(MET: ${act.met})` : ""}
              </option>
            ))}
          </select>
        </div>

        {activities[selectedActivity].met === 0 && (
          <div className="mb-8">
            <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">
              Custom MET Value
            </label>
            <input
              type="number"
              step="any"
              min="0"
              value={customMet}
              onChange={(e) => setCustomMet(e.target.value)}
              className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-rose-500 font-bold bg-zinc-50 text-xl"
            />
          </div>
        )}

        <div>
          <button
            onClick={calculate}
            className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-rose-600/30 uppercase tracking-widest text-lg"
          >
            Calculate Calories Burned
          </button>
        </div>
      </div>

      {result !== null && (
        <div className="bg-rose-950 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

          <h2 className="text-rose-400 font-bold uppercase tracking-widest text-xs mb-6 z-10 text-center">
            Total Calories Expended
          </h2>

          <div className="bg-black/30 px-12 py-8 rounded-2xl border border-rose-500/30 shadow-inner flex flex-col items-center text-center z-10 w-full max-w-md">
            <div className="font-mono text-white tracking-tight font-black text-6xl md:text-8xl mt-2 truncate w-full">
              {Math.round(result.calories).toLocaleString("en-US")}
            </div>
            <span className="text-rose-300 font-bold uppercase tracking-widest mt-4">
              kcals
            </span>
          </div>

          <p className="mt-8 z-10 text-rose-200/60 font-mono text-sm">
            Formula: MET × Weight(kg) × Time(hrs)
          </p>
        </div>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Calories Burned Calculator",
            operatingSystem: "All",
            applicationCategory: "HealthApplication",
          }),
        }}
      />

      <CalculatorSEO
        title="Calories Burned Calculator"
        whatIsIt={
          <p>
            The <strong>Calories Burned Calculator</strong> calculates how many
            calories you expend during various activities based on your weight
            and workout duration. It uses MET (Metabolic Equivalent of Task)
            values to provide accurate energy expenditure estimates.
          </p>
        }
        formula={
          <>
            <p>The calculation is based on the MET formula:</p>
            <div className="bg-white p-4 rounded-lg font-mono text-center text-[15px] shadow-sm my-4 border border-zinc-200">
              <strong>
                Calories Burned = MET × Weight (in kg) × Duration (in hours)
              </strong>
            </div>
          </>
        }
        example={
          <>
            <p>
              If a 70 kg person runs at 6 mph (MET = 9.8) for 30 minutes (0.5
              hours):
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Weight: 70 kg</li>
              <li>Duration: 0.5 hours</li>
              <li>
                Calculation: 9.8 × 70 × 0.5 = <strong>343 calories</strong>
              </li>
            </ul>
          </>
        }
        useCases={
          <ul className="list-disc pl-6 space-y-4">
            <li>
              <strong>Weight Loss Management:</strong> Track how many calories
              you actively burn to adjust your daily dietary intake.
            </li>
            <li>
              <strong>Fitness Tracking:</strong> Estimate the effectiveness of
              different workout routines for optimal performance.
            </li>
            <li>
              <strong>Energy Expenditure:</strong> Understand how everyday
              activities like walking or resting contribute to your total daily
              energy expenditure (TDEE).
            </li>
          </ul>
        }
        faqs={[
          {
            question: "What is a MET value?",
            answer:
              "MET stands for Metabolic Equivalent of Task. It measures the energy cost of physical activities relative to a resting baseline. For example, a MET of 1 is roughly equivalent to sitting or resting, while a MET of 6 means the activity burns 6 times the energy of resting.",
          },
          {
            question: "Are these calorie burn estimates completely accurate?",
            answer:
              "The MET formula provides a generalized estimate based on averages. Real calorie burn can vary individually depending on muscle mass, age, genetics, gender, and environmental conditions during the exercise.",
          },
            {
              question: "How accurate is this calculator?",
              answer: "Our calculator uses industry-standard formulas to provide the most accurate results possible. However, it should be used for informational purposes only and not as a basis for formal calculations or legal advice.",
            }]}
        relatedCalculators={[
          {
            name: "TDEE Calculator",
            path: "/tdee-calculator",
            desc: "Calculate your Total Daily Energy Expenditure.",
          },
          {
            name: "BMR Calculator",
            path: "/bmr-calculator",
            desc: "Find out your Basal Metabolic Rate for resting calorie burn.",
          },
          {
            name: "Macro Calculator",
            path: "/macro-calculator",
            desc: "Determine your ideal macronutrient split.",
          },
            {
              name: "BMI Calculator",
              path: "/bmi-calculator",
              desc: "Calculate your Body Mass Index for a quick health assessment.",
            }]}
      />
    </div>
  );
}
