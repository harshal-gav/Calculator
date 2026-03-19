"use client";

import { useState, useEffect } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function IdealWeightCalculator() {
  const [height, setHeight] = useState("175"); // cm
  const [gender, setGender] = useState("male");
  const [unit, setUnit] = useState("metric");

  const [results, setResults] = useState<{
    robinson: number;
    miller: number;
    devine: number;
    hamwi: number;
    bmiRange: { min: number; max: number };
  } | null>(null);

  useEffect(() => {
    calculateIdealWeight();
  }, [height, gender, unit]);

  const calculateIdealWeight = () => {
    let hMetric = parseFloat(height);
    if (unit === "imperial") {
      hMetric = hMetric * 2.54;
    }

    if (hMetric > 0) {
      const hInches = hMetric / 2.54;
      const over5Feet = Math.max(0, hInches - 60);

      let robinson, miller, devine, hamwi;

      if (gender === "male") {
        robinson = 52 + (1.9 * over5Feet);
        miller = 56.2 + (1.41 * over5Feet);
        devine = 50 + (2.3 * over5Feet);
        hamwi = 48 + (2.7 * over5Feet);
      } else {
        robinson = 49 + (1.7 * over5Feet);
        miller = 53.1 + (1.36 * over5Feet);
        devine = 45.5 + (2.3 * over5Feet);
        hamwi = 45.5 + (2.2 * over5Feet);
      }

      // BMI Range (18.5 - 25)
      const bmiMin = 18.5 * Math.pow(hMetric / 100, 2);
      const bmiMax = 25 * Math.pow(hMetric / 100, 2);

      setResults({
        robinson,
        miller,
        devine,
        hamwi,
        bmiRange: { min: bmiMin, max: bmiMax }
      });
    } else {
      setResults(null);
    }
  };

  const formatWeight = (kg: number) => {
    if (unit === "imperial") {
      return `${(kg * 2.20462).toFixed(1)} lbs`;
    }
    return `${kg.toFixed(1)} kg`;
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-white rounded-3xl shadow-xl border border-rose-50">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-rose-50 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight text-nowrap">Ideal Weight Calculator</h1>
          <p className="text-slate-500 font-medium mt-1 text-lg">Determine your target weight using scientific formulas.</p>
        </div>
        <div className="bg-rose-50 px-4 py-2 rounded-full border border-rose-100 shrink-0">
          <span className="text-rose-600 font-bold text-sm uppercase tracking-wider">Target Weight</span>
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

            <div>
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2 mb-1 block">Height ({unit === 'metric' ? 'cm' : 'inches'})</label>
               <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full bg-white rounded-xl border-2 border-slate-100 focus:border-rose-300 focus:ring-0 p-4 font-black text-xl text-slate-800 shadow-sm" />
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
           {results ? (
             <>
               <div className="bg-gradient-to-br from-slate-900 to-rose-950 rounded-[2.5rem] p-10 text-white shadow-2xl flex flex-col justify-center relative overflow-hidden group border border-slate-800">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-rose-500/20 transition-all duration-700"></div>
                  <div className="text-slate-500 text-xs font-bold uppercase tracking-[0.3em] mb-4 font-mono">Clinically Perfect Range</div>
                  <div className="text-4xl md:text-5xl font-black mb-4 flex items-center gap-4">
                     <span className="text-white">{formatWeight(results.bmiRange.min)}</span>
                     <span className="text-slate-600 font-light text-2xl">—</span>
                     <span className="text-emerald-400">{formatWeight(results.bmiRange.max)}</span>
                  </div>
                  <p className="text-slate-400 text-sm font-medium border-l-2 border-rose-500 pl-4 py-1">
                    Based on standard BMI 18.5 – 25.0
                  </p>
               </div>

               <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Robinson", value: results.robinson, desc: "Modern Correction" },
                    { label: "Miller", value: results.miller, desc: "Clinical Std" },
                    { label: "Devine", value: results.devine, desc: "Dosage Default" },
                    { label: "Hamwi", value: results.hamwi, desc: "Simplicity Std" }
                  ].map((formula, i) => (
                    <div key={i} className="bg-slate-50 border border-slate-100 p-5 rounded-2xl hover:bg-rose-50 transition-colors group">
                       <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 group-hover:text-rose-500 transition-colors">{formula.label}</div>
                       <div className="text-2xl font-black text-slate-800">{formatWeight(formula.value)}</div>
                       <div className="text-[9px] font-bold text-slate-400 mt-1">{formula.desc}</div>
                    </div>
                  ))}
               </div>
             </>
           ) : (
             <div className="flex-1 border-2 border-dashed border-slate-200 rounded-[2.5rem] flex flex-col items-center justify-center p-12 bg-rose-50/5 text-center">
                <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mb-6 text-rose-300">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-2 uppercase tracking-tighter">Healthy Floor</h3>
                <p className="text-slate-500 max-w-[340px] font-medium leading-relaxed text-lg">Input your height to see what medical literature considers your ideal weight range.</p>
             </div>
           )}
        </div>
      </div>

      <CalculatorSEO
        title="Ideal Weight Calculator"
        whatIsIt={
          <>
            <p>
              The <strong>Ideal Weight Calculator</strong> provides estimations for a healthy body weight based on height, gender, and age through several respected medical formulas.
            </p>
            <p>
              It is important to remember that 'Ideal Weight' is not a fixed number for everyone. Factors such as muscle mass, bone density, and body fat distribution play a significant role. These formulas serve as a clinical baseline to help you understand where your weight sits relative to population averages.
            </p>
          </>
        }
        formula={
          <>
            <p>This calculator utilizes the most widely used formulas in medical literature:</p>
            <ul className="list-disc pl-6 space-y-4 mt-4 text-zinc-700">
               <li><strong>Devine Formula (1974):</strong> The standard used for most medication dosage calculations.</li>
               <li><strong>Robinson Formula (1983):</strong> A refinement of the Devine formula designed for better accuracy.</li>
               <li><strong>Miller Formula (1983):</strong> Another popular variant frequently used in clinical settings.</li>
               <li><strong>Hamwi Formula (1964):</strong> One of the oldest and simplest methods for estimation.</li>
            </ul>
          </>
        }
        example={
          <>
             <p>A <strong>6'0" (183 cm) male</strong> would see the following results:</p>
             <ul className="list-disc pl-6 mt-2 space-y-1 text-zinc-700 font-mono text-sm">
                <li>Devine: 171 lbs (77.6 kg)</li>
                <li>Miller: 155 lbs (70.3 kg)</li>
                <li>BMI Normal: 136 - 184 lbs</li>
             </ul>
          </>
        }
        useCases={
          <ul className="list-disc pl-6 space-y-4 text-zinc-700">
             <li><strong>Initial Goal Setting:</strong> Use these numbers to set realistic long-term targets for weight loss or gain.</li>
             <li><strong>Medication Dosing:</strong> Doctors often use Ideal Body Weight (IBW) rather than actual weight for certain drugs.</li>
             <li><strong>Athletic Benchmarking:</strong> See how your current weight compares to the 'clinical ideal' for your stature.</li>
          </ul>
        }
        faqs={[
          {
            question: "Why are there different formulas?",
            answer: "Different researchers developed these formulas using different data sets. Robinson and Miller formulas are generally considered more modern and accurate corrections to the original Devine formula."
          },
          {
            question: "Is BMI the same as Ideal Weight?",
            answer: "No. BMI is a ratio of weight to height. Ideal weight is a targeted number (or range) where your health risks associated with body weight are statistically lowest."
          },
          {
            question: "What if I use the 'Metric' setting?",
            answer: "The calculations remain scientifically identical; the system simply handles the conversion from centimeters to inches internally before applying the formulas."
          }
        ]}
        relatedCalculators={[
          { name: "BMI Calculator", path: "/bmi-calculator/", desc: "Check your Body Mass Index." },
          { name: "Body Fat Calculator", path: "/body-fat-calculator/", desc: "Measure composition, not just weight." },
          { name: "Calorie Calculator", path: "/calorie-calculator/", desc: "Plan your path to your ideal weight." },
            {
              name: "BMR Calculator",
              path: "/bmr-calculator/",
              desc: "Find your Basal Metabolic Rate to understand your calorie needs at rest.",
            }]}
      />
    </div>
  );
}
