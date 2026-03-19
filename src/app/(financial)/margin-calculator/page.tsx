"use client";

import { useState, useEffect } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function MarginCalculator() {
  const [cost, setCost] = useState("50");
  const [revenue, setRevenue] = useState("100");

  const [result, setResult] = useState({
    grossProfit: 0,
    margin: 0,
    markup: 0,
  });

  useEffect(() => {
    calculateMargin();
  }, [cost, revenue]);

  const calculateMargin = () => {
    const c = parseFloat(cost) || 0;
    const r = parseFloat(revenue) || 0;

    const grossProfit = r - c;
    const margin = r > 0 ? (grossProfit / r) * 100 : 0;
    const markup = c > 0 ? (grossProfit / c) * 100 : 0;

    setResult({
      grossProfit,
      margin,
      markup,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-blue-800 border-b pb-4">
        Margin Calculator
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Calculate gross profit margin, profit dollars, and markup percentage
        from your cost and revenue.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Cost of Goods Sold (COGS)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600 font-bold text-lg">
                $
              </span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                className="w-full rounded-xl border-gray-300 p-4 pl-10 shadow-sm focus:border-blue-500 font-bold text-2xl text-gray-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Revenue (Selling Price)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600 font-bold text-lg">
                $
              </span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={revenue}
                onChange={(e) => setRevenue(e.target.value)}
                className="w-full rounded-xl border-gray-300 p-4 pl-10 shadow-sm focus:border-blue-500 font-bold text-2xl text-gray-800"
              />
            </div>
          </div>
        </div>

        {/* Results Screen */}
        <div className="bg-white border-2 border-blue-100 rounded-xl overflow-hidden shadow-sm flex flex-col justify-center">
          <div className="w-full flex flex-col h-full">
            <div className="p-8 pb-6 text-center bg-blue-600 border-b border-blue-700 text-white">
              <h3 className="text-blue-200 font-bold uppercase tracking-widest text-[11px] mb-2">
                Gross Profit Margin
              </h3>
              <div className="text-5xl font-black drop-shadow-sm">
                {result.margin.toFixed(2)}
                <span className="text-3xl text-blue-300">%</span>
              </div>
            </div>

            <div className="p-6 flex-grow space-y-4 bg-gray-50 flex flex-col justify-center">
              <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-200">
                <span className="font-bold text-gray-500 uppercase text-[10px] tracking-widest">
                  Gross Profit ($)
                </span>
                <span className="font-black text-2xl text-emerald-600">
                  ${result.grossProfit.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-200">
                <span className="font-bold text-gray-500 uppercase text-[10px] tracking-widest">
                  Calculated Markup
                </span>
                <span className="font-black text-2xl text-blue-800">
                  {result.markup.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-xs text-gray-500 bg-gray-50 p-4 rounded-lg">
        <strong>Formula:</strong> Margin = (Revenue - Cost) / Revenue × 100
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Margin Calculator",
            operatingSystem: "All",
            applicationCategory: "FinanceApplication",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title="Gross Profit Margin Calculator"
          whatIsIt={
            <>
              <p>
                Our <strong>Margin Calculator</strong> measures the
                profitability of a specific product or service by showing you
                exactly what percentage of your revenue is actual profit after
                paying for the cost of goods sold (COGS).
              </p>
              <p>
                Margin is arguably the most critical health metric for any
                business. While revenue tells you how much money is coming in,
                profit margin tells you how much of that money your business
                actually gets to keep.
              </p>

              <p className="mt-4 text-sm text-gray-500">
                <strong>Related Terms:</strong> Margin Calculator, Profit Margin
                Calculator, Omni Margin Calculator, Margin Formula, Markup
                Formula
              </p>
            </>
          }
          formula={
            <>
              <p>
                Gross margin measures profit as a percentage of the final
                selling price (revenue).
              </p>
              <div className="bg-blue-50 p-4 rounded-lg font-mono text-center text-[15px] shadow-sm my-4 flex flex-col gap-2 border border-blue-100 text-blue-900">
                <p>
                  <strong>Gross Profit ($) = Revenue - Cost</strong>
                </p>
                <p className="mt-2 pt-2 border-t border-blue-200">
                  <strong>Margin (%) = (Gross Profit ÷ Revenue) × 100</strong>
                </p>
              </div>
            </>
          }
          example={
            <>
              <p>
                Let's calculate the margin for a retailer selling electronics.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                <li>
                  <strong>The Scenario:</strong> You buy a television wholesale
                  for <strong>$400</strong> (Cost). You sell it to a customer
                  for <strong>$1,000</strong> (Revenue).
                </li>
                <li>
                  <strong>The Profit Calculation:</strong> $1,000 - $400 ={" "}
                  <strong>$600</strong> Gross Profit.
                </li>
                <li>
                  <strong>The Margin Calculation:</strong> ($600 ÷ $1,000) × 100
                  = <strong>60%</strong>.
                </li>
                <li>
                  <strong>Result:</strong> Your profit margin on the television
                  is exactly 60%. (Note: Your markup on this same item is 150%).
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-gray-700">
              <li>
                <strong>Pricing Strategy:</strong> A bakery needs to ensure they
                make at least a 70% margin on pastries to cover their expensive
                retail rent. They use margin calculators to determine exactly
                what the final shelf price must be based on ingredient costs.
              </li>
              <li>
                <strong>Investor Pitches:</strong> Venture capitalists
                aggressively scrutinize "software margins" vs "hardware
                margins." Software often features 80%+ margins, making it highly
                scalable, whereas physical hardware might struggle to maintain
                30% margins.
              </li>
              <li>
                <strong>Financial Auditing:</strong> Retail managers track
                profit margins month-over-month. If revenue is going up but the
                overall margin percentage is going down, it triggers an audit
                into rising supply chain costs or aggressive discounting.
              </li>
            </ul>
          }
          faqs={[
            {
              question: "What is the difference between Margin and Markup?",
              answer:
                "Margin is profit shown as a percentage of the SELLING PRICE. Markup is profit shown as a percentage of the COST. If an item costs $50 and sells for $100, the Markup is 100% (you doubled the cost), but the Margin is only 50% (half the final price was profit).",
            },
            {
              question: "Can a margin ever be higher than 100%?",
              answer:
                "No. Gross profit margin can never logically exceed 100%. Even if you obtained an item for absolutely free ($0 cost) and sold it for $1,000, 100% of that $1,000 is profit. The margin is exactly 100%. (Markup, however, can be infinite).",
            },
            {
              question: "What is a 'good' profit margin?",
              answer:
                "It depends entirely on the industry. Grocery stores operate on razor-thin margins of 1% to 3% but rely on massive volume. Software companies demand 70% to 90% margins. A generally healthy baseline across blended retail is historically around 10% net margin.",
            },
          ]}
          relatedCalculators={[
            {
              name: "Markup Calculator",
              path: "/markup-calculator/",
              desc: "Calculate pricing strategy based on cost percentages instead of revenue percentages.",
            },
            {
              name: "Break Even Calculator",
              path: "/break-even-calculator/",
              desc: "Determine how many items you must sell at your current margin to cover fixed costs.",
            },
            {
              name: "VAT Calculator",
              path: "/vat-calculator/",
              desc: "Calculate value-added tax impacts on your final retail pricing.",
            },
            {
              name: "Mortgage Calculator",
              path: "/mortgage-calculator/",
              desc: "Calculate your monthly mortgage payments and amortization schedule.",
            }]}
        />
      </div>
    </div>
  );
}
