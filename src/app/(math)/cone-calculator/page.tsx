"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function ConeCalculator() {
  const [radius, setRadius] = useState("5");
  const [height, setHeight] = useState("10");

  const r = parseFloat(radius);
  const h = parseFloat(height);

  let volume = 0;
  let surfaceArea = 0;
  let slantHeight = 0;
  let baseArea = 0;
  let lateralArea = 0;
  let isValid = false;

  if (!isNaN(r) && !isNaN(h) && r > 0 && h > 0) {
    isValid = true;
    slantHeight = Math.sqrt(r * r + h * h);
    baseArea = Math.PI * r * r;
    lateralArea = Math.PI * r * slantHeight;
    surfaceArea = baseArea + lateralArea;
    volume = (1 / 3) * Math.PI * r * r * h;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-emerald-700 border-b pb-4 flex items-center">
        <span className="mr-3">📐</span> Cone Calculator
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Enter the radius and height of a right circular cone to instantly find
        its volume, surface area, and slant height.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Inputs */}
        <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Radius (r)
            </label>
            <input
              type="number"
              min="0"
              step="any"
              value={radius}
              onChange={(e) => setRadius(e.target.value)}
              className="w-full rounded-xl border-gray-300 p-3 shadow-sm focus:border-emerald-500 font-bold text-xl text-gray-800"
              placeholder="e.g. 5"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Height (h)
            </label>
            <input
              type="number"
              min="0"
              step="any"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full rounded-xl border-gray-300 p-3 shadow-sm focus:border-emerald-500 font-bold text-xl text-gray-800"
              placeholder="e.g. 10"
            />
          </div>
        </div>

        {/* Visualization / Diagram placeholder */}
        <div className="bg-white border-2 border-dashed border-emerald-200 rounded-xl p-6 flex items-center justify-center min-h-[250px] relative overflow-hidden">
          <div className="opacity-10 absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-400 to-transparent"></div>
          <svg
            viewBox="0 0 100 100"
            className="w-48 h-48 drop-shadow-xl text-emerald-600 z-10"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {/* Base ellipse */}
            <ellipse cx="50" cy="80" rx="30" ry="10" strokeDasharray="2,2" />
            <path d="M20 80 C20 85.5 33.4 90 50 90 C66.6 90 80 85.5 80 80" />
            {/* Sides */}
            <path d="M20 80 L50 20 L80 80" />
            {/* Height line */}
            <line
              x1="50"
              y1="20"
              x2="50"
              y2="80"
              strokeDasharray="4,4"
              className="text-emerald-400"
            />
            {/* Radius line */}
            <line
              x1="50"
              y1="80"
              x2="80"
              y2="80"
              strokeDasharray="4,4"
              className="text-emerald-400"
            />
          </svg>
        </div>
      </div>

      {/* Results */}
      {isValid ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-emerald-600 text-white p-5 rounded-xl shadow-md transform transition hover:-translate-y-1">
            <div className="text-xs font-bold uppercase tracking-wider mb-1 text-emerald-200">
              Volume
            </div>
            <div className="text-2xl font-black">{volume.toFixed(2)}</div>
            <div className="text-xs mt-1 text-emerald-200 font-mono">
              V = ⅓πr²h
            </div>
          </div>
          <div className="bg-emerald-700 text-white p-5 rounded-xl shadow-md transform transition hover:-translate-y-1">
            <div className="text-xs font-bold uppercase tracking-wider mb-1 text-emerald-200">
              Total Surface Area
            </div>
            <div className="text-2xl font-black">{surfaceArea.toFixed(2)}</div>
            <div className="text-xs mt-1 text-emerald-200 font-mono">
              A = πr(r + s)
            </div>
          </div>
          <div className="bg-emerald-800 text-white p-5 rounded-xl shadow-md transform transition hover:-translate-y-1">
            <div className="text-xs font-bold uppercase tracking-wider mb-1 text-emerald-200">
              Lateral Surface Area
            </div>
            <div className="text-2xl font-black">{lateralArea.toFixed(2)}</div>
            <div className="text-xs mt-1 text-emerald-200 font-mono">
              L = πrs
            </div>
          </div>
          <div className="bg-emerald-900 text-white p-5 rounded-xl shadow-md transform transition hover:-translate-y-1">
            <div className="text-xs font-bold uppercase tracking-wider mb-1 text-emerald-200">
              Slant Height (s)
            </div>
            <div className="text-2xl font-black">{slantHeight.toFixed(2)}</div>
            <div className="text-xs mt-1 text-emerald-200 font-mono">
              s = √(r² + h²)
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center p-8 bg-gray-50 rounded-xl text-gray-500 font-medium border border-gray-200">
          Please enter positive numbers for both radius and height to see
          results.
        </div>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Cone Calculator",
            operatingSystem: "All",
            applicationCategory: "EducationalApplication",
          }),
        }}
      />

      <div className="mt-8 text-left">
        <CalculatorSEO
          title="Geometric Cone Properties Calculator"
          whatIsIt={
            <p>
              The <strong>Cone Calculator</strong> is a specialized geometry
              tool designed to compute the three-dimensional properties of a
              right circular cone. By simply defining the radius of its circular
              base and its perpendicular altitude (height), the calculator
              instantaneously derives the total internal volume, the curved
              lateral surface area, the flat base area, the total surface area,
              and the diagonal slant height.
            </p>
          }
          formula={
            <>
              <p>
                To accurately render the metrics of a cone, the tool utilizes
                Pythagorean theorems (for the slant) and Pi-based scalar
                multipliers. True Right Circular Cones rely heavily on the
                constant <strong>π (Pi ≈ 3.14159)</strong> for all rotational
                geometry.
              </p>
              <div className="bg-emerald-50 p-4 rounded-lg font-mono text-center text-[15px] shadow-sm my-4 flex flex-col gap-2 border border-emerald-100 text-emerald-900">
                <p>
                  <strong>Slant Height (s) = √(r² + h²)</strong>
                </p>
                <p className="mt-2 pt-2 border-t border-emerald-200">
                  <strong>Volume (V) = ⅓ × π × r² × h</strong>
                </p>
                <p className="mt-2 pt-2 border-t border-emerald-200">
                  <strong>Lateral Area (L) = π × r × s</strong>
                </p>
                <p className="mt-2 pt-2 border-t border-emerald-200">
                  <strong>Total Area (A) = π × r × (r + s)</strong>
                </p>
              </div>
            </>
          }
          example={
            <>
              <p>
                Let's map out the properties of a physical traffic cone to find
                out how much plastic is needed to manufacture the outer layer.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-emerald-800">
                <li>
                  <strong>The Input:</strong> The traffic cone has a base radius
                  of 5 inches and a height of 10 inches.
                </li>
                <li>
                  <strong>Calculating Slant (s):</strong> √(5² + 10²) = √(25 +
                  100) = √125 ≈ 11.18 inches.
                </li>
                <li>
                  <strong>Lateral Area (L):</strong> We use the slant height to
                  find the curved area (the orange plastic part): π × 5 × 11.18.
                </li>
                <li>
                  <strong>Result:</strong> It requires approximately{" "}
                  <strong>175.6 square inches</strong> of orange plastic to mold
                  the visible cone section.
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-emerald-800">
              <li>
                <strong>Industrial Manufacturing:</strong> Calculating the exact
                square footage of sheet metal required to fabricate conical
                hoppers, funnels, or exhaust caps for factory machinery.
              </li>
              <li>
                <strong>Culinary Arts:</strong> Determining the absolute
                capacity (Volume) in fluid ounces for custom-made waffle
                ice-cream cones or fancy pastry molding cups to standardize
                dessert portion sizes.
              </li>
              <li>
                <strong>Architectural Engineering:</strong> Designing church
                steeples or modern conical roof structures, requiring precise
                calculation of the Lateral Surface Area to purchase the exact
                amount of roofing shingles.
              </li>
            </ul>
          }
          faqs={[
            {
              question: "Is this for 'Right' cones or 'Oblique' cones?",
              answer:
                "This calculator specifically requires a 'Right Circular Cone'—where the apex (the top point) sits perfectly centered above the circular base. Oblique cones (where the top is skewed to the side) share the same Volume formula but have incredibly complex Surface Area integrations.",
            },
            {
              question: "Why is the volume always divided by 3?",
              answer:
                "Geometrically, any cone takes up exactly one-third (1/3) of the volume of a cylinder that shares the exact same base radius and height. This was famously discovered by the ancient Greek mathematician Archimedes.",
            },
            {
              question:
                "What is the difference between Lateral Area and Total Area?",
              answer:
                "Lateral area is only the curved, slanting 'side' of the cone (like an open ice cream cone or a party hat). Total Area also includes the flat circular bottom (the 'cap' sealing it shut).",
            },
          ]}
          relatedCalculators={[
            {
              name: "Cylinder Calculator",
              path: "/cylinder-calculator",
              desc: "Calculate the geometric metrics of a perfect cylindrical tube.",
            },
            {
              name: "Sphere Calculator",
              path: "/sphere-calculator",
              desc: "Calculate the volume and surface metrics of a round ball.",
            },
            {
              name: "Triangle Calculator",
              path: "/triangle-calculator",
              desc: "Calculate 2D cross-sections utilizing Pythagorean theorems.",
            },
          ]}
        />
      </div>
    </div>
  );
}
