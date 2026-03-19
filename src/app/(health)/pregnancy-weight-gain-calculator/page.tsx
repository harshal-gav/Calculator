"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function PregnancyWeightGainCalculator() {
  const [preWeight, setPreWeight] = useState("150");
  const [heightFeet, setHeightFeet] = useState("5");
  const [heightInches, setHeightInches] = useState("5");
  const [currentWeek, setCurrentWeek] = useState("20");
  const [currentWeight, setCurrentWeight] = useState("160");
  const [twins, setTwins] = useState("no");

  const [result, setResult] = useState<{
    bmi: number;
    category: string;
    recommendedRange: [number, number];
    currentGain: number;
    expectedRange: [number, number];
    status: string;
    statusColor: string;
  } | null>(null);

  const calculate = () => {
    const pw = parseFloat(preWeight) || 0;
    const ft = parseFloat(heightFeet) || 0;
    const inch = parseFloat(heightInches) || 0;
    const week = parseInt(currentWeek) || 0;
    const cw = parseFloat(currentWeight) || 0;
    const isTwins = twins === "yes";

    const totalInches = ft * 12 + inch;
    if (totalInches <= 0 || pw <= 0 || week <= 0) return;

    const bmi = 703 * (pw / (totalInches * totalInches));
    let category = "";
    let totalRange: [number, number] = [0, 0];

    // IOM guidelines (singleton)
    if (bmi < 18.5) {
      category = "Underweight";
      totalRange = isTwins ? [50, 62] : [28, 40];
    } else if (bmi < 25) {
      category = "Normal Weight";
      totalRange = isTwins ? [37, 54] : [25, 35];
    } else if (bmi < 30) {
      category = "Overweight";
      totalRange = isTwins ? [31, 50] : [15, 25];
    } else {
      category = "Obese";
      totalRange = isTwins ? [25, 42] : [11, 20];
    }

    const gain = cw - pw;
    const factor = Math.min(week / 40, 1);
    const expectedLow = totalRange[0] * factor;
    const expectedHigh = totalRange[1] * factor;

    let status = "";
    let statusColor = "";
    if (gain < expectedLow) {
      status = "Below recommended range";
      statusColor = "text-blue-600 bg-blue-50 border-blue-200";
    } else if (gain > expectedHigh) {
      status = "Above recommended range";
      statusColor = "text-orange-600 bg-orange-50 border-orange-200";
    } else {
      status = "Within recommended range ✓";
      statusColor = "text-green-600 bg-green-50 border-green-200";
    }

    setResult({
      bmi,
      category,
      recommendedRange: totalRange,
      currentGain: gain,
      expectedRange: [expectedLow, expectedHigh],
      status,
      statusColor,
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-white rounded-3xl shadow-xl border border-pink-50">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-pink-50 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Pregnancy Weight Gain Calculator</h1>
          <p className="text-slate-500 font-medium mt-1 text-lg">Track your weight gain against IOM guidelines.</p>
        </div>
        <div className="bg-pink-50 px-4 py-2 rounded-full border border-pink-100 shrink-0">
          <span className="text-pink-600 font-bold text-sm uppercase tracking-wider">Pregnancy</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 shadow-inner space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Pre-pregnancy Weight (lbs)</label>
              <input type="number" value={preWeight} onChange={(e) => setPreWeight(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 p-3 border text-lg" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Height (ft)</label>
                <input type="number" value={heightFeet} onChange={(e) => setHeightFeet(e.target.value)}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 p-3 border text-lg" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Height (in)</label>
                <input type="number" value={heightInches} onChange={(e) => setHeightInches(e.target.value)}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 p-3 border text-lg" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Current Week of Pregnancy</label>
              <input type="number" min="1" max="42" value={currentWeek} onChange={(e) => setCurrentWeek(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 p-3 border text-lg" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Current Weight (lbs)</label>
              <input type="number" value={currentWeight} onChange={(e) => setCurrentWeight(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 p-3 border text-lg" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Expecting Twins?</label>
              <select value={twins} onChange={(e) => setTwins(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-pink-500 p-3 border text-lg font-semibold cursor-pointer">
                <option value="no">No (Singleton)</option>
                <option value="yes">Yes (Twins)</option>
              </select>
            </div>
          </div>
          <button onClick={calculate}
            className="w-full bg-pink-600 text-white font-bold py-4 px-4 rounded-xl hover:bg-pink-700 transition shadow-lg text-lg uppercase tracking-wide">
            Check Weight Gain
          </button>
        </div>

        <div className="lg:col-span-7 bg-pink-50 rounded-xl p-8 border border-pink-200 shadow-inner flex flex-col justify-center">
          {result ? (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-pink-900 text-center uppercase tracking-wider">Your Results</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border border-pink-100 text-center">
                  <div className="text-xs text-pink-600 font-bold uppercase mb-1">Pre-Pregnancy BMI</div>
                  <div className="text-2xl font-black text-pink-700">{result.bmi.toFixed(1)}</div>
                  <div className="text-xs text-gray-500">{result.category}</div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-pink-100 text-center">
                  <div className="text-xs text-pink-600 font-bold uppercase mb-1">Current Gain</div>
                  <div className="text-2xl font-black text-pink-700">{result.currentGain.toFixed(1)} lbs</div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-pink-100 text-center col-span-2">
                  <div className="text-xs text-pink-600 font-bold uppercase mb-1">Total Recommended Gain</div>
                  <div className="text-2xl font-black text-pink-700">{result.recommendedRange[0]}–{result.recommendedRange[1]} lbs</div>
                </div>
              </div>
              <div className={`text-center py-4 px-6 rounded-lg border font-bold text-lg ${result.statusColor}`}>
                {result.status}
              </div>
              <div className="bg-white p-4 rounded-xl border border-pink-100 text-center text-sm text-gray-600">
                Expected gain by week {currentWeek}: <strong>{result.expectedRange[0].toFixed(1)}–{result.expectedRange[1].toFixed(1)} lbs</strong>
              </div>
            </div>
          ) : (
            <div className="text-center text-pink-800 opacity-60 font-medium p-8">
              Enter your details to check your pregnancy weight gain status.
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title="Pregnancy Weight Gain Calculator"
        whatIsIt={<p>The <strong>Pregnancy Weight Gain Calculator</strong> tracks your gestational weight gain against the Institute of Medicine (IOM) guidelines, factoring in your pre-pregnancy BMI and whether you&apos;re carrying twins.</p>}
        formula={<><p>Uses IOM 2009 guidelines based on pre-pregnancy BMI category:</p><ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700"><li><strong>Underweight (BMI &lt; 18.5):</strong> 28–40 lbs</li><li><strong>Normal (BMI 18.5–24.9):</strong> 25–35 lbs</li><li><strong>Overweight (BMI 25–29.9):</strong> 15–25 lbs</li><li><strong>Obese (BMI ≥ 30):</strong> 11–20 lbs</li></ul></>}
        example={<><p>A woman at 150 lbs, 5&apos;5&quot;, at week 20 currently weighing 160 lbs:</p><ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700"><li>Pre-pregnancy BMI: ~25.0 (Normal Weight)</li><li>Current gain: 10 lbs</li><li>Expected range at week 20: 12.5–17.5 lbs</li><li>Status: Below recommended range</li></ul></>}
        useCases={<ul className="list-disc pl-6 space-y-4"><li><strong>Prenatal Monitoring:</strong> Track weight gain to ensure a healthy pregnancy.</li><li><strong>Twin Pregnancies:</strong> Adjusted recommendations for multiple births.</li></ul>}
        faqs={[
          { question: "How accurate is this calculator?", answer: "Based on IOM 2009 guidelines. Always consult your OB-GYN for personalized advice." },
          { question: "Is this tool free to use?", answer: "Yes, all our calculators are 100% free to use." },
        ]}
        relatedCalculators={[
          { name: "Pregnancy Calculator", path: "/pregnancy-calculator/", desc: "Calculate your estimated due date." },
          { name: "Due Date Calculator", path: "/due-date-calculator/", desc: "Calculate your baby due date and timeline." },
          { name: "BMI Calculator", path: "/bmi-calculator/", desc: "Calculate your Body Mass Index." },
          { name: "Calorie Calculator", path: "/calorie-calculator/", desc: "Estimate daily energy requirements." },
        ]}
      />
    </div>
  );
}
