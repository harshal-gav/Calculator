"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function DownPaymentCalculator() {
  const [homePrice, setHomePrice] = useState("400000");
  const [targetPercentage, setTargetPercentage] = useState("20");
  const [currentSavings, setCurrentSavings] = useState("25000");
  const [monthlyContribution, setMonthlyContribution] = useState("1000");
  const [interestRate, setInterestRate] = useState("4");

  const [result, setResult] = useState<{
    targetAmount: number;
    remainingAmount: number;
    monthsToGoal: number;
    yearsToGoal: number;
    totalInterestEarned: number;
  } | null>(null);

  const calculate = () => {
    const price = parseFloat(homePrice);
    const targetPerc = parseFloat(targetPercentage) / 100;
    const current = parseFloat(currentSavings);
    const monthly = parseFloat(monthlyContribution);
    const rate = parseFloat(interestRate) / 100 / 12;

    const targetAmount = price * targetPerc;
    const needed = targetAmount - current;

    if (needed <= 0) {
        setResult({
            targetAmount,
            remainingAmount: 0,
            monthsToGoal: 0,
            yearsToGoal: 0,
            totalInterestEarned: 0
        });
        return;
    }

    if (monthly <= 0 && rate <= 0) {
        return; // Avoid infinite loop
    }

    // FV = P(1+r)^n + PMT [((1+r)^n - 1) / r]
    // We need to solve for n. This is usually done with an iterative loop or logs.
    // Simple iterative approach for clarity and precision
    let n = 0;
    let balance = current;
    while (balance < targetAmount && n < 1200) { // Cap at 100 years
        balance = balance * (1 + rate) + monthly;
        n++;
    }

    setResult({
      targetAmount,
      remainingAmount: needed,
      monthsToGoal: n,
      yearsToGoal: n / 12,
      totalInterestEarned: (targetAmount - current) - (monthly * n) // Rough estimate
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-2xl shadow-xl border border-rose-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-rose-50 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black text-rose-900 tracking-tight text-nowrap">Down Payment Calculator</h1>
          <p className="text-rose-600 font-medium mt-1">Estimate how long it will take to save for your dream home.</p>
        </div>
        <div className="bg-rose-50 px-4 py-2 rounded-full border border-rose-100 shrink-0">
          <span className="text-rose-700 font-bold text-sm uppercase tracking-wider">Home Ownership</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Target Home Price ($)</label>
              <input type="number" value={homePrice} onChange={(e) => setHomePrice(e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-rose-500 focus:ring-0 transition-all font-semibold text-slate-800" />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Target Down Payment (%)</label>
              <input type="number" value={targetPercentage} onChange={(e) => setTargetPercentage(e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-rose-500 focus:ring-0 transition-all font-semibold text-slate-800" />
              <div className="flex justify-between mt-2">
                <button onClick={() => setTargetPercentage("3.5")} className="text-[10px] bg-rose-100 text-rose-700 px-2 py-1 rounded font-bold uppercase transition-colors hover:bg-rose-200">FHA (3.5%)</button>
                <button onClick={() => setTargetPercentage("5")} className="text-[10px] bg-rose-100 text-rose-700 px-2 py-1 rounded font-bold uppercase transition-colors hover:bg-rose-200">Min Conv (5%)</button>
                <button onClick={() => setTargetPercentage("20")} className="text-[10px] bg-rose-100 text-rose-700 px-2 py-1 rounded font-bold uppercase transition-colors hover:bg-rose-200">Standard (20%)</button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Current Savings ($)</label>
                <input type="number" value={currentSavings} onChange={(e) => setCurrentSavings(e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-700 font-bold" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Monthly Deposit ($)</label>
                <input type="number" value={monthlyContribution} onChange={(e) => setMonthlyContribution(e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-700 font-bold" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Savings Interest Rate (%)</label>
              <input type="number" step="0.1" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-rose-500 focus:ring-0 transition-all font-semibold text-slate-800" />
            </div>

            <button onClick={calculate} className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-rose-200 active:scale-[0.98]">
              Calculate Timeline
            </button>
          </div>
        </div>

        <div className="lg:col-span-7">
          {result ? (
            <div className="h-full flex flex-col gap-6">
              <div className="grow bg-gradient-to-br from-rose-500 to-rose-700 rounded-3xl p-10 text-white shadow-xl flex flex-col justify-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                <div className="text-rose-100 text-sm font-bold uppercase tracking-widest mb-2 font-mono">Time to Goal</div>
                <div className="text-8xl font-black mb-4">
                  {result.yearsToGoal.toFixed(1)} <span className="text-3xl uppercase text-rose-200">Years</span>
                </div>
                <div className="flex flex-wrap gap-3">
                    <div className="px-4 py-2 bg-white/20 rounded-xl backdrop-blur-sm">
                        <span className="block text-[10px] uppercase font-bold text-rose-100">Total Savings Required</span>
                        <span className="text-xl font-bold">${result.targetAmount.toLocaleString()}</span>
                    </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl">
                  <div className="text-slate-400 text-xs font-bold uppercase mb-1">Months Left</div>
                  <div className="text-xl font-black text-slate-800">{result.monthsToGoal} Months</div>
                </div>
                <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl">
                  <div className="text-slate-400 text-xs font-bold uppercase mb-1">Remaining to Save</div>
                  <div className="text-xl font-black text-rose-600">${result.remainingAmount.toLocaleString()}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[400px] border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center p-8 text-center bg-rose-50/5">
                <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mb-4 text-rose-600">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2 uppercase tracking-tighter">Your Path to Ownership</h3>
                <p className="text-slate-500 max-w-[320px] font-medium leading-relaxed">Calculate exactly how much you need to set aside each month to hit your down payment goal. Compounding interest in a High-Yield Savings Account (HYSA) can significantly shorten your timeline.</p>
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title="Down Payment Calculator"
        whatIsIt={
          <p>
            A <strong>Down Payment Calculator</strong> is a goal-tracking tool for prospective homebuyers. It calculates the total amount needed for a home purchase based on a percentage of the purchase price and determines the timeline to reach that goal based on monthly savings and high-yield interest rates.
          </p>
        }
        formula={
          <>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 font-mono text-lg text-indigo-700 text-center shadow-sm my-6">
              Down Payment Analysis Model
            </div>
            <p className="text-sm text-slate-500 text-center">
              This tool utilize standardized mathematical formulas and logic to calculate precise Down Payment results.
            </p>
          </>
        }
        example={
          <p>
            To buy a **$400,000** home with **20% down ($80,000)**, if you have **$25,000** already and save **$1,500** monthly at **4% interest**, you will hit your goal in approximately **35 months** (under 3 years).
          </p>
        }
        useCases={
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Timeline Planning:</strong> Estimating if you'll be ready to buy next year or the year after.</li>
            <li><strong>Savings Optimization:</strong> Seeing how an extra $200/month affects your "buy date."</li>
            <li><strong>Mortgage Type Choice:</strong> Comparing the savings difficulty of a 3.5% FHA loan vs. a 20% Conventional loan.</li>
          </ul>
        }
        faqs={[
          {
            question: "Do I really need 20% down?",
            answer: "No. While 20% eliminates Private Mortgage Insurance (PMI), many people buy homes with as little as 3% or 3.5% (FHA) down."
          },
          {
            question: "What is a good savings interest rate?",
            answer: "In the current market, High-Yield Savings Accounts (HYSA) typically offer between 4% and 5% APY."
          },
            {
              question: "How accurate is this calculator?",
              answer: "Our calculator uses industry-standard formulas to provide the most accurate results possible. However, it should be used for informational purposes only and not as a basis for formal calculations or legal advice.",
            }]}
          relatedCalculators={[
            {
              name: "Mortgage Calculator",
              path: "/mortgage-calculator/",
              desc: "Calculate your monthly mortgage payments and amortization schedule.",
            },
            {
              name: "ROI Calculator",
              path: "/roi-calculator/",
              desc: "Calculate your exact annualized percentage returns.",
            },
            {
              name: "Investment Calculator",
              path: "/investment-calculator/",
              desc: "Project your portfolio growth over time with compound interest.",
            },
            {
              name: "Loan Payment Calculator",
              path: "/loan-payment-calculator/",
              desc: "Estimate your monthly loan payments and total interest cost.",
            }
          ]}
      />
    </div>
  );
}
