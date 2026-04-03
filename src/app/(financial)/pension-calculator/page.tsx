"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function PensionCalculator() {
  const [currentSalary, setCurrentSalary] = useState("75000");
  const [yearsOfService, setYearsOfService] = useState("20");
  const [multiplier, setMultiplier] = useState("2.0");
  const [currentAge, setCurrentAge] = useState("45");
  const [retirementAge, setRetirementAge] = useState("65");
  const [inflationRate, setInflationRate] = useState("3.0");

  const [result, setResult] = useState<{
    monthlyPension: number;
    annualPension: number;
    replacementRatio: number;
    inflationAdjusted: number;
  } | null>(null);

  const calculate = () => {
    const salary = parseFloat(currentSalary);
    const years = parseFloat(yearsOfService);
    const m = parseFloat(multiplier) / 100;
    const curAge = parseInt(currentAge);
    const retAge = parseInt(retirementAge);
    const inflation = parseFloat(inflationRate) / 100;

    if (!isNaN(salary) && !isNaN(years)) {
      // Basic Pension Formula: Salary * Years * Multiplier
      const annualPension = salary * years * m;
      const monthlyPension = annualPension / 12;
      const replacementRatio = (annualPension / salary) * 100;

      // Inflation adjustment (future value of current pension buying power)
      const yearsToRetirement = Math.max(0, retAge - curAge);
      const inflationAdjusted = annualPension / Math.pow(1 + inflation, yearsToRetirement);

      setResult({
        monthlyPension,
        annualPension,
        replacementRatio,
        inflationAdjusted
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-2xl shadow-xl border border-indigo-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-indigo-50 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black text-indigo-900 tracking-tight">Pension Calculator</h1>
          <p className="text-indigo-600 font-medium mt-1">Estimate your defined benefit retirement income.</p>
        </div>
        <div className="bg-indigo-50 px-4 py-2 rounded-full border border-indigo-100 shrink-0">
          <span className="text-indigo-700 font-bold text-sm uppercase tracking-wider text-nowrap">Defined Benefit</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Final/Current Salary ($)</label>
              <input type="number" value={currentSalary} onChange={(e) => setCurrentSalary(e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-indigo-500 focus:ring-0 transition-all font-semibold text-slate-800" />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Years of Service</label>
              <input type="number" value={yearsOfService} onChange={(e) => setYearsOfService(e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-indigo-500 focus:ring-0 transition-all font-semibold text-slate-800" />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Pension Multiplier (%)</label>
              <input type="number" step="0.1" value={multiplier} onChange={(e) => setMultiplier(e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-indigo-500 focus:ring-0 transition-all font-semibold text-slate-800" />
              <p className="text-[10px] text-indigo-500 font-bold mt-1 uppercase tracking-tighter italic text-right">Common: 1.5% - 2.5%</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1 tracking-wider uppercase">Current Age</label>
                <input type="number" value={currentAge} onChange={(e) => setCurrentAge(e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-700 font-bold" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1 tracking-wider uppercase">Retire Age</label>
                <input type="number" value={retirementAge} onChange={(e) => setRetirementAge(e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-700 font-bold" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Exp. Inflation (%)</label>
              <input type="number" step="0.1" value={inflationRate} onChange={(e) => setInflationRate(e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-indigo-500 focus:ring-0 transition-all font-semibold text-slate-800" />
            </div>

            <button onClick={calculate} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-indigo-200 active:scale-[0.98]">
              Project Pension
            </button>
          </div>
        </div>

        <div className="lg:col-span-7">
          {result ? (
            <div className="h-full flex flex-col gap-6">
              <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-3xl p-8 text-white shadow-xl flex flex-col justify-center grow">
                <div className="text-indigo-100 text-sm font-bold uppercase tracking-widest mb-2">Monthly Pension Income</div>
                <div className="text-6xl font-black mb-4">
                  ${result.monthlyPension.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </div>
                <div className="inline-flex items-center px-4 py-2 rounded-xl bg-white/20 text-white text-base font-bold backdrop-blur-sm self-start">
                   {result.replacementRatio.toFixed(1)}% Salary Replacement Ratio
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl">
                  <div className="text-slate-400 text-xs font-bold uppercase mb-1">Annual Total</div>
                  <div className="text-2xl font-black text-slate-800">${result.annualPension.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                </div>
                <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-2xl">
                  <div className="text-indigo-400 text-xs font-bold uppercase mb-1">Buying Power (Today)</div>
                  <div className="text-2xl font-black text-indigo-700">${result.inflationAdjusted.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[400px] border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center p-8 text-center bg-indigo-50/10">
               <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4 text-indigo-600 shadow-inner">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
               </div>
               <h3 className="text-xl font-bold text-slate-800 mb-2 uppercase tracking-tighter">Retirement Income Projection</h3>
               <p className="text-slate-500 max-w-[320px] font-medium leading-relaxed">Most public sector and some unionized jobs provide a "Defined Benefit" pension. This tool helps you see exactly how those years of service translate into a lifetime paycheck.</p>
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title="Pension Calculator"
        whatIsIt={
          <p>
            A <strong>Pension Calculator</strong> (for Defined Benefit plans) estimates the lifetime monthly or annual payment an employee will receive upon retirement. Unlike a 401k where the balance is yours, a pension is a guaranteed monthly check for life, usually calculated based on your final average salary and years of service.
          </p>
        }
        formula={
          <>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 font-mono text-lg text-indigo-700 text-center shadow-sm my-6">
              Pension Analysis Model
            </div>
            <p className="text-sm text-slate-500 text-center">
              This tool utilize standardized mathematical formulas and logic to calculate precise Pension results.
            </p>
          </>
        }
        example={
          <p>
            A teacher who retires with a final salary of $85,000 after 25 years of service with a 2.2% multiplier would receive an annual pension of $46,750 ($3,895 per month), providing a 55% salary replacement ratio.
          </p>
        }
        useCases={
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Retirement Planning:</strong> Estimating if your pension alone is sufficient to cover expenses.</li>
            <li><strong>Job Comparisons:</strong> Evaluating if a pension-eligible job is better than a private-sector job with only a 401k match.</li>
            <li><strong>Bridge Planning:</strong> Calculating income if you retire early before Social Security kicks in.</li>
          </ul>
        }
        faqs={[
          {
            question: "What is a pension multiplier?",
            answer: "The multiplier (also called an accrual rate) is the percentage of your salary you earn for each year you work. Most public sector plans range between 1.5% and 2.5%."
          },
          {
            question: "Is pension income taxable?",
            answer: "In most cases, yes. Pension payments are generally treated as ordinary income and are subject to federal (and sometimes state) income taxes."
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
