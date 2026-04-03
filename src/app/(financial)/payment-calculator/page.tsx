"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function PaymentCalculator() {
  const [loanAmount, setLoanAmount] = useState("10000");
  const [loanTerm, setLoanTerm] = useState("60"); // Months
  const [interestRate, setInterestRate] = useState("6.0");

  const [result, setResult] = useState<{
    monthlyPayment: number;
    totalInterestPaid: number;
    totalCost: number;
  } | null>(null);

  const calculatePayment = () => {
    const pPrincipal = parseFloat(loanAmount) || 0;
    const pTerm = parseInt(loanTerm) || 0;
    const pRate = (parseFloat(interestRate) || 0) / 100 / 12;

    if (pPrincipal > 0 && pTerm > 0) {
      let monthly = 0;
      if (pRate === 0) {
        monthly = pPrincipal / pTerm;
      } else {
        monthly =
          (pPrincipal * pRate * Math.pow(1 + pRate, pTerm)) /
          (Math.pow(1 + pRate, pTerm) - 1);
      }

      const totalInt = monthly * pTerm - pPrincipal;
      const tCost = pPrincipal + totalInt;

      setResult({
        monthlyPayment: monthly,
        totalInterestPaid: totalInt,
        totalCost: tCost,
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-gray-900 border-b pb-4">
        Payment Calculator
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Calculate your monthly payments for any type of fixed-term loan
        (personal, auto, or mortgage).
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Form */}
        <div className="lg:col-span-7 bg-gray-50 p-6 rounded-xl border border-gray-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Loan Amount ($)
              </label>
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm p-4 border focus:border-green-500 focus:ring-green-500 font-bold text-xl"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Loan Term (Months)
              </label>
              <input
                type="number"
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm p-3 border focus:border-green-500 focus:ring-green-500 font-medium"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Interest Rate (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm p-3 border focus:border-green-500 focus:ring-green-500 font-medium"
              />
            </div>
          </div>

          <button
            onClick={calculatePayment}
            className="mt-8 w-full bg-green-600 text-white font-bold py-4 px-4 rounded-xl hover:bg-green-700 transition shadow-lg text-lg uppercase tracking-wide"
          >
            Calculate Monthly Payment
          </button>
        </div>

        {/* Results Screen */}
        <div className="lg:col-span-5 bg-green-50 rounded-xl p-8 border border-green-200 shadow-inner flex flex-col justify-center">
          {result !== null ? (
            <div>
              <h2 className="text-xl font-bold text-green-900 mb-2 text-center">
                Monthly Payment
              </h2>
              <div className="text-4xl sm:text-5xl font-black text-center text-green-700 mb-8 pb-8 border-b border-green-200">
                ${result.monthlyPayment.toFixed(2)}
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-lg">
                  <span className="text-gray-600">Total Principal</span>
                  <span className="font-bold text-gray-800">
                    ${parseFloat(loanAmount).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-lg">
                  <span className="text-gray-600">Total Interest Paid</span>
                  <span className="font-bold text-red-600">
                    ${result.totalInterestPaid.toFixed(2)}
                  </span>
                </div>
                <div className="mt-4 pt-4 border-t border-green-200 flex justify-between items-center text-xl font-bold">
                  <span className="text-gray-800">Total Cost of Loan</span>
                  <span className="text-green-900">
                    ${result.totalCost.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-green-800 opacity-60 font-medium">
              Complete the form and click calculate to see your detailed
              breakdown here.
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
            name: "Payment Calculator",
            operatingSystem: "All",
            applicationCategory: "FinanceApplication",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

      <CalculatorSEO
        title="Payment Calculator"
        whatIsIt={
          <>
            <p>
              Our <strong>Payment Calculator</strong> is a versatile financial
              tool that instantly determines your monthly payment for any
              standard amortized loan. Whether you are taking out a personal
              loan for a wedding, consolidating high-interest credit card debt,
              or securing a business loan, this tool calculates exactly what you
              will owe every month.
            </p>
            <p>
              Unlike specialized calculators that include property taxes or auto
              dealer fees, this generic payment calculator focuses purely on the
              math of borrowing principal over a set number of months at a
              specific interest rate.
            </p>

            <p className="mt-4 text-sm text-gray-500">
              <strong>Related Terms:</strong> Loan Calculator, Personal Loan
              Calculator, Business Loan Calculator, Loan Repayment Calculator,
              Borrowing Power Calculator, Student Loan Calculator, Loan Payment
              Calculator, Boat Loan Calculator, Repayment Calculator, Payment
              Calculator, Commercial Loan Calculator, Monthly Payment
              Calculator, Personal Loan Repayment Calculator, Down Payment
              Calculator, Land Loan Calculator
            </p>
          </>
        }
        formula={
          <>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 font-mono text-lg text-indigo-700 text-center shadow-sm my-6">
              Payment Analysis Model
            </div>
            <p className="text-sm text-slate-500 text-center">
              This tool utilize standardized mathematical formulas and logic to calculate precise Payment results.
            </p>
          </>
        }
        example={
          <>
            <p>
              Let's say you take out a <strong>$10,000</strong> personal loan to
              consolidate debt.
            </p>
            <p>
              The bank approves you for a <strong>60-month term</strong> (5
              years) at an <strong>8.5% annual interest rate</strong>.
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>
                <strong>Principal:</strong> $10,000
              </li>
              <li>
                <strong>Monthly Payment:</strong> Using the formula, your
                payment is <strong>$205.17</strong>.
              </li>
              <li>
                <strong>Total Interest Paid:</strong> Over 60 months, you will
                pay $205.17 * 60 = $12,310.20 total, meaning you paid{" "}
                <strong>$2,310.20</strong> in pure interest.
              </li>
            </ul>
          </>
        }
        useCases={
          <ul className="list-disc pl-6 space-y-4">
            <li>
              <strong>Personal Loans:</strong> Figuring out if you can afford
              the monthly payments before taking out a loan for home renovations
              or medical expenses.
            </li>
            <li>
              <strong>Debt Consolidation:</strong> Comparing your current total
              minimum monthly credit card payments against a single, fixed-rate
              consolidation loan payment.
            </li>
            <li>
              <strong>Business Financing:</strong> Entrepreneurs estimating the
              monthly cash-flow impact of taking out a small business equipment
              loan.
            </li>
            <li>
              <strong>Student Loans:</strong> Calculating what your standard
              10-year repayment plan will cost once your grace period ends.
            </li>
          </ul>
        }
        faqs={[
          {
            question: "What is an amortized loan?",
            answer:
              "An amortized loan is a loan with scheduled, periodic payments that are applied to both principal and interest. An amortized loan payment pays off the relevant interest for the period before any principal is reduced.",
          },
          {
            question: "How does the interest rate affect my payment?",
            answer:
              "The interest rate has a massive impact on your monthly payment and your total cost. A higher interest rate means a larger portion of your early monthly payments goes directly to the bank rather than paying down your actual debt.",
          },
          {
            question: "Can I use this for credit cards?",
            answer:
              "You can use this calculator to see what it would take to pay off a credit card in a specific number of months with fixed payments. However, credit cards are revolving debt, meaning minimum payments fluctuate based on the balance. For a fixed payoff plan, this calculator works perfectly.",
          },
          {
            question: "Is it better to have a shorter loan term?",
            answer:
              "Financially, yes. A shorter loan term increases your monthly payment but drastically reduces the total amount of interest you pay to the lender over the life of the loan.",
          },
        ]}
        relatedCalculators={[
          {
            name: "Amortization Calculator",
            path: "/amortization-calculator/",
            desc: "View a complete month-by-month breakdown of your loan payoff schedule.",
          },
          {
            name: "Auto Loan Calculator",
            path: "/auto-loan-calculator/",
            desc: "Calculate your exact monthly car payment including dealer fees and taxes.",
          },
          {
            name: "Debt Payoff Calculator",
            path: "/debt-payoff-calculator/",
            desc: "Compare the avalanche vs snowball methods for paying off multiple debts.",
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
