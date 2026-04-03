"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
export default function EllipseCalculator() {
  const [aStr, setAStr] = useState("5");
  const [bStr, setBStr] = useState("3");

  const [result, setResult] = useState<{
    area: number;
    circumference: number;
    eccentricity: number;
  } | null>(null);

  const calculate = () => {
    const a = parseFloat(aStr);
    const b = parseFloat(bStr);

    if (isNaN(a) || isNaN(b) || a <= 0 || b <= 0) {
      setResult(null);
      return;
    }

    const maxAxis = Math.max(a, b);
    const minAxis = Math.min(a, b);

    const area = Math.PI * a * b;

    // Ramanujan approximation for circumference
    const h = Math.pow(a - b, 2) / Math.pow(a + b, 2);
    const circumference =
      Math.PI * (a + b) * (1 + (3 * h) / (10 + Math.sqrt(4 - 3 * h)));

    // Eccentricity e = sqrt(1 - (min/max)^2)
    const eccentricity = Math.sqrt(1 - Math.pow(minAxis / maxAxis, 2));

    setResult({
      area,
      circumference,
      eccentricity,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-rose-900 flex items-center justify-center font-serif">
          <span className="mr-3">0</span> Ellipse Calculator
        </h1>
        <p className="text-rose-700 text-lg max-w-2xl mx-auto">
          Calculate the area, perimeter (circumference), and eccentricity of an
          ellipse.
        </p>
      </div>

      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-zinc-200 mb-8 max-w-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">
              Semi-Major Axis (a)
            </label>
            <input
              type="number"
              step="any"
              min="0"
              value={aStr}
              onChange={(e) => setAStr(e.target.value)}
              className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-rose-500 font-bold bg-zinc-50 text-xl"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">
              Semi-Minor Axis (b)
            </label>
            <input
              type="number"
              step="any"
              min="0"
              value={bStr}
              onChange={(e) => setBStr(e.target.value)}
              className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-rose-500 font-bold bg-zinc-50 text-xl"
              onKeyDown={(e) => e.key === "Enter" && calculate()}
            />
          </div>
        </div>

        <div>
          <button
            onClick={calculate}
            className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-rose-600/30 uppercase tracking-widest text-lg"
          >
            Calculate Ellipse
          </button>
        </div>
      </div>

      {result !== null && (
        <div className="bg-rose-950 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 z-10 relative">
            <div className="bg-black/30 p-6 rounded-xl border border-rose-500/30 shadow-inner flex flex-col items-center">
              <span className="text-rose-400 text-xs font-bold uppercase tracking-wide mb-2">
                Area
              </span>
              <div className="font-mono text-white tracking-tight font-bold text-2xl mt-2 truncate max-w-full">
                {result.area.toLocaleString("en-US", {
                  maximumFractionDigits: 5,
                })}
              </div>
            </div>

            <div className="bg-black/30 p-6 rounded-xl border border-rose-500/30 shadow-inner flex flex-col items-center">
              <span className="text-rose-400 text-xs font-bold uppercase tracking-wide mb-2">
                Perimeter (Approx)
              </span>
              <div className="font-mono text-white tracking-tight font-bold text-2xl mt-2 truncate max-w-full">
                {result.circumference.toLocaleString("en-US", {
                  maximumFractionDigits: 5,
                })}
              </div>
            </div>

            <div className="bg-black/30 p-6 rounded-xl border border-rose-500/30 shadow-inner flex flex-col items-center">
              <span className="text-rose-400 text-xs font-bold uppercase tracking-wide mb-2">
                Eccentricity (e)
              </span>
              <div className="font-mono text-white tracking-tight font-bold text-2xl mt-2 truncate max-w-full">
                {result.eccentricity.toLocaleString("en-US", {
                  maximumFractionDigits: 5,
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 bg-zinc-100 p-6 rounded-xl border border-zinc-200 text-sm text-zinc-600 max-w-2xl mx-auto space-y-2 text-center">
        <p className="font-bold text-zinc-800 uppercase tracking-widest mb-2">
          Formulas Used
        </p>
        <div className="inline-block text-left text-zinc-500 font-mono text-sm leading-relaxed border border-zinc-200 bg-white p-4 rounded-lg shadow-sm">
          <p>Area = π * a * b</p>
          <p>Perimeter ≈ Ramanujan&apos;s 2nd Approx</p>
          <p>Eccentricity = √(1 - (b²/a²))</p>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Ellipse Calculator",
            operatingSystem: "All",
            applicationCategory: "EducationalApplication",
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title="Ellipse Calculator"
          whatIsIt={
            <>
              <p>
                An <strong>Ellipse Calculator</strong> is a specialized
                geometric tool used to find the exact area, perimeter
                (circumference), and eccentricity of an oval-like shape known
                mathematically as an ellipse.
              </p>
              <p>
                Unlike a perfect circle that has a single constant radius, an
                ellipse has two different radii: a semi-major axis (the longest
                distance from the center) and a semi-minor axis (the shortest
                distance). Understanding these two vectors is crucial in
                astronomy, engineering, and optical physics.
              </p>
            </>
          }
          formula={
          <>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 font-mono text-lg text-indigo-700 text-center shadow-sm my-6">
              A = π × a × b
            </div>
            <p className="text-sm text-slate-500 text-center">
              Where a and b are the semi-axes (major and minor).
            </p>
          </>
        }
          example={
            <>
              <p>
                Let's calculate the properties of an ellipse with a{" "}
                <strong>Semi-Major Axis (a) of 5 cm</strong> and a{" "}
                <strong>Semi-Minor Axis (b) of 3 cm</strong>.
              </p>
              <ul className="list-none space-y-2 mt-4 font-mono text-sm bg-rose-50 p-4 rounded-xl border border-rose-200">
                <li>
                  <strong>Step 1 (Area):</strong> π × 5 × 3 = 15π ≈ 47.12389 cm²
                </li>
                <li>
                  <strong>Step 2 (Eccentricity):</strong> √(1 - (3² / 5²)) = √(1
                  - 0.36) = √0.64 = 0.8
                </li>
                <li>
                  <strong>Step 3 (Ramanujan 'h'):</strong> (5-3)² / (5+3)² =
                  4/64 = 0.0625
                </li>
                <li>
                  <strong>Step 4 (Perimeter):</strong> π(8) [1 + 3(0.0625) / (10
                  + √(4-0.1875))] ≈ 25.52699 cm
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-zinc-700">
              <li>
                <strong>Astronomy & Astrophysics:</strong> Calculating the
                orbital paths of planets and comets around stars, which are
                governed by elliptical geometries rather than perfect circles
                (Kepler's First Law).
              </li>
              <li>
                <strong>Architecture & Construction:</strong> Designing
                elliptical arches for bridges, domed ceilings, and acoustic
                'whispering galleries' where sound reflects perfectly from one
                focal point to another.
              </li>
              <li>
                <strong>Mechanical Engineering:</strong> Crafting elliptical
                gears and cams that convert continuous rotary motion into
                variable-speed reciprocating motion inside industrial engines.
              </li>
            </ul>
          }
          faqs={[
            {
              question: "What does Eccentricity mean?",
              answer:
                "Eccentricity (denoted as 'e') is a measure of how stretched out the ellipse is. An eccentricity of 0 means it is a perfect circle. An eccentricity close to 1 (like 0.99) means it is extremely stretched out and flat, resembling a line. It is always a number between 0 and 1.",
            },
            {
              question: "Why is the perimeter calculation an 'approximation'?",
              answer:
                "Unlike the circumference of a circle (2πr), there is no simple algebraic formula for the exact perimeter of an ellipse. It requires calculating 'Complete Elliptic Integrals of the Second Kind.' Ramanujan's formula provides a staggeringly accurate estimation without requiring extremely complex calculus.",
            },
            {
              question:
                "What is the difference between major and semi-major axes?",
              answer:
                "The 'Major Axis' is the absolute total length of the ellipse from one end to the other across the longest part. The 'Semi-Major Axis' (a) is exactly half of that—the distance from the dead center to the edge.",
            },
          ]}
          relatedCalculators={[
            {
              name: "Circle Calculator",
              path: "/circle-calculator/",
              desc: "Calculate the area and circumference of a perfect circle.",
            },
            {
              name: "Area Calculator",
              path: "/area-calculator/",
              desc: "Find the surface area of dozens of different geometric shapes.",
            },
            {
              name: "Cone Calculator",
              path: "/cone-calculator/",
              desc: "Calculate the geometric volume of a three-dimensional cone.",
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
