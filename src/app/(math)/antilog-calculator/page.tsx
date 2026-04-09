"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import antilogSeoData from "@/data/seo-content/official/antilog-calculator.json";

export default function AntilogCalculator() {
  const [base, setBase] = useState("10");
  const [logValue, setLogValue] = useState("2");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const b = parseFloat(base);
    const y = parseFloat(logValue);
    if (!isNaN(b) && !isNaN(y)) {
      setResult(Math.pow(b, y));
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-white rounded-3xl shadow-xl border border-purple-50">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-purple-50 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Antilog Calculator</h1>
          <p className="text-slate-500 font-medium mt-1 text-lg">Calculate the inverse logarithm (antilog) for any base.</p>
        </div>
        <div className="bg-purple-50 px-4 py-2 rounded-full border border-purple-100 shrink-0">
          <span className="text-purple-600 font-bold text-sm uppercase tracking-wider">math</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 shadow-inner space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1 tracking-wide uppercase">Logarithm Base (b)</label>
              <input
                type="number"
                value={base}
                onChange={(e) => setBase(e.target.value)}
                className="w-full rounded-xl border-zinc-200 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-4 border text-xl font-bold bg-white"
                placeholder="e.g. 10 or 2.718"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1 tracking-wide uppercase">Log Value (y)</label>
              <input
                type="number"
                value={logValue}
                onChange={(e) => setLogValue(e.target.value)}
                className="w-full rounded-xl border-zinc-200 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-4 border text-xl font-bold bg-white"
                placeholder="e.g. 2"
              />
            </div>
          </div>

          <button
            onClick={calculate}
            className="mt-8 w-full bg-purple-600 text-white font-bold py-5 px-4 rounded-2xl hover:bg-purple-700 transition shadow-xl shadow-purple-200 text-xl uppercase tracking-widest"
          >
            Calculate Antilog
          </button>
        </div>

        <div className="lg:col-span-7 bg-purple-50 rounded-3xl p-8 border border-purple-100 shadow-inner flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          {result !== null ? (
            <div className="relative z-10">
              <h2 className="text-sm font-bold text-purple-900 mb-4 text-center uppercase tracking-widest opacity-60">
                Antilog Result
              </h2>
              <div className="text-6xl md:text-8xl font-black text-center text-purple-700 mb-6 drop-shadow-sm font-mono">
                {result > 1000000 ? result.toExponential(4) : result.toLocaleString(undefined, { maximumFractionDigits: 6 })}
              </div>
              <div className="text-center text-purple-600 font-bold bg-white/50 py-3 px-6 rounded-xl border border-purple-100 inline-block w-full">
                {base} <sup className="text-xs uppercase opacity-70">to the power of</sup> {logValue}
              </div>
            </div>
          ) : (
            <div className="text-center text-purple-800 opacity-60 font-medium p-8">
              Enter the base and log value to reveal the original number.
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title={antilogSeoData.title}
        whatIsIt={antilogSeoData.whatIsIt}
        formula={antilogSeoData.formula}
        example={antilogSeoData.example}
        useCases={antilogSeoData.useCases}
        faqs={antilogSeoData.faqs}
        deepDive={antilogSeoData.deepDive}
        glossary={antilogSeoData.glossary}
        relatedCalculators={[
          {
            name: "Logarithm Calculator",
            path: "/log-calculator/",
            desc: "Perform the inverse operation by finding the log of a number.",
          },
          {
            name: "Exponent Calculator",
            path: "/exponent-calculator/",
            desc: "Solve for the result when any base is raised to a specific power.",
          },
          {
            name: "Scientific Calculator",
            path: "/scientific-calculator/",
            desc: "Access advanced transcendental functions and constants.",
          },
          {
            name: "Average Calculator",
            path: "/average-calculator/",
            desc: "Find the central tendency of your scientific data sets.",
          }
        ]}
      />
    </div>
  );
}
