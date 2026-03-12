"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function PaybackPeriodCalculator() {
  const [initialInvestment, setInitialInvestment] = useState("50000");
  const [annualCashFlow, setAnnualCashFlow] = useState("12000");
  const [growthRate, setGrowthRate] = useState("5");

  const [result, setResult] = useState<{
    simplePayback: number;
    discountedPayback: number | null;
    totalProfitYear5: number;
  } | null>(null);

  const calculate = () => {
    const investment = parseFloat(initialInvestment);
    const cashFlow = parseFloat(annualCashFlow);
    const growth = parseFloat(growthRate) / 100;
    const discountRate = 0.10; // Assume 10% for discounted payback

    // Simple payback: Investment / Cash Flow
    const simple = investment / cashFlow;

    // Discounted Payback & Year 5 profit
    let cumulativeDPV = 0;
    let discountedPaybackValue: number | null = null;
    let totalProfitY5 = -investment;

    for (let year = 1; year <= 20; year++) {
      const currentCashFlow = cashFlow * Math.pow(1 + growth, year - 1);
      const dpv = currentCashFlow / Math.pow(1 + discountRate, year);
      cumulativeDPV += dpv;
      
      if (year <= 5) {
        totalProfitY5 += currentCashFlow;
      }

      if (discountedPaybackValue === null && cumulativeDPV >= investment) {
        discountedPaybackValue = year;
      }
    }

    setResult({
      simplePayback: simple,
      discountedPayback: discountedPaybackValue,
      totalProfitYear5: totalProfitY5
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-2xl shadow-xl border border-indigo-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-indigo-50 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black text-indigo-900 tracking-tight text-nowrap">Payback Period Calculator</h1>
          <p className="text-indigo-600 font-medium mt-1">Determine how long it takes to break even on an investment.</p>
        </div>
        <div className="bg-indigo-50 px-4 py-2 rounded-full border border-indigo-100 shrink-0">
          <span className="text-indigo-700 font-bold text-sm uppercase tracking-wider">Business Analytics</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Initial Investment ($)</label>
              <input type="number" value={initialInvestment} onChange={(e) => setInitialInvestment(e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-2 focus:border-indigo-500 focus:ring-0 transition-all font-semibold text-slate-800" />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Annual Cash Inflow ($)</label>
              <input type="number" value={annualCashFlow} onChange={(e) => setAnnualCashFlow(e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-2 focus:border-indigo-500 focus:ring-0 transition-all font-semibold text-slate-800" />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Expected Growth per Year (%)</label>
              <input type="number" value={growthRate} onChange={(e) => setGrowthRate(e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-2 focus:border-indigo-500 focus:ring-0 transition-all font-semibold text-slate-800" />
            </div>

            <button onClick={calculate} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-indigo-200 active:scale-[0.98]">
              Analyze Payback
            </button>
          </div>
        </div>

        <div className="lg:col-span-7">
          {result ? (
            <div className="h-full flex flex-col gap-6">
              <div className="grow bg-gradient-to-br from-indigo-600 to-blue-800 rounded-3xl p-10 text-white shadow-xl flex flex-col justify-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                <div className="text-indigo-100 text-sm font-bold uppercase tracking-widest mb-2 font-mono">Simple Payback Period</div>
                <div className="text-8xl font-black mb-6">
                  {result.simplePayback.toFixed(1)} <span className="text-3xl uppercase text-indigo-200">Years</span>
                </div>
                <div className="inline-flex items-center px-4 py-2 rounded-xl bg-white/20 text-white text-base font-bold backdrop-blur-sm self-start">
                   5-Year Projected Profit: ${result.totalProfitYear5.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl text-nowrap">
                  <div className="text-slate-400 text-xs font-bold uppercase mb-1">Discounted Payback</div>
                  <div className="text-xl font-black text-indigo-600">
                    {result.discountedPayback ? `${result.discountedPayback} Years` : "20+ Years"}
                  </div>
                </div>
                <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl">
                  <div className="text-slate-400 text-xs font-bold uppercase mb-1">Monthly Recovery</div>
                  <div className="text-xl font-black text-slate-800">${(parseFloat(annualCashFlow)/12).toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[400px] border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center p-8 text-center bg-indigo-50/5">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4 text-indigo-600">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2 uppercase tracking-tighter">Investment Recovery</h3>
                <p className="text-slate-500 max-w-[320px] font-medium leading-relaxed">Calculate the exact time required to recover your initial capital. Essential for evaluating business equipment, solar panels, or rental deposits.</p>
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title="Payback Period Calculator"
        whatIsIt={
          <p>
            A <strong>Payback Period Calculator</strong> is a financial analysis tool used by businesses and investors to determine how long it will take for an investment to "pay for itself." It measures the time required for the cumulative cash flows generated by an investment to equal the initial cost.
          </p>
        }
        formula={
          <div className="space-y-4">
            <p>The Simple Payback formula:</p>
            <div className="bg-slate-50 p-4 rounded-xl font-mono text-center text-sm text-indigo-700">
              Payback Period = Initial Investment ÷ Annual Cash Flow
            </div>
            <p className="text-sm text-slate-500 italic">Note: The "Discounted Payback" method is more accurate as it accounts for the time value of money (usually at a 10% discount rate).</p>
          </div>
        }
        example={
          <p>
            If you spend **$50,000** on a piece of machinery that saves you **$12,000** per year in labor, your simple payback period is **4.2 years**. If the savings grow by 5% each year, your timeline shortens significantly.
          </p>
        }
        useCases={
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Equipment Purchases:</strong> Deciding if a new printer or vehicle will pay off within its useful life.</li>
            <li><strong>Energy Efficiency:</strong> Calculating the payback on solar panels based on monthly utility bill savings.</li>
            <li><strong>Marketing Campaigns:</strong> Estimating how many months of customer retention are needed to recover acquisition costs.</li>
          </ul>
        }
        faqs={[
          {
            question: "What is a good payback period?",
            answer: "Most businesses aim for a payback period of under 3 years. Longer periods (5+ years) are usually reserved for large infrastructure or real estate projects."
          },
          {
            question: "What is the main drawback of payback period?",
            answer: "It ignores any cash flows that happen AFTER the payback point, meaning it doesn't measure total profitability or 'Return on Investment' (ROI) over the long term."
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
