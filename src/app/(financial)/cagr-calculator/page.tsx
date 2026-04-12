"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import cagrSeoData from "@/data/seo-content/official/cagr-calculator.json";

export default function CagrCalculator() {
  const [initialValue, setInitialValue] = useState("10000");
  const [finalValue, setFinalValue] = useState("25000");
  const [years, setYears] = useState("5");

  const [result, setResult] = useState<number | null>(null);

  const calculateCAGR = () => {
    const begin = parseFloat(initialValue);
    const end = parseFloat(finalValue);
    const n = parseFloat(years);

    if (begin > 0 && end > 0 && n > 0) {
      // CAGR = [(End / Begin)^(1/n)] - 1
      const cagr = (Math.pow(end / begin, 1 / n) - 1) * 100;
      setResult(cagr);
    } else {
      setResult(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 bg-white rounded-2xl shadow-xl border border-purple-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-purple-50 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black text-purple-900 tracking-tight text-nowrap">CAGR Calculator</h1>
          <p className="text-purple-600 font-medium mt-1 italic text-base">Compute smoothed annual growth rates for any investment.</p>
        </div>
        <div className="hidden md:flex flex-col items-end">
          <div className="bg-purple-50 px-4 py-2 rounded-full border border-purple-100 mb-1">
            <span className="text-purple-700 font-bold text-xs uppercase tracking-widest">Growth Analytics</span>
          </div>
          <span className="text-[10px] text-purple-400 font-bold uppercase tracking-tighter">Geometric Mean Edition</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* Input Sidebar */}
        <div className="lg:col-span-12 xl:col-span-4 space-y-6">
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-5 shadow-inner">
            <h2 className="text-lg font-black text-slate-800 uppercase tracking-wide border-b border-slate-200 pb-2 mb-4">Initial Parameters</h2>
            
            <div>
              <label className="block text-xs font-black text-slate-500 mb-2 uppercase tracking-wider">Beginning Value ($)</label>
              <div className="relative">
                 <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">$</span>
                 <input
                  type="number"
                  value={initialValue}
                  onChange={(e) => setInitialValue(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-8 py-3 focus:border-purple-500 focus:ring-0 transition-all font-bold text-slate-800 shadow-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-slate-500 mb-2 uppercase tracking-wider">Ending Value ($)</label>
              <div className="relative">
                 <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">$</span>
                 <input
                  type="number"
                  value={finalValue}
                  onChange={(e) => setFinalValue(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-8 py-3 focus:border-purple-500 focus:ring-0 transition-all font-bold text-slate-800 shadow-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-slate-500 mb-2 uppercase tracking-wider">Time Period (Years)</label>
              <input
                type="number"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 focus:border-purple-500 focus:ring-0 transition-all font-bold text-slate-800 shadow-sm"
              />
               <p className="text-[10px] text-slate-400 mt-2 font-medium italic">Usually 1 year or more for standard CAGR math.</p>
            </div>

            <button
              onClick={calculateCAGR}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-black py-4 rounded-xl transition-all shadow-lg active:scale-[0.98] uppercase tracking-widest text-sm"
            >
              Analyze Growth Rate
            </button>
          </div>
        </div>

        {/* Results Canvas */}
        <div className="lg:col-span-12 xl:col-span-8">
          {result !== null ? (
            <div className="h-full flex flex-col gap-6">
              <div className="bg-gradient-to-br from-purple-600 to-indigo-800 rounded-3xl p-10 text-white shadow-2xl flex flex-col justify-center grow relative overflow-hidden border-b-8 border-purple-400">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-16 -mb-16"></div>
                
                <div className="relative z-10">
                  <div className="text-purple-100 text-[10px] font-black uppercase tracking-[0.3em] mb-3">Compound Annual Growth Rate (CAGR)</div>
                  <div className="text-7xl md:text-8xl font-black mb-6 tracking-tighter drop-shadow-sm">
                    {result.toFixed(2)}%
                  </div>
                  <div className="inline-flex items-center px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-black backdrop-blur-md border border-white/20 uppercase tracking-widest">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd"/></svg>
                    Geometric Mean Return
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border-2 border-slate-100 p-6 rounded-2xl shadow-sm flex flex-col justify-center">
                  <div className="text-slate-400 text-[10px] font-black uppercase mb-2 tracking-widest leading-none">Total Percentage Growth</div>
                  <div className="text-3xl font-black text-slate-800">
                    {(((parseFloat(finalValue) / parseFloat(initialValue)) - 1) * 100).toFixed(2)}%
                  </div>
                </div>
                <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-2xl flex flex-col justify-center border-l-4 border-l-indigo-400">
                  <div className="text-indigo-700 text-[10px] font-black uppercase mb-2 tracking-widest leading-none underline decoration-indigo-200 underline-offset-4">Performance Check</div>
                  <div className="text-3xl font-black text-indigo-900">
                    {result > 10 ? "Above Market" : result > 0 ? "Positive" : "Negative"}
                  </div>
                  <p className="text-[10px] text-indigo-600 font-bold mt-1 leading-tight">Vs. historical S&P 500 average (~10%).</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[450px] border-4 border-double border-slate-100 rounded-3xl flex flex-col items-center justify-center p-12 text-center bg-slate-50/30">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-6 text-purple-600 animate-bounce">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-slate-800 mb-3 tracking-tight">Investment Performance Audit</h3>
              <p className="text-slate-500 max-w-[320px] font-medium leading-relaxed">Enter your beginning and ending values to uncover the true annualized trajectory of your wealth.</p>
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title={cagrSeoData.title}
        whatIsIt={cagrSeoData.whatIsIt}
        formula={cagrSeoData.formula}
        example={cagrSeoData.example}
        useCases={cagrSeoData.useCases}
        faqs={cagrSeoData.faqs}
        deepDive={cagrSeoData.deepDive}
        glossary={cagrSeoData.glossary}
        relatedCalculators={[
          {
            name: "ROI",
            path: "/roi-calculator/",
            desc: "Calculate total percentage returns for any single-period investment.",
          },
          {
            name: "Compound Interest",
            path: "/compound-interest-calculator/",
            desc: "Project how consistent growth builds immense wealth over decades.",
          },
          {
            name: "Investment",
            path: "/investment-calculator/",
            desc: "Project the future value of a diversified portfolio with recurring additions.",
          },
          {
            name: "Average Return",
            path: "/average-return-calculator/",
            desc: "Compare simple arithmetic averages with the geometric CAGR result.",
          }
        ]}
      />
    </div>
  );
}
