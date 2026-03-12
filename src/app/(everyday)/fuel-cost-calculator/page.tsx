"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

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
        title="Fuel Cost Calculator"
        whatIsIt={
          <>
            <p>
              The <strong>Fuel Cost Calculator</strong> computes exactly how much money a road trip will cost based on standard variables like distance, vehicle MPG, and regional pump prices.
            </p>
          </>
        }
        formula={
          <>
            <p className="mt-4 font-mono text-lg bg-gray-50 py-3 font-bold text-gray-800 px-6 inline-block rounded-lg shadow-sm">
               Total Cost = (Distance / MPG) × Gas Price
            </p>
          </>
        }
        example={
          <>
            <p>If you are driving <strong>300 miles</strong> to visit family in a car that gets <strong>25 MPG</strong> while gas costs <strong>$3.50</strong> a gallon:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
              <li>300 miles / 25 MPG = 12 Gallons Used</li>
              <li>12 Gallons × $3.50 = <strong>$42.00 in Gas</strong></li>
            </ul>
          </>
        }
        useCases={<ul className="list-disc pl-6 space-y-4"><li><strong>Carpooling:</strong> Determine the exact penny-for-penny fair share to split gas money with your friends on a long interstate road trip.</li></ul>}
        faqs={[
            {
              question: "How accurate is this calculator?",
              answer: "Our calculator uses industry-standard formulas to provide the most accurate results possible. However, it should be used for informational purposes only and not as a basis for formal calculations or legal advice.",
            },
            {
              question: "Is this tool free to use?",
              answer: "Yes, all our calculators are 100% free to use. We do not require any registration, personal information, or subscriptions.",
            },
            {
              question: "Can I use this on my mobile device?",
              answer: "Absolutely! Our website is fully responsive and optimized for all screen sizes, including smartphones and tablets, so you can calculate on the go.",
            }]}
        relatedCalculators={[
            {
              name: "Age Calculator",
              path: "/age-calculator",
              desc: "Calculate your exact age in years, months, and days.",
            },
            {
              name: "Temperature Converter",
              path: "/temperature-converter",
              desc: "Convert between Celsius, Fahrenheit, and Kelvin.",
            },
            {
              name: "Speed Calculator",
              path: "/speed-calculator",
              desc: "Calculate speed, distance, or time with ease.",
            },
            {
              name: "Bill Splitter",
              path: "/bill-splitter-calculator",
              desc: "Split bills and calculate tips among friends.",
            }]}
      />
    </div>
  );
}
