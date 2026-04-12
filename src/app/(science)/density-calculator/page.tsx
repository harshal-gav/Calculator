"use client";

import { useState, useEffect } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import densityData from "@/data/seo-content/official/density-calculator.json";

export default function DensityCalculator() {
  const [mass, setMass] = useState("500");
  const [volume, setVolume] = useState("63.3");
  const [massUnit, setMassUnit] = useState("g");
  const [volumeUnit, setVolumeUnit] = useState("cm³");

  const [result, setResult] = useState<{
    density: number;
    specificGravity: number;
    buoyancy: "Float" | "Sink" | "Neutral";
  } | null>(null);

  useEffect(() => {
    calculateDensity();
  }, [mass, volume, massUnit, volumeUnit]);

  const calculateDensity = () => {
    let m = parseFloat(mass) || 0;
    let v = parseFloat(volume) || 0;

    if (m > 0 && v > 0) {
      // Density in g/cm³ (Standard base)
      const d = m / v;
      
      // specific gravity relative to water (1.0 g/cm³)
      const sg = d / 1.0;
      
      let b: "Float" | "Sink" | "Neutral" = "Sink";
      if (sg < 1) b = "Float";
      else if (sg === 1) b = "Neutral";

      setResult({
        density: d,
        specificGravity: sg,
        buoyancy: b
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
            <span className="text-3xl">🧪</span>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase">
              Density <span className="text-cyan-600">Analyzer</span>
            </h1>
          </div>
          <p className="text-slate-500 font-bold mt-1 tracking-tight text-sm uppercase">Molecular Compactness Matrix</p>
        </div>
        <div className="hidden md:flex flex-col items-end text-right">
          <div className="bg-slate-900 px-4 py-2 rounded-xl border border-slate-700 mb-1 shadow-lg">
            <span className="text-cyan-400 font-black text-[10px] uppercase tracking-[0.3em]">Scientific Protocol 02-B</span>
          </div>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Mass-to-Volume Ratio Validation</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
        {/* Input Sidebar */}
        <div className="lg:col-span-12 xl:col-span-4 space-y-6">
          <div className="p-8 bg-white rounded-[2.5rem] border border-slate-200 space-y-6 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-4 border-b border-slate-100 pb-3">Material Data</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black text-slate-500 mb-2 uppercase tracking-widest leading-none text-right">Mass ({massUnit})</label>
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
                    <option value="g">g</option>
                    <option value="kg">kg</option>
                    <option value="lb">lb</option>
                    <option value="oz">oz</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-500 mb-2 uppercase tracking-widest leading-none text-right">Volume ({volumeUnit})</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 transition-all font-black text-2xl text-slate-900 shadow-inner"
                  />
                  <select 
                    value={volumeUnit} 
                    onChange={(e) => setVolumeUnit(e.target.value)}
                    className="w-20 bg-white border border-slate-200 rounded-2xl px-3 font-bold text-xs"
                  >
                    <option value="cm³">cm³</option>
                    <option value="m³">m³</option>
                    <option value="L">L</option>
                    <option value="mL">mL</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              onClick={calculateDensity}
              className="w-full bg-slate-900 hover:bg-black text-cyan-400 font-black py-5 rounded-2xl shadow-xl transition-all uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-3 border border-slate-700"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span> Identify Material
            </button>
          </div>

          <div className="p-8 bg-slate-100 rounded-[2.5rem] border border-slate-200 space-y-4">
             <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Standard Reference</span>
                <span className="text-[10px] font-black text-cyan-600 uppercase tracking-widest leading-none">H₂O @ 4°C</span>
             </div>
             <div className="space-y-2">
                <div className="flex justify-between text-[11px] font-bold text-slate-600 italic">
                   <span>Water Density</span>
                   <span>1.0 g/cm³</span>
                </div>
                <div className="flex justify-between text-[11px] font-bold text-slate-600 italic">
                   <span>Air Density</span>
                   <span>0.0012 g/cm³</span>
                </div>
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
                  <span className="inline-block px-4 py-1 bg-slate-100 border border-slate-200 text-slate-500 rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-4">Calculated Density</span>
                  <div className="text-8xl md:text-9xl font-black tracking-tighter tabular-nums text-slate-900 flex items-baseline gap-4">
                    {result.density.toFixed(3)}
                    <span className="text-xl md:text-3xl text-slate-300 font-bold tracking-normal uppercase italic">g/cm³</span>
                  </div>
                  <div className="flex items-center gap-4 pt-4">
                    <div className={`px-4 py-2 rounded-xl text-white text-[10px] font-black uppercase tracking-widest shadow-lg ${result.buoyancy === 'Sink' ? 'bg-slate-900 shadow-slate-900/20' : 'bg-cyan-600 shadow-cyan-900/20'}`}>
                      Status: {result.buoyancy}s
                    </div>
                    <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest italic opacity-70">Specific Gravity: {result.specificGravity.toFixed(4)}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-900 p-10 rounded-[2.5rem] border border-slate-800 text-white flex flex-col justify-center relative group overflow-hidden shadow-2xl">
                  <div className="absolute top-0 right-0 h-1 w-full bg-cyan-500"></div>
                  <div className="text-cyan-500 text-[10px] font-black uppercase mb-4 tracking-[0.3em] leading-none">Buoyancy Potential</div>
                  <div className="flex items-center gap-4">
                     <span className="text-5xl">{result.buoyancy === 'Float' ? '🚢' : '⚓'}</span>
                     <div className="flex flex-col">
                        <span className="text-2xl font-black italic uppercase leading-tight tracking-tighter">{result.buoyancy === 'Float' ? 'Buoyant' : 'Negatively Buoyant'}</span>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-tight mt-1">Displaces {result.buoyancy === 'Float' ? 'more' : 'less'} fluid weight</p>
                     </div>
                  </div>
                </div>

                <div className="bg-white border-2 border-slate-100 p-10 rounded-[2.5rem] shadow-sm flex flex-col justify-center">
                  <div className="text-slate-400 text-[10px] font-black uppercase mb-4 tracking-[0.3em] leading-none">Universal Equivalents</div>
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                      <span className="text-slate-700 font-bold text-[10px] uppercase tracking-widest">kg/m³</span>
                      <span className="text-slate-900 font-black">{(result.density * 1000).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                      <span className="text-slate-700 font-bold text-[10px] uppercase tracking-widest">lb/ft³</span>
                      <span className="text-slate-900 font-black">{(result.density * 62.427).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-700 font-bold text-[10px] uppercase tracking-widest">lb/gallon</span>
                      <span className="text-slate-900 font-black">{(result.density * 8.345).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-200/50 p-3 rounded-2xl flex items-center gap-4">
                <div className="h-2 grow bg-slate-300 rounded-full overflow-hidden shadow-inner flex">
                   <div className="h-full bg-cyan-600 shadow-[0_0_20px_rgba(8,145,178,0.5)] transition-all duration-1000" style={{ width: `${Math.min(100, result.specificGravity * 20)}%` }}></div>
                </div>
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest w-24 text-right">Relative Density</div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[500px] border-4 border-dashed border-slate-200 rounded-[3rem] flex flex-col items-center justify-center p-12 text-center bg-white">
               <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mb-8 border border-slate-100 shadow-sm animate-pulse">
                  <span className="text-4xl">💎</span>
               </div>
               <h3 className="text-slate-900 text-3xl font-black mb-4 uppercase tracking-tighter">Initialize Mass Scan</h3>
               <p className="text-slate-400 max-w-xs font-bold leading-tight text-lg italic uppercase tracking-tighter opacity-70">Define the physical mass and volume of your object to reveal its structural code.</p>
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title={densityData.title}
        whatIsIt={densityData.whatIsIt}
        formula={densityData.formula}
        example={densityData.example}
        useCases={densityData.useCases}
        faqs={densityData.faqs}
        deepDive={densityData.deepDive}
        glossary={densityData.glossary}
        relatedCalculators={[
          {
            name: "Molar Mass",
            path: "/molar-mass-calculator/",
            desc: "Determine the atomic weight and density of molecular compounds.",
          },
          {
            name: "Volume",
            path: "/volume-calculator/",
            desc: "Calculate the cubic space occupied by standard 3D shapes.",
          },
          {
            name: "Acceleration",
            path: "/acceleration-calculator/",
            desc: "Analyze how forces interact with mass to create physical motion.",
          },
          {
            name: "Power",
            path: "/power-calculator/",
            desc: "Measure the rate of energy transfer and work in mechanical systems.",
          }
        ]}
      />
    </div>
  );
}
