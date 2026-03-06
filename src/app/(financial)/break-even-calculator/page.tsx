"use client";

import { useState, useEffect } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function BreakEvenCalculator() {
  const [fixedCosts, setFixedCosts] = useState("10000");
  const [variableCostPerUnit, setVariableCostPerUnit] = useState("10");
  const [pricePerUnit, setPricePerUnit] = useState("25");

  const [result, setResult] = useState<{
    breakEvenUnits: number;
    breakEvenRevenue: number;
    unitContributionMargin: number;
    contributionMarginRatio: number;
    isValid: boolean;
  }>({
    breakEvenUnits: 0,
    breakEvenRevenue: 0,
    unitContributionMargin: 0,
    contributionMarginRatio: 0,
    isValid: true,
  });

  useEffect(() => {
    calculateBreakEven();
  }, [fixedCosts, variableCostPerUnit, pricePerUnit]);

  const calculateBreakEven = () => {
    const fc = parseFloat(fixedCosts) || 0;
    const vc = parseFloat(variableCostPerUnit) || 0;
    const price = parseFloat(pricePerUnit) || 0;

    const unitContributionMargin = price - vc;

    // If VC is >= Price, you will never break even (taking a loss per unit)
    if (unitContributionMargin <= 0 && fc > 0) {
      setResult({
        breakEvenUnits: 0,
        breakEvenRevenue: 0,
        unitContributionMargin,
        contributionMarginRatio: 0,
        isValid: false,
      });
      return;
    }

    const breakEvenUnits = fc / unitContributionMargin;
    const breakEvenRevenue = breakEvenUnits * price;
    const contributionMarginRatio = (unitContributionMargin / price) * 100;

    setResult({
      breakEvenUnits,
      breakEvenRevenue,
      unitContributionMargin,
      contributionMarginRatio,
      isValid: true,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-rose-800 border-b pb-4">
        Break Even Calculator
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Determine the exact number of units you need to sell to cover your costs
        and start making a profit.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="bg-rose-50 p-6 rounded-xl border border-rose-100 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Fixed Costs (Total)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-600 font-bold text-lg">
                $
              </span>
              <input
                type="number"
                min="0"
                step="100"
                value={fixedCosts}
                onChange={(e) => setFixedCosts(e.target.value)}
                className="w-full rounded-xl border-gray-300 p-4 pl-10 shadow-sm focus:border-rose-500 font-bold text-xl text-gray-800"
              />
            </div>
            <p className="text-[10px] text-gray-500 mt-1 pl-1">
              e.g., Rent, salaries, insurance
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Variable Cost (Per Unit)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-600 font-bold text-lg">
                $
              </span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={variableCostPerUnit}
                onChange={(e) => setVariableCostPerUnit(e.target.value)}
                className="w-full rounded-xl border-gray-300 p-4 pl-10 shadow-sm focus:border-rose-500 font-bold text-xl text-gray-800"
              />
            </div>
            <p className="text-[10px] text-gray-500 mt-1 pl-1">
              e.g., Materials, direct labor, shipping
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Selling Price (Per Unit)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-600 font-bold text-lg">
                $
              </span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={pricePerUnit}
                onChange={(e) => setPricePerUnit(e.target.value)}
                className="w-full rounded-xl border-gray-300 p-4 pl-10 shadow-sm focus:border-rose-500 font-bold text-xl text-gray-800"
              />
            </div>
          </div>
        </div>

        {/* Results Screen */}
        <div className="bg-white border-2 border-rose-100 rounded-xl overflow-hidden shadow-sm flex flex-col justify-center">
          {result.isValid ? (
            <div className="w-full flex flex-col h-full">
              <div className="p-8 pb-6 text-center bg-rose-700 border-b border-rose-800 text-white">
                <h3 className="text-rose-200 font-bold uppercase tracking-widest text-[11px] mb-2">
                  Break Even Point (Units)
                </h3>
                <div className="text-6xl font-black drop-shadow-sm">
                  {Math.ceil(result.breakEvenUnits).toLocaleString("en-US")}
                </div>
                <div className="text-rose-200 text-sm mt-2 font-medium">
                  units must be sold
                </div>
              </div>

              <div className="p-6 flex-grow space-y-4 bg-gray-50 flex flex-col justify-center">
                <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-200">
                  <span className="font-bold text-gray-500 uppercase text-[10px] tracking-widest">
                    Break Even Revenue
                  </span>
                  <span className="font-black text-xl text-gray-800">
                    $
                    {result.breakEvenRevenue.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-200">
                  <span className="font-bold text-gray-500 uppercase text-[10px] tracking-widest">
                    Unit Contribution Margin
                  </span>
                  <span className="font-bold text-lg text-emerald-600">
                    ${result.unitContributionMargin.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-200">
                  <span className="font-bold text-gray-500 uppercase text-[10px] tracking-widest">
                    Contribution Margin Ratio
                  </span>
                  <span className="font-bold text-lg text-blue-600">
                    {result.contributionMarginRatio.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-center p-8 bg-red-50 text-red-800 border-2 border-red-200 rounded-xl m-4">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mx-auto mb-4 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <h3 className="text-lg font-bold mb-2">
                  Unprofitable Structure
                </h3>
                <p className="text-sm">
                  Your Variable Cost per Unit is greater than or equal to your
                  Selling Price. You are losing money on every unit sold, making
                  it impossible to cover fixed costs and break even.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Break Even Calculator",
            operatingSystem: "All",
            applicationCategory: "BusinessApplication",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title="Business Break-Even Calculator"
          whatIsIt={
            <>
              <p>
                Our <strong>Break-Even Calculator</strong> is an essential
                corporate finance tool that determines the exact moment your
                business stops losing money and starts generating a profit. By
                assessing your fixed overhead against the cost of producing an
                item, it calculates exactly how many units you must sell to hit
                "zero."
              </p>
              <p>
                Performing a break-even analysis is a mandatory requirement for
                any modern business plan, loan application, or venture capital
                pitch. It proves whether a business model is mathematically
                viable before a single dollar is spent.
              </p>
            </>
          }
          formula={
            <>
              <p>
                To calculate the break-even point, you must divide your
                inescapable fixed costs by the "Contribution Margin" (the profit
                made on each individual unit).
              </p>
              <div className="bg-rose-50 p-4 rounded-lg font-mono text-center text-[15px] shadow-sm my-4 flex flex-col gap-2 border border-rose-100 text-rose-900">
                <p>
                  <strong>
                    Unit Contribution Margin = Selling Price - Variable Cost
                  </strong>
                </p>
                <p className="mt-2 pt-2 border-t border-rose-200">
                  <strong>
                    Break-Even Units = Fixed Costs ÷ Unit Contribution Margin
                  </strong>
                </p>
              </div>
            </>
          }
          example={
            <>
              <p>
                Let's analyze a startup selling artisanal coffee mugs online.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                <li>
                  <strong>The Scenario:</strong> You pay <strong>$2,000</strong>{" "}
                  a month for rent and software (Fixed Costs). A mug costs you{" "}
                  <strong>$4.00</strong> to manufacture (Variable Cost). You
                  sell the mugs for <strong>$24.00</strong>.
                </li>
                <li>
                  <strong>The Contribution Margin:</strong> $24.00 (Price) -
                  $4.00 (Variable) = <strong>$20.00</strong> profit per mug.
                </li>
                <li>
                  <strong>The Calculation:</strong> $2,000 (Fixed) ÷ $20.00
                  (Contribution) = <strong>100</strong>.
                </li>
                <li>
                  <strong>Result:</strong> You must sell exactly{" "}
                  <strong>100 mugs</strong> every single month just to break
                  even. Mug #101 is your very first dollar of actual monthly
                  profit.
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-gray-700">
              <li>
                <strong>Startup Feasibility:</strong> An entrepreneur wants to
                open a gym. If rent and gear leases cost $20,000/month, and gym
                memberships are $50/month with $10 of variable wear-and-tear...
                the break-even is 500 members. If the building maxes out at 300
                capacity, the calculator proves the business model is doomed to
                fail.
              </li>
              <li>
                <strong>Marketing Budgets:</strong> A company wants to run a
                $10,000 Facebook Ad campaign. Using break-even analysis, they
                determine they must sell 500 units specifically from those ads
                just to cover the cost of running them.
              </li>
              <li>
                <strong>Menu Engineering:</strong> Restaurants calculate
                break-even daily. If the lights, rent, and chef salaries cost
                $1,500 a day, they know exactly how many $30 steaks they must
                push before the dinner service becomes profitable.
              </li>
            </ul>
          }
          faqs={[
            {
              question:
                "What is the difference between Fixed Costs and Variable Costs?",
              answer:
                "Fixed costs never change, regardless of how much you sell (e.g., Rent, Insurance, Salary). Variable costs go up every time you sell an item (e.g., raw materials, cardboard shipping boxes, credit card processing fees).",
            },
            {
              question:
                "Why does the calculator say my structure is 'Unprofitable'?",
              answer:
                "If your variable cost to produce an item is higher than the price you are selling it for, your 'Contribution Margin' is negative. You are literally paying customers to take your product. No amount of volume will ever cover your fixed costs under that model.",
            },
            {
              question: "What is the Contribution Margin Ratio?",
              answer:
                "It is your unit contribution margin expressed as a percentage of the selling price. A higher ratio means a larger portion of every dollar earned goes directly toward paying off your fixed overhead.",
            },
          ]}
          relatedCalculators={[
            {
              name: "Margin Calculator",
              path: "/margin-calculator",
              desc: "Calculate your overall company profitability percentages.",
            },
            {
              name: "Markup Calculator",
              path: "/markup-calculator",
              desc: "Determine how to price your goods to ensure your contribution margin is high enough.",
            },
            {
              name: "ROI Calculator",
              path: "/roi-calculator",
              desc: "Once past break-even, calculate the return on your initial business investment.",
            },
          ]}
        />
      </div>
    </div>
  );
}
