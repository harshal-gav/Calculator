"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import cubicSeoData from "@/data/seo-content/official/cubic-equation-calculator.json";

export default function CubicEquationCalculator() {
  const [aVal, setAVal] = useState("1");
  const [bVal, setBVal] = useState("-6");
  const [cVal, setCVal] = useState("11");
  const [dVal, setDVal] = useState("-6");

  const [result, setResult] = useState<{
    roots: string[];
  } | null>(null);

  const calculate = () => {
    const a = parseFloat(aVal);
    const b = parseFloat(bVal);
    const c = parseFloat(cVal);
    const d = parseFloat(dVal);

    if (isNaN(a) || isNaN(b) || isNaN(c) || isNaN(d) || a === 0) {
      setResult(null);
      return;
    }

    // Cubic formula using Cardano's method
    const C = b / a;
    const D = c / a;
    const E = d / a;

    const p = (3 * D - C * C) / 3;
    const q = (2 * C * C * C - 9 * C * D + 27 * E) / 27;

    const disc = (q * q) / 4 + (p * p * p) / 27;

    let roots = [];
    const C3 = C / 3;

    if (Math.abs(disc) < 1e-10) {
      if (Math.abs(p) < 1e-10) {
        roots.push((-C3).toString());
        roots.push((-C3).toString());
        roots.push((-C3).toString());
      } else {
        const y1 = (3 * q) / p;
        const y2 = (-3 * q) / (2 * p);
        roots.push((y1 - C3).toFixed(4));
        roots.push((y2 - C3).toFixed(4));
        roots.push((y2 - C3).toFixed(4));
      }
    } else if (disc > 0) {
      const u = Math.cbrt(-q / 2 + Math.sqrt(disc));
      const v = Math.cbrt(-q / 2 - Math.sqrt(disc));

      const y1 = u + v;
      const yReal = -0.5 * (u + v) - C3;
      const yImag = (Math.sqrt(3) / 2) * (u - v);

      roots.push((y1 - C3).toFixed(4));

      const imagStr = Math.abs(yImag).toFixed(4);
      roots.push(`${yReal.toFixed(4)} + ${imagStr}i`);
      roots.push(`${yReal.toFixed(4)} - ${imagStr}i`);
    } else {
      const r = Math.sqrt(-(p * p * p) / 27);
      const phi = Math.acos(-q / (2 * r));

      const sqrtP = Math.sqrt(-p / 3);
      const y1 = 2 * sqrtP * Math.cos(phi / 3);
      const y2 = 2 * sqrtP * Math.cos((phi + 2 * Math.PI) / 3);
      const y3 = 2 * sqrtP * Math.cos((phi + 4 * Math.PI) / 3);

      roots.push((y1 - C3).toFixed(4));
      roots.push((y2 - C3).toFixed(4));
      roots.push((y3 - C3).toFixed(4));
    }

    setResult({ roots: roots });
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-3xl shadow-xl border border-rose-50">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-rose-100 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Cubic Equation Solver</h1>
          <p className="text-slate-600 font-medium mt-1 text-lg">Calculate all real and complex roots for 3rd-degree polynomials.</p>
        </div>
        <div className="bg-rose-50 px-4 py-2 rounded-full border border-rose-100 shrink-0">
          <span className="text-rose-600 font-bold text-sm uppercase tracking-wider font-mono">Algebra</span>
        </div>
      </div>

      <div className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-rose-100 mb-12">
        <div className="flex flex-wrap md:flex-nowrap gap-4 items-center justify-center mb-8 bg-zinc-50 p-6 md:p-8 rounded-2xl border border-zinc-200 shadow-inner">
          <div className="flex items-center gap-2">
            <div className="relative">
              <span className="absolute -top-3 left-2 bg-white px-1 text-[8px] font-bold text-zinc-400 uppercase">a</span>
              <input
                type="number"
                step="any"
                value={aVal}
                onChange={(e) => setAVal(e.target.value)}
                className="w-20 text-center rounded-xl py-3 border-zinc-200 outline-none shadow-sm font-black text-xl focus:border-rose-500 bg-white transition-all"
              />
            </div>
            <span className="font-black text-rose-300 text-2xl font-serif">x³</span>
            <span className="text-zinc-300 font-black">+</span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="relative">
              <span className="absolute -top-3 left-2 bg-white px-1 text-[8px] font-bold text-zinc-400 uppercase">b</span>
              <input
                type="number"
                step="any"
                value={bVal}
                onChange={(e) => setBVal(e.target.value)}
                className="w-20 text-center rounded-xl py-3 border-zinc-200 outline-none shadow-sm font-black text-xl focus:border-rose-500 bg-white transition-all"
              />
            </div>
            <span className="font-black text-rose-300 text-2xl font-serif">x²</span>
            <span className="text-zinc-300 font-black">+</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <span className="absolute -top-3 left-2 bg-white px-1 text-[8px] font-bold text-zinc-400 uppercase">c</span>
              <input
                type="number"
                step="any"
                value={cVal}
                onChange={(e) => setCVal(e.target.value)}
                className="w-20 text-center rounded-xl py-3 border-zinc-200 outline-none shadow-sm font-black text-xl focus:border-rose-500 bg-white transition-all"
              />
            </div>
            <span className="font-black text-rose-300 text-2xl font-serif">x</span>
            <span className="text-zinc-300 font-black">+</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <span className="absolute -top-3 left-2 bg-white px-1 text-[8px] font-bold text-zinc-400 uppercase">d</span>
              <input
                type="number"
                step="any"
                value={dVal}
                onChange={(e) => setDVal(e.target.value)}
                className="w-20 text-center rounded-xl py-3 border-zinc-200 outline-none shadow-sm font-black text-xl focus:border-rose-500 bg-white transition-all"
              />
            </div>
            <span className="font-black text-zinc-400 text-2xl ml-2">= 0</span>
          </div>
        </div>

        <button
          onClick={calculate}
          className="w-full bg-rose-600 text-white font-black py-5 px-4 rounded-2xl hover:bg-rose-700 transition shadow-xl shadow-rose-200 text-xl uppercase tracking-widest active:scale-[0.98] max-w-lg mx-auto block"
        >
          Evaluate Roots
        </button>
      </div>

      {result !== null ? (
        <div className="bg-slate-900 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden flex flex-col items-center text-center border border-white/5 mb-12">
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

          <h2 className="text-rose-400 font-bold uppercase tracking-widest text-xs mb-8 z-10 opacity-60">
            Polynomial Intercepts (Roots)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl z-10 relative">
            {result.roots.map((root, i) => (
              <div
                key={i}
                className={`bg-white/5 p-8 rounded-2xl text-center group transition-all duration-300 
                  ${root.includes('i') ? 'border-rose-500/30 shadow-[0_0_15px_rgba(244,63,94,0.15)]' : 'border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]'}`}
              >
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${root.includes('i') ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-300'}`}>
                    Root {i + 1}
                  </span>
                  {root.includes('i') && <span className="bg-rose-500 text-white text-[8px] font-bold px-1.5 rounded uppercase tracking-wider">Complex</span>}
                </div>
                <div className="font-mono text-white font-black text-2xl md:text-3xl tracking-tight break-all">
                  {root}
                </div>
              </div>
            ))}
          </div>
          <div className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mt-8">Evaluated via Cardano Method</div>
        </div>
      ) : (
          <div className="bg-slate-900 rounded-3xl p-8 shadow-inner flex flex-col items-center justify-center min-h-[300px] border border-white/5 mb-12 relative overflow-hidden">
             <div className="text-rose-500/20 font-black text-8xl font-serif">x³</div>
             <div className="text-rose-200/40 uppercase tracking-widest font-bold text-sm mt-4">Input coefficients to solve intercepts.</div>
          </div>
      )}

      <CalculatorSEO
        title={cubicSeoData.title}
        whatIsIt={cubicSeoData.whatIsIt}
        formula={cubicSeoData.formula}
        example={cubicSeoData.example}
        useCases={cubicSeoData.useCases}
        faqs={cubicSeoData.faqs}
        deepDive={cubicSeoData.deepDive}
        glossary={cubicSeoData.glossary}
        relatedCalculators={[
          {
            name: "Quadratic Formula Calculator",
            path: "/quadratic-formula-calculator/",
            desc: "Solve second-degree polynomials (parabolas) using the standard quadratic formula.",
          },
          {
            name: "Order of Operations Calculator",
            path: "/order-of-operations-calculator/",
            desc: "Ensure your cubic coefficients were calculated in the correct PEMDAS order.",
          },
          {
            name: "Scientific Calculator",
            path: "/scientific-calculator/",
            desc: "For manual verification of your complex and imaginary roots.",
          },
          {
            name: "Log Calculator",
            path: "/log-calculator/",
            desc: "Solve logarithmic transformations related to algebra.",
          }
        ]}
      />
    </div>
  );
}
