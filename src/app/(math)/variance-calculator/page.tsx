"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function VarianceCalculator() {
  const [dataInput, setDataInput] = useState("10.5, 12.1, 8.4, 9.6, 11");
  const [dataType, setDataType] = useState<"population" | "sample">("sample");

  const [result, setResult] = useState<{
    mean: number;
    variance: number;
    standardDeviation: number;
    count: number;
    sumOfSquaredDifferences: number;
  } | null>(null);

  const calculateVariance = () => {
    // Parse valid numbers from string
    const data = dataInput.split(/[\s,]+/).map(val => parseFloat(val)).filter(val => !isNaN(val));
    const n = data.length;

    if (n > 1) { 
      // 1. Mean
      const sum = data.reduce((acc, curr) => acc + curr, 0);
      const mean = sum / n;

      // 2. SS
      const squaredDifferences = data.map(val => Math.pow(val - mean, 2));
      const ss = squaredDifferences.reduce((acc, curr) => acc + curr, 0);

      // 3. Variance
      const denominator = dataType === "population" ? n : (n - 1);
      const variance = ss / denominator;

      // 4. SD
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
        Variance Calculator
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Quantify precisely how far your dataset's numbers are spread out from their collective mean value.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-5 bg-gray-50 p-6 rounded-xl border border-gray-200">
          
          <div className="space-y-6">
            <div>
               <h2 className="text-xl font-bold mb-4 text-gray-800">1. Data Target</h2>
               <div className="flex bg-white rounded-lg border border-gray-300 overflow-hidden shadow-sm">
                 <button
                   className={`flex-1 py-3 text-sm font-bold transition ${dataType === "sample" ? "bg-rose-500 text-white" : "text-gray-600 hover:bg-gray-100"}`}
                   onClick={() => setDataType("sample")}
                 >
                   Sample Variance 
                 </button>
                 <button
                   className={`flex-1 py-3 text-sm font-bold transition ${dataType === "population" ? "bg-rose-500 text-white" : "text-gray-600 hover:bg-gray-100 border-l border-gray-300"}`}
                   onClick={() => setDataType("population")}
                 >
                   Population Variance
                 </button>
               </div>
            </div>

            <div>
               <h2 className="text-xl font-bold mb-2 text-gray-800">2. Input Set</h2>
               <textarea
                 value={dataInput}
                 onChange={(e) => setDataInput(e.target.value)}
                 className="w-full rounded-lg border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 p-4 border text-lg font-mono min-h-[140px]"
                 placeholder="e.g. 100, 105, 98, 110"
               />
               <p className="text-xs text-gray-500 mt-2">
                 Separate numbers via commas or new lines.
               </p>
            </div>
          </div>

          <button
            onClick={calculateVariance}
            className="mt-6 w-full bg-rose-600 text-white font-bold py-4 rounded-xl hover:bg-rose-700 transition shadow-lg text-lg uppercase tracking-wide"
          >
            Calculate Variance
          </button>
        </div>

        <div className="lg:col-span-7 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {result !== null ? (
            <div>
                <div className="bg-rose-50 p-4 border-b border-rose-100 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-rose-900 uppercase">Results</h2>
                </div>
                
                <div className="p-8">
                  <div className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-100 shadow-inner">
                    <div className="text-sm text-gray-500 font-bold uppercase mb-2 tracking-wider text-center">
                        Variance {dataType === "sample" ? "(s²)" : "(σ²)"}
                    </div>
                    <div className="text-5xl md:text-6xl font-black text-center text-rose-600">
                        {result.variance.toPrecision(6)}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-lg bg-white p-4 rounded-lg shadow-sm border border-gray-100 border-l-4 border-rose-500">
                      <span className="text-gray-600 font-semibold">Standard Deviation {dataType === "sample" ? "(s)" : "(σ)"}:</span>
                      <span className="font-bold text-gray-900">
                         {result.standardDeviation.toPrecision(6)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-lg bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                      <span className="text-gray-600 font-semibold">Calculated Mean:</span>
                      <span className="font-bold text-gray-900">
                         {result.mean.toPrecision(6)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                      <span className="text-gray-500 font-semibold">Variable Count (N):</span>
                      <span className="font-bold text-gray-600">
                         {result.count} variables
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
             <div className="text-center text-rose-800 opacity-60 font-medium p-12 my-auto">
                Please enter at least 2 numerical values to calculate statistical variance.
             </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title="Variance Calculator"
        whatIsIt={
          <>
            <p>
              <strong>Variance</strong> is the mathematical expectation of the average squared deviations from the mean. It dictates precisely how spread out data points are. While Standard Deviation is expressed in the same units as the original data, its Variance is expressed in <strong>squared</strong> units.
            </p>
          </>
        }
        formula={
          <>
            <p className="mt-4 font-mono text-lg bg-gray-50 py-2 font-bold text-gray-800 px-4">
              s² = Σ ( xi - x̄ )² / ( n - 1 )
            </p>
            <p className="text-sm mt-2 text-gray-500">
              Where <strong>s²</strong> is Sample Variance, <strong>x̄</strong> is sample mean, and <strong>n</strong> is observations count. For a population (σ²), divide by exactly N instead of N-1.
            </p>
          </>
        }
        example={<></>}
        useCases={<ul className="list-disc pl-6 space-y-4"><li><strong>Data Modeling:</strong> Understanding the sheer baseline distribution profile of variables before passing them into advanced machine learning algorithms.</li></ul>}
        faqs={[]}
        relatedCalculators={[]}
      />
    </div>
  );
}
