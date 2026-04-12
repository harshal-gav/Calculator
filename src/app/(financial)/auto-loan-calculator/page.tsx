"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import autoLoanSeoData from "@/data/seo-content/official/auto-loan-calculator.json";

export default function AutoLoanCalculator() {
  const [vehiclePrice, setVehiclePrice] = useState("35000");
  const [downPayment, setDownPayment] = useState("5000");
  const [tradeInValue, setTradeInValue] = useState("2000");
  const [interestRate, setInterestRate] = useState("5.5");
  const [loanTerm, setLoanTerm] = useState("60");
  const [salesTaxRate, setSalesTaxRate] = useState("7");

  const [result, setResult] = useState<{
    monthlyPayment: number;
    totalInterest: number;
    totalLoanAmount: number;
    totalPayment: number;
  } | null>(null);

  const calculateLoan = () => {
    const price = parseFloat(vehiclePrice) || 0;
    const down = parseFloat(downPayment) || 0;
    const trade = parseFloat(tradeInValue) || 0;
    const rate = parseFloat(interestRate) || 0;
    const term = parseInt(loanTerm) || 0;
    const tax = parseFloat(salesTaxRate) || 0;

    const taxAmount = price * (tax / 100);
    const principal = price - down - trade + taxAmount;

    if (principal <= 0 || rate < 0 || term <= 0) {
      setResult(null);
      return;
    }

    const monthlyRate = rate / 100 / 12;
    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, term)) /
      (Math.pow(1 + monthlyRate, term) - 1);

    const totalPayment = monthlyPayment * term;
    const totalInterest = totalPayment - principal;

    setResult({
      monthlyPayment,
      totalInterest,
      totalLoanAmount: principal,
      totalPayment,
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-slate-900 font-serif">
          🚗 Auto Loan Calculator
        </h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto italic">
          Master the math of your next vehicle purchase. Calculate monthly payments, interest totals, and more.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* Input Controls */}
        <div className="lg:col-span-12 xl:col-span-5 space-y-6 bg-white p-6 md:p-10 rounded-3xl border border-zinc-200 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-20 group-hover:opacity-100 transition-opacity"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Vehicle Price ($)</label>
              <input 
                type="number" 
                value={vehiclePrice} 
                onChange={(e) => setVehiclePrice(e.target.value)} 
                className="w-full rounded-2xl border-slate-200 p-4 font-black transition-all focus:ring-4 focus:ring-blue-100 focus:border-blue-500 text-xl text-slate-900" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Down Payment ($)</label>
              <input 
                type="number" 
                value={downPayment} 
                onChange={(e) => setDownPayment(e.target.value)} 
                className="w-full rounded-2xl border-slate-200 p-4 font-black transition-all focus:ring-4 focus:ring-blue-100 focus:border-blue-500 text-xl text-slate-900" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Trade-In ($)</label>
              <input 
                type="number" 
                value={tradeInValue} 
                onChange={(e) => setTradeInValue(e.target.value)} 
                className="w-full rounded-2xl border-slate-200 p-4 font-black transition-all focus:ring-4 focus:ring-blue-100 focus:border-blue-500 text-xl text-slate-900" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Sales Tax (%)</label>
              <input 
                type="number" 
                value={salesTaxRate} 
                onChange={(e) => setSalesTaxRate(e.target.value)} 
                className="w-full rounded-2xl border-slate-200 p-4 font-black transition-all focus:ring-4 focus:ring-blue-100 focus:border-blue-500 text-xl text-slate-900" 
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Interest Rate (%)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    step="0.1" 
                    value={interestRate} 
                    onChange={(e) => setInterestRate(e.target.value)} 
                    className="w-full rounded-2xl border-slate-200 p-4 font-black transition-all focus:ring-4 focus:ring-blue-100 focus:border-blue-500 text-xl text-blue-700 bg-blue-50/30" 
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-300 font-black">%</span>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Term (Months)</label>
                <select 
                  value={loanTerm} 
                  onChange={(e) => setLoanTerm(e.target.value)} 
                  className="w-full rounded-2xl border-slate-200 p-4 font-black transition-all focus:ring-4 focus:ring-blue-100 focus:border-blue-500 text-xl bg-white"
                >
                  {[24, 36, 48, 60, 72, 84].map(m => (
                    <option key={m} value={m}>{m} Months ({m/12} years)</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <button
            onClick={calculateLoan}
            className="w-full bg-slate-900 text-white font-black py-6 rounded-2xl hover:bg-slate-800 transition shadow-2xl shadow-slate-900/40 text-lg uppercase tracking-widest mt-4"
          >
            Calculate Payment
          </button>
        </div>

        {/* Dashboard/Results */}
        <div className="lg:col-span-12 xl:col-span-7 flex flex-col space-y-6">
          {result !== null ? (
            <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-[3rem] p-8 md:p-12 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] relative overflow-hidden h-full flex flex-col justify-center">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
              
              <div className="text-center">
                <span className="text-blue-400 font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Monthly Obligation</span>
                <div className="text-7xl md:text-8xl font-black mb-10 tabular-nums tracking-tighter drop-shadow-lg">
                  ${result.monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-white/10">
                <div className="text-center p-4 bg-white/5 rounded-2xl border border-white/5">
                  <span className="block text-[9px] font-bold text-slate-400 uppercase mb-2">Loan Amount</span>
                  <div className="text-xl font-bold">${result.totalLoanAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-2xl border border-white/5">
                  <span className="block text-[9px] font-bold text-slate-400 uppercase mb-2">Total Interest</span>
                  <div className="text-xl font-bold text-blue-400">${result.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                </div>
                <div className="text-center p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20">
                  <span className="block text-[9px] font-bold text-blue-300 uppercase mb-2">Total Payment</span>
                  <div className="text-xl font-bold text-white">${result.totalPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                </div>
              </div>

              <div className="mt-10 px-4">
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden flex">
                  <div className="h-full bg-slate-500" style={{ width: `${(result.totalLoanAmount / result.totalPayment) * 100}%` }}></div>
                  <div className="h-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]" style={{ width: `${(result.totalInterest / result.totalPayment) * 100}%` }}></div>
                </div>
                <div className="flex justify-between text-[10px] uppercase font-bold text-slate-500 mt-2">
                  <span>Principal</span>
                  <span className="text-blue-400">Pure Interest</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white border-2 border-dashed border-slate-200 rounded-[3rem] h-full flex flex-col items-center justify-center p-12 text-center text-slate-300 group hover:border-blue-400 transition-colors">
              <span className="text-7xl mb-6 opacity-30 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700">🛒</span>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Ready to Drive?</h3>
              <p className="max-w-xs text-sm text-slate-400 font-medium">Input your financing details to see exactly how your choices affect your long-term wealth.</p>
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title={autoLoanSeoData.title}
        whatIsIt={autoLoanSeoData.whatIsIt}
        formula={autoLoanSeoData.formula}
        example={autoLoanSeoData.example}
        useCases={autoLoanSeoData.useCases}
        faqs={autoLoanSeoData.faqs}
        deepDive={autoLoanSeoData.deepDive}
        glossary={autoLoanSeoData.glossary}
        comparisonTable={autoLoanSeoData.comparisonTable}
        relatedCalculators={[
          {
            name: "Auto Lease",
            path: "/auto-lease-calculator/",
            desc: "Compare the costs of leasing versus buying to see which fits your lifestyle and financial goals.",
          },
          {
            name: "Fuel Cost",
            path: "/fuel-cost-calculator/",
            desc: "Estimate your monthly and annual gas expenses based on your vehicle's MPG and your driving habits.",
          },
          {
            name: "Loan Payoff",
            path: "/loan-payoff-calculator/",
            desc: "See how much time and money you can save by making extra payments toward your principal.",
          },
          {
            name: "Car Depreciation",
            path: "/car-depreciation-calculator/",
            desc: "Predict how much your vehicle will be worth in 3, 5, or 10 years based on historical data.",
          },
        ]}
      />
    </div>
  );
}
