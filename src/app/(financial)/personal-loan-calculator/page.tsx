"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function PersonalLoanCalculator() {
  const [loanAmount, setLoanAmount] = useState("10000");
  const [loanTerm, setLoanTerm] = useState("36"); // months
  const [interestRate, setInterestRate] = useState("9.5"); // APY

  const [result, setResult] = useState<{
    monthlyPayment: number;
    totalInterest: number;
    totalPaid: number;
  } | null>(null);

  const calculateLoan = () => {
    const p = parseFloat(loanAmount);
    const n = parseInt(loanTerm);
    const r = parseFloat(interestRate) / 100 / 12; // monthly rate

    if (!isNaN(p) && !isNaN(n) && !isNaN(r) && n > 0 && p > 0) {
      let m = 0;
      if (r > 0) {
        m = p * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      } else {
        m = p / n; // 0% interest case
      }

      const total = m * n;
      const interest = total - p;

      setResult({
        monthlyPayment: m,
        totalInterest: interest,
        totalPaid: total,
      });
    } else {
        setResult(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-gray-900 border-b pb-4">
        Personal Loan Calculator
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Determine exactly how much your monthly payment will be and how much interest you'll owe over the total life of an unsecured bank loan.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Loan Amount ($):
              </label>
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 p-3 border text-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Loan Term (Months):
              </label>
              <input
                type="number"
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 p-3 border text-lg"
              />
              <p className="text-xs text-gray-500 mt-1">E.g. 3 years = 36 months.</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Interest Rate (APR %):
              </label>
              <input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 p-3 border text-lg"
              />
            </div>
          </div>

          <button
            onClick={calculateLoan}
            className="mt-8 w-full bg-cyan-600 text-white font-bold py-4 rounded-xl hover:bg-cyan-700 transition shadow-lg text-lg uppercase tracking-wide"
          >
            Calculate Payments
          </button>
        </div>

        <div className="bg-cyan-50 rounded-xl p-8 border border-cyan-200 shadow-inner flex flex-col justify-center relative">
          {result !== null ? (
            <div className="w-full">
                <div className="text-sm text-gray-500 font-bold uppercase mb-2 text-center tracking-wider text-cyan-800">
                    Monthly Payment
                </div>
                <div className="text-5xl md:text-6xl font-black text-center text-cyan-700 bg-white py-6 rounded-lg shadow-sm border border-cyan-100 mb-6">
                    ${result.monthlyPayment.toFixed(2)}
                </div>

                <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm bg-white p-3 rounded shadow-sm border border-gray-100">
                      <span className="text-gray-600 font-semibold">Principal Borrowed:</span>
                      <span className="font-bold text-gray-800">
                         ${parseFloat(loanAmount).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-sm bg-white p-3 rounded shadow-sm border border-rose-100 text-rose-800">
                      <span className="font-semibold">Total Interest Paid:</span>
                      <span className="font-bold">
                         + ${result.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-sm bg-cyan-100 p-3 rounded shadow-sm border border-cyan-200 text-cyan-900 border-t-2">
                      <span className="font-extrabold">Total Cost of Loan:</span>
                      <span className="font-black">
                         ${result.totalPaid.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                      </span>
                    </div>
                </div>
            </div>
          ) : (
             <div className="text-center text-cyan-800 opacity-60 font-medium">
                Input your loan scenario to generate an exact amortization profile.
             </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title="Personal Loan Calculator"
        whatIsIt={
          <>
            <p>
              The <strong>Personal Loan Calculator</strong> utilizes standard amortization math to determine exact monthly payments for unsecured consumer loans (like those from SoFi, LightStream, or local credit unions).
            </p>
          </>
        }
        formula={<></>}
        example={
          <>
            <p>If you take out a <strong>$10,000</strong> medical loan at <strong>9.5% APR</strong> over <strong>3 years (36 months)</strong>:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
              <li>Your fixed monthly payment will be exactly <strong>$320.33</strong></li>
              <li>You will pay exactly $1,531.88 in total interest to the bank.</li>
            </ul>
          </>
        }
        useCases={<ul className="list-disc pl-6 space-y-4"><li><strong>Debt Consolidation Validation:</strong> Use this tool to see what the payment would be if you rolled $20,000 of 22% credit card debt into a single 3-year personal loan at 10% APR.</li></ul>}
        faqs={[
            {
              question: "How accurate is this calculator?",
              answer: "Our calculator uses industry-standard formulas to provide the most accurate results possible. However, it should be used for informational purposes only and not as a basis for formal calculations or legal advice.",
            },
            {
              question: "Is this tool free to use?",
              answer: "Yes, all our calculators are 100% free to use. We do not require any registration, personal information, or subscriptions.",
            },
            {
              question: "Can I use this on my mobile device?",
              answer: "Absolutely! Our website is fully responsive and optimized for all screen sizes, including smartphones and tablets, so you can calculate on the go.",
            }]}
        relatedCalculators={[
            {
              name: "Mortgage Calculator",
              path: "/mortgage-calculator",
              desc: "Calculate your monthly mortgage payments and amortization schedule.",
            },
            {
              name: "ROI Calculator",
              path: "/roi-calculator",
              desc: "Calculate your exact annualized percentage returns.",
            },
            {
              name: "Investment Calculator",
              path: "/investment-calculator",
              desc: "Project your portfolio growth over time with compound interest.",
            },
            {
              name: "Loan Payment Calculator",
              path: "/loan-payment-calculator",
              desc: "Estimate your monthly loan payments and total interest cost.",
            }]}
      />
    </div>
  );
}
