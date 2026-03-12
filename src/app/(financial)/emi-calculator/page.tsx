"use client";

import { useState, useEffect } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function EMICalculator() {
  const [principal, setPrincipal] = useState("100000");
  const [rate, setRate] = useState("10");
  const [tenure, setTenure] = useState("2");
  const [tenureUnit, setTenureUnit] = useState("years");

  const [result, setResult] = useState<{
    emi: number;
    totalInterest: number;
    totalAmount: number;
  } | null>(null);

  useEffect(() => {
    calculateEMI();
  }, [principal, rate, tenure, tenureUnit]);

  const calculateEMI = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 12 / 100;
    let n = parseFloat(tenure);

    if (tenureUnit === "years") {
      n = n * 12;
    }

    if (p > 0 && n > 0) {
      let emi = 0;
      if (r > 0) {
        emi = p * r * (Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1));
      } else {
        emi = p / n;
      }

      const totalAmount = emi * n;
      const totalInterest = totalAmount - p;

      setResult({
        emi,
        totalInterest,
        totalAmount,
      });
    } else {
      setResult(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-black mb-4 text-indigo-900 tracking-tight flex items-center justify-center">
          <span className="mr-3">📊</span> EMI Calculator
        </h1>
        <p className="text-indigo-700 text-lg">
          Calculate your Equated Monthly Installment for Home, Car, or Personal Loans.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Input UI */}
        <div className="space-y-6 bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
          <div>
            <label className="block text-xs font-bold text-zinc-500 mb-2 uppercase tracking-widest">
              Loan Amount (Principal)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-zinc-400">$</span>
              <input
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                className="w-full rounded-xl border-zinc-300 p-4 pl-10 shadow-sm focus:border-indigo-500 font-bold text-xl text-zinc-800 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-500 mb-2 uppercase tracking-widest">
              Interest Rate (Annual)
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                className="w-full rounded-xl border-zinc-300 p-4 pr-10 shadow-sm focus:border-indigo-500 font-bold text-xl text-zinc-800 transition-all"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-zinc-400">%</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-500 mb-2 uppercase tracking-widest">
                Tenure
              </label>
              <input
                type="number"
                value={tenure}
                onChange={(e) => setTenure(e.target.value)}
                className="w-full rounded-xl border-zinc-300 p-4 shadow-sm focus:border-indigo-500 font-bold text-xl text-zinc-800 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-500 mb-2 uppercase tracking-widest">
                Duration
              </label>
              <select
                value={tenureUnit}
                onChange={(e) => setTenureUnit(e.target.value)}
                className="w-full rounded-xl border-zinc-300 p-4 shadow-sm focus:border-indigo-500 font-bold text-xl text-zinc-800 transition-all appearance-none bg-zinc-50"
              >
                <option value="years">Years</option>
                <option value="months">Months</option>
              </select>
            </div>
          </div>
        </div>

        {/* Output UI */}
        <div className="h-full">
          {result ? (
            <div className="bg-indigo-950 rounded-2xl p-8 text-white shadow-2xl relative overflow-hidden h-full flex flex-col justify-center border border-indigo-800">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>
              
              <div className="text-center mb-8 relative z-10">
                <h2 className="text-indigo-300 font-bold uppercase tracking-widest text-xs mb-2">
                  Monthly EMI Payment
                </h2>
                <div className="text-6xl font-black tracking-tight mb-2 flex items-center justify-center">
                   <span className="text-3xl text-indigo-400 mr-2">$</span>
                   {result.emi.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>

              <div className="space-y-4 relative z-10 w-full">
                <div className="bg-indigo-900/60 p-4 rounded-xl border border-indigo-700/50 flex justify-between items-center shadow-inner">
                  <span className="text-indigo-200 text-xs font-bold uppercase tracking-widest">Total Interest</span>
                  <span className="text-2xl font-bold font-mono text-rose-400">
                    ${result.totalInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="bg-indigo-900/60 p-4 rounded-xl border border-indigo-700/50 flex justify-between items-center shadow-inner">
                  <span className="text-indigo-200 text-xs font-bold uppercase tracking-widest">Total Amount</span>
                  <span className="text-2xl font-bold font-mono text-indigo-100">
                    ${result.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full border-2 border-dashed border-zinc-300 rounded-2xl flex items-center justify-center p-8 text-center bg-zinc-100/50">
              <p className="text-zinc-400 font-medium italic">
                Enter loan variables to see your calculated EMI dashboard.
              </p>
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title="EMI Calculator"
        whatIsIt={
          <>
            <p>
              An <strong>EMI Calculator</strong> (Equated Monthly Installment) is a mathematical tool used to calculate the fixed amount you will pay to a bank or financier until your loan is fully paid off. It consists of both the principal amount being repaid and the interest charged by the lender.
            </p>
            <p>
              Using an EMI calculator helps you visualize the financial impact of a loan on your monthly budget, allowing you to choose a loan tenure and interest rate that aligns with your income.
            </p>
          </>
        }
        formula={
          <>
            <p>The EMI is calculated using the standard mathematical formula for amortized payments:</p>
            <div className="bg-white p-4 rounded-lg font-mono text-center text-lg shadow-sm my-4 border border-zinc-200 text-zinc-900 overflow-x-auto">
              <strong>EMI = [P x R x (1+R)ⁿ] / [(1+R)ⁿ - 1]</strong>
            </div>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-zinc-700">
              <li><strong>P:</strong> Principal Loan Amount</li>
              <li><strong>R:</strong> Monthly Interest Rate (Annual Rate / 12 / 100)</li>
              <li><strong>n:</strong> Loan Tenure in months</li>
            </ul>
          </>
        }
        example={
          <>
            <p>Consider taking a home loan of <strong>$100,000</strong> at a <strong>10% annual interest rate</strong> for a tenure of <strong>2 years (24 months)</strong>:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-zinc-700">
              <li><strong>P</strong> = 100,000</li>
              <li><strong>R</strong> = 10 / 12 / 100 = 0.00833</li>
              <li><strong>n</strong> = 24</li>
              <li><strong>Result:</strong> Your monthly EMI will be <strong>$4,614.49</strong>.</li>
              <li>The total interest paid will be <strong>$10,747.83</strong>.</li>
            </ul>
          </>
        }
        useCases={
          <ul className="list-disc pl-6 space-y-4 text-zinc-700">
            <li><strong>Home Loan Planning:</strong> Calculate long-term affordability for 15, 20, or 30-year mortgages.</li>
            <li><strong>Car Loan Estimations:</strong> Determine for how many years you should finance your vehicle to keep your EMI under a specific limit.</li>
            <li><strong>Personal Debt Management:</strong> See how interest-heavy high-APR personal loans are before signing the contract.</li>
          </ul>
        }
        faqs={[
          {
            question: "What does 'Equated' mean in EMI?",
            answer: "'Equated' means that your monthly payment remains the same throughout the entire tenure of the loan. In the early years, a larger portion of the EMI goes toward interest, while in the later years, most of it goes toward principal repayment."
          },
          {
            question: "How does tenure affect the total cost?",
            answer: "A longer tenure reduces your monthly EMI, making it easier on your wallet today. However, it significantly increases the total interest you pay to the bank. A shorter tenure is always mathematically cheaper in the long run."
          },
          {
            question: "Can I use this for fixed-rate and floating-rate loans?",
            answer: "This calculator is perfect for fixed-rate loans. For floating-rate loans, the EMI will change whenever the benchmark interest rate changes, so this tool should be used to estimate your current or starting payment."
          }
        ]}
        relatedCalculators={[
          { name: "Loan Payment Calculator", path: "/loan-payment-calculator", desc: "General term loan payment estimator." },
          { name: "Amortization Calculator", path: "/amortization-calculator", desc: "See your month-by-month debt reduction." },
          { name: "Mortgage Calculator", path: "/mortgage-calculator", desc: "Estimate payments including property taxes and insurance." },
            {
              name: "ROI Calculator",
              path: "/roi-calculator",
              desc: "Calculate your exact annualized percentage returns.",
            }]}
      />
    </div>
  );
}
