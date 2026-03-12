"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

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
      // (Though pure absolute error sometimes doesn't use absolute value to show direction, standard percent error does)
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

      <CalculatorSEO
        title="Percent Error Calculator"
        whatIsIt={
          <>
            <p>
              A <strong>Percent Error Calculator</strong> computes the relative difference between an exact accepted value and an observed/experimental value, expressing the inaccuracy as a percentage.
            </p>
          </>
        }
        formula={
          <>
            <p>The universal percent error equation employs absolute values to ensure the error magnitude is always expressed as a positive percentage:</p>
            <p className="mt-4 pl-4 border-l-4 border-purple-500 font-mono text-lg bg-gray-50 py-2 font-bold text-gray-800">
              % Error = (| Experimental - Accepted | / | Accepted |) × 100
            </p>
          </>
        }
        example={
          <>
            <p>If a chemistry student boils water and measures its boiling point at <strong>98°C</strong>, but we know the true accepted boiling point of water is <strong>100°C</strong>:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
              <li>Raw Error: |98 - 100| = |-2| = 2°C error</li>
              <li>Ratio: 2 / 100 = 0.02</li>
              <li>Percent Error: 0.02 × 100 = <strong>2.0% Percent Error</strong></li>
            </ul>
          </>
        }
        useCases={<ul className="list-disc pl-6 space-y-4"><li><strong>Financial Estimates:</strong> Seeing how far off your projected Q3 Sales were from the actual audited Q3 revenue.</li></ul>}
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
              name: "Percentage Calculator",
              path: "/percentage-calculator",
              desc: "Easily calculate percentages, increases, and decreases.",
            },
            {
              name: "Scientific Calculator",
              path: "/scientific-calculator",
              desc: "Perform advanced mathematical operations and functions.",
            },
            {
              name: "Quadratic Formula Calculator",
              path: "/quadratic-formula-calculator",
              desc: "Solve quadratic equations instantly.",
            },
            {
              name: "Matrix Calculator",
              path: "/matrix-calculator",
              desc: "Perform addition, subtraction, and multiplication on matrices.",
            }]}
      />
    </div>
  );
}
