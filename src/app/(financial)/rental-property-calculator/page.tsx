"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function RentalPropertyCalculator() {
  const [purchasePrice, setPurchasePrice] = useState("300000");
  const [downPaymentPerc, setDownPaymentPerc] = useState("20");
  const [interestRate, setInterestRate] = useState("6.5");
  const [loanTerm, setLoanTerm] = useState("30");
  const [monthlyRent, setMonthlyRent] = useState("2500");
  const [propertyTax, setPropertyTax] = useState("3600");
  const [insurance, setInsurance] = useState("1200");
  const [repairsPerc, setRepairsPerc] = useState("5");

  const [result, setResult] = useState<{
    monthlyCashFlow: number;
    capRate: number;
    cashOnCash: number;
    monthlyExpenses: number;
    mortgagePAndI: number;
  } | null>(null);

  const calculate = () => {
    const price = parseFloat(purchasePrice);
    const downPerc = parseFloat(downPaymentPerc) / 100;
    const rate = parseFloat(interestRate) / 100 / 12;
    const termMonths = parseInt(loanTerm) * 12;
    const rent = parseFloat(monthlyRent);
    const taxesMonthly = parseFloat(propertyTax) / 12;
    const insuranceMonthly = parseFloat(insurance) / 12;
    const repairsMonthly = (parseFloat(repairsPerc) / 100) * rent;

    const downPayment = price * downPerc;
    const loanAmount = price - downPayment;

    // Mortgage P&I
    let mortgagePAndI = 0;
    if (rate > 0) {
      mortgagePAndI = (loanAmount * rate * Math.pow(1 + rate, termMonths)) / (Math.pow(1 + rate, termMonths) - 1);
    } else {
      mortgagePAndI = loanAmount / termMonths;
    }

    const monthlyExpenses = taxesMonthly + insuranceMonthly + repairsMonthly + mortgagePAndI;
    const cashFlow = rent - monthlyExpenses;

    const annualNOI = (rent - taxesMonthly - insuranceMonthly - repairsMonthly) * 12;
    const capRate = (annualNOI / price) * 100;
    const cashOnCash = ((cashFlow * 12) / downPayment) * 100;

    setResult({
      monthlyCashFlow: cashFlow,
      capRate,
      cashOnCash,
      monthlyExpenses,
      mortgagePAndI
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-2xl shadow-xl border border-emerald-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-emerald-50 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black text-emerald-900 tracking-tight text-nowrap">Rental Property Calculator</h1>
          <p className="text-emerald-600 font-medium mt-1">Analyze ROI and cash flow for real estate investments.</p>
        </div>
        <div className="bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100 shrink-0">
          <span className="text-emerald-700 font-bold text-sm uppercase tracking-wider">Investment Property</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Purchase Price ($)</label>
              <input type="number" value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-2 focus:border-emerald-500 focus:ring-0 transition-all font-semibold text-slate-800" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Down Pymt (%)</label>
                <input type="number" value={downPaymentPerc} onChange={(e) => setDownPaymentPerc(e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-700 font-bold" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Interest (%)</label>
                <input type="number" step="0.1" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-700 font-bold" />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Gross Monthly Rent ($)</label>
              <input type="number" value={monthlyRent} onChange={(e) => setMonthlyRent(e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-2 focus:border-emerald-500 focus:ring-0 transition-all font-semibold text-slate-800" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Annual Tax ($)</label>
                <input type="number" value={propertyTax} onChange={(e) => setPropertyTax(e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-700 font-bold" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Insurance ($)</label>
                <input type="number" value={insurance} onChange={(e) => setInsurance(e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-700 font-bold" />
              </div>
            </div>

            <button onClick={calculate} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-emerald-200 active:scale-[0.98]">
              Calculate ROI
            </button>
          </div>
        </div>

        <div className="lg:col-span-7">
          {result ? (
            <div className="h-full flex flex-col gap-6">
              <div className="grow bg-gradient-to-br from-emerald-600 to-teal-800 rounded-3xl p-10 text-white shadow-xl flex flex-col justify-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                <div className="text-emerald-100 text-sm font-bold uppercase tracking-widest mb-2 font-mono">Monthly Cash Flow</div>
                <div className={`text-8xl font-black mb-6 ${result.monthlyCashFlow < 0 ? 'text-rose-200' : ''}`}>
                  ${result.monthlyCashFlow.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </div>
                <div className="inline-flex items-center px-4 py-2 rounded-xl bg-white/20 text-white text-base font-bold backdrop-blur-sm self-start">
                   Cash-on-Cash Return: {result.cashOnCash.toFixed(1)}%
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl">
                  <div className="text-slate-400 text-xs font-bold uppercase mb-1">Cap Rate</div>
                  <div className="text-xl font-black text-emerald-600">{result.capRate.toFixed(2)}%</div>
                </div>
                <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl">
                  <div className="text-slate-400 text-xs font-bold uppercase mb-1">Total Monthly Expense</div>
                  <div className="text-xl font-black text-slate-800">${result.monthlyExpenses.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[400px] border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center p-8 text-center bg-emerald-50/5 text-nowrap">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4 text-emerald-600">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2 uppercase tracking-tighter">Investment Analysis</h3>
                <p className="text-slate-500 max-w-[320px] font-medium leading-relaxed whitespace-normal">Calculate the two most important real estate metrics: **Cap Rate** (return on building) and **Cash-on-Cash** (return on your actual cash out of pocket).</p>
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title="Rental Property Calculator"
        whatIsIt={
          <p>
            A <strong>Rental Property Calculator</strong> is a tool for real estate investors to evaluate the profitability of a potential investment property. It calculates monthly cash flow after expenses and mortgage payments, and provides key investment metrics like Capitalization Rate (Cap Rate) and Cash-on-Cash Return.
          </p>
        }
        formula={
          <>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 font-mono text-lg text-indigo-700 text-center shadow-sm my-6">
              Rental Property Analysis Model
            </div>
            <p className="text-sm text-slate-500 text-center">
              This tool utilize standardized mathematical formulas and logic to calculate precise Rental Property results.
            </p>
          </>
        }
        example={
          <p>
            If you buy a **$300,000** property with **$60,000** down (20%) and it rents for **$2,500** monthly, with operating expenses of $500/mo and a $1,500 mortgage, you have **$500/mo cash flow**. Your Cap Rate would be roughly **8%** and your Cash-on-Cash Return would be **10%**.
          </p>
        }
        useCases={
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Property Comparison:</strong> Comparing two potential rental units to see which generates higher cash flow.</li>
            <li><strong>Offer Strategy:</strong> Determining the maximum purchase price you can pay while still hitting a target 10% Cash-on-Cash return.</li>
            <li><strong>Financing Analysis:</strong> Seeing how a higher interest rate impacts your monthly NOI and whether the deal "still works."</li>
          </ul>
        }
        faqs={[
          {
            question: "What is a good Cap Rate?",
            answer: "It varies by market, but generally, 4-6% is considered typical for stable areas, while 8-10%+ is highly desirable for value-add or developing areas."
          },
          {
            question: "Should I include a vacancy rate?",
            answer: "Yes, wise investors typically budget 5-10% of gross rent for vacancy, even if the property is currently occupied."
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
