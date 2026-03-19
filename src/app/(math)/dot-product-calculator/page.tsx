"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function DotProductCalculator() {
  const [dim, setDim] = useState("3"); // 2 or 3 dimensions

  // Vector u
  const [u1, setU1] = useState("2");
  const [u2, setU2] = useState("-5");
  const [u3, setU3] = useState("4");

  // Vector v
  const [v1, setV1] = useState("3");
  const [v2, setV2] = useState("1");
  const [v3, setV3] = useState("-2");

  const [result, setResult] = useState<{
    dotProduct: number;
    magU: number;
    magV: number;
    angleDeg: number;
    angleRad: number;
    ortho: boolean;
  } | null>(null);

  const calculate = () => {
    const d = parseInt(dim);

    const nU1 = parseFloat(u1) || 0;
    const nU2 = parseFloat(u2) || 0;
    const nU3 = d === 3 ? parseFloat(u3) || 0 : 0;

    const nV1 = parseFloat(v1) || 0;
    const nV2 = parseFloat(v2) || 0;
    const nV3 = d === 3 ? parseFloat(v3) || 0 : 0;

    // Dot Product = u1*v1 + u2*v2 + u3*v3
    const dot = nU1 * nV1 + nU2 * nV2 + nU3 * nV3;

    // Magnitudes
    const mU = Math.sqrt(nU1 * nU1 + nU2 * nU2 + nU3 * nU3);
    const mV = Math.sqrt(nV1 * nV1 + nV2 * nV2 + nV3 * nV3);

    // Angle between vectors
    let angleRad = 0;
    let angleDeg = 0;

    if (mU > 0 && mV > 0) {
      // cos(theta) = (u . v) / (|u| * |v|)
      let cosTheta = dot / (mU * mV);
      // Handle float precision issues
      if (cosTheta > 1) cosTheta = 1;
      if (cosTheta < -1) cosTheta = -1;

      angleRad = Math.acos(cosTheta);
      angleDeg = angleRad * (180 / Math.PI);
    }

    setResult({
      dotProduct: dot,
      magU: mU,
      magV: mV,
      angleDeg,
      angleRad,
      ortho: Math.abs(dot) < 1e-10, // close to zero
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-emerald-900 flex items-center justify-center font-serif">
          <span className="mr-3">·</span> Dot Product Calculator
        </h1>
        <p className="text-emerald-700 text-lg max-w-2xl mx-auto">
          Calculate the dot (scalar) product of two vectors, their magnitude,
          and the exact angle between them.
        </p>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-zinc-200 mb-8 max-w-2xl mx-auto">
        <div className="mb-8 p-4 bg-zinc-100 rounded-xl flex justify-center gap-4">
          <button
            onClick={() => {
              setDim("2");
              setResult(null);
            }}
            className={`px-6 py-2 rounded-lg font-bold transition-all ${dim === "2" ? "bg-emerald-600 text-white shadow-md" : "bg-zinc-200 text-zinc-600 hover:bg-zinc-300"}`}
          >
            2D Vectors
          </button>
          <button
            onClick={() => {
              setDim("3");
              setResult(null);
            }}
            className={`px-6 py-2 rounded-lg font-bold transition-all ${dim === "3" ? "bg-emerald-600 text-white shadow-md" : "bg-zinc-200 text-zinc-600 hover:bg-zinc-300"}`}
          >
            3D Vectors
          </button>
        </div>

        <div className="space-y-8 mb-8">
          {/* Vector u */}
          <div className="p-5 rounded-xl border border-emerald-100 bg-emerald-50/50">
            <div className="font-bold text-emerald-900 border-b border-emerald-200 pb-2 mb-4 flex items-center">
              <span className="bg-emerald-600 text-white rounded w-6 h-6 flex items-center justify-center text-sm mr-2 italic">
                u
              </span>
              Vector 1
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-xs font-bold text-zinc-500 mb-1 text-center font-mono">
                  u₁
                </label>
                <input
                  type="number"
                  step="any"
                  value={u1}
                  onChange={(e) => setU1(e.target.value)}
                  className="w-full rounded-xl border-zinc-300 shadow-sm p-3 border focus:border-emerald-500 font-bold bg-white text-center font-mono"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-bold text-zinc-500 mb-1 text-center font-mono">
                  u₂
                </label>
                <input
                  type="number"
                  step="any"
                  value={u2}
                  onChange={(e) => setU2(e.target.value)}
                  className="w-full rounded-xl border-zinc-300 shadow-sm p-3 border focus:border-emerald-500 font-bold bg-white text-center font-mono"
                />
              </div>
              {dim === "3" && (
                <div className="flex-1">
                  <label className="block text-xs font-bold text-zinc-500 mb-1 text-center font-mono">
                    u³
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={u3}
                    onChange={(e) => setU3(e.target.value)}
                    className="w-full rounded-xl border-zinc-300 shadow-sm p-3 border focus:border-emerald-500 font-bold bg-white text-center font-mono"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Vector v */}
          <div className="p-5 rounded-xl border border-teal-100 bg-teal-50/50">
            <div className="font-bold text-teal-900 border-b border-teal-200 pb-2 mb-4 flex items-center">
              <span className="bg-teal-600 text-white rounded w-6 h-6 flex items-center justify-center text-sm mr-2 italic">
                v
              </span>
              Vector 2
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-xs font-bold text-zinc-500 mb-1 text-center font-mono">
                  v₁
                </label>
                <input
                  type="number"
                  step="any"
                  value={v1}
                  onChange={(e) => setV1(e.target.value)}
                  className="w-full rounded-xl border-zinc-300 shadow-sm p-3 border focus:border-teal-500 font-bold bg-white text-center font-mono"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-bold text-zinc-500 mb-1 text-center font-mono">
                  v₂
                </label>
                <input
                  type="number"
                  step="any"
                  value={v2}
                  onChange={(e) => setV2(e.target.value)}
                  className="w-full rounded-xl border-zinc-300 shadow-sm p-3 border focus:border-teal-500 font-bold bg-white text-center font-mono"
                />
              </div>
              {dim === "3" && (
                <div className="flex-1">
                  <label className="block text-xs font-bold text-zinc-500 mb-1 text-center font-mono">
                    v₃
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={v3}
                    onChange={(e) => setV3(e.target.value)}
                    className="w-full rounded-xl border-zinc-300 shadow-sm p-3 border focus:border-teal-500 font-bold bg-white text-center font-mono"
                    onKeyDown={(e) => e.key === "Enter" && calculate()}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={calculate}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-emerald-600/30 uppercase tracking-widest text-lg"
          >
            Calculate (u · v)
          </button>
        </div>
      </div>

      {result !== null && (
        <div className="bg-emerald-950 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

          <h2 className="text-emerald-300 font-bold uppercase tracking-widest text-xs mb-8 z-10 text-center">
            Scalar Result
          </h2>

          <div className="z-10 relative mb-8 w-full max-w-sm">
            <div className="p-8 rounded-full aspect-square border-4 bg-emerald-900/40 border-emerald-400/30 shadow-inner flex flex-col items-center justify-center">
              <span className="text-white/60 text-xs uppercase tracking-widest mb-2 font-bold block text-center border-b border-emerald-800 pb-2 w-3/4">
                Dot Product
              </span>
              <div className="font-bold text-6xl text-emerald-400 text-center drop-shadow-lg leading-tight font-mono break-all pt-2">
                {Number.isInteger(result.dotProduct)
                  ? result.dotProduct
                  : result.dotProduct.toFixed(4)}
              </div>
            </div>
          </div>

          <div className="w-full max-w-2xl z-10 grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-black/30 p-4 rounded-xl border border-white/5 flex justify-between items-center">
              <span className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest">
                Magnitude |u|
              </span>
              <span className="font-mono text-emerald-100 font-bold">
                {result.magU.toFixed(4)}
              </span>
            </div>
            <div className="bg-black/30 p-4 rounded-xl border border-white/5 flex justify-between items-center">
              <span className="text-teal-400 text-[10px] font-bold uppercase tracking-widest">
                Magnitude |v|
              </span>
              <span className="font-mono text-teal-100 font-bold">
                {result.magV.toFixed(4)}
              </span>
            </div>
          </div>

          <div className="z-10 bg-black/40 border border-emerald-500/30 p-6 rounded-xl text-center w-full max-w-2xl">
            <span className="text-emerald-500 text-[10px] font-bold uppercase tracking-widest mb-4 block">
              Angle Between Vectors (θ)
            </span>
            <div className="flex justify-center gap-10">
              <div>
                <span className="font-mono text-white text-3xl font-bold">
                  {result.angleDeg.toFixed(2)}°
                </span>
                <span className="block text-emerald-400/50 text-[10px] mt-1">
                  DEGREES
                </span>
              </div>
              <div>
                <span className="font-mono text-white text-3xl font-bold">
                  {result.angleRad.toFixed(4)}
                </span>
                <span className="block text-emerald-400/50 text-[10px] mt-1">
                  RADIANS
                </span>
              </div>
            </div>

            {result.ortho && (
              <div className="mt-6 inline-block bg-teal-500/20 text-teal-300 px-4 py-2 rounded-lg text-sm font-bold border border-teal-500/50">
                ✓ Vectors are Orthogonal (Perpendicular)
              </div>
            )}
            {!result.ortho && result.angleDeg === 0 && (
              <div className="mt-6 inline-block bg-sky-500/20 text-sky-300 px-4 py-2 rounded-lg text-sm font-bold border border-sky-500/50">
                ↗ Vectors are Parallel (Same Direction)
              </div>
            )}
            {!result.ortho && result.angleDeg === 180 && (
              <div className="mt-6 inline-block bg-rose-500/20 text-rose-300 px-4 py-2 rounded-lg text-sm font-bold border border-rose-500/50">
                ↙ Vectors are Anti-Parallel (Opposite Direction)
              </div>
            )}
          </div>
        </div>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Dot Product Calculator",
            operatingSystem: "All",
            applicationCategory: "EducationalApplication",
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title="Dot Product Calculator (Scalar Product)"
          whatIsIt={
            <>
              <p>
                Our <strong>Dot Product Calculator</strong> instantly multiplies
                two mathematical vectors (in either 2D or 3D space) to output
                their scalar dot product relative to each other.
              </p>
              <p>
                Unlike the Cross Product (which results in a completely new
                vector), the Dot Product always results in a single, scalar
                integer. In addition to the dot product, this tool
                simultaneously calculates the exact magnitude (length) of both
                inputted vectors, the geometric angle (θ) separating them, and
                automatically determines if the two vectors are perfectly
                orthogonal (perpendicular).
              </p>
            </>
          }
          formula={
            <>
              <p>
                The algebraic formula for calculating the dot product of two 3D
                vectors <strong>u</strong> = [u₁, u₂, u₃] and <strong>v</strong>{" "}
                = [v₁, v₂, v₃] is strictly additive multiplication:
              </p>
              <div className="bg-white p-4 rounded-lg font-mono text-center text-[15px] shadow-sm my-4 border border-zinc-200">
                <strong>u · v</strong> = (u₁ × v₁) + (u₂ × v₂) + (u₃ × v₃)
              </div>
              <p className="mt-4">
                Alternatively, if you already know the magnitudes and the angle
                (θ) between the vectors, the geometric formula is:
              </p>
              <div className="bg-white p-4 rounded-lg font-mono text-center text-[15px] shadow-sm my-4 border border-zinc-200">
                <strong>u · v</strong> = |u| × |v| × cos(θ)
              </div>
            </>
          }
          example={
            <>
              <p>
                Let's calculate the dot product of two 3D vectors:{" "}
                <strong>u</strong> = [2, -5, 4] and <strong>v</strong> = [3, 1,
                -2]:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>
                  <strong>Step 1: Multiply corresponding X components:</strong>{" "}
                  2 × 3 = 6
                </li>
                <li>
                  <strong>Step 2: Multiply corresponding Y components:</strong>{" "}
                  -5 × 1 = -5
                </li>
                <li>
                  <strong>Step 3: Multiply corresponding Z components:</strong>{" "}
                  4 × -2 = -8
                </li>
                <li>
                  <strong>Step 4: Add the three products together:</strong> 6 +
                  (-5) + (-8) = -7
                </li>
                <li>
                  <strong>Result:</strong> The final scalar dot product is
                  exactly <strong>-7</strong>.
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4">
              <li>
                <strong>Physics (Calculating Work):</strong> In classical
                mechanics, 'Work' is mathematically defined as the dot product
                of the Force vector applied to an object and the Displacement
                vector of how far it moved. (W = F · d).
              </li>
              <li>
                <strong>Computer Graphics & Video Games:</strong> Game engines
                use dot products thousands of times per second to calculate
                lighting. The engine calculates the angle between a 3D surface's
                "normal" vector and a light source vector to determine exactly
                how brightly that specific polygon should be shaded on your
                screen.
              </li>
              <li>
                <strong>Proving Orthogonality:</strong> Instantly proving if two
                lines intersect at a perfect 90-degree right angle. If their dot
                product is exactly zero, the vectors are guaranteed to be
                perfectly perpendicular.
              </li>
            </ul>
          }
          faqs={[
            {
              question: "What does a Dot Product of zero mean?",
              answer:
                "A dot product of exactly 0 means the two vectors are 'orthogonal', which is the multi-dimensional geometric term for 'perpendicular'. They intersect at exactly a 90-degree right angle.",
            },
            {
              question: "Is the Dot Product commutative?",
              answer:
                "Yes. The order does not matter. The mathematical result of (u · v) will always be exactly identical to the result of (v · u).",
            },
            {
              question: "Can a Dot Product be a negative number?",
              answer:
                "Yes. A negative dot product geometrically indicates that the angle (θ) separating the two vectors is greater than 90 degrees (an obtuse angle), meaning they are generally pointing in opposite directions across the plane.",
            },
          ]}
          relatedCalculators={[
            {
              name: "Cross Product Calculator",
              path: "/cross-product-calculator/",
              desc: "Calculate the perpendicular 3D resultant vector between two input vectors.",
            },
            {
              name: "Vector Addition Calculator",
              path: "/vector-addition-calculator/",
              desc: "Add multiple vectors together to find their cumulative resultant magnitude and direction.",
            },
            {
              name: "Proportion Calculator",
              path: "/proportion-calculator/",
              desc: "Solve complex algebraic variable proportions.",
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
