"use client";

import { useState, useEffect } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import gradeData from "@/data/seo-content/official/grade-calculator.json";

interface Category {
  id: number;
  name: string;
  weight: string;
  score: string;
}

export default function GradeCalculator() {
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: "Homework", weight: "20", score: "90" },
    { id: 2, name: "Quizzes", weight: "30", score: "85" },
    { id: 3, name: "Midterm", weight: "25", score: "78" }
  ]);

  const [finalWeight, setFinalWeight] = useState("25");
  const [targetGrade, setTargetGrade] = useState("90");

  const [currentGrade, setCurrentGrade] = useState<number | null>(null);
  const [requiredOnFinal, setRequiredOnFinal] = useState<number | null>(null);

  useEffect(() => {
    calculateGrades();
  }, [categories, finalWeight, targetGrade]);

  const calculateGrades = () => {
    let weightedScoreSum = 0;
    let weightSum = 0;

    categories.forEach(cat => {
      const w = parseFloat(cat.weight) || 0;
      const s = parseFloat(cat.score) || 0;
      weightedScoreSum += (s * w);
      weightSum += w;
    });

    const current = weightSum > 0 ? weightedScoreSum / weightSum : 0;
    setCurrentGrade(current);

    // Final calculation
    const fw = parseFloat(finalWeight) || 0;
    const tg = parseFloat(targetGrade) || 0;
    
    if (fw > 0) {
      // Required = (Target - (Current * (1 - FW_pct))) / FW_pct
      const fwPct = fw / 100;
      const req = (tg - (current * (1 - fwPct))) / fwPct;
      setRequiredOnFinal(req);
    } else {
      setRequiredOnFinal(null);
    }
  };

  const addCategory = () => {
    setCategories([...categories, { id: Date.now(), name: "Assignments", weight: "10", score: "100" }]);
  };

  const removeCategory = (id: number) => {
    if (categories.length > 1) {
      setCategories(categories.filter(c => c.id !== id));
    }
  };

  const updateCategory = (id: number, field: keyof Category, value: string) => {
    setCategories(categories.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(79,70,229,0.1)] border border-indigo-50 font-sans">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-indigo-50 pb-8 mb-10 gap-6">
        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-200">A+</div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase italic">
              Grade <span className="text-indigo-600 font-black">Projection Matrix</span>
            </h1>
          </div>
          <p className="text-slate-400 font-bold mt-1 tracking-tight text-sm uppercase italic">Final Exam Strategy Engine</p>
        </div>
        <div className="hidden md:flex flex-col items-end text-right">
          <div className="bg-indigo-900 px-4 py-2 rounded-xl border border-indigo-700 mb-1 shadow-lg">
            <span className="text-indigo-300 font-black text-[10px] uppercase tracking-[0.3em]">Academic Protocol 6.1</span>
          </div>
          <span className="text-[10px] text-slate-300 font-bold uppercase tracking-tighter italic">Weighted Distribution Audit</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
        {/* Category Inputs */}
        <div className="lg:col-span-12 xl:col-span-8 space-y-4">
          <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-200 shadow-inner">
             <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 italic">Workload Distribution</span>
                <button onClick={addCategory} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-indigo-100">+ Add Category</button>
             </div>
             
             <div className="space-y-3">
                {categories.map((cat) => (
                  <div key={cat.id} className="grid grid-cols-12 gap-3 items-center bg-white p-3 md:p-4 rounded-2xl border border-slate-100 shadow-sm group transition-all hover:border-indigo-200">
                     <div className="col-span-12 md:col-span-5">
                        <input 
                          type="text" 
                          value={cat.name} 
                          onChange={(e) => updateCategory(cat.id, "name", e.target.value)}
                          className="w-full bg-slate-50 border-0 rounded-xl px-4 py-2 text-sm font-bold text-slate-600 focus:ring-2 focus:ring-indigo-100"
                          placeholder="Category (e.g., Homework)"
                        />
                     </div>
                     <div className="col-span-5 md:col-span-3">
                        <div className="relative">
                           <input 
                             type="number" 
                             value={cat.weight} 
                             onChange={(e) => updateCategory(cat.id, "weight", e.target.value)}
                             className="w-full bg-white border border-slate-100 rounded-xl px-4 py-2 text-sm font-black text-slate-900 text-center focus:ring-2 focus:ring-indigo-100"
                             placeholder="Weight"
                           />
                           <span className="absolute right-3 top-2.5 text-[10px] text-slate-400 font-bold">%</span>
                        </div>
                     </div>
                     <div className="col-span-5 md:col-span-3">
                        <div className="relative">
                           <input 
                             type="number" 
                             value={cat.score} 
                             onChange={(e) => updateCategory(cat.id, "score", e.target.value)}
                             className="w-full bg-white border border-slate-100 rounded-xl px-4 py-2 text-sm font-black text-slate-900 text-center focus:ring-2 focus:ring-indigo-100"
                             placeholder="Score"
                           />
                           <span className="absolute right-3 top-2.5 text-[10px] text-slate-400 font-bold">%</span>
                        </div>
                     </div>
                     <div className="col-span-2 md:col-span-1 flex justify-center">
                        <button onClick={() => removeCategory(cat.id)} className="text-slate-300 hover:text-rose-500 transition-colors text-xl">×</button>
                     </div>
                  </div>
                ))}
             </div>

             <div className="mt-8 pt-8 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                   <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 italic block">Final Exam Weight</label>
                   <div className="relative">
                      <input 
                        type="number" 
                        value={finalWeight} 
                        onChange={(e) => setFinalWeight(e.target.value)}
                        className="w-full bg-indigo-50/50 border-2 border-indigo-100 rounded-2xl px-6 py-4 font-black text-3xl text-indigo-900 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 outline-none"
                      />
                      <span className="absolute right-6 top-5 text-xl text-indigo-300 font-black">%</span>
                   </div>
                </div>
                <div className="space-y-4">
                   <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 italic block">Target Course Grade</label>
                   <div className="relative">
                      <input 
                        type="number" 
                        value={targetGrade} 
                        onChange={(e) => setTargetGrade(e.target.value)}
                        className="w-full bg-emerald-50/50 border-2 border-emerald-100 rounded-2xl px-6 py-4 font-black text-3xl text-emerald-900 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 outline-none"
                      />
                      <span className="absolute right-6 top-5 text-xl text-emerald-300 font-black">%</span>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Results Canvas */}
        <div className="lg:col-span-12 xl:col-span-4 flex flex-col gap-6">
           <div className="grow bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden flex flex-col justify-center border border-slate-800">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
              
              <div className="relative z-10 space-y-8">
                 <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400 italic block mb-2">Current Standing</span>
                    <div className="text-6xl font-black italic tracking-tighter text-white">
                       {currentGrade !== null ? currentGrade.toFixed(1) : "0.0"}%
                    </div>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500 mt-2">Weighted average of completed work</p>
                 </div>

                 <div className="pt-8 border-t border-slate-800">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400 italic block mb-2">Required on Final</span>
                    <div className={`text-7xl font-black italic tracking-tighter leading-none ${requiredOnFinal && requiredOnFinal > 100 ? "text-rose-500" : "text-emerald-400"}`}>
                       {requiredOnFinal !== null ? Math.max(0, requiredOnFinal).toFixed(1) : "0.0"}%
                    </div>
                    <div className="mt-4 flex gap-2">
                       <div className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest ${requiredOnFinal && requiredOnFinal > 100 ? "bg-rose-500/10 text-rose-500" : "bg-emerald-500/10 text-emerald-500"}`}>
                          {requiredOnFinal && requiredOnFinal > 100 ? "High Difficulty" : "Attainable Target"}
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           <div className="p-8 bg-white border-2 border-slate-100 rounded-[2.5rem] shadow-sm flex flex-col justify-center italic-headings">
              <div className="text-slate-400 text-[10px] font-black uppercase mb-4 tracking-[0.3em] leading-none italic">Academic Strategy</div>
              <div className="space-y-4">
                 <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-1000 ${requiredOnFinal && requiredOnFinal > 100 ? "bg-rose-500" : "bg-indigo-600"}`} 
                      style={{ width: `${Math.min(100, Math.max(0, requiredOnFinal || 0))}%` }}
                    ></div>
                 </div>
                 <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-tight italic">Final represents {finalWeight}% of total course gravity. Current gap is {(parseFloat(targetGrade) - (currentGrade || 0)).toFixed(1)} points.</p>
              </div>
           </div>
        </div>
      </div>

      <CalculatorSEO
        title={gradeData.title}
        whatIsIt={gradeData.whatIsIt}
        formula={gradeData.formula}
        example={gradeData.example}
        useCases={gradeData.useCases}
        faqs={gradeData.faqs}
        deepDive={gradeData.deepDive}
        glossary={gradeData.glossary}
        relatedCalculators={[
          {
            name: "GPA Calculator",
            path: "/gpa-calculator/",
            desc: "Convert your final grades and credits into a standardized GPA performance metric.",
          },
          {
            name: "Percentage",
            path: "/percentage-calculator/",
            desc: "Perform quick proportional analysis on scores and category distributions.",
          },
          {
            name: "Scientific",
            path: "/scientific-calculator/",
            desc: "Advanced mathematical modeling for engineering and science course weighting.",
          },
          {
            name: "Work Hours",
            path: "/work-hours-calculator/",
            desc: "Track study duration relative to academic performance targets.",
          }
        ]}
      />
    </div>
  );
}
