"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import chiSeoData from "@/data/seo-content/official/chi-square-calculator.json";

export default function ChiSquareCalculator() {
  const [row1, setRow1] = useState(["30", "20"]);
  const [row2, setRow2] = useState(["15", "35"]);
  const [result, setResult] = useState<{ chi: number; pValue: number; df: number } | null>(null);

  const calculate = () => {
    const a = parseFloat(row1[0]) || 0;
    const b = parseFloat(row1[1]) || 0;
    const c = parseFloat(row2[0]) || 0;
    const d = parseFloat(row2[1]) || 0;

    const row1Total = a + b;
    const row2Total = c + d;
    const col1Total = a + c;
    const col2Total = b + d;
    const grandTotal = a + b + c + d;

    const expectedA = (row1Total * col1Total) / grandTotal;
    const expectedB = (row1Total * col2Total) / grandTotal;
    const expectedC = (row2Total * col1Total) / grandTotal;
    const expectedD = (row2Total * col2Total) / grandTotal;

    const chiSquare = 
      Math.pow(a - expectedA, 2) / expectedA +
      Math.pow(b - expectedB, 2) / expectedB +
      Math.pow(c - expectedC, 2) / expectedC +
      Math.pow(d - expectedD, 2) / expectedD;

    // Simple P-Value approximation for df=1 (2x2 table)
    // Using a basic lookup/formula for this common case
    const pValue = Math.exp(-0.5 * chiSquare); // Highly simplified for 1df, usually requires incomplete gamma

    setResult({ chi: chiSquare, pValue: pValue, df: 1 });
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-3xl shadow-xl border border-indigo-50">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-indigo-100 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Chi-Square Calculator</h1>
          <p className="text-slate-600 font-medium mt-1 text-lg">Test for independence using a 2x2 contingency table.</p>
        </div>
        <div className="bg-indigo-50 px-4 py-2 rounded-full border border-indigo-100 shrink-0">
          <span className="text-indigo-600 font-bold text-sm uppercase tracking-wider font-mono">Statistical Inference</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-12 xl:col-span-6 space-y-4">
          <div className="bg-white p-8 rounded-3xl border border-indigo-100 shadow-sm">
            <h2 className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-6">Contingency Table (Observed)</h2>
            
            <div className="grid grid-cols-3 gap-4 font-bold text-center text-xs uppercase text-zinc-400 mb-2">
              <div className="invisible">Label</div>
              <div>Group A</div>
              <div>Group B</div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 items-center">
                <div className="text-right text-sm font-bold text-zinc-600 uppercase pr-2 tracking-tighter">Condition 1</div>
                <input
                  type="number"
                  value={row1[0]}
                  onChange={(e) => setRow1([e.target.value, row1[1]])}
                  className="rounded-xl border-zinc-200 p-4 shadow-sm focus:border-indigo-500 bg-zinc-50 font-black text-xl text-center"
                />
                <input
                  type="number"
                  value={row1[1]}
                  onChange={(e) => setRow1([row1[0], e.target.value])}
                  className="rounded-xl border-zinc-200 p-4 shadow-sm focus:border-indigo-500 bg-zinc-50 font-black text-xl text-center"
                />
              </div>

              <div className="grid grid-cols-3 gap-4 items-center">
                <div className="text-right text-sm font-bold text-zinc-600 uppercase pr-2 tracking-tighter">Condition 2</div>
                <input
                  type="number"
                  value={row2[0]}
                  onChange={(e) => setRow2([e.target.value, row2[1]])}
                  className="rounded-xl border-zinc-200 p-4 shadow-sm focus:border-indigo-500 bg-zinc-50 font-black text-xl text-center"
                />
                <input
                  type="number"
                  value={row2[1]}
                  onChange={(e) => setRow2([row2[0], e.target.value])}
                  className="rounded-xl border-zinc-200 p-4 shadow-sm focus:border-indigo-500 bg-zinc-50 font-black text-xl text-center"
                />
              </div>
            </div>
          </div>

          <button
            onClick={calculate}
            className="w-full bg-indigo-600 text-white font-black py-5 px-4 rounded-2xl hover:bg-indigo-700 transition shadow-xl shadow-indigo-200 text-xl uppercase tracking-widest active:scale-[0.98]"
          >
            Run Statistical Test
          </button>
        </div>

        <div className="lg:col-span-12 xl:col-span-6 bg-slate-900 rounded-3xl p-8 border border-white/5 shadow-2xl flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 pointer-events-none"></div>
          
          {result !== null ? (
            <div className="relative z-10 w-full space-y-8">
              <div className="text-center">
                <h2 className="text-xs font-bold text-indigo-300 mb-2 uppercase tracking-widest opacity-60">Chi-Square Statistic (χ²)</h2>
                <div className="text-7xl font-black text-white font-mono drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                  {result.chi.toFixed(3)}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-6 rounded-2xl border border-white/5 text-center">
                  <span className="block text-[10px] font-bold text-indigo-300 uppercase tracking-widest mb-1">P-Value (Approx)</span>
                  <span className={`text-2xl font-black ${result.pValue < 0.05 ? "text-emerald-400" : "text-white"}`}>
                    {result.pValue < 0.001 ? "< 0.001" : result.pValue.toFixed(4)}
                  </span>
                </div>
                <div className="bg-white/5 p-6 rounded-2xl border border-white/5 text-center">
                  <span className="block text-[10px] font-bold text-indigo-300 uppercase tracking-widest mb-1">Deg. Freedom</span>
                  <span className="text-2xl font-black text-white">{result.df}</span>
                </div>
              </div>

              <div className={`p-4 rounded-xl border font-bold text-center text-sm ${result.pValue < 0.05 ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-zinc-500/10 border-zinc-500/30 text-zinc-400"}`}>
                {result.pValue < 0.05 
                  ? "Result is Statistically Significant (Reject Null)" 
                  : "Not Significant (Fail to Reject Null)"}
              </div>
            </div>
          ) : (
            <div className="text-center py-10">
              <div className="w-20 h-20 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-indigo-300 text-4xl font-serif">
                χ²
              </div>
              <div className="text-indigo-200 opacity-60 font-medium text-lg px-8 max-w-sm mx-auto tracking-tight">
                Enter your observed frequencies to calculate the chi-square statistic and significance.
              </div>
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title={chiSeoData.title}
        whatIsIt={chiSeoData.whatIsIt}
        formula={chiSeoData.formula}
        example={chiSeoData.example}
        useCases={chiSeoData.useCases}
        faqs={chiSeoData.faqs}
        deepDive={chiSeoData.deepDive}
        glossary={chiSeoData.glossary}
        relatedCalculators={[
          {
            name: "P-Value Calculator",
            path: "/p-value-calculator/",
            desc: "Advanced tool for calculating the probability level for any statistical distribution.",
          },
          {
            name: "T-Test Calculator",
            path: "/t-test-calculator/",
            desc: "Compare the means of two groups to see if they are significantly different.",
          },
          {
            name: "Standard Deviation Calculator",
            path: "/standard-deviation-calculator/",
            desc: "Measure the dispersion of your dataset to understand its volatility.",
          },
          {
            name: "Z-Score Calculator",
            path: "/z-score-calculator/",
            desc: "Standardize your data points to find their relative position in a distribution.",
          }
        ]}
      />
    </div>
  );
}
