"use client";

import { useState, useEffect } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import profitSeoData from "@/data/seo-content/official/profit-calculator.json";

export default function ProfitCalculator() {
  const [cost, setCost] = useState("60");
  const [revenue, setRevenue] = useState("100");
  const [operatingExpenses, setOperatingExpenses] = useState("10");

  const [result, setResult] = useState({
    grossProfit: 0,
    grossMargin: 0,
    netProfit: 0,
    netMargin: 0,
    markup: 0,
  });

  useEffect(() => {
    calculateProfit();
  }, [cost, revenue, operatingExpenses]);

  const calculateProfit = () => {
    const c = parseFloat(cost) || 0;
    const r = parseFloat(revenue) || 0;
    const oe = parseFloat(operatingExpenses) || 0;

    const grossProfit = r - c;
    const grossMargin = r > 0 ? (grossProfit / r) * 100 : 0;
    const netProfit = grossProfit - oe;
    const netMargin = r > 0 ? (netProfit / r) * 100 : 0;
    const markup = c > 0 ? (grossProfit / c) * 100 : 0;

    setResult({
      grossProfit,
      grossMargin,
      netProfit,
      netMargin,
      markup,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-emerald-800 border-b pb-4">
        Profit Calculator
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Calculate gross profit, net profit, and margins to evaluate your business performance and pricing strategy.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Cost of Goods Sold (COGS)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600 font-bold text-lg border-r pr-3 border-emerald-200">
                $
              </span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                className="w-full rounded-xl border-gray-300 p-4 pl-14 shadow-sm focus:border-emerald-500 font-bold text-2xl text-gray-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Revenue (Selling Price)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600 font-bold text-lg border-r pr-3 border-emerald-200">
                $
              </span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={revenue}
                onChange={(e) => setRevenue(e.target.value)}
                className="w-full rounded-xl border-gray-300 p-4 pl-14 shadow-sm focus:border-emerald-500 font-bold text-2xl text-gray-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Operating Expenses (Optional)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600 font-bold text-lg border-r pr-3 border-emerald-200">
                $
              </span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={operatingExpenses}
                onChange={(e) => setOperatingExpenses(e.target.value)}
                className="w-full rounded-xl border-gray-300 p-4 pl-14 shadow-sm focus:border-emerald-500 font-bold text-2xl text-gray-800"
              />
            </div>
          </div>
        </div>

        {/* Results Screen */}
        <div className="space-y-4">
          <div className="bg-emerald-600 p-6 rounded-xl text-white shadow-md">
            <h3 className="text-emerald-100 font-bold uppercase tracking-widest text-xs mb-1">
              Gross Profit
            </h3>
            <div className="text-4xl font-black">
              ${result.grossProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="mt-2 text-emerald-100 font-semibold">
              {result.grossMargin.toFixed(2)}% Margin
            </div>
          </div>

          <div className="bg-blue-600 p-6 rounded-xl text-white shadow-md">
            <h3 className="text-blue-100 font-bold uppercase tracking-widest text-xs mb-1">
              Net Profit
            </h3>
            <div className="text-4xl font-black">
              ${result.netProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="mt-2 text-blue-100 font-semibold">
              {result.netMargin.toFixed(2)}% Net Margin
            </div>
          </div>

          <div className="bg-white border-2 border-emerald-100 p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-500 uppercase text-xs tracking-widest">
                Markup %
              </span>
              <span className="font-black text-2xl text-emerald-800">
                {result.markup.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <CalculatorSEO
          title={profitSeoData.title}
          whatIsIt={profitSeoData.whatIsIt}
          formula={profitSeoData.formula}
          example={profitSeoData.example}
          useCases={profitSeoData.useCases}
          faqs={profitSeoData.faqs}
          deepDive={profitSeoData.deepDive}
          glossary={profitSeoData.glossary}
          relatedCalculators={[
            { name: "Markup Calculator", path: "/markup-calculator/", desc: "Calculate price based on cost and target markup percentage." },
            { name: "Margin Calculator", path: "/margin-calculator/", desc: "Focus specifically on revenue-based profit ratios." },
            { name: "Break Even Calculator", path: "/break-even-calculator/", desc: "Find the point where your total revenue equals your total expenses." },
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
