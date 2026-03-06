"use client";

import { useState, useEffect } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

const rates: Record<string, number> = {
  meters_per_second: 1,
  kilometers_per_hour: 0.277778,
  miles_per_hour: 0.44704,
  feet_per_second: 0.3048,
  knot: 0.514444,
  mach: 343, // Appx speed of sound at sea level 20C
};

const labels: Record<string, string> = {
  meters_per_second: "Meters per second (m/s)",
  kilometers_per_hour: "Kilometers per hour (km/h)",
  miles_per_hour: "Miles per hour (mph)",
  feet_per_second: "Feet per second (ft/s)",
  knot: "Knot (kn)",
  mach: "Mach (Speed of Sound)",
};

export default function SpeedConverter() {
  const [amount, setAmount] = useState("60");
  const [fromUnit, setFromUnit] = useState("miles_per_hour");
  const [toUnit, setToUnit] = useState("kilometers_per_hour");
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

    // Convert whatever we have to m/s first (the base), then to the target
    const inMs = val * rates[fromUnit];
    const finalValue = inMs / rates[toUnit];

    // Formatting
    if (finalValue < 0.0001 || finalValue > 100000) {
      setResult(finalValue.toExponential(4));
    } else {
      setResult(
        finalValue.toLocaleString("en-US", { maximumFractionDigits: 3 }),
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
        Speed Converter
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Instantly convert velocity and speed measurements across metric,
        imperial, and nautical scales.
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
            name: "Speed Converter",
            operatingSystem: "All",
            applicationCategory: "UtilityApplication",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title="Speed & Velocity Converter"
          whatIsIt={
            <>
              <p>
                Our <strong>Speed Converter</strong> is a fast, accurate utility
                designed to seamlessly convert velocity measurements across
                various systems, including Metric (km/h, m/s), Imperial (mph,
                ft/s), Nautical (knots), and Aeronautical (Mach) scales.
              </p>
              <p>
                Speed is essentially a measure of distance traveled over a
                specific amount of time. Because different industries and
                nations measure both distance and time differently, translating
                "how fast something is moving" requires real-time algebraic
                conversion to ensure safety and precision.
              </p>

              <p className="mt-4 text-sm text-gray-500">
                <strong>Related Terms:</strong> Marathon Pace Calculator, Half
                Marathon Pace Calculator, Running Pace Calculator, Speed
                Calculator, Mph Calculator, Distance Formula Speed Time, Formula
                For Speed, Race Pace Calculator, Speed Converter, Speed Distance
                Time Calculator, Speed Equation
              </p>
            </>
          }
          formula={
            <>
              <p>
                To mathematically convert speed, you simply multiply your
                starting value by an established internationally recognized
                "Conversion Factor".
              </p>
              <div className="bg-emerald-50 p-4 rounded-lg font-mono text-center text-[15px] shadow-sm my-4 flex flex-col gap-2 border border-emerald-100 text-emerald-900">
                <p>
                  <strong>
                    Target Speed = Original Speed × Conversion Factor
                  </strong>
                </p>
              </div>
              <p>
                The most common vehicular conversion factor globally is the
                ratio between Miles Per Hour (mph) and Kilometers Per Hour
                (km/h). Exactly <strong>1 mph = 1.609344 km/h</strong>.
                Therefore, if a car is driving 60 mph, you multiply 60 ×
                1.609344 to confirm they are traveling at 96.5 km/h.
              </p>
            </>
          }
          example={
            <>
              <p>
                Let's look at a common scenario in international aviation and
                maritime navigation.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                <li>
                  <strong>The Setup:</strong> You are tracking a massive cargo
                  ship on a radar application, and it displays its speed as{" "}
                  <strong>25 Knots</strong>. You want to know how fast that
                  actually is in standard miles per hour (mph).
                </li>
                <li>
                  <strong>The Math:</strong> The exact conversion factor to go
                  from Knots to mph is <strong>1.15078</strong>.
                </li>
                <li>
                  <strong>The Calculation:</strong> 25 knots × 1.15078 = 28.769
                </li>
                <li>
                  <strong>Result:</strong> The cargo ship is traveling at
                  roughly <strong>28.8 mph</strong> across the ocean.
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-gray-700">
              <li>
                <strong>Automotive Travel:</strong> When crossing borders (like
                driving from the US into Canada, or the UK into France), your
                speedometer natively displays mph but the local legal signs
                demand km/h. Knowing the rough conversion prevents dangerous
                speeding tickets.
              </li>
              <li>
                <strong>Athletics and Sports:</strong> Track and field sprinters
                often have their speed measured scientifically in "Meters per
                Second" (m/s). A baseball pitcher's throw is measured in mph.
                Converting these to a uniform metric helps visualize human
                athletic limits.
              </li>
              <li>
                <strong>Meteorology & Storm Tracking:</strong> Weather channels
                report hurricane wind speeds differently depending on the
                region. A Cat 5 hurricane might be reported as 157 mph in
                Florida, but European disaster agencies will log it as 252 km/h.
              </li>
            </ul>
          }
          faqs={[
            {
              question: "What actually is a 'Knot'?",
              answer:
                "A Knot is a unit of speed equating exactly to one nautical mile per hour (1.852 km/h). It originated centuries ago when sailors threw a rope with evenly spaced 'knots' tied in it off the back of a ship and counted how many knots slipped through their hands in a set time to gauge their speed.",
            },
            {
              question: "How fast is 'Mach 1'?",
              answer:
                "Mach 1 refers to exactly the speed of sound. However, the speed of sound changes heavily depending on air temperature and altitude. At standard sea-level pressure and 20°C (68°F), Mach 1 is roughly 343 meters per second, or 767 mph. An aircraft flying at 'Mach 2' is flying exactly twice the speed of sound.",
            },
            {
              question: "What is the difference between Speed and Velocity?",
              answer:
                "In basic math they are often used interchangeably, but in physics, Speed is 'Scalar' (it only has a magnitude, e.g., '60 mph'). Velocity is a 'Vector' (it has magnitude AND direction, e.g., '60 mph due North'). Our converter strictly handles the math for Speed/Magnitude.",
            },
          ]}
          relatedCalculators={[
            {
              name: "Length Converter",
              path: "/length-converter",
              desc: "Translate the distance variables used in speed calculations.",
            },
            {
              name: "Time Zone Converter",
              path: "/time-zone-converter",
              desc: "Calculate the exact time difference of a fast international flight.",
            },
            {
              name: "Volume Converter",
              path: "/volume-converter",
              desc: "Convert fuel capacity metrics for long-distance travel.",
            },
          ]}
        />
      </div>
    </div>
  );
}
