"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function AnnuityCalculator() {
  const [calcType, setCalcType] = useState<"payout" | "accumulation">("payout");
  const [principal, setPrincipal] = useState("250000");
  const [contribution, setContribution] = useState("1000");
  const [rate, setRate] = useState("6");
  const [years, setYears] = useState("20");
  const [frequency, setFrequency] = useState("12"); // Monthly

  const [result, setResult] = useState<{
    mainValue: number;
    totalInterest: number;
    totalFlow: number;
  } | null>(null);

  const calculate = () => {
    const p = parseFloat(principal);
    const c = parseFloat(contribution);
    const r = parseFloat(rate) / 100 / parseInt(frequency);
    const n = parseInt(years) * parseInt(frequency);

    if (calcType === "accumulation") {
      // FV = P(1+r)^n + C[((1+r)^n - 1) / r]
      const fv = p * Math.pow(1 + r, n) + c * ((Math.pow(1 + r, n) - 1) / r);
      const totalContributed = p + c * n;
      setResult({
        mainValue: fv,
        totalInterest: fv - totalContributed,
        totalFlow: totalContributed
      });
    } else {
      // Payout (Amortization): C = P * [r(1+r)^n] / [(1+r)^n - 1]
      const payout = (p * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
      const totalPayout = payout * n;
      setResult({
        mainValue: payout,
        totalInterest: totalPayout - p,
        totalFlow: totalPayout
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-2xl shadow-xl border border-teal-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-teal-50 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black text-teal-900 tracking-tight">Annuity Calculator</h1>
          <p className="text-teal-600 font-medium mt-1 text-lg">Plan your accumulation or guaranteed payout phase.</p>
        </div>
        <div className="flex bg-teal-50 p-1 rounded-xl border border-teal-100 shrink-0">
          <button onClick={() => setCalcType("payout")} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${calcType === "payout" ? "bg-white text-teal-700 shadow-sm" : "text-teal-400 hover:text-teal-600"}`}>Payout</button>
          <button onClick={() => setCalcType("accumulation")} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${calcType === "accumulation" ? "bg-white text-teal-700 shadow-sm" : "text-teal-400 hover:text-teal-600"}`}>Growth</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">{calcType === 'payout' ? 'Initial Investment ($)' : 'Starting Balance ($)'}</label>
              <input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-teal-500 focus:ring-0 transition-all font-semibold text-slate-800" />
            </div>

            {calcType === "accumulation" && (
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Monthly Contribution ($)</label>
                  <input type="number" value={contribution} onChange={(e) => setContribution(e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-teal-500 focus:ring-0 transition-all font-semibold text-slate-800" />
                </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Years</label>
                <input type="number" value={years} onChange={(e) => setYears(e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-teal-500 focus:ring-0 transition-all font-semibold text-slate-800" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Rate (%)</label>
                <input type="number" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-teal-500 focus:ring-0 transition-all font-semibold text-slate-800" />
              </div>
            </div>

            <button onClick={calculate} className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-teal-200 active:scale-[0.98]">
              {calcType === 'payout' ? 'Calculate Monthly Payout' : 'Project Future Value'}
            </button>
          </div>
        </div>

        <div className="lg:col-span-7">
          {result ? (
            <div className="h-full flex flex-col gap-6">
              <div className="grow bg-gradient-to-br from-teal-600 to-teal-800 rounded-3xl p-10 text-white shadow-xl flex flex-col justify-center">
                <div className="text-teal-100 text-sm font-bold uppercase tracking-widest mb-2">
                    {calcType === 'payout' ? 'Estimated Monthly Payout' : 'Estimated Future Value'}
                </div>
                <div className="text-7xl font-black mb-6">
                  ${result.mainValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </div>
                <div className="flex gap-4">
                    <div className="px-4 py-2 bg-white/10 rounded-xl border border-white/20">
                        <span className="block text-[10px] uppercase font-bold text-teal-200">Total Interest</span>
                        <span className="text-lg font-bold">${result.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                    </div>
                </div>
              </div>
              
              <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl italic text-slate-500 text-sm">
                * Based on a {years}-year duration at a {rate}% annual interest rate.
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[400px] border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center p-8 text-center bg-teal-50/5">
               <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-4 text-teal-600">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
               </div>
               <h3 className="text-xl font-bold text-slate-800 mb-2 uppercase tracking-wide">Annuity Strategy Tool</h3>
               <p className="text-slate-500 max-w-[320px]">Annuities can either be used to build wealth (Deferred) or to provide a "Paycheck for Life" (Immediate). Toggle the mode above to start planning.</p>
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title="Annuity Calculator"
        whatIsIt={
          <p>
            An <strong>Annuity Calculator</strong> helps you plan for retirement by modeling two distinct financial phases: the <em>Accumulation Phase</em> (where you grow your nest egg through contributions and compound interest) and the <em>Payout Phase</em> (where you convert a lump sum into a steady, reliable stream of monthly income).
          </p>
        }
        formula={
          <div className="space-y-4">
            <p>For <strong>Future Value (Accumulation)</strong>, we use:</p>
            <div className="bg-slate-50 p-4 rounded-xl font-mono text-sm overflow-x-auto text-teal-700">
              FV = P(1+r)^n + C[((1+r)^n - 1) / r]
            </div>
            <p>For <strong>Monthly Payout (Distribution)</strong>, we use the amortization formula:</p>
            <div className="bg-slate-50 p-4 rounded-xl font-mono text-sm overflow-x-auto text-teal-700">
              C = P * [r(1+r)^n] / [(1+r)^n - 1]
            </div>
          </div>
        }
        example={
          <p>
            If you have $250,000 in a retirement account and want to convert it into a 20-year fixed annuity at a 6% rate, the calculator will show you can expect roughly <strong>$1,791 per month</strong>. Conversely, if you started with $0 and saved $1,000 monthly for 20 years at 6%, you would end up with <strong>$462,041</strong>.
          </p>
        }
        useCases={
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Immediate Annuity Planning:</strong> Converting assets into guaranteed income.</li>
            <li><strong>Deferred Annuity Growth:</strong> Projecting how long-term savings will grow.</li>
            <li><strong>Retirement Budgeting:</strong> Aligning your future income stream with expected expenses.</li>
          </ul>
        }
        faqs={[
          {
            question: "What is the difference between fixed and variable annuities?",
            answer: "Fixed annuities offer a guaranteed interest rate and payout, while variable annuities allow you to invest in sub-accounts (similar to mutual funds), which provides higher growth potential but more risk."
          },
          {
            question: "Are annuities taxable?",
            answer: "If you buy an annuity with pre-tax dollars (like a 401k or Traditional IRA), the entire payout is taxable. If bought with after-tax dollars, only the earnings portion of the payout is taxable."
          },
            {
              question: "How accurate is this calculator?",
              answer: "Our calculator uses industry-standard formulas to provide the most accurate results possible. However, it should be used for informational purposes only and not as a basis for formal calculations or legal advice.",
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
            }
          ]}
      />
    </div>
  );
}
