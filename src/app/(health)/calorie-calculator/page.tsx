"use client";

import { useState, useEffect } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function CalorieCalculator() {
  const [age, setAge] = useState("25");
  const [gender, setGender] = useState("male");
  const [weight, setWeight] = useState("160");
  const [height, setHeight] = useState("70"); // inches
  const [activity, setActivity] = useState("1.375"); // Lightly active
  const [unit, setUnit] = useState("imperial");

  const [result, setResult] = useState<{
    maintenance: number;
    mildLoss: number;
    weightLoss: number;
    extremeLoss: number;
    mildGain: number;
    weightGain: number;
  } | null>(null);

  useEffect(() => {
    calculateCalories();
  }, [age, gender, weight, height, activity, unit]);

  const calculateCalories = () => {
    let w = parseFloat(weight);
    let h = parseFloat(height);
    const a = parseFloat(age);

    if (unit === "imperial") {
      w = w * 0.453592;
      h = h * 2.54;
    }

    if (w > 0 && h > 0 && a > 0) {
      // Mifflin-St Jeor Equation
      let bmr = 10 * w + 6.25 * h - 5 * a;
      if (gender === "male") {
        bmr += 5;
      } else {
        bmr -= 161;
      }

      const maintenance = bmr * parseFloat(activity);

      setResult({
        maintenance,
        mildLoss: maintenance - 250,
        weightLoss: maintenance - 500,
        extremeLoss: maintenance - 1000,
        mildGain: maintenance + 250,
        weightGain: maintenance + 500,
      });
    } else {
      setResult(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-white rounded-3xl shadow-xl border border-rose-50">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-rose-50 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight text-nowrap">Calorie Calculator</h1>
          <p className="text-slate-500 font-medium mt-1 text-lg">Estimate daily energy requirements for your weight goals.</p>
        </div>
        <div className="bg-rose-50 px-4 py-2 rounded-full border border-rose-100 shrink-0">
          <span className="text-rose-600 font-bold text-sm uppercase tracking-wider">Metabolism Tool</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 shadow-inner space-y-6 text-sm">
            <div className="flex p-1 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
               <button 
                 onClick={() => setGender("male")}
                 className={`flex-1 py-3 rounded-xl font-bold transition-all ${gender === 'male' ? 'bg-rose-500 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
               >
                 Male
               </button>
               <button 
                 onClick={() => setGender("female")}
                 className={`flex-1 py-3 rounded-xl font-bold transition-all ${gender === 'female' ? 'bg-rose-500 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
               >
                 Female
               </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2 mb-1 block">Age</label>
                  <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="w-full bg-white rounded-xl border-2 border-slate-100 focus:border-rose-300 focus:ring-0 p-4 font-black text-xl text-slate-800 shadow-sm" />
               </div>
               <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2 mb-1 block">System</label>
                  <select value={unit} onChange={(e) => setUnit(e.target.value)} className="w-full bg-white rounded-xl border-2 border-slate-100 focus:border-rose-300 focus:ring-0 p-4 font-black text-base text-slate-800 shadow-sm appearance-none">
                    <option value="metric">Metric</option>
                    <option value="imperial">US</option>
                  </select>
               </div>
            </div>

            <div className="space-y-4">
               <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2 mb-1 block">Weight ({unit === 'metric' ? 'kg' : 'lbs'})</label>
                  <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full bg-white rounded-xl border-2 border-slate-100 focus:border-rose-300 focus:ring-0 p-4 font-black text-xl text-slate-800 shadow-sm" />
               </div>
               <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2 mb-1 block">Height ({unit === 'metric' ? 'cm' : 'inches'})</label>
                  <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full bg-white rounded-xl border-2 border-slate-100 focus:border-rose-300 focus:ring-0 p-4 font-black text-xl text-slate-800 shadow-sm" />
               </div>
               <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2 mb-1 block">Activity Level</label>
                  <select value={activity} onChange={(e) => setActivity(e.target.value)} className="w-full bg-white rounded-xl border-2 border-slate-100 focus:border-rose-300 focus:ring-0 p-4 font-bold text-sm text-slate-800 shadow-sm appearance-none">
                    <option value="1.2">Sedentary (Work/Office)</option>
                    <option value="1.375">Light (1-3 days/wk)</option>
                    <option value="1.550">Moderate (4-5 days/wk)</option>
                    <option value="1.725">Active (Daily intense)</option>
                    <option value="1.900">Expert (Physical Labor/Athlete)</option>
                  </select>
               </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col gap-4">
           {result ? (
             <>
               <div className="bg-gradient-to-br from-slate-900 to-rose-950 rounded-[2.5rem] p-10 text-white shadow-2xl flex flex-col justify-center relative overflow-hidden group border border-slate-800">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-rose-500/20 transition-all duration-700"></div>
                  <div className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em] mb-4 font-mono">Daily Maintenance</div>
                  <div className="flex items-baseline gap-4 mb-4">
                     <div className="text-8xl font-black tracking-tighter">{Math.round(result.maintenance).toLocaleString()}</div>
                     <div className="text-emerald-400 font-bold uppercase text-xl leading-none">Kcal / Day</div>
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm flex items-center gap-3">
                    <span className="w-2 h-2 bg-emerald-400 animate-pulse rounded-full"></span>
                    <span className="text-slate-300 text-xs font-medium">Stable Weight Baseline</span>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { label: "Mild Loss", diff: "-250", val: result.mildLoss, color: "bg-slate-50 text-slate-800" },
                    { label: "Weight Loss", diff: "-500", val: result.weightLoss, color: "bg-rose-50 text-rose-800 border-rose-100" },
                    { label: "Extreme", diff: "-1000", val: result.extremeLoss, color: "bg-slate-900 text-white" }
                  ].map((goal, i) => (
                    <div key={i} className={`p-5 rounded-2xl border ${goal.color} transition-all hover:scale-[1.03] flex flex-col justify-center`}>
                       <div className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">{goal.label}</div>
                       <div className="text-2xl font-black">{Math.round(goal.val).toLocaleString()}</div>
                       <div className="text-[9px] font-bold opacity-40 mt-1">{goal.diff} Kcal/Day</div>
                    </div>
                  ))}
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center justify-between">
                     <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-0.5">Mild Gain</div>
                        <div className="text-xl font-black text-emerald-950">{Math.round(result.mildGain).toLocaleString()}</div>
                     </div>
                     <span className="text-emerald-400 font-black">+250</span>
                  </div>
                  <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center justify-between">
                     <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-0.5">Muscle Bulking</div>
                        <div className="text-xl font-black text-emerald-950">{Math.round(result.weightGain).toLocaleString()}</div>
                     </div>
                     <span className="text-emerald-400 font-black">+500</span>
                  </div>
               </div>
             </>
           ) : (
             <div className="flex-1 border-2 border-dashed border-slate-200 rounded-[2.5rem] flex flex-col items-center justify-center p-12 bg-rose-50/5 text-center">
                <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mb-6 text-rose-300">
                   <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                   </svg>
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-2 uppercase tracking-tighter">Energy Scale</h3>
                <p className="text-slate-500 max-w-[340px] font-medium leading-relaxed text-lg">Define your lifestyle and body metrics to see exact caloric targets for your physical goals.</p>
             </div>
           )}
        </div>
      </div>

      <CalculatorSEO
        title="Calorie Calculator"
        whatIsIt={
          <>
            <p>
              The <strong>Calorie Calculator</strong> is a tool used to estimate the number of calories an individual needs to consume daily to maintain, lose, or gain weight. It creates a personalized baseline by factoring in your age, gender, weight, height, and physical activity levels.
            </p>
            <p>
              The calculator utilizes the <strong>Mifflin-St Jeor Equation</strong>, which is currently considered the most accurate method for estimating Basal Metabolic Rate (BMR) for the general population.
            </p>
          </>
        }
        formula={
          <>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 font-mono text-lg text-indigo-700 text-center shadow-sm my-6">
              Daily Calories = BMR × Activity Multiplier
            </div>
            <p className="text-sm text-slate-500 text-center">
              Estimating total daily energy expenditure.
            </p>
          </>
        }
        example={
          <>
            <p>Consider a <strong>25-year-old male</strong> weighing <strong>160 lbs (72.5 kg)</strong> and <strong>5'10" (178 cm)</strong> tall with a <strong>'Lightly Active'</strong> lifestyle:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-orange-900/80">
              <li>His BMR would be approx <strong>1,718 calories</strong>.</li>
              <li>With a 1.375 activity factor, his maintenance calories would be approx <strong>2,362 calories/day</strong>.</li>
              <li>To lose 1 lb per week, he should consume <strong>1,862 calories/day</strong>.</li>
            </ul>
          </>
        }
        useCases={
          <ul className="list-disc pl-6 space-y-4 text-orange-900/80">
            <li><strong>Healthy Weight Management:</strong> Establish a data-driven baseline for your daily food intake.</li>
            <li><strong>Fat Loss Scenarios:</strong> Calculate the exact caloric deficit required to hit specific weight milestones.</li>
            <li><strong>Muscle Building (Bulking):</strong> Determine the 'lean surplus' needed to support muscle growth without excessive fat gain.</li>
          </ul>
        }
        faqs={[
          {
            question: "How accurate is the Calorie Calculator?",
            answer: "The Mifflin-St Jeor equation is highly accurate for most people. However, factors like body fat percentage, hormonal health, and medications can impact individual results. View this as a solid starting point for experimentation."
          },
          {
            question: "What is a safe caloric deficit?",
            answer: "Generally, a deficit of 500 calories per day (leading to 1 lb of weight loss per week) is considered safe and sustainable for most adults."
          },
          {
            question: "Should I eat my 'exercise calories' back?",
            answer: "If you used an 'Active' or 'Moderate' setting in this calculator, your exercise is already accounted for. If you set it to 'Sedentary' and did extra cardio, you may need a small snack to recover, but be careful not to over-estimate the calories burned during exercise."
          }
        ]}
        relatedCalculators={[
          { name: "TDEE Calculator", path: "/tdee-calculator/", desc: "Deeper dive into your total energy expenditure." },
          { name: "BMI Calculator", path: "/bmi-calculator/", desc: "Check if your current weight is in a healthy range." },
          { name: "Macro Calculator", path: "/macro-calculator/", desc: "Break your calories down into Protein, Fats, and Carbs." },
            {
              name: "BMR Calculator",
              path: "/bmr-calculator/",
              desc: "Find your Basal Metabolic Rate to understand your calorie needs at rest.",
            }]}
      />
    </div>
  );
}
