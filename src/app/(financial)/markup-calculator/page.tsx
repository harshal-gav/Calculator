"use client";

import { useState, useEffect } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function MarkupCalculator() {
  const [cost, setCost] = useState("50");
  const [markup, setMarkup] = useState("50");

  const [result, setResult] = useState({
    revenue: 0,
    grossProfit: 0,
    margin: 0,
  });

  useEffect(() => {
    calculateMarkup();
  }, [cost, markup]);

  const calculateMarkup = () => {
    const c = parseFloat(cost) || 0;
    const m = parseFloat(markup) || 0;

    const grossProfit = c * (m / 100);
    const revenue = c + grossProfit;
    const margin = revenue > 0 ? (grossProfit / revenue) * 100 : 0;

    setResult({
      revenue,
      grossProfit,
      margin,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-cyan-800 border-b pb-4">
        Markup Calculator
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Calculate your final selling price, profit dollars, and derived margin
        based on your cost and desired markup percentage.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="bg-cyan-50 p-6 rounded-xl border border-cyan-100 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Cost of Goods Sold (COGS)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-600 font-bold text-lg">
                $
              </span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                className="w-full rounded-xl border-gray-300 p-4 pl-10 shadow-sm focus:border-cyan-500 font-bold text-2xl text-gray-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Markup Percentage
            </label>
            <div className="relative">
              <input
                type="number"
                min="0"
                step="0.1"
                value={markup}
                onChange={(e) => setMarkup(e.target.value)}
                className="w-full rounded-xl border-gray-300 p-4 pr-10 shadow-sm focus:border-cyan-500 font-bold text-2xl text-gray-800"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-lg">
                %
              </span>
            </div>
          </div>
        </div>

        {/* Results Screen */}
        <div className="bg-white border-2 border-cyan-100 rounded-xl overflow-hidden shadow-sm flex flex-col justify-center">
          <div className="w-full flex flex-col h-full">
            <div className="p-8 pb-6 text-center bg-cyan-600 border-b border-cyan-700 text-white">
              <h3 className="text-cyan-200 font-bold uppercase tracking-widest text-[11px] mb-2">
                Target Revenue (Selling Price)
              </h3>
              <div className="text-5xl font-black drop-shadow-sm">
                <span className="text-3xl text-cyan-300 mr-1">$</span>
                {result.revenue.toFixed(2)}
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
                  Calculated Margin
                </span>
                <span className="font-black text-2xl text-cyan-800">
                  {result.margin.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-xs text-gray-500 bg-gray-50 p-4 rounded-lg">
        <strong>Formula:</strong> Revenue = Cost + (Cost × Markup)
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Markup Calculator",
            operatingSystem: "All",
            applicationCategory: "FinanceApplication",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title="Price Markup Calculator"
          whatIsIt={
            <>
              <p>
                Our <strong>Markup Calculator</strong> helps businesses
                determine exactly what their final retail selling price should
                be by adding a specific percentage of profit on top of the
                wholesale cost of goods sold (COGS).
              </p>
              <p>
                While "margin" looks backward at revenue to determine
                profitability, "markup" looks forward, allowing retailers to
                standardize a pricing strategy (e.g., "we markup all clothing by
                50% from the factory cost") before the item ever hits the
                shelves.
              </p>

              <p className="mt-4 text-sm text-gray-500">
                <strong>Related Terms:</strong> Markup Calculator
              </p>
            </>
          }
          formula={
            <>
              <p>
                Markup simply calculates a percentage of the raw cost, and adds
                that dollar amount back onto the cost to create a final selling
                price.
              </p>
              <div className="bg-cyan-50 p-4 rounded-lg font-mono text-center text-[15px] shadow-sm my-4 flex flex-col gap-2 border border-cyan-100 text-cyan-900">
                <p>
                  <strong>
                    Revenue (Selling Price) = Cost + (Cost × [Markup % ÷ 100])
                  </strong>
                </p>
                <p className="mt-2 pt-2 border-t border-cyan-200">
                  <strong>Gross Profit ($) = Revenue - Cost</strong>
                </p>
              </div>
            </>
          }
          example={
            <>
              <p>
                Let's look at how a boutique sets the price for a new shipment
                of inventory.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                <li>
                  <strong>The Scenario:</strong> A shoe store buys sneakers from
                  a manufacturer for <strong>$40.00</strong> (Cost). The store
                  standardizes a <strong>150%</strong> markup on all branded
                  footwear.
                </li>
                <li>
                  <strong>The Math:</strong> $40.00 × 1.50 (150%) ={" "}
                  <strong>$60.00</strong> of straight profit.
                </li>
                <li>
                  <strong>The Final Price:</strong> $40.00 (Cost) + $60.00
                  (Profit) = <strong>$100.00</strong> final selling price.
                </li>
                <li>
                  <strong>Result:</strong> By applying a 150% markup, the shoes
                  are priced at $100.00, resulting in exactly a 60% gross profit
                  margin.
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-gray-700">
              <li>
                <strong>Retail Pricing Models:</strong> The "Keystone Markup" is
                famously used in retail apparel. It refers to an automatic 100%
                markup on wholesale cost. If a shirt costs the store $20,
                "keystoning" it means automatically pricing it at $40.
              </li>
              <li>
                <strong>Contractor Bidding:</strong> Construction contractors
                calculate the exact cost of raw materials and hourly labor for a
                job, and then apply a standard 20% markup across the board to
                generate the final bid presented to the homeowner.
              </li>
              <li>
                <strong>Restaurant Menus:</strong> Restaurants utilize massive
                markups (often 300% to 500%) on cheap raw ingredients like pasta
                or beverages to offset the massive overhead costs of kitchen
                staff, waitstaff, and building leases.
              </li>
            </ul>
          }
          faqs={[
            {
              question: "What is the difference between Markup and Margin?",
              answer:
                "Markup is a percentage of your COST. Margin is a percentage of your REVENUE. If a widget costs $10 and you sell it for $20, you marked it up 100%, but your profit margin is 50%.",
            },
            {
              question: "Can a markup be over 100%?",
              answer:
                "Absolutely, and it frequently is. Standard cosmetics, bottled water, and fountain sodas regularly see retail markups of 500% to 1,000% over their raw manufacturing cost.",
            },
            {
              question:
                "How do I calculate a markup backwards from a known price?",
              answer:
                "If you know the Cost and the final Selling Price, subtract the Cost from the Price to find the profit in dollars. Then divide that profit by the Cost, and multiply by 100 to get your exact markup percentage.",
            },
          ]}
          relatedCalculators={[
            {
              name: "Margin Calculator",
              path: "/margin-calculator/",
              desc: "Calculate profitability using revenue-based percentages instead of cost-based offsets.",
            },
            {
              name: "Discount Calculator",
              path: "/discount-calculator/",
              desc: "Determine how much margin you surrender when applying a retail sale discount.",
            },
            {
              name: "Break Even Calculator",
              path: "/break-even-calculator/",
              desc: "Determine how many units you must sell at your current price to cover all fixed costs.",
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
