"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function NumberSequenceCalculator() {
  const [sequence, setSequence] = useState("2, 4, 6, 8");
  const [numTerms, setNumTerms] = useState("3");

  const [result, setResult] = useState<{
    type: string;
    description: string;
    difference?: number;
    ratio?: number;
    nextTerms: number[];
    color: string;
  } | null>(null);

  const analyzeSequence = () => {
    const input = sequence
      .split(",")
      .map((s) => parseFloat(s.trim()))
      .filter((n) => !isNaN(n));

    const terms = parseInt(numTerms) || 3;

    if (input.length < 2) {
      return;
    }

    let sequenceType = "";
    let description = "";
    let color = "";
    let nextTerms: number[] = [];
    let difference = 0;
    let ratio = 0;

    // Check for arithmetic sequence (constant difference)
    const differences: number[] = [];
    for (let i = 1; i < input.length; i++) {
      differences.push(input[i] - input[i - 1]);
    }

    const isArithmetic =
      differences.length > 0 &&
      differences.every((d) => Math.abs(d - differences[0]) < 0.0001);

    if (isArithmetic) {
      sequenceType = "Arithmetic Sequence";
      difference = differences[0];
      description = `Constant difference of ${difference}`;
      color = "text-blue-600 border-blue-200 bg-blue-50";

      const lastTerm = input[input.length - 1];
      for (let i = 0; i < terms; i++) {
        nextTerms.push(lastTerm + (i + 1) * difference);
      }
    } else {
      // Check for geometric sequence (constant ratio)
      const ratios: number[] = [];
      for (let i = 1; i < input.length; i++) {
        if (input[i - 1] !== 0) {
          ratios.push(input[i] / input[i - 1]);
        }
      }

      const isGeometric =
        ratios.length > 0 &&
        ratios.every((r) => Math.abs(r - ratios[0]) < 0.0001);

      if (isGeometric && !isNaN(ratios[0])) {
        sequenceType = "Geometric Sequence";
        ratio = ratios[0];
        description = `Constant ratio of ${ratio.toFixed(2)}`;
        color = "text-green-600 border-green-200 bg-green-50";

        const lastTerm = input[input.length - 1];
        for (let i = 0; i < terms; i++) {
          nextTerms.push(lastTerm * Math.pow(ratio, i + 1));
        }
      } else {
        // Check for Fibonacci-like pattern
        let isFibonacci = true;
        for (let i = 2; i < input.length; i++) {
          if (
            Math.abs(
              input[i] - (input[i - 1] + input[i - 2])
            ) > 0.0001
          ) {
            isFibonacci = false;
            break;
          }
        }

        if (isFibonacci && input.length >= 3) {
          sequenceType = "Fibonacci-like Sequence";
          description = "Each term = sum of previous two terms";
          color = "text-purple-600 border-purple-200 bg-purple-50";

          let a = input[input.length - 2];
          let b = input[input.length - 1];
          for (let i = 0; i < terms; i++) {
            const next = a + b;
            nextTerms.push(next);
            a = b;
            b = next;
          }
        } else {
          // Check for quadratic/polynomial patterns
          const secondDiffs: number[] = [];
          for (let i = 1; i < differences.length; i++) {
            secondDiffs.push(differences[i] - differences[i - 1]);
          }

          const isQuadratic =
            secondDiffs.length > 0 &&
            secondDiffs.every(
              (d) => Math.abs(d - secondDiffs[0]) < 0.0001
            );

          if (isQuadratic) {
            sequenceType = "Quadratic Sequence";
            description = "Constant second-order differences";
            color = "text-orange-600 border-orange-200 bg-orange-50";

            let lastDiff = differences[differences.length - 1];
            const constantDiff = secondDiffs[0];
            let lastTerm = input[input.length - 1];

            for (let i = 0; i < terms; i++) {
              lastDiff += constantDiff;
              lastTerm += lastDiff;
              nextTerms.push(lastTerm);
            }
          } else {
            sequenceType = "Custom Pattern";
            description = "Unable to identify standard pattern";
            color = "text-gray-600 border-gray-200 bg-gray-50";
            nextTerms = [];
          }
        }
      }
    }

    setResult({
      type: sequenceType,
      description,
      difference: isArithmetic ? difference : undefined,
      ratio: !isArithmetic && !isNaN(ratio) && ratio !== 0 ? ratio : undefined,
      nextTerms,
      color,
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-white rounded-3xl shadow-xl border border-blue-50">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-blue-50 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Number Sequence Calculator</h1>
          <p className="text-slate-500 font-medium mt-1 text-lg">Identify patterns and find the next terms.</p>
        </div>
        <div className="bg-blue-50 px-4 py-2 rounded-full border border-blue-100 shrink-0">
          <span className="text-blue-600 font-bold text-sm uppercase tracking-wider">Pattern Analysis</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 shadow-inner space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Enter Sequence (comma-separated)</label>
              <textarea
                value={sequence}
                onChange={(e) => setSequence(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border text-lg h-24 font-mono"
                placeholder="2, 4, 6, 8, 10"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Number of Next Terms to Calculate</label>
              <input
                type="number"
                value={numTerms}
                onChange={(e) => setNumTerms(e.target.value)}
                min="1"
                max="10"
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border text-lg"
              />
            </div>

            <div className="text-sm text-gray-600 bg-blue-50 p-4 rounded-lg border border-blue-100">
              <p className="font-semibold mb-2">Supported Patterns:</p>
              <ul className="space-y-1">
                <li>• Arithmetic (constant difference)</li>
                <li>• Geometric (constant ratio)</li>
                <li>• Fibonacci-like sequences</li>
                <li>• Quadratic patterns</li>
              </ul>
            </div>
          </div>

          <button
            onClick={analyzeSequence}
            className="mt-8 w-full bg-blue-600 text-white font-bold py-4 px-4 rounded-xl hover:bg-blue-700 transition shadow-lg text-lg uppercase tracking-wide"
          >
            Analyze Sequence
          </button>
        </div>

        <div className="lg:col-span-7 bg-blue-50 rounded-xl p-8 border border-blue-200 shadow-inner flex flex-col justify-center">
          {result !== null ? (
            <div>
              <h2 className="text-lg font-bold text-blue-900 mb-2 text-center uppercase tracking-wider">
                Pattern Results
              </h2>
              <div className={`text-center py-6 px-6 rounded-lg border border-opacity-50 font-bold text-2xl md:text-3xl mb-6 ${result.color}`}>
                {result.type}
              </div>
              <p className="text-center text-gray-700 font-semibold mb-6">{result.description}</p>

              {result.nextTerms.length > 0 && (
                <div className="bg-white p-5 rounded-xl border border-blue-100 shadow-sm space-y-3">
                  <h3 className="font-bold text-gray-800 mb-3 text-center">Next Terms:</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {result.nextTerms.map((term, idx) => (
                      <div
                        key={idx}
                        className="bg-blue-50 p-3 rounded-lg border border-blue-200 text-center"
                      >
                        <p className="text-sm text-gray-600">Term {idx + 1}</p>
                        <p className="text-xl font-bold text-blue-600">
                          {Number.isInteger(term) ? term : term.toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>

                  {result.difference !== undefined && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-gray-700">
                        <strong>Common Difference:</strong> {result.difference}
                      </p>
                    </div>
                  )}

                  {result.ratio !== undefined && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-gray-700">
                        <strong>Common Ratio:</strong> {result.ratio.toFixed(3)}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {result.nextTerms.length === 0 && (
                <p className="text-center text-gray-700 italic">
                  Could not identify a standard pattern. Please check your sequence.
                </p>
              )}
            </div>
          ) : (
            <div className="text-center text-blue-800 opacity-60 font-medium p-8">
              Enter a sequence to analyze its pattern.
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title="Number Sequence Calculator"
        whatIsIt={
          <>
            <p>
              The <strong>Number Sequence Calculator</strong> analyzes a series of numbers to identify mathematical patterns and predict the next terms in the sequence. This tool recognizes arithmetic, geometric, Fibonacci-like, and quadratic sequences.
            </p>
          </>
        }
        formula={
          <>
            <p>The calculator identifies patterns using these formulas:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
              <li><strong>Arithmetic:</strong> aₙ = a₁ + (n-1)d, where d is common difference</li>
              <li><strong>Geometric:</strong> aₙ = a₁ × rⁿ⁻¹, where r is common ratio</li>
              <li><strong>Fibonacci:</strong> aₙ = aₙ₋₁ + aₙ₋₂</li>
              <li><strong>Quadratic:</strong> aₙ = an² + bn + c</li>
            </ul>
          </>
        }
        example={
          <>
            <p>For the arithmetic sequence 2, 4, 6, 8:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
              <li>Common difference (d) = 2</li>
              <li>Next term: 8 + 2 = <strong>10</strong></li>
              <li>Following term: 10 + 2 = <strong>12</strong></li>
              <li>And so on...</li>
            </ul>
          </>
        }
        useCases={
          <ul className="list-disc pl-6 space-y-4">
            <li><strong>Math Education:</strong> Help students understand sequence patterns and predict future terms.</li>
            <li><strong>Financial Modeling:</strong> Project growth in investments or savings with constant rates.</li>
            <li><strong>Data Analysis:</strong> Identify trends in time-series data.</li>
            <li><strong>Puzzle Solving:</strong> Solve sequence-based puzzles and brain teasers.</li>
          </ul>
        }
        faqs={[
          {
            question: "What if my sequence doesn't match any standard pattern?",
            answer: "The calculator identifies the most common sequence types (arithmetic, geometric, Fibonacci, quadratic). More complex patterns like cubic sequences or custom rules may not be recognized. In these cases, you can analyze the differences manually to identify the pattern.",
          },
          {
            question: "How many terms do I need to provide?",
            answer: "At least 2-3 terms are recommended to identify a pattern reliably. More terms (4-5+) help confirm the pattern with greater accuracy.",
          },
          {
            question: "Can the calculator handle decimal or negative numbers?",
            answer: "Yes! The calculator works with any real numbers, including negative numbers and decimals. Just enter them as comma-separated values.",
          },
        ]}
        relatedCalculators={[
          { name: "Fibonacci Calculator", path: "/fibonacci-calculator/", desc: "Generate Fibonacci sequence up to any term" },
          { name: "Sum Calculator", path: "/sum-calculator/", desc: "Calculate sum of number series" },
          { name: "Average Calculator", path: "/average-calculator/", desc: "Find mean, median, and mode" },
          { name: "Permutation Calculator", path: "/permutation-calculator/", desc: "Calculate permutations and combinations" },
        ]}
      />
    </div>
  );
}
