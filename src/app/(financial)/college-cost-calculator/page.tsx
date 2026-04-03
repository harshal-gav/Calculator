"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function CollegeCostCalculator() {
  const [tuitionPerYear, setTuitionPerYear] = useState("30000");
  const [roomAndBoard, setRoomAndBoard] = useState("15000");
  const [booksAndOther, setBooksAndOther] = useState("2000");
  const [durationYears, setDurationYears] = useState("4");
  const [inflationRate, setInflationRate] = useState("5");
  const [financialAid, setFinancialAid] = useState("5000");

  const [result, setResult] = useState<{
    totalCost: number;
    totalAid: number;
    netCost: number;
    yearlyBreakdown: { year: number; cost: number } [];
  } | null>(null);

  const calculate = () => {
    const tuition = parseFloat(tuitionPerYear);
    const rb = parseFloat(roomAndBoard);
    const other = parseFloat(booksAndOther);
    const years = parseInt(durationYears);
    const inflation = parseFloat(inflationRate) / 100;
    const aid = parseFloat(financialAid);

    if (!isNaN(years) && years > 0) {
      let totalCost = 0;
      const yearlyBreakdown = [];
      let currentYearlyBase = tuition + rb + other;

      for (let i = 1; i <= years; i++) {
        const yearCost = currentYearlyBase * Math.pow(1 + inflation, i - 1);
        totalCost += yearCost;
        yearlyBreakdown.push({ year: i, cost: yearCost });
      }

      const totalAid = aid * years;
      setResult({
        totalCost,
        totalAid,
        netCost: Math.max(0, totalCost - totalAid),
        yearlyBreakdown
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-2xl shadow-xl border border-violet-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-violet-50 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black text-violet-900 tracking-tight text-nowrap">College Cost Calculator</h1>
          <p className="text-violet-600 font-medium mt-1">Estimate the full multi-year cost of higher education.</p>
        </div>
        <div className="bg-violet-50 px-4 py-2 rounded-full border border-violet-100 shrink-0">
          <span className="text-violet-700 font-bold text-sm uppercase tracking-wider">Education Planning</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Annual Tuition & Fees ($)</label>
              <input type="number" value={tuitionPerYear} onChange={(e) => setTuitionPerYear(e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-violet-500 focus:ring-0 transition-all font-semibold text-slate-800" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Room & Board ($)</label>
                <input type="number" value={roomAndBoard} onChange={(e) => setRoomAndBoard(e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-700 font-bold" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Books / Misc ($)</label>
                <input type="number" value={booksAndOther} onChange={(e) => setBooksAndOther(e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-700 font-bold" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Duration (Years)</label>
                <input type="number" value={durationYears} onChange={(e) => setDurationYears(e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-700 font-bold" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Inflation Rate (%)</label>
                <input type="number" value={inflationRate} onChange={(e) => setInflationRate(e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-700 font-bold" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Annual Financial Aid/Grants ($)</label>
              <input type="number" value={financialAid} onChange={(e) => setFinancialAid(e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-violet-500 focus:ring-0 transition-all font-semibold text-slate-800" />
            </div>

            <button onClick={calculate} className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-violet-200 active:scale-[0.98]">
              Project Total Cost
            </button>
          </div>
        </div>

        <div className="lg:col-span-7">
          {result ? (
            <div className="h-full flex flex-col gap-6">
              <div className="grow bg-gradient-to-br from-violet-600 to-indigo-800 rounded-3xl p-10 text-white shadow-xl flex flex-col justify-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                <div className="text-violet-100 text-sm font-bold uppercase tracking-widest mb-2 font-mono">Estimated Net Total Cost</div>
                <div className="text-7xl font-black mb-6">
                  ${result.netCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </div>
                <div className="flex gap-4">
                    <div className="px-4 py-2 bg-white/20 rounded-xl backdrop-blur-sm">
                        <span className="block text-[10px] uppercase font-bold text-violet-100">Gross Total</span>
                        <span className="text-xl font-bold">${result.totalCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                    </div>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl overflow-hidden">
                <div className="text-slate-400 text-xs font-bold uppercase mb-4 tracking-widest text-center">Yearly Cost Progression (With Inflation)</div>
                <div className="space-y-3">
                  {result.yearlyBreakdown.map((item) => (
                    <div key={item.year} className="flex items-center justify-between text-sm font-bold">
                        <span className="text-slate-500">Year {item.year}</span>
                        <div className="h-2 bg-violet-100 rounded-full flex-grow mx-4 relative overflow-hidden">
                            <div className="absolute left-0 h-full bg-violet-400 rounded-full" style={{ width: `${(item.cost / result.yearlyBreakdown[result.yearlyBreakdown.length-1].cost) * 100}%` }}></div>
                        </div>
                        <span className="text-violet-700">${item.cost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[400px] border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center p-8 text-center bg-violet-50/5">
                <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mb-4 text-violet-600">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2 uppercase tracking-tighter">Plan For The Future</h3>
                <p className="text-slate-500 max-w-[320px] font-medium leading-relaxed">Education costs rise significantly over time. This tool accounts for inflation to give you a realistic target for your 529 plan or savings goals.</p>
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title="College Cost Calculator"
        whatIsIt={
          <p>
            A <strong>College Cost Calculator</strong> is a financial planning tool designed to estimate the total expense of a college education over a multi-year period. It factors in tuition, room and board, digital materials, and travel expenses, while adjust for the annual inflation of education costs.
          </p>
        }
        formula={
          <>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 font-mono text-lg text-indigo-700 text-center shadow-sm my-6">
              College Cost Analysis Model
            </div>
            <p className="text-sm text-slate-500 text-center">
              This tool utilize standardized mathematical formulas and logic to calculate precise College Cost results.
            </p>
          </>
        }
        example={
          <p>
            If college costs $50,000 this year and the inflation rate is 5%, the second year will cost $52,500, the third $55,125, and the fourth $57,881. Total gross cost: <strong>$215,506</strong>.
          </p>
        }
        useCases={
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Savings Targeting:</strong> Determining how much to contribute monthly to a 529 plan or Coverdell ESA.</li>
            <li><strong>College Comparison:</strong> Assessing the real cost difference between an in-state public university and an out-of-state private institution.</li>
            <li><strong>Loan Planning:</strong> Estimating the total borrowing need for the entire degree program, rather than just the first year.</li>
          </ul>
        }
        faqs={[
          {
            question: "What is the average college inflation rate?",
            answer: "Historically, college tuition has increased by 3% to 5% annually, often outpacing general consumer price inflation (CPI)."
          },
          {
            question: "Does this include 'hidden' costs?",
            answer: "You should include textbooks, daily transportation, and personal expenses in the 'Books / Misc' field for the most accurate projection."
          },
            {
              question: "How accurate is this calculator?",
              answer: "Our calculator uses industry-standard formulas to provide the most accurate results possible. However, it should be used for informational purposes only and not as a basis for formal calculations or legal advice.",
            }]}
          relatedCalculators={[
            {
              name: "Mortgage Calculator",
              path: "/mortgage-calculator/",
              desc: "Calculate your monthly mortgage payments and amortization schedule.",
            },
            {
              name: "ROI Calculator",
              path: "/roi-calculator/",
              desc: "Calculate your exact annualized percentage returns.",
            },
            {
              name: "Investment Calculator",
              path: "/investment-calculator/",
              desc: "Project your portfolio growth over time with compound interest.",
            },
            {
              name: "Loan Payment Calculator",
              path: "/loan-payment-calculator/",
              desc: "Estimate your monthly loan payments and total interest cost.",
            }
          ]}
      />
    </div>
  );
}
