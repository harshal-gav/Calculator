"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function ZScoreCalculator() {
  const [rawScore, setRawScore] = useState("85");
  const [mean, setMean] = useState("75");
  const [stdDev, setStdDev] = useState("10");

  const [result, setResult] = useState<{
    zScore: number;
    interpretation: string;
    percentileApprox: string; // Estimate for normal distribution
  } | null>(null);

  const [error, setError] = useState("");

  // Approximation of standard normal CDF
  const getZPercentile = (z: number) => {
    // Using error function approximation for normal CDF
    if (z < -8.0) return 0;
    if (z > 8.0) return 100;

    let sum = z,
      value = z;
    for (let j = 1; j <= 100; j++) {
      value = (value * z * z) / (2 * j + 1);
      sum += value;
    }

    const p = 0.5 + (sum / Math.sqrt(2 * Math.PI)) * Math.exp(-(z * z) / 2);
    return p * 100;
  };

  const calculate = () => {
    setError("");

    const x = parseFloat(rawScore);
    const mu = parseFloat(mean);
    const sigma = parseFloat(stdDev);

    if (isNaN(x) || isNaN(mu) || isNaN(sigma)) {
      setResult(null);
      return;
    }

    if (sigma === 0) {
      setError("Standard deviation cannot be zero.");
      setResult(null);
      return;
    }

    if (sigma < 0) {
      setError("Standard deviation must be positive.");
      setResult(null);
      return;
    }

    const z = (x - mu) / sigma;

    let interp = "";
    if (Math.abs(z) < 1)
      interp = "Within 1 standard deviation (Average/Typical)";
    else if (Math.abs(z) < 2)
      interp = "Between 1 and 2 standard deviations (Above/Below Average)";
    else if (Math.abs(z) < 3)
      interp = "Between 2 and 3 standard deviations (Unusual)";
    else interp = "More than 3 standard deviations (Outlier / Highly Unusual)";

    const perc = getZPercentile(z);

    setResult({
      zScore: z,
      interpretation: interp,
      percentileApprox:
        perc > 99.99 ? ">99.99" : perc < 0.01 ? "<0.01" : perc.toFixed(2),
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-blue-900 flex items-center justify-center font-serif">
          <span className="mr-3">📏</span> Z-Score Calculator
        </h1>
        <p className="text-blue-700 text-lg max-w-2xl mx-auto">
          Calculate the standard score (z-value) to see how many standard
          deviations a raw score is from the mean.
        </p>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-zinc-200 mb-8 max-w-2xl mx-auto">
        <div className="space-y-6 mb-8">
          <div>
            <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">
              Raw Score (x)
            </label>
            <input
              type="number"
              step="any"
              value={rawScore}
              onChange={(e) => setRawScore(e.target.value)}
              className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-blue-500 font-bold font-mono text-xl transition-all outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">
                Population Mean (μ)
              </label>
              <input
                type="number"
                step="any"
                value={mean}
                onChange={(e) => setMean(e.target.value)}
                className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-blue-500 font-bold font-mono text-xl transition-all outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">
                Standard Dev (σ)
              </label>
              <input
                type="number"
                step="any"
                min="0"
                value={stdDev}
                onChange={(e) => setStdDev(e.target.value)}
                className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-blue-500 font-bold font-mono text-xl transition-all outline-none"
                onKeyDown={(e) => e.key === "Enter" && calculate()}
              />
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl font-bold text-center text-sm">
            {error}
          </div>
        )}

        <button
          onClick={calculate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-blue-600/30 uppercase tracking-widest text-lg"
        >
          Calculate Z-Score
        </button>
      </div>

      {result !== null && (
        <div className="bg-slate-900 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

          <h2 className="text-blue-400 font-bold uppercase tracking-widest text-xs mb-8 z-10 text-center">
            Standard Score
          </h2>

          <div className="z-10 relative mb-8 w-full max-w-sm">
            <div className="p-8 rounded-3xl border-4 bg-blue-900/40 border-blue-500/30 shadow-inner flex flex-col items-center justify-center">
              <span className="text-blue-300 text-[10px] font-bold uppercase tracking-widest mb-3 block border-b border-blue-500/50 pb-2 w-full text-center">
                Z-SCORE
              </span>
              <div className="font-mono font-black text-5xl md:text-6xl text-white break-all tracking-tight drop-shadow-lg p-2">
                {result.zScore > 0 ? "+" : ""},
                {result.zScore.toLocaleString("en-US", {
                  maximumFractionDigits: 4,
                })}
              </div>
            </div>
          </div>

          <div className="w-full max-w-md z-10 space-y-4">
            <div className="bg-black/40 p-4 rounded-xl border border-white/10 text-center">
              <span className="text-white/40 text-[10px] uppercase tracking-widest font-bold mb-1 block">
                Distribution Interpretation
              </span>
              <div className="font-medium text-blue-100">
                {result.interpretation}
              </div>
            </div>

            <div className="bg-black/40 p-4 rounded-xl border border-white/10 text-center flex flex-col items-center">
              <span className="text-white/40 text-[10px] uppercase tracking-widest font-bold mb-1 block">
                Approximate Percentile
              </span>
              <div className="font-mono font-bold text-cyan-300 text-xl">
                {result.percentileApprox}%
              </div>
              <span className="text-[10px] text-white/30 tracking-wide block mt-1">
                (Assuming normal distribution)
              </span>
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
            name: "Z-Score Calculator",
            operatingSystem: "All",
            applicationCategory: "EducationalApplication",
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title="Z-Score to Percentile Calculator (Standard Score)"
          whatIsIt={
            <>
              <p>
                The <strong>Z-Score Calculator</strong> determines exactly how
                many Standard Deviations a raw data point is located away from
                the average (mean) of the dataset.
              </p>
              <p>
                A Z-Score allows you to instantly compare "apples to oranges."
                For example, if you took the SAT and your friend took the ACT,
                you can use your respective Z-Scores to see who objectively
                performed better compared to the rest of the testing population.
              </p>
            </>
          }
          formula={
            <>
              <p>
                The core philosophy of the Standard Score is subtracting the
                mean from the raw score, then dividing by the standard deviation
                to "normalize" the scale. It is written as:
              </p>
              <div className="bg-blue-50 p-4 rounded-lg font-mono text-center text-[15px] shadow-sm my-4 text-blue-900 border border-blue-100">
                Z = (x - μ) / σ
              </div>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                <li>
                  <strong>x:</strong> The Raw Score (the specific data point you
                  are analyzing).
                </li>
                <li>
                  <strong>μ (Mu):</strong> The Population Mean (the average of
                  the entire dataset).
                </li>
                <li>
                  <strong>σ (Sigma):</strong> The Standard Deviation (how spread
                  out the data generally is).
                </li>
              </ul>
            </>
          }
          example={
            <>
              <p>
                Imagine you run a race in <strong>45 minutes (x)</strong>. The
                average runner finishes in <strong>50 minutes (μ)</strong>, with
                a standard deviation of <strong>5 minutes (σ)</strong>. Did you
                run unusually fast?
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                <li>
                  <strong>The Setup:</strong> Z = (45 - 50) / 5
                </li>
                <li>
                  <strong>The Math:</strong> Z = -5 / 5
                </li>
                <li>
                  <strong>The Result:</strong> Your Z-Score is{" "}
                  <strong>-1.00</strong>. Because time is a metric where lower
                  is better, a negative Z-Score perfectly translates into a
                  positive outcome. You ran exactly 1 Standard Deviation faster
                  than normal!
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-gray-700">
              <li>
                <strong>Medicine & Pediatrics:</strong> Doctors chart infant
                weight and height using Z-Scores to determine if a baby is
                growing normally or if they fall into an extreme outlier
                percentile requiring intervention.
              </li>
              <li>
                <strong>Standardized Testing:</strong> Scoring IQ tests, SATs,
                GREs, and LSATs. Z-Scores map directly into rigid percentiles,
                determining exactly what tier a student's intelligence or
                capability falls into.
              </li>
              <li>
                <strong>Finance & Credit Risk:</strong> The Altman Z-Score
                formula specifically predicts the probability a company will go
                bankrupt within two years based on comparing their financial
                metrics to industry averages.
              </li>
            </ul>
          }
          faqs={[
            {
              question: "What does a Z-Score of 0 mean?",
              answer:
                "A Z-Score of exactly 0.0 means your raw score is mathematically identical to the population mean. You are perfectly average, resting strictly at the 50th percentile of the bell curve.",
            },
            {
              question: "What makes a score an 'Outlier'?",
              answer:
                "Generally, in statistics, any Z-Score beyond +3.0 or -3.0 is considered a drastic outlier. More than 99.7% of all data points will naturally fall between -3 and +3. Anything beyond that is a highly unusual anomaly.",
            },
            {
              question: "Why does the calculator estimate my Percentile?",
              answer:
                "By plugging your calculated Z-Score into the Standard Normal Cumulative Distribution Function (CDF), we can accurately approximate the exact percentage of the population you scored higher than (assuming a normal bell curve).",
            },
          ]}
          relatedCalculators={[
            {
              name: "Variance & Std Deviation",
              path: "/variance-calculator/",
              desc: "Calculate the base σ value required to power this Z-Score formula.",
            },
            {
              name: "Empirical Rule Calculator",
              path: "/empirical-rule-calculator/",
              desc: "Visualize how Z-Scores map onto the 68-95-99.7 bell curve.",
            },
            {
              name: "Percentile Calculator",
              path: "/percentile-calculator/",
              desc: "Calculate exact data percentiles without relying on normal distribution approximations.",
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
