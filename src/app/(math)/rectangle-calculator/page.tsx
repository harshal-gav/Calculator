"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function RectangleCalculator() {
  const [length, setLength] = useState("10");
  const [width, setWidth] = useState("5");

  const l = parseFloat(length);
  const w = parseFloat(width);

  let area = 0;
  let perimeter = 0;
  let diagonal = 0;
  let isValid = false;

  if (!isNaN(l) && !isNaN(w) && l > 0 && w > 0) {
    isValid = true;
    area = l * w;
    perimeter = 2 * (l + w);
    diagonal = Math.sqrt(l * l + w * w);
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-rose-700 border-b pb-4 flex items-center">
        <span className="mr-3">📏</span> Rectangle Calculator
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Enter the length and width of a rectangle to instantly find its area,
        perimeter, and diagonal length.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Inputs */}
        <div className="bg-rose-50 p-6 rounded-xl border border-rose-100 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Length (l)
            </label>
            <input
              type="number"
              min="0"
              step="any"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="w-full rounded-xl border-gray-300 p-3 shadow-sm focus:border-rose-500 font-bold text-xl text-gray-800"
              placeholder="e.g. 10"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Width (w)
            </label>
            <input
              type="number"
              min="0"
              step="any"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              className="w-full rounded-xl border-gray-300 p-3 shadow-sm focus:border-rose-500 font-bold text-xl text-gray-800"
              placeholder="e.g. 5"
            />
          </div>
        </div>

        {/* Visualization / Diagram placeholder */}
        <div className="bg-white border-2 border-dashed border-rose-200 rounded-xl p-6 flex flex-col items-center justify-center min-h-[250px] relative overflow-hidden">
          <div className="opacity-10 absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rose-400 to-transparent"></div>
          <svg
            viewBox="0 0 100 100"
            className="w-full max-w-[200px] h-48 drop-shadow-xl text-rose-600 z-10"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Rectangle */}
            <rect
              x="5"
              y="25"
              width="90"
              height="50"
              fill="currentColor"
              fillOpacity="0.1"
            />

            {/* Diagonal */}
            <line
              x1="5"
              y1="75"
              x2="95"
              y2="25"
              strokeDasharray="4,4"
              className="text-rose-400"
            />

            {/* Labels */}
            <text
              x="50"
              y="20"
              fontSize="8"
              fill="currentColor"
              textAnchor="middle"
              className="font-bold"
            >
              Length (l)
            </text>
            <text
              x="100"
              y="50"
              fontSize="8"
              fill="currentColor"
              textAnchor="middle"
              transform="rotate(-90 95 50)"
              className="font-bold"
            >
              Width (w)
            </text>
          </svg>
        </div>
      </div>

      {/* Results */}
      {isValid ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-rose-600 text-white p-6 rounded-xl shadow-md transform transition hover:-translate-y-1">
            <div className="text-xs font-bold uppercase tracking-wider mb-2 text-rose-200">
              Area
            </div>
            <div className="text-4xl font-black">{area.toFixed(2)}</div>
            <div className="text-sm mt-2 text-rose-200 font-mono">
              A = l × w
            </div>
          </div>
          <div className="bg-rose-700 text-white p-6 rounded-xl shadow-md transform transition hover:-translate-y-1">
            <div className="text-xs font-bold uppercase tracking-wider mb-2 text-rose-200">
              Perimeter
            </div>
            <div className="text-4xl font-black">{perimeter.toFixed(2)}</div>
            <div className="text-sm mt-2 text-rose-200 font-mono">
              P = 2(l + w)
            </div>
          </div>
          <div className="bg-rose-800 text-white p-6 rounded-xl shadow-md transform transition hover:-translate-y-1">
            <div className="text-xs font-bold uppercase tracking-wider mb-2 text-rose-200">
              Diagonal
            </div>
            <div className="text-4xl font-black">{diagonal.toFixed(2)}</div>
            <div className="text-sm mt-2 text-rose-200 font-mono">
              d = √(l² + w²)
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center p-8 bg-gray-50 rounded-xl text-gray-500 font-medium border border-gray-200">
          Please enter positive numbers for both length and width to see
          results.
        </div>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Rectangle Calculator",
            operatingSystem: "All",
            applicationCategory: "EducationalApplication",
          }),
        }}
      />

      <div className="mt-8 text-left">
        <CalculatorSEO
          title="Rectangle Geometry & Area Calculator"
          whatIsIt={
            <p>
              The <strong>Rectangle Calculator</strong> is an essential
              geometric planning tool. By inputting the primary two lateral
              dimensions (Length and Width) of any rectangular shape, it
              instantly outputs the total squared Area, the linear bounding
              Perimeter, and calculates the internal corner-to-corner Diagonal
              length.
            </p>
          }
          formula={
            <>
              <p>
                A rectangle is a four-sided polygon (quadrilateral) where all
                four internal angles are exactly 90 degrees (right angles).
                Because the opposite sides are always perfectly parallel and
                equal in length, its geometric formulas are among the most
                straightforward foundational mathematics.
              </p>
              <div className="bg-rose-50 p-4 rounded-lg font-mono text-center text-[15px] shadow-sm my-4 flex flex-col gap-2 border border-rose-100 text-rose-900">
                <p>
                  <strong>Area (A) = Length × Width</strong>
                </p>
                <p className="mt-2 pt-2 border-t border-rose-200">
                  <strong>Perimeter (P) = 2 × (Length + Width)</strong>
                </p>
                <p className="mt-2 pt-2 border-t border-rose-200">
                  <strong>Diagonal (d) = √(Length² + Width²)</strong>
                </p>
              </div>
            </>
          }
          example={
            <>
              <p>
                Let's calculate the material needed to build a rectangular
                backyard fence and plant grass seed inside it.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-rose-800">
                <li>
                  <strong>The Input:</strong> Your yard has a Length of 40 feet
                  and a Width of 30 feet.
                </li>
                <li>
                  <strong>The Fence (Perimeter):</strong> P = 2 × (40 + 30) = 2
                  × 70. You need exactly <strong>140 feet</strong> of wooden
                  fencing.
                </li>
                <li>
                  <strong>The Grass (Area):</strong> A = 40 × 30. You must buy
                  enough grass seed to cover <strong>1,200 square feet</strong>.
                </li>
                <li>
                  <strong>Crossing It (Diagonal):</strong> d = √(40² + 30²) =
                  √(1600 + 900) = √2500. Walking directly across the yard
                  corner-to-corner is <strong>50 feet</strong>.
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-rose-800">
              <li>
                <strong>Home Renovation & Flooring:</strong> Calculating the
                exact Square Footage of a room (Area) to determine how many
                boxes of laminate flooring or square yards of carpet to
                purchase.
              </li>
              <li>
                <strong>Real Estate & Land Surveying:</strong> Instantly
                translating the bounding property lines (Width and Length) of an
                empty city lot to determine the exact acreage footprint the plot
                contains.
              </li>
              <li>
                <strong>Screen Sizing (TV & Monitors):</strong> TV screens are
                sold by their Diagonal measurement. If a custom cabinet has a
                maximum physical Width and Length opening, you use the Diagonal
                formula to find the largest TV that will fit.
              </li>
            </ul>
          }
          faqs={[
            {
              question: "Is a square a rectangle?",
              answer:
                "Yes, mathematically a Square is a highly specialized type of Rectangle where both the Length and the Width happen to be the exact same number.",
            },
            {
              question:
                "Does it matter which number is Length and which is Width?",
              answer:
                "No. Because multiplication and addition are commutative (A×B is the same as B×A), swapping the length and width numbers will provide the exact same Area, Perimeter, and Diagonal results.",
            },
            {
              question: "How is the diagonal calculated?",
              answer:
                "The diagonal line essentially cuts the rectangle in half, creating two identical right-angled triangles. Therefore, the diagonal is calculated using the Pythagorean Theorem (a² + b² = c²).",
            },
          ]}
          relatedCalculators={[
            {
              name: "Area Calculator",
              path: "/area-calculator/",
              desc: "Calculate total square footage across various irregular shapes.",
            },
            {
              name: "Triangle Calculator",
              path: "/triangle-calculator/",
              desc: "Calculate properties of the shape created by the diagonal slice.",
            },
            {
              name: "Pythagorean Theorem",
              path: "/pythagorean-calculator/",
              desc: "Deep dive into the math behind corner-to-corner diagonals.",
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
