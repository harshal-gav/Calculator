"use client";

import { useState, useEffect } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function PaycheckCalculator() {
  const [grossIncome, setGrossIncome] = useState("60000");
  const [period, setPeriod] = useState("annual"); // hour, week, biweekly, month, annual
  const [filingStatus, setFilingStatus] = useState("single");
  const [stateTaxRate, setStateTaxRate] = useState("5");

  const [result, setResult] = useState({
    grossPerPeriod: 0,
    federalTax: 0,
    stateTax: 0,
    fica: 0,
    netPay: 0,
  });

  useEffect(() => {
    calculatePaycheck();
  }, [grossIncome, period, filingStatus, stateTaxRate]);

  const calculatePaycheck = () => {
    const grossVal = parseFloat(grossIncome) || 0;
    let annualGross = 0;

    switch (period) {
      case "hour": annualGross = grossVal * 2080; break;
      case "week": annualGross = grossVal * 52; break;
      case "biweekly": annualGross = grossVal * 26; break;
      case "month": annualGross = grossVal * 12; break;
      case "annual": annualGross = grossVal; break;
    }

    // Simplified 2024-ish Federal Tax Bracket logic (Single)
    // 10% on first $11,600
    // 12% on $11,601 to $47,150
    // 22% on $47,151 to $100,525
    let fedTax = 0;
    const income = Math.max(0, annualGross - 14600); // Standard Deduction approx

    if (income <= 11600) {
      fedTax = income * 0.1;
    } else if (income <= 47150) {
      fedTax = 1160 + (income - 11600) * 0.12;
    } else if (income <= 100525) {
      fedTax = 1160 + 4266 + (income - 47150) * 0.22;
    } else {
      fedTax = 1160 + 4266 + 11742 + (income - 100525) * 0.24;
    }

    const fica = annualGross * 0.0765; // SS + Medicare
    const stateTax = annualGross * (parseFloat(stateTaxRate) / 100);
    
    let periods = 1;
    if (period === "hour") periods = 2080;
    if (period === "week") periods = 52;
    if (period === "biweekly") periods = 26;
    if (period === "month") periods = 12;

    setResult({
      grossPerPeriod: annualGross / periods,
      federalTax: fedTax / periods,
      stateTax: stateTax / periods,
      fica: fica / periods,
      netPay: (annualGross - fedTax - fica - stateTax) / periods,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-slate-800 border-b pb-4 text-center">
        Paycheck Calculator
      </h1>
      <p className="mb-8 text-gray-500 text-center max-w-2xl mx-auto">
        Calculate your estimate take-home pay after Federal, State, and FICA taxes.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* User Configuration */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-tight">Income Amount ($)</label>
            <input
              type="number"
              value={grossIncome}
              onChange={(e) => setGrossIncome(e.target.value)}
              className="w-full rounded-xl border-slate-300 p-4 border-2 focus:border-slate-800 font-bold text-2xl text-slate-900 transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-tight">Frequency</label>
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="w-full rounded-xl border-slate-300 p-3 border-2 focus:border-slate-800 font-semibold"
              >
                <option value="hour">Hourly</option>
                <option value="week">Weekly</option>
                <option value="biweekly">Bi-weekly</option>
                <option value="month">Monthly</option>
                <option value="annual">Annual</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-tight">Filing Status</label>
              <select
                value={filingStatus}
                onChange={(e) => setFilingStatus(e.target.value)}
                className="w-full rounded-xl border-slate-300 p-3 border-2 focus:border-slate-800 font-semibold"
              >
                <option value="single">Single</option>
                <option value="married">Married (Joint)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-tight flex justify-between">
              State Tax Rate (%)
              <span className="text-slate-400 font-normal lowercase italic">est. avg 5%</span>
            </label>
            <input
              type="range"
              min="0"
              max="15"
              step="0.1"
              value={stateTaxRate}
              onChange={(e) => setStateTaxRate(e.target.value)}
              className="w-full accent-slate-800 cursor-pointer"
            />
            <div className="text-right font-black text-slate-800 mt-1">{stateTaxRate}%</div>
          </div>
        </div>

        {/* Breakdown Card */}
        <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between">
          <div className="relative z-10">
            <h3 className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-1">Estimate Take Home Pay</h3>
            <div className="text-5xl font-black mb-1 p-0 leading-none">
              ${result.netPay.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <p className="text-slate-400 text-sm italic">per {period === "annual" ? "year" : (period === "biweekly" ? "pay period" : period)}</p>
          </div>

          <div className="relative z-10 space-y-3 mt-8 pt-8 border-t border-slate-800">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-400">Gross Period Pay</span>
              <span className="font-bold">${result.grossPerPeriod.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between items-center text-sm text-red-400">
              <span className="">Federal Tax</span>
              <span className="font-bold">-${result.federalTax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
             <div className="flex justify-between items-center text-sm text-red-400 border-b border-slate-800 pb-3">
              <span className="">State + FICA</span>
              <span className="font-bold">-${(result.stateTax + result.fica).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
          </div>

          {/* Decorative SVG background element */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 opacity-10">
            <svg width="200" height="200" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="20" fill="transparent" />
            </svg>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <CalculatorSEO
          title="Take Home Paycheck Calculator"
          whatIsIt={
            <div className="prose max-w-none text-slate-700">
              <p>
                Our <strong>Paycheck Calculator</strong> provides a reliable estimate of your actual take-home pay by factoring in the most common payroll deductions. Most people are surprised to see that their "gross salary" of $60,000 might only result in roughly $3,800 to $4,200 deposited into their bank account each month.
              </p>
              <p className="mt-4">
                This tool handles the complex math of federal tax brackets, FICA (Social Security and Medicare), and state-level income taxes, giving you a clearer picture for budgeting and financial planning.
              </p>
            </div>
          }
          formula={
          <>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 font-mono text-lg text-indigo-700 text-center shadow-sm my-6">
              Net = Gross - Deductions
            </div>
            <p className="text-sm text-slate-500 text-center">
              Estimating take-home pay after tax withholding.
            </p>
          </>
        }
          example={
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>Consider a Single filer in a state with a 5% tax rate earning <strong>$5,000/month</strong> gross:</p>
              <ul className="list-disc pl-8 space-y-2 italic">
                <li>Federal Tax withholding might be roughly $600.</li>
                <li>FICA contribution (7.65%) would be $382.50.</li>
                <li>State Tax (5%) would be $250.</li>
              </ul>
              <p className="font-bold border-t border-slate-100 pt-4">Total Deductions: $1,232.50</p>
              <p className="font-black text-slate-900 text-xl py-2 px-4 bg-emerald-50 rounded-lg inline-block">Estimated Net Pay: $3,767.50</p>
            </div>
          }
          useCases={
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-xl bg-slate-50 border-t-4 border-slate-800">
                <h4 className="font-bold text-slate-900 mb-2">New Job Offers</h4>
                <p className="text-sm">Don't just look at the salary. See exactly how much cash lands in your account every two weeks before you sign the contract.</p>
              </div>
              <div className="p-5 rounded-xl bg-slate-50 border-t-4 border-slate-800">
                <h4 className="font-bold text-slate-900 mb-2">Annual Raises</h4>
                <p className="text-sm">See how much of your $5,000 raise actually makes it past the IRS and your state treasury.</p>
              </div>
              <div className="p-5 rounded-xl bg-slate-50 border-t-4 border-slate-800">
                <h4 className="font-bold text-slate-900 mb-2">Relocation Planning</h4>
                <p className="text-sm">Compare take-home pay if you're moving from a state with no income tax to one with a high tax rate.</p>
              </div>
            </div>
          }
          faqs={[
            {
              question: "Does this include health insurance or 401k contributions?",
              answer: "Currently, no. These are considered voluntary pre-tax deductions. If you contribute to these, your actual take-home pay will be slightly lower than this estimate."
            },
            {
              question: "What is the 'Standard Deduction'?",
              answer: "The Standard Deduction is a fixed dollar amount that reduces the amount of income on which you're taxed. This calculator builds in the 2024 standard deduction for single filers (~$14,600)."
            },
            {
              question: "Is Social Security capped?",
              answer: "Yes. For 2024, the Social Security tax only applies to the first $168,600 of your income. Earnings above this threshold are no longer subject to the 6.2% SS tax component."
            }
          ]}
          relatedCalculators={[
            { name: "Salary Calculator", path: "/salary-calculator/", desc: "Compare hourly vs annual earnings." },
            { name: "Income Tax Calculator", path: "/income-tax-calculator/", desc: "Deeper dive into federal and state tax liabilities." },
            { name: "Rent Calculator", path: "/rent-calculator/", desc: "See what housing you can afford based on your net paycheck." },
            {
              name: "Mortgage Calculator",
              path: "/mortgage-calculator/",
              desc: "Calculate your monthly mortgage payments and amortization schedule.",
            }]}
        />
      </div>
    </div>
  );
}
