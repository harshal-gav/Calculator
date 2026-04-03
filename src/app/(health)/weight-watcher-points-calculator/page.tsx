"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function WeightWatcherPointsCalculator() {
  const [calories, setCalories] = useState("150");
  const [totalFat, setTotalFat] = useState("5");
  const [fiber, setFiber] = useState("3");
  const [protein, setProtein] = useState("8");
  const [servingSize, setServingSize] = useState("1");

  const [result, setResult] = useState<{
    pointsPerServing: number;
    totalPoints: number;
    pointsCalories: number;
    pointsFat: number;
    pointsFiber: number;
    pointsProtein: number;
  } | null>(null);

  const calculatePoints = () => {
    const cal = parseFloat(calories) || 0;
    const fat = parseFloat(totalFat) || 0;
    const fib = parseFloat(fiber) || 0;
    const prot = parseFloat(protein) || 0;
    const servings = parseFloat(servingSize) || 1;

    if (cal > 0) {
      // Weight Watchers SmartPoints formula (per serving):
      // Points = (Calories/50) + (Fat g/4) + (Fiber g/5) - (Protein g/8)
      // Minimum 0 points

      const pointsFromCalories = cal / 50;
      const pointsFromFat = fat / 4;
      const pointsFromProtein = prot / 8;
      let pointsFromFiber = 0;

      if (fib > 0) {
        pointsFromFiber = Math.max(0, -(fib / 5));
      }

      let pointsPerServing =
        pointsFromCalories +
        pointsFromFat +
        pointsFromFiber -
        pointsFromProtein;
      pointsPerServing = Math.max(0, Math.round(pointsPerServing * 10) / 10);

      const totalPoints = pointsPerServing * servings;

      setResult({
        pointsPerServing,
        totalPoints: Math.round(totalPoints * 10) / 10,
        pointsCalories: Math.round((pointsFromCalories) * 10) / 10,
        pointsFat: Math.round((pointsFromFat) * 10) / 10,
        pointsFiber: Math.round((pointsFromFiber) * 10) / 10,
        pointsProtein: Math.round((-pointsFromProtein) * 10) / 10,
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-white rounded-3xl shadow-xl border border-pink-50">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-pink-50 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">WW Points Calculator</h1>
          <p className="text-slate-500 font-medium mt-1 text-lg">Calculate SmartPoints for any food.</p>
        </div>
        <div className="bg-pink-50 px-4 py-2 rounded-full border border-pink-100 shrink-0">
          <span className="text-pink-600 font-bold text-sm uppercase tracking-wider">Weight Loss</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 shadow-inner space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Calories per Serving</label>
              <input
                type="number"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 p-3 border text-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Total Fat (g)</label>
              <input
                type="number"
                value={totalFat}
                onChange={(e) => setTotalFat(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 p-3 border text-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Fiber (g)</label>
              <input
                type="number"
                value={fiber}
                onChange={(e) => setFiber(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 p-3 border text-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Protein (g)</label>
              <input
                type="number"
                value={protein}
                onChange={(e) => setProtein(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 p-3 border text-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Number of Servings</label>
              <input
                type="number"
                value={servingSize}
                onChange={(e) => setServingSize(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 p-3 border text-lg"
              />
            </div>
          </div>

          <button
            onClick={calculatePoints}
            className="mt-8 w-full bg-pink-600 text-white font-bold py-4 px-4 rounded-xl hover:bg-pink-700 transition shadow-lg text-lg uppercase tracking-wide"
          >
            Calculate Points
          </button>
        </div>

        <div className="lg:col-span-7 bg-pink-50 rounded-xl p-8 border border-pink-200 shadow-inner flex flex-col justify-center">
          {result !== null ? (
            <div>
              <h2 className="text-lg font-bold text-pink-900 mb-2 text-center uppercase tracking-wider">
                SmartPoints
              </h2>
              <div className="text-6xl md:text-7xl font-black text-center text-pink-700 mb-6 pb-6 border-b border-pink-200">
                {result.pointsPerServing}
                <span className="text-2xl ml-2">pts/serving</span>
              </div>

              {result.pointsPerServing !== result.totalPoints && (
                <div className="text-center mb-6">
                  <p className="text-gray-600 text-sm">Total for {result.totalPoints / result.pointsPerServing} servings:</p>
                  <p className="text-4xl font-bold text-pink-700">{result.totalPoints} points</p>
                </div>
              )}

              <div className="bg-white p-5 rounded-xl border border-pink-100 shadow-sm space-y-3">
                <h3 className="font-bold text-gray-800 mb-3 text-center">Points Breakdown</h3>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-700">From Calories:</span>
                  <span className="font-bold text-pink-600">+{result.pointsCalories}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-700">From Fat:</span>
                  <span className="font-bold text-pink-600">+{result.pointsFat}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-700">From Fiber:</span>
                  <span className="font-bold text-pink-600">{result.pointsFiber > 0 ? "-" : ""}{result.pointsFiber}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-700">From Protein:</span>
                  <span className="font-bold text-pink-600">-{result.pointsProtein}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-pink-800 opacity-60 font-medium p-8">
              Enter nutrition information to calculate WW points.
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title="Weight Watcher Points Calculator"
        whatIsIt={
          <>
            <p>
              The <strong>Weight Watcher Points Calculator</strong> uses the WW SmartPoints formula to determine the point value of foods based on their nutritional content. This helps members track their daily food intake and stay within their personalized point budget for successful weight loss.
            </p>
          </>
        }
        formula={
          <>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 font-mono text-lg text-indigo-700 text-center shadow-sm my-6">
              Result = f(Metric, Age, Sex)
            </div>
            <p className="text-sm text-slate-500 text-center">
              Biometric calculation utilizing standardized biological and physiological models for Weight Watcher Points.
            </p>
          </>
        }
        example={
          <>
            <p>For a food with 150 calories, 5g fat, 3g fiber, 8g protein:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
              <li>Calories: 150 ÷ 50 = 3 points</li>
              <li>Fat: 5 ÷ 4 = 1.25 points</li>
              <li>Fiber: 3 ÷ 5 = 0.6 points (reduces total)</li>
              <li>Protein: 8 ÷ 8 = 1 point (reduces total)</li>
              <li>Total: 3 + 1.25 - 0.6 - 1 = <strong>2.65 ≈ 3 SmartPoints</strong></li>
            </ul>
          </>
        }
        useCases={
          <ul className="list-disc pl-6 space-y-4">
            <li><strong>Daily Tracking:</strong> Keep track of points while staying within your daily allotment.</li>
            <li><strong>Food Choices:</strong> Compare points for similar foods to make healthier choices.</li>
            <li><strong>Meal Planning:</strong> Plan meals based on available points in your budget.</li>
            <li><strong>Restaurant Meals:</strong> Calculate approximate points for restaurant foods not in the database.</li>
          </ul>
        }
        faqs={[
          {
            question: "What is the daily SmartPoints budget?",
            answer: "Your daily SmartPoints budget is personalized based on factors like age, height, weight, and gender. Most people receive 23-43 points per day. Some weight loss members get lower allowances, while inactive members may get higher amounts.",
          },
          {
            question: "Are all zero-point foods actually zero?",
            answer: "Zero-point foods are low in calories, fat, and added sugars while high in protein or fiber. However, they still contain calories, so portion control matters. The program allows unlimited consumption of zero-point foods to encourage healthy choices.",
          },
          {
            question: "How often do SmartPoints change?",
            answer: "WW updates the SmartPoints formula periodically based on scientific research. The current formula has been used since 2016, but members can expect updates every few years.",
          },
        ]}
        relatedCalculators={[
          { name: "Calorie Calculator", path: "/calorie-calculator/", desc: "Calculate daily calorie needs" },
          { name: "Macro Calculator", path: "/macro-calculator/", desc: "Calculate macronutrient breakdown" },
          { name: "BMI Calculator", path: "/bmi-calculator/", desc: "Check your Body Mass Index" },
          { name: "TDEE Calculator", path: "/tdee-calculator/", desc: "Calculate total daily energy expenditure" },
        ]}
      />
    </div>
  );
}
