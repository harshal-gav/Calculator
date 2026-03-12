"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function OneRepMaxCalculator() {
  const [weight, setWeight] = useState("185");
  const [reps, setReps] = useState("5");
  const [unit, setUnit] = useState("lbs");

  const w = parseFloat(weight) || 0;
  const r = parseInt(reps) || 0;

  let results: { name: string; value: number }[] = [];
  let isValid = false;

  if (w > 0 && r >= 1 && r <= 36) {
    isValid = true;

    // Epley Formula: 1RM = w × (1 + r/30)
    const epley = r === 1 ? w : w * (1 + r / 30);
    // Brzycki Formula: 1RM = w × 36 / (37 - r)
    const brzycki = r === 1 ? w : w * (36 / (37 - r));
    // Lander Formula: 1RM = 100 × w / (101.3 - 2.67123 × r)
    const lander = r === 1 ? w : (100 * w) / (101.3 - 2.67123 * r);
    // Lombardi: 1RM = w × r^0.10
    const lombardi = w * Math.pow(r, 0.10);
    // Mayhew et al.: 1RM = 100 × w / (52.2 + 41.9 × e^(-0.055 × r))
    const mayhew = (100 * w) / (52.2 + 41.9 * Math.exp(-0.055 * r));
    // O'Conner: 1RM = w × (1 + 0.025 × r)
    const oconner = w * (1 + 0.025 * r);
    // Wathan: 1RM = 100 × w / (48.8 + 53.8 × e^(-0.075 × r))
    const wathan = (100 * w) / (48.8 + 53.8 * Math.exp(-0.075 * r));

    results = [
      { name: "Epley", value: epley },
      { name: "Brzycki", value: brzycki },
      { name: "Lander", value: lander },
      { name: "Lombardi", value: lombardi },
      { name: "Mayhew", value: mayhew },
      { name: "O'Conner", value: oconner },
      { name: "Wathan", value: wathan },
    ];
  }

  const average = results.length > 0 ? results.reduce((s, r) => s + r.value, 0) / results.length : 0;

  const percentages = [100, 95, 90, 85, 80, 75, 70, 65, 60];

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-white rounded-3xl shadow-xl border border-orange-50">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-orange-50 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">One Rep Max Calculator</h1>
          <p className="text-slate-500 font-medium mt-1 text-lg">Estimate your maximum single-rep lift from submaximal data.</p>
        </div>
        <div className="bg-orange-50 px-4 py-2 rounded-full border border-orange-100 shrink-0">
          <span className="text-orange-600 font-bold text-sm uppercase tracking-wider">Fitness</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 shadow-inner space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Weight Lifted</label>
              <div className="flex">
                <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)}
                  className="w-full rounded-l-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 p-3 border text-lg" />
                <select value={unit} onChange={(e) => setUnit(e.target.value)}
                  className="border-y border-r border-gray-300 bg-orange-50 text-orange-800 font-bold px-3 rounded-r-lg cursor-pointer">
                  <option value="lbs">lbs</option>
                  <option value="kg">kg</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Reps Performed</label>
              <input type="number" min="1" max="36" value={reps} onChange={(e) => setReps(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 p-3 border text-lg" />
              <p className="text-xs text-gray-400 mt-1">Enter between 1 and 36 reps</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8">
          {isValid ? (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-orange-600 to-orange-800 rounded-2xl p-8 text-white text-center shadow-2xl">
                <h2 className="text-white/80 font-bold uppercase tracking-widest text-sm mb-2">Estimated 1RM (Average)</h2>
                <div className="text-6xl font-black">{average.toFixed(1)} <span className="text-2xl">{unit}</span></div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {results.map((r) => (
                  <div key={r.name} className="bg-orange-50 p-3 rounded-xl border border-orange-100 text-center">
                    <div className="text-[10px] text-orange-600 font-bold uppercase">{r.name}</div>
                    <div className="text-lg font-black text-orange-800">{r.value.toFixed(1)}</div>
                  </div>
                ))}
              </div>

              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-800 text-sm uppercase mb-3">Training Load Chart</h3>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                  {percentages.map((pct) => (
                    <div key={pct} className="bg-white p-2 rounded-lg border border-slate-100 text-center">
                      <div className="text-xs text-slate-500 font-bold">{pct}%</div>
                      <div className="text-sm font-black text-slate-800">{(average * pct / 100).toFixed(1)} {unit}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full rounded-2xl border-2 border-dashed border-orange-200 bg-orange-50 flex flex-col items-center justify-center p-8 text-center">
              <div className="text-6xl mb-4 opacity-50">🏋️</div>
              <h3 className="text-orange-900 font-bold text-xl mb-2">Enter Your Lift</h3>
              <p className="text-orange-600 text-sm">Input the weight and reps to estimate your one-rep max.</p>
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title="One Rep Max (1RM) Calculator"
        whatIsIt={<p>The <strong>One Rep Max Calculator</strong> estimates the heaviest weight you could lift for a single repetition based on your performance at lighter loads. It uses seven scientifically validated formulas and averages them for reliability.</p>}
        formula={<><p>Seven formulas are used:</p><ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700"><li><strong>Epley:</strong> w × (1 + r/30)</li><li><strong>Brzycki:</strong> w × 36 / (37 - r)</li><li><strong>Lander:</strong> 100 × w / (101.3 - 2.67123 × r)</li></ul></>}
        example={<><p>If you bench press 185 lbs for 5 reps:</p><ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700"><li>Epley estimated 1RM: ~215.8 lbs</li><li>Brzycki estimated 1RM: ~208.1 lbs</li><li>Average across all formulas: ~211.4 lbs</li></ul></>}
        useCases={<ul className="list-disc pl-6 space-y-4"><li><strong>Strength Programming:</strong> Set training loads based on percentages of your 1RM for progressive overload.</li><li><strong>Progress Tracking:</strong> Monitor estimated strength gains over time without maxing out.</li></ul>}
        faqs={[
          { question: "How accurate is this calculator?", answer: "Our calculator uses industry-standard formulas to provide the most accurate results possible. However, it should be used for informational purposes only." },
          { question: "Is this tool free to use?", answer: "Yes, all our calculators are 100% free to use. We do not require any registration, personal information, or subscriptions." },
        ]}
        relatedCalculators={[
          { name: "BMI Calculator", path: "/bmi-calculator", desc: "Calculate your Body Mass Index." },
          { name: "Calorie Calculator", path: "/calorie-calculator", desc: "Estimate daily energy requirements." },
          { name: "Body Fat Calculator", path: "/body-fat-calculator", desc: "Estimate your body fat percentage." },
          { name: "TDEE Calculator", path: "/tdee-calculator", desc: "Calculate your Total Daily Energy Expenditure." },
        ]}
      />
    </div>
  );
}
