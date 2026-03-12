"use client";

import { useState, useEffect } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function BMRCalculator() {
  const [age, setAge] = useState("25");
  const [gender, setGender] = useState("male");
  const [weight, setWeight] = useState("70"); // kg
  const [height, setHeight] = useState("175"); // cm
  const [unit, setUnit] = useState("metric");

  const [bmrMifflin, setBmrMifflin] = useState<number | null>(null);
  const [bmrHarris, setBmrHarris] = useState<number | null>(null);

  useEffect(() => {
    calculateBMR();
  }, [age, gender, weight, height, unit]);

  const calculateBMR = () => {
    let w = parseFloat(weight);
    let h = parseFloat(height);
    const a = parseFloat(age);

    if (unit === "imperial") {
      w = w * 0.453592;
      h = h * 2.54;
    }

    if (w > 0 && h > 0 && a > 0) {
      // Mifflin-St Jeor
      let mifflin = 10 * w + 6.25 * h - 5 * a;
      if (gender === "male") mifflin += 5;
      else mifflin -= 161;

      // Revised Harris-Benedict (Roza and Shizgal, 1984)
      let harris = 0;
      if (gender === "male") {
        harris = 88.362 + (13.397 * w) + (4.799 * h) - (5.677 * a);
      } else {
        harris = 447.593 + (9.247 * w) + (3.098 * h) - (4.330 * a);
      }

      setBmrMifflin(mifflin);
      setBmrHarris(harris);
    } else {
      setBmrMifflin(null);
      setBmrHarris(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-3xl shadow-2xl border border-blue-50">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-black mb-4 text-slate-900 tracking-tight">
          BMR Calculator
        </h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          Calculate your Basal Metabolic Rate—the calories your body needs to maintain vital functions while completely at rest.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Input Panel */}
        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-inner flex flex-col justify-between">
           <div className="space-y-6">
              <div className="flex p-1 bg-white rounded-2xl border border-slate-200 shadow-sm">
                 <button 
                   onClick={() => setGender("male")}
                   className={`flex-1 py-3 rounded-xl font-bold transition-all ${gender === 'male' ? 'bg-slate-900 text-white' : 'text-slate-400 hover:text-slate-600'}`}
                 >
                   Male
                 </button>
                 <button 
                   onClick={() => setGender("female")}
                   className={`flex-1 py-3 rounded-xl font-bold transition-all ${gender === 'female' ? 'bg-slate-900 text-white' : 'text-slate-400 hover:text-slate-600'}`}
                 >
                   Female
                 </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="relative">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2 mb-1 block">Age (Years)</label>
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="w-full bg-white rounded-2xl border-transparent focus:border-slate-300 focus:ring-0 p-4 font-black text-xl text-slate-800 shadow-sm transition-all"
                    />
                 </div>
                 <div className="relative">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2 mb-1 block">System</label>
                    <select
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                      className="w-full bg-white rounded-2xl border-transparent focus:border-slate-300 focus:ring-0 p-4 font-black text-base text-slate-800 shadow-sm transition-all appearance-none"
                    >
                      <option value="metric">Metric (kg/cm)</option>
                      <option value="imperial">US (lb/in)</option>
                    </select>
                 </div>
              </div>

              <div>
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2 mb-1 block">Weight ({unit === 'metric' ? 'kg' : 'lbs'})</label>
                 <input
                   type="number"
                   value={weight}
                   onChange={(e) => setWeight(e.target.value)}
                   className="w-full bg-white rounded-2xl border-transparent focus:border-slate-300 focus:ring-0 p-4 font-black text-xl text-slate-800 shadow-sm transition-all"
                 />
              </div>

              <div>
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2 mb-1 block">Height ({unit === 'metric' ? 'cm' : 'inches'})</label>
                 <input
                   type="number"
                   value={height}
                   onChange={(e) => setHeight(e.target.value)}
                   className="w-full bg-white rounded-2xl border-transparent focus:border-slate-300 focus:ring-0 p-4 font-black text-xl text-slate-800 shadow-sm transition-all"
                 />
              </div>
           </div>
        </div>

        {/* Output Panel */}
        <div className="flex flex-col gap-4">
           {bmrMifflin ? (
             <>
               <div className="flex-1 bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-white shadow-xl flex flex-col justify-center border border-slate-700 relative overflow-hidden group">
                  <div className="absolute top-4 right-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Recommended</div>
                  <div className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] mb-4">Mifflin-St Jeor</div>
                  <div className="flex items-baseline gap-2">
                     <span className="text-6xl font-black tracking-tighter group-hover:scale-105 transition-transform duration-500">{Math.round(bmrMifflin).toLocaleString()}</span>
                     <span className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">Kcal</span>
                  </div>
                  <div className="mt-4 text-xs text-slate-400 leading-relaxed font-medium">
                    This equation is considered the most accurate for the average individual in modern clinical settings.
                  </div>
               </div>

               <div className="flex-1 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-center relative overflow-hidden group">
                  <div className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] mb-4">Harris-Benedict</div>
                  <div className="flex items-baseline gap-2 text-slate-900">
                     <span className="text-4xl font-black tracking-tighter">{Math.round(bmrHarris!).toLocaleString()}</span>
                     <span className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">Kcal</span>
                  </div>
                  <div className="mt-4 text-[10px] text-slate-500 font-bold uppercase tracking-widest flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                    Revised Formula (1984)
                  </div>
               </div>
             </>
           ) : (
             <div className="flex-1 border-4 border-dashed border-slate-100 rounded-3xl flex items-center justify-center p-8 bg-slate-50/20 text-slate-300 text-center text-sm font-black uppercase tracking-widest">
                Data required for estimation
             </div>
           )}
        </div>
      </div>

      <CalculatorSEO
        title="BMR Calculator"
        whatIsIt={
          <>
            <p>
              Your <strong>Basal Metabolic Rate (BMR)</strong> is the number of calories your body burns at rest to maintain basic life-sustaining functions, such as breathing, blood circulation, cell production, and nutrient processing.
            </p>
            <p>
              Essentially, BMR represents the metabolic cost of being alive if you were in a coma and did nothing but stay in bed all day. It accounts for about 60% to 75% of your total daily energy expenditure.
            </p>
          </>
        }
        formula={
          <>
            <p>The two most popular formulas are provided. We recommend using <strong>Mifflin-St Jeor</strong> for contemporary calorie planning:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
               <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 border-b border-slate-200 pb-1">Mifflin-St Jeor</p>
                  <code className="text-[10px] text-slate-700">Male: (10 × W) + (6.25 × H) - (5 × A) + 5</code><br/>
                  <code className="text-[10px] text-slate-700">Female: (10 × W) + (6.25 × H) - (5 × A) - 161</code>
               </div>
               <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 border-b border-slate-200 pb-1">Harris-Benedict (Rev)</p>
                  <code className="text-[10px] text-slate-700">Male: 88.36 + (13.40 × W) + (4.80 × H) - (5.68 × A)</code><br/>
                  <code className="text-[10px] text-slate-700">Female: 447.59 + (9.25 × W) + (3.10 × H) - (4.33 × A)</code>
               </div>
            </div>
          </>
        }
        example={
          <>
            <p>For a <strong>35-year-old female</strong> weighing <strong>65kg</strong> and <strong>165cm</strong> tall:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2 text-slate-700">
               <li>The Mifflin-St Jeor equation might estimate <strong>1,354 Kcal/day</strong>.</li>
               <li>This means even on a day where she is completely inactive, her body requires at least 1,354 calories to function normally.</li>
            </ul>
          </>
        }
        useCases={
          <ul className="list-disc pl-6 space-y-4 text-slate-700">
             <li><strong>Determining Nutrition 'Floor':</strong> It is generally unsafe to eat fewer calories than your BMR for extended periods without medical supervision.</li>
             <li><strong>TDEE Calculation:</strong> BMR is the foundation for calculating your total daily maintenance calories.</li>
             <li><strong>Metabolic Health:</strong> Tracking how BMR changes as you gain muscle (which is more metabolically 'expensive' than fat).</li>
          </ul>
        }
        faqs={[
          {
            question: "Why does muscle mass increase BMR?",
            answer: "Muscle is a metabolically active tissue. It requires energy just to be maintained, unlike fat which is primarily stored energy. Thus, individuals with a higher lean body mass generally have a higher BMR."
          },
          {
            question: "Can I eat less than my BMR?",
            answer: "Consistently eating below your BMR can lead to metabolic adaptation, nutrient deficiencies, and muscle loss. It is recommended to use your TDEE as a baseline for weight loss, not your BMR."
          },
          {
            question: "Does climate affect BMR?",
            answer: "Yes, extreme cold or heat can slightly increase your BMR as your body works harder to maintain its internal core temperature."
          }
        ]}
        relatedCalculators={[
          { name: "TDEE Calculator", path: "/tdee-calculator", desc: "Add your activity to find total daily burn." },
          { name: "BMI Calculator", path: "/bmi-calculator", desc: "Quickly assess your weight status." },
          { name: "Body Fat Calculator", path: "/body-fat-calculator", desc: "Estimate your body composition." }
        ]}
      />
    </div>
  );
}
