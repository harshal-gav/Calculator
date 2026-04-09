"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import factorialSeoData from "@/data/seo-content/official/factorial-calculator.json";

export default function FactorialCalculator() {
  const [nValue, setNValue] = useState("5");

  const [result, setResult] = useState<{
    n: number;
    factorial: string;
    isInfinity: boolean;
  } | null>(null);

  const calculateFactorial = () => {
    const n = parseInt(nValue);

    if (isNaN(n) || n < 0) {
      setResult(null);
      return;
    }

    // Use BigInt for massive factorials to avoid floating point infinity
    let fact = BigInt(1);
    for (let i = 1; i <= n; i++) {
      fact *= BigInt(i);
    }

    let factStr = fact.toString();
    let isInf = false;

    // JS max length string safeguard
    if (n > 50000) {
      factStr = "Number too large to render accurately. Infinity boundary reached for raw text UI.";
      isInf = true;
    }

    setResult({
      n,
      factorial: factStr,
      isInfinity: isInf,
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-3xl shadow-xl border border-pink-50">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-pink-100 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Factorial Calculator</h1>
          <p className="text-slate-600 font-medium mt-1 text-lg">Calculate the exact product (n!) of an integer using BigInt architecture.</p>
        </div>
        <div className="bg-pink-50 px-4 py-2 rounded-full border border-pink-100 shrink-0">
          <span className="text-pink-600 font-bold text-sm uppercase tracking-wider font-mono">Combinatorics</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-12 xl:col-span-4 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-pink-100 shadow-sm space-y-6 flex flex-col justify-center min-h-full">
            <div>
              <label className="block text-[10px] font-bold text-zinc-400 mb-2 uppercase tracking-widest text-center">Root Integer (n)</label>
              <div className="relative">
                 <input
                   type="number"
                   min="0"
                   step="1"
                   value={nValue}
                   onChange={(e) => setNValue(e.target.value)}
                   onKeyDown={(e) => e.key === "Enter" && calculateFactorial()}
                   className="w-full rounded-2xl border-zinc-200 p-6 shadow-sm focus:border-pink-500 bg-zinc-50 font-black text-5xl text-center outline-none transition-all placeholder-zinc-300 pr-12"
                   placeholder="5"
                 />
                 <div className="absolute top-1/2 right-6 -translate-y-1/2 text-5xl font-black text-pink-300 pointer-events-none">!</div>
              </div>
            </div>

            <button
              onClick={calculateFactorial}
              className="w-full bg-pink-600 text-white font-black py-5 px-4 rounded-2xl hover:bg-pink-700 transition shadow-xl shadow-pink-200 text-xl uppercase tracking-widest active:scale-[0.98]"
            >
              Evaluate n!
            </button>
            
            <div className="bg-pink-50/50 p-4 rounded-xl border border-pink-100 mt-2 text-center">
               <span className="text-[9px] font-bold text-pink-500 uppercase tracking-widest block mb-1">Computational Notice</span>
               <span className="text-xs text-pink-800/60 font-medium">Factorials above 10,000! will experience latency due to string-processing overflow limits.</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-12 xl:col-span-8 bg-slate-900 rounded-3xl p-6 md:p-8 border border-white/5 shadow-2xl flex flex-col relative overflow-hidden min-h-[450px]">
          <div className="absolute top-0 left-0 w-64 h-64 bg-pink-600 rounded-full mix-blend-screen filter blur-[80px] opacity-10 pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-rose-500 rounded-full mix-blend-screen filter blur-[80px] opacity-10 pointer-events-none"></div>

          {result !== null ? (
             <div className="relative z-10 w-full h-full flex flex-col">
                <div className="flex justify-between items-center bg-black/40 p-4 rounded-t-2xl border border-white/5 border-b-0 space-x-4">
                   <div className="flex items-center gap-3">
                      <span className="text-pink-400 font-bold uppercase tracking-widest text-[10px] bg-pink-400/10 px-2 py-1 rounded">Target Evaluated</span>
                      <span className="text-2xl font-black text-white font-serif">{result.n}!</span>
                   </div>
                   {!result.isInfinity && (
                     <div className="text-right">
                       <span className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Total Mathematical Digits</span>
                       <span className="text-pink-300 font-mono font-bold text-sm">{result.factorial.length.toLocaleString()}</span>
                     </div>
                   )}
                </div>

                <div className="flex-1 bg-white/5 border border-white/5 rounded-b-2xl p-6 overflow-hidden flex flex-col max-h-[350px]">
                    <div className="overflow-y-auto pr-4 custom-scrollbar h-full flex items-center justify-center">
                       {result.isInfinity ? (
                          <div className="bg-red-500/10 border border-red-500/30 p-8 rounded-2xl text-center w-full">
                            <div className="text-3xl font-black text-red-400 font-mono tracking-tight">{result.factorial}</div>
                          </div>
                        ) : (
                          <div className={`font-mono text-white ${result.factorial.length > 300 ? "text-sm text-center leading-relaxed opacity-80" : "text-3xl md:text-5xl font-black text-center tracking-tight drop-shadow-lg"} break-all`}>
                            {result.factorial.length < 50 ? result.factorial.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : result.factorial}
                          </div>
                        )}
                    </div>
                </div>
             </div>
          ) : (
             <div className="w-full h-full flex items-center justify-center">
                 <div className="text-center py-10 opacity-40 uppercase italic font-black text-4xl text-pink-400 tracking-tighter">
                   Calculate Expansion
                 </div>
             </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title={factorialSeoData.title}
        whatIsIt={factorialSeoData.whatIsIt}
        formula={factorialSeoData.formula}
        example={factorialSeoData.example}
        useCases={factorialSeoData.useCases}
        faqs={factorialSeoData.faqs}
        deepDive={factorialSeoData.deepDive}
        glossary={factorialSeoData.glossary}
        relatedCalculators={[
          {
            name: "Permutations Calculator",
            path: "/permutation-calculator/",
            desc: "Calculate exact ordered arrangements (locks/passwords) utilizing factorial logic.",
          },
          {
            name: "Combinations Calculator",
            path: "/combinations-calculator/",
            desc: "Determine unordered groups (teams/cards) relying heavily on divided factorials.",
          },
          {
            name: "Probability Calculator",
            path: "/probability-calculator/",
            desc: "Determine exact statistical event likelihoods driven by combinatorial outcomes.",
          },
          {
            name: "Exponent Calculator",
            path: "/exponent-calculator/",
            desc: "Understand exponential geometric growth versus factorial scaling.",
          }
        ]}
      />
    </div>
  );
}
