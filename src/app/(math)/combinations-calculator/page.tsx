"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import combinationsSeoData from "@/data/seo-content/official/combinations-calculator.json";

export default function CombinationsCalculator() {
  const [nVal, setNVal] = useState("10");
  const [rVal, setRVal] = useState("3");

  const [result, setResult] = useState<{
    combinations: string;
    formula: string;
  } | null>(null);

  const [error, setError] = useState("");

  const calculate = () => {
    setError("");
    const n = parseInt(nVal);
    const r = parseInt(rVal);

    if (isNaN(n) || isNaN(r)) {
      setResult(null);
      return;
    }

    if (n < 0 || r < 0) {
      setError("n and r must be non-negative integers.");
      setResult(null);
      return;
    }

    if (r > n) {
      setError("r cannot be greater than n.");
      setResult(null);
      return;
    }

    if (n > 1000) {
      setError("For performance reasons, n is limited to 1000.");
      setResult(null);
      return;
    }

    try {
      // nCr = n! / (r! * (n-r)!)
      let numerator = BigInt(1);
      let denominator = BigInt(1);

      // Optimization: nCr is symmetric. nCr(10, 8) == nCr(10, 2).
      const k = Math.min(r, n - r);

      for (let i = 1; i <= k; i++) {
        numerator *= BigInt(n - i + 1);
        denominator *= BigInt(i);
      }

      const combinations = numerator / denominator;
      let displayVal = combinations.toString();

      if (displayVal.length > 21) {
        const num = Number(combinations);
        displayVal = num.toExponential(4) + ` (Exact: ${displayVal})`;
      } else if (displayVal.length > 3) {
        displayVal = displayVal.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }

      setResult({
        combinations: displayVal,
        formula: `C(${n}, ${r}) = ${n}! / [${r}! * (${n}-${r})!]`,
      });
    } catch (e) {
      setError("Error calculating combinations. Result may be too large.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-3xl shadow-xl border border-pink-50">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-pink-100 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight text-center md:text-left">Combinations Calculator</h1>
          <p className="text-slate-600 font-medium mt-1 text-lg text-center md:text-left underline decoration-pink-200 underline-offset-4">Calculate n-Choose-r (Combinations) where order does not matter.</p>
        </div>
        <div className="bg-pink-50 px-4 py-2 rounded-full border border-pink-100 shrink-0 mx-auto md:mx-0">
          <span className="text-pink-600 font-bold text-sm uppercase tracking-wider font-mono">Probability & Stats</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-12 xl:col-span-5 space-y-4">
          <div className="bg-white p-8 rounded-3xl border border-pink-100 shadow-sm space-y-8">
            <div className="flex justify-center items-center gap-4 py-4">
              <span className="text-5xl font-black text-pink-200 font-serif">C(</span>
              <div className="flex flex-col gap-4">
                <div className="relative">
                  <span className="absolute -top-3 left-2 bg-white px-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Pool (n)</span>
                  <input
                    type="number"
                    value={nVal}
                    onChange={(e) => setNVal(e.target.value)}
                    className="w-32 rounded-2xl border-zinc-200 p-4 shadow-sm focus:border-pink-500 bg-zinc-50 font-black text-2xl text-center outline-none transition-all"
                  />
                </div>
                <div className="relative">
                  <span className="absolute -top-3 left-2 bg-white px-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Pick (r)</span>
                  <input
                    type="number"
                    value={rVal}
                    onChange={(e) => setRVal(e.target.value)}
                    className="w-32 rounded-2xl border-zinc-200 p-4 shadow-sm focus:border-pink-500 bg-zinc-50 font-black text-2xl text-center outline-none transition-all"
                  />
                </div>
              </div>
              <span className="text-5xl font-black text-pink-200 font-serif">)</span>
            </div>

            {error && (
              <div className="p-4 bg-red-50 text-red-600 border border-red-100 rounded-xl font-bold text-center text-sm">
                {error}
              </div>
            )}

            <button
              onClick={calculate}
              className="w-full bg-pink-600 text-white font-black py-5 px-4 rounded-2xl hover:bg-pink-700 transition shadow-xl shadow-pink-200 text-xl uppercase tracking-widest active:scale-[0.98]"
            >
              Calculate nCr
            </button>
          </div>
        </div>

        <div className="lg:col-span-12 xl:col-span-7 bg-slate-900 rounded-3xl p-8 border border-white/5 shadow-2xl flex flex-col justify-center relative overflow-hidden min-h-[400px]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>
          
          {result !== null ? (
            <div className="relative z-10 w-full space-y-8">
              <div className="text-center">
                <h2 className="text-xs font-bold text-pink-400 mb-4 uppercase tracking-widest opacity-60 italic">Total Unique Combinations</h2>
                <div className="text-5xl md:text-7xl font-black text-white font-mono break-all drop-shadow-[0_0_20px_rgba(236,72,153,0.4)] px-4">
                  {result.combinations}
                </div>
              </div>

              <div className="max-w-xs mx-auto bg-white/5 p-6 rounded-2xl border border-white/5 text-center">
                <span className="block text-[10px] font-bold text-pink-300 uppercase tracking-widest mb-4">Formula Logic</span>
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-2 text-white font-mono text-xl opacity-80">
                    <span className="text-pink-400">n!</span>
                    <span className="text-zinc-600">/</span>
                    <span className="text-pink-400">r!(n-r)!</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-10">
              <div className="w-24 h-24 bg-pink-500/10 rounded-full flex items-center justify-center mx-auto mb-8 text-pink-400 text-5xl font-serif border border-pink-500/20">
                nCr
              </div>
              <div className="text-pink-100 opacity-60 font-bold text-lg px-8 max-w-sm mx-auto tracking-tight leading-relaxed font-serif italic">
                "In combinations, the order of selection is forgotten; only the membership remains."
              </div>
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title={combinationsSeoData.title}
        whatIsIt={combinationsSeoData.whatIsIt}
        formula={combinationsSeoData.formula}
        example={combinationsSeoData.example}
        useCases={combinationsSeoData.useCases}
        faqs={combinationsSeoData.faqs}
        deepDive={combinationsSeoData.deepDive}
        glossary={combinationsSeoData.glossary}
        relatedCalculators={[
          {
            name: "Permutations Calculator",
            path: "/permutation-calculator/",
            desc: "Calculate scenarios where the exact sequence and order of the selection matter.",
          },
          {
            name: "Probability Calculator",
            path: "/probability-calculator/",
            desc: "Turn these raw combination counts into actual percentage odds of winning or losing.",
          },
          {
            name: "Average Calculator",
            path: "/average-calculator/",
            desc: "Find the mathematical mean of any structured technical dataset.",
          },
          {
            name: "Binomial Coefficient Calculator",
            path: "/binomial-calculator/",
            desc: "Expand binomial expressions using these fundamental selection counts.",
          }
        ]}
      />
    </div>
  );
}
