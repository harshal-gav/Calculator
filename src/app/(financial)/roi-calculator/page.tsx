"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import roiSeoData from "@/data/seo-content/official/roi-calculator.json";

export default function ROICalculator() {
  const [amountInvested, setAmountInvested] = useState("10000");
  const [amountReturned, setAmountReturned] = useState("12500");
  const [investmentTimeYears, setInvestmentTimeYears] = useState("2");

  const [result, setResult] = useState<{
    roi: number;
    netReturn: number;
    annualizedRoi: number;
  } | null>(null);

  const calculateROI = () => {
    const invested = parseFloat(amountInvested) || 0;
    const returned = parseFloat(amountReturned) || 0;
    const years = parseFloat(investmentTimeYears) || 0;

    if (invested > 0) {
      const netReturn = returned - invested;
      const roi = (netReturn / invested) * 100;

      let annualizedRoi = 0;
      if (years > 0) {
        // Annualized ROI = [(Ending / Beginning) ^ (1 / Years)] - 1
        annualizedRoi = (Math.pow(returned / invested, 1 / years) - 1) * 100;
      }

      setResult({
        roi,
        netReturn,
        annualizedRoi,
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-12 bg-white rounded-[3.5rem] shadow-2xl border border-emerald-50">
      <div className="text-center mb-16 relative">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <h1 className="text-5xl md:text-7xl font-black mb-6 text-emerald-950 tracking-tight relative z-10">
          ROI <span className="text-emerald-500 italic">Forecaster</span>
        </h1>
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
          The ultimate yardstick for capital efficiency. Measure absolute returns and annualized performance (CAGR) across any asset class.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
        {/* Input Matrix */}
        <div className="lg:col-span-5 bg-emerald-50/50 p-10 rounded-[3rem] border border-emerald-100 shadow-inner space-y-10">
          <div>
            <label className="block text-[10px] font-black text-emerald-800 uppercase tracking-[0.2em] mb-4">
              Initial Capital Invested ($)
            </label>
            <input
              type="number"
              value={amountInvested}
              onChange={(e) => setAmountInvested(e.target.value)}
              className="w-full rounded-[1.5rem] border-emerald-100 p-5 shadow-sm focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 font-black text-3xl text-slate-800"
            />
          </div>

          <div>
            <label className="block text-[10px] font-black text-emerald-800 uppercase tracking-[0.2em] mb-4">
              Final Value / Amount Returned ($)
            </label>
            <input
              type="number"
              value={amountReturned}
              onChange={(e) => setAmountReturned(e.target.value)}
              className="w-full rounded-[1.5rem] border-emerald-100 p-5 shadow-sm focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 font-bold text-2xl text-emerald-600"
            />
          </div>

          <div>
            <label className="block text-[10px] font-black text-emerald-800 uppercase tracking-[0.2em] mb-4">
              Time Horizon (Total Years)
            </label>
            <input
              type="number"
              step="0.1"
              value={investmentTimeYears}
              onChange={(e) => setInvestmentTimeYears(e.target.value)}
              className="w-full rounded-[1.5rem] border-emerald-100 p-5 shadow-sm focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 font-bold text-xl text-slate-700"
            />
            <p className="text-[10px] text-slate-400 mt-3 font-bold italic text-right">Crucial for Annualized ROI (CAGR) accuracy.</p>
          </div>

          <button
            onClick={calculateROI}
            className="w-full bg-emerald-950 text-white font-black py-6 rounded-[2rem] hover:bg-emerald-600 transition-all shadow-2xl shadow-emerald-900/20 uppercase tracking-[0.25em] text-xs active:scale-95 flex items-center justify-center gap-3"
          >
            Execute Performance Audit <span>→</span>
          </button>
        </div>

        {/* Analytical Results Grid */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          {result !== null ? (
            <>
              <div className="bg-white border-2 border-emerald-50 rounded-[3rem] p-10 flex flex-col justify-between shadow-sm relative overflow-hidden group">
                <div className="absolute bottom-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full -mr-20 -mb-20 blur-2xl"></div>
                <div>
                  <h3 className="text-slate-400 font-black uppercase tracking-widest text-[11px] mb-8 flex items-center gap-2">
                    <span className="w-4 h-0.5 bg-emerald-500"></span> Total Absolute ROI
                  </h3>
                  <div className={`text-7xl lg:text-8xl font-black tabular-nums tracking-tighter ${result.roi >= 0 ? "text-slate-900" : "text-red-600"}`}>
                    {result.roi > 0 && "+"}
                    {result.roi.toLocaleString("en-US", {
                      minimumFractionDigits: 1,
                      maximumFractionDigits: 1,
                    })}%
                  </div>
                </div>
                <div className="mt-12 bg-emerald-900 text-white p-6 rounded-2xl flex justify-between items-center">
                   <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Net Capital Gain</span>
                   <span className="text-2xl font-black">${result.netReturn.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}</span>
                </div>
              </div>

              <div className="bg-emerald-950 text-white rounded-[3rem] p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden transition-all duration-500">
                <div className="absolute top-0 right-0 p-8 grayscale opacity-10 group-hover:opacity-100 transition duration-500">📈</div>
                <div>
                   <h3 className="text-emerald-500 font-black uppercase tracking-widest text-[11px] mb-6">Annualized ROI (CAGR)</h3>
                   <div className="text-5xl font-black text-white tabular-nums tracking-tighter">
                     {result.annualizedRoi.toLocaleString("en-US", {
                       minimumFractionDigits: 2,
                       maximumFractionDigits: 2,
                     })}%
                     <span className="text-xl text-emerald-500 font-bold ml-2">/yr</span>
                   </div>
                </div>
                <div className="mt-8 pt-8 border-t border-white/10">
                   <p className="text-slate-400 text-sm font-medium leading-relaxed italic">
                      This investment grew by an average of <strong>{result.annualizedRoi.toFixed(2)}%</strong> every single year. For context, the S&P 500 historical average is ~10%.
                   </p>
                </div>
              </div>
            </>
          ) : (
            <div className="h-full bg-slate-50 border border-dashed border-slate-200 rounded-[3rem] flex flex-col items-center justify-center p-12 text-center group">
               <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-5xl mb-6 shadow-xl group-hover:rotate-12 transition-transform duration-700">📊</div>
               <h3 className="text-2xl font-black text-slate-900 mb-2">Portfolio Data Requested</h3>
               <p className="text-slate-400 text-sm max-w-xs font-medium leading-relaxed">Input your cost basis and exit value to visualize your real-world alpha generation and capital velocity.</p>
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title={roiSeoData.title}
        whatIsIt={roiSeoData.whatIsIt}
        formula={roiSeoData.formula}
        example={roiSeoData.example}
        useCases={roiSeoData.useCases}
        faqs={roiSeoData.faqs}
        deepDive={roiSeoData.deepDive}
        glossary={roiSeoData.glossary}
        relatedCalculators={[
          {
            name: "Compound Interest Calculator",
            path: "/compound-interest-calculator/",
            desc: "Project how consistent returns turn a small sum into millions over decades.",
          },
          {
            name: "Investment Calculator",
            path: "/investment-calculator/",
            desc: "Model your portfolio growth based on specific ROI and contribution targets.",
          },
          {
            name: "Inflation Calculator",
            path: "/inflation-calculator/",
            desc: "Calculate your 'Real' ROI after accounting for currency devaluation.",
          },
          {
            name: "Salary Calculator",
            path: "/salary-calculator/",
            desc: "Analyze the ROI on your time—calculate your true hourly net rate.",
          }
        ]}
      />
    </div>
  );
}
