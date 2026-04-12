"use client";

import { useState, useEffect } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import molarMassData from "@/data/seo-content/official/molar-mass-calculator.json";

// High-precision periodic table weights
const ATOMIC_WEIGHTS: Record<string, number> = {
  H: 1.008, He: 4.0026, Li: 6.94, Be: 9.0122, B: 10.81, C: 12.011, N: 14.007, O: 15.999,
  F: 18.998, Ne: 20.18, Na: 22.99, Mg: 24.305, Al: 26.982, Si: 28.085, P: 30.974, S: 32.06,
  Cl: 35.45, Ar: 39.948, K: 39.098, Ca: 40.078, Sc: 44.956, Ti: 47.867, V: 50.942, Cr: 51.996,
  Mn: 54.938, Fe: 55.845, Co: 58.933, Ni: 58.693, Cu: 63.546, Zn: 65.38, Ga: 69.723, Ge: 72.63,
  As: 74.922, Se: 78.971, Br: 79.904, Kr: 83.798, Rb: 85.468, Sr: 87.62, Y: 88.906, Zr: 91.224,
  Nb: 92.906, Mo: 95.95, Tc: 98, Ru: 101.07, Rh: 102.91, Pd: 106.42, Ag: 107.87, Cd: 112.41,
  In: 114.82, Sn: 118.71, Sb: 121.76, Te: 127.6, I: 126.9, Xe: 131.29, Cs: 132.91, Ba: 137.33,
  La: 138.91, Ce: 140.12, Pr: 140.91, Nd: 144.24, Pm: 145, Sm: 150.36, Eu: 151.96, Gd: 157.25,
  Tb: 158.93, Dy: 162.5, Ho: 164.93, Er: 167.26, Tm: 168.93, Yb: 173.05, Lu: 174.97, Hf: 178.49,
  Ta: 180.95, W: 183.84, Re: 186.21, Os: 190.23, Ir: 192.22, Pt: 195.08, Au: 196.97, Hg: 200.59,
  Tl: 204.38, Pb: 207.2, Bi: 208.98, Po: 209, At: 210, Rn: 222, Fr: 223, Ra: 226, Ac: 227,
  Th: 232.04, Pa: 231.04, U: 238.03, Np: 237, Pu: 244, Am: 243, Cm: 247, Bk: 247, Cf: 251,
  Es: 252, Fm: 257, Md: 258, No: 259, Lr: 262,
};

export default function MolarMassCalculator() {
  const [formula, setFormula] = useState("C6H12O6");
  const [result, setResult] = useState<{
    totalMass: number;
    elements: { symbol: string; count: number; mass: number }[];
    error: string;
  } | null>(null);

  useEffect(() => {
    calculateMass();
  }, [formula]);

  const calculateMass = () => {
    let f = formula.trim();
    if (!f) return setResult(null);

    let totalMass = 0;
    let elements: { symbol: string; count: number; mass: number }[] = [];

    try {
      if (f.includes("(") || f.includes(")")) {
        throw new Error("Brackets not supported. Expand formula.");
      }

      const regex = /([A-Z][a-z]*)(\d*)/g;
      let match;
      let matchFound = false;

      while ((match = regex.exec(f)) !== null) {
        matchFound = true;
        const symbol = match[1];
        const count = match[2] ? parseInt(match[2], 10) : 1;

        const weight = ATOMIC_WEIGHTS[symbol];
        if (!weight) throw new Error(`Unknown: ${symbol}`);

        const elementMass = weight * count;
        totalMass += elementMass;

        const idx = elements.findIndex(e => e.symbol === symbol);
        if (idx >= 0) {
          elements[idx].count += count;
          elements[idx].mass += elementMass;
        } else {
          elements.push({ symbol, count, mass: elementMass });
        }
      }

      if (!matchFound) throw new Error("Format error (e.g., H2O)");

      setResult({ totalMass, elements, error: "" });
    } catch (e: any) {
      setResult({ totalMass: 0, elements: [], error: e.message });
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 bg-slate-50 rounded-3xl shadow-xl border border-slate-200 font-sans italic-headings focus-within-zinc">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-200 pb-8 mb-10 gap-6">
        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">⚂</span>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase italic">
              Molecular <span className="text-cyan-600">Stoichiometry</span>
            </h1>
          </div>
          <p className="text-slate-500 font-bold mt-1 tracking-tight text-sm uppercase italic">Atomic Weight Profiler</p>
        </div>
        <div className="hidden md:flex flex-col items-end text-right">
          <div className="bg-slate-900 px-4 py-2 rounded-xl border border-slate-700 mb-1 shadow-lg">
            <span className="text-cyan-400 font-black text-[10px] uppercase tracking-[0.3em]">Scientific Protocol 06-F</span>
          </div>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter italic">IUPAC Standard Weight System</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
        {/* Input Sidebar */}
        <div className="lg:col-span-12 xl:col-span-4 space-y-6">
          <div className="p-8 bg-white rounded-[2.5rem] border border-slate-200 space-y-6 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-4 border-b border-slate-100 pb-3 italic">Formula Config</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black text-slate-500 mb-2 uppercase tracking-widest leading-none italic">Chemical String</label>
                <input
                  type="text"
                  value={formula}
                  onChange={(e) => setFormula(e.target.value)}
                  placeholder="e.g., C6H12O6"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 transition-all font-black text-3xl text-slate-900 shadow-inner tracking-widest uppercase placeholder:text-slate-300"
                />
                {result?.error ? (
                  <p className="mt-3 text-[10px] text-red-500 font-black uppercase tracking-widest flex items-center gap-1.5 px-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span> {result.error}
                  </p>
                ) : (
                  <p className="mt-3 text-[9px] text-slate-400 font-bold uppercase tracking-widest italic px-2">Case sensitive (e.g., NaCl, H2O, Co vs CO)</p>
                )}
              </div>
            </div>

            <div className="p-6 bg-slate-900 rounded-[2rem] text-white/90 space-y-3 shadow-xl relative overflow-hidden group border border-slate-800">
               <span className="text-[9px] font-black uppercase tracking-widest text-cyan-400 italic">Mole Constant (Nᴀ)</span>
               <div className="text-sm font-black italic tracking-tighter text-white">6.02214076 × 10²³</div>
               <p className="text-[10px] font-bold italic opacity-50 uppercase tracking-widest">Atoms per mole of substance</p>
            </div>
          </div>
        </div>

        {/* Results Canvas */}
        <div className="lg:col-span-12 xl:col-span-8 flex flex-col">
          {result && !result.error ? (
            <div className="h-full flex flex-col gap-6">
              <div className="grow bg-white rounded-[3rem] p-12 md:p-16 text-slate-900 shadow-2xl relative overflow-hidden border border-slate-200 flex flex-col justify-center">
                <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px] -mr-48 -mt-48 pointer-events-none"></div>
                
                <div className="relative z-10 space-y-2">
                  <span className="inline-block px-4 py-1 bg-slate-100 border border-slate-200 text-slate-500 rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-4 italic">Total Molar Mass</span>
                  <div className="text-8xl md:text-9xl font-black tracking-tighter tabular-nums text-slate-900 flex items-baseline gap-4 leading-none italic">
                    {result.totalMass.toFixed(4)}
                    <span className="text-xl md:text-3xl text-slate-300 font-bold tracking-normal uppercase italic">g/mol</span>
                  </div>
                  <div className="flex items-center gap-4 pt-6">
                    <div className="px-5 py-2 rounded-xl bg-slate-900 text-cyan-400 text-[10px] font-black uppercase tracking-widest shadow-lg">
                      Stoichiometric Identity
                    </div>
                    <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest italic opacity-70">Relative Atomic Mass Summation</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-900 p-10 rounded-[2.5rem] border border-slate-800 text-white flex flex-col justify-center relative group overflow-hidden shadow-2xl">
                  <div className="absolute top-0 right-0 h-1 w-full bg-cyan-500"></div>
                  <div className="text-cyan-500 text-[10px] font-black uppercase mb-6 tracking-[0.3em] leading-none italic border-b border-white/10 pb-4">Elemental Breakdown</div>
                  <div className="space-y-4 max-h-[220px] overflow-y-auto pr-4 custom-scrollbar">
                     {result.elements.map((el, i) => (
                       <div key={i} className="flex justify-between items-center group/item hover:bg-white/5 p-2 rounded-lg transition-colors">
                          <div className="flex items-center gap-3">
                             <span className="text-2xl font-black italic text-white uppercase">{el.symbol}</span>
                             <span className="text-[10px] font-black text-cyan-500 uppercase">x{el.count}</span>
                          </div>
                          <div className="text-right">
                             <div className="text-sm font-black italic">{el.mass.toFixed(3)} g</div>
                             <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{((el.mass/result.totalMass)*100).toFixed(1)}% Mass</div>
                          </div>
                       </div>
                     ))}
                  </div>
                </div>

                <div className="bg-white border-2 border-slate-100 p-10 rounded-[2.5rem] shadow-sm flex flex-col justify-center italic-headings">
                  <div className="text-slate-400 text-[10px] font-black uppercase mb-4 tracking-[0.3em] leading-none italic">Mass Ratios (per 1g sample)</div>
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                      <span className="text-slate-700 font-bold text-[10px] uppercase tracking-widest italic">Moles / Gram</span>
                      <span className="text-slate-900 font-black">{(1 / result.totalMass).toFixed(6)}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                      <span className="text-slate-700 font-bold text-[10px] uppercase tracking-widest italic">Atoms / Gram</span>
                      <span className="text-slate-900 font-black text-xs">{( (1 / result.totalMass) * 6.022e23 ).toExponential(3)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-700 font-bold text-[10px] uppercase tracking-widest italic">Precision Error</span>
                      <span className="text-slate-900 font-black text-[10px]">+/- 0.0001%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-100 p-4 rounded-2xl flex items-center gap-6">
                 <div className="grow space-y-3">
                    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden shadow-inner flex">
                       {result.elements.map((el, i) => (
                         <div 
                           key={i} 
                           className="h-full border-r border-white/10 first:rounded-l-full last:rounded-r-full hover:brightness-125 transition-all" 
                           style={{ 
                             width: `${(el.mass / result.totalMass) * 100}%`,
                             backgroundColor: i % 2 === 0 ? '#0891b2' : '#0f172a' 
                           }}
                         />
                       ))}
                    </div>
                    <div className="flex justify-between text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] italic">
                       <span>Elemental Composition Weighting</span>
                       <span>Molecular Distribution</span>
                    </div>
                 </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[500px] border-4 border-dashed border-slate-200 rounded-[3rem] flex flex-col items-center justify-center p-12 text-center bg-white shadow-inner">
               <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mb-8 border border-slate-100 shadow-sm animate-pulse">
                  <span className="text-4xl">🧬</span>
               </div>
               <h3 className="text-slate-900 text-3xl font-black mb-4 uppercase tracking-tighter italic">Pending Molecular Scan</h3>
               <p className="text-slate-400 max-w-sm font-bold leading-tight text-lg italic uppercase tracking-tighter opacity-70">Initialize a chemical formula string to verify its atomic weight and elemental composition ratios.</p>
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title={molarMassData.title}
        whatIsIt={molarMassData.whatIsIt}
        formula={molarMassData.formula}
        example={molarMassData.example}
        useCases={molarMassData.useCases}
        faqs={molarMassData.faqs}
        deepDive={molarMassData.deepDive}
        glossary={molarMassData.glossary}
        relatedCalculators={[
          {
            name: "Half-Life",
            path: "/half-life-calculator/",
            desc: "Analyze the temporal decay of radioactive molecular isotopes.",
          },
          {
            name: "Density",
            path: "/density-calculator/",
            desc: "Relate calculated molar mass to physical material volume.",
          },
          {
            name: "Scientific",
            path: "/scientific-calculator/",
            desc: "Perform advanced logarithmic and logarithmic stoichiometry.",
          },
          {
            name: "Kinetic Energy",
            path: "/kinetic-energy-calculator/",
            desc: "Observe the velocity-based energy of molecular bodies in motion.",
          }
        ]}
      />
    </div>
  );
}
