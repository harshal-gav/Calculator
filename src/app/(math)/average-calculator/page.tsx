"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import averageSeoData from "@/data/seo-content/official/average-calculator.json";

export default function AverageCalculator() {
  const [dataInput, setDataInput] = useState("85, 90, 78, 92, 88");
  const [result, setResult] = useState<number | null>(null);
  const [count, setCount] = useState<number | null>(null);
  const [sum, setSum] = useState<number | null>(null);

  const calculate = () => {
    const numbers = dataInput
      .split(/[\n,]+/)
      .map((s) => parseFloat(s.trim()))
      .filter((n) => !isNaN(n));

    if (numbers.length > 0) {
      const totalSum = numbers.reduce((a, b) => a + b, 0);
      const avg = totalSum / numbers.length;
      setSum(totalSum);
      setCount(numbers.length);
      setResult(avg);
    } else {
      setResult(null);
      setSum(null);
      setCount(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-white rounded-3xl shadow-xl border border-blue-50">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-blue-50 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Average Calculator</h1>
          <p className="text-slate-500 font-medium mt-1 text-lg">Calculate the arithmetic mean of your dataset instantly.</p>
        </div>
        <div className="bg-blue-50 px-4 py-2 rounded-full border border-blue-100 shrink-0">
          <span className="text-blue-600 font-bold text-sm uppercase tracking-wider">math</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-12 xl:col-span-5 space-y-4">
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 shadow-inner space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 tracking-wide uppercase">Your Data Set</label>
              <p className="text-xs text-slate-500 mb-3 font-medium uppercase tracking-widest">Separate numbers by commas or new lines</p>
              <textarea
                rows={6}
                value={dataInput}
                onChange={(e) => setDataInput(e.target.value)}
                className="w-full rounded-2xl border-zinc-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-5 border text-xl font-bold bg-white leading-relaxed resize-none transition-all"
                placeholder="e.g. 10, 20, 30..."
              />
            </div>
          </div>

          <button
            onClick={calculate}
            className="mt-4 w-full bg-blue-600 text-white font-black py-5 px-4 rounded-2xl hover:bg-blue-700 transition shadow-xl shadow-blue-200 text-xl uppercase tracking-widest active:scale-[0.98]"
          >
            Calculate Average
          </button>
        </div>

        <div className="lg:col-span-12 xl:col-span-7 bg-blue-50 rounded-3xl p-8 border border-blue-100 shadow-inner flex flex-col justify-center relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none"></div>
          {result !== null ? (
            <div className="relative z-10 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-center">
                <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm">
                  <span className="block text-xs font-bold text-blue-400 uppercase tracking-widest mb-1">Total Sum</span>
                  <span className="text-2xl font-black text-slate-900">{sum?.toLocaleString()}</span>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm">
                  <span className="block text-xs font-bold text-blue-400 uppercase tracking-widest mb-1">Item Count</span>
                  <span className="text-2xl font-black text-slate-900">{count} numbers</span>
                </div>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm p-10 rounded-3xl border-2 border-white shadow-xl text-center">
                <h2 className="text-sm font-bold text-blue-900 mb-4 uppercase tracking-widest opacity-60">
                  Arithmetic Mean (Average)
                </h2>
                <div className="text-7xl md:text-8xl font-black text-blue-700 drop-shadow-sm font-mono">
                  {result.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-400 text-4xl">
                ∑
              </div>
              <div className="text-blue-900 opacity-60 font-bold text-lg px-8 max-w-sm mx-auto">
                Paste your dataset and click calculate to see the mathematical mean.
              </div>
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title={averageSeoData.title}
        whatIsIt={averageSeoData.whatIsIt}
        formula={averageSeoData.formula}
        example={averageSeoData.example}
        useCases={averageSeoData.useCases}
        faqs={averageSeoData.faqs}
        deepDive={averageSeoData.deepDive}
        glossary={averageSeoData.glossary}
        relatedCalculators={[
          {
            name: "Standard Deviation Calculator",
            path: "/standard-deviation-calculator/",
            desc: "Measure the dispersion and volatility of your dataset relative to the mean.",
          },
          {
            name: "Median Calculator",
            path: "/median-calculator/",
            desc: "Find the middle value to better understand skewed data sets.",
          },
          {
            name: "Percentage Calculator",
            path: "/percentage-calculator/",
            desc: "Calculate ratios and percentage changes across different values.",
          },
          {
            name: "Weighted Average Calculator",
            path: "/weighted-average-calculator/",
            desc: "Calculate results where different values carry more importance.",
          }
        ]}
      />
    </div>
  );
}
