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
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-950 rounded-[3rem] shadow-2xl border border-zinc-800 text-zinc-100">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
          Body Fat Calculator
        </h1>
        <p className="text-zinc-500 text-lg uppercase tracking-widest font-bold text-xs">U.S. Navy Method</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
        {/* Interaction Panel */}
        <div className="space-y-8">
           <div className="flex gap-4">
              <button 
                onClick={() => setGender("male")}
                className={`flex-1 py-4 rounded-2xl font-black transition-all border-2 ${gender === 'male' ? 'border-blue-500 bg-blue-500/10 text-blue-400' : 'border-zinc-800 text-zinc-600 hover:border-zinc-700'}`}
              >
                MALE
              </button>
              <button 
                onClick={() => setGender("female")}
                className={`flex-1 py-4 rounded-2xl font-black transition-all border-2 ${gender === 'female' ? 'border-pink-500 bg-pink-500/10 text-pink-400' : 'border-zinc-800 text-zinc-600 hover:border-zinc-700'}`}
              >
                FEMALE
              </button>
           </div>

           <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-zinc-600 tracking-[0.2em] block pl-1">HEIGHT ({unit === 'imperial' ? 'IN' : 'CM'})</label>
                 <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full bg-zinc-900 rounded-2xl border-zinc-800 p-4 font-bold text-xl text-zinc-100 focus:border-blue-500 ring-0 transition-all placeholder-zinc-700"
                 />
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-zinc-600 tracking-[0.2em] block pl-1">WAIST</label>
                 <input
                  type="number"
                  value={waist}
                  onChange={(e) => setWaist(e.target.value)}
                  className="w-full bg-zinc-900 rounded-2xl border-zinc-800 p-4 font-bold text-xl text-zinc-100 focus:border-blue-500 ring-0 transition-all"
                 />
              </div>
           </div>

           <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-zinc-600 tracking-[0.2em] block pl-1">NECK</label>
                 <input
                  type="number"
                  value={neck}
                  onChange={(e) => setNeck(e.target.value)}
                  className="w-full bg-zinc-900 rounded-2xl border-zinc-800 p-4 font-bold text-xl text-zinc-100 focus:border-blue-500 ring-0 transition-all"
                 />
              </div>
              {gender === 'female' && (
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-zinc-600 tracking-[0.2em] block pl-1">HIPS</label>
                   <input
                    type="number"
                    value={hip}
                    onChange={(e) => setHip(e.target.value)}
                    className="w-full bg-zinc-900 rounded-2xl border-zinc-800 p-4 font-bold text-xl text-zinc-100 focus:border-pink-500 ring-0 transition-all"
                   />
                </div>
              )}
           </div>

           <button 
              onClick={() => setUnit(unit === 'imperial' ? 'metric' : 'imperial')}
              className="w-full py-4 border border-zinc-800 rounded-2xl text-[10px] font-black tracking-widest text-zinc-400 hover:bg-zinc-900 transition-colors"
           >
              SWITCH TO {unit === 'imperial' ? 'METRIC' : 'IMPERIAL'}
           </button>
        </div>

        {/* Display Panel */}
        <div className="flex flex-col relative">
           <div className="absolute inset-0 bg-blue-500/5 blur-[100px] pointer-events-none rounded-full"></div>
           {bodyFat && bodyFat > 0 ? (
             <div className="flex-1 bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-[2.5rem] p-10 flex flex-col items-center justify-center text-center">
                <div className="text-zinc-500 text-xs font-black tracking-[0.3em] mb-6">ESTIMATED BODY FAT</div>
                <div className="text-8xl font-black mb-4 tracking-tighter text-white">
                   {bodyFat.toFixed(1)}<span className="text-4xl text-blue-500">%</span>
                </div>
                <div className={`px-6 py-2 rounded-full text-[10px] font-black tracking-widest uppercase mb-8 ${category === 'Obese' ? 'bg-red-500/20 text-red-500' : 'bg-green-500/20 text-green-500'}`}>
                   {category}
                </div>
                
                <div className="w-full max-w-xs space-y-4">
                  <div className="flex justify-between items-end border-b border-zinc-800 pb-2">
                     <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Lean Mass</span>
                     <span className="text-xl font-bold">{((100 - bodyFat) * parseFloat(weight) / 100).toFixed(1)} lbs</span>
                  </div>
                  <div className="flex justify-between items-end border-b border-zinc-800 pb-2">
                     <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Fat Mass</span>
                     <span className="text-xl font-bold">{(bodyFat * parseFloat(weight) / 100).toFixed(1)} lbs</span>
                  </div>
                </div>
             </div>
           ) : (
             <div className="flex-1 border-2 border-dashed border-zinc-800 rounded-[2.5rem] flex items-center justify-center p-12 text-zinc-700 font-black tracking-widest text-center uppercase text-sm leading-loose">
                Specify measurements to<br/>reveal body composition
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
          { name: "Calorie Calculator", path: "/calorie-calculator", desc: "Energy intake based on activity." }
        ]}
      />
    </div>
  );
}
