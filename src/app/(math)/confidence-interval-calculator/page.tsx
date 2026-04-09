"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import confidenceSeoData from "@/data/seo-content/official/confidence-interval-calculator.json";

export default function ConfidenceIntervalCalculator() {
  const [sampleMean, setSampleMean] = useState("100");
  const [sampleSize, setSampleSize] = useState("50");
  const [stdDev, setStdDev] = useState("15");
  const [confidenceLevel, setConfidenceLevel] = useState("95");

  const [result, setResult] = useState<{
    lowerBounds: number;
    upperBounds: number;
    marginOfError: number;
    confidenceVal: number;
  } | null>(null);

  const [error, setError] = useState("");

  const calculate = () => {
    setError("");

    const m = parseFloat(sampleMean);
    const n = parseInt(sampleSize);
    const s = parseFloat(stdDev);
    const conf = parseFloat(confidenceLevel);

    if (isNaN(m) || isNaN(n) || isNaN(s) || isNaN(conf)) {
      setError("Please enter valid numbers in all fields.");
      setResult(null);
      return;
    }

    if (n <= 1) {
      setError("Sample size must be strictly greater than 1.");
      setResult(null);
      return;
    }

    if (s < 0) {
      setError("Standard deviation cannot be negative.");
      setResult(null);
      return;
    }

    // Z-scores for standard confidence levels
    let z = 1.96;
    if (conf === 99) z = 2.576;
    else if (conf === 90) z = 1.645;
    else if (conf === 95) z = 1.96;
    else if (conf === 98) z = 2.326;
    else if (conf === 80) z = 1.282;
    else if (conf === 85) z = 1.44;
    else {
      setError("Please use a standard confidence level: 80, 85, 90, 95, 98, or 99.");
      setResult(null);
      return;
    }

    const standardError = s / Math.sqrt(n);
    const marginError = z * standardError;

    setResult({
      lowerBounds: m - marginError,
      upperBounds: m + marginError,
      marginOfError: marginError,
      confidenceVal: conf,
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-3xl shadow-xl border border-teal-50">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-teal-100 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Confidence Interval Calculator</h1>
          <p className="text-slate-600 font-medium mt-1 text-lg">Estimate the range of a population parameter with statistical certainty.</p>
        </div>
        <div className="bg-teal-50 px-4 py-2 rounded-full border border-teal-100 shrink-0">
          <span className="text-teal-600 font-bold text-sm uppercase tracking-wider font-mono">Statistical Inference</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-12 xl:col-span-5 space-y-4">
          <div className="bg-white p-8 rounded-3xl border border-teal-100 shadow-sm space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-zinc-400 mb-2 uppercase tracking-widest">Sample Mean (x̄)</label>
                <input
                  type="number"
                  value={sampleMean}
                  onChange={(e) => setSampleMean(e.target.value)}
                  className="w-full rounded-2xl border-zinc-200 p-4 shadow-sm focus:border-teal-500 bg-zinc-50 font-black text-xl text-center outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-zinc-400 mb-2 uppercase tracking-widest">Sample Size (n)</label>
                <input
                  type="number"
                  value={sampleSize}
                  onChange={(e) => setSampleSize(e.target.value)}
                  className="w-full rounded-2xl border-zinc-200 p-4 shadow-sm focus:border-teal-500 bg-zinc-50 font-black text-xl text-center outline-none transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-zinc-400 mb-2 uppercase tracking-widest">Standard Dev (s)</label>
                <input
                  type="number"
                  value={stdDev}
                  onChange={(e) => setStdDev(e.target.value)}
                  className="w-full rounded-2xl border-zinc-200 p-4 shadow-sm focus:border-teal-500 bg-zinc-50 font-black text-xl text-center outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-zinc-400 mb-2 uppercase tracking-widest">Confidence (%)</label>
                <select
                  value={confidenceLevel}
                  onChange={(e) => setConfidenceLevel(e.target.value)}
                  className="w-full rounded-2xl border-zinc-200 p-4 shadow-sm focus:border-teal-500 bg-zinc-50 font-black text-xl text-center outline-none transition-all cursor-pointer"
                >
                  <option value="80">80%</option>
                  <option value="90">90%</option>
                  <option value="95">95%</option>
                  <option value="98">98%</option>
                  <option value="99">99%</option>
                </select>
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 text-red-600 border border-red-100 rounded-xl font-bold text-center text-sm">
                {error}
              </div>
            )}

            <button
              onClick={calculate}
              className="w-full bg-teal-600 text-white font-black py-5 px-4 rounded-2xl hover:bg-teal-700 transition shadow-xl shadow-teal-200 text-xl uppercase tracking-widest active:scale-[0.98]"
            >
              Estimate Interval
            </button>
          </div>
        </div>

        <div className="lg:col-span-12 xl:col-span-7 bg-slate-900 rounded-3xl p-8 border border-white/5 shadow-2xl flex flex-col justify-center relative overflow-hidden min-h-[400px]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>
          
          {result !== null ? (
            <div className="relative z-10 w-full space-y-8">
              <div className="text-center">
                <h2 className="text-xs font-bold text-teal-400 mb-4 uppercase tracking-widest opacity-60">Estimated Population Mean</h2>
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-4xl md:text-6xl font-black text-white font-mono break-all">
                  <span className="text-teal-300 drop-shadow-[0_0_15px_rgba(20,184,166,0.4)]">{result.lowerBounds.toLocaleString(undefined, { maximumFractionDigits: 4 })}</span>
                  <span className="text-zinc-600 text-2xl font-serif italic">to</span>
                  <span className="text-teal-300 drop-shadow-[0_0_15px_rgba(20,184,166,0.4)]">{result.upperBounds.toLocaleString(undefined, { maximumFractionDigits: 4 })}</span>
                </div>
              </div>

              <div className="max-w-xs mx-auto bg-white/5 p-6 rounded-2xl border border-white/5 text-center">
                <span className="block text-[10px] font-bold text-teal-300 uppercase tracking-widest mb-2">Margin of Error (±)</span>
                <span className="text-3xl font-black text-white font-mono">
                  {result.marginOfError.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                </span>
              </div>
            </div>
          ) : (
            <div className="text-center py-10">
              <div className="w-24 h-24 bg-teal-500/10 rounded-full flex items-center justify-center mx-auto mb-8 text-teal-400 text-5xl font-serif border border-teal-500/20">
                CI
              </div>
              <div className="text-teal-100 opacity-60 font-bold text-lg px-8 max-w-sm mx-auto tracking-tight leading-relaxed font-serif italic">
                "Precision without confidence is a guess; confidence without precision is an interval."
              </div>
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title={confidenceSeoData.title}
        whatIsIt={confidenceSeoData.whatIsIt}
        formula={confidenceSeoData.formula}
        example={confidenceSeoData.example}
        useCases={confidenceSeoData.useCases}
        faqs={confidenceSeoData.faqs}
        deepDive={confidenceSeoData.deepDive}
        glossary={confidenceSeoData.glossary}
        relatedCalculators={[
          {
            name: "Z-Score Calculator",
            path: "/z-score-calculator/",
            desc: "Standardize your data points to find their relative position in any distribution.",
          },
          {
            name: "Margin of Error Calculator",
            path: "/margin-of-error-calculator/",
            desc: "Isolate and calculate the specific padding required for your survey accuracy.",
          },
          {
            name: "Standard Deviation Calculator",
            path: "/standard-deviation-calculator/",
            desc: "Measure the dispersion and volatility of your dataset relative to the mean.",
          },
          {
            name: "Average Calculator",
            path: "/average-calculator/",
            desc: "Find the base mathematical mean required for interval estimation.",
          }
        ]}
      />
    </div>
  );
}
