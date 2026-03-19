"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

interface Debt {
  id: number;
  name: string;
  balance: number;
  rate: number;
  payment: number;
}

export default function DebtConsolidationCalculator() {
  const [debts, setDebts] = useState<Debt[]>([
    { id: 1, name: "Credit Card 1", balance: 5000, rate: 19.99, payment: 150 },
    { id: 2, name: "Credit Card 2", balance: 3500, rate: 24.99, payment: 120 },
    { id: 3, name: "Personal Loan", balance: 8000, rate: 12.00, payment: 300 },
  ]);

  const [newLoanRate, setNewLoanRate] = useState("8.5");
  const [newLoanTerm, setNewLoanTerm] = useState("36"); // Months

  const [result, setResult] = useState<{
    totalDebt: number;
    currentMonthlyPayment: number;
    currentTotalInterest: number;
    currentMonthsToPayoff: number;
    newMonthlyPayment: number;
    newTotalInterest: number;
    monthlySavings: number;
    interestSavings: number;
    paysOffFaster: boolean;
    monthsSaved: number;
  } | null>(null);

  const addDebt = () => {
    setDebts([
      ...debts,
      { id: Date.now(), name: `Debt ${debts.length + 1}`, balance: 0, rate: 0, payment: 0 },
    ]);
  };

  const removeDebt = (id: number) => {
    setDebts(debts.filter((d) => d.id !== id));
  };

  const updateDebt = (id: number, field: keyof Debt, value: string | number) => {
    setDebts(
      debts.map((d) => {
        if (d.id === id) {
          return { ...d, [field]: value };
        }
        return d;
      })
    );
  };

  const calculateConsolidation = () => {
    let totalDebt = 0;
    let currentMonthlyPayment = 0;
    let currentTotalInterest = 0;
    let maxCurrentMonths = 0;

    let willNeverPayOff = false;

    // Evaluate Current Debts
    debts.forEach((debt) => {
      totalDebt += debt.balance;
      currentMonthlyPayment += debt.payment;

      const r = debt.rate / 100 / 12;
      const b = debt.balance;
      const p = debt.payment;

      if (b > 0 && p > 0) {
        if (p <= b * r) {
          willNeverPayOff = true;
        } else {
          const months = -Math.log(1 - (b * r) / p) / Math.log(1 + r);
          const totalPaid = months * p;
          const interestPaid = totalPaid - b;

          currentTotalInterest += interestPaid;
          if (months > maxCurrentMonths) {
            maxCurrentMonths = months;
          }
        }
      }
    });

    if (totalDebt === 0) return;

    // Evaluate New Loan
    const newRate = parseFloat(newLoanRate) / 100 / 12;
    const newTerm = parseInt(newLoanTerm) || 36;

    let newMonthlyPayment = 0;
    if (newRate === 0) {
      newMonthlyPayment = totalDebt / newTerm;
    } else {
      newMonthlyPayment =
        (totalDebt * newRate * Math.pow(1 + newRate, newTerm)) /
        (Math.pow(1 + newRate, newTerm) - 1);
    }

    const newTotalInterest = newMonthlyPayment * newTerm - totalDebt;

    // Compute Savings
    const monthlySavings = currentMonthlyPayment - newMonthlyPayment;
    const interestSavings = willNeverPayOff ? 0 : currentTotalInterest - newTotalInterest;
    
    // If old loans would literally take forever, cap the interest and months for display purposes
    if (willNeverPayOff) {
      currentTotalInterest = 999999;
      maxCurrentMonths = 999; // Infinity representation
    }

    setResult({
      totalDebt,
      currentMonthlyPayment,
      currentTotalInterest,
      currentMonthsToPayoff: Math.ceil(maxCurrentMonths),
      newMonthlyPayment,
      newTotalInterest,
      monthlySavings,
      interestSavings,
      paysOffFaster: newTerm < maxCurrentMonths,
      monthsSaved: Math.max(0, Math.ceil(maxCurrentMonths - newTerm)),
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-gray-900 border-b pb-4">
        Debt Consolidation Calculator
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Compare your current high-interest credit card and loan payments against a single consolidation loan to see exactly how much time and money you can save.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* Input Form */}
        <div className="lg:col-span-8 bg-gray-50 p-6 rounded-xl border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Current Debts</h2>
            <button
              onClick={addDebt}
              className="text-sm bg-blue-100 text-blue-700 font-bold py-2 px-4 rounded-lg hover:bg-blue-200 transition"
            >
              + Add Debt
            </button>
          </div>
          
          <div className="space-y-4 mb-8">
            {debts.map((debt, index) => (
              <div key={debt.id} className="grid grid-cols-12 gap-4 items-end bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="col-span-12 md:col-span-3">
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Debt Name</label>
                  <input
                    type="text"
                    value={debt.name}
                    onChange={(e) => updateDebt(debt.id, "name", e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border text-sm"
                  />
                </div>
                <div className="col-span-4 md:col-span-3">
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Balance ($)</label>
                  <input
                    type="number"
                    value={debt.balance || ""}
                    onChange={(e) => updateDebt(debt.id, "balance", parseFloat(e.target.value) || 0)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border text-sm"
                  />
                </div>
                <div className="col-span-4 md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Rate (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={debt.rate || ""}
                    onChange={(e) => updateDebt(debt.id, "rate", parseFloat(e.target.value) || 0)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border text-sm"
                  />
                </div>
                <div className="col-span-4 md:col-span-3">
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Payment/mo ($)</label>
                  <input
                    type="number"
                    value={debt.payment || ""}
                    onChange={(e) => updateDebt(debt.id, "payment", parseFloat(e.target.value) || 0)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border text-sm"
                  />
                </div>
                <div className="col-span-12 md:col-span-1 flex justify-end">
                  <button
                    onClick={() => removeDebt(debt.id)}
                    className="text-red-500 hover:text-red-700 font-bold text-xl p-1"
                    title="Remove Debt"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-bold mb-6 text-gray-800 border-t border-gray-200 pt-6">New Consolidation Loan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                New Loan Interest Rate (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  value={newLoanRate}
                  onChange={(e) => setNewLoanRate(e.target.value)}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border text-lg font-medium"
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 font-bold">%</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                New Loan Term (Months)
              </label>
              <select
                value={newLoanTerm}
                onChange={(e) => setNewLoanTerm(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border text-lg font-medium bg-white"
              >
                <option value="12">12 Months (1 yr)</option>
                <option value="24">24 Months (2 yrs)</option>
                <option value="36">36 Months (3 yrs)</option>
                <option value="48">48 Months (4 yrs)</option>
                <option value="60">60 Months (5 yrs)</option>
                <option value="72">72 Months (6 yrs)</option>
                <option value="84">84 Months (7 yrs)</option>
              </select>
            </div>
          </div>

          <button
            onClick={calculateConsolidation}
            className="mt-8 w-full bg-blue-600 text-white font-bold py-4 px-4 rounded-xl hover:bg-blue-700 transition shadow-lg text-lg uppercase tracking-wide"
          >
            Calculate Consolidation Savings
          </button>
        </div>

        {/* Results Sidebar */}
        <div className="lg:col-span-4 bg-gray-800 text-white rounded-xl p-6 shadow-inner flex flex-col justify-start">
          {result !== null ? (
            <div>
              <h2 className="text-xl font-bold text-gray-200 mb-6 text-center border-b border-gray-700 pb-4">
                Consolidation Results
              </h2>

              {/* Top Level Metric */}
              <div className="mb-8 p-4 bg-gray-900 rounded-lg text-center border border-gray-700 shadow-sm">
                <div className="text-sm text-gray-400 font-semibold mb-1 uppercase tracking-wider">Interest Savings</div>
                <div className="text-4xl font-black text-green-400">
                  {result.currentTotalInterest === 999999 
                    ? "Limitless" 
                    : `$${result.interestSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
                </div>
              </div>

              {/* Comparison Table */}
              <div className="space-y-6">
                
                <div>
                  <div className="flex justify-between text-xs text-gray-400 mb-1 uppercase tracking-wider font-semibold">
                    <span>Monthly Payment</span>
                  </div>
                  <div className="flex justify-between items-center bg-gray-700 p-3 rounded-md">
                    <span className="text-gray-300 strike line-through opacity-70">
                      ${result.currentMonthlyPayment.toLocaleString()}
                    </span>
                    <span className="text-2xl font-bold text-white">
                      ${result.newMonthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <p className="text-right text-sm mt-1 text-green-400 font-medium">
                    {result.monthlySavings > 0 
                      ? `Saves $${result.monthlySavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}/mo` 
                      : `Costs $${Math.abs(result.monthlySavings).toLocaleString(undefined, { maximumFractionDigits: 0 })}/mo more`}
                  </p>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-gray-400 mb-1 uppercase tracking-wider font-semibold">
                    <span>Time to Debt Free</span>
                  </div>
                  <div className="flex justify-between items-center bg-gray-700 p-3 rounded-md">
                    <span className="text-gray-300 strike line-through opacity-70">
                       {result.currentMonthsToPayoff === 999 ? "∞" : result.currentMonthsToPayoff} mos
                    </span>
                    <span className="text-2xl font-bold text-white">
                      {newLoanTerm} mos
                    </span>
                  </div>
                  {result.paysOffFaster && (
                    <p className="text-right text-sm mt-1 text-blue-300 font-medium">
                      Debt free {result.monthsSaved} months sooner!
                    </p>
                  )}
                </div>

                <div>
                  <div className="flex justify-between text-xs text-gray-400 mb-1 uppercase tracking-wider font-semibold">
                    <span>Total Interest Paid</span>
                  </div>
                  <div className="flex justify-between items-center bg-gray-700 p-3 rounded-md">
                    <span className="text-gray-300 strike line-through opacity-70">
                      ${result.currentTotalInterest === 999999 ? "∞" : result.currentTotalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                    <span className="text-xl font-bold text-white">
                      ${result.newTotalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                </div>

              </div>
              
            </div>
          ) : (
             <div className="text-center text-gray-400 opacity-60 font-medium mt-12">
                Add your current debts and configure a consolidation loan to see exactly how much money and time you can save.
             </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title="Debt Consolidation Calculator"
        whatIsIt={
          <>
            <p>
              A <strong>Debt Consolidation Calculator</strong> is a strategic financial tool that compares your current high-interest debts (like maxed-out credit cards or costly auto loans) against a single, lower-interest consolidation loan.
            </p>
            <p>
              By rolling multiple debts into one personal loan or balance-transfer credit card, you can often significantly decrease your monthly cash flow burden and drastically lower the total interest paid to banks.
            </p>
            <p className="mt-4 text-sm text-gray-500">
              <strong>Related terms:</strong> credit card payoff calculator, debt payoff calculator, loan consolidation calculator, personal loan for debt, debt snowball calculator.
            </p>
          </>
        }
        formula={
          <>
            <p>To accurately calculate consolidation savings, the calculator performs complex comparative amortization schedules simultaneously:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
              <li><strong>Current Debts:</strong> Using your balance, interest rate, and specific monthly payment, the tool maps out exactly how many months it will take to reach zero for each individual account.</li>
              <li><strong>Consolidation Loan:</strong> The tool pools all your balances into a single Principal amount, applies the new fixed interest rate, and distributes it equally over your chosen term limit (e.g., 36 months).</li>
            </ul>
            <p className="mt-4 text-gray-700"><strong>Interest Savings = (Total Current Interest Scheduled) - (Total Interest on New Loan)</strong></p>
          </>
        }
        example={
          <>
            <p>Assume you have two maxed-out credit cards:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
              <li>Card 1: $5,000 balance at 19.99%, paying $150/mo.</li>
              <li>Card 2: $3,500 balance at 24.99%, paying $120/mo.</li>
            </ul>
            <p className="mt-4 text-gray-700">
              Separately, you are paying $270 a month, and it will take you over 48 months to become debt-free, costing you roughly <strong>$3,500 in pure interest</strong>.
            </p>
            <p className="mt-2 text-gray-700">
              If you consolidate the $8,500 total at an <strong>8.5% interest rate</strong> over 36 months, your new payment drops to <strong>$268/mo</strong>, but you pay only <strong>$1,159 in total interest</strong>. 
            </p>
            <p className="mt-2 font-bold text-green-700">You save over $2,300 and are debt-free an entire year sooner!</p>
          </>
        }
        useCases={
          <ul className="list-disc pl-6 space-y-4">
            <li><strong>Credit Card Balance Transfers:</strong> Calculating if an introductory 0% APR balance transfer card with a 3% transfer fee mathematically beats leaving your revolving debt where it is.</li>
            <li><strong>Personal Debt Loans:</strong> Validating that taking out an unsecured personal loan from a bank to immediately zero out 4 credit cards actually results in net financial savings over 5 years.</li>
            <li><strong>Fixing Minimum Payments:</strong> Many users find out via the calculator that their current minimum credit card payments don't even cover the interest, meaning they will literally never escape the debt without consolidating!</li>
          </ul>
        }
        faqs={[
          {
            question: "Does consolidating debt hurt my credit score?",
            answer: "In the short term, applying for a new consolidation loan will cause a slight dip (hard inquiry) on your credit score. However, long term it vastly improves your credit utilization ratio (by zeroing out credit cards) and ensures your DTI drops drastically as you pay the single loan off."
          },
          {
            question: "Why is the new monthly payment higher in some scenarios?",
            answer: "If you try to consolidate 5 years of credit card debt into a very short 12-month loan term, your total interest paid will be minuscule, but your monthly cash flow requirements will skyrocket to pay off the principal that fast."
          },
          {
            question: "Are there fees associated with consolidation?",
            answer: "Yes, many lenders charge 'origination fees' (often 1% to 8% of the loan amount), and balance transfer credit cards often charge a 3% to 5% transfer fee. Always verify your interest savings dramatically outweighs the fees."
          }
        ]}
        relatedCalculators={[
          {
            name: "Credit Card Payoff Calculator",
            path: "/credit-card-payoff-calculator/",
            desc: "Determine the exact date you will become debt-free."
          },
          {
            name: "Personal Loan Calculator",
            path: "/personal-loan-calculator/",
            desc: "Estimate your monthly loan payments."
          },
            {
              name: "Mortgage Calculator",
              path: "/mortgage-calculator/",
              desc: "Calculate your monthly mortgage payments and amortization schedule.",
            },
            {
              name: "ROI Calculator",
              path: "/roi-calculator/",
              desc: "Calculate your exact annualized percentage returns.",
            }]}
      />
    </div>
  );
}
