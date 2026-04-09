"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import exponentialSeoData from "@/data/seo-content/official/exponential-calculator.json";

export default function ExponentialCalculator() {
  const [initialValue, setInitialValue] = useState("10");
  const [rate, setRate] = useState("15");
  const [time, setTime] = useState("12");
  const [mode, setMode] = useState<"growth" | "decay">("growth");

  const [result, setResult] = useState<{
    finalAmount: number;
    initialAmount: number;
    totalChange: number;
    multiplier: number;
  } | null>(null);

  const calculate = () => {
    const a = parseFloat(initialValue);
    const r = parseFloat(rate) / 100; // convert percentage to decimal
    const x = parseFloat(time);

    if (isNaN(a) || isNaN(r) || isNaN(x)) {
      setResult(null);
      return;
    }

    let multiplier = 1;
    if (mode === "growth") {
      multiplier = Math.pow(1 + r, x);
    } else {
      multiplier = Math.pow(1 - r, x);
    }

    const finalAmount = a * multiplier;

    setResult({
      finalAmount: finalAmount,
      initialAmount: a,
      totalChange: Math.abs(finalAmount - a),
      multiplier: multiplier,
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-3xl shadow-xl border border-indigo-50">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-indigo-100 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Exponential Calculator</h1>
          <p className="text-slate-600 font-medium mt-1 text-lg">Calculate compounded acceleration, growth limits, and radioactive decay.</p>
        </div>
        <div className="bg-indigo-50 px-4 py-2 rounded-full border border-indigo-100 shrink-0">
          <span className="text-indigo-600 font-bold text-sm uppercase tracking-wider font-mono">Algebra</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-12 xl:col-span-5 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-indigo-100 shadow-sm space-y-6">
            <div className="flex bg-zinc-100 p-1 rounded-xl">
               <button 
                  onClick={() => { setMode("growth"); setResult(null); }}
                  className={`flex-1 py-3 rounded-lg font-bold text-sm uppercase tracking-wider transition-all ${mode === "growth" ? "bg-indigo-600 text-white shadow-md transform scale-100" : "text-zinc-500 hover:bg-zinc-200"}`}
               >
                 Growth (+)
               </button>
               <button 
                  onClick={() => { setMode("decay"); setResult(null); }}
                  className={`flex-1 py-3 rounded-lg font-bold text-sm uppercase tracking-wider transition-all ${mode === "decay" ? "bg-rose-600 text-white shadow-md transform scale-100" : "text-zinc-500 hover:bg-zinc-200"}`}
               >
                 Decay (-)
               </button>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-zinc-400 mb-2 uppercase tracking-widest text-center">Initial Value (a)</label>
              <input
                type="number"
                step="any"
                value={initialValue}
                onChange={(e) => setInitialValue(e.target.value)}
                className="w-full rounded-2xl border-zinc-200 p-4 shadow-sm focus:border-indigo-500 bg-zinc-50 font-black text-2xl text-center outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-zinc-400 mb-2 uppercase tracking-widest text-center">Rate per Interval (r %)</label>
              <input
                type="number"
                step="any"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                className="w-full rounded-2xl border-zinc-200 p-4 shadow-sm focus:border-indigo-500 bg-zinc-50 font-black text-2xl text-center outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-zinc-400 mb-2 uppercase tracking-widest text-center">Time Intervals (x)</label>
              <input
                type="number"
                step="any"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && calculate()}
                className="w-full rounded-2xl border-zinc-200 p-4 shadow-sm focus:border-indigo-500 bg-zinc-50 font-black text-2xl text-center outline-none transition-all"
              />
            </div>

            <button
              onClick={calculate}
              className={`w-full text-white font-black py-5 px-4 rounded-2xl transition shadow-xl text-xl uppercase tracking-widest active:scale-[0.98] ${mode === "growth" ? "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200" : "bg-rose-600 hover:bg-rose-700 shadow-rose-200"}`}
            >
              Evaluate Trajectory
            </button>
          </div>
        </div>

        <div className="lg:col-span-12 xl:col-span-7 bg-slate-900 rounded-3xl p-8 border border-white/5 shadow-2xl flex flex-col justify-center relative overflow-hidden min-h-[400px]">
          <div className={`absolute top-0 right-0 w-64 h-64 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none ${mode === "growth" ? "bg-indigo-500" : "bg-rose-500"}`}></div>
          
          <div className="absolute top-8 left-8">
             <div className="text-white/20 font-mono text-xl font-bold">
                 y = a(1 {mode === "growth" ? "+" : "-"} r)<sup className="text-sm">x</sup>
             </div>
          </div>

          {result !== null ? (
            <div className="relative z-10 w-full space-y-8 mt-8 text-center">
               <h2 className="text-xs font-bold text-indigo-400 uppercase tracking-widest opacity-60 mb-2">Final Compounded Amount (y)</h2>
               
               <div className="bg-white/5 border border-white/10 p-8 rounded-2xl shadow-inner group transition-colors">
                  <div className="font-mono text-white font-black text-5xl md:text-6xl break-all tracking-tight drop-shadow-lg">
                    {result.finalAmount.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-black/30 p-6 rounded-xl border border-white/5 flex flex-col justify-center">
                      <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Raw Base Multiplier</span>
                      <span className="font-mono text-white font-bold text-2xl">{result.multiplier.toLocaleString(undefined, { maximumFractionDigits: 6 })}x</span>
                  </div>
                  <div className="bg-black/30 p-6 rounded-xl border border-white/5 flex flex-col justify-center text-center">
                      <span className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${mode === "growth" ? "text-indigo-400" : "text-rose-400"}`}>
                        Total Absolute {mode === "growth" ? "Growth" : "Loss"}
                      </span>
                      <span className="font-mono text-white font-bold text-2xl">
                         {mode === "growth" ? "+" : "-"}{result.totalChange.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                      </span>
                  </div>
               </div>
            </div>
          ) : (
             <div className={`text-center py-10 opacity-40 uppercase italic font-black text-4xl tracking-tighter mt-12 ${mode === "growth" ? "text-indigo-400" : "text-rose-400"}`}>
              Project {mode}
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title={exponentialSeoData.title}
        whatIsIt={exponentialSeoData.whatIsIt}
        formula={exponentialSeoData.formula}
        example={exponentialSeoData.example}
        useCases={exponentialSeoData.useCases}
        faqs={exponentialSeoData.faqs}
        deepDive={exponentialSeoData.deepDive}
        glossary={exponentialSeoData.glossary}
        relatedCalculators={[
          {
            name: "Exponent Calculator",
            path: "/exponent-calculator/",
            desc: "Perform raw, aggressive algebraic base multiplication without fractional modifiers.",
          },
          {
            name: "Compound Interest Calculator",
            path: "/compound-interest-calculator/",
            desc: "A specialized exponential application used strictly for financial capital modeling.",
          },
          {
            name: "Logarithm Calculator",
            path: "/logarithm-calculator/",
            desc: "The inverse of exponential framing. Solve exactly what rate is required to hit a target.",
          },
          {
            name: "Percentage Calculator",
            path: "/percentage-calculator/",
            desc: "Easily calculate percentages, increases, and decreases.",
          }
        ]}
      />
    </div>
  );
}
