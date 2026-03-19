"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function TraditionalIRACalculator() {
  const [currentAge, setCurrentAge] = useState("30");
  const [retirementAge, setRetirementAge] = useState("65");
  const [currentBalance, setCurrentBalance] = useState("5000");
  const [annualContribution, setAnnualContribution] = useState("7000");
  const [expectedReturn, setExpectedReturn] = useState("7");
  const [marginalTaxRate, setMarginalTaxRate] = useState("22");
  const [retirementTaxRate, setRetirementTaxRate] = useState("15");

  const [result, setResult] = useState<{
    futureValue: number;
    totalContributed: number;
    taxSavingsNow: number;
    afterTaxWithdrawal: number;
    totalGrowth: number;
  } | null>(null);

  const calculate = () => {
    const curAge = parseInt(currentAge);
    const retAge = parseInt(retirementAge);
    const balance = parseFloat(currentBalance);
    const contrib = parseFloat(annualContribution);
    const r = parseFloat(expectedReturn) / 100 / 12;
    const taxNow = parseFloat(marginalTaxRate) / 100;
    const taxFuture = parseFloat(retirementTaxRate) / 100;

    if (!isNaN(curAge) && !isNaN(retAge) && retAge > curAge) {
      const months = (retAge - curAge) * 12;
      const monthlyContrib = contrib / 12;

      // FV = P(1+r)^n + PMT [((1+r)^n - 1) / r]
      const fv = balance * Math.pow(1 + r, months) + 
                 monthlyContrib * ((Math.pow(1 + r, months) - 1) / r);

      const totalContributed = balance + (contrib * (retAge - curAge));
      const taxSavingsNow = contrib * taxNow; // Tax savings per year on contributions

      setResult({
        futureValue: fv,
        totalContributed,
        taxSavingsNow,
        afterTaxWithdrawal: fv * (1 - taxFuture),
        totalGrowth: fv - totalContributed
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-2xl shadow-xl border border-orange-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-orange-50 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black text-orange-900 tracking-tight">Traditional IRA Calculator</h1>
          <p className="text-orange-600 font-medium mt-1">Project tax-deferred growth and retirement income.</p>
        </div>
        <div className="bg-orange-50 px-4 py-2 rounded-full border border-orange-100 shrink-0">
          <span className="text-orange-700 font-bold text-sm uppercase tracking-wider text-nowrap text-nowrap">Tax Deferred</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Age</label>
                <input type="number" value={currentAge} onChange={(e) => setCurrentAge(e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-orange-500 focus:ring-0 transition-all font-semibold text-slate-800" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Retire Age</label>
                <input type="number" value={retirementAge} onChange={(e) => setRetirementAge(e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-orange-500 focus:ring-0 transition-all font-semibold text-slate-800" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Starting Balance ($)</label>
              <input type="number" value={currentBalance} onChange={(e) => setCurrentBalance(e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-orange-500 focus:ring-0 transition-all font-semibold text-slate-800" />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Annual Contribution ($)</label>
              <input type="number" value={annualContribution} onChange={(e) => setAnnualContribution(e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-orange-500 focus:ring-0 transition-all font-semibold text-slate-800" />
              <p className="text-[10px] text-orange-500 font-bold mt-1 uppercase tracking-tighter">2024 Limit: $7,000 ($8,000 if 50+)</p>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Expected Return (%)</label>
              <input type="number" step="0.1" value={expectedReturn} onChange={(e) => setExpectedReturn(e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-orange-500 focus:ring-0 transition-all font-semibold text-slate-800" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Tax Rate Now (%)</label>
                <input type="number" value={marginalTaxRate} onChange={(e) => setMarginalTaxRate(e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-700 font-bold" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Tax Rate @ Retire (%)</label>
                <input type="number" value={retirementTaxRate} onChange={(e) => setRetirementTaxRate(e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-700 font-bold" />
              </div>
            </div>

            <button onClick={calculate} className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-orange-200 active:scale-[0.98]">
              Project IRA Growth
            </button>
          </div>
        </div>

        <div className="lg:col-span-7">
          {result ? (
            <div className="h-full flex flex-col gap-6">
              <div className="grow bg-gradient-to-br from-orange-500 to-orange-700 rounded-3xl p-10 text-white shadow-xl flex flex-col justify-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                <div className="text-orange-100 text-sm font-bold uppercase tracking-widest mb-2 font-mono">Future Gross Balance</div>
                <div className="text-7xl font-black mb-6">
                  ${result.futureValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </div>
                <div className="flex flex-wrap gap-3">
                    <div className="px-4 py-2 bg-white/20 rounded-xl backdrop-blur-sm">
                        <span className="block text-[10px] uppercase font-bold text-orange-100 whitespace-nowrap">Annual Tax Savings Now</span>
                        <span className="text-xl font-bold">${result.taxSavingsNow.toLocaleString()}</span>
                    </div>
                    <div className="px-4 py-2 bg-black/20 rounded-xl backdrop-blur-sm">
                        <span className="block text-[10px] uppercase font-bold text-orange-200 whitespace-nowrap">Est. After-Tax Withdraw</span>
                        <span className="text-xl font-bold">${result.afterTaxWithdrawal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                    </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl">
                  <div className="text-slate-400 text-xs font-bold uppercase mb-1">Total Deposits</div>
                  <div className="text-xl font-black text-slate-800">${result.totalContributed.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                </div>
                <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl">
                  <div className="text-slate-400 text-xs font-bold uppercase mb-1">Total Market Growth</div>
                  <div className="text-xl font-black text-orange-600">${result.totalGrowth.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[400px] border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center p-8 text-center bg-orange-50/5">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4 text-orange-600">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2 uppercase tracking-tighter">IRA Tax Strategy</h3>
                <p className="text-slate-500 max-w-[320px] font-medium leading-relaxed">A Traditional IRA allows you to deduct contributions from your current taxable income. This tool visualizes how those tax savings compound over a lifetime.</p>
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title="Traditional IRA Calculator"
        whatIsIt={
          <p>
            A <strong>Traditional IRA Calculator</strong> is a tool to project the growth of an Individual Retirement Account where contributions are generally tax-deductible. This "Pre-Tax" approach reduces your tax bill today, allowing more money to stay invested and grow until retirement, where withdrawals are taxed as ordinary income.
          </p>
        }
        formula={
          <div className="space-y-4">
            <p>The standard compound interest formula is used, with a focus on the tax delta:</p>
            <div className="bg-slate-50 p-4 rounded-xl font-mono text-sm overflow-x-auto text-orange-700">
              Tax Savings Now = (Annual Contribution) × (Current Marginal Tax Rate)
            </div>
            <p>While the gross balance grows tax-free, the <em>After-Tax Value</em> is estimated by deducting the expected retirement tax rate from the total withdrawals.</p>
          </div>
        }
        example={
          <p>
            If you earn $100,000 (24% tax bracket) and contribute $7,000 to a Traditional IRA, you save <strong>$1,680</strong> in taxes this year. Over 30 years at 7% return, that $7,000 annual contribution grows to roughly <strong>$660,000</strong>.
          </p>
        }
        useCases={
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>IRA vs. Roth Decision:</strong> Comparing current tax savings with future tax-free withdrawals.</li>
            <li><strong>Retirement Benchmarking:</strong> Estimating if your current savings rate will meet your target lifestyle.</li>
            <li><strong>Tax Efficiency Planning:</strong> Determining how much to contribute to maximize current-year deductions.</li>
          </ul>
        }
        faqs={[
          {
            question: "What is the 2024 IRA contribution limit?",
            answer: "For 2024, the limit is $7,000 for those under 50, and $8,000 for those 50 or older (the 'catch-up' contribution)."
          },
          {
            question: "When are RMDs required?",
            answer: "For Traditional IRAs, you must begin taking Required Minimum Distributions (RMDs) at age 73 (increasing to 75 in 2033 per SECURE 2.0)."
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
