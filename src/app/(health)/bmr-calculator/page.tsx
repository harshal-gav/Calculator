"use client";

import { useState, useEffect } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import bmrSeoData from "@/data/seo-content/official/bmr-calculator.json";

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
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-white rounded-3xl shadow-xl border border-rose-50">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-rose-50 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight text-nowrap">BMR Calculator</h1>
          <p className="text-slate-500 font-medium mt-1 text-lg">Calculate your Basal Metabolic Rate—resting energy expenditure.</p>
        </div>
        <div className="bg-rose-50 px-4 py-2 rounded-full border border-rose-100 shrink-0">
          <span className="text-rose-600 font-bold text-sm uppercase tracking-wider">Metabolic Rate</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 shadow-inner space-y-6">
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
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2 mb-1 block">Age (Years)</label>
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
            </div>

            <button onClick={calculateBMR} className="w-full bg-rose-500 hover:bg-rose-600 text-white font-black py-5 rounded-xl transition-all shadow-lg shadow-rose-100 active:scale-[0.98] uppercase tracking-[0.2em] mt-2">
              Calculate BMR
            </button>
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col gap-4">
           {bmrMifflin ? (
             <>
               <div className="flex-1 bg-gradient-to-br from-slate-900 to-rose-950 rounded-[2.5rem] p-10 text-white shadow-2xl flex flex-col justify-center relative overflow-hidden group border border-slate-800">
                  <div className="absolute top-6 right-8 text-[10px] font-black text-rose-500 uppercase tracking-widest border border-rose-500/30 px-3 py-1 rounded-full bg-rose-500/5">Recommended</div>
                  <div className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em] mb-4 font-mono">Mifflin-St Jeor Formula</div>
                  <div className="flex items-baseline gap-3">
                     <span className="text-8xl font-black tracking-tighter group-hover:scale-105 transition-transform duration-700">{Math.round(bmrMifflin).toLocaleString()}</span>
                     <span className="text-rose-500 font-bold uppercase text-xl leading-none">Calories / Day</span>
                  </div>
                  <div className="mt-8 p-5 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm text-sm text-slate-300 leading-relaxed max-w-md">
                    This is your <strong>resting</strong> calorie requirement. Even if you stay in bed all day, your body burns this amount to survive.
                  </div>
               </div>

               <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 shadow-inner flex items-center justify-between group">
                  <div>
                    <div className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Harris-Benedict Estimate</div>
                    <div className="text-3xl font-black text-slate-800">
                      {Math.round(bmrHarris!).toLocaleString()} <span className="text-lg text-slate-400 font-bold">Kcal</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-300 group-hover:text-rose-400 transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
               </div>
             </>
           ) : (
             <div className="flex-1 border-2 border-dashed border-slate-200 rounded-[2.5rem] flex flex-col items-center justify-center p-12 bg-rose-50/5 text-center">
                <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mb-6 text-rose-300">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-2 uppercase tracking-tighter">Energy Floor</h3>
                <p className="text-slate-500 max-w-[340px] font-medium leading-relaxed text-lg">Calculate the minimum calories your body requires to function at rest before any activity is added.</p>
             </div>
           )}
        </div>
      </div>

      <CalculatorSEO
        title={bmrSeoData.title}
        whatIsIt={bmrSeoData.whatIsIt}
        formula={bmrSeoData.formula}
        example={bmrSeoData.example}
        useCases={bmrSeoData.useCases}
        faqs={bmrSeoData.faqs}
        deepDive={bmrSeoData.deepDive}
        glossary={bmrSeoData.glossary}
        relatedCalculators={[
          {
            name: "Calorie Calculator",
            path: "/calorie-calculator/",
            desc: "Energy intake based on activity metrics.",
          },
          {
            name: "Body Fat Calculator",
            path: "/body-fat-calculator/",
            desc: "Beyond the scale metrics.",
          },
          {
            name: "BMI Calculator",
            path: "/bmi-calculator/",
            desc: "The standard health proxy.",
          },
          {
            name: "Ideal Weight Calculator",
            path: "/ideal-weight-calculator/",
            desc: "Targets for your height.",
          }
        ]}
      />
    </div>
  );
}
