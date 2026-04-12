"use client";

import { useState, useEffect } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import timeData from "@/data/seo-content/official/time-calculator.json";

export default function TimeCalculator() {
  // Mode: hms-arithmetic or duration-diff
  const [mode, setMode] = useState<"arithmetic" | "decimal">("arithmetic");

  // Arithmetic State
  const [h1, setH1] = useState("4");
  const [m1, setM1] = useState("45");
  const [s1, setS1] = useState("0");
  const [op, setOp] = useState("+");
  const [h2, setH2] = useState("3");
  const [m2, setM2] = useState("30");
  const [s2, setS2] = useState("0");

  const [resH, setResH] = useState(0);
  const [resM, setResM] = useState(0);
  const [resS, setResS] = useState(0);
  const [resDecimal, setResDecimal] = useState("0.00");

  useEffect(() => {
    calculateTime();
  }, [h1, m1, s1, h2, m2, s2, op]);

  const calculateTime = () => {
    const t1 = (parseInt(h1) || 0) * 3600 + (parseInt(m1) || 0) * 60 + (parseInt(s1) || 0);
    const t2 = (parseInt(h2) || 0) * 3600 + (parseInt(m2) || 0) * 60 + (parseInt(s2) || 0);

    let total = op === "+" ? t1 + t2 : t1 - t2;
    if (total < 0) total = 0;

    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;

    setResH(h);
    setResM(m);
    setResS(s);
    setResDecimal((total / 3600).toFixed(2));
  };

  const InputField = ({ label, value, setter, max }: { label: string, value: string, setter: any, max?: number }) => (
    <div className="flex-1 space-y-2">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block italic ml-2">{label}</label>
      <input 
        type="number" 
        value={value}
        onChange={(e) => {
          let val = e.target.value;
          if (max && parseInt(val) > max) val = max.toString();
          setter(val);
        }}
        className="w-full bg-white border-2 border-slate-100 rounded-2xl px-4 py-4 font-black text-2xl text-slate-900 focus:border-indigo-500 outline-none transition-all shadow-sm text-center"
      />
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(79,70,229,0.1)] border border-indigo-50 font-sans">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-indigo-50 pb-8 mb-10 gap-6">
        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-200">🕙</div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase italic">
              Quantum <span className="text-indigo-600 font-black">Time Auditor</span>
            </h1>
          </div>
          <p className="text-slate-400 font-bold mt-1 tracking-tight text-sm uppercase italic">Chronometric Interval Processor</p>
        </div>
        <div className="hidden md:flex flex-col items-end text-right">
          <div className="bg-slate-900 px-4 py-2 rounded-xl border border-slate-700 mb-1 shadow-lg">
            <span className="text-indigo-300 font-black text-[10px] uppercase tracking-[0.3em]">Temporal Protocol 4.2</span>
          </div>
          <span className="text-[10px] text-slate-300 font-bold uppercase tracking-tighter italic">Base-60 Arithmetic Engine</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
        {/* Arithmetic Dashboard */}
        <div className="lg:col-span-8 space-y-8">
           <div className="bg-slate-50 border border-slate-200 rounded-[3rem] p-8 md:p-12 shadow-inner relative overflow-hidden flex flex-col">
              <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none"></div>
              
              <div className="relative z-10 space-y-12">
                 <div className="flex flex-col md:flex-row gap-4 items-end">
                    <div className="flex gap-4 grow">
                       <InputField label="Hrs" value={h1} setter={setH1} />
                       <InputField label="Min" value={m1} setter={setM1} max={59} />
                       <InputField label="Sec" value={s1} setter={setS1} max={59} />
                    </div>
                    <select 
                      value={op} 
                      onChange={(e) => setOp(e.target.value)}
                      className="bg-slate-900 text-white rounded-2xl px-6 py-4 font-black text-2xl appearance-none text-center shadow-lg border border-slate-700 min-w-[80px]"
                    >
                       <option value="+">+</option>
                       <option value="-">-</option>
                    </select>
                    <div className="flex gap-4 grow">
                       <InputField label="Hrs" value={h2} setter={setH2} />
                       <InputField label="Min" value={m2} setter={setM2} max={59} />
                       <InputField label="Sec" value={s2} setter={setS2} max={59} />
                    </div>
                 </div>

                 <div className="bg-indigo-600 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden flex flex-col items-center justify-center text-center border border-indigo-500 group">
                    <div className="absolute top-0 right-0 px-8 py-3 bg-indigo-500/30 text-indigo-100 font-black text-[10px] uppercase tracking-[0.4em] italic rounded-bl-[2rem]">Processing Register</div>
                    
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-200 mb-6 block italic">Total Aggregate Duration</span>
                    <div className="text-7xl md:text-9xl font-black italic tracking-tighter leading-none mb-6 group-hover:scale-105 transition-transform">
                       {resH}<span className="text-2xl md:text-3xl text-indigo-300 ml-2 mr-4 not-italic">H</span>
                       {resM}<span className="text-2xl md:text-3xl text-indigo-300 ml-2 mr-4 not-italic">M</span>
                       {resS}<span className="text-2xl md:text-3xl text-indigo-300 ml-2 not-italic">S</span>
                    </div>
                    
                    <div className="flex gap-3">
                       <div className="px-5 py-2 rounded-xl bg-indigo-900/40 border border-indigo-400/30 text-indigo-100 text-[10px] font-black uppercase tracking-widest italic">
                          Decimal Format: {resDecimal} Hours
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Side Metrics */}
        <div className="lg:col-span-4 space-y-6">
           <div className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-xl shadow-indigo-50 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
              <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-6 border-b border-slate-50 pb-4 italic">Life Conversion</h2>
              
              <div className="space-y-6">
                 <div>
                    <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest block mb-2 italic">Total Minutes</span>
                    <div className="text-3xl font-black italic text-slate-900">{(parseFloat(resDecimal) * 60).toLocaleString()}</div>
                 </div>
                 <div className="pt-4 border-t border-slate-50">
                    <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest block mb-2 italic">Total Seconds</span>
                    <div className="text-3xl font-black italic text-slate-900">{(parseFloat(resDecimal) * 3600).toLocaleString()}</div>
                 </div>
              </div>
           </div>

           <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white flex flex-col gap-4 shadow-xl">
              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 italic">Temporal Context</span>
              <p className="text-xs font-bold leading-relaxed italic text-white/70">Industrial payroll systems typically require 'Decimal Time' for calculation. 15 minutes = 0.25, 30 minutes = 0.50, and 45 minutes = 0.75.</p>
           </div>
        </div>
      </div>

      <CalculatorSEO
        title={timeData.title}
        whatIsIt={timeData.whatIsIt}
        formula={timeData.formula}
        example={timeData.example}
        useCases={timeData.useCases}
        faqs={timeData.faqs}
        deepDive={timeData.deepDive}
        glossary={timeData.glossary}
        relatedCalculators={[
          {
            name: "Age Calculator",
            path: "/age-calculator/",
            desc: "Convert birth dates into precise years, months, and days of chronological life.",
          },
          {
            name: "Work Hours",
            path: "/work-hours-calculator/",
            desc: "Track daily shifts and calculate gross pay using temporal duration arithmetic.",
          },
          {
            name: "Word Counter",
            path: "/word-counter/",
            desc: "Estimate reading and speaking times based on textual dataset volume.",
          },
          {
            name: "Scientific",
            path: "/scientific-calculator/",
            desc: "Analyze temporal frequencies and periodic wave functions in science.",
          }
        ]}
      />
    </div>
  );
}
