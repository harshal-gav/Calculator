"use client";

import { useState, useEffect } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import cdSeoData from "@/data/seo-content/official/cd-calculator.json";

export default function CDCalculator() {
  const [initialDeposit, setInitialDeposit] = useState("10000");
  const [apy, setApy] = useState("5.0");
  const [term, setTerm] = useState("60"); // months
  const [compounding, setCompounding] = useState("365"); // daily default

  const [result, setResult] = useState<{
    maturityValue: number;
    totalInterest: number;
    effectiveYield: number;
  } | null>(null);

  useEffect(() => {
    calculateCD();
  }, [initialDeposit, apy, term, compounding]);

  const calculateCD = () => {
    const p = parseFloat(initialDeposit) || 0;
    const r = (parseFloat(apy) / 100);
    const t = (parseFloat(term) / 12);
    const n = parseFloat(compounding);

    if (p > 0 && t > 0) {
      // CD Maturity Value Formula: A = P(1 + r/n)^(nt)
      // Note: Usually APY is the annual effective rate, but banks often cite nominal
      // For this tool, we assume input is APY (effective) to match consumer perception
      // but calculate maturity value based on standard compound interest.
      
      const maturityValue = p * Math.pow(1 + r / n, n * t);
      const totalInterest = maturityValue - p;
      const effectiveYield = (Math.pow(1 + r / n, n) - 1) * 100;

      setResult({
        maturityValue,
        totalInterest,
        effectiveYield
      });
    } else {
      setResult(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 bg-white rounded-3xl shadow-xl border border-indigo-100 italic-headings">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-indigo-50 pb-8 mb-10 gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-indigo-950 tracking-tighter uppercase italic">
            CD <span className="text-indigo-600">Yield</span> Master
          </h1>
          <p className="text-slate-500 font-medium mt-1 italic text-base">Institutional-grade certificate of deposit analysis.</p>
        </div>
        <div className="hidden md:flex flex-col items-end text-right">
          <div className="bg-indigo-50 px-4 py-2 rounded-full border border-indigo-100 mb-1 shadow-sm">
            <span className="text-indigo-700 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span> Fixed Income Protocol
            </span>
          </div>
          <span className="text-[10px] text-indigo-300 font-bold uppercase tracking-tighter">Authorized Maturity Projection</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
        {/* Input Sidebar */}
        <div className="lg:col-span-12 xl:col-span-4 space-y-6">
          <div className="p-8 bg-zinc-50 rounded-[2.5rem] border border-zinc-200 space-y-6 shadow-inner relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-indigo-500/10 transition-colors"></div>
            
            <h2 className="text-sm font-black text-indigo-900 uppercase tracking-[0.3em] mb-4 border-b border-indigo-100 pb-3 italic">Vault Configuration</h2>
            
            <div>
              <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest leading-none">Initial Deposit ($)</label>
              <div className="relative">
                 <span className="absolute left-5 top-1/2 -translate-y-1/2 font-black text-indigo-400 text-xl">$</span>
                 <input
                  type="number"
                  value={initialDeposit}
                  onChange={(e) => setInitialDeposit(e.target.value)}
                  className="w-full bg-white border border-zinc-300 rounded-2xl px-10 py-4 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-black text-2xl text-slate-900 shadow-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest leading-none">CD APY (%)</label>
                <div className="relative">
                  <input
                    type="number"
                    value={apy}
                    onChange={(e) => setApy(e.target.value)}
                    className="w-full bg-white border border-zinc-300 rounded-2xl px-4 py-4 focus:border-indigo-500 transition-all font-black text-lg text-indigo-700"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 font-black text-indigo-300">%</span>
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest leading-none">Compounding</label>
                <select
                  value={compounding}
                  onChange={(e) => setCompounding(e.target.value)}
                  className="w-full bg-white border border-zinc-300 rounded-2xl px-3 py-4 focus:border-indigo-500 transition-all font-bold text-xs text-slate-700 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%236366f1%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.4-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px_12px] bg-[right_1rem_center] bg-no-repeat"
                >
                  <option value="365">Daily</option>
                  <option value="12">Monthly</option>
                  <option value="4">Quarterly</option>
                  <option value="1">Annually</option>
                </select>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-200">
               <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex justify-between">
                 <span>Term Length</span>
                 <span className="text-indigo-900 font-black">{term} Months</span>
               </label>
               <input
                 type="range"
                 min="1"
                 max="120"
                 value={term}
                 onChange={(e) => setTerm(e.target.value)}
                 className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 mb-3"
               />
               <div className="flex justify-between text-[8px] font-black text-slate-300 uppercase leading-none">
                 <span>1 Month</span>
                 <span>10 Years</span>
               </div>
            </div>

            <button
              onClick={calculateCD}
              className="w-full bg-indigo-900 hover:bg-slate-900 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-indigo-100 uppercase tracking-[0.3em] text-xs hover:translate-y-[-2px]"
            >
              Analyze Maturity
            </button>
          </div>
          
          <div className="p-6 bg-amber-50 rounded-3xl border border-amber-100 shadow-sm flex items-start gap-4">
            <span className="text-2xl mt-1">🏦</span>
            <div className="space-y-1">
              <span className="block text-[10px] font-black text-amber-700 uppercase tracking-widest">FDIC Guaranteed</span>
              <p className="text-[11px] font-bold text-amber-800 leading-relaxed italic">Most CDs are insured up to $250k. Your principal is legally protected.</p>
            </div>
          </div>
        </div>

        {/* Results Canvas */}
        <div className="lg:col-span-12 xl:col-span-8 flex flex-col">
          {result !== null ? (
            <div className="h-full flex flex-col gap-6">
              <div className="grow bg-slate-950 rounded-[3rem] p-12 md:p-16 text-white shadow-2xl relative overflow-hidden flex flex-col justify-center border border-slate-800">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] -mr-64 -mt-64 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[100px] -ml-32 -mb-32 pointer-events-none"></div>
                
                <div className="relative z-10">
                  <span className="inline-block px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] mb-8 italic">Value at Maturity</span>
                  <div className="text-8xl md:text-9xl font-black text-white tracking-tighter tabular-nums mb-4 bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent flex items-baseline gap-2">
                    <span className="text-4xl md:text-6xl text-slate-600 font-bold tracking-normal italic">$</span>
                    {result.maturityValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[10px] font-black uppercase tracking-widest leading-none">
                      Fixed Growth Contract
                    </div>
                    <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest italic">Effective APY: {result.effectiveYield.toFixed(3)}%</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 italic-headings">
                <div className="bg-white border-2 border-slate-100 p-8 rounded-[2rem] shadow-sm flex flex-col justify-center relative group overflow-hidden">
                  <div className="absolute inset-0 bg-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative z-10">
                    <div className="text-slate-400 text-[10px] font-black uppercase mb-3 tracking-widest leading-none">Original Principal</div>
                    <div className="text-4xl font-black text-slate-800">${parseFloat(initialDeposit).toLocaleString()}</div>
                  </div>
                </div>
                <div className="bg-emerald-50 border-2 border-emerald-100 p-8 rounded-[2rem] flex flex-col justify-center relative overflow-hidden shadow-sm group">
                  <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[8px] font-black px-4 py-2 rounded-bl-xl tracking-[0.2em] uppercase z-20 group-hover:bg-emerald-700 transition-colors">Yield Profit</div>
                  <div className="text-emerald-700/60 text-[10px] font-black uppercase mb-3 tracking-widest leading-none relative z-10">Total Interest Accrued</div>
                  <div className="text-4xl font-black text-emerald-900 relative z-10 tabular-nums">
                    +${result.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </div>
                  <p className="text-[10px] text-emerald-600 font-bold mt-2 italic relative z-10">Guaranteed passive return at term end.</p>
                </div>
              </div>

              <div className="bg-zinc-50 border border-zinc-200 p-8 rounded-[2rem] flex items-center justify-between gap-8">
                 <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Growth Factor</span>
                    <span className="text-xl font-black text-indigo-900 italic uppercase tracking-tighter">
                      {((result.maturityValue / parseFloat(initialDeposit) - 1) * 100).toFixed(1)}% <span className="text-slate-400 font-bold text-xs">Total ROI</span>
                    </span>
                 </div>
                 <div className="h-10 w-[1px] bg-zinc-300"></div>
                 <div className="grow space-y-3">
                    <div className="h-2 w-full bg-zinc-200 rounded-full overflow-hidden shadow-inner flex">
                       <div className="h-full bg-slate-300" style={{ width: `${(parseFloat(initialDeposit) / result.maturityValue) * 100}%` }}></div>
                       <div className="h-full bg-indigo-500 animate-pulse" style={{ width: `${(result.totalInterest / result.maturityValue) * 100}%` }}></div>
                    </div>
                    <div className="flex justify-between text-[8px] font-black text-slate-400 uppercase tracking-[0.2em]">
                       <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span> Principal</span>
                       <span className="flex items-center gap-1.5 text-indigo-600 italic"><span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> Compound Interest Earnings</span>
                    </div>
                 </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[500px] border-4 border-double border-zinc-100 rounded-[3rem] flex flex-col items-center justify-center p-12 text-center bg-zinc-50/50">
               <div className="w-24 h-24 bg-indigo-50 rounded-[2.5rem] flex items-center justify-center mb-8 shadow-inner animate-pulse">
                  <span className="text-5xl">🔒</span>
               </div>
               <h3 className="text-indigo-950 text-3xl font-black mb-4 italic tracking-tight uppercase">Unlock Your Yield</h3>
               <p className="text-slate-400 max-w-xs font-medium leading-relaxed text-lg italic">Lock in a fixed rate for guaranteed future wealth. Input your deposit and term to see the vault projection.</p>
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title={cdSeoData.title}
        whatIsIt={cdSeoData.whatIsIt}
        formula={cdSeoData.formula}
        example={cdSeoData.example}
        useCases={cdSeoData.useCases}
        faqs={cdSeoData.faqs}
        deepDive={cdSeoData.deepDive}
        glossary={cdSeoData.glossary}
        relatedCalculators={[
          {
            name: "APY Calculator",
            path: "/apy-calculator/",
            desc: "Convert between nominal and effective annual yields to see the true power of compounding.",
          },
          {
            name: "Savings Goal",
            path: "/savings-goal-calculator/",
            desc: "Reverse-engineer your savings to find out how much to deposit monthly for a specific target.",
          },
          {
            name: "Simple Interest",
            path: "/simple-interest-calculator/",
            desc: "The basic way to calculate interest without the amplification of compounding effects.",
          },
          {
            name: "Investment",
            path: "/investment-calculator/",
            desc: "Simulate higher-risk, higher-reward portfolios including stocks, bonds, and mutual funds.",
          }
        ]}
      />
    </div>
  );
}
