"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function GDPCalculator() {
  const [calculationType, setCalculationType] = useState<"growth" | "contribution" | "deflator">("growth");

  // Growth rate calculation
  const [currentGDP, setCurrentGDP] = useState("22000");
  const [previousGDP, setPreviousGDP] = useState("21500");
  const [periods, setPeriods] = useState("1");

  // Contribution calculation
  const [sectorGDP, setSectorGDP] = useState("5000");
  const [totalGDP, setTotalGDP] = useState("25000");

  // GDP Deflator
  const [nominalGDP, setNominalGDP] = useState("23000");
  const [realGDP, setRealGDP] = useState("22000");

  const [result, setResult] = useState<{
    value: number;
    label: string;
    description: string;
    color: string;
  } | null>(null);

  const calculateGDP = () => {
    if (calculationType === "growth") {
      const current = parseFloat(currentGDP) || 0;
      const previous = parseFloat(previousGDP) || 0;
      const yrs = parseFloat(periods) || 1;

      if (current > 0 && previous > 0 && yrs > 0) {
        const annualGrowthRate =
          (Math.pow(current / previous, 1 / yrs) - 1) * 100;

        setResult({
          value: annualGrowthRate,
          label: "Annual GDP Growth Rate",
          description: `GDP increased annually by ${annualGrowthRate.toFixed(2)}% from ${previous.toLocaleString()} to ${current.toLocaleString()}`,
          color: annualGrowthRate > 0 ? "text-green-600 border-green-200 bg-green-50" : "text-red-600 border-red-200 bg-red-50"
        });
      }
    } else if (calculationType === "contribution") {
      const sector = parseFloat(sectorGDP) || 0;
      const total = parseFloat(totalGDP) || 0;

      if (sector > 0 && total > 0) {
        const contribution = (sector / total) * 100;

        setResult({
          value: contribution,
          label: "Sector Contribution to GDP",
          description: `This sector contributes ${contribution.toFixed(2)}% of total GDP (${sector.toLocaleString()} billion out of ${total.toLocaleString()} billion)`,
          color: "text-blue-600 border-blue-200 bg-blue-50"
        });
      }
    } else {
      const nominal = parseFloat(nominalGDP) || 0;
      const real = parseFloat(realGDP) || 0;

      if (nominal > 0 && real > 0) {
        const deflator = (nominal / real) * 100;

        setResult({
          value: deflator,
          label: "GDP Deflator (Price Index)",
          description: `Base year price index is 100. Current period has a deflator of ${deflator.toFixed(2)}, indicating ${deflator > 100 ? "inflation" : "deflation"} of ${Math.abs(deflator - 100).toFixed(2)}%`,
          color: deflator > 100 ? "text-orange-600 border-orange-200 bg-orange-50" : "text-blue-600 border-blue-200 bg-blue-50"
        });
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-white rounded-3xl shadow-xl border border-amber-50">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-amber-50 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">GDP Calculator</h1>
          <p className="text-slate-500 font-medium mt-1 text-lg">Analyze economic growth and performance.</p>
        </div>
        <div className="bg-amber-50 px-4 py-2 rounded-full border border-amber-100 shrink-0">
          <span className="text-amber-600 font-bold text-sm uppercase tracking-wider">Economics</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 shadow-inner space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Calculation Type</label>
              <div className="space-y-2">
                <button
                  className={`w-full py-2 px-4 rounded-lg font-semibold transition ${
                    calculationType === "growth"
                      ? "bg-amber-600 text-white"
                      : "bg-white text-gray-700 border border-gray-300 hover:border-gray-400"
                  }`}
                  onClick={() => setCalculationType("growth")}
                >
                  GDP Growth Rate
                </button>
                <button
                  className={`w-full py-2 px-4 rounded-lg font-semibold transition ${
                    calculationType === "contribution"
                      ? "bg-amber-600 text-white"
                      : "bg-white text-gray-700 border border-gray-300 hover:border-gray-400"
                  }`}
                  onClick={() => setCalculationType("contribution")}
                >
                  Sector Contribution
                </button>
                <button
                  className={`w-full py-2 px-4 rounded-lg font-semibold transition ${
                    calculationType === "deflator"
                      ? "bg-amber-600 text-white"
                      : "bg-white text-gray-700 border border-gray-300 hover:border-gray-400"
                  }`}
                  onClick={() => setCalculationType("deflator")}
                >
                  GDP Deflator
                </button>
              </div>
            </div>

            {calculationType === "growth" && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Previous Year GDP (Billions)</label>
                  <input
                    type="number"
                    value={previousGDP}
                    onChange={(e) => setPreviousGDP(e.target.value)}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 p-3 border text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Current Year GDP (Billions)</label>
                  <input
                    type="number"
                    value={currentGDP}
                    onChange={(e) => setCurrentGDP(e.target.value)}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 p-3 border text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Number of Years</label>
                  <input
                    type="number"
                    value={periods}
                    onChange={(e) => setPeriods(e.target.value)}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 p-3 border text-lg"
                    min="1"
                  />
                </div>
              </>
            )}

            {calculationType === "contribution" && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Sector GDP (Billions)</label>
                  <input
                    type="number"
                    value={sectorGDP}
                    onChange={(e) => setSectorGDP(e.target.value)}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 p-3 border text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Total GDP (Billions)</label>
                  <input
                    type="number"
                    value={totalGDP}
                    onChange={(e) => setTotalGDP(e.target.value)}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 p-3 border text-lg"
                  />
                </div>
              </>
            )}

            {calculationType === "deflator" && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Nominal GDP (Current Prices, Billions)</label>
                  <input
                    type="number"
                    value={nominalGDP}
                    onChange={(e) => setNominalGDP(e.target.value)}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 p-3 border text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Real GDP (Base Year Prices, Billions)</label>
                  <input
                    type="number"
                    value={realGDP}
                    onChange={(e) => setRealGDP(e.target.value)}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 p-3 border text-lg"
                  />
                </div>
              </>
            )}
          </div>

          <button
            onClick={calculateGDP}
            className="mt-8 w-full bg-amber-600 text-white font-bold py-4 px-4 rounded-xl hover:bg-amber-700 transition shadow-lg text-lg uppercase tracking-wide"
          >
            Calculate
          </button>
        </div>

        <div className="lg:col-span-7 bg-amber-50 rounded-xl p-8 border border-amber-200 shadow-inner flex flex-col justify-center">
          {result !== null ? (
            <div>
              <h2 className="text-lg font-bold text-amber-900 mb-2 text-center uppercase tracking-wider">
                {result.label}
              </h2>
              <div className="text-5xl md:text-6xl font-black text-center text-amber-700 mb-6 pb-6 border-b border-amber-200">
                {result.value.toFixed(2)}%
              </div>

              <div className={`text-center py-6 px-6 rounded-lg border border-opacity-50 font-semibold text-lg ${result.color}`}>
                {result.description}
              </div>
            </div>
          ) : (
            <div className="text-center text-amber-800 opacity-60 font-medium p-8">
              Enter GDP data to perform calculations.
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title="GDP Calculator"
        whatIsIt={
          <>
            <p>
              The <strong>GDP Calculator</strong> helps analyze economic data from multiple perspectives. It calculates GDP growth rates, sector contributions to the economy, and GDP deflator values to measure inflation and economic health.
            </p>
          </>
        }
        formula={
          <>
            <p>The calculator uses three different economic formulas:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
              <li><strong>Growth Rate:</strong> [(Current GDP / Previous GDP)^(1/Years) - 1] × 100</li>
              <li><strong>Contribution:</strong> (Sector GDP / Total GDP) × 100</li>
              <li><strong>Deflator:</strong> (Nominal GDP / Real GDP) × 100</li>
            </ul>
          </>
        }
        example={
          <>
            <p>For GDP growth from $21.5 trillion (Year 1) to $22 trillion (Year 2):</p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
              <li>Ratio = 22 / 21.5 = 1.0233</li>
              <li>Growth Rate = (1.0233 - 1) × 100 = <strong>2.33%</strong> annual growth</li>
              <li>This indicates healthy economic expansion</li>
            </ul>
          </>
        }
        useCases={
          <ul className="list-disc pl-6 space-y-4">
            <li><strong>Economic Analysis:</strong> Track national economic growth and performance over time.</li>
            <li><strong>Investment Decisions:</strong> Evaluate economic conditions for investment opportunities.</li>
            <li><strong>Policy Planning:</strong> Governments use GDP metrics to assess policy effectiveness.</li>
            <li><strong>Education:</strong> Economics students analyze economic data and trends.</li>
          </ul>
        }
        faqs={[
          {
            question: "What's the difference between nominal and real GDP?",
            answer: "Nominal GDP is measured at current prices and includes inflation. Real GDP is adjusted for inflation using a base year, showing the actual economic output. Real GDP better reflects true economic growth.",
          },
          {
            question: "What does a GDP deflator greater than 100 mean?",
            answer: "A deflator greater than 100 (compared to the base year of 100) indicates inflation. For example, a deflator of 120 means prices have increased 20% since the base year.",
          },
          {
            question: "Why is GDP growth important?",
            answer: "GDP growth indicates economic expansion, job creation, and improved living standards. Consistent growth is generally viewed as positive, though very rapid growth can indicate overheating and inflation risks.",
          },
        ]}
        relatedCalculators={[
          { name: "Inflation Calculator", path: "/inflation-calculator", desc: "Calculate inflation rates and purchasing power" },
          { name: "Compound Growth Rate", path: "/cagr-calculator", desc: "Calculate CAGR and compound growth" },
          { name: "Percentage Change Calculator", path: "/percentage-change-calculator", desc: "Calculate percentage changes" },
          { name: "Revenue Calculator", path: "/revenue-calculator", desc: "Calculate business revenue metrics" },
        ]}
      />
    </div>
  );
}
