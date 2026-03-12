"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function VectorAdditionCalculator() {
  const [v1Mag, setV1Mag] = useState("10");
  const [v1Dir, setV1Dir] = useState("45"); // Degrees
  const [v2Mag, setV2Mag] = useState("15");
  const [v2Dir, setV2Dir] = useState("120"); // Degrees

  const [result, setResult] = useState<{
    mag: number;
    dir: number;
    rx: number;
    ry: number;
  } | null>(null);

  const calculate = () => {
    const m1 = parseFloat(v1Mag);
    const d1 = parseFloat(v1Dir);
    const m2 = parseFloat(v2Mag);
    const d2 = parseFloat(v2Dir);

    if (isNaN(m1) || isNaN(d1) || isNaN(m2) || isNaN(d2)) {
      setResult(null);
      return;
    }

    // Convert to radians
    const r1 = d1 * (Math.PI / 180);
    const r2 = d2 * (Math.PI / 180);

    // Components
    const v1x = m1 * Math.cos(r1);
    const v1y = m1 * Math.sin(r1);

    const v2x = m2 * Math.cos(r2);
    const v2y = m2 * Math.sin(r2);

    // Resultant components
    const rx = v1x + v2x;
    const ry = v1y + v2y;

    // Resultant magnitude and direction
    const mag = Math.sqrt(rx * rx + ry * ry);
    let dir = Math.atan2(ry, rx) * (180 / Math.PI);
    if (dir < 0) dir += 360; // Normalize 0-360

    setResult({ mag, dir, rx, ry });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-indigo-900 flex items-center justify-center font-serif">
          <span className="mr-3">↗️</span> Vector Addition
        </h1>
        <p className="text-indigo-700 text-lg max-w-2xl mx-auto">
          Calculate the resultant magnitude and direction of two vectors added
          together.
        </p>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-zinc-200 mb-8 max-w-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Vector 1 */}
          <div className="space-y-4 p-5 rounded-xl border border-indigo-100 bg-indigo-50/30">
            <h3 className="font-bold text-indigo-900 border-b border-indigo-200 pb-2">
              Vector 1 (u)
            </h3>
            <div>
              <label className="block text-xs font-bold text-zinc-500 mb-1 uppercase tracking-widest">
                Magnitude
              </label>
              <input
                type="number"
                step="any"
                min="0"
                value={v1Mag}
                onChange={(e) => setV1Mag(e.target.value)}
                className="w-full rounded-xl border-zinc-300 shadow-sm p-3 border focus:border-indigo-500 font-bold bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-500 mb-1 uppercase tracking-widest">
                Direction (Degrees)
              </label>
              <input
                type="number"
                step="any"
                value={v1Dir}
                onChange={(e) => setV1Dir(e.target.value)}
                className="w-full rounded-xl border-zinc-300 shadow-sm p-3 border focus:border-indigo-500 font-bold bg-white"
              />
            </div>
          </div>

          {/* Vector 2 */}
          <div className="space-y-4 p-5 rounded-xl border border-violet-100 bg-violet-50/30">
            <h3 className="font-bold text-violet-900 border-b border-violet-200 pb-2">
              Vector 2 (v)
            </h3>
            <div>
              <label className="block text-xs font-bold text-zinc-500 mb-1 uppercase tracking-widest">
                Magnitude
              </label>
              <input
                type="number"
                step="any"
                min="0"
                value={v2Mag}
                onChange={(e) => setV2Mag(e.target.value)}
                className="w-full rounded-xl border-zinc-300 shadow-sm p-3 border focus:border-violet-500 font-bold bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-500 mb-1 uppercase tracking-widest">
                Direction (Degrees)
              </label>
              <input
                type="number"
                step="any"
                value={v2Dir}
                onChange={(e) => setV2Dir(e.target.value)}
                className="w-full rounded-xl border-zinc-300 shadow-sm p-3 border focus:border-violet-500 font-bold bg-white"
                onKeyDown={(e) => e.key === "Enter" && calculate()}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={calculate}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-indigo-600/30 uppercase tracking-widest text-lg"
          >
            Calculate Resultant Vector (u + v)
          </button>
        </div>
      </div>

      {result !== null && (
        <div className="bg-indigo-950 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

          <h2 className="text-indigo-400 font-bold uppercase tracking-widest text-xs mb-6 z-10 text-center">
            Resultant Vector (R)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl z-10 relative items-center mb-6">
            <div className="bg-black/40 p-6 rounded-2xl border border-indigo-500/30 flex flex-col items-center justify-center text-center shadow-inner h-full">
              <span className="text-indigo-300 text-[10px] font-bold uppercase tracking-widest mb-3">
                Magnitude (|R|)
              </span>
              <div className="font-mono text-white tracking-tight font-black text-4xl break-all">
                {result.mag.toLocaleString("en-US", {
                  maximumFractionDigits: 4,
                })}
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-800 to-violet-900 p-6 rounded-2xl border border-indigo-400/30 flex flex-col items-center justify-center text-center shadow-xl h-full transform md:scale-105">
              <span className="text-indigo-200 text-[10px] font-bold uppercase tracking-widest mb-3">
                Direction (θ)
              </span>
              <div className="font-mono text-white tracking-tight font-black text-5xl break-all">
                {result.dir.toLocaleString("en-US", {
                  maximumFractionDigits: 2,
                })}
                °
              </div>
            </div>
          </div>

          <div className="z-10 bg-indigo-900/40 p-5 rounded-xl border border-indigo-500/20 w-full max-w-2xl">
            <span className="text-indigo-300 text-[10px] font-bold uppercase tracking-widest mb-2 block text-center">
              Cartesian Components
            </span>
            <div className="flex justify-center gap-10 font-mono text-indigo-100">
              <div>
                <span className="text-indigo-400">Rx:</span>{" "},
                {result.rx.toFixed(4)}
              </div>
              <div>
                <span className="text-indigo-400">Ry:</span>{" "},
                {result.ry.toFixed(4)}
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
            name: "Vector Addition Calculator",
            operatingSystem: "All",
            applicationCategory: "EducationalApplication",
          }),
        }}
      />

      <CalculatorSEO
        title="Vector Addition Calculator"
        whatIsIt={
          <p>
            The <strong>Vector Addition Calculator</strong> computes the
            resultant vector (magnitude and direction) produced when two
            separate vectors are added together. It automatically calculates the
            Cartesian components (X and Y coordinates) using trigonometric
            functions before determining the final result.
          </p>
        }
        formula={
          <>
            <p>
              Adding vectors requires breaking them down into their horizontal
              (X) and vertical (Y) Cartesian components using sine and cosine:
            </p>
            <div className="bg-white p-4 rounded-lg font-mono text-[14px] shadow-sm my-4 border border-zinc-200">
              <strong>Rx</strong>: V1 × cos(θ1) + V2 × cos(θ2)
              <br />
              <strong>Ry</strong>: V1 × sin(θ1) + V2 × sin(θ2)
              <br />
              <strong>Resultant Magnitude (|R|)</strong> = √(Rx² + Ry²)
              <br />
              <strong>Resultant Direction (θ)</strong> = arctan(Ry / Rx)
            </div>
          </>
        }
        example={
          <>
            <p>
              Consider Vector 1 (Magnitude: 10, Angle: 45°) and Vector 2
              (Magnitude: 15, Angle: 120°):
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Rx = 10×cos(45) + 15×cos(120) = -0.4289</li>
              <li>Ry = 10×sin(45) + 15×sin(120) = 20.0614</li>
              <li>
                Resultant Magnitude: √((-0.4289)² + (20.0614)²) ={" "}
                <strong>20.0660</strong>
              </li>
              <li>
                Resultant Direction: arctan(20.0614 / -0.4289) ={" "}
                <strong>91.22°</strong>
              </li>
            </ul>
          </>
        }
        useCases={
          <ul className="list-disc pl-6 space-y-4">
            <li>
              <strong>Physics Applications:</strong> Calculating net force when
              multiple different forces are acting on a single object at
              different angles.
            </li>
            <li>
              <strong>Aviation & Navigation:</strong> Determining true flight
              path and ground speed by adding the aircraft's physical heading
              vector to the wind's velocity vector.
            </li>
            <li>
              <strong>Engineering & Architecture:</strong> Analyzing structural
              load distributions to ensure buildings can handle combined
              diagonal stresses without failing.
            </li>
          </ul>
        }
        faqs={[
          {
            question: "Why can't I just add the two magnitudes together?",
            answer:
              "Because vectors have both magnitude (size) AND direction. If you walk 10 miles North and then 5 miles South, you haven't traveled 15 miles away from your starting point; you're only 5 miles away because the directions partially cancelled each other out.",
          },
          {
            question: "Does this calculator use degrees or radians?",
            answer:
              "All inputs and outputs for direction (θ) on this specific calculator are formatted in standard Degrees (0° to 360°).",
          },
            {
              question: "How accurate is this calculator?",
              answer: "Our calculator uses industry-standard formulas to provide the most accurate results possible. However, it should be used for informational purposes only and not as a basis for formal calculations or legal advice.",
            }]}
        relatedCalculators={[
          {
            name: "Dot Product Calculator",
            path: "/dot-product-calculator",
            desc: "Calculate the scalar dot product of two vectors.",
          },
          {
            name: "Cross Product Calculator",
            path: "/cross-product-calculator",
            desc: "Determine the 3D cross product vector.",
          },
          {
            name: "Projectile Motion",
            path: "/projectile-motion-calculator",
            desc: "Calculate full kinematic trajectories of launched objects.",
          },
            {
              name: "Percentage Calculator",
              path: "/percentage-calculator",
              desc: "Easily calculate percentages, increases, and decreases.",
            }]}
      />
    </div>
  );
}
