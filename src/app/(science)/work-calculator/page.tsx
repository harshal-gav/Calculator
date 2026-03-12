"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function WorkCalculator() {
  // W = F * d * cos(theta)
  const [calcTarget, setCalcTarget] = useState("work");

  // Inputs
  const [work, setWork] = useState("");
  const [force, setForce] = useState("100"); // Newtons
  const [distance, setDistance] = useState("25"); // Meters
  const [angle, setAngle] = useState("0"); // Degrees

  const [result, setResult] = useState<{
    value: number;
    unit: string;
    formula: string;
  } | null>(null);

  const calculate = () => {
    let res = 0;
    let resUnit = "";
    let formula = "";

    const angRad = parseFloat(angle) * (Math.PI / 180);

    if (calcTarget === "work") {
      const f = parseFloat(force);
      const d = parseFloat(distance);
      if (isNaN(f) || isNaN(d) || isNaN(angRad)) return setResult(null);

      res = f * d * Math.cos(angRad);
      resUnit = "Joules (J)";
      formula = "W = F × d × cos(θ)";
    } else if (calcTarget === "force") {
      const w = parseFloat(work);
      const d = parseFloat(distance);
      if (
        isNaN(w) ||
        isNaN(d) ||
        isNaN(angRad) ||
        d === 0 ||
        Math.cos(angRad) === 0
      )
        return setResult(null);

      res = w / (d * Math.cos(angRad));
      resUnit = "Newtons (N)";
      formula = "F = W / (d × cos(θ))";
    } else if (calcTarget === "distance") {
      const w = parseFloat(work);
      const f = parseFloat(force);
      if (
        isNaN(w) ||
        isNaN(f) ||
        isNaN(angRad) ||
        f === 0 ||
        Math.cos(angRad) === 0
      )
        return setResult(null);

      res = w / (f * Math.cos(angRad));
      resUnit = "Meters (m)";
      formula = "d = W / (F × cos(θ))";
    }

    setResult({ value: res, unit: resUnit, formula });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-emerald-900 flex items-center justify-center font-serif">
          <span className="mr-3">⚙️</span> Work Calculator
        </h1>
        <p className="text-emerald-700 text-lg max-w-2xl mx-auto">
          Calculate mechanical Work (W), Force (F), or displacement Distance (d)
          in physics.
        </p>
      </div>

      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-zinc-200 mb-8">
        <div className="mb-8 p-4 bg-emerald-50 rounded-xl border border-emerald-100 flex flex-col md:flex-row items-center gap-4">
          <label className="font-bold text-emerald-900 whitespace-nowrap uppercase tracking-widest text-sm">
            Target Variable:
          </label>
          <div className="flex bg-white rounded-lg p-1 shadow-sm border border-zinc-200 w-full">
            {[
              { id: "work", label: "Work (W)" },
              { id: "force", label: "Force (F)" },
              { id: "distance", label: "Distance (d)" },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => {
                  setCalcTarget(m.id);
                  setResult(null);
                }}
                className={`flex-1 py-2 text-xs md:text-sm font-bold uppercase tracking-wider rounded-md transition-colors ${calcTarget === m.id ? "bg-emerald-600 text-white shadow-md" : "text-zinc-500 hover:bg-zinc-50"}`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {calcTarget !== "work" && (
            <div>
              <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">
                Work (W)
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="any"
                  value={work}
                  onChange={(e) => setWork(e.target.value)}
                  className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-emerald-500 font-bold bg-zinc-50 pr-20"
                  placeholder="e.g. 2500"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-zinc-400">
                  Joules
                </span>
              </div>
            </div>
          )}

          {calcTarget !== "force" && (
            <div>
              <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">
                Force (F)
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="any"
                  min="0"
                  value={force}
                  onChange={(e) => setForce(e.target.value)}
                  className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-emerald-500 font-bold bg-zinc-50 pr-24"
                  placeholder="e.g. 100"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-zinc-400">
                  Newtons
                </span>
              </div>
            </div>
          )}

          {calcTarget !== "distance" && (
            <div>
              <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">
                Distance (d)
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="any"
                  min="0"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-emerald-500 font-bold bg-zinc-50 pr-20"
                  placeholder="e.g. 25"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-zinc-400">
                  Meters
                </span>
              </div>
            </div>
          )}

          <div className={`${calcTarget === "work" ? "" : "md:col-span-2"}`}>
            <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">
              Angle of Force (θ)
            </label>
            <div className="relative">
              <input
                type="number"
                step="any"
                min="0"
                max="360"
                value={angle}
                onChange={(e) => setAngle(e.target.value)}
                className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-emerald-500 font-bold bg-zinc-50 pr-24"
                placeholder="e.g. 0 (Parallel)"
                onKeyDown={(e) => e.key === "Enter" && calculate()}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-zinc-400">
                Degrees
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-2 ml-1">
              Angle between Force vector & Displacement vector. Default is 0°.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={calculate}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-5 px-6 rounded-xl transition-colors shadow-lg shadow-emerald-600/30 uppercase tracking-widest text-lg"
          >
            Calculate
          </button>
        </div>
      </div>

      {result && (
        <div className="bg-emerald-950 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

          <h2 className="text-emerald-400 font-bold uppercase tracking-widest text-xs mb-2 z-10">
            Calculated Result
          </h2>
          <div className="text-emerald-600 font-mono text-sm mb-6 z-10 bg-black/40 px-3 py-1 rounded">
            Using {result.formula}
          </div>

          <div className="flex flex-col items-center justify-center bg-black/30 px-8 py-6 rounded-2xl border border-white/10 z-10 shadow-inner w-full max-w-md text-center">
            <span className="text-5xl md:text-6xl font-black font-mono tracking-tight text-white mb-2 break-all">
              {Number.isInteger(result.value)
                ? result.value
                : parseFloat(result.value.toFixed(6))}
            </span>
            <span className="text-xl font-bold text-emerald-400 uppercase tracking-widest">
              {result.unit}
            </span>
          </div>
        </div>
      )}

      <div className="mt-8 bg-zinc-100 p-6 rounded-xl border border-zinc-200 text-sm text-zinc-600 max-w-2xl mx-auto text-center">
        <p className="font-bold text-zinc-800 uppercase tracking-widest mb-4">
          Understanding Work
        </p>
        <div className="inline-block bg-white p-4 rounded-lg shadow-sm font-mono border border-zinc-200 text-lg">
          W = F × d × cos(θ)
        </div>
        <p className="mt-4 text-xs font-mono">
          Work only occurs when a force causes an object to move. If θ = 90°
          (perpendicular), Work = 0 Joules.
        </p>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Work Calculator",
            operatingSystem: "All",
            applicationCategory: "EducationalApplication",
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title="Physics Work Calculator"
          whatIsIt={
            <>
              <p>
                Our <strong>Physics Work Calculator</strong> computes the exact
                amount of mechanical energy transferred when an applied Force
                successfully moves an object over a specific Distance.
              </p>
              <p>
                In physics, "work" is entirely distinct from its common everyday
                definition. No matter how hard you push against a solid brick
                wall, and no matter how tired you get, if the wall does not
                physically move, you have mathematically accomplished zero work.
                Work is strictly defined by successful displacement.
              </p>
            </>
          }
          formula={
            <>
              <p>
                The calculation for Work requires multiplying the Force applied
                against the Distance traveled. It also relies heavily on
                trigonometry (cosine) because only the force applied in the
                exact direction of travel actually contributes to the Work.
              </p>
              <div className="bg-emerald-50 p-4 rounded-lg font-mono text-center text-[15px] shadow-sm my-4 flex flex-col gap-2 border border-emerald-100 text-emerald-900">
                <p>
                  <strong>Work (W) = F × d × cos(θ)</strong>
                </p>
                <p className="text-sm mt-2 font-sans text-emerald-800">
                  <em>
                    Where <strong>F</strong> is Force in Newtons,{" "}
                    <strong>d</strong> is Distance in meters, and{" "}
                    <strong>θ</strong> (theta) is the angle separating your
                    pushing direction from the object's travel direction.
                  </em>
                </p>
              </div>
            </>
          }
          example={
            <>
              <p>
                Let's calculate the work done by a person pulling a heavy
                suitcase on wheels through an airport.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                <li>
                  <strong>The Scenario:</strong> You exert{" "}
                  <strong>50 Newtons</strong> of pulling force (F) on the
                  suitcase handle. You pull the suitcase for{" "}
                  <strong>100 meters</strong> (d) down the terminal. The handle
                  is angled upward at <strong>60 degrees</strong> (θ) relative
                  to the flat floor.
                </li>
                <li>
                  <strong>The Math:</strong> 50 N × 100 m × cos(60°)
                </li>
                <li>
                  <strong>Simplifying Cosine:</strong> The cosine of 60° is
                  exactly 0.5. (Only half your effort is pulling the suitcase
                  forward; the other half is uselessly lifting it upward).
                </li>
                <li>
                  <strong>Result:</strong> 5000 × 0.5 ={" "}
                  <strong>2,500 Joules (J)</strong> of total work accomplished.
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-gray-700">
              <li>
                <strong>Mechanical Efficiency:</strong> Industrial engineers
                calculate Work to determine the efficiency of engines and
                hydraulic lifters. If a crane uses 10,000 Joules of fuel energy,
                but only accomplishes 6,000 Joules of vertical lifting work, the
                motor is inefficiently losing energy to heat and friction.
              </li>
              <li>
                <strong>Exercise Science:</strong> Kinesiologists calculate the
                literal mechanical work accomplished during weightlifting.
                Pushing a 100kg barbell upward exactly 0.5 meters requires a
                very specific, mathematically rigorous expenditure of
                calorie-driven Joules.
              </li>
              <li>
                <strong>Automotive Braking:</strong> Brakes utilize kinetic
                friction over a stopping distance to perform "negative work" on
                a car. Engineers must calculate the exact Work required to
                aggressively bleed velocity from a 2-ton vehicle at highway
                speeds without melting the brake pads.
              </li>
            </ul>
          }
          faqs={[
            {
              question: "What is a Joule?",
              answer:
                "A Joule (J) is the standard metric measurement of energy and work. One Joule is defined as exactly the amount of energy required to apply one Newton of force over exactly one meter of distance (1 J = 1 N×m).",
            },
            {
              question: "Why does the angle (theta) matter?",
              answer:
                "Because forces are only effective if they push in the direction you want to go. If you tie a rope to a sled, but use a helicopter to pull the rope straight up into the sky (90 degrees), the sled lifts, but it moves zero meters forward. Cos(90) = 0. Therefore, zero forward Work was done.",
            },
            {
              question: "What happens if I push an immovable object?",
              answer:
                "If you push a mountain with 1,000,000 Newtons of force, but the distance moved (d) is zero... 1,000,000 × 0 = 0. In classical physics, you have accomplished absolutely zero Work.",
            },
          ]}
          relatedCalculators={[
            {
              name: "Force Calculator",
              path: "/force-calculator",
              desc: "Calculate your force variable before plugging it into the Work equation.",
            },
            {
              name: "Velocity Calculator",
              path: "/velocity-calculator",
              desc: "Calculate how long it will take your displaced object to arrive at its destination.",
            },
            {
              name: "Pythagorean Theorem",
              path: "/pythagorean-calculator",
              desc: "Calculate vector distances required for complex angular movement.",
            },
            {
              name: "Density Calculator",
              path: "/density-calculator",
              desc: "Calculate density, mass, or volume given two values.",
            }]}
        />
      </div>
    </div>
  );
}
