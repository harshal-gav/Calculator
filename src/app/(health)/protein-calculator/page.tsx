"use client";

import { useState, useEffect } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function ProteinCalculator() {
  const [weight, setWeight] = useState("165");
  const [unit, setUnit] = useState("imperial");
  const [activity, setActivity] = useState("1.5");
  const [goal, setGoal] = useState("maintenance");

  const [result, setResult] = useState<{
    low: number;
    high: number;
    recommended: number;
  } | null>(null);

  useEffect(() => {
    calculateProtein();
  }, [weight, unit, activity, goal]);

  const calculateProtein = () => {
    let w = parseFloat(weight);
    if (unit === "imperial") {
      w = w * 0.453592; // to kg
    }

    if (w > 0) {
      const activityFactor = parseFloat(activity);
      
      // Base calculation (kg * factor)
      // Sedentary: 0.8
      // Light: 1.2
      // Moderate: 1.5
      // Intense: 1.8 - 2.2
      
      let baseFactor = 1.0;
      if (activityFactor <= 1.2) baseFactor = 0.8;
      else if (activityFactor <= 1.4) baseFactor = 1.2;
      else if (activityFactor <= 1.6) baseFactor = 1.6;
      else baseFactor = 2.0;

      // Adjust for goal
      if (goal === "gain") baseFactor += 0.2;
      if (goal === "lose") baseFactor += 0.4; // Satiety and muscle sparing

      const recommended = w * baseFactor;
      
      setResult({
        low: recommended * 0.8,
        high: recommended * 1.2,
        recommended: recommended
      });
    } else {
      setResult(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-3xl shadow-xl border border-rose-50">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-black mb-4 text-rose-950 tracking-tight">
          Protein Calculator
        </h1>
        <p className="text-rose-600 text-lg">
          Calculate your optimal daily protein intake based on weight, activity, and goals.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Input UI */}
        <div className="bg-rose-50/50 p-6 rounded-3xl border border-rose-100 space-y-5">
           <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-rose-800 mb-2 uppercase tracking-widest">Weight ({unit === 'imperial' ? 'lb' : 'kg'})</label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full rounded-xl border-rose-200 p-4 font-bold text-lg focus:ring-2 focus:ring-rose-400 transition-all shadow-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-rose-800 mb-2 uppercase tracking-widest">Unit</label>
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="w-full rounded-xl border-rose-200 p-4 font-bold text-lg focus:ring-2 focus:ring-rose-400 transition-all appearance-none bg-white shadow-sm"
                >
                  <option value="imperial">Imperial (lb)</option>
                  <option value="metric">Metric (kg)</option>
                </select>
              </div>
           </div>

           <div>
              <label className="block text-xs font-bold text-rose-800 mb-2 uppercase tracking-widest">Activity Level</label>
              <select
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                className="w-full rounded-xl border-rose-200 p-4 font-bold text-sm focus:ring-2 focus:ring-rose-400 transition-all bg-white shadow-sm"
              >
                <option value="1.2">Sedentary (Office job, little movement)</option>
                <option value="1.4">Light (Moderate exercise 1-3 days)</option>
                <option value="1.6">Active (Regular exercise 3-5 days)</option>
                <option value="1.8">Intense (Physical job or 6-7 day sport)</option>
              </select>
           </div>

           <div>
              <label className="block text-xs font-bold text-rose-800 mb-2 uppercase tracking-widest">Dietary Goal</label>
              <div className="flex gap-2">
                 {['lose', 'maintenance', 'gain'].map((g) => (
                   <button
                    key={g}
                    onClick={() => setGoal(g)}
                    className={`flex-1 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all ${goal === g ? 'bg-rose-600 text-white shadow-md' : 'bg-white text-rose-400 border border-rose-100 hover:bg-rose-50'}`}
                   >
                    {g}
                   </button>
                 ))}
              </div>
           </div>
        </div>

        {/* Results UI */}
        <div className="flex flex-col">
           {result ? (
             <div className="bg-rose-600 rounded-3xl p-8 text-white shadow-xl flex-1 relative overflow-hidden flex flex-col justify-center text-center">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-3xl"></div>
                
                <h2 className="text-rose-100 text-xs font-black uppercase tracking-[0.2em] mb-4">Daily Target</h2>
                <div className="text-7xl font-black mb-2 flex items-baseline justify-center gap-2">
                   {Math.round(result.recommended)}
                   <span className="text-xl opacity-60">g</span>
                </div>
                <div className="text-rose-200 text-[10px] font-bold uppercase tracking-widest bg-rose-700/50 py-2 px-4 rounded-full inline-block self-center mb-8">
                   Protein per Day
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="bg-white/10 p-4 rounded-2xl border border-white/10 text-center">
                      <div className="text-[10px] font-bold text-rose-100 uppercase mb-1">Low Range</div>
                      <div className="text-xl font-black">{Math.round(result.low)}g</div>
                   </div>
                   <div className="bg-white/10 p-4 rounded-2xl border border-white/10 text-center">
                      <div className="text-[10px] font-bold text-rose-100 uppercase mb-1">High Range</div>
                      <div className="text-xl font-black">{Math.round(result.high)}g</div>
                   </div>
                </div>
             </div>
           ) : (
             <div className="flex-1 border-4 border-dashed border-rose-100 rounded-3xl flex items-center justify-center p-8 bg-rose-50/20 text-rose-300 font-bold text-center">
                Configure your stats to reveal<br/>protein requirements.
             </div>
           )}
        </div>
      </div>

      <CalculatorSEO
        title="Protein Calculator"
        whatIsIt={
          <>
            <p>
              The <strong>Protein Calculator</strong> is an essential tool for athletes, bodybuilders, and anyone looking to optimize their body composition. It provides a data-driven recommendation for daily protein intake based on your weight, activity levels, and specific health goals.
            </p>
            <p>
              Protein is the primary "building block" of the human body, necessary for muscle repair, enzyme production, and metabolic health. As you increase exercise intensity or enter a caloric deficit, your protein requirements naturally rise to preserve lean muscle mass.
            </p>
          </>
        }
        formula={
          <>
            <p>Recommendations are based on standard sports nutrition protocols:</p>
            <ul className="list-disc pl-6 space-y-4 mt-4 text-rose-900/80">
               <li><strong>Sedentary (RDA):</strong> 0.8g per kg of body weight.</li>
               <li><strong>Strength Training:</strong> 1.6 - 2.2g per kg of body weight.</li>
               <li><strong>Weight Loss:</strong> Higher coefficients (2.0+) are used to maximize satiety and prevent muscle catabolism while in a deficit.</li>
            </ul>
          </>
        }
        example={
          <>
             <p>A <strong>180 lb (81.6 kg) male</strong> who trains regularly (Active) and wants to lose fat:</p>
             <div className="bg-rose-50 p-6 rounded-2xl font-mono text-center text-rose-950 my-4 shadow-inner border border-rose-100">
                81.6 kg × 2.0g = 163g Protein / Day
             </div>
             <p>This ensures his body prioritizes fat loss while maintaining his hard-earned muscle tissue.</p>
          </>
        }
        useCases={
          <ul className="list-disc pl-6 space-y-4 text-rose-900/80">
             <li><strong>Bulking (Muscle Gain):</strong> Ensure you have the amino acid surplus required for hypertrophy.</li>
             <li><strong>Satiety for Fat Loss:</strong> High protein diets reduce hunger by regulating appetite hormones.</li>
             <li><strong>Elderly Health:</strong> Preventing Sarcopenia (age-related muscle loss) through adequate intake.</li>
          </ul>
        }
        faqs={[
          {
            question: "How much protein is too much?",
            answer: "For healthy individuals, intakes up to 2.5-3.0g per kg of body weight have been shown to be safe. However, those with pre-existing kidney conditions should consult a doctor before significantly increasing protein intake."
          },
          {
            question: "Do plant-based proteins count the same?",
            answer: "Yes, but some plant sources lack one or more essential amino acids. Aim for a variety of sources (beans, lentils, tofu, quinoa) to ensure a complete amino acid profile."
          },
          {
            question: "Can I eat all my protein in one meal?",
            answer: "While 'total daily intake' is most important, spreading protein across 3-5 meals can help maximize muscle protein synthesis throughout the day."
          }
        ]}
        relatedCalculators={[
          { name: "BM Calculator", path: "/bmi-calculator", desc: "Check your weight status." },
          { name: "Macro Calculator", path: "/macro-calculator", desc: "See your total dietary breakdown." },
          { name: "LBM Calculator", path: "/lean-body-mass-calculator", desc: "Calculate protein based on lean mass." }
        ]}
      />
    </div>
  );
}
