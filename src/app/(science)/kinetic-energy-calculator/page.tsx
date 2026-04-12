"use client";

import { useState, useEffect } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import keData from "@/data/seo-content/official/kinetic-energy-calculator.json";

export default function KineticEnergyCalculator() {
  const [mass, setMass] = useState("2000"); // 2 tons
  const [velocity, setVelocity] = useState("30"); // highway speed m/s
  const [massUnit, setMassUnit] = useState("kg");
  const [velocityUnit, setVelocityUnit] = useState("m/s");

  const [result, setResult] = useState<{
    joules: number;
    kilojoules: number;
    calories: number;
    tntEquivalent: number;
  } | null>(null);

  useEffect(() => {
    calculateKE();
  }, [mass, velocity, massUnit, velocityUnit]);

  const calculateKE = () => {
    let m = parseFloat(mass) || 0;
    let v = parseFloat(velocity) || 0;

    if (m > 0 && v > 0) {
      // Standard KE = 0.5 * m * v^2
      // Handle conversions
      let mKg = m;
      if (massUnit === "g") mKg = m / 1000;
      else if (massUnit === "lb") mKg = m * 0.453592;

      let vMs = v;
      if (velocityUnit === "km/h") vMs = v / 3.6;
      else if (velocityUnit === "mph") vMs = v * 0.44704;

      const ke = 0.5 * mKg * Math.pow(vMs, 2);
      
      setResult({
        joules: ke,
        kilojoules: ke / 1000,
        calories: ke * 0.239006,
        tntEquivalent: ke / 4.184e6 // 1kg TNT = 4.184 MJ
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
            <span className="text-3xl">☄️</span>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase italic">
              Kinetic <span className="text-cyan-600 font-black">Energy Meter</span>
            </h1>
          </div>
          <p className="text-slate-500 font-bold mt-1 tracking-tight text-sm uppercase italic">Work-Energy Displacement Matrix</p>
        </div>
        <div className="hidden md:flex flex-col items-end text-right">
          <div className="bg-slate-900 px-4 py-2 rounded-xl border border-slate-700 mb-1 shadow-lg">
            <span className="text-cyan-400 font-black text-[10px] uppercase tracking-[0.3em]">Scientific Protocol 05-E</span>
          </div>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Velocity-Squared Delta Validation</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
        {/* Input Sidebar */}
        <div className="lg:col-span-12 xl:col-span-4 space-y-6">
          <div className="p-8 bg-white rounded-[2.5rem] border border-slate-200 space-y-6 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-4 border-b border-slate-100 pb-3 italic">Motion Parameters</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black text-slate-500 mb-2 uppercase tracking-widest leading-none italic">Object Mass ({massUnit})</label>
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
                    className="w-20 bg-white border border-slate-200 rounded-2xl px-3 font-bold text-xs appearance-none"
                  >
                    <option value="kg">kg</option>
                    <option value="g">g</option>
                    <option value="lb">lb</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-500 mb-2 uppercase tracking-widest leading-none italic">Current Velocity ({velocityUnit})</label>
                <div className="flex gap-2">
                   <input
                    type="number"
                    value={velocity}
                    onChange={(e) => setVelocity(e.target.value)}
                    className="flex-1 bg-cyan-50/30 border border-cyan-200 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 transition-all font-black text-2xl text-cyan-900 shadow-inner"
                  />
                  <select 
                    value={velocityUnit} 
                    onChange={(e) => setVelocityUnit(e.target.value)}
                    className="w-24 bg-white border border-slate-200 rounded-2xl px-3 font-bold text-xs"
                  >
                    <option value="m/s">m/s</option>
                    <option value="km/h">km/h</option>
                    <option value="mph">mph</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              onClick={calculateKE}
              className="w-full bg-slate-900 hover:bg-black text-cyan-400 font-black py-5 rounded-2xl shadow-xl transition-all uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-3 border border-slate-700"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping"></span> Project Impact
            </button>
          </div>

          <div className="p-8 bg-slate-100 rounded-[2.5rem] border border-slate-200 space-y-4 shadow-sm group">
             <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Physics Insight</span>
                <span className="text-cyan-600 text-xl group-hover:rotate-12 transition-transform">⚡</span>
             </div>
             <p className="text-xs font-bold leading-relaxed italic text-slate-600 bg-white p-4 rounded-xl border border-slate-200">Kinetic energy increases by the <span className="text-slate-900 font-black">square</span> of the velocity. Doubling speed quadruples impact energy.</p>
          </div>
        </div>

        {/* Results Canvas */}
        <div className="lg:col-span-12 xl:col-span-8 flex flex-col">
          {result !== null ? (
            <div className="h-full flex flex-col gap-6">
              <div className="grow bg-white rounded-[3rem] p-12 md:p-16 text-slate-900 shadow-2xl relative overflow-hidden border border-slate-200 flex flex-col justify-center">
                <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px] -mr-48 -mt-48 pointer-events-none"></div>
                
                <div className="relative z-10 space-y-2">
                  <span className="inline-block px-4 py-1 bg-slate-100 border border-slate-200 text-slate-500 rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-4 italic">Total Kinetic Potential</span>
                  <div className="text-8xl md:text-9xl font-black tracking-tighter tabular-nums text-slate-900 flex items-baseline gap-4 leading-none italic">
                    {result.joules.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    <span className="text-xl md:text-3xl text-slate-300 font-bold tracking-normal uppercase italic">Joules (J)</span>
                  </div>
                  <div className="flex items-center gap-4 pt-6">
                    <div className="px-5 py-2 rounded-xl bg-slate-900 text-cyan-400 text-[10px] font-black uppercase tracking-widest shadow-lg">
                      {result.kilojoules.toFixed(1)} kJ Total
                    </div>
                    <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest italic opacity-70">Calculated Work Capability</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-900 p-10 rounded-[2.5rem] border border-slate-800 text-white flex flex-col justify-center relative group overflow-hidden shadow-2xl">
                  <div className="absolute top-0 right-0 h-1 w-full bg-cyan-500"></div>
                  <div className="text-cyan-500 text-[10px] font-black uppercase mb-4 tracking-[0.3em] leading-none italic">Energy Equivalents</div>
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                      <span className="text-slate-400 font-bold text-[10px] uppercase tracking-widest italic">Calories</span>
                      <span className="text-white font-black">{result.calories.toLocaleString(undefined, { maximumFractionDigits: 1 })}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 font-bold text-[10px] uppercase tracking-widest italic">TNT (mg)</span>
                      <span className="text-white font-black">{(result.tntEquivalent * 1000000).toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white border-2 border-slate-100 p-10 rounded-[2.5rem] shadow-sm flex flex-col justify-center italic-headings">
                  <div className="text-slate-400 text-[10px] font-black uppercase mb-4 tracking-[0.3em] leading-none italic">Velocity Sensitivity</div>
                  <div className="space-y-4">
                     <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-600" style={{ width: `${Math.min(100, Math.abs(parseFloat(velocity)) * 2)}%` }}></div>
                     </div>
                     <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-tight italic">Squared velocity factor contributes to {((Math.pow(parseFloat(velocity), 2) / (result.joules / (0.5 * parseFloat(mass)))) * 100).toFixed(0)}% of energy scaling.</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-200/40 p-3 rounded-2xl flex items-center gap-4">
                <div className="h-2 grow bg-slate-300 rounded-full overflow-hidden shadow-inner flex">
                   <div className="h-full bg-cyan-600 shadow-[0_0_20px_rgba(8,145,178,0.5)] transition-all duration-1000" style={{ width: `${Math.min(100, result.joules / 5000)}%` }}></div>
                </div>
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest w-24 text-right italic">Magnitude</div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[500px] border-4 border-dashed border-slate-200 rounded-[3rem] flex flex-col items-center justify-center p-12 text-center bg-white shadow-inner">
               <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mb-8 border border-slate-100 shadow-sm animate-pulse">
                  <span className="text-4xl">🌠</span>
               </div>
               <h3 className="text-slate-900 text-3xl font-black mb-4 uppercase tracking-tighter italic">Pending Kinetic Trace</h3>
               <p className="text-slate-400 max-w-sm font-bold leading-tight text-lg italic uppercase tracking-tighter opacity-70">Define the object mass and velocity vector to reveal the total work potential stored within the system.</p>
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title={keData.title}
        whatIsIt={keData.whatIsIt}
        formula={keData.formula}
        example={keData.example}
        useCases={keData.useCases}
        faqs={keData.faqs}
        deepDive={keData.deepDive}
        glossary={keData.glossary}
        relatedCalculators={[
          {
            name: "Potential Energy",
            path: "/potential-energy-calculator/",
            desc: "Calculate the energy stored in an object due to its position in a gravitational field.",
          },
          {
            name: "Work and Force",
            path: "/force-calculator/",
            desc: "Analyze how force and displacement create work and change kinetic energy states.",
          },
          {
            name: "Acceleration",
            path: "/acceleration-calculator/",
            desc: "Model the rate of velocity change required to reach a specific energy level.",
          },
          {
            name: "Power",
            path: "/power-calculator/",
            desc: "Determine the rate at which kinetic energy is generated or dissipated over time.",
          }
        ]}
      />
    </div>
  );
}
