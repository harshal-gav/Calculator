"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import moeSeoData from "@/data/seo-content/official/margin-of-error-calculator.json";

export default function MarginOfErrorCalculator() {
  const [sampleSize, setSampleSize] = useState("1000");
  const [populationSize, setPopulationSize] = useState("");
  const [confidenceLevel, setConfidenceLevel] = useState("95");
  const [proportion, setProportion] = useState("50"); // Typical worst-case 50%

  const [result, setResult] = useState<{
    marginOfErrorParams: number; // The +/- %
    confidenceVal: number;
  } | null>(null);

  const [error, setError] = useState("");

  const calculate = () => {
    setError("");

    const n = parseInt(sampleSize);
    const pop = populationSize ? parseInt(populationSize) : Infinity;
    const conf = parseFloat(confidenceLevel);
    const p = parseFloat(proportion) / 100;

    if (isNaN(n) || n <= 0) {
      setError("Sample size must be a positive integer.");
      setResult(null);
      return;
    }

    if (isNaN(conf) || conf <= 0 || conf >= 100) {
      setError("Confidence level must be between 0 and 100.");
      setResult(null);
      return;
    }

    if (isNaN(p) || p < 0 || p > 1) {
      setError("Proportion must be between 0 and 100%.");
      setResult(null);
      return;
    }

    // Find Z-score for common confidence levels
    let z = 1.96; // 95% default
    if (conf === 99) z = 2.576;
    else if (conf === 90) z = 1.645;
    else if (conf === 95) z = 1.96;
    else if (conf === 98) z = 2.326;
    else if (conf === 80) z = 1.282;
    else if (conf === 85) z = 1.44;
    else {
      setError(
        "For this calculator, please use standard confidence levels: 80, 85, 90, 95, 98, or 99.",
      );
      setResult(null);
      return;
    }

    // Standard Error for proportion: SE = sqrt( p*(1-p) / n )
    let standardError = Math.sqrt((p * (1 - p)) / n);

    // Finite Population Correction
    if (pop !== Infinity && pop > n) {
      const fpc = Math.sqrt((pop - n) / (pop - 1));
      standardError *= fpc;
    } else if (pop !== Infinity && pop <= n) {
      setError("Population size must be larger than sample size.");
      setResult(null);
      return;
    }

    const marginOfError = z * standardError;

    setResult({
      marginOfErrorParams: marginOfError * 100, // convert back to percentage
      confidenceVal: conf,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-fuchsia-900 flex items-center justify-center font-serif">
          <span className="mr-3">📊</span> Margin of Error
        </h1>
        <p className="text-fuchsia-700 text-lg max-w-2xl mx-auto">
          Calculate the expected margin of error for survey results and polling
          data.
        </p>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-zinc-200 mb-8 max-w-2xl mx-auto">
        <div className="space-y-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">
                Sample Size (n)
              </label>
              <input
                type="number"
                step="1"
                min="1"
                value={sampleSize}
                onChange={(e) => setSampleSize(e.target.value)}
                className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-fuchsia-500 font-bold font-mono text-xl transition-all outline-none"
              />
              <p className="text-[10px] text-zinc-500 mt-2">
                Number of respondents.
              </p>
            </div>
            <div>
              <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">
                Population (Optional)
              </label>
              <input
                type="number"
                step="1"
                min="1"
                value={populationSize}
                onChange={(e) => setPopulationSize(e.target.value)}
                placeholder="e.g. 100000"
                className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-fuchsia-500 font-bold font-mono text-xl transition-all outline-none"
              />
              <p className="text-[10px] text-zinc-500 mt-2">
                Leave blank if total population is huge or unknown.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">
                Confidence Level (%)
              </label>
              <select
                value={confidenceLevel}
                onChange={(e) => setConfidenceLevel(e.target.value)}
                className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-fuchsia-500 font-bold font-mono text-xl transition-all outline-none bg-white"
              >
                <option value="80">80%</option>
                <option value="85">85%</option>
                <option value="90">90%</option>
                <option value="95">95% (Standard)</option>
                <option value="98">98%</option>
                <option value="99">99%</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">
                Expected Proportion (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="any"
                  min="0"
                  max="100"
                  value={proportion}
                  onChange={(e) => setProportion(e.target.value)}
                  className="w-full rounded-xl border-zinc-300 shadow-sm p-4 pr-10 border focus:border-fuchsia-500 font-bold font-mono text-xl transition-all outline-none"
                  onKeyDown={(e) => e.key === "Enter" && calculate()}
                />
                <span className="absolute right-4 top-4 text-zinc-400 font-bold">
                  %
                </span>
              </div>
              <p className="text-[10px] text-zinc-500 mt-2">
                Defaults to 50% for the most conservative (widest) margin of
                error.
              </p>
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
          className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-fuchsia-600/30 uppercase tracking-widest text-lg"
        >
          Calculate Margin of Error
        </button>
      </div>

      {result !== null && (
        <div className="bg-slate-900 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

          <h2 className="text-fuchsia-400 font-bold uppercase tracking-widest text-xs mb-8 z-10 text-center">
            Results
          </h2>

          <div className="z-10 relative mb-8 w-full max-w-sm">
            <div className="p-8 rounded-3xl border-4 bg-fuchsia-900/40 border-fuchsia-500/30 shadow-inner flex flex-col items-center justify-center">
              <span className="text-fuchsia-300 text-[10px] font-bold uppercase tracking-widest mb-3 block border-b border-fuchsia-500/50 pb-2 w-full text-center">
                Margin of Error
              </span>
              <div className="font-mono font-black text-5xl md:text-6xl text-white break-all tracking-tight drop-shadow-lg p-2 flex items-center">
                <span className="text-3xl text-fuchsia-300 mr-2">±</span>
                {result.marginOfErrorParams.toLocaleString("en-US", {
                  maximumFractionDigits: 3,
                })}
                %
              </div>
            </div>
          </div>

          <div className="bg-black/30 px-6 py-4 rounded-xl border border-white/5 text-center flex flex-col items-center z-10 text-sm w-full max-w-md">
            <span className="text-white/80 font-medium leading-relaxed">
              You can be{" "}
              <strong className="text-fuchsia-300">
                {result.confidenceVal}% confident
              </strong>{" "}
              that the true population parameter falls within{" "}
              <strong className="text-fuchsia-300">
                ±{result.marginOfErrorParams.toFixed(2)}%
              </strong>{" "}
              of your survey results.
            </span>
          </div>
        </div>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Margin of Error Calculator",
            operatingSystem: "All",
            applicationCategory: "EducationalApplication",
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title={moeSeoData.title}
          whatIsIt={moeSeoData.whatIsIt}
          formula={moeSeoData.formula}
          example={moeSeoData.example}
          useCases={moeSeoData.useCases}
          faqs={moeSeoData.faqs}
          deepDive={moeSeoData.deepDive}
          glossary={moeSeoData.glossary}
          relatedCalculators={[
            {
              name: "Confidence Interval Calculator",
              path: "/confidence-interval-calculator/",
              desc: "Calculate the exact upper and lower bounds based on your Margin of Error.",
            },
            {
              name: "Variance Calculator",
              path: "/variance-calculator/",
              desc: "Measure the underlying spread and volatility of your raw survey data.",
            },
            {
              name: "Z-Score Calculator",
              path: "/z-score-calculator/",
              desc: "Calculate the exact Standard Score used as the base multiplier for the MoE formula.",
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
