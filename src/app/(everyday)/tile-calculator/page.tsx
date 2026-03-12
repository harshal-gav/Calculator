"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function TileCalculator() {
  const [roomLength, setRoomLength] = useState("10"); // in feet
  const [roomWidth, setRoomWidth] = useState("12"); // in feet
  
  const [tileLength, setTileLength] = useState("12"); // in inches
  const [tileWidth, setTileWidth] = useState("12"); // in inches
  
  const [wastePercent, setWastePercent] = useState("10"); // recommended 10%

  const [result, setResult] = useState<{
    totalSqFt: number;
    pureTileCount: number;
    wasteTileCount: number;
    finalTileCount: number;
  } | null>(null);

  const calculateTiles = () => {
    const rL = parseFloat(roomLength);
    const rW = parseFloat(roomWidth);
    const tL = parseFloat(tileLength);
    const tW = parseFloat(tileWidth);
    const waste = parseFloat(wastePercent);

    if (
      !isNaN(rL) && !isNaN(rW) && 
      !isNaN(tL) && !isNaN(tW) && 
      !isNaN(waste) &&
      rL > 0 && rW > 0 && tL > 0 && tW > 0
    ) {
      // 1. Calculate Room Area in Sq Inches
      const roomAreaSqIn = (rL * 12) * (rW * 12);

      // 2. Calculate one tile area in Sq Inches
      const singleTileAreaSqIn = tL * tW;

      // 3. Mathematical pure tiles needed
      const rawTiles = roomAreaSqIn / singleTileAreaSqIn;

      // 4. Waste margin
      const wasteMargin = rawTiles * (waste / 100);
      const totalTilesNeeded = Math.ceil(rawTiles + wasteMargin);

      setResult({
        totalSqFt: rL * rW,
        pureTileCount: rawTiles,
        wasteTileCount: wasteMargin,
        finalTileCount: totalTilesNeeded,
      });
    } else {
        setResult(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-gray-900 border-b pb-4">
        Tile Calculator
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Plan your bathroom or kitchen remodel perfectly. Calculate the exact quantity of tiles you should purchase, including safety cutting margins.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-6 bg-gray-50 p-6 rounded-xl border border-gray-200">
          
          <div className="space-y-6">
            <div className="bg-white p-4 border border-teal-200 rounded-lg shadow-sm">
                <h2 className="text-sm font-bold mb-3 text-teal-800 uppercase tracking-wider">1. Project Dimensions (Feet)</h2>
                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Room Length (ft)</label>
                        <input type="number" value={roomLength} onChange={(e) => setRoomLength(e.target.value)} className="w-full rounded border-gray-300 p-2 focus:ring-teal-500" />
                    </div>
                    <div className="flex-1">
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Room Width (ft)</label>
                        <input type="number" value={roomWidth} onChange={(e) => setRoomWidth(e.target.value)} className="w-full rounded border-gray-300 p-2 focus:ring-teal-500" />
                    </div>
                </div>
            </div>

            <div className="bg-white p-4 border border-teal-200 rounded-lg shadow-sm">
                <h2 className="text-sm font-bold mb-3 text-teal-800 uppercase tracking-wider">2. Tile Size (Inches)</h2>
                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Tile Length (in)</label>
                        <input type="number" value={tileLength} onChange={(e) => setTileLength(e.target.value)} className="w-full rounded border-gray-300 p-2 focus:ring-teal-500" />
                    </div>
                    <div className="flex-1">
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Tile Width (in)</label>
                        <input type="number" value={tileWidth} onChange={(e) => setTileWidth(e.target.value)} className="w-full rounded border-gray-300 p-2 focus:ring-teal-500" />
                    </div>
                </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Waste / Breakage Overage (%):
              </label>
              <input
                type="number"
                value={wastePercent}
                onChange={(e) => setWastePercent(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 p-3 border text-lg bg-white"
              />
              <p className="text-xs text-gray-500 mt-1">Contractors universally recommend minimum +10% overage for cuts and cracked corners during transit.</p>
            </div>
          </div>

          <button
            onClick={calculateTiles}
            className="mt-8 w-full bg-teal-600 text-white font-bold py-4 rounded-xl hover:bg-teal-700 transition shadow-lg text-lg uppercase tracking-wide"
          >
            Calculate Tiles Needed
          </button>
        </div>

        <div className="lg:col-span-6 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {result !== null ? (
            <div>
               <div className="bg-teal-50 p-4 border-b border-teal-100 flex justify-between items-center text-teal-900 font-bold uppercase tracking-wide">
                  Purchase Order Summary
               </div>
               
               <div className="p-8">
                 <div className="text-sm text-gray-500 font-bold uppercase mb-2 text-center tracking-wider">
                    Total Tiles To Buy
                 </div>
                 <div className="text-7xl font-black text-center text-teal-600 mb-8 border-b border-teal-100 pb-8">
                    {result.finalTileCount}
                 </div>

                 <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm bg-gray-50 p-3 rounded shadow-sm border border-gray-100">
                      <span className="text-gray-600 font-semibold">Net Room Area:</span>
                      <span className="font-bold text-gray-800 tracking-wider">
                         {result.totalSqFt.toLocaleString()} sq ft
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-sm bg-gray-50 p-3 rounded shadow-sm border border-gray-100">
                      <span className="text-gray-600 font-semibold">Strict Mathematical Tiles:</span>
                      <span className="font-bold text-gray-800">
                         {result.pureTileCount.toFixed(1)} tiles
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-sm bg-rose-50 p-3 rounded shadow-sm border border-rose-100 text-rose-800">
                      <span className="font-semibold text-rose-700">Overage Buffer (+{wastePercent}%):</span>
                      <span className="font-bold">
                         + {Math.ceil(result.wasteTileCount)} tiles
                      </span>
                    </div>
                 </div>
                 
                 <div className="mt-8 text-xs text-gray-500 text-center uppercase tracking-widest font-bold">
                    * Always round your final purchase order Up *
                 </div>
               </div>
            </div>
          ) : (
             <div className="h-full flex items-center justify-center p-8 text-center text-teal-800 opacity-60 font-medium">
                Input your room and tile specifics to see exactly how many boxes you need to order before starting.
             </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title="Tile Flooring Calculator"
        whatIsIt={
          <>
            <p>
              The <strong>Tile Calculator</strong> computes exact flooring material requirements based on the dimensional square footage of a room divided by the square inch footprint of an individual ceramic/porcelain tile.
            </p>
          </>
        }
        formula={<></>}
        example={
          <>
            <p>For a standard 10ft x 12ft room utilizing 12x12 inch tiles (which are exactly 1 square foot each):</p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
              <li>Room Area = 120 square feet</li>
              <li>Divided by 1 sqft tile = 120 raw tiles</li>
              <li>Plus 10% Contractor Buffer = 12 additional tiles</li>
              <li><strong>Final Order: 132 Tiles</strong></li>
            </ul>
          </>
        }
        useCases={<ul className="list-disc pl-6 space-y-4"><li><strong>Diagonal Patterns:</strong> If you are planning to install tiles on a 45-degree diamond bias, construction experts strictly dictate upgrading the safety buffer to 15% due to significantly more corner cuts.</li></ul>}
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
