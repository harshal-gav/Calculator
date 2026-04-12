"use client";

import { useState, useEffect } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import homeEquitySeoData from "@/data/seo-content/official/home-equity-calculator.json";

export default function HomeEquityCalculator() {
  const [homeValue, setHomeValue] = useState("400000");
  const [currentMortgage, setCurrentMortgage] = useState("250000");
  const [maxLTVPercent, setMaxLTVPercent] = useState("80");

  const [result, setResult] = useState({
    totalEquity: 0,
    equityPercent: 0,
    maxBorrowingPower: 0,
    helocLimit: 0,
    isValid: true,
  });

  useEffect(() => {
    const calculateEquity = () => {
      const value = parseFloat(homeValue) || 0;
      const mortgage = parseFloat(currentMortgage) || 0;
      const ltv = parseFloat(maxLTVPercent) || 80;

      const totalEquity = value - mortgage;
      const equityPercent = value > 0 ? (totalEquity / value) * 100 : 0;

      // Formally: Max Loan Amount allowed across ALL mortgages = Home Value * Max LTV
      const maxTotalLoans = value * (ltv / 100);

      // HELOC Limit / Max Borrowing Power = Max Total Loans - Current Mortgage
      let helocLimit = maxTotalLoans - mortgage;

      let isValid = true;

      if (helocLimit <= 0) {
        helocLimit = 0;
        if (value > 0) isValid = false; // "Under water" based on the LTV limit
      }

      setResult({
        totalEquity,
        equityPercent,
        maxBorrowingPower: helocLimit,
        helocLimit,
        isValid,
      });
    };

    calculateEquity();
  }, [homeValue, currentMortgage, maxLTVPercent]);

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-teal-800 border-b pb-4">
        Home Equity Calculator
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Discover your total home equity and calculate exactly how much cash you
        can borrow via a HELOC or Home Equity Loan.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
        {/* Inputs */}
        <div className="lg:col-span-12 xl:col-span-5 bg-teal-50 p-6 rounded-xl border border-teal-100 space-y-6 shadow-inner">
          <h2 className="text-xl font-bold text-teal-900 mb-2">Property Details</h2>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wider text-[10px]">
              Current Home Value
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-600 font-bold text-xl">
                $
              </span>
              <input
                type="number"
                min="0"
                step="1000"
                value={homeValue}
                onChange={(e) => setHomeValue(e.target.value)}
                className="w-full rounded-xl border-gray-300 p-4 pl-10 shadow-sm focus:border-teal-500 font-bold text-2xl text-gray-800 border"
              />
            </div>
            <p className="text-[10px] text-gray-500 mt-1 pl-1 italic">
              Estimated current appraisal value
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wider text-[10px]">
              Remaining Mortgage Balance
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-600 font-bold text-xl">
                $
              </span>
              <input
                type="number"
                min="0"
                step="1000"
                value={currentMortgage}
                onChange={(e) => setCurrentMortgage(e.target.value)}
                className="w-full rounded-xl border-gray-300 p-4 pl-10 shadow-sm focus:border-teal-500 font-bold text-2xl text-gray-800 border"
              />
            </div>
            <p className="text-[10px] text-gray-500 mt-1 pl-1 italic">
              Include all current liens on the property
            </p>
          </div>

          <div className="pt-4 border-t border-teal-100">
            <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wider text-[10px]">
              Max LTV Limit (%)
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {[80, 85, 90].map((pct) => (
                <button
                  key={pct}
                  onClick={() => setMaxLTVPercent(pct.toString())}
                  className={`flex-1 py-3 px-3 rounded-lg font-bold text-sm transition ${parseFloat(maxLTVPercent) === pct ? "bg-teal-600 text-white shadow-md" : "bg-white text-teal-700 border border-teal-200 hover:bg-teal-100"}`}
                >
                  {pct}% Max
                </button>
              ))}
            </div>
            <div className="relative text-center">
               <p className="text-xs text-teal-800 font-medium italic opacity-70">Benchmarks: Banks typically cap HELOCs at 80% to 85% LTV.</p>
            </div>
          </div>
        </div>

        {/* Results Screen */}
        <div className="lg:col-span-12 xl:col-span-7 bg-white border-2 border-teal-100 rounded-xl overflow-hidden shadow-lg flex flex-col">
          <div className="w-full flex flex-col h-full">
            <div className="p-10 pb-8 text-center bg-teal-700 border-b border-teal-800 text-white shadow-inner">
              <h3 className="text-teal-200 font-black uppercase tracking-widest text-[11px] mb-3">
                Max Borrowing Limit (HELOC/Loan)
              </h3>
              <div className="text-6xl font-black drop-shadow-lg">
                <span className="text-3xl text-teal-300 mr-1">$</span>
                {result.helocLimit.toLocaleString("en-US", {
                  maximumFractionDigits: 0,
                })}
              </div>
              {!result.isValid && (
                <div className="text-red-100 text-xs mt-4 font-bold bg-rose-900/60 inline-block px-4 py-2 rounded-full border border-rose-400 uppercase tracking-tighter">
                  Insufficient equity to borrow at {maxLTVPercent}% LTV
                </div>
              )}
            </div>

            <div className="p-8 space-y-4 bg-gray-50 flex-grow flex flex-col justify-center">
              <div className="flex justify-between items-center bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <div>
                  <span className="block font-black text-gray-400 uppercase text-[10px] tracking-widest">
                    Current Home Equity
                  </span>
                </div>
                <span className="font-black text-3xl text-teal-700">
                  $
                  {result.totalEquity > 0
                    ? result.totalEquity.toLocaleString("en-US", {
                        maximumFractionDigits: 0,
                      })
                    : "0"}
                </span>
              </div>
              <div className="flex justify-between items-center bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <span className="font-black text-gray-400 uppercase text-[10px] tracking-widest">
                  Equity Percentage
                </span>
                <span
                  className={`font-black text-2xl ${result.equityPercent < 20 ? "text-orange-600" : "text-teal-600"}`}
                >
                  {result.equityPercent.toFixed(1)}%
                </span>
              </div>
              
              <div className="mt-4 p-4 bg-amber-50 border border-amber-100 rounded-lg flex items-start gap-3">
                 <div className="w-6 h-6 bg-amber-200 rounded-full flex items-center justify-center text-amber-900 text-xs font-black shrink-0">!</div>
                 <p className="text-[11px] text-amber-900 leading-relaxed italic">
                    Remember: HELOC interest is typically only tax-deductible if used for "buying, building, or substantially improving" the home.
                 </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CalculatorSEO
        title={homeEquitySeoData.title}
        whatIsIt={homeEquitySeoData.whatIsIt}
        formula={homeEquitySeoData.formula}
        example={homeEquitySeoData.example}
        useCases={homeEquitySeoData.useCases}
        faqs={homeEquitySeoData.faqs}
        deepDive={homeEquitySeoData.deepDive}
        glossary={homeEquitySeoData.glossary}
        relatedCalculators={[
          {
            name: "Mortgage Payoff",
            path: "/mortgage-payoff-calculator/",
            desc: "See how making extra principal payments accelerates your equity growth.",
          },
          {
            name: "LTV",
            path: "/ltv-calculator/",
            desc: "Calculate Loan-to-Value ratios for new purchases or refinancing.",
          },
          {
            name: "ROI",
            path: "/roi-calculator/",
            desc: "Compare your home's equity returns against stock market performance.",
          },
          {
            name: "House Affordability",
            path: "/house-affordability-calculator/",
            desc: "Check if your next home purchase fits within your budget.",
          },
        ]}
      />
    </div>
  );
}
