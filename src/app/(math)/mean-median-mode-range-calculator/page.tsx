"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function MeanMedianModeRangeCalculator() {
  const [dataInput, setDataInput] = useState("10, 20, 30, 40, 50, 60, 20");

  const [result, setResult] = useState<{
    mean: number;
    median: number;
    mode: string;
    range: number;
    count: number;
    sum: number;
    min: number;
    max: number;
    sortedData: string;
  } | null>(null);

  const calculateStats = () => {
    // Parse valid numbers from string
    const rawData = dataInput.split(/[\s,]+/).map(val => parseFloat(val)).filter(val => !isNaN(val));

    if (rawData.length > 0) {
      const data = [...rawData].sort((a, b) => a - b);
      const n = data.length;

      // Sum & Mean
      const sum = data.reduce((acc, curr) => acc + curr, 0);
      const mean = sum / n;

      // Median
      let median = 0;
      if (n % 2 === 0) {
        median = (data[n / 2 - 1] + data[n / 2]) / 2;
      } else {
        median = data[Math.floor(n / 2)];
      }

      // Mode
      const frequencyList: Record<number, number> = {};
      data.forEach(val => {
        frequencyList[val] = (frequencyList[val] || 0) + 1;
      });

      let maxFreq = 0;
      let modes: number[] = [];
      for (const [key, freq] of Object.entries(frequencyList)) {
        if (freq > maxFreq) {
          maxFreq = freq;
          modes = [parseFloat(key)];
        } else if (freq === maxFreq) {
          modes.push(parseFloat(key));
        }
      }

      let modeStr = "";
      if (maxFreq === 1) {
        modeStr = "No mode (all values unique)";
      } else {
        modeStr = modes.join(", ") + ` (appears ${maxFreq} times)`;
      }

      // Range, Min, Max
      const min = data[0];
      const max = data[n - 1];
      const range = max - min;

      setResult({
        mean,
        median,
        mode: modeStr,
        range,
        count: n,
        sum,
        min,
        max,
        sortedData: data.join(", "),
      });
    } else {
        setResult(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-gray-900 border-b pb-4">
        Mean, Median, Mode & Range Calculator
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Input your dataset to instantly extract the fundamental descriptive statistics used to understand data distribution.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-12 bg-gray-50 p-6 rounded-xl border border-gray-200">
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Enter values separated by commas, spaces, or newlines:
          </label>
          <textarea
            value={dataInput}
            onChange={(e) => setDataInput(e.target.value)}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-4 border text-lg font-mono min-h-[120px]"
            placeholder="e.g. 5, 10, 15, 20"
          />
          <button
            onClick={calculateStats}
            className="mt-6 w-full md:w-auto md:px-12 bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition shadow-md text-lg uppercase tracking-wide"
          >
            Calculate Statistics
          </button>
        </div>

        {result !== null && (
          <div className="lg:col-span-12 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-indigo-50 p-4 border-b border-indigo-100 flex justify-between items-center">
                <h2 className="text-xl font-bold text-indigo-900">Statistical Results</h2>
                <div className="text-sm font-bold text-indigo-700 bg-indigo-200 px-3 py-1 rounded-full">
                    N = {result.count} values
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6 bg-gray-50">
              <div className="bg-white p-5 rounded-lg border-t-4 border-blue-500 shadow-sm">
                <div className="text-sm text-gray-500 font-bold uppercase mb-1">Mean (Average)</div>
                <div className="text-3xl font-black text-gray-900">{result.mean.toPrecision(6)}</div>
              </div>
              
              <div className="bg-white p-5 rounded-lg border-t-4 border-green-500 shadow-sm">
                <div className="text-sm text-gray-500 font-bold uppercase mb-1">Median (Middle)</div>
                <div className="text-3xl font-black text-gray-900">{result.median}</div>
              </div>

              <div className="bg-white p-5 rounded-lg border-t-4 border-purple-500 shadow-sm md:col-span-2 lg:col-span-1">
                <div className="text-sm text-gray-500 font-bold uppercase mb-1">Mode (Most Frequent)</div>
                <div className="text-xl sm:text-2xl font-black text-gray-900 break-words">{result.mode}</div>
              </div>

              <div className="bg-white p-5 rounded-lg border-t-4 border-orange-500 shadow-sm">
                <div className="text-sm text-gray-500 font-bold uppercase mb-1">Range (Max - Min)</div>
                <div className="text-3xl font-black text-gray-900">{result.range}</div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200">
                <h3 className="font-bold text-gray-800 mb-4">Detailed Breakdown:</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gray-50 p-4 rounded border border-gray-100">
                        <span className="block text-xs text-gray-500 uppercase tracking-wider mb-1">Sum of Data (Σx)</span>
                        <span className="font-mono text-lg font-semibold text-gray-800">{result.sum}</span>
                    </div>
                    <div className="bg-gray-50 p-4 rounded border border-gray-100">
                        <span className="block text-xs text-gray-500 uppercase tracking-wider mb-1">Minimum Value</span>
                        <span className="font-mono text-lg font-semibold text-gray-800">{result.min}</span>
                    </div>
                    <div className="bg-gray-50 p-4 rounded border border-gray-100">
                        <span className="block text-xs text-gray-500 uppercase tracking-wider mb-1">Maximum Value</span>
                        <span className="font-mono text-lg font-semibold text-gray-800">{result.max}</span>
                    </div>
                </div>

                <div className="mt-6">
                    <span className="block text-xs text-gray-500 uppercase tracking-wider mb-2">Sorted Data Array (Ascending)</span>
                    <div className="bg-slate-100 text-slate-800 p-4 rounded-lg font-mono text-sm break-all">
                        {result.sortedData}
                    </div>
                </div>
            </div>
          </div>
        )}
      </div>

      <CalculatorSEO
        title="Mean Median Mode Range Calculator"
        whatIsIt={
          <>
            <p>
              This suite calculates the four core <strong>Measures of Central Tendency and Variation</strong> in descriptive statistics:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
              <li><strong>Mean:</strong> The mathematical average of all data points.</li>
              <li><strong>Median:</strong> The exact middle value when data is sorted sequentially.</li>
              <li><strong>Mode:</strong> The value that appears most frequently in the dataset.</li>
              <li><strong>Range:</strong> The sheer difference between the lowest and highest values.</li>
            </ul>
          </>
        }
        formula={
          <>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 font-mono text-lg text-indigo-700 text-center shadow-sm my-6">
              Mean Median Mode Range Analysis Model
            </div>
            <p className="text-sm text-slate-500 text-center">
              This tool utilize standardized mathematical formulas and logic to calculate precise Mean Median Mode Range results.
            </p>
          </>
        }
        example={
          <>
            <p>For the dataset: <strong>[2, 4, 4, 6, 8, 12, 14, 14, 14]</strong></p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
              <li><strong>Mean:</strong> (78 / 9 values) = <strong>8.66</strong></li>
              <li><strong>Median:</strong> The 5th value in the sorted order is exactly <strong>8</strong></li>
              <li><strong>Mode:</strong> 14 appears three times, making <strong>14</strong> the mode.</li>
              <li><strong>Range:</strong> 14 (max) - 2 (min) = <strong>12</strong></li>
            </ul>
          </>
        }
        useCases={<ul className="list-disc pl-6 space-y-4"><li><strong>Data Neutrality:</strong> Understanding why Median income is preferred over Mean income (which gets heavily skewed by a few extreme billionaires).</li></ul>}
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
  );
}
