"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import covarianceSeoData from "@/data/seo-content/official/covariance-calculator.json";

export default function CovarianceCalculator() {
  const [xData, setXData] = useState("10, 20, 30, 40, 50");
  const [yData, setYData] = useState("15, 25, 38, 45, 55");

  const [result, setResult] = useState<{
    popCov: number;
    sampCov: number;
    meanX: number;
    meanY: number;
    count: number;
  } | null>(null);

  const [error, setError] = useState("");

  const calculate = () => {
    setError("");

    const parseData = (str: string) =>
      str
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s !== "")
        .map(Number);
    const xArr = parseData(xData);
    const yArr = parseData(yData);

    if (xArr.some(isNaN) || yArr.some(isNaN)) {
      setError("Please enter valid numbers separated by commas.");
      setResult(null);
      return;
    }

    if (xArr.length !== yArr.length) {
      setError(`Data mismatch: X has ${xArr.length} values, Y has ${yArr.length} values.`);
      setResult(null);
      return;
    }

    const n = xArr.length;
    if (n < 2) {
      setError("Please enter at least two data points for each set.");
      setResult(null);
      return;
    }

    const meanX = xArr.reduce((a, b) => a + b, 0) / n;
    const meanY = yArr.reduce((a, b) => a + b, 0) / n;

    let sumCrossDiff = 0;
    for (let i = 0; i < n; i++) {
      sumCrossDiff += (xArr[i] - meanX) * (yArr[i] - meanY);
    }

    setResult({
      popCov: sumCrossDiff / n,
      sampCov: sumCrossDiff / (n - 1),
      meanX,
      meanY,
      count: n,
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-3xl shadow-xl border border-purple-50">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-purple-100 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Covariance Calculator</h1>
          <p className="text-slate-600 font-medium mt-1 text-lg">Measure the directional relationship between two paired datasets.</p>
        </div>
        <div className="bg-purple-50 px-4 py-2 rounded-full border border-purple-100 shrink-0">
          <span className="text-purple-600 font-bold text-sm uppercase tracking-wider font-mono">Bivariate Analysis</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-12 xl:col-span-5 space-y-4">
          <div className="bg-white p-8 rounded-3xl border border-purple-100 shadow-sm space-y-6">
            <div>
              <label className="block text-[10px] font-bold text-zinc-400 mb-2 uppercase tracking-widest">Dataset X (Independent/Variable 1)</label>
              <textarea
                value={xData}
                onChange={(e) => setXData(e.target.value)}
                rows={3}
                className="w-full rounded-2xl border-zinc-200 p-4 shadow-sm focus:border-purple-500 bg-zinc-50 font-mono text-sm outline-none transition-all resize-none"
                placeholder="2, 4, 6, 8..."
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-zinc-400 mb-2 uppercase tracking-widest">Dataset Y (Dependent/Variable 2)</label>
              <textarea
                value={yData}
                onChange={(e) => setYData(e.target.value)}
                rows={3}
                className="w-full rounded-2xl border-zinc-200 p-4 shadow-sm focus:border-purple-500 bg-zinc-50 font-mono text-sm outline-none transition-all resize-none"
                placeholder="3, 5, 7, 9..."
              />
            </div>

            {error && (
              <div className="p-4 bg-red-50 text-red-600 border border-red-100 rounded-xl font-bold text-center text-sm">
                {error}
              </div>
            )}

            <button
              onClick={calculate}
              className="w-full bg-purple-600 text-white font-black py-5 px-4 rounded-2xl hover:bg-purple-700 transition shadow-xl shadow-purple-200 text-xl uppercase tracking-widest active:scale-[0.98]"
            >
              Calculate Covariance
            </button>
          </div>
        </div>

        <div className="lg:col-span-12 xl:col-span-7 bg-slate-900 rounded-3xl p-8 border border-white/5 shadow-2xl flex flex-col justify-center relative overflow-hidden min-h-[400px]">
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>
          
          {result !== null ? (
            <div className="relative z-10 w-full space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 p-8 rounded-3xl border border-white/5 text-center group hover:border-purple-500/30 transition-colors">
                  <span className="block text-[10px] font-bold text-purple-300 uppercase tracking-widest mb-4">Sample Covariance (s_xy)</span>
                  <div className="text-4xl md:text-5xl font-black text-white font-mono break-all drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                    {result.sampCov.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                  </div>
                </div>
                <div className="bg-white/5 p-8 rounded-3xl border border-white/5 text-center group hover:border-fuchsia-500/30 transition-colors">
                  <span className="block text-[10px] font-bold text-fuchsia-300 uppercase tracking-widest mb-4">Population Cov (σ_xy)</span>
                  <div className="text-4xl md:text-5xl font-black text-white font-mono break-all drop-shadow-[0_0_15px_rgba(217,70,239,0.4)]">
                    {result.popCov.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                  <span className="block text-[8px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Pairs (n)</span>
                  <span className="text-xl font-bold text-white">{result.count}</span>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                  <span className="block text-[8px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Mean X</span>
                  <span className="text-xl font-bold text-white">{result.meanX.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                  <span className="block text-[8px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Mean Y</span>
                  <span className="text-xl font-bold text-white">{result.meanY.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-10">
              <div className="w-24 h-24 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-8 text-purple-400 text-5xl font-serif border border-purple-500/20">
                Cov
              </div>
              <div className="text-purple-100 opacity-60 font-bold text-lg px-8 max-w-sm mx-auto tracking-tight leading-relaxed font-serif italic text-center">
                "Covariance profiles the joint variability of two random variables."
              </div>
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title={covarianceSeoData.title}
        whatIsIt={covarianceSeoData.whatIsIt}
        formula={covarianceSeoData.formula}
        example={covarianceSeoData.example}
        useCases={covarianceSeoData.useCases}
        faqs={covarianceSeoData.faqs}
        deepDive={covarianceSeoData.deepDive}
        glossary={covarianceSeoData.glossary}
        relatedCalculators={[
          {
            name: "Correlation Coefficient Calculator",
            path: "/correlation-calculator/",
            desc: "Normalize your covariance to find the strict strength of lead-lag relationships.",
          },
          {
            name: "Variance Calculator",
            path: "/variance-calculator/",
            desc: "Calculate the internal spread and self-covariance of a single dataset.",
          },
          {
            name: "Standard Deviation Calculator",
            path: "/standard-deviation-calculator/",
            desc: "Find the mean dispersion of your data points for statistical verification.",
          },
          {
            name: "Z-Score Calculator",
            path: "/z-score-calculator/",
            desc: "Standardize your variables to see how many deviations they sit from the center.",
          }
        ]}
      />
    </div>
  );
}
