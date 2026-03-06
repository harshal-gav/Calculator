"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
export default function TDEECalculator() {
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("30");
  const [weight, setWeight] = useState("180");
  const [heightFt, setHeightFt] = useState("5");
  const [heightIn, setHeightIn] = useState("11");
  const [activityMultiplier, setActivityMultiplier] = useState("1.55");

  const [tdee, setTdee] = useState<number | null>(null);
  const [bmr, setBmr] = useState<number | null>(null);

  const calculateTDEE = () => {
    const a = parseInt(age);
    const wLbs = parseFloat(weight);
    const hFt = parseFloat(heightFt);
    const hIn = parseFloat(heightIn);
    const act = parseFloat(activityMultiplier);

    if (a > 0 && wLbs > 0) {
      // Conversions
      const wKg = wLbs * 0.453592;
      const hCm = (hFt * 12 + hIn) * 2.54;

      // Mifflin-St Jeor Equation for Basal Metabolic Rate (BMR)
      let baseBmr = 10 * wKg + 6.25 * hCm - 5 * a;
      if (gender === "male") {
        baseBmr += 5;
      } else {
        baseBmr -= 161;
      }

      setBmr(Math.round(baseBmr));
      setTdee(Math.round(baseBmr * act));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-orange-900 border-b pb-4">
        TDEE Calculator
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Calculate your Total Daily Energy Expenditure (TDEE), which is the exact
        number of calories your body burns per day.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Inputs */}
        <div className="md:col-span-7 bg-orange-50 p-6 rounded-xl border border-orange-100 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Gender
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-orange-500 bg-white cursor-pointer transition"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Age
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-orange-500 font-medium transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Height (Feet)
              </label>
              <input
                type="number"
                value={heightFt}
                onChange={(e) => setHeightFt(e.target.value)}
                className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-orange-500 font-medium transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Height (Inches)
              </label>
              <input
                type="number"
                value={heightIn}
                onChange={(e) => setHeightIn(e.target.value)}
                className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-orange-500 font-medium transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Weight (lbs)
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-orange-500 font-bold transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Daily Activity
            </label>
            <select
              value={activityMultiplier}
              onChange={(e) => setActivityMultiplier(e.target.value)}
              className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-orange-500 bg-white cursor-pointer transition"
            >
              <option value="1.2">Sedentary (office job)</option>
              <option value="1.375">Light Exercise (1-3 days/week)</option>
              <option value="1.55">Moderate Exercise (3-5 days/week)</option>
              <option value="1.725">Heavy Exercise (6-7 days/week)</option>
              <option value="1.9">Athlete (2x per day)</option>
            </select>
          </div>

          <button
            onClick={calculateTDEE}
            className="w-full bg-orange-600 text-white font-bold py-4 rounded-xl hover:bg-orange-700 transition shadow-lg uppercase tracking-wide mt-4"
          >
            Calculate TDEE
          </button>
        </div>

        {/* Results Screen */}
        <div className="md:col-span-5 bg-white border-2 border-orange-100 rounded-xl overflow-hidden shadow-sm flex flex-col items-center justify-center p-8">
          {tdee !== null ? (
            <div className="w-full text-center space-y-6">
              <div>
                <h3 className="text-orange-800 font-semibold uppercase tracking-widest text-sm mb-2">
                  Your Maintenance Calories
                </h3>
                <div className="text-6xl font-black text-gray-900 drop-shadow-sm">
                  {tdee.toLocaleString()}
                </div>
                <div className="text-orange-600 font-bold mt-1 uppercase tracking-wide">
                  Calories per day
                </div>
              </div>

              <div className="h-px bg-orange-100 w-full"></div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <h4 className="text-gray-500 font-bold uppercase text-xs mb-1">
                  Resting BMR
                </h4>
                <p className="text-2xl font-bold text-gray-800">
                  {bmr?.toLocaleString()}{" "}
                  <span className="text-sm font-normal text-gray-500">
                    kcal/day
                  </span>
                </p>
                <p className="text-xs text-gray-400 mt-2 leading-tight">
                  This is what your body burns if you stay in bed all day doing
                  absolutely nothing.
                </p>
              </div>
            </div>
          ) : (
            <div className="text-orange-300 font-medium text-center text-lg max-w-[200px]">
              Input your bodily metrics to reveal your exact Energy Expenditure.
            </div>
          )}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "TDEE Calculator",
            operatingSystem: "All",
            applicationCategory: "HealthApplication",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title="Total Daily Energy Expenditure (TDEE) Calculator"
          whatIsIt={
            <>
              <p>
                A{" "}
                <strong>
                  Total Daily Energy Expenditure (TDEE) Calculator
                </strong>{" "}
                tells you exactly how many calories your body burns in a typical
                24-hour period. It is the single most important number to know
                for managing your weight and designing a diet.
              </p>
              <p>
                Your TDEE is your "Maintenance Calorie Level." If you eat
                exactly your TDEE every day, your weight will never change. If
                you eat below it, you will lose weight. If you eat above it, you
                will gain weight. Thermodynamics dictate that everything
                revolves around this specific number.
              </p>

              <p className="mt-4 text-sm text-gray-500">
                <strong>Related Terms:</strong> Tdee Calculator
              </p>
            </>
          }
          formula={
            <>
              <p>This calculator determines your TDEE in two steps:</p>
              <ul className="list-decimal pl-6 space-y-3 mt-4 text-zinc-700">
                <li>
                  First, it calculates your{" "}
                  <strong>Basal Metabolic Rate (BMR)</strong> using the
                  highly-accurate Mifflin-St Jeor equation. This is the energy
                  you burn just existing.
                </li>
                <li>
                  Second, it multiplies your BMR by an{" "}
                  <strong>Activity Multiplier</strong> based on the
                  Katch-McArdle multipliers. This accounts for your daily
                  physical activity, from typing at a desk to running marathons.
                </li>
              </ul>
            </>
          }
          example={
            <>
              <p>
                Let's calculate the TDEE for a <strong>30-year-old male</strong>{" "}
                who is <strong>180 lbs</strong>, <strong>5'11"</strong> tall,
                and works a desk job but works out aggressively 4 times a week
                (Moderate Exercise modifier of 1.55).
              </p>
              <ul className="list-none space-y-2 mt-4 font-mono text-sm bg-orange-50 p-4 rounded-xl border border-orange-200">
                <li>
                  <strong>Step 1: Calculate BMR</strong>
                </li>
                <li className="pl-4 text-zinc-600">
                  The calculator uses his age, weight, and height to determine
                  his base BMR is roughly <strong>1,822 kcal/day</strong>.
                </li>
                <li className="mt-2">
                  <strong>Step 2: Apply Activity Multiplier</strong>
                </li>
                <li className="pl-4 text-zinc-600">
                  Because he works out moderately, we multiply his BMR by 1.55.
                </li>
                <li className="pl-4 text-zinc-600">1,822 × 1.55 = 2,824</li>
                <li className="pt-2 mt-2 font-bold text-orange-800 border-t border-orange-200">
                  Result (TDEE): 2,824 kcal/day
                </li>
              </ul>
              <p className="mt-4 text-sm text-zinc-700">
                To lose exactly 1 pound a week, he needs to eat in a 500-calorie
                deficit, aiming for ~2,324 calories per day.
              </p>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4">
              <li>
                <strong>Cutting phase (Fat Loss):</strong> The gold-standard
                clinical advice for sustainable fat loss is to subtract exactly
                500 calories from your TDEE every day to lose roughly 1lb of fat
                per week.
              </li>
              <li>
                <strong>Bulking phase (Muscle Gain):</strong> Bodybuilders add
                250 to 500 calories to their TDEE to ensure they are in enough
                of a caloric surplus to synthesize new muscle tissue without
                adding excessive body fat.
              </li>
              <li>
                <strong>Recomposition:</strong> Eating precisely at your TDEE
                while lifting heavy weights can slowly trade fat for muscle
                while keeping your body weight identical on the scale.
              </li>
            </ul>
          }
          faqs={[
            {
              question: "How accurate is the TDEE calculation?",
              answer:
                "It is an incredibly accurate statistical estimate, usually within 5-10% for the vast majority of the population. However, it is fundamentally an 'estimate.' It doesn't know your exact genetics, NEAT (non-exercise activity thermogenesis like fidgeting), or exact sleep quality. The correct way to use a TDEE calculator is to grab the number, eat exactly that many calories for 14 days, track your morning weight, and then adjust manually based on whether the scale moved.",
            },
            {
              question: "Does my smartwatch calculate my TDEE?",
              answer:
                "Yes, Apple Watches, Garmins, and Fitbits are actively estimating your TDEE based on your heart rate. However, clinical studies continually show that commercially available smart watches overestimate calories burned through exercise by roughly 20% to 40%. The static formula used in this calculator is often safer for diet planning than a smartwatch.",
            },
            {
              question: "Should I recalculate my TDEE as I lose weight?",
              answer:
                "Yes. As you lose weight, there is less of you to physically move around, which means your body requires less energy to survive. If you lose 20 lbs, your TDEE will drop. If you hit a 'weight-loss plateau,' it's usually because your old caloric deficit has accidentally become your new TDEE maintenance level.",
            },
          ]}
          relatedCalculators={[
            {
              name: "BMR Calculator",
              path: "/bmr-calculator",
              desc: "Isolate and view only your resting metabolic rate without the activity modifiers.",
            },
            {
              name: "Macro Calculator",
              path: "/macro-calculator",
              desc: "Break your new TDEE down into precise grams of protein, carbs, and fats.",
            },
            {
              name: "Ideal Weight Calculator",
              path: "/ideal-weight-calculator",
              desc: "Calculate the exact target weight you should be aiming for.",
            },
          ]}
        />
      </div>
    </div>
  );
}
