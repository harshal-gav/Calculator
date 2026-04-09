"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import empiricalSeoData from "@/data/seo-content/official/empirical-rule-calculator.json";

export default function EmpiricalRuleCalculator() {
  const [mean, setMean] = useState("100");
  const [stdDev, setStdDev] = useState("15");

  const [result, setResult] = useState<{
    sd1Lower: number;
    sd1Upper: number;
    sd2Lower: number;
    sd2Upper: number;
    sd3Lower: number;
    sd3Upper: number;
  } | null>(null);

  const [error, setError] = useState("");

  const calculate = () => {
    setError("");

    const m = parseFloat(mean);
    const s = parseFloat(stdDev);

    if (isNaN(m) || isNaN(s)) {
      setError("Please enter valid numeric values.");
      setResult(null);
      return;
    }

    if (s < 0) {
      setError("Standard deviation cannot be negative.");
      setResult(null);
      return;
    }

    setResult({
      sd1Lower: m - s,
      sd1Upper: m + s,
      sd2Lower: m - 2 * s,
      sd2Upper: m + 2 * s,
      sd3Lower: m - 3 * s,
      sd3Upper: m + 3 * s,
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-3xl shadow-xl border border-emerald-50">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-emerald-100 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Empirical Rule Calculator</h1>
          <p className="text-slate-600 font-medium mt-1 text-lg">Calculate the 68-95-99.7 statistical distribution intervals.</p>
        </div>
        <div className="bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100 shrink-0">
          <span className="text-emerald-600 font-bold text-sm uppercase tracking-wider font-mono">Normal Distribution</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-12 xl:col-span-4 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-emerald-100 shadow-sm space-y-6">
            <div>
               <label className="block text-[10px] font-bold text-zinc-400 mb-2 uppercase tracking-widest flex justify-between">
                <span>Mean (μ)</span>
              </label>
              <input
                type="number"
                step="any"
                value={mean}
                onChange={(e) => setMean(e.target.value)}
                className="w-full rounded-2xl border-zinc-200 p-4 shadow-sm focus:border-emerald-500 bg-zinc-50 font-black text-2xl text-center outline-none transition-all"
                placeholder="100"
              />
            </div>
            
            <div>
              <label className="block text-[10px] font-bold text-zinc-400 mb-2 uppercase tracking-widest flex justify-between">
                 <span>Standard Deviation (σ)</span>
              </label>
              <input
                type="number"
                step="any"
                min="0"
                value={stdDev}
                onChange={(e) => setStdDev(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && calculate()}
                className="w-full rounded-2xl border-zinc-200 p-4 shadow-sm focus:border-emerald-500 bg-zinc-50 font-black text-2xl text-center outline-none transition-all"
                placeholder="15"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 text-red-600 border border-red-100 rounded-xl font-bold text-center text-sm">
                {error}
              </div>
            )}

            <button
              onClick={calculate}
              className="w-full bg-emerald-600 text-white font-black py-5 px-4 rounded-2xl hover:bg-emerald-700 transition shadow-xl shadow-emerald-200 text-xl uppercase tracking-widest active:scale-[0.98]"
            >
              Calculate Ranges
            </button>
          </div>
        </div>

        <div className="lg:col-span-12 xl:col-span-8 bg-slate-900 rounded-3xl p-8 border border-white/5 shadow-2xl flex flex-col justify-center relative overflow-hidden min-h-[450px]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>
          
          {result ? (
            <div className="relative z-10 w-full space-y-6">
              <h2 className="text-xs font-bold text-emerald-400 uppercase tracking-widest opacity-60 mb-6 text-center">Statistical Intervals</h2>
              
              <div className="space-y-4">
                {/* 68% Range */}
                <div className="bg-white/5 border border-emerald-500/30 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 group hover:bg-white/10 transition-colors relative overflow-hidden">
                   <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500"></div>
                   <div className="flex flex-col items-center md:items-start ml-2">
                      <span className="text-3xl font-black text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.4)]">68%</span>
                      <span className="text-[10px] font-bold text-emerald-200/50 uppercase tracking-widest">Within ±1σ</span>
                   </div>
                   <div className="flex items-center gap-3 text-3xl font-black text-white font-mono">
                      <span>{result.sd1Lower.toLocaleString(undefined, { maximumFractionDigits: 4 })}</span>
                      <span className="text-emerald-500/50 text-xl">↔</span>
                      <span>{result.sd1Upper.toLocaleString(undefined, { maximumFractionDigits: 4 })}</span>
                   </div>
                </div>

                {/* 95% Range */}
                <div className="bg-white/5 border border-teal-500/30 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 group hover:bg-white/10 transition-colors relative overflow-hidden">
                   <div className="absolute left-0 top-0 bottom-0 w-1 bg-teal-500"></div>
                   <div className="flex flex-col items-center md:items-start ml-2">
                      <span className="text-3xl font-black text-teal-400 drop-shadow-[0_0_15px_rgba(45,212,191,0.4)]">95%</span>
                      <span className="text-[10px] font-bold text-teal-200/50 uppercase tracking-widest">Within ±2σ</span>
                   </div>
                   <div className="flex items-center gap-3 text-3xl font-black text-white font-mono">
                      <span>{result.sd2Lower.toLocaleString(undefined, { maximumFractionDigits: 4 })}</span>
                      <span className="text-teal-500/50 text-xl">↔</span>
                      <span>{result.sd2Upper.toLocaleString(undefined, { maximumFractionDigits: 4 })}</span>
                   </div>
                </div>

                {/* 99.7% Range */}
                <div className="bg-white/5 border border-cyan-500/30 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 group hover:bg-white/10 transition-colors relative overflow-hidden">
                   <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-500"></div>
                   <div className="flex flex-col items-center md:items-start ml-2">
                      <span className="text-3xl font-black text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]">99.7%</span>
                      <span className="text-[10px] font-bold text-cyan-200/50 uppercase tracking-widest">Within ±3σ</span>
                   </div>
                   <div className="flex items-center gap-3 text-3xl font-black text-white font-mono">
                      <span>{result.sd3Lower.toLocaleString(undefined, { maximumFractionDigits: 4 })}</span>
                      <span className="text-cyan-500/50 text-xl">↔</span>
                      <span>{result.sd3Upper.toLocaleString(undefined, { maximumFractionDigits: 4 })}</span>
                   </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-10 opacity-40 uppercase italic font-black text-4xl text-emerald-400 tracking-tighter">
              Map the Distribution
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title={empiricalSeoData.title}
        whatIsIt={empiricalSeoData.whatIsIt}
        formula={empiricalSeoData.formula}
        example={empiricalSeoData.example}
        useCases={empiricalSeoData.useCases}
        faqs={empiricalSeoData.faqs}
        deepDive={empiricalSeoData.deepDive}
        glossary={empiricalSeoData.glossary}
        relatedCalculators={[
          {
            name: "Standard Deviation Calculator",
            path: "/standard-deviation-calculator/",
            desc: "Calculate the base σ value required to establish your normal distribution intervals.",
          },
          {
            name: "Z-Score Calculator",
            path: "/z-score-calculator/",
            desc: "Pinpoint exactly how many standard deviations a specific data point lives from the mean.",
          },
          {
            name: "Percentile Calculator",
            path: "/percentile-calculator/",
            desc: "Determine precise ranking percentages for data that ignores the normal distribution curve.",
          },
          {
            name: "Average Calculator",
            path: "/average-calculator/",
            desc: "Calculate the mathematical mean (μ). The absolute center of your curve.",
          }
        ]}
      />
    </div>
  );
}
