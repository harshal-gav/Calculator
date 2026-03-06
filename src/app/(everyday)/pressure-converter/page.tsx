"use client";

import { useState, useEffect } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

const units = [
  { id: "pascal", name: "Pascal (Pa)", factor: 1 },
  { id: "kilopascal", name: "Kilopascal (kPa)", factor: 1000 },
  { id: "bar", name: "Bar", factor: 100000 },
  { id: "psi", name: "Pound per Square Inch (psi)", factor: 6894.757293168 },
  { id: "atmosphere", name: "Standard Atmosphere (atm)", factor: 101325 },
  { id: "torr", name: "Torr (mmHg)", factor: 133.322368421 },
  { id: "inhg", name: "Inch of Mercury (inHg)", factor: 3386.389 },
];

export default function PressureConverter() {
  const [inputValue, setInputValue] = useState("1");
  const [fromUnit, setFromUnit] = useState("bar");
  const [toUnit, setToUnit] = useState("psi");
  const [result, setResult] = useState("");

  useEffect(() => {
    calculateConversion();
  }, [inputValue, fromUnit, toUnit]);

  const calculateConversion = () => {
    const val = parseFloat(inputValue);
    if (isNaN(val)) {
      setResult("");
      return;
    }

    const fromNode = units.find((u) => u.id === fromUnit);
    const toNode = units.find((u) => u.id === toUnit);

    if (fromNode && toNode) {
      // Convert everything to base (Pascals), then to target
      const valueInPascals = val * fromNode.factor;
      const finalValue = valueInPascals / toNode.factor;

      // Format scientifically if extreme, else fixed
      if (finalValue > 1e9 || (finalValue < 1e-4 && finalValue > 0)) {
        setResult(finalValue.toExponential(6));
      } else {
        setResult(parseFloat(finalValue.toFixed(6)).toString());
      }
    }
  };

  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setInputValue(result || "1");
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-purple-700 border-b pb-4">
        Pressure Converter
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Convert pressure measurements easily between Pascals, PSI, Bar,
        Atmospheres, and more.
      </p>

      <div className="bg-purple-50 p-6 md:p-10 rounded-2xl border border-purple-200 relative">
        <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-6 items-center">
          {/* From */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                From Value
              </label>
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full rounded-xl border-gray-300 p-4 shadow-inner focus:border-purple-500 font-black text-3xl text-gray-800 bg-white"
              />
            </div>
            <div>
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-purple-500 font-bold bg-white text-gray-700 hover:border-purple-300 cursor-pointer"
              >
                {units.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center -my-2 md:my-0 z-10">
            <button
              onClick={handleSwap}
              className="bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 hover:scale-110 active:scale-95 transition-all focus:outline-none focus:ring-4 focus:ring-purple-200"
              title="Swap units"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                />
              </svg>
            </button>
          </div>

          {/* To */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                To Value
              </label>
              <input
                type="text"
                readOnly
                value={result}
                className="w-full rounded-xl border-transparent p-4 shadow-inner font-black text-3xl text-purple-800 bg-purple-100/60 focus:outline-none"
                placeholder="0"
              />
            </div>
            <div>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-purple-500 font-bold bg-white text-gray-700 hover:border-purple-300 cursor-pointer"
              >
                {units.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name}
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
            "@type": "WebApplication",
            name: "Pressure Converter",
            operatingSystem: "All",
            applicationCategory: "UtilitiesApplication",
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title="Atmospheric & Mechanical Pressure Converter"
          whatIsIt={
            <p>
              Our <strong>Pressure Converter</strong> translates complex
              barometric, atmospheric, and mechanical stress metrics into an
              array of international standards. It allows easy conversion
              between metric units (Pascals, Bar), US Customary units (PSI), and
              historic meteorological scales (Atmospheres, Torr, Inches of
              Mercury).
            </p>
          }
          formula={
            <>
              <p>
                In physics, pressure is officially defined as Force (Newtons)
                applied over a continuous Area (Square Meters). This converter
                utilizes the International System (SI) base unit—the Pascal—as
                its central conversion bridge.
              </p>
              <div className="bg-purple-50 p-4 rounded-lg font-mono text-center text-[15px] shadow-sm my-4 flex flex-col gap-2 border border-purple-100 text-purple-900">
                <p>
                  <strong>1 Bar = 100,000 Pascals (Pa)</strong>
                </p>
                <p className="mt-2 pt-2 border-t border-purple-200">
                  <strong>1 Atmosphere (atm) = 14.696 PSI</strong>
                </p>
                <p className="mt-2 pt-2 border-t border-purple-200">
                  <strong>1 PSI ≈ 6,894 Pascals (Pa)</strong>
                </p>
              </div>
            </>
          }
          example={
            <>
              <p>
                Let's convert a standard automotive tire pressure from the US
                system into a global standard.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                <li>
                  <strong>The Scenario:</strong> Your tires require an inflation
                  of exactly <strong>32 PSI (Pounds per Square Inch)</strong>.
                </li>
                <li>
                  <strong>The Conversion:</strong> Selecting "PSI" as your
                  From-value and "Bar" as your To-value, the calculator
                  multiplies 32 by the mechanical constant ~0.0689.
                </li>
                <li>
                  <strong>Result:</strong> 32 PSI safely converts to{" "}
                  <strong>2.206 Bar</strong>, allowing you to correctly set the
                  pressure on European air compressors.
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-gray-700">
              <li>
                <strong>Meteorology & Aviation:</strong> Pilots must calibrate
                instruments based on complex weather pressure systems. To ensure
                planes don't crash, they must convert local barometric readings
                (Inches of Mercury - inHg) to absolute global altimeter
                settings.
              </li>
              <li>
                <strong>Scuba Diving:</strong> Water is incredibly heavy. Divers
                use underwater pressure converters to calculate how many exact
                "Atmospheres" (atm) their bodies will be crushed by at deep
                depths to prevent nitrogen poisoning and the bends.
              </li>
              <li>
                <strong>Hydraulic Engineering:</strong> Heavy machinery relies
                on massive liquid fluid pressure to lift incredible weights.
                Designing these systems requires calculating how many Pascals of
                structural tension a pipe can handle before violently bursting.
              </li>
            </ul>
          }
          faqs={[
            {
              question: "What actually is an 'Atmosphere' of pressure?",
              answer:
                "1 Atmosphere (1 atm) represents the exact physical weight of the entire Earth's sky pushing down on your shoulders right now at sea level. It is equivalent to roughly 14.7 pounds of invisible air crushing every single square inch of your body.",
            },
            {
              question: "What does PSI stand for?",
              answer:
                "Pounds per Square Inch. It means that if you have a tire inflated to 30 PSI, the compressed air inside is physically pushing against the inner rubber walls with 30 pounds of forceful thrust across every 1x1 inch square of surface area.",
            },
            {
              question: "Why do we use 'Inches of Mercury' for weather?",
              answer:
                "In 1643, Evangelista Torricelli invented the barometer by filling a glass tube with dense, toxic mercury. As invisible weather air pressure pushed down on the dish, the mercury was forced directly up the tube. Reading how many 'inches' up the tube it travelled became the world's first accurate weather measurement.",
            },
          ]}
          relatedCalculators={[
            {
              name: "Force Calculator",
              path: "/force-calculator",
              desc: "Calculate the exact physical Newton force pushing down on a surface.",
            },
            {
              name: "Area Converter",
              path: "/area-converter",
              desc: "Understand the square spatial dimensions that pressure is applied against.",
            },
            {
              name: "Density Calculator",
              path: "/density-calculator",
              desc: "Explore how tightly mass is packed inside a specific pressurized volume.",
            },
          ]}
        />
      </div>
    </div>
  );
}
