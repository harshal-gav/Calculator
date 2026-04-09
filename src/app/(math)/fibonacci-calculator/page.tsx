"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import fibonacciSeoData from "@/data/seo-content/official/fibonacci-calculator.json";

export default function FibonacciCalculator() {
  const [nValue, setNValue] = useState("50");

  const [result, setResult] = useState<{
    n: number;
    fibValue: string;
    isInfinity: boolean;
  } | null>(null);

  const calculateFibonacci = () => {
    const n = parseInt(nValue);

    if (isNaN(n) || n < 0) {
      setResult(null);
      return;
    }

    if (n === 0) {
      setResult({ n, fibValue: "0", isInfinity: false });
      return;
    }

    if (n === 1) {
      setResult({ n, fibValue: "1", isInfinity: false });
      return;
    }

    // JS max limit protection
    if (n > 500000) {
      setResult({
        n,
        fibValue: "Input too large. System limit reached to prevent browser execution failure.",
        isInfinity: true,
      });
      return;
    }

    // Iterative approach with BigInt for massive scaling
    let a = BigInt(0);
    let b = BigInt(1);
    let c = BigInt(1);

    for (let i = 2; i <= n; i++) {
      c = a + b;
      a = b;
      b = c;
    }

    setResult({
      n,
      fibValue: c.toString(),
      isInfinity: false,
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-3xl shadow-xl border border-amber-50">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-amber-100 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Fibonacci Sequence Calculator</h1>
          <p className="text-slate-600 font-medium mt-1 text-lg">Pinpoint the exact Nth value within the Golden Ratio sequence.</p>
        </div>
        <div className="bg-amber-50 px-4 py-2 rounded-full border border-amber-100 shrink-0">
          <span className="text-amber-600 font-bold text-sm uppercase tracking-wider font-mono">Algorithmic Math</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-12 xl:col-span-4 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-amber-100 shadow-sm space-y-6 flex flex-col justify-center min-h-full">
            <div>
              <label className="block text-[10px] font-bold text-zinc-400 mb-2 uppercase tracking-widest text-center">Determine F(n) for Target n</label>
              <div className="relative">
                 <div className="absolute top-1/2 left-6 -translate-y-1/2 text-3xl font-black text-amber-300 pointer-events-none italic">F</div>
                 <input
                   type="number"
                   min="0"
                   step="1"
                   value={nValue}
                   onChange={(e) => setNValue(e.target.value)}
                   onKeyDown={(e) => e.key === "Enter" && calculateFibonacci()}
                   className="w-full rounded-2xl border-zinc-200 p-6 pl-14 shadow-sm focus:border-amber-500 bg-zinc-50 font-black text-5xl text-center outline-none transition-all placeholder-zinc-300"
                   placeholder="50"
                 />
              </div>
            </div>

            <button
              onClick={calculateFibonacci}
              className="w-full bg-amber-500 text-white font-black py-5 px-4 rounded-2xl hover:bg-amber-600 transition shadow-xl shadow-amber-200 text-xl uppercase tracking-widest active:scale-[0.98]"
            >
              Evaluate F(n)
            </button>
            <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-100 mt-2 text-center">
               <span className="text-[9px] font-bold text-amber-500 uppercase tracking-widest block mb-1">Architecture Status</span>
               <span className="text-xs text-amber-800/60 font-medium">Bypassing standard recursive death scripts. $O(n)$ iteration engine with memory memoization active.</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-12 xl:col-span-8 bg-slate-900 rounded-3xl p-6 md:p-8 border border-white/5 shadow-2xl flex flex-col relative overflow-hidden min-h-[450px]">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500 rounded-full mix-blend-screen filter blur-[100px] opacity-10 pointer-events-none"></div>

          {result !== null ? (
             <div className="relative z-10 w-full h-full flex flex-col">
                <div className="flex justify-between items-center bg-black/40 p-4 rounded-t-2xl border border-white/5 border-b-0 space-x-4">
                   <div className="flex items-center gap-3">
                      <span className="text-amber-400 font-bold uppercase tracking-widest text-[10px] bg-amber-400/10 px-2 py-1 rounded">Target Evaluated</span>
                      <span className="text-2xl font-black text-white font-serif italic">F({result.n})</span>
                   </div>
                   {!result.isInfinity && (
                     <div className="text-right">
                       <span className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Mathematical Digits Length</span>
                       <span className="text-amber-300 font-mono font-bold text-sm">{result.fibValue.length.toLocaleString()}</span>
                     </div>
                   )}
                </div>

                <div className="flex-1 bg-white/5 border border-white/5 rounded-b-2xl p-6 overflow-hidden flex flex-col max-h-[350px]">
                    <div className="overflow-y-auto pr-4 custom-scrollbar h-full flex items-center justify-center">
                       {result.isInfinity ? (
                          <div className="bg-red-500/10 border border-red-500/30 p-8 rounded-2xl text-center w-full">
                            <div className="text-xl font-black text-red-400 font-mono tracking-tight">{result.fibValue}</div>
                          </div>
                        ) : (
                          <div className={`font-mono text-white ${result.fibValue.length > 300 ? "text-sm text-center leading-relaxed opacity-80" : "text-3xl md:text-5xl font-black text-center tracking-tight drop-shadow-lg"} break-all`}>
                            {result.fibValue.length < 50 ? result.fibValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : result.fibValue}
                          </div>
                        )}
                    </div>
                </div>
             </div>
          ) : (
             <div className="w-full h-full flex items-center justify-center">
                 <div className="text-center py-10 opacity-40 uppercase italic font-black text-4xl text-amber-500 tracking-tighter">
                   Calculate Sequence
                 </div>
             </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title={fibonacciSeoData.title}
        whatIsIt={fibonacciSeoData.whatIsIt}
        formula={fibonacciSeoData.formula}
        example={fibonacciSeoData.example}
        useCases={fibonacciSeoData.useCases}
        faqs={fibonacciSeoData.faqs}
        deepDive={fibonacciSeoData.deepDive}
        glossary={fibonacciSeoData.glossary}
        relatedCalculators={[
          {
            name: "Sequence Calculator",
            path: "/sequence-calculator/",
            desc: "Perform analysis on strictly Arithmetic and Geometric sequences.",
          },
          {
            name: "Number Sequence Calculator",
            path: "/number-sequence-calculator/",
            desc: "Map generic sequences and understand standard polynomial intervals.",
          },
          {
            name: "Factorial Calculator",
            path: "/factorial-calculator/",
            desc: "Explore recursive probability algorithms similar to Fibonacci logic.",
          },
          {
            name: "Percentage Calculator",
            path: "/percentage-calculator/",
            desc: "Easily test geometric convergence by dividing sequential outcomes.",
          }
        ]}
      />
    </div>
  );
}
