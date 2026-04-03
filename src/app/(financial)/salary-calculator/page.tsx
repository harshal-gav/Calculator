"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function SalaryCalculator() {
  const [amount, setAmount] = useState("50000");
  const [period, setPeriod] = useState("year"); // hour, day, week, month, year
  const [hoursPerWeek, setHoursPerWeek] = useState("40");
  const [daysPerWeek, setDaysPerWeek] = useState("5");

  const [results, setResults] = useState<{
    hourly: number;
    daily: number;
    weekly: number;
    biweekly: number;
    monthly: number;
    yearly: number;
  } | null>(null);

  const calculateSalary = () => {
    const val = parseFloat(amount) || 0;
    const hpw = parseFloat(hoursPerWeek) || 40;
    const dpw = parseFloat(daysPerWeek) || 5;

    // Convert everything to a yearly baseline first
    let yearly = 0;
    if (period === "year") yearly = val;
    if (period === "month") yearly = val * 12;
    if (period === "week") yearly = val * 52;
    if (period === "day") yearly = val * dpw * 52;
    if (period === "hour") yearly = val * hpw * 52;

    setResults({
      yearly: yearly,
      monthly: yearly / 12,
      biweekly: yearly / 26,
      weekly: yearly / 52,
      daily: yearly / (dpw * 52),
      hourly: yearly / (hpw * 52),
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-emerald-900 border-b pb-4">
        Salary Calculator
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Convert your salary equivalent between hourly, daily, weekly, monthly,
        and annual amounts.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Salary Amount ($)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full rounded-lg border-gray-300 p-3 border focus:border-emerald-500 font-bold text-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Earned Per
              </label>
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="w-full rounded-lg border-gray-300 p-3 border focus:border-emerald-500"
              >
                <option value="hour">Hour</option>
                <option value="day">Day</option>
                <option value="week">Week</option>
                <option value="month">Month</option>
                <option value="year">Year</option>
              </select>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm text-gray-600 mb-1">
                  Hours/Week
                </label>
                <input
                  type="number"
                  value={hoursPerWeek}
                  onChange={(e) => setHoursPerWeek(e.target.value)}
                  className="w-full rounded-lg border-gray-300 p-2 border"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm text-gray-600 mb-1">
                  Days/Week
                </label>
                <input
                  type="number"
                  value={daysPerWeek}
                  onChange={(e) => setDaysPerWeek(e.target.value)}
                  className="w-full rounded-lg border-gray-300 p-2 border"
                />
              </div>
            </div>

            <button
              onClick={calculateSalary}
              className="w-full bg-emerald-600 text-white font-bold py-4 mt-4 rounded-lg hover:bg-emerald-700 shadow-md transition uppercase tracking-wider text-sm"
            >
              Convert Salary
            </button>
          </div>
        </div>

        {/* Results Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          {results !== null ? (
            <table className="min-w-full text-left">
              <tbody className="divide-y divide-gray-100 text-lg">
                <tr className="bg-emerald-50">
                  <td className="px-6 py-4 font-semibold text-gray-600">
                    Hourly
                  </td>
                  <td className="px-6 py-4 font-black text-emerald-800 text-right">
                    ${results.hourly.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-500">Daily</td>
                  <td className="px-6 py-4 font-bold text-gray-800 text-right">
                    ${results.daily.toFixed(2)}
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-500">
                    Weekly
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-800 text-right">
                    ${results.weekly.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-500">
                    Bi-Weekly
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-800 text-right">
                    ${results.biweekly.toFixed(2)}
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-gray-600">
                    Monthly
                  </td>
                  <td className="px-6 py-4 font-black text-gray-900 text-right">
                    ${results.monthly.toFixed(2)}
                  </td>
                </tr>
                <tr className="bg-emerald-100">
                  <td className="px-6 py-5 font-bold text-emerald-900">
                    Yearly
                  </td>
                  <td className="px-6 py-5 font-black text-emerald-900 text-right text-2xl">
                    $
                    {results.yearly.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
              </tbody>
            </table>
          ) : (
            <div className="h-full flex items-center justify-center p-8 text-center text-gray-400">
              Click Convert to view the salary breakdown.
            </div>
          )}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Salary Calculator",
            operatingSystem: "All",
            applicationCategory: "FinanceApplication",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

      <CalculatorSEO
        title="Salary Calculator & Income Conversion Tool"
        whatIsIt={
          <>
            <p className="text-lg leading-relaxed mb-4">
              A <strong>Salary Calculator</strong> is the foundational tool for personal financial literacy. It bridges the gap between different payment structures, allowing you to instantly translate an <strong>annual salary</strong> into an <strong>hourly wage</strong>, or a <strong>monthly paycheck</strong> into a <strong>weekly budget</strong>. Understanding your gross income across these different time slices is the first step in effective budgeting, mortgage planning, and career negotiation.
            </p>
            <p className="leading-relaxed mb-4">
              While most job offers are quoted as a lump sum (e.g., "$75,000 per year"), your life is lived in smaller increments. Our calculator provides a granular breakdown, including <strong>bi-weekly</strong> (every two weeks) and <strong>semi-monthly</strong> (twice a month) payouts, which are the most common payroll cycles in North America.
            </p>
            <p className="leading-relaxed">
              Use this tool to evaluate job offers, determine your "real" hourly value, and ensure your income expectations align with your lifestyle goals.
            </p>
          </>
        }
        comparisonTable={{
          title: "U.S. Income Benchmarks & Living Standards",
          headers: ["Income Category", "Annual (Gross)", "Hourly Equiv.", "Typical Household Role", "Financial Goal"],
          rows: [
            ["High Earner (Top 10%)", "$170,000+", "$81.73+", "Senior Management", "Wealth Preservation"],
            ["U.S. Median Household", "$74,580", "$35.85", "Technical/Professional", "Home Ownership"],
            ["Living Wage (Family of 4)", "$68,000", "$32.69", "Service/Manufacturing", "Stability"],
            ["Federal Minimum Wage", "$15,080", "$7.25", "Entry Level", "Basic Needs"],
          ]
        }}
        formula={
          <>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 font-mono text-lg text-indigo-700 text-center shadow-sm my-6">
              Salary Analysis Model
            </div>
            <p className="text-sm text-slate-500 text-center">
              This tool utilize standardized mathematical formulas and logic to calculate precise Salary results.
            </p>
          </>
        }
          example={
          <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-emerald-50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500"></div>
            <h5 className="font-black text-gray-900 uppercase tracking-widest text-xs mb-8">Scenario: The Promotion Jump</h5>
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                <span className="text-gray-500 font-medium">New Annual Salary</span>
                <span className="font-bold text-gray-900">$82,000</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                <span className="text-gray-500 font-medium">Standard Hours (40h/wk)</span>
                <span className="font-bold text-gray-900">2,080 / Yr</span>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-emerald-50 p-6 rounded-2xl text-center">
                  <span className="block text-[10px] text-emerald-600 font-bold uppercase mb-1">Monthly Gross</span>
                  <span className="text-3xl font-black text-emerald-900">$6,833</span>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl text-center">
                  <span className="block text-[10px] text-slate-500 font-bold uppercase mb-1">Hourly Equiv.</span>
                  <span className="text-3xl font-black text-slate-800">$39.42</span>
                </div>
              </div>
            </div>
            <p className="mt-8 text-xs text-gray-400 text-center italic">Result: This salary provides a bi-weekly gross paycheck of $3,153.85.</p>
          </div>
        }
        useCases={
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200">
              <h6 className="font-bold text-gray-900 mb-2">Job Offer Comparison</h6>
              <p className="text-xs text-gray-500">Compare a $35/hour role vs. a $70,000/year role. The hourly role ($72,800/yr) actually pays more assuming full-time hours.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200">
              <h6 className="font-bold text-gray-900 mb-2">Mortgage Pre-Approval</h6>
              <p className="text-xs text-gray-500">Find your "Gross Monthly Income"—the specific number lenders use to calculate your Debt-to-Income (DTI) ratio.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200">
              <h6 className="font-bold text-gray-900 mb-2">Freelance Rate Setting</h6>
              <p className="text-xs text-gray-500">Determine how much to charge per hour to match your previous corporate salary, adding a 25% buffer for taxes/missing benefits.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200">
              <h6 className="font-bold text-gray-900 mb-2">Budgeting by Pay Period</h6>
              <p className="text-xs text-gray-500">If you are paid Bi-Weekly, map out exactly how much income you have available every 14 days for automated savings.</p>
            </div>
          </div>
        }
        glossary={[
          { term: "Gross Income", definition: "Total pay before any taxes, health insurance premiums, or retirement contributions are deducted." },
          { term: "Bi-Weekly", definition: "A payment schedule consisting of 26 pay periods per year, occurring every two weeks." },
          { term: "Semi-Monthly", definition: "A payment schedule consisting of 24 pay periods per year, occurring exactly twice per month (usually 15th and 30th)." },
          { term: "Hourly Non-Exempt", definition: "Employees entitled to overtime pay (1.5x) for hours worked beyond 40 per week." },
          { term: "FICA Tax", definition: "The combined Social Security and Medicare taxes deducted from most U.S. paychecks." },
          { term: "Paycheck Leap Year", definition: "Occurs when a bi-weekly cycle results in 27 pay periods in a calendar year instead of 26." },
          { term: "DTI Ratio", definition: "Debt-to-Income ratio; the percentage of gross monthly income used to pay monthly debt obligations." },
          { term: "Exempt Employee", definition: "A salaried professional who is exempt from overtime pay requirements under the FLSA." },
        ]}
        faqs={[
          {
            question: "Is it better to be paid Bi-Weekly or Semi-Monthly?",
            answer: "Bi-weekly involves 26 paychecks, while semi-monthly involves 24. Bi-weekly is often preferred by budgeters because twice a year you receive a 'third paycheck' in a single month. However, semi-monthly paychecks are slightly larger because the annual salary is divided by fewer periods."
          },
          {
            question: "How many working hours are in a year?",
            answer: "A standard 40-hour work week multiplied by 52 weeks equals exactly 2,080 working hours per year. This is the standard multiplier used by most HR departments."
          },
          {
            question: "Does this calculator handle overtime?",
            answer: "No. This tool calculates base salary. For overtime, you should multiply your calculated 'Hourly Equiv' by 1.5 and add that to your gross total manually."
          },
          {
            question: "Why is my take-home pay so much lower?",
            answer: "Our calculator shows 'Gross' pay. In most cases, your 'Net' (take-home) pay will be 20% to 30% lower due to income taxes, FICA, and insurance costs."
          },
          {
            question: "How do I calculate salary for a 4-day workweek?",
            answer: "Simple! Change the 'Hours/Week' field to 32 (8 hours × 4 days). The calculator will adjust the hourly value to reflect that you are achieving the same annual pay in fewer hours."
          }
        ]}
        relatedCalculators={[
          {
            name: "Federal Income Tax Calculator",
            path: "/federal-income-tax-calculator/",
            desc: "Convert your gross salary into actual take-home pay.",
          },
          {
            name: "Debt-to-Income Ratio Calculator",
            path: "/debt-to-income-ratio-calculator/",
            desc: "See how your new salary affects your ability to borrow.",
          },
          {
            name: "Rent Calculator",
            path: "/rent-calculator/",
            desc: "Use your monthly gross income to see what rent you can afford.",
          },
          {
            name: "Mortgage Calculator",
            path: "/mortgage-calculator/",
            desc: "Plan a home purchase based on your annual income results.",
          }
        ]}
      />
    </div>
  );
}
