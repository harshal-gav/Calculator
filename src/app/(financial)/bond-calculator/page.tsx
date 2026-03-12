"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function BondCalculator() {
  const [faceValue, setFaceValue] = useState("1000");
  const [couponRate, setCouponRate] = useState("5");
  const [marketRate, setMarketRate] = useState("4");
  const [yearsToMaturity, setYearsToMaturity] = useState("10");
  const [frequency, setFrequency] = useState("2"); // 1=Annual, 2=Semi-annual, 4=Quarterly, 12=Monthly

  const [result, setResult] = useState<{
    price: number;
    currentYield: number;
    totalInterest: number;
    relationship: string;
  } | null>(null);

  const calculateBond = () => {
    const F = parseFloat(faceValue);
    const cr = parseFloat(couponRate) / 100;
    const mr = parseFloat(marketRate) / 100;
    const n = parseFloat(yearsToMaturity);
    const m = parseInt(frequency);

    if (!isNaN(F) && !isNaN(cr) && !isNaN(mr) && !isNaN(n)) {
      const periodicRate = mr / m;
      const totalPeriods = n * m;
      const periodicCoupon = (cr * F) / m;

      // Price = [C * (1 - (1 + r)^-N) / r] + [F / (1 + r)^N]
      const price =
        (periodicCoupon * (1 - Math.pow(1 + periodicRate, -totalPeriods))) / periodicRate +
        F / Math.pow(1 + periodicRate, totalPeriods);

      const currentYield = ((cr * F) / price) * 100;
      const totalInterest = cr * F * n;

      let relationship = "At Par";
      if (price > F) relationship = "Premium";
      else if (price < F) relationship = "Discount";

      setResult({
        price,
        currentYield,
        totalInterest,
        relationship,
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-2xl shadow-xl border border-blue-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-blue-50 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black text-blue-900 tracking-tight">Bond Calculator</h1>
          <p className="text-blue-600 font-medium mt-1">Determine the current market price and yield of a bond.</p>
        </div>
        <div className="bg-blue-50 px-4 py-2 rounded-full border border-blue-100">
          <span className="text-blue-700 font-bold text-sm uppercase tracking-wider text-nowrap">Investment Tool</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Face Value ($)</label>
              <input
                type="number"
                value={faceValue}
                onChange={(e) => setFaceValue(e.target.value)}
                className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-0 transition-all font-semibold text-slate-800"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Annual Coupon Rate (%)</label>
              <input
                type="number"
                value={couponRate}
                onChange={(e) => setCouponRate(e.target.value)}
                className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-0 transition-all font-semibold text-slate-800"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Market Interest Rate (YTM) (%)</label>
              <input
                type="number"
                value={marketRate}
                onChange={(e) => setMarketRate(e.target.value)}
                className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-0 transition-all font-semibold text-slate-800"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Years to Maturity</label>
              <input
                type="number"
                value={yearsToMaturity}
                onChange={(e) => setYearsToMaturity(e.target.value)}
                className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-0 transition-all font-semibold text-slate-800"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Payment Frequency</label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-0 transition-all font-semibold text-slate-800"
              >
                <option value="1">Annual</option>
                <option value="2">Semi-annual</option>
                <option value="4">Quarterly</option>
                <option value="12">Monthly</option>
              </select>
            </div>

            <button
              onClick={calculateBond}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-200 active:scale-[0.98]"
            >
              Calculate Price
            </button>
          </div>
        </div>

        <div className="lg:col-span-7">
          {result ? (
            <div className="h-full flex flex-col gap-6">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl flex flex-col justify-center grow">
                <div className="text-blue-100 text-sm font-bold uppercase tracking-widest mb-2">Estimated Market Price</div>
                <div className="text-6xl font-black mb-4">
                  ${result.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${result.relationship === 'Premium' ? 'bg-emerald-400/20 text-emerald-100' : 'bg-rose-400/20 text-rose-100'}`}>
                  Trading at {result.relationship}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl">
                  <div className="text-slate-500 text-xs font-bold uppercase mb-1">Current Yield</div>
                  <div className="text-2xl font-black text-slate-800">{result.currentYield.toFixed(2)}%</div>
                </div>
                <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl">
                  <div className="text-slate-500 text-xs font-bold uppercase mb-1">Total Interest</div>
                  <div className="text-2xl font-black text-slate-800">${result.totalInterest.toLocaleString()}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[400px] border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center p-8 text-center bg-slate-50/50">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-600">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Ready to Calculate</h3>
              <p className="text-slate-500 max-w-[280px]">Adjust the bond parameters and click calculate to see the market valuation.</p>
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title="Bond Calculator"
        whatIsIt={
          <p>
            A <strong>Bond Calculator</strong> helps investors determine the theoretical market price of a fixed-income security based on its coupon payments, face value, and current market interest rates (yield to maturity).
          </p>
        }
        formula={
          <div className="space-y-4">
            <p>The price of a bond is calculated by summing the present value of all future coupon payments and the present value of the par value at maturity:</p>
            <div className="bg-slate-50 p-4 rounded-xl font-mono text-sm overflow-x-auto">
              Price = [C × (1 - (1 + r)⁻ⁿ) / r] + [F / (1 + r)ⁿ]
            </div>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>C:</strong> Periodic Coupon Payment</li>
              <li><strong>r:</strong> Periodic Market Yield (YTM)</li>
              <li><strong>n:</strong> Total number of periods</li>
              <li><strong>F:</strong> Face Value (Par Value)</li>
            </ul>
          </div>
        }
        example={
          <p>
            If you have a $1,000 bond with a 5% annual coupon rate and 10 years to maturity, but the market rate is 4%, the calculator will show that the bond is worth more than its face value (trading at a premium) because its interest payments are higher than the current market rate.
          </p>
        }
        useCases={
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Pricing Bonds:</strong> Determine what a bond should be worth in the secondary market.</li>
            <li><strong>Yield Comparison:</strong> Compare bond returns against other investment vehicles.</li>
            <li><strong>Portfolio Valuation:</strong> Track the current value of your fixed-income holdings.</li>
          </ul>
        }
        faqs={[
          {
            question: "Why does the bond price change when market rates change?",
            answer: "Bond prices and market interest rates have an inverse relationship. When rates rise, new bonds pay more, making existing bonds with lower rates less valuable (price falls). When rates fall, existing bonds with higher rates become more valuable (price rises)."
          },
          {
            question: "What is par value?",
            answer: "Par value, or face value, is the amount the bond issuer agrees to pay back to the bondholder at the end of the bond's term (maturity)."
          }
        ]}
      />
    </div>
  );
}
