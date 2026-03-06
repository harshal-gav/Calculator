"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function MeanMedianModeCalculator() {
  const [inputData, setInputData] = useState("10, 20, 30, 40, 50, 50, 60");

  const [result, setResult] = useState<{
    mean: number;
    median: number;
    modes: number[];
    range: number;
    count: number;
    sum: number;
    sorted: number[];
  } | null>(null);

  const calculateStats = () => {
    // Parse input safely
    const rawValues = inputData.split(/[\s,]+/).filter(Boolean);
    const numbers = rawValues
      .map((v) => parseFloat(v))
      .filter((v) => !isNaN(v));

    if (numbers.length === 0) {
      setResult(null);
      return;
    }

    const count = numbers.length;
    const sum = numbers.reduce((a, b) => a + b, 0);
    const mean = sum / count;

    // Sort ascending for median and range
    const sorted = [...numbers].sort((a, b) => a - b);

    let median = 0;
    if (count % 2 === 0) {
      median = (sorted[count / 2 - 1] + sorted[count / 2]) / 2;
    } else {
      median = sorted[Math.floor(count / 2)];
    }

    const range = sorted[count - 1] - sorted[0];

    // Mode
    const frequency: Record<number, number> = {};
    let maxFreq = 0;
    numbers.forEach((num) => {
      frequency[num] = (frequency[num] || 0) + 1;
      if (frequency[num] > maxFreq) maxFreq = frequency[num];
    });

    const modes = [];
    for (const num in frequency) {
      if (frequency[num] === maxFreq) {
        modes.push(parseFloat(num));
      }
    }

    // If all numbers appear the exact same number of times and freq > 0, it means no specific mode formally.
    // We'll just return the array anyway, UI handles "All numbers appear..."

    setResult({
      mean,
      median,
      modes: modes.sort((a, b) => a - b),
      range,
      count,
      sum,
      sorted,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-indigo-700 border-b pb-4">
        Mean, Median, Mode Calculator
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Enter a raw data set to instantly calculate its central tendencies,
        range, sum, processing count, and sorted order.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100 space-y-6 flex flex-col justify-center">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Enter Data Values (separated by commas or spaces)
            </label>
            <textarea
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
              className="w-full rounded-xl border-gray-300 p-4 shadow-sm focus:border-indigo-500 font-mono text-lg text-gray-800 h-40 resize-none"
              placeholder="e.g. 12, 18, 24, 33"
            ></textarea>
            <p className="text-xs text-gray-500 mt-2 font-medium">
              Invalid or empty entries are automatically stripped.
            </p>
          </div>

          <button
            onClick={calculateStats}
            className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-700 transition shadow-lg uppercase tracking-wide mt-2"
          >
            Calculate Statistics
          </button>
        </div>

        {/* Results Screen */}
        <div className="bg-white border-2 border-indigo-100 rounded-xl overflow-hidden shadow-sm flex flex-col justify-center">
          {result !== null ? (
            <div className="w-full h-full flex flex-col">
              {/* Top Core Metrics */}
              <div className="grid grid-cols-3 gap-0 border-b border-indigo-100">
                <div className="p-6 text-center border-r border-indigo-50 bg-indigo-500 text-white">
                  <h3 className="text-indigo-200 font-bold uppercase tracking-widest text-[10px] mb-1">
                    Mean
                  </h3>
                  <div className="text-2xl font-black">
                    {result.mean.toLocaleString("en-US", {
                      maximumFractionDigits: 4,
                    })}
                  </div>
                </div>
                <div className="p-6 text-center border-r border-indigo-50 bg-indigo-600 text-white shadow-inner z-10">
                  <h3 className="text-indigo-200 font-bold uppercase tracking-widest text-[10px] mb-1">
                    Median
                  </h3>
                  <div className="text-3xl font-black">
                    {result.median.toLocaleString("en-US", {
                      maximumFractionDigits: 4,
                    })}
                  </div>
                </div>
                <div className="p-6 text-center bg-indigo-700 text-white">
                  <h3 className="text-indigo-200 font-bold uppercase tracking-widest text-[10px] mb-1">
                    Mode
                  </h3>
                  <div
                    className="text-2xl font-black overflow-hidden text-ellipsis whitespace-nowrap"
                    title={result.modes.join(", ")}
                  >
                    {result.count === result.modes.length
                      ? "None"
                      : result.modes
                          .map((n) =>
                            n.toLocaleString("en-US", {
                              maximumFractionDigits: 4,
                            }),
                          )
                          .join(", ")}
                  </div>
                </div>
              </div>

              {/* Secondary Metrics */}
              <div className="p-6 flex-grow bg-gray-50 space-y-3">
                <div className="flex justify-between items-center p-3 rounded-lg bg-white border border-gray-200 shadow-sm">
                  <span className="font-bold text-gray-500 uppercase text-xs tracking-widest">
                    Range
                  </span>
                  <span className="font-black text-xl text-gray-800">
                    {result.range.toLocaleString("en-US", {
                      maximumFractionDigits: 4,
                    })}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-white border border-gray-200 shadow-sm">
                  <span className="font-bold text-gray-500 uppercase text-xs tracking-widest">
                    Sum
                  </span>
                  <span className="font-bold text-lg text-gray-800">
                    {result.sum.toLocaleString("en-US", {
                      maximumFractionDigits: 4,
                    })}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-white border border-gray-200 shadow-sm">
                  <span className="font-bold text-gray-500 uppercase text-xs tracking-widest">
                    Valid Count
                  </span>
                  <span className="font-bold text-lg text-gray-800">
                    {result.count}
                  </span>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <span className="block font-bold text-gray-400 uppercase text-[10px] tracking-widest mb-2">
                    Sorted Data Set
                  </span>
                  <div className="w-full max-h-24 overflow-y-auto bg-gray-100 p-3 rounded border border-gray-200 font-mono text-xs text-gray-600 leading-relaxed break-all">
                    {result.sorted.join(", ")}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-center text-indigo-300 font-medium px-8 text-lg leading-relaxed py-10">
              Provide a sequence of numbers to instantly break down the
              statistical distribution of the dataset.
            </div>
          )}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Mean, Median, Mode Calculator",
            operatingSystem: "All",
            applicationCategory: "EducationalApplication",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title="Mean, Median & Mode Calculator"
          whatIsIt={
            <>
              <p>
                Our <strong>Mean, Median, and Mode Calculator</strong> is an
                advanced statistical utility that instantly analyzes any raw
                dataset. By simply dropping in a list of numbers, you receive
                immediate insight into the central numerical tendencies, total
                range, exact sum, and formal distribution of the data.
              </p>
              <p>
                Whether you're a high-school student verifying algebra homework,
                a data analyst cleaning survey entries, or a business owner
                calculating average daily revenue, understanding how data
                centers itself is the most crucial first step in any statistical
                analysis.
              </p>
            </>
          }
          formula={
            <>
              <p>
                The "Central Tendency" of a dataset is measured using three
                distinct formulas depending on what kind of average you are
                looking for.
              </p>
              <div className="bg-indigo-50 p-4 rounded-lg font-mono text-center text-[15px] shadow-sm my-4 flex flex-col gap-2 border border-indigo-100 text-indigo-900">
                <p>
                  <strong>
                    Mean (Average) = (Sum of all values) ÷ (Total number of
                    values)
                  </strong>
                </p>
                <p className="mt-2 pt-2 border-t border-indigo-200">
                  <strong>
                    Median = The absolute middle value when sorted sequentially
                  </strong>
                </p>
                <p className="mt-2 pt-2 border-t border-indigo-200">
                  <strong>
                    Mode = The specific value that appears most frequently
                  </strong>
                </p>
              </div>
            </>
          }
          example={
            <>
              <p>
                Let's evaluate the test scores from a small classroom to see why
                calculating all three metrics is so important.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                <li>
                  <strong>The Dataset:</strong> The 5 students scored:{" "}
                  <strong>85, 92, 85, 45, 95</strong> on their exam.
                </li>
                <li>
                  <strong>The Mean:</strong> (85 + 92 + 85 + 45 + 95) ÷ 5 ={" "}
                  <strong>80.4</strong> (This average is heavily pulled down by
                  the single failing 45 score).
                </li>
                <li>
                  <strong>The Median:</strong> Sorted order is [45, 85, 85, 92,
                  95]. The middle number is <strong>85</strong> (This gives a
                  more accurate representation of the typical student).
                </li>
                <li>
                  <strong>The Mode:</strong> The number <strong>85</strong>{" "}
                  appears twice, making it the most common score.
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-gray-700">
              <li>
                <strong>Real Estate Valuation:</strong> Housing prices are
                notoriously skewed by massive mansions. Finding the "Median"
                home price in a neighborhood is infinitely more accurate than
                the "Mean", as one $10M mansion will drag the Mean up
                drastically while the Median stays grounded.
              </li>
              <li>
                <strong>Retail Inventory:</strong> A shoe store manager uses the
                "Mode." They don't care what the "average" shoe size is; they
                need to know which shoe size was physically sold the most often
                (the mode) so they can bulk order that specific size.
              </li>
              <li>
                <strong>Financial Grading:</strong> Teachers use the "Mean" to
                calculate final class grades, ensuring every single assignment
                and its mathematical weight is evenly distributed across a
                student's final percentage.
              </li>
            </ul>
          }
          faqs={[
            {
              question:
                "What happens if there are two numbers in the exact middle for the Median?",
              answer:
                "If your dataset has an even amount of numbers (e.g., 6 numbers), there is no single middle number. Instead, you take the two numbers closest to the middle and calculate their exact average (Mean). Our calculator handles this logic automatically.",
            },
            {
              question: "Can a dataset have more than one Mode?",
              answer:
                "Yes, this is called 'Bimodal' or 'Multimodal' distribution. If two different numbers both appear exactly 5 times, and nothing else appears more than that, both of those numbers are the Mode. Our calculator will return all applicable Modes.",
            },
            {
              question: "What is the 'Range'?",
              answer:
                "The Range simply measures the algebraic distance between the absolute lowest number in your set and the highest. If your lowest number is 10 and your highest is 50, your Range is exactly 40 (50 minus 10).",
            },
          ]}
          relatedCalculators={[
            {
              name: "Standard Deviation Calculator",
              path: "/standard-deviation-calculator",
              desc: "Measure exactly how scattered or clustered your dataset is.",
            },
            {
              name: "Z-Score Calculator",
              path: "/z-score-calculator",
              desc: "Compare individual data points against the statistical normal.",
            },
            {
              name: "Probability Calculator",
              path: "/probability-calculator",
              desc: "Determine the exact likelihood of random statistical events occurring.",
            },
          ]}
        />
      </div>
    </div>
  );
}
