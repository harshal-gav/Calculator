"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
export default function ParallelogramCalculator() {
  const [base, setBase] = useState("10");
  const [height, setHeight] = useState("5");
  const [side, setSide] = useState("6");

  const [result, setResult] = useState<{
    area: number;
    perimeter: number;
  } | null>(null);

  const calculate = () => {
    const b = parseFloat(base);
    const h = parseFloat(height);
    const s = parseFloat(side);

    let area = 0;
    let perimeter = 0;

    if (!isNaN(b) && !isNaN(h) && b > 0 && h > 0) {
      area = b * h;
    }

    if (!isNaN(b) && !isNaN(s) && b > 0 && s > 0) {
      perimeter = 2 * (b + s);
    }

    if (area > 0 || perimeter > 0) {
      setResult({ area, perimeter });
    } else {
      setResult(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-emerald-900 flex items-center justify-center font-serif">
          <span className="mr-3">▱</span> Parallelogram Calculator
        </h1>
        <p className="text-emerald-700 text-lg max-w-2xl mx-auto">
          Calculate the exact area and perimeter of any parallelogram.
        </p>
      </div>

      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-zinc-200 mb-8 max-w-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div>
            <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">
              Base (b)
            </label>
            <input
              type="number"
              step="any"
              min="0"
              value={base}
              onChange={(e) => setBase(e.target.value)}
              className="w-full rounded-xl border-zinc-300 shadow-sm p-3 border focus:border-emerald-500 font-bold bg-zinc-50 text-xl"
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
              className="w-full rounded-xl border-zinc-300 shadow-sm p-3 border focus:border-emerald-500 font-bold bg-zinc-50 text-xl"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">
              Slant Side
            </label>
            <input
              type="number"
              step="any"
              min="0"
              value={side}
              onChange={(e) => setSide(e.target.value)}
              className="w-full rounded-xl border-zinc-300 shadow-sm p-3 border focus:border-emerald-500 font-bold bg-zinc-50 text-xl"
              onKeyDown={(e) => e.key === "Enter" && calculate()}
            />
          </div>
        </div>

        <div>
          <button
            onClick={calculate}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-emerald-600/30 uppercase tracking-widest text-lg"
          >
            Calculate Parallelogram
          </button>
          <p className="text-xs text-center text-zinc-400 font-bold mt-4 uppercase tracking-widest">
            Base + Height for Area. Base + Slant Side for Perimeter.
          </p>
        </div>
      </div>

      {result !== null && (
        <div className="bg-emerald-950 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 z-10 relative">
            <div className="bg-black/30 p-6 rounded-xl border border-emerald-500/30 shadow-inner flex flex-col items-center text-center">
              <span className="text-emerald-400 text-xs font-bold uppercase tracking-wide mb-2">
                Area (A) = b × h
              </span>
              <div className="font-mono text-white tracking-tight font-bold text-4xl mt-2 truncate w-full">
                {result.area > 0
                  ? result.area.toLocaleString("en-US", {
                      maximumFractionDigits: 5,
                    })
                  : "-"}
              </div>
            </div>

            <div className="bg-black/30 p-6 rounded-xl border border-emerald-500/30 shadow-inner flex flex-col items-center text-center">
              <span className="text-emerald-400 text-xs font-bold uppercase tracking-wide mb-2">
                Perimeter (P) = 2(b + a)
              </span>
              <div className="font-mono text-white tracking-tight font-bold text-4xl mt-2 truncate w-full">
                {result.perimeter > 0
                  ? result.perimeter.toLocaleString("en-US", {
                      maximumFractionDigits: 5,
                    })
                  : "-"}
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
            name: "Parallelogram Calculator",
            operatingSystem: "All",
            applicationCategory: "EducationalApplication",
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title="Parallelogram Calculator"
          whatIsIt={
            <>
              <p>
                A <strong>Parallelogram Calculator</strong> is a quick
                mathematical toolkit used to find the internal area and the
                outer perimeter of any standard parallelogram.
              </p>
              <p>
                A parallelogram is a flat, 2D quadrilateral shape featuring two
                pairs of parallel opposite sides. This classification actually
                includes universally familiar shapes like squares, rectangles,
                and rhombuses, meaning this calculator will technically evaluate
                area for those shapes perfectly as well.
              </p>
            </>
          }
          formula={
            <>
              <p>
                To accurately assess a parallelogram, you need entirely distinct
                measurements for the Area versus the Perimeter:
              </p>
              <ul className="list-disc pl-6 space-y-4 mt-4 text-zinc-700">
                <li>
                  <strong>Area (\(A\)):</strong>{" "}
                  <code>Base (b) × Height (h)</code>. Note that the 'Height'
                  must be the strict perpendicular vertical distance between the
                  bases, not the slanted side length.
                </li>
                <li>
                  <strong>Perimeter (\(P\)):</strong>{" "}
                  <code>2 × (Base + Slanted Side)</code>. You completely ignore
                  the perpendicular height when calculating outer perimeter
                  boundaries.
                </li>
              </ul>
            </>
          }
          example={
            <>
              <p>
                Let's find the measurements of a slanted roof section acting as
                a parallelogram. It has a <strong>Base of 10 feet</strong>, a{" "}
                <strong>Perpendicular Height of 5 feet</strong>, and the{" "}
                <strong>Slanted Side edge is 6 feet</strong>.
              </p>
              <ul className="list-none space-y-2 mt-4 font-mono text-sm bg-emerald-50 p-4 rounded-xl border border-emerald-200">
                <li>
                  <strong>Step 1 (Identify Variables):</strong> Base (b) = 10,
                  Height (h) = 5, Side (s) = 6
                </li>
                <li>
                  <strong>Step 2 (Calculate Area):</strong> b × h → 10 × 5 ={" "}
                  <strong>50 square feet</strong>.
                </li>
                <li>
                  <strong>Step 3 (Calculate Perimeter):</strong> 2(b + s) → 2(10
                  + 6) → 2(16) = <strong>32 linear feet</strong>.
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-zinc-700">
              <li>
                <strong>Roofing & Architecture:</strong> Accurately calculating
                how many square meters of roofing tiles or shingles are required
                to cover a slanted parallelogram roof phase.
              </li>
              <li>
                <strong>Land Surveying:</strong> Evaluating the total acreage
                (area) and fencing requirements (perimeter) for angled property
                lots and agricultural plots of land.
              </li>
              <li>
                <strong>Graphic Design & CAD:</strong> Determining vector box
                sizing parameters when designing slanted, italicized background
                elements for UI/UX or modern print design.
              </li>
            </ul>
          }
          faqs={[
            {
              question:
                "What is the difference between 'Height' and 'Slanted Side'?",
              answer:
                "The 'Height' is a straight line dropped strictly at a 90-degree angle from the top base to the bottom base. The 'Slanted Side' is the actual physical edge connecting them. Because it's slanted, the side length is almost always a larger number than the strict perpendicular height.",
            },
            {
              question: "Is a rectangle a parallelogram?",
              answer:
                "Yes, absolutely! A rectangle is just a special type of parallelogram where the 'slanted sides' happen to stand straight up at perfect 90-degree right angles. Consequently, in a rectangle, the 'height' and the 'slanted side' are exactly the same number.",
            },
            {
              question: "Does this calculator work for Rhombuses?",
              answer:
                "It does. For a rhombus, the base and the slanted side are identically equal. The area is still Base × Height, and the perimeter simplifies to 4 × Base.",
            },
          ]}
          relatedCalculators={[
            {
              name: "Rhombus Calculator",
              path: "/rhombus-calculator",
              desc: "Calculate diagonals, perimeter and area specifically for rhombus shapes.",
            },
            {
              name: "Trapezoid Calculator",
              path: "/trapezoid-calculator",
              desc: "Calculate the area of a quadrilateral with only one set of parallel sides.",
            },
            {
              name: "Triangle Calculator",
              path: "/triangle-calculator",
              desc: "Calculate missing angles and sides of any triangular polygon.",
            },
            {
              name: "Area Calculator",
              path: "/area-calculator",
              desc: "Calculate the area of various 2D shapes.",
            }]}
        />
      </div>
    </div>
  );
}
