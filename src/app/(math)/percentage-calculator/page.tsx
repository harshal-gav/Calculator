"use client";

import { useState, useEffect } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import percentData from "@/data/seo-content/official/percentage-calculator.json";

export default function PercentageCalculator() {
  const [activeTab, setActiveTab] = useState<number>(0);

  // Mode 0: X is what % of Y?
  const [m0x, setM0x] = useState("40");
  const [m0y, setM0y] = useState("200");
  const [m0Res, setM0Res] = useState<number | null>(null);

  // Mode 1: What is X% of Y?
  const [m1x, setM1x] = useState("15");
  const [m1y, setM1y] = useState("150");
  const [m1Res, setM1Res] = useState<number | null>(null);

  // Mode 2: % Change from X to Y?
  const [m2x, setM2x] = useState("50");
  const [m2y, setM2y] = useState("80");
  const [m2Res, setM2Res] = useState<number | null>(null);

  useEffect(() => {
    // Mode 0
    const val0x = parseFloat(m0x) || 0;
    const val0y = parseFloat(m0y) || 0;
    setM0Res(val0y !== 0 ? (val0x / val0y) * 100 : null);

    // Mode 1
    const val1x = parseFloat(m1x) || 0;
    const val1y = parseFloat(m1y) || 0;
    setM1Res((val1x / 100) * val1y);

    // Mode 2
    const val2x = parseFloat(m2x) || 0;
    const val2y = parseFloat(m2y) || 0;
    setM2Res(val2x !== 0 ? ((val2y - val2x) / val2x) * 100 : null);
  }, [m0x, m0y, m1x, m1y, m2x, m2y]);

  const tabs = [
    { label: "Proportion", desc: "X is what % of Y?" },
    { label: "Value", desc: "What is X% of Y?" },
    { label: "Change", desc: "% Change (X to Y)" }
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(79,70,229,0.1)] border border-indigo-50 font-sans">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-indigo-50 pb-8 mb-10 gap-6">
        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-200">%</div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase italic">
              Percentage <span className="text-indigo-600 font-black">Logic Engine</span>
            </h1>
          </div>
          <p className="text-slate-400 font-bold mt-1 tracking-tight text-sm uppercase italic">Universal Proportional Matrix</p>
        </div>
        <div className="hidden md:flex flex-col items-end text-right">
          <div className="bg-indigo-900 px-4 py-2 rounded-xl border border-indigo-700 mb-1 shadow-lg">
            <span className="text-indigo-300 font-black text-[10px] uppercase tracking-[0.3em]">Precision Core 4.0</span>
          </div>
          <span className="text-[10px] text-slate-300 font-bold uppercase tracking-tighter italic">Mathematical Growth Verification</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
        {/* Input Sidebar / Tab Navigation */}
        <div className="lg:col-span-4 space-y-4">
          {tabs.map((tab, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`w-full p-6 text-left rounded-3xl border-2 transition-all group relative overflow-hidden ${activeTab === idx ? "bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-100" : "bg-white border-slate-100 text-slate-500 hover:border-indigo-200"}`}
            >
              <div className="relative z-10">
                 <span className={`text-[10px] font-black uppercase tracking-widest block mb-1 ${activeTab === idx ? "text-indigo-200" : "text-slate-400"}`}>Module 0{idx + 1}</span>
                 <h3 className="text-xl font-black uppercase italic tracking-tighter leading-none mb-1">{tab.label}</h3>
                 <p className={`text-xs font-bold italic opacity-70 ${activeTab === idx ? "text-indigo-100" : "text-slate-400"}`}>{tab.desc}</p>
              </div>
              {activeTab === idx && (
                 <div className="absolute top-0 right-0 h-full w-2 bg-indigo-400/30"></div>
              )}
            </button>
          ))}

          <div className="p-8 bg-slate-900 rounded-[2.5rem] border border-slate-800 text-white mt-8 relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl"></div>
             <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 italic block mb-2">Math Efficiency Hint</span>
             <p className="text-xs font-bold leading-relaxed italic text-white/60">Percentages are reversible: 8% of 25 is exactly the same as 25% of 8. Both equal 2.0.</p>
          </div>
        </div>

        {/* Dynamic Calculation Canvas */}
        <div className="lg:col-span-8">
           <div className="h-full bg-slate-50 border border-slate-200 rounded-[3rem] p-8 md:p-12 shadow-inner relative overflow-hidden flex flex-col">
              <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none"></div>

              <div className="relative z-10 grow flex flex-col">
                 <div className="mb-10 lg:mb-16">
                    <span className="inline-block px-4 py-1.5 bg-indigo-100 border border-indigo-200 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-6 italic">Configuration Matrix</span>
                    
                    {activeTab === 0 && (
                       <div className="flex flex-col md:flex-row items-center gap-6">
                          <div className="flex-1 w-full">
                             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 italic">Part Value (X)</label>
                             <input type="number" value={m0x} onChange={(e) => setM0x(e.target.value)} className="w-full bg-white border-2 border-slate-100 rounded-2xl px-6 py-5 font-black text-4xl text-slate-900 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all outline-none" />
                          </div>
                          <span className="text-2xl font-black text-slate-300 italic pt-6 md:pt-6">IS WHAT % OF</span>
                          <div className="flex-1 w-full">
                             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 italic">Total Value (Y)</label>
                             <input type="number" value={m0y} onChange={(e) => setM0y(e.target.value)} className="w-full bg-white border-2 border-slate-100 rounded-2xl px-6 py-5 font-black text-4xl text-slate-900 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all outline-none" />
                          </div>
                       </div>
                    )}

                    {activeTab === 1 && (
                       <div className="flex flex-col md:flex-row items-center gap-6">
                          <div className="flex-1 w-full">
                             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 italic">Required % (X)</label>
                             <input type="number" value={m1x} onChange={(e) => setM1x(e.target.value)} className="w-full bg-white border-2 border-slate-100 rounded-2xl px-6 py-5 font-black text-4xl text-slate-900 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all outline-none" />
                          </div>
                          <span className="text-2xl font-black text-slate-300 italic pt-6 md:pt-6">OF TOTAL DATASET</span>
                          <div className="flex-1 w-full">
                             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 italic">Total Amount (Y)</label>
                             <input type="number" value={m1y} onChange={(e) => setM1y(e.target.value)} className="w-full bg-white border-2 border-slate-100 rounded-2xl px-6 py-5 font-black text-4xl text-slate-900 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all outline-none" />
                          </div>
                       </div>
                    )}

                    {activeTab === 2 && (
                       <div className="flex flex-col md:flex-row items-center gap-6">
                          <div className="flex-1 w-full">
                             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 italic">Initial Value (X)</label>
                             <input type="number" value={m2x} onChange={(e) => setM2x(e.target.value)} className="w-full bg-white border-2 border-slate-100 rounded-2xl px-6 py-5 font-black text-4xl text-slate-900 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all outline-none" />
                          </div>
                          <span className="text-2xl font-black text-slate-300 italic pt-6 md:pt-6">SHIFTED TO</span>
                          <div className="flex-1 w-full">
                             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 italic">Final Value (Y)</label>
                             <input type="number" value={m2y} onChange={(e) => setM2y(e.target.value)} className="w-full bg-white border-2 border-slate-100 rounded-2xl px-6 py-5 font-black text-4xl text-slate-900 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all outline-none" />
                          </div>
                       </div>
                    )}
                 </div>

                 <div className="bg-white rounded-[2.5rem] p-12 shadow-2xl border border-indigo-50 flex flex-col justify-center relative overflow-hidden min-h-[260px]">
                    <div className="absolute top-0 right-0 px-8 py-3 bg-indigo-600/5 text-indigo-400 font-black text-[10px] uppercase tracking-[0.4em] italic rounded-bl-[2rem]">PROCESSED BY CORE</div>
                    
                    <div className="flex flex-col items-center justify-center text-center">
                       <span className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-400 mb-6 italic leading-none border-b border-slate-100 pb-4 w-full max-w-[200px]">Calculated Output</span>
                       
                       {activeTab === 0 && m0Res !== null && (
                         <div className="flex flex-col items-center">
                            <div className="text-8xl md:text-9xl font-black text-slate-900 tracking-tighter italic leading-none">{m0Res % 1 === 0 ? m0Res : m0Res.toFixed(2)}%</div>
                            <div className="mt-6 flex gap-3">
                               <div className="px-5 py-2 rounded-xl bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-200">Proportion Found</div>
                               <div className="px-5 py-2 rounded-xl bg-slate-900 text-indigo-400 text-[10px] font-black uppercase tracking-widest">Ratio: {(parseFloat(m0x)/parseFloat(m0y)).toFixed(4)}</div>
                            </div>
                         </div>
                       )}

                       {activeTab === 1 && m1Res !== null && (
                         <div className="flex flex-col items-center">
                            <div className="text-8xl md:text-9xl font-black text-slate-900 tracking-tighter italic leading-none">{m1Res % 1 === 0 ? m1Res : m1Res.toFixed(2)}</div>
                            <div className="mt-6 flex gap-3">
                               <div className="px-5 py-2 rounded-xl bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-200">Target Segment</div>
                            </div>
                         </div>
                       )}

                       {activeTab === 2 && m2Res !== null && (
                         <div className="flex flex-col items-center">
                            <div className={`text-8xl md:text-9xl font-black tracking-tighter italic leading-none ${m2Res >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                               {m2Res > 0 ? "+" : ""}{m2Res % 1 === 0 ? m2Res : m2Res.toFixed(2)}%
                            </div>
                            <div className="mt-6 flex gap-3">
                               <div className={`px-5 py-2 rounded-xl text-white text-[10px] font-black uppercase tracking-widest shadow-lg ${m2Res >= 0 ? "bg-emerald-600 shadow-emerald-100" : "bg-rose-600 shadow-rose-100"}`}>
                                  {m2Res >= 0 ? "Growth Recorded" : "Decrease Detected"}
                               </div>
                            </div>
                         </div>
                       )}

                       {(m0Res === null && m1Res === null && m2Res === null) && (
                          <div className="animate-pulse flex flex-col items-center">
                             <div className="w-32 h-32 bg-slate-50 rounded-full mb-6 border-4 border-dashed border-slate-200"></div>
                             <p className="text-slate-300 font-bold uppercase tracking-widest italic text-xs">Waiting for dataset inputs...</p>
                          </div>
                       )}
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <CalculatorSEO
        title={percentData.title}
        whatIsIt={percentData.whatIsIt}
        formula={percentData.formula}
        example={percentData.example}
        useCases={percentData.useCases}
        faqs={percentData.faqs}
        deepDive={percentData.deepDive}
        glossary={percentData.glossary}
        relatedCalculators={[
          {
            name: "GPA Calculator",
            path: "/gpa-calculator/",
            desc: "Convert raw percentages and grades into a standardized weighted GPA.",
          },
          {
            name: "Grade Calculator",
            path: "/grade-calculator/",
            desc: "Determine current class standings and final exam percentage requirements.",
          },
          {
            name: "Simple Interest",
            path: "/simple-interest-calculator/",
            desc: "Analyze linear growth of capital over time using fixed annual percentages.",
          },
          {
            name: "Compound Interest",
            path: "/compound-interest-calculator/",
            desc: "Observe exponential growth of assets through periodic percentage reinvestment.",
          }
        ]}
      />
    </div>
  );
}
