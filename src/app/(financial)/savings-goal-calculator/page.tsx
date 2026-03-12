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
    const target = parseFloat(goalAmount);
    const initial = parseFloat(initialSavings);
    const months = parseFloat(timeframe);
    const rate = (parseFloat(interestRate) / 100) / 12;

    if (!isNaN(target) && target > 0 && months > 0) {
      let monthlyNeeded = 0;
      
      if (rate > 0) {
        // Solving for PMT in Future Value of Ordinary Annuity formula
        // FV = Initial * (1+r)^n + PMT * [((1+r)^n - 1) / r]
        // Target - Initial*(1+r)^n = PMT * [((1+r)^n - 1) / r]
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
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-gray-900 border-b pb-4">
        Savings Goal Planner
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Reverse engineer your success. Find out exactly how much you need to set aside each month to hit your milestone target on time.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Your Savings Goal ($):</label>
              <input type="number" value={goalAmount} onChange={(e) => setGoalAmount(e.target.value)} className="w-full rounded border-gray-300 p-3 font-black text-gray-900 focus:ring-amber-500" placeholder="e.g. 50000" />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Starting Balance ($):</label>
              <input type="number" value={initialSavings} onChange={(e) => setInitialSavings(e.target.value)} className="w-full rounded border-gray-300 p-3" />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Months To Hit:</label>
                  <input type="number" value={timeframe} onChange={(e) => setTimeframe(e.target.value)} className="w-full rounded border-gray-300 p-3 shadow-sm" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">APY (%):</label>
                  <input type="number" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="w-full rounded border-gray-300 p-3 shadow-sm placeholder-gray-300" placeholder="e.g. 4.5" />
                </div>
            </div>
          </div>

          <button
            onClick={calculateGoal}
            className="mt-8 w-full bg-amber-500 text-white font-black py-4 rounded-xl hover:bg-amber-600 transition shadow-lg text-lg uppercase"
          >
            Calculate Required Contribution
          </button>
        </div>

        <div className="flex flex-col">
          {result !== null ? (
            <div className="h-full space-y-6">
                <div className="bg-white border-2 border-amber-100 p-8 rounded-3xl text-center shadow-md relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-full -mr-12 -mt-12 opacity-50"></div>
                    <span className="block text-xs font-bold text-amber-700 uppercase mb-2 tracking-widest">Monthly Deposit Needed</span>
                    <div className="text-6xl font-black text-gray-900 mb-2">
                        ${result.monthlyNeeded.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </div>
                    <p className="text-amber-800 text-xs font-bold bg-amber-50 inline-block px-3 py-1 rounded">For {timeframe} Consecutive Months</p>
                </div>

                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-xs font-bold text-gray-500 uppercase">Growth Breakdown</span>
                        <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-gray-200 uppercase font-black">Target: ${parseFloat(goalAmount).toLocaleString()}</span>
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between items-end">
                            <span className="text-sm text-gray-600">Total Deposits:</span>
                            <span className="font-bold text-gray-900">${result.totalContributed.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                        </div>
                        <div className="flex justify-between items-end">
                            <span className="text-sm text-gray-600 italic">Market Interest Yield:</span>
                            <span className="font-bold text-green-600">+ ${Math.max(0, result.totalInterest).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                        </div>
                        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden flex mt-2">
                            <div className="h-full bg-amber-400" style={{ width: `${(result.totalContributed / parseFloat(goalAmount)) * 100}%` }}></div>
                            <div className="h-full bg-green-500" style={{ width: `${(result.totalInterest / parseFloat(goalAmount)) * 100}%` }}></div>
                        </div>
                    </div>
                </div>
            </div>
          ) : (
             <div className="h-full border-4 border-dashed border-gray-100 rounded-3xl flex flex-col items-center justify-center p-12 text-center text-gray-300">
                <p className="text-5xl mb-4">🎯</p>
                <p className="font-black text-xl uppercase tracking-widest mb-2">Hit Your Targets</p>
                <p className="max-w-xs text-xs font-medium">Input your goal amount and timeframe to get a precise roadmap for your savings strategy.</p>
             </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title="Savings Goal Calculator"
        whatIsIt={
          <>
            <p>
              The <strong>Savings Goal Calculator</strong> works backwards from your desired financial target. By inputting your goal amount, starting balance, and timeline, the tool uses the Future Value of an Annuity formula to solve for the monthly payment required to achieve that goal, factoring in interest growth.
            </p>
          </>
        }
        formula={<></>}
        example={
          <>
            <p>If you want to save $20,000 for a wedding in 2 years (24 months) and have $2,000 to start (4.5% APY):</p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
              <li>Your interest will help you by contributing about $870.</li>
              <li>Your required monthly deposit: <strong>Approximately $715</strong>.</li>
            </ul>
          </>
        }
        useCases={<ul className="list-disc pl-6 space-y-4"><li><strong>Down Payment Savings:</strong> Plan exactly how much to set aside each pay period to buy your first home in 3 years.</li></ul>}
        faqs={[
            {
              question: "How accurate is this calculator?",
              answer: "Our calculator uses industry-standard formulas to provide the most accurate results possible. However, it should be used for informational purposes only and not as a basis for formal calculations or legal advice.",
            },
            {
              question: "Is this tool free to use?",
              answer: "Yes, all our calculators are 100% free to use. We do not require any registration, personal information, or subscriptions.",
            },
            {
              question: "Can I use this on my mobile device?",
              answer: "Absolutely! Our website is fully responsive and optimized for all screen sizes, including smartphones and tablets, so you can calculate on the go.",
            }]}
        relatedCalculators={[
            {
              name: "Mortgage Calculator",
              path: "/mortgage-calculator",
              desc: "Calculate your monthly mortgage payments and amortization schedule.",
            },
            {
              name: "ROI Calculator",
              path: "/roi-calculator",
              desc: "Calculate your exact annualized percentage returns.",
            },
            {
              name: "Investment Calculator",
              path: "/investment-calculator",
              desc: "Project your portfolio growth over time with compound interest.",
            },
            {
              name: "Loan Payment Calculator",
              path: "/loan-payment-calculator",
              desc: "Estimate your monthly loan payments and total interest cost.",
            }]}
      />
    </div>
  );
}
