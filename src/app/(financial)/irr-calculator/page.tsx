"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function IRRCalculator() {
  const [initialInvestment, setInitialInvestment] = useState("100000");
  const [cashFlows, setCashFlows] = useState("20000, 30000, 40000, 50000"); // CSV

  const [result, setResult] = useState<{
    irr: number;
    totalProfit: number;
    years: number;
  } | null>(null);

  // IRR Calculation using Newton's Method (Simplified heuristic)
  const calculateIRR = () => {
    const initial = -Math.abs(parseFloat(initialInvestment));
    const flows = cashFlows.split(',').map(f => parseFloat(f.trim())).filter(f => !isNaN(f));

    if (isNaN(initial) || flows.length === 0) {
      setResult(null);
      return;
    }

    const allFlows = [initial, ...flows];
    
    // Newton's method for IRR
    let guess = 0.1; // 10%
    const maxIterations = 1000;
    const precision = 0.00001;

    for (let i = 0; i < maxIterations; i++) {
        let f = 0;
        let df = 0;
        for (let t = 0; t < allFlows.length; t++) {
            f += allFlows[t] / Math.pow(1 + guess, t);
            df -= t * allFlows[t] / Math.pow(1 + guess, t + 1);
        }
        
        const newGuess = guess - f / df;
        if (Math.abs(newGuess - guess) < precision) {
            setResult({
                irr: newGuess * 100,
                totalProfit: flows.reduce((a, b) => a + b, 0) + initial,
                years: flows.length
            });
            return;
        }
        guess = newGuess;
    }

    setResult(null); // No convergence
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-gray-900 border-b pb-4">
        IRR Calculator
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Calculate the Internal Rate of Return (IRR) to find the annualized percent growth rate of an investment based on periodic cash flows.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Initial Outlay ($):</label>
              <input type="number" value={initialInvestment} onChange={(e) => setInitialInvestment(e.target.value)} className="w-full rounded border-gray-300 p-3 shadow-sm focus:ring-indigo-500 border" placeholder="e.g. 100000" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Annual Cash Flows (Comma Separated):</label>
              <textarea 
                value={cashFlows} 
                onChange={(e) => setCashFlows(e.target.value)} 
                className="w-full h-24 rounded border-gray-300 p-3 shadow-sm focus:ring-indigo-500 border text-sm"
                placeholder="20000, 30000, 40000"
              />
              <p className="text-xs text-gray-500 mt-2">Enter the expected cash received each year, separated by commas.</p>
            </div>
          </div>

          <button
            onClick={calculateIRR}
            className="mt-8 w-full bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-700 transition shadow-lg text-lg uppercase"
          >
            Calculate Yield
          </button>
        </div>

        <div className="bg-indigo-50 rounded-xl p-8 border border-indigo-200 shadow-inner flex flex-col justify-center">
          {result !== null ? (
            <div className="text-center w-full">
                <span className="block text-xs font-bold text-indigo-700 uppercase mb-2 tracking-widest">Internal Rate of Return</span>
                <div className="text-7xl font-black text-indigo-900 bg-white py-8 rounded-2xl shadow-sm border border-indigo-100 mb-6">
                    {result.irr.toFixed(2)}%
                </div>
                
                <div className="space-y-3">
                    <div className="flex justify-between bg-white px-4 py-2 rounded shadow-sm text-sm">
                        <span className="text-gray-500">Total Net Profit:</span>
                        <span className="font-bold text-green-700">${result.totalProfit.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between bg-white px-4 py-2 rounded shadow-sm text-sm">
                        <span className="text-gray-500">Investment Horizon:</span>
                        <span className="font-bold text-gray-800">{result.years} Years</span>
                    </div>
                </div>
            </div>
          ) : (
             <div className="text-center text-indigo-800 opacity-60 font-medium">
                Input your investment sequence to see the true annualized performance percent.
             </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title="IRR Calculator"
        whatIsIt={
          <>
            <p>
              The <strong>IRR Calculator</strong> (Internal Rate of Return) identifies the discount rate that makes the net present value (NPV) of all cash flows from a particular project equal to zero. In plain English, it indicates the expected growth rate that an investment generates.
            </p>
          </>
        }
        formula={<></>}
        example={
          <>
            <p>If you invest $100,000 today and receive $50,000 in year one and $60,000 in year two:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
              <li>Year 0: -$100,000</li>
              <li>Year 1: +$50,000</li>
              <li>Year 2: +$60,000</li>
              <li><strong>IRR: Approximately 6.4%</strong></li>
            </ul>
          </>
        }
        useCases={<ul className="list-disc pl-6 space-y-4"><li><strong>Project Feasibility:</strong> Businesses use IRR to decide between capital projects. If a new factory has an IRR of 12% but the cost of borrowing capital is 15%, the project is mathematically rejected.</li></ul>}
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
