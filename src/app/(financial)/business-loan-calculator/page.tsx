"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import businessLoanSeoData from "@/data/seo-content/official/business-loan-calculator.json";

export default function BusinessLoanCalculator() {
  const [loanAmount, setLoanAmount] = useState("100000");
  const [interestRate, setInterestRate] = useState("7.5");
  const [loanTerm, setLoanTerm] = useState("60"); // months
  const [originationFeePct, setOriginationFeePct] = useState("3"); // %
  const [otherFees, setOtherFees] = useState("500");

  const [result, setResult] = useState<{
    monthlyPayment: number;
    totalInterest: number;
    totalFees: number;
    netFundsReceived: number;
    totalCost: number;
    effectiveApr: number;
    totalPayments: number;
  } | null>(null);

  const calculateLoan = () => {
    const p = parseFloat(loanAmount);
    const r = parseFloat(interestRate) / 100 / 12;
    const n = parseInt(loanTerm);
    const feePct = parseFloat(originationFeePct) || 0;
    const flatFees = parseFloat(otherFees) || 0;

    if (p > 0 && n > 0) {
      // Monthly Payment based on Gross Loan Amount
      let monthlyPayment = p / n;
      if (r > 0) {
        monthlyPayment = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      }

      const totalPayments = monthlyPayment * n;
      const totalInterest = totalPayments - p;

      // Fees are usually deducted from the gross loan amount in business loans
      const originationFeeAmt = p * (feePct / 100);
      const totalFees = originationFeeAmt + flatFees;
      const netFundsReceived = p - totalFees;

      const totalCost = totalInterest + totalFees;

      // Calculate Effective APR using binary search for IRR
      let effectiveApr = 0;
      if (netFundsReceived > 0 && netFundsReceived < totalPayments) {
        let lowRate = 0.0;
        let highRate = 1.0; // 100% monthly
        let midRate = 0.0;
        const targetPV = netFundsReceived;

        for (let i = 0; i < 50; i++) {
          midRate = (lowRate + highRate) / 2;
          
          let calculatedPV = 0;
          if (midRate === 0) {
            calculatedPV = monthlyPayment * n;
          } else {
            const factor = Math.pow(1 + midRate, n);
            calculatedPV = monthlyPayment * ((factor - 1) / (midRate * factor));
          }

          if (calculatedPV > targetPV) {
            // Present Value is too high, meaning rate is too low
            lowRate = midRate;
          } else {
            // Present value is too low, meaning rate is too high
            highRate = midRate;
          }
        }
        effectiveApr = midRate * 12 * 100;
      }

      setResult({
        monthlyPayment,
        totalInterest,
        totalFees,
        netFundsReceived,
        totalCost,
        effectiveApr,
        totalPayments
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-gray-900 border-b pb-4">
        Business Loan Calculator
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Calculate your true monthly payment and discover the hidden Effective APR when origination fees and closing costs are factored into a commercial loan.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* Input Form */}
        <div className="lg:col-span-7 bg-gray-50 p-6 rounded-xl border border-gray-200">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Commercial Loan Terms</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Gross Loan Amount ($)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 font-bold">$</span>
                <input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  className="pl-8 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border text-lg font-medium"
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
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border text-lg font-medium"
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 font-bold">%</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Loan Term (Months)
              </label>
              <select
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border text-lg font-medium bg-white"
              >
                <option value="12">12 Months (1 yr)</option>
                <option value="24">24 Months (2 yrs)</option>
                <option value="36">36 Months (3 yrs)</option>
                <option value="60">60 Months (5 yrs)</option>
                <option value="120">120 Months (10 yrs)</option>
                <option value="300">300 Months (25 yrs SBA)</option>
              </select>
            </div>
            
            <h3 className="col-span-1 md:col-span-2 font-bold text-gray-700 border-b border-gray-200 mt-4 pb-2">Business Fees</h3>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Origination Fee (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.25"
                  value={originationFeePct}
                  onChange={(e) => setOriginationFeePct(e.target.value)}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border text-lg font-medium"
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 font-bold">%</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Other Closing Costs ($)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 font-bold">$</span>
                <input
                  type="number"
                  value={otherFees}
                  onChange={(e) => setOtherFees(e.target.value)}
                  className="pl-8 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border text-lg font-medium"
                />
              </div>
            </div>
          </div>

          <button
            onClick={calculateLoan}
            className="mt-8 w-full bg-indigo-600 text-white font-bold py-4 px-4 rounded-xl hover:bg-indigo-700 transition shadow-lg text-lg uppercase tracking-wide"
          >
            Calculate Loan Breakdown
          </button>
        </div>

        {/* Results Sidebar */}
        <div className="lg:col-span-5 bg-indigo-50 rounded-xl p-8 border border-indigo-200 shadow-inner flex flex-col justify-center">
          {result !== null ? (
            <div>
              <h2 className="text-xl font-bold text-indigo-900 mb-2 text-center">
                Monthly Loan Payment
              </h2>
              <div className="text-4xl sm:text-5xl font-black text-center text-indigo-700 mb-6 pb-6 border-b border-indigo-200">
                ${result.monthlyPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>

              <div className="mb-6 p-4 bg-white rounded-xl shadow-sm border border-indigo-100 text-center">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Effective Annual Percentage Rate (APR)</h3>
                <div className="text-3xl font-black text-indigo-600">
                  {result.effectiveApr.toFixed(2)}%
                </div>
                <p className="text-xs text-indigo-400 mt-1 font-medium">True borrowing cost reflecting upfront fees</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm md:text-base border-b border-indigo-100 pb-2">
                  <span className="font-semibold text-gray-600">Gross Loan Amount</span>
                  <span className="font-bold text-gray-800">
                    ${parseFloat(loanAmount).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm md:text-base border-b border-indigo-100 pb-2">
                  <span className="font-semibold text-gray-600">Total Upfront Fees</span>
                  <span className="font-bold text-red-500">
                    -${result.totalFees.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between items-center text-base border-b border-indigo-200 pb-2 text-indigo-900 font-bold bg-indigo-100 p-2 rounded">
                  <span>Net Funds Received</span>
                  <span>
                    ${result.netFundsReceived.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </span>
                </div>
                
                <div className="flex justify-between items-center text-sm md:text-base border-b border-indigo-100 pb-2 pt-2">
                  <span className="font-semibold text-gray-600">Total Interest Paid</span>
                  <span className="font-bold text-orange-600">
                    ${result.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="flex justify-between items-center text-base font-bold pt-2 text-gray-900">
                  <span>Total Cost of Loan</span>
                  <span>
                    ${result.totalCost.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-indigo-800 opacity-60 font-medium my-auto p-4">
              Enter your desired loan amount and the lender's origination fees to reveal your true Effective APR.
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title={businessLoanSeoData.title}
        whatIsIt={businessLoanSeoData.whatIsIt}
        formula={businessLoanSeoData.formula}
        example={businessLoanSeoData.example}
        useCases={businessLoanSeoData.useCases}
        faqs={businessLoanSeoData.faqs}
        deepDive={businessLoanSeoData.deepDive}
        glossary={businessLoanSeoData.glossary}
        relatedCalculators={[
          {
            name: "Amortization",
            path: "/amortization-calculator/",
            desc: "View the exact month-by-month principal payoff schedule for your business loan.",
          },
          {
            name: "Debt Consolidation",
            path: "/debt-consolidation-calculator/",
            desc: "See if you can save money by refinancing multiple expensive bridging loans into one SBA loan.",
          },
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
        ]}
      />
    </div>
  );
}
