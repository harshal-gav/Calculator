"use client";

import { useState, useEffect } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import revenueSeoData from "@/data/seo-content/official/revenue-calculator.json";

export default function RevenueCalculator() {
  const [price, setPrice] = useState("100");
  const [quantity, setQuantity] = useState("50");
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    calculate();
  }, [price, quantity]);

  const calculate = () => {
    const p = parseFloat(price) || 0;
    const q = parseFloat(quantity) || 0;
    setResult(p * q);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-white rounded-3xl shadow-xl border border-purple-50">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-purple-50 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Revenue Calculator
          </h1>
          <p className="text-slate-500 font-medium mt-1 text-lg">
            Calculate total sales revenue, gross income, and business performance.
          </p>
        </div>
        <div className="bg-purple-50 px-4 py-2 rounded-full border border-purple-100 shrink-0">
          <span className="text-purple-600 font-bold text-sm uppercase tracking-wider">
            financial
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-12 xl:col-span-5 space-y-4">
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 shadow-inner space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Price per Unit ($)
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-3 border text-lg font-bold"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Quantity Sold (Units)
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-3 border text-lg font-bold"
                placeholder="0"
              />
            </div>
          </div>

          <button
            onClick={calculate}
            className="mt-8 w-full bg-purple-600 text-white font-bold py-4 px-4 rounded-xl hover:bg-purple-700 transition shadow-lg text-lg uppercase tracking-wide"
          >
            Calculate Total Revenue
          </button>
        </div>

        <div className="lg:col-span-12 xl:col-span-7 bg-purple-50 rounded-xl p-8 border border-purple-200 shadow-inner flex flex-col justify-center">
          {result !== null ? (
            <div>
              <h2 className="text-lg font-bold text-purple-900 mb-2 text-center uppercase tracking-wider">
                Total Revenue
              </h2>
              <div className="text-6xl md:text-7xl font-black text-center text-purple-700 mb-6 pb-6 border-b border-purple-200">
                ${result.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </div>
              <p className="text-center text-purple-600 font-medium text-sm">
                This is your "Top Line" income before any expenses or COGS.
              </p>
            </div>
          ) : (
            <div className="text-center text-purple-800 opacity-60 font-medium p-8">
              Enter price and quantity to see total revenue.
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title={revenueSeoData.title}
        whatIsIt={revenueSeoData.whatIsIt}
        formula={revenueSeoData.formula}
        example={revenueSeoData.example}
        useCases={revenueSeoData.useCases}
        faqs={revenueSeoData.faqs}
        deepDive={revenueSeoData.deepDive}
        glossary={revenueSeoData.glossary}
        relatedCalculators={[
          {
            name: "Profit",
            path: "/profit-calculator/",
            desc: "Calculate net profit margin after subtracting costs from revenue.",
          },
          {
            name: "Margin",
            path: "/margin-calculator/",
            desc: "Determine your markup and gross profit margin strictly.",
          },
          {
            name: "ROI",
            path: "/roi-calculator/",
            desc: "Calculate the return on your business investment.",
          },
          {
            name: "Break Even",
            path: "/break-even-calculator/",
            desc: "Find out how much revenue you need to cover all costs.",
          },
        ]}
      />
    </div>
  );
}
