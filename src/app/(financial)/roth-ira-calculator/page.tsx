"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function RothIRACalculator() {
  const [currentAge, setCurrentAge] = useState("30");
  const [retirementAge, setRetirementAge] = useState("65");
  const [currentBalance, setCurrentBalance] = useState("5000");
  const [annualContribution, setAnnualContribution] = useState("7000");
  const [expectedReturn, setExpectedReturn] = useState("7");
  const [currentTaxRate, setCurrentTaxRate] = useState("22");
  const [retirementTaxRate, setRetirementTaxRate] = useState("15");

  const [result, setResult] = useState<{
    totalValue: number;
    totalContributions: number;
    totalEarnings: number;
    taxSavings: number;
  } | null>(null);

  const calculateRothIRA = () => {
    const age = parseInt(currentAge);
    const retireAge = parseInt(retirementAge);
    const initial = parseFloat(currentBalance);
    const monthlyContrib = parseFloat(annualContribution) / 12;
    const rate = parseFloat(expectedReturn) / 100 / 12;
    const years = retireAge - age;
    const months = years * 12;

    if (!isNaN(age) && !isNaN(retireAge) && years > 0) {
      let balance = initial;
      let totalContrib = initial;

      for (let i = 0; i < months; i++) {
        balance = (balance + monthlyContrib) * (1 + rate);
        totalContrib += monthlyContrib;
      }

      const totalEarnings = balance - totalContrib;
      
      // Tax savings is roughly the earnings that aren't taxed at the retirement rate
      // Plus the benefit of not having paid tax on withdrawals later (simplified)
      const taxSavings = totalEarnings * (parseFloat(retirementTaxRate) / 100);

      setResult({
        totalValue: balance,
        totalContributions: totalContrib,
        totalEarnings,
        taxSavings,
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-2xl shadow-xl border border-orange-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-orange-50 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black text-orange-900 tracking-tight">Roth IRA Calculator</h1>
          <p className="text-orange-600 font-medium mt-1">Project your tax-free retirement savings growth.</p>
        </div>
        <div className="bg-orange-50 px-4 py-2 rounded-full border border-orange-100">
          <span className="text-orange-700 font-bold text-sm uppercase tracking-wider text-nowrap">Retirement Planning</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Current Age</label>
                <input
                  type="number"
                  value={currentAge}
                  onChange={(e) => setCurrentAge(e.target.value)}
                  className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-orange-500 focus:ring-0 transition-all font-semibold text-slate-800"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Retirement Age</label>
                <input
                  type="number"
                  value={retirementAge}
                  onChange={(e) => setRetirementAge(e.target.value)}
                  className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-orange-500 focus:ring-0 transition-all font-semibold text-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Current Balance ($)</label>
              <input
                type="number"
                value={currentBalance}
                onChange={(e) => setCurrentBalance(e.target.value)}
                className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-orange-500 focus:ring-0 transition-all font-semibold text-slate-800"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Annual Contribution ($)</label>
              <input
                type="number"
                value={annualContribution}
                onChange={(e) => setAnnualContribution(e.target.value)}
                className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-orange-500 focus:ring-0 transition-all font-semibold text-slate-800"
              />
              <p className="text-xs text-slate-400 mt-1">2024 Limit: $7,000 ($8,000 if 50+)</p>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Expected Annual Return (%)</label>
              <input
                type="number"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(e.target.value)}
                className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-orange-500 focus:ring-0 transition-all font-semibold text-slate-800"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Retire Tax Rate (%)</label>
                <input
                  type="number"
                  value={retirementTaxRate}
                  onChange={(e) => setRetirementTaxRate(e.target.value)}
                  className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-orange-500 focus:ring-0 transition-all font-semibold text-slate-800"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={calculateRothIRA}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-orange-200 active:scale-[0.98]"
                >
                  Calculate
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          {result ? (
            <div className="h-full flex flex-col gap-6">
              <div className="bg-gradient-to-br from-orange-600 to-red-700 rounded-3xl p-8 text-white shadow-xl flex flex-col justify-center grow">
                <div className="text-orange-100 text-sm font-bold uppercase tracking-widest mb-2">Projected Value at {retirementAge}</div>
                <div className="text-6xl font-black mb-4">
                  ${result.totalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </div>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 text-white text-sm font-bold backdrop-blur-sm self-start">
                  All Withdrawals are 100% Tax-Free
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl">
                  <div className="text-slate-500 text-xs font-bold uppercase mb-1">Total Contributions</div>
                  <div className="text-xl font-black text-slate-800">${result.totalContributions.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                </div>
                <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl">
                  <div className="text-slate-500 text-xs font-bold uppercase mb-1">Total Earnings</div>
                  <div className="text-xl font-black text-emerald-600">${result.totalEarnings.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                </div>
                <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl">
                  <div className="text-emerald-700 text-xs font-bold uppercase mb-1">Retire Tax Benefit</div>
                  <div className="text-xl font-black text-emerald-700">${result.taxSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[400px] border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center p-8 text-center bg-slate-50/50">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4 text-orange-600">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Retirement Insight</h3>
              <p className="text-slate-500 max-w-[280px]">Input your details to see how tax-free growth can accelerate your wealth.</p>
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title="Roth IRA Calculator"
        whatIsIt={
          <p>
            A <strong>Roth IRA Calculator</strong> estimates the future value of a Roth Individual Retirement Account. Unlike a Traditional IRA, Roth contributions are made with after-tax dollars, meaning your investments grow tax-free and withdrawals in retirement are also tax-free.
          </p>
        }
        formula={
          <div className="space-y-4">
            <p>The calculator uses the compound interest formula with regular monthly contributions:</p>
            <div className="bg-slate-50 p-4 rounded-xl font-mono text-sm overflow-x-auto">
              Future Value = P × (1 + r)ⁿ + PMT × [((1 + r)ⁿ - 1) / r] × (1 + r)
            </div>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>P:</strong> Principal (Initial Balance)</li>
              <li><strong>PMT:</strong> Monthly Contribution</li>
              <li><strong>r:</strong> Monthly Interest Rate (Annual Rate / 12)</li>
              <li><strong>n:</strong> Total number of months</li>
            </ul>
          </div>
        }
        example={
          <p>
            If you start with $5,000 at age 30, contribute $500 per month until age 65, and earn an average 7% annual return, your Roth IRA could grow to nearly <strong>$1,000,000</strong>. Because it's a Roth account, you could withdraw that entire million tax-free, potentially saving you hundreds of thousands in taxes compared to a taxable account.
          </p>
        }
        useCases={
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Retirement Planning:</strong> Visualizing long-term wealth accumulation.</li>
            <li><strong>Tax Strategy:</strong> Comparing the benefits of tax-free growth vs. immediate tax deductions.</li>
            <li><strong>Contribution Planning:</strong> Determining how much you need to save monthly to reach a goal.</li>
          </ul>
        }
        faqs={[
          {
            question: "What is the contribution limit for 2024?",
            answer: "For 2024, the limit is $7,000 per year, or $8,000 if you are age 50 or older."
          },
          {
            question: "Can I withdraw from my Roth IRA before 59½?",
            answer: "You can withdraw your contributions (the principle) at any time tax and penalty-free. However, withdrawing earnings before age 59½ may trigger taxes and a 10% penalty unless it's for a qualifying reason like a first-home purchase."
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
