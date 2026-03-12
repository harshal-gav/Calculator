"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

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
    const principal = parseFloat(startingAmount);
    const rate = parseFloat(returnRate) / 100 / 12;
    const years = parseFloat(investmentLength);
    const monthlyExtra = parseFloat(contribution);
    const freq = contributionFreq;

    if (!isNaN(principal)) {
      const months = years * 12;
      let total = principal;
      let totalDeposited = principal;

      for (let i = 0; i < months; i++) {
        // Daily/Monthly compounding simplification
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
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-gray-900 border-b pb-4 shadow-sm inline-block px-2">
        Investment Growth Calculator
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Visualize your wealth. See how small, consistent contributions combined with time and compound interest create massive long-term value.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-4 bg-gray-50 p-6 rounded-2xl border border-gray-100">
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Starting Amount ($):</label>
              <input type="number" value={startingAmount} onChange={(e) => setStartingAmount(e.target.value)} className="w-full rounded border-gray-300 p-3 font-black text-gray-900" />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-1 uppercase">Return (%)</label>
                  <input type="number" value={returnRate} onChange={(e) => setReturnRate(e.target.value)} className="w-full rounded border-gray-300 p-3" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-1 uppercase">Years</label>
                  <input type="number" value={investmentLength} onChange={(e) => setInvestmentLength(e.target.value)} className="w-full rounded border-gray-300 p-3" />
                </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Regular Contribution ($):</label>
              <div className="flex space-x-2">
                <input type="number" value={contribution} onChange={(e) => setContribution(e.target.value)} className="flex-grow rounded border-gray-300 p-3 font-black text-blue-700" />
                <select value={contributionFreq} onChange={(e) => setContributionFreq(e.target.value)} className="rounded border-gray-300 p-3 text-xs bg-white">
                    <option value="monthly">Monthly</option>
                    <option value="annually">Annually</option>
                </select>
              </div>
            </div>
          </div>

          <button
            onClick={calculateInvestment}
            className="mt-8 w-full bg-blue-600 text-white font-black py-5 rounded-2xl hover:scale-[1.02] transition shadow-xl text-xl uppercase tracking-tighter"
          >
            Calculate Wealth
          </button>
        </div>

        <div className="lg:col-span-8 flex flex-col space-y-6">
          {result !== null ? (
            <>
                <div className="bg-gradient-to-br from-gray-900 to-blue-900 text-white rounded-3xl p-12 text-center shadow-2xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none"></div>
                    <span className="block text-sm font-bold text-blue-300 uppercase mb-3 tracking-widest font-mono">Future Net Worth</span>
                    <div className="text-8xl font-black mb-4 tabular-nums">
                        ${result.futureValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white border-2 border-gray-50 p-8 rounded-3xl shadow-sm text-center">
                        <span className="block text-xs font-black text-gray-400 uppercase mb-2">Total Contributed</span>
                        <div className="text-3xl font-black text-gray-900">${result.totalContributed.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                        <div className="w-full h-1.5 bg-gray-100 rounded-full mt-4">
                            <div className="h-full bg-blue-400 rounded-full" style={{ width: `${(result.totalContributed / result.futureValue) * 100}%` }}></div>
                        </div>
                    </div>
                    <div className="bg-white border-2 border-gray-50 p-8 rounded-3xl shadow-sm text-center">
                        <span className="block text-xs font-black text-gray-400 uppercase mb-2">Total Interest Earned</span>
                        <div className="text-3xl font-black text-green-600">${result.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                        <div className="w-full h-1.5 bg-gray-100 rounded-full mt-4">
                            <div className="h-full bg-green-500 rounded-full" style={{ width: `${(result.totalInterest / result.futureValue) * 100}%` }}></div>
                        </div>
                    </div>
                </div>
            </>
          ) : (
             <div className="h-full border-4 border-double border-gray-100 rounded-[40px] flex flex-col items-center justify-center p-20 text-center text-gray-200">
                <p className="text-7xl mb-6">💰</p>
                <p className="font-black text-2xl uppercase tracking-[0.2em] mb-4">Compound Your Future</p>
                <p className="max-w-md text-sm text-gray-400 font-medium">Input your investment strategy to see how much of your future wealth comes from interest versus your own pockets.</p>
             </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title="Investment Growth Calculator"
        whatIsIt={
          <>
            <p>
              The <strong>Investment Calculator</strong> is a foundational tool for financial planning. It demonstrates the profound effect of compound interest—the process where your investment's earnings generate their own earnings.
            </p>
          </>
        }
        formula={<></>}
        example={
          <>
            <p>If you invest $10,000 today and add $500 monthly for 20 years at an 8% return:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
              <li>Your total contributions: $130,000.</li>
              <li>Your total interest earned: <strong>$218,800</strong>.</li>
              <li>Estimated future balance: <strong>$348,800</strong>.</li>
            </ul>
          </>
        }
        useCases={<ul className="list-disc pl-6 space-y-4"><li><strong>Wealth Accumulation:</strong> Compare different asset classes by adjusting the annual return percentage to see long-term outcomes.</li></ul>}
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
              name: "Loan Payment Calculator",
              path: "/loan-payment-calculator",
              desc: "Estimate your monthly loan payments and total interest cost.",
            },
            {
              name: "Salary Calculator",
              path: "/salary-calculator",
              desc: "Convert your salary between hourly, weekly, monthly, and yearly rates.",
            }]}
      />
    </div>
  );
}
