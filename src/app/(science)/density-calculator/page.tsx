"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function DensityCalculator() {
  const [calcType, setCalcType] = useState("density"); // density, mass, volume
  const [density, setDensity] = useState("1000"); // kg/m^3 (water)
  const [mass, setMass] = useState("100"); // kg
  const [volume, setVolume] = useState("0.1"); // m^3

  const [densityUnit, setDensityUnit] = useState("kg_m3");
  const [massUnit, setMassUnit] = useState("kg");
  const [volumeUnit, setVolumeUnit] = useState("m3");

  // Unit conversions to base SI (kg, m^3, kg/m^3)
  const massToKg: Record<string, number> = {
    kg: 1,
    g: 0.001,
    mg: 0.000001,
    lb: 0.453592,
    oz: 0.0283495,
    ton: 1000,
  };

  const volumeToM3: Record<string, number> = {
    m3: 1,
    cm3: 0.000001, // same as mL
    l: 0.001,
    ml: 0.000001,
    ft3: 0.0283168,
    in3: 0.000016387,
    gal_us: 0.00378541,
  };

  const densityToKgM3: Record<string, number> = {
    kg_m3: 1,
    g_cm3: 1000,
    g_ml: 1000,
    kg_l: 1000,
    lb_ft3: 16.0185,
    lb_in3: 27679.9,
  };

  const computeResult = () => {
    const p = parseFloat(density);
    const m = parseFloat(mass);
    const v = parseFloat(volume);

    if (calcType === "density") {
      if (!isNaN(m) && !isNaN(v) && v !== 0) {
        // p = m/v
        const m_kg = m * massToKg[massUnit];
        const v_m3 = v * volumeToM3[volumeUnit];
        const p_kg_m3 = m_kg / v_m3;
        const result = p_kg_m3 / densityToKgM3[densityUnit];
        return { value: result, unitLabel: densityUnit.replace("_", "/") };
      }
    } else if (calcType === "mass") {
      if (!isNaN(p) && !isNaN(v)) {
        // m = p*v
        const p_kg_m3 = p * densityToKgM3[densityUnit];
        const v_m3 = v * volumeToM3[volumeUnit];
        const m_kg = p_kg_m3 * v_m3;
        const result = m_kg / massToKg[massUnit];
        return { value: result, unitLabel: massUnit };
      }
    } else if (calcType === "volume") {
      if (!isNaN(p) && !isNaN(m) && p !== 0) {
        // v = m/p
        const p_kg_m3 = p * densityToKgM3[densityUnit];
        const m_kg = m * massToKg[massUnit];
        const v_m3 = m_kg / p_kg_m3;
        const result = v_m3 / volumeToM3[volumeUnit];
        return { value: result, unitLabel: volumeUnit };
      }
    }
    return { value: null, unitLabel: "" };
  };

  const resultData = computeResult();

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-cyan-900 flex items-center justify-center">
          <span className="mr-3">⚖️</span> Density Calculator
        </h1>
        <p className="text-zinc-600 text-lg max-w-2xl mx-auto">
          Calculate Density (ρ), Mass (m), or Volume (V) of an object using the
          standard density formula.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Inputs */}
        <div className="lg:col-span-3 space-y-6 bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm relative">
          <div className="absolute top-0 left-0 w-2 h-full bg-cyan-500 rounded-l-2xl"></div>

          <div>
            <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">
              Solve For
            </label>
            <select
              value={calcType}
              onChange={(e) => setCalcType(e.target.value)}
              className="w-full rounded-xl border-zinc-300 p-4 shadow-sm focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all font-bold bg-zinc-50 cursor-pointer text-cyan-900"
            >
              <option value="density">Density (ρ)</option>
              <option value="mass">Mass (m)</option>
              <option value="volume">Volume (V)</option>
            </select>
          </div>

          <div className="space-y-4">
            {calcType !== "density" && (
              <div>
                <label className="block text-xs font-bold text-zinc-500 mb-1 uppercase tracking-widest">
                  Density (ρ)
                </label>
                <div className="flex">
                  <input
                    type="number"
                    step="any"
                    value={density}
                    onChange={(e) => setDensity(e.target.value)}
                    className="w-full rounded-l-xl border-zinc-200 p-3 shadow-sm focus:border-cyan-500 font-mono font-bold"
                  />
                  <select
                    value={densityUnit}
                    onChange={(e) => setDensityUnit(e.target.value)}
                    className="border-y border-r border-zinc-200 bg-zinc-100 text-zinc-700 font-bold px-3 rounded-r-xl"
                  >
                    <option value="kg_m3">kg/m³</option>
                    <option value="g_cm3">g/cm³</option>
                    <option value="kg_l">kg/L</option>
                    <option value="lb_ft3">lb/ft³</option>
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
                    value={mass}
                    onChange={(e) => setMass(e.target.value)}
                    className="w-full rounded-l-xl border-zinc-200 p-3 shadow-sm focus:border-cyan-500 font-mono font-bold"
                  />
                  <select
                    value={massUnit}
                    onChange={(e) => setMassUnit(e.target.value)}
                    className="border-y border-r border-zinc-200 bg-zinc-100 text-zinc-700 font-bold px-3 rounded-r-xl"
                  >
                    <option value="kg">kg</option>
                    <option value="g">g</option>
                    <option value="lb">lb</option>
                    <option value="oz">oz</option>
                    <option value="ton">ton (metric)</option>
                  </select>
                </div>
              </div>
            )}
            {calcType !== "volume" && (
              <div>
                <label className="block text-xs font-bold text-zinc-500 mb-1 uppercase tracking-widest">
                  Volume (V)
                </label>
                <div className="flex">
                  <input
                    type="number"
                    step="any"
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    className="w-full rounded-l-xl border-zinc-200 p-3 shadow-sm focus:border-cyan-500 font-mono font-bold"
                  />
                  <select
                    value={volumeUnit}
                    onChange={(e) => setVolumeUnit(e.target.value)}
                    className="border-y border-r border-zinc-200 bg-zinc-100 text-zinc-700 font-bold px-3 rounded-r-xl"
                  >
                    <option value="m3">m³</option>
                    <option value="cm3">cm³</option>
                    <option value="l">Liters (L)</option>
                    <option value="ml">mL</option>
                    <option value="ft3">ft³</option>
                    <option value="gal_us">gal (US)</option>
                  </select>
                </div>
              </div>
            )}
          </div>
          {/* Select Output Unit for the solved variable */}
          {calcType === "density" && (
            <div className="pt-4 border-t border-zinc-100">
              <label className="block text-xs font-bold text-cyan-700 mb-2 uppercase tracking-wide">
                Result Unit (Density)
              </label>
              <select
                value={densityUnit}
                onChange={(e) => setDensityUnit(e.target.value)}
                className="w-full rounded-xl border-cyan-200 p-3 shadow-sm focus:border-cyan-500 font-semibold bg-cyan-50/50"
              >
                <option value="kg_m3">kg/m³</option>
                <option value="g_cm3">g/cm³</option>
                <option value="kg_l">kg/L</option>
                <option value="lb_ft3">lb/ft³</option>
              </select>
            </div>
          )}
          {calcType === "mass" && (
            <div className="pt-4 border-t border-zinc-100">
              <label className="block text-xs font-bold text-cyan-700 mb-2 uppercase tracking-wide">
                Result Unit (Mass)
              </label>
              <select
                value={massUnit}
                onChange={(e) => setMassUnit(e.target.value)}
                className="w-full rounded-xl border-cyan-200 p-3 shadow-sm focus:border-cyan-500 font-semibold bg-cyan-50/50"
              >
                <option value="kg">kg</option>
                <option value="g">g</option>
                <option value="lb">lb</option>
                <option value="oz">oz</option>
                <option value="ton">ton (metric)</option>
              </select>
            </div>
          )}
          {calcType === "volume" && (
            <div className="pt-4 border-t border-zinc-100">
              <label className="block text-xs font-bold text-cyan-700 mb-2 uppercase tracking-wide">
                Result Unit (Volume)
              </label>
              <select
                value={volumeUnit}
                onChange={(e) => setVolumeUnit(e.target.value)}
                className="w-full rounded-xl border-cyan-200 p-3 shadow-sm focus:border-cyan-500 font-semibold bg-cyan-50/50"
              >
                <option value="m3">m³</option>
                <option value="cm3">cm³</option>
                <option value="l">Liters (L)</option>
                <option value="ml">mL</option>
                <option value="ft3">ft³</option>
                <option value="gal_us">gal (US)</option>
              </select>
            </div>
          )}
        </div>

        {/* Dashboard Output */}
        <div className="lg:col-span-2">
          {resultData.value !== null ? (
            <div className="h-full bg-cyan-900 rounded-2xl p-8 shadow-2xl relative overflow-hidden flex flex-col justify-center text-white border border-cyan-800">
              {/* Decorative element map dots */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none"></div>

              <div className="relative z-10 text-center">
                <h2 className="text-cyan-200 font-bold uppercase tracking-widest text-xs mb-8 border-b border-cyan-800/50 pb-4">
                  Calculated{" "}
                  {calcType === "density"
                    ? "Density"
                    : calcType === "mass"
                      ? "Mass"
                      : "Volume"}
                </h2>

                <div className="text-5xl lg:text-5xl font-black tracking-tight text-white mb-4 drop-shadow-lg break-all font-mono">
                  {parseFloat(resultData.value.toPrecision(7))}
                </div>
                <div className="text-cyan-400 font-bold text-xl tracking-wider">
                  {resultData.unitLabel}
                </div>

                <div className="mt-8 pt-6 border-t border-cyan-800/50">
                  <div className="text-cyan-300 text-[10px] uppercase font-bold tracking-widest text-center">
                    Standard Formula
                  </div>
                  <div className="text-cyan-100 font-mono mt-2 bg-black/30 backdrop-blur-sm p-4 rounded-xl text-lg font-bold text-center border border-cyan-700/50">
                    ρ = m/V
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full rounded-2xl border-2 border-dashed border-zinc-300 bg-zinc-100 flex flex-col items-center justify-center p-8 text-center text-zinc-500">
              <span className="text-5xl mb-4 opacity-50 filter grayscale pt-10">
                ⚖️
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
            name: "Density Calculator",
            operatingSystem: "All",
            applicationCategory: "EducationalApplication",
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title="Density & Mass Calculator"
          whatIsIt={
            <>
              <p>
                Our <strong>Density Calculator</strong> determines the
                volumetric mass concentration of any substance. Using standard
                metric conversions, it allows you to dynamically solve for the
                Density (ρ), physical Mass (m), or total occupied Volume (V) of
                an object.
              </p>
              <p>
                Density explains why a heavy bowling ball sinks instantly, while
                a massive 300-ton steel cruise ship magically floats. It proves
                that weight alone does not dictate buoyancy; what matters is how
                tightly packed those molecules are over a specific physical
                space.
              </p>
            </>
          }
          formula={
            <>
              <p>
                The standard formula for density is universally taught in
                introductory physics: Density equals mass divided by volume.
              </p>
              <div className="bg-cyan-50 p-4 rounded-lg font-mono text-center text-[15px] shadow-sm my-4 flex flex-col gap-2 border border-cyan-100 text-cyan-900">
                <p>
                  <strong>Density (ρ) = m ÷ V</strong>
                </p>
                <p className="mt-2 pt-2 border-t border-cyan-200">
                  <strong>Mass (m) = ρ × V</strong>
                </p>
                <p className="mt-2 pt-2 border-t border-cyan-200">
                  <strong>Volume (V) = m ÷ ρ</strong>
                </p>
              </div>
            </>
          }
          example={
            <>
              <p>
                Let's calculate the density of a mysterious gold-colored block
                to determine if it is real gold or a cheap fake.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                <li>
                  <strong>The Scenario:</strong> You weigh a shiny rectangular
                  block and find its Mass is exactly <strong>500 grams</strong>.
                  You measure its dimensions and find its Volume is exactly{" "}
                  <strong>61.5 cubic centimeters (cm³)</strong>.
                </li>
                <li>
                  <strong>The Calculation:</strong> 500g ÷ 61.5cm³ ={" "}
                  <strong>8.13</strong>.
                </li>
                <li>
                  <strong>Result:</strong> The density of the block is{" "}
                  <strong>8.13 g/cm³</strong>. (Note: Because true Solid Gold
                  has a universally known density of 19.3 g/cm³, you can easily
                  prove this block is a cheap brass fake).
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-gray-700">
              <li>
                <strong>Civil Engineering:</strong> Architects must calculate
                the exact physical mass of massive concrete support pillars
                based entirely on their blueprint volume. If they misuse density
                values, they might accidentally construct a bridge that is too
                heavy to support its own structural weight.
              </li>
              <li>
                <strong>Aviation Fueling:</strong> Airplane fuel gauges actually
                measure volume (gallons), not weight. Because jet fuel expands
                and becomes less dense in the hot daytime sun, pilots must
                calculate density conversions to ensure they have the physical
                mass of fuel required to complete a transatlantic flight.
              </li>
              <li>
                <strong>Plastics & Manufacturing:</strong> Material scientists
                utilize density metrics to engineer plastics that are light
                enough to be buoyant, yet physically massive enough to withstand
                oceanic drilling pressures.
              </li>
            </ul>
          }
          faqs={[
            {
              question: "What is the density of pure water?",
              answer:
                "Under standard conditions, pure water has a remarkably convenient density of exactly 1,000 kg/m³, which directly converts to exactly 1.0 g/cm³. This beautiful 1-to-1 ratio was an intentional design of the original metric system.",
            },
            {
              question: "How does density dictate if something floats?",
              answer:
                "It is the principle of specific gravity. If an object's density is mathematically lower than 1.0 g/cm³ (water), it will float. If it is higher than 1.0, it will sink. Dry wood is around 0.6 g/cm³ (floats), while solid lead is 11.3 g/cm³ (sinks aggressively).",
            },
            {
              question: "Why do massive cruise ships float if steel sinks?",
              answer:
                "Because density is based on total displaced volume. A cruise ship is mostly hollow inside (air). If you average the density of the heavy exterior steel hull with the massive volume of incredibly light interior air, the ship's overall mathematical density drops below 1.0 g/cm³, allowing it to sit safely on top of the ocean.",
            },
          ]}
          relatedCalculators={[
            {
              name: "Volume Calculator",
              path: "/volume-calculator",
              desc: "Calculate complex 3D spherical and conical volumes before determining density.",
            },
            {
              name: "Force Calculator",
              path: "/force-calculator",
              desc: "Plug your resulting mass directly into Newton's Second Law.",
            },
            {
              name: "Weight Converter",
              path: "/weight-converter",
              desc: "Instantly translate international mass and weight limits.",
            },
          ]}
        />
      </div>
    </div>
  );
}
