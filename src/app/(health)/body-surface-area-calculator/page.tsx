"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function BodySurfaceAreaCalculator() {
  const [unitSystem, setUnitSystem] = useState<"imperial" | "metric">("metric");
  const [heightFeet, setHeightFeet] = useState("5");
  const [heightInches, setHeightInches] = useState("10");
  const [weightLbs, setWeightLbs] = useState("160");
  const [heightCm, setHeightCm] = useState("178");
  const [weightKg, setWeightKg] = useState("72.5");

  const [result, setResult] = useState<{
    mosteller: number;
    dubois: number;
    haycock: number;
    boyd: number;
  } | null>(null);

  const calculateBsa = () => {
    let cm = 0;
    let kg = 0;

    if (unitSystem === "imperial") {
      const ft = parseFloat(heightFeet) || 0;
      const inch = parseFloat(heightInches) || 0;
      cm = (ft * 12 + inch) * 2.54;
      kg = (parseFloat(weightLbs) || 0) * 0.453592;
    } else {
      cm = parseFloat(heightCm) || 0;
      kg = parseFloat(weightKg) || 0;
    }

    if (cm > 0 && kg > 0) {
      // Mosteller: SQRT((cm * kg) / 3600)
      const mosteller = Math.sqrt((cm * kg) / 3600);
      
      // DuBois: 0.007184 * W^0.425 * H^0.725
      const dubois = 0.007184 * Math.pow(kg, 0.425) * Math.pow(cm, 0.725);
      
      // Haycock: 0.024265 * W^0.5378 * H^0.3964
      const haycock = 0.024265 * Math.pow(kg, 0.5378) * Math.pow(cm, 0.3964);
      
      // Boyd: 0.0003207 * H^0.3 * W^(0.7285 - (0.0188 * log10(W)))  [W in Grams]
      const grams = kg * 1000;
      const boydExp = 0.7285 - (0.0188 * Math.log10(grams));
      const boyd = 0.0003207 * Math.pow(cm, 0.3) * Math.pow(grams, boydExp);

      setResult({
        mosteller,
        dubois,
        haycock,
        boyd
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-gray-900 border-b pb-4">
        Body Surface Area Calculator (BSA)
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Clinically calculate your Total Body Surface Area in square meters (m²) using all major standard medical formulas.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-5 bg-gray-50 p-6 rounded-xl border border-gray-200">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Patient Metrics</h2>
          
          <div className="space-y-6">
            <div className="flex bg-white rounded-lg border border-gray-300 overflow-hidden shadow-sm">
              <button
                className={`flex-1 py-3 text-sm font-bold transition ${unitSystem === "metric" ? "bg-cyan-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}
                onClick={() => setUnitSystem("metric")}
              >
                Metric (cm / kg)
              </button>
              <button
                className={`flex-1 py-3 text-sm font-bold transition ${unitSystem === "imperial" ? "bg-cyan-600 text-white" : "text-gray-600 hover:bg-gray-100 border-l border-gray-300"}`}
                onClick={() => setUnitSystem("imperial")}
              >
                Imperial (ft / lbs)
              </button>
            </div>

            {unitSystem === "imperial" ? (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Feet</label>
                    <input
                      type="number"
                      value={heightFeet}
                      onChange={(e) => setHeightFeet(e.target.value)}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-cyan-500 p-3 border text-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Inches</label>
                    <input
                      type="number"
                      value={heightInches}
                      onChange={(e) => setHeightInches(e.target.value)}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-cyan-500 p-3 border text-lg"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Weight (lbs)</label>
                  <input
                    type="number"
                    value={weightLbs}
                    onChange={(e) => setWeightLbs(e.target.value)}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-cyan-500 p-3 border text-lg"
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Height (cm)</label>
                  <input
                    type="number"
                    value={heightCm}
                    onChange={(e) => setHeightCm(e.target.value)}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-cyan-500 p-3 border text-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Weight (kg)</label>
                  <input
                    type="number"
                    value={weightKg}
                    onChange={(e) => setWeightKg(e.target.value)}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-cyan-500 p-3 border text-lg"
                  />
                </div>
              </>
            )}
          </div>

          <button
            onClick={calculateBsa}
            className="mt-8 w-full bg-cyan-700 text-white font-bold py-4 px-4 rounded-xl hover:bg-cyan-800 transition shadow-lg text-lg uppercase tracking-wide"
          >
            Calculate BSA
          </button>
        </div>

        <div className="lg:col-span-7 bg-cyan-50 rounded-xl p-8 border border-cyan-200 shadow-inner flex flex-col justify-center">
          {result !== null ? (
            <div>
              <h2 className="text-lg font-bold text-cyan-900 mb-2 text-center uppercase tracking-wider">
                Primary BSA (Mosteller)
              </h2>
              <div className="text-5xl md:text-6xl font-black text-center text-cyan-700 mb-6 pb-6 border-b border-cyan-200">
                {result.mosteller.toFixed(3)} <span className="text-3xl text-cyan-500">m²</span>
              </div>
              
              <h3 className="font-bold text-gray-800 mb-3 uppercase text-xs tracking-wider">Comparison to other formulas:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-white p-4 rounded-lg border border-cyan-100 text-center shadow-sm">
                  <div className="text-xs text-gray-500 font-semibold mb-1">DuBois (1916)</div>
                  <div className="text-xl font-bold text-gray-800">{result.dubois.toFixed(3)} m²</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-cyan-100 text-center shadow-sm">
                  <div className="text-xs text-gray-500 font-semibold mb-1">Haycock (1978)</div>
                  <div className="text-xl font-bold text-gray-800">{result.haycock.toFixed(3)} m²</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-cyan-100 text-center shadow-sm">
                  <div className="text-xs text-gray-500 font-semibold mb-1">Boyd (1935)</div>
                  <div className="text-xl font-bold text-gray-800">{result.boyd.toFixed(3)} m²</div>
                </div>
              </div>
            </div>
          ) : (
             <div className="text-center text-cyan-800 opacity-60 font-medium p-8">
                Input patient height and weight securely to extract Body Surface Area measurements.
             </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title="Body Surface Area Calculator"
        whatIsIt={
          <>
            <p>
              A <strong>Body Surface Area (BSA) Calculator</strong> outputs the total surface area of the human body in square meters (m²). 
            </p>
            <p>
              While BMI merely looks at mass, BSA is a far more vital metric used constantly in clinical medicine to calculate safe, precise dosages of high-risk drugs, particularly in oncology (chemotherapy) and pediatrics.
            </p>
          </>
        }
        formula={
          <>
            <p>The global medical standard today is the simple but highly accurate <strong>Mosteller Formula (1987)</strong>:</p>
            <p className="mt-2 pl-4 border-l-4 border-cyan-500 font-mono text-lg bg-gray-50 py-2">
              BSA (m²) = √(Height(cm) × Weight(kg) / 3600)
            </p>
          </>
        }
        example={
          <>
            <p>If a patient is exactly 178 cm tall and weighs 72.5 kg:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
              <li>178 × 72.5 = 12905</li>
              <li>12905 / 3600 = 3.5847</li>
              <li>Square Root of 3.5847 = <strong>1.89 m²</strong></li>
            </ul>
          </>
        }
        useCases={<ul className="list-disc pl-6 space-y-4"><li><strong>Chemotherapy Dosing:</strong> Because drug toxicity relies heavily on volume of distribution, toxic drugs are dosed per square meter (e.g., 50mg/m²) rather than flat milligrams.</li></ul>}
        faqs={[]}
        relatedCalculators={[]}
      />
    </div>
  );
}
