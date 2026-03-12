"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function CDCalculator() {
  const [initialDeposit, setInitialDeposit] = useState("10000");
  const [apy, setApy] = useState("5.0");
  const [term, setTerm] = useState("12"); // months
  const [compounding, setCompounding] = useState("monthly");

  const [result, setResult] = useState<{
    futureValue: number;
    interestEarned: number;
    apyEffective: number;
  } | null>(null);

  const calculateCD = () => {
    const principal = parseFloat(initialDeposit);
    const rate = parseFloat(apy) / 100;
    const months = parseFloat(term);

    if (!isNaN(principal) && principal > 0) {
      let n = 12; // default monthly
      if (compounding === "annually") n = 1;
      else if (compounding === "daily") n = 365;
      else if (compounding === "quarterly") n = 4;

      const t = months / 12;
      const futureValue = principal * Math.pow(1 + rate/n, n * t);

      setResult({
        futureValue: futureValue,
        interestEarned: futureValue - principal,
        apyEffective: (Math.pow(1 + rate/n, n) - 1) * 100
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-gray-900 border-b pb-4">
        CD Investment Calculator
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Compare risk-free yields. Project exactly how much interest you will earn on a Certificate of Deposit (CD) over its term.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Initial Deposit ($):</label>
              <input type="number" value={initialDeposit} onChange={(e) => setInitialDeposit(e.target.value)} className="w-full rounded border-gray-300 p-3 shadow-sm focus:ring-blue-500" />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">APY (%):</label>
                  <input type="number" value={apy} onChange={(e) => setApy(e.target.value)} className="w-full rounded border-gray-300 p-3 shadow-sm" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Months:</label>
                  <input type="number" value={term} onChange={(e) => setTerm(e.target.value)} className="w-full rounded border-gray-300 p-3 shadow-sm" />
                </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1 tracking-widest">Compounding Frequency</label>
              <select value={compounding} onChange={(e) => setCompounding(e.target.value)} className="w-full rounded border-gray-300 p-3 text-sm font-medium">
                <option value="daily">Daily</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="annually">Annually</option>
              </select>
            </div>
          </div>

          <button
            onClick={calculateCD}
            className="mt-8 w-full bg-blue-700 text-white font-bold py-4 rounded-xl hover:bg-blue-800 transition shadow-lg text-lg uppercase"
          >
            Calculate Interest
          </button>
        </div>

        <div className="flex flex-col justify-center space-y-4">
          {result !== null ? (
            <>
                <div className="bg-blue-50 p-6 rounded-2xl border-2 border-blue-100 text-center shadow-inner relative">
                    <div className="absolute top-2 right-4 text-[10px] font-black text-blue-300 uppercase">Principal + Interest</div>
                    <span className="block text-xs font-bold text-blue-600 uppercase mb-2 tracking-widest">Maturity Value</span>
                    <div className="text-6xl font-black text-blue-900 mb-2">
                        ${result.futureValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </div>
                </div>

                <div className="bg-white border-2 border-gray-100 p-6 rounded-2xl flex items-center justify-between shadow-sm">
                    <div>
                        <span className="block text-[10px] font-bold text-gray-400 uppercase">Interest Earned</span>
                        <div className="text-3xl font-black text-green-600">${result.interestEarned.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
                    </div>
                    <div className="text-right">
                        <span className="block text-[10px] font-bold text-gray-400 uppercase">Eff. Yield</span>
                        <div className="text-xl font-bold text-gray-900">{result.apyEffective.toFixed(4)}%</div>
                    </div>
                </div>
            </>
          ) : (
             <div className="h-48 border-2 border-dashed border-gray-100 rounded-3xl flex items-center justify-center p-8 text-center text-gray-300 font-medium italic">
                Get a exact dollar amount for your fixed-rate certificate of deposit.
             </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title="CD Calculator"
        whatIsIt={
          <>
            <p>
              The <strong>CD Calculator</strong> is a tool to determine the future value of a Certificate of Deposit. CDs are time-bound deposits that typically offer higher interest rates than standard savings accounts in exchange for "locking" your money for a set period.
            </p>
          </>
        }
        formula={
          <>
            <p className="font-mono bg-gray-50 p-4 rounded-lg text-sm mb-2">A = P(1 + r/n)^(nt)</p>
          </>
        }
        example={
          <>
            <p>If you deposit $10,000 into a 12-month CD with a 5% APY:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
              <li>Maturity Value: <strong>$10,511.62</strong> (with monthly compounding).</li>
              <li>Profit: $511.62 in virtually risk-free interest.</li>
            </ul>
          </>
        }
        useCases={<ul className="list-disc pl-6 space-y-4"><li><strong>Laddering Strategy:</strong> Use this tool to plan a "CD Ladder," where you invest in multiple CDs with different maturity dates (e.g., 6 months, 12 months, 18 months) to balance high yields with liquidity needs.</li></ul>}
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
