"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import fourOhOneKSeoData from "@/data/seo-content/official/401k-calculator.json";

export default function FourOhOneKCalculator() {
  const [salary, setSalary] = useState("80000");
  const [contribution, setContribution] = useState("10");
  const [employerMatch, setEmployerMatch] = useState("50");
  const [matchLimit, setMatchLimit] = useState("6");
  const [currentBalance, setCurrentBalance] = useState("25000");
  const [age, setAge] = useState("30");
  const [retirementAge, setRetirementAge] = useState("65");
  const [annualReturn, setAnnualReturn] = useState("7");

  const [result, setResult] = useState<{
    futureValue: number;
    annualContribution: number;
    matchAmount: number;
    totalContributed: number;
  } | null>(null);

  const calculate401k = () => {
    const s = parseFloat(salary);
    const c = parseFloat(contribution) / 100;
    const match = parseFloat(employerMatch) / 100;
    const mLimit = parseFloat(matchLimit) / 100;
    const balance = parseFloat(currentBalance);
    const curAge = parseInt(age);
    const retAge = parseInt(retirementAge);
    const growth = parseFloat(annualReturn) / 100 / 12;

    if (retAge > curAge) {
      const months = (retAge - curAge) * 12;
      
      const monthlyContribution = (s * c) / 12;
      const monthlyMatch = (s * Math.min(c, mLimit) * match) / 12;
      const totalMonthly = monthlyContribution + monthlyMatch;

      let total = balance;
      for (let i = 0; i < months; i++) {
        total = total * (1 + growth) + totalMonthly;
      }

      setResult({
        futureValue: total,
        annualContribution: monthlyContribution * 12,
        matchAmount: monthlyMatch * 12,
        totalContributed: (monthlyContribution + monthlyMatch) * 12 * (retAge - curAge)
      });
    } else {
      setResult(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-gray-900 border-b pb-4">
        401k Savings Calculator
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Maximize your wealth. Calculate how your 401k contributions and employer matches grow over your career with tax-deferred compounding.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-12 xl:col-span-4 bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-inner">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Annual Salary ($):</label>
              <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 font-bold focus:ring-emerald-500 shadow-sm border" />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Your Contrib (%):</label>
                  <input type="number" value={contribution} onChange={(e) => setContribution(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm border text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Match Limit (%):</label>
                  <input type="number" value={matchLimit} onChange={(e) => setMatchLimit(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm border text-sm" />
                </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">Employer Match (% of yours):</label>
              <input type="number" value={employerMatch} onChange={(e) => setEmployerMatch(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm border text-sm" />
              <p className="text-[10px] text-gray-400 mt-1 italic">Example: 50% match means employer puts in half of what you do.</p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Current Age:</label>
                  <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm border text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Retire Age:</label>
                  <input type="number" value={retirementAge} onChange={(e) => setRetirementAge(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm border text-sm" />
                </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">Current Balance ($):</label>
              <input type="number" value={currentBalance} onChange={(e) => setCurrentBalance(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm border text-sm font-semibold" />
            </div>
          </div>

          <button
            onClick={calculate401k}
            className="mt-8 w-full bg-emerald-600 text-white font-bold py-4 rounded-xl hover:bg-emerald-700 transition shadow-lg text-lg uppercase tracking-wide"
          >
            Calculate Growth
          </button>
        </div>

        <div className="lg:col-span-12 xl:col-span-8 flex flex-col space-y-6">
          {result !== null ? (
            <>
                <div className="bg-emerald-900 text-white rounded-3xl p-10 text-center shadow-2xl relative overflow-hidden border-t-8 border-emerald-400">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
                    <span className="block text-sm font-bold text-emerald-200 uppercase mb-2 tracking-widest font-mono italic">Projected Balance at Age {retirementAge}</span>
                    <div className="text-7xl font-black mb-4 tracking-tighter">
                        ${result.futureValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </div>
                    <p className="text-emerald-100/70 text-xs font-medium">Estimated value assuming {annualReturn}% annualized market growth.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white border-2 border-emerald-50 p-6 rounded-2xl shadow-sm flex flex-col justify-center">
                        <span className="block text-[10px] font-black text-gray-400 uppercase mb-3 tracking-widest">Annual Contributions</span>
                        <div className="flex justify-between items-end mb-3 border-b border-gray-50 pb-2">
                            <span className="text-xs font-bold text-gray-600">Employee Part:</span>
                            <span className="text-2xl font-black text-gray-900">${result.annualContribution.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-end">
                            <span className="text-xs font-bold text-emerald-700">Employer Match:</span>
                            <span className="text-2xl font-black text-emerald-600">+ ${result.matchAmount.toLocaleString()}</span>
                        </div>
                    </div>

                    <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl flex flex-col justify-center shadow-inner">
                        <span className="block text-[10px] font-black text-emerald-800 uppercase mb-2 tracking-widest">Total Principal Deposits</span>
                        <div className="text-4xl font-black text-emerald-900">${result.totalContributed.toLocaleString()}</div>
                        <p className="text-[10px] text-emerald-600 mt-2 font-bold italic uppercase tracking-tighter">The rest is pure compound interest growth.</p>
                    </div>
                </div>
            </>
          ) : (
             <div className="h-full border-4 border-double border-emerald-100 rounded-3xl flex flex-col items-center justify-center p-12 text-center text-emerald-200 bg-emerald-50/20">
                <svg className="w-20 h-20 mb-4 opacity-40 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <p className="font-bold text-xl uppercase tracking-widest text-emerald-700">Free Employer Money</p>
                <p className="max-w-xs text-sm text-emerald-600/70 font-medium">Input your salary and match details to find out how much "Free Money" you are leaving on the table over your career.</p>
             </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title={fourOhOneKSeoData.title}
        whatIsIt={fourOhOneKSeoData.whatIsIt}
        formula={fourOhOneKSeoData.formula}
        example={fourOhOneKSeoData.example}
        useCases={fourOhOneKSeoData.useCases}
        faqs={fourOhOneKSeoData.faqs}
        deepDive={fourOhOneKSeoData.deepDive}
        glossary={fourOhOneKSeoData.glossary}
        relatedCalculators={[
          {
            name: "Roth IRA",
            path: "/roth-ira-calculator/",
            desc: "Compare your 401k strategy with Roth IRA growth potentials.",
          },
          {
            name: "ROI",
            path: "/roi-calculator/",
            desc: "Calculate exact annualized returns for your custom portfolio.",
          },
          {
            name: "Compound Interest",
            path: "/compound-interest-calculator/",
            desc: "See the pure power of compounding without specific account rules.",
          },
          {
            name: "Debt Payoff",
            path: "/debt-payoff-calculator/",
            desc: "Decide if you should pay off debt or invest more in your 401k.",
          },
        ]}
      />
    </div>
  );
}
