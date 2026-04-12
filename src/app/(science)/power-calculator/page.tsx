"use client";

import { useState, useEffect } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import powerData from "@/data/seo-content/official/power-calculator.json";

export default function PowerCalculator() {
  const [mode, setMode] = useState<"mechanical" | "electrical">("mechanical");
  
  // Mechanical inputs
  const [work, setWork] = useState("196200");
  const [time, setTime] = useState("10");
  
  // Electrical inputs
  const [voltage, setVoltage] = useState("120");
  const [current, setCurrent] = useState("10");

  const [result, setResult] = useState<{
    watts: number;
    kilowatts: number;
    horsepower: number;
    btuPerHour: number;
  } | null>(null);

  useEffect(() => {
    calculatePower();
  }, [mode, work, time, voltage, current]);

  const calculatePower = () => {
    let pWatts = 0;

    if (mode === "mechanical") {
      const w = parseFloat(work) || 0;
      const t = parseFloat(time) || 1;
      pWatts = w / t;
    } else {
      const v = parseFloat(voltage) || 0;
      const i = parseFloat(current) || 0;
      pWatts = v * i;
    }

    if (pWatts > 0) {
      setResult({
        watts: pWatts,
        kilowatts: pWatts / 1000,
        horsepower: pWatts / 745.7,
        btuPerHour: pWatts * 3.41214
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
            <span className="text-3xl">🔋</span>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase italic">
              Power <span className="text-cyan-600 font-black">Transmission</span>
            </h1>
          </div>
          <p className="text-slate-500 font-bold mt-1 tracking-tight text-sm uppercase italic">Rate of Energy Flux Analysis</p>
        </div>
        <div className="hidden md:flex flex-col items-end text-right">
          <div className="bg-slate-900 px-4 py-2 rounded-xl border border-slate-700 mb-1 shadow-lg">
            <span className="text-cyan-400 font-black text-[10px] uppercase tracking-[0.3em]">Scientific Protocol 08-H</span>
          </div>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter italic">P=W/t Standardized Resolver</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
        {/* Input Sidebar */}
        <div className="lg:col-span-12 xl:col-span-4 space-y-6">
          <div className="p-8 bg-white rounded-[2.5rem] border border-slate-200 space-y-6 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            
            <div className="flex gap-2 p-1 bg-slate-100 rounded-2xl mb-4">
               {["mechanical", "electrical"].map((m) => (
                 <button
                   key={m}
                   onClick={() => setMode(m as any)}
                   className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${mode === m ? "bg-white text-cyan-600 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
                 >
                   {m}
                 </button>
               ))}
            </div>

            <div className="space-y-6">
              {mode === "mechanical" ? (
                <>
                  <div>
                    <label className="block text-[10px] font-black text-slate-500 mb-2 uppercase tracking-widest leading-none italic">Total Work Done (Joules)</label>
                    <input
                      type="number"
                      value={work}
                      onChange={(e) => setWork(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 transition-all font-black text-2xl text-slate-900 shadow-inner"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-500 mb-2 uppercase tracking-widest leading-none italic">Time Duration (Seconds)</label>
                    <input
                      type="number"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 transition-all font-black text-2xl text-slate-900 shadow-inner"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-[10px] font-black text-slate-500 mb-2 uppercase tracking-widest leading-none italic">Voltage (Volts)</label>
                    <input
                      type="number"
                      value={voltage}
                      onChange={(e) => setVoltage(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 transition-all font-black text-2xl text-slate-900 shadow-inner"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-500 mb-2 uppercase tracking-widest leading-none italic">Current (Amps)</label>
                    <input
                      type="number"
                      value={current}
                      onChange={(e) => setCurrent(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 transition-all font-black text-2xl text-slate-900 shadow-inner"
                    />
                  </div>
                </>
              )}
            </div>

            <button
              onClick={calculatePower}
              className="w-full bg-slate-900 hover:bg-black text-cyan-400 font-black py-5 rounded-2xl shadow-xl transition-all uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-3 border border-slate-700"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span> Profile Output
            </button>
          </div>

          <div className="p-8 bg-cyan-100 rounded-[2.5rem] border border-cyan-200 space-y-4 group">
             <span className="text-[10px] font-black uppercase tracking-widest text-cyan-600 italic">Technical Conversion</span>
             <p className="text-xs font-bold leading-relaxed italic text-cyan-900">Standardizing 1 Mechanical Horsepower as exactly 745.7 Watts for high-precision industrial modeling.</p>
          </div>
        </div>

        {/* Results Canvas */}
        <div className="lg:col-span-12 xl:col-span-8 flex flex-col">
          {result !== null ? (
            <div className="h-full flex flex-col gap-6">
              <div className="grow bg-white rounded-[3rem] p-12 md:p-16 text-slate-900 shadow-2xl relative overflow-hidden border border-slate-200 flex flex-col justify-center">
                <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px] -mr-48 -mt-48 pointer-events-none"></div>
                
                <div className="relative z-10 space-y-2">
                  <span className="inline-block px-4 py-1 bg-slate-100 border border-slate-200 text-slate-500 rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-4 italic">Power Output</span>
                  <div className="text-8xl md:text-9xl font-black tracking-tighter tabular-nums text-slate-900 flex items-baseline gap-4 leading-none italic">
                    {result.watts.toLocaleString(undefined, { maximumFractionDigits: 1 })}
                    <span className="text-xl md:text-3xl text-slate-300 font-bold tracking-normal uppercase italic">Watts (W)</span>
                  </div>
                  <div className="flex items-center gap-4 pt-6">
                    <div className="px-5 py-2 rounded-xl bg-slate-900 text-cyan-400 text-[10px] font-black uppercase tracking-widest shadow-lg italic">
                      {result.kilowatts.toFixed(3)} Kilowatts
                    </div>
                    <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest italic opacity-70">Metric Energy Consumption Rate</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-900 p-10 rounded-[2.5rem] border border-slate-800 text-white flex flex-col justify-center relative group overflow-hidden shadow-2xl">
                  <div className="absolute top-0 right-0 h-1 w-full bg-cyan-500"></div>
                  <div className="text-cyan-500 text-[10px] font-black uppercase mb-4 tracking-[0.3em] leading-none italic">Mechanical Force Unit</div>
                  <div className="text-5xl font-black tracking-tight tabular-nums italic">
                    {result.horsepower.toFixed(2)} 
                    <span className="text-slate-600 text-lg tracking-normal italic ml-2">Horsepower (HP)</span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-bold mt-3 uppercase tracking-widest leading-tight italic">Effective mechanical leverage output</p>
                </div>

                <div className="bg-white border-2 border-slate-100 p-10 rounded-[2.5rem] shadow-sm flex flex-col justify-center italic-headings">
                  <div className="text-slate-400 text-[10px] font-black uppercase mb-4 tracking-[0.3em] leading-none italic">Cross-Domain Matrix</div>
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                      <span className="text-slate-700 font-bold text-[10px] uppercase tracking-widest italic">BTU / Hour</span>
                      <span className="text-slate-900 font-black">{result.btuPerHour.toLocaleString(undefined, { maximumFractionDigits: 1 })}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                      <span className="text-slate-700 font-bold text-[10px] uppercase tracking-widest italic">Foot-Lbs / Min</span>
                      <span className="text-slate-900 font-black">{(result.watts * 44.254).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-700 font-bold text-[10px] uppercase tracking-widest italic">Calories / Sec</span>
                      <span className="text-slate-900 font-black">{(result.watts * 0.239006).toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-100 p-4 rounded-2xl flex items-center gap-6">
                 <div className="grow space-y-3">
                    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden shadow-inner relative">
                       <div className="h-full bg-cyan-600 transition-all duration-1000 shadow-[0_0_15px_rgba(8,145,178,0.4)]" style={{ width: `${Math.min(100, result.watts / 100)}%` }}></div>
                       <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
                    </div>
                    <div className="flex justify-between text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] italic">
                       <span>Wattage Intensity</span>
                       <span>System Limit Projection</span>
                    </div>
                 </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[500px] border-4 border-dashed border-slate-200 rounded-[3rem] flex flex-col items-center justify-center p-12 text-center bg-white shadow-inner">
               <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mb-8 border border-slate-100 shadow-sm animate-pulse">
                  <span className="text-4xl text-slate-300">⚛️</span>
               </div>
               <h3 className="text-slate-900 text-3xl font-black mb-4 uppercase tracking-tighter italic">Initialize Energy Flux</h3>
               <p className="text-slate-400 max-w-sm font-bold leading-tight text-lg italic uppercase tracking-tighter opacity-70">Define work magnitude or electrical load factors to determine the total operational power output.</p>
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title={powerData.title}
        whatIsIt={powerData.whatIsIt}
        formula={powerData.formula}
        example={powerData.example}
        useCases={powerData.useCases}
        faqs={powerData.faqs}
        deepDive={powerData.deepDive}
        glossary={powerData.glossary}
        relatedCalculators={[
          {
            name: "Ohm's Law",
            path: "/ohms-law-calculator/",
            desc: "Calculate voltage, current, and resistance for electrical power analysis.",
          },
          {
            name: "Kinetic Energy",
            path: "/kinetic-energy-calculator/",
            desc: "Measure the energy work-potential currently stored in a moving body.",
          },
          {
            name: "Force",
            path: "/force-calculator/",
            desc: "Analyze traditional Newtonian interactions between mass and motion.",
          },
          {
            name: "Torque",
            path: "/torque-calculator/",
            desc: "Determine rotational force required for specific mechanical power outputs.",
          }
        ]}
      />
    </div>
  );
}
