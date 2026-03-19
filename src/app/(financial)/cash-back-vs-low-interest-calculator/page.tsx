"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function CashBackVsLowInterest() {
  const [carPrice, setCarPrice] = useState("35000");
  const [downPayment, setDownPayment] = useState("5000");
  const [loanTerm, setLoanTerm] = useState("60"); // months
  
  // Option A options
  const [cashBack, setCashBack] = useState("3000");
  const [standardRate, setStandardRate] = useState("5.5");
  
  // Option B options
  const [lowRate, setLowRate] = useState("0.9");

  const [result, setResult] = useState<{
    cashBackMonthly: number;
    cashBackTotalCost: number;
    cashBackTotalInterest: number;
    lowRateMonthly: number;
    lowRateTotalCost: number;
    lowRateTotalInterest: number;
    winner: "cashback" | "lowrate";
    savings: number;
  } | null>(null);

  const calculateComparison = () => {
    const price = parseFloat(carPrice);
    const down = parseFloat(downPayment);
    const term = parseInt(loanTerm);
    const rebate = parseFloat(cashBack);
    const standardApr = parseFloat(standardRate) / 100 / 12;
    const lowApr = parseFloat(lowRate) / 100 / 12;

    if (!isNaN(price) && !isNaN(term) && term > 0) {
      
      // OPTION A: Cash Back applied to down payment, financed at standard rate
      const principalA = price - down - rebate;
      let monthlyA = 0;
      let totalInterestA = 0;
      
      if (standardApr > 0) {
        monthlyA = principalA * (standardApr * Math.pow(1 + standardApr, term)) / (Math.pow(1 + standardApr, term) - 1);
        totalInterestA = (monthlyA * term) - principalA;
      } else {
        monthlyA = principalA / term;
      }
      const totalCostA = principalA + totalInterestA;

      // OPTION B: No Cash Back, financed at low rate
      const principalB = price - down;
      let monthlyB = 0;
      let totalInterestB = 0;

      if (lowApr > 0) {
        monthlyB = principalB * (lowApr * Math.pow(1 + lowApr, term)) / (Math.pow(1 + lowApr, term) - 1);
        totalInterestB = (monthlyB * term) - principalB;
      } else {
        monthlyB = principalB / term;
      }
      const totalCostB = principalB + totalInterestB; // we compare total cost out of pocket for the loan

      const winner = totalCostA < totalCostB ? "cashback" : "lowrate";
      const savings = Math.abs(totalCostB - totalCostA);

      setResult({
        cashBackMonthly: monthlyA,
        cashBackTotalCost: totalCostA, // cost of the financed portion
        cashBackTotalInterest: totalInterestA,
        lowRateMonthly: monthlyB,
        lowRateTotalCost: totalCostB,
        lowRateTotalInterest: totalInterestB,
        winner: winner,
        savings: savings,
      });
    } else {
      setResult(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-gray-900 border-b pb-4">
        Cash Back vs. Low Interest Calculator
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Dealerships often offer a choice between a cash rebate or promotional financing (like 0% APR). Find out which actually saves you the most money.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-4 bg-gray-50 p-6 rounded-xl border border-gray-200">
          
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Car Price ($):</label>
              <input type="number" value={carPrice} onChange={(e) => setCarPrice(e.target.value)} className="w-full rounded border-gray-300 p-2 shadow-sm focus:ring-violet-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Down/Trade-In ($):</label>
              <input type="number" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} className="w-full rounded border-gray-300 p-2 shadow-sm focus:ring-violet-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Loan Term (Months):</label>
              <input type="number" value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} className="w-full rounded border-gray-300 p-2 shadow-sm focus:ring-violet-500" />
            </div>

            <div className="pt-4 border-t border-gray-300">
                <h3 className="font-bold text-violet-800 mb-3 text-sm uppercase">Option A: Take The Rebate</h3>
                <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Cash Rebate Amount ($):</label>
                      <input type="number" value={cashBack} onChange={(e) => setCashBack(e.target.value)} className="w-full rounded border-gray-300 p-2" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Standard Bank APR (%):</label>
                      <input type="number" value={standardRate} onChange={(e) => setStandardRate(e.target.value)} className="w-full rounded border-gray-300 p-2" />
                    </div>
                </div>
            </div>

            <div className="pt-4 border-t border-gray-300">
                <h3 className="font-bold text-indigo-800 mb-3 text-sm uppercase">Option B: Promo Financing</h3>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Low Promo APR (%):</label>
                  <input type="number" value={lowRate} onChange={(e) => setLowRate(e.target.value)} className="w-full rounded border-gray-300 p-2" />
                </div>
            </div>
          </div>

          <button
            onClick={calculateComparison}
            className="mt-8 w-full bg-violet-600 text-white font-bold py-4 rounded-xl hover:bg-violet-700 transition shadow-lg text-lg uppercase tracking-wide"
          >
            Compare Deals
          </button>
        </div>

        <div className="lg:col-span-8">
          {result !== null ? (
            <div className="space-y-6">
                
                <div className={`p-6 rounded-xl border flex flex-col items-center justify-center text-center shadow-sm ${result.winner === 'cashback' ? 'bg-violet-50 border-violet-200' : 'bg-indigo-50 border-indigo-200'}`}>
                    <h2 className="text-sm font-bold uppercase mb-2 text-gray-500">The Winner Is:</h2>
                    <div className="text-4xl font-black mb-2 text-gray-900">
                        {result.winner === 'cashback' ? 'Option A: Take the Cash Rebate' : 'Option B: Take the Low APR'}
                    </div>
                    <div className={`font-bold text-lg ${result.winner === 'cashback' ? 'text-violet-700' : 'text-indigo-700'}`}>
                        You save ${result.savings.toLocaleString(undefined, { maximumFractionDigits: 2 })} over the life of the loan.
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    
                    <div className={`p-6 rounded-xl border bg-white ${result.winner === 'cashback' ? 'ring-2 ring-violet-500 shadow-md' : 'border-gray-200 opacity-80'}`}>
                        <h3 className="font-bold text-violet-800 text-xl border-b pb-3 mb-4">A: Cash Rebate</h3>
                        
                        <div className="mb-6">
                            <span className="block text-sm text-gray-500 font-semibold mb-1">Monthly Payment</span>
                            <span className="text-3xl font-black text-gray-900">${result.cashBackMonthly.toFixed(2)}</span>
                        </div>
                        
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between bg-gray-50 px-3 py-2 rounded">
                                <span className="text-gray-600">Total Financed:</span>
                                <b>${(result.cashBackTotalCost - result.cashBackTotalInterest).toFixed(2)}</b>
                            </div>
                            <div className="flex justify-between bg-rose-50 px-3 py-2 rounded text-rose-800">
                                <span>Total Interest:</span>
                                <b>${result.cashBackTotalInterest.toFixed(2)}</b>
                            </div>
                            <div className="flex justify-between bg-violet-100 px-3 py-2 rounded font-bold text-violet-900">
                                <span>Total Out of Pocket:</span>
                                <span>${result.cashBackTotalCost.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    <div className={`p-6 rounded-xl border bg-white ${result.winner === 'lowrate' ? 'ring-2 ring-indigo-500 shadow-md' : 'border-gray-200 opacity-80'}`}>
                        <h3 className="font-bold text-indigo-800 text-xl border-b pb-3 mb-4">B: Low APR Promo</h3>
                        
                        <div className="mb-6">
                            <span className="block text-sm text-gray-500 font-semibold mb-1">Monthly Payment</span>
                            <span className="text-3xl font-black text-gray-900">${result.lowRateMonthly.toFixed(2)}</span>
                        </div>
                        
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between bg-gray-50 px-3 py-2 rounded">
                                <span className="text-gray-600">Total Financed:</span>
                                <b>${(result.lowRateTotalCost - result.lowRateTotalInterest).toFixed(2)}</b>
                            </div>
                            <div className="flex justify-between bg-rose-50 px-3 py-2 rounded text-rose-800">
                                <span>Total Interest:</span>
                                <b>${result.lowRateTotalInterest.toFixed(2)}</b>
                            </div>
                            <div className="flex justify-between bg-indigo-100 px-3 py-2 rounded font-bold text-indigo-900">
                                <span>Total Out of Pocket:</span>
                                <span>${result.lowRateTotalCost.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
          ) : (
             <div className="h-full border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center p-8 text-center text-gray-500 font-medium">
                Enter dealer financing options to discover the mathematical truth of which incentive is better.
             </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title="Cash Back vs Low Interest Finacing"
        whatIsIt={
          <>
            <p>
              The <strong>Cash Back vs Low Interest Calculator</strong> mathematically simulates the total out-of-pocket lifecycle cost of taking a dealership's immediate cash rebate combined with a standard bank auto loan, versus sacrificing the rebate to secure a subsidized 0% or low APR financing promotion directly through the manufacturer.
            </p>
          </>
        }
        formula={<></>}
        example={
          <>
             <p>A $35,000 car offers a choice: <strong>$3,000 rebate (and 5% standard bank APR)</strong> OR <strong>0% APR for 60 months.</strong></p>
             <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
              <li><strong>The Rebate Option:</strong> Finance $32,000 at 5%. Total interest is $4,233. Total out of pocket is <strong>$36,233</strong>.</li>
              <li><strong>The 0% Option:</strong> Finance the full $35,000 at 0%. Total out of pocket is purely <strong>$35,000</strong>.</li>
              <li>In this scenario, sacrificing the cash completely and taking 0% saves you $1,233 over 5 years.</li>
            </ul>
          </>
        }
        useCases={<ul className="list-disc pl-6 space-y-4"><li><strong>Short Term Loans:</strong> If you plan to aggressively pay off the loan in 24 months, taking the upfront cash rebate almost always mathematically demolishes the benefit of a low interest rate stretching over 60 months.</li></ul>}
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
              path: "/mortgage-calculator/",
              desc: "Calculate your monthly mortgage payments and amortization schedule.",
            },
            {
              name: "ROI Calculator",
              path: "/roi-calculator/",
              desc: "Calculate your exact annualized percentage returns.",
            },
            {
              name: "Investment Calculator",
              path: "/investment-calculator/",
              desc: "Project your portfolio growth over time with compound interest.",
            },
            {
              name: "Loan Payment Calculator",
              path: "/loan-payment-calculator/",
              desc: "Estimate your monthly loan payments and total interest cost.",
            }]}
      />
    </div>
  );
}
