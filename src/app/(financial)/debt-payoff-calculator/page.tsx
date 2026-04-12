"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import debtSeoData from "@/data/seo-content/official/debt-payoff-calculator.json";

export default function DebtPayoffCalculator() {
  const [balance, setBalance] = useState("5000");
  const [interestRate, setInterestRate] = useState("18.9");
  const [monthlyPayment, setMonthlyPayment] = useState("200");

  const [result, setResult] = useState<{
    months: number;
    totalInterest: number;
    totalPayment: number;
  } | null>(null);

  const calculate = () => {
    const p = parseFloat(balance);
    const r = parseFloat(interestRate) / 100 / 12;
    const m = parseFloat(monthlyPayment);

    if (isNaN(p) || isNaN(r) || isNaN(m) || m <= p * r) {
      setResult(null);
      return;
    }

    // Formula: n = -log(1 - (r*p)/m) / log(1 + r)
    const n = -Math.log(1 - (r * p) / m) / Math.log(1 + r);
    const totalPayment = n * m;
    const totalInterest = totalPayment - p;

    setResult({
      months: Math.ceil(n),
      totalInterest,
      totalPayment,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-slate-900 flex items-center justify-center font-serif">
          <span className="mr-3">💳</span> Debt Payoff Calculator
        </h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Take control of your financial future. Calculate exactly how long it
          will take to pay off your credit card or loan and how much interest
          you can save.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-zinc-200">
          <h2 className="text-xl font-bold border-b-2 border-indigo-500 pb-2 inline-block text-slate-800 mb-6 w-full uppercase tracking-tighter">
            Debt Details
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-zinc-500 mb-1 uppercase tracking-widest">
                Current Balance ($)
              </label>
              <input
                type="number"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
                className="w-full rounded-xl border-zinc-300 shadow-sm p-3 border focus:border-indigo-500 font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-500 mb-1 uppercase tracking-widest">
                Interest Rate (APR %)
              </label>
              <input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="w-full rounded-xl border-zinc-300 shadow-sm p-3 border focus:border-indigo-500 font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-500 mb-1 uppercase tracking-widest">
                Monthly Payment ($)
              </label>
              <input
                type="number"
                value={monthlyPayment}
                onChange={(e) => setMonthlyPayment(e.target.value)}
                className="w-full rounded-xl border-zinc-300 shadow-sm p-3 border focus:border-indigo-500 font-bold"
                onKeyDown={(e) => e.key === "Enter" && calculate()}
              />
              {monthlyPayment &&
                balance &&
                interestRate &&
                parseFloat(monthlyPayment) <=
                  (parseFloat(balance) * parseFloat(interestRate)) / 100 / 12 && (
                  <p className="mt-2 text-rose-600 text-sm font-bold">
                    ⚠️ Warning: Payment is too low to cover monthly interest.
                    Debt will grow!
                  </p>
                )}
            </div>
          </div>
          <button
            onClick={calculate}
            className="mt-8 w-full bg-slate-900 hover:bg-black text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-black/20 uppercase tracking-widest"
          >
            Analyze Repayment
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {result ? (
            <div className="bg-indigo-600 rounded-2xl p-8 md:p-10 text-white shadow-xl flex flex-col items-center justify-center text-center grow h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
              <span className="text-indigo-100 text-xs font-bold uppercase tracking-widest mb-4">
                Months to Payoff
              </span>
              <div className="text-8xl font-black mb-2 flex items-baseline">
                {result.months}
              </div>
              <div className="text-xl font-bold text-indigo-100 uppercase tracking-widest mb-8">
                Estimated Months
              </div>
              <div className="w-full space-y-3 bg-indigo-700/50 p-6 rounded-2xl border border-white/10">
                <div className="flex justify-between text-sm">
                  <span className="text-indigo-200">Total Interest:</span>
                  <span className="font-bold">
                    ${result.totalInterest.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-base pt-2 border-t border-white/10">
                  <span className="text-indigo-100 font-bold">
                    Total Payment:
                  </span>
                  <span className="font-black text-white">
                    ${result.totalPayment.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-8 border-2 border-dashed border-zinc-200 text-center flex flex-col items-center justify-center text-zinc-400 grow h-full">
              <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mb-4 text-zinc-300">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="font-medium text-lg leading-relaxed max-w-xs">
                Enter your current debt details to visualize your path to zero
              </p>
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title={debtSeoData.title}
        whatIsIt={debtSeoData.whatIsIt}
        formula={debtSeoData.formula}
        example={debtSeoData.example}
        useCases={debtSeoData.useCases}
        faqs={debtSeoData.faqs}
        deepDive={debtSeoData.deepDive}
        glossary={debtSeoData.glossary}
        relatedCalculators={[
          {
            name: "Mortgage",
            path: "/mortgage-calculator/",
            desc: "Calculate your monthly mortgage payments and amortization schedule.",
          },
          {
            name: "ROI",
            path: "/roi-calculator/",
            desc: "Calculate your exact annualized percentage returns.",
          },
          {
            name: "Investment",
            path: "/investment-calculator/",
            desc: "Project your portfolio growth over time with compound interest.",
          },
          {
            name: "Loan Payment",
            path: "/loan-payment-calculator/",
            desc: "Estimate your monthly loan payments and total interest cost.",
          },
        ]}
      />
    </div>
  );
}
