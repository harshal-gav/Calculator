"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function ProjectileMotionCalculator() {
  const [velocity, setVelocity] = useState("20"); // m/s
  const [angle, setAngle] = useState("45"); // degrees
  const [height, setHeight] = useState("0"); // m (initial height)
  const [gravity, setGravity] = useState("9.80665"); // m/s^2

  const [result, setResult] = useState<{
    flightTime: number;
    maxHeight: number;
    range: number;
    trajectory: { x: number; y: number }[];
  } | null>(null);

  const calculate = () => {
    const v0 = parseFloat(velocity);
    const thetaDeg = parseFloat(angle);
    const h0 = parseFloat(height);
    const g = parseFloat(gravity);

    if (isNaN(v0) || isNaN(thetaDeg) || isNaN(h0) || isNaN(g) || g === 0) {
      setResult(null);
      return;
    }

    const theta = thetaDeg * (Math.PI / 180);
    const v0x = v0 * Math.cos(theta);
    const v0y = v0 * Math.sin(theta);

    // Max Height: h = h0 + (v0y^2) / (2g)
    const maxHeight = h0 + Math.pow(v0y, 2) / (2 * g);

    // Flight time: Need to solve quadratic: -0.5*g*t^2 + v0y*t + h0 = 0
    const a = -0.5 * g;
    const b = v0y;
    const c = h0;

    const discriminant = Math.pow(b, 2) - 4 * a * c;
    let flightTime = 0;

    if (discriminant >= 0) {
      const t1 = (-b + Math.sqrt(discriminant)) / (2 * a);
      const t2 = (-b - Math.sqrt(discriminant)) / (2 * a);
      flightTime = Math.max(t1, t2); // Take positive root
    }

    if (flightTime <= 0) {
      setResult(null);
      return;
    }

    // Horizontal Range
    const range = v0x * flightTime;

    // Calculate plot points
    const trajectory = [];
    const numPoints = 20;
    const dt = flightTime / numPoints;

    for (let i = 0; i <= numPoints; i++) {
      const t = i * dt;
      const x = v0x * t;
      const y = h0 + v0y * t - 0.5 * g * Math.pow(t, 2);
      if (y >= 0) {
        trajectory.push({ x, y });
      }
    }

    setResult({ flightTime, maxHeight, range, trajectory });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-rose-900 flex items-center justify-center font-serif">
          <span className="mr-3">☄️</span> Projectile Motion
        </h1>
        <p className="text-rose-700 text-lg max-w-2xl mx-auto">
          Calculate exactly how far, how high, and how long a projectile will
          travel given initial velocity and launch angle.
        </p>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-zinc-200 mb-8 max-w-3xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-xs font-bold text-zinc-500 mb-1 uppercase tracking-widest">
              Initial Velocity (v₀)
            </label>
            <div className="flex">
              <input
                type="number"
                step="any"
                min="0"
                value={velocity}
                onChange={(e) => setVelocity(e.target.value)}
                className="w-full rounded-l-xl border-zinc-300 shadow-sm p-3 border focus:border-rose-500 font-bold bg-zinc-50 font-mono"
              />
              <div className="bg-zinc-100 border border-l-0 border-zinc-300 rounded-r-xl px-4 flex items-center font-bold text-zinc-500 text-sm">
                m/s
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-500 mb-1 uppercase tracking-widest">
              Launch Angle (θ)
            </label>
            <div className="flex">
              <input
                type="number"
                step="any"
                min="0"
                max="90"
                value={angle}
                onChange={(e) => setAngle(e.target.value)}
                className="w-full rounded-l-xl border-zinc-300 shadow-sm p-3 border focus:border-rose-500 font-bold bg-zinc-50 font-mono"
              />
              <div className="bg-zinc-100 border border-l-0 border-zinc-300 rounded-r-xl px-4 flex items-center font-bold text-zinc-500 text-sm">
                Deg
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-500 mb-1 uppercase tracking-widest">
              Initial Height (h₀)
            </label>
            <div className="flex">
              <input
                type="number"
                step="any"
                min="0"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full rounded-l-xl border-zinc-300 shadow-sm p-3 border focus:border-rose-500 font-bold bg-zinc-50 font-mono"
              />
              <div className="bg-zinc-100 border border-l-0 border-zinc-300 rounded-r-xl px-4 flex items-center font-bold text-zinc-500 text-sm">
                m
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-500 mb-1 uppercase tracking-widest">
              Gravity (g)
            </label>
            <div className="flex">
              <input
                type="number"
                step="any"
                min="0"
                value={gravity}
                onChange={(e) => setGravity(e.target.value)}
                className="w-full rounded-l-xl border-zinc-300 shadow-sm p-3 border focus:border-rose-500 font-bold bg-zinc-50 font-mono"
                onKeyDown={(e) => e.key === "Enter" && calculate()}
              />
              <div className="bg-zinc-100 border border-l-0 border-zinc-300 rounded-r-xl px-4 flex items-center font-bold text-zinc-500 text-sm">
                m/s²
              </div>
            </div>
          </div>
        </div>

        <div>
          <button
            onClick={calculate}
            className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-rose-600/30 uppercase tracking-widest text-lg"
          >
            Calculate Trajectory
          </button>
        </div>
      </div>

      {result !== null && (
        <div className="bg-slate-900 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

          <h2 className="text-white/60 font-bold uppercase tracking-widest text-xs mb-8 z-10 text-center">
            Kinematic Results
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl z-10 relative items-center mb-10">
            <div className="bg-black/40 p-6 rounded-2xl border border-rose-500/30 flex flex-col items-center justify-center text-center shadow-inner h-full">
              <span className="text-rose-400 text-[10px] font-bold uppercase tracking-widest mb-3">
                Max Height (h_max)
              </span>
              <div className="font-mono text-white tracking-tight font-black text-4xl break-all">
                {result.maxHeight.toLocaleString("en-US", {
                  maximumFractionDigits: 2,
                })}
                <span className="text-rose-500 text-lg ml-1">m</span>
              </div>
            </div>

            <div className="bg-gradient-to-tr from-rose-900 to-pink-900 p-6 rounded-2xl border border-rose-400/30 flex flex-col items-center justify-center text-center shadow-xl h-full transform md:scale-110">
              <span className="text-rose-200 text-[10px] font-bold uppercase tracking-widest mb-3">
                Total Range (R)
              </span>
              <div className="font-mono text-white tracking-tight font-black text-5xl break-all drop-shadow-lg">
                {result.range.toLocaleString("en-US", {
                  maximumFractionDigits: 2,
                })}
                <span className="text-rose-300 text-xl ml-1">m</span>
              </div>
            </div>

            <div className="bg-black/40 p-6 rounded-2xl border border-rose-500/30 flex flex-col items-center justify-center text-center shadow-inner h-full">
              <span className="text-rose-400 text-[10px] font-bold uppercase tracking-widest mb-3">
                Flight Time (t)
              </span>
              <div className="font-mono text-white tracking-tight font-black text-4xl break-all">
                {result.flightTime.toLocaleString("en-US", {
                  maximumFractionDigits: 3,
                })}
                <span className="text-rose-500 text-lg ml-1">s</span>
              </div>
            </div>
          </div>

          <div className="z-10 bg-black/50 p-6 rounded-xl border border-white/5 w-full max-w-4xl max-h-48 overflow-y-auto">
            <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-4 block sticky top-0 bg-black/90 pb-2">
              Trajectory Data Points (x, y)
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 font-mono text-sm">
              {result.trajectory.map((point, i) => (
                <div
                  key={i}
                  className="bg-white/5 border border-white/10 p-2 rounded text-center"
                >
                  <div className="text-rose-400 text-[10px] uppercase mb-1">
                    t = {((i * result.flightTime) / 20).toFixed(2)}s
                  </div>
                  <div className="text-white">x: {point.x.toFixed(1)}m</div>
                  <div className="text-white">y: {point.y.toFixed(1)}m</div>
                </div>
              ))}
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
            name: "Projectile Motion Calculator",
            operatingSystem: "All",
            applicationCategory: "EducationalApplication",
          }),
        }}
      />

      <CalculatorSEO
        title="Projectile Motion Calculator"
        whatIsIt={
          <p>
            The <strong>Projectile Motion Calculator</strong> is a classical
            mechanics tool that computes the exact trajectory, maximum height,
            total horizontal range, and flight time of any object launched into
            the air, governed solely by initial velocity, launch angle, and
            gravity.
          </p>
        }
        formula={
          <>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 font-mono text-lg text-indigo-700 text-center shadow-sm my-6">
              y = x tan(θ) - gx² / (2v₀² cos²θ)
            </div>
            <p className="text-sm text-slate-500 text-center">
              Predicting flight paths in physics simulations.
            </p>
          </>
        }
        example={
          <>
            <p>
              If you kick a soccer ball at <strong>20 m/s</strong> at a{" "}
              <strong>45° angle</strong> from the ground (h₀ = 0):
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>
                Max Height: (20² × sin²(45°)) / (2 × 9.81) ={" "}
                <strong>10.19 meters</strong>
              </li>
              <li>
                Total Flight Time: (2 × 20 × sin(45°)) / 9.81 ={" "}
                <strong>2.88 seconds</strong>
              </li>
              <li>
                Total Distance (Range): (20² × sin(2 × 45°)) / 9.81 ={" "}
                <strong>40.79 meters</strong>
              </li>
            </ul>
          </>
        }
        useCases={
          <ul className="list-disc pl-6 space-y-4">
            <li>
              <strong>Physics Homework:</strong> Instantly check answers for
              classical mechanics problems involving thrown balls, fired
              cannons, or leaping athletes.
            </li>
            <li>
              <strong>Sports Analytics:</strong> Determine the optimal launch
              angle for maximum distance in track and field events (shot put,
              javelin) or golf drives.
            </li>
            <li>
              <strong>Game Development:</strong> Program accurate and realistic
              physics engines for archers, grenades, or jumping mechanics in
              video games.
            </li>
          </ul>
        }
        faqs={[
          {
            question: "Does this factor in air resistance (drag)?",
            answer:
              "No, this calculator assumes a complete vacuum. In the real world, air resistance causes the projectile to fall shorter and steeper than the perfectly symmetrical parabolas calculated here.",
          },
          {
            question: "What angle gives the maximum possible range?",
            answer:
              "Assuming you launch from and land on flat ground (h₀ = 0), a 45-degree angle will always mathematically yield the absolute maximum horizontal range.",
          },
            {
              question: "How accurate is this calculator?",
              answer: "Our calculator uses industry-standard formulas to provide the most accurate results possible. However, it should be used for informational purposes only and not as a basis for formal calculations or legal advice.",
            }]}
        relatedCalculators={[
          {
            name: "Velocity Calculator",
            path: "/velocity-calculator/",
            desc: "Calculate basic speed, distance, and time.",
          },
          {
            name: "Force Calculator",
            path: "/force-calculator/",
            desc: "Calculate force based on mass and acceleration (Newton's Second Law).",
          },
          {
            name: "Kinetic Energy",
            path: "/kinetic-energy-calculator/",
            desc: "Find the energy of a moving object based on mass and velocity.",
          },
            {
              name: "Density Calculator",
              path: "/density-calculator/",
              desc: "Calculate density, mass, or volume given two values.",
            }]}
      />
    </div>
  );
}
