"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function ForceCalculator() {
  const [calcType, setCalcType] = useState("force"); // force, mass, acceleration

  // Values
  const [force, setForce] = useState("100"); // Newtons (N)
  const [mass, setMass] = useState("10"); // kg
  const [accel, setAccel] = useState("10"); // m/s^2

  // Units
  const [forceUnit, setForceUnit] = useState("N");
  const [massUnit, setMassUnit] = useState("kg");
  const [accelUnit, setAccelUnit] = useState("m_s2");

  // Unit conversions to base SI (N, kg, m/s^2)
  const massToKg: Record<string, number> = {
    kg: 1,
    g: 0.001,
    mg: 0.000001,
    lb: 0.453592,
    oz: 0.0283495,
    ton: 1000,
  };

  const accelToMS2: Record<string, number> = {
    m_s2: 1,
    cm_s2: 0.01,
    ft_s2: 0.3048,
    in_s2: 0.0254,
    g: 9.80665, // standard gravity
  };

  const forceToN: Record<string, number> = {
    N: 1,
    kN: 1000,
    MN: 1000000,
    dyn: 0.00001, // dyne
    lbf: 4.44822, // pound-force
    kgf: 9.80665, // kilogram-force
  };

  const computeResult = () => {
    const f = parseFloat(force);
    const m = parseFloat(mass);
    const a = parseFloat(accel);

    if (calcType === "force") {
      if (!isNaN(m) && !isNaN(a)) {
        // F = m*a
        const m_kg = m * massToKg[massUnit];
        const a_ms2 = a * accelToMS2[accelUnit];
        const f_n = m_kg * a_ms2;
        const result = f_n / forceToN[forceUnit];
        return {
          value: result,
          unitLabel:
            forceUnit === "lbf"
              ? "lb-f"
              : forceUnit === "kgf"
                ? "kg-f"
                : forceUnit,
        };
      }
    } else if (calcType === "mass") {
      if (!isNaN(f) && !isNaN(a) && a !== 0) {
        // m = F/a
        const f_n = f * forceToN[forceUnit];
        const a_ms2 = a * accelToMS2[accelUnit];
        const m_kg = f_n / a_ms2;
        const result = m_kg / massToKg[massUnit];
        return { value: result, unitLabel: massUnit };
      }
    } else if (calcType === "acceleration") {
      if (!isNaN(f) && !isNaN(m) && m !== 0) {
        // a = F/m
        const f_n = f * forceToN[forceUnit];
        const m_kg = m * massToKg[massUnit];
        const a_ms2 = f_n / m_kg;
        const result = a_ms2 / accelToMS2[accelUnit];

        let outLabel = accelUnit.replace("_s2", "/s²");
        if (accelUnit === "g") outLabel = "g (Gravity)";

        return { value: result, unitLabel: outLabel };
      }
    }
    return { value: null, unitLabel: "" };
  };

  const resultData = computeResult();

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-orange-900 flex items-center justify-center">
          <span className="mr-3">🚀</span> Force Calculator
        </h1>
        <p className="text-zinc-600 text-lg max-w-2xl mx-auto">
          Calculate Force (F), Mass (m), or Acceleration (a) using Newton's
          Second Law of Motion.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Inputs */}
        <div className="lg:col-span-3 space-y-6 bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm relative">
          <div className="absolute top-0 left-0 w-2 h-full bg-orange-500 rounded-l-2xl"></div>

          <div>
            <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">
              Solve For
            </label>
            <select
              value={calcType}
              onChange={(e) => setCalcType(e.target.value)}
              className="w-full rounded-xl border-zinc-300 p-4 shadow-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all font-bold bg-zinc-50 cursor-pointer text-orange-900"
            >
              <option value="force">Force (F)</option>
              <option value="mass">Mass (m)</option>
              <option value="acceleration">Acceleration (a)</option>
            </select>
          </div>

          <div className="space-y-4">
            {calcType !== "force" && (
              <div>
                <label className="block text-xs font-bold text-zinc-500 mb-1 uppercase tracking-widest">
                  Force (F)
                </label>
                <div className="flex">
                  <input
                    type="number"
                    step="any"
                    value={force}
                    onChange={(e) => setForce(e.target.value)}
                    className="w-full rounded-l-xl border-zinc-200 p-3 shadow-sm focus:border-orange-500 font-mono font-bold"
                  />
                  <select
                    value={forceUnit}
                    onChange={(e) => setForceUnit(e.target.value)}
                    className="border-y border-r border-zinc-200 bg-zinc-100 text-zinc-700 font-bold px-3 rounded-r-xl"
                  >
                    <option value="N">Newtons (N)</option>
                    <option value="kN">Kilonewtons (kN)</option>
                    <option value="lbf">Pounds-force (lbf)</option>
                    <option value="kgf">Kilograms-force (kgf)</option>
                    <option value="dyn">Dynes (dyn)</option>
                  </select>
                </div>
              </div>
            )}
            {calcType !== "mass" && (
              <div>
                <label className="block text-xs font-bold text-zinc-500 mb-1 uppercase tracking-widest">
                  Mass (m)
                </label>
                <div className="flex">
                  <input
                    type="number"
                    step="any"
                    min="0"
                    value={mass}
                    onChange={(e) => setMass(e.target.value)}
                    className="w-full rounded-l-xl border-zinc-200 p-3 shadow-sm focus:border-orange-500 font-mono font-bold"
                  />
                  <select
                    value={massUnit}
                    onChange={(e) => setMassUnit(e.target.value)}
                    className="border-y border-r border-zinc-200 bg-zinc-100 text-zinc-700 font-bold px-3 rounded-r-xl"
                  >
                    <option value="kg">Kilograms (kg)</option>
                    <option value="g">Grams (g)</option>
                    <option value="lb">Pounds (lb)</option>
                    <option value="oz">Ounces (oz)</option>
                    <option value="ton">Metric Tons (t)</option>
                  </select>
                </div>
              </div>
            )}
            {calcType !== "acceleration" && (
              <div>
                <label className="block text-xs font-bold text-zinc-500 mb-1 uppercase tracking-widest">
                  Acceleration (a)
                </label>
                <div className="flex">
                  <input
                    type="number"
                    step="any"
                    value={accel}
                    onChange={(e) => setAccel(e.target.value)}
                    className="w-full rounded-l-xl border-zinc-200 p-3 shadow-sm focus:border-orange-500 font-mono font-bold"
                  />
                  <select
                    value={accelUnit}
                    onChange={(e) => setAccelUnit(e.target.value)}
                    className="border-y border-r border-zinc-200 bg-zinc-100 text-zinc-700 font-bold px-3 rounded-r-xl"
                  >
                    <option value="m_s2">m/s²</option>
                    <option value="ft_s2">ft/s²</option>
                    <option value="cm_s2">cm/s²</option>
                    <option value="g">g (Gravity)</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Select Output Unit */}
          {calcType === "force" && (
            <div className="pt-4 border-t border-zinc-100">
              <label className="block text-xs font-bold text-orange-700 mb-2 uppercase tracking-wide">
                Output Unit (Force)
              </label>
              <select
                value={forceUnit}
                onChange={(e) => setForceUnit(e.target.value)}
                className="w-full rounded-xl border-orange-200 p-3 shadow-sm focus:border-orange-500 font-semibold bg-orange-50/50"
              >
                <option value="N">Newtons (N)</option>
                <option value="kN">Kilonewtons (kN)</option>
                <option value="lbf">Pounds-force (lbf)</option>
                <option value="kgf">Kilograms-force (kgf)</option>
                <option value="dyn">Dynes (dyn)</option>
              </select>
            </div>
          )}
          {calcType === "mass" && (
            <div className="pt-4 border-t border-zinc-100">
              <label className="block text-xs font-bold text-orange-700 mb-2 uppercase tracking-wide">
                Output Unit (Mass)
              </label>
              <select
                value={massUnit}
                onChange={(e) => setMassUnit(e.target.value)}
                className="w-full rounded-xl border-orange-200 p-3 shadow-sm focus:border-orange-500 font-semibold bg-orange-50/50"
              >
                <option value="kg">Kilograms (kg)</option>
                <option value="g">Grams (g)</option>
                <option value="lb">Pounds (lb)</option>
                <option value="oz">Ounces (oz)</option>
                <option value="ton">Metric Tons (t)</option>
              </select>
            </div>
          )}
          {calcType === "acceleration" && (
            <div className="pt-4 border-t border-zinc-100">
              <label className="block text-xs font-bold text-orange-700 mb-2 uppercase tracking-wide">
                Output Unit (Acceleration)
              </label>
              <select
                value={accelUnit}
                onChange={(e) => setAccelUnit(e.target.value)}
                className="w-full rounded-xl border-orange-200 p-3 shadow-sm focus:border-orange-500 font-semibold bg-orange-50/50"
              >
                <option value="m_s2">m/s²</option>
                <option value="ft_s2">ft/s²</option>
                <option value="cm_s2">cm/s²</option>
                <option value="g">g (Gravity)</option>
              </select>
            </div>
          )}
        </div>

        {/* Dashboard Output */}
        <div className="lg:col-span-2">
          {resultData.value !== null ? (
            <div className="h-full bg-slate-900 rounded-2xl p-8 shadow-2xl relative overflow-hidden flex flex-col justify-center text-white border border-orange-800">
              {/* Decorative element map dots */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500 rounded-full mix-blend-multiply filter blur-[50px] opacity-30 pointer-events-none"></div>

              <div className="relative z-10 text-center">
                <h2 className="text-orange-300 font-bold uppercase tracking-widest text-xs mb-8 border-b border-orange-800/50 pb-4">
                  Calculated{" "},
                  {calcType === "force"
                    ? "Force"
                    : calcType === "mass"
                      ? "Mass"
                      : "Acceleration"}
                </h2>

                <div className="text-5xl lg:text-5xl font-black tracking-tight text-white mb-4 drop-shadow-lg break-all font-mono">
                  {resultData.value > 1000000 ||
                  (Math.abs(resultData.value) < 0.0001 &&
                    resultData.value !== 0)
                    ? resultData.value.toExponential(4)
                    : parseFloat(resultData.value.toPrecision(7))}
                </div>
                <div className="text-orange-400 font-bold text-xl tracking-wider">
                  {resultData.unitLabel}
                </div>

                <div className="mt-8 pt-6 border-t border-orange-800/50">
                  <div className="text-orange-200 text-[10px] uppercase font-bold tracking-widest text-center">
                    Newton's Second Law
                  </div>
                  <div className="text-orange-100 font-mono mt-2 bg-black/40 backdrop-blur-sm p-4 rounded-xl text-xl font-bold text-center border border-orange-700/50 italic tracking-wider">
                    F = m × a
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full rounded-2xl border-2 border-dashed border-zinc-300 bg-zinc-100 flex flex-col items-center justify-center p-8 text-center text-zinc-500">
              <span className="text-5xl mb-4 opacity-50 filter grayscale pt-10">
                🚀
              </span>
              <h3 className="text-zinc-700 font-bold text-lg mb-2">
                Awaiting Variables
              </h3>
              <p className="text-sm">
                Enter the two known parameters to calculate the missing one.
              </p>
            </div>
          )}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Force Calculator",
            operatingSystem: "All",
            applicationCategory: "EducationalApplication",
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title="Force & Mass Calculator"
          whatIsIt={
            <>
              <p>
                Our <strong>Force Calculator</strong> brings Sir Isaac Newton's
                Second Law of Motion to life, allowing you to fluidly calculate
                the exact relationship between the physical{" "}
                <strong>Mass (m)</strong> of an object, its{" "}
                <strong>Acceleration (a)</strong>, and the resulting{" "}
                <strong>Force (F)</strong> it exerts.
              </p>
              <p>
                Force is an unavoidable physical interaction that changes the
                motion of an object. Understanding how much force is required to
                move heavy objects, or how much force is generated when moving
                objects crash, is the backbone of modern mechanical engineering.
              </p>
            </>
          }
          formula={
            <>
              <p>
                Newton's Second Law is one of the most famous equations in human
                history. It states that the heavier an object is, and the faster
                it speeds up, the more force it carries.
              </p>
              <div className="bg-orange-50 p-4 rounded-lg font-mono text-center text-[15px] shadow-sm my-4 flex flex-col gap-2 border border-orange-100 text-orange-900">
                <p>
                  <strong>Force (F) = m × a</strong>
                </p>
                <p className="mt-2 pt-2 border-t border-orange-200">
                  <strong>Mass (m) = F ÷ a</strong>
                </p>
                <p className="mt-2 pt-2 border-t border-orange-200">
                  <strong>Acceleration (a) = F ÷ m</strong>
                </p>
              </div>
            </>
          }
          example={
            <>
              <p>
                Let's calculate the physical force required to push a stalled
                car across a parking lot.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                <li>
                  <strong>The Scenario:</strong> You and your friends need to
                  push a broken-down sedan. The vehicle has a mass of exactly{" "}
                  <strong>1,500 kg</strong>. You want to push it so its speed
                  increases (accelerates) at a rate of <strong>0.5 m/s²</strong>
                  .
                </li>
                <li>
                  <strong>The Math:</strong> 1,500 kg × 0.5 m/s² ={" "}
                  <strong>750</strong>.
                </li>
                <li>
                  <strong>Result:</strong> It will require exactly{" "}
                  <strong>750 Newtons (N)</strong> of sustained physical force
                  to move the vehicle at that specific rate of acceleration.
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-gray-700">
              <li>
                <strong>Automotive Safety:</strong> Automobile engineers use
                force calculations to design airbag deployment systems. They
                must calculate the exact force with which a 180-pound body will
                be thrown forward during a 60 mph rapid deceleration (crash).
              </li>
              <li>
                <strong>Rocket Trajectory:</strong> Space agencies must
                calculate exact payload mass. The heavier the satellite (m), the
                exponentially more thrust force (F) the rocket engines must
                generate to achieve orbital acceleration (a).
              </li>
              <li>
                <strong>Elevator Limits:</strong> Architects calculate the
                maximum safe mass threshold (passenger weight limit) of an
                elevator cab based on the maximum upward tension force the steel
                cables are rated to handle.
              </li>
            </ul>
          }
          faqs={[
            {
              question: "What is a Newton?",
              answer:
                "A Newton (N) is the standard metric unit of force. By explicit definition, 1 Newton is the exact amount of force required to accelerate a 1-kilogram mass at a rate of 1 meter-per-second-squared.",
            },
            {
              question: "What is the difference between mass and weight?",
              answer:
                "Mass is how much physical 'stuff' an object is made of; it never changes. Weight is actually a measurement of FORCE. Your weight is your mass multiplied by Earth's gravity (9.8 m/s²). If you stand on the Moon, your mass remains identical, but your physical weight drops by 80% because the downward acceleration is weaker.",
            },
            {
              question: "Does this calculator account for friction?",
              answer:
                "No. This tool calculates net theoretical force in a perfect vacuum. In the real world, if you push a heavy box across carpet, you must calculate and subtract opposing friction forces to discover your true net acceleration.",
            },
          ]}
          relatedCalculators={[
            {
              name: "Acceleration Calculator",
              path: "/acceleration-calculator",
              desc: "Calculate your acceleration first before plugging it into the Force equation.",
            },
            {
              name: "Work Calculator",
              path: "/work-calculator",
              desc: "Calculate how much energy is expended when a force moves an object across a distance.",
            },
            {
              name: "Density Calculator",
              path: "/density-calculator",
              desc: "Calculate the exact physical mass of large raw materials based on their volume.",
            },
            {
              name: "Kinetic Energy Calculator",
              path: "/kinetic-energy-calculator",
              desc: "Find the energy of a moving object based on mass and velocity.",
            }]}
        />
      </div>
    </div>
  );
}
