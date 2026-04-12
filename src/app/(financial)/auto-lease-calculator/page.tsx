"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import autoLeaseSeoData from "@/data/seo-content/official/auto-lease-calculator.json";

export default function AutoLeaseCalculator() {
  const [negotiatedPrice, setNegotiatedPrice] = useState("35000");
  const [downPayment, setDownPayment] = useState("3000");
  const [tradeIn, setTradeIn] = useState("0");
  const [loanTerm, setLoanTerm] = useState("36");
  const [moneyFactor, setMoneyFactor] = useState("0.0025");
  const [residualValue, setResidualValue] = useState("60");

  const [result, setResult] = useState<{
    monthlyPayment: number;
    depreciationCharge: number;
    rentCharge: number;
    totalLeaseCost: number;
  } | null>(null);

  const calculateLease = () => {
    const price = parseFloat(negotiatedPrice) || 0;
    const down = parseFloat(downPayment) || 0;
    const trade = parseFloat(tradeIn) || 0;
    const months = parseInt(loanTerm) || 0;
    const mf = parseFloat(moneyFactor) || 0;
    const residualPercent = parseFloat(residualValue) || 0;

    const capCost = price - down - trade;
    const residualAmt = price * (residualPercent / 100);

    if (capCost <= residualAmt || months <= 0) {
      setResult(null);
      return;
    }

    const depreciationCharge = (capCost - residualAmt) / months;
    const rentCharge = (capCost + residualAmt) * mf;
    const monthlyPayment = depreciationCharge + rentCharge;

    setResult({
      monthlyPayment,
      depreciationCharge,
      rentCharge,
      totalLeaseCost: (monthlyPayment * months) + down + trade,
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 bg-slate-50 rounded-2xl shadow-xl border border-slate-200">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-indigo-950 font-serif">
          🛋️ Auto Lease Calculator
        </h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto italic">
          Decode the fine print of your lease agreement. Calculate money factors, residual values, and monthly payments.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* Controls */}
        <div className="lg:col-span-12 xl:col-span-5 space-y-6 bg-white p-6 md:p-10 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full -mr-10 -mt-10"></div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Negotiated Price ($)</label>
              <input type="number" value={negotiatedPrice} onChange={(e) => setNegotiatedPrice(e.target.value)} className="w-full rounded-2xl border-slate-200 p-4 font-black transition-all focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 text-xl text-indigo-950" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Down Payment ($)</label>
                <input type="number" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} className="w-full rounded-2xl border-slate-200 p-4 font-black" />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Trade-In ($)</label>
                <input type="number" value={tradeIn} onChange={(e) => setTradeIn(e.target.value)} className="w-full rounded-2xl border-slate-200 p-4 font-black" />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Term (Mo)</label>
                  <select value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} className="w-full rounded-xl border-slate-200 p-3 font-bold bg-white text-sm">
                    {[24, 30, 36, 42, 48].map(m => <option key={m} value={m}>{m} Mo</option>)}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Money Factor</label>
                  <input type="number" step="0.0001" value={moneyFactor} onChange={(e) => setMoneyFactor(e.target.value)} className="w-full rounded-xl border-slate-200 p-3 font-bold text-sm bg-indigo-50/50 text-indigo-700" title="Typical range: 0.001 to 0.004" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex justify-between">
                <span>Residual Value (% of price)</span>
                <span className="text-indigo-600">{residualValue}%</span>
              </label>
              <input type="range" min="30" max="80" value={residualValue} onChange={(e) => setResidualValue(e.target.value)} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
            </div>
          </div>

          <button onClick={calculateLease} className="w-full bg-indigo-950 text-white font-black py-5 rounded-2xl hover:bg-black transition shadow-xl text-sm uppercase tracking-[0.2em] mt-6">
            Calculate Lease
          </button>
        </div>

        {/* Output */}
        <div className="lg:col-span-12 xl:col-span-7">
          {result !== null ? (
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-200 shadow-2xl relative overflow-hidden h-full flex flex-col justify-center">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/5 -mr-16 -mt-16 rounded-full"></div>
              
              <div className="mb-10 text-center">
                <span className="inline-block px-4 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">Estimated Monthly</span>
                <div className="text-7xl font-black text-slate-900 tabular-nums tracking-tighter">
                  ${result.monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-3">
                    <span className="text-slate-500 font-medium">Depreciation Fee</span>
                    <span className="font-bold text-slate-900">${result.depreciationCharge.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-3">
                    <span className="text-indigo-600 font-bold">Rent Charge (Interest)</span>
                    <span className="font-bold text-indigo-700">${result.rentCharge.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-slate-900 text-white rounded-2xl flex flex-col items-center justify-center">
                    <span className="text-[9px] font-black uppercase text-slate-500 mb-1">Total Cost of Lease</span>
                    <span className="text-xl font-black">${result.totalLeaseCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-[10px] text-slate-400 bg-slate-50 p-4 rounded-xl italic">
                *Calculation excludes local sales tax, acquisition fees, and registration costs which vary by state.
              </div>
            </div>
          ) : (
            <div className="bg-indigo-950 rounded-[2.5rem] h-full flex flex-col items-center justify-center p-12 text-center relative overflow-hidden">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
               <div className="z-10">
                <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mx-auto mb-6 backdrop-blur-md">
                  <span className="text-4xl">📄</span>
                </div>
                <h3 className="text-white font-black text-2xl mb-3">Analyze Your Agreement</h3>
                <p className="text-indigo-300 text-sm max-w-xs font-medium leading-relaxed">Leasing is often more opaque than buying. Our calculator reveals the hidden math behind the dealership's offer.</p>
               </div>
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title={autoLeaseSeoData.title}
        whatIsIt={autoLeaseSeoData.whatIsIt}
        formula={autoLeaseSeoData.formula}
        example={autoLeaseSeoData.example}
        useCases={autoLeaseSeoData.useCases}
        faqs={autoLeaseSeoData.faqs}
        deepDive={autoLeaseSeoData.deepDive}
        glossary={autoLeaseSeoData.glossary}
        comparisonTable={autoLeaseSeoData.comparisonTable}
        relatedCalculators={[
          {
            name: "Auto Loan",
            path: "/auto-loan-calculator/",
            desc: "The alternative to leasing: calculate the cost of buying a car with a traditional loan.",
          },
          {
            name: "Rent vs Buy",
            path: "/rent-vs-buy-calculator/",
            desc: "Explore the same financial logic applied to your primary residence.",
          },
          {
            name: "Loan Payoff",
            path: "/loan-payoff-calculator/",
            desc: "Determine how much you save by paying down debt earlier than scheduled.",
          },
          {
            name: "Gas Mileage",
            path: "/gas-mileage-calculator/",
            desc: "Consider the operational costs (fuel) in tandem with your lease payment.",
          }]}
      />
    </div>
  );
}
