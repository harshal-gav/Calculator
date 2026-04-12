"use client";

import { useState, useEffect } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import forceData from "@/data/seo-content/official/force-calculator.json";

export default function ForceCalculator() {
  const [mass, setMass] = useState("1500");
  const [acceleration, setAcceleration] = useState("9.81");
  const [massUnit, setMassUnit] = useState("kg");
  const [accelUnit, setAccelUnit] = useState("m/s²");

  const [result, setResult] = useState<{
    forceNewtons: number;
    forcePounds: number;
    weightStatus: string;
  } | null>(null);

  useEffect(() => {
    calculateForce();
  }, [mass, acceleration, massUnit, accelUnit]);

  const calculateForce = () => {
    let m = parseFloat(mass) || 0;
    let a = parseFloat(acceleration) || 0;

    if (m > 0) {
      // Force (N) = m * a
      const f = m * a;
      // lb-force conversion
      const fLb = f * 0.224809;

      let status = "Moderate Load";
      if (f > 10000) status = "Heavy Industrial Load";
      else if (f < 100) status = "Precision Micro-Force";

      setResult({
        forceNewtons: f,
        forcePounds: fLb,
        weightStatus: status
      });
    } else {
      setResult(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 bg-slate-50 rounded-3xl shadow-xl border border-slate-200 font-sans">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-200 pb-8 mb-10 gap-6">
        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">⚙️</span>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase">
              Newtonian <span className="text-cyan-600">Force</span>
            </h1>
          </div>
          <p className="text-slate-500 font-bold mt-1 tracking-tight text-sm uppercase">Classical Mechanics Projection Model</p>
        </div>
        <div className="hidden md:flex flex-col items-end text-right">
          <div className="bg-slate-900 px-4 py-2 rounded-xl border border-slate-700 mb-1 shadow-lg">
            <span className="text-cyan-400 font-black text-[10px] uppercase tracking-[0.3em]">Scientific Protocol 03-C</span>
          </div>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">F=ma Dynamic Validation</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
        {/* Input Sidebar */}
        <div className="lg:col-span-12 xl:col-span-4 space-y-6">
          <div className="p-8 bg-white rounded-[2.5rem] border border-slate-200 space-y-6 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-4 border-b border-slate-100 pb-3 italic">Kinetic Inputs</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black text-slate-500 mb-2 uppercase tracking-widest leading-none">Mass ({massUnit})</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={mass}
                    onChange={(e) => setMass(e.target.value)}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 transition-all font-black text-2xl text-slate-900 shadow-inner"
                  />
                  <select 
                    value={massUnit} 
                    onChange={(e) => setMassUnit(e.target.value)}
                    className="w-20 bg-white border border-slate-200 rounded-2xl px-3 font-bold text-xs"
                  >
                    <option value="kg">kg</option>
                    <option value="g">g</option>
                    <option value="lb">lb</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-500 mb-2 uppercase tracking-widest leading-none">Acceleration ({accelUnit})</label>
                <div className="relative">
                  <input
                    type="number"
                    value={acceleration}
                    onChange={(e) => setAcceleration(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 transition-all font-black text-2xl text-slate-900"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 font-black text-slate-300 text-[10px] uppercase">Rate</span>
                </div>
              </div>
            </div>

            <button
              onClick={calculateForce}
              className="w-full bg-slate-900 hover:bg-black text-cyan-400 font-black py-5 rounded-2xl shadow-xl transition-all uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-3 border border-slate-700"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping"></span> Calculate Tension
            </button>
          </div>

          <div className="p-8 bg-cyan-600 rounded-[2.5rem] text-white space-y-4 shadow-xl relative overflow-hidden group">
             <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
             <div className="relative z-10">
                <span className="block text-[10px] font-black uppercase tracking-widest mb-1 opacity-60">Physics Shortcut</span>
                <p className="text-xs font-bold leading-relaxed italic border-l-2 border-white/20 pl-4">To find the weight of an object on Earth, use an acceleration of 9.81 m/s² (Standard Gravity).</p>
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
                  <span className="inline-block px-4 py-1 bg-slate-100 border border-slate-200 text-slate-500 rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-4">Net Force Magnitude</span>
                  <div className="text-8xl md:text-9xl font-black tracking-tighter tabular-nums text-slate-900 flex items-baseline gap-4 leading-none">
                    {result.forceNewtons.toLocaleString(undefined, { maximumFractionDigits: 1 })}
                    <span className="text-xl md:text-3xl text-slate-300 font-bold tracking-normal uppercase italic">Newtons (N)</span>
                  </div>
                  <div className="flex items-center gap-4 pt-6">
                    <div className="px-5 py-2 rounded-xl bg-slate-900 text-cyan-400 text-[10px] font-black uppercase tracking-widest shadow-lg">
                      {result.weightStatus}
                    </div>
                    <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest italic opacity-70">Metric Load Assessment</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-900 p-10 rounded-[2.5rem] border border-slate-800 text-white flex flex-col justify-center relative group overflow-hidden shadow-2xl">
                  <div className="absolute top-0 right-0 h-1 w-full bg-cyan-500"></div>
                  <div className="text-cyan-500 text-[10px] font-black uppercase mb-4 tracking-[0.3em] leading-none">English Standard Equivalency</div>
                  <div className="text-5xl font-black tracking-tight tabular-nums">
                    {result.forcePounds.toLocaleString(undefined, { maximumFractionDigits: 1 })} 
                    <span className="text-slate-600 text-lg tracking-normal italic ml-2">Lbf</span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-bold mt-3 uppercase tracking-widest leading-tight">Total Pounds-Force exerted on mass</p>
                </div>

                <div className="bg-white border-2 border-slate-100 p-10 rounded-[2.5rem] shadow-sm flex flex-col justify-center">
                  <div className="text-slate-400 text-[10px] font-black uppercase mb-4 tracking-[0.3em] leading-none">Force Conversion Matrix</div>
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                      <span className="text-slate-700 font-bold text-[10px] uppercase tracking-widest">Kilonewtons (kN)</span>
                      <span className="text-slate-900 font-black">{(result.forceNewtons / 1000).toLocaleString(undefined, { maximumFractionDigits: 4 })}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                      <span className="text-slate-700 font-bold text-[10px] uppercase tracking-widest">Dynes (dyn)</span>
                      <span className="text-slate-900 font-black">{(result.forceNewtons * 100000).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-700 font-bold text-[10px] uppercase tracking-widest">Kilograms-Force (kgf)</span>
                      <span className="text-slate-900 font-black">{(result.forceNewtons / 9.80665).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-100 p-4 rounded-2xl flex items-center gap-6">
                 <div className="flex flex-col">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Impact Potential</span>
                    <span className="text-slate-900 font-black text-xl italic uppercase tracking-tighter">High Integrity</span>
                 </div>
                 <div className="h-2 grow bg-slate-200 rounded-full overflow-hidden shadow-inner relative">
                    <div className="h-full bg-cyan-600 transition-all duration-1000 shadow-[0_0_15px_rgba(8,145,178,0.4)]" style={{ width: `${Math.min(100, result.forceNewtons / 100)}%` }}></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
                 </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[500px] border-4 border-dashed border-slate-200 rounded-[3rem] flex flex-col items-center justify-center p-12 text-center bg-white shadow-inner">
               <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mb-8 border border-slate-100 shadow-sm animate-pulse">
                  <span className="text-4xl text-slate-300">⚖️</span>
               </div>
               <h3 className="text-slate-900 text-3xl font-black mb-4 uppercase tracking-tighter italic">Pending Kinetic Analysis</h3>
               <p className="text-slate-400 max-w-sm font-bold leading-tight text-lg italic uppercase tracking-tighter opacity-70">Initialize mass and acceleration scalars to determine the total physical burden on the system.</p>
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title={forceData.title}
        whatIsIt={forceData.whatIsIt}
        formula={forceData.formula}
        example={forceData.example}
        useCases={forceData.useCases}
        faqs={forceData.faqs}
        deepDive={forceData.deepDive}
        glossary={forceData.glossary}
        relatedCalculators={[
          {
            name: "Acceleration",
            path: "/acceleration-calculator/",
            desc: "Calculate the rate of change in velocity derived from a known force vector.",
          },
          {
            name: "Density",
            path: "/density-calculator/",
            desc: "Determine how concentrated a mass is within a given physical volume.",
          },
          {
            name: "Power",
            path: "/power-calculator/",
            desc: "Measure the work performed and the rate of energy transfer in mechanical systems.",
          },
          {
            name: "Kinetic Energy",
            path: "/kinetic-energy-calculator/",
            desc: "Calculate the energy an object possesses due to its motion and velocity.",
          }
        ]}
      />
    </div>
  );
}
