"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function PerimeterCalculator() {
  const [shape, setShape] = useState("rectangle");
  // Inputs
  const [length, setLength] = useState("10");
  const [width, setWidth] = useState("5");

  // Triangle
  const [sideA, setSideA] = useState("3");
  const [sideB, setSideB] = useState("4");
  const [sideC, setSideC] = useState("5");

  // Circle (Circumference instead of Perimeter technically)
  const [radius, setRadius] = useState("5");

  // Polygon
  const [sidesCount, setSidesCount] = useState("5");
  const [sideLength, setSideLength] = useState("10");

  const [result, setResult] = useState<number | null>(null);

  const calculatePerimeter = () => {
    let perimeter = 0;

    if (shape === "rectangle") {
      const l = parseFloat(length) || 0;
      const w = parseFloat(width) || 0;
      perimeter = 2 * (l + w);
    } else if (shape === "square") {
      const s = parseFloat(length) || 0;
      perimeter = 4 * s;
    } else if (shape === "triangle") {
      const a = parseFloat(sideA) || 0;
      const b = parseFloat(sideB) || 0;
      const c = parseFloat(sideC) || 0;
      perimeter = a + b + c;
    } else if (shape === "circle") {
      const r = parseFloat(radius) || 0;
      perimeter = 2 * Math.PI * r; // Circumference
    } else if (shape === "polygon") {
      const n = parseFloat(sidesCount) || 0;
      const s = parseFloat(sideLength) || 0;
      perimeter = n * s;
    }

    setResult(perimeter);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-orange-900 border-b pb-4">
        Perimeter Calculator
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Calculate the total perimeter (or circumference) of 2D shapes like
        rectangles, circles, and regular polygons.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="bg-orange-50 p-6 rounded-xl border border-orange-100 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Select Shape
            </label>
            <select
              value={shape}
              onChange={(e) => {
                setShape(e.target.value);
                setResult(null);
              }}
              className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-orange-500 font-bold bg-white cursor-pointer"
            >
              <option value="rectangle">Rectangle</option>
              <option value="square">Square</option>
              <option value="triangle">Triangle</option>
              <option value="circle">Circle (Circumference)</option>
              <option value="polygon">Regular Polygon</option>
            </select>
          </div>

          {shape === "rectangle" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Length
                </label>
                <input
                  type="number"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-orange-500 font-medium"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Width
                </label>
                <input
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-orange-500 font-medium"
                />
              </div>
            </div>
          )}

          {shape === "square" && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Side Length
              </label>
              <input
                type="number"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-orange-500 font-medium"
              />
            </div>
          )}

          {shape === "triangle" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Side a
                </label>
                <input
                  type="number"
                  value={sideA}
                  onChange={(e) => setSideA(e.target.value)}
                  className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-orange-500 font-medium"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Side b
                </label>
                <input
                  type="number"
                  value={sideB}
                  onChange={(e) => setSideB(e.target.value)}
                  className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-orange-500 font-medium"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Side c
                </label>
                <input
                  type="number"
                  value={sideC}
                  onChange={(e) => setSideC(e.target.value)}
                  className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-orange-500 font-medium"
                />
              </div>
            </div>
          )}

          {shape === "circle" && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Radius (r)
              </label>
              <input
                type="number"
                value={radius}
                onChange={(e) => setRadius(e.target.value)}
                className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-orange-500 font-medium"
              />
            </div>
          )}

          {shape === "polygon" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Number of Sides (n)
                </label>
                <input
                  type="number"
                  step="1"
                  value={sidesCount}
                  onChange={(e) => setSidesCount(e.target.value)}
                  className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-orange-500 font-medium"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Side Length
                </label>
                <input
                  type="number"
                  value={sideLength}
                  onChange={(e) => setSideLength(e.target.value)}
                  className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-orange-500 font-medium"
                />
              </div>
            </div>
          )}

          <button
            onClick={calculatePerimeter}
            className="w-full bg-orange-600 text-white font-bold py-4 rounded-xl hover:bg-orange-700 transition shadow-lg uppercase tracking-wide mt-2"
          >
            Calculate Perimeter
          </button>

          <div className="text-center pt-2">
            <span className="text-[11px] font-bold text-orange-600 uppercase tracking-widest whitespace-pre-wrap">
              {shape === "rectangle" && "Formula: P = 2(L + W)"},
              {shape === "square" && "Formula: P = 4S"},
              {shape === "triangle" && "Formula: P = a + b + c"},
              {shape === "circle" && "Formula: C = 2πr"},
              {shape === "polygon" && "Formula: C = n × S"}
            </span>
          </div>
        </div>

        {/* Results Screen */}
        <div className="bg-white border-2 border-orange-100 rounded-xl overflow-hidden shadow-sm flex flex-col justify-center p-8">
          {result !== null ? (
            <div className="w-full text-center space-y-4">
              <h3 className="text-orange-800 font-semibold uppercase tracking-wider text-sm mb-2">
                Total {shape === "circle" ? "Circumference" : "Perimeter"}
              </h3>
              <div className="text-6xl font-black text-gray-900 drop-shadow-sm">
                {result.toLocaleString("en-US", { maximumFractionDigits: 4 })}
              </div>
              <p className="text-gray-500 font-medium text-lg mt-2">
                linear units
              </p>
            </div>
          ) : (
            <div className="text-center text-orange-300 font-medium p-4">
              Select a shape and enter the dimensions to calculate the outer
              boundary.
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
            name: "Perimeter Calculator",
            operatingSystem: "All",
            applicationCategory: "EducationalApplication",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title="Perimeter & Circumference Calculator"
          whatIsIt={
            <>
              <p>
                The <strong>Perimeter Calculator</strong> traces and calculates
                the exact outer boundary length of standard 2D geometric shapes.
                It currently supports rectangles, squares, triangles, circles,
                and regular n-sided polygons.
              </p>
              <p>
                Unlike area (which measures the 2D space inside), perimeter
                simply measures a 1D straight line wrapped around the outside
                edge of an object.
              </p>

              <p className="mt-4 text-sm text-gray-500">
                <strong>Related Terms:</strong> Perimeter Calculator
              </p>
            </>
          }
          formula={
            <>
              <p>
                The calculation essentially involves adding up all the outer
                sides of a shape. Here are the specific shortcut formulas
                applied:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                <li>
                  <strong>Rectangle:</strong>{" "}
                  <span className="font-mono bg-orange-50 px-1 rounded">
                    2 × (Length + Width)
                  </span>
                </li>
                <li>
                  <strong>Square:</strong>{" "}
                  <span className="font-mono bg-orange-50 px-1 rounded">
                    4 × Side
                  </span>
                </li>
                <li>
                  <strong>Triangle:</strong>{" "}
                  <span className="font-mono bg-orange-50 px-1 rounded">
                    Side a + Side b + Side c
                  </span>
                </li>
                <li>
                  <strong>Circle:</strong>{" "}
                  <span className="font-mono bg-orange-50 px-1 rounded">
                    2 × π × Radius
                  </span>{" "}
                  (This is uniquely called Circumference).
                </li>
                <li>
                  <strong>Polygon:</strong>{" "}
                  <span className="font-mono bg-orange-50 px-1 rounded">
                    Number of Sides × Length of One Side
                  </span>
                </li>
              </ul>
            </>
          }
          example={
            <>
              <p>
                Suppose you are building a wooden fence around a rectangular
                backyard that measures{" "}
                <strong>40 feet wide by 60 feet long</strong>.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                <li>
                  <strong>The Formula:</strong> Perimeter = 2 × (Length + Width)
                </li>
                <li>
                  <strong>The Math:</strong> 40 + 60 = 100. Then multiply by 2
                  to account for all 4 sides.
                </li>
                <li>
                  <strong>The Result:</strong> The total perimeter is exactly{" "}
                  <strong>200 linear feet</strong>. You must purchase 200 feet
                  of wooden fencing to enclose the yard.
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-gray-700">
              <li>
                <strong>Home Improvement:</strong> Calculating exactly how many
                linear feet of baseboard trim, crown molding, or weather
                stripping are required for a room.
              </li>
              <li>
                <strong>Landscaping & Farming:</strong> Measuring property lines
                to buy the correct amount of wire fencing, stone retaining
                walls, or garden bed edging.
              </li>
              <li>
                <strong>Arts & Crafts:</strong> Figuring out exactly how much
                ribbon or string is required to wrap around the physical outer
                edge of a circular jar or rectangular picture frame.
              </li>
            </ul>
          }
          faqs={[
            {
              question:
                "Why does the circle say 'Circumference' instead of perimeter?",
              answer:
                "It is the exact same concept—measuring the outer boundary. However, in mathematics, the word 'Perimeter' refers exclusively to shapes with straight lines and corners. Because a circle is entirely curved, its outer edge has a special dedicated name: Circumference.",
            },
            {
              question: "What is a 'Regular' Polygon?",
              answer:
                "A regular polygon is a multi-sided shape where every single side is the exact same length, and every internal angle is the exact same degree. (e.g., a perfect Stop Sign is a regular octagon).",
            },
            {
              question:
                "Does calculating perimeter help me figure out the area inside?",
              answer:
                "Usually, no. Two shapes can have the exact same 100-foot perimeter, but completely different internal areas. (A 25x25 square has an area of 625 sq ft. A 40x10 rectangle also has a 100ft perimeter, but an area of only 400 sq ft).",
            },
          ]}
          relatedCalculators={[
            {
              name: "Area Calculator",
              path: "/area-calculator",
              desc: "Calculate the internal 2-dimensional space enclosed by your perimeter fence.",
            },
            {
              name: "Circle Calculator",
              path: "/circle-calculator",
              desc: "Instantly link your calculated circumference to the circle's radius and area.",
            },
            {
              name: "Triangle Calculator",
              path: "/triangle-calculator",
              desc: "A deeper dive that links a triangle's three sides to its internal angles.",
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
