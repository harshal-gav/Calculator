"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
export default function QuadraticFormulaCalculator() {
  const [a, setA] = useState("1");
  const [b, setB] = useState("5");
  const [c, setC] = useState("6");

  const [roots, setRoots] = useState<{
    x1: string;
    x2: string;
    type: string;
  } | null>(null);

  const calculate = () => {
    const valA = parseFloat(a);
    const valB = parseFloat(b);
    const valC = parseFloat(c);

    if (isNaN(valA) || isNaN(valB) || isNaN(valC)) {
      setRoots(null);
      return;
    }

    if (valA === 0) {
      // Not a quadratic equation, linear bx + c = 0 -> x = -c/b
      if (valB !== 0) {
        setRoots({
          x1: (-valC / valB).toString(),
          x2: "",
          type: "Linear Equation (a = 0)",
        });
      } else {
        setRoots({ x1: "No solution", x2: "", type: "Invalid Equation" });
      }
      return;
    }

    const discriminant = valB * valB - 4 * valA * valC;

    if (discriminant > 0) {
      const sqrtD = Math.sqrt(discriminant);
      const x1 = (-valB + sqrtD) / (2 * valA);
      const x2 = (-valB - sqrtD) / (2 * valA);
      setRoots({
        x1: x1.toFixed(4),
        x2: x2.toFixed(4),
        type: "Two Distinct Real Roots",
      });
    } else if (discriminant === 0) {
      const x1 = -valB / (2 * valA);
      setRoots({
        x1: x1.toFixed(4),
        x2: x1.toFixed(4),
        type: "One Real Root (Repeated)",
      });
    } else {
      // Complex roots
      const realPart = (-valB / (2 * valA)).toFixed(4);
      const imagPart = (Math.sqrt(Math.abs(discriminant)) / (2 * valA)).toFixed(
        4,
      );
      setRoots({
        x1: `${realPart} + ${imagPart}i`,
        x2: `${realPart} - ${imagPart}i`,
        type: "Two Complex Conjugate Roots",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-emerald-900 flex items-center justify-center font-serif flex-wrap gap-2">
          <span className="text-emerald-500">x =</span>
          <span className="flex flex-col items-center ml-2 border-l border-emerald-500 pl-4 py-1 text-3xl">
            <span className="border-b-2 border-emerald-900 pb-1">
              -b ± √(b² - 4ac)
            </span>
            <span className="pt-1">2a</span>
          </span>
        </h1>
        <p className="text-emerald-700 text-lg max-w-2xl mx-auto mt-6">
          Solve quadratic equations in the form{" "}
          <strong>ax² + bx + c = 0</strong> to find real and complex roots
          completely instantly.
        </p>
      </div>

      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-zinc-200">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-10 text-2xl font-bold font-serif text-zinc-800">
          <input
            type="number"
            step="any"
            value={a}
            onChange={(e) => setA(e.target.value)}
            className="w-24 text-center rounded-xl border-zinc-300 focus:border-emerald-500 focus:ring-emerald-500 bg-zinc-50 py-3 shadow-inner"
            aria-label="Value for a"
          />
          <span>x²&nbsp;&nbsp;+</span>
          <input
            type="number"
            step="any"
            value={b}
            onChange={(e) => setB(e.target.value)}
            className="w-24 text-center rounded-xl border-zinc-300 focus:border-emerald-500 focus:ring-emerald-500 bg-zinc-50 py-3 shadow-inner"
            aria-label="Value for b"
          />
          <span>x&nbsp;&nbsp;+</span>
          <input
            type="number"
            step="any"
            value={c}
            onChange={(e) => setC(e.target.value)}
            className="w-24 text-center rounded-xl border-zinc-300 focus:border-emerald-500 focus:ring-emerald-500 bg-zinc-50 py-3 shadow-inner"
            aria-label="Value for c"
          />
          <span>= 0</span>
        </div>

        <div className="flex justify-center">
          <button
            onClick={calculate}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-12 rounded-xl transition-colors shadow-lg shadow-emerald-600/30 uppercase tracking-widest text-sm"
          >
            Solve Equation
          </button>
        </div>
      </div>

      {roots && (
        <div className="mt-8 bg-emerald-950 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden text-center border border-emerald-800">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

          <div className="relative z-10">
            <h2 className="text-emerald-400 font-bold uppercase tracking-widest text-sm mb-2">
              Equation Solution
            </h2>
            <h3 className="text-emerald-200 font-medium mb-8 pb-4 border-b border-emerald-800/50 inline-block px-10">
              {roots.type}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <div className="bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                <div className="text-emerald-500 font-serif font-bold text-xl mb-2">
                  x₁
                </div>
                <div className="text-3xl md:text-4xl font-bold font-mono text-white tracking-tight">
                  {roots.x1}
                </div>
              </div>

              {roots.x2 && (
                <div className="bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                  <div className="text-emerald-500 font-serif font-bold text-xl mb-2">
                    x₂
                  </div>
                  <div className="text-3xl md:text-4xl font-bold font-mono text-white tracking-tight">
                    {roots.x2}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Quadratic Formula Calculator",
            operatingSystem: "All",
            applicationCategory: "EducationalApplication",
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title="Quadratic Formula Calculator"
          whatIsIt={
            <>
              <p>
                A <strong>Quadratic Formula Calculator</strong> is a specialized
                algebraic tool designed to solve second-degree polynomial
                equations of the form <strong>ax² + bx + c = 0</strong>.
              </p>
              <p>
                By inputting the coefficients (a, b, and c), the calculator
                instantly applies the quadratic equation to determine the exact
                roots (x-intercepts) of the parabola. It intelligently detects
                and calculates both real roots and complex (imaginary) roots.
              </p>

              <p className="mt-4 text-sm text-gray-500">
                <strong>Related Terms:</strong> Quadratic Formula Calculator
              </p>
            </>
          }
          formula={
            <>
              <p>The universal quadratic formula used to solve for x is:</p>
              <div className="bg-white p-4 rounded-lg font-mono text-center text-2xl shadow-sm my-4 overflow-x-auto">
                x = [ -b ± √(b² - 4ac) ] / 2a
              </div>
              <p className="mt-4">
                The expression inside the square root,{" "}
                <strong>(b² - 4ac)</strong>, is called the{" "}
                <strong>Discriminant (Δ)</strong>. It determines the nature of
                the roots:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>
                  <strong>Δ &gt; 0:</strong> Two distinct real roots (parabola
                  crosses the x-axis twice).
                </li>
                <li>
                  <strong>Δ = 0:</strong> One real root / repeated root
                  (parabola touches the x-axis exactly once).
                </li>
                <li>
                  <strong>Δ &lt; 0:</strong> Two complex conjugate roots
                  (parabola never touches the x-axis).
                </li>
              </ul>
            </>
          }
          example={
            <>
              <p>
                Let's solve the equation: <strong>2x² - 4x - 6 = 0</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 font-mono text-sm border-l-2 border-emerald-500 pl-4 py-2 bg-emerald-50/50">
                <li>
                  Here, <strong>a = 2</strong>, <strong>b = -4</strong>, and{" "}
                  <strong>c = -6</strong>.
                </li>
                <li className="pt-2 text-zinc-600 border-t border-emerald-200 mt-2">
                  Calculate Discriminant: (-4)² - 4(2)(-6) = 16 + 48 ={" "}
                  <strong>64</strong>
                </li>
                <li>x = [ -(-4) ± √64 ] / 2(2)</li>
                <li>x = [ 4 ± 8 ] / 4</li>
                <li className="pt-2 text-zinc-600 border-t border-emerald-200 mt-2">
                  <strong>Root 1:</strong> (4 + 8) / 4 = 12 / 4 ={" "}
                  <strong>3</strong>
                </li>
                <li>
                  <strong>Root 2:</strong> (4 - 8) / 4 = -4 / 4 ={" "}
                  <strong>-1</strong>
                </li>
              </ul>
              <p className="mt-4 text-emerald-700 font-bold border-t border-emerald-100 pt-4 text-center text-lg">
                The roots are x = 3 and x = -1.
              </p>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4">
              <li>
                <strong>Algebra & Calculus Homework:</strong> Instantly check
                answers to complex quadratic equations without manual
                calculation.
              </li>
              <li>
                <strong>Physics Calculations:</strong> Highly useful in
                kinematics to calculate exactly when a projectile will hit the
                ground (where height = 0).
              </li>
              <li>
                <strong>Engineering Optimization:</strong> Finding maximum or
                minimum values (optimization) in systems described by parabolic
                curves.
              </li>
            </ul>
          }
          faqs={[
            {
              question: "What happens if variable 'a' is zero?",
              answer:
                "If 'a' is zero, the equation is no longer quadratic; it becomes a linear equation (bx + c = 0). Our calculator will detect this and solve the linear equation for you (x = -c/b).",
            },
            {
              question: "Why do some equations output an 'i'?",
              answer:
                "The 'i' represents an imaginary number (the square root of -1). This occurs when the discriminant (b² - 4ac) is negative. Because you cannot take the square root of a negative number in real mathematics, the result consists of two complex conjugate roots.",
            },
            {
              question: "How accurate is this calculator?",
              answer: "Our calculator uses industry-standard formulas to provide the most accurate results possible. However, it should be used for informational purposes only and not as a basis for formal calculations or legal advice.",
            }]}
          relatedCalculators={[
            {
              name: "Order of Operations Calculator",
              path: "/order-of-operations-calculator/",
              desc: "Evaluate mathematical expressions step-by-step.",
            },
            {
              name: "Cubic Equation Calculator",
              path: "/cubic-equation-calculator/",
              desc: "Solve polynomials up to the third degree.",
            },
            {
              name: "Projectile Motion Calculator",
              path: "/projectile-motion-calculator/",
              desc: "Calculate flight time and distance using physics and quadratics.",
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
