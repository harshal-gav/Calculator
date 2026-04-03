"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function ScientificCalculator() {
  const [display, setDisplay] = useState("");
  const [history, setHistory] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const append = (val: string) => {
    setErrorMsg("");
    setDisplay((prev) => prev + val);
  };

  const calculate = () => {
    if (!display) return;
    try {
      // In a production app, use advanced math.js or safe eval.
      // Since eval is disabled in strict mode often, we replace math symbols.
      let expression = display
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/sin\(/g, "Math.sin(")
        .replace(/cos\(/g, "Math.cos(")
        .replace(/tan\(/g, "Math.tan(")
        .replace(/log\(/g, "Math.log10(")
        .replace(/ln\(/g, "Math.log(")
        .replace(/sqrt\(/g, "Math.sqrt(")
        .replace(/\^/g, "**")
        .replace(/π/g, "Math.PI")
        .replace(/e/g, "Math.E");

      // Auto-close open parens for naive evaluator
      const openParens = (expression.match(/\(/g) || []).length;
      const closeParens = (expression.match(/\)/g) || []).length;
      expression += ")".repeat(openParens - closeParens);

      const result = new Function("return " + expression)();
      if (!isFinite(result) || isNaN(result)) throw new Error("Invalid Math");

      setHistory(display + " =");
      setDisplay(String(Number(result.toFixed(10)))); // Fix float inexacts
      setErrorMsg("");
    } catch (e) {
      setErrorMsg("Syntax Error");
    }
  };

  const clear = () => {
    setDisplay("");
    setHistory("");
    setErrorMsg("");
  };
  const backspace = () => setDisplay((prev) => prev.slice(0, -1));

  return (
    <div className="max-w-xl mx-auto p-4 md:p-6 bg-gray-900 rounded-3xl shadow-2xl border border-gray-700">
      <h1 className="sr-only">Scientific Calculator</h1>

      {/* Display Screen */}
      <div className="bg-[#a3b18a] bg-opacity-90 p-6 rounded-xl mb-6 shadow-inner text-right border-4 border-[#828f6f] relative flex flex-col justify-end min-h-[120px]">
        {errorMsg && (
          <div className="absolute top-2 left-4 text-red-700 font-bold text-sm uppercase tracking-widest">
            {errorMsg}
          </div>
        )}
        <div className="text-slate-800 h-6 text-sm font-mono tracking-widest opacity-60 mb-1 truncate">
          {history}
        </div>
        <div className="text-slate-900 text-5xl font-mono tracking-tight font-bold break-all leading-none">
          {display || "0"}
        </div>
      </div>

      <div className="grid grid-cols-5 gap-2 sm:gap-3">
        {/* Row 1 Scientific + Actions */}
        <button onClick={() => append("sin(")} className="bg-slate-700 hover:bg-slate-600 active:bg-slate-800 text-slate-200 text-xs md:text-sm font-semibold py-3 sm:py-4 rounded-lg shadow-sm transition flex justify-center items-center">
          sin
        </button>
        <button onClick={() => append("cos(")} className="bg-slate-700 hover:bg-slate-600 active:bg-slate-800 text-slate-200 text-xs md:text-sm font-semibold py-3 sm:py-4 rounded-lg shadow-sm transition flex justify-center items-center">
          cos
        </button>
        <button onClick={() => append("tan(")} className="bg-slate-700 hover:bg-slate-600 active:bg-slate-800 text-slate-200 text-xs md:text-sm font-semibold py-3 sm:py-4 rounded-lg shadow-sm transition flex justify-center items-center">
          tan
        </button>
        <button
          onClick={backspace}
          className="bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-3 sm:py-4 rounded-lg shadow-sm transition flex justify-center items-center text-sm md:text-lg"
        >
          ⌫
        </button>
        <button
          onClick={clear}
          className="bg-red-600 hover:bg-red-500 text-white font-bold font-bold py-3 sm:py-4 rounded-lg shadow-sm transition flex justify-center items-center text-sm md:text-lg"
        >
          AC
        </button>

        {/* Row 2 Scientific + Ops */}
        <button onClick={() => append("log(")} className="bg-slate-700 hover:bg-slate-600 active:bg-slate-800 text-slate-200 text-xs md:text-sm font-semibold py-3 sm:py-4 rounded-lg shadow-sm transition flex justify-center items-center">
          log
        </button>
        <button onClick={() => append("ln(")} className="bg-slate-700 hover:bg-slate-600 active:bg-slate-800 text-slate-200 text-xs md:text-sm font-semibold py-3 sm:py-4 rounded-lg shadow-sm transition flex justify-center items-center">
          ln
        </button>
        <button onClick={() => append("(")} className="bg-slate-700 hover:bg-slate-600 active:bg-slate-800 text-slate-200 text-xs md:text-sm font-semibold py-3 sm:py-4 rounded-lg shadow-sm transition flex justify-center items-center">
          (
        </button>
        <button onClick={() => append(")")} className="bg-slate-700 hover:bg-slate-600 active:bg-slate-800 text-slate-200 text-xs md:text-sm font-semibold py-3 sm:py-4 rounded-lg shadow-sm transition flex justify-center items-center">
          )
        </button>
        <button onClick={() => append("÷")} className="bg-orange-500 hover:bg-orange-400 active:bg-orange-600 text-white text-xl md:text-2xl font-bold py-3 sm:py-4 rounded-lg shadow-sm transition flex justify-center items-center">
          ÷
        </button>

        {/* Row 3 Digits + Ops */}
        <button onClick={() => append("sqrt(")} className="bg-slate-700 hover:bg-slate-600 active:bg-slate-800 text-slate-200 text-xs md:text-sm font-semibold py-3 sm:py-4 rounded-lg shadow-sm transition flex justify-center items-center">
          √
        </button>
        <button onClick={() => append("7")} className="bg-slate-100 hover:bg-white active:bg-slate-300 text-slate-900 text-xl md:text-2xl font-bold py-3 sm:py-4 rounded-lg shadow-sm transition flex justify-center items-center">
          7
        </button>
        <button onClick={() => append("8")} className="bg-slate-100 hover:bg-white active:bg-slate-300 text-slate-900 text-xl md:text-2xl font-bold py-3 sm:py-4 rounded-lg shadow-sm transition flex justify-center items-center">
          8
        </button>
        <button onClick={() => append("9")} className="bg-slate-100 hover:bg-white active:bg-slate-300 text-slate-900 text-xl md:text-2xl font-bold py-3 sm:py-4 rounded-lg shadow-sm transition flex justify-center items-center">
          9
        </button>
        <button onClick={() => append("×")} className="bg-orange-500 hover:bg-orange-400 active:bg-orange-600 text-white text-xl md:text-2xl font-bold py-3 sm:py-4 rounded-lg shadow-sm transition flex justify-center items-center">
          ×
        </button>

        {/* Row 4 Digits + Ops */}
        <button onClick={() => append("^")} className="bg-slate-700 hover:bg-slate-600 active:bg-slate-800 text-slate-200 text-xs md:text-sm font-semibold py-3 sm:py-4 rounded-lg shadow-sm transition flex justify-center items-center">
          xʸ
        </button>
        <button onClick={() => append("4")} className="bg-slate-100 hover:bg-white active:bg-slate-300 text-slate-900 text-xl md:text-2xl font-bold py-3 sm:py-4 rounded-lg shadow-sm transition flex justify-center items-center">
          4
        </button>
        <button onClick={() => append("5")} className="bg-slate-100 hover:bg-white active:bg-slate-300 text-slate-900 text-xl md:text-2xl font-bold py-3 sm:py-4 rounded-lg shadow-sm transition flex justify-center items-center">
          5
        </button>
        <button onClick={() => append("6")} className="bg-slate-100 hover:bg-white active:bg-slate-300 text-slate-900 text-xl md:text-2xl font-bold py-3 sm:py-4 rounded-lg shadow-sm transition flex justify-center items-center">
          6
        </button>
        <button onClick={() => append("-")} className="bg-orange-500 hover:bg-orange-400 active:bg-orange-600 text-white text-xl md:text-2xl font-bold py-3 sm:py-4 rounded-lg shadow-sm transition flex justify-center items-center">
          -
        </button>

        {/* Row 5 Digits + Ops */}
        <button onClick={() => append("π")} className="bg-slate-700 hover:bg-slate-600 active:bg-slate-800 text-slate-200 text-xs md:text-sm font-semibold py-3 sm:py-4 rounded-lg shadow-sm transition flex justify-center items-center">
          π
        </button>
        <button onClick={() => append("1")} className="bg-slate-100 hover:bg-white active:bg-slate-300 text-slate-900 text-xl md:text-2xl font-bold py-3 sm:py-4 rounded-lg shadow-sm transition flex justify-center items-center">
          1
        </button>
        <button onClick={() => append("2")} className="bg-slate-100 hover:bg-white active:bg-slate-300 text-slate-900 text-xl md:text-2xl font-bold py-3 sm:py-4 rounded-lg shadow-sm transition flex justify-center items-center">
          2
        </button>
        <button onClick={() => append("3")} className="bg-slate-100 hover:bg-white active:bg-slate-300 text-slate-900 text-xl md:text-2xl font-bold py-3 sm:py-4 rounded-lg shadow-sm transition flex justify-center items-center">
          3
        </button>
        <button onClick={() => append("+")} className="bg-orange-500 hover:bg-orange-400 active:bg-orange-600 text-white text-xl md:text-2xl font-bold py-3 sm:py-4 rounded-lg shadow-sm transition flex justify-center items-center">
          +
        </button>

        {/* Row 6 Digits + Ops */}
        <button onClick={() => append("e")} className="bg-slate-700 hover:bg-slate-600 active:bg-slate-800 text-slate-200 text-xs md:text-sm font-semibold py-3 sm:py-4 rounded-lg shadow-sm transition flex justify-center items-center">
          e
        </button>
        <button onClick={() => append("0")} className="bg-slate-100 hover:bg-white active:bg-slate-300 text-slate-900 text-xl md:text-2xl font-bold py-3 sm:py-4 rounded-lg shadow-sm transition flex justify-center items-center col-span-2">
          0
        </button>
        <button onClick={() => append(".")} className="bg-slate-100 hover:bg-white active:bg-slate-300 text-slate-900 text-xl md:text-2xl font-bold py-3 sm:py-4 rounded-lg shadow-sm transition flex justify-center items-center">
          .
        </button>
        <button
          onClick={calculate}
          className="col-span-1 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-xl md:text-2xl font-bold rounded-lg shadow-sm transition flex justify-center items-center"
        >
          =
        </button>
      </div>



      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Scientific Calculator",
            operatingSystem: "All",
            applicationCategory: "EducationalApplication",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title="Online Scientific Calculator"
          whatIsIt={
            <>
              <p>
                The <strong>Scientific Calculator</strong> extends traditional
                arithmetic operations to include advanced mathematical functions
                required for upper-level STEM education, physics, engineering,
                and calculus.
              </p>
              <p>
                Unlike a basic four-function calculator, this tool handles
                complex operations like trigonometry (sine, cosine, tangent),
                logarithmic scaling, exponentiation, and embedded mathematical
                constants (Pi, Euler's number).
              </p>

              <p className="mt-4 text-sm text-gray-500">
                <strong>Related Terms:</strong> Calculator, Tax Calculator,
                Annuity Calculator, Tax Return Calculator, Tax Refund Estimator,
                Bra Size Calculator, Concrete Calculator, Finance Calculator,
                Tax Calculator 2023, Tax Estimator 2023, Tax Calculator 2022,
                Tax Estimator, Calculator App, Tax Return Estimate, Savings
                Calculator
              </p>
            </>
          }
          formula={
          <>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 font-mono text-lg text-indigo-700 text-center shadow-sm my-6">
              Scientific Analysis Model
            </div>
            <p className="text-sm text-slate-500 text-center">
              This tool utilize standardized mathematical formulas and logic to calculate precise Scientific results.
            </p>
          </>
        }
          example={
            <>
              <p>
                Evaluating an expression with embedded operations and
                priorities:
              </p>
              <div className="bg-gray-800 p-4 rounded-lg font-mono text-center text-[18px] shadow-sm my-4 text-green-400 border border-gray-700">
                ln(e) + sin(π) × 5<sup>2</sup>
              </div>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                <li>
                  <strong>Step 1 (Constants & Logs):</strong> The natural log of
                  Euler's number <code>ln(e)</code> equals 1.
                </li>
                <li>
                  <strong>Step 2 (Trigonometry):</strong> The sine of Pi radians{" "}
                  <code>sin(π)</code> equals 0.
                </li>
                <li>
                  <strong>Step 3 (Exponents):</strong> 5 squared{" "}
                  <code>5^2</code> equals 25.
                </li>
                <li>
                  <strong>Step 4 (Multiplication):</strong> 0 × 25 equals 0.
                </li>
                <li>
                  <strong>Step 5 (Addition):</strong> Total result: 1 + 0 ={" "}
                  <strong>1</strong>.
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-gray-700">
              <li>
                <strong>Trigonometry & Physics:</strong> Analyzing wave
                patterns, alternating currents (AC circuits), or projectile
                trajectories using spatial functions.
              </li>
              <li>
                <strong>Financial Math:</strong> Utilizing natural logarithms (
                <code>ln</code>) and Euler's number (<code>e</code>) to
                calculate continuous compound interest in quantitative finance
                models.
              </li>
              <li>
                <strong>Data Science:</strong> Converting raw exponential growth
                data sets into linear visual formats by taking the base-10
                logarithm (<code>log</code>) of the data points.
              </li>
            </ul>
          }
          faqs={[
            {
              question:
                "Does this calculator use Radians or Degrees for Sin/Cos/Tan?",
              answer:
                "In standard programmatic environments (like JavaScript Math libraries), trigonometric functions always expect the input to be in Radians natively. To use degrees, you must manually convert (Degree × π / 180).",
            },
            {
              question: "What is Euler's Number (e)?",
              answer:
                "Euler's number is a mathematical constant approximately equal to 2.71828. It is the fundamental base of the natural logarithm and forms the foundation of all mathematical models regarding continuous growth or decay.",
            },
            {
              question: "Why do I get 'Syntax Error'?",
              answer:
                "This is usually caused by unclosed parentheses, missing operators between brackets, or providing negative inputs to functions that cannot mathematically handle them (like taking the square root of a negative scalar).",
            },
          ]}
          relatedCalculators={[
            {
              name: "Order of Operations Calculator",
              path: "/order-of-operations-calculator/",
              desc: "A detailed breakdown of how mathematical parsing hierarchy works step-by-step.",
            },
            {
              name: "Fraction Simplifier",
              path: "/fraction-simplifier-calculator/",
              desc: "Reduce raw mathematical outputs into clean, simplified rational fractions.",
            },
            {
              name: "Logarithm Calculator",
              path: "/logarithm-calculator/",
              desc: "Calculate logs with custom, non-standard bases.",
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
