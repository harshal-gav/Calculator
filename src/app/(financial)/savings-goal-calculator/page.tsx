"use client";

import { useState, useEffect } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import savingsSeoData from "@/data/seo-content/official/savings-goal-calculator.json";

export default function SavingsGoalCalculator() {
  const [goalAmount, setGoalAmount] = useState("50000");
  const [initialSavings, setInitialSavings] = useState("5000");
  const [timeframe, setTimeframe] = useState("24"); // months
  const [interestRate, setInterestRate] = useState("4.5");

  const [result, setResult] = useState<{
    monthlyNeeded: number;
    totalInterest: number;
    totalContributed: number;
  } | null>(null);

  useEffect(() => {
    calculateGoal();
  }, [goalAmount, initialSavings, timeframe, interestRate]);

  const calculateGoal = () => {
    const target = parseFloat(goalAmount) || 0;
    const initial = parseFloat(initialSavings) || 0;
    const months = parseFloat(timeframe) || 0;
    const rate = (parseFloat(interestRate) / 100) / 12;

    if (target > 0 && months > 0) {
      let monthlyNeeded = 0;
      
      if (rate > 0) {
        // PMT = [FV - PV(1+r)^n] / [((1+r)^n - 1) / r * (1+r)]
        // Assuming contribution at start of month
        const factor = ((Math.pow(1 + rate, months) - 1) / rate) * (1 + rate);
        const initialGrowth = initial * Math.pow(1 + rate, months);
        monthlyNeeded = (target - initialGrowth) / factor;
      } else {
        monthlyNeeded = (target - initial) / months;
      }

      const totalContributed = initial + (Math.max(0, monthlyNeeded) * months);

      setResult({
        monthlyNeeded: Math.max(0, monthlyNeeded),
        totalInterest: target - totalContributed,
        totalContributed: totalContributed
      });
    } else {
      setResult(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 bg-white rounded-3xl shadow-xl border border-amber-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-amber-50 pb-8 mb-10 gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-amber-900 tracking-tighter uppercase italic">
            Savings <span className="text-amber-500">Goal</span> Planner
          </h1>
          <p className="text-slate-500 font-medium mt-1 italic text-base">Reverse-engineer your financial milestones.</p>
        </div>
        <div className="hidden md:flex flex-col items-end text-right">
          <div className="bg-amber-50 px-4 py-2 rounded-full border border-amber-100 mb-1">
            <span className="text-amber-700 font-bold text-xs uppercase tracking-widest">Financial Blueprint</span>
          </div>
          <span className="text-[10px] text-amber-400 font-bold uppercase tracking-tighter">Ultra-Expanded Roadmap Edition</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
        {/* Input Sidebar */}
        <div className="lg:col-span-12 xl:col-span-4 space-y-6">
          <div className="p-8 bg-neutral-50 rounded-[2.5rem] border border-neutral-200 space-y-6 shadow-inner relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-amber-500/10 transition-colors"></div>
            
            <h2 className="text-sm font-black text-amber-900 uppercase tracking-[0.3em] mb-4 border-b border-amber-100 pb-3">Ambition Data</h2>
            
            <div>
              <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest leading-none">Target Goal Amount ($)</label>
              <div className="relative">
                 <span className="absolute left-5 top-1/2 -translate-y-1/2 font-black text-amber-500 text-xl">$</span>
                 <input
                  type="number"
                  value={goalAmount}
                  onChange={(e) => setGoalAmount(e.target.value)}
                  className="w-full bg-white border border-neutral-300 rounded-2xl px-10 py-4 focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all font-black text-2xl text-slate-900 shadow-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest leading-none">Initial Savings</label>
                <input
                  type="number"
                  value={initialSavings}
                  onChange={(e) => setInitialSavings(e.target.value)}
                  className="w-full bg-white border border-neutral-300 rounded-2xl px-4 py-4 focus:border-amber-500 transition-all font-bold text-lg text-slate-800"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest leading-none">Annual APY (%)</label>
                <input
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  className="w-full bg-amber-50/50 border border-amber-200 rounded-2xl px-4 py-4 focus:border-amber-500 transition-all font-black text-lg text-amber-700"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-200">
               <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex justify-between">
                 <span>Timeframe to Hit Goal</span>
                 <span className="text-amber-900 font-black">{timeframe} Months</span>
               </label>
               <input
                 type="range"
                 min="1"
                 max="120"
                 value={timeframe}
                 onChange={(e) => setTimeframe(e.target.value)}
                 className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500 mb-3"
               />
               <div className="flex justify-between text-[8px] font-black text-slate-300 uppercase leading-none">
                 <span>1 Month</span>
                 <span>10 Years</span>
               </div>
            </div>

            <button
              onClick={calculateGoal}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-amber-100 uppercase tracking-[0.3em] text-xs hover:translate-y-[-2px] active:translate-y-[1px]"
            >
              Recalculate Roadmap
            </button>
          </div>
        </div>

        {/* Results Canvas */}
        <div className="lg:col-span-12 xl:col-span-8 flex flex-col">
          {result !== null ? (
            <div className="h-full flex flex-col gap-6">
              <div className="bg-slate-900 rounded-[3rem] p-12 md:p-16 text-white shadow-2xl flex flex-col justify-center grow relative overflow-hidden border border-slate-800">
                <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] -mr-40 -mt-40"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-emerald-500/5 rounded-full blur-[100px] -ml-20 -mb-20"></div>
                
                <div className="relative z-10">
                  <span className="inline-block px-4 py-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] mb-8">Monthly Discipline Required</span>
                  <div className="text-8xl md:text-9xl font-black text-white tracking-tighter tabular-nums mb-4 bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
                    ${result.monthlyNeeded.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest leading-none">
                      Mathematically Possible
                    </div>
                    <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest italic">Target Date: {Math.floor(parseInt(timeframe)/12)}y {parseInt(timeframe)%12}m</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border-2 border-slate-100 p-8 rounded-[2rem] shadow-sm flex flex-col justify-center">
                  <div className="text-slate-400 text-[10px] font-black uppercase mb-3 tracking-widest leading-none">Total Personal Deposits</div>
                  <div className="text-4xl font-black text-slate-800">${result.totalContributed.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                </div>
                <div className="bg-emerald-50 border-2 border-emerald-100 p-8 rounded-[2rem] flex flex-col justify-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[8px] font-black px-3 py-1 rounded-bl-xl tracking-tighter uppercase">Interest Bonus</div>
                  <div className="text-emerald-700 text-[10px] font-black uppercase mb-3 tracking-widest leading-none">Passive Growth Earned</div>
                  <div className="text-4xl font-black text-emerald-900">+${Math.max(0, result.totalInterest).toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                  <p className="text-[10px] text-emerald-600 font-bold mt-2">Money "gifted" by compound interest.</p>
                </div>
              </div>

              <div className="bg-neutral-50 border border-neutral-200 p-6 rounded-2xl">
                 <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden flex shadow-inner">
                    <div className="h-full bg-amber-500 transition-all duration-1000 ease-out" style={{ width: `${(result.totalContributed / parseFloat(goalAmount)) * 100}%` }}></div>
                    <div className="h-full bg-emerald-500 transition-all duration-1000 ease-out" style={{ width: `${(Math.max(0, result.totalInterest) / parseFloat(goalAmount)) * 100}%` }}></div>
                 </div>
                 <div className="flex justify-between text-[8px] font-black text-slate-500 mt-4 uppercase tracking-[0.2em]">
                    <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Principal Contribution</span>
                    <span className="flex items-center gap-1.5 text-emerald-600"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Compound Interest Boost</span>
                 </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[500px] border-4 border-double border-neutral-100 rounded-[3rem] flex flex-col items-center justify-center p-12 text-center bg-neutral-50/50">
               <div className="w-24 h-24 bg-amber-100 rounded-[2.5rem] flex items-center justify-center mb-8 shadow-inner animate-pulse">
                  <span className="text-5xl">🎯</span>
               </div>
               <h3 className="text-slate-900 text-3xl font-black mb-4 italic tracking-tight uppercase">Define Your Milestone</h3>
               <p className="text-slate-400 max-w-xs font-medium leading-relaxed text-lg">Input your dream amount and target date to unlock a mathematically optimized roadmap for your future wealth.</p>
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title={savingsSeoData.title}
        whatIsIt={savingsSeoData.whatIsIt}
        formula={savingsSeoData.formula}
        example={savingsSeoData.example}
        useCases={savingsSeoData.useCases}
        faqs={savingsSeoData.faqs}
        deepDive={savingsSeoData.deepDive}
        glossary={savingsSeoData.glossary}
        relatedCalculators={[
          {
            name: "Compound Interest",
            path: "/compound-interest-calculator/",
            desc: "The inverse view: see how your money grows over time without a specific target.",
          },
          {
            name: "Investment",
            path: "/investment-calculator/",
            desc: "Simulate portfolio growth with variable market returns and risk profiles.",
          },
          {
            name: "Inflation",
            path: "/inflation-calculator/",
            desc: "Adjust your goal amount for the future cost of living and purchasing power.",
          },
          {
            name: "ROI",
            path: "/roi-calculator/",
            desc: "Determine the total percentage return on assets you've already acquired.",
          }
        ]}
      />
    </div>
  );
}
