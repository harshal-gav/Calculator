"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

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
        title="Standard Deviation & Variance Calculator"
        whatIsIt={
          <>
            <p>
              <strong>Standard Deviation</strong> is the definitive statistical measure of the amount of variation or dispersion within a set of values. 
            </p>
            <p className="mt-2">
              A low standard deviation indicates that the values tend to be tightly clustered very close to the mean (average), while a high standard deviation indicates that the values are spread out over a much wider range (high volatility).
            </p>
          </>
        }
        formula={
          <>
            <p>The calculation sequence differs fundamentally based on whether you are looking at a <strong>Sample</strong> or a total <strong>Population</strong> (known as Bessel's Correction):</p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
              <li><strong>Step 1:</strong> Find the mean (average) of the dataset.</li>
              <li><strong>Step 2:</strong> Subtract the mean from every single data point to find its "Deviation".</li>
              <li><strong>Step 3:</strong> Sqaure each of those deviations to remove negative values.</li>
              <li><strong>Step 4:</strong> Find the <em>Variance</em> by dividing the Sum of Squares by <strong>(N)</strong> for a Population, or <strong>(N - 1)</strong> for a Sample.</li>
              <li><strong>Step 5:</strong> Standard Deviation is the exact Square Root of that Variance.</li>
            </ul>
          </>
        }
        example={
          <>
            <p><strong>Finance & Volatility:</strong> Standard Deviation is completely synonymous with "Volatility" in stock markets. If a mutual fund has an average return of 8% with a Standard Deviation of 15%, you mathematically know there is a ~68% probability (1 standard deviation on a bell curve) that next year's return will swing anywhere between -7% and +23%.</p>
          </>
        }
        useCases={<ul className="list-disc pl-6 space-y-4"><li><strong>Quality Control:</strong> Manufacturers use standard deviation on assembly lines to ensure screws aren't being cut too thick or too thin compared to the exact target mean.</li></ul>}
        faqs={[]}
        relatedCalculators={[]}
      />
    </div>
  );
}
