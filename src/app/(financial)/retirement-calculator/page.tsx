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
    const initial = parseFloat(currentSavings);
    const monthly = parseFloat(monthlyContribution);
    const rate = parseFloat(expectedReturn) / 100 / 12;
    const infl = parseFloat(inflationRate) / 100 / 12;
    const drawRate = parseFloat(withdrawalRate) / 100;

    if (retAge > age) {
      const months = (retAge - age) * 12;
      let balance = initial;

      for (let i = 0; i < months; i++) {
        balance = balance * (1 + rate) + monthly;
      }

      // Real purchasing power (inflation adjusted)
      const inflationFactor = Math.pow(1 + (parseFloat(inflationRate) / 100), retAge - age);
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
    <div className="max-w-6xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-gray-900 border-b pb-4">
        Retirement Planner
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Calculate your nest egg. Project your wealth at retirement and determine if your current savings rate will support your future lifestyle.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-4 bg-gray-50 p-6 rounded-xl border border-gray-200">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Current Age:</label>
                  <input type="number" value={currentAge} onChange={(e) => setCurrentAge(e.target.value)} className="w-full rounded border-gray-300 p-2" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Retire Age:</label>
                  <input type="number" value={retirementAge} onChange={(e) => setRetirementAge(e.target.value)} className="w-full rounded border-gray-300 p-2" />
                </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Current Nest Egg ($):</label>
              <input type="number" value={currentSavings} onChange={(e) => setCurrentSavings(e.target.value)} className="w-full rounded border-gray-300 p-2 font-bold" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Monthly Contribution ($):</label>
              <input type="number" value={monthlyContribution} onChange={(e) => setMonthlyContribution(e.target.value)} className="w-full rounded border-gray-300 p-2 font-bold text-blue-600" />
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase">Return (%)</label>
                  <input type="number" value={expectedReturn} onChange={(e) => setExpectedReturn(e.target.value)} className="w-full rounded border-gray-300 p-2 text-sm" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase">Withdraw (%)</label>
                  <input type="number" value={withdrawalRate} onChange={(e) => setWithdrawalRate(e.target.value)} className="w-full rounded border-gray-300 p-2 text-sm" />
                </div>
            </div>
          </div>

          <button
            onClick={calculateRetirement}
            className="mt-8 w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition shadow-lg text-lg uppercase"
          >
            Project My Future
          </button>
        </div>

        <div className="lg:col-span-8 flex flex-col">
          {result !== null ? (
            <div className="h-full flex flex-col space-y-6">
                <div className="bg-white border-2 border-blue-50 p-8 rounded-3xl text-center shadow-sm">
                    <span className="block text-sm font-bold text-gray-400 uppercase mb-2 tracking-widest">Total Estimated Nest Egg</span>
                    <div className="text-7xl font-black text-gray-900 mb-2">
                        ${result.totalAtRetirement.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </div>
                    <div className="inline-block bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-tighter">
                        In {result.yearsToSave} Years
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-green-50 border border-green-100 p-6 rounded-2xl">
                        <span className="block text-xs font-bold text-green-700 uppercase mb-1">Monthly Drawdown</span>
                        <div className="text-3xl font-black text-green-900">${result.monthlyIncome.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                        <p className="text-[10px] text-green-600 font-medium">Sustainable monthly income from dividends/growth.</p>
                    </div>
                    <div className="bg-amber-50 border border-amber-100 p-6 rounded-2xl">
                        <span className="block text-xs font-bold text-amber-700 uppercase mb-1">Today's Purchasing Power</span>
                        <div className="text-3xl font-black text-amber-900">${result.purchasingPower.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                        <p className="text-[10px] text-amber-600 font-medium">What your nest egg is worth in today's dollars (3% infl).</p>
                    </div>
                </div>
                
                <div className="bg-gray-900 text-white p-6 rounded-2xl flex-grow flex items-center">
                    <p className="text-sm leading-relaxed text-gray-300">
                        At a <span className="text-blue-400 font-bold">{withdrawalRate}% Safe Withdrawal Rate</span>, you can likely spend 
                        <span className="text-white font-bold"> ${result.monthlyIncome.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span> every month without depleting your principal, adjusted for market fluctuations.
                    </p>
                </div>
            </div>
          ) : (
             <div className="h-full border-4 border-dashed border-gray-100 rounded-3xl flex flex-col items-center justify-center p-12 text-center">
                <div className="text-6xl mb-6 opacity-20 text-blue-500">📈</div>
                <h3 className="text-xl font-black text-gray-800 uppercase tracking-widest mb-2">Start Your Journey</h3>
                <p className="text-gray-400 max-w-sm mx-auto">Input your current age and savings rate to see the power of compound interest over your career.</p>
             </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title="Retirement Calculator"
        whatIsIt={
          <>
            <p>
              The <strong>Retirement Calculator</strong> uses longitudinal compounding formulas to simulate how your wealth grows over time. It accounts for your current principal, regular contributions, and market growth to estimate your final net worth at retirement.
            </p>
          </>
        }
        formula={<></>}
        example={
          <>
            <p>If you start with $50,000 at age 30 and contribute $1,000 per month at 7% interest:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
              <li>By age 65, you would have approximately <strong>$2.1 Million</strong>.</li>
              <li>Applying the 4% rule, this would provide <strong>$7,000 per month</strong> in income.</li>
            </ul>
          </>
        }
        useCases={<ul className="list-disc pl-6 space-y-4"><li><strong>Early Retirement Planning:</strong> Use this tool to see how much more you need to save to retire at 50 instead of 65.</li></ul>}
        faqs={[]}
        relatedCalculators={[]}
      />
    </div>
  );
}
