"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import investmentSeoData from "@/data/seo-content/official/investment-calculator.json";

export default function InvestmentCalculator() {
  const [startingAmount, setStartingAmount] = useState("10000");
  const [returnRate, setReturnRate] = useState("8");
  const [investmentLength, setInvestmentLength] = useState("20");
  const [contribution, setContribution] = useState("500");
  const [contributionFreq, setContributionFreq] = useState("monthly");

  const [result, setResult] = useState<{
    futureValue: number;
    totalContributed: number;
    totalInterest: number;
  } | null>(null);

  const calculateInvestment = () => {
    const principal = parseFloat(startingAmount) || 0;
    const rate = (parseFloat(returnRate) || 0) / 100 / 12;
    const years = parseFloat(investmentLength) || 0;
    const monthlyExtra = parseFloat(contribution) || 0;
    const freq = contributionFreq;

    const months = years * 12;
    let total = principal;
    let totalDeposited = principal;

    for (let i = 0; i < months; i++) {
      total = total * (1 + rate);

      if (freq === "monthly") {
        total += monthlyExtra;
        totalDeposited += monthlyExtra;
      } else if (freq === "annually" && (i + 1) % 12 === 0) {
        total += monthlyExtra;
        totalDeposited += monthlyExtra;
      }
    }

    setResult({
      futureValue: total,
      totalContributed: totalDeposited,
      totalInterest: total - totalDeposited
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-gray-900 border-b pb-4 shadow-sm inline-block px-2">
         Investment Strategy Calculator
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Master your financial destiny. Project the growth of your stock portfolio, mutual funds, and retirement accounts with our advanced modeling engine.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-4 bg-gray-50 p-6 rounded-2xl border border-gray-100">
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Starting Amount ($):</label>
              <input 
                type="number" 
                value={startingAmount} 
                onChange={(e) => setStartingAmount(e.target.value)} 
                className="w-full rounded-xl border-gray-300 p-4 font-black text-gray-900 focus:ring-2 focus:ring-blue-500" 
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-1 uppercase">Annual Return (%)</label>
                  <input 
                    type="number" 
                    value={returnRate} 
                    onChange={(e) => setReturnRate(e.target.value)} 
                    className="w-full rounded-xl border-gray-300 p-4 text-emerald-700 font-bold" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-1 uppercase">Horizon (Years)</label>
                  <input 
                    type="number" 
                    value={investmentLength} 
                    onChange={(e) => setInvestmentLength(e.target.value)} 
                    className="w-full rounded-xl border-gray-300 p-4 font-bold" 
                  />
                </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Periodic Deposit ($):</label>
              <div className="flex space-x-2">
                <input 
                  type="number" 
                  value={contribution} 
                  onChange={(e) => setContribution(e.target.value)} 
                  className="flex-grow rounded-xl border-gray-300 p-4 font-black text-blue-700" 
                />
                <select 
                  value={contributionFreq} 
                  onChange={(e) => setContributionFreq(e.target.value)} 
                  className="rounded-xl border-gray-300 p-4 text-xs font-bold bg-white"
                >
                    <option value="monthly">Monthly</option>
                    <option value="annually">Annually</option>
                </select>
              </div>
            </div>
          </div>

          <button
            onClick={calculateInvestment}
            className="mt-8 w-full bg-blue-600 text-white font-black py-5 rounded-2xl hover:bg-blue-700 transition-all shadow-xl text-xl uppercase tracking-wider active:scale-95"
          >
            Run Projection
          </button>
        </div>

        <div className="lg:col-span-8 flex flex-col space-y-6">
          {result !== null ? (
            <>
                <div className="bg-gradient-to-br from-gray-900 to-blue-900 text-white rounded-3xl p-12 text-center shadow-2xl relative overflow-hidden group border border-blue-400/20">
                    <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none"></div>
                    <span className="block text-sm font-bold text-blue-300 uppercase mb-3 tracking-[0.3em] font-mono">Projected Net Worth</span>
                    <div className="text-7xl md:text-8xl font-black mb-4 tabular-nums drop-shadow-lg">
                        ${result.futureValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </div>
                    <p className="text-blue-200/60 text-sm font-medium">After {investmentLength} years of execution</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white border-2 border-gray-50 p-8 rounded-3xl shadow-sm text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gray-200"></div>
                        <span className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest font-mono">Labor Yield (Principal)</span>
                        <div className="text-4xl font-black text-gray-900">${result.totalContributed.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                        <div className="w-full h-2 bg-gray-100 rounded-full mt-6">
                            <div className="h-full bg-blue-500 rounded-full transition-all duration-1000" style={{ width: `${(result.totalContributed / result.futureValue) * 100}%` }}></div>
                        </div>
                    </div>
                    <div className="bg-white border-2 border-gray-50 p-8 rounded-3xl shadow-sm text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-emerald-100"></div>
                        <span className="block text-[10px] font-black text-emerald-400 uppercase mb-2 tracking-widest font-mono">Capital Yield (Interest)</span>
                        <div className="text-4xl font-black text-emerald-600">${result.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                        <div className="w-full h-2 bg-gray-100 rounded-full mt-6">
                            <div className="h-full bg-emerald-500 rounded-full transition-all duration-1000" style={{ width: `${(result.totalInterest / result.futureValue) * 100}%` }}></div>
                        </div>
                    </div>
                </div>
            </>
          ) : (
             <div className="h-full border-4 border-dashed border-gray-100 rounded-[40px] flex flex-col items-center justify-center p-20 text-center text-gray-200 group">
                <p className="text-8xl mb-6 group-hover:scale-110 transition-transform duration-500">💎</p>
                <p className="font-black text-2xl uppercase tracking-[0.2em] mb-4 text-gray-400">Wealth Architecture</p>
                <p className="max-w-md text-sm text-gray-400 font-medium">Define your inputs to visualize the compounding avalanche that turns consistent labor into generational wealth.</p>
             </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title={investmentSeoData.title}
        whatIsIt={investmentSeoData.whatIsIt}
        formula={investmentSeoData.formula}
        example={investmentSeoData.example}
        useCases={investmentSeoData.useCases}
        faqs={investmentSeoData.faqs}
        deepDive={investmentSeoData.deepDive}
        glossary={investmentSeoData.glossary}
        relatedCalculators={[
          {
            name: "Compound Interest Calculator",
            path: "/compound-interest-calculator/",
            desc: "Focus specifically on the frequency of interest-on-interest accumulation.",
          },
          {
            name: "ROI Calculator",
            path: "/roi-calculator/",
            desc: "Calculate the specialized profit percentage of a completed investment.",
          },
          {
            name: "Savings Goal Calculator",
            path: "/savings-goal-calculator/",
            desc: "Define your target and work backward to find the necessary savings velocity.",
          },
          {
            name: "Retirement Calculator",
            path: "/retirement-calculator/",
            desc: "Advanced modeling for tax brackets, social security, and withdrawal phases.",
          }
        ]}
      />
    </div>
  );
}
