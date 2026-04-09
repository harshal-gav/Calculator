"use client";

import { useState, useEffect } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import crossSeoData from "@/data/seo-content/official/cross-product-calculator.json";

export default function CrossProductCalculator() {
  const [u1, setU1] = useState("1");
  const [u2, setU2] = useState("2");
  const [u3, setU3] = useState("3");

  const [v1, setV1] = useState("4");
  const [v2, setV2] = useState("5");
  const [v3, setV3] = useState("6");

  const [result, setResult] = useState<{
    i: number;
    j: number;
    k: number;
    magnitude: number;
  } | null>(null);

  const calculate = () => {
    const numU1 = parseFloat(u1);
    const numU2 = parseFloat(u2);
    const numU3 = parseFloat(u3);
    const numV1 = parseFloat(v1);
    const numV2 = parseFloat(v2);
    const numV3 = parseFloat(v3);

    if (isNaN(numU1) || isNaN(numU2) || isNaN(numU3) || isNaN(numV1) || isNaN(numV2) || isNaN(numV3)) {
      setResult(null);
      return;
    }

    const cx = numU2 * numV3 - numU3 * numV2;
    const cy = numU3 * numV1 - numU1 * numV3;
    const cz = numU1 * numV2 - numU2 * numV1;
    const magnitude = Math.sqrt(cx * cx + cy * cy + cz * cz);

    setResult({ i: cx, j: cy, k: cz, magnitude });
  };

  useEffect(() => {
    calculate();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-3xl shadow-xl border border-violet-50">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-violet-100 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Cross Product Calculator</h1>
          <p className="text-slate-600 font-medium mt-1 text-lg">Calculate the orthogonal vector product of two 3D vectors.</p>
        </div>
        <div className="bg-violet-50 px-4 py-2 rounded-full border border-violet-100 shrink-0">
          <span className="text-violet-600 font-bold text-sm uppercase tracking-wider font-mono">Vector Algebra</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-12 xl:col-span-5 space-y-4">
          <div className="bg-white p-8 rounded-3xl border border-violet-100 shadow-sm space-y-8">
            <div className="space-y-4">
              <span className="block text-[10px] font-bold text-violet-400 uppercase tracking-widest border-l-2 border-violet-400 pl-2">Vector A (u)</span>
              <div className="grid grid-cols-3 gap-3">
                <input type="number" value={u1} onChange={(e) => setU1(e.target.value)} className="rounded-xl border-zinc-200 p-3 shadow-sm focus:border-violet-500 bg-zinc-50 font-black text-center" placeholder="x" />
                <input type="number" value={u2} onChange={(e) => setU2(e.target.value)} className="rounded-xl border-zinc-200 p-3 shadow-sm focus:border-violet-500 bg-zinc-50 font-black text-center" placeholder="y" />
                <input type="number" value={u3} onChange={(e) => setU3(e.target.value)} className="rounded-xl border-zinc-200 p-3 shadow-sm focus:border-violet-500 bg-zinc-50 font-black text-center" placeholder="z" />
              </div>
            </div>

            <div className="space-y-4">
              <span className="block text-[10px] font-bold text-fuchsia-400 uppercase tracking-widest border-l-2 border-fuchsia-400 pl-2">Vector B (v)</span>
              <div className="grid grid-cols-3 gap-3">
                <input type="number" value={v1} onChange={(e) => setV1(e.target.value)} className="rounded-xl border-zinc-200 p-3 shadow-sm focus:border-fuchsia-500 bg-zinc-50 font-black text-center" placeholder="x" />
                <input type="number" value={v2} onChange={(e) => setV2(e.target.value)} className="rounded-xl border-zinc-200 p-3 shadow-sm focus:border-fuchsia-500 bg-zinc-50 font-black text-center" placeholder="y" />
                <input type="number" value={v3} onChange={(e) => setV3(e.target.value)} className="rounded-xl border-zinc-200 p-3 shadow-sm focus:border-fuchsia-500 bg-zinc-50 font-black text-center" placeholder="z" />
              </div>
            </div>

            <button
              onClick={calculate}
              className="w-full bg-violet-600 text-white font-black py-5 px-4 rounded-2xl hover:bg-violet-700 transition shadow-xl shadow-violet-200 text-xl uppercase tracking-widest active:scale-[0.98]"
            >
              Solve Cross Product
            </button>
          </div>
        </div>

        <div className="lg:col-span-12 xl:col-span-7 bg-slate-900 rounded-3xl p-8 border border-white/5 shadow-2xl flex flex-col justify-center relative overflow-hidden min-h-[400px]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>
          
          {result !== null ? (
            <div className="relative z-10 w-full space-y-8">
              <div className="text-center">
                <h2 className="text-xs font-bold text-violet-400 mb-4 uppercase tracking-widest opacity-60">Resulting Orthogonal Vector (A × B)</h2>
                <div className="flex items-center justify-center gap-4 text-4xl md:text-6xl font-black text-white font-mono">
                  <span className="text-violet-300 drop-shadow-[0_0_15px_rgba(139,92,246,0.4)]">({result.i}, {result.j}, {result.k})</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/5 p-6 rounded-2xl border border-white/5 text-center">
                  <span className="block text-[10px] font-bold text-violet-300 uppercase tracking-widest mb-2">Vector Magnitude</span>
                  <span className="text-3xl font-black text-white font-mono">{result.magnitude.toLocaleString(undefined, { maximumFractionDigits: 4 })}</span>
                </div>
                <div className="bg-white/5 p-6 rounded-2xl border border-white/5 text-center flex flex-col justify-center">
                  <span className="block text-[10px] font-bold text-violet-300 uppercase tracking-widest mb-1">Notation</span>
                  <span className="text-xl font-bold text-white/80 font-mono">
                    {result.i}i + {result.j}j + {result.k}k
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-violet-500/30 bg-violet-500/10 text-center text-xs font-bold text-violet-300 uppercase tracking-widest">
                This vector is perpendicular to both Vector A and Vector B.
              </div>
            </div>
          ) : (
            <div className="text-center py-10 opacity-40 uppercase italic font-black text-4xl text-violet-400 tracking-tighter">
              Solve the Vector
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title={crossSeoData.title}
        whatIsIt={crossSeoData.whatIsIt}
        formula={crossSeoData.formula}
        example={crossSeoData.example}
        useCases={crossSeoData.useCases}
        faqs={crossSeoData.faqs}
        deepDive={crossSeoData.deepDive}
        glossary={crossSeoData.glossary}
        relatedCalculators={[
          {
            name: "Dot Product Calculator",
            path: "/dot-product-calculator/",
            desc: "Calculate the scalar product of two vectors for projection analysis.",
          },
          {
            name: "Vector Addition Calculator",
            path: "/vector-addition-calculator/",
            desc: "Find the resultant vector from multiple directional forces.",
          },
          {
            name: "Unit Vector Calculator",
            path: "/unit-vector-calculator/",
            desc: "Normalize your vectors to a magnitude of one for direction-only analysis.",
          },
          {
            name: "Triangle Calculator",
            path: "/triangle-calculator/",
            desc: "Solve geometric properties of cross-sectional triangle surfaces.",
          }
        ]}
      />
    </div>
  );
}
