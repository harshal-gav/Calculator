"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function ArmyBodyFatCalculator() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [unitSystem, setUnitSystem] = useState<"imperial" | "metric">("imperial");

  // Imperial inputs
  const [heightInches, setHeightInches] = useState("70");
  const [neckInches, setNeckInches] = useState("14");
  const [waistInches, setWaistInches] = useState("32");
  const [hipInches, setHipInches] = useState<string>("");

  // Metric inputs
  const [heightCm, setHeightCm] = useState("178");
  const [neckCm, setNeckCm] = useState("36");
  const [waistCm, setWaistCm] = useState("81");
  const [hipCm, setHipCm] = useState<string>("");

  const [result, setResult] = useState<{
    bodyFat: number;
    category: string;
    color: string;
  } | null>(null);

  const calculateBodyFat = () => {
    let bodyFatPercent = 0;

    if (gender === "male") {
      if (unitSystem === "imperial") {
        const height = parseFloat(heightInches) || 0;
        const neck = parseFloat(neckInches) || 0;
        const waist = parseFloat(waistInches) || 0;

        if (height > 0 && neck > 0 && waist > 0) {
          // Male formula: 86.010 × log10(waist - neck) - 70.041 × log10(height) + 36.76
          bodyFatPercent =
            86.010 * Math.log10(waist - neck) -
            70.041 * Math.log10(height) +
            36.76;
        }
      } else {
        const height = parseFloat(heightCm) || 0;
        const neck = parseFloat(neckCm) || 0;
        const waist = parseFloat(waistCm) || 0;

        if (height > 0 && neck > 0 && waist > 0) {
          // Convert to inches for formula: height/2.54, neck/2.54, waist/2.54
          const heightIn = height / 2.54;
          const neckIn = neck / 2.54;
          const waistIn = waist / 2.54;
          bodyFatPercent =
            86.010 * Math.log10(waistIn - neckIn) -
            70.041 * Math.log10(heightIn) +
            36.76;
        }
      }
    } else {
      if (unitSystem === "imperial") {
        const height = parseFloat(heightInches) || 0;
        const neck = parseFloat(neckInches) || 0;
        const waist = parseFloat(waistInches) || 0;
        const hip = parseFloat(hipInches) || 0;

        if (height > 0 && neck > 0 && waist > 0 && hip > 0) {
          // Female formula: 163.205 × log10(waist + hip - neck) - 97.684 × log10(height) - 78.387
          bodyFatPercent =
            163.205 * Math.log10(waist + hip - neck) -
            97.684 * Math.log10(height) -
            78.387;
        }
      } else {
        const height = parseFloat(heightCm) || 0;
        const neck = parseFloat(neckCm) || 0;
        const waist = parseFloat(waistCm) || 0;
        const hip = parseFloat(hipCm) || 0;

        if (height > 0 && neck > 0 && waist > 0 && hip > 0) {
          // Convert to inches for formula
          const heightIn = height / 2.54;
          const neckIn = neck / 2.54;
          const waistIn = waist / 2.54;
          const hipIn = hip / 2.54;
          bodyFatPercent =
            163.205 * Math.log10(waistIn + hipIn - neckIn) -
            97.684 * Math.log10(heightIn) -
            78.387;
        }
      }
    }

    if (bodyFatPercent > 0) {
      let category = "";
      let color = "";

      if (gender === "male") {
        if (bodyFatPercent < 6) {
          category = "Essential Fat";
          color = "text-blue-600 border-blue-200 bg-blue-50";
        } else if (bodyFatPercent < 14) {
          category = "Athletes";
          color = "text-cyan-600 border-cyan-200 bg-cyan-50";
        } else if (bodyFatPercent < 18) {
          category = "Fitness";
          color = "text-green-600 border-green-200 bg-green-50";
        } else if (bodyFatPercent < 25) {
          category = "Average";
          color = "text-yellow-600 border-yellow-200 bg-yellow-50";
        } else {
          category = "Obese";
          color = "text-red-600 border-red-200 bg-red-50";
        }
      } else {
        if (bodyFatPercent < 14) {
          category = "Essential Fat";
          color = "text-blue-600 border-blue-200 bg-blue-50";
        } else if (bodyFatPercent < 21) {
          category = "Athletes";
          color = "text-cyan-600 border-cyan-200 bg-cyan-50";
        } else if (bodyFatPercent < 25) {
          category = "Fitness";
          color = "text-green-600 border-green-200 bg-green-50";
        } else if (bodyFatPercent < 32) {
          category = "Average";
          color = "text-yellow-600 border-yellow-200 bg-yellow-50";
        } else {
          category = "Obese";
          color = "text-red-600 border-red-200 bg-red-50";
        }
      }

      setResult({
        bodyFat: bodyFatPercent,
        category,
        color,
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-white rounded-3xl shadow-xl border border-teal-50">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-teal-50 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Army Body Fat Calculator</h1>
          <p className="text-slate-500 font-medium mt-1 text-lg">Calculate body fat percentage using the DOD formula.</p>
        </div>
        <div className="bg-teal-50 px-4 py-2 rounded-full border border-teal-100 shrink-0">
          <span className="text-teal-600 font-bold text-sm uppercase tracking-wider">Fitness Metric</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 shadow-inner space-y-6">
            <div className="flex flex-col gap-3">
              <label className="block text-sm font-semibold text-gray-700">Gender</label>
              <div className="flex gap-2">
                <button
                  className={`flex-1 py-2 text-sm font-bold rounded-lg transition ${gender === "male" ? "bg-teal-600 text-white" : "bg-white text-gray-700 border border-gray-300 hover:border-gray-400"}`}
                  onClick={() => setGender("male")}
                >
                  Male
                </button>
                <button
                  className={`flex-1 py-2 text-sm font-bold rounded-lg transition ${gender === "female" ? "bg-teal-600 text-white" : "bg-white text-gray-700 border border-gray-300 hover:border-gray-400"}`}
                  onClick={() => setGender("female")}
                >
                  Female
                </button>
              </div>
            </div>

            <div className="flex p-1 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <button
                className={`flex-1 py-3 text-sm font-bold transition-all ${unitSystem === "imperial" ? "bg-teal-600 text-white" : "text-slate-400 hover:text-slate-600"}`}
                onClick={() => setUnitSystem("imperial")}
              >
                Imperial (in)
              </button>
              <button
                className={`flex-1 py-3 text-sm font-bold transition ${unitSystem === "metric" ? "bg-teal-600 text-white" : "text-gray-600 hover:bg-gray-100 border-l border-gray-300"}`}
                onClick={() => setUnitSystem("metric")}
              >
                Metric (cm)
              </button>
            </div>

            {unitSystem === "imperial" ? (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Height (inches)</label>
                  <input
                    type="number"
                    value={heightInches}
                    onChange={(e) => setHeightInches(e.target.value)}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 p-3 border text-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Neck (inches)</label>
                  <input
                    type="number"
                    value={neckInches}
                    onChange={(e) => setNeckInches(e.target.value)}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 p-3 border text-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Waist (inches)</label>
                  <input
                    type="number"
                    value={waistInches}
                    onChange={(e) => setWaistInches(e.target.value)}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 p-3 border text-lg"
                  />
                </div>
                {gender === "female" && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Hip (inches)</label>
                    <input
                      type="number"
                      value={hipInches}
                      onChange={(e) => setHipInches(e.target.value)}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 p-3 border text-lg"
                    />
                  </div>
                )}
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Height (cm)</label>
                  <input
                    type="number"
                    value={heightCm}
                    onChange={(e) => setHeightCm(e.target.value)}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 p-3 border text-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Neck (cm)</label>
                  <input
                    type="number"
                    value={neckCm}
                    onChange={(e) => setNeckCm(e.target.value)}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 p-3 border text-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Waist (cm)</label>
                  <input
                    type="number"
                    value={waistCm}
                    onChange={(e) => setWaistCm(e.target.value)}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 p-3 border text-lg"
                  />
                </div>
                {gender === "female" && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Hip (cm)</label>
                    <input
                      type="number"
                      value={hipCm}
                      onChange={(e) => setHipCm(e.target.value)}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 p-3 border text-lg"
                    />
                  </div>
                )}
              </>
            )}
          </div>

          <button
            onClick={calculateBodyFat}
            className="mt-8 w-full bg-teal-600 text-white font-bold py-4 px-4 rounded-xl hover:bg-teal-700 transition shadow-lg text-lg uppercase tracking-wide"
          >
            Calculate Body Fat
          </button>
        </div>

        <div className="lg:col-span-7 bg-teal-50 rounded-xl p-8 border border-teal-200 shadow-inner flex flex-col justify-center">
          {result !== null ? (
            <div>
              <h2 className="text-lg font-bold text-teal-900 mb-2 text-center uppercase tracking-wider">
                Your Body Fat Percentage
              </h2>
              <div className="text-6xl md:text-7xl font-black text-center text-teal-700 mb-6 pb-6 border-b border-teal-200">
                {result.bodyFat.toFixed(1)}%
              </div>

              <div className={`text-center py-4 px-6 rounded-lg border border-opacity-50 font-bold text-xl md:text-2xl ${result.color}`}>
                {result.category}
              </div>
            </div>
          ) : (
            <div className="text-center text-teal-800 opacity-60 font-medium p-8">
              Enter your measurements to calculate body fat percentage.
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title="Army Body Fat Calculator"
        whatIsIt={
          <>
            <p>
              The <strong>Army Body Fat Calculator</strong> uses the U.S. Department of Defense (DOD) formula to estimate body fat percentage based on body measurements. This method is widely used in military fitness assessments and provides an accurate alternative to underwater weighing for most individuals.
            </p>
          </>
        }
        formula={
          <>
            <p>The calculator uses gender-specific logarithmic formulas:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
              <li><strong>Males:</strong> 86.010 × log₁₀(Waist - Neck) - 70.041 × log₁₀(Height) + 36.76</li>
              <li><strong>Females:</strong> 163.205 × log₁₀(Waist + Hip - Neck) - 97.684 × log₁₀(Height) - 78.387</li>
            </ul>
            <p className="mt-4"><em>All measurements in inches; height precision is critical for accuracy.</em></p>
          </>
        }
        example={
          <>
            <p>For a male who is 70 inches tall with a 14-inch neck and 32-inch waist:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
              <li>Waist - Neck = 32 - 14 = 18</li>
              <li>log₁₀(18) ≈ 1.255</li>
              <li>86.010 × 1.255 ≈ 107.94</li>
              <li>log₁₀(70) ≈ 1.845</li>
              <li>70.041 × 1.845 ≈ 129.23</li>
              <li>107.94 - 129.23 + 36.76 = <strong>15.47% body fat</strong></li>
            </ul>
          </>
        }
        useCases={
          <ul className="list-disc pl-6 space-y-4">
            <li><strong>Military Fitness:</strong> Used for official U.S. Armed Forces body fat assessments.</li>
            <li><strong>Fitness Tracking:</strong> Monitor body composition changes during training programs.</li>
            <li><strong>Health Assessment:</strong> Identify health risks associated with high body fat percentages.</li>
            <li><strong>Athletic Performance:</strong> Optimize weight and body composition for specific sports.</li>
          </ul>
        }
        faqs={[
          {
            question: "How accurate is the Army body fat formula compared to other methods?",
            answer: "The Army formula typically has an accuracy within ±3-4% of hydrostatic (underwater) weighing, making it quite reliable. However, it may be less accurate for extremely muscular individuals (overestimates) or those with very low body fat (underestimates).",
          },
          {
            question: "Why are neck and hip measurements included?",
            answer: "The neck measurement represents lean muscle mass (typically has less fat), while waist circumference represents fat distribution. These measurements combined provide a more accurate estimate than weight and height alone.",
          },
          {
            question: "How often should I measure my body fat percentage?",
            answer: "Measure every 4-6 weeks during fitness programs to track meaningful changes. More frequent measurements may not show significant differences and can be discouraging.",
          },
        ]}
        relatedCalculators={[
          { name: "BMI Calculator", path: "/bmi-calculator", desc: "Check your Body Mass Index using height and weight" },
          { name: "Body Fat Calculator", path: "/body-fat-calculator", desc: "Estimate body fat using multiple methods" },
          { name: "TDEE Calculator", path: "/tdee-calculator", desc: "Calculate daily calorie expenditure" },
          { name: "Macro Calculator", path: "/macro-calculator", desc: "Calculate macronutrient needs" },
        ]}
      />
    </div>
  );
}
