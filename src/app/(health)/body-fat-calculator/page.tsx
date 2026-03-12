"use client";

import { useState, useEffect } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function BodyFatCalculator() {
  const [gender, setGender] = useState("male");
  const [unit, setUnit] = useState("imperial");
  const [weight, setWeight] = useState("180");
  const [waist, setWaist] = useState("34");
  const [neck, setNeck] = useState("15");
  const [hip, setHip] = useState("40"); // female only
  const [height, setHeight] = useState("71"); // inches

  const [bodyFat, setBodyFat] = useState<number | null>(null);
  const [category, setCategory] = useState<string>("");

  useEffect(() => {
    calculateBodyFat();
  }, [gender, unit, weight, waist, neck, hip, height]);

  const calculateBodyFat = () => {
    let w = parseFloat(waist);
    let n = parseFloat(neck);
    let h = parseFloat(height);
    let hi = parseFloat(hip);

    if (unit === "metric") {
      w = w / 2.54;
      n = n / 2.54;
      h = h / 2.54;
      hi = hi / 2.54;
    }

    if (w > 0 && n > 0 && h > 0) {
      let fatPercent;
      if (gender === "male") {
        // Navy Formula - Male
        fatPercent = 86.010 * Math.log10(w - n) - 70.041 * Math.log10(h) + 36.76;
      } else {
        // Navy Formula - Female
        fatPercent = 163.205 * Math.log10(w + hi - n) - 97.684 * Math.log10(h) - 78.387;
      }

      setBodyFat(fatPercent);
      determineCategory(fatPercent, gender);
    } else {
      setBodyFat(null);
    }
  };

  const determineCategory = (bf: number, g: string) => {
    if (g === "male") {
      if (bf < 6) setCategory("Essential Fat");
      else if (bf < 14) setCategory("Athletes");
      else if (bf < 18) setCategory("Fitness");
      else if (bf < 25) setCategory("Average");
      else setCategory("Obese");
    } else {
      if (bf < 14) setCategory("Essential Fat");
      else if (bf < 21) setCategory("Athletes");
      else if (bf < 25) setCategory("Fitness");
      else if (bf < 32) setCategory("Average");
      else setCategory("Obese");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-white rounded-3xl shadow-xl border border-rose-50">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-rose-50 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight text-nowrap">Body Fat Calculator</h1>
          <p className="text-slate-500 font-medium mt-1 text-lg italic">U.S. Navy Method Body Composition Estimate.</p>
        </div>
        <div className="bg-rose-50 px-4 py-2 rounded-full border border-rose-100 shrink-0">
          <span className="text-rose-600 font-bold text-sm uppercase tracking-wider">Navy Method</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 shadow-inner space-y-6">
            <div className="flex p-1 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden text-sm">
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
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2 mb-1 block">Height ({unit === 'imperial' ? 'In' : 'Cm'})</label>
                  <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full bg-white rounded-xl border-2 border-slate-100 focus:border-rose-300 focus:ring-0 p-4 font-black text-xl text-slate-800 shadow-sm" />
               </div>
               <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2 mb-1 block">Waist ({unit === 'imperial' ? 'In' : 'Cm'})</label>
                  <input type="number" value={waist} onChange={(e) => setWaist(e.target.value)} className="w-full bg-white rounded-xl border-2 border-slate-100 focus:border-rose-300 focus:ring-0 p-4 font-black text-xl text-slate-800 shadow-sm" />
               </div>
            </div>

            <div className={`grid ${gender === 'female' ? 'grid-cols-2' : 'grid-cols-1'} gap-4`}>
               <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2 mb-1 block">Neck ({unit === 'imperial' ? 'In' : 'Cm'})</label>
                  <input type="number" value={neck} onChange={(e) => setNeck(e.target.value)} className="w-full bg-white rounded-xl border-2 border-slate-100 focus:border-rose-300 focus:ring-0 p-4 font-black text-xl text-slate-800 shadow-sm" />
               </div>
               {gender === 'female' && (
                 <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2 mb-1 block">Hips ({unit === 'imperial' ? 'In' : 'Cm'})</label>
                    <input type="number" value={hip} onChange={(e) => setHip(e.target.value)} className="w-full bg-white rounded-xl border-2 border-slate-100 focus:border-rose-300 focus:ring-0 p-4 font-black text-xl text-slate-800 shadow-sm" />
                 </div>
               )}
            </div>

            <div className="pt-2">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2 mb-1 block text-center">Measurement Unit</label>
               <div className="flex p-1 bg-slate-100 rounded-xl">
                  <button onClick={() => setUnit("imperial")} className={`flex-1 py-2 text-[10px] font-bold rounded-lg transition-all ${unit === "imperial" ? "bg-white text-slate-800 shadow-sm" : "text-slate-400"}`}>Imperial (In)</button>
                  <button onClick={() => setUnit("metric")} className={`flex-1 py-2 text-[10px] font-bold rounded-lg transition-all ${unit === "metric" ? "bg-white text-slate-800 shadow-sm" : "text-slate-400"}`}>Metric (Cm)</button>
               </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col gap-4">
           {bodyFat && bodyFat > 0 ? (
             <div className="flex-1 bg-gradient-to-br from-slate-900 to-rose-950 rounded-[2.5rem] p-10 text-white shadow-2xl flex flex-col justify-center relative overflow-hidden group border border-slate-800">
                <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-rose-500/20 transition-all duration-700"></div>
                <div className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em] mb-4 font-mono">Composition Estimate</div>
                <div className="flex items-baseline gap-4 mb-6">
                   <div className="text-8xl font-black tracking-tighter">{bodyFat.toFixed(1)}%</div>
                   <div className={`text-xl font-black px-4 py-1.5 rounded-xl border-2 uppercase tracking-tight ${category === 'Obese' ? 'bg-red-500/10 border-red-500/50 text-red-400' : 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400'}`}>
                      {category}
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-6 p-6 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm">
                  <div>
                     <div className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">Lean Target</div>
                     <div className="text-2xl font-black text-emerald-400">{((100 - bodyFat) * parseFloat(weight) / 100).toFixed(1)} <span className="text-sm">lbs</span></div>
                  </div>
                  <div>
                     <div className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">Fat Mass</div>
                     <div className="text-2xl font-black text-rose-400">{(bodyFat * parseFloat(weight) / 100).toFixed(1)} <span className="text-sm">lbs</span></div>
                  </div>
                </div>
             </div>
           ) : (
             <div className="flex-1 border-2 border-dashed border-slate-200 rounded-[2.5rem] flex flex-col items-center justify-center p-12 bg-rose-50/5 text-center">
                <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mb-6 text-rose-300">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-2 uppercase tracking-tighter">Mass Proportion</h3>
                <p className="text-slate-500 max-w-[340px] font-medium leading-relaxed text-lg">Use a measuring tape to approximate your body composition using the highly-regarded Navy method.</p>
             </div>
           )}
        </div>
      </div>

      <CalculatorSEO
        title="Body Fat Calculator"
        whatIsIt={
          <>
            <p className="text-zinc-400">
              The <strong>Body Fat Calculator</strong> estimates the percentage of your total body mass that is composed of fat versus lean tissue (muscles, bones, organs). Unlike BMI, which only looks at weight and height, body fat percentage reveals the quality of your weight.
            </p>
            <p className="text-zinc-400 mt-4">
               This tool uses the <strong>U.S. Navy Fitness Equation</strong>, which is widely cited for its high correlation with more expensive laboratory methods like DEXA scans, while requiring only a tape measure.
            </p>
          </>
        }
        formula={
          <>
            <p className="text-zinc-400 font-medium mb-4">U.S. Navy Method Equations (using log10):</p>
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl font-mono text-[11px] text-blue-400 overflow-x-auto">
               <strong>Males:</strong> 495 / (1.0324 - 0.19077 * log10(Waist - Neck) + 0.15456 * log10(Height)) - 450 <br/><br/>
               <strong>Females:</strong> 495 / (1.29579 - 0.35004 * log10(Waist + Hips - Neck) + 0.22100 * log10(Height)) - 450
            </div>
            <p className="text-zinc-500 text-[10px] mt-4 uppercase tracking-widest italic font-bold">Note: All measurements are internally converted to centimeters for formula precision.</p>
          </>
        }
        example={
          <>
            <p className="text-zinc-400">For a <strong>Male</strong> measuring <strong>70" height</strong>, <strong>36" waist</strong>, and <strong>16" neck</strong>:</p>
            <div className="mt-4 p-4 border border-zinc-800 rounded-xl bg-zinc-900/40 text-sm">
               The formula would likely yield approx <strong>20.5% Body Fat</strong>, placing him in the "Average" category for fitness.
            </div>
          </>
        }
        useCases={
          <ul className="list-disc pl-6 space-y-4 text-zinc-400 text-sm">
            <li><strong>Tracking Body Recomposition:</strong> Useful for those who are gaining muscle while losing fat, situations where scale weight may not change.</li>
            <li><strong>Fine-tuning Performance:</strong> Athletes use body fat data to optimize their power-to-weight ratio.</li>
            <li><strong>Health Assessment:</strong> Identifying high visceral fat levels which are closely linked to cardiovascular disease and metabolic syndromes.</li>
          </ul>
        }
        faqs={[
          {
            question: "How accurate is the tape measure method?",
            answer: "While not as precise as a DEXA scan, the Navy method is generally accurate within 3-4% for most populations. Using it consistently (same time of day, same tension) makes it an excellent tool for tracking progress over time."
          },
          {
            question: "When should I measure myself?",
            answer: "Ideally in the morning before eating, when you are not bloated and your muscles are not 'pumped' from exercise. Ensure the tape is level and tight against the skin but not compressing the tissue."
          },
          {
            question: "Why do women have higher body fat?",
            answer: "Women require higher 'essential' body fat levels (typically 10-13%) for reproductive health and hormonal regulation, whereas men can safely reach levels as low as 2-5%."
          }
        ]}
        relatedCalculators={[
          { name: "Ideal Weight Calculator", path: "/ideal-weight-calculator", desc: "Check your weight range." },
          { name: "Macro Calculator", path: "/macro-calculator", desc: "Define your diet by your goals." },
          { name: "Calorie Calculator", path: "/calorie-calculator", desc: "Energy intake based on activity." },
            {
              name: "BMI Calculator",
              path: "/bmi-calculator",
              desc: "Calculate your Body Mass Index for a quick health assessment.",
            }]}
      />
    </div>
  );
}
