"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function LoanComparisonCalculator() {
  const [loanAmount, setLoanAmount] = useState("30000");

  const [loan1, setLoan1] = useState({ rate: "7.0", term: "60" });
  const [loan2, setLoan2] = useState({ rate: "5.5", term: "48" });

  const calculatePayment = (amount: number, rate: number, termMonths: number) => {
    const r = rate / 100 / 12;
    if (r === 0) return amount / termMonths;
    return (amount * r * Math.pow(1 + r, termMonths)) / (Math.pow(1 + r, termMonths) - 1);
  };

  const amount = parseFloat(loanAmount) || 0;
  const p1 = calculatePayment(amount, parseFloat(loan1.rate) || 0, parseFloat(loan1.term) || 0);
  const p2 = calculatePayment(amount, parseFloat(loan2.rate) || 0, parseFloat(loan2.term) || 0);

  const total1 = p1 * (parseFloat(loan1.term) || 0);
  const total2 = p2 * (parseFloat(loan2.term) || 0);

  const interest1 = total1 - amount;
  const interest2 = total2 - amount;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 bg-slate-50 rounded-2xl shadow-xl border border-slate-200">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-black mb-4 text-slate-900 tracking-tight">
          Loan Comparison Calculator
        </h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Compare two different loan offers side-by-side to see which one saves you the most money in the long run.
        </p>
      </div>

      <div className="mb-10 max-w-md mx-auto">
        <label className="block text-center text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">
          Loan Amount to Compare
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xl">$</span>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            className="w-full rounded-2xl border-slate-300 p-5 pl-10 shadow-lg focus:border-indigo-500 font-bold text-2xl text-slate-800 text-center transition-all bg-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Loan 1 */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-indigo-500"></div>
          <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
            <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mr-3 text-sm">A</span>
            Loan Option One
          </h2>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase">Interest Rate (%)</label>
              <input
                type="number"
                step="0.1"
                value={loan1.rate}
                onChange={(e) => setLoan1({ ...loan1, rate: e.target.value })}
                className="w-full rounded-xl border-slate-200 p-4 font-bold text-lg text-slate-700 bg-slate-50 focus:bg-white transition-colors"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase">Term (Months)</label>
              <input
                type="number"
                value={loan1.term}
                onChange={(e) => setLoan1({ ...loan1, term: e.target.value })}
                className="w-full rounded-xl border-slate-200 p-4 font-bold text-lg text-slate-700 bg-slate-50 focus:bg-white transition-colors"
              />
            </div>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 text-white space-y-4">
             <div className="text-center pb-4 border-b border-white/10">
                <div className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Monthly Payment</div>
                <div className="text-4xl font-black">${p1.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
             </div>
             <div className="flex justify-between text-sm">
                <span className="text-slate-400">Total Interest:</span>
                <span className="font-bold text-rose-400">${interest1.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
             </div>
             <div className="flex justify-between text-sm">
                <span className="text-slate-400">Total Cost:</span>
                <span className="font-bold">${total1.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
             </div>
          </div>
        </div>

        {/* Loan 2 */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500"></div>
          <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
            <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mr-3 text-sm">B</span>
            Loan Option Two
          </h2>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase">Interest Rate (%)</label>
              <input
                type="number"
                step="0.1"
                value={loan2.rate}
                onChange={(e) => setLoan2({ ...loan2, rate: e.target.value })}
                className="w-full rounded-xl border-slate-200 p-4 font-bold text-lg text-slate-700 bg-slate-50 focus:bg-white transition-colors"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase">Term (Months)</label>
              <input
                type="number"
                value={loan2.term}
                onChange={(e) => setLoan2({ ...loan2, term: e.target.value })}
                className="w-full rounded-xl border-slate-200 p-4 font-bold text-lg text-slate-700 bg-slate-50 focus:bg-white transition-colors"
              />
            </div>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 text-white space-y-4">
             <div className="text-center pb-4 border-b border-white/10">
                <div className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Monthly Payment</div>
                <div className="text-4xl font-black">${p2.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
             </div>
             <div className="flex justify-between text-sm">
                <span className="text-slate-400">Total Interest:</span>
                <span className="font-bold text-rose-400">${interest2.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
             </div>
             <div className="flex justify-between text-sm">
                <span className="text-slate-400">Total Cost:</span>
                <span className="font-bold">${total2.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
             </div>
          </div>
        </div>
      </div>

      {/* Comparison Summary */}
      <div className="bg-indigo-50 border border-indigo-100 rounded-3xl p-8 mb-12">
        <h3 className="text-2xl font-black text-indigo-900 mb-6 text-center">The Bottom Line</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="text-center">
              <div className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-2">Difference in Monthly Payment</div>
              <div className="text-3xl font-black text-indigo-700">
                ${Math.abs(p1 - p2).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className="text-sm text-indigo-500 mt-1">
                {p1 > p2 ? "Option B is cheaper per month" : "Option A is cheaper per month"}
              </div>
           </div>
           <div className="text-center">
              <div className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-2">Difference in Total Cost</div>
              <div className="text-3xl font-black text-emerald-600">
                ${Math.abs(total1 - total2).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className="text-sm text-indigo-500 mt-1">
                {total1 > total2 ? "Option B saves you more over the life of the loan" : "Option A saves you more over the life of the loan"}
              </div>
           </div>
        </div>
      </div>

      <CalculatorSEO
        title="Loan Comparison Calculator"
        whatIsIt={
          <>
            <p>
              A <strong>Loan Comparison Calculator</strong> is a tool designed to help you analyze two different loan options simultaneously. It reveals the trade-offs between a lower monthly payment and a lower total interest cost, which often occurs when comparing loans with different terms or interest rates.
            </p>
            <p>
              By looking at both the monthly commitment and the long-term cost, you can make a more informed decision about which loan fits your immediate budget and your long-term wealth goals.
            </p>
          </>
        }
        formula={
          <>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 font-mono text-lg text-indigo-700 text-center shadow-sm my-6">
              M = P [ r(1 + r)^n ] / [ (1 + r)^n – 1 ]
            </div>
            <p className="text-sm text-slate-500 text-center">
              Standard financial analysis and amortization model for precise Loan Comparison results.
            </p>
          </>
        }
        example={
          <>
            <p>Imagine you are borrowing <strong>$20,000</strong> and have two choices:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-slate-700 text-sm">
              <li><strong>Option A:</strong> 5.0% interest for 3 years (36 months). Monthly payment is $600. Total interest is $1,600.</li>
              <li><strong>Option B:</strong> 7.0% interest for 5 years (60 months). Monthly payment is only $396. However, total interest jumps to $3,761.</li>
              <li><strong>The Lesson:</strong> While Option B feels "easier" on your monthly budget (saving you $204/mo), it actually costs you <strong>over $2,100 more</strong> in pure interest over the life of the loan.</li>
            </ul>
          </>
        }
        useCases={
          <ul className="list-disc pl-6 space-y-4 text-slate-700 text-sm">
            <li><strong>Dealer vs Bank Finance:</strong> Compare the dealer's 0% APR offer (which might come with a higher purchase price) against a bank's 5% APR with a cash rebate.</li>
            <li><strong>Choosing Loan Terms:</strong> Deciding between a 48-month or 60-month auto loan.</li>
            <li><strong>Mortgage Refinancing:</strong> Compare your current mortgage payment and remaining interest against a new loan with a lower rate but a reset term.</li>
          </ul>
        }
        faqs={[
          {
            question: "Is the lowest interest rate always the best?",
            answer: "Usually, yes. However, if the lower interest rate comes with a much longer loan term, you may still end up paying more in total interest than a loan with a higher rate and a shorter term."
          },
          {
            question: "Should I focus on the monthly payment or total cost?",
            answer: "A healthy financial plan balances both. You must ensure the monthly payment is comfortably within your budget, but you should also strive for the lowest total cost to maximize your long-term savings."
          },
            {
              question: "How accurate is this calculator?",
              answer: "Our calculator uses industry-standard formulas to provide the most accurate results possible. However, it should be used for informational purposes only and not as a basis for formal calculations or legal advice.",
            }]}
        relatedCalculators={[
          { name: "EMI Calculator", path: "/emi-calculator/", desc: "Calculate single loan installments." },
          { name: "Payment Calculator", path: "/payment-calculator/", desc: "Basic monthly payment estimator." },
          { name: "Interest Rate Calculator", path: "/interest-rate-calculator/", desc: "Discover the interest rate hiding in your loan offer." },
            {
              name: "Mortgage Calculator",
              path: "/mortgage-calculator/",
              desc: "Calculate your monthly mortgage payments and amortization schedule.",
            }]}
      />
    </div>
  );
}
