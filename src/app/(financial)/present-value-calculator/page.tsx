"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function PresentValueCalculator() {
  const [futureValue, setFutureValue] = useState("10000");
  const [interestRate, setInterestRate] = useState("5");
  const [years, setYears] = useState("10");
  const [autoFormat, setAutoFormat] = useState(true);

  const [result, setResult] = useState<{
    pv: number;
    discountedAmount: number;
  } | null>(null);

  const calculatePV = () => {
    const fv = parseFloat(futureValue) || 0;
    const r = (parseFloat(interestRate) || 0) / 100;
    const n = parseFloat(years) || 0;

    if (n > 0 || n < 0) {
      // Time can theoretically be negative for projection mechanics, but standard is positive
      // PV = FV / (1 + r)^n
      const pv = fv / Math.pow(1 + r, n);
      const discounted = fv - pv;

      setResult({
        pv,
        discountedAmount: discounted,
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-2xl shadow-xl border border-indigo-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-indigo-50 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black text-indigo-900 tracking-tight text-nowrap">Present Value Calculator</h1>
          <p className="text-indigo-600 font-medium mt-1">Calculate the current worth of a future sum of money.</p>
        </div>
        <div className="bg-indigo-50 px-4 py-2 rounded-full border border-indigo-100 shrink-0">
          <span className="text-indigo-700 font-bold text-sm uppercase tracking-wider">Time Value Calculation</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-12 xl:col-span-5 space-y-4">
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Target Future Value ($)</label>
              <input type="number" value={futureValue} onChange={(e) => setFutureValue(e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-2 focus:border-indigo-500 focus:ring-0 transition-all font-semibold text-slate-800" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Interest Rate (%)</label>
                <input type="number" step="0.1" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-700 font-bold" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Periods (Years)</label>
                <input type="number" value={years} onChange={(e) => setYears(e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-700 font-bold" />
              </div>
            </div>

            <button onClick={calculatePV} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-indigo-200 active:scale-[0.98]">
              Solve for PV
            </button>
          </div>
        </div>

        <div className="lg:col-span-12 xl:col-span-7">
          {result ? (
            <div className="h-full flex flex-col gap-6">
              <div className="grow bg-gradient-to-br from-indigo-600 to-slate-800 rounded-3xl p-10 text-white shadow-xl flex flex-col justify-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                <div className="text-indigo-100 text-sm font-bold uppercase tracking-widest mb-2 font-mono">Required Lump Sum (PV)</div>
                <div className="text-8xl font-black mb-6">
                  ${result.pv.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </div>
                <div className="inline-flex items-center px-4 py-2 rounded-xl bg-white/20 text-white text-base font-bold backdrop-blur-sm self-start">
                   Total Discount: ${result.discountedAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl">
                  <div className="text-slate-400 text-xs font-bold uppercase mb-1">FV Target</div>
                  <div className="text-xl font-black text-indigo-600">${parseFloat(futureValue).toLocaleString()}</div>
                </div>
                <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl text-nowrap">
                  <div className="text-slate-400 text-xs font-bold uppercase mb-1">Buying Power (PV/FV)</div>
                  <div className="text-xl font-black text-slate-800">{((result.pv / parseFloat(futureValue)) * 100).toFixed(1)}%</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[400px] border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center p-8 text-center bg-indigo-50/5">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4 text-indigo-600">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2 uppercase tracking-tighter">Value Analysis</h3>
                <p className="text-slate-500 max-w-[320px] font-medium leading-relaxed">Reverse compound interest to find what a future amount is worth in today's dollars. Essential for determining how much to invest now to hit a specific future goal.</p>
            </div>
          )}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Present Value Calculator",
            operatingSystem: "All",
            applicationCategory: "FinanceApplication",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

      <CalculatorSEO
        title="Present Value Calculator"
        whatIsIt={
          <>
            <p>
              Our <strong>Present Value (PV) Calculator</strong> is a
              foundational tool in finance used to determine the exact current
              worth of a future sum of money. Because of inflation and the
              potential to earn interest, a dollar today is always inherently
              worth more than a dollar tomorrow. This concept is called the
              "Time Value of Money."
            </p>
            <p>
              This calculator allows you to work backwards. By inputting your
              future financial goal, your expected time frame, and a realistic
              interest rate (discount rate), it calculates the exact lump sum of
              cash you need to deposit <em>right now</em> to mathematically
              guarantee you hit that goal.
            </p>

            <p className="mt-4 text-sm text-gray-500">
              <strong>Related Terms:</strong> Present Value Calculator
            </p>
          </>
        }
        formula={
          <>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 font-mono text-lg text-indigo-700 text-center shadow-sm my-6">
              Present Value Analysis Model
            </div>
            <p className="text-sm text-slate-500 text-center">
              This tool utilize standardized mathematical formulas and logic to calculate precise Present Value results.
            </p>
          </>
        }
        example={
          <>
            <p>
              Let's assume you want to have exactly <strong>$100,000</strong>{" "}
              saved for your child's college tuition in exactly{" "}
              <strong>18 years</strong>. You can safely invest money into an
              index fund that reliably returns <strong>7% annually</strong>.
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
              <li>
                <strong>Step 1 (Variables):</strong> FV = 100,000. r = 0.07. n =
                18.
              </li>
              <li>
                <strong>Step 2 (The Math):</strong> PV = 100,000 ÷ (1 + 0.07)
                <sup>18</sup>
              </li>
              <li>
                <strong>Step 3 (The Exponent):</strong> 1.07<sup>18</sup> =
                3.3799
              </li>
              <li>
                <strong>Step 4 (Divide):</strong> 100,000 ÷ 3.3799 ={" "}
                <strong>29,586.67</strong>.
              </li>
              <li>
                <strong>Result:</strong> Assuming a 7% return, if you invest
                just <strong>$29,586.67</strong> the day your child is born, it
                will naturally compound into $100,000 by their 18th birthday.
              </li>
            </ul>
          </>
        }
        useCases={
          <ul className="list-disc pl-6 space-y-4 text-gray-700">
            <li>
              <strong>Retirement Benchmarking:</strong> Working backwards from a
              goal of $2,000,000 to figure out exactly what your current
              brokerage account balance needs to be right now so that you don't
              have to save another dime.
            </li>
            <li>
              <strong>Evaluating Lottery Winnings:</strong> Deciding
              mathematically whether to take a $500,000 lump sum today, or an
              annuity that pays out $1,000,000 spread over 30 years. (Hint:
              Depending on the discount rate, the lump sum is almost always
              better).
            </li>
            <li>
              <strong>Business Acquisitions:</strong> Corporations use Present
              Value to determine exactly how much cash to offer to buyout a
              competitor today, based on the competitor's projected future cash
              flows.
            </li>
          </ul>
        }
        faqs={[
          {
            question: "What is a 'Discount Rate'?",
            answer:
              "In Present Value calculations, the 'Discount Rate' is functionally identical to an interest rate or return rate. It is the percentage rate used to discount the future cash flow back to its current value. Higher risk investments demand a higher discount rate.",
          },
          {
            question:
              "Why is taking money today better than taking the same amount tomorrow?",
            answer:
              "This is the core of the 'Time Value of Money'. If someone hands you $100 today, you can instantly put it in a 5% Savings Account. In one year, you have $105. If you let them wait a year to hand you that $100, you have permanently lost the opportunity to earn that $5.",
          },
          {
            question: "How does inflation affect Present Value?",
            answer:
              "Inflation actively decreases the purchasing power of money over time. If you use the expected inflation rate (e.g., 3%) as your Discount Rate, the Present Value calculator will show you exactly how much your future money is worth in today's purchasing power.",
          },
        ]}
        relatedCalculators={[
          {
            name: "Investment Calculator",
            path: "/investment-calculator/",
            desc: "A broader tool for projecting overall stock portfolio growth.",
          },
          {
            name: "Compound Interest Calculator",
            path: "/compound-interest-calculator/",
            desc: "Project future investment growth using recursive compound interest.",
          },
          {
            name: "ROI Calculator",
            path: "/roi-calculator/",
            desc: "Calculate your exact annualized percentage returns on recent sales.",
          },
            {
              name: "Mortgage Calculator",
              path: "/mortgage-calculator/",
              desc: "Calculate your monthly mortgage payments and amortization schedule.",
            }]}
      />
    </div>
  );
}
