"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function PercentOffCalculator() {
  const [originalPrice, setOriginalPrice] = useState("100");
  const [percentOff, setPercentOff] = useState("20");
  const [taxRate, setTaxRate] = useState("8");

  const [result, setResult] = useState<{
    finalPrice: number;
    amountSaved: number;
    taxAmount: number;
  } | null>(null);

  const calculate = () => {
    const price = parseFloat(originalPrice);
    const discount = parseFloat(percentOff) / 100;
    const tax = parseFloat(taxRate) / 100;

    const discountAmount = price * discount;
    const discountedPrice = price - discountAmount;
    const taxes = discountedPrice * tax;
    const final = discountedPrice + taxes;

    setResult({
      finalPrice: final,
      amountSaved: discountAmount,
      taxAmount: taxes
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-2xl shadow-xl border border-indigo-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-indigo-50 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black text-indigo-900 tracking-tight text-nowrap">Percent Off Calculator</h1>
          <p className="text-indigo-600 font-medium mt-1">Calculate the final price after discounts and sales tax.</p>
        </div>
        <div className="bg-indigo-50 px-4 py-2 rounded-full border border-indigo-100 shrink-0">
          <span className="text-indigo-700 font-bold text-sm uppercase tracking-wider">Shopping Tool</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-12 xl:col-span-5 space-y-4">
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4 shadow-inner">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Original Price ($)</label>
              <input type="number" value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-indigo-500 focus:ring-0 transition-all font-semibold text-slate-800 text-2xl" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Percent Off (%)</label>
                <input type="number" value={percentOff} onChange={(e) => setPercentOff(e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-lg px-3 py-2 text-slate-700 font-bold" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Sales Tax (%)</label>
                <input type="number" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-lg px-3 py-2 text-slate-700 font-bold" />
              </div>
            </div>

            <button onClick={calculate} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-indigo-200 active:scale-[0.98] uppercase tracking-widest">
              Calculate Price
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            {[10, 20, 30, 50].map((val) => (
                <button 
                  key={val} 
                  onClick={() => {setPercentOff(val.toString()); calculate();}}
                  className="bg-white border border-slate-200 text-slate-600 py-2 rounded-lg font-bold hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-all text-xs"
                >
                    {val}% OFF
                </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-12 xl:col-span-7">
          {result ? (
            <div className="h-full flex flex-col gap-6">
              <div className="grow bg-gradient-to-br from-indigo-600 to-indigo-900 rounded-3xl p-10 text-white shadow-xl flex flex-col justify-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                <div className="text-indigo-100 text-sm font-bold uppercase tracking-widest mb-2 font-mono">Final Sale Price</div>
                <div className="text-8xl font-black mb-6">
                  ${result.finalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className="inline-flex items-center px-4 py-2 rounded-xl bg-green-400 text-indigo-950 text-base font-black self-start animate-bounce shadow-lg">
                   SAVED: ${result.amountSaved.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl">
                  <div className="text-slate-400 text-xs font-bold uppercase mb-1">Sales Tax</div>
                  <div className="text-xl font-black text-slate-800">${result.taxAmount.toFixed(2)}</div>
                </div>
                <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl">
                  <div className="text-slate-400 text-xs font-bold uppercase mb-1">Price Before Tax</div>
                  <div className="text-xl font-black text-indigo-600">
                    ${(result.finalPrice - result.taxAmount).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[400px] border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center p-8 text-center bg-indigo-50/5">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4 text-indigo-600">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2 uppercase tracking-tighter">Quick Sale Check</h3>
                <p className="text-slate-500 max-w-[320px] font-medium leading-relaxed">Instantly find out exactly how much you're saving and what the out-the-door price will be, including sales tax.</p>
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title="Percent Off Calculator"
        whatIsIt={
          <p>
            A <strong>Percent Off Calculator</strong> is a shopping assistant tool designed to simplify sales math. It calculates the final price of an item after applying a percentage discount and accounts for additional costs like sales tax to give you the true "out of pocket" amount.
          </p>
        }
        formula={
          <div className="space-y-4">
            <p>The math behind the discount:</p>
            <div className="bg-slate-50 p-4 rounded-xl font-mono text-center text-sm text-indigo-700">
              1. Savings = Price × (Discount % ÷ 100)<br/>
              2. Sale Price = Price - Savings<br/>
              3. Final Price = Sale Price × (1 + Sales Tax %)
            </div>
          </div>
        }
        example={
          <p>
            If a jacket is originally **$100** and is on sale for **25% off**, you save **$25**, making the price **$75**. If your local sales tax is **8%**, the final price at the register will be **$81**.
          </p>
        }
        useCases={
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Flash Sales:</strong> Quickly checking if a 30% off deal is actually within your budget.</li>
            <li><strong>Restaurant Tips:</strong> Finding the base cost before adding a tip (though we have a separate Tip Calculator for that).</li>
            <li><strong>Inventory Clearance:</strong> Calculating the final price when multiple items have different discount tags.</li>
          </ul>
        }
        faqs={[
          {
            question: "Is 'Percent Off' the same as 'Sale Price'?",
            answer: "No. 'Percent Off' is the amount removed from the original price. The 'Sale Price' is what remains after for you to pay."
          },
          {
            question: "Should I include tax in the discount?",
            answer: "No. In most jurisdictions, sales tax is calculated based on the *final* sale price after the discount has been applied, not the original price."
          },
            {
              question: "How accurate is this calculator?",
              answer: "Our calculator uses industry-standard formulas to provide the most accurate results possible. However, it should be used for informational purposes only and not as a basis for formal calculations or legal advice.",
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
            }
          ]}
      />
    </div>
  );
}
