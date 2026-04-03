"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

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
        title="Savings Goal Calculator: Reverse-Engineering Your Path to Financial Milestones"
        whatIsIt={
          <div className="space-y-6">
            <p className="text-xl font-medium leading-relaxed">
              A <strong>Savings Goal Calculator</strong> is a strategic financial modeling tool that performs "Inverse Compound Interest" calculations. While a standard savings calculator tells you how much your money will grow, a goal planner works backward from a desired future sum (e.g., a $50,000 house down payment) to determine precisely how much capital you must deploy today and every month hereafter to hit that target on schedule.
            </p>
            <p className="leading-relaxed">
              This tool is essential for <strong>intentional wealth building</strong>. Most savers fall into the "residual saving" trap—saving only what is left over at the end of the month. Successful financial planning requires a "pay yourself first" mentality, where the savings goal becomes a non-negotiable monthly expense. By quantifying the exact dollar amount needed, you can automate your progress and remove the psychological friction of deciding how much to save.
            </p>
            <p className="leading-relaxed">
              Whether you are planning for a wedding, a child's college tuition, a dream vacation, or a 6-month emergency fund, this calculator provides the mathematical clarity needed to turn a vague desire into a concrete reality. It uniquely accounts for the "Interest Discount"—the portion of your goal that is paid for by the bank through compounding interest rather than your own paycheck.
            </p>
          </div>
        }
        comparisonTable={{
          title: "The Impact of Time & Interest on a $100,000 Goal",
          headers: ["Strategy", "Timeframe", "APY", "Monthly Deposit", "You Contribute", "Market Interest Pays"],
          rows: [
            ["Aggressive Early", "5 Years", "5.0%", "$1,470", "$88,200", "$11,800"],
            ["Standard Pacing", "10 Years", "5.0%", "$644", "$77,280", "$22,720"],
            ["Long-term Wealth", "20 Years", "5.0%", "$243", "$58,320", "$41,680"],
            ["Zero-Interest (Cash)", "10 Years", "0.0%", "$833", "$100,000", "$0 (Inflation Loss)"],
          ]
        }}
        formula={
          <>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 font-mono text-lg text-indigo-700 text-center shadow-sm my-6">
              Savings Goal Analysis Model
            </div>
            <p className="text-sm text-slate-500 text-center">
              This tool utilize standardized mathematical formulas and logic to calculate precise Savings Goal results.
            </p>
          </>
        }
          example={
          <div className="bg-slate-900 text-white p-10 md:p-14 rounded-[3rem] shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-500"></div>
             <h5 className="font-black text-amber-400 uppercase tracking-widest text-xs mb-10">Case Study: The First-Home Down Payment</h5>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="space-y-4">
                  <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-widest">The Target</span>
                  <div className="text-3xl font-black">$40,000 Cash</div>
                  <p className="text-xs text-slate-400">Timeline: 36 Months <br/> Rate: 4.5% APY</p>
                </div>
                <div className="space-y-4">
                  <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-widest">The Requirement</span>
                  <div className="text-3xl font-black text-amber-400">$1,040/mo</div>
                  <p className="text-xs text-slate-400">Total Contribution: $37,440</p>
                </div>
                <div className="space-y-4">
                  <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-widest">The Interest Win</span>
                  <div className="text-3xl font-black text-emerald-400">$2,560 Saved</div>
                  <p className="text-xs text-slate-400 italic">"The bank paid for 6% of your house for you."</p>
                </div>
             </div>
          </div>
        }
        useCases={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 bg-white border border-neutral-100 rounded-[2rem] shadow-sm hover:translate-y-[-4px] transition-transform">
               <h5 className="font-black text-slate-900 text-[10px] uppercase mb-3 tracking-widest">House Down Payment</h5>
               <p className="text-xs text-slate-500 leading-relaxed">Determine how much of your "home fund" can be generated through interest rather than just your salary.</p>
            </div>
            <div className="p-8 bg-white border border-neutral-100 rounded-[2rem] shadow-sm hover:translate-y-[-4px] transition-transform">
               <h5 className="font-black text-slate-900 text-[10px] uppercase mb-3 tracking-widest">Dream Vacation</h5>
               <p className="text-xs text-slate-500 leading-relaxed">Break a $5,000 anniversary trip into 12 small installments instead of one large credit card bill.</p>
            </div>
            <div className="p-8 bg-white border border-neutral-100 rounded-[2rem] shadow-sm hover:translate-y-[-4px] transition-transform">
               <h5 className="font-black text-slate-900 text-[10px] uppercase mb-3 tracking-widest">Engagement Rings</h5>
               <p className="text-xs text-slate-500 leading-relaxed">Reverse-engineer the timeline for a luxury purchase to avoid high-interest jewelry store financing.</p>
            </div>
            <div className="p-8 bg-white border border-neutral-100 rounded-[2rem] shadow-sm hover:translate-y-[-4px] transition-transform">
               <h5 className="font-black text-slate-900 text-[10px] uppercase mb-3 tracking-widest">Emergency Resilience</h5>
               <p className="text-xs text-slate-500 leading-relaxed">See how long it truly takes to hit a "Peace of Mind" number—typically 6 months of expenses.</p>
            </div>
          </div>
        }
        glossary={[
          { term: "APY (Annual Percentage Yield)", definition: "The real rate of return earned on a savings deposit, taking into account the effect of compounding interest over a year." },
          { term: "Sinking Fund", definition: "A strategic fund formed by setting aside money periodically for a specific future purchase or debt repayment." },
          { term: "Compounding Frequency", definition: "How often interest is added to the principal balance (e.g., daily, monthly) to earn interest on itself." },
          { term: "Time Horizon", definition: "The total length of time you plan to save before you need to spend the money." },
          { term: "Principal", definition: "The original sum of money you have saved, separate from any interest earned." },
          { term: "Market Discount", definition: "A conceptual term for the portion of your goal that is covered by investment or interest growth rather than your contributions." },
          { term: "Emergency Buffer", definition: "Liquidity held specifically to cover unexpected life events (e.g., car repairs, job loss)." },
          { term: "FDIC Insurance", definition: "US Government protection for bank deposits up to $250,000 per depositor; essential for goal safety." },
        ]}
        faqs={[
          {
            question: "Is it better to pay off debt or save for a goal?",
            answer: "Mathematically, if your debt interest rate (e.g., 20% credit card) is higher than your savings rate (e.g., 4.5% APY), you should pay off the debt first. However, having a $2,000 'starter emergency fund' is often recommended before aggressive debt payoff."
          },
          {
            question: "Where should I keep my goal savings?",
            answer: "For timelines under 3 years, keep the money in a High-Yield Savings Account (HYSA) or a Certificate of Deposit (CD). For timelines over 5-10 years, you might consider a low-cost index fund, though this introduces risk of losing principal."
          },
          {
            question: "How do I account for taxes on my interest?",
            answer: "Interest earned in a HYSA is taxed as ordinary income. If you are in a 22% tax bracket, your 'real' APY is 22% lower than the advertised rate. Our calculator shows pre-tax results; adjust your target up by 15-20% if accuracy is critical."
          },
          {
            question: "Can I hit my goal faster with a CD?",
            answer: "A CD (Certificate of Deposit) often offers a slightly higher rate than a HYSA but locks your money away for a fixed term. Use a CD if you have a very strict deadline and want to lock in a guaranteed interest rate."
          },
          {
            question: "What if I can't afford the required monthly deposit?",
            answer: "You have three levers: 1) Increase the timeframe (save for longer), 2) Decrease the goal amount (buy something cheaper), or 3) Find a higher yield (though this usually increases risk)."
          }
        ]}
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
