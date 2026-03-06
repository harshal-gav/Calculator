"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function EmpiricalRuleCalculator() {
  const [mean, setMean] = useState("100");
  const [stdDev, setStdDev] = useState("15");

  const [result, setResult] = useState<{
    sd1Lower: number;
    sd1Upper: number;
    sd2Lower: number;
    sd2Upper: number;
    sd3Lower: number;
    sd3Upper: number;
  } | null>(null);

  const [error, setError] = useState("");

  const calculate = () => {
    setError("");

    const m = parseFloat(mean);
    const s = parseFloat(stdDev);

    if (isNaN(m) || isNaN(s)) {
      setError("Please enter valid numbers for Mean and Standard Deviation.");
      setResult(null);
      return;
    }

    if (s < 0) {
      setError("Standard deviation cannot be negative.");
      setResult(null);
      return;
    }

    setResult({
      sd1Lower: m - s,
      sd1Upper: m + s,
      sd2Lower: m - 2 * s,
      sd2Upper: m + 2 * s,
      sd3Lower: m - 3 * s,
      sd3Upper: m + 3 * s,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-emerald-900 flex items-center justify-center font-serif">
          <span className="mr-3">🔔</span> Empirical Rule Calculator
        </h1>
        <p className="text-emerald-700 text-lg max-w-2xl mx-auto">
          Calculate the 68-95-99.7 rule distribution ranges for normal datasets.
        </p>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-zinc-200 mb-8 max-w-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">
              Mean (μ)
            </label>
            <input
              type="number"
              step="any"
              value={mean}
              onChange={(e) => setMean(e.target.value)}
              className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-emerald-500 font-bold font-mono text-xl transition-all outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">
              Standard Deviation (σ)
            </label>
            <input
              type="number"
              step="any"
              min="0"
              value={stdDev}
              onChange={(e) => setStdDev(e.target.value)}
              className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-emerald-500 font-bold font-mono text-xl transition-all outline-none"
              onKeyDown={(e) => e.key === "Enter" && calculate()}
            />
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl font-bold text-center text-sm">
            {error}
          </div>
        )}

        <button
          onClick={calculate}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-emerald-600/30 uppercase tracking-widest text-lg"
        >
          Calculate 68-95-99.7 Ranges
        </button>
      </div>

      {result !== null && (
        <div className="bg-slate-900 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

          <h2 className="text-emerald-400 font-bold uppercase tracking-widest text-xs mb-8 z-10 text-center">
            Distribution Ranges
          </h2>

          <div className="w-full max-w-2xl z-10 space-y-4">
            {/* 68% */}
            <div className="bg-black/40 border-l-4 border-emerald-400 p-5 rounded-r-2xl border-y border-r border-white/5 flex items-center justify-between">
              <div className="flex-1">
                <span className="text-emerald-400 font-black text-2xl drop-shadow-md">
                  68%
                </span>
                <span className="text-white/50 text-xs font-bold uppercase tracking-widest ml-3">
                  Appx. Data Within 1σ
                </span>
              </div>
              <div className="font-mono font-bold text-white text-xl">
                {result.sd1Lower.toLocaleString("en-US", {
                  maximumFractionDigits: 4,
                })}{" "}
                <span className="text-white/30 mx-2">to</span>{" "}
                {result.sd1Upper.toLocaleString("en-US", {
                  maximumFractionDigits: 4,
                })}
              </div>
            </div>

            {/* 95% */}
            <div className="bg-black/40 border-l-4 border-teal-400 p-5 rounded-r-2xl border-y border-r border-white/5 flex items-center justify-between">
              <div className="flex-1">
                <span className="text-teal-400 font-black text-2xl drop-shadow-md">
                  95%
                </span>
                <span className="text-white/50 text-xs font-bold uppercase tracking-widest ml-3">
                  Appx. Data Within 2σ
                </span>
              </div>
              <div className="font-mono font-bold text-white text-xl">
                {result.sd2Lower.toLocaleString("en-US", {
                  maximumFractionDigits: 4,
                })}{" "}
                <span className="text-white/30 mx-2">to</span>{" "}
                {result.sd2Upper.toLocaleString("en-US", {
                  maximumFractionDigits: 4,
                })}
              </div>
            </div>

            {/* 99.7% */}
            <div className="bg-black/40 border-l-4 border-cyan-400 p-5 rounded-r-2xl border-y border-r border-white/5 flex items-center justify-between">
              <div className="flex-1">
                <span className="text-cyan-400 font-black text-2xl drop-shadow-md">
                  99.7%
                </span>
                <span className="text-white/50 text-xs font-bold uppercase tracking-widest ml-3">
                  Appx. Data Within 3σ
                </span>
              </div>
              <div className="font-mono font-bold text-white text-xl">
                {result.sd3Lower.toLocaleString("en-US", {
                  maximumFractionDigits: 4,
                })}{" "}
                <span className="text-white/30 mx-2">to</span>{" "}
                {result.sd3Upper.toLocaleString("en-US", {
                  maximumFractionDigits: 4,
                })}
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
            name: "Empirical Rule Calculator",
            operatingSystem: "All",
            applicationCategory: "EducationalApplication",
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title="Empirical Rule Calculator (68-95-99.7)"
          whatIsIt={
            <>
              <p>
                The <strong>Empirical Rule Calculator</strong> instantly applies
                the statistical "68-95-99.7 Rule" to your dataset, mapping
                exactly where the vast majority of your data points will fall
                within a normal, bell-shaped distribution curve.
              </p>
              <p>
                This rule acts as a universal statistical shortcut. Instead of
                complex calculus, it mathematically guarantees how data groups
                around the average, proving that extreme outliers are
                exceptionally rare.
              </p>
            </>
          }
          formula={
            <>
              <p>
                The rule is rigid and relies purely on basic addition and
                subtraction of the Standard Deviation (σ) from the dataset's
                Mean (μ):
              </p>
              <div className="bg-emerald-50 p-4 rounded-lg font-mono text-center text-[15px] shadow-sm my-4 text-emerald-900 border border-emerald-100 flex flex-col gap-2">
                <div>
                  <strong>68% of Data:</strong> falls within μ ± 1σ
                </div>
                <div>
                  <strong>95% of Data:</strong> falls within μ ± 2σ
                </div>
                <div>
                  <strong>99.7% of Data:</strong> falls within μ ± 3σ
                </div>
              </div>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                <li>
                  <strong>Mean (μ):</strong> The exact center or peak of the
                  bell curve.
                </li>
                <li>
                  <strong>Standard Deviation (σ):</strong> The unit that
                  measures how "fat" or "skinny" the bell curve is.
                </li>
              </ul>
            </>
          }
          example={
            <>
              <p>
                Imagine the average height of an adult male in a specific town
                is <strong>70 inches (μ)</strong>, with a standard deviation of{" "}
                <strong>3 inches (σ)</strong>.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                <li>
                  <strong>1 Sigma (68%):</strong> 70 ± 3. This proves that 68%
                  of all men in this town are between{" "}
                  <strong>67 and 73 inches</strong> tall.
                </li>
                <li>
                  <strong>2 Sigma (95%):</strong> 70 ± 6. This proves that 95%
                  of all men in this town are between{" "}
                  <strong>64 and 76 inches</strong> tall.
                </li>
                <li>
                  <strong>3 Sigma (99.7%):</strong> 70 ± 9. This proves that
                  99.7% of all men in this town are between{" "}
                  <strong>61 and 79 inches</strong> tall.
                </li>
                <li>
                  <strong>The Outlier:</strong> Finding a man who is 80 inches
                  tall is mathematically a "1 in 1000" rarity, safely considered
                  a massive outlier.
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-gray-700">
              <li>
                <strong>Test Grading (Curving):</strong> Teachers grading on a
                "bell curve" use the 68% tier for C/B students, reserving the
                extreme upper 2.5% tail (beyond +2σ) strictly for A+ grades.
              </li>
              <li>
                <strong>Six Sigma Manufacturing:</strong> Elite factories aim to
                reduce their error rate to "Six Sigma". This means their
                machinery is so precise that a defective part only
                mathematically happens beyond 6 standard deviations (literally
                3.4 defects per million parts).
              </li>
              <li>
                <strong>Stock Market Risk:</strong> Investors analyze historical
                daily stock returns to map the 99.7% tier, determining the
                absolute maximum "worst-case scenario" loss they could suffer on
                a normal trading day.
              </li>
            </ul>
          }
          faqs={[
            {
              question: "Does the Empirical Rule work on ALL data?",
              answer:
                "No! It strictly requires a 'Normal Distribution' (a perfectly symmetrical, bell-shaped curve). If your data is heavily skewed (like wealth distribution, where a few billionaires warp the average), this rule becomes entirely inaccurate.",
            },
            {
              question: "What happens to the remaining 0.3% of data?",
              answer:
                "The final 0.3% (0.15% on the extreme low end, and 0.15% on the extreme high end) represent your true anomalies. These are the geniuses, the lottery winners, or the catastrophic system failures.",
            },
            {
              question: "How does this rule relate to a Z-Score?",
              answer:
                "They are the exact same concept. A Z-Score of +1 is exactly the Upper Bound of the 68% tier. A Z-Score of -2 is exactly the Lower Bound of the 95% tier.",
            },
          ]}
          relatedCalculators={[
            {
              name: "Variance & Std Deviation",
              path: "/variance-calculator",
              desc: "Calculate the base σ value required to utilize this Empirical Rule.",
            },
            {
              name: "Z-Score Calculator",
              path: "/z-score-calculator",
              desc: "Map exact scores to find precisely where they fall on the 68-95-99.7 bell curve.",
            },
            {
              name: "Percentile Calculator",
              path: "/percentile-calculator",
              desc: "Calculate precise percentiles without relying on normal distribution approximations.",
            },
          ]}
        />
      </div>
    </div>
  );
}
