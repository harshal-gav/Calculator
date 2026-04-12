"use client";

import { useState, useEffect } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import velocityData from "@/data/seo-content/official/velocity-calculator.json";

export default function VelocityCalculator() {
  const [v, setV] = useState("50");
  const [d, setD] = useState("5000");
  const [t, setT] = useState("100");
  
  const [activeInputs, setActiveInputs] = useState<Set<string>>(new Set(["d", "t"]));

  const handleInputChange = (field: string, value: string) => {
    if (!activeInputs.has(field)) {
      const nextActive = new Set(activeInputs);
      if (nextActive.size >= 2) {
        const first = nextActive.values().next().value;
        if (first !== undefined) nextActive.delete(first);
      }
      nextActive.add(field);
      setActiveInputs(nextActive);
    }

    if (field === "v") setV(value);
    if (field === "d") setD(value);
    if (field === "t") setT(value);
  };

  useEffect(() => {
    calculateVelocity();
  }, [v, d, t, activeInputs]);

  const calculateVelocity = () => {
    const vVal = parseFloat(v) || 0;
    const dVal = parseFloat(d) || 0;
    const tVal = parseFloat(t) || 0;

    if (activeInputs.has("d") && activeInputs.has("t")) {
      if (tVal !== 0) setV((dVal / tVal).toFixed(2));
    } else if (activeInputs.has("v") && activeInputs.has("t")) {
      setD((vVal * tVal).toFixed(2));
    } else if (activeInputs.has("v") && activeInputs.has("d")) {
      if (vVal !== 0) setT((dVal / vVal).toFixed(2));
    }
  };

  const InputField = ({ label, id, value, unit }: { label: string, id: string, value: string, unit: string }) => (
    <div className={`p-8 rounded-[2rem] border-2 transition-all duration-300 ${activeInputs.has(id) ? "bg-white border-cyan-500 shadow-xl scale-[1.02] z-10" : "bg-slate-50 border-slate-200 opacity-60 shadow-inner"}`}>
      <div className="flex justify-between items-center mb-4">
         <label className={`text-[10px] font-black uppercase tracking-[0.3em] ${activeInputs.has(id) ? "text-cyan-600" : "text-slate-400"}`}>{label}</label>
         {activeInputs.has(id) && (
            <div className="flex gap-1">
               <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></span>
               <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse delay-75"></span>
            </div>
         )}
      </div>
      <div className="relative">
        <input
          type="number"
          value={value}
          onChange={(e) => handleInputChange(id, e.target.value)}
          className={`w-full bg-transparent border-0 p-0 font-black text-4xl focus:ring-0 tracking-tighter tabular-nums ${activeInputs.has(id) ? "text-slate-900" : "text-slate-400"}`}
        />
        <span className="absolute right-0 bottom-1 text-[10px] font-black text-slate-300 uppercase italic tracking-widest">{unit}</span>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 bg-slate-50 rounded-3xl shadow-xl border border-slate-200 font-sans italic-headings">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-200 pb-8 mb-10 gap-6">
        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🏃‍♂️</span>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase italic">
              Kinetic <span className="text-cyan-600 font-black">Velocity Resolver</span>
            </h1>
          </div>
          <p className="text-slate-500 font-bold mt-1 tracking-tight text-sm uppercase italic">Displacement Rate Matrix</p>
        </div>
        <div className="hidden md:flex flex-col items-end text-right">
          <div className="bg-slate-900 px-4 py-2 rounded-xl border border-slate-700 mb-1 shadow-lg">
            <span className="text-cyan-400 font-black text-[10px] uppercase tracking-[0.3em]">Scientific Protocol 10-J</span>
          </div>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter italic">V=d/t Standardized Verification</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <InputField label="Displacement" id="d" value={d} unit="Meters (m)" />
        <InputField label="Duration" id="t" value={t} unit="Seconds (s)" />
        <InputField label="Final Velocity" id="v" value={v} unit="m/s (Vector)" />
      </div>

      <div className="mb-12 bg-white rounded-[3rem] p-10 md:p-16 text-slate-900 shadow-2xl relative overflow-hidden border border-slate-200">
         <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px] -mr-48 -mt-48 pointer-events-none"></div>
         
         <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
               <span className="inline-block px-4 py-1.5 bg-slate-100 border border-slate-200 text-slate-500 rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-4 italic text-center lg:text-left grow">Motion Profile Status</span>
               <h2 className="text-5xl md:text-6xl font-black tracking-tight italic uppercase leading-none text-slate-900">
                  {parseFloat(v) > 343 ? "Supersonic" : (parseFloat(v) > 30 ? "High Velocity" : "Standard Speed")}
               </h2>
               <div className="flex flex-wrap gap-4 pt-4">
                  <div className="px-5 py-2 rounded-xl bg-slate-900 text-cyan-400 text-[10px] font-black uppercase tracking-widest shadow-lg italic">
                     {(parseFloat(v) * 3.6).toFixed(1)} km/h
                  </div>
                  <div className="px-5 py-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-500 text-[10px] font-black uppercase tracking-widest italic">
                     {(parseFloat(v) * 2.237).toFixed(1)} mph
                  </div>
                  <div className="px-5 py-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-500 text-[10px] font-black uppercase tracking-widest italic">
                     Mach {(parseFloat(v) / 343).toFixed(3)}
                  </div>
               </div>
            </div>
            
            <div className="lg:col-span-6">
               <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 space-y-6">
                  <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest italic">
                     <span>Displacement Trace</span>
                     <span>Vector Stability</span>
                  </div>
                  <div className="h-4 w-full bg-slate-200 rounded-full overflow-hidden shadow-inner relative">
                     <div className="h-full bg-cyan-600 transition-all duration-1000 shadow-[0_0_20px_rgba(8,145,178,0.5)]" style={{ width: `${Math.min(100, (parseFloat(v) / 100) * 100)}%` }}></div>
                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
                  </div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center italic">Object covers {(parseFloat(v)).toFixed(2)} units of spatial displacement every 1.00 unit of temporal duration.</p>
               </div>
            </div>
         </div>
      </div>

      <CalculatorSEO
        title={velocityData.title}
        whatIsIt={velocityData.whatIsIt}
        formula={velocityData.formula}
        example={velocityData.example}
        useCases={velocityData.useCases}
        faqs={velocityData.faqs}
        deepDive={velocityData.deepDive}
        glossary={velocityData.glossary}
        relatedCalculators={[
          {
            name: "Acceleration",
            path: "/acceleration-calculator/",
            desc: "Determine how the rate of velocity changes over time for non-uniform motion.",
          },
          {
            name: "Kinetic Energy",
            path: "/kinetic-energy-calculator/",
            desc: "Analyze the total energy work-potential currently stored in the moving body.",
          },
          {
            name: "Projectile Motion",
            path: "/projectile-motion-calculator/",
            desc: "Project 2D parabolic paths using horizontal and vertical velocity vectors.",
          },
          {
            name: "Force",
            path: "/force-calculator/",
            desc: "Calculate the force required to reach a specific velocity based on mass.",
          }
        ]}
      />
    </div>
  );
}
