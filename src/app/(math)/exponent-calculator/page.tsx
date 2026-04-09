"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import exponentSeoData from "@/data/seo-content/official/exponent-calculator.json";

export default function ExponentCalculator() {
  const [base, setBase] = useState("2");
  const [exponent, setExponent] = useState("8");

  const [result, setResult] = useState<{
    value: number;
    isInfinity: boolean;
  } | null>(null);

  const calculate = () => {
    const b = parseFloat(base);
    const e = parseFloat(exponent);

    if (isNaN(b) || isNaN(e)) {
      setResult(null);
      return;
    }

    const val = Math.pow(b, e);

    setResult({
      value: val,
      isInfinity: !isFinite(val),
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-3xl shadow-xl border border-violet-50">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-violet-100 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Exponent Calculator</h1>
          <p className="text-slate-600 font-medium mt-1 text-lg">Calculate powers, fractional exponents, and exponential growth directly.</p>
        </div>
        <div className="bg-violet-50 px-4 py-2 rounded-full border border-violet-100 shrink-0">
          <span className="text-violet-600 font-bold text-sm uppercase tracking-wider font-mono">Algebra</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-12 xl:col-span-5 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-violet-100 shadow-sm space-y-6">
            <div>
              <label className="block text-[10px] font-bold text-zinc-400 mb-2 uppercase tracking-widest text-center">Base (x)</label>
              <input
                type="number"
                step="any"
                value={base}
                onChange={(e) => setBase(e.target.value)}
                className="w-full rounded-2xl border-zinc-200 p-4 shadow-sm focus:border-violet-500 bg-zinc-50 font-black text-3xl text-center outline-none transition-all placeholder-zinc-300"
                placeholder="2"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-zinc-400 mb-2 uppercase tracking-widest text-center">Exponent / Power (n)</label>
              <input
                type="number"
                step="any"
                value={exponent}
                onChange={(e) => setExponent(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && calculate()}
                className="w-full rounded-2xl border-zinc-200 p-4 shadow-sm focus:border-violet-500 bg-zinc-50 font-black text-3xl text-center outline-none transition-all placeholder-zinc-300"
                placeholder="8"
              />
            </div>

            <button
              onClick={calculate}
              className="w-full bg-violet-600 text-white font-black py-5 px-4 rounded-2xl hover:bg-violet-700 transition shadow-xl shadow-violet-200 text-xl uppercase tracking-widest active:scale-[0.98]"
            >
              Evaluate Power
            </button>
          </div>
        </div>

        <div className="lg:col-span-12 xl:col-span-7 bg-slate-900 rounded-3xl p-8 border border-white/5 shadow-2xl flex flex-col justify-center relative overflow-hidden min-h-[400px]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>
          
          <div className="absolute top-8 left-8">
             <div className="text-white/20 font-mono text-5xl font-black">
                 ({base || "x"})<sup className="text-3xl text-violet-400/80">{exponent || "n"}</sup>
             </div>
          </div>

          {result !== null ? (
            <div className="relative z-10 w-full space-y-8 mt-12">
               <h2 className="text-xs font-bold text-violet-400 uppercase tracking-widest opacity-60 mb-2 text-center">Calculated Product</h2>
              
              {result.isInfinity ? (
                <div className="bg-red-500/10 border border-red-500/30 p-8 rounded-2xl text-center">
                  <div className="text-4xl font-black text-red-400 font-mono tracking-tight">∞ Infinity</div>
                  <div className="text-red-200/50 text-[10px] font-bold uppercase tracking-widest mt-4">Value exceeded computational limits.</div>
                </div>
              ) : (
                <div className="bg-white/5 border border-white/10 p-8 rounded-2xl text-center shadow-inner group hover:border-violet-500/30 transition-colors">
                  <div className="font-mono text-white font-black text-5xl md:text-6xl break-all tracking-tight drop-shadow-lg">
                    {result.value.toLocaleString("en-US", { maximumFractionDigits: 8 })}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-10 opacity-40 uppercase italic font-black text-4xl text-violet-400 tracking-tighter mt-12">
              Solve Exponent
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title={exponentSeoData.title}
        whatIsIt={exponentSeoData.whatIsIt}
        formula={exponentSeoData.formula}
        example={exponentSeoData.example}
        useCases={exponentSeoData.useCases}
        faqs={exponentSeoData.faqs}
        deepDive={exponentSeoData.deepDive}
        glossary={exponentSeoData.glossary}
        relatedCalculators={[
          {
            name: "Logarithm Calculator",
            path: "/logarithm-calculator/",
            desc: "Perform the inverse mathematical operation by finding the required exponent for a known base and outcome.",
          },
          {
            name: "Scientific Calculator",
            path: "/scientific-calculator/",
            desc: "Chain exponential formulas into large scale algebraic equations.",
          },
          {
            name: "Scientific Notation Converter",
            path: "/scientific-notation-converter/",
            desc: "Reformat aggressively large exponential outputs into clean, readable integers.",
          },
          {
            name: "Root Calculator",
            path: "/root-calculator/",
            desc: "Isolate mathematical targets by taking the nth root of any standardized integer.",
          }
        ]}
      />
    </div>
  );
}
