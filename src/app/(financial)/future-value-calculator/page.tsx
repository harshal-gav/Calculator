"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function FutureValueCalculator() {
  const [presentValue, setPresentValue] = useState("10000");
  const [interestRate, setInterestRate] = useState("7");
  const [periods, setPeriods] = useState("10");
  const [compoundingFreq, setCompoundingFreq] = useState("12"); // Monthly

  const [result, setResult] = useState<{
    futureValue: number;
    totalInterest: number;
  } | null>(null);

  const calculate = () => {
    const pv = parseFloat(presentValue);
    const rate = parseFloat(interestRate) / 100;
    const n = parseFloat(periods);
    const t = parseFloat(compoundingFreq);

    // FV = PV * (1 + r/n)^(n*t)
    // Wait, periods is usually years, and compounding freq is 'times per year'.
    // So FV = PV * (1 + rate/t)^(t * n)
    const fv = pv * Math.pow(1 + rate/t, t * n);

    setResult({
      futureValue: fv,
      totalInterest: fv - pv
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-2xl shadow-xl border border-blue-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-blue-50 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black text-blue-900 tracking-tight text-nowrap">Future Value Calculator</h1>
          <p className="text-blue-600 font-medium mt-1">Project how much your current money will be worth in the future.</p>
        </div>
        <div className="bg-blue-50 px-4 py-2 rounded-full border border-blue-100 shrink-0">
          <span className="text-blue-700 font-bold text-sm uppercase tracking-wider">Wealth Projection</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Present Value ($)</label>
              <input type="number" value={presentValue} onChange={(e) => setPresentValue(e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-2 focus:border-blue-500 focus:ring-0 transition-all font-semibold text-slate-800" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Annual Rate (%)</label>
                <input type="number" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-700 font-bold" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Years</label>
                <input type="number" value={periods} onChange={(e) => setPeriods(e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-700 font-bold" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Compounding Frequency</label>
              <select 
                value={compoundingFreq} 
                onChange={(e) => setCompoundingFreq(e.target.value)}
                className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-2 focus:border-blue-500 focus:ring-0 transition-all font-semibold text-slate-800 appearance-none"
              >
                <option value="1">Annually (1x)</option>
                <option value="2">Semiannually (2x)</option>
                <option value="4">Quarterly (4x)</option>
                <option value="12">Monthly (12x)</option>
                <option value="365">Daily (365x)</option>
              </select>
            </div>

            <button onClick={calculate} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-200 active:scale-[0.98]">
              Solve for FV
            </button>
          </div>
        </div>

        <div className="lg:col-span-7">
          {result ? (
            <div className="h-full flex flex-col gap-6">
              <div className="grow bg-gradient-to-br from-blue-600 to-indigo-800 rounded-3xl p-10 text-white shadow-xl flex flex-col justify-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                <div className="text-blue-100 text-sm font-bold uppercase tracking-widest mb-2 font-mono">Future Value (FV)</div>
                <div className="text-8xl font-black mb-6">
                  ${result.futureValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </div>
                <div className="inline-flex items-center px-4 py-2 rounded-xl bg-white/20 text-white text-base font-bold backdrop-blur-sm self-start">
                   Total Interest Earned: ${result.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl">
                  <div className="text-slate-400 text-xs font-bold uppercase mb-1">Total Return</div>
                  <div className="text-xl font-black text-blue-600">
                    {((result.futureValue / parseFloat(presentValue) - 1) * 100).toFixed(1)}%
                  </div>
                </div>
                <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl">
                  <div className="text-slate-400 text-xs font-bold uppercase mb-1">Growth Factor</div>
                  <div className="text-xl font-black text-slate-800">{(result.futureValue / parseFloat(presentValue)).toFixed(2)}x</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[400px] border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center p-8 text-center bg-blue-50/5">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-600">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2 uppercase tracking-tighter">Wealth Accumulation</h3>
                <p className="text-slate-500 max-w-[320px] font-medium leading-relaxed">Calculate the future value of a single lump sum investment. This illustrates the power of compound interest and time.</p>
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title="Future Value Calculator"
        whatIsIt={
          <p>
            A <strong>Future Value (FV) Calculator</strong> is a basic financial tool that determines the value of a current asset at a specified date in the future, based on an assumed rate of growth. It is the core formula for understanding the time value of money—how a dollar today grows into more dollars over time.
          </p>
        }
        formula={
          <div className="space-y-4">
            <p>The Future Value formula with compounding:</p>
            <div className="bg-slate-50 p-4 rounded-xl font-mono text-center text-sm text-blue-700">
              FV = PV × (1 + r/n)<sup>(n × t)</sup>
            </div>
            <p className="text-sm text-slate-500">
              Where:<br/>
              PV = Present Value<br/>
              r = Annual Interest Rate<br/>
              n = Compounding periods per year<br/>
              t = Number of years
            </p>
          </div>
        }
        example={
          <p>
            If you invest **$10,000** today in a fund returning **7%** annually, compounded monthly, in **10 years** your investment will grow to **$20,096**. You earned over $10,000 in interest essentially for "waiting."
          </p>
        }
        useCases={
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Long-term Planning:</strong> Seeing what a $5,000 inheritance could be worth when you retire.</li>
            <li><strong>Savings Comparison:</strong> Comparing a 4% CD vs. a 5% Savings account over 5 years.</li>
            <li><strong>Inflation Analysis:</strong> Using a 3% negative interest rate to see how much $100,000 will be "worth" in purchasing power in 20 years.</li>
          </ul>
        }
        faqs={[
          {
            question: "What is compound interest?",
            answer: "Compound interest is when you earn interest on both the original money you invested and the interest that money has already earned. It creates a 'snowball effect' for your wealth."
          },
          {
            question: "How does compounding frequency matter?",
            answer: "The more frequently interest is compounded (e.g., daily vs annually), the faster your money grows, because you begin earning 'interest on interest' much sooner."
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
