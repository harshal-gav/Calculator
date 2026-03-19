"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function BoatLoanCalculator() {
  const [boatPrice, setBoatPrice] = useState("50000");
  const [downPayment, setDownPayment] = useState("10000");
  const [loanTerm, setLoanTerm] = useState("120"); // Boats often have 10-20 year terms
  const [interestRate, setInterestRate] = useState("7.5");
  const [salesTax, setSalesTax] = useState("6");

  const [result, setResult] = useState<{
    monthlyPayment: number;
    totalInterest: number;
    totalCost: number;
    loanAmount: number;
    taxAmount: number;
  } | null>(null);

  const calculate = () => {
    const price = parseFloat(boatPrice);
    const down = parseFloat(downPayment);
    const term = parseInt(loanTerm);
    const rate = parseFloat(interestRate) / 100 / 12;
    const taxRate = parseFloat(salesTax) / 100;

    if (!isNaN(price) && !isNaN(term) && term > 0) {
      const taxAmount = price * taxRate;
      const loanAmount = price + taxAmount - down;
      
      let monthlyPayment = 0;
      if (rate === 0) {
        monthlyPayment = loanAmount / term;
      } else {
        monthlyPayment = (loanAmount * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
      }

      const totalCost = (monthlyPayment * term) + down;
      const totalInterest = totalCost - (price + taxAmount);

      setResult({
        monthlyPayment,
        totalInterest,
        totalCost,
        loanAmount,
        taxAmount
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-2xl shadow-xl border border-cyan-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-cyan-50 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black text-cyan-900 tracking-tight text-nowrap">Boat Loan Calculator</h1>
          <p className="text-cyan-600 font-medium mt-1">Calculate monthly payments for marine financing.</p>
        </div>
        <div className="bg-cyan-50 px-4 py-2 rounded-full border border-cyan-100 shrink-0">
          <span className="text-cyan-700 font-bold text-sm uppercase tracking-wider">Marine Finance</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Boat Purchase Price ($)</label>
              <input type="number" value={boatPrice} onChange={(e) => setBoatPrice(e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-cyan-500 focus:ring-0 transition-all font-semibold text-slate-800" />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Down Payment ($)</label>
              <input type="number" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-cyan-500 focus:ring-0 transition-all font-semibold text-slate-800" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-tighter">Loan Term (Months)</label>
                <input type="number" value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-700 font-bold" />
                <p className="text-[9px] text-cyan-600 font-bold mt-1 uppercase italic">Typical: 120-240</p>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-tighter">Interest Rate (%)</label>
                <input type="number" step="0.1" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-700 font-bold" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Sales Tax (%)</label>
              <input type="number" value={salesTax} onChange={(e) => setSalesTax(e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-cyan-500 focus:ring-0 transition-all font-semibold text-slate-800" />
            </div>

            <button onClick={calculate} className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-cyan-200 active:scale-[0.98]">
              Calculate Monthly Payment
            </button>
          </div>
        </div>

        <div className="lg:col-span-7">
          {result ? (
            <div className="h-full flex flex-col gap-6">
              <div className="grow bg-gradient-to-br from-cyan-600 to-cyan-800 rounded-3xl p-10 text-white shadow-xl flex flex-col justify-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                <div className="text-cyan-100 text-sm font-bold uppercase tracking-widest mb-2 font-mono">Monthly Payment</div>
                <div className="text-8xl font-black mb-6">
                  ${result.monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </div>
                <div className="flex flex-wrap gap-3">
                    <div className="px-4 py-2 bg-white/20 rounded-xl backdrop-blur-sm">
                        <span className="block text-[10px] uppercase font-bold text-cyan-100">Loan Amount</span>
                        <span className="text-xl font-bold">${result.loanAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                    </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl">
                  <div className="text-slate-400 text-xs font-bold uppercase mb-1">Total Interest</div>
                  <div className="text-xl font-black text-cyan-600">${result.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                </div>
                <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl">
                  <div className="text-slate-400 text-xs font-bold uppercase mb-1">Total Out-of-Pocket</div>
                  <div className="text-xl font-black text-slate-800">${result.totalCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[400px] border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center p-8 text-center bg-cyan-50/5">
                <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mb-4 text-cyan-600">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2 uppercase tracking-tighter">Marine Asset Finance</h3>
                <p className="text-slate-500 max-w-[320px] font-medium leading-relaxed">Boats are luxury assets and often qualify for longer loan terms (up to 20 years) compared to standard vehicle loans. This impacts your total interest significantly.</p>
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title="Boat Loan Calculator"
        whatIsIt={
          <p>
            A <strong>Boat Loan Calculator</strong> is a specialized financial tool used to estimate the costs of financing a marine vessel. Because boats are considered "recreational vehicles," financing terms often extend much longer than typical car loans—sometimes up to 180 or 240 months for larger yachts.
          </p>
        }
        formula={
          <div className="space-y-4">
            <p>The standard amortization formula is used for boat loans:</p>
            <div className="bg-slate-50 p-4 rounded-xl font-mono text-xs text-cyan-700 overflow-x-auto">
              M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1 ]
            </div>
            <p>Where <em>P</em> is the loan amount (Price + Tax - Down Payment), <em>i</em> is the monthly interest rate, and <em>n</em> is the number of months.</p>
          </div>
        }
        example={
          <p>
            Financing a **$100,000** boat with **$20,000** down over **15 years (180 months)** at **8% interest** results in a monthly payment of approximately **$764**. However, you will pay over **$57,000** in total interest over the life of the loan.
          </p>
        }
        useCases={
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Budgeting:</strong> Determining if the monthly luxury expense fits your lifestyle.</li>
            <li><strong>Loan Term Comparison:</strong> Choosing between a 10-year and 20-year term to balance monthly cash flow vs. total interest.</li>
            <li><strong>Purchase Negotiation:</strong> Knowing your "out-the-door" financing cost before talking to a marine dealer.</li>
          </ul>
        }
        faqs={[
          {
            question: "Are boat loans like car loans?",
            answer: "In principle, yes, but the terms are much longer (10-20 years vs 3-7 years) and interest rates are typically higher as boats are considered non-essential luxury assets."
          },
          {
            question: "Is boat loan interest tax-deductible?",
            answer: "If the boat has basic sleeping, cooking, and toilet facilities, it may qualify as a second home for the mortgage interest deduction (check with a tax professional)."
          },
            {
              question: "How accurate is this calculator?",
              answer: "Our calculator uses industry-standard formulas to provide the most accurate results possible. However, it should be used for informational purposes only and not as a basis for formal calculations or legal advice.",
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
            }
          ]}
      />
    </div>
  );
}
