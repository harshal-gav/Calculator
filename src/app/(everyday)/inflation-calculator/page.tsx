"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import inflationSeoData from "@/data/seo-content/official/inflation-calculator.json";

export default function InflationCalculator() {
  const [amount, setAmount] = useState("100");
  const [rate, setRate] = useState("3.0"); // Avg annual inflation
  const [years, setYears] = useState("10"); // Number of years

  const [result, setResult] = useState<{
    futureCost: number;
    purchasingPower: number;
    totalIncrease: number;
  } | null>(null);

  const calculateInflation = () => {
    const A = parseFloat(amount) || 0;
    const r = (parseFloat(rate) || 0) / 100;
    const t = parseInt(years) || 0;

    if (A > 0 && t > 0) {
      // Future cost of an item that costs A today
      const futureCost = A * Math.pow(1 + r, t);

      // What A dollars today will be worth in t years (Purchasing Power)
      const purchasingPower = A / Math.pow(1 + r, t);

      setResult({
        futureCost,
        purchasingPower,
        totalIncrease: futureCost - A,
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-10 bg-slate-50 rounded-3xl shadow-2xl border border-slate-200">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-black mb-4 text-slate-900 tracking-tight">
          Inflation & Purchasing Power
        </h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">
          The "Invisible Tax" decoder. Calculate how price increases erode your wealth and project the future cost of today's essentials.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
        {/* Input Panel */}
        <div className="lg:col-span-4 bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full -mr-16 -mt-16"></div>
          
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">
              Starting Capital ($)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full rounded-2xl border-slate-200 p-4 shadow-inner focus:ring-4 focus:ring-red-500/10 focus:border-red-500 font-black text-2xl text-slate-800"
            />
          </div>

          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">
              Avg. Annual Inflation (%)
            </label>
            <input
              type="number"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="w-full rounded-2xl border-slate-200 p-4 shadow-inner focus:ring-4 focus:ring-red-500/10 focus:border-red-500 font-bold text-xl text-red-600"
            />
            <div className="flex justify-between mt-2 px-1">
              <span className="text-[10px] text-slate-400 font-bold italic">US Historical Avg: ~3.2%</span>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">
              Horizon (Years)
            </label>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              className="w-full rounded-2xl border-slate-200 p-4 shadow-inner focus:ring-4 focus:ring-red-500/10 focus:border-red-500 font-bold text-xl text-slate-700"
            />
          </div>

          <button
            onClick={calculateInflation}
            className="w-full bg-slate-900 text-white font-black py-5 rounded-2xl hover:bg-red-600 transition-all shadow-xl shadow-slate-900/10 uppercase tracking-widest text-xs active:scale-95"
          >
            Measure Erosion
          </button>
        </div>

        {/* Results Screen */}
        <div className="lg:col-span-8">
          {result !== null ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
              <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 flex flex-col justify-between shadow-sm">
                <div>
                   <h3 className="text-slate-400 font-black uppercase tracking-widest text-[10px] mb-6">Future Cost Prediction</h3>
                   <div className="text-5xl lg:text-6xl font-black text-slate-900 tabular-nums">
                     $
                     {result.futureCost.toLocaleString("en-US", {
                       minimumFractionDigits: 0,
                       maximumFractionDigits: 0,
                     })}
                   </div>
                </div>
                <div className="bg-red-50 p-4 rounded-2xl mt-8">
                    <p className="text-[10px] font-black text-red-600 uppercase mb-1">Price Delta</p>
                    <span className="text-lg font-bold text-red-700">+{((result.futureCost/parseFloat(amount) - 1) * 100).toFixed(1)}% Cost Hike</span>
                </div>
              </div>

              <div className="bg-slate-950 text-white rounded-[2.5rem] p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-transparent opacity-10 group-hover:opacity-20 transition-opacity"></div>
                <div className="relative z-10">
                   <h3 className="text-slate-500 font-black uppercase tracking-widest text-[10px] mb-6">Real Value (Today's $)</h3>
                   <div className="text-5xl lg:text-6xl font-black text-white tabular-nums">
                     $
                     {result.purchasingPower.toLocaleString("en-US", {
                       minimumFractionDigits: 0,
                       maximumFractionDigits: 0,
                     })}
                   </div>
                </div>
                <div className="relative z-10 border-t border-slate-800 pt-6 mt-8">
                    <p className="text-slate-400 text-sm font-medium leading-relaxed">
                      Your saved <span className="text-white font-bold">${parseFloat(amount).toLocaleString()}</span> effectively becomes <span className="text-red-400 font-bold">${result.purchasingPower.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span> in buying power.
                    </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full bg-white border border-dashed border-slate-200 rounded-[2.5rem] flex flex-col items-center justify-center p-12 text-center group">
               <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-5xl mb-6 group-hover:rotate-12 transition-transform duration-500">📉</div>
               <h3 className="text-xl font-black text-slate-900 mb-2">Model Macroeconomic Shifts</h3>
               <p className="text-slate-400 text-sm max-w-xs font-medium leading-relaxed">Input your capital and expected inflation rate to visualize the velocity of purchasing power decay.</p>
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title={inflationSeoData.title}
        whatIsIt={inflationSeoData.whatIsIt}
        formula={inflationSeoData.formula}
        example={inflationSeoData.example}
        useCases={inflationSeoData.useCases}
        faqs={inflationSeoData.faqs}
        deepDive={inflationSeoData.deepDive}
        glossary={inflationSeoData.glossary}
        relatedCalculators={[
          {
            name: "Salary Calculator",
            path: "/salary-calculator/",
            desc: "Compare your take-home pay across different years to see your real income growth.",
          },
          {
            name: "Retirement Calculator",
            path: "/retirement-calculator/",
            desc: "Model your full retirement nest egg with inflation-adjusted withdrawal rates.",
          },
          {
            name: "Compound Interest Calculator",
            path: "/compound-interest-calculator/",
            desc: "See how investing your cash can help you stay ahead of the inflation curve.",
          },
          {
            name: "Mortgage Calculator",
            path: "/mortgage-calculator/",
            desc: "Understand how fixed-rate debt acts as a hedge against rising prices.",
          }
        ]}
      />
    </div>
  );
}
