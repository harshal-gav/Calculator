"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function StudentLoanCalculator() {
  const [loanBalance, setLoanBalance] = useState("35000");
  const [interestRate, setInterestRate] = useState("5.5");
  const [loanTerm, setLoanTerm] = useState("10"); // Years
  const [extraPayment, setExtraPayment] = useState("100"); // Monthly

  const [result, setResult] = useState<{
    standardMonthlyPayment: number;
    standardTotalInterest: number;
    standardTotalCost: number;
    newMonthlyPayment: number;
    newTotalInterest: number;
    newTotalCost: number;
    interestSaved: number;
    monthsSaved: number;
    paysOffFaster: boolean;
  } | null>(null);

  const calculateLoan = () => {
    const balance = parseFloat(loanBalance);
    const rate = parseFloat(interestRate);
    const years = parseInt(loanTerm);
    const extra = parseFloat(extraPayment) || 0;

    if (balance > 0 && years > 0) {
      const r = rate / 100 / 12;
      const n = years * 12;

      let standardMonthlyPayment = 0;
      if (r === 0) {
        standardMonthlyPayment = balance / n;
      } else {
        standardMonthlyPayment =
          (balance * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      }

      const standardTotalCost = standardMonthlyPayment * n;
      const standardTotalInterest = standardTotalCost - balance;

      let paysOffFaster = false;
      let newTotalInterest = standardTotalInterest;
      let newTotalCost = standardTotalCost;
      let monthsSaved = 0;
      let interestSaved = 0;
      let newMonthlyPayment = standardMonthlyPayment + extra;

      if (extra > 0) {
        paysOffFaster = true;

        if (r === 0) {
            const totalMonths = balance / newMonthlyPayment;
            newTotalCost = balance;
            newTotalInterest = 0;
            monthsSaved = n - totalMonths;
        } else {
            // New payoff time in months
            const numerator = 1 - (balance * r) / newMonthlyPayment;
            
            // If numerator <= 0, payment is too small (should not happen since we ADDED extra to the standard payment)
            if (numerator > 0) {
              const newMonths = -Math.log(numerator) / Math.log(1 + r);
              newTotalCost = newMonths * newMonthlyPayment;
              newTotalInterest = newTotalCost - balance;
              monthsSaved = n - Math.ceil(newMonths);
              interestSaved = standardTotalInterest - newTotalInterest;
            }
        }
      }

      setResult({
        standardMonthlyPayment,
        standardTotalInterest,
        standardTotalCost,
        newMonthlyPayment,
        newTotalInterest,
        newTotalCost,
        interestSaved: Math.max(0, interestSaved),
        monthsSaved: Math.max(0, monthsSaved),
        paysOffFaster,
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-gray-900 border-b pb-4">
        Student Loan Calculator
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Calculate your standard student loan repayment schedule, and discover exactly how much time and interest you save by making extra monthly payments.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* Input Form */}
        <div className="lg:col-span-7 bg-gray-50 p-6 rounded-xl border border-gray-200">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Your Student Loans</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Current Loan Balance ($)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 font-bold">$</span>
                <input
                  type="number"
                  value={loanBalance}
                  onChange={(e) => setLoanBalance(e.target.value)}
                  className="pl-8 w-full rounded-lg border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 p-3 border text-lg font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Interest Rate (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 p-3 border text-lg font-medium"
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 font-bold">%</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Repayment Term (Years)
              </label>
              <select
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 p-3 border text-lg font-medium bg-white"
              >
                <option value="5">5 Years</option>
                <option value="10">10 Years (Standard)</option>
                <option value="15">15 Years</option>
                <option value="20">20 Years</option>
                <option value="25">25 Years</option>
                <option value="30">30 Years</option>
              </select>
            </div>
            
            <h3 className="col-span-1 md:col-span-2 font-bold text-gray-700 border-b border-gray-200 mt-4 pb-2">Crush Your Debt Faster</h3>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Extra Monthly Payment ($)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 font-bold">$</span>
                <input
                  type="number"
                  value={extraPayment}
                  onChange={(e) => setExtraPayment(e.target.value)}
                  placeholder="e.g. 50"
                  className="pl-8 w-full rounded-lg border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 p-3 border text-lg font-medium"
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">See how adding just $50 to $100 extra per month shifts your timeline dramatically.</p>
            </div>
          </div>

          <button
            onClick={calculateLoan}
            className="mt-8 w-full bg-cyan-600 text-white font-bold py-4 px-4 rounded-xl hover:bg-cyan-700 transition shadow-lg text-lg uppercase tracking-wide"
          >
            Calculate Loan Payoff
          </button>
        </div>

        {/* Results Sidebar */}
        <div className="lg:col-span-5 bg-cyan-50 rounded-xl p-8 border border-cyan-200 shadow-inner flex flex-col justify-center">
          {result !== null ? (
            <div>
              <h2 className="text-xl font-bold text-cyan-900 mb-2 text-center uppercase tracking-wider text-sm">
                Your Payment Plan
              </h2>
              
              <div className="mb-6 p-4 bg-white rounded-xl shadow-sm border border-cyan-100 text-center">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Standard Monthly Payment</div>
                <div className="text-4xl font-black text-gray-800">
                  ${result.standardMonthlyPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>

              {result.paysOffFaster && (
                <div className="mb-6 p-4 bg-cyan-800 rounded-xl shadow-sm border border-cyan-900 text-center transform scale-105 transition-all">
                  <div className="text-xs font-bold text-cyan-200 uppercase tracking-wider mb-1">New Accelerated Payment</div>
                  <div className="text-4xl font-black text-white">
                    ${result.newMonthlyPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>
              )}

              <div className="space-y-4 pt-4 border-t border-cyan-200">
                
                {result.paysOffFaster ? (
                  <>
                    <div className="flex justify-between items-center text-sm md:text-base border-b border-cyan-100 pb-2">
                        <span className="font-bold text-cyan-800">Time Saved</span>
                        <span className="font-black text-cyan-700">
                        {Math.floor(result.monthsSaved / 12)} yrs {result.monthsSaved % 12} mos
                        </span>
                    </div>
                    <div className="flex justify-between items-center text-sm md:text-base border-b border-cyan-100 pb-2">
                        <span className="font-bold text-cyan-800">Interest Saved</span>
                        <span className="font-black text-green-600">
                        +${result.interestSaved.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                        </span>
                    </div>
                    <div className="flex justify-between items-center text-sm md:text-base border-b border-cyan-100 pb-2">
                        <span className="font-semibold text-gray-600">New Total Interest</span>
                        <span className="font-bold text-gray-800">
                        ${result.newTotalInterest.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                        </span>
                    </div>
                  </>
                ) : (
                   <>
                    <div className="flex justify-between items-center text-sm md:text-base border-b border-cyan-100 pb-2">
                        <span className="font-semibold text-gray-600">Total Interest to Pay</span>
                        <span className="font-bold text-gray-800">
                        ${result.standardTotalInterest.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                        </span>
                    </div>
                    <div className="flex justify-between items-center text-sm md:text-base border-b border-cyan-100 pb-2">
                        <span className="font-semibold text-gray-600">Total Cost of Education</span>
                        <span className="font-bold text-gray-800">
                        ${result.standardTotalCost.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                        </span>
                    </div>
                   </>
                )}
                
              </div>
            </div>
          ) : (
            <div className="text-center text-cyan-800 opacity-60 font-medium my-auto p-4">
              Enter your student loan balance and interest rate to map out your payoff timeline. Try adding an extra $50 a month to see the impact!
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title="Student Loan Calculator"
        whatIsIt={
          <>
            <p>
              A <strong>Student Loan Calculator</strong> maps the precise trajectory of paying off your college, university, or grad school debt. It determines your monthly obligation as well as the total interest that will accrue over the life of your loan.
            </p>
            <p>
              More importantly, it functions as a <strong>Student Loan Extra Payment Calculator</strong>, illustrating the incredible snowball effect that occurs when you overpay your minimum balance every month and direct that excess cash straight at the loan's principal.
            </p>
            <p className="mt-4 text-sm text-gray-500">
              <strong>Related terms:</strong> student debt calculator, college loan calculator, student loan payoff timeline, extra loan payment calculator, FAFSA loan calculator.
            </p>
          </>
        }
        formula={
          <>
            <p>Student loans utilize compound amortizing mathematics. This means every month, some of your payment destroys the Principal, while the rest vanishes into Interest.</p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
              <li><strong>Standard Payoff:</strong> Based on the standard 10-year (120 month) federal student loan term, your total loan and interest are divided so that your balance hits exactly $0.00 on month 120.</li>
              <li><strong>Extra Payments:</strong> If your required payment is $300, and you pay $400, that extra $100 completely bypasses the interest calculation for that month and annihilates $100 of pure principal. By dramatically shrinking the principal early, the *future* interest equations yield much smaller numbers!</li>
            </ul>
          </>
        }
        example={
          <>
            <p>Imagine you graduate with standard terms on a large loan:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
              <li><strong>Loan Balance:</strong> $35,000</li>
              <li><strong>Interest Rate:</strong> 5.5%</li>
              <li><strong>Standard Term:</strong> 10 Years</li>
            </ul>
            <p className="mt-4 text-gray-700">
              Your standard <strong>monthly payment is $380</strong>. Over 10 years, you will eventually pay back $45,600 entirely ($10,600 of which is pure interest).
            </p>
            <p className="mt-2 text-gray-700">
              Now what if you add an <strong>Extra $100 per month</strong> (Total $480)?
            </p>
            <p className="mt-2 text-green-700 font-bold">
              You will save $2,642 in pure interest, and be debt-free 2 Years and 6 Months sooner!
            </p>
          </>
        }
        useCases={
          <ul className="list-disc pl-6 space-y-4">
            <li><strong>Budgeting After Graduation:</strong> Visualizing exactly what your minimum responsibilities will be once the grace period ends.</li>
            <li><strong>Finding Motivation:</strong> Tangibly seeing that giving up one subscription or eating out slightly less ($50/mo) shaves entire calendar years off your debt timeline.</li>
            <li><strong>Refinancing Logic:</strong> If considering refinancing from a 6% federal loan to a 4% private loan, you can run the numbers to see if giving up federal protections is mathematically worth the interest saved.</li>
          </ul>
        }
        faqs={[
          {
            question: "How do I ensure my extra payment goes to the Principal?",
            answer: "You must explicitly instruct your loan servicer (Nelnet, Aidvantage, Mohela, etc.) to apply the extra amount directly to the Principal of the highest-interest loan, not toward 'future payments'."
          },
          {
            question: "What is the standard student loan term?",
            answer: "For U.S. federal student loans, unless you opt into an Income-Driven Repayment (IDR) plan, you are automatically placed on a Standard 10-Year Repayment Plan."
          },
          {
            question: "Should I pay off my student loans or invest?",
            answer: "This depends heavily on your interest rate. Mathematically, paying off an 8% student loan yields a guaranteed 8% return on investment. If your loans are at 3%, you might be mathematically better off investing the money in index funds targeting a 7% average return. However, the psychological weight of being debt-free cannot be modeled in a spreadsheet."
          }
        ]}
        relatedCalculators={[
          {
            name: "Debt Consolidation Calculator",
            path: "/debt-consolidation-calculator",
            desc: "If you have numerous tiny student loans, see if consolidating them makes sense."
          },
          {
            name: "Personal Loan Calculator",
            path: "/personal-loan-calculator",
            desc: "Understand terms for non-educational loans."
          },
            {
              name: "Mortgage Calculator",
              path: "/mortgage-calculator",
              desc: "Calculate your monthly mortgage payments and amortization schedule.",
            },
            {
              name: "ROI Calculator",
              path: "/roi-calculator",
              desc: "Calculate your exact annualized percentage returns.",
            }]}
      />
    </div>
  );
}
