"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function DistanceCalculator() {
  const [x1, setX1] = useState("0");
  const [y1, setY1] = useState("0");
  const [x2, setX2] = useState("3");
  const [y2, setY2] = useState("4");

  const [result, setResult] = useState<{
    distance: number;
    steps: string;
  } | null>(null);

  const calculate = () => {
    const p1x = parseFloat(x1);
    const p1y = parseFloat(y1);
    const p2x = parseFloat(x2);
    const p2y = parseFloat(y2);

    if (isNaN(p1x) || isNaN(p1y) || isNaN(p2x) || isNaN(p2y)) {
      setResult(null);
      return;
    }

    const dx = p2x - p1x;
    const dy = p2y - p1y;
    const obj = Math.sqrt(dx * dx + dy * dy);

    const steps = `d = √[(${p2x} - ${p1x})² + (${p2y} - ${p1y})²]
d = √[(${dx})² + (${dy})²]
d = √[${dx * dx} + ${dy * dy}]
d = √${dx * dx + dy * dy}
d ≈ ${obj.toFixed(4)}`;

    setResult({
      distance: obj,
      steps: steps,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-sky-900 flex items-center justify-center font-serif">
          <span className="mr-3">📏</span> Distance Calculator
        </h1>
        <p className="text-sky-700 text-lg max-w-2xl mx-auto">
          Calculate the exact distance between two points on a 2D Cartesian
          coordinate plane.
        </p>
      </div>

      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-zinc-200 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-sky-50 p-6 rounded-xl border border-sky-100">
            <h3 className="font-bold text-sky-900 mb-4 uppercase tracking-widest text-sm border-b border-sky-200 pb-2">
              Point 1 (x₁, y₁)
            </h3>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-xs font-bold text-zinc-500 mb-1">
                  X₁ Coordinate
                </label>
                <input
                  type="number"
                  step="any"
                  value={x1}
                  onChange={(e) => setX1(e.target.value)}
                  className="w-full rounded-lg border-zinc-300 shadow-sm p-3 border focus:border-sky-500 font-bold bg-white text-lg"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-bold text-zinc-500 mb-1">
                  Y₁ Coordinate
                </label>
                <input
                  type="number"
                  step="any"
                  value={y1}
                  onChange={(e) => setY1(e.target.value)}
                  className="w-full rounded-lg border-zinc-300 shadow-sm p-3 border focus:border-sky-500 font-bold bg-white text-lg"
                />
              </div>
            </div>
          </div>

          <div className="bg-rose-50 p-6 rounded-xl border border-rose-100">
            <h3 className="font-bold text-rose-900 mb-4 uppercase tracking-widest text-sm border-b border-rose-200 pb-2">
              Point 2 (x₂, y₂)
            </h3>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-xs font-bold text-zinc-500 mb-1">
                  X₂ Coordinate
                </label>
                <input
                  type="number"
                  step="any"
                  value={x2}
                  onChange={(e) => setX2(e.target.value)}
                  className="w-full rounded-lg border-zinc-300 shadow-sm p-3 border focus:border-sky-500 font-bold bg-white text-lg"
                  onKeyDown={(e) => e.key === "Enter" && calculate()}
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-bold text-zinc-500 mb-1">
                  Y₂ Coordinate
                </label>
                <input
                  type="number"
                  step="any"
                  value={y2}
                  onChange={(e) => setY2(e.target.value)}
                  className="w-full rounded-lg border-zinc-300 shadow-sm p-3 border focus:border-sky-500 font-bold bg-white text-lg"
                  onKeyDown={(e) => e.key === "Enter" && calculate()}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={calculate}
            className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-sky-600/30 uppercase tracking-widest text-lg"
          >
            Calculate Distance
          </button>
        </div>
      </div>

      {result !== null && (
        <div className="bg-sky-950 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center gap-8">
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

          <div className="z-10 flex-1 text-center md:text-left flex flex-col items-center md:items-start">
            <h2 className="text-sky-400 font-bold uppercase tracking-widest text-xs mb-2 z-10">
              Calculated Distance (d)
            </h2>
            <div className="font-mono text-white font-black text-6xl break-all">
              {result.distance.toLocaleString("en-US", {
                maximumFractionDigits: 6,
              })}
            </div>
          </div>

          <div className="z-10 flex-1 w-full bg-black/40 p-6 rounded-xl border border-white/10">
            <h3 className="text-sky-300 font-bold uppercase tracking-wider text-[10px] mb-3">
              Step-by-step Solution
            </h3>
            <pre className="font-mono text-zinc-300 text-sm whitespace-pre-wrap">
              {result.steps}
            </pre>
          </div>
        </div>
      )}

      <div className="mt-8 bg-zinc-100 p-6 rounded-xl border border-zinc-200 text-sm text-zinc-600 max-w-2xl mx-auto space-y-2 text-center">
        <p className="font-bold text-zinc-800 uppercase tracking-widest mb-2">
          Distance Formula
        </p>
        <div className="inline-block bg-white p-4 rounded-lg shadow-sm font-mono border border-zinc-200 mb-2">
          d = √[(x₂ - x₁)² + (y₂ - y₁)²]
        </div>
        <p>
          Derived from the Pythagorean theorem, this formula calculates the
          straight-line distance between two points in a Euclidean space.
        </p>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Distance Calculator",
            operatingSystem: "All",
            applicationCategory: "EducationalApplication",
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title="2D Coordinate Distance Calculator"
          whatIsIt={
            <>
              <p>
                The <strong>Distance Calculator</strong> computes the exact,
                straight-line distance between any two specific points on a
                standard 2D Cartesian coordinate plane.
              </p>
              <p>
                Rather than manually counting grid squares or charting
                triangles, this tool applies the foundational principles of
                Euclidean geometry to provide highly precise spatial metrics,
                complete with step-by-step algebraic breakdowns.
              </p>

              <p className="mt-4 text-sm text-gray-500">
                <strong>Related Terms:</strong> Distance Calculator, Measure
                Distance Google Maps, Distance Calculator Map, Driving Distance
                Calculator, Google Maps Distance Calculator, Google Maps
                Distance, Distance Map, Distance Formula, Distance Formula
                Calculator
              </p>
            </>
          }
          formula={
            <>
              <p>
                The Distance Formula is actually just a direct algebraic
                derivation of the famous Pythagorean Theorem (a² + b² = c²).
                Instead of solving for the hypotenuse 'c', you are solving for
                distance 'd':
              </p>
              <div className="bg-sky-50 p-4 rounded-lg font-mono text-center text-[15px] shadow-sm my-4 text-sky-900 border border-sky-100">
                d = √ [ (x₂ - x₁)² + (y₂ - y₁)² ]
              </div>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                <li>
                  <strong>(x₂ - x₁)</strong> represents the horizontal distance
                  traveled between the points.
                </li>
                <li>
                  <strong>(y₂ - y₁)</strong> represents the vertical distance
                  traveled between the points.
                </li>
                <li>
                  By squaring these differences, adding them, and taking the
                  square root, you find the exact diagonal distance.
                </li>
              </ul>
            </>
          }
          example={
            <>
              <p>
                Suppose you want to find the exact distance between{" "}
                <strong>Point A (0, 0)</strong> and{" "}
                <strong>Point B (3, 4)</strong>.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                <li>
                  <strong>Step 1 (Find Differences):</strong> (3 - 0) = 3 for X,
                  and (4 - 0) = 4 for Y.
                </li>
                <li>
                  <strong>Step 2 (Square the Differences):</strong> 3² = 9, and
                  4² = 16.
                </li>
                <li>
                  <strong>Step 3 (Add them together):</strong> 9 + 16 = 25.
                </li>
                <li>
                  <strong>Step 4 (Square Root):</strong> The square root of 25
                  is exactly 5. The points are exactly <strong>5 units</strong>{" "}
                  apart.
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-gray-700">
              <li>
                <strong>Game Development:</strong> Utilizing coordinate distance
                logic in programming to determine if a player character is close
                enough to an enemy to trigger combat or collision.
              </li>
              <li>
                <strong>Cartography & Logistics:</strong> Calculating direct "as
                the crow flies" physical distances between two GPS coordinate
                mappings on a flattened grid.
              </li>
              <li>
                <strong>Geometry Assignments:</strong> Verifying high school and
                college spatial coordinate homework with step-by-step
                mathematical proofs.
              </li>
            </ul>
          }
          faqs={[
            {
              question:
                "Does it matter which point is Point 1 and which is Point 2?",
              answer:
                "No. Because the formula dictates that you square the resulting differences, any negative numbers are immediately turned into positives. The distance from A to B is identical to the distance from B to A.",
            },
            {
              question: "Can the final distance be a negative number?",
              answer:
                "No. In Euclidean geometry, physical distance represents a magnitude of space between two locations, which cannot mathematically be negative. The square root operation naturally prevents this.",
            },
            {
              question: "Why does the formula use a square root?",
              answer:
                "Because it's derived from the Pythagorean theorem (c² = a² + b²). Since we want entirely raw distance 'c', we must take the square root of the other side of the equation to cancel out the exponent.",
            },
          ]}
          relatedCalculators={[
            {
              name: "Midpoint Calculator",
              path: "/midpoint-calculator",
              desc: "Find the exact halfway coordinate located between these two same points.",
            },
            {
              name: "Pythagorean Theorem Calculator",
              path: "/pythagorean-calculator",
              desc: "Explore the core geometric concept that powers the distance formula.",
            },
            {
              name: "Slope Calculator",
              path: "/slope-calculator",
              desc: "Determine the angle and absolute steepness of the line connecting your two points.",
            },
            {
              name: "Percentage Calculator",
              path: "/percentage-calculator",
              desc: "Easily calculate percentages, increases, and decreases.",
            }]}
        />
      </div>
    </div>
  );
}
