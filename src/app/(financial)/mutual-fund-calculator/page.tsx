"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function MutualFundCalculator() {
  const [initialInvestment, setInitialInvestment] = useState("10000");
  const [monthlyContribution, setMonthlyContribution] = useState("500");
  const [returnRate, setReturnRate] = useState("8");
  const [expenseRatio, setExpenseRatio] = useState("0.75");
  const [years, setYears] = useState("20");
  const [frontLoad, setFrontLoad] = useState("0");

  const [result, setResult] = useState<{
    futureValue: number;
    totalFees: number;
    totalContributed: number;
    feeImpact: number;
  } | null>(null);

  const calculate = () => {
    const p_init = parseFloat(initialInvestment);
    const m_cont = parseFloat(monthlyContribution);
    const r_annual = parseFloat(returnRate) / 100;
    const exp_ratio = parseFloat(expenseRatio) / 100;
    const front = parseFloat(frontLoad) / 100;
    const y = parseInt(years);

    if (!isNaN(p_init) && !isNaN(m_cont)) {
      // Net annual return after expense ratio
      const net_r_annual = r_annual - exp_ratio;
      const net_r_monthly = net_r_annual / 12;
      const gross_r_monthly = r_annual / 12;
      const n_months = y * 12;

      // Deduct front-end load from initial investment
      const startingPrincipal = p_init * (1 - front);

      // Future Value with fees
      const fv_net = startingPrincipal * Math.pow(1 + net_r_monthly, n_months) + 
                     m_cont * ((Math.pow(1 + net_r_monthly, n_months) - 1) / net_r_monthly);

      // Future Value without fees for comparison
      const fv_gross = p_init * Math.pow(1 + gross_r_monthly, n_months) + 
                       m_cont * ((Math.pow(1 + gross_r_monthly, n_months) - 1) / gross_r_monthly);

      const totalContributed = p_init + m_cont * n_months;
      const totalFees = fv_gross - fv_net;

      setResult({
        futureValue: fv_net,
        totalFees,
        totalContributed,
        feeImpact: (totalFees / fv_gross) * 100
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-2xl shadow-xl border border-emerald-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-emerald-50 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black text-emerald-900 tracking-tight">Mutual Fund Calculator</h1>
          <p className="text-emerald-600 font-medium mt-1">Project returns after fees and expense ratios.</p>
        </div>
        <div className="bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100 shrink-0">
          <span className="text-emerald-700 font-bold text-sm uppercase tracking-wider text-nowrap">Investment Analysis</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Initial Investment ($)</label>
              <input type="number" value={initialInvestment} onChange={(e) => setInitialInvestment(e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-emerald-500 focus:ring-0 transition-all font-semibold text-slate-800" />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Monthly Contribution ($)</label>
              <input type="number" value={monthlyContribution} onChange={(e) => setMonthlyContribution(e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-emerald-500 focus:ring-0 transition-all font-semibold text-slate-800" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Annual Return (%)</label>
                <input type="number" step="0.1" value={returnRate} onChange={(e) => setReturnRate(e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-emerald-500 focus:ring-0 transition-all font-semibold text-slate-800" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Years</label>
                <input type="number" value={years} onChange={(e) => setYears(e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-emerald-500 focus:ring-0 transition-all font-semibold text-slate-800" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1 tracking-wider uppercase">Expense Ratio (%)</label>
                <input type="number" step="0.01" value={expenseRatio} onChange={(e) => setExpenseRatio(e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-700 font-bold" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1 tracking-wider uppercase">Front Load (%)</label>
                <input type="number" step="0.1" value={frontLoad} onChange={(e) => setFrontLoad(e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-700 font-bold" />
              </div>
            </div>

            <button onClick={calculate} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-emerald-200 active:scale-[0.98]">
              Project Portfolio
            </button>
          </div>
        </div>

        <div className="lg:col-span-7">
          {result ? (
            <div className="h-full flex flex-col gap-6">
              <div className="grow bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-3xl p-10 text-white shadow-xl flex flex-col justify-center">
                <div className="text-emerald-100 text-sm font-bold uppercase tracking-widest mb-2 font-mono">Projected Net Value</div>
                <div className="text-7xl font-black mb-6">
                  ${result.futureValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </div>
                <div className="inline-flex items-center px-4 py-2 rounded-xl bg-red-400/20 text-red-100 text-sm font-bold backdrop-blur-sm self-start border border-red-400/30">
                   Fees reduced your wealth by {result.feeImpact.toFixed(1)}%
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl">
                  <div className="text-slate-400 text-xs font-bold uppercase mb-1">Total Contributed</div>
                  <div className="text-xl font-black text-slate-800">${result.totalContributed.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                </div>
                <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl">
                  <div className="text-slate-400 text-xs font-bold uppercase mb-1">Total Fees Lost</div>
                  <div className="text-xl font-black text-red-600">${result.totalFees.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[400px] border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center p-8 text-center bg-slate-50/50">
               <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4 text-emerald-600">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
               </div>
               <h3 className="text-xl font-bold text-slate-800 mb-2 uppercase tracking-tighter">Mutual Fund Analyzer</h3>
               <p className="text-slate-500 max-w-[320px] font-medium leading-relaxed">Most mutual fund performance is quoted before fees. Our tool shows you the "Real World" outcome after expense ratios and loads are deducted.</p>
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title="Mutual Fund Calculator"
        whatIsIt={
          <p>
            A <strong>Mutual Fund Calculator</strong> is a tool to project the growth of an investment over time while accounting for common industry fees. Unlike simple interest calculators, this accounts for annual <em>Expense Ratios</em> and <em>Front-End Loads</em> (commissions), which can significantly erode long-term gains.
          </p>
        }
        formula={
          <div className="space-y-4">
            <p>The core logic uses the compound interest formula with a adjusted net yield:</p>
            <div className="bg-slate-50 p-4 rounded-xl font-mono text-sm overflow-x-auto text-emerald-700">
              Net Annual Rate = Gross Rate − Expense Ratio
            </div>
            <p>The future value is then calculated by applying this net rate over the specified time horizon, after deducting any initial sales commissions (loads).</p>
          </div>
        }
        example={
          <p>
            An investment of $10,000 with a $500 monthly contribution at an 8% gross return over 20 years sounds great. However, with a 1.25% expense ratio, you will end up with approximately <strong>$50,000 less</strong> due to the compounding effect of lost opportunity cost on those fees.
          </p>
        }
        useCases={
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Fund Comparison:</strong> Deciding between an actively managed fund (high fee) and an index fund (low fee).</li>
            <li><strong>Wealth Projection:</strong> Getting a realistic estimate of your retirement portfolio.</li>
            <li><strong>Fee Impact Analysis:</strong> Visualizing how small percentage fees add up to massive dollar amounts over decades.</li>
          </ul>
        }
        faqs={[
          {
            question: "What is an expense ratio?",
            answer: "An expense ratio is the annual fee a mutual fund or ETF charges for managing the fund. It is expressed as a percentage of your total investment and is automatically deducted from the fund's assets."
          },
          {
            question: "Is 1% a high expense ratio?",
            answer: "In the modern era of low-cost index funds (which often charge 0.03% to 0.10%), 1% is considered very high for a passive fund and average for an actively managed mutual fund."
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
