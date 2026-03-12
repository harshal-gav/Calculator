"use client";

import { useState, useEffect } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function CalorieCalculator() {
  const [age, setAge] = useState("25");
  const [gender, setGender] = useState("male");
  const [weight, setWeight] = useState("160");
  const [height, setHeight] = useState("70"); // inches
  const [activity, setActivity] = useState("1.375"); // Lightly active
  const [unit, setUnit] = useState("imperial");

  const [result, setResult] = useState<{
    maintenance: number;
    mildLoss: number;
    weightLoss: number;
    extremeLoss: number;
    mildGain: number;
    weightGain: number;
  } | null>(null);

  useEffect(() => {
    calculateCalories();
  }, [age, gender, weight, height, activity, unit]);

  const calculateCalories = () => {
    let w = parseFloat(weight);
    let h = parseFloat(height);
    const a = parseFloat(age);

    if (unit === "imperial") {
      w = w * 0.453592;
      h = h * 2.54;
    }

    if (w > 0 && h > 0 && a > 0) {
      // Mifflin-St Jeor Equation
      let bmr = 10 * w + 6.25 * h - 5 * a;
      if (gender === "male") {
        bmr += 5;
      } else {
        bmr -= 161;
      }

      const maintenance = bmr * parseFloat(activity);

      setResult({
        maintenance,
        mildLoss: maintenance - 250,
        weightLoss: maintenance - 500,
        extremeLoss: maintenance - 1000,
        mildGain: maintenance + 250,
        weightGain: maintenance + 500,
      });
    } else {
      setResult(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-3xl shadow-2xl border border-orange-50">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-black mb-4 text-orange-900 tracking-tight">
          Calorie Calculator
        </h1>
        <p className="text-orange-600 text-lg">
          Estimate the daily calories needed to reach your weight goals based on the Mifflin-St Jeor Equation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Input UI */}
        <div className="bg-orange-50/50 p-6 rounded-3xl border border-orange-100 space-y-5">
           <div className="flex gap-4 p-1 bg-white rounded-xl border border-orange-100 shadow-sm">
              <button 
                onClick={() => setGender("male")}
                className={`flex-1 py-3 rounded-lg font-bold transition-all ${gender === 'male' ? 'bg-orange-500 text-white shadow-md' : 'text-orange-400 hover:bg-orange-50'}`}
              >
                Male
              </button>
              <button 
                onClick={() => setGender("female")}
                className={`flex-1 py-3 rounded-lg font-bold transition-all ${gender === 'female' ? 'bg-orange-500 text-white shadow-md' : 'text-orange-400 hover:bg-orange-50'}`}
              >
                Female
              </button>
           </div>

           <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-orange-800 mb-2 uppercase tracking-widest">Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full rounded-xl border-orange-200 p-4 font-bold text-lg focus:ring-2 focus:ring-orange-400 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-orange-800 mb-2 uppercase tracking-widest">Unit</label>
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="w-full rounded-xl border-orange-200 p-4 font-bold text-lg focus:ring-2 focus:ring-orange-400 transition-all appearance-none bg-white"
                >
                  <option value="imperial">US (lb/in)</option>
                  <option value="metric">Metric (kg/cm)</option>
                </select>
              </div>
           </div>

           <div>
              <label className="block text-xs font-bold text-orange-800 mb-2 uppercase tracking-widest">
                Weight ({unit === 'imperial' ? 'lbs' : 'kg'})
              </label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full rounded-xl border-orange-200 p-4 font-bold text-xl focus:ring-2 focus:ring-orange-400 transition-all"
              />
           </div>

           <div>
              <label className="block text-xs font-bold text-orange-800 mb-2 uppercase tracking-widest">
                Height ({unit === 'imperial' ? 'inches' : 'cm'})
              </label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full rounded-xl border-orange-200 p-4 font-bold text-xl focus:ring-2 focus:ring-orange-400 transition-all"
              />
           </div>

           <div>
              <label className="block text-xs font-bold text-orange-800 mb-2 uppercase tracking-widest">Activity Level</label>
              <select
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                className="w-full rounded-xl border-orange-200 p-4 font-bold text-sm focus:ring-2 focus:ring-orange-400 transition-all bg-white"
              >
                <option value="1.2">Basal Metabolic Rate (BMR)</option>
                <option value="1.2">Sedentary: little or no exercise</option>
                <option value="1.375">Light: exercise 1-3 times/week</option>
                <option value="1.465">Moderate: exercise 4-5 times/week</option>
                <option value="1.55">Active: daily exercise or intense 3-4 times/week</option>
                <option value="1.725">Very Active: intense exercise 6-7 times/week</option>
                <option value="1.9">Extra Active: very intense exercise daily, or physical job</option>
              </select>
           </div>
        </div>

        {/* Output UI */}
        <div className="flex flex-col">
          {result ? (
            <div className="bg-orange-600 rounded-3xl p-8 text-white shadow-xl flex-1 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-48 h-48 bg-white rounded-full mix-blend-overlay filter blur-[60px] opacity-20 pointer-events-none"></div>
               
               <h2 className="text-orange-100 text-xs font-black uppercase tracking-[0.2em] mb-6 text-center">Maintenance Calories</h2>
               <div className="text-center mb-10">
                  <div className="text-6xl font-black tracking-tight">{Math.round(result.maintenance).toLocaleString()}</div>
                  <div className="text-orange-200 text-sm mt-1 uppercase font-bold tracking-widest items-center flex justify-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                    Calories / Day
                  </div>
               </div>

               <div className="space-y-4">
                  <div className="bg-white/10 p-4 rounded-2xl flex justify-between items-center backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-all group">
                     <div>
                        <div className="text-xs font-bold text-orange-100 uppercase">Weight Loss</div>
                        <div className="text-[10px] text-orange-200 group-hover:text-white">-0.5 kg (1 lb) per week</div>
                     </div>
                     <div className="text-2xl font-black">{Math.round(result.weightLoss).toLocaleString()}</div>
                  </div>
                  <div className="bg-white/10 p-4 rounded-2xl flex justify-between items-center backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-all group">
                     <div>
                        <div className="text-xs font-bold text-orange-100 uppercase text-rose-200">Extreme Loss</div>
                        <div className="text-[10px] text-orange-200 group-hover:text-white">-1 kg (2 lb) per week</div>
                     </div>
                     <div className="text-2xl font-black">{Math.round(result.extremeLoss).toLocaleString()}</div>
                  </div>
                  <div className="bg-white/10 p-4 rounded-2xl flex justify-between items-center backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-all group">
                     <div>
                        <div className="text-xs font-bold text-orange-100 uppercase">Weight Gain</div>
                        <div className="text-[10px] text-orange-200 group-hover:text-white">+0.5 kg (1 lb) per week</div>
                     </div>
                     <div className="text-2xl font-black">{Math.round(result.weightGain).toLocaleString()}</div>
                  </div>
               </div>
            </div>
          ) : (
            <div className="h-full border-4 border-dashed border-orange-100 rounded-3xl flex items-center justify-center p-8 bg-orange-50/20 text-center">
               <p className="text-orange-400 font-bold italic tracking-wide">Enter your metrics to visualize your caloric needs.</p>
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title="Calorie Calculator"
        whatIsIt={
          <>
            <p>
              The <strong>Calorie Calculator</strong> is a tool used to estimate the number of calories an individual needs to consume daily to maintain, lose, or gain weight. It creates a personalized baseline by factoring in your age, gender, weight, height, and physical activity levels.
            </p>
            <p>
              The calculator utilizes the <strong>Mifflin-St Jeor Equation</strong>, which is currently considered the most accurate method for estimating Basal Metabolic Rate (BMR) for the general population.
            </p>
          </>
        }
        formula={
          <>
            <p>The Mifflin-St Jeor formulas for Basal Metabolic Rate (BMR) are:</p>
            <div className="bg-orange-50 p-6 rounded-2xl font-mono text-center text-sm shadow-sm my-4 border border-orange-100 text-orange-950">
               <strong>Male:</strong> 10W + 6.25H - 5A + 5 <br/>
               <strong>Female:</strong> 10W + 6.25H - 5A - 161
            </div>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-orange-900/80">
              <li><strong>W:</strong> Body weight in kg</li>
              <li><strong>H:</strong> Stature in cm</li>
              <li><strong>A:</strong> Age in years</li>
            </ul>
            <p className="mt-4">Final calories are calculated by multiplying the BMR by an activity factor (TDEE).</p>
          </>
        }
        example={
          <>
            <p>Consider a <strong>25-year-old male</strong> weighing <strong>160 lbs (72.5 kg)</strong> and <strong>5'10" (178 cm)</strong> tall with a <strong>'Lightly Active'</strong> lifestyle:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-orange-900/80">
              <li>His BMR would be approx <strong>1,718 calories</strong>.</li>
              <li>With a 1.375 activity factor, his maintenance calories would be approx <strong>2,362 calories/day</strong>.</li>
              <li>To lose 1 lb per week, he should consume <strong>1,862 calories/day</strong>.</li>
            </ul>
          </>
        }
        useCases={
          <ul className="list-disc pl-6 space-y-4 text-orange-900/80">
            <li><strong>Healthy Weight Management:</strong> Establish a data-driven baseline for your daily food intake.</li>
            <li><strong>Fat Loss Scenarios:</strong> Calculate the exact caloric deficit required to hit specific weight milestones.</li>
            <li><strong>Muscle Building (Bulking):</strong> Determine the 'lean surplus' needed to support muscle growth without excessive fat gain.</li>
          </ul>
        }
        faqs={[
          {
            question: "How accurate is the Calorie Calculator?",
            answer: "The Mifflin-St Jeor equation is highly accurate for most people. However, factors like body fat percentage, hormonal health, and medications can impact individual results. View this as a solid starting point for experimentation."
          },
          {
            question: "What is a safe caloric deficit?",
            answer: "Generally, a deficit of 500 calories per day (leading to 1 lb of weight loss per week) is considered safe and sustainable for most adults."
          },
          {
            question: "Should I eat my 'exercise calories' back?",
            answer: "If you used an 'Active' or 'Moderate' setting in this calculator, your exercise is already accounted for. If you set it to 'Sedentary' and did extra cardio, you may need a small snack to recover, but be careful not to over-estimate the calories burned during exercise."
          }
        ]}
        relatedCalculators={[
          { name: "TDEE Calculator", path: "/tdee-calculator", desc: "Deeper dive into your total energy expenditure." },
          { name: "BMI Calculator", path: "/bmi-calculator", desc: "Check if your current weight is in a healthy range." },
          { name: "Macro Calculator", path: "/macro-calculator", desc: "Break your calories down into Protein, Fats, and Carbs." }
        ]}
      />
    </div>
  );
}
