"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function RMDCalculator() {
  const [age, setAge] = useState("73");
  const [balance, setBalance] = useState("500000");

  const [result, setResult] = useState<{
    rmdAmount: number;
    divisor: number;
    percentage: number;
  } | null>(null);

  // IRS Uniform Lifetime Table (Simplified / Representative)
  const getDivisor = (ageNum: number) => {
    const table: Record<number, number> = {
      72: 27.4, 73: 26.5, 74: 25.5, 75: 24.6, 76: 23.7, 77: 22.9, 78: 22.0, 79: 21.1, 80: 20.2,
      81: 19.4, 82: 18.5, 83: 17.7, 84: 16.8, 85: 16.0, 86: 15.2, 87: 14.4, 88: 13.7, 89: 12.9, 90: 12.2,
      91: 11.5, 92: 10.8, 93: 10.1, 94: 9.5, 95: 8.9, 96: 8.4, 97: 7.8, 98: 7.3, 99: 6.8, 100: 6.4,
      101: 6.0, 102: 5.6, 103: 5.2, 104: 4.9, 105: 4.6, 110: 3.5, 115: 2.9, 120: 2.0
    };

    if (ageNum < 72) return 0;
    if (table[ageNum]) return table[ageNum];
    
    // Fallback/Linear interpolation if not exact
    if (ageNum > 120) return 2.0;
    
    // Just find the nearest lower key
    const keys = Object.keys(table).map(Number).sort((a, b) => a - b);
    let lastKey = 72;
    for (const key of keys) {
      if (key > ageNum) break;
      lastKey = key;
    }
    return table[lastKey];
  };

  const calculateRMD = () => {
    const ageNum = parseInt(age);
    const balanceNum = parseFloat(balance);

    if (!isNaN(ageNum) && !isNaN(balanceNum) && balanceNum >= 0) {
      if (ageNum < 72) {
        setResult(null);
        return;
      }
      
      const divisor = getDivisor(ageNum);
      const rmd = balanceNum / divisor;
      const pct = (1 / divisor) * 100;

      setResult({
        rmdAmount: rmd,
        divisor,
        percentage: pct
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-2xl shadow-xl border border-indigo-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-indigo-50 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black text-indigo-900 tracking-tight text-nowrap">RMD Calculator</h1>
          <p className="text-indigo-600 font-medium mt-1">Determine your Required Minimum Distribution for the year.</p>
        </div>
        <div className="bg-indigo-50 px-4 py-2 rounded-full border border-indigo-100">
          <span className="text-indigo-700 font-bold text-sm uppercase tracking-wider text-nowrap">IRS Compliance</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-12">
           <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-amber-800 text-sm mb-8 flex items-start gap-3">
              <svg className="w-5 h-5 grow-0 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>Under SECURE Act 2.0, the RMD age is 73 for those who reach age 72 after Dec 31, 2022. This calculator uses the latest IRS life expectancy tables.</p>
           </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Your Age (at end of current year)</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-indigo-500 focus:ring-0 transition-all font-semibold text-slate-800"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Account Balance (as of Dec 31 last year)</label>
              <input
                type="number"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
                className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-indigo-500 focus:ring-0 transition-all font-semibold text-slate-800"
              />
              <p className="text-xs text-slate-400 mt-2">Sum of your traditional IRAs, 401(k)s, and 403(b)s.</p>
            </div>

            <button
              onClick={calculateRMD}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-indigo-200 active:scale-[0.98]"
            >
              Calculate RMD
            </button>
          </div>
        </div>

        <div className="lg:col-span-7">
          {result ? (
            <div className="h-full flex flex-col gap-6">
              <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-3xl p-8 text-white shadow-xl flex flex-col justify-center grow">
                <div className="text-indigo-100 text-sm font-bold uppercase tracking-widest mb-2 font-mono">2024 Required Distribution</div>
                <div className="text-6xl font-black mb-4">
                  ${result.rmdAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </div>
                <div className="text-indigo-100/80 text-sm leading-relaxed max-w-md">
                   The IRS requires you to withdraw at least this amount by Dec 31 to avoid heavy penalties.
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl">
                  <div className="text-slate-500 text-xs font-bold uppercase mb-1">IRS Divisor</div>
                  <div className="text-2xl font-black text-slate-800">{result.divisor}</div>
                </div>
                <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl">
                  <div className="text-slate-500 text-xs font-bold uppercase mb-1">% of Portfolio</div>
                  <div className="text-2xl font-black text-slate-800">{result.percentage.toFixed(2)}%</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[350px] border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center p-8 text-center bg-slate-50/50">
               {parseInt(age) < 73 && parseInt(age) > 0 ? (
                  <div className="text-indigo-800 font-medium">
                     <p className="mb-2">You haven't reached RMD age yet!</p>
                     <p className="text-sm text-slate-400">RMDs typically start at age 73 for those born in 1951 or later.</p>
                  </div>
               ) : (
                  <>
                    <h3 className="text-xl font-bold text-slate-800 mb-2 italic">Waiting for Input</h3>
                    <p className="text-slate-500 max-w-[280px]">Enter your age and balance to see your mandatory withdrawal.</p>
                  </>
               )}
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title="RMD Calculator"
        whatIsIt={
          <p>
            An <strong>RMD (Required Minimum Distribution) Calculator</strong> calculates the minimum amount the IRS requires you to withdraw from your retirement accounts each year. This rule applies to Traditional IRAs, 401(k)s, 403(b)s, and other tax-deferred accounts once you reach the threshold age.
          </p>
        }
        formula={
          <div className="space-y-4">
            <p>The formula for calculating an RMD is simple:</p>
            <div className="bg-slate-50 p-4 rounded-xl font-mono text-sm">
              RMD = Account Balance (dec 31) / Life Expectancy Factor
            </div>
            <p>The "Life Expectancy Factor" is provided by the IRS in the <strong>Uniform Lifetime Table</strong>, which is updated periodically.</p>
          </div>
        }
        example={
          <p>
            If you are 75 years old and had $500,000 in your IRA on December 31st of last year, the IRS divisor for your age is 24.6. Your RMD would be $500,000 ÷ 24.6 = <strong>$20,325.20</strong>.
          </p>
        }
        useCases={
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Avoiding Penalties:</strong> Failure to take an RMD can result in a penalty of up to 25% of the amount not withdrawn.</li>
            <li><strong>Tax Planning:</strong> Planning your income streams for the year to manage your tax bracket.</li>
            <li><strong>Cash Flow Management:</strong> Anticipating how much cash you will have available for spending.</li>
          </ul>
        }
        faqs={[
          {
            question: "When do RMDs start?",
            answer: "Under current law (SECURE 2.0), RMDs start at age 73 for those who reach age 72 after 2022. The age will increase to 75 in 2033."
          },
          {
            question: "Can I withdraw more than the RMD?",
            answer: "Yes, you can always withdraw more than the minimum. The RMD is simply the floor, not the ceiling. However, you will pay income tax on the total amount withdrawn."
          }
        ]}
      />
    </div>
  );
}
