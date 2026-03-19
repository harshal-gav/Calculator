"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
export default function RegularPolygonCalculator() {
  const [sides, setSides] = useState("5"); // Pentagon default
  const [sideLength, setSideLength] = useState("10");

  const [result, setResult] = useState<{
    area: number;
    perimeter: number;
    interiorAngle: number;
    inradius: number;
    circumradius: number;
  } | null>(null);

  const calculate = () => {
    const n = parseInt(sides);
    const s = parseFloat(sideLength);

    if (isNaN(n) || isNaN(s) || n < 3 || s <= 0) {
      setResult(null);
      return;
    }

    const perimeter = n * s;
    // Area = (s^2 * n) / (4 * tan(pi / n))
    const area = (s * s * n) / (4 * Math.tan(Math.PI / n));
    const interiorAngle = ((n - 2) * 180) / n;

    // Inradius r = s / (2 * tan(pi / n))
    const inradius = s / (2 * Math.tan(Math.PI / n));

    // Circumradius R = s / (2 * sin(pi / n))
    const circumradius = s / (2 * Math.sin(Math.PI / n));

    setResult({
      area,
      perimeter,
      interiorAngle,
      inradius,
      circumradius,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-blue-900 flex items-center justify-center font-serif">
          <span className="mr-3">🛑</span> Regular Polygon Calculator
        </h1>
        <p className="text-blue-700 text-lg max-w-2xl mx-auto">
          Calculate area, perimeter, internal angles, and radii for any regular
          polygon.
        </p>
      </div>

      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-zinc-200 mb-8 max-w-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">
              Number of Sides (n)
            </label>
            <input
              type="number"
              step="1"
              min="3"
              value={sides}
              onChange={(e) => setSides(e.target.value)}
              className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-blue-500 font-bold bg-zinc-50 text-xl"
            />
            <p className="text-xs text-zinc-400 mt-2 font-bold">Must be ≥ 3</p>
          </div>
          <div>
            <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">
              Side Length (s)
            </label>
            <input
              type="number"
              step="any"
              min="0"
              value={sideLength}
              onChange={(e) => setSideLength(e.target.value)}
              className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-blue-500 font-bold bg-zinc-50 text-xl"
              onKeyDown={(e) => e.key === "Enter" && calculate()}
            />
          </div>
        </div>

        <div>
          <button
            onClick={calculate}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-blue-600/30 uppercase tracking-widest text-lg"
          >
            Calculate Polygon
          </button>
        </div>
      </div>

      {result !== null && (
        <div className="bg-blue-950 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

          <h2 className="text-blue-400 font-bold uppercase tracking-widest text-xs mb-6 z-10 text-center">
            Geometric Properties
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 z-10 relative">
            <div className="bg-black/30 p-4 lg:p-6 rounded-xl border border-blue-500/30 flex flex-col items-center text-center">
              <span className="text-blue-300 text-[10px] md:text-xs font-bold uppercase tracking-wide mb-2">
                Area
              </span>
              <div className="font-mono text-white font-bold text-xl md:text-2xl mt-1 break-all">
                {result.area.toLocaleString("en-US", {
                  maximumFractionDigits: 4,
                })}
              </div>
            </div>
            <div className="bg-black/30 p-4 lg:p-6 rounded-xl border border-blue-500/30 flex flex-col items-center text-center">
              <span className="text-blue-300 text-[10px] md:text-xs font-bold uppercase tracking-wide mb-2">
                Perimeter
              </span>
              <div className="font-mono text-white font-bold text-xl md:text-2xl mt-1 break-all">
                {result.perimeter.toLocaleString("en-US", {
                  maximumFractionDigits: 4,
                })}
              </div>
            </div>
            <div className="bg-black/30 p-4 lg:p-6 rounded-xl border border-blue-500/30 flex flex-col items-center text-center">
              <span className="text-blue-300 text-[10px] md:text-xs font-bold uppercase tracking-wide mb-2">
                Internal Angle
              </span>
              <div className="font-mono text-white font-bold text-xl md:text-2xl mt-1 break-all">
                {result.interiorAngle.toLocaleString("en-US", {
                  maximumFractionDigits: 2,
                })}
                °
              </div>
            </div>
            <div className="bg-black/30 p-4 lg:p-6 rounded-xl border border-blue-500/30 flex flex-col items-center text-center">
              <span className="text-blue-300 text-[10px] md:text-xs font-bold uppercase tracking-wide mb-2">
                Inradius (Apothem)
              </span>
              <div className="font-mono text-white font-bold text-xl md:text-2xl mt-1 break-all">
                {result.inradius.toLocaleString("en-US", {
                  maximumFractionDigits: 4,
                })}
              </div>
            </div>
            <div className="bg-black/30 p-4 lg:p-6 rounded-xl border border-blue-500/30 flex flex-col items-center text-center col-span-2 lg:col-span-1">
              <span className="text-blue-300 text-[10px] md:text-xs font-bold uppercase tracking-wide mb-2">
                Circumradius
              </span>
              <div className="font-mono text-white font-bold text-xl md:text-2xl mt-1 break-all">
                {result.circumradius.toLocaleString("en-US", {
                  maximumFractionDigits: 4,
                })}
              </div>
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
            name: "Regular Polygon Calculator",
            operatingSystem: "All",
            applicationCategory: "EducationalApplication",
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title="Regular Polygon Calculator"
          whatIsIt={
            <>
              <p>
                A <strong>Regular Polygon Calculator</strong> is a powerful
                geometric tool designed to solve universally complex attributes
                of multi-sided symmetrical shapes. By simply entering the number
                of sides and the length of a single side, it instantaneously
                unpacks the shape's full geometric profile.
              </p>
              <p>
                A "Regular" polygon means that all sides are constructed at the
                exact same length, and all interior angles are identical.
                Familiar examples include equilateral triangles (3 sides),
                squares (4 sides), pentagons (5 sides), and stop signs/octagons
                (8 sides).
              </p>
            </>
          }
          formula={
            <>
              <p>
                Calculating the complex radii and areas of multi-sided polygons
                relies heavily on standard trigonometry (tangent and sine data).
                Assume <strong>n</strong> = number of sides, and{" "}
                <strong>s</strong> = side length:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-zinc-700">
                <li>
                  <strong>Perimeter (\(P\)):</strong> <code>n × s</code>
                </li>
                <li>
                  <strong>Area (\(A\)):</strong>{" "}
                  <code>(s² × n) / [4 × tan(π/n)]</code>
                </li>
                <li>
                  <strong>Internal Angle:</strong>{" "}
                  <code>[(n - 2) × 180°] / n</code>
                </li>
                <li>
                  <strong>Inradius (apothem):</strong>{" "}
                  <code>s / [2 × tan(π/n)]</code>
                </li>
                <li>
                  <strong>Circumradius:</strong> <code>s / [2 × sin(π/n)]</code>
                </li>
              </ul>
            </>
          }
          example={
            <>
              <p>
                Let's analyze a standard geometry problem: a{" "}
                <strong>Regular Hexagon (6 edges)</strong> where each side
                length is precisely <strong>10 cm</strong>.
              </p>
              <ul className="list-none space-y-2 mt-4 font-mono text-sm bg-blue-50 p-4 rounded-xl border border-blue-200">
                <li>
                  <strong>Step 1 (Variables):</strong> n = 6, s = 10
                </li>
                <li>
                  <strong>Step 2 (Perimeter):</strong> 6 × 10 = 60 cm
                </li>
                <li>
                  <strong>Step 3 (Area):</strong> (100 × 6) / [4 × tan(π/6)] ≈
                  259.8076 cm²
                </li>
                <li>
                  <strong>Step 4 (Internal Angle):</strong> [(6 - 2) × 180] / 6
                  = (4 × 180)/6 = 720/6 = 120°
                </li>
                <li>
                  <strong>Step 5 (Inradius/Apothem):</strong> 10 / [2 ×
                  tan(π/6)] ≈ 8.6603 cm
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-zinc-700">
              <li>
                <strong>Product Manufacturing:</strong> Machinists milling metal
                hex-nuts or octagonal bolts must calculate precise circumradius
                specifications to ensure their tools construct the part
                correctly while fitting existing wrenches.
              </li>
              <li>
                <strong>Tile Design & Mosaics:</strong> Calculating the interior
                angles of complex geometric tilings (like tessellations of
                triangles, squares, and hexagons) to ensure bathroom or floor
                tiles fit perfectly without any gaps natively.
              </li>
              <li>
                <strong>3D Modeling / Game Dev:</strong> When rendering
                procedural meshes for computer graphics, programmers rely
                heavily on apothem and circumradius data to quickly generate
                n-sided cylinder bases.
              </li>
            </ul>
          }
          faqs={[
            {
              question:
                "What is the difference between Inradius and Circumradius?",
              answer:
                "The 'Inradius' (often called the Apothem) is the radius of the largest circle that can fit perfectly INSIDE the polygon, touching the flat edges. The 'Circumradius' is the radius of the circle that fits perfectly on the OUTSIDE, touching all the sharp corner vertices.",
            },
            {
              question: "Why does the Area formula use 'tan(π/n)'?",
              answer:
                "Because regular polygons can be broken down naturally into 'n' identical right-angled triangles originating from the absolute center. Using basic SOH CAH TOA trigonometry, the tangent of the interior divided angles allows us to calculate the height of those internal triangles without needing to measure it physically.",
            },
            {
              question: "Can this calculate a circle's area?",
              answer:
                "Theoretically, yes. A circle is essentially a regular polygon with an infinite number of sides. If you type '1000' sides into this tool, the difference between the Inradius, Circumradius, and Area closely matches the mathematical constants of a perfect circle.",
            },
          ]}
          relatedCalculators={[
            {
              name: "Hexagon Calculator",
              path: "/hexagon-calculator/",
              desc: "A specialized calculator strictly for 6-sided regular polygons.",
            },
            {
              name: "Octagon Calculator",
              path: "/octagon-calculator/",
              desc: "A specialized calculator strictly for 8-sided regular polygons.",
            },
            {
              name: "Polygon Calculator",
              path: "/polygon-calculator/",
              desc: "Calculate basic sums of interior angles for irregular polygons.",
            },
            {
              name: "Area Calculator",
              path: "/area-calculator/",
              desc: "Calculate the area of various 2D shapes.",
            }]}
        />
      </div>
    </div>
  );
}
