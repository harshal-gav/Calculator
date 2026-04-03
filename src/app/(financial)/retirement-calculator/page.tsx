"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState("30");
  const [retirementAge, setRetirementAge] = useState("65");
  const [currentSavings, setCurrentSavings] = useState("50000");
  const [monthlyContribution, setMonthlyContribution] = useState("1000");
  const [expectedReturn, setExpectedReturn] = useState("7");
  const [inflationRate, setInflationRate] = useState("3");
  const [withdrawalRate, setWithdrawalRate] = useState("4");

  const [result, setResult] = useState<{
    totalAtRetirement: number;
    monthlyIncome: number;
    purchasingPower: number;
    yearsToSave: number;
  } | null>(null);

  const calculateRetirement = () => {
    const age = parseInt(currentAge);
    const retAge = parseInt(retirementAge);
    const initial = parseFloat(currentSavings) || 0;
    const monthly = parseFloat(monthlyContribution) || 0;
    const rate = (parseFloat(expectedReturn) / 100) / 12;
    const inflYearly = parseFloat(inflationRate) / 100;
    const drawRate = parseFloat(withdrawalRate) / 100;

    if (retAge > age) {
      const months = (retAge - age) * 12;
      let balance = initial;

      for (let i = 0; i < months; i++) {
        balance = balance * (1 + rate) + monthly;
      }

      const inflationFactor = Math.pow(1 + inflYearly, retAge - age);
      const purchasingPower = balance / inflationFactor;

      setResult({
        totalAtRetirement: balance,
        monthlyIncome: (balance * drawRate) / 12,
        purchasingPower: purchasingPower,
        yearsToSave: retAge - age
      });
    } else {
      setResult(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black mb-4 text-slate-900 font-serif tracking-tight">
          🏔️ Retirement & Wealth Projection
        </h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto italic">
          Simulate your financial independence. Account for inflation, market returns, and sustainable withdrawal rates.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* Controls */}
        <div className="lg:col-span-12 xl:col-span-5 bg-white p-6 md:p-10 rounded-[2.5rem] border border-zinc-200 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-20 group-hover:opacity-100 transition-opacity"></div>
          
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Current Age</label>
              <input type="number" value={currentAge} onChange={(e) => setCurrentAge(e.target.value)} className="w-full rounded-2xl border-slate-100 bg-slate-50 p-4 font-black text-xl text-slate-900 focus:ring-4 focus:ring-blue-50 focus:bg-white transition-all shadow-inner" />
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Retire Age</label>
              <input type="number" value={retirementAge} onChange={(e) => setRetirementAge(e.target.value)} className="w-full rounded-2xl border-slate-100 bg-slate-50 p-4 font-black text-xl text-slate-900 focus:ring-4 focus:ring-indigo-50 focus:bg-white transition-all shadow-inner" />
            </div>
          </div>

          <div className="space-y-6 mb-8 pt-6 border-t border-slate-50">
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Current Savings ($)</label>
              <input type="number" value={currentSavings} onChange={(e) => setCurrentSavings(e.target.value)} className="w-full rounded-2xl border-slate-100 p-4 font-black text-xl text-slate-900 shadow-sm" />
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Monthly Contribution ($)</label>
              <input type="number" value={monthlyContribution} onChange={(e) => setMonthlyContribution(e.target.value)} className="w-full rounded-2xl border-slate-100 p-4 font-black text-xl text-blue-600 bg-blue-50/30" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 pb-8">
            <div>
              <label className="block text-[8px] font-black text-slate-400 uppercase mb-1">Return %</label>
              <input type="number" value={expectedReturn} onChange={(e) => setExpectedReturn(e.target.value)} className="w-full rounded-xl border-slate-100 p-3 text-sm font-bold bg-slate-50" />
            </div>
            <div>
              <label className="block text-[8px] font-black text-slate-400 uppercase mb-1">Inflat. %</label>
              <input type="number" value={inflationRate} onChange={(e) => setInflationRate(e.target.value)} className="w-full rounded-xl border-slate-100 p-3 text-sm font-bold bg-slate-50" />
            </div>
            <div>
              <label className="block text-[8px] font-black text-slate-400 uppercase mb-1">Draw %</label>
              <input type="number" value={withdrawalRate} onChange={(e) => setWithdrawalRate(e.target.value)} className="w-full rounded-xl border-slate-100 p-3 text-sm font-bold bg-slate-50" />
            </div>
          </div>

          <button onClick={calculateRetirement} className="w-full bg-slate-900 text-white font-black py-6 rounded-2xl hover:bg-black transition shadow-2xl text-sm uppercase tracking-[0.3em] hover:scale-[1.01] active:scale-95">
            Project My Future
          </button>
        </div>

        {/* Dashboard */}
        <div className="lg:col-span-12 xl:col-span-7 flex flex-col">
          {result !== null ? (
            <div className="bg-white border border-slate-100 rounded-[3rem] p-10 shadow-2xl flex-grow flex flex-col justify-between relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
               
               <div className="text-center mb-10">
                  <span className="inline-block px-4 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">Total Estimated Nest Egg</span>
                  <div className="text-8xl font-black text-slate-900 tracking-tighter tabular-nums drop-shadow-sm">
                    ${result.totalAtRetirement.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                  <p className="text-slate-400 font-bold uppercase text-[10px] mt-2 tracking-widest">Achieved in {result.yearsToSave} years</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                  <div className="p-6 bg-emerald-50 rounded-3xl border border-emerald-100">
                    <span className="block text-[9px] font-black text-emerald-600 uppercase mb-2">Est. Monthly Income</span>
                    <div className="text-4xl font-black text-emerald-950">${result.monthlyIncome.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                    <p className="text-[10px] text-emerald-700 mt-2 font-medium italic">Sustainable monthly drawdown (SWR)</p>
                  </div>
                  <div className="p-6 bg-slate-900 rounded-3xl text-white">
                    <span className="block text-[9px] font-black text-slate-500 uppercase mb-2">Today's Purchasing Power</span>
                    <div className="text-4xl font-black">${result.purchasingPower.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                    <p className="text-[10px] text-slate-400 mt-2 font-medium lowercase italic">Equivalent to {inflationRate}% inflation adj.</p>
                  </div>
               </div>

               <div className="p-6 bg-indigo-50/50 rounded-3xl border border-indigo-100/50 italic text-sm text-indigo-900 leading-relaxed font-medium">
                  At the specified <span className="font-bold">{withdrawalRate}% Safe Withdrawal Rate</span>, this portfolio generates approximately <span className="font-bold">${(result.monthlyIncome * 12).toLocaleString()}</span> per year, allowing you to retire comfortably without depleting your principal in most historical market conditions.
               </div>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-[3rem] h-full p-12 flex flex-col items-center justify-center text-center shadow-2xl relative overflow-hidden group">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
               <div className="z-10 bg-white/5 border border-white/10 backdrop-blur-md p-10 rounded-full mb-8 group-hover:scale-110 transition-transform duration-700">
                  <span className="text-6xl grayscale group-hover:grayscale-0 transition-all">📈</span>
               </div>
               <h3 className="text-white text-3xl font-black mb-3 z-10 font-serif">Valuate Your Horizon</h3>
               <p className="text-slate-500 max-w-sm font-medium leading-relaxed z-10 text-sm">Input your current assets and savings habits to see a professional-grade simulation of your financial freedom date.</p>
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title="Professional Retirement Planner: Mastering Financial Independence & Withdrawal Strategies"
        whatIsIt={
          <div className="space-y-6">
            <p className="text-xl font-medium leading-relaxed">
              A <strong>Retirement Calculator</strong> is a longitudinal financial simulator designed to quantify the "Number"—the specific amount of liquid capital required to sustain your lifestyle indefinitely without active labor income. In the modern financial landscape, characterized by the decline of private pensions and the rising cost of healthcare, understanding your wealth trajectory is the most critical technical skill you can possess.
            </p>
            <p className="leading-relaxed">
              This tool does not just add up your savings; it accounts for the <strong>interplay of compounding returns</strong>, <strong>inflationary erosion</strong>, and <strong>drawdown velocity</strong>. It helps you answer the ultimate question: "Can I stop working?" by projecting how your current assets (your "Nest Egg") will interact with your future contributions over decades.
            </p>
            <p className="leading-relaxed">
              Whether you are pursuing the <strong>FIRE (Financial Independence, Retire Early)</strong> movement or planning a traditional transition into retirement at age 65, this calculator provides the mathematical transparency needed to stress-test your strategy against various economic realities, such as persistent inflation or long-term market stagnation.
            </p>
          </div>
        }
        comparisonTable={{
          title: "S&P 500 Historical Performance & Inflation (Decade Benchmarks)",
          headers: ["Decade", "Avg. Annual Return (Nominal)", "Avg. Inflation Rate", "Real Purchasing Power Change"],
          rows: [
            ["1970 - 1979", "+5.9%", "7.1%", "-1.2% (The decade of stagflation)"],
            ["1980 - 1989", "+17.6%", "5.6%", "+12.0% (The Great Expansion)"],
            ["1990 - 1999", "+18.2%", "3.0%", "+15.2% (Dotcom boom)"],
            ["2000 - 2009", "-0.9%", "2.5%", "-3.4% (The 'Lost Decade')"],
            ["2010 - 2019", "+13.6%", "1.8%", "+11.8% (Post-GFC recovery)"],
            ["2020 - Present", "+12.1%", "4.4%", "+7.7% (Highly volatile period)"],
          ]
        }}
        formula={
          <>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 font-mono text-lg text-indigo-700 text-center shadow-sm my-6">
              Retirement Analysis Model
            </div>
            <p className="text-sm text-slate-500 text-center">
              This tool utilize standardized mathematical formulas and logic to calculate precise Retirement results.
            </p>
          </>
        }
          example={
          <div className="bg-white p-10 md:p-14 rounded-[3rem] shadow-sm border border-slate-100 flex flex-col md:flex-row gap-12">
            <div className="flex-1 space-y-6">
               <h5 className="font-black text-blue-600 uppercase tracking-widest text-xs mb-4">Case Study: The Cost of Delay</h5>
               <p className="text-slate-500 text-sm leading-relaxed">
                 Consider two investors both aiming to retire at age 65 with a 7% average annual market return.
               </p>
               <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 italic font-medium text-slate-700">
                 "Compounding interest is the eighth wonder of the world. He who understands it, earns it; he who doesn't, pays it." – Albert Einstein
               </div>
            </div>
            <div className="flex-1 space-y-4">
               <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm">
                  <span className="text-[10px] font-black text-slate-400 uppercase">Early Starter (Age 25)</span>
                  <p className="text-xs text-slate-600 mt-1">$500/mo for 40 years</p>
                  <div className="text-2xl font-black text-slate-900">$1,312,000 Final</div>
               </div>
               <div className="p-6 bg-blue-50 border border-blue-100 rounded-2xl shadow-sm">
                  <span className="text-[10px] font-black text-blue-400 uppercase">Late Starter (Age 35)</span>
                  <p className="text-xs text-slate-600 mt-1">$1,000/mo for 30 years</p>
                  <div className="text-2xl font-black text-blue-700">$1,220,000 Final</div>
               </div>
               <p className="text-[9px] text-slate-400 uppercase font-black text-center pt-2 tracking-widest">Result: Starting 10 years earlier creates MORE wealth with 50% LESS monthly effort.</p>
            </div>
          </div>
        }
        useCases={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 bg-white border border-slate-100 rounded-[2rem] shadow-sm hover:shadow-xl transition-shadow">
               <h5 className="font-black text-slate-900 text-[10px] uppercase mb-3 tracking-widest">FIRE Roadmap</h5>
               <p className="text-xs text-slate-500 leading-relaxed">Calculate how an 80% savings rate can shorten your career from 40 years to just 12 years.</p>
            </div>
            <div className="p-8 bg-white border border-slate-100 rounded-[2rem] shadow-sm hover:shadow-xl transition-shadow">
               <h5 className="font-black text-slate-900 text-[10px] uppercase mb-3 tracking-widest">Social Security Floor</h5>
               <p className="text-xs text-slate-500 leading-relaxed">Project how much a delayed SSA claim (at age 70) reduces the "Nut" you need to save yourself.</p>
            </div>
            <div className="p-8 bg-white border border-slate-100 rounded-[2rem] shadow-sm hover:shadow-xl transition-shadow">
               <h5 className="font-black text-slate-900 text-[10px] uppercase mb-3 tracking-widest">Inheritance Planning</h5>
               <p className="text-xs text-slate-500 leading-relaxed">Determine how much you can leave behind for heirs by withdrawing only 3% annually.</p>
            </div>
            <div className="p-8 bg-white border border-slate-100 rounded-[2rem] shadow-sm hover:shadow-xl transition-shadow">
               <h5 className="font-black text-slate-900 text-[10px] uppercase mb-3 tracking-widest">Downsizing Potential</h5>
               <p className="text-xs text-slate-500 leading-relaxed">Estimate how selling your home and adding $300k to your principal instantly changes your retirement date.</p>
            </div>
          </div>
        }
        glossary={[
          { term: "Safe Withdrawal Rate (SWR)", definition: "The percentage of a portfolio that can be withdrawn annually without depleting the original capital over a 30-year period." },
          { term: "The 'Number'", definition: "The total target portfolio value required to fund a specific annual expense budget using a chosen withdrawal rate." },
          { term: "Inflation", definition: "The rate at which the general level of prices for goods and services is rising and, consequently, the purchasing power of currency is falling." },
          { term: "Real Rate of Return", definition: "The annual percentage return on an investment which is adjusted for changes of prices due to inflation." },
          { term: "Sequence of Returns Risk", definition: "The risk that the timing of market returns will be unfavorable (i.e., market drop at start of retirement)." },
          { term: "401(k) / IRA", definition: "The primary tax-advantaged retirement saving vehicles in the United States." },
          { term: "Human Capital", definition: "Your lifetime ability to earn a salary, which act as a hedge against market volatility early in a career." },
          { term: "Longevity Risk", definition: "The mathematical risk of outliving your wealth, necessitating a lower withdrawal rate or an annuity." },
          { term: "Asset Correlation", definition: "The degree to which different investments (e.g., Stocks vs. Gold) move in tandem during a crisis." },
          { term: "Compounding", definition: "The process where the value of an investment increases because the earnings on an investment, both capital gains and interest, earn interest as time passes." },
        ]}
        faqs={[
          {
            question: "How much do I need to retire?",
            answer: "A common benchmark is 25 times your annual expenses. If you spend $60,000 a year, your target nest egg is $1.5 million. This aligns with the 4% Withdrawal Rule."
          },
          {
            question: "Does this account for healthcare costs?",
            answer: "No. Healthcare is the single largest variable expense in retirement. Most experts recommend an additional $300,000 cushion for couples to cover out-of-pocket medical costs that Medicare doesn't fully cover."
          },
          {
            question: "Is social security going to be around?",
            answer: "While the 'trust fund' may deplete by 2034, payroll taxes continue to cover roughly 75-80% of mandated benefits. Most planners suggest treating Social Security as a 20% 'discount' on your personal savings goals rather than a complete solution."
          },
          {
            question: "Should I pay off my mortgage before retiring?",
            answer: "Mathematically, it depends on your mortgage rate. If your rate is 3% and the market returns 7%, you are better off investing. However, the 'Psychological Return' of a paid-off home provides a low-expense floor that is invaluable during market crashes."
          },
          {
            question: "What is the 'Rule of 72'?",
            answer: "It is a shortcut to estimate how long it takes for your money to double. Divide 72 by your expected rate of return. At 7% growth, your money will double roughly every 10 years."
          },
          {
            question: "How do I protect against a market crash?",
            answer: "Diversification across asset classes (Stocks, Bonds, Real Estate, Cash) is the only 'free lunch' in finance. Additionally, maintaining a 'Cash Bucket' of 1-3 years of living expenses prevents you from selling stocks when they are down."
          }
        ]}
        relatedCalculators={[
          {
            name: "Mortgage Calculator",
            path: "/mortgage-calculator/",
            desc: "Plan your housing costs to ensure they fit within your long-term retirement budget.",
          },
          {
            name: "Savings Goal Calculator",
            path: "/savings-goal-calculator/",
            desc: "Work backward from a specific number to see what monthly contribution is required.",
          },
          {
            name: "Investment Calculator",
            path: "/investment-calculator/",
            desc: "Drill down into specific portfolio growth scenarios with varying market returns.",
          },
          {
            name: "Inflation Calculator",
            path: "/inflation-calculator/",
            desc: "See exactly how much your future lifestyle will cost in tomorrow's currency.",
          }
        ]}
      />
    </div>
  );
}
