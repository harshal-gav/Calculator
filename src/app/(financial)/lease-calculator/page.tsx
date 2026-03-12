"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function LeaseCalculator() {
  const [msrp, setMsrp] = useState("45000");
  const [negotiatedPrice, setNegotiatedPrice] = useState("42000");
  const [downPayment, setDownPayment] = useState("2000");
  const [leaseTerm, setLeaseTerm] = useState("36");
  const [residualPercent, setResidualPercent] = useState("58");
  const [moneyFactor, setMoneyFactor] = useState("0.00210");
  const [taxRate, setTaxRate] = useState("7.5");

  const [result, setResult] = useState<{
    depreciationFee: number;
    financeFee: number;
    basePayment: number;
    withTax: number;
    residualValue: number;
    capCost: number;
  } | null>(null);

  const calculateLease = () => {
    const listPrice = parseFloat(msrp);
    const negPrice = parseFloat(negotiatedPrice);
    const down = parseFloat(downPayment);
    const term = parseInt(leaseTerm);
    const residualFactor = parseFloat(residualPercent) / 100;
    const mf = parseFloat(moneyFactor);
    const tax = parseFloat(taxRate) / 100;

    if (!isNaN(listPrice) && !isNaN(negPrice) && !isNaN(term) && term > 0) {
      
      // 1. Calculate Residual Value (Always based on original MSRP, NOT negotiated price)
      const rv = listPrice * residualFactor;

      // 2. Calculate Gross Capitalized Cost (Net Cap Cost = Negotiated Price - Down Payment / Trade-in)
      const capCost = negPrice - down;

      // 3. Depreciation Fee (The amount the car drops in price over your term, divided by months)
      const depreciationFee = (capCost - rv) / term;

      // 4. Finance Fee (aka Rent Charge). Formula: (Cap Cost + Residual Value) * Money Factor
      const financeFee = (capCost + rv) * mf;

      // 5. Base Monthly Payment
      const baseMonthly = depreciationFee + financeFee;

      // 6. Tax logic (In most states, tax is applied to the monthly lease payment)
      const totalWithTax = baseMonthly * (1 + tax);

      setResult({
        depreciationFee: depreciationFee,
        financeFee: financeFee,
        basePayment: baseMonthly,
        withTax: totalWithTax,
        residualValue: rv,
        capCost: capCost
      });
    } else {
        setResult(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-gray-900 border-b pb-4">
        Auto Lease Calculator
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Strip away dealership jargon. Calculate your true lease payment mathematically using the exact depreciation, residual value, and money factor logic used by auto lenders.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
        <div className="md:col-span-5 bg-gray-50 p-6 rounded-xl border border-gray-200">
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">MSRP ($):</label>
              <input type="number" value={msrp} onChange={(e) => setMsrp(e.target.value)} className="w-full rounded border-gray-300 p-2 text-sm shadow-sm focus:ring-amber-500" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Negotiated Price ($):</label>
              <input type="number" value={negotiatedPrice} onChange={(e) => setNegotiatedPrice(e.target.value)} className="w-full rounded border-gray-300 p-2 text-sm shadow-sm focus:ring-amber-500" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Down Payment + Trade-in ($):</label>
              <input type="number" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} className="w-full rounded border-gray-300 p-2 text-sm shadow-sm focus:ring-amber-500" />
            </div>

            <div className="my-6 border-t border-gray-300"></div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Lease Term (Mo):</label>
                  <input type="number" value={leaseTerm} onChange={(e) => setLeaseTerm(e.target.value)} className="w-full rounded border-gray-300 p-2 text-sm shadow-sm focus:ring-amber-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Residual (%):</label>
                  <input type="number" value={residualPercent} onChange={(e) => setResidualPercent(e.target.value)} className="w-full rounded border-gray-300 p-2 text-sm shadow-sm focus:ring-amber-500" />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Money Factor:</label>
                  <input type="number" step="0.0001" value={moneyFactor} onChange={(e) => setMoneyFactor(e.target.value)} className="w-full rounded border-gray-300 p-2 text-sm font-mono shadow-sm focus:ring-amber-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Sales Tax (%):</label>
                  <input type="number" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} className="w-full rounded border-gray-300 p-2 text-sm shadow-sm focus:ring-amber-500" />
                </div>
            </div>
          </div>

          <button
            onClick={calculateLease}
            className="mt-8 w-full bg-amber-500 text-white font-bold py-4 rounded-xl hover:bg-amber-600 transition shadow-lg text-lg uppercase tracking-wide"
          >
            Calculate Lease
          </button>
        </div>

        <div className="md:col-span-7 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {result !== null ? (
            <div>
               <div className="bg-amber-50 p-4 border-b border-amber-100 flex justify-between items-center text-amber-900 font-bold uppercase tracking-wide">
                  Lease Payment Breakdown
               </div>
               
               <div className="p-8">
                 <div className="text-3xl font-black text-center text-gray-900">
                    <span className="text-sm font-bold block text-gray-500 uppercase tracking-widest mb-1">Monthly Payment (With Tax)</span>
                    ${result.withTax.toFixed(2)}
                 </div>
                 
                 <div className="text-center mt-2 mb-8 pb-8 border-b border-gray-100">
                    <span className="text-gray-500 text-sm font-medium">Base Payment Before Tax: ${result.basePayment.toFixed(2)}</span>
                 </div>

                 <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm bg-gray-50 p-3 rounded shadow-sm border border-gray-100">
                      <span className="text-gray-600 font-semibold">Net Capitalized Cost:</span>
                      <span className="font-bold text-gray-800">
                         ${result.capCost.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-sm bg-gray-50 p-3 rounded shadow-sm border border-gray-100">
                      <span className="text-gray-600 font-semibold">Forecasted Residual Value:</span>
                      <span className="font-bold text-gray-800">
                         ${result.residualValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                      </span>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                        <div className="flex justify-between items-center text-xs text-amber-800">
                            <span>1. Monthly Depreciation Cost:</span>
                            <span className="font-bold">${result.depreciationFee.toFixed(2)} /mo</span>
                        </div>
                        <div className="flex justify-between items-center text-xs text-rose-800">
                            <span>2. Monthly Finance Fee (Rent Charge):</span>
                            <span className="font-bold">${result.financeFee.toFixed(2)} /mo</span>
                        </div>
                    </div>
                 </div>
                 
                 <div className="mt-8 text-xs text-gray-500 text-center uppercase tracking-widest font-bold">
                    Money Factor APR Equivalent: {(parseFloat(moneyFactor) * 2400).toFixed(2)}%
                 </div>
               </div>
            </div>
          ) : (
             <div className="h-full flex flex-col items-center justify-center p-8 text-center text-amber-800 opacity-60 font-medium bg-amber-50">
                <p>When you lease a car, you are technically just paying for the value the car loses while you drive it over 3 years, plus a bank fee.</p>
                <p className="mt-4">Input the parameters to see exactly how your monthly payment is structured.</p>
             </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title="Auto Lease Calculator"
        whatIsIt={
          <>
            <p>
              The <strong>Lease Calculator</strong> maps out the exact mathematical equation used by automotive dealership F&I modules. Rather than paying amortization for the entire value of a vehicle, a lease requires you to only finance the <strong>depreciation</strong> that occurs between the purchase price today and its estimated future value (the residual).
            </p>
          </>
        }
        formula={
          <>
             <p className="font-mono bg-gray-50 p-4 rounded-lg text-sm mb-2 font-bold">Base Payment = Depreciation Fee + Finance Fee</p>
             <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
              <li><strong>Depreciation Fee:</strong> (Net Cap Cost - Residual Value) ÷ Term</li>
              <li><strong>Finance Fee:</strong> (Net Cap Cost + Residual Value) × Money Factor</li>
            </ul>
             <p className="mt-4 text-xs italic">* Note that the Finance Fee strangely involves <i>adding</i> the cap cost and residual, rather than subtracting. This is industry standard.</p>
          </>
        }
        example={
          <>
             <p>A $45,000 leased car will be worth $26,100 (Residual) in 36 months.</p>
             <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
              <li>The difference is $18,900 of depreciation. Over 36 months, that's exactly <strong>$525/mo in Depreciation.</strong></li>
              <li>If the Money Factor is 0.00210, the monthly <strong>Rent Charge is ~$149/mo.</strong></li>
              <li>Base lease payment = $525 + $149 = <strong>$674 a month.</strong></li>
            </ul>
          </>
        }
        useCases={<ul className="list-disc pl-6 space-y-4"><li><strong>APR Conversion:</strong> Dealerships disguise high interest rates behind "Money Factor" decimals. To find the true APR interest rate on a lease, multiply the money factor by 2,400. A Money Factor of .00300 is actually a staggering <strong>7.2% APR</strong>.</li></ul>}
        faqs={[]}
        relatedCalculators={[]}
      />
    </div>
  );
}
