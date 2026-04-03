"use client";

import { useState, useEffect } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

const rates: Record<string, number> = {
  kilogram: 1,
  gram: 0.001,
  milligram: 0.000001,
  metric_ton: 1000,
  pound: 0.453592,
  ounce: 0.0283495,
  stone: 6.35029,
  us_ton: 907.185,
  imperial_ton: 1016.05,
};

const labels: Record<string, string> = {
  kilogram: "Kilogram (kg)",
  gram: "Gram (g)",
  milligram: "Milligram (mg)",
  metric_ton: "Metric Ton (t)",
  pound: "Pound (lb)",
  ounce: "Ounce (oz)",
  stone: "Stone (st)",
  us_ton: "US Ton (Short Ton)",
  imperial_ton: "Imperial Ton (Long Ton)",
};

export default function WeightConverter() {
  const [amount, setAmount] = useState("1");
  const [fromUnit, setFromUnit] = useState("kilogram");
  const [toUnit, setToUnit] = useState("pound");
  const [result, setResult] = useState("");

  useEffect(() => {
    calculateConversion();
  }, [amount, fromUnit, toUnit]);

  const calculateConversion = () => {
    const val = parseFloat(amount);
    if (isNaN(val)) {
      setResult("");
      return;
    }

    // Convert whatever we have to kg first (the base), then to the target
    const inKg = val * rates[fromUnit];
    const finalValue = inKg / rates[toUnit];

    // Formatting
    if (finalValue < 0.0001 || finalValue > 10000) {
      setResult(finalValue.toExponential(4));
    } else {
      setResult(
        finalValue.toLocaleString("en-US", { maximumFractionDigits: 4 }),
      );
    }
  };

  const handleSwap = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-emerald-700 border-b pb-4">
        Weight & Mass Converter
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Convert accurately between all major metric and imperial units of mass.
      </p>

      <div className="bg-emerald-50 rounded-2xl p-6 md:p-10 border border-emerald-100 shadow-inner">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
          {/* From Section */}
          <div className="md:col-span-2 space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Value
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full rounded-xl border-gray-300 p-4 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 font-black text-2xl"
                placeholder="Enter amount"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                From
              </label>
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full rounded-xl border-gray-300 p-4 shadow-sm focus:border-emerald-500 font-semibold bg-white cursor-pointer text-gray-700"
              >
                {Object.keys(rates).map((key) => (
                  <option key={`from-${key}`} value={key}>
                    {labels[key]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Swap Button */}
          <div className="md:col-span-1 flex justify-center py-4 md:py-0">
            <button
              onClick={handleSwap}
              className="bg-white p-4 rounded-full shadow hover:shadow-md border border-gray-200 transition-all hover:rotate-180 hover:bg-emerald-100 text-emerald-600 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                />
              </svg>
            </button>
          </div>

          {/* To Section */}
          <div className="md:col-span-2 space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Result
              </label>
              <input
                type="text"
                readOnly
                value={result}
                className="w-full rounded-xl border-emerald-300 bg-emerald-100/50 p-4 shadow-sm font-black text-2xl text-emerald-900 outline-none"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                To
              </label>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="w-full rounded-xl border-gray-300 p-4 shadow-sm focus:border-emerald-500 font-semibold bg-white cursor-pointer text-gray-700"
              >
                {Object.keys(rates).map((key) => (
                  <option key={`to-${key}`} value={key}>
                    {labels[key]}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Weight Converter",
            operatingSystem: "All",
            applicationCategory: "UtilityApplication",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title="Weight & Mass Converter"
          whatIsIt={
            <>
              <p>
                Our <strong>Weight Converter</strong> is a digital utility
                designed to provide exact mathematical translations between the
                world's most common mass and weight measurement systems. It
                seamlessly toggles between Metric units (grams, kilograms,
                metric tons) and traditional Imperial/US Customary units
                (ounces, pounds, stones, US tons).
              </p>
              <p>
                Because the United States is one of the only countries on Earth
                to still primarily rely on pounds, translating global data,
                recipes, medicinal dosages, or personal fitness metrics into a
                familiar unit of measurement is a daily necessity for millions
                of people.
              </p>

              <p className="mt-4 text-sm text-gray-500">
                <strong>Related Terms:</strong> Weight Loss Calculator, Weight
                Calculator, Overweight Calculator, Healthy Weight Calculator,
                Weight Watchers Points Calculator, Weight Gain Calculator, Ideal
                Weight For Height, Ideal Body Weight Calculator, Body Weight
                Calculator, Dollars To Pounds Converter, Dollars To Pounds
                Calculator, Pounds To Dollars Calculator, Ideal Weight Chart,
                Weight Conversion, Ideal Body Weight
              </p>
            </>
          }
          formula={
          <>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 font-mono text-lg text-indigo-700 text-center shadow-sm my-6">
              Result = Input × Conversion_Factor
            </div>
            <p className="text-sm text-slate-500 text-center">
              Precise unit translation for Weight Converter using industry-standard conversion constants.
            </p>
          </>
        }
          example={
            <>
              <p>
                Let's look at a common scenario in international travel: reading
                baggage allowances.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                <li>
                  <strong>The Setup:</strong> You are flying on a European
                  airline. Their strict baggage policy states the absolute
                  maximum weight for a checked bag is{" "}
                  <strong>23 kilograms</strong>. You only own a US scale that
                  measures in pounds.
                </li>
                <li>
                  <strong>The Math:</strong> The conversion factor to go from
                  Kilograms to Pounds is <strong>2.20462</strong>.
                </li>
                <li>
                  <strong>The Calculation:</strong> 23 kg × 2.20462 = 50.706
                </li>
                <li>
                  <strong>Result:</strong> Your checked luggage must weigh
                  exactly <strong>50.7 pounds</strong> or less to avoid massive
                  international heavy-bag fees.
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-gray-700">
              <li>
                <strong>Cooking & Baking:</strong> European recipes almost
                exclusively measure dry ingredients like flour and sugar by mass
                directly in grams (e.g., 250g of flour). American cooks often
                need to calculate exactly how many ounces or cups that equates
                to.
              </li>
              <li>
                <strong>Medicine & Health:</strong> In modern hospitals
                everywhere (including the US), patient weight and medication
                dosages are recorded strictly in kilograms and milligrams to
                prevent fatal, math-based dosage errors.
              </li>
              <li>
                <strong>Freight & Shipping:</strong> When shipping massive
                industrial goods on boats, you must understand the difference
                between a "Short Ton" (US Ton = 2,000 lbs) and a "Metric Ton"
                (1,000 kg = ~2,204 lbs). The identical word "Ton" actually means
                very different things depending on where you are.
              </li>
            </ul>
          }
          faqs={[
            {
              question:
                "What is the scientific difference between 'Mass' and 'Weight'?",
              answer:
                "In daily life on Earth, they mean the exact same thing. However, in physics, 'Mass' is how much physical matter an object has (measured in kilograms). 'Weight' is how hard gravity is currently pulling on that mass (measured in Newtons). If you go to the Moon, your Mass stays identical, but your Weight drops by 83% because the Moon's gravity is incredibly weak.",
            },
            {
              question: "What is a 'Stone' measurement?",
              answer:
                "The 'Stone' is an older unit of mass heavily used in the United Kingdom and Ireland specifically to measure human body weight. Exactly 1 Stone equals 14 Pounds (or roughly 6.35 kg). If a British person says they weigh '11 stone', they mean they weigh 154 pounds.",
            },
            {
              question: "Why do we abbreviate Pounds as 'lbs'?",
              answer:
                "It originates from the ancient Roman unit of mass called the 'libra pondo' (which literally translates to 'pound weight'). The word 'pound' comes from 'pondo', but the abbreviation 'lb' comes directly from 'libra'.",
            },
          ]}
          relatedCalculators={[
            {
              name: "Length Converter",
              path: "/length-converter/",
              desc: "Instantly translate miles, kilometers, feet, and meters.",
            },
            {
              name: "Ideal Weight Calculator",
              path: "/ideal-weight-calculator/",
              desc: "Calculate the healthiest weight range for your exact height.",
            },
            {
              name: "BMI Calculator",
              path: "/bmi-calculator/",
              desc: "Determine your Body Mass Index using either kg or lbs.",
            },
            {
              name: "Age Calculator",
              path: "/age-calculator/",
              desc: "Calculate your exact age in years, months, and days.",
            }]}
        />
      </div>
    </div>
  );
}
