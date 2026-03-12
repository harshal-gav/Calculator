"use client";

import { useState, useEffect } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function InterestOnlyCalculator() {
  const [loanAmount, setLoanAmount] = useState("200000");
  const [interestRate, setInterestRate] = useState("6.5");
  const [interestOnlyTerm, setInterestOnlyTerm] = useState("5"); // years

  const [result, setResult] = useState<{
    monthlyInterest: number;
    annualInterest: number;
    totalInterestOnlyPaid: number;
  } | null>(null);

  useEffect(() => {
    calculateInterest();
  }, [loanAmount, interestRate, interestOnlyTerm]);

  const calculateInterest = () => {
    const p = parseFloat(loanAmount);
    const r = parseFloat(interestRate) / 100;
    const t = parseFloat(interestOnlyTerm);

    if (p > 0 && r >= 0) {
      const annual = p * r;
      const monthly = annual / 12;
      const total = annual * t;

      setResult({
        monthlyInterest: monthly,
        annualInterest: annual,
        totalInterestOnlyPaid: total,
      });
    } else {
      setResult(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-2xl shadow-xl border border-amber-50">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold mb-4 text-amber-900 tracking-tight">
          Interest-Only Calculator
        </h1>
        <p className="text-amber-700 text-lg">
          Calculate the monthly payments for an interest-only loan period.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Input UI */}
        <div className="bg-amber-50/50 p-6 rounded-2xl border border-amber-100 space-y-6">
          <div>
            <label className="block text-sm font-bold text-amber-800 mb-2 uppercase tracking-wider">
              Loan Principal Amount
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500 font-bold">$</span>
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                className="w-full bg-white rounded-xl border-amber-200 p-4 pl-8 shadow-sm focus:ring-2 focus:ring-amber-500 font-bold text-xl text-amber-950 transition-all"
              />
            </div>
          </div>

          <div>
             <label className="block text-sm font-bold text-amber-800 mb-2 uppercase tracking-wider">
               Annual Interest Rate (%)
             </label>
             <div className="relative">
               <input
                 type="number"
                 step="0.01"
                 value={interestRate}
                 onChange={(e) => setInterestRate(e.target.value)}
                 className="w-full bg-white rounded-xl border-amber-200 p-4 shadow-sm focus:ring-2 focus:ring-amber-500 font-bold text-xl text-amber-950 transition-all"
               />
               <span className="absolute right-4 top-1/2 -translate-y-1/2 text-amber-500 font-bold">%</span>
             </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-amber-800 mb-2 uppercase tracking-wider">
              Interest-Only Term (Years)
            </label>
            <div className="relative">
              <input
                type="number"
                value={interestOnlyTerm}
                onChange={(e) => setInterestOnlyTerm(e.target.value)}
                className="w-full bg-white rounded-xl border-amber-200 p-4 shadow-sm focus:ring-2 focus:ring-amber-500 font-bold text-xl text-amber-950 transition-all"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-amber-400 text-xs font-bold uppercase">Years</span>
            </div>
          </div>
        </div>

        {/* Output UI */}
        <div className="h-full">
           {result ? (
             <div className="bg-amber-900 rounded-2xl p-8 text-white shadow-2xl h-full flex flex-col justify-center border border-amber-800 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-32 h-32 bg-amber-400 rounded-full mix-blend-overlay filter blur-[50px] opacity-10"></div>
                
                <div className="text-center mb-10">
                   <h2 className="text-amber-200 text-xs font-bold uppercase tracking-[0.2em] mb-3">Interest-Only Monthly Payment</h2>
                   <div className="text-6xl font-black tracking-tighter">
                      ${result.monthlyInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                   </div>
                </div>

                <div className="space-y-4">
                   <div className="flex justify-between items-center py-3 border-b border-amber-800">
                      <span className="text-amber-200/70 text-sm font-medium">Interest per Year</span>
                      <span className="font-bold text-xl">${result.annualInterest.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                   </div>
                   <div className="flex justify-between items-center py-3 border-b border-amber-800">
                      <span className="text-amber-200/70 text-sm font-medium">Total for {interestOnlyTerm} years</span>
                      <span className="font-bold text-xl">${result.totalInterestOnlyPaid.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                   </div>
                </div>

                <div className="mt-8 bg-amber-800/40 p-4 rounded-xl border border-amber-700/50 text-amber-100 text-[10px] leading-relaxed italic text-center uppercase tracking-wider font-bold">
                   Warning: Principal remains unchanged. You will still owe ${parseFloat(loanAmount).toLocaleString()} at the end of the term.
                </div>
             </div>
           ) : (
             <div className="h-full border-2 border-dashed border-amber-200 rounded-2xl flex items-center justify-center p-8 bg-amber-50/20 text-center text-amber-300 font-bold uppercase tracking-widest text-sm">
                Awaiting loan details...
             </div>
           )}
        </div>
      </div>

      <CalculatorSEO
        title="Interest-Only Calculator"
        whatIsIt={
          <>
            <p>
              An <strong>Interest-Only Calculator</strong> is a financial tool used to determine the monthly payments required when you are only paying the interest portion of a loan, without reducing the original principal amount.
            </p>
            <p>
              This payment structure is most common in certain types of mortgages (Interest-Only Mortgages), business bridge loans, or student loans during the "in-school" deferment period. It results in much lower initial monthly payments but does not build any equity or reduce the debt balance.
            </p>
          </>
        }
        formula={
          <>
            <p>The math for interest-only payments is significantly simpler than standard amortized loans:</p>
            <div className="bg-amber-50 p-6 rounded-lg font-mono text-center text-lg shadow-sm my-4 border border-amber-100 text-amber-900">
              <strong>Monthly Interest = (Principal x Annual Rate) / 12</strong>
            </div>
            <p className="text-sm">
              Because the principal (P) does not change, the interest portion remains the same every month for the entire interest-only duration.
            </p>
          </>
        }
        example={
          <>
            <p>Imagine you take a <strong>$200,000</strong> bridge loan at <strong>6.5% interest</strong> for a <strong>5-year</strong> interest-only period:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-zinc-700">
              <li><strong>Annual Interest:</strong> $200,000 x 0.065 = $13,000 per year.</li>
              <li><strong>Monthly Payment:</strong> $13,000 / 12 = <strong>$1,083.33</strong>.</li>
              <li><strong>The Reality:</strong> After 5 years of paying $1,083.33 every month, you will have paid $65,000 in interest, but you <strong>still owe the original $200,000</strong> to the lender.</li>
            </ul>
          </>
        }
        useCases={
          <ul className="list-disc pl-6 space-y-4 text-zinc-700">
            <li><strong>Investment Property Strategy:</strong> Real estate investors often use interest-only periods to maximize monthly cash flow during renovations or until the property is sold.</li>
            <li><strong>Bridge Financing:</strong> Borrowing money for a short window with the intention of paying off the entire principal in a single lump sum (a "balloon payment") later.</li>
            <li><strong>Financial Hardship:</strong> Some lenders allow temporary interest-only periods to lower the borrower's monthly obligation during times of decreased income.</li>
          </ul>
        }
        faqs={[
          {
            question: "Why would anyone want an interest-only loan?",
            answer: "The primary benefit is lower monthly payments. This can be useful for borrowers who expect their income to increase significantly in the future, or for investors who plan to sell the asset before the principal repayment period begins."
          },
          {
            question: "What is the 'Interest-Only Trap'?",
            answer: "The 'trap' occurs when the interest-only period ends. At that point, the loan 'recasts', and the monthly payment jumps significantly because you must now pay both interest and principal over a shorter remaining timeframe. This is often called 'payment shock'."
          },
          {
            question: "Do I build equity with interest-only payments?",
            answer: "No. Since you are not paying down the principal balance, the only way to gain equity is if the market value of the asset (like a house) increases on its own."
          }
        ]}
        relatedCalculators={[
          { name: "Mortgage Calculator", path: "/mortgage-calculator", desc: "Calculate standard PITI mortgage payments." },
          { name: "Loan Payment Calculator", path: "/loan-payment-calculator", desc: "General term loan payment estimator." },
          { name: "Amortization Calculator", path: "/amortization-calculator", desc: "See how principal is usually reduced over time." }
        ]}
      />
    </div>
  );
}
