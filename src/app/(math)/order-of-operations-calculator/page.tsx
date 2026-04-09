"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import orderOfOpsSeoData from "@/data/seo-content/official/order-of-operations-calculator.json";

export default function OrderOfOperationsCalculator() {
  const [expression, setExpression] = useState("(3 + 5) * 2 ^ 3 - 10 / 2");
  const [originalExp, setOriginalExp] = useState("");
  const [steps, setSteps] = useState<string[]>([]);
  const [finalResult, setFinalResult] = useState<number | string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const calculate = () => {
    setErrorMsg("");
    setSteps([]);
    setFinalResult(null);
    setOriginalExp(expression);

    let currentExp = expression.replace(/\s+/g, ""); // remove spaces
    const localSteps: string[] = [`Initial: ${currentExp}`];

    try {
      // Guard against gross abuse
      if (/[^0-9+\-*/^().]/.test(currentExp)) {
        throw new Error("Invalid characters in expression");
      }

      // We will evaluate step by step using regexes conceptually
      // This is a naive implementation for simple expressions.

      // Loop until fully resolved to a number
      let safeCounter = 0;
      while (isNaN(Number(currentExp)) && safeCounter < 30) {
        safeCounter++;
        let previousExp = currentExp;

        // 1. Parentheses (innermost)
        const parenMatch = currentExp.match(/\(([^()]+)\)/);
        if (parenMatch) {
          const innerExp = parenMatch[1];
          const innerResult = evaluateFlat(innerExp);
          currentExp = currentExp.replace(
            parenMatch[0],
            innerResult.toString(),
          );
          localSteps.push(`Resolve parenthesis: ${innerExp} = ${innerResult}`);
          continue;
        }

        // 2. If no parens, evaluate flat exp
        currentExp = evaluateFlat(currentExp, localSteps).toString();

        if (currentExp === previousExp) {
          // Stagnated
          throw new Error("Evaluation stuck. Please check your syntax.");
        }
      }

      const resultNum = Number(currentExp);
      if (isNaN(resultNum)) {
        throw new Error("Result is NaN");
      }

      setSteps(localSteps.length > 2 ? localSteps : []); // Only show steps if there were multiple
      setFinalResult(resultNum);
    } catch (e: any) {
      setErrorMsg(e.message || "Invalid Mathematical Expression");
    }
  };

  // Helper to evaluate a flat expression (no parentheses) according to PEMDAS
  const evaluateFlat = (exp: string, stepLog?: string[]): number | string => {
    let current = exp;

    // 1. Exponents
    while (true) {
      const match = current.match(/(-?\d+\.?\d*)\^(-?\d+\.?\d*)/);
      if (!match) break;
      const res = Math.pow(parseFloat(match[1]), parseFloat(match[2]));
      current = current.replace(match[0], res.toString());
      if (stepLog) stepLog.push(`Exponents: ${match[0]} = ${res}`);
    }

    // 2. Multiplication / Division (left to right)
    while (true) {
      const match = current.match(/(-?\d+\.?\d*)([\*\/])(-?\d+\.?\d*)/);
      if (!match) break;
      let res = 0;
      if (match[2] === "*") {
        res = parseFloat(match[1]) * parseFloat(match[3]);
      } else {
        if (parseFloat(match[3]) === 0) throw new Error("Division by zero");
        res = parseFloat(match[1]) / parseFloat(match[3]);
      }
      current = current.replace(match[0], res.toString());
      if (stepLog) stepLog.push(`Mult/Div: ${match[0]} = ${res}`);
    }

    // 3. Addition / Subtraction (left to right)
    while (true) {
      const match = current.match(/(-?\d+\.?\d*)([\+\-])(-?\d+\.?\d*)/);
      if (!match) break;

      if (match[0] === current && match[1] === "") {
        break;
      }

      let res = 0;
      const left = parseFloat(match[1]);
      const right = parseFloat(match[3]);

      if (isNaN(left)) break;

      if (match[2] === "+") {
        res = left + right;
      } else {
        res = left - right;
      }
      current = current.replace(match[0], res.toString());
      if (stepLog) stepLog.push(`Add/Sub: ${match[0]} = ${res}`);
    }

    return current;
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-emerald-900 font-serif">
          <span className="mr-3">🧮</span> Order of Operations
        </h1>
        <p className="text-emerald-700 text-lg max-w-2xl mx-auto">
          Evaluate mathematical expressions step-by-step using PEMDAS/BODMAS
          rules.
        </p>
      </div>

      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-zinc-200">
        <label className="block text-sm font-bold text-zinc-500 mb-2 uppercase tracking-widest">
          Enter Expression
        </label>

        <div className="relative">
          <input
            type="text"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            className="w-full text-center rounded-xl border-zinc-300 focus:border-emerald-500 focus:ring-emerald-500 font-mono text-2xl font-bold bg-zinc-50 py-4 shadow-inner px-12"
            placeholder="e.g. (3+5)*2^3 - 10/2"
            onKeyDown={(e) => e.key === "Enter" && calculate()}
          />
        </div>

        <div className="mt-4 flex flex-wrap justify-center gap-2 mb-8">
          {["+", "-", "*", "/", "^", "(", ")"].map((op) => (
            <button
              key={op}
              onClick={() => setExpression((prev) => prev + op)}
              className="w-12 h-12 rounded-lg bg-zinc-100 hover:bg-emerald-100 text-emerald-800 font-mono font-bold text-xl border border-zinc-200 shadow-sm transition-colors"
            >
              {op}
            </button>
          ))}
          <button
            onClick={() => setExpression("")}
            className="px-4 h-12 rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-800 font-bold text-sm border border-rose-200 shadow-sm transition-colors uppercase tracking-widest"
          >
            Clear
          </button>
        </div>

        <div className="flex justify-center border-t border-zinc-100 pt-8 mt-2">
          <button
            onClick={calculate}
            className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-5 px-16 rounded-xl transition-colors shadow-lg shadow-emerald-600/30 uppercase tracking-widest text-sm"
          >
            Evaluate
          </button>
        </div>

        {errorMsg && (
          <div className="mt-6 text-center text-rose-600 bg-rose-50 p-4 rounded-xl border border-rose-200 font-medium font-mono">
            {errorMsg}
          </div>
        )}
      </div>

      {finalResult !== null && (
        <div className="mt-8 bg-emerald-950 rounded-2xl p-6 md:p-12 shadow-2xl relative overflow-hidden text-center border border-emerald-800">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

          <div className="relative z-10 w-full flex flex-col items-center">
            <h2 className="text-emerald-400 font-bold uppercase tracking-widest text-xs mb-2">
              Final Answer
            </h2>

            <div className="text-4xl md:text-5xl lg:text-6xl font-black font-mono tracking-tight text-white mb-8 drop-shadow-xl break-all px-4">
              {finalResult}
            </div>

            {steps.length > 0 && (
              <div className="w-full max-w-2xl bg-black/40 p-6 md:p-8 rounded-2xl border border-white/10 shadow-inner text-left">
                <h3 className="text-emerald-500 font-bold uppercase tracking-widest text-xs mb-4 pb-2 border-b border-white/10 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    />
                  </svg>
                  Evaluation Steps (PEMDAS)
                </h3>

                <ol className="space-y-3 font-mono text-emerald-200/80 text-sm md:text-base">
                  {steps.map((step, idx) => (
                    <li
                      key={idx}
                      className="flex flex-col sm:flex-row sm:items-baseline border-b border-emerald-800/30 pb-2 last:border-0 last:pb-0"
                    >
                      <span className="text-emerald-600 mr-4 font-bold min-w-[120px]">
                        Step {idx + 1}:
                      </span>
                      <span className="break-all">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Order of Operations Calculator",
            operatingSystem: "All",
            applicationCategory: "EducationalApplication",
          }),
        }}
      />

      <div className="mt-12">
        <CalculatorSEO
          title={orderOfOpsSeoData.title}
          whatIsIt={orderOfOpsSeoData.whatIsIt}
          formula={orderOfOpsSeoData.formula}
          example={orderOfOpsSeoData.example}
          useCases={orderOfOpsSeoData.useCases}
          faqs={orderOfOpsSeoData.faqs}
          deepDive={orderOfOpsSeoData.deepDive}
          glossary={orderOfOpsSeoData.glossary}
          relatedCalculators={[
            {
              name: "Fraction Calculator",
              path: "/fraction-calculator/",
              desc: "Add, subtract, multiply, and divide complex fractions.",
            },
            {
              name: "Quadratic Formula Calculator",
              path: "/quadratic-formula-calculator/",
              desc: "Solve algebraic quadratic equations instantly.",
            },
            {
              name: "Scientific Calculator",
              path: "/scientific-calculator/",
              desc: "A comprehensive calculator for trigonometry and advanced math.",
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
