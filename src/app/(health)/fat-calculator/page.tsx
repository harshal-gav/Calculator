"use client";

import { useState, useEffect } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function FatCalculator() {
  const [calories, setCalories] = useState("2000");
  const [style, setStyle] = useState("standard"); // low, standard, keto

  const [result, setResult] = useState<{
    grams: number;
    percent: number;
    kcal: number;
  } | null>(null);

  useEffect(() => {
    calculateFat();
  }, [calories, style]);

  const calculateFat = () => {
    const cals = parseFloat(calories);
    if (cals > 0) {
      let percent = 0.3;
      if (style === "low") percent = 0.2;
      else if (style === "standard") percent = 0.35;
      else if (style === "keto") percent = 0.7;

      const kcal = cals * percent;
      const grams = kcal / 9;
      
      setResult({
        grams: grams,
        percent: percent * 100,
        kcal: kcal
      });
    } else {
      setResult(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-[3rem] shadow-2xl border border-yellow-100">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-black mb-4 text-zinc-900 tracking-tight">
          Fat Calculator
        </h1>
        <p className="text-zinc-500 text-lg">
          Determine your essential daily dietary fat allowance for hormonal health and energy.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Input Panel */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-zinc-100 flex flex-col justify-center gap-10">
           <div className="space-y-3">
              <label className="text-[10px] font-black text-yellow-600 uppercase tracking-widest block pl-1">Daily Calories (TDEE)</label>
              <input
                type="number"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                className="w-full bg-zinc-50 rounded-3xl border-transparent p-6 font-black text-3xl text-zinc-800 shadow-inner focus:border-yellow-400 focus:ring-4 focus:ring-yellow-50 transition-all outline-none"
              />
           </div>

           <div className="space-y-3">
              <label className="text-[10px] font-black text-yellow-600 uppercase tracking-widest block pl-1">Dietary Strategy</label>
              <div className="flex p-2 bg-zinc-50 rounded-3xl shadow-inner">
                 {[
                   { id: 'low', label: 'Low Fat' },
                   { id: 'standard', label: 'Standard' },
                   { id: 'keto', label: 'Keto' }
                 ].map((opt) => (
                   <button
                    key={opt.id}
                    onClick={() => setStyle(opt.id as any)}
                    className={`flex-1 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${style === opt.id ? 'bg-white text-zinc-900 shadow-md' : 'text-zinc-400 hover:text-zinc-600'}`}
                   >
                    {opt.label}
                   </button>
                 ))}
              </div>
           </div>
        </div>

        {/* Output Panel */}
        <div className="flex flex-col relative group">
           <div className="absolute inset-0 bg-yellow-400/10 blur-[120px] rounded-full pointer-events-none group-hover:bg-yellow-400/20 transition-all duration-700"></div>
           {result ? (
             <div className="flex-1 bg-zinc-900 rounded-[2.5rem] p-10 text-white shadow-2xl flex flex-col items-center justify-center text-center border-t-4 border-yellow-400">
                <div className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.4em] mb-4">Daily Fat Intake</div>
                <div className="text-8xl font-black mb-4 tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-500">
                   {Math.round(result.grams)}
                   <span className="text-2xl font-bold ml-1 text-yellow-400">g</span>
                </div>
                <div className="px-6 py-2 bg-white/5 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 mb-10">
                   {result.percent}% of total diet
                </div>

                <div className="w-full grid grid-cols-2 gap-4">
                   <div className="bg-white/5 p-5 rounded-3xl border border-white/5 text-center">
                      <div className="text-xs font-black text-white/40 uppercase tracking-widest mb-1">Fat Cals</div>
                      <div className="text-2xl font-black">{Math.round(result.kcal).toLocaleString()}</div>
                   </div>
                   <div className="bg-white/5 p-5 rounded-3xl border border-white/5 text-center">
                      <div className="text-xs font-black text-white/40 uppercase tracking-widest mb-1">Density</div>
                      <div className="text-2xl font-black italic">9<span className="text-xs font-normal">/k</span></div>
                   </div>
                </div>
             </div>
           ) : (
             <div className="flex-1 border-4 border-dashed border-zinc-200 rounded-[2.5rem] flex items-center justify-center p-8 bg-white/50 text-zinc-300 font-black tracking-widest text-center uppercase text-sm leading-loose">
                Set your calorie targets<br/>to estimate fat budget
             </div>
           )}
        </div>
      </div>

      <CalculatorSEO
        title="Fat Calculator"
        whatIsIt={
          <>
            <p>
              The <strong>Fat Calculator</strong> is a specialized tool used to calculate the ideal amount of dietary fat (in grams and percentage) you should consume each day.
            </p>
            <p>
              Dietary fat is much more than just "extra calories"—it is a vital macronutrient required for hormone production (like testosterone and estrogen), nutrient absorption (Vitamins A, D, E, and K), and brain health.
            </p>
          </>
        }
        formula={
          <>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 font-mono text-lg text-indigo-700 text-center shadow-sm my-6">
              Result = f(Metric, Age, Sex)
            </div>
            <p className="text-sm text-slate-500 text-center">
              Biometric calculation utilizing standardized biological and physiological models for Fat.
            </p>
          </>
        }
        example={
          <>
             <p>For a <strong>2,500 calorie diet</strong> with a <strong>Standard (35%)</strong> fat split:</p>
             <ul className="list-disc pl-6 space-y-2 mt-4 text-zinc-700">
                <li>Fat Calories: 2,500 × 0.35 = 875 kcal</li>
                <li>Grams of Fat: 875 ÷ 9 = <strong>97 grams/day</strong></li>
             </ul>
          </>
        }
        useCases={
          <ul className="list-disc pl-6 space-y-4 text-zinc-700">
             <li><strong>Hormonal Leveling:</strong> Ensuring you don't drop fats too low (typically not below 20%) to avoid disruptions in sleep and endocrine function.</li>
             <li><strong>Keto Diet Planning:</strong> Calculating the high-fat thresholds (70%-80%) required to achieve and maintain nutritional ketosis.</li>
             <li><strong>Nutrient Optimization:</strong> Planning fat intake around meals containing fat-soluble vitamins to maximize absorption.</li>
          </ul>
        }
        faqs={[
          {
            question: "Is saturated fat bad?",
            answer: "The consensus suggests limiting saturated fats to less than 10% of total daily calories, prioritizing monounsaturated (olive oil, avocados) and polyunsaturated fats (fish, nuts) for cardiovascular health."
          },
          {
            question: "Can I eat zero fat to lose weight faster?",
            answer: "No. Eating too little fat can lead to dry skin, hair loss, a weakened immune system, and severe hormonal imbalances. It is generally recommended to keep fat at least at 20% of your total intake."
          },
          {
            question: "Why does fat have more calories than protein?",
            answer: "Fats are chemically composed of longer carbon-hydrogen chains, which hold more chemical energy per gram than the structures in proteins or carbohydrates."
          }
        ]}
        relatedCalculators={[
          { name: "Macro Calculator", path: "/macro-calculator/", desc: "Balance your protein and carbs too." },
          { name: "BMI Calculator", path: "/bmi-calculator/", desc: "Check if your weight is in a healthy range." },
          { name: "LBM Calculator", path: "/lean-body-mass-calculator/", desc: "Separate your weight from your body fat." },
            {
              name: "Calorie Calculator",
              path: "/calorie-calculator/",
              desc: "Estimate the number of calories you need to maintain or lose weight.",
            }]}
      />
    </div>
  );
}
