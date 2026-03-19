"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
export default function CreditCardPayoffCalculator() {
  const [balance, setBalance] = useState("5000");
  const [interestRate, setInterestRate] = useState("18.99");

  // modes: "fixedPayment" or "fixedTime"
  const [mode, setMode] = useState("fixedPayment");

  // Fixed Payment variables
  const [monthlyPayment, setMonthlyPayment] = useState("250");

  // Fixed Time variables
  const [monthsToPayoff, setMonthsToPayoff] = useState("24");

  // Results
  const [resultMonths, setResultMonths] = useState<number | null>(null);
  const [resultPayment, setResultPayment] = useState<number | null>(null);
  const [totalInterest, setTotalInterest] = useState<number | null>(null);

  const calculatePayoff = () => {
    const b = parseFloat(balance) || 0;
    const r = parseFloat(interestRate) || 0;

    if (b <= 0) return;

    const monthlyRate = r / 100 / 12;

    if (mode === "fixedPayment") {
      const p = parseFloat(monthlyPayment) || 0;

      // Check if payment is too small to cover interest
      if (p <= b * monthlyRate) {
        alert(
          "Your monthly payment must be greater than the monthly interest charge to pay off the balance.",
        );
        return;
      }

      // N = -(ln(1 - (B * r) / P)) / ln(1 + r)
      const numerator = Math.log(1 - (b * monthlyRate) / p);
      const denominator = Math.log(1 + monthlyRate);
      const n = -(numerator / denominator);

      const totalMonths = Math.ceil(n);
      const totalPaid = p * totalMonths;
      const interest = totalPaid - b;

      setResultMonths(totalMonths);
      setResultPayment(p);
      setTotalInterest(interest);
    } else {
      const m = parseInt(monthsToPayoff, 10) || 0;
      if (m <= 0) return;

      // P = B * (r * (1 + r)^n) / ((1 + r)^n - 1)
      let p = 0;
      if (r === 0) {
        p = b / m;
      } else {
        p =
          (b * (monthlyRate * Math.pow(1 + monthlyRate, m))) /
          (Math.pow(1 + monthlyRate, m) - 1);
      }

      const totalPaid = p * m;
      const interest = totalPaid - b;

      setResultMonths(m);
      setResultPayment(p);
      setTotalInterest(interest);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-slate-50 rounded-2xl shadow-xl border border-slate-200">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-indigo-900 flex items-center justify-center">
          <span className="mr-3">💳</span> Credit Card Payoff
        </h1>
        <p className="text-indigo-700 text-lg max-w-2xl mx-auto">
          Determine how long it takes to pay off your balance, or find out
          exactly how much to pay extra to become debt-free by a specific date.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Inputs */}
        <div className="lg:col-span-3 space-y-6 bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm relative">
          <div className="absolute top-0 left-0 w-2 h-full bg-indigo-500 rounded-l-2xl"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                Current Balance
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 font-bold text-xl">
                  $
                </span>
                <input
                  type="number"
                  step="100"
                  min="0"
                  value={balance}
                  onChange={(e) => setBalance(e.target.value)}
                  className="w-full rounded-xl border-slate-300 pl-10 p-4 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all font-bold text-2xl text-slate-800"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                Interest Rate (APR)
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="99"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  className="w-full rounded-xl border-slate-300 p-4 shadow-sm focus:border-indigo-500 font-bold text-xl text-slate-800"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 font-bold text-xl">
                  %
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-2 border-t border-slate-100">
            <div className="flex space-x-2 mb-6 p-1 bg-slate-100 rounded-xl">
              <button
                onClick={() => setMode("fixedPayment")}
                className={`flex-1 py-3 px-4 rounded-lg text-sm font-bold transition-all ${mode === "fixedPayment" ? "bg-white shadow-sm text-indigo-700" : "text-slate-500 hover:text-slate-700"}`}
              >
                I know my Monthly Payment
              </button>
              <button
                onClick={() => setMode("fixedTime")}
                className={`flex-1 py-3 px-4 rounded-lg text-sm font-bold transition-all ${mode === "fixedTime" ? "bg-white shadow-sm text-indigo-700" : "text-slate-500 hover:text-slate-700"}`}
              >
                I want an Exact Payoff Date
              </button>
            </div>

            {mode === "fixedPayment" ? (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                  Planned Monthly Payment
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-500 font-bold">
                    $
                  </span>
                  <input
                    type="number"
                    step="10"
                    min="0"
                    value={monthlyPayment}
                    onChange={(e) => setMonthlyPayment(e.target.value)}
                    className="w-full rounded-xl border-indigo-200 bg-indigo-50/30 pl-10 p-4 shadow-sm focus:border-indigo-500 font-bold text-xl text-indigo-900"
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                  Desired Months to Payoff
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="1"
                    min="1"
                    max="120"
                    value={monthsToPayoff}
                    onChange={(e) => setMonthsToPayoff(e.target.value)}
                    className="w-full rounded-xl border-indigo-200 bg-indigo-50/30 p-4 pr-20 shadow-sm focus:border-indigo-500 font-bold text-xl text-indigo-900"
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-indigo-400 font-bold uppercase text-sm tracking-wider">
                    Months
                  </span>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={calculatePayoff}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-indigo-600/30 uppercase tracking-widest text-sm mt-8"
          >
            Calculate Payoff
          </button>
        </div>

        {/* Dashboard Output */}
        <div className="lg:col-span-2">
          {resultMonths !== null && resultPayment !== null ? (
            <div className="h-full bg-indigo-950 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden flex flex-col justify-center text-white border border-indigo-800">
              {/* Decorative element */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

              <div className="relative z-10 w-full">
                {mode === "fixedPayment" ? (
                  <>
                    <h2 className="text-indigo-300 font-bold uppercase tracking-widest text-xs mb-4 text-center">
                      Time to Debt-Free
                    </h2>
                    <div className="text-center mb-10">
                      <div className="text-6xl font-black tracking-tight text-white mb-2 drop-shadow-lg">
                        {resultMonths}
                      </div>
                      <div className="text-indigo-400 font-bold text-xl uppercase tracking-widest">
                        Months
                      </div>
                      <div className="text-slate-400 text-sm mt-2">
                        ({(resultMonths / 12).toFixed(1)} years)
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <h2 className="text-indigo-300 font-bold uppercase tracking-widest text-xs mb-4 text-center">
                      Required Monthly Payment
                    </h2>
                    <div className="text-center mb-10">
                      <div className="text-6xl font-black tracking-tight text-white mb-2 drop-shadow-lg flex items-start justify-center">
                        <span className="text-3xl mt-2 text-indigo-400">$</span>
                        {resultPayment.toFixed(2)}
                      </div>
                      <div className="text-indigo-400 font-bold text-sm uppercase tracking-widest">
                        Per Month
                      </div>
                    </div>
                  </>
                )}

                <div className="space-y-4 w-full pt-6 border-t border-indigo-800/50">
                  <div className="bg-slate-900/60 p-4 rounded-xl border border-indigo-800/30">
                    <div className="text-indigo-200 text-xs font-bold uppercase tracking-wider mb-1">
                      Total Interest Paid
                    </div>
                    <div className="font-bold font-mono text-2xl text-rose-400">
                      ${(totalInterest || 0).toFixed(2)}
                    </div>
                  </div>

                  <div className="bg-indigo-900/60 p-4 rounded-xl border-2 border-indigo-500/30">
                    <div className="text-indigo-100 text-xs font-bold uppercase tracking-wider mb-1">
                      Total Principal + Interest
                    </div>
                    <div className="font-bold font-mono text-xl text-white">
                      $
                      {(
                        (parseFloat(balance) || 0) + (totalInterest || 0)
                      ).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full rounded-2xl border-2 border-dashed border-indigo-200 bg-indigo-50/40 flex flex-col items-center justify-center p-8 text-center text-indigo-600">
              <span className="text-6xl mb-4 opacity-50 grayscale pt-6">
                ✂️
              </span>
              <h3 className="font-bold text-xl mb-2 text-indigo-800">
                Cut the Plastic
              </h3>
              <p className="text-sm font-medium opacity-80">
                Calculate your payoff strategy to eliminate high-interest debt.
              </p>
            </div>
          )}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Credit Card Payoff Calculator",
            operatingSystem: "All",
            applicationCategory: "FinanceApplication",
          }),
        }}
      />
 
       <CalculatorSEO
        title="Credit Card Payoff Calculator & Debt Freedom Planner"
        whatIsIt={
          <>
            <p className="text-lg leading-relaxed mb-4">
              A <strong>Credit Card Payoff Calculator</strong> is a psychological and financial defensive tool designed to help you escape the "Minimum Payment Trap." Unlike structured installment loans (like mortgages or auto loans), credit card debt is <strong>revolving</strong>, meaning the interest compounds daily and the minimum payment requirements are designed to keep you in debt for as long as possible.
            </p>
            <p className="leading-relaxed mb-4">
              Our calculator provides two powerful planning modes. You can either determine how long it will take to reach $0 balance using a <strong>fixed monthly payment</strong>, or you can set a "Freedom Date" and find out the exact <strong>extra payment</strong> required to hit that target. By visualizing the total interest costs, you can make informed decisions about debt consolidation or lifestyle adjustments.
            </p>
            <p className="leading-relaxed">
              Don't let high APRs dictate your future. Use this tool to map out your journey to being 100% debt-free.
            </p>
          </>
        }
        comparisonTable={{
          title: "Average Credit Card APR by Credit Score (2024)",
          headers: ["Credit Category", "Score Range", "Average APR", "Interest Impact", "Strategy"],
          rows: [
            ["Excellent", "740 - 850", "15.5% - 19.5%", "Moderate", "0% APR Transfers"],
            ["Good", "670 - 739", "21.0% - 24.5%", "High", "Debt Avalanche"],
            ["Fair", "580 - 669", "25.0% - 28.5%", "Very High", "Consolidation Loan"],
            ["Poor", "300 - 579", "29.9%+", "Extreme", "Credit Counseling"],
          ]
        }}
        formula={
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-700">
            <div className="space-y-4">
              <h4 className="font-bold text-indigo-900 border-b border-indigo-100 pb-2">1. The Payoff Timeframe</h4>
              <p className="text-sm">Solving for 'n' (number of months) using a logarithmic formula:</p>
              <div className="bg-slate-900 p-6 rounded-xl font-mono text-white text-center text-sm shadow-md overflow-x-auto">
                n = -log(1 - (B × r / P)) / log(1 + r)
              </div>
              <p className="text-[10px] text-gray-400 italic">B = Balance, r = Monthly Interest (APR/12), P = Payment</p>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-indigo-900 border-b border-indigo-100 pb-2">2. Required Payment Formula</h4>
              <p className="text-sm">Calculating the fixed payment needed for a specific end date:</p>
              <div className="bg-indigo-900 p-6 rounded-xl font-mono text-white text-center text-sm shadow-md overflow-x-auto">
                P = B × [r(1+r)^n] / [(1+r)^n - 1]
              </div>
            </div>
          </div>
        }
        deepDive={
          <div className="space-y-12 text-gray-700">
            <section>
              <h4 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-12 h-12 bg-indigo-100 text-indigo-900 rounded-2xl flex items-center justify-center mr-4 shadow-sm font-black italic">!</span>
                The Minimum Payment Trap
              </h4>
              <p className="leading-relaxed">
                Most credit card issuers set your minimum payment at interest plus only 1% of your principal. If you owe $5,000 at 22% APR and only pay the minimum, it could take over <strong>20 years</strong> to pay it off and cost you more in interest than the original purchase. Our calculator assumes you will pay a <strong>fixed amount</strong>, which is the fastest way to accelerate your progress without changing your budget month-to-month.
              </p>
            </section>

            <section className="bg-gradient-to-br from-indigo-900 to-slate-800 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-400 rounded-full mix-blend-screen filter blur-[100px] opacity-10"></div>
               <h4 className="text-xl font-bold mb-4 text-indigo-300 uppercase tracking-widest">Avalanche vs. Snowball Method</h4>
               <p className="leading-relaxed mb-6">
                 Should you pay off the card with the highest APR first (<strong>Avalanche</strong>) or the one with the smallest balance (<strong>Snowball</strong>)? Historically, the Avalanche method saves the most money globally. Use this calculator to see exactly how much interest you save by increasing your monthly payment on your highest-rate card by just $100.
               </p>
               <div className="p-4 bg-white/10 rounded-xl border border-white/20 text-xs italic">
                 Analytic Tip: Focus 100% of your extra cash on your highest APR card while maintaining minimums on others to maximize your ROI.
               </div>
            </section>

            <section>
              <h4 className="text-2xl font-bold text-gray-900 mb-6">0% Balance Transfer Strategy</h4>
              <p className="leading-relaxed">
                If your calculator results show a multi-year payoff and thousands in interest, look for a <strong>0% APR Balance Transfer</strong> offer. Even with a 3-5% transfer fee, you can stop the bleeding of 24%+ interest for 12-21 months. Once transferred, use this calculator with a 0% interest rate to see how much faster your debt vanishes when 100% of your payment goes toward the principal.
              </p>
            </section>
          </div>
        }
        example={
          <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-indigo-50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-indigo-500"></div>
            <h5 className="font-black text-gray-900 uppercase tracking-widest text-xs mb-8">Case Study: The $5,000 Challenge</h5>
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                <span className="text-gray-500 font-medium">Balance & APR</span>
                <span className="font-bold text-gray-900">$5,000 at 21%</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                <span className="text-gray-500 font-medium">Scenario A (Fixed $150/mo)</span>
                <span className="font-bold text-rose-600">54 Mo / $2,834 Int.</span>
              </div>
               <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                 <span className="text-gray-500 font-medium">Scenario B (Fixed $350/mo)</span>
                 <span className="font-bold text-indigo-600">17 Mo / $817 Int.</span>
               </div>
              <div className="grid grid-cols-1 gap-4 mt-8">
                <div className="bg-indigo-50 p-6 rounded-2xl text-center">
                  <span className="block text-[10px] text-indigo-600 font-bold uppercase mb-1">Total Savings</span>
                  <span className="text-3xl font-black text-indigo-900">$2,017 + 3 Years of Life</span>
                </div>
              </div>
            </div>
            <p className="mt-8 text-xs text-gray-400 text-center italic">Result: Tripling your payment doesn't just cut the time in half—it slashes it by 68%.</p>
          </div>
        }
        useCases={
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200">
              <h6 className="font-bold text-gray-900 mb-2">Debt Aggregation</h6>
              <p className="text-xs text-gray-500">Calculate the total time needed to clear all cards if you combine all current minimum payments into one "power payment."</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200">
              <h6 className="font-bold text-gray-900 mb-2">Interest Avoidance</h6>
              <p className="text-xs text-gray-500">Find the exact dollar amount needed monthly to pay off a holiday spending spree before the 0% promotional period ends.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200">
              <h6 className="font-bold text-gray-900 mb-2">Credit Score Boost</h6>
              <p className="text-xs text-gray-500">Plan a payoff schedule to reach 30% credit utilization, which is the key threshold for significant credit score improvements.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200">
              <h6 className="font-bold text-gray-900 mb-2">Consolidation Comparison</h6>
              <p className="text-xs text-gray-500">Determine if a personal loan at 12% APR is truly better than your current cards by comparing the total interest paid outputs.</p>
            </div>
          </div>
        }
        glossary={[
          { term: "APR (Annual Percentage Rate)", definition: "The yearly interest rate charged on your balance, including fees and costs associated with the credit line." },
          { term: "Revolving Debt", definition: "A type of credit that does not have a fixed number of payments (unlike a car loan) and allows you to borrow up to a limit." },
          { term: "Grace Period", definition: "The window of time (usually 21-25 days) where no interest is charged if the statement balance is paid in full." },
          { term: "Residual Interest", definition: "Interest that continues to accrue on your daily balance between the statement closing date and the date you pay the bill." },
          { term: "Credit Utilization", definition: "The ratio of your outstanding card balances to your total available credit limits; a major credit score factor." },
          { term: "Default Rate", definition: "A much higher penalty APR (often 29.99%) triggered by missed or late payments." },
          { term: "Principal", definition: "The original amount of money borrowed, separate from interest charges." },
        ]}
        faqs={[
          {
            question: "Why does my balance barely drop after a payment?",
            answer: "If your APR is high (20%+), a large portion of your payment goes toward interest charges accrued over the last 30 days. Only the 'leftover' amount reduces the principal. This is why paying even $50 extra month can have a massive impact."
          },
          {
            question: "Is it better to pay once a month or twice?",
            answer: "Because credit card interest is calculated based on your 'Average Daily Balance,' making two smaller payments (one on the 1st and one on the 15th) can actually save you a small amount of interest compared to one large payment on the 30th."
          },
          {
            question: "Will paying off my card hurt my credit score?",
            answer: "No. Paying off debt decreases your utilization ratio, which almost always improves your score. However, *closing* the account once it's paid off might slightly lower your score by reducing your total available credit and average age of accounts."
          },
          {
            question: "What happens if I miss a payment during my payoff plan?",
            answer: "Most issuers will revoke any promotional interest rates and may trigger a 'Penalty APR.' If you are on a strict payoff plan, a single missed payment can add months to your timeline."
          },
          {
            question: "Should I use my savings to pay off my card?",
            answer: "Generally, yes. If your savings account earns 4% interest but your credit card costs 24%, you are effectively losing 20% on that money. Paying off the card is a guaranteed 'return' of 24%."
          }
        ]}
        relatedCalculators={[
          {
            name: "Debt Payoff Calculator",
            path: "/debt-payoff-calculator/",
            desc: "Compare Snowball vs Avalanche strategies for multiple cards.",
          },
          {
            name: "Personal Loan Calculator",
            path: "/personal-loan-calculator/",
            desc: "See if consolidating your cards into one low-interest loan makes sense.",
          },
          {
            name: "Savings Goal Calculator",
            path: "/savings-goal-calculator/",
            desc: "Plan what to do with your extra cash once your cards are at zero.",
          },
          {
            name: "Compound Interest Calculator",
            path: "/compound-interest-calculator/",
            desc: "See how much wealth you could build by investing your old monthly payment.",
          }
        ]}
      />
    </div>
  );
}
