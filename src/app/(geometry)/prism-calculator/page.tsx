"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
export default function PrismCalculator() {
  const [baseArea, setBaseArea] = useState("50");
  const [basePerimeter, setBasePerimeter] = useState("30");
  const [height, setHeight] = useState("10");

  const [result, setResult] = useState<{
    volume: number;
    lateralArea: number;
    surfaceArea: number;
  } | null>(null);

  const calculate = () => {
    const a = parseFloat(baseArea);
    const p = parseFloat(basePerimeter);
    const h = parseFloat(height);

    if (isNaN(a) || isNaN(p) || isNaN(h) || a <= 0 || p <= 0 || h <= 0) {
      setResult(null);
      return;
    }

    const volume = a * h;
    const lateralArea = p * h;
    const surfaceArea = 2 * a + lateralArea;

    setResult({
      volume,
      lateralArea,
      surfaceArea,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-cyan-900 flex items-center justify-center font-serif">
          <span className="mr-3">🧊</span> Prism Calculator
        </h1>
        <p className="text-cyan-700 text-lg max-w-2xl mx-auto">
          Calculate the total volume, lateral surface area, and total surface
          area of any right prism.
        </p>
      </div>

      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-zinc-200 mb-8 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div>
            <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">
              Base Area (B)
            </label>
            <input
              type="number"
              step="any"
              min="0"
              value={baseArea}
              onChange={(e) => setBaseArea(e.target.value)}
              className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-cyan-500 font-bold bg-zinc-50 text-xl"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">
              Base Perimeter (p)
            </label>
            <input
              type="number"
              step="any"
              min="0"
              value={basePerimeter}
              onChange={(e) => setBasePerimeter(e.target.value)}
              className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-cyan-500 font-bold bg-zinc-50 text-xl"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">
              Prism Height (h)
            </label>
            <input
              type="number"
              step="any"
              min="0"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-cyan-500 font-bold bg-zinc-50 text-xl"
              onKeyDown={(e) => e.key === "Enter" && calculate()}
            />
          </div>
        </div>

        <div>
          <button
            onClick={calculate}
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-cyan-600/30 uppercase tracking-widest text-lg"
          >
            Calculate Prism
          </button>
          <p className="text-xs text-center text-zinc-400 font-bold mt-4 uppercase tracking-widest">
            Applicable to right triangular, rectangular, pentagonal prisms, etc.
          </p>
        </div>
      </div>

      {result !== null && (
        <div className="bg-cyan-950 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

          <h2 className="text-cyan-400 font-bold uppercase tracking-widest text-xs mb-6 z-10 text-center">
            Computed Measurements
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 z-10 relative">
            <div className="bg-black/30 p-6 rounded-xl border border-cyan-500/30 shadow-inner flex flex-col items-center text-center">
              <span className="text-cyan-400 text-xs font-bold uppercase tracking-wide mb-2">
                Volume (V = B·h)
              </span>
              <div className="font-mono text-white tracking-tight font-bold text-3xl mt-2 truncate w-full">
                {result.volume.toLocaleString("en-US", {
                  maximumFractionDigits: 5,
                })}
              </div>
            </div>

            <div className="bg-black/30 p-6 rounded-xl border border-cyan-500/30 shadow-inner flex flex-col items-center text-center">
              <span className="text-cyan-400 text-[11px] font-bold uppercase tracking-wide mb-2">
                Lateral Area (L = p·h)
              </span>
              <div className="font-mono text-white tracking-tight font-bold text-3xl mt-2 truncate w-full">
                {result.lateralArea.toLocaleString("en-US", {
                  maximumFractionDigits: 5,
                })}
              </div>
            </div>

            <div className="bg-black/30 p-6 rounded-xl border border-cyan-500/30 shadow-inner flex flex-col items-center text-center">
              <span className="text-cyan-400 text-[11px] font-bold uppercase tracking-wide mb-2">
                Total Surface Area (2B+L)
              </span>
              <div className="font-mono text-white tracking-tight font-bold text-3xl mt-2 truncate w-full">
                {result.surfaceArea.toLocaleString("en-US", {
                  maximumFractionDigits: 5,
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
            name: "Prism Calculator",
            operatingSystem: "All",
            applicationCategory: "EducationalApplication",
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title="Right Prism Calculator"
          whatIsIt={
            <>
              <p>
                A <strong>Right Prism Calculator</strong> is a simplified 3D
                geometric tool specialized in determining the Volume and Surface
                Area of any prismatic object. Because the calculation uses
                baseline inputs instead of single edge lengths, it is completely
                shape-agnostic.
              </p>
              <p>
                In geometry, a "right prism" is essentially a 3D extrusion of a
                flat 2D shape. If you take a triangle, a pentagon, or a star,
                and push it perfectly straight upward to give it depth, you have
                created a prism. Examples include shipping boxes (rectangular
                prisms), Toblerone chocolate boxes (triangular prisms), and
                standard unsharpened pencils (hexagonal prisms).
              </p>
            </>
          }
          formula={
            <>
              <p>
                To accurately calculate the properties of ANY prism, regardless
                of what the front/back shape looks like, you only need three
                core variables: <strong>Base Area (\(B\))</strong>,{" "}
                <strong>Base Perimeter (\(p\))</strong>, and the{" "}
                <strong>Prism Height (\(h\))</strong> (its 3D depth).
              </p>
              <ul className="list-disc pl-6 space-y-3 mt-4 text-zinc-700">
                <li>
                  <strong>Volume (\(V\)):</strong>{" "}
                  <code>Base Area × Height</code>. (The 2D floor area extruded
                  upwards into the 3rd dimension).
                </li>
                <li>
                  <strong>Lateral Surface Area (\(L\)):</strong>{" "}
                  <code>Base Perimeter × Height</code>. (This calculates the
                  total surface area of all the walls, ignoring the top lid and
                  bottom floor).
                </li>
                <li>
                  <strong>Total Surface Area (\(S\)):</strong>{" "}
                  <code>(2 × Base Area) + Lateral Area</code>. (Adding the two
                  base caps back onto the lateral walls).
                </li>
              </ul>
            </>
          }
          example={
            <>
              <p>
                Let's calculate the logistics of a strangely shaped{" "}
                <strong>Hexagonal Shipping Box</strong>. We know the box is{" "}
                <strong>10 inches deep</strong> (Height=10), the perimeter of
                the front opening is <strong>30 inches</strong> (Perimeter=30),
                and the area of that front opening is{" "}
                <strong>50 square inches</strong> (Area=50).
              </p>
              <ul className="list-none space-y-2 mt-4 font-mono text-sm bg-cyan-50 p-4 rounded-xl border border-cyan-200">
                <li>
                  <strong>Step 1 (Volume):</strong> Area × Height = 50 × 10 ={" "}
                  <strong>500 cubic inches</strong> (How much packing peanuts it
                  holds).
                </li>
                <li>
                  <strong>Step 2 (Lateral Area):</strong> Perimeter × Height =
                  30 × 10 = <strong>300 sq inches</strong> (How much cardboard
                  builds the outer walls).
                </li>
                <li>
                  <strong>Step 3 (Total Surface Area):</strong> 2(50) + 300 =
                  100 + 300 = <strong>400 sq inches</strong> (The total
                  cardboard required to build the box inclusive of the 2
                  end-caps).
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-zinc-700">
              <li>
                <strong>HVAC Ducting & Plumbing:</strong> Calculating the
                internal air volume carrying capacity of specialized industrial
                ductwork runs or irregular liquid fluid pipes.
              </li>
              <li>
                <strong>Manufacturing & Fabrication:</strong> Determining how
                much raw sheet metal, wood, or acrylic is required to fabricate
                the outer walls (lateral area) of custom rectangular or
                triangular kiosks.
              </li>
              <li>
                <strong>Swimming Pools & Construction:</strong> Calculating how
                many gallons of water fill an irregularly shaped swimming pool
                (a prism), since Volume = Floor Area × Depth.
              </li>
            </ul>
          }
          faqs={[
            {
              question: "Does this work for irregular shapes?",
              answer:
                "Yes, absolutely! The power of this mathematical formula is that it doesn't care if your base shape is a perfect square or a bizarre asymmetrical jagged lightning bolt. As long as you know the Area and the Perimeter of the 2D footprint, multiplying them by the depth yields mathematically flawless right prism results.",
            },
            {
              question: "Is a cylinder technically a Right Prism?",
              answer:
                "Yes, the exact same mathematical properties govern both. The volume of a cylinder is πr² (the Area of the base) multiplied by height. It is functionally a circular right prism.",
            },
            {
              question: "What is an oblique prism?",
              answer:
                "An oblique prism is one where the extrusion height is slanted sideways (like the Leaning Tower of Pisa) instead of perfectly straight up at a 90-degree angle. This calculator is strictly for Right Prisms (perfectly straight 90-degree extrusions).",
            },
          ]}
          relatedCalculators={[
            {
              name: "Cylinder Calculator",
              path: "/cylinder-calculator/",
              desc: "Solve properties specifically formulated for completely circular prisms.",
            },
            {
              name: "Pyramid Calculator",
              path: "/pyramid-calculator/",
              desc: "Compute internal volumes where the walls compress to a point rather than extending straight.",
            },
            {
              name: "Area Calculator",
              path: "/area-calculator/",
              desc: "Calculate the Base Area (\(B\)) of your 2D footprint before plugging it into this prism tool.",
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
