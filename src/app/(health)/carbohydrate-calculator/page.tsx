"use client";

import { useState, useEffect } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function CarbohydrateCalculator() {
  const [calories, setCalories] = useState("2000");
  const [goal, setGoal] = useState("moderate"); // low, moderate, high

  const [result, setResult] = useState<{
    grams: number;
    percent: number;
    range: { min: number; max: number };
  } | null>(null);

  useEffect(() => {
    calculateCarbs();
  }, [calories, goal]);

  const calculateCarbs = () => {
    const cals = parseFloat(calories);
    
    if (cals > 0) {
      let percent = 0.5;
      if (goal === "low") percent = 0.25;
      else if (goal === "moderate") percent = 0.45;
      else if (goal === "high") percent = 0.65;

      const grams = (cals * percent) / 4;
      
      setResult({
        grams: grams,
        percent: percent * 100,
        range: {
          min: grams * 0.9,
          max: grams * 1.1
        }
      });
    } else {
      setResult(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-3xl shadow-xl border border-amber-50">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-black mb-4 text-amber-950 tracking-tight">
          Carbohydrate Calculator
        </h1>
        <p className="text-amber-600 text-lg">
          Optimize your energy levels by defining your ideal daily carbohydrate targets.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Input UI */}
        <div className="bg-amber-50/50 p-8 rounded-3xl border border-amber-100 shadow-sm flex flex-col justify-center gap-8">
           <div className="space-y-2">
              <label className="text-[10px] font-black text-amber-700 uppercase tracking-widest block pl-1">Daily Calorie Target (TDEE)</label>
              <input
                type="number"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                className="w-full bg-white rounded-2xl border-amber-200 p-5 font-black text-2xl text-amber-900 focus:ring-4 focus:ring-amber-200 transition-all outline-none"
                placeholder="2000"
              />
           </div>

           <div className="space-y-2">
              <label className="text-[10px] font-black text-amber-700 uppercase tracking-widest block pl-1">Preferred Intake Style</label>
              <div className="grid grid-cols-3 gap-2">
                 {[
                   { id: 'low', label: 'Low', sub: '25%' },
                   { id: 'moderate', label: 'Mod', sub: '45%' },
                   { id: 'high', label: 'High', sub: '65%' }
                 ].map((opt) => (
                   <button
                    key={opt.id}
                    onClick={() => setGoal(opt.id as any)}
                    className={`flex flex-col items-center py-4 rounded-2xl font-black transition-all ${goal === opt.id ? 'bg-amber-500 text-white shadow-lg scale-105' : 'bg-white text-amber-600 border border-amber-100 hover:bg-amber-50'}`}
                   >
                    <span className="text-xs">{opt.label}</span>
                    <span className="text-[9px] opacity-70">{opt.sub}</span>
                   </button>
                 ))}
              </div>
           </div>
        </div>

        {/* Results UI */}
        <div className="flex flex-col">
           {result ? (
             <div className="bg-amber-600 rounded-[2.5rem] p-10 text-white shadow-2xl flex-1 flex flex-col justify-center items-center relative overflow-hidden text-center">
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
                
                <div className="text-amber-100 text-[10px] font-black uppercase tracking-[0.4em] mb-4">Carb Goal</div>
                <div className="text-8xl font-black mb-1 drop-shadow-md">
                   {Math.round(result.grams)}
                   <span className="text-2xl ml-1 opacity-60">g</span>
                </div>
                <div className="text-amber-200/80 text-xs font-bold mb-10">
                   {result.percent}% of total daily energy
                </div>

                <div className="w-full max-w-xs bg-amber-700/40 backdrop-blur-sm p-6 rounded-3xl border border-amber-500/30">
                   <div className="text-[10px] font-black text-amber-200 uppercase tracking-widest mb-3">Optimal Range</div>
                   <div className="flex justify-between items-center text-xl font-black">
                      <span>{Math.round(result.range.min)}g</span>
                      <span className="text-amber-400 font-light">to</span>
                      <span>{Math.round(result.range.max)}g</span>
                   </div>
                </div>
             </div>
           ) : (
             <div className="flex-1 border-4 border-dashed border-amber-100 rounded-[2.5rem] flex items-center justify-center p-8 bg-amber-50/20 text-amber-300 font-black tracking-widest text-sm uppercase text-center leading-loose">
                Define your energy requirements<br/>to calculate carb budget
             </div>
           )}
        </div>
      </div>

      <CalculatorSEO
        title="Carbohydrate Calculator"
        whatIsIt={
          <>
            <p>
              The <strong>Carbohydrate Calculator</strong> determines the specific amount of carbs (in grams) you should consume daily to support your metabolic and performance goals.
            </p>
            <p>
              Carbohydrates are your body's preferred source of fuel, especially for the brain and high-intensity physical activity. By adjusting your intake based on whether you are doing low-intensity fat loss or high-intensity athletic training, you can effectively manage your glycogen levels and fat oxidation.
            </p>
          </>
        }
        formula={
          <>
            <p>Calculations use the biological energy conversion factor:</p>
            <div className="bg-amber-50 p-6 rounded-2xl font-mono text-center text-amber-950 my-4 shadow-sm border border-amber-100">
               <strong>Grams of Carbs</strong> = (Total Calories × Carbohydrate Percentage) ÷ 4
            </div>
            <p className="text-amber-900/60 text-xs text-center mt-2 italic font-medium">Because there are 4 calories in every 1 gram of carbohydrates.</p>
          </>
        }
        example={
          <>
             <p>A person on a <strong>2,000 calorie diet</strong> choosing a <strong>Moderate (45%)</strong> intake:</p>
             <ul className="list-disc pl-6 space-y-2 mt-4 text-amber-900/80">
                <li>Total Carb Calories: 2,000 × 0.45 = 900 kcal</li>
                <li>Grams of Carbs: 900 ÷ 4 = <strong>225g per day</strong></li>
             </ul>
          </>
        }
        useCases={
          <ul className="list-disc pl-6 space-y-4 text-amber-900/80">
             <li><strong>Glycogen Replenishment:</strong> Athletes use higher targets (60%+) to ensure their muscles are refueled for back-to-back training sessions.</li>
             <li><strong>Insulin Management:</strong> People with insulin sensitivity issues often target the 'Low' (25%) bracket to better regulate blood sugar.</li>
             <li><strong>Energy Balance:</strong> Preventing 'hitting the wall' or brain fog by ensuring consistent carbohydrate availability.</li>
          </ul>
        }
        faqs={[
          {
            question: "Are all carbs created equal?",
            answer: "No. Focus on 'Complex' carbohydrates (whole grains, sweet potatoes, legumes) for sustained energy, and limit 'Simple' carbs (sugar, white bread) which cause rapid insulin spikes."
          },
          {
            question: "Do I need carbs to lose weight?",
            answer: "While you can lose weight on a zero-carb diet, many find that a moderate carb intake prevents long-term metabolic slowdown and keeps exercise intensity from dropping."
          },
          {
            question: "How many net carbs should I eat?",
            answer: "This calculator provides 'Total' carbohydrates. To find 'Net' carbs, subtract the grams of dietary fiber from the results provided by this tool."
          }
        ]}
        relatedCalculators={[
          { name: "Macro Calculator", path: "/macro-calculator", desc: "Total dietary split including fats/protein." },
          { name: "Pace Calculator", path: "/pace-calculator", desc: "Calculate running speed for carb-loading." },
          { name: "Calorie Calculator", path: "/calorie-calculator", desc: "Find your TDEE first." },
            {
              name: "BMI Calculator",
              path: "/bmi-calculator",
              desc: "Calculate your Body Mass Index for a quick health assessment.",
            }]}
      />
    </div>
  );
}
