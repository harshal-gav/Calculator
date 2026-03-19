"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
export default function TrapezoidCalculator() {
  const [baseA, setBaseA] = useState("10");
  const [baseB, setBaseB] = useState("15");
  const [height, setHeight] = useState("8");

  // Optional side lengths for perimeter
  const [sideC, setSideC] = useState("");
  const [sideD, setSideD] = useState("");

  const [results, setResults] = useState<{
    area: number;
    median: number;
    perimeter: number | null;
  } | null>(null);

  const calculate = () => {
    const a = parseFloat(baseA);
    const b = parseFloat(baseB);
    const h = parseFloat(height);

    if (isNaN(a) || isNaN(b) || isNaN(h) || a <= 0 || b <= 0 || h <= 0) {
      setResults(null);
      return;
    }

    const area = ((a + b) / 2) * h;
    const median = (a + b) / 2;

    const c = parseFloat(sideC);
    const d = parseFloat(sideD);

    let perimeter = null;
    if (!isNaN(c) && !isNaN(d) && c > 0 && d > 0) {
      perimeter = a + b + c + d;
    }

    setResults({ area, median, perimeter });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-emerald-900 flex items-center justify-center font-serif">
          <span className="mr-3">📐</span> Trapezoid Calculator
        </h1>
        <p className="text-emerald-700 text-lg max-w-2xl mx-auto">
          Calculate the area, median, and perimeter of a trapezoid instantly.
        </p>
      </div>

      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-zinc-200 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">
              Base (a)
            </label>
            <input
              type="number"
              step="any"
              min="0"
              value={baseA}
              onChange={(e) => setBaseA(e.target.value)}
              className="w-full rounded-xl border-zinc-300 shadow-sm p-3 border focus:border-emerald-500 font-bold"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">
              Base (b)
            </label>
            <input
              type="number"
              step="any"
              min="0"
              value={baseB}
              onChange={(e) => setBaseB(e.target.value)}
              className="w-full rounded-xl border-zinc-300 shadow-sm p-3 border focus:border-emerald-500 font-bold"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">
              Height (h)
            </label>
            <input
              type="number"
              step="any"
              min="0"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full rounded-xl border-zinc-300 shadow-sm p-3 border focus:border-emerald-500 font-bold"
            />
          </div>
        </div>

        <div className="border-t border-zinc-100 pt-6 mt-2 mb-6">
          <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-4">
            Optional: Side Lengths (for Perimeter)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-zinc-400 mb-2 uppercase tracking-wide">
                Side (c)
              </label>
              <input
                type="number"
                step="any"
                min="0"
                value={sideC}
                onChange={(e) => setSideC(e.target.value)}
                className="w-full rounded-xl border-zinc-200 bg-zinc-50 shadow-sm p-3 border focus:border-emerald-500 font-bold text-zinc-500"
                placeholder="Optional"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-400 mb-2 uppercase tracking-wide">
                Side (d)
              </label>
              <input
                type="number"
                step="any"
                min="0"
                value={sideD}
                onChange={(e) => setSideD(e.target.value)}
                className="w-full rounded-xl border-zinc-200 bg-zinc-50 shadow-sm p-3 border focus:border-emerald-500 font-bold text-zinc-500"
                placeholder="Optional"
                onKeyDown={(e) => e.key === "Enter" && calculate()}
              />
            </div>
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={calculate}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-emerald-600/30 uppercase tracking-widest"
          >
            Calculate Trapezoid
          </button>
        </div>
      </div>

      {results && (
        <div className="bg-emerald-950 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

          <h2 className="text-emerald-400 font-bold uppercase tracking-widest text-xs mb-6 z-10">
            Calculated Results
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full z-10 max-w-xl">
            <div className="bg-emerald-900/60 p-4 rounded-xl border border-emerald-500/30 flex justify-between items-center shadow-inner md:col-span-2">
              <span className="text-emerald-400 text-lg font-bold uppercase tracking-wide">
                Area (A)
              </span>
              <span className="font-mono text-white font-bold text-4xl">
                {results.area.toFixed(4)}
              </span>
            </div>
            <div className="bg-black/30 p-4 rounded-xl border border-white/10 flex justify-between items-center">
              <span className="text-zinc-400 text-xs font-bold uppercase tracking-wide">
                Median (m)
              </span>
              <span className="font-mono text-emerald-100 font-bold text-xl">
                {results.median.toFixed(4)}
              </span>
            </div>

            {results.perimeter !== null ? (
              <div className="bg-black/30 p-4 rounded-xl border border-white/10 flex justify-between items-center">
                <span className="text-zinc-400 text-xs font-bold uppercase tracking-wide">
                  Perimeter (P)
                </span>
                <span className="font-mono text-emerald-100 font-bold text-xl">
                  {results.perimeter.toFixed(4)}
                </span>
              </div>
            ) : (
              <div className="bg-black/10 p-4 rounded-xl border border-white/5 flex justify-center items-center opacity-50">
                <span className="text-zinc-500 text-xs font-bold uppercase tracking-wide text-center">
                  Missing Side Lengths for Perimeter
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mt-8 bg-zinc-100 p-6 rounded-xl border border-zinc-200 text-sm text-zinc-600 max-w-2xl mx-auto space-y-2">
        <p className="font-bold text-zinc-800 uppercase tracking-widest mb-4">
          Formulas
        </p>
        <ul className="list-disc pl-5 space-y-1 font-mono">
          <li>Area = ½ × (a + b) × h</li>
          <li>Median = ½ × (a + b)</li>
          <li>Perimeter = a + b + c + d</li>
        </ul>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Trapezoid Calculator",
            operatingSystem: "All",
            applicationCategory: "EducationalApplication",
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title="Trapezoid Calculator"
          whatIsIt={
            <>
              <p>
                A <strong>Trapezoid Calculator</strong> is a specialized
                geometry tool that computes the surface area, the median length,
                and the total perimeter of a trapezoid (also known as a
                trapezium in the UK).
              </p>
              <p>
                A trapezoid is uniquely defined as a four-sided shape with
                exactly one pair of parallel sides (the bases). By inputting the
                lengths of these bases alongside the perpendicular height, the
                tool yields the total two-dimensional space the shape occupies.
              </p>
            </>
          }
          formula={
            <>
              <p>
                The mathematics behind a trapezoid relies on averaging the
                lengths of the two parallel bases.
              </p>
              <ul className="list-disc pl-6 space-y-4 mt-4 text-zinc-700">
                <li>
                  <strong>Area (A):</strong> Found by averaging the top and
                  bottom base, and multiplying by the vertical height. <br />{" "}
                  <code className="bg-zinc-100 p-1 px-2 rounded font-bold whitespace-nowrap">
                    A = ½ × (a + b) × h
                  </code>
                </li>
                <li>
                  <strong>Median (m):</strong> The line segment that connects
                  the midpoints of the non-parallel legs. <br />{" "}
                  <code className="bg-zinc-100 p-1 px-2 rounded font-bold whitespace-nowrap">
                    m = ½ × (a + b)
                  </code>
                </li>
                <li>
                  <strong>Perimeter (P):</strong> If the two non-parallel sides
                  (c and d) are known, you simply add all four borders together.{" "}
                  <br />{" "}
                  <code className="bg-zinc-100 p-1 px-2 rounded font-bold whitespace-nowrap">
                    P = a + b + c + d
                  </code>
                </li>
              </ul>
            </>
          }
          example={
            <>
              <p>
                Let's calculate the area of a raised trapezoidal garden bed that
                has a <strong>top base of 10 ft</strong>, a{" "}
                <strong>bottom base of 15 ft</strong>, and a total perpendicular{" "}
                <strong>height of 8 ft</strong>.
              </p>
              <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 my-4 font-mono text-sm max-w-sm mx-auto shadow-sm">
                <p>Area = 0.5 × (a + b) × h</p>
                <p>Area = 0.5 × (10 + 15) × 8</p>
                <p>Area = 0.5 × (25) × 8</p>
                <p>Area = 12.5 × 8</p>
                <p className="font-bold text-emerald-700 text-lg mt-2 border-t border-emerald-200 pt-2">
                  Area = 100 sq ft
                </p>
              </div>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4">
              <li>
                <strong>Roofing & Construction:</strong> Many roof facets,
                especially on hip roofs, are shaped as trapezoids. Calculating
                their area is strictly required to order the correct amount of
                shingles or metal panels.
              </li>
              <li>
                <strong>Civil Engineering:</strong> Using the{" "}
                <em>Trapezoidal Rule</em> to estimate the area under a curve or
                calculating the cross-sectional volume of water flowing through
                an angled trench.
              </li>
              <li>
                <strong>Interior Design:</strong> Ordering carpet or hardwood
                flooring for bay-window alcoves that feature angled side walls
                and parallel top/bottom walls.
              </li>
            </ul>
          }
          faqs={[
            {
              question:
                "What is the difference between an Isosceles and Right Trapezoid?",
              answer:
                "In an Isosceles Trapezoid, the two non-parallel sides (legs) are exactly the same length, making the shape perfectly symmetrical. In a Right Trapezoid, one of the non-parallel sides is completely vertical (forming two 90-degree right angles with the bases).",
            },
            {
              question:
                "Why do I need the perpendicular height, not the slant length?",
              answer:
                "The formula for area requires the straight vertical distance (height) between the two parallel bases. If you use the length of a slanted leg, your area calculation will be artificially inflated and totally incorrect. If you only have the slant, you must use the Pythagorean theorem first to find the true vertical height.",
            },
            {
              question: "How accurate is this calculator?",
              answer: "Our calculator uses industry-standard formulas to provide the most accurate results possible. However, it should be used for informational purposes only and not as a basis for formal calculations or legal advice.",
            }]}
          relatedCalculators={[
            {
              name: "Triangle Calculator",
              path: "/triangle-calculator/",
              desc: "Solve all geometric properties of a 3-sided shape.",
            },
            {
              name: "Parallelogram Calculator",
              path: "/parallelogram-calculator/",
              desc: "Calculate properties of shapes with two parallel pairs.",
            },
            {
              name: "Area Calculator",
              path: "/area-calculator/",
              desc: "Find the surface area of other common 2D shapes.",
            },
            {
              name: "Volume Calculator",
              path: "/volume-calculator/",
              desc: "Calculate the volume of standard 3D objects.",
            }]}
        />
      </div>
    </div>
  );
}
