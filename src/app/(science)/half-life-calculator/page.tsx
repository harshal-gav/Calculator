"use client";

import { useState, useEffect } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import halfLifeData from "@/data/seo-content/official/half-life-calculator.json";

export default function HalfLifeCalculator() {
  const [initialAmount, setInitialAmount] = useState("100");
  const [halfLife, setHalfLife] = useState("8");
  const [timePassed, setTimePassed] = useState("24");
  const [unit, setUnit] = useState("g");
  const [timeUnit, setTimeUnit] = useState("days");

  const [result, setResult] = useState<{
    remaining: number;
    decayed: number;
    numHalfLives: number;
    percentRemaining: number;
  } | null>(null);

  useEffect(() => {
    calculateHalfLife();
  }, [initialAmount, halfLife, timePassed]);

  const calculateHalfLife = () => {
    const n0 = parseFloat(initialAmount) || 0;
    const h = parseFloat(halfLife) || 0;
    const t = parseFloat(timePassed) || 0;

    if (n0 > 0 && h > 0) {
      // nHalfLives = t / h
      const n = t / h;
      // N(t) = N0 * (0.5)^n
      const remaining = n0 * Math.pow(0.5, n);
      const decayed = n0 - remaining;
      const pct = (remaining / n0) * 100;

      setResult({
        remaining,
        decayed,
        numHalfLives: n,
        percentRemaining: pct
      });
    } else {
      setResult(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 bg-slate-50 rounded-3xl shadow-xl border border-slate-200 font-sans italic-headings">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-200 pb-8 mb-10 gap-6">
        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">☢️</span>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase italic">
              Half-Life <span className="text-cyan-600 font-black">Isotope Decay</span>
            </h1>
          </div>
          <p className="text-slate-500 font-bold mt-1 tracking-tight text-sm uppercase italic">Exponential Depletion Matrix</p>
        </div>
        <div className="hidden md:flex flex-col items-end text-right">
          <div className="bg-slate-900 px-4 py-2 rounded-xl border border-slate-700 mb-1 shadow-lg">
            <span className="text-cyan-400 font-black text-[10px] uppercase tracking-[0.3em]">Scientific Protocol 04-D</span>
          </div>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Radiologic Degradation Model</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
        {/* Input Sidebar */}
        <div className="lg:col-span-12 xl:col-span-4 space-y-6">
          <div className="p-8 bg-white rounded-[2.5rem] border border-slate-200 space-y-6 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-4 border-b border-slate-100 pb-3 italic">Material Stability</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black text-slate-500 mb-2 uppercase tracking-widest leading-none italic">Initial Quantity ({unit})</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={initialAmount}
                    onChange={(e) => setInitialAmount(e.target.value)}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 transition-all font-black text-2xl text-slate-900 shadow-inner"
                  />
                  <select 
                    value={unit} 
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-20 bg-white border border-slate-200 rounded-2xl px-3 font-bold text-xs"
                  >
                    <option value="g">g</option>
                    <option value="mg">mg</option>
                    <option value="kg">kg</option>
                    <option value="%">%</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-500 mb-2 uppercase tracking-widest leading-none italic">Half-Life Period ({timeUnit})</label>
                <input
                  type="number"
                  value={halfLife}
                  onChange={(e) => setHalfLife(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 transition-all font-black text-2xl text-slate-900"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-500 mb-2 uppercase tracking-widest leading-none italic">Elapsed Time ({timeUnit})</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={timePassed}
                    onChange={(e) => setTimePassed(e.target.value)}
                    className="flex-1 bg-cyan-50/30 border border-cyan-200 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 transition-all font-black text-2xl text-cyan-900 shadow-inner"
                  />
                  <select 
                    value={timeUnit} 
                    onChange={(e) => setTimeUnit(e.target.value)}
                    className="w-24 bg-white border border-slate-200 rounded-2xl px-3 font-bold text-xs"
                  >
                    <option value="days">Days</option>
                    <option value="hours">Hours</option>
                    <option value="years">Years</option>
                    <option value="secs">Secs</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              onClick={calculateHalfLife}
              className="w-full bg-slate-900 hover:bg-black text-cyan-400 font-black py-5 rounded-2xl shadow-xl transition-all uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-3 border border-slate-700"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping"></span> Project Decay
            </button>
          </div>

          <div className="p-8 bg-zinc-900 rounded-[2.5rem] text-white space-y-4 shadow-xl relative overflow-hidden group">
             <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
             <div className="relative z-10 flex flex-col gap-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-cyan-500 italic">Scientific Observation</span>
                <p className="text-xs font-bold leading-relaxed italic border-l-2 border-cyan-500/30 pl-4 opacity-80">Substances are generally considered 'cleared' or negligible after 10 full half-life cycles.</p>
             </div>
          </div>
        </div>

        {/* Results Canvas */}
        <div className="lg:col-span-12 xl:col-span-8 flex flex-col">
          {result !== null ? (
            <div className="h-full flex flex-col gap-6">
              <div className="grow bg-white rounded-[3rem] p-12 md:p-16 text-slate-900 shadow-2xl relative overflow-hidden border border-slate-200 flex flex-col justify-center">
                <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px] -mr-48 -mt-48 pointer-events-none"></div>
                
                <div className="relative z-10 space-y-2">
                  <span className="inline-block px-4 py-1 bg-slate-100 border border-slate-200 text-slate-500 rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-4 italic">Remaining Inventory</span>
                  <div className="text-8xl md:text-9xl font-black tracking-tighter tabular-nums text-slate-900 flex items-baseline gap-4 leading-none italic">
                    {result.remaining.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                    <span className="text-xl md:text-3xl text-slate-300 font-bold tracking-normal uppercase italic">{unit}</span>
                  </div>
                  <div className="flex items-center gap-4 pt-6">
                    <div className="px-5 py-2 rounded-xl bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest shadow-lg">
                      {result.percentRemaining.toFixed(2)}% Active
                    </div>
                    <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest italic opacity-70">Decay Cycle: {result.numHalfLives.toFixed(2)} Half-Lives</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-900 p-10 rounded-[2.5rem] border border-slate-800 text-white flex flex-col justify-center relative group overflow-hidden shadow-2xl">
                  <div className="absolute top-0 right-0 h-1 w-full bg-cyan-500"></div>
                  <div className="text-cyan-500 text-[10px] font-black uppercase mb-4 tracking-[0.3em] leading-none italic">Eliminated Mass</div>
                  <div className="text-5xl font-black tracking-tight tabular-nums italic">
                    {result.decayed.toLocaleString(undefined, { maximumFractionDigits: 4 })} 
                    <span className="text-slate-600 text-lg tracking-normal italic ml-2">{unit}</span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-bold mt-3 uppercase tracking-widest leading-tight italic">Total volume converted or excreted</p>
                </div>

                <div className="bg-white border-2 border-slate-100 p-10 rounded-[2.5rem] shadow-sm flex flex-col justify-center italic-headings">
                  <div className="text-slate-400 text-[10px] font-black uppercase mb-4 tracking-[0.3em] leading-none italic">Depletion Matrix</div>
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                      <span className="text-slate-700 font-bold text-[10px] uppercase tracking-widest italic">After 1 Cycle</span>
                      <span className="text-slate-900 font-black">{(parseFloat(initialAmount) * 0.5).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                      <span className="text-slate-700 font-bold text-[10px] uppercase tracking-widest italic">After 5 Cycles</span>
                      <span className="text-slate-900 font-black">{(parseFloat(initialAmount) * 0.03125).toLocaleString(undefined, { maximumFractionDigits: 4 })}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-700 font-bold text-[10px] uppercase tracking-widest italic">After 10 Cycles</span>
                      <span className="text-slate-900 font-black">{(parseFloat(initialAmount) * 0.000976).toLocaleString(undefined, { maximumFractionDigits: 6 })}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-100 p-4 rounded-2xl flex items-center gap-6">
                 <div className="grow space-y-3">
                    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden shadow-inner relative">
                       <div className="h-full bg-cyan-600 transition-all duration-1000 shadow-[0_0_15px_rgba(8,145,178,0.4)]" style={{ width: `${result.percentRemaining}%` }}></div>
                       <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
                    </div>
                    <div className="flex justify-between text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] italic">
                       <span>Stable Decay</span>
                       <span>Isotope Expiration</span>
                    </div>
                 </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[500px] border-4 border-dashed border-slate-200 rounded-[3rem] flex flex-col items-center justify-center p-12 text-center bg-white shadow-inner">
               <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mb-8 border border-slate-100 shadow-sm animate-pulse">
                  <span className="text-4xl">🌫️</span>
               </div>
               <h3 className="text-slate-900 text-3xl font-black mb-4 uppercase tracking-tighter italic">Pending Isotope Validation</h3>
               <p className="text-slate-400 max-w-sm font-bold leading-tight text-lg italic uppercase tracking-tighter opacity-70">Define the initial concentration and half-life duration to observe the exponential decay vectors.</p>
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title={halfLifeData.title}
        whatIsIt={halfLifeData.whatIsIt}
        formula={halfLifeData.formula}
        example={halfLifeData.example}
        useCases={halfLifeData.useCases}
        faqs={halfLifeData.faqs}
        deepDive={halfLifeData.deepDive}
        glossary={halfLifeData.glossary}
        relatedCalculators={[
          {
            name: "Molar Mass",
            path: "/molar-mass-calculator/",
            desc: "Determine atomic weight and substance moles for chemical analysis.",
          },
          {
            name: "Scientific",
            path: "/scientific-calculator/",
            desc: "Perform advanced logarithmic and exponential mathematical operations.",
          },
          {
            name: "Force",
            path: "/force-calculator/",
            desc: "Analyze traditional Newtonian interactions between mass and motion.",
          },
          {
            name: "Density",
            path: "/density-calculator/",
            desc: "Observe the physical concentration of mass within a volume.",
          }
        ]}
      />
    </div>
  );
}
