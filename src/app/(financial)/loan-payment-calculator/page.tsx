"use client";

import { useState, useEffect } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import loanSeoData from "@/data/seo-content/official/loan-payment-calculator.json";

export default function LoanPaymentCalculator() {
  const [loanAmount, setLoanAmount] = useState("30000");
  const [loanTerm, setLoanTerm] = useState("60");
  const [interestRate, setInterestRate] = useState("7.5");
  const [termUnit, setTermUnit] = useState("months");

  const [result, setResult] = useState<{
    monthlyPayment: number;
    totalInterest: number;
    totalPaid: number;
  } | null>(null);

  useEffect(() => {
    calculatePayment();
  }, [loanAmount, loanTerm, interestRate, termUnit]);

  const calculatePayment = () => {
    const p = parseFloat(loanAmount);
    const r = parseFloat(interestRate) / 100 / 12;
    let n = parseFloat(loanTerm);

    if (termUnit === "years") {
      n = n * 12;
    }

    if (p > 0 && n > 0) {
      let m = 0;
      if (r > 0) {
        m = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      } else {
        m = p / n;
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
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-2xl shadow-xl border border-blue-50">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold mb-4 text-blue-900 tracking-tight">
          Loan Payment Calculator
        </h1>
        <p className="text-blue-600 text-lg">
          Determine your monthly loan payments and the total interest cost over time.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Left Col: Inputs */}
        <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 space-y-6">
          <div>
            <label className="block text-sm font-bold text-blue-800 mb-2 uppercase tracking-wider">
              Loan Amount
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 font-bold">$</span>
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                className="w-full bg-white rounded-xl border-blue-200 p-4 pl-8 shadow-sm focus:ring-2 focus:ring-blue-500 font-bold text-xl text-blue-900 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-blue-800 mb-2 uppercase tracking-wider">
              Interest Rate (APR)
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="w-full bg-white rounded-xl border-blue-200 p-4 shadow-sm focus:ring-2 focus:ring-blue-500 font-bold text-xl text-blue-900 transition-all"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-400 font-bold">%</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-blue-800 mb-2 uppercase tracking-wider">
                Loan Term
              </label>
              <input
                type="number"
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
                className="w-full bg-white rounded-xl border-blue-200 p-4 shadow-sm focus:ring-2 focus:ring-blue-500 font-bold text-xl text-blue-900 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-blue-800 mb-2 uppercase tracking-wider">
                Unit
              </label>
              <select
                value={termUnit}
                onChange={(e) => setTermUnit(e.target.value)}
                className="w-full bg-white rounded-xl border-blue-200 p-4 shadow-sm focus:ring-2 focus:ring-blue-500 font-bold text-xl text-blue-900 transition-all appearance-none"
              >
                <option value="months">Months</option>
                <option value="years">Years</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Col: Output */}
        <div className="flex flex-col justify-center">
          {result ? (
            <div className="bg-blue-900 rounded-2xl p-8 text-white shadow-2xl relative overflow-hidden h-full flex flex-col justify-center border border-blue-800">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400 rounded-full mix-blend-screen filter blur-[60px] opacity-20 pointer-events-none"></div>
              
              <div className="text-center mb-8 relative z-10">
                <h2 className="text-blue-300 font-bold uppercase tracking-widest text-xs mb-2">
                  Monthly Payment
                </h2>
                <div className="text-6xl font-black tracking-tighter">
                  ${result.monthlyPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>

              <div className="space-y-4 relative z-10 w-full">
                <div className="flex justify-between items-center bg-blue-800/50 p-4 rounded-xl border border-blue-700">
                  <span className="text-blue-200 text-sm font-semibold uppercase tracking-wide">Total Interest Paid</span>
                  <span className="text-xl font-bold font-mono text-blue-100">
                    ${result.totalInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between items-center bg-blue-800/50 p-4 rounded-xl border border-blue-700">
                  <span className="text-blue-200 text-sm font-semibold uppercase tracking-wide">Total Cost of Loan</span>
                  <span className="text-xl font-bold font-mono text-blue-100">
                    ${result.totalPaid.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full border-4 border-dashed border-blue-100 rounded-2xl flex items-center justify-center p-8 text-center bg-blue-50/20">
              <p className="text-blue-400 font-bold text-lg italic uppercase tracking-widest">
                Enter details to view your payment schedule
              </p>
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title={loanSeoData.title}
        whatIsIt={loanSeoData.whatIsIt}
        formula={loanSeoData.formula}
        example={loanSeoData.example}
        useCases={loanSeoData.useCases}
        faqs={loanSeoData.faqs}
        deepDive={loanSeoData.deepDive}
        glossary={loanSeoData.glossary}
        relatedCalculators={[
          {
            name: "Personal Loan Calculator",
            path: "/personal-loan-calculator/",
            desc: "Specialized for bank-issued signature loans.",
          },
          {
            name: "Debt Consolidation",
            path: "/debt-consolidation-calculator/",
            desc: "See if combining your bills into one loan saves you money.",
          },
          {
            name: "Auto Loan Calculator",
            path: "/auto-loan-calculator/",
            desc: "Calculates payments specifically for vehicle purchases.",
          },
          {
            name: "Amortization Table",
            path: "/amortization-calculator/",
            desc: "View the full month-by-month repayment schedule.",
          }
        ]}
      />
    </div>
  );
}
