"use client";

import { useState, useEffect } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import accelData from "@/data/seo-content/official/acceleration-calculator.json";

export default function AccelerationCalculator() {
  const [initialVelocity, setInitialVelocity] = useState("0");
  const [finalVelocity, setFinalVelocity] = useState("26.82"); // 60mph
  const [time, setTime] = useState("2.5");
  const [unit, setUnit] = useState("m/s");

  const [result, setResult] = useState<{
    acceleration: number;
    distance: number;
    gForce: number;
  } | null>(null);

  useEffect(() => {
    calculateAcceleration();
  }, [initialVelocity, finalVelocity, time, unit]);

  const calculateAcceleration = () => {
    const v1 = parseFloat(initialVelocity) || 0;
    const v2 = parseFloat(finalVelocity) || 0;
    const t = parseFloat(time) || 0;

    if (t > 0) {
      // a = (v2 - v1) / t
      const a = (v2 - v1) / t;
      // d = v1*t + 0.5*a*t^2
      const d = (v1 * t) + (0.5 * a * Math.pow(t, 2));
      // g-force = a / 9.80665
      const g = a / 9.80665;

      setResult({
        acceleration: a,
        distance: d,
        gForce: g
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
            <span className="text-3xl">⚛️</span>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase">
              Acceleration <span className="text-cyan-600">Kinematics</span>
            </h1>
          </div>
          <p className="text-slate-500 font-bold mt-1 tracking-tight text-sm uppercase">Classical Mechanics Analysis Engine</p>
        </div>
        <div className="hidden md:flex flex-col items-end text-right">
          <div className="bg-slate-900 px-4 py-2 rounded-xl border border-slate-700 mb-1 shadow-lg">
            <span className="text-cyan-400 font-black text-[10px] uppercase tracking-[0.3em]">Scientific Protocol 01-A</span>
          </div>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Newtonian Dynamics Validation</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
        {/* Input Sidebar */}
        <div className="lg:col-span-12 xl:col-span-4 space-y-6">
          <div className="p-8 bg-white rounded-[2.5rem] border border-slate-200 space-y-6 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-4 border-b border-slate-100 pb-3">Input Parameters</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black text-slate-500 mb-2 uppercase tracking-widest leading-none">Measurement Unit</label>
                <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-2xl">
                   {["m/s", "km/h", "mph"].map((u) => (
                     <button
                       key={u}
                       onClick={() => setUnit(u)}
                       className={`py-2 rounded-xl text-[10px] font-black uppercase transition-all ${unit === u ? "bg-white text-cyan-600 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
                     >
                       {u}
                     </button>
                   ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-500 mb-2 uppercase tracking-widest leading-none">Initial Velocity ({unit})</label>
                <input
                  type="number"
                  value={initialVelocity}
                  onChange={(e) => setInitialVelocity(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 transition-all font-black text-2xl text-slate-900"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-500 mb-2 uppercase tracking-widest leading-none">Final Velocity ({unit})</label>
                <input
                  type="number"
                  value={finalVelocity}
                  onChange={(e) => setFinalVelocity(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 transition-all font-black text-2xl text-slate-900"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-500 mb-2 uppercase tracking-widest leading-none">Time Interval (Seconds)</label>
                <input
                  type="number"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-cyan-50/30 border border-cyan-200 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 transition-all font-black text-2xl text-cyan-900 shadow-inner"
                />
              </div>
            </div>

            <button
              onClick={calculateAcceleration}
              className="w-full bg-slate-900 hover:bg-black text-cyan-400 font-black py-5 rounded-2xl transition-all shadow-xl shadow-slate-200 uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-3 border border-slate-700"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping"></span> Compute Trajectory
            </button>
          </div>

          <div className="p-6 bg-cyan-900 rounded-[2rem] text-white space-y-4 shadow-xl border border-cyan-800 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-transparent"></div>
            <div className="relative z-10 flex flex-col gap-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400">Kinematic Logic</span>
              <p className="text-sm font-bold leading-relaxed italic opacity-90">Calculating velocity delta over time using classical Newtonian equations of motion.</p>
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
                  <span className="inline-block px-4 py-1 bg-slate-100 border border-slate-200 text-slate-500 rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-4">Acceleration Rate</span>
                  <div className="text-8xl md:text-9xl font-black tracking-tighter tabular-nums text-slate-900 flex items-baseline gap-4">
                    {result.acceleration.toFixed(2)}
                    <span className="text-xl md:text-3xl text-slate-300 font-bold tracking-normal uppercase">m/s²</span>
                  </div>
                  <div className="flex items-center gap-4 pt-4">
                    <div className="px-4 py-2 rounded-xl bg-cyan-600 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-cyan-900/20">
                      {result.gForce.toFixed(2)} G-Force
                    </div>
                    <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Calculated Velocity Delta</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-900 p-10 rounded-[2.5rem] border border-slate-800 text-white flex flex-col justify-center relative group overflow-hidden shadow-2xl">
                  <div className="absolute top-0 right-0 h-1 w-full bg-cyan-500"></div>
                  <div className="text-cyan-500 text-[10px] font-black uppercase mb-4 tracking-[0.3em] leading-none">Total Displacement</div>
                  <div className="text-5xl font-black tracking-tight">{result.distance.toFixed(1)} <span className="text-slate-600 text-lg tracking-normal">Meters</span></div>
                  <p className="text-[10px] text-slate-500 font-bold mt-3 uppercase tracking-widest italic opacity-70">Distance traveled during interval</p>
                </div>

                <div className="bg-white border-2 border-slate-100 p-10 rounded-[2.5rem] shadow-sm flex flex-col justify-center">
                  <div className="text-slate-400 text-[10px] font-black uppercase mb-4 tracking-[0.3em] leading-none">Acceleration Unit Matrix</div>
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                      <span className="text-slate-500 font-bold text-xs">ft/s²</span>
                      <span className="text-slate-900 font-black">{(result.acceleration * 3.28084).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                      <span className="text-slate-500 font-bold text-xs">km/h/s</span>
                      <span className="text-slate-900 font-black">{(result.acceleration * 3.6).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 font-bold text-xs">mph/s</span>
                      <span className="text-slate-900 font-black">{(result.acceleration * 2.23694).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-200/50 p-3 rounded-2xl flex items-center gap-4">
                <div className="h-2 grow bg-slate-300 rounded-full overflow-hidden shadow-inner flex">
                   <div className="h-full bg-cyan-600 shadow-[0_0_20px_rgba(8,145,178,0.5)] transition-all duration-1000" style={{ width: `${Math.min(100, Math.abs(result.acceleration) * 5)}%` }}></div>
                </div>
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest w-24 text-right">Magnitude</div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[500px] border-4 border-dashed border-slate-200 rounded-[3rem] flex flex-col items-center justify-center p-12 text-center bg-white">
               <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mb-8 border border-slate-100 shadow-sm animate-pulse">
                  <span className="text-4xl">🚀</span>
               </div>
               <h3 className="text-slate-900 text-3xl font-black mb-4 uppercase tracking-tighter">Enter Motion Data</h3>
               <p className="text-slate-400 max-w-xs font-bold leading-tight text-lg italic uppercase tracking-tighter opacity-70">Initialize velocity and time vectors to generate cinematic acceleration reports.</p>
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title={accelData.title}
        whatIsIt={accelData.whatIsIt}
        formula={accelData.formula}
        example={accelData.example}
        useCases={accelData.useCases}
        faqs={accelData.faqs}
        deepDive={accelData.deepDive}
        glossary={accelData.glossary}
        relatedCalculators={[
          {
            name: "Velocity",
            path: "/velocity-calculator/",
            desc: "Calculate speed and displacement over time in standard physics scenarios.",
          },
          {
            name: "Projectile Motion",
            path: "/projectile-motion-calculator/",
            desc: "Simulate trajectories, launch angles, and distances for objects in flight.",
          },
          {
            name: "Force (Newton's 2nd)",
            path: "/force-calculator/",
            desc: "Determine force requirements based on mass and desired acceleration.",
          },
          {
            name: "Power",
            path: "/power-calculator/",
            desc: "Analyze work performed and energy transfer rates for mechanical systems.",
          }
        ]}
      />
    </div>
  );
}
