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
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-[2.5rem] shadow-2xl border border-purple-50">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-black mb-4 text-zinc-900 tracking-tight">
          Ideal Weight Calculator
        </h1>
        <p className="text-zinc-500 text-lg">
          Determine your healthy weight range using four scientific formulas and clinical BMI standards.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Input UI */}
        <div className="md:col-span-1 bg-white p-6 rounded-3xl shadow-sm border border-zinc-100 flex flex-col gap-6">
           <div>
              <label className="block text-[10px] font-black text-purple-400 uppercase tracking-widest mb-2 border-b border-purple-100 pb-1">Gender</label>
              <div className="flex gap-2">
                 <button 
                  onClick={() => setGender("male")}
                  className={`flex-1 py-3 rounded-xl font-bold transition-all text-sm ${gender === 'male' ? 'bg-zinc-900 text-white shadow-lg' : 'bg-zinc-50 text-zinc-400 hover:bg-zinc-100'}`}
                 >
                  Male
                 </button>
                 <button 
                  onClick={() => setGender("female")}
                  className={`flex-1 py-3 rounded-xl font-bold transition-all text-sm ${gender === 'female' ? 'bg-zinc-900 text-white shadow-lg' : 'bg-zinc-50 text-zinc-400 hover:bg-zinc-100'}`}
                 >
                  Female
                 </button>
              </div>
           </div>

           <div>
              <label className="block text-[10px] font-black text-purple-400 uppercase tracking-widest mb-2 border-b border-purple-100 pb-1">Unit System</label>
              <div className="flex gap-2">
                 <button 
                  onClick={() => setUnit("metric")}
                  className={`flex-1 py-2 rounded-lg font-bold transition-all text-xs ${unit === 'metric' ? 'bg-purple-600 text-white' : 'bg-purple-50 text-purple-400'}`}
                 >
                  Metric
                 </button>
                 <button 
                  onClick={() => setUnit("imperial")}
                  className={`flex-1 py-2 rounded-lg font-bold transition-all text-xs ${unit === 'imperial' ? 'bg-purple-600 text-white' : 'bg-purple-50 text-purple-400'}`}
                 >
                  US
                 </button>
              </div>
           </div>

           <div>
              <label className="block text-[10px] font-black text-purple-400 uppercase tracking-widest mb-1">Height ({unit === 'metric' ? 'cm' : 'inches'})</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full bg-zinc-50 rounded-2xl border-transparent focus:border-purple-300 focus:ring-0 p-4 font-black text-xl text-zinc-900 shadow-inner"
              />
           </div>
        </div>

        {/* Results UI */}
        <div className="md:col-span-2 space-y-6">
           {results ? (
             <>
               <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-[2rem] p-8 text-white shadow-xl relative overflow-hidden group">
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
                  <h2 className="text-purple-100 text-xs font-black uppercase tracking-[0.3em] mb-4">BMI Healthy Range</h2>
                  <div className="text-4xl font-black mb-2 flex items-center gap-3">
                     {formatWeight(results.bmiRange.min)}
                     <span className="text-purple-300/50 text-xl font-light">to</span>
                     {formatWeight(results.bmiRange.max)}
                  </div>
                  <p className="text-purple-100/70 text-xs font-medium max-w-sm">Based on the World Health Organization standard of 18.5–25.0 BMI.</p>
               </div>

               <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Robinson Formula", value: results.robinson, color: "bg-blue-50 text-blue-700" },
                    { label: "Miller Formula", value: results.miller, color: "bg-emerald-50 text-emerald-700" },
                    { label: "Devine Formula", value: results.devine, color: "bg-orange-50 text-orange-700" },
                    { label: "Hamwi Formula", value: results.hamwi, color: "bg-rose-50 text-rose-700" }
                  ].map((formula, i) => (
                    <div key={i} className={`p-6 rounded-3xl ${formula.color} border border-white shadow-sm hover:scale-[1.02] transition-transform`}>
                       <div className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">{formula.label}</div>
                       <div className="text-2xl font-black">{formatWeight(formula.value)}</div>
                    </div>
                  ))}
               </div>
             </>
           ) : (
             <div className="h-full border-4 border-dashed border-zinc-100 rounded-[2rem] flex items-center justify-center p-8 bg-white/50 text-zinc-300 italic font-bold text-center">
                Calculating your optimal range...
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
          { name: "BMI Calculator", path: "/bmi-calculator", desc: "Check your Body Mass Index." },
          { name: "Body Fat Calculator", path: "/body-fat-calculator", desc: "Measure composition, not just weight." },
          { name: "Calorie Calculator", path: "/calorie-calculator", desc: "Plan your path to your ideal weight." }
        ]}
      />
    </div>
  );
}
