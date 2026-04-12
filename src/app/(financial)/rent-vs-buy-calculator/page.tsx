"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import rentVsBuySeoData from "@/data/seo-content/official/rent-vs-buy-calculator.json";

export default function RentVsBuyCalculator() {
  const [homePrice, setHomePrice] = useState("400000");
  const [downPayment, setDownPayment] = useState("80000");
  const [mortgageRate, setMortgageRate] = useState("6.5");
  const [mortgageTerm, setMortgageTerm] = useState("30");
  const [monthlyRent, setMonthlyRent] = useState("2500");
  const [years, setYears] = useState("10");

  const [result, setResult] = useState<{
    buyingCost: number;
    rentingCost: number;
    difference: number;
    winner: "buying" | "renting";
  } | null>(null);

  const calculate = () => {
    const P = parseFloat(homePrice);
    const D = parseFloat(downPayment);
    const r = parseFloat(mortgageRate) / 100 / 12;
    const n = parseInt(mortgageTerm) * 12;
    const R = parseFloat(monthlyRent);
    const y = parseInt(years);

    if (!isNaN(P) && !isNaN(D) && !isNaN(r) && !isNaN(R)) {
      const loanAmount = P - D;
      const monthlyMortgage = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      
      const totalMortgage = monthlyMortgage * y * 12;
      const totalMaintenance = P * 0.01 * y; // 1% annual maintenance
      const totalTax = P * 0.012 * y; // 1.2% annual tax
      const totalInsurance = P * 0.005 * y; // 0.5% annual insurance
      
      const buyingCost = totalMortgage + totalMaintenance + totalTax + totalInsurance + D;
      
      // Renting cost (simplified 3% annual increase)
      let rentingCost = 0;
      let currRent = R;
      for (let i = 0; i < y; i++) {
        rentingCost += currRent * 12;
        currRent *= 1.03;
      }
      
      const diff = Math.abs(buyingCost - rentingCost);
      const winner = buyingCost < rentingCost ? "buying" : "renting";

      setResult({
        buyingCost,
        rentingCost,
        difference: diff,
        winner
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-2xl shadow-xl border border-teal-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-teal-50 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black text-teal-900 tracking-tight">Rent vs. Buy Calculator</h1>
          <p className="text-teal-600 font-medium mt-1">Compare the total cost of ownership vs. long-term renting.</p>
        </div>
        <div className="bg-teal-50 px-4 py-2 rounded-full border border-teal-100 shrink-0">
          <span className="text-teal-700 font-bold text-sm uppercase tracking-wider text-nowrap">Real Estate Planning</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-12">
           <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-amber-800 text-sm mb-4 flex items-start gap-3">
              <svg className="w-5 h-5 grow-0 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p>Selection depends on market conditions. This model includes 1% maintenance, 1.2% property tax, and 0.5% insurance for buyers, with 3% annual rent increases for tenants.</p>
           </div>
        </div>

        <div className="lg:col-span-12 xl:col-span-5 space-y-6">
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4 shadow-inner">
            <h3 className="font-bold text-slate-800 uppercase text-xs tracking-widest border-b pb-2 mb-4">Buying Assumptions</h3>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Home Price ($)</label>
              <input type="number" value={homePrice} onChange={(e) => setHomePrice(e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-2 focus:border-teal-500 focus:ring-0 transition-all font-semibold text-slate-800 shadow-sm" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Down Payment ($)</label>
              <input type="number" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-2 focus:border-teal-500 focus:ring-0 transition-all font-semibold text-slate-800 shadow-sm" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Int. Rate (%)</label>
                <input type="number" value={mortgageRate} onChange={(e) => setMortgageRate(e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-2 focus:border-teal-500 focus:ring-0 transition-all font-semibold text-slate-800 shadow-sm" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Term (Yrs)</label>
                <input type="number" value={mortgageTerm} onChange={(e) => setMortgageTerm(e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-2 focus:border-teal-500 focus:ring-0 transition-all font-semibold text-slate-800 shadow-sm" />
              </div>
            </div>

            <h3 className="font-bold text-slate-800 uppercase text-xs tracking-widest border-b pb-2 mt-8 mb-4">Renting Assumptions</h3>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Monthly Rent ($)</label>
              <input type="number" value={monthlyRent} onChange={(e) => setMonthlyRent(e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-2 focus:border-teal-500 focus:ring-0 transition-all font-semibold text-slate-800 shadow-sm" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Analysis Period (Years)</label>
              <input type="number" value={years} onChange={(e) => setYears(e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-2 focus:border-teal-500 focus:ring-0 transition-all font-semibold text-slate-800 shadow-sm" />
            </div>

            <button onClick={calculate} className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-teal-200 active:scale-[0.98] mt-6 text-lg uppercase tracking-wide">
              Compare Now
            </button>
          </div>
        </div>

        <div className="lg:col-span-12 xl:col-span-7">
          {result ? (
             <div className="h-full flex flex-col gap-6">
               <div className={`rounded-3xl p-8 text-white shadow-xl flex flex-col justify-center grow ${result.winner === 'buying' ? 'bg-gradient-to-br from-teal-600 to-emerald-700' : 'bg-gradient-to-br from-indigo-600 to-blue-700'}`}>
                  <div className="text-white/80 text-sm font-bold uppercase tracking-widest mb-2 font-mono">Verdict after {years} years</div>
                  <div className="text-3xl font-black mb-1">
                     {result.winner === 'buying' ? 'BUYING wins!' : 'RENTING wins!'}
                  </div>
                  <div className="text-6xl font-black mb-4 flex items-baseline gap-2">
                    <span className="text-2xl">$</span>
                    {result.difference.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    <span className="text-sm font-normal opacity-80 uppercase tracking-tighter ml-1">cheaper</span>
                  </div>
                  <p className="text-white/70 text-sm italic">Based on {years} years of accumulated costs including mortgage, taxes, and rent inflation.</p>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl shadow-inner">
                    <div className="text-slate-400 text-xs font-bold uppercase mb-1 tracking-widest">Total Buying Cost</div>
                    <div className="text-xl font-black text-slate-700">${result.buyingCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl shadow-inner">
                    <div className="text-slate-400 text-xs font-bold uppercase mb-1 tracking-widest">Total Renting Cost</div>
                    <div className="text-xl font-black text-slate-700">${result.rentingCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                  </div>
               </div>
             </div>
          ) : (
             <div className="h-full min-h-[450px] border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center p-8 text-center bg-slate-50/50">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-4 text-teal-600">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Build Your Future</h3>
                <p className="text-slate-500 max-w-[320px]">See how interest rates and home prices impact your wealth compared to monthly rent.</p>
             </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title={rentVsBuySeoData.title}
        whatIsIt={rentVsBuySeoData.whatIsIt}
        formula={rentVsBuySeoData.formula}
        example={rentVsBuySeoData.example}
        useCases={rentVsBuySeoData.useCases}
        faqs={rentVsBuySeoData.faqs}
        deepDive={rentVsBuySeoData.deepDive}
        glossary={rentVsBuySeoData.glossary}
        relatedCalculators={[
          {
            name: "Mortgage",
            path: "/mortgage-calculator/",
            desc: "Calculate your monthly payments for the potential purchase.",
          },
          {
            name: "House Affordability",
            path: "/house-affordability-calculator/",
            desc: "See if you qualify for the home price in your rent vs buy scenario.",
          },
          {
            name: "ROI",
            path: "/roi-calculator/",
            desc: "Compare your home's appreciation to stock market returns.",
          },
          {
            name: "LTV",
            path: "/ltv-calculator/",
            desc: "Understand your loan-to-value ratio for the down payment choice.",
          },
        ]}
      />
    </div>
  );
}
