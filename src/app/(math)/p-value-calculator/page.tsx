"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import pValueSeoData from "@/data/seo-content/official/p-value-calculator.json";

// Approximation of the error function
function erf(x: number): number {
  const a1 =  0.254829592;
  const a2 = -0.284496736;
  const a3 =  1.421413741;
  const a4 = -1.453152027;
  const a5 =  1.061405429;
  const p  =  0.3275911;

  const sign = x < 0 ? -1 : 1;
  x = Math.abs(x);

  const t = 1.0 / (1.0 + p * x);
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

  return sign * y;
}

// Approximation of chi-square CDF
function chiSquareCDF(x: number, df: number): number {
  if (x < 0) return 0;
  if (x === 0) return 0;

  const k = df / 2;
  if (df > 30) {
    const z = Math.sqrt(2 * x) - Math.sqrt(2 * df - 1);
    return (1 + erf(z / Math.sqrt(2))) / 2;
  }

  let P = 0;
  const lam = x / 2;
  let term2 = Math.exp(-lam);

  for (let i = 1; i <= Math.floor(df / 2); i++) {
    P += term2;
    term2 *= lam / i;
  }

  const a = df / 2;
  term2 = 1;
  let sum2 = 1;

  for (let i = 1; i < 100; i++) {
    term2 *= x / (2 * (a + i));
    sum2 += term2;
    if (Math.abs(term2) < 1e-10) break;
  }

  return P + (Math.exp(-x / 2 - a * Math.log(x / 2) + a * Math.log(a) -
            (a > 0 ? a * Math.log(Math.E) - a : 0))) * sum2 / a;
}

export default function PValueCalculator() {
  const [testType, setTestType] = useState<"chi-square" | "t-test" | "z-test">("chi-square");
  const [testStat, setTestStat] = useState("5.5");
  const [degreesOfFreedom, setDegreesOfFreedom] = useState("5");
  const [tailType, setTailType] = useState<"two-tailed" | "right-tailed" | "left-tailed">("two-tailed");

  const [result, setResult] = useState<{
    pValue: number;
    significance: string;
    interpretation: string;
    color: string;
  } | null>(null);

  const calculatePValue = () => {
    const stat = parseFloat(testStat) || 0;
    const df = parseInt(degreesOfFreedom) || 1;

    if (stat < 0 && testType !== "t-test") {
      return;
    }

    let pValue = 0;
    let color = "";
    let significance = "";
    let interpretation = "";

    if (testType === "chi-square") {
      const cdf = chiSquareCDF(stat, df);
      pValue = 1 - cdf;
    } else if (testType === "t-test") {
      const absT = Math.abs(stat);
      if (df > 30) {
        const z = absT;
        pValue = 2 * (1 - (1 + erf(z / Math.sqrt(2))) / 2);
      } else {
        pValue = Math.exp(-0.5 * stat * stat) / Math.sqrt(Math.PI * df);
        pValue = Math.min(1, pValue * 2);
      }
    } else {
      const absZ = Math.abs(stat);
      pValue = 2 * (1 - (1 + erf(absZ / Math.sqrt(2))) / 2);
    }

    if (tailType === "right-tailed") {
      pValue = pValue / (testType === "chi-square" || testType === "z-test" ? 2 : 1);
    } else if (tailType === "left-tailed") {
      pValue = pValue / (testType === "chi-square" || testType === "z-test" ? 2 : 1);
    }

    pValue = Math.max(0, Math.min(1, pValue));

    if (pValue < 0.001) {
      significance = "Very Strong Evidence";
      color = "text-red-700 border-red-200 bg-red-50";
      interpretation = "Highly significant (p < 0.001) - Strong evidence against null hypothesis";
    } else if (pValue < 0.01) {
      significance = "Strong Evidence";
      color = "text-red-600 border-red-200 bg-red-50";
      interpretation = "Very significant (p < 0.01) - Reject null hypothesis";
    } else if (pValue < 0.05) {
      significance = "Significant";
      color = "text-orange-600 border-orange-200 bg-orange-50";
      interpretation = "Significant at 0.05 level - Reject null hypothesis";
    } else if (pValue < 0.1) {
      significance = "Marginally Significant";
      color = "text-yellow-600 border-yellow-200 bg-yellow-50";
      interpretation = "Marginally significant - Consider evidence weak";
    } else {
      significance = "Not Significant";
      color = "text-green-600 border-green-200 bg-green-50";
      interpretation = "Not significant - Fail to reject null hypothesis";
    }

    setResult({
      pValue,
      significance,
      interpretation,
      color,
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-white rounded-3xl shadow-xl border border-purple-50">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-purple-50 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">P-value Calculator</h1>
          <p className="text-slate-500 font-medium mt-1 text-lg">Calculate statistical significance.</p>
        </div>
        <div className="bg-purple-50 px-4 py-2 rounded-full border border-purple-100 shrink-0">
          <span className="text-purple-600 font-bold text-sm uppercase tracking-wider">Statistics</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 shadow-inner space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Statistical Test Type</label>
              <div className="space-y-2">
                <button
                  className={`w-full py-2 px-4 rounded-lg font-semibold transition ${
                    testType === "chi-square"
                      ? "bg-purple-600 text-white"
                      : "bg-white text-gray-700 border border-gray-300 hover:border-gray-400"
                  }`}
                  onClick={() => setTestType("chi-square")}
                >
                  Chi-Square Test
                </button>
                <button
                  className={`w-full py-2 px-4 rounded-lg font-semibold transition ${
                    testType === "t-test"
                      ? "bg-purple-600 text-white"
                      : "bg-white text-gray-700 border border-gray-300 hover:border-gray-400"
                  }`}
                  onClick={() => setTestType("t-test")}
                >
                  T-Test
                </button>
                <button
                  className={`w-full py-2 px-4 rounded-lg font-semibold transition ${
                    testType === "z-test"
                      ? "bg-purple-600 text-white"
                      : "bg-white text-gray-700 border border-gray-300 hover:border-gray-400"
                  }`}
                  onClick={() => setTestType("z-test")}
                >
                  Z-Test
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Test Statistic Value</label>
              <input
                type="number"
                value={testStat}
                onChange={(e) => setTestStat(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-3 border text-lg"
                step="0.1"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Degrees of Freedom</label>
              <input
                type="number"
                value={degreesOfFreedom}
                onChange={(e) => setDegreesOfFreedom(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-3 border text-lg"
                min="1"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Tail Type</label>
              <div className="space-y-2">
                <button
                  className={`w-full py-2 px-4 rounded-lg text-sm font-semibold transition ${
                    tailType === "two-tailed"
                      ? "bg-purple-600 text-white"
                      : "bg-white text-gray-700 border border-gray-300"
                  }`}
                  onClick={() => setTailType("two-tailed")}
                >
                  Two-Tailed
                </button>
                <button
                  className={`w-full py-2 px-4 rounded-lg text-sm font-semibold transition ${
                    tailType === "right-tailed"
                      ? "bg-purple-600 text-white"
                      : "bg-white text-gray-700 border border-gray-300"
                  }`}
                  onClick={() => setTailType("right-tailed")}
                >
                  Right-Tailed
                </button>
                <button
                  className={`w-full py-2 px-4 rounded-lg text-sm font-semibold transition ${
                    tailType === "left-tailed"
                      ? "bg-purple-600 text-white"
                      : "bg-white text-gray-700 border border-gray-300"
                  }`}
                  onClick={() => setTailType("left-tailed")}
                >
                  Left-Tailed
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={calculatePValue}
            className="mt-8 w-full bg-purple-600 text-white font-bold py-4 px-4 rounded-xl hover:bg-purple-700 transition shadow-lg text-lg uppercase tracking-wide"
          >
            Calculate P-Value
          </button>
        </div>

        <div className="lg:col-span-7 bg-purple-50 rounded-xl p-8 border border-purple-200 shadow-inner flex flex-col justify-center">
          {result !== null ? (
            <div>
              <h2 className="text-lg font-bold text-purple-900 mb-2 text-center uppercase tracking-wider">
                P-Value Result
              </h2>
              <div className="text-6xl md:text-7xl font-black text-center text-purple-700 mb-6 pb-6 border-b border-purple-200">
                {result.pValue.toFixed(6)}
              </div>

              <div className={`text-center py-6 px-6 rounded-lg border border-opacity-50 font-bold text-xl md:text-2xl mb-6 ${result.color}`}>
                {result.significance}
              </div>

              <div className="bg-white p-5 rounded-xl border border-purple-100 shadow-sm">
                <h3 className="font-bold text-gray-800 mb-3 text-center">Interpretation</h3>
                <p className="text-gray-700 text-center">{result.interpretation}</p>

                <div className="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-600">
                  <p className="mb-2"><strong>Standard Significance Levels:</strong></p>
                  <ul className="space-y-1">
                    <li>p &lt; 0.001: Extremely significant</li>
                    <li>p &lt; 0.01: Very significant</li>
                    <li>p &lt; 0.05: Significant</li>
                    <li>p &gt; 0.05: Not significant</li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-purple-800 opacity-60 font-medium p-8">
              Enter test statistic and degrees of freedom to calculate p-value.
            </div>
          )}
        </div>
      </div>

      <div className="mt-12">
        <CalculatorSEO
          title={pValueSeoData.title}
          whatIsIt={pValueSeoData.whatIsIt}
          formula={pValueSeoData.formula}
          example={pValueSeoData.example}
          useCases={pValueSeoData.useCases}
          faqs={pValueSeoData.faqs}
          deepDive={pValueSeoData.deepDive}
          glossary={pValueSeoData.glossary}
          relatedCalculators={[
            { name: "T-Test Calculator", path: "/t-test-calculator/", desc: "Perform independent and paired t-tests" },
            { name: "Chi-Square Test", path: "/chi-square-calculator/", desc: "Calculate chi-square statistics" },
            { name: "Z-Score Calculator", path: "/z-score-calculator/", desc: "Calculate standard normal values" },
            { name: "Standard Deviation", path: "/standard-deviation-calculator/", desc: "Calculate statistical measures" },
          ]}
        />
      </div>
    </div>
  );
}
