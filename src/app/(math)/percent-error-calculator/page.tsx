"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import percentErrorSeoData from "@/data/seo-content/official/percent-error-calculator.json";

export default function PercentErrorCalculator() {
  const [acceptedValue, setAcceptedValue] = useState("100");
  const [experimentalValue, setExperimentalValue] = useState("95");

  const [result, setResult] = useState<{
    absoluteError: number;
    percentError: number;
    isOverEstimated: boolean;
  } | null>(null);

  const calculateError = () => {
    const accepted = parseFloat(acceptedValue);
    const experimental = parseFloat(experimentalValue);

    if (accepted !== 0 && !isNaN(accepted) && !isNaN(experimental)) {
      // Absolute Error: | Experimental - Accepted |
      const rawError = experimental - accepted;
      const absoluteError = Math.abs(rawError);
      
      // Percent Error: (| Experimental - Accepted | / | Accepted |) * 100
      const percentError = (absoluteError / Math.abs(accepted)) * 100;

      setResult({
        absoluteError,
        percentError,
        isOverEstimated: rawError > 0
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-gray-900 border-b pb-4">
        Percent Error Calculator
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Determine how far off your experimental measurements or estimates were from the exact, true accepted value.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-6 bg-gray-50 p-6 rounded-xl border border-gray-200">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Observation Data</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Accepted (True) Value:
              </label>
              <input
                type="number"
                value={acceptedValue}
                onChange={(e) => setAcceptedValue(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-3 border text-lg"
              />
              <p className="text-xs text-gray-500 mt-1">The exact or theoretical correct baseline number.</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Experimental (Observed) Value:
              </label>
              <input
                type="number"
                value={experimentalValue}
                onChange={(e) => setExperimentalValue(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-3 border text-lg"
              />
              <p className="text-xs text-gray-500 mt-1">The number you actually measured or guessed.</p>
            </div>
          </div>

          <button
            onClick={calculateError}
            className="mt-8 w-full bg-purple-600 text-white font-bold py-4 px-4 rounded-xl hover:bg-purple-700 transition shadow-lg text-lg uppercase tracking-wide"
          >
            Calculate % Error
          </button>
        </div>

        <div className="lg:col-span-6 bg-purple-50 rounded-xl p-8 border border-purple-200 shadow-inner flex flex-col justify-center">
          {result !== null ? (
            <div>
              <h2 className="text-lg font-bold text-purple-900 mb-2 text-center uppercase tracking-wider">
                Percent Error
              </h2>
              <div className="text-6xl md:text-7xl font-black text-center text-purple-700 mb-6 pb-6 border-b border-purple-200">
                {result.percentError.toFixed(2)}%
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-lg bg-white p-3 rounded-md shadow-sm border border-purple-100">
                  <span className="text-gray-600 font-semibold">Direction of Error:</span>
                  <span className={`font-bold ${result.isOverEstimated ? 'text-red-600' : 'text-blue-600'}`}>
                    {result.isOverEstimated ? "+ Overestimated" : "- Underestimated"}
                  </span>
                </div>
                
                <div className="flex justify-between items-center text-lg bg-white p-3 rounded-md shadow-sm border border-purple-100">
                  <span className="text-gray-600 font-semibold">Raw Absolute Error:</span>
                  <span className="font-bold text-gray-800">
                    {result.absoluteError.toFixed(4)}
                  </span>
                </div>
              </div>
            </div>
          ) : (
             <div className="text-center text-purple-800 opacity-60 font-medium p-8">
                Input your theoretical goal vs your actual result to view the magnitude of the error.
             </div>
          )}
        </div>
      </div>

      <div className="mt-12">
        <CalculatorSEO
          title={percentErrorSeoData.title}
          whatIsIt={percentErrorSeoData.whatIsIt}
          formula={percentErrorSeoData.formula}
          example={percentErrorSeoData.example}
          useCases={percentErrorSeoData.useCases}
          faqs={percentErrorSeoData.faqs}
          deepDive={percentErrorSeoData.deepDive}
          glossary={percentErrorSeoData.glossary}
          relatedCalculators={[
            {
              name: "Percentage Calculator",
              path: "/percentage-calculator/",
              desc: "Easily calculate percentages, increases, and decreases.",
            },
            {
              name: "Scientific Calculator",
              path: "/scientific-calculator/",
              desc: "Perform advanced mathematical operations and functions.",
            },
            {
              name: "Quadratic Formula Calculator",
              path: "/quadratic-formula-calculator/",
              desc: "Solve quadratic equations instantly.",
            },
            {
              name: "Matrix Calculator",
              path: "/matrix-calculator/",
              desc: "Perform addition, subtraction, and multiplication on matrices.",
            }]}
        />
      </div>
    </div>
  );
}
