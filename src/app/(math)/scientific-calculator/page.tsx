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
        <div className="text-[#3b4131] h-6 text-sm font-mono tracking-widest opacity-70 mb-1 truncate">
          {history}
        </div>
        <div className="text-[#2b3024] text-5xl font-mono tracking-tight font-bold break-all leading-none">
          {display || "0"}
        </div>
      </div>

      <div className="grid grid-cols-5 gap-2 sm:gap-3">
        {/* Row 1 Scientific + Actions */}
        <button onClick={() => append("sin(")} className="calc-btn-sci">
          sin
        </button>
        <button onClick={() => append("cos(")} className="calc-btn-sci">
          cos
        </button>
        <button onClick={() => append("tan(")} className="calc-btn-sci">
          tan
        </button>
        <button
          onClick={backspace}
          className="calc-btn-action bg-yellow-600 hover:bg-yellow-500 text-white"
        >
          ⌫
        </button>
        <button
          onClick={clear}
          className="calc-btn-action bg-red-600 hover:bg-red-500 text-white font-bold"
        >
          AC
        </button>

        {/* Row 2 Scientific + Ops */}
        <button onClick={() => append("log(")} className="calc-btn-sci">
          log
        </button>
        <button onClick={() => append("ln(")} className="calc-btn-sci">
          ln
        </button>
        <button onClick={() => append("(")} className="calc-btn-sci">
          (
        </button>
        <button onClick={() => append(")")} className="calc-btn-sci">
          )
        </button>
        <button onClick={() => append("÷")} className="calc-btn-op">
          ÷
        </button>

        {/* Row 3 Digits + Ops */}
        <button onClick={() => append("sqrt(")} className="calc-btn-sci">
          √
        </button>
        <button onClick={() => append("7")} className="calc-btn-num">
          7
        </button>
        <button onClick={() => append("8")} className="calc-btn-num">
          8
        </button>
        <button onClick={() => append("9")} className="calc-btn-num">
          9
        </button>
        <button onClick={() => append("×")} className="calc-btn-op">
          ×
        </button>

        {/* Row 4 Digits + Ops */}
        <button onClick={() => append("^")} className="calc-btn-sci">
          xʸ
        </button>
        <button onClick={() => append("4")} className="calc-btn-num">
          4
        </button>
        <button onClick={() => append("5")} className="calc-btn-num">
          5
        </button>
        <button onClick={() => append("6")} className="calc-btn-num">
          6
        </button>
        <button onClick={() => append("-")} className="calc-btn-op">
          -
        </button>

        {/* Row 5 Digits + Ops */}
        <button onClick={() => append("π")} className="calc-btn-sci">
          π
        </button>
        <button onClick={() => append("1")} className="calc-btn-num">
          1
        </button>
        <button onClick={() => append("2")} className="calc-btn-num">
          2
        </button>
        <button onClick={() => append("3")} className="calc-btn-num">
          3
        </button>
        <button onClick={() => append("+")} className="calc-btn-op">
          +
        </button>

        {/* Row 6 Digits + Ops */}
        <button onClick={() => append("e")} className="calc-btn-sci">
          e
        </button>
        <button onClick={() => append("0")} className="calc-btn-num col-span-2">
          0
        </button>
        <button onClick={() => append(".")} className="calc-btn-num">
          .
        </button>
        <button
          onClick={calculate}
          className="col-span-1 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-xl md:text-2xl font-bold rounded-lg shadow-sm transition"
        >
          =
        </button>
      </div>

      <style jsx>{`
        .calc-btn-sci {
          @apply bg-gray-700 hover:bg-gray-600 active:bg-gray-800 text-gray-200 text-xs md:text-sm font-semibold py-3 sm:py-4 rounded-lg shadow-sm transition flex justify-center items-center;
        }
        .calc-btn-num {
          @apply bg-gray-200 hover:bg-white active:bg-gray-400 text-gray-900 text-xl md:text-2xl font-bold py-3 sm:py-4 rounded-lg shadow-sm transition flex justify-center items-center;
        }
        .calc-btn-op {
          @apply bg-orange-500 hover:bg-orange-400 active:bg-orange-600 text-white text-xl md:text-2xl font-bold py-3 sm:py-4 rounded-lg shadow-sm transition flex justify-center items-center;
        }
        .calc-btn-action {
          @apply font-bold py-3 sm:py-4 rounded-lg shadow-sm transition flex justify-center items-center text-sm md:text-lg;
        }
      `}</style>

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
              <p>
                A scientific calculator parses complex expressions respecting
                the strict mathematical{" "}
                <strong>Order of Operations (PEMDAS / BODMAS)</strong>:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                <li>
                  <strong>Parentheses:</strong> Evaluating any expressions
                  contained inside <code>( )</code> first.
                </li>
                <li>
                  <strong>Exponents & Logic:</strong> Handling powers, square
                  roots, and logarithms.
                </li>
                <li>
                  <strong>Trigonometry:</strong> Calculating spatial wave
                  functions like <code>sin(x)</code>.
                </li>
                <li>
                  <strong>Multiplication & Division:</strong> Calculated left to
                  right.
                </li>
                <li>
                  <strong>Addition & Subtraction:</strong> Calculated last, left
                  to right.
                </li>
              </ul>
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
              path: "/order-of-operations-calculator",
              desc: "A detailed breakdown of how mathematical parsing hierarchy works step-by-step.",
            },
            {
              name: "Fraction Simplifier",
              path: "/fraction-simplifier-calculator",
              desc: "Reduce raw mathematical outputs into clean, simplified rational fractions.",
            },
            {
              name: "Logarithm Calculator",
              path: "/logarithm-calculator",
              desc: "Calculate logs with custom, non-standard bases.",
            },
          ]}
        />
      </div>
    </div>
  );
}
