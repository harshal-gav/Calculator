"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import heartRateSeoData from "@/data/seo-content/official/heart-rate-calculator.json";

export default function TargetHeartRateCalculator() {
  const [age, setAge] = useState("30");
  const [restingHeartRate, setRestingHeartRate] = useState("70");

  const [result, setResult] = useState<{
    maxHeartRate: number;
    zones: {
      name: string;
      desc: string;
      min: number;
      max: number;
      color: string;
    }[];
  } | null>(null);

  const calculateHeartRate = () => {
    const a = parseInt(age);
    const rhr = parseInt(restingHeartRate);

    if (a > 0 && rhr > 0) {
      // Basic estimated Max Heart Rate
      const maxHr = 220 - a;
      // Heart Rate Reserve (HRR) for Karvonen Formula
      const hrr = maxHr - rhr;

      const calcZone = (minPct: number, maxPct: number) => {
        return {
          min: Math.round(rhr + hrr * minPct),
          max: Math.round(rhr + hrr * maxPct),
        };
      };

      const zones = [
        {
          name: "Zone 1: Very Light",
          desc: "Warm up, cool down, active recovery.",
          ...calcZone(0.5, 0.6),
          color: "bg-gray-100 border-gray-300 text-gray-800",
        },
        {
          name: "Zone 2: Light (Fat Burn)",
          desc: "Endurance base building, high fat oxidation.",
          ...calcZone(0.6, 0.7),
          color: "bg-blue-100 border-blue-300 text-blue-900",
        },
        {
          name: "Zone 3: Moderate (Aerobic)",
          desc: "Improves cardiovascular fitness and stamina.",
          ...calcZone(0.7, 0.8),
          color: "bg-green-100 border-green-300 text-green-900",
        },
        {
          name: "Zone 4: Hard (Anaerobic)",
          desc: "Increases lactic acid threshold and raw speed.",
          ...calcZone(0.8, 0.9),
          color: "bg-orange-100 border-orange-300 text-orange-900",
        },
        {
          name: "Zone 5: Maximum (V02 Max)",
          desc: "Peak sprint performance. Very short duration.",
          ...calcZone(0.9, 1.0),
          color: "bg-red-100 border-red-300 text-red-900",
        },
      ];

      setResult({
        maxHeartRate: maxHr,
        zones,
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-gray-900 border-b pb-4">
        Target Heart Rate Calculator
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Find your exact training zones using the advanced Karvonen formula based on your unique resting heart rate.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-4 bg-gray-50 p-6 rounded-xl border border-gray-200">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Your Vitals</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Your Age
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-3 border text-lg font-medium"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Resting Heart Rate (BPM)
              </label>
              <input
                type="number"
                value={restingHeartRate}
                onChange={(e) => setRestingHeartRate(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-3 border text-lg font-medium"
              />
              <p className="text-xs text-gray-500 mt-1">Measure your pulse for 60 seconds first thing in the morning.</p>
            </div>
          </div>

          <button
            onClick={calculateHeartRate}
            className="mt-8 w-full bg-red-600 text-white font-bold py-4 px-4 rounded-xl hover:bg-red-700 transition shadow-lg text-lg uppercase tracking-wide"
          >
            Calculate Zones
          </button>
        </div>

        <div className="lg:col-span-8 bg-white rounded-xl shadow-inner flex flex-col justify-start border border-gray-100 p-2">
          {result !== null ? (
            <div className="p-4">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
                 <h2 className="text-xl font-bold text-gray-800">Your Heart Rate Zones</h2>
                 <div className="text-right">
                    <span className="block text-xs text-gray-500 uppercase font-bold">Estimated Max HR</span>
                    <span className="text-2xl font-black text-red-600">{result.maxHeartRate} BPM</span>
                 </div>
              </div>

              <div className="space-y-3">
                {result.zones.map((zone, idx) => (
                  <div key={idx} className={`p-4 rounded-lg border ${zone.color} flex flex-col md:flex-row justify-between items-center gap-4`}>
                     <div className="flex-1">
                        <h3 className="font-bold text-lg">{zone.name}</h3>
                        <p className="text-sm opacity-80">{zone.desc}</p>
                     </div>
                     <div className="text-2xl font-black bg-white/50 px-4 py-2 rounded-md shadow-sm">
                        {zone.min} - {zone.max} <span className="text-sm font-semibold ml-1">BPM</span>
                     </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
             <div className="text-center text-red-800 opacity-60 font-medium my-auto p-12 bg-red-50 rounded-lg">
                Enter your age and resting heart rate to instantly map out your specific cardio training zones.
             </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title={heartRateSeoData.title}
        whatIsIt={heartRateSeoData.whatIsIt}
        formula={heartRateSeoData.formula}
        example={heartRateSeoData.example}
        useCases={heartRateSeoData.useCases}
        faqs={heartRateSeoData.faqs}
        deepDive={heartRateSeoData.deepDive}
        glossary={heartRateSeoData.glossary}
        relatedCalculators={[
          {
            name: "BMI Calculator",
            path: "/bmi-calculator/",
            desc: "Calculate your Body Mass Index for a quick health assessment.",
          },
          {
            name: "Calorie Calculator",
            path: "/calorie-calculator/",
            desc: "Estimate the number of calories you need to maintain or lose weight.",
          },
          {
            name: "BMR Calculator",
            path: "/bmr-calculator/",
            desc: "Find your Basal Metabolic Rate to understand your calorie needs at rest.",
          },
          {
            name: "Body Fat Calculator",
            path: "/body-fat-calculator/",
            desc: "Beyond the scale metrics.",
          }
        ]}
      />
    </div>
  );
}
