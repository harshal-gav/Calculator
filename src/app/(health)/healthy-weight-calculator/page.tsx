"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function HealthyWeightCalculator() {
  const [unitSystem, setUnitSystem] = useState<"imperial" | "metric">("imperial");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [heightFeet, setHeightFeet] = useState("5");
  const [heightInches, setHeightInches] = useState("10");
  const [heightCm, setHeightCm] = useState("178");

  const [result, setResult] = useState<{
    devineMinLbs: number;
    devineMaxLbs: number;
    robinsonLbs: number;
    millerLbs: number;
    hamwiLbs: number;
  } | null>(null);

  const calculateWeight = () => {
    let cm = 0;
    if (unitSystem === "imperial") {
      const ft = parseFloat(heightFeet) || 0;
      const inch = parseFloat(heightInches) || 0;
      cm = (ft * 12 + inch) * 2.54;
    } else {
      cm = parseFloat(heightCm) || 0;
    }

    if (cm > 0) {
      // Calculate inches over 5 feet (152.4 cm)
      const inchesOver5Ft = Math.max(0, (cm - 152.4) / 2.54);
      
      let devineKg = 0;
      let robinsonKg = 0;
      let millerKg = 0;
      let hamwiKg = 0;

      if (gender === "male") {
        devineKg = 50.0 + 2.3 * inchesOver5Ft;
        robinsonKg = 52.0 + 1.9 * inchesOver5Ft;
        millerKg = 56.2 + 1.41 * inchesOver5Ft;
        hamwiKg = 48.0 + 2.7 * inchesOver5Ft;
      } else {
        devineKg = 45.5 + 2.3 * inchesOver5Ft;
        robinsonKg = 49.0 + 1.7 * inchesOver5Ft;
        millerKg = 53.1 + 1.36 * inchesOver5Ft;
        hamwiKg = 45.5 + 2.2 * inchesOver5Ft;
      }

      const kgToLbs = 2.20462;
      const devineLbs = devineKg * kgToLbs;

      setResult({
        devineMinLbs: devineLbs * 0.9, // +/- 10% healthy range based on Devine
        devineMaxLbs: devineLbs * 1.1,
        robinsonLbs: robinsonKg * kgToLbs,
        millerLbs: millerKg * kgToLbs,
        hamwiLbs: hamwiKg * kgToLbs,
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-gray-900 border-b pb-4">
        Healthy Weight Calculator
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Discover your scientifically recognized Ideal Body Weight (IBW) based on multiple clinical formulas.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-5 bg-gray-50 p-6 rounded-xl border border-gray-200">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Your Metrics</h2>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={unitSystem === "imperial"}
                  onChange={() => setUnitSystem("imperial")}
                  className="w-5 h-5 text-green-600"
                />
                <span className="font-semibold text-gray-700">Imperial (ft/in)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={unitSystem === "metric"}
                  onChange={() => setUnitSystem("metric")}
                  className="w-5 h-5 text-green-600"
                />
                <span className="font-semibold text-gray-700">Metric (cm)</span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Biological Gender
              </label>
              <div className="flex gap-4">
                <button
                  className={`flex-1 py-3 rounded-lg font-bold transition ${gender === "male" ? "bg-blue-600 text-white" : "bg-white text-gray-600 border border-gray-300"}`}
                  onClick={() => setGender("male")}
                >
                  Male
                </button>
                <button
                  className={`flex-1 py-3 rounded-lg font-bold transition ${gender === "female" ? "bg-pink-600 text-white" : "bg-white text-gray-600 border border-gray-300"}`}
                  onClick={() => setGender("female")}
                >
                  Female
                </button>
              </div>
            </div>

            {unitSystem === "imperial" ? (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Feet</label>
                  <input
                    type="number"
                    value={heightFeet}
                    onChange={(e) => setHeightFeet(e.target.value)}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-3 border text-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Inches</label>
                  <input
                    type="number"
                    value={heightInches}
                    onChange={(e) => setHeightInches(e.target.value)}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-3 border text-lg"
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Height (cm)</label>
                <input
                  type="number"
                  value={heightCm}
                  onChange={(e) => setHeightCm(e.target.value)}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-3 border text-lg"
                />
              </div>
            )}
          </div>

          <button
            onClick={calculateWeight}
            className="mt-8 w-full bg-green-600 text-white font-bold py-4 px-4 rounded-xl hover:bg-green-700 transition shadow-lg text-lg uppercase tracking-wide"
          >
            Calculate Ideal Weight
          </button>
        </div>

        <div className="lg:col-span-7 bg-green-50 rounded-xl p-8 border border-green-200 shadow-inner flex flex-col justify-center">
          {result !== null ? (
            <div>
              <h2 className="text-lg font-bold text-green-900 mb-2 text-center uppercase tracking-wider">
                Healthy Weight Range
              </h2>
              <div className="text-4xl md:text-5xl font-black text-center text-green-700 mb-6 pb-6 border-b border-green-200">
                {result.devineMinLbs.toFixed(1)} - {result.devineMaxLbs.toFixed(1)} lbs
              </div>
              
              <p className="text-sm text-center text-gray-600 mb-6 italic">
                *(Roughly {(result.devineMinLbs / 2.20462).toFixed(1)} - {(result.devineMaxLbs / 2.20462).toFixed(1)} kg) based on the Devine Formula +/- 10%
              </p>

              <h3 className="font-bold text-gray-800 mb-3">Other Clinical Estimates:</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center bg-white p-3 rounded-lg border border-green-100">
                  <span className="text-gray-600 font-semibold">Devine Formula (1974):</span>
                  <span className="font-bold text-gray-800">
                    {((result.devineMinLbs + result.devineMaxLbs)/2).toFixed(1)} lbs
                  </span>
                </div>
                <div className="flex justify-between items-center bg-white p-3 rounded-lg border border-green-100">
                  <span className="text-gray-600 font-semibold">Robinson Formula (1983):</span>
                  <span className="font-bold text-gray-800">
                    {result.robinsonLbs.toFixed(1)} lbs
                  </span>
                </div>
                <div className="flex justify-between items-center bg-white p-3 rounded-lg border border-green-100">
                  <span className="text-gray-600 font-semibold">Miller Formula (1983):</span>
                  <span className="font-bold text-gray-800">
                    {result.millerLbs.toFixed(1)} lbs
                  </span>
                </div>
                <div className="flex justify-between items-center bg-white p-3 rounded-lg border border-green-100">
                  <span className="text-gray-600 font-semibold">Hamwi Formula (1964):</span>
                  <span className="font-bold text-gray-800">
                    {result.hamwiLbs.toFixed(1)} lbs
                  </span>
                </div>
              </div>
            </div>
          ) : (
             <div className="text-center text-green-800 opacity-60 font-medium p-4">
                Enter your height to find your clinically recommended ideal body weight range.
             </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title="Healthy Weight Calculator"
        whatIsIt={
          <>
            <p>
              A <strong>Healthy Weight Calculator</strong> uses established medical formulas to estimate your Ideal Body Weight (IBW). Rather than relying on simple BMI, these formulas use specific metrics based on gender and height to calculate the exact mass where your body functions most efficiently.
            </p>
          </>
        }
        formula={
          <>
            <p>The most widely used clinical method is the <strong>Devine Formula (1974)</strong>:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
              <li><strong>Men:</strong> 50.0 kg + 2.3 kg per inch over 5 feet</li>
              <li><strong>Women:</strong> 45.5 kg + 2.3 kg per inch over 5 feet</li>
            </ul>
            <p className="mt-4 text-gray-700">Because body frames (bone density, muscle mass) vary, a +/- 10% range is universally applied to the base formula to create the "Healthy Weight Range".</p>
          </>
        }
        example={
          <>
            <p>If you are a 5'10" Male:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
              <li>You are 10 inches over 5 feet.</li>
              <li>(10 * 2.3 kg) = 23 kg.</li>
              <li>50kg + 23kg = 73 kg (roughly 160.9 lbs).</li>
              <li>Your healthy range is approximately 144 to 177 lbs.</li>
            </ul>
          </>
        }
        useCases={
          <ul className="list-disc pl-6 space-y-4">
            <li><strong>Medical Dosing:</strong> Doctors literally use the Devine formula to calculate the exact dosage of anesthetics and life-saving medications.</li>
            <li><strong>Goal Setting:</strong> Establishing a scientifically accurate goal weight for a healthy diet, rather than an arbitrary number.</li>
          </ul>
        }
        faqs={[
          {
            question: "Why does gender matter for healthy weight?",
            answer: "Biological males inherently carry heavier bone density and larger average muscle mass per inch of height than biological females, altering the base weight calculations."
          },
          {
            question: "Is this better than a BMI Calculator?",
            answer: "Yes and No. BMI is a population-level statistical tool that often fails heavily muscled individuals. IBW formulas are more tailored to height specifically, but still do not actively measure your current body fat percentage."
          }
        ]}
        relatedCalculators={[]}
      />
    </div>
  );
}
