"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

// Approximation of chi-square CDF using series expansion
function chiSquareCDF(x: number, df: number): number {
  if (x < 0) return 0;
  if (x === 0) return 0;

  // Using gamma function approximation
  // For reasonable values, we can use an approximation
  const k = df / 2;

  // Series approximation for chi-square CDF
  let sum = 0;
  let term = Math.exp(-x / 2) * Math.pow(x / 2, 0) / 1;

  for (let i = 1; i < k; i++) {
    term *= x / (2 * i);
    sum += term;
  }

  // More accurate approximation using regularized gamma function
  // This is a simplified version - for production use numerical methods library
  if (df === 1) return 2 * (Math.sqrt(x / (2 * Math.PI))) * Math.exp(-x / 2) - 1 +
                           (2 / Math.sqrt(2 * Math.PI)) *
                           Math.sqrt(x) * Math.exp(-x / 2);

  // Approximate using normal distribution for larger df
  if (df > 30) {
    const z = Math.sqrt(2 * x) - Math.sqrt(2 * df - 1);
    return (1 + Math.erf(z / Math.sqrt(2))) / 2;
  }

  // For small df, use numerical approximation
  let P = 0;
  const lam = x / 2;
  let term2 = Math.exp(-lam);

  for (let i = 1; i <= Math.floor(df / 2); i++) {
    P += term2;
    term2 *= lam / i;
  }

  // Incomplete gamma function approximation
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
      // For t-test, use normal approximation for large df
      const absT = Math.abs(stat);
      if (df > 30) {
        // Use normal approximation
        const z = absT;
        pValue = 2 * (1 - (1 + Math.erf(z / Math.sqrt(2))) / 2);
      } else {
        // Simplified t-distribution approximation
        pValue = Math.exp(-0.5 * stat * stat) / Math.sqrt(Math.PI * df);
        pValue = Math.min(1, pValue * 2);
      }
    } else {
      // Z-test
      const absZ = Math.abs(stat);
      pValue = 2 * (1 - (1 + Math.erf(absZ / Math.sqrt(2))) / 2);
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

      <CalculatorSEO
        title="P-value Calculator"
        whatIsIt={
          <>
            <p>
              The <strong>P-value Calculator</strong> computes the p-value from test statistics in hypothesis testing. The p-value represents the probability of obtaining test results as extreme as observed, assuming the null hypothesis is true. Lower p-values indicate stronger evidence against the null hypothesis.
            </p>
          </>
        }
        formula={
          <>
            <p>The p-value depends on the type of statistical test:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
              <li><strong>Chi-Square:</strong> p = P(χ² ≥ test statistic | df)</li>
              <li><strong>T-Test:</strong> p = P(|t| ≥ |test statistic| | df)</li>
              <li><strong>Z-Test:</strong> p = P(|Z| ≥ |test statistic|)</li>
            </ul>
          </>
        }
        example={
          <>
            <p>For a chi-square test with χ² = 5.5 and 5 degrees of freedom:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
              <li>Use chi-square distribution table or calculator</li>
              <li>Find the tail probability beyond 5.5 with df=5</li>
              <li>Result: p ≈ 0.36</li>
              <li>Interpretation: Not statistically significant (p &gt; 0.05)</li>
            </ul>
          </>
        }
        useCases={
          <ul className="list-disc pl-6 space-y-4">
            <li><strong>Hypothesis Testing:</strong> Determine if study results are statistically significant.</li>
            <li><strong>Research Analysis:</strong> Support scientific claims with statistical evidence.</li>
            <li><strong>Quality Control:</strong> Test whether manufacturing processes meet standards.</li>
            <li><strong>Medical Studies:</strong> Evaluate drug effectiveness and safety trials.</li>
          </ul>
        }
        faqs={[
          {
            question: "What does a p-value of 0.05 mean?",
            answer: "A p-value of 0.05 means there's a 5% probability of observing results as extreme as or more extreme than what you got, assuming the null hypothesis is true. It's a common threshold for statistical significance, though this choice is somewhat arbitrary.",
          },
          {
            question: "Is a smaller p-value always better?",
            answer: "A smaller p-value indicates stronger evidence against the null hypothesis. However, very small p-values can indicate either genuine effects or that you're testing too many hypotheses (multiple comparisons problem).",
          },
          {
            question: "What's the difference between one-tailed and two-tailed tests?",
            answer: "A two-tailed test checks for differences in both directions (more extreme in either tail). A one-tailed test checks for differences in only one direction. Two-tailed tests are more conservative and generally preferred unless you have strong theoretical reasons for a one-tailed test.",
          },
        ]}
        relatedCalculators={[
          { name: "T-Test Calculator", path: "/t-test-calculator", desc: "Perform independent and paired t-tests" },
          { name: "Chi-Square Test", path: "/chi-square-calculator", desc: "Calculate chi-square statistics" },
          { name: "Z-Score Calculator", path: "/z-score-calculator", desc: "Calculate standard normal values" },
          { name: "Standard Deviation", path: "/standard-deviation-calculator", desc: "Calculate statistical measures" },
        ]}
      />
    </div>
  );
}
