"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import rothIraSeoData from "@/data/seo-content/official/roth-ira-calculator.json";

export default function RothIRACalculator() {
  const [currentAge, setCurrentAge] = useState("30");
  const [retirementAge, setRetirementAge] = useState("65");
  const [currentBalance, setCurrentBalance] = useState("5000");
  const [annualContribution, setAnnualContribution] = useState("7000");
  const [expectedReturn, setExpectedReturn] = useState("8");
  const [retirementTaxRate, setRetirementTaxRate] = useState("15");

  const [result, setResult] = useState<{
    totalValue: number;
    totalContributions: number;
    totalEarnings: number;
    taxSavings: number;
  } | null>(null);

  const calculateRothIRA = () => {
    const age = parseInt(currentAge);
    const retireAge = parseInt(retirementAge);
    const initial = parseFloat(currentBalance);
    const annualContrib = parseFloat(annualContribution);
    const rate = parseFloat(expectedReturn) / 100;
    const years = retireAge - age;

    if (!isNaN(age) && !isNaN(retireAge) && years > 0) {
      // FV = PV(1+r)^n + PMT * [((1+r)^n - 1) / r] * (1+r)
      const n = years;
      const r = rate;
      const pv = initial;
      const pmt = annualContrib;

      const futureValue = pv * Math.pow(1 + r, n) + 
                          pmt * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);

      const totalContributions = initial + (pmt * years);
      const totalEarnings = futureValue - totalContributions;
      
      // Tax savings = Earnings * Estimated Retire Tax Rate
      const taxSavings = totalEarnings * (parseFloat(retirementTaxRate) / 100);

      setResult({
        totalValue: futureValue,
        totalContributions,
        totalEarnings,
        taxSavings,
      });
    } else {
      setResult(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 bg-white rounded-2xl shadow-xl border border-orange-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-orange-50 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black text-orange-900 tracking-tight">Roth IRA Calculator</h1>
          <p className="text-orange-600 font-medium mt-1 italic text-base">Project your tax-free retirement wealth growth.</p>
        </div>
        <div className="hidden md:flex flex-col items-end">
          <div className="bg-orange-50 px-4 py-2 rounded-full border border-orange-100 mb-1">
            <span className="text-orange-700 font-bold text-xs uppercase tracking-widest">Premium SEO Suite</span>
          </div>
          <span className="text-[10px] text-orange-400 font-bold uppercase tracking-tighter">Ultra-Expanded Analysis Edition</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* Input Sidebar */}
        <div className="lg:col-span-12 xl:col-span-4 space-y-6">
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-5 shadow-inner">
            <h2 className="text-lg font-black text-slate-800 uppercase tracking-wide border-b border-slate-200 pb-2 mb-4">Savings Parameters</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black text-slate-500 mb-2 uppercase tracking-wider">Current Age</label>
                <input
                  type="number"
                  value={currentAge}
                  onChange={(e) => setCurrentAge(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 focus:border-orange-500 focus:ring-0 transition-all font-bold text-slate-800 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-black text-slate-500 mb-2 uppercase tracking-wider">Retire Age</label>
                <input
                  type="number"
                  value={retirementAge}
                  onChange={(e) => setRetirementAge(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 focus:border-orange-500 focus:ring-0 transition-all font-bold text-slate-800 shadow-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-slate-500 mb-2 uppercase tracking-wider">Current Balance ($)</label>
              <div className="relative">
                 <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">$</span>
                 <input
                  type="number"
                  value={currentBalance}
                  onChange={(e) => setCurrentBalance(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-8 py-3 focus:border-orange-500 focus:ring-0 transition-all font-bold text-slate-800 shadow-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-slate-500 mb-2 uppercase tracking-wider">Annual Contribution ($)</label>
              <div className="relative">
                 <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">$</span>
                 <input
                  type="number"
                  value={annualContribution}
                  onChange={(e) => setAnnualContribution(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-8 py-3 focus:border-orange-500 focus:ring-0 transition-all font-bold text-slate-800 shadow-sm"
                />
              </div>
              <p className="text-[10px] text-slate-400 mt-2 font-medium italic">2024 IRS Limit: $7,000 (standard) / $8,000 (age 50+).</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black text-slate-500 mb-2 uppercase tracking-wider">Return Rate (%)</label>
                <input
                  type="number"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 focus:border-orange-500 focus:ring-0 transition-all font-bold text-slate-800 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-black text-slate-500 mb-2 uppercase tracking-wider">Retire Tax (%)</label>
                <input
                  type="number"
                  value={retirementTaxRate}
                  onChange={(e) => setRetirementTaxRate(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 focus:border-orange-500 focus:ring-0 transition-all font-bold text-slate-800 shadow-sm"
                />
              </div>
            </div>

            <button
              onClick={calculateRothIRA}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-black py-4 rounded-xl transition-all shadow-lg active:scale-[0.98] uppercase tracking-widest text-sm"
            >
              Analyze Growth
            </button>
          </div>
        </div>

        {/* Results Canvas */}
        <div className="lg:col-span-12 xl:col-span-8">
          {result ? (
            <div className="h-full flex flex-col gap-6">
              <div className="bg-gradient-to-br from-orange-600 to-rose-700 rounded-3xl p-10 text-white shadow-2xl flex flex-col justify-center grow relative overflow-hidden border-b-8 border-orange-400">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-16 -mb-16"></div>
                
                <div className="relative z-10">
                  <div className="text-orange-100 text-[10px] font-black uppercase tracking-[0.3em] mb-3">Projected Roth Balance at Age {retirementAge}</div>
                  <div className="text-7xl md:text-8xl font-black mb-6 tracking-tighter drop-shadow-sm">
                    ${result.totalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                  <div className="inline-flex items-center px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-black backdrop-blur-md border border-white/20 uppercase tracking-widest">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.9L10 1.55l7.834 3.35a1 1 0 01.666.927v4.223a8.96 8.96 0 01-2.308 6.048l-4.59 4.89a1 1 0 01-1.452 0l-4.59-4.89A8.96 8.96 0 011.5 10.7V5.827a1 1 0 01.666-.927zM10 14.25a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5z" clipRule="evenodd"/></svg>
                    100% Tax-Free Withdrawals
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white border-2 border-slate-100 p-6 rounded-2xl shadow-sm flex flex-col justify-center">
                  <div className="text-slate-400 text-[10px] font-black uppercase mb-2 tracking-widest leading-none">Total Contributions</div>
                  <div className="text-3xl font-black text-slate-800">${result.totalContributions.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                </div>
                <div className="bg-white border-2 border-slate-100 p-6 rounded-2xl shadow-sm flex flex-col justify-center">
                  <div className="text-slate-400 text-[10px] font-black uppercase mb-2 tracking-widest leading-none">Total Earnings</div>
                  <div className="text-3xl font-black text-emerald-600">${result.totalEarnings.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                </div>
                <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl flex flex-col justify-center border-l-4 border-l-emerald-400">
                  <div className="text-emerald-700 text-[10px] font-black uppercase mb-2 tracking-widest leading-none underline decoration-emerald-200 underline-offset-4">Retire Tax Benefit</div>
                  <div className="text-3xl font-black text-emerald-900">${result.taxSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                  <p className="text-[10px] text-emerald-600 font-bold mt-1 leading-tight">Money saved vs. traditional tax deferral.</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[450px] border-4 border-double border-slate-100 rounded-3xl flex flex-col items-center justify-center p-12 text-center bg-slate-50/30">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-6 text-orange-600 animate-pulse">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-slate-800 mb-3 tracking-tight">Financial Freedom Blueprint</h3>
              <p className="text-slate-500 max-w-[320px] font-medium leading-relaxed">Input your savings goals to unlock our ultra-expanded analysis of tax-free wealth accumulation.</p>
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title={rothIraSeoData.title}
        whatIsIt={rothIraSeoData.whatIsIt}
        formula={rothIraSeoData.formula}
        example={rothIraSeoData.example}
        useCases={rothIraSeoData.useCases}
        faqs={rothIraSeoData.faqs}
        deepDive={rothIraSeoData.deepDive}
        glossary={rothIraSeoData.glossary}
        relatedCalculators={[
          {
            name: "401k",
            path: "/401k-calculator/",
            desc: "Compare your Roth IRA strategy with employer-matched 401k plans.",
          },
          {
            name: "ROI",
            path: "/roi-calculator/",
            desc: "Calculate your exact annualized percentage returns across all accounts.",
          },
          {
            name: "Investment",
            path: "/investment-calculator/",
            desc: "Project your total portfolio growth over time with compound interest.",
          },
          {
            name: "DTI",
            path: "/dti-calculator/",
            desc: "Manage your debt-to-income ratio to ensure you have room for savings.",
          }
        ]}
      />
    </div>
  );
}
