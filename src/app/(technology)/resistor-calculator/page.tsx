"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function ResistorCalculator() {
  const [calculationType, setCalculationType] = useState<"series" | "parallel" | "color">("series");
  const [resistanceInput, setResistanceInput] = useState("100, 220, 330");
  const [colorCode, setColorCode] = useState("brown");
  const [multiplier, setMultiplier] = useState("black");
  const [tolerance, setTolerance] = useState("brown");

  const colorValues: Record<string, number> = {
    black: 0,
    brown: 1,
    red: 2,
    orange: 3,
    yellow: 4,
    green: 5,
    blue: 6,
    violet: 7,
    grey: 8,
    gray: 8,
    white: 9,
  };

  const multiplierValues: Record<string, number> = {
    black: 1,
    brown: 10,
    red: 100,
    orange: 1000,
    yellow: 10000,
    green: 100000,
    blue: 1000000,
    violet: 10000000,
    grey: 100000000,
    gray: 100000000,
    white: 1000000000,
  };

  const toleranceValues: Record<string, string> = {
    brown: "±1%",
    red: "±2%",
    orange: "±3%",
    yellow: "±4%",
    green: "±0.5%",
    blue: "±0.25%",
    violet: "±0.1%",
    grey: "±0.05%",
    gray: "±0.05%",
    gold: "±5%",
    silver: "±10%",
  };

  const [result, setResult] = useState<{
    totalResistance: number;
    unit: string;
    description: string;
    color: string;
    breakdown?: {
      resistances: number[];
      formula: string;
    };
  } | null>(null);

  const calculateResistance = () => {
    if (calculationType === "series") {
      const resistances = resistanceInput
        .split(",")
        .map((r) => parseFloat(r.trim()))
        .filter((r) => !isNaN(r) && r > 0);

      if (resistances.length > 0) {
        const total = resistances.reduce((a, b) => a + b, 0);
        let unit = "Ω";
        let displayValue = total;

        if (total >= 1000000) {
          displayValue = total / 1000000;
          unit = "MΩ";
        } else if (total >= 1000) {
          displayValue = total / 1000;
          unit = "kΩ";
        }

        setResult({
          totalResistance: displayValue,
          unit,
          description: "Series resistors: total resistance equals sum of all resistances",
          color: "text-blue-600 border-blue-200 bg-blue-50",
          breakdown: {
            resistances,
            formula: `R_total = ${resistances.join(" + ")} = ${total}Ω`,
          },
        });
      }
    } else if (calculationType === "parallel") {
      const resistances = resistanceInput
        .split(",")
        .map((r) => parseFloat(r.trim()))
        .filter((r) => !isNaN(r) && r > 0);

      if (resistances.length > 0 && resistances.every((r) => r !== 0)) {
        const reciprocalSum = resistances.reduce((sum, r) => sum + 1 / r, 0);
        const total = 1 / reciprocalSum;

        let unit = "Ω";
        let displayValue = total;

        if (total >= 1000000) {
          displayValue = total / 1000000;
          unit = "MΩ";
        } else if (total >= 1000) {
          displayValue = total / 1000;
          unit = "kΩ";
        }

        setResult({
          totalResistance: displayValue,
          unit,
          description: "Parallel resistors: reciprocal of total equals sum of reciprocals",
          color: "text-green-600 border-green-200 bg-green-50",
          breakdown: {
            resistances,
            formula: `1/R_total = ${resistances.map((r) => `1/${r}`).join(" + ")} = ${(1 / total).toFixed(6)}`,
          },
        });
      }
    } else {
      // Color code calculation
      const firstDigit = colorValues[colorCode.toLowerCase()] || 0;
      const multiplierVal = multiplierValues[multiplier.toLowerCase()] || 1;
      const baseResistance = firstDigit * multiplierVal;

      let unit = "Ω";
      let displayValue = baseResistance;

      if (baseResistance >= 1000000) {
        displayValue = baseResistance / 1000000;
        unit = "MΩ";
      } else if (baseResistance >= 1000) {
        displayValue = baseResistance / 1000;
        unit = "kΩ";
      }

      const tol = toleranceValues[tolerance.toLowerCase()] || "±20%";

      setResult({
        totalResistance: displayValue,
        unit,
        description: `Color Code: ${colorCode.charAt(0).toUpperCase() + colorCode.slice(1)}-${multiplier.charAt(0).toUpperCase() + multiplier.slice(1)}, Tolerance: ${tol}`,
        color: "text-purple-600 border-purple-200 bg-purple-50",
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-white rounded-3xl shadow-xl border border-orange-50">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-orange-50 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Resistor Calculator</h1>
          <p className="text-slate-500 font-medium mt-1 text-lg">Calculate resistance in circuits and color codes.</p>
        </div>
        <div className="bg-orange-50 px-4 py-2 rounded-full border border-orange-100 shrink-0">
          <span className="text-orange-600 font-bold text-sm uppercase tracking-wider">Electronics</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 shadow-inner space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Calculation Type</label>
              <div className="space-y-2">
                <button
                  className={`w-full py-2 px-4 rounded-lg font-semibold transition ${
                    calculationType === "series"
                      ? "bg-orange-600 text-white"
                      : "bg-white text-gray-700 border border-gray-300 hover:border-gray-400"
                  }`}
                  onClick={() => setCalculationType("series")}
                >
                  Series Resistors
                </button>
                <button
                  className={`w-full py-2 px-4 rounded-lg font-semibold transition ${
                    calculationType === "parallel"
                      ? "bg-orange-600 text-white"
                      : "bg-white text-gray-700 border border-gray-300 hover:border-gray-400"
                  }`}
                  onClick={() => setCalculationType("parallel")}
                >
                  Parallel Resistors
                </button>
                <button
                  className={`w-full py-2 px-4 rounded-lg font-semibold transition ${
                    calculationType === "color"
                      ? "bg-orange-600 text-white"
                      : "bg-white text-gray-700 border border-gray-300 hover:border-gray-400"
                  }`}
                  onClick={() => setCalculationType("color")}
                >
                  Color Code
                </button>
              </div>
            </div>

            {calculationType !== "color" && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Resistances (Ω) - comma separated</label>
                <textarea
                  value={resistanceInput}
                  onChange={(e) => setResistanceInput(e.target.value)}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 p-3 border text-lg h-20 font-mono"
                  placeholder="100, 220, 330"
                />
              </div>
            )}

            {calculationType === "color" && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">First Digit (Color)</label>
                  <select
                    value={colorCode}
                    onChange={(e) => setColorCode(e.target.value)}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 p-3 border text-lg"
                  >
                    {Object.keys(colorValues).map((color) => (
                      <option key={color} value={color}>
                        {color.charAt(0).toUpperCase() + color.slice(1)} ({colorValues[color]})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Multiplier (Color)</label>
                  <select
                    value={multiplier}
                    onChange={(e) => setMultiplier(e.target.value)}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 p-3 border text-lg"
                  >
                    {Object.keys(multiplierValues).map((color) => (
                      <option key={color} value={color}>
                        {color.charAt(0).toUpperCase() + color.slice(1)} (×{multiplierValues[color]})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Tolerance (Color)</label>
                  <select
                    value={tolerance}
                    onChange={(e) => setTolerance(e.target.value)}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 p-3 border text-lg"
                  >
                    {Object.keys(toleranceValues).map((color) => (
                      <option key={color} value={color}>
                        {color.charAt(0).toUpperCase() + color.slice(1)} ({toleranceValues[color]})
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}
          </div>

          <button
            onClick={calculateResistance}
            className="mt-8 w-full bg-orange-600 text-white font-bold py-4 px-4 rounded-xl hover:bg-orange-700 transition shadow-lg text-lg uppercase tracking-wide"
          >
            Calculate Resistance
          </button>
        </div>

        <div className="lg:col-span-7 bg-orange-50 rounded-xl p-8 border border-orange-200 shadow-inner flex flex-col justify-center">
          {result !== null ? (
            <div>
              <h2 className="text-lg font-bold text-orange-900 mb-2 text-center uppercase tracking-wider">
                Total Resistance
              </h2>
              <div className="text-6xl md:text-7xl font-black text-center text-orange-700 mb-2">
                {result.totalResistance.toFixed(2)}
              </div>
              <div className="text-3xl font-bold text-center text-orange-600 mb-6 pb-6 border-b border-orange-200">
                {result.unit}
              </div>

              <div className={`text-center py-6 px-6 rounded-lg border border-opacity-50 font-semibold text-lg ${result.color}`}>
                {result.description}
              </div>

              {result.breakdown && (
                <div className="bg-white p-5 rounded-xl border border-orange-100 shadow-sm mt-4">
                  <h3 className="font-bold text-gray-800 mb-3 text-center">Calculation Details</h3>
                  <p className="text-center text-gray-700 font-mono text-sm">{result.breakdown.formula}</p>
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      <strong>Individual:</strong> {result.breakdown.resistances.map((r) => `${r}Ω`).join(", ")}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center text-orange-800 opacity-60 font-medium p-8">
              Enter resistor values to calculate total resistance.
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title="Resistor Calculator"
        whatIsIt={
          <>
            <p>
              The <strong>Resistor Calculator</strong> helps determine total resistance in electrical circuits. It supports series and parallel resistor combinations and decodes resistor color codes used in electronics.
            </p>
          </>
        }
        formula={
          <>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 font-mono text-lg text-indigo-700 text-center shadow-sm my-6">
              Resistor Analysis Model
            </div>
            <p className="text-sm text-slate-500 text-center">
              This tool utilize standardized mathematical formulas and logic to calculate precise Resistor results.
            </p>
          </>
        }
        example={
          <>
            <p>For three resistors in series: 100Ω, 220Ω, and 330Ω:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
              <li>R_total = 100 + 220 + 330 = <strong>650Ω</strong></li>
              <li>Voltage drops across resistors are proportional to their resistance</li>
              <li>Same current flows through all resistors in series</li>
            </ul>
          </>
        }
        useCases={
          <ul className="list-disc pl-6 space-y-4">
            <li><strong>Circuit Design:</strong> Plan and optimize circuit layouts with proper resistance values.</li>
            <li><strong>Electronics Projects:</strong> Build Arduino, Raspberry Pi, and microcontroller projects.</li>
            <li><strong>Troubleshooting:</strong> Verify expected resistance values during circuit testing.</li>
            <li><strong>Education:</strong> Learn Ohm's law and circuit theory fundamentals.</li>
          </ul>
        }
        faqs={[
          {
            question: "Why do resistors have color codes?",
            answer: "Color codes identify resistance values on small components where printing text is impractical. They use a standardized color system (black=0, brown=1, red=2, etc.) allowing quick identification of component values.",
          },
          {
            question: "What's the difference between series and parallel resistor effects?",
            answer: "In series, total resistance increases (good for reducing current). In parallel, total resistance decreases (good for distributing current). Series increases voltage drop; parallel maintains voltage but distributes current.",
          },
          {
            question: "What does resistor tolerance mean?",
            answer: "Tolerance indicates how much a resistor's actual value might differ from its rated value. A ±5% tolerance means the actual resistance could be 5% higher or lower than the color code indicates.",
          },
        ]}
        relatedCalculators={[
          { name: "Ohms Law Calculator", path: "/ohms-law-calculator/", desc: "Calculate voltage, current, and resistance" },
          { name: "Wire Gauge Calculator", path: "/wire-gauge-calculator/", desc: "Determine proper wire sizes" },
          { name: "Capacitor Calculator", path: "/capacitor-calculator/", desc: "Analyze capacitor values and circuits" },
          { name: "Power Calculator", path: "/power-calculator/", desc: "Calculate electrical power and energy" },
        ]}
      />
    </div>
  );
}
