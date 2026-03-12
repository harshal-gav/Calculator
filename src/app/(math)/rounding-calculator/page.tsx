"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function RoundingCalculator() {
  const [numInput, setNumInput] = useState("3.14159265");
  const [roundDecimals, setRoundDecimals] = useState("2");
  const [roundingMode, setRoundingMode] = useState<"nearest" | "up" | "down">("nearest");

  const [result, setResult] = useState<{
    original: number;
    rounded: number;
    difference: number;
    stringRep: string;
  } | null>(null);

  const calculateRounding = () => {
    const original = parseFloat(numInput);
    const precision = parseInt(roundDecimals, 10);

    if (!isNaN(original) && !isNaN(precision)) {
      const factor = Math.pow(10, precision);
      
      let rounded = 0;
      if (roundingMode === "nearest") {
         rounded = Math.round(original * factor) / factor;
      } else if (roundingMode === "up") {
         rounded = Math.ceil(original * factor) / factor;
      } else if (roundingMode === "down") {
         rounded = Math.floor(original * factor) / factor;
      }

      setResult({
        original,
        rounded,
        difference: rounded - original,
        stringRep: rounded.toFixed(Math.max(0, precision)),
      });
    } else {
        setResult(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-gray-900 border-b pb-4">
        Rounding Calculator
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Precisely truncate or round decimal values uniformly to exactly match necessary sig-figs or fractional requirements.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Original Number:
              </label>
              <input
                type="number"
                value={numInput}
                onChange={(e) => setNumInput(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 p-3 border text-lg"
              />
            </div>

            <div className="bg-white p-4 border border-teal-200 rounded-lg shadow-sm">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Rounding Mode / Strategy:
                </label>
                <div className="flex gap-2">
                    <button onClick={() => setRoundingMode("nearest")} className={`flex-1 py-2 text-sm font-bold rounded ${roundingMode === "nearest" ? "bg-teal-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>Nearest</button>
                    <button onClick={() => setRoundingMode("up")} className={`flex-1 py-2 text-sm font-bold rounded ${roundingMode === "up" ? "bg-teal-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>Force Up</button>
                    <button onClick={() => setRoundingMode("down")} className={`flex-1 py-2 text-sm font-bold rounded ${roundingMode === "down" ? "bg-teal-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>Force Down</button>
                </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Decimals Places (0 = Whole Number):
              </label>
              <input
                type="number"
                value={roundDecimals}
                onChange={(e) => setRoundDecimals(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 p-3 border text-lg"
              />
            </div>
          </div>

          <button
            onClick={calculateRounding}
            className="mt-8 w-full bg-teal-600 text-white font-bold py-4 rounded-xl hover:bg-teal-700 transition shadow-lg text-lg uppercase tracking-wide"
          >
            Round Number
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col items-center justify-center p-8 relative">
          {result !== null ? (
            <div className="text-center w-full z-10">
                <div className="text-sm text-gray-500 font-bold uppercase mb-2 tracking-wider">
                    Rounded Result
                </div>
                <div className="text-5xl md:text-6xl font-black text-center text-teal-600 break-all bg-teal-50 py-6 rounded-lg border border-teal-100 mb-6">
                    {result.stringRep}
                </div>

                <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm bg-gray-50 p-3 rounded shadow-sm border border-gray-100">
                      <span className="text-gray-500 font-semibold">Change Factor:</span>
                      <span className={`font-bold ${result.difference > 0 ? 'text-green-600' : result.difference < 0 ? 'text-red-600' : 'text-gray-600'}`}>
                         {result.difference > 0 ? "+" : ""}{result.difference.toPrecision(4)}
                      </span>
                    </div>
                </div>
            </div>
          ) : (
             <div className="text-center text-teal-800 opacity-60 font-medium z-10">
                Input your raw value and strict precision threshold constraint to enforce formatting.
             </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title="Rounding Decimals Calculator"
        whatIsIt={
          <>
            <p>
              This utility is an automated decimal formatting tool designed to calculate perfectly rounded integers or fractional numbers across scientific, financial, or spatial precision levels.
            </p>
          </>
        }
        formula={<></>}
        example={
          <>
             <p><strong>Common Mathematics Standards:</strong></p>
             <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
              <li><strong>Hundredths (2 decimals):</strong> Primarily used for all fiat currencies (e.g. $10.45).</li>
              <li><strong>Thousandths (3 decimals):</strong> Often required for machine-grade tolerances.</li>
              <li><strong>Whole numbers (0 decimals):</strong> Applied when counting discrete objects that cannot be fractionalized.</li>
            </ul>
            <p className="mt-4 text-sm bg-blue-50 p-4 border-l-4 border-blue-400 text-gray-700">When rounding standardly, the cutoff is the halfway point. E.g. 5.5 becomes 6, but 5.4 becomes 5.</p>
          </>
        }
        useCases={<ul className="list-disc pl-6 space-y-4"><li><strong>Web Developers:</strong> Guaranteeing Javascript numerical floating-point errors (e.g. 0.30000000004) are cleanly handled before saving API payloads to strict databases.</li></ul>}
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
