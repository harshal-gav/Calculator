"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import mortgageSeoData from "@/data/seo-content/official/mortgage-calculator.json";

export default function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState("400000");
  const [downPayment, setDownPayment] = useState("80000");
  const [loanTerm, setLoanTerm] = useState("30");
  const [interestRate, setInterestRate] = useState("6.5");

  const [propertyTax, setPropertyTax] = useState("1.2"); // percentage
  const [homeInsurance, setHomeInsurance] = useState("1500"); // annual
  const [hoaFees, setHoaFees] = useState("0"); // monthly

  const [result, setResult] = useState<{
    principalInterest: number;
    taxes: number;
    insurance: number;
    hoa: number;
    total: number;
    totalInterest: number;
  } | null>(null);

  const calculateMortgage = () => {
    const p = parseFloat(homePrice) - parseFloat(downPayment);
    const r = parseFloat(interestRate) / 100 / 12;
    const n = parseFloat(loanTerm) * 12;

    if (p > 0 && n > 0) {
      const pi =
        r === 0
          ? p / n
          : (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

      const taxes =
        (parseFloat(homePrice) * (parseFloat(propertyTax) / 100)) / 12;
      const insurance = parseFloat(homeInsurance) / 12;
      const hoa = parseFloat(hoaFees) || 0;

      const totalMonthly = pi + taxes + insurance + hoa;
      const totalInt = pi * n - p;

      setResult({
        principalInterest: pi,
        taxes: taxes || 0,
        insurance: insurance || 0,
        hoa: hoa || 0,
        total: totalMonthly,
        totalInterest: totalInt || 0,
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-10 bg-white rounded-[3rem] shadow-2xl border border-slate-100">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-slate-100 pb-8">
        <div>
          <h1 className="text-5xl md:text-7xl font-black mb-4 text-emerald-950 tracking-tighter italic">
            Mortgage <span className="text-emerald-500">Expert</span>
          </h1>
          <p className="text-slate-400 text-lg font-medium max-w-xl leading-relaxed">
            Architect your home financing. Calculate monthly PITI payments, analyze interest lifecycles, and stress-test your homeownership budget.
          </p>
        </div>
        <div className="mt-6 md:mt-0 bg-emerald-50 px-6 py-3 rounded-2xl border border-emerald-100 hidden lg:block">
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Standard Rate Forecast</span>
            <div className="text-xl font-bold text-emerald-900">Current Market: ~6.5% - 7.5%</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
        {/* Input Control Center */}
        <div className="lg:col-span-4 bg-slate-50 p-8 rounded-[2.5rem] border border-slate-200 space-y-8 shadow-sm">
          <div className="space-y-6">
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-200 pb-2">Primary Financing</h2>
            
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">
                Home Purchase Price ($)
              </label>
              <input
                type="number"
                value={homePrice}
                onChange={(e) => setHomePrice(e.target.value)}
                className="w-full rounded-2xl border-slate-200 p-4 shadow-sm focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 font-black text-2xl text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">
                Down Payment ($)
              </label>
              <input
                type="number"
                value={downPayment}
                onChange={(e) => setDownPayment(e.target.value)}
                className="w-full rounded-2xl border-slate-200 p-4 shadow-sm focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 font-bold text-xl text-emerald-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">
                  Term (Yrs)
                </label>
                <select
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(e.target.value)}
                  className="w-full rounded-2xl border-slate-200 p-4 shadow-sm focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 font-bold"
                >
                  <option value="10">10 Years</option>
                  <option value="15">15 Years</option>
                  <option value="20">20 Years</option>
                  <option value="30">30 Years</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">
                  Rate (%)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  className="w-full rounded-2xl border-slate-200 p-4 shadow-sm focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 font-bold"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6 pt-6 border-t border-slate-200">
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest pb-2">Escrow & Fees</h2>
            
            <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Tax/yr (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={propertyTax}
                    onChange={(e) => setPropertyTax(e.target.value)}
                    className="w-full rounded-xl border-slate-200 p-3 text-sm focus:ring-2 focus:ring-emerald-500/20"
                  />
               </div>
               <div>
                  <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Insur/yr ($)</label>
                  <input
                    type="number"
                    value={homeInsurance}
                    onChange={(e) => setHomeInsurance(e.target.value)}
                    className="w-full rounded-xl border-slate-200 p-3 text-sm focus:ring-2 focus:ring-emerald-500/20"
                  />
               </div>
            </div>

            <div>
               <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Monthly HOA ($)</label>
               <input
                 type="number"
                 value={hoaFees}
                 onChange={(e) => setHoaFees(e.target.value)}
                 className="w-full rounded-xl border-slate-200 p-3 text-sm focus:ring-2 focus:ring-emerald-500/20"
               />
            </div>
          </div>

          <button
            onClick={calculateMortgage}
            className="w-full bg-emerald-600 text-white font-black py-5 rounded-[2rem] hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-500/20 uppercase tracking-[0.2em] text-xs active:scale-95"
          >
            Generate Forecast
          </button>
        </div>

        {/* Results Analytical Dashboard */}
        <div className="lg:col-span-8 space-y-8">
          {result !== null ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
              <div className="bg-white border-2 border-slate-100 rounded-[3rem] p-10 flex flex-col justify-between shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 grayscale opacity-10 group-hover:opacity-100 transition duration-500">🏠</div>
                <div>
                  <h3 className="text-slate-400 font-black uppercase tracking-widest text-[11px] mb-8">Total Monthly Commitment</h3>
                  <div className="text-7xl font-black text-slate-950 tabular-nums tracking-tighter">
                    $
                    {result.total.toLocaleString("en-US", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}
                  </div>
                  <div className="mt-4 flex items-center space-x-2">
                      <span className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></span>
                      <p className="text-xs font-bold text-emerald-600 uppercase">Approval Zone Estimated</p>
                  </div>
                </div>
                
                <div className="mt-12 space-y-4 pt-8 border-t border-slate-50">
                   <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500 font-medium">Principal & Interest</span>
                      <span className="font-black text-slate-900">${result.principalInterest.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                   </div>
                   <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full" style={{width: `${(result.principalInterest / result.total) * 100}%`}}></div>
                   </div>
                   <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                      <span>P&I Contribution</span>
                      <span>{Math.round((result.principalInterest / result.total) * 100)}%</span>
                   </div>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                 <div className="bg-slate-900 text-white rounded-[2.5rem] p-8 flex flex-col justify-between shadow-2xl flex-1 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-transparent"></div>
                    <div>
                       <h3 className="text-slate-500 font-black uppercase tracking-widest text-[10px] mb-4">Lifecycle Interest</h3>
                       <div className="text-4xl font-black text-white tabular-nums tracking-tighter">
                         $
                         {result.totalInterest.toLocaleString("en-US", {
                           minimumFractionDigits: 0,
                           maximumFractionDigits: 0,
                         })}
                       </div>
                    </div>
                    <p className="text-[10px] text-slate-400 font-medium leading-relaxed mt-4 italic">
                        Estimated total interest paid over {loanTerm} years. Making extra principal payments can slash this figure.
                    </p>
                 </div>

                 <div className="bg-emerald-50 rounded-[2.5rem] p-8 flex flex-col justify-between border border-emerald-100 flex-1">
                    <div className="grid grid-cols-2 gap-4 h-full">
                       <div className="flex flex-col justify-center">
                          <h4 className="text-[10px] font-black text-emerald-600 uppercase mb-1">Taxes</h4>
                          <span className="text-xl font-black text-slate-900">${result.taxes.toLocaleString(undefined, {maximumFractionDigits: 0})}/mo</span>
                       </div>
                       <div className="flex flex-col justify-center border-l border-emerald-200 pl-4">
                          <h4 className="text-[10px] font-black text-emerald-600 uppercase mb-1">Insur/HOA</h4>
                          <span className="text-xl font-black text-slate-900">${(result.insurance + result.hoa).toLocaleString(undefined, {maximumFractionDigits: 0})}/mo</span>
                       </div>
                    </div>
                 </div>
              </div>
            </div>
          ) : (
            <div className="h-full bg-slate-50 border border-dashed border-slate-200 rounded-[3rem] flex flex-col items-center justify-center p-12 text-center group">
               <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-5xl mb-6 shadow-xl group-hover:scale-110 transition-transform duration-700">📜</div>
               <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight italic">Financial Blueprint Required</h3>
               <p className="text-slate-400 text-sm max-w-sm font-medium leading-relaxed">Enter your property valuation and loan parameters to unlock an advanced breakdown of your homeownership liability.</p>
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title={mortgageSeoData.title}
        whatIsIt={mortgageSeoData.whatIsIt}
        formula={mortgageSeoData.formula}
        example={mortgageSeoData.example}
        useCases={mortgageSeoData.useCases}
        faqs={mortgageSeoData.faqs}
        deepDive={mortgageSeoData.deepDive}
        glossary={mortgageSeoData.glossary}
        relatedCalculators={[
          {
            name: "Rent vs Buy Calculator",
            path: "/rent-vs-buy-calculator/",
            desc: "The definitive analysis to see if owning actually beats renting in your market.",
          },
          {
            name: "Amortization Schedule",
            path: "/amortization-calculator/",
            desc: "View the granular month-by-month breakdown of every payment over 30 years.",
          },
          {
            name: "ROI Calculator",
            path: "/roi-calculator/",
            desc: "Measure the investment performance of your property after upgrades and repairs.",
          },
          {
            name: "Income Tax Calculator",
            path: "/income-tax-calculator/",
            desc: "Estimate how mortgage interest deductions might impact your annual tax liability.",
          }
        ]}
      />
    </div>
  );
}
