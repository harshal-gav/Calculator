"use client";

import { useState } from "react";
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

  const calculateGoal = () => {
    const target = parseFloat(goalAmount) || 0;
    const initial = parseFloat(initialSavings) || 0;
    const months = parseFloat(timeframe) || 0;
    const rate = (parseFloat(interestRate) / 100) / 12;

    if (target > 0 && months > 0) {
      let monthlyNeeded = 0;
      
      if (rate > 0) {
        const factor = (Math.pow(1 + rate, months) - 1) / rate;
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
    <div className="max-w-6xl mx-auto p-4 md:p-8 bg-neutral-50 rounded-2xl shadow-xl border border-neutral-200">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black mb-4 text-amber-900 font-serif tracking-tight">
          🎯 Savings Goal Master Planner
        </h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto italic">
          Reverse-engineer your financial success. Find the exact monthly discipline needed to hit your next milestone.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* Controls */}
        <div className="lg:col-span-12 xl:col-span-5 bg-white p-6 md:p-10 rounded-[2.5rem] border border-neutral-200 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-amber-500/10 transition-colors"></div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Target Goal Amount ($)</label>
              <input type="number" value={goalAmount} onChange={(e) => setGoalAmount(e.target.value)} className="w-full rounded-2xl border-neutral-100 bg-neutral-50/50 p-5 font-black text-2xl text-slate-900 focus:ring-4 focus:ring-amber-50 focus:bg-white transition-all shadow-inner" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Initial Balance</label>
                <input type="number" value={initialSavings} onChange={(e) => setInitialSavings(e.target.value)} className="w-full rounded-2xl border-neutral-100 p-4 font-bold text-slate-800" />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">APY %</label>
                <input type="number" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="w-full rounded-2xl border-neutral-100 p-4 font-bold text-amber-600 bg-amber-50/20" />
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-50">
               <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex justify-between">
                 <span>Timeframe to Hit Goal</span>
                 <span className="text-slate-900">{timeframe} Months</span>
               </label>
               <input type="range" min="1" max="120" value={timeframe} onChange={(e) => setTimeframe(e.target.value)} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500 mb-2" />
               <div className="flex justify-between text-[8px] font-black text-slate-300 uppercase">
                 <span>1 Month</span>
                 <span>10 Years</span>
               </div>
            </div>
          </div>

          <button onClick={calculateGoal} className="w-full bg-amber-600 text-white font-black py-6 rounded-2xl hover:bg-amber-700 transition shadow-xl shadow-amber-100 text-sm uppercase tracking-[0.3em] mt-8 hover:scale-[1.01] active:scale-95">
            Generate Roadmap
          </button>
        </div>

        {/* Dashboard */}
        <div className="lg:col-span-12 xl:col-span-7 flex flex-col">
          {result !== null ? (
            <div className="bg-slate-900 rounded-[3rem] p-10 md:p-14 text-white shadow-2xl flex-grow flex flex-col justify-center relative overflow-hidden border border-slate-800">
               <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] -mr-40 -mt-40"></div>
               
               <div className="text-center relative z-10 mb-12">
                  <span className="inline-block px-4 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">Required Monthly Deposit</span>
                  <div className="text-8xl font-black text-white tracking-tighter tabular-nums drop-shadow-sm mb-2">
                    ${result.monthlyNeeded.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                  <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest italic">Maintain for {timeframe} consecutive months</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                  <div className="p-6 bg-white/5 rounded-3xl border border-white/5 flex flex-col justify-center">
                    <span className="text-[9px] font-black text-slate-500 uppercase mb-1">Total Principal Invested</span>
                    <div className="text-2xl font-bold">${result.totalContributed.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                  </div>
                  <div className="p-6 bg-emerald-500/10 rounded-3xl border border-emerald-500/20 flex flex-col justify-center">
                    <span className="text-[9px] font-black text-emerald-500 uppercase mb-1">Interest Earnings Impact</span>
                    <div className="text-2xl font-bold text-emerald-400">+${Math.max(0, result.totalInterest).toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                  </div>
               </div>

               <div className="mt-10 px-4 relative z-10">
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden flex">
                    <div className="h-full bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]" style={{ width: `${(result.totalContributed / parseFloat(goalAmount)) * 100}%` }}></div>
                    <div className="h-full bg-emerald-500" style={{ width: `${(result.totalInterest / parseFloat(goalAmount)) * 100}%` }}></div>
                  </div>
                  <div className="flex justify-between text-[8px] font-black text-slate-500 mt-3 uppercase tracking-widest">
                    <span>You Save (Principal)</span>
                    <span className="text-emerald-500">Market Gains (Interest)</span>
                  </div>
               </div>
            </div>
          ) : (
            <div className="bg-white border-4 border-double border-neutral-100 rounded-[3rem] h-full p-12 flex flex-col items-center justify-center text-center shadow-sm group">
               <div className="w-24 h-24 bg-amber-50 rounded-[2rem] flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-500 shadow-inner">
                  <span className="text-5xl">🎯</span>
               </div>
               <h3 className="text-slate-900 text-3xl font-black mb-3 font-serif italic tracking-tight">What's Your Milestone?</h3>
               <p className="text-slate-400 max-w-xs font-medium leading-relaxed text-sm">Input your dream amount and target date to see a mathematically optimized roadmap for your savings strategy.</p>
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
            name: "Compound Interest Calculator",
            path: "/compound-interest-calculator/",
            desc: "The opposite view: see how your money grows over time without a specific target.",
          },
          {
            name: "Investment Calculator",
            path: "/investment-calculator/",
            desc: "Simulate portfolio growth with variable market returns and risk profiles.",
          },
          {
            name: "Inflation Calculator",
            path: "/inflation-calculator/",
            desc: "Adjust your goal amount for the future cost of living.",
          },
          {
            name: "ROI Calculator",
            path: "/roi-calculator/",
            desc: "Determine the total return on assets you've already purchased.",
          }
        ]}
      />
    </div>
  );
}
