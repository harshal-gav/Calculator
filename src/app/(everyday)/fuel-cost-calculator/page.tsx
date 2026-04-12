"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

import fuelCostSeoData from "@/data/seo-content/official/fuel-cost-calculator.json";

export default function FuelCostCalculator() {
  const [distance, setDistance] = useState("300");
  const [efficiency, setEfficiency] = useState("25");
  const [gasPrice, setGasPrice] = useState("3.50");

  const [result, setResult] = useState<{
    gallonsUsed: number;
    totalCost: number;
    costPerMile: number;
  } | null>(null);

  const calculateCost = () => {
    const d = parseFloat(distance);
    const e = parseFloat(efficiency);
    const p = parseFloat(gasPrice);

    if (!isNaN(d) && !isNaN(e) && !isNaN(p) && e > 0) {
      const gallons = d / e;
      const cost = gallons * p;
      const cpm = cost / d;

      setResult({
        gallonsUsed: gallons,
        totalCost: cost,
        costPerMile: cpm,
      });
    } else {
        setResult(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-gray-900 border-b pb-4">
        Fuel Cost Calculator
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Plan your road trip budget instantly by factoring in total driving distance, vehicle fuel efficiency (MPG), and current gas pump prices.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Trip Distance (miles):
              </label>
              <input
                type="number"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-3 border text-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Vehicle Efficiency (MPG):
              </label>
              <input
                type="number"
                value={efficiency}
                onChange={(e) => setEfficiency(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-3 border text-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Gas Price ($ per Gallon):
              </label>
              <input
                type="number"
                value={gasPrice}
                onChange={(e) => setGasPrice(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-3 border text-lg"
              />
            </div>
          </div>

          <button
            onClick={calculateCost}
            className="mt-8 w-full bg-red-600 text-white font-bold py-4 rounded-xl hover:bg-red-700 transition shadow-lg text-lg uppercase tracking-wide"
          >
            Estimate Gas Bill
          </button>
        </div>

        <div className="bg-red-50 rounded-xl p-8 border border-red-200 shadow-inner flex flex-col justify-center relative">
          {result !== null ? (
            <div className="w-full">
                <div className="text-sm text-gray-500 font-bold uppercase mb-2 text-center tracking-wider text-red-800">
                    Estimated Trip Cost
                </div>
                <div className="text-6xl md:text-7xl font-black text-center text-red-600 bg-white py-6 rounded-lg shadow-sm border border-red-100 mb-6">
                    ${result.totalCost.toFixed(2)}
                </div>

                <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm bg-white p-3 rounded shadow-sm border border-gray-100">
                      <span className="text-gray-600 font-semibold">Total Gallons Used:</span>
                      <span className="font-bold text-gray-800">
                         {result.gallonsUsed.toFixed(1)} gallons
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-sm bg-white p-3 rounded shadow-sm border border-gray-100">
                      <span className="text-gray-600 font-semibold">Net Cost per Mile:</span>
                      <span className="font-bold text-gray-800">
                         ${result.costPerMile.toFixed(2)} / mile
                      </span>
                    </div>
                </div>
            </div>
          ) : (
             <div className="text-center text-red-800 opacity-60 font-medium">
                Input your trip details to see how much gas money you should set aside.
             </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title={fuelCostSeoData.title}
        whatIsIt={fuelCostSeoData.whatIsIt}
        formula={fuelCostSeoData.formula}
        example={fuelCostSeoData.example}
        useCases={fuelCostSeoData.useCases}
        faqs={fuelCostSeoData.faqs}
        deepDive={fuelCostSeoData.deepDive}
        glossary={fuelCostSeoData.glossary}
        relatedCalculators={[
            {
              name: "Gas Mileage Calculator",
              path: "/gas-mileage-calculator/",
              desc: "Determine your vehicle's actual MPG using recent fill-up data.",
            },
            {
              name: "Speed Calculator",
              path: "/speed-calculator/",
              desc: "Calculate travel time based on distance and average speed.",
            },
            {
              name: "Budget Calculator",
              path: "/budget-calculator/",
              desc: "Manage your overall household or travel budget.",
            },
            {
              name: "Percentage Calculator",
              path: "/percentage-calculator/",
              desc: "Calculate fuel price increases and general percentages.",
            }]}
      />
    </div>
  );
}
