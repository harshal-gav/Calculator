"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
export default function PyramidCalculator() {
  const [baseLength, setBaseLength] = useState("10");
  const [baseWidth, setBaseWidth] = useState("10");
  const [height, setHeight] = useState("15");

  const [result, setResult] = useState<{
    volume: number;
    baseArea: number;
    slantHeightL: number;
    slantHeightW: number;
    surfaceArea: number;
  } | null>(null);

  const calculate = () => {
    const l = parseFloat(baseLength);
    const w = parseFloat(baseWidth);
    const h = parseFloat(height);

    if (isNaN(l) || isNaN(w) || isNaN(h) || l <= 0 || w <= 0 || h <= 0) {
      setResult(null);
      return;
    }

    const baseArea = l * w;
    const volume = (l * w * h) / 3;

    // Slant heights for rectangular pyramid
    const slantHeightL = Math.sqrt(Math.pow(h, 2) + Math.pow(w / 2, 2));
    const slantHeightW = Math.sqrt(Math.pow(h, 2) + Math.pow(l / 2, 2));

    const lateralArea = l * slantHeightL + w * slantHeightW;
    const surfaceArea = baseArea + lateralArea;

    setResult({
      volume,
      baseArea,
      slantHeightL,
      slantHeightW,
      surfaceArea,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-amber-900 flex items-center justify-center font-serif">
          <span className="mr-3">🔺</span> Pyramid Calculator
        </h1>
        <p className="text-amber-700 text-lg max-w-2xl mx-auto">
          Calculate the volume, surface area, and slant heights of any right
          rectangular pyramid.
        </p>
      </div>

      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-zinc-200 mb-8 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div>
            <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">
              Base Length (l)
            </label>
            <input
              type="number"
              step="any"
              min="0"
              value={baseLength}
              onChange={(e) => setBaseLength(e.target.value)}
              className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-amber-500 font-bold bg-zinc-50 text-xl"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">
              Base Width (w)
            </label>
            <input
              type="number"
              step="any"
              min="0"
              value={baseWidth}
              onChange={(e) => setBaseWidth(e.target.value)}
              className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-amber-500 font-bold bg-zinc-50 text-xl"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">
              Pyramid Height (h)
            </label>
            <input
              type="number"
              step="any"
              min="0"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-amber-500 font-bold bg-zinc-50 text-xl"
              onKeyDown={(e) => e.key === "Enter" && calculate()}
            />
          </div>
        </div>

        <div>
          <button
            onClick={calculate}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-amber-600/30 uppercase tracking-widest text-lg"
          >
            Calculate Pyramid
          </button>
          <p className="text-xs text-center text-zinc-400 font-bold mt-4 uppercase tracking-widest">
            For square pyramids, just make Base Length equal to Base Width
          </p>
        </div>
      </div>

      {result !== null && (
        <div className="bg-amber-950 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

          <h2 className="text-amber-400 font-bold uppercase tracking-widest text-xs mb-6 z-10 text-center">
            Results
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 z-10 relative">
            <div className="bg-black/30 p-6 rounded-xl border border-amber-500/30 shadow-inner flex flex-col items-center">
              <span className="text-amber-400 text-xs font-bold uppercase tracking-wide mb-2">
                Volume (V)
              </span>
              <div className="font-mono text-white tracking-tight font-bold text-3xl mt-2 truncate w-full text-center">
                {result.volume.toLocaleString("en-US", {
                  maximumFractionDigits: 4,
                })}
              </div>
            </div>

            <div className="bg-black/30 p-6 rounded-xl border border-amber-500/30 shadow-inner flex flex-col items-center">
              <span className="text-amber-400 text-xs font-bold uppercase tracking-wide mb-2">
                Total Surface Area
              </span>
              <div className="font-mono text-white tracking-tight font-bold text-3xl mt-2 truncate w-full text-center">
                {result.surfaceArea.toLocaleString("en-US", {
                  maximumFractionDigits: 4,
                })}
              </div>
            </div>

            <div className="bg-black/30 p-6 rounded-xl border border-amber-500/30 shadow-inner flex flex-col items-center lg:col-span-1 md:col-span-2">
              <span className="text-amber-400 text-xs font-bold uppercase tracking-wide mb-2">
                Base Area
              </span>
              <div className="font-mono text-white tracking-tight font-bold text-3xl mt-2 truncate w-full text-center">
                {result.baseArea.toLocaleString("en-US", {
                  maximumFractionDigits: 4,
                })}
              </div>
            </div>

            <div className="bg-black/30 p-6 rounded-xl border border-amber-500/30 shadow-inner flex flex-col items-center md:col-span-1">
              <span className="text-amber-400 text-[10px] md:text-xs font-bold uppercase tracking-wide mb-2">
                Slant Height (Length Side)
              </span>
              <div className="font-mono text-white tracking-tight font-bold text-2xl mt-2 truncate w-full text-center">
                {result.slantHeightL.toLocaleString("en-US", {
                  maximumFractionDigits: 4,
                })}
              </div>
            </div>

            <div className="bg-black/30 p-6 rounded-xl border border-amber-500/30 shadow-inner flex flex-col items-center md:col-span-1 lg:col-span-2">
              <span className="text-amber-400 text-[10px] md:text-xs font-bold uppercase tracking-wide mb-2">
                Slant Height (Width Side)
              </span>
              <div className="font-mono text-white tracking-tight font-bold text-2xl mt-2 truncate w-full text-center">
                {result.slantHeightW.toLocaleString("en-US", {
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
            name: "Pyramid Calculator",
            operatingSystem: "All",
            applicationCategory: "EducationalApplication",
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title="Pyramid Calculator"
          whatIsIt={
            <>
              <p>
                A <strong>Pyramid Calculator</strong> is a 3D geometric tool
                designed to compute the volume, surface area, and complex
                interior slant heights of any right rectangular or square
                pyramid.
              </p>
              <p>
                A right rectangular pyramid features a flat rectangle base
                (Length and Width) with four triangular sidewalls that converge
                upward to a single central singularity point called the apex.
                This is the exact geometric shape utilized to build the
                classical Great Pyramids of Giza.
              </p>
            </>
          }
          formula={
            <>
              <p>
                Deriving the volume is simple enough, but assessing surface area
                requires utilizing the Pythagorean Theorem to find the exact
                heights of the slanted, angled triangular walls. Assuming Length
                (\(l\)), Width (\(w\)), and Height (\(h\)):
              </p>
              <ul className="list-disc pl-6 space-y-3 mt-4 text-zinc-700">
                <li>
                  <strong>Volume (\(V\)):</strong> <code>(l × w × h) / 3</code>.
                  It is exactly one-third the volume of a cubic prism of the
                  same dimensions.
                </li>
                <li>
                  <strong>Slant Height (Length Side, \(s_l\)):</strong>{" "}
                  <code>√(h² + (w/2)²)</code>
                </li>
                <li>
                  <strong>Slant Height (Width Side, \(s_w\)):</strong>{" "}
                  <code>√(h² + (l/2)²)</code>
                </li>
                <li>
                  <strong>Total Surface Area:</strong>{" "}
                  <code>(l × w) + (l × s_l) + (w × s_w)</code>
                </li>
              </ul>
            </>
          }
          example={
            <>
              <p>
                Let's find the measurements for a custom decorative stone
                pyramid that has a <strong>Base of 10x10 inches</strong> (making
                it a square pyramid), and a total central{" "}
                <strong>vertical height of 15 inches</strong>.
              </p>
              <ul className="list-none space-y-2 mt-4 font-mono text-sm bg-amber-50 p-4 rounded-xl border border-amber-200">
                <li>
                  <strong>Step 1 (Volume):</strong> Base Area (10×10) = 100.
                  Volume = (100 × 15) / 3 = 1,500 / 3 ={" "}
                  <strong>500 cubic inches</strong>
                </li>
                <li>
                  <strong>Step 2 (Slant Height):</strong> Because length and
                  width are equal (10), there is only one slant height. √(15² +
                  5²) = √(225 + 25) = √250 ≈ <strong>15.8114 inches</strong>
                </li>
                <li>
                  <strong>Step 3 (Lateral Sidewall Area):</strong> 4 identical
                  walls. Total Lateral Area = 2 × 10 × 15.8114 ={" "}
                  <strong>316.228 sq inches.</strong>
                </li>
                <li>
                  <strong>Step 4 (Total Surface Area):</strong> Base (100) +
                  Lateral (316.228) = <strong>416.228 sq inches</strong>
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-zinc-700">
              <li>
                <strong>Roof construction:</strong> Contractors framing standard
                "hip roofs" or installing dormers use these exact mathematical
                formulas to understand how much surface area of shingles and
                plywood to purchase.
              </li>
              <li>
                <strong>Packaging & Logistics:</strong> Industrial designers
                creating triangular-packaging geometries (like specialized tea
                bags or luxury perfume bottles) to maximize internal fluid
                volume while minimizing cardboard surface area costs.
              </li>
              <li>
                <strong>Tents & Architecture:</strong> Calculating the canvas
                yardage required to manufacture large pyramid-shaped camping
                tents or outdoor event pavilions based on the required peak
                headroom height.
              </li>
            </ul>
          }
          faqs={[
            {
              question: "How do I calculate a Square Pyramid?",
              answer:
                "A square pyramid is merely a rectangular pyramid where the 'Length' and the 'Width' are identical numbers. To run the calculation, just enter the same exact number into both the Length and Width inputs.",
            },
            {
              question: "Why is the Volume divided by 3?",
              answer:
                "It is a fundamental principle of 3D geometry established by ancient mathematicians. If you have a rectangular box (a prism) and a pyramid with the exact same base and height, the pyramid will ALWAYS hold exactly 33.333% (one third) of the water or sand the box holds.",
            },
            {
              question:
                "What is the difference between Height and Slant Height?",
              answer:
                "The standard 'Height' is entirely internal—it is an invisible plumb line dropped straight down from the very tip (apex) to the dead center of the floor base. The 'Slant Height' is the measurable physical length running down the outside face of the angled triangle walls. The Slant Height is always longer.",
            },
          ]}
          relatedCalculators={[
            {
              name: "Prism Calculator",
              path: "/prism-calculator",
              desc: "Calculate internal volume properties for long geometric prisms.",
            },
            {
              name: "Cone Calculator",
              path: "/cone-calculator",
              desc: "Evaluate a shape similar to a pyramid, but with an entirely circular flat base.",
            },
            {
              name: "Rectangle Calculator",
              path: "/rectangle-calculator",
              desc: "Easily evaluate the flat base of your structural pyramid.",
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
