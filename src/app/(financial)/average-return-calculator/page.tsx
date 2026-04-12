"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import averageReturnSeoData from "@/data/seo-content/official/average-return-calculator.json";

export default function AverageReturnCalculator() {
  const [initialValue, setInitialValue] = useState("10000");
  const [finalValue, setFinalValue] = useState("25000");
  const [years, setYears] = useState("5");

  const [result, setResult] = useState<{
    totalReturn: number;
    annualizedReturn: number;
    simpleAverage: number;
  } | null>(null);

  const calculate = () => {
    const start = parseFloat(initialValue);
    const end = parseFloat(finalValue);
    const t = parseFloat(years);

    if (start > 0 && end > 0 && t > 0) {
      const totalReturn = ((end - start) / start) * 100;
      
      // CAGR Formula: [(End / Start)^(1/n) - 1] * 100
      const annualizedReturn = (Math.pow(end / start, 1 / t) - 1) * 100;
      
      // Simple Average (for education)
      const simpleAverage = totalReturn / t;

      setResult({
        totalReturn,
        annualizedReturn,
        simpleAverage
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-2xl shadow-xl border border-sky-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-sky-50 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black text-sky-900 tracking-tight text-nowrap">Average Return Calculator</h1>
          <p className="text-sky-600 font-medium mt-1">Calculate CAGR and geometric mean for your investments.</p>
        </div>
        <div className="bg-sky-50 px-4 py-2 rounded-full border border-sky-100 shrink-0">
          <span className="text-sky-700 font-bold text-sm uppercase tracking-wider">CAGR Analysis</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Initial Portfolio Value ($)</label>
              <input type="number" value={initialValue} onChange={(e) => setInitialValue(e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-sky-500 focus:ring-0 transition-all font-semibold text-slate-800" />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Final Portfolio Value ($)</label>
              <input type="number" value={finalValue} onChange={(e) => setFinalValue(e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-sky-500 focus:ring-0 transition-all font-semibold text-slate-800" />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Number of Years (n)</label>
              <input type="number" value={years} onChange={(e) => setYears(e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-sky-500 focus:ring-0 transition-all font-semibold text-slate-800" />
            </div>

            <button onClick={calculate} className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-sky-200 active:scale-[0.98]">
              Calculate Return
            </button>
          </div>
        </div>

        <div className="lg:col-span-7">
          {result ? (
            <div className="h-full flex flex-col gap-6">
              <div className="grow bg-gradient-to-br from-sky-600 to-sky-800 rounded-3xl p-10 text-white shadow-xl flex flex-col justify-center">
                <div className="text-sky-100 text-sm font-bold uppercase tracking-widest mb-2 font-mono">Annualized Return (CAGR)</div>
                <div className="text-8xl font-black mb-6">
                  {result.annualizedReturn.toFixed(2)}%
                </div>
                <div className="inline-flex items-center px-4 py-2 rounded-xl bg-white/20 text-white text-base font-bold backdrop-blur-sm self-start">
                   Total Gain: {result.totalReturn.toFixed(1)}%
                </div>
              </div>

              <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl flex justify-between items-center">
                <div>
                    <div className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Simple Average Return</div>
                    <div className="text-xl font-bold text-slate-500 line-through decoration-red-300 decoration-2">{result.simpleAverage.toFixed(2)}%</div>
                </div>
                <div className="text-right max-w-[200px]">
                    <p className="text-[10px] text-sky-600 font-bold uppercase italic tracking-tighter">Precision matters. Simple averages can inflate perceived growth.</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[400px] border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center p-8 text-center bg-slate-50/50">
               <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mb-4 text-sky-600">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
               </div>
               <h3 className="text-xl font-bold text-slate-800 mb-2 uppercase tracking-tighter">CAGR Calculation</h3>
               <p className="text-slate-500 max-w-[320px] font-medium">CAGR provides a smoother, more accurate annual return rate by accounting for the effect of compounding over time.</p>
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title={averageReturnSeoData.title}
        whatIsIt={averageReturnSeoData.whatIsIt}
        formula={averageReturnSeoData.formula}
        example={averageReturnSeoData.example}
        useCases={averageReturnSeoData.useCases}
        faqs={averageReturnSeoData.faqs}
        deepDive={averageReturnSeoData.deepDive}
        glossary={averageReturnSeoData.glossary}
        relatedCalculators={[
          {
            name: "Mortgage",
            path: "/mortgage-calculator/",
            desc: "Calculate your monthly mortgage payments and amortization schedule.",
          },
          {
            name: "ROI",
            path: "/roi-calculator/",
            desc: "Calculate your exact annualized percentage returns.",
          },
          {
            name: "Investment",
            path: "/investment-calculator/",
            desc: "Project your portfolio growth over time with compound interest.",
          },
          {
            name: "Loan Payment",
            path: "/loan-payment-calculator/",
            desc: "Estimate your monthly loan payments and total interest cost.",
          },
        ]}
      />
    </div>
  );
}
