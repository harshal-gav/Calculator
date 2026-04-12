"use client";

import { useState, useEffect } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import ohmsData from "@/data/seo-content/official/ohms-law-calculator.json";

export default function OhmsLawCalculator() {
  const [v, setV] = useState("120");
  const [i, setI] = useState("10");
  const [r, setR] = useState("12");
  const [p, setP] = useState("1200");
  
  const [activeInputs, setActiveInputs] = useState<Set<string>>(new Set(["v", "i"]));

  const handleInputChange = (field: string, value: string) => {
    // We want exactly 2 active inputs. 
    // If user changes a field not in activeInputs, it becomes active and the oldest one becomes inactive.
    if (!activeInputs.has(field)) {
      const nextActive = new Set(activeInputs);
      if (nextActive.size >= 2) {
        // Remove the "oldest" (first) element
        const first = nextActive.values().next().value;
        if (first !== undefined) nextActive.delete(first);
      }
      nextActive.add(field);
      setActiveInputs(nextActive);
    }

    if (field === "v") setV(value);
    if (field === "i") setI(value);
    if (field === "r") setR(value);
    if (field === "p") setP(value);
  };

  useEffect(() => {
    calculateOhms();
  }, [v, i, r, p, activeInputs]);

  const calculateOhms = () => {
    const vVal = parseFloat(v) || 0;
    const iVal = parseFloat(i) || 0;
    const rVal = parseFloat(r) || 0;
    const pVal = parseFloat(p) || 0;

    // Cases based on active inputs
    if (activeInputs.has("v") && activeInputs.has("i")) {
      if (iVal !== 0) {
        setR((vVal / iVal).toFixed(2));
        setP((vVal * iVal).toFixed(2));
      }
    } else if (activeInputs.has("v") && activeInputs.has("r")) {
      if (rVal !== 0) {
        setI((vVal / rVal).toFixed(2));
        setP((Math.pow(vVal, 2) / rVal).toFixed(2));
      }
    } else if (activeInputs.has("v") && activeInputs.has("p")) {
      if (vVal !== 0) {
        setI((pVal / vVal).toFixed(2));
        setR((Math.pow(vVal, 2) / pVal).toFixed(2));
      }
    } else if (activeInputs.has("i") && activeInputs.has("r")) {
      setV((iVal * rVal).toFixed(2));
      setP((Math.pow(iVal, 2) * rVal).toFixed(2));
    } else if (activeInputs.has("i") && activeInputs.has("p")) {
      if (iVal !== 0) {
        setV((pVal / iVal).toFixed(2));
        setR((pVal / Math.pow(iVal, 2)).toFixed(2));
      }
    } else if (activeInputs.has("r") && activeInputs.has("p")) {
      if (rVal !== 0) {
        setV(Math.sqrt(pVal * rVal).toFixed(2));
        setI(Math.sqrt(pVal / rVal).toFixed(2));
      }
    }
  };

  const InputField = ({ label, id, value, unit }: { label: string, id: string, value: string, unit: string }) => (
    <div className={`p-6 rounded-3xl border-2 transition-all ${activeInputs.has(id) ? "bg-white border-cyan-500 shadow-lg scale-[1.02] z-10" : "bg-slate-50 border-slate-200 opacity-60 shadow-inner"}`}>
      <div className="flex justify-between items-center mb-3">
         <label className={`text-[10px] font-black uppercase tracking-[0.2em] ${activeInputs.has(id) ? "text-cyan-600" : "text-slate-400"}`}>{label}</label>
         {activeInputs.has(id) && <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>}
      </div>
      <div className="relative">
        <input
          type="number"
          value={value}
          onChange={(e) => handleInputChange(id, e.target.value)}
          className={`w-full bg-transparent border-0 p-0 font-black text-3xl focus:ring-0 ${activeInputs.has(id) ? "text-slate-900" : "text-slate-400"}`}
        />
        <span className="absolute right-0 bottom-1 text-[10px] font-black text-slate-300 uppercase italic">{unit}</span>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 bg-slate-50 rounded-3xl shadow-xl border border-slate-200 font-sans italic-headings">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-200 pb-8 mb-10 gap-6">
        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🔌</span>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase italic">
              Ohm's Law <span className="text-cyan-600 font-black">Circuit Matrix</span>
            </h1>
          </div>
          <p className="text-slate-500 font-bold mt-1 tracking-tight text-sm uppercase italic">Universal Electrical Parameter Resolver</p>
        </div>
        <div className="hidden md:flex flex-col items-end text-right">
          <div className="bg-slate-900 px-4 py-2 rounded-xl border border-slate-700 mb-1 shadow-lg">
            <span className="text-cyan-400 font-black text-[10px] uppercase tracking-[0.3em]">Scientific Protocol 07-G</span>
          </div>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter italic">V=IR Standardized Verification</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 relative">
        <InputField label="Voltage" id="v" value={v} unit="Volts (V)" />
        <InputField label="Current" id="i" value={i} unit="Amps (I)" />
        <InputField label="Resistance" id="r" value={r} unit="Ohms (R)" />
        <InputField label="Power" id="p" value={p} unit="Watts (P)" />
        
        <div className="col-span-1 md:col-span-2 lg:col-span-4 mt-6">
           <div className="p-6 bg-slate-900 rounded-[2rem] text-white flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative group">
              <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex items-center gap-4 relative z-10">
                 <div className="w-12 h-12 bg-cyan-600/20 rounded-2xl flex items-center justify-center border border-cyan-500/30">
                    <span className="text-2xl text-cyan-400 font-black">!</span>
                 </div>
                 <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-cyan-500">Auto-Resolver Logic</span>
                    <p className="text-sm font-bold italic text-white/70">Modify any field to lock it as an input. The matrix will solve the remaining parameters.</p>
                 </div>
              </div>
              <div className="flex gap-4 relative z-10">
                 <div className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-center">
                    <span className="block text-[8px] font-black uppercase text-slate-500 mb-1">Status</span>
                    <span className="text-xs font-black uppercase tracking-widest text-cyan-400">Locked @ 2 Parameters</span>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <div className="mb-12 bg-white rounded-[3rem] p-10 md:p-16 text-slate-900 shadow-2xl relative overflow-hidden border border-slate-200">
         <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px] -mr-48 -mt-48 pointer-events-none"></div>
         
         <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
               <span className="inline-block px-4 py-1.5 bg-slate-100 border border-slate-200 text-slate-500 rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-4 italic">Load Profile Result</span>
               <h2 className="text-6xl font-black tracking-tight italic uppercase leading-none">
                  {parseFloat(p) > 1000 ? "High" : "Standard"} <span className="text-cyan-600">Dissipation</span>
               </h2>
               <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em] italic max-w-sm">Current circuit parameters indicate a load of {p} Watts across a {r} Ohm resistor.</p>
            </div>
            
            <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-6">
               <div className="p-6 bg-slate-50 border border-slate-100 rounded-[2rem] text-center">
                  <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 italic">Energy / Sec</span>
                  <span className="text-3xl font-black italic">{p} J/s</span>
               </div>
               <div className="p-6 bg-slate-50 border border-slate-100 rounded-[2rem] text-center">
                  <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 italic">Flux Density</span>
                  <span className="text-3xl font-black italic">{i} C/s</span>
               </div>
               <div className="p-6 bg-cyan-600 text-white rounded-[2rem] text-center shadow-lg shadow-cyan-900/20 col-span-2 md:col-span-1">
                  <span className="block text-[9px] font-black uppercase tracking-widest mb-2 italic opacity-70">Efficiency</span>
                  <span className="text-3xl font-black italic">100% (IDEAL)</span>
               </div>
            </div>
         </div>
      </div>

      <CalculatorSEO
        title={ohmsData.title}
        whatIsIt={ohmsData.whatIsIt}
        formula={ohmsData.formula}
        example={ohmsData.example}
        useCases={ohmsData.useCases}
        faqs={ohmsData.faqs}
        deepDive={ohmsData.deepDive}
        glossary={ohmsData.glossary}
        relatedCalculators={[
          {
            name: "Power Calculator",
            path: "/power-calculator/",
            desc: "Advanced analysis of mechanical and electrical power systems.",
          },
          {
            name: "Voltage Drop",
            path: "/voltage-drop-calculator/",
            desc: "Calculate loss of potential across long cable runs based on resistance.",
          },
          {
            name: "Force",
            path: "/force-calculator/",
            desc: "Analyze traditional Newtonian interactions between mass and motion.",
          },
          {
            name: "Scientific",
            path: "/scientific-calculator/",
            desc: "Perform advanced mathematical operations for engineering research.",
          }
        ]}
      />
    </div>
  );
}
