"use client";

import { useState, useEffect } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function LoanPayoffCalculator() {
  const [balance, setBalance] = useState("25000");
  const [interestRate, setInterestRate] = useState("8.5");
  const [monthlyPayment, setMonthlyPayment] = useState("600");
  const [extraPayment, setExtraPayment] = useState("100");

  const [result, setResult] = useState<{
    originalMonths: number;
    newMonths: number;
    monthsSaved: number;
    originalInterest: number;
    newInterest: number;
    interestSaved: number;
    isValid: boolean;
    message: string;
  } | null>(null);

  useEffect(() => {
    calculatePayoff();
  }, [balance, interestRate, monthlyPayment, extraPayment]);

  const calculatePayoff = () => {
    const P = parseFloat(balance);
    const r = parseFloat(interestRate) / 100 / 12;
    const M1 = parseFloat(monthlyPayment);
    const M2 = M1 + (parseFloat(extraPayment) || 0);

    if (P <= 0 || r < 0 || M1 <= 0) {
      setResult(null);
      return;
    }

    if (M1 <= P * r) {
      setResult({
        originalMonths: 0,
        newMonths: 0,
        monthsSaved: 0,
        originalInterest: 0,
        newInterest: 0,
        interestSaved: 0,
        isValid: false,
        message: "Monthly payment must be greater than interest charged ($" + (P * r).toFixed(2) + ")."
      });
      return;
    }

    // n = -log(1 - Pr/M) / log(1 + r)
    const n1 = -Math.log(1 - (P * r) / M1) / Math.log(1 + r);
    const n2 = -Math.log(1 - (P * r) / M2) / Math.log(1 + r);

    const int1 = (M1 * n1) - P;
    const int2 = (M2 * n2) - P;

    setResult({
      originalMonths: Math.ceil(n1),
      newMonths: Math.ceil(n2),
      monthsSaved: Math.ceil(n1) - Math.ceil(n2),
      originalInterest: int1,
      newInterest: int2,
      interestSaved: Math.max(0, int1 - int2),
      isValid: true,
      message: ""
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-black mb-4 text-zinc-900 tracking-tight flex items-center justify-center">
          <span className="mr-3">🚀</span> Loan Payoff Calculator
        </h1>
        <p className="text-zinc-600 text-lg max-w-2xl mx-auto">
          See exactly how much time and money you save by adding extra payments to your loan.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* Inputs */}
        <div className="lg:col-span-5 space-y-6 bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
          <div>
            <label className="block text-xs font-bold text-zinc-500 mb-2 uppercase tracking-widest">Remaining Balance</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 font-bold">$</span>
              <input
                type="number"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
                className="w-full rounded-xl border-zinc-300 p-4 pl-10 shadow-sm focus:border-blue-500 font-bold text-xl"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
             <div>
               <label className="block text-xs font-bold text-zinc-500 mb-2 uppercase tracking-widest">Interest (%)</label>
               <input
                 type="number"
                 step="0.1"
                 value={interestRate}
                 onChange={(e) => setInterestRate(e.target.value)}
                 className="w-full rounded-xl border-zinc-300 p-4 shadow-sm focus:border-blue-500 font-bold text-xl"
               />
             </div>
             <div>
               <label className="block text-xs font-bold text-zinc-500 mb-2 uppercase tracking-widest">Current Payment</label>
               <input
                 type="number"
                 value={monthlyPayment}
                 onChange={(e) => setMonthlyPayment(e.target.value)}
                 className="w-full rounded-xl border-zinc-300 p-4 shadow-sm focus:border-blue-500 font-bold text-xl"
               />
             </div>
          </div>

          <div className="pt-6 border-t border-zinc-100">
            <label className="block text-xs font-black text-blue-600 mb-2 uppercase tracking-widest">Add Extra Monthly Payment</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 font-bold">$</span>
              <input
                type="number"
                value={extraPayment}
                onChange={(e) => setExtraPayment(e.target.value)}
                className="w-full rounded-xl border-blue-200 p-4 pl-10 shadow-md focus:border-blue-500 focus:ring-2 focus:ring-blue-100 font-black text-2xl text-blue-900 bg-blue-50/30"
              />
            </div>
            <p className="text-[10px] text-blue-500 mt-2 font-bold italic">Paying even $50 extra can save thousands in interest.</p>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-7">
          {result && result.isValid ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
               <div className="bg-white p-8 rounded-2xl border border-zinc-200 shadow-sm flex flex-col items-center justify-center text-center">
                  <div className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest mb-2 font-mono">Time Saved</div>
                  <div className="text-5xl font-black text-blue-600 mb-2">{result.monthsSaved}</div>
                  <div className="text-zinc-800 font-bold uppercase tracking-widest text-xs">Months Early</div>
                  <p className="text-zinc-400 text-[10px] mt-4">New Payoff: {Math.floor(result.newMonths / 12)}y {result.newMonths % 12}m</p>
               </div>

               <div className="bg-emerald-600 p-8 rounded-2xl shadow-xl flex flex-col items-center justify-center text-center text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full mix-blend-overlay filter blur-[50px] opacity-20"></div>
                  <div className="text-emerald-200 text-[10px] font-bold uppercase tracking-widest mb-2 font-mono">Interest Saved</div>
                  <div className="text-5xl font-black mb-2">${result.interestSaved.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                  <div className="text-emerald-100 font-bold uppercase tracking-widest text-xs">Kept in your pocket</div>
                  <div className="text-emerald-100/50 text-[10px] mt-4 font-mono uppercase tracking-[0.2em]">Guaranteed ROI</div>
               </div>

               <div className="md:col-span-2 bg-zinc-900 rounded-2xl p-6 text-zinc-300">
                  <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-widest text-center border-b border-white/10 pb-4">Detailed Breakdown</h4>
                  <div className="grid grid-cols-2 gap-8 px-4">
                     <div className="space-y-4">
                        <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Current Strategy</div>
                        <div className="flex justify-between text-sm"><span>Payoff:</span> <span className="text-white font-bold">{result.originalMonths} months</span></div>
                        <div className="flex justify-between text-sm"><span>Interest:</span> <span className="text-rose-400 font-bold">${result.originalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></div>
                     </div>
                     <div className="space-y-4 border-l border-zinc-800 pl-8">
                        <div className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">New Strategy</div>
                        <div className="flex justify-between text-sm"><span>Payoff:</span> <span className="text-white font-bold">{result.newMonths} months</span></div>
                        <div className="flex justify-between text-sm"><span>Interest:</span> <span className="text-emerald-400 font-bold">${result.newInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></div>
                     </div>
                  </div>
               </div>
            </div>
          ) : result && !result.isValid ? (
            <div className="h-full bg-rose-50 border-2 border-rose-200 rounded-2xl flex items-center justify-center p-8 text-center text-rose-800">
              <div>
                <div className="text-4xl mb-4">⚠️</div>
                <h3 className="text-xl font-bold mb-2">Insufficient Payment</h3>
                <p className="font-medium">{result.message}</p>
              </div>
            </div>
          ) : (
            <div className="h-full border-2 border-dashed border-zinc-200 rounded-2xl flex items-center justify-center p-8 text-center text-zinc-400 bg-zinc-50/50 italic">
               Enter your current loan details to build your payoff acceleration plan.
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title="Loan Payoff Calculator"
        whatIsIt={
          <>
            <p>
              The <strong>Loan Payoff Calculator</strong> is an acceleration tool designed to show you the massive impact of making "extra payments" toward the principal of your debt. Whether it's a student loan, auto loan, or personal loan, paying more than the minimum is the single fastest way to build wealth.
            </p>
            <p>
              By reducing the principal balance faster, you permanently lower the amount of interest the bank can charge you in future months, creating a "snowball effect" for your savings.
            </p>
          </>
        }
        formula={
          <>
            <p>The time to payoff (n) in months is calculated by solving the amortization equation for n:</p>
            <div className="bg-white p-4 rounded-lg font-mono text-center text-sm shadow-sm my-4 border border-zinc-200 overflow-x-auto text-zinc-800">
              n = -log(1 - (Principal * Monthly Rate) / Payment) / log(1 + Monthly Rate)
            </div>
            <p className="text-sm">
              We calculate this twice: once for your current payment, and again for your current payment plus your extra monthly contribution. The difference between these two values represents your <strong>Months Saved</strong>.
            </p>
          </>
        }
        example={
          <>
            <p>Suppose you have a <strong>$25,000</strong> loan at <strong>8.5% interest</strong> with a standard payment of <strong>$600</strong>.</p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-zinc-700 text-sm">
              <li><strong>Standard Strategy:</strong> You will pay off the loan in 50 months and pay $4,710 in total interest.</li>
              <li><strong>Extra Strategy:</strong> If you add just <strong>$100</strong> extra per month (totaling $700), you pay off the loan in 42 months (saving 8 months).</li>
              <li><strong>The Savings:</strong> You save <strong>$812 in interest</strong>. That $812 is a "guaranteed return" on your money.</li>
            </ul>
          </>
        }
        useCases={
          <ul className="list-disc pl-6 space-y-4 text-zinc-700 text-sm">
            <li><strong>Debt Snowball Analysis:</strong> Visualize exactly how many years you can shave off your debt by applying found money (like a raise or tax refund) to your loan.</li>
            <li><strong>Interest Mitigation:</strong> Prove to yourself that paying an extra $25 a month is better than keeping it in a 0.1% savings account.</li>
            <li><strong>Goal Setting:</strong> Determining how much extra you need to pay to be debt-free by a specific date, such as before a wedding or buying a house.</li>
          </ul>
        }
        faqs={[
          {
            question: "Is there a penalty for paying off a loan early?",
            answer: "Some loans have 'prepayment penalties'. Before following a payoff acceleration plan, check your loan contract or call your lender to ensure that extra payments are allowed and will be applied directly to the principal balance."
          },
          {
            question: "Should I pay off debt or invest?",
            answer: "It depends on the interest rate. If your loan costs 10% APR and the stock market is expected to return 7%, paying off the debt gives you a guaranteed 10% 'return' on your money, which is mathematically superior."
          },
            {
              question: "How accurate is this calculator?",
              answer: "Our calculator uses industry-standard formulas to provide the most accurate results possible. However, it should be used for informational purposes only and not as a basis for formal calculations or legal advice.",
            }]}
        relatedCalculators={[
          { name: "Debt Payoff Calculator", path: "/debt-payoff-calculator", desc: "Compare different payoff strategies for multiple debts." },
          { name: "Credit Card Payoff Calculator", path: "/credit-card-payoff-calculator", desc: "Strategy for variable-interest revolving credit." },
          { name: "Amortization Calculator", path: "/amortization-calculator", desc: "View the full month-by-month payoff schedule." },
            {
              name: "Mortgage Calculator",
              path: "/mortgage-calculator",
              desc: "Calculate your monthly mortgage payments and amortization schedule.",
            }]}
      />
    </div>
  );
}
