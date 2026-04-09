"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import logSeoData from "@/data/seo-content/official/log-calculator.json";

export default function LogCalculator() {
  const [number, setNumber] = useState("100");
  const [base, setBase] = useState("10");
  const [logType, setLogType] = useState<"common" | "natural" | "custom">("common");
  const [customBase, setCustomBase] = useState("2");

  const [result, setResult] = useState<{
    result: number;
    log10: number;
    ln: number;
    log2: number;
    custom: number;
    baseUsed: number;
    explanation: string;
  } | null>(null);

  const calculateLog = () => {
    const num = parseFloat(number) || 0;

    if (num <= 0) {
      return;
    }

    // Calculate various logarithms
    const log10 = Math.log10(num);
    const ln = Math.log(num);
    const log2 = Math.log2(num);

    let baseUsed = 0;
    let selectedResult = 0;
    let explanation = "";

    if (logType === "common") {
      selectedResult = log10;
      baseUsed = 10;
      explanation = "Common logarithm (base 10)";
    } else if (logType === "natural") {
      selectedResult = ln;
      baseUsed = Math.E;
      explanation = `Natural logarithm (base e ≈ ${Math.E.toFixed(4)})`;
    } else {
      const custBase = parseFloat(customBase) || 10;
      if (custBase <= 0 || custBase === 1) {
        return;
      }
      selectedResult = Math.log(num) / Math.log(custBase);
      baseUsed = custBase;
      explanation = `Logarithm base ${custBase}`;
    }

    let custom = 0;
    const custBaseVal = parseFloat(customBase) || 2;
    if (custBaseVal > 0 && custBaseVal !== 1) {
      custom = Math.log(num) / Math.log(custBaseVal);
    }

    setResult({
      result: selectedResult,
      log10,
      ln,
      log2,
      custom,
      baseUsed,
      explanation,
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-white rounded-3xl shadow-xl border border-cyan-50">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-cyan-50 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Logarithm Calculator</h1>
          <p className="text-slate-500 font-medium mt-1 text-lg">Calculate logs with any base.</p>
        </div>
        <div className="bg-cyan-50 px-4 py-2 rounded-full border border-cyan-100 shrink-0">
          <span className="text-cyan-600 font-bold text-sm uppercase tracking-wider">Advanced Math</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 shadow-inner space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Number (x)</label>
              <input
                type="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 p-3 border text-lg"
                placeholder="100"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Logarithm Type</label>
              <div className="space-y-2">
                <button
                  className={`w-full py-2 px-4 rounded-lg font-semibold transition ${
                    logType === "common"
                      ? "bg-cyan-600 text-white"
                      : "bg-white text-gray-700 border border-gray-300 hover:border-gray-400"
                  }`}
                  onClick={() => setLogType("common")}
                >
                  Common Log (base 10)
                </button>
                <button
                  className={`w-full py-2 px-4 rounded-lg font-semibold transition ${
                    logType === "natural"
                      ? "bg-cyan-600 text-white"
                      : "bg-white text-gray-700 border border-gray-300 hover:border-gray-400"
                  }`}
                  onClick={() => setLogType("natural")}
                >
                  Natural Log (base e)
                </button>
                <button
                  className={`w-full py-2 px-4 rounded-lg font-semibold transition ${
                    logType === "custom"
                      ? "bg-cyan-600 text-white"
                      : "bg-white text-gray-700 border border-gray-300 hover:border-gray-400"
                  }`}
                  onClick={() => setLogType("custom")}
                >
                  Custom Base
                </button>
              </div>
            </div>

            {logType === "custom" && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Base (b)</label>
                <input
                  type="number"
                  value={customBase}
                  onChange={(e) => setCustomBase(e.target.value)}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 p-3 border text-lg"
                  placeholder="2"
                  min="0"
                  step="0.1"
                />
              </div>
            )}

            <div className="text-sm text-gray-600 bg-cyan-50 p-4 rounded-lg border border-cyan-100">
              <p className="font-semibold mb-2">Formula:</p>
              <p className="font-mono">log<sub>b</sub>(x) = y means b<sup>y</sup> = x</p>
            </div>
          </div>

          <button
            onClick={calculateLog}
            className="mt-8 w-full bg-cyan-600 text-white font-bold py-4 px-4 rounded-xl hover:bg-cyan-700 transition shadow-lg text-lg uppercase tracking-wide"
          >
            Calculate Log
          </button>
        </div>

        <div className="lg:col-span-7 bg-cyan-50 rounded-xl p-8 border border-cyan-200 shadow-inner flex flex-col justify-center">
          {result !== null ? (
            <div>
              <h2 className="text-lg font-bold text-cyan-900 mb-2 text-center uppercase tracking-wider">
                {result.explanation}
              </h2>
              <div className="text-6xl md:text-7xl font-black text-center text-cyan-700 mb-6 pb-6 border-b border-cyan-200">
                {result.result.toFixed(4)}
              </div>

              <div className="bg-white p-5 rounded-xl border border-cyan-100 shadow-sm space-y-3">
                <h3 className="font-bold text-gray-800 mb-4 text-center">All Logarithms for {number}</h3>

                <div className="py-2 border-b border-gray-200">
                  <p className="text-gray-700">
                    <span className="font-semibold">log₁₀({number}):</span>
                    <span className="float-right font-mono font-bold text-cyan-600">
                      {result.log10.toFixed(6)}
                    </span>
                  </p>
                </div>

                <div className="py-2 border-b border-gray-200">
                  <p className="text-gray-700">
                    <span className="font-semibold">ln({number}):</span>
                    <span className="float-right font-mono font-bold text-cyan-600">
                      {result.ln.toFixed(6)}
                    </span>
                  </p>
                </div>

                <div className="py-2 border-b border-gray-200">
                  <p className="text-gray-700">
                    <span className="font-semibold">log₂({number}):</span>
                    <span className="float-right font-mono font-bold text-cyan-600">
                      {result.log2.toFixed(6)}
                    </span>
                  </p>
                </div>

                {logType === "custom" && (
                  <div className="py-2">
                    <p className="text-gray-700">
                      <span className="font-semibold">log₍ₓ₎({number}):</span>
                      <span className="float-right font-mono font-bold text-cyan-600">
                        {result.custom.toFixed(6)}
                      </span>
                    </p>
                  </div>
                )}
              </div>

              <div className="bg-cyan-100 p-4 rounded-lg mt-4 text-sm text-cyan-900 font-mono">
                <p>
                  {result.baseUsed.toFixed(3)}<sup>{result.result.toFixed(4)}</sup> = {number}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center text-cyan-800 opacity-60 font-medium p-8">
              Enter a number to calculate its logarithms.
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title={logSeoData.title}
        whatIsIt={logSeoData.whatIsIt}
        formula={logSeoData.formula}
        example={logSeoData.example}
        useCases={logSeoData.useCases}
        faqs={logSeoData.faqs}
        deepDive={logSeoData.deepDive}
        glossary={logSeoData.glossary}
        relatedCalculators={[
          { name: "Exponential Calculator", path: "/exponential-calculator/", desc: "Calculate exponents and powers" },
          { name: "Scientific Calculator", path: "/scientific-calculator/", desc: "Advanced mathematical calculations" },
          { name: "Square Root Calculator", path: "/square-root-calculator/", desc: "Calculate square roots and nth roots" },
          { name: "Antilog Calculator", path: "/antilog-calculator/", desc: "Find the antilogarithm" },
        ]}
      />
    </div>
  );
}
