"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function PercentileCalculator() {
  const [dataInput, setDataInput] = useState(
    "12, 15, 18, 20, 22, 25, 30, 35, 40, 50",
  );
  const [percentileInput, setPercentileInput] = useState("90");

  const [result, setResult] = useState<{
    value: number;
    percentile: number;
    sortedData: number[];
    indexDesc: string;
  } | null>(null);

  const [error, setError] = useState("");

  const calculate = () => {
    setError("");

    const rawValues = dataInput
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s !== "");
    const data = rawValues.map(Number);
    const p = parseFloat(percentileInput);

    if (data.some(isNaN)) {
      setError("Please enter valid numbers separated by commas.");
      setResult(null);
      return;
    }

    if (isNaN(p) || p < 0 || p > 100) {
      setError("Percentile must be a number between 0 and 100.");
      setResult(null);
      return;
    }

    const n = data.length;
    if (n === 0) {
      setError("Please enter at least one number.");
      setResult(null);
      return;
    }

    const sorted = [...data].sort((a, b) => a - b);

    let value = 0;
    let indexDesc = "";

    if (n === 1) {
      value = sorted[0];
      indexDesc = "Only 1 value";
    } else {
      // Using the NIST method (also used closely by Excel's PERCENTILE.INC)
      // Rank r = (P / 100) * (N - 1) + 1
      const rank = (p / 100) * (n - 1);
      const lowerIndex = Math.floor(rank);
      const upperIndex = Math.ceil(rank);
      const fraction = rank - lowerIndex;

      if (lowerIndex === upperIndex) {
        value = sorted[lowerIndex];
        indexDesc = `Exact match at sorted index ${lowerIndex + 1}`;
      } else {
        value =
          sorted[lowerIndex] +
          fraction * (sorted[upperIndex] - sorted[lowerIndex]);
        indexDesc = `Interpolated between sorted index ${lowerIndex + 1} and ${upperIndex + 1}`;
      }
    }

    setResult({
      value,
      percentile: p,
      sortedData: sorted,
      indexDesc,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-violet-900 flex items-center justify-center font-serif">
          <span className="mr-3">📏</span> Percentile Calculator
        </h1>
        <p className="text-violet-700 text-lg max-w-2xl mx-auto">
          Find the exact value at a specific percentile within a given dataset.
        </p>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-zinc-200 mb-8 max-w-3xl mx-auto">
        <div className="space-y-6 mb-8">
          <div>
            <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">
              Enter Data Set
            </label>
            <p className="text-xs text-zinc-500 mb-3 font-medium">
              Numbers separated by commas
            </p>
            <textarea
              rows={3}
              value={dataInput}
              onChange={(e) => setDataInput(e.target.value)}
              className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-violet-500 font-bold font-mono text-lg transition-all outline-none"
              placeholder="e.g. 5, 10, 15, 20"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">
              Target Percentile
            </label>
            <div className="relative max-w-xs">
              <input
                type="number"
                step="any"
                min="0"
                max="100"
                value={percentileInput}
                onChange={(e) => setPercentileInput(e.target.value)}
                className="w-full rounded-xl border-zinc-300 shadow-sm p-4 pr-10 border focus:border-violet-500 font-bold font-mono text-2xl transition-all outline-none"
                onKeyDown={(e) => e.key === "Enter" && calculate()}
              />
              <span className="absolute right-4 top-4 text-zinc-400 font-bold text-xl">
                %
              </span>
            </div>
            <p className="text-xs text-zinc-500 mt-2 font-medium">
              0 is the minimum, 100 is the maximum, 50 is the median.
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl font-bold text-center text-sm">
            {error}
          </div>
        )}

        <button
          onClick={calculate}
          className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-violet-600/30 uppercase tracking-widest text-lg"
        >
          Calculate Percentile
        </button>
      </div>

      {result !== null && (
        <div className="bg-slate-900 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

          <h2 className="text-violet-400 font-bold uppercase tracking-widest text-xs mb-8 z-10 text-center">
            {result.percentile}th Percentile Result
          </h2>

          <div className="z-10 relative mb-8 w-full max-w-sm">
            <div className="p-8 rounded-3xl border-4 bg-violet-900/40 border-violet-500/30 shadow-inner flex flex-col items-center justify-center">
              <span className="text-violet-300 text-[10px] font-bold uppercase tracking-widest mb-3 block border-b border-violet-500/50 pb-2 w-full text-center">
                Value at Percentile
              </span>
              <div className="font-mono font-black text-5xl md:text-6xl text-white break-all tracking-tight drop-shadow-lg p-2">
                {Number.isInteger(result.value)
                  ? result.value
                  : result.value.toLocaleString("en-US", {
                      maximumFractionDigits: 4,
                    })}
              </div>
            </div>
          </div>

          <div className="w-full max-w-2xl z-10 space-y-4">
            <div className="bg-black/40 p-5 rounded-xl border border-white/10 text-center flex flex-col items-center">
              <span className="text-white/40 text-[10px] uppercase tracking-widest font-bold mb-2 block">
                Calculation Method Hint
              </span>
              <div className="text-violet-200 text-sm font-medium">
                {result.indexDesc}
              </div>
              <div className="text-xs text-white/30 mt-1">
                Based on {result.sortedData.length} total data points
              </div>
            </div>

            <div className="bg-black/20 p-5 rounded-xl border border-white/5">
              <span className="text-white/40 text-[10px] uppercase tracking-widest font-bold mb-2 block">
                Sorted Data Reference
              </span>
              <div className="font-mono text-xs text-white/60 break-words leading-relaxed max-h-32 overflow-y-auto pr-2">
                {result.sortedData.join(", ")}
              </div>
            </div>
          </div>
        </div>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Percentile Calculator",
            operatingSystem: "All",
            applicationCategory: "EducationalApplication",
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title="Exact Percentile Data Calculator"
          whatIsIt={
            <>
              <p>
                The <strong>Percentile Calculator</strong> analyzes a raw list
                of numbers to determine the exact value that sits at a specific
                percentage threshold (from 0 to 100).
              </p>
              <p>
                For example, if a student scored in the 90th percentile on a
                test, it means they scored <em>higher</em> than 90% of all the
                other students who took that exact same test.
              </p>

              <p className="mt-4 text-sm text-gray-500">
                <strong>Related Terms:</strong> Percentile Calculator
              </p>
            </>
          }
          formula={
          <>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 font-mono text-lg text-indigo-700 text-center shadow-sm my-6">
              Percentile Analysis Model
            </div>
            <p className="text-sm text-slate-500 text-center">
              This tool utilize standardized mathematical formulas and logic to calculate precise Percentile results.
            </p>
          </>
        }
          example={
            <>
              <p>
                Imagine an office of 6 employees making the following hourly
                wages: <strong>$15, $18, $20, $22, $28, $35</strong>. What exact
                hourly wage represents the mathematically true{" "}
                <strong>80th Percentile</strong>?
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                <li>
                  <strong>1. Find the Rank:</strong> r = (80 / 100) × (6 - 1) +
                  1 = 0.8 × 5 + 1 = <strong>5.0</strong>.
                </li>
                <li>
                  <strong>2. Match the Rank:</strong> Because the rank
                  mathematically landed on a perfect whole number (the 5th
                  index), we simply look at the 5th number in the sorted list.
                </li>
                <li>
                  <strong>The Result:</strong> The 5th number is $28. Therefore,{" "}
                  <strong>$28/hour</strong> is the exact 80th Percentile wage.
                  If the rank was a decimal like 5.5, we would interpolate
                  halfway between the 5th ($28) and 6th ($35) numbers ($31.50).
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-gray-700">
              <li>
                <strong>HR & Salary Negotiation:</strong> Companies use
                percentiles to ensure fair compensation. Refusing to pay below
                the "25th percentile" of the industry standard ensures
                competitive hiring.
              </li>
              <li>
                <strong>Cloud Computing & Web Dev:</strong> Monitoring server
                latency using "P99" (The 99th Percentile). If the P99 load time
                is 2 seconds, it guarantees that 99% of all users load the
                website in 2 seconds or faster.
              </li>
              <li>
                <strong>Sports Analytics:</strong> Comparing athletes against
                historical databases. Reaching the "95th percentile" in sprint
                speed definitively proves elite performance relative to peers.
              </li>
            </ul>
          }
          faqs={[
            {
              question: "How does this differ from the Mean (Average)?",
              answer:
                "The Mean simply adds everything up and divides by the count. It is heavily skewed by massive numbers. For example, if Bill Gates walks into an average bar, the 'mean' wealth of that room instantly spikes to a billion dollars. But the '50th percentile' wealth remains exactly the same—a much more accurate metric of reality.",
            },
            {
              question: "What is the 50th Percentile technically called?",
              answer:
                "The Median. By definition, the Median is the exact middle point of your sorted data, splitting the dataset 50/50. The 25th percentile is called the lower 'Quartile', and the 75th is the upper 'Quartile'.",
            },
            {
              question: "Why do you need to interpolate?",
              answer:
                "If you have 10 data points and want the 77th percentile, there is no physical 7.7th number in the list. The calculator must mathematically construct a phantom number suspended 70% of the way between the 7th and 8th numbers.",
            },
          ]}
          relatedCalculators={[
            {
              name: "Mean, Median, Mode",
              path: "/mean-median-mode-calculator/",
              desc: "Calculate the true '50th percentile' median of your dataset.",
            },
            {
              name: "Z-Score Calculator",
              path: "/z-score-calculator/",
              desc: "Map raw scores onto a bell curve to approximate their percentile.",
            },
            {
              name: "Variance Calculator",
              path: "/variance-calculator/",
              desc: "Measure exactly how scattered your data is around the center point.",
            },
            {
              name: "Percentage Calculator",
              path: "/percentage-calculator/",
              desc: "Easily calculate percentages, increases, and decreases.",
            }]}
        />
      </div>
    </div>
  );
}
