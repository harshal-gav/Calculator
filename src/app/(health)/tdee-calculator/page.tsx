"use client";

import { useState, useEffect } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function TDEECalculator() {
  const [age, setAge] = useState("30");
  const [gender, setGender] = useState("male");
  const [weight, setWeight] = useState("180"); // lbs
  const [height, setHeight] = useState("71"); // inches
  const [activity, setActivity] = useState("1.55"); // Moderate
  const [unit, setUnit] = useState("imperial");

  const [tdee, setTdee] = useState<number | null>(null);
  const [bmr, setBmr] = useState<number | null>(null);

  useEffect(() => {
    calculateTDEE();
  }, [age, gender, weight, height, activity, unit]);

  const calculateTDEE = () => {
    let w = parseFloat(weight);
    let h = parseFloat(height);
    const a = parseFloat(age);

    if (unit === "imperial") {
      w = w * 0.453592;
      h = h * 2.54;
    }

    if (w > 0 && h > 0 && a > 0) {
      // Mifflin-St Jeor
      let bVal = 10 * w + 6.25 * h - 5 * a;
      if (gender === "male") {
        bVal += 5;
      } else {
        bVal -= 161;
      }

      setBmr(bVal);
      setTdee(bVal * parseFloat(activity));
    } else {
      setTdee(null);
      setBmr(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-emerald-50">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-black mb-4 text-emerald-950 tracking-tight">
          TDEE Calculator
        </h1>
        <p className="text-emerald-700 text-lg">
          Discover your Total Daily Energy Expenditure — the number of calories you burn every 24 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm space-y-6">
          <div className="grid grid-cols-2 gap-4">
             <div>
                <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1 pointer-events-none">Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full rounded-xl border-zinc-200 p-4 font-bold text-lg text-zinc-800 focus:border-emerald-500 transition-colors"
                />
             </div>
             <div>
                <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full rounded-xl border-zinc-200 p-4 font-bold text-lg text-zinc-800 focus:border-emerald-500 transition-colors bg-zinc-50 appearance-none"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div>
                <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Weight ({unit === 'imperial' ? 'lbs' : 'kg'})</label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full rounded-xl border-zinc-200 p-4 font-bold text-lg text-zinc-800 focus:border-emerald-500 transition-colors"
                />
             </div>
             <div>
                <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Height ({unit === 'imperial' ? 'inches' : 'cm'})</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full rounded-xl border-zinc-200 p-4 font-bold text-lg text-zinc-800 focus:border-emerald-500 transition-colors"
                />
             </div>
          </div>

          <div>
             <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Activity Tier</label>
             <select
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                className="w-full rounded-xl border-zinc-200 p-4 font-bold text-sm text-zinc-800 focus:border-emerald-500 transition-colors bg-zinc-50 shadow-inner"
             >
                <option value="1.2">Sedentary (No Exercise)</option>
                <option value="1.375">Lightly Active (1-3 days/week)</option>
                <option value="1.55">Moderately Active (3-5 days/week)</option>
                <option value="1.725">Very Active (6-7 days/week)</option>
                <option value="1.9">Extra Active (Athlete/Physical Job)</option>
             </select>
          </div>

          <button 
             onClick={() => setUnit(unit === 'imperial' ? 'metric' : 'imperial')}
             className="w-full py-2 text-[10px] font-bold text-emerald-600 bg-emerald-50 rounded-lg uppercase tracking-widest border border-emerald-100 hover:bg-emerald-100 transition-colors"
          >
             Switch to {unit === 'imperial' ? 'Metric System' : 'Imperial System'}
          </button>
        </div>

        {/* Results */}
        <div className="flex flex-col h-full">
           {tdee ? (
             <div className="bg-emerald-950 rounded-2xl p-8 text-white shadow-2xl flex-1 flex flex-col justify-center border border-emerald-900 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-emerald-400"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400 rounded-full mix-blend-screen filter blur-[50px] opacity-10"></div>
                
                <div className="text-center mb-10">
                   <h2 className="text-emerald-400 text-xs font-black uppercase tracking-[0.3em] mb-4">Total Energy (TDEE)</h2>
                   <div className="text-7xl font-black mb-2 flex items-center justify-center">
                      {Math.round(tdee).toLocaleString()}
                   </div>
                   <div className="text-emerald-200/50 text-xs font-bold uppercase tracking-widest">Calories per day</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="bg-emerald-900/40 p-5 rounded-2xl border border-emerald-800/50 text-center">
                      <div className="text-[10px] font-bold text-emerald-400 uppercase mb-1">BMR (Rest)</div>
                      <div className="text-2xl font-black">{Math.round(bmr!).toLocaleString()}</div>
                   </div>
                   <div className="bg-emerald-900/40 p-5 rounded-2xl border border-emerald-800/50 text-center">
                      <div className="text-[10px] font-bold text-emerald-400 uppercase mb-1">Intensity %</div>
                      <div className="text-2xl font-black">+{Math.round(((tdee/bmr!) - 1) * 100)}%</div>
                   </div>
                </div>

                <div className="mt-8 pt-8 border-t border-emerald-900 flex justify-between items-center text-emerald-100/60 font-mono text-[10px]">
                   <span className="uppercase tracking-widest">Metabolic Profile</span>
                   <span className="bg-emerald-500/10 px-2 py-1 rounded text-emerald-400">STABLE V1.0</span>
                </div>
             </div>
           ) : (
             <div className="flex-1 border-2 border-dashed border-emerald-100 rounded-2xl flex items-center justify-center p-8 bg-white/50 text-emerald-300 italic font-bold text-sm uppercase tracking-widest text-center">
                Configure your metabolic profile...
             </div>
           )}
        </div>
      </div>

      <CalculatorSEO
        title="TDEE Calculator"
        whatIsIt={
          <>
            <p>
              <strong>TDEE</strong>, or Total Daily Energy Expenditure, is a metric used in fitness and nutrition to estimate the total number of calories your body burns in a day when exercise and physical activity are included.
            </p>
            <p>
              While your Basal Metabolic Rate (BMR) tells you what you burn simply by existing, TDEE accounts for the "cost" of living—walking to your car, working at your desk, and your actual gym sessions. Knowing your TDEE is the most critical step in designing a diet for weight loss, maintenance, or muscle gain.
            </p>
          </>
        }
        formula={
          <>
            <p>TDEE is calculated using a two-step process:</p>
            <div className="bg-white p-6 rounded-xl border border-zinc-200 my-6 shadow-sm">
               <ol className="list-decimal pl-6 space-y-4 text-emerald-900/80">
                  <li><strong>Calculate BMR:</strong> Using the Mifflin-St Jeor equation based on height, weight, age, and sex.</li>
                  <li><strong>Apply Activity Factor:</strong> TDEE = BMR × Activity Level (PAL).</li>
               </ol>
            </div>
          </>
        }
        example={
          <>
             <p>A <strong>30-year-old male</strong> athlete who burns <strong>1,800 calories</strong> at rest (BMR) and trains 5 days a week (Moderate Activity factor of 1.55) would have a TDEE of:</p>
             <div className="my-4 font-mono text-center text-xl font-black text-emerald-700">
                1,800 × 1.55 = 2,790 Calories/Day
             </div>
             <p>He must eat <strong>2,790 calories</strong> just to stay the same weight.</p>
          </>
        }
        useCases={
          <ul className="list-disc pl-6 space-y-4 text-zinc-700">
            <li><strong>Fat Loss Strategy:</strong> Subtract 500 calories from your TDEE to create a deficit leading to 1 lb of weight loss per week.</li>
            <li><strong>Bulking Strategy:</strong> Add 250-500 calories above your TDEE to provide the energy surplus required for muscle synthesis.</li>
            <li><strong>Performance Optimization:</strong> Ensure you are eating enough to avoid 'Relative Energy Deficiency in Sport' (RED-S).</li>
          </ul>
        }
        faqs={[
          {
            question: "Is TDEE the same every day?",
            answer: "No. Your TDEE fluctuates based on how much you move that day. This calculator provides an 'average' daily expenditure across the week to help you set a consistent nutrition goal."
          },
          {
            question: "Why is my weight not changing if I'm eating below TDEE?",
            answer: "The most common reasons are underestimating calorie intake (hidden oils, condiments) or overestimating activity levels. Try dropping your activity tier by prefixing your results with a lower multiplier."
          },
          {
            question: "What multiplier should I choose?",
            answer: "If you have a desk job and go to the gym 3 times a week for 45 minutes, 'Lightly Active' is usually the safest choice. 'Moderately Active' is reserved for those who move significantly throughout their workday."
          }
        ]}
        relatedCalculators={[
          { name: "BMR Calculator", path: "/bmr-calculator", desc: "Find your caloric floor (resting burn)." },
          { name: "Ideal Weight Calculator", path: "/ideal-weight-calculator", desc: "See where your body naturally thrives." },
          { name: "Calorie Calculator", path: "/calorie-calculator", desc: "Standard goal-based calorie estimator." },
            {
              name: "BMI Calculator",
              path: "/bmi-calculator",
              desc: "Calculate your Body Mass Index for a quick health assessment.",
            }]}
      />
    </div>
  );
}
