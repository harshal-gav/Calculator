"use client";

import { useState, useEffect } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import ageData from "@/data/seo-content/official/age-calculator.json";

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState("1990-05-15");
  const [targetDate, setTargetDate] = useState(new Date().toISOString().split('T')[0]);

  const [result, setResult] = useState<{
    years: number;
    months: number;
    days: number;
    totalDays: number;
    nextBirthday: number; // days until
  } | null>(null);

  useEffect(() => {
    calculateAge();
  }, [birthDate, targetDate]);

  const calculateAge = () => {
    const birth = new Date(birthDate);
    const target = new Date(targetDate);

    if (isNaN(birth.getTime()) || isNaN(target.getTime()) || birth > target) {
      setResult(null);
      return;
    }

    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const totalDays = Math.floor((target.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));

    // Next birthday calculation (relative to current date, not target necessarily, but we'll use target for consistency)
    const nextBday = new Date(target.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBday < target) {
      nextBday.setFullYear(target.getFullYear() + 1);
    }
    const daysUntil = Math.ceil((nextBday.getTime() - target.getTime()) / (1000 * 60 * 60 * 24));

    setResult({
      years,
      months,
      days,
      totalDays,
      nextBirthday: daysUntil
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(79,70,229,0.1)] border border-indigo-50 font-sans">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-indigo-50 pb-8 mb-10 gap-6">
        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-200">⏳</div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase italic">
              Temporal <span className="text-indigo-600 font-black">Age Decoder</span>
            </h1>
          </div>
          <p className="text-slate-400 font-bold mt-1 tracking-tight text-sm uppercase italic">Chronological Life Analyzer</p>
        </div>
        <div className="hidden md:flex flex-col items-end text-right">
          <div className="bg-indigo-900 px-4 py-2 rounded-xl border border-indigo-700 mb-1 shadow-lg">
            <span className="text-indigo-300 font-black text-[10px] uppercase tracking-[0.3em]">Gregorian Protocol 1.0</span>
          </div>
          <span className="text-[10px] text-slate-300 font-bold uppercase tracking-tighter italic">Precision Date Differencing</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
        {/* Date Inputs */}
        <div className="lg:col-span-12 xl:col-span-4 space-y-6">
          <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-200 space-y-8 shadow-inner relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full -mr-16 -mt-16 blur-2xl transition-all group-hover:bg-indigo-500/10"></div>
             
             <div className="space-y-6">
                <div>
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-3 italic">Initial Birth Date</label>
                   <input 
                     type="date" 
                     value={birthDate}
                     onChange={(e) => setBirthDate(e.target.value)}
                     className="w-full bg-white border-2 border-slate-100 rounded-2xl px-6 py-4 font-black text-xl text-slate-900 focus:border-indigo-500 outline-none transition-all shadow-sm"
                   />
                </div>
                <div>
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-3 italic">Analysis Target Date</label>
                   <input 
                     type="date" 
                     value={targetDate}
                     onChange={(e) => setTargetDate(e.target.value)}
                     className="w-full bg-white border-2 border-slate-100 rounded-2xl px-6 py-4 font-black text-xl text-indigo-600 focus:border-indigo-500 outline-none transition-all shadow-sm"
                   />
                </div>
             </div>

             <div className="p-6 bg-slate-900 rounded-3xl mt-4 border border-slate-800">
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 italic block mb-2 leading-none">Status</span>
                <p className="text-[11px] font-bold italic text-white/60 leading-relaxed uppercase tracking-tight">System calibrated for Gregorian precision. Leap year compensation active.</p>
             </div>
          </div>
        </div>

        {/* Results Canvas */}
        <div className="lg:col-span-12 xl:col-span-8 flex flex-col gap-6">
           {result ? (
             <div className="h-full flex flex-col gap-6">
                <div className="bg-indigo-600 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden flex flex-col justify-center border border-indigo-500">
                   <div className="absolute top-0 right-0 h-full w-1/3 bg-indigo-500/20 skew-x-12 translate-x-1/2 pointer-events-none"></div>
                   
                   <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">
                      <div className="text-center md:text-left">
                         <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-200 italic block mb-4">Chronological Maturity</span>
                         <div className="text-8xl md:text-9xl font-black italic tracking-tighter leading-none flex items-baseline">
                            {result.years}
                            <span className="text-2xl md:text-3xl font-black uppercase text-indigo-200 ml-4 tracking-normal not-italic">Years Old</span>
                         </div>
                      </div>
                      <div className="flex flex-col gap-4 text-center md:text-left min-w-[150px]">
                         <div className="px-5 py-3 rounded-2xl bg-indigo-900/40 border border-white/10 backdrop-blur-sm">
                            <span className="text-[8px] font-black uppercase tracking-widest text-indigo-300 block mb-1">Months</span>
                            <span className="text-2xl font-black italic">{result.months}</span>
                         </div>
                         <div className="px-5 py-3 rounded-2xl bg-indigo-900/40 border border-white/10 backdrop-blur-sm">
                            <span className="text-[8px] font-black uppercase tracking-widest text-indigo-300 block mb-1">Days</span>
                            <span className="text-2xl font-black italic">{result.days}</span>
                         </div>
                      </div>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden border border-slate-800">
                      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400 italic block mb-6">Aggregate Life Duration</span>
                      <div className="space-y-6">
                         <div className="flex justify-between items-baseline border-b border-white/5 pb-4">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Total Days</span>
                            <span className="text-2xl font-black italic">{result.totalDays.toLocaleString()}</span>
                         </div>
                         <div className="flex justify-between items-baseline border-b border-white/5 pb-4">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Total Weeks</span>
                            <span className="text-2xl font-black italic">{Math.floor(result.totalDays / 7).toLocaleString()}</span>
                         </div>
                         <div className="flex justify-between items-baseline">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Next Birthday</span>
                            <span className="text-2xl font-black italic text-emerald-400">in {result.nextBirthday} days</span>
                         </div>
                      </div>
                   </div>

                   <div className="bg-white border-2 border-slate-100 rounded-[2.5rem] p-10 shadow-sm flex flex-col justify-center text-center relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-1.5 bg-indigo-600"></div>
                      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 italic block mb-4">Longevity Projection</span>
                      <div className="flex flex-col items-center">
                         <div className="w-24 h-24 rounded-full border-4 border-slate-50 mb-4 flex items-center justify-center relative bg-indigo-50">
                            <svg className="w-full h-full -rotate-90">
                               <circle cx="48" cy="48" r="44" fill="transparent" stroke="#f1f5f9" strokeWidth="8" />
                               <circle 
                                 cx="48" cy="48" r="44" fill="transparent" stroke="#4f46e5" strokeWidth="8" 
                                 strokeDasharray={276} 
                                 strokeDashoffset={276 - (276 * Math.min(100, result.years) / 100)} 
                                 className="transition-all duration-1000"
                               />
                            </svg>
                            <span className="absolute text-xl font-black text-indigo-600">{result.years}%</span>
                         </div>
                         <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 italic max-w-xs">Century Completion Milestone. Tracking progress toward orbital centennial.</p>
                      </div>
                   </div>
                </div>
             </div>
           ) : (
             <div className="h-full bg-slate-50 border-4 border-dashed border-slate-200 rounded-[3rem] flex flex-col items-center justify-center p-12 text-center shadow-inner">
                <div className="w-20 h-20 bg-white rounded-3xl shadow-lg flex items-center justify-center mb-8 animate-pulse">
                   <span className="text-4xl text-slate-200">🗓️</span>
                </div>
                <h3 className="text-slate-900 text-3xl font-black mb-4 uppercase tracking-tighter italic">Pending Date Matrix</h3>
                <p className="text-slate-400 max-w-sm font-bold leading-tight text-lg italic uppercase tracking-tighter opacity-70">Define your birth date to initialize the chronological decoding sequence.</p>
             </div>
           )}
        </div>
      </div>

      <CalculatorSEO
        title={ageData.title}
        whatIsIt={ageData.whatIsIt}
        formula={ageData.formula}
        example={ageData.example}
        useCases={ageData.useCases}
        faqs={ageData.faqs}
        deepDive={ageData.deepDive}
        glossary={ageData.glossary}
        relatedCalculators={[
          {
            name: "Time",
            path: "/time-calculator/",
            desc: "Analyze duration and intervals between any two temporal timestamps.",
          },
          {
            name: "Binary",
            path: "/binary-calculator/",
            desc: "Convert personal metadata into low-level digital bit patterns.",
          },
          {
            name: "GPA Calculator",
            path: "/gpa-calculator/",
            desc: "Track academic achievement cycles across semesters and academic years.",
          },
          {
            name: "Scientific",
            path: "/scientific-calculator/",
            desc: "Perform complex growth curve and statistical longevity modeling.",
          }
        ]}
      />
    </div>
  );
}
