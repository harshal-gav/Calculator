"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

import speedSeoData from "@/data/seo-content/official/speed-calculator.json";

export default function SpeedCalculator() {
  const [distance, setDistance] = useState("100");
  const [time, setTime] = useState("2");
  const [speed, setSpeed] = useState("");

  const [solveFor, setSolveFor] = useState<"speed" | "time" | "distance">("speed");

  const [result, setResult] = useState<{
    solvedValue: number;
    unit: string;
  } | null>(null);

  const calculateVariables = () => {
    const d = parseFloat(distance);
    const t = parseFloat(time);
    const s = parseFloat(speed);

    if (solveFor === "speed") {
      if (!isNaN(d) && !isNaN(t) && t > 0) {
         setResult({ solvedValue: d / t, unit: "mph (or km/h)" });
      } else { setResult(null); }
    } else if (solveFor === "time") {
      if (!isNaN(d) && !isNaN(s) && s > 0) {
         setResult({ solvedValue: d / s, unit: "hours" });
      } else { setResult(null); }
    } else if (solveFor === "distance") {
      if (!isNaN(s) && !isNaN(t)) {
         setResult({ solvedValue: s * t, unit: "miles (or km)" });
      } else { setResult(null); }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-gray-900 border-b pb-4">
        Speed, Distance & Time Calculator
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Input two known kinematic variables to mathematically deduce the absolute missing third parameter.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          
          <div className="space-y-6">
            <div>
               <label className="block text-sm font-semibold text-gray-700 mb-2">
                 1. What are you solving for?
               </label>
               <div className="flex bg-white rounded-lg border border-gray-300 overflow-hidden shadow-sm">
                 <button
                   className={`flex-1 py-3 text-sm font-bold transition ${solveFor === "speed" ? "bg-slate-800 text-white" : "text-gray-600 hover:bg-gray-100"}`}
                   onClick={() => setSolveFor("speed")}
                 >
                   Speed
                 </button>
                 <button
                   className={`flex-1 py-3 text-sm font-bold transition ${solveFor === "time" ? "bg-slate-800 text-white" : "text-gray-600 hover:bg-gray-100 border-l border-gray-300"}`}
                   onClick={() => setSolveFor("time")}
                 >
                   Time
                 </button>
                 <button
                   className={`flex-1 py-3 text-sm font-bold transition ${solveFor === "distance" ? "bg-slate-800 text-white" : "text-gray-600 hover:bg-gray-100 border-l border-gray-300"}`}
                   onClick={() => setSolveFor("distance")}
                 >
                   Distance
                 </button>
               </div>
            </div>

            <div className="bg-white p-4 border border-slate-200 rounded-lg shadow-sm">
                <h2 className="text-sm font-bold mb-3 text-slate-800 uppercase tracking-wider text-center">2. Enter Known Variables</h2>
                
                {solveFor !== "distance" && (
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Total Distance:</label>
                  <input type="number" value={distance} onChange={(e) => setDistance(e.target.value)} className="w-full rounded border-gray-300 p-3 focus:ring-slate-500 shadow-sm" placeholder="e.g. 150 miles" />
                </div>
                )}

                {solveFor !== "time" && (
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Time Elapsed (hours):</label>
                  <input type="number" value={time} onChange={(e) => setTime(e.target.value)} className="w-full rounded border-gray-300 p-3 focus:ring-slate-500 shadow-sm" placeholder="e.g. 2.5 hours" />
                </div>
                )}

                {solveFor !== "speed" && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Average Speed:</label>
                  <input type="number" value={speed} onChange={(e) => setSpeed(e.target.value)} className="w-full rounded border-gray-300 p-3 focus:ring-slate-500 shadow-sm" placeholder="e.g. 60 mph" />
                </div>
                )}
            </div>
          </div>

          <button
            onClick={calculateVariables}
            className="mt-8 w-full bg-slate-800 text-white font-bold py-4 rounded-xl hover:bg-slate-900 transition shadow-lg text-lg uppercase tracking-wide"
          >
            Calculate Missing Variable
          </button>
        </div>

        <div className="bg-slate-50 rounded-xl p-8 border border-slate-200 shadow-inner flex flex-col justify-center items-center">
          {result !== null ? (
            <div className="text-center w-full">
               <div className="text-sm text-slate-500 font-bold uppercase mb-2 tracking-widest">
                  Calculated {solveFor}
               </div>
               
               <div className="text-6xl font-black text-center text-slate-800 mb-2">
                  {result.solvedValue.toFixed(2)}
               </div>
               <div className="text-xl font-bold text-slate-500 tracking-wider">
                  {result.unit}
               </div>

            </div>
          ) : (
             <div className="text-center text-slate-800 opacity-60 font-medium p-8">
                Input your two known elements to calculate the exact kinematic equivalent.
             </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title={speedSeoData.title}
        whatIsIt={speedSeoData.whatIsIt}
        formula={speedSeoData.formula}
        example={speedSeoData.example}
        useCases={speedSeoData.useCases}
        faqs={speedSeoData.faqs}
        deepDive={speedSeoData.deepDive}
        glossary={speedSeoData.glossary}
        relatedCalculators={[
          {
            name: "Fuel Cost Calculator",
            path: "/fuel-cost-calculator/",
            desc: "Estimate exactly how much your trip will cost at current pump prices.",
          },
          {
            name: "Gas Mileage Calculator",
            path: "/gas-mileage-calculator/",
            desc: "Determine your vehicle's actual real-world fuel efficiency.",
          },
          {
            name: "Pace Calculator",
            path: "/pace-calculator/",
            desc: "Calculate running pace or swimming speed for athletic performance.",
          },
          {
            name: "Length Converter",
            path: "/length-converter/",
            desc: "Convert between various units of length and distance.",
          }]}
      />
    </div>
  );
}
