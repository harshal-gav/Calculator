"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function BodyTypeCalculator() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [unitSystem, setUnitSystem] = useState<"imperial" | "metric">("imperial");

  // Imperial inputs
  const [heightFeet, setHeightFeet] = useState("5");
  const [heightInches, setHeightInches] = useState("10");
  const [weightLbs, setWeightLbs] = useState("160");
  const [wristInches, setWristInches] = useState("7");

  // Metric inputs
  const [heightCm, setHeightCm] = useState("178");
  const [weightKg, setWeightKg] = useState("72.5");
  const [wristCm, setWristCm] = useState("18");

  const [result, setResult] = useState<{
    type: string;
    description: string;
    color: string;
    characteristics: string[];
  } | null>(null);

  const calculateBodyType = () => {
    let heightInches_val = 0;
    let weightLbs_val = 0;
    let wristInches_val = 0;

    if (unitSystem === "imperial") {
      const ft = parseFloat(heightFeet) || 0;
      const inch = parseFloat(heightInches) || 0;
      heightInches_val = ft * 12 + inch;
      weightLbs_val = parseFloat(weightLbs) || 0;
      wristInches_val = parseFloat(wristInches) || 0;
    } else {
      heightInches_val = (parseFloat(heightCm) || 0) / 2.54;
      weightLbs_val = (parseFloat(weightKg) || 0) * 2.20462;
      wristInches_val = (parseFloat(wristCm) || 0) / 2.54;
    }

    if (heightInches_val > 0 && weightLbs_val > 0 && wristInches_val > 0) {
      // Calculate body type index using wrist circumference to height ratio
      const wristHeightRatio = wristInches_val / heightInches_val;
      const bmi = (weightLbs_val / (heightInches_val * heightInches_val)) * 703;

      let type = "";
      let description = "";
      let color = "";
      let characteristics: string[] = [];

      let bodyType = "";
      if (gender === "male") {
        if (wristHeightRatio < 0.0955) {
          bodyType = "Ectomorph";
        } else if (wristHeightRatio < 0.11) {
          bodyType = "Mesomorph";
        } else {
          bodyType = "Endomorph";
        }
      } else {
        if (wristHeightRatio < 0.088) {
          bodyType = "Ectomorph";
        } else if (wristHeightRatio < 0.098) {
          bodyType = "Mesomorph";
        } else {
          bodyType = "Endomorph";
        }
      }

      if (bodyType === "Ectomorph") {
        type = "Ectomorph";
        description = "Naturally lean with fast metabolism";
        color = "text-blue-600 border-blue-200 bg-blue-50";
        characteristics = [
          "Thin and long-limbed",
          "Fast metabolism",
          "Difficulty gaining weight",
          "Narrow shoulders",
          "Low body fat naturally",
          "Long, lean muscles",
        ];
      } else if (bodyType === "Mesomorph") {
        type = "Mesomorph";
        description = "Athletic build with balanced metabolism";
        color = "text-green-600 border-green-200 bg-green-50";
        characteristics = [
          "Athletic and muscular naturally",
          "Broad shoulders",
          "Moderate metabolism",
          "Easily gains muscle",
          "Naturally strong",
          "Balanced body proportions",
        ];
      } else {
        type = "Endomorph";
        description = "Naturally rounded with slower metabolism";
        color = "text-orange-600 border-orange-200 bg-orange-50";
        characteristics = [
          "Rounder body shape",
          "Slower metabolism",
          "Gains both muscle and fat easily",
          "Wider midsection",
          "Naturally strong",
          "Higher body fat percentage tendency",
        ];
      }

      setResult({
        type,
        description,
        color,
        characteristics,
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-white rounded-3xl shadow-xl border border-violet-50">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-violet-50 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Body Type Calculator</h1>
          <p className="text-slate-500 font-medium mt-1 text-lg">Discover your somatotype classification.</p>
        </div>
        <div className="bg-violet-50 px-4 py-2 rounded-full border border-violet-100 shrink-0">
          <span className="text-violet-600 font-bold text-sm uppercase tracking-wider">Body Science</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 shadow-inner space-y-6">
            <div className="flex flex-col gap-3">
              <label className="block text-sm font-semibold text-gray-700">Gender</label>
              <div className="flex gap-2">
                <button
                  className={`flex-1 py-2 text-sm font-bold rounded-lg transition ${gender === "male" ? "bg-violet-600 text-white" : "bg-white text-gray-700 border border-gray-300 hover:border-gray-400"}`}
                  onClick={() => setGender("male")}
                >
                  Male
                </button>
                <button
                  className={`flex-1 py-2 text-sm font-bold rounded-lg transition ${gender === "female" ? "bg-violet-600 text-white" : "bg-white text-gray-700 border border-gray-300 hover:border-gray-400"}`}
                  onClick={() => setGender("female")}
                >
                  Female
                </button>
              </div>
            </div>

            <div className="flex p-1 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <button
                className={`flex-1 py-3 text-sm font-bold transition-all ${unitSystem === "imperial" ? "bg-violet-600 text-white" : "text-slate-400 hover:text-slate-600"}`}
                onClick={() => setUnitSystem("imperial")}
              >
                Imperial
              </button>
              <button
                className={`flex-1 py-3 text-sm font-bold transition ${unitSystem === "metric" ? "bg-violet-600 text-white" : "text-gray-600 hover:bg-gray-100 border-l border-gray-300"}`}
                onClick={() => setUnitSystem("metric")}
              >
                Metric
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
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500 p-3 border text-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Inches</label>
                    <input
                      type="number"
                      value={heightInches}
                      onChange={(e) => setHeightInches(e.target.value)}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500 p-3 border text-lg"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Weight (lbs)</label>
                  <input
                    type="number"
                    value={weightLbs}
                    onChange={(e) => setWeightLbs(e.target.value)}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500 p-3 border text-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Wrist Circumference (inches)</label>
                  <input
                    type="number"
                    value={wristInches}
                    onChange={(e) => setWristInches(e.target.value)}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500 p-3 border text-lg"
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
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500 p-3 border text-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Weight (kg)</label>
                  <input
                    type="number"
                    value={weightKg}
                    onChange={(e) => setWeightKg(e.target.value)}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500 p-3 border text-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Wrist Circumference (cm)</label>
                  <input
                    type="number"
                    value={wristCm}
                    onChange={(e) => setWristCm(e.target.value)}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500 p-3 border text-lg"
                  />
                </div>
              </>
            )}
          </div>

          <button
            onClick={calculateBodyType}
            className="mt-8 w-full bg-violet-600 text-white font-bold py-4 px-4 rounded-xl hover:bg-violet-700 transition shadow-lg text-lg uppercase tracking-wide"
          >
            Identify Body Type
          </button>
        </div>

        <div className="lg:col-span-7 bg-violet-50 rounded-xl p-8 border border-violet-200 shadow-inner flex flex-col justify-center">
          {result !== null ? (
            <div>
              <h2 className="text-lg font-bold text-violet-900 mb-2 text-center uppercase tracking-wider">
                Your Body Type
              </h2>
              <div className={`text-center py-6 px-6 rounded-lg border border-opacity-50 font-bold text-3xl md:text-4xl mb-6 ${result.color}`}>
                {result.type}
              </div>
              <p className="text-center text-gray-700 font-semibold mb-6">{result.description}</p>
              <div className="bg-white p-5 rounded-xl border border-violet-100 shadow-sm">
                <h3 className="font-bold text-gray-800 mb-4 text-center">Characteristics:</h3>
                <ul className="space-y-2">
                  {result.characteristics.map((char, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-violet-600 font-bold mt-1">•</span>
                      <span className="text-gray-700">{char}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="text-center text-violet-800 opacity-60 font-medium p-8">
              Enter your measurements to discover your body type.
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title="Body Type Calculator"
        whatIsIt={
          <>
            <p>
              The <strong>Body Type Calculator</strong> uses the Sheldon somatotype classification system to determine whether you are an Ectomorph, Mesomorph, or Endomorph. Your body type is a genetic predisposition that influences how easily you gain or lose weight and muscle.
            </p>
          </>
        }
        formula={
          <>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 font-mono text-lg text-indigo-700 text-center shadow-sm my-6">
              Result = f(Metric, Age, Sex)
            </div>
            <p className="text-sm text-slate-500 text-center">
              Biometric calculation utilizing standardized biological and physiological models for Body Type.
            </p>
          </>
        }
        example={
          <>
            <p>For a male who is 70 inches tall with a 7-inch wrist circumference:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
              <li>Ratio = (7 ÷ 70) × 100 = 10%</li>
              <li>With a ratio of 10%, this classifies as a <strong>Mesomorph</strong></li>
              <li>Mesomorphs naturally build muscle and maintain athletic physiques with proper training</li>
            </ul>
          </>
        }
        useCases={
          <ul className="list-disc pl-6 space-y-4">
            <li><strong>Training Program Design:</strong> Customize workout intensity and nutrition based on body type.</li>
            <li><strong>Nutrition Planning:</strong> Adjust macronutrient ratios for your somatotype.</li>
            <li><strong>Realistic Goal Setting:</strong> Understand genetic predispositions for body composition.</li>
            <li><strong>Fitness Coaching:</strong> Professionals use somatotypes to personalize client programs.</li>
          </ul>
        }
        faqs={[
          {
            question: "Can my body type change?",
            answer: "Your genetic somatotype is relatively fixed, but you can change your body composition through training and nutrition. Someone can build muscle (appear more mesomorphic) or gain fat (appear more endomorphic) despite their genetic tendencies.",
          },
          {
            question: "Are body types scientifically valid?",
            answer: "The Sheldon somatotype system is a useful framework for general body shape classification, though modern sports science recognizes it's not perfectly predictive. It's a useful tool for general guidance rather than precise science.",
          },
          {
            question: "Can I be a combination of body types?",
            answer: "Yes, it's common to have characteristics of multiple types. The classifications represent a spectrum rather than absolute categories. You might be 'meso-endomorph' or 'ecto-mesomorph' with traits from two types.",
          },
        ]}
        relatedCalculators={[
          { name: "BMI Calculator", path: "/bmi-calculator/", desc: "Calculate your Body Mass Index" },
          { name: "Army Body Fat Calculator", path: "/army-body-fat-calculator/", desc: "Measure body fat percentage accurately" },
          { name: "TDEE Calculator", path: "/tdee-calculator/", desc: "Calculate daily calorie needs" },
          { name: "Macro Calculator", path: "/macro-calculator/", desc: "Determine macronutrient distribution" },
        ]}
      />
    </div>
  );
}
