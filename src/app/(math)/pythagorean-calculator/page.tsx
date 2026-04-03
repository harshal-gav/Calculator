"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function PythagoreanCalculator() {
  const [solveFor, setSolveFor] = useState("c"); // 'a', 'b', or 'c'
  const [sideA, setSideA] = useState("3");
  const [sideB, setSideB] = useState("4");
  const [sideC, setSideC] = useState("5");

  const [result, setResult] = useState<{
    value: number;
    equationSteps: string[];
  } | null>(null);

  const calculatePythagorean = () => {
    let finalValue = 0;
    const steps: string[] = [];

    const a = parseFloat(sideA);
    const b = parseFloat(sideB);
    const c = parseFloat(sideC);

    if (solveFor === "c") {
      if (a > 0 && b > 0) {
        // c² = a² + b²
        finalValue = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
        steps.push(`c² = a² + b²`);
        steps.push(`c² = (${a})² + (${b})²`);
        steps.push(`c² = ${Math.pow(a, 2)} + ${Math.pow(b, 2)}`);
        steps.push(`c² = ${Math.pow(a, 2) + Math.pow(b, 2)}`);
        steps.push(`c = √${Math.pow(a, 2) + Math.pow(b, 2)}`);
        steps.push(`c ≈ ${finalValue.toFixed(4)}`);
      }
    } else if (solveFor === "a") {
      if (c > 0 && b > 0 && c > b) {
        // a² = c² - b²
        finalValue = Math.sqrt(Math.pow(c, 2) - Math.pow(b, 2));
        steps.push(`a² = c² - b²`);
        steps.push(`a² = (${c})² - (${b})²`);
        steps.push(`a² = ${Math.pow(c, 2)} - ${Math.pow(b, 2)}`);
        steps.push(`a² = ${Math.pow(c, 2) - Math.pow(b, 2)}`);
        steps.push(`a = √${Math.pow(c, 2) - Math.pow(b, 2)}`);
        steps.push(`a ≈ ${finalValue.toFixed(4)}`);
      }
    } else if (solveFor === "b") {
      if (c > 0 && a > 0 && c > a) {
        // b² = c² - a²
        finalValue = Math.sqrt(Math.pow(c, 2) - Math.pow(a, 2));
        steps.push(`b² = c² - a²`);
        steps.push(`b² = (${c})² - (${a})²`);
        steps.push(`b² = ${Math.pow(c, 2)} - ${Math.pow(a, 2)}`);
        steps.push(`b² = ${Math.pow(c, 2) - Math.pow(a, 2)}`);
        steps.push(`b = √${Math.pow(c, 2) - Math.pow(a, 2)}`);
        steps.push(`b ≈ ${finalValue.toFixed(4)}`);
      }
    }

    if (finalValue > 0) {
      setResult({
        value: finalValue,
        equationSteps: steps,
      });
    } else {
      setResult(null); // Invalid inputs like hypotenuse smaller than leg
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-rose-900 border-b pb-4">
        Pythagorean Theorem Calculator
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Calculate the hypotenuse or one of the missing legs of a right triangle
        showing step-by-step arithmetic.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="bg-rose-50 p-6 rounded-xl border border-rose-100 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              What are we solving for?
            </label>
            <select
              value={solveFor}
              onChange={(e) => {
                setSolveFor(e.target.value);
                setResult(null);
              }}
              className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-rose-500 font-bold bg-white cursor-pointer text-rose-900"
            >
              <option value="c">Hypotenuse (c)</option>
              <option value="a">Leg (a)</option>
              <option value="b">Leg (b)</option>
            </select>
          </div>

          <div className="space-y-4 pt-4 border-t border-rose-200">
            {solveFor !== "a" && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Leg (a)
                </label>
                <input
                  type="number"
                  value={sideA}
                  onChange={(e) => setSideA(e.target.value)}
                  className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-rose-500 font-medium"
                />
              </div>
            )}

            {solveFor !== "b" && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Leg (b)
                </label>
                <input
                  type="number"
                  value={sideB}
                  onChange={(e) => setSideB(e.target.value)}
                  className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-rose-500 font-medium"
                />
              </div>
            )}

            {solveFor !== "c" && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Hypotenuse (c)
                </label>
                <input
                  type="number"
                  value={sideC}
                  onChange={(e) => setSideC(e.target.value)}
                  className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-rose-500 font-medium"
                />
              </div>
            )}
          </div>

          <button
            onClick={calculatePythagorean}
            className="w-full bg-rose-600 text-white font-black py-4 rounded-xl hover:bg-rose-700 transition shadow-lg uppercase tracking-widest mt-2"
          >
            Calculate Missing Leg
          </button>
        </div>

        {/* Results Screen */}
        <div className="bg-white border-2 border-rose-100 rounded-xl overflow-hidden shadow-sm flex flex-col justify-center">
          {result !== null ? (
            <div className="w-full h-full flex flex-col items-center">
              <div className="p-8 text-center bg-rose-50 w-full border-b border-rose-100">
                <h3 className="text-rose-800 font-bold uppercase tracking-widest text-sm mb-2">
                  Solved For {solveFor.toUpperCase()}
                </h3>
                <div className="text-6xl font-black text-gray-900 drop-shadow-sm">
                  {result.value.toLocaleString("en-US", {
                    maximumFractionDigits: 5,
                  })}
                </div>
              </div>

              <div className="p-6 w-full text-left bg-gray-50 flex-grow">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">
                  Step-by-Step Breakdown
                </h3>
                <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-200 shadow-inner font-mono text-sm text-gray-800">
                  {result.equationSteps.map((step, idx) => (
                    <div
                      key={idx}
                      className={
                        idx === result.equationSteps.length - 1
                          ? "font-bold text-rose-600 mt-2 pt-2 border-t border-gray-100"
                          : ""
                      }
                    >
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-rose-300 font-medium p-8">
              Enter the known lengths. Ensure the hypotenuse is always strictly
              greater than either individual leg.
            </div>
          )}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Pythagorean Theorem Calculator",
            operatingSystem: "All",
            applicationCategory: "EducationalApplication",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title="Pythagorean Theorem Solver (a² + b² = c²)"
          whatIsIt={
            <>
              <p>
                The <strong>Pythagorean Calculator</strong> visually solves for
                the missing side length of any Right-Angled Triangle. By
                providing any two known sides, it instantly calculates the
                third.
              </p>
              <p>
                Not only does this tool output the final exact mathematical
                decimal, but it fundamentally breaks down the logic by printing
                a line-by-line algebraic proof of the calculation, ensuring you
                can show your work.
              </p>
            </>
          }
          formula={
          <>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 font-mono text-lg text-indigo-700 text-center shadow-sm my-6">
              a² + b² = c²
            </div>
            <p className="text-sm text-slate-500 text-center">
              Used to find the hypotenuse (c) of a right triangle.
            </p>
          </>
        }
          example={
            <>
              <p>
                Assume you are painting a house. Your ladder is exactly{" "}
                <strong>13 feet long (Hypotenuse c)</strong>. You place the base
                of the ladder exactly{" "}
                <strong>5 feet away from the wall (Leg a)</strong>.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                <li>
                  <strong>The Question:</strong> Exactly how high up the wall
                  will the ladder reach (Leg b)?
                </li>
                <li>
                  <strong>The Algebra:</strong> (5)² + b² = (13)². Therefore, 25
                  + b² = 169.
                </li>
                <li>
                  <strong>The Subtraction:</strong> b² = 144.
                </li>
                <li>
                  <strong>The Result:</strong> Taking the square root of 144,
                  the ladder reaches exactly <strong>12 feet</strong> up the
                  wall (Leg b).
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-gray-700">
              <li>
                <strong>Architecture & Construction:</strong> Ensuring
                foundation corners and wall frames are perfectly "square" (90
                degrees) by forcing diagonal measurements to adhere to the a² +
                b² = c² ratio.
              </li>
              <li>
                <strong>Navigation & Flight:</strong> Calculating the exact "as
                the crow flies" straight diagonal distance between two points
                mapped on an X and Y coordinate grid.
              </li>
              <li>
                <strong>Screen Sizing:</strong> Calculating the true physical
                diagonal width (like a "65-inch TV") based on a monitor's
                horizontal and vertical bezel measurements.
              </li>
            </ul>
          }
          faqs={[
            {
              question: "Does this work for ALL triangles?",
              answer:
                "No. The Pythagorean Theorem mathematically ONLY functions on right-angled triangles—meaning the shape must contain exactly one perfect 90-degree interior corner. If the triangle is skewed or bent, you must use the Law of Cosines instead.",
            },
            {
              question: "Why does the calculator say my input is invalid?",
              answer:
                "The Hypotenuse (c) must inherently, mathematically, always be the longest side of a right triangle. If you tell the calculator that Leg (a) is 20, but the Hypotenuse (c) is only 5, the math will crash because it's a structural impossibility.",
            },
            {
              question: "What is a 'Pythagorean Triple'?",
              answer:
                "A Triple is a rare set of three whole, non-decimal integers that perfectly fit the formula. The most famous is 3-4-5 (3² + 4² = 5² or 9 + 16 = 25). Another classic is 5-12-13. Builders often memorize these specific integer sizes for fast, easy framing.",
            },
          ]}
          relatedCalculators={[
            {
              name: "Distance Calculator",
              path: "/distance-calculator/",
              desc: "A practical application of Pythagoras used to measure spacing on a 2D coordinate grid.",
            },
            {
              name: "Triangle Calculator",
              path: "/triangle-calculator/",
              desc: "A more advanced solver for non-right-angled triangles utilizing the Law of Cosines.",
            },
            {
              name: "Square Root / Scientific",
              path: "/scientific-calculator/",
              desc: "Execute manual root extractions on a digital keypad interface.",
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
