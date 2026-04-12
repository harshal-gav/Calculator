"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

import squareFootageSeoData from "@/data/seo-content/official/square-footage-calculator.json";

export default function SquareFootageCalculator() {
  const [unit, setUnit] = useState<"feet" | "meters">("feet");
  const [length, setLength] = useState("12");
  const [width, setWidth] = useState("10");

  const [result, setResult] = useState<{
    sqFeet: number;
    sqMeters: number;
    sqYards: number;
    acres: number;
  } | null>(null);

  const calculateArea = () => {
    const l = parseFloat(length);
    const w = parseFloat(width);

    if (!isNaN(l) && !isNaN(w) && l > 0 && w > 0) {
      let areaInSqFt = 0;

      if (unit === "feet") {
         areaInSqFt = l * w;
      } else {
         // Convert meters to feet first (1 meter = 3.28084 feet)
         const lFt = l * 3.28084;
         const wFt = w * 3.28084;
         areaInSqFt = lFt * wFt;
      }

      const sqMeters = areaInSqFt / 10.7639;
      const sqYards = areaInSqFt / 9;
      const acres = areaInSqFt / 43560;

      setResult({
        sqFeet: areaInSqFt,
        sqMeters: sqMeters,
        sqYards: sqYards,
        acres: acres,
      });
    } else {
        setResult(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-gray-900 border-b pb-4">
        Square Footage Calculator
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Determine the exact total area of any room or property footprint for real estate, construction, or DIY flooring projects.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          
          <div className="space-y-6">
            <div>
               <label className="block text-sm font-semibold text-gray-700 mb-2">
                 Primary Measurement Unit:
               </label>
               <div className="flex bg-white rounded-lg border border-gray-300 overflow-hidden shadow-sm">
                 <button
                   className={`flex-1 py-3 text-sm font-bold transition ${unit === "feet" ? "bg-cyan-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}
                   onClick={() => setUnit("feet")}
                 >
                   Feet (ft)
                 </button>
                 <button
                   className={`flex-1 py-3 text-sm font-bold transition ${unit === "meters" ? "bg-cyan-600 text-white" : "text-gray-600 hover:bg-gray-100 border-l border-gray-300"}`}
                   onClick={() => setUnit("meters")}
                 >
                   Meters (m)
                 </button>
               </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Length ({unit}):
                </label>
                <input
                  type="number"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 p-3 border text-lg"
                  placeholder="e.g. 15"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Width ({unit}):
                </label>
                <input
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 p-3 border text-lg"
                  placeholder="e.g. 12"
                />
              </div>
            </div>
          </div>

          <button
            onClick={calculateArea}
            className="mt-8 w-full bg-cyan-600 text-white font-bold py-4 rounded-xl hover:bg-cyan-700 transition shadow-lg text-lg uppercase tracking-wide"
          >
            Calculate Space
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {result !== null ? (
            <div>
               <div className="bg-cyan-50 p-4 border-b border-cyan-100 text-center">
                  <h2 className="text-xl font-bold text-cyan-900 uppercase">Total Area Size</h2>
               </div>
               
               <div className="p-6">
                 <div className="text-6xl font-black text-center text-cyan-600 mb-2">
                    {result.sqFeet.toLocaleString(undefined, { maximumFractionDigits: 1 })}
                 </div>
                 <div className="text-xl font-bold text-center text-gray-500 uppercase tracking-widest mb-8">
                    Square Feet (ft²)
                 </div>

                 <div className="space-y-3">
                    <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                      <span className="text-gray-600 font-medium">Square Meters (m²):</span>
                      <span className="font-bold text-gray-800 text-lg">
                         {result.sqMeters.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                      <span className="text-gray-600 font-medium">Square Yards (yd²):</span>
                      <span className="font-bold text-gray-800 text-lg">
                         {result.sqYards.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                      <span className="text-gray-600 font-medium">Acres:</span>
                      <span className="font-bold text-gray-800 text-lg">
                         {result.acres < 0.01 ? "< 0.01" : result.acres.toLocaleString(undefined, { maximumFractionDigits: 3 })}
                      </span>
                    </div>
                 </div>
               </div>
            </div>
          ) : (
             <div className="h-full flex items-center justify-center p-8 text-center text-cyan-800 opacity-60 font-medium">
                Enter the straight line dimensions of your space to calculate its total footprint.
             </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title={squareFootageSeoData.title}
        whatIsIt={squareFootageSeoData.whatIsIt}
        formula={squareFootageSeoData.formula}
        example={squareFootageSeoData.example}
        useCases={squareFootageSeoData.useCases}
        faqs={squareFootageSeoData.faqs}
        deepDive={squareFootageSeoData.deepDive}
        glossary={squareFootageSeoData.glossary}
        relatedCalculators={[
          {
            name: "Tile Calculator",
            path: "/tile-calculator/",
            desc: "Estimate how many tiles you need based on your square footage.",
          },
          {
            name: "Roofing Calculator",
            path: "/roofing-calculator/",
            desc: "Calculate surface area for steep or flat roofing projects.",
          },
          {
            name: "Construction Loan",
            path: "/construction-loan-calculator/",
            desc: "Finance your new square footage with an optimized loan structure.",
          },
          {
            name: "Speed Calculator",
            path: "/speed-calculator/",
            desc: "Calculate travel time based on distance and average velocity.",
          }]}
      />
    </div>
  );
}
