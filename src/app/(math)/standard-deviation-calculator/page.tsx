"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import sdSeoData from "@/data/seo-content/official/standard-deviation-calculator.json";

export default function StandardDeviationCalculator() {
  const [dataInput, setDataInput] = useState("12, 15, 18, 20, 25");
  const [dataType, setDataType] = useState<"population" | "sample">("sample");

  const [result, setResult] = useState<{
    mean: number;
    variance: number;
    standardDeviation: number;
    count: number;
    sumOfSquaredDifferences: number;
  } | null>(null);

  const calculateSD = () => {
    // Parse valid numbers from string
    const data = dataInput.split(/[\s,]+/).map(val => parseFloat(val)).filter(val => !isNaN(val));
    const n = data.length;

    if (n > 1) { // Need at least 2 numbers for sample SD
      // 1. Calculate Mean
      const sum = data.reduce((acc, curr) => acc + curr, 0);
      const mean = sum / n;

      // 2. Calculate squared differences
      const squaredDifferences = data.map(val => Math.pow(val - mean, 2));
      const ss = squaredDifferences.reduce((acc, curr) => acc + curr, 0); // sum of squares

      // 3. Calculate Variance
      // Population Variance divides by N.
      // Sample Variance divides by (N - 1) - Bessel's correction.
      const denominator = dataType === "population" ? n : (n - 1);
      const variance = ss / denominator;

      // 4. Calculate Standard Deviation
      const standardDeviation = Math.sqrt(variance);

      setResult({
        mean,
        variance,
        standardDeviation,
        count: n,
        sumOfSquaredDifferences: ss,
      });
    } else {
        setResult(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-gray-900 border-b pb-4">
        Standard Deviation Calculator
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Measure the exact amount of dispersion and volatility within your data utilizing advanced squared differences algorithms.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-5 bg-gray-50 p-6 rounded-xl border border-gray-200">
          
          <div className="space-y-6">
            <div>
               <h2 className="text-xl font-bold mb-4 text-gray-800">1. Select Data Type</h2>
               <div className="flex bg-white rounded-lg border border-gray-300 overflow-hidden shadow-sm">
                 <button
                   className={`flex-1 py-3 text-sm font-bold transition ${dataType === "sample" ? "bg-amber-500 text-white" : "text-gray-600 hover:bg-gray-100"}`}
                   onClick={() => setDataType("sample")}
                 >
                   Sample (N - 1)
                 </button>
                 <button
                   className={`flex-1 py-3 text-sm font-bold transition ${dataType === "population" ? "bg-amber-500 text-white" : "text-gray-600 hover:bg-gray-100 border-l border-gray-300"}`}
                   onClick={() => setDataType("population")}
                 >
                   Population (N)
                 </button>
               </div>
               <p className="text-xs text-gray-500 mt-2">
                 *Use <strong>Sample</strong> if your data is a random subset of a larger group. Use <strong>Population</strong> if you have every single record in existence.
               </p>
            </div>

            <div>
               <h2 className="text-xl font-bold mb-2 text-gray-800">2. Enter Distribution Array</h2>
               <textarea
                 value={dataInput}
                 onChange={(e) => setDataInput(e.target.value)}
                 className="w-full rounded-lg border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 p-4 border text-lg font-mono min-h-[140px]"
                 placeholder="e.g. 5.1, 8.2, 9, 12.4"
               />
            </div>
          </div>

          <button
            onClick={calculateSD}
            className="mt-6 w-full bg-amber-600 text-white font-bold py-4 rounded-xl hover:bg-amber-700 transition shadow-lg text-lg uppercase tracking-wide"
          >
            Compute Dispersion
          </button>
        </div>

        <div className="lg:col-span-7 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {result !== null ? (
            <div>
                <div className="bg-amber-50 p-4 border-b border-amber-100 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-amber-900 uppercase">Analysis Results</h2>
                </div>
                
                <div className="p-8">
                  <div className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-100 shadow-inner">
                    <div className="text-sm text-gray-500 font-bold uppercase mb-2 tracking-wider text-center">
                        Standard Deviation {dataType === "sample" ? "(s)" : "(σ)"}
                    </div>
                    <div className="text-5xl md:text-6xl font-black text-center text-amber-600">
                        {result.standardDeviation.toPrecision(6)}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-lg bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                      <span className="text-gray-600 font-semibold">Variance {dataType === "sample" ? "(s²)" : "(σ²)"}:</span>
                      <span className="font-bold text-gray-900">
                         {result.variance.toPrecision(6)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-lg bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                      <span className="text-gray-600 font-semibold">Sample Mean (x̄):</span>
                      <span className="font-bold text-gray-900">
                         {result.mean.toPrecision(6)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                      <span className="text-gray-500 font-semibold">Observations Count (N):</span>
                      <span className="font-bold text-gray-600">
                         {result.count} values
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-sm bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                      <span className="text-gray-500 font-semibold">Sum of Squares (SS):</span>
                      <span className="font-bold text-gray-600">
                         {result.sumOfSquaredDifferences.toPrecision(6)}
                      </span>
                    </div>
                  </div>
                </div>
            </div>
          ) : (
             <div className="text-center text-amber-800 opacity-60 font-medium p-12 my-auto">
                Please enter at least 2 numerical values to calculate standard deviation and variance.
             </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title={sdSeoData.title}
        whatIsIt={sdSeoData.whatIsIt}
        formula={sdSeoData.formula}
        example={sdSeoData.example}
        useCases={sdSeoData.useCases}
        faqs={sdSeoData.faqs}
        deepDive={sdSeoData.deepDive}
        glossary={sdSeoData.glossary}
        relatedCalculators={[
          {
            name: "Average Calculator",
            path: "/average-calculator/",
            desc: "Calculate the arithmetic mean, median, and mode for a dataset.",
          },
          {
            name: "Percentage Calculator",
            path: "/percentage-calculator/",
            desc: "Easily calculate percentages, increases, and decreases.",
          },
          {
            name: "Scientific Notation Converter",
            path: "/scientific-notation-converter/",
            desc: "Convert numbers into exponential scientific representation.",
          },
          {
            name: "Fraction Calculator",
            path: "/fraction-calculator/",
            desc: "Add, subtract, multiply, and divide rational fractions.",
          }
        ]}
      />
    </div>
  );
}
