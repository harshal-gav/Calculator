"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import bmiSeoData from "@/data/seo-content/official/bmi-calculator.json";

export default function BmiCalculator() {
  const [unitSystem, setUnitSystem] = useState<"imperial" | "metric">("imperial");
  const [heightFeet, setHeightFeet] = useState("5");
  const [heightInches, setHeightInches] = useState("10");
  const [weightLbs, setWeightLbs] = useState("160");
  
  const [heightCm, setHeightCm] = useState("178");
  const [weightKg, setWeightKg] = useState("72.5");

  const [result, setResult] = useState<{
    bmi: number;
    category: string;
    color: string;
    minHealthyWeightDesc: string;
    maxHealthyWeightDesc: string;
  } | null>(null);

  const calculateBmi = () => {
    let bmiValue = 0;
    let minHealthyWeight = 0;
    let maxHealthyWeight = 0;
    let isMetric = unitSystem === "metric";

    if (!isMetric) {
      const ft = parseFloat(heightFeet) || 0;
      const inch = parseFloat(heightInches) || 0;
      const lbs = parseFloat(weightLbs) || 0;
      
      const totalInches = (ft * 12) + inch;
      
      if (totalInches > 0 && lbs > 0) {
        // Imperial BMI formula: 703 * (lbs / inches^2)
        bmiValue = 703 * (lbs / (totalInches * totalInches));
        
        // Healthy BMI range is 18.5 to 24.9
        // Weight = BMI * (inches^2) / 703
        minHealthyWeight = 18.5 * (totalInches * totalInches) / 703;
        maxHealthyWeight = 24.9 * (totalInches * totalInches) / 703;
      }
    } else {
      const cm = parseFloat(heightCm) || 0;
      const kg = parseFloat(weightKg) || 0;
      const meters = cm / 100;
      
      if (meters > 0 && kg > 0) {
        // Metric BMI formula: kg / m^2
        bmiValue = kg / (meters * meters);
        
        minHealthyWeight = 18.5 * (meters * meters);
        maxHealthyWeight = 24.9 * (meters * meters);
      }
    }

    if (bmiValue > 0) {
      let category = "";
      let color = "";
      
      if (bmiValue < 18.5) {
        category = "Underweight";
        color = "text-blue-500 border-blue-200 bg-blue-50";
      } else if (bmiValue < 25) {
        category = "Normal Weight";
        color = "text-green-600 border-green-200 bg-green-50";
      } else if (bmiValue < 30) {
        category = "Overweight";
        color = "text-yellow-600 border-yellow-200 bg-yellow-50";
      } else if (bmiValue < 35) {
        category = "Obese (Class I)";
        color = "text-orange-500 border-orange-200 bg-orange-50";
      } else if (bmiValue < 40) {
        category = "Obese (Class II)";
        color = "text-red-500 border-red-200 bg-red-50";
      } else {
        category = "Severe Obesity (Class III)";
        color = "text-red-700 border-red-300 bg-red-100";
      }

      setResult({
        bmi: bmiValue,
        category,
        color,
        minHealthyWeightDesc: `${minHealthyWeight.toFixed(1)} ${isMetric ? "kg" : "lbs"}`,
        maxHealthyWeightDesc: `${maxHealthyWeight.toFixed(1)} ${isMetric ? "kg" : "lbs"}`,
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-white rounded-3xl shadow-xl border border-rose-50">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-rose-50 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight text-nowrap">BMI Calculator</h1>
          <p className="text-slate-500 font-medium mt-1 text-lg">Assess your weight status and find your healthy range.</p>
        </div>
        <div className="bg-rose-50 px-4 py-2 rounded-full border border-rose-100 shrink-0">
          <span className="text-rose-600 font-bold text-sm uppercase tracking-wider">Health Metrics</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 shadow-inner space-y-6">
            <div className="flex p-1 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <button
                className={`flex-1 py-3 text-sm font-bold transition-all ${unitSystem === "imperial" ? "bg-rose-500 text-white" : "text-slate-400 hover:text-slate-600"}`}
                onClick={() => setUnitSystem("imperial")}
              >
                Imperial (ft / lbs)
              </button>
              <button
                className={`flex-1 py-3 text-sm font-bold transition ${unitSystem === "metric" ? "bg-indigo-600 text-white" : "text-gray-600 hover:bg-gray-100 border-l border-gray-300"}`}
                onClick={() => setUnitSystem("metric")}
              >
                Metric (cm / kg)
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
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border text-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Inches</label>
                    <input
                      type="number"
                      value={heightInches}
                      onChange={(e) => setHeightInches(e.target.value)}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border text-lg"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Weight (lbs)</label>
                  <input
                    type="number"
                    value={weightLbs}
                    onChange={(e) => setWeightLbs(e.target.value)}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border text-lg"
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
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border text-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Weight (kg)</label>
                  <input
                    type="number"
                    value={weightKg}
                    onChange={(e) => setWeightKg(e.target.value)}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border text-lg"
                  />
                </div>
              </>
            )}
          </div>

          <button
            onClick={calculateBmi}
            className="mt-8 w-full bg-indigo-600 text-white font-bold py-4 px-4 rounded-xl hover:bg-indigo-700 transition shadow-lg text-lg uppercase tracking-wide"
          >
            Calculate BMI
          </button>
        </div>

        <div className="lg:col-span-7 bg-indigo-50 rounded-xl p-8 border border-indigo-200 shadow-inner flex flex-col justify-center">
          {result !== null ? (
            <div>
              <h2 className="text-lg font-bold text-indigo-900 mb-2 text-center uppercase tracking-wider">
                Your BMI Score
              </h2>
              <div className="text-6xl md:text-7xl font-black text-center text-indigo-700 mb-6 pb-6 border-b border-indigo-200">
                {result.bmi.toFixed(1)}
              </div>
              
              <div className={`text-center py-4 px-6 rounded-lg border border-opacity-50 font-bold text-xl md:text-2xl mb-6 ${result.color}`}>
                {result.category}
              </div>

              <div className="bg-white p-5 rounded-xl border border-indigo-100 shadow-sm">
                 <h3 className="font-bold text-gray-800 mb-3 text-center">Your Healthy Weight Range</h3>
                 <p className="text-center text-gray-600 mb-2">Based on a healthy BMI of 18.5 - 24.9:</p>
                 <div className="text-2xl font-black text-center text-indigo-600">
                    {result.minHealthyWeightDesc} - {result.maxHealthyWeightDesc}
                 </div>
              </div>
            </div>
          ) : (
             <div className="text-center text-indigo-800 opacity-60 font-medium p-8">
                Enter your height and weight to visualize your Body Mass Index ratio.
             </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title={bmiSeoData.title}
        whatIsIt={bmiSeoData.whatIsIt}
        formula={bmiSeoData.formula}
        example={bmiSeoData.example}
        useCases={bmiSeoData.useCases}
        faqs={bmiSeoData.faqs}
        deepDive={bmiSeoData.deepDive}
        glossary={bmiSeoData.glossary}
        relatedCalculators={[
          {
            name: "Calorie Calculator",
            path: "/calorie-calculator/",
            desc: "Estimate the exact number of daily calories required to reach your target BMI through a controlled caloric deficit or surplus.",
          },
          {
            name: "BMR Calculator",
            path: "/bmr-calculator/",
            desc: "Discover your Basal Metabolic Rate—the calories you burn at rest—to better inform your weight management strategy.",
          },
          {
            name: "Body Fat Calculator",
            path: "/body-fat-calculator/",
            desc: "Go beyond BMI by estimating your actual body fat percentage using the Navy Tape method or other anthropometric data.",
          },
          {
            name: "Ideal Weight Calculator",
            path: "/ideal-weight-calculator/",
            desc: "Find the weight range where you are projected to experience the best longevity and health outcomes based on your height.",
          }
        ]}
      />
    </div>
  );
}
