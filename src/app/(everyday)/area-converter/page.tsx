"use client";

import { useState, useEffect } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

const units = [
  { id: "sq_meter", name: "Square Meter (m²)", factor: 1 },
  { id: "sq_kilometer", name: "Square Kilometer (km²)", factor: 1000000 },
  { id: "sq_centimeter", name: "Square Centimeter (cm²)", factor: 0.0001 },
  { id: "sq_millimeter", name: "Square Millimeter (mm²)", factor: 0.000001 },
  { id: "hectare", name: "Hectare (ha)", factor: 10000 },
  { id: "acre", name: "Acre (ac)", factor: 4046.8564224 },
  { id: "sq_mile", name: "Square Mile (mi²)", factor: 2589988.110336 },
  { id: "sq_yard", name: "Square Yard (yd²)", factor: 0.83612736 },
  { id: "sq_foot", name: "Square Foot (ft²)", factor: 0.09290304 },
  { id: "sq_inch", name: "Square Inch (in²)", factor: 0.00064516 },
];

export default function AreaConverter() {
  const [inputValue, setInputValue] = useState("1");
  const [fromUnit, setFromUnit] = useState("acre");
  const [toUnit, setToUnit] = useState("sq_foot");
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
      // Convert everything to base (Square Meters), then to target
      const valueInSqMeters = val * fromNode.factor;
      const finalValue = valueInSqMeters / toNode.factor;

      // Format scientifically if extreme, else fixed
      if (finalValue > 1e9 || (finalValue < 1e-4 && finalValue > 0)) {
        setResult(finalValue.toExponential(6));
      } else {
        setResult(parseFloat(finalValue.toFixed(6)).toString()); // removes trailing zeros
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
      <h1 className="text-4xl font-extrabold mb-4 text-emerald-800 border-b pb-4">
        Area Converter
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Instantly convert area and land measurements between acres, hectares,
        square feet, square meters, and more.
      </p>

      <div className="bg-emerald-50 p-6 md:p-10 rounded-2xl border border-emerald-100 relative">
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
                className="w-full rounded-xl border-gray-300 p-4 shadow-inner focus:border-emerald-500 font-black text-3xl text-gray-800 bg-white"
              />
            </div>
            <div>
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-emerald-500 font-bold bg-white text-gray-700 hover:border-emerald-300 cursor-pointer"
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
              className="bg-emerald-600 text-white p-4 rounded-full shadow-lg hover:bg-emerald-700 hover:scale-110 active:scale-95 transition-all focus:outline-none focus:ring-4 focus:ring-emerald-200"
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
                className="w-full rounded-xl border-transparent p-4 shadow-inner font-black text-3xl text-emerald-800 bg-emerald-100/50 focus:outline-none"
                placeholder="0"
              />
            </div>
            <div>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-emerald-500 font-bold bg-white text-gray-700 hover:border-emerald-300 cursor-pointer"
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

      <div className="mt-8 bg-gray-50 p-6 rounded-xl border border-gray-200">
        <h3 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wider">
          Quick Conversion Reference
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600">
          <div className="bg-white p-3 rounded shadow-sm">
            1 Acre = 43,560 sq ft
          </div>
          <div className="bg-white p-3 rounded shadow-sm">
            1 Hectare = 10,000 sq m
          </div>
          <div className="bg-white p-3 rounded shadow-sm">
            1 Sq Mile = 640 Acres
          </div>
          <div className="bg-white p-3 rounded shadow-sm">
            1 Acre ≈ 4,047 sq m
          </div>
          <div className="bg-white p-3 rounded shadow-sm">
            1 Hectare ≈ 2.471 Acres
          </div>
          <div className="bg-white p-3 rounded shadow-sm">
            1 Sq Meter = 10.764 sq ft
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Area Converter",
            operatingSystem: "All",
            applicationCategory: "UtilitiesApplication",
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title="Area Measurement Converter"
          whatIsIt={
            <p>
              Our <strong>Area Converter</strong> allows you to instantly
              translate 2D spatial measurements across various international and
              historical unit systems. Whether you are dealing with metric
              (Square Meters, Hectares) or Imperial/US Customary systems (Square
              Feet, Acres, Square Miles), this tool guarantees accurate
              mathematical conversions.
            </p>
          }
          formula={
            <>
              <p>
                To convert between modern area units, the tool establishes a
                baseline (Square Meters) and uses fixed scalar multiplication.
                Area is uniquely different from length conversion because it
                represents true two-dimensional space mapping (length × width).
              </p>
              <div className="bg-emerald-50 p-4 rounded-lg font-mono text-center text-[15px] shadow-sm my-4 flex flex-col gap-2 border border-emerald-100 text-emerald-900">
                <p>
                  <strong>1 Acre ≈ 43,560 Square Feet</strong>
                </p>
                <p className="mt-2 pt-2 border-t border-emerald-200">
                  <strong>1 Hectare = 10,000 Square Meters</strong>
                </p>
                <p className="mt-2 pt-2 border-t border-emerald-200">
                  <strong>1 Square Mile = 640 Acres</strong>
                </p>
              </div>
            </>
          }
          example={
            <>
              <p>
                Let's say you are buying a large piece of international farmland
                listed as 5 Hectares.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                <li>
                  <strong>The Conversion:</strong> Select "Hectare" as your
                  input and "Acre" as your output.
                </li>
                <li>
                  <strong>The Calculation:</strong> 1 Hectare represents exactly
                  10,000 square meters. The calculation converts 50,000 sq
                  meters back into the US Customary Acre scale.
                </li>
                <li>
                  <strong>Result:</strong> 5 Hectares translates to roughly{" "}
                  <strong>12.355 Acres</strong> of land.
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-gray-700">
              <li>
                <strong>Real Estate & Property:</strong> Global property markets
                use vastly different systems. A European apartment listed as 80
                Square Meters can be instantly translated to approximately 861
                Square Feet for US buyers.
              </li>
              <li>
                <strong>Agriculture & Farming:</strong> Crop yields and
                fertilizer volumes are rigorously calculated based on field
                acreage. Converting hectares to acres is essential for
                international farming logistics.
              </li>
              <li>
                <strong>Land Surveying:</strong> Large-scale city planners must
                convert massive municipal parcels measured in Square Miles into
                usable residential layout plots measured in specific Square
                Feet.
              </li>
            </ul>
          }
          faqs={[
            {
              question: "Why is an Acre exactly 43,560 square feet?",
              answer:
                "The Acre is an ancient medieval measurement originally defined as the exact amount of land a yoke of oxen could till in one full day. Over centuries, this was mathematically codified as a rectangle measuring one furlong (660 feet) by one chain (66 feet).",
            },
            {
              question: "Is a 'Square Mile' and an 'Acre' the same shape?",
              answer:
                "No. Area units do not describe specific shapes; they simply describe the total 2D space occupied. One acre can form a perfect square, a long skinny rectangle, or even a circle.",
            },
            {
              question: "What is a Hectare used for?",
              answer:
                "The Hectare (ha) is the gold standard for global industrial agriculture and wildlife preservation. Because 'Square Meters' are too small for massive forests, and 'Square Kilometers' are too large for individual farms, the 10,000 m² Hectare acts as the perfect metric middle ground.",
            },
          ]}
          relatedCalculators={[
            {
              name: "Length Converter",
              path: "/length-converter",
              desc: "Convert standard 1D linear distances (miles, kilometers, feet).",
            },
            {
              name: "Volume Converter",
              path: "/volume-converter",
              desc: "Convert complex 3D capacity measurements (gallons, liters, cubic meters).",
            },
            {
              name: "Rectangle Calculator",
              path: "/rectangle-calculator",
              desc: "Calculate the total area of a rectangle based strictly on its length and width.",
            },
          ]}
        />
      </div>
    </div>
  );
}
