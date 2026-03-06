"use client";

import { useState, useEffect } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

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
    calculateEquity();
  }, [homeValue, currentMortgage, maxLTVPercent]);

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

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-teal-800 border-b pb-4">
        Home Equity Calculator
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Discover your total home equity and calculate exactly how much cash you
        can borrow via a HELOC or Home Equity Loan.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="bg-teal-50 p-6 rounded-xl border border-teal-100 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
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
                className="w-full rounded-xl border-gray-300 p-4 pl-10 shadow-sm focus:border-teal-500 font-bold text-2xl text-gray-800"
              />
            </div>
            <p className="text-[10px] text-gray-500 mt-1 pl-1">
              Estimated appraisal value
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
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
                className="w-full rounded-xl border-gray-300 p-4 pl-10 shadow-sm focus:border-teal-500 font-bold text-2xl text-gray-800"
              />
            </div>
            <p className="text-[10px] text-gray-500 mt-1 pl-1">
              Total of all current liens
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Max LTV Limit (%)
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {[80, 85, 90].map((pct) => (
                <button
                  key={pct}
                  onClick={() => setMaxLTVPercent(pct.toString())}
                  className={`flex-1 py-2 px-3 rounded-lg font-bold text-sm transition ${parseFloat(maxLTVPercent) === pct ? "bg-teal-600 text-white shadow-md" : "bg-white text-teal-700 border border-teal-200 hover:bg-teal-100"}`}
                >
                  {pct}% Maximum
                </button>
              ))}
            </div>
            <div className="relative">
              <input
                type="number"
                min="0"
                step="1"
                value={maxLTVPercent}
                onChange={(e) => setMaxLTVPercent(e.target.value)}
                className="w-full rounded-lg border-gray-300 p-3 pr-10 shadow-sm focus:border-teal-500 font-bold text-gray-800"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">
                %
              </span>
            </div>
            <p className="text-[10px] text-gray-500 mt-1 pl-1">
              Banks typically lend up to 80% or 85% of home value
            </p>
          </div>
        </div>

        {/* Results Screen */}
        <div className="bg-white border-2 border-teal-100 rounded-xl overflow-hidden shadow-sm flex flex-col justify-center">
          <div className="w-full flex flex-col h-full">
            <div className="p-8 pb-6 text-center bg-teal-700 border-b border-teal-800 text-white">
              <h3 className="text-teal-200 font-bold uppercase tracking-widest text-[11px] mb-2">
                Max Borrowing Limit (HELOC/Loan)
              </h3>
              <div className="text-5xl font-black drop-shadow-sm">
                <span className="text-3xl text-teal-300 mr-1">$</span>
                {result.helocLimit.toLocaleString("en-US", {
                  maximumFractionDigits: 0,
                })}
              </div>
              {!result.isValid && (
                <div className="text-red-200 text-sm mt-3 font-medium bg-red-900/50 inline-block px-3 py-1 rounded-full border border-red-600">
                  Insufficient equity to borrow at {maxLTVPercent}% LTV
                </div>
              )}
            </div>

            <div className="p-6 flex-grow space-y-4 bg-gray-50 flex flex-col justify-center">
              <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-200">
                <div>
                  <span className="block font-bold text-gray-500 uppercase text-[10px] tracking-widest">
                    Total Home Equity
                  </span>
                </div>
                <span className="font-black text-2xl text-teal-700">
                  $
                  {result.totalEquity > 0
                    ? result.totalEquity.toLocaleString("en-US", {
                        maximumFractionDigits: 0,
                      })
                    : "0"}
                </span>
              </div>
              <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-200">
                <span className="font-bold text-gray-500 uppercase text-[10px] tracking-widest">
                  Current Equity %
                </span>
                <span
                  className={`font-bold text-xl ${result.equityPercent < 20 ? "text-orange-600" : "text-teal-600"}`}
                >
                  {result.equityPercent.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Home Equity Calculator",
            operatingSystem: "All",
            applicationCategory: "FinanceApplication",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title="Home Equity & HELOC Calculator"
          whatIsIt={
            <>
              <p>
                The <strong>Home Equity Calculator</strong> calculates your
                exact ownership stake in your property and determines your
                absolute maximum borrowing power for a Home Equity Line of
                Credit (HELOC) or Home Equity Loan.
              </p>
              <p>
                Equity is the difference between what your house is worth and
                what you currently owe the bank. However, lenders will rarely
                let you borrow 100% of that equity. They use strict
                Loan-to-Value (LTV) limits to ensure they are protected if
                housing prices drop.
              </p>

              <p className="mt-4 text-sm text-gray-500">
                <strong>Related Terms:</strong> Home Equity Calculator
              </p>
            </>
          }
          formula={
            <>
              <p>
                Lenders calculate your maximum HELOC limit using this exact
                formula:
              </p>
              <div className="bg-teal-50 p-4 rounded-lg font-mono text-center text-[15px] shadow-sm my-4 text-teal-900 border border-teal-100">
                <strong>Max Borrowing Power</strong> = (Home Value × Max LTV%) −
                Current Mortgage Balance
              </div>
              <p className="text-sm mt-2">
                The industry standard Max LTV is <strong>80%</strong>. This
                means the bank requires you to leave a 20% equity buffer
                untouched in the home.
              </p>
            </>
          }
          example={
            <>
              <p>
                Let's say your home appraises for <strong>$400,000</strong> and
                you owe <strong>$250,000</strong> on your primary mortgage.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                <li>
                  <strong>Your "Paper" Equity:</strong> $400k − $250k ={" "}
                  <strong>$150,000</strong>. This is your raw net worth tied up
                  in the house.
                </li>
                <li>
                  <strong>The LTV Limit:</strong> A bank allowing an 80% LTV
                  will extend maximum total debt against the house up to
                  $320,000 (0.80 × $400k).
                </li>
                <li>
                  <strong>The HELOC Calculation:</strong> Because you already
                  owe $250k natively, the bank subtracts that from the $320k
                  limit.
                </li>
                <li>
                  <strong>The Reality Check:</strong> Even though you have $150k
                  in "paper" equity, the bank will only allow you to borrow{" "}
                  <strong>$70,000</strong> in cash.
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-gray-700">
              <li>
                <strong>Renovation Budgets:</strong> Accurately sizing a kitchen
                or bathroom remodel budget based on what the bank will actually
                lend you, rather than your total paper equity.
              </li>
              <li>
                <strong>Debt Consolidation:</strong> Checking if you have enough
                borrowing power to pay off $30,000 in high-interest credit cards
                by pulling cash out of the house at a lower rate.
              </li>
              <li>
                <strong>Private Mortgage Insurance (PMI) Removal:</strong> Most
                lenders allow you to drop PMI once your raw equity hits 20% (an
                80% LTV). You can use this calculator to prove to your servicer
                that you have crossed the threshold.
              </li>
            </ul>
          }
          faqs={[
            {
              question: "Can I borrow 100% of my equity?",
              answer:
                "Almost never. Traditional lenders cap LTV at 80% to 85%. Some aggressive credit unions might offer 90% or 95% LTV HELOCs, but they usually charge significantly higher interest rates to offset the risk.",
            },
            {
              question:
                "What is the difference between a HELOC and a Home Equity Loan?",
              answer:
                "A Home Equity Loan hands you a single lump-sum of cash upfront with a fixed interest rate. A HELOC (Line of Credit) works like a credit card backed by your house; you only draw what you need, when you need it, typically with a variable interest rate.",
            },
            {
              question: "How does the bank determine my 'Home Value'?",
              answer:
                "When you apply for a HELOC, the lender will order either a full physical appraisal or an Automated Valuation Model (AVM) desktop appraisal to determine the legal current market value of your home.",
            },
          ]}
          relatedCalculators={[
            {
              name: "Mortgage Payoff Calculator",
              path: "/mortgage-payoff-calculator",
              desc: "See how making extra principal payments accelerates your equity growth.",
            },
            {
              name: "LTV Calculator",
              path: "/ltv-calculator",
              desc: "Specifically calculate Loan-to-Value ratios for new purchases.",
            },
            {
              name: "Debt Payoff Calculator",
              path: "/debt-payoff-calculator",
              desc: "Compare the cost of paying off debt natively versus using a HELOC.",
            },
          ]}
        />
      </div>
    </div>
  );
}
