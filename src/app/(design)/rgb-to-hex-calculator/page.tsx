"use client";

import { useState, useEffect } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import colorData from "@/data/seo-content/official/rgb-to-hex-calculator.json";

export default function RgbToHexCalculator() {
  const [r, setR] = useState(79);
  const [g, setG] = useState(70);
  const [b, setB] = useState(229);
  const [hex, setHex] = useState("#4f46e5");

  const componentToHex = (c: number) => {
    const h = c.toString(16).toUpperCase();
    return h.length === 1 ? "0" + h : h;
  };

  useEffect(() => {
    const h = "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    setHex(h);
  }, [r, g, b]);

  const handleHexChange = (val: string) => {
    const cleaned = val.replace("#", "");
    if (cleaned.length === 6) {
      const nr = parseInt(cleaned.substring(0, 2), 16);
      const ng = parseInt(cleaned.substring(2, 4), 16);
      const nb = parseInt(cleaned.substring(4, 6), 16);
      if (!isNaN(nr) && !isNaN(ng) && !isNaN(nb)) {
        setR(nr);
        setG(ng);
        setB(nb);
      }
    }
    setHex(val.startsWith("#") ? val : "#" + val);
  };

  const Slider = ({ label, value, setter, color }: { label: string, value: number, setter: any, color: string }) => (
    <div className="space-y-4">
      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest italic leading-none">
        <span className="text-slate-400">{label} CHANNEL</span>
        <span className="text-slate-900 font-black px-2 py-1 bg-slate-100 rounded-lg">{value}</span>
      </div>
      <input 
        type="range" 
        min="0" 
        max="255" 
        value={value} 
        onChange={(e) => setter(parseInt(e.target.value))}
        className={`w-full h-2 rounded-lg appearance-none cursor-pointer accent-${color}-500 bg-slate-100`}
      />
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(79,70,229,0.1)] border border-indigo-50 font-sans">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-indigo-50 pb-8 mb-10 gap-6">
        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-tr from-red-500 via-green-500 to-blue-500 rounded-xl flex items-center justify-center text-white font-black text-xs shadow-lg">RGB</div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase italic">
              Chromatic <span className="text-indigo-600 font-black">Hex Resolver</span>
            </h1>
          </div>
          <p className="text-slate-400 font-bold mt-1 tracking-tight text-sm uppercase italic">Color Space Encoding Engine</p>
        </div>
        <div className="hidden md:flex flex-col items-end text-right">
          <div className="bg-slate-900 px-4 py-2 rounded-xl border border-slate-700 mb-1 shadow-lg">
            <span className="text-indigo-300 font-black text-[10px] uppercase tracking-[0.3em]">Design Protocol 8.4</span>
          </div>
          <span className="text-[10px] text-slate-300 font-bold uppercase tracking-tighter italic">24-Bit True-Color Logic</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
        {/* Color Preview Canvas */}
        <div className="lg:col-span-12 xl:col-span-5 flex flex-col">
           <div 
             className="grow min-h-[400px] rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col justify-end p-10 border border-slate-100 transition-colors duration-300"
             style={{ backgroundColor: hex }}
           >
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
              
              <div className="relative z-10 space-y-2">
                 <span className="text-[10px] font-black text-white/60 uppercase tracking-[0.4em] italic mb-2 block leading-none">Processed Identity</span>
                 <div className="text-6xl md:text-7xl font-black text-white italic tracking-tighter leading-none mb-4 uppercase drop-shadow-lg">{hex}</div>
                 <div className="flex gap-2">
                    <button 
                      onClick={() => navigator.clipboard.writeText(hex)}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-xl text-[10px] font-black uppercase text-white tracking-widest transition-all"
                    >
                      Copy HEX
                    </button>
                    <button 
                      onClick={() => navigator.clipboard.writeText(`rgb(${r}, ${g}, ${b})`)}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-xl text-[10px] font-black uppercase text-white tracking-widest transition-all"
                    >
                      Copy RGB
                    </button>
                 </div>
              </div>
              
              <div className="absolute top-8 right-8 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full border border-white/30 flex items-center justify-center">
                 <div className="w-4 h-4 rounded-full" style={{ backgroundColor: hex }}></div>
              </div>
           </div>
        </div>

        {/* Input Controls */}
        <div className="lg:col-span-12 xl:col-span-7 flex flex-col gap-6">
           <div className="bg-slate-50 border border-slate-200 rounded-[3rem] p-10 flex flex-col justify-center space-y-10 shadow-inner">
              <div className="grid grid-cols-1 md:grid-cols-1 gap-10">
                 <Slider label="Red" value={r} setter={setR} color="red" />
                 <Slider label="Green" value={g} setter={setG} color="green" />
                 <Slider label="Blue" value={b} setter={setB} color="blue" />
              </div>

              <div className="pt-8 border-t border-slate-200">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block italic mb-4 text-center">Direct HEX Edit</label>
                 <div className="max-w-xs mx-auto relative group">
                    <input 
                      type="text" 
                      value={hex}
                      onChange={(e) => handleHexChange(e.target.value)}
                      className="w-full bg-white border-2 border-slate-100 rounded-2xl px-8 py-5 font-black text-4xl text-center text-indigo-600 focus:border-indigo-500 shadow-sm uppercase tracking-tighter outline-none transition-all"
                    />
                    <div className="absolute inset-0 rounded-2xl ring-4 ring-indigo-500/5 opacity-0 group-focus-within:opacity-100 pointer-events-none transition-opacity"></div>
                 </div>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-indigo-900 rounded-[2.5rem] p-8 text-white flex flex-col justify-center shadow-xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl"></div>
                 <span className="text-[10px] font-black uppercase text-indigo-400 tracking-widest italic mb-2">CSS Definition</span>
                 <code className="text-sm font-bold text-indigo-200 leading-none">color: {hex};</code>
              </div>
              <div className="bg-white border-2 border-slate-100 rounded-[2.5rem] p-8 flex flex-col justify-center shadow-sm">
                 <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest italic mb-2">Tailwind Utility</span>
                 <code className="text-sm font-bold text-slate-600 leading-none">text-[{hex}]</code>
              </div>
           </div>
        </div>
      </div>

      <CalculatorSEO
        title={colorData.title}
        whatIsIt={colorData.whatIsIt}
        formula={colorData.formula}
        example={colorData.example}
        useCases={colorData.useCases}
        faqs={colorData.faqs}
        deepDive={colorData.deepDive}
        glossary={colorData.glossary}
        relatedCalculators={[
          {
            name: "Binary Calculator",
            path: "/binary-calculator/",
            desc: "Perform bitwise operations and base conversions for low-level digital processing.",
          },
          {
            name: "Percentage",
            path: "/percentage-calculator/",
            desc: "Calculate color intensity percentages and relative luminosity values.",
          },
          {
            name: "Word Counter",
            path: "/word-counter/",
            desc: "Analyze textual datasets for UI copy and accessibility documentation.",
          },
          {
            name: "Scientific",
            path: "/scientific-calculator/",
            desc: "Advanced mathematical modeling for color gamut and light wave analysis.",
          }
        ]}
      />
    </div>
  );
}
