"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function CanadianMortgageCalculator() {
  const [homeValue, setHomeValue] = useState("500000");
  const [downPayment, setDownPayment] = useState("100000");
  const [interestRate, setInterestRate] = useState("5.0");
  const [amortization, setAmortization] = useState("25");
  const [frequency, setFrequency] = useState("12"); // Monthly

  const [result, setResult] = useState<{
    monthlyPayment: number;
    totalInterest: number;
    totalCost: number;
    insurancePremium: number;
  } | null>(null);

  const calculate = () => {
    const P_val = parseFloat(homeValue);
    const D_val = parseFloat(downPayment);
    const r_annual = parseFloat(interestRate) / 100;
    const n_years = parseInt(amortization);
    const freq = parseInt(frequency);

    if (!isNaN(P_val) && !isNaN(D_val) && !isNaN(r_annual)) {
      const downPaymentPct = (D_val / P_val) * 100;
      let insurancePremium = 0;

      // CMCH Insurance simplified (for down payments < 20%)
      if (downPaymentPct < 20) {
        if (downPaymentPct >= 15) insurancePremium = (P_val - D_val) * 0.028;
        else if (downPaymentPct >= 10) insurancePremium = (P_val - D_val) * 0.031;
        else if (downPaymentPct >= 5) insurancePremium = (P_val - D_val) * 0.040;
      }

      const principal = P_val - D_val + insurancePremium;

      // Canadian compounding: Semi-annual compounding required by law
      // Effective Interest Rate = (1 + r_annual/2)^(2/freq) - 1
      const effectiveRate = Math.pow(1 + r_annual / 2, 2 / freq) - 1;
      const totalPayments = n_years * freq;

      // Payment formula: P * [i(1+i)^n] / [(1+i)^n - 1]
      const payment =
        (principal * (effectiveRate * Math.pow(1 + effectiveRate, totalPayments))) /
        (Math.pow(1 + effectiveRate, totalPayments) - 1);

      const totalCost = payment * totalPayments;
      const totalInterest = totalCost - principal;

      setResult({
        monthlyPayment: payment,
        totalInterest,
        totalCost,
        insurancePremium
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-2xl shadow-xl border border-red-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-red-50 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black text-red-900 tracking-tight">Canadian Mortgage Calculator</h1>
          <p className="text-red-600 font-medium mt-1">Calculate payments with Canadian semi-annual compounding.</p>
        </div>
        <div className="bg-red-50 px-4 py-2 rounded-full border border-red-100 shrink-0">
          <span className="text-red-700 font-bold text-sm uppercase tracking-wider text-nowrap">Canada Specific</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Home Price ($)</label>
              <input type="number" value={homeValue} onChange={(e) => setHomeValue(e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-red-500 focus:ring-0 transition-all font-semibold text-slate-800" />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Down Payment ($)</label>
              <input type="number" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-red-500 focus:ring-0 transition-all font-semibold text-slate-800" />
              <p className="text-[10px] text-red-600 font-bold mt-1 uppercase tracking-tighter">Min Down Payment: 5% for first $500k</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Rate (%)</label>
                <input type="number" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-red-500 focus:ring-0 transition-all font-semibold text-slate-800" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Amort (Yrs)</label>
                <select value={amortization} onChange={(e) => setAmortization(e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-red-500 focus:ring-0 transition-all font-semibold text-slate-800">
                  <option value="15">15 Years</option>
                  <option value="20">20 Years</option>
                  <option value="25">25 Years</option>
                  <option value="30">30 Years</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Payment Frequency</label>
              <select value={frequency} onChange={(e) => setFrequency(e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-red-500 focus:ring-0 transition-all font-semibold text-slate-800">
                <option value="12">Monthly</option>
                <option value="24">Bi-Weekly</option>
                <option value="26">Bi-Weekly (Accelerated)</option>
                <option value="52">Weekly</option>
              </select>
            </div>

            <button onClick={calculate} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-red-200 active:scale-[0.98]">
              Calculate Payment
            </button>
          </div>
        </div>

        <div className="lg:col-span-7">
          {result ? (
            <div className="h-full flex flex-col gap-6">
              <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-3xl p-8 text-white shadow-xl flex flex-col justify-center grow">
                <div className="text-red-100 text-sm font-bold uppercase tracking-widest mb-2">Payment ({frequency === '12' ? 'Monthly' : 'Periodic'})</div>
                <div className="text-6xl font-black mb-4">
                  ${result.monthlyPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                {result.insurancePremium > 0 && (
                   <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 text-white text-sm font-bold backdrop-blur-sm self-start">
                     Includes CMHC Premium: ${result.insurancePremium.toLocaleString()}
                   </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl">
                  <div className="text-slate-400 text-xs font-bold uppercase mb-1">Total Interest</div>
                  <div className="text-xl font-black text-slate-800">${result.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                </div>
                <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl">
                  <div className="text-slate-400 text-xs font-bold uppercase mb-1">Total Cost</div>
                  <div className="text-xl font-black text-slate-800">${result.totalCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[400px] border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center p-8 text-center bg-slate-50/50">
               <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4 text-red-600">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
               </div>
               <h3 className="text-xl font-bold text-slate-800 mb-2">Canadian Mortgage Logic</h3>
               <p className="text-slate-500 max-w-[300px]">Interest on Canadian fixed mortgages is compounded semi-annually by law. Our calculator handles this complexity for you.</p>
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title="Canadian Mortgage Calculator"
        whatIsIt={
          <p>
            A <strong>Canadian Mortgage Calculator</strong> is tailored specifically for the Canadian real estate market. It accounts for legal requirements such as semi-annual compounding for fixed-rate mortgages and CMHC insurance premiums for down payments under 20%.
          </p>
        }
        formula={
          <div className="space-y-4">
            <p>Unlike US mortgages which compound monthly, Canadian law requires semi-annual compounding for fixed rates. The effective monthly rate is:</p>
            <div className="bg-slate-50 p-4 rounded-xl font-mono text-sm overflow-x-auto">
              i = (1 + r / 2)^(2 / 12) - 1
            </div>
            <p>Where <em>r</em> is the annual quoted interest rate. This result <em>i</em> is then used in the standard amortization formula to calculate the periodic payment.</p>
          </div>
        }
        example={
          <p>
            If you purchase a $500,000 home with a $50,000 down payment (10%) at a 5% interest rate, you will pay a CMHC insurance premium of 3.10% ($13,950). This premium is added to your loan amount, and your monthly payment will be calculated using the Canadian semi-annual compounding method.
          </p>
        }
        useCases={
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Home Buying in Canada:</strong> Visualizing real costs including mandatory insurance.</li>
            <li><strong>Refinancing:</strong> Comparing new rates with different compounding frequencies.</li>
            <li><strong>Budgeting:</strong> Determining precise monthly or bi-weekly payment amounts.</li>
          </ul>
        }
        faqs={[
          {
            question: "What is CMHC insurance?",
            answer: "CMHC insurance is mandatory in Canada if your down payment is less than 20%. it protects the lender in case you default on your mortgage."
          },
          {
            question: "Why is the payment different from US calculators?",
            answer: "Because US calculators assume monthly compounding. Canadian calculators use semi-annual compounding, which results in a slightly lower effective interest rate for the consumer."
          }
        ]}
      />
    </div>
  );
}
