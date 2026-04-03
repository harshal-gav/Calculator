"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function SphereCalculator() {
  const [radius, setRadius] = useState("5");

  const r = parseFloat(radius);

  let volume = 0;
  let surfaceArea = 0;
  let circumference = 0;
  let diameter = 0;
  let isValid = false;

  if (!isNaN(r) && r > 0) {
    isValid = true;
    diameter = 2 * r;
    circumference = 2 * Math.PI * r;
    surfaceArea = 4 * Math.PI * r * r;
    volume = (4 / 3) * Math.PI * Math.pow(r, 3);
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-violet-700 border-b pb-4 flex items-center">
        <span className="mr-3">🌍</span> Sphere Calculator
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Enter the radius of a sphere to calculate its volume, surface area, and
        circumference instantly.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Inputs */}
        <div className="bg-violet-50 p-6 rounded-xl border border-violet-100 flex flex-col justify-center space-y-6">
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
              className="w-full rounded-xl border-gray-300 p-4 shadow-sm focus:border-violet-500 font-bold text-2xl text-gray-800"
              placeholder="e.g. 5"
            />
          </div>
        </div>

        {/* Visualization / Diagram placeholder */}
        <div className="bg-white border-2 border-dashed border-violet-200 rounded-xl p-6 flex items-center justify-center min-h-[250px] relative overflow-hidden">
          <div className="opacity-10 absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-violet-400 to-transparent"></div>
          <svg
            viewBox="0 0 100 100"
            className="w-48 h-48 drop-shadow-2xl text-violet-600 z-10"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {/* Outer circle */}
            <circle cx="50" cy="50" r="40" />
            {/* Equator */}
            <ellipse cx="50" cy="50" rx="40" ry="12" strokeDasharray="3,3" />
            <path
              d="M10 50 C10 56.6 27.9 62 50 62 C72.1 62 90 56.6 90 50"
              strokeWidth="2"
            />

            {/* Radius line */}
            <line
              x1="50"
              y1="50"
              x2="90"
              y2="50"
              strokeDasharray="4,4"
              className="text-violet-400"
            />
            <circle cx="50" cy="50" r="2" fill="currentColor" />
          </svg>
        </div>
      </div>

      {/* Results */}
      {isValid ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-violet-600 text-white p-6 rounded-xl shadow-md transform transition hover:-translate-y-1">
            <div className="text-xs font-bold uppercase tracking-wider mb-2 text-violet-200">
              Volume
            </div>
            <div className="text-4xl font-black">{volume.toFixed(2)}</div>
            <div className="text-sm mt-2 text-violet-200 font-mono">
              V = ⁴/₃πr³
            </div>
          </div>
          <div className="bg-violet-700 text-white p-6 rounded-xl shadow-md transform transition hover:-translate-y-1">
            <div className="text-xs font-bold uppercase tracking-wider mb-2 text-violet-200">
              Surface Area
            </div>
            <div className="text-4xl font-black">{surfaceArea.toFixed(2)}</div>
            <div className="text-sm mt-2 text-violet-200 font-mono">
              A = 4πr²
            </div>
          </div>
          <div className="bg-violet-800 text-white p-6 rounded-xl shadow-md transform transition hover:-translate-y-1">
            <div className="text-xs font-bold uppercase tracking-wider mb-2 text-violet-200">
              Circumference
            </div>
            <div className="text-4xl font-black">
              {circumference.toFixed(2)}
            </div>
            <div className="text-sm mt-2 text-violet-200 font-mono">
              C = 2πr
            </div>
          </div>
          <div className="bg-violet-900 text-white p-6 rounded-xl shadow-md transform transition hover:-translate-y-1">
            <div className="text-xs font-bold uppercase tracking-wider mb-2 text-violet-200">
              Diameter
            </div>
            <div className="text-4xl font-black">{diameter.toFixed(2)}</div>
            <div className="text-sm mt-2 text-violet-200 font-mono">d = 2r</div>
          </div>
        </div>
      ) : (
        <div className="text-center p-8 bg-gray-50 rounded-xl text-gray-500 font-medium border border-gray-200">
          Please enter a positive number for the radius to see results.
        </div>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Sphere Calculator",
            operatingSystem: "All",
            applicationCategory: "EducationalApplication",
          }),
        }}
      />

      <div className="mt-8 text-left">
        <CalculatorSEO
          title="Spherical 3D Volume & Surface Calculator"
          whatIsIt={
            <p>
              The <strong>Sphere Calculator</strong> is an elegant 3D
              mathematics tool that extrapolates the entirety of a perfect
              sphere's physical dimensions using only one known metric: its
              radius. It instantly generates the maximal width (Diameter), the
              equatorial perimeter (Circumference), the exterior wrapping area
              (Surface Area), and the 3D interior capacity (Volume).
            </p>
          }
          formula={
          <>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 font-mono text-lg text-indigo-700 text-center shadow-sm my-6">
              V = (4/3)πr³ | SA = 4πr²
            </div>
            <p className="text-sm text-slate-500 text-center">
              Where r is the radius of the sphere.
            </p>
          </>
        }
          example={
            <>
              <p>
                Let's calculate the surface material needed to construct a
                professional leather basketball.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-violet-800">
                <li>
                  <strong>The Input:</strong> A regulation men's basketball has
                  an approximate radius of 4.75 inches.
                </li>
                <li>
                  <strong>Surface Area Math:</strong> A = 4 × π × r² = 4 × π ×
                  (4.75)².
                </li>
                <li>
                  <strong>Calculation:</strong> 4 × 3.14159 × 22.5625.
                </li>
                <li>
                  <strong>Result:</strong> It requires exactly{" "}
                  <strong>283.5 square inches</strong> of leather material to
                  cover the outer surface of the ball.
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-violet-800">
              <li>
                <strong>Astrophysics & Astronomy:</strong> Scientists estimating
                the massive gas volumes and gravity-sustaining surface areas of
                newly discovered exoplanets or determining the density profiles
                of distant stars based on observed equatorial diameters.
              </li>
              <li>
                <strong>Industrial Gas Storage:</strong> Engineers designing
                highly pressurized, perfectly spherical LPG (Liquid Petroleum
                Gas) containment tanks, taking advantage of the sphere's
                mathematically unparalleled structural integrity to prevent
                stress-fractures at corners.
              </li>
              <li>
                <strong>Product Packaging & Design:</strong> Determining the
                absolute maximum milliliters of liquid cosmetic product that can
                be injected into a designer spherical glass perfume bottle while
                keeping the exterior dimensions compact.
              </li>
            </ul>
          }
          faqs={[
            {
              question: "Is the Earth a perfect geometric sphere?",
              answer:
                "No! Due to centrifugal force from spinning, the Earth is actually an 'Oblate Spheroid'. It bulges slightly outward at the equator and flattens slightly at the North and South poles. However, for most basic architectural/travel calculations, treating it as a perfect sphere is standard practice.",
            },
            {
              question: "What is an 'Equatorial Circumference'?",
              answer:
                "It is the absolutely longest possible distance you could travel in a straight line across the surface, splitting the sphere perfectly in half. If you wrap a tape measure around the absolute widest fattest section of a ball, you are measuring its maximum circumference.",
            },
            {
              question: "Why does the Volume formula use a fraction (4/3)?",
              answer:
                "This is derived from Calculus (solid integration). A sphere's volume is exactly 2/3 the volume of its 'circumscribed cylinder' (the smallest tight-fitting cylinder you could drop the ball into). Since cylinder volume is (2r) × πr², 2/3 of that equals 4/3πr³.",
            },
          ]}
          relatedCalculators={[
            {
              name: "Circle Calculator",
              path: "/circle-calculator/",
              desc: "Calculate the flat 2D shadow profile of a sphere.",
            },
            {
              name: "Cylinder Calculator",
              path: "/cylinder-calculator/",
              desc: "Compare spherical volume against bounding cylinders.",
            },
            {
              name: "Distance Calculator",
              path: "/distance-calculator/",
              desc: "Calculate physical point-to-point distances across Earth's spheroid.",
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
