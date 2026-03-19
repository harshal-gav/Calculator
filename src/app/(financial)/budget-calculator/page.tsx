"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function BudgetCalculator() {
  const [income, setIncome] = useState("5000");
  const [rent, setRent] = useState("1500");
  const [groceries, setGroceries] = useState("400");
  const [utilities, setUtilities] = useState("200");
  const [entertainment, setEntertainment] = useState("300");
  const [debt, setDebt] = useState("200");

  const [result, setResult] = useState<{
    totalNeeds: number;
    totalWants: number;
    totalSavings: number;
    remaining: number;
    needsPct: number;
    wantsPct: number;
    savingsPct: number;
  } | null>(null);

  const calculateBudget = () => {
    const inc = parseFloat(income);
    const r = parseFloat(rent);
    const groc = parseFloat(groceries);
    const util = parseFloat(utilities);
    const ent = parseFloat(entertainment);
    const d = parseFloat(debt);

    if (!isNaN(inc) && inc > 0) {
      const needs = r + groc + util + d;
      const wants = ent;
      const savings = inc - needs - wants;

      setResult({
        totalNeeds: needs,
        totalWants: wants,
        totalSavings: Math.max(0, savings),
        remaining: savings,
        needsPct: (needs / inc) * 100,
        wantsPct: (wants / inc) * 100,
        savingsPct: (Math.max(0, savings) / inc) * 100
      });
    } else {
        setResult(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-gray-900 border-b pb-4">
        50/30/20 Budget Calculator
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Balanced your lifestyle. Use the effective 50/30/20 financial rule to allocate your after-tax income across essentials, lifestyle, and financial goals.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-4 bg-gray-50 p-6 rounded-xl border border-gray-200">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Monthly After-Tax Income ($):</label>
              <input type="number" value={income} onChange={(e) => setIncome(e.target.value)} className="w-full rounded border-gray-300 p-2 font-bold text-gray-900 focus:ring-purple-500" />
            </div>

            <div className="pt-4 space-y-3">
                <h3 className="text-xs font-bold text-purple-800 uppercase tracking-widest">Essentials (Needs)</h3>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Rent / Mortgage ($):</label>
                  <input type="number" value={rent} onChange={(e) => setRent(e.target.value)} className="w-full rounded border-gray-300 p-2 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Groceries ($):</label>
                  <input type="number" value={groceries} onChange={(e) => setGroceries(e.target.value)} className="w-full rounded border-gray-300 p-2 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Min Debt Payments ($):</label>
                  <input type="number" value={debt} onChange={(e) => setDebt(e.target.value)} className="w-full rounded border-gray-300 p-2 text-sm" />
                </div>
            </div>

            <div className="pt-4 space-y-3">
                <h3 className="text-xs font-bold text-purple-800 uppercase tracking-widest">Lifestyle (Wants)</h3>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Dining / Leisure / Subs ($):</label>
                  <input type="number" value={entertainment} onChange={(e) => setEntertainment(e.target.value)} className="w-full rounded border-gray-300 p-2 text-sm" />
                </div>
            </div>
          </div>

          <button
            onClick={calculateBudget}
            className="mt-8 w-full bg-purple-600 text-white font-bold py-4 rounded-xl hover:bg-purple-700 transition shadow-lg text-lg uppercase"
          >
            Calculate Budget
          </button>
        </div>

        <div className="lg:col-span-8 space-y-8">
          {result !== null ? (
            <>
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 bg-white border border-gray-200 p-6 rounded-xl shadow-sm relative overflow-hidden">
                        <div className={`h-1 absolute top-0 left-0 bg-rose-500`} style={{ width: `${Math.min(100, result.needsPct)}%` }}></div>
                        <span className="block text-xs font-bold text-gray-500 uppercase mb-2">Needs (Goal: 50%)</span>
                        <span className={`text-4xl font-black ${result.needsPct > 50 ? 'text-rose-600' : 'text-gray-900'}`}>
                            {result.needsPct.toFixed(1)}%
                        </span>
                        <p className="text-xs text-gray-400 mt-2">${result.totalNeeds.toLocaleString()} / mo</p>
                    </div>
                    <div className="flex-1 bg-white border border-gray-200 p-6 rounded-xl shadow-sm relative overflow-hidden">
                        <div className={`h-1 absolute top-0 left-0 bg-blue-500`} style={{ width: `${Math.min(100, result.wantsPct)}%` }}></div>
                        <span className="block text-xs font-bold text-gray-500 uppercase mb-2">Wants (Goal: 30%)</span>
                        <span className={`text-4xl font-black ${result.wantsPct > 30 ? 'text-blue-600' : 'text-gray-900'}`}>
                            {result.wantsPct.toFixed(1)}%
                        </span>
                        <p className="text-xs text-gray-400 mt-2">${result.totalWants.toLocaleString()} / mo</p>
                    </div>
                    <div className="flex-1 bg-white border border-gray-200 p-6 rounded-xl shadow-sm relative overflow-hidden">
                        <div className={`h-1 absolute top-0 left-0 bg-green-500`} style={{ width: `${Math.min(100, result.savingsPct)}%` }}></div>
                        <span className="block text-xs font-bold text-gray-500 uppercase mb-2">Savings (Goal: 20%)</span>
                        <span className={`text-4xl font-black ${result.savingsPct < 20 ? 'text-amber-600' : 'text-green-600'}`}>
                            {result.savingsPct.toFixed(1)}%
                        </span>
                        <p className="text-xs text-gray-400 mt-2">${result.totalSavings.toLocaleString()} / mo</p>
                    </div>
                </div>

                <div className="bg-purple-50 p-8 rounded-2xl border border-purple-100">
                    <h4 className="text-lg font-bold text-purple-900 mb-4">Financial Health Check</h4>
                    {result.remaining > 0 ? (
                        <p className="text-purple-800">
                            Excellent! You have <b>${result.remaining.toLocaleString()}</b> left over after your current expenses. We recommend moving this extra cash directly into a High-Yield Savings Account or an Index Fund.
                        </p>
                    ) : (
                        <p className="text-rose-800 font-medium">
                            Warning: Your current needs and wants are exceeding your income by <b>${Math.abs(result.remaining).toLocaleString()}</b>. You may be relying on credit cards to bridge the gap. Consider downsizing your housing or reducing your discretionary "wants" immediately.
                        </p>
                    )}
                </div>
            </>
          ) : (
             <div className="h-full border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center p-8 text-center text-gray-500">
                Map your spending habits to see if you are on track for long-term wealth building or living beyond your means.
             </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title="50/30/20 Budget Calculator"
        whatIsIt={
          <>
            <p>
              The <strong>Budget Calculator</strong> leverages the famous 50/30/20 rule established by Senator Elizabeth Warren. It is a simple, high-level blueprint for managing personal cash flow without the complexity of tracking every individual cent.
            </p>
          </>
        }
        formula={<></>}
        example={
          <>
            <p>If you take home $5,000 per month after taxes:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
              <li><strong>Needs (50%):</strong> $2,500 for rent, insurance, gas, and basic groceries.</li>
              <li><strong>Wants (30%):</strong> $1,500 for Netflix, Starbucks, dining out, and travel.</li>
              <li><strong>Savings (20%):</strong> $1,000 for emergency funds and retirement accounts.</li>
            </ul>
          </>
        }
        useCases={<ul className="list-disc pl-6 space-y-4"><li><strong>Lifestyle Inflation Check:</strong> Whenever you receive a raise at work, run your new salary through this calculator to ensure you aren't immediately increasing your "wants" and keeping your "savings" stagnant.</li></ul>}
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
            }]}
      />
    </div>
  );
}
