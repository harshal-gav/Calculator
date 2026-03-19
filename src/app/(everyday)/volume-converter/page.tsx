"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

const VOLUME_UNITS = [
  // Metric
  { id: "ml", name: "Milliliters (mL)", factor: 1 },
  { id: "l", name: "Liters (L)", factor: 1000 },
  { id: "cm3", name: "Cubic Centimeters (cm³)", factor: 1 },
  { id: "m3", name: "Cubic Meters (m³)", factor: 1000000 },

  // US Customary
  { id: "tsp_us", name: "US Teaspoons (tsp)", factor: 4.92892 },
  { id: "tbsp_us", name: "US Tablespoons (tbsp)", factor: 14.7868 },
  { id: "floz_us", name: "US Fluid Ounces (fl oz)", factor: 29.5735 },
  { id: "cup_us", name: "US Cups", factor: 236.588 },
  { id: "pt_us", name: "US Pints (pt)", factor: 473.176 },
  { id: "qt_us", name: "US Quarts (qt)", factor: 946.353 },
  { id: "gal_us", name: "US Gallons (gal)", factor: 3785.41 },

  // Imperial (UK)
  { id: "floz_uk", name: "Imperial Fluid Ounces", factor: 28.4131 },
  { id: "pt_uk", name: "Imperial Pints", factor: 568.261 },
  { id: "gal_uk", name: "Imperial Gallons", factor: 4546.09 },
];

export default function VolumeConverter() {
  const [inputValue, setInputValue] = useState("1");
  const [inputUnit, setInputUnit] = useState("l");
  const [outputUnit, setOutputUnit] = useState("gal_us");

  const handleSwap = () => {
    setInputUnit(outputUnit);
    setOutputUnit(inputUnit);
  };

  let result = "";
  const val = parseFloat(inputValue);

  if (!isNaN(val)) {
    // Convert to base mL
    const inUnit = VOLUME_UNITS.find((u) => u.id === inputUnit);
    const outUnit = VOLUME_UNITS.find((u) => u.id === outputUnit);

    if (inUnit && outUnit) {
      const valueInMl = val * inUnit.factor;
      const convertedValue = valueInMl / outUnit.factor;

      if (convertedValue === 0) {
        result = "0";
      } else if (
        Math.abs(convertedValue) < 1e-6 ||
        Math.abs(convertedValue) > 1e9
      ) {
        result = convertedValue.toExponential(4);
      } else {
        result =
          convertedValue % 1 === 0
            ? convertedValue.toString()
            : convertedValue.toFixed(6).replace(/\.?0+$/, "");
      }
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8 bg-white rounded-2xl shadow-xl border border-sky-100">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-sky-900 flex items-center justify-center">
          <span className="mr-3">💧</span> Volume Converter
        </h1>
        <p className="text-sky-700 text-lg">
          Instantly convert volume measurements across metric, US customary, and
          Imperial units.
        </p>
      </div>

      <div className="bg-sky-50/50 p-6 md:p-8 rounded-2xl border border-sky-100 shadow-inner space-y-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center relative z-10">
          {/* Input */}
          <div className="md:col-span-2 space-y-2">
            <label className="block text-xs font-bold text-sky-800 uppercase tracking-widest">
              From
            </label>
            <div className="relative border border-sky-200 shadow-sm rounded-xl bg-white overflow-hidden transition-all focus-within:ring-2 focus-within:ring-sky-300 focus-within:border-sky-400">
              <input
                type="number"
                step="any"
                min="0"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full p-4 rounded-t-xl outline-none font-bold text-2xl text-slate-800"
                placeholder="0"
              />
              <select
                value={inputUnit}
                onChange={(e) => setInputUnit(e.target.value)}
                className="w-full bg-slate-50 border-t border-sky-100 p-3 outline-none cursor-pointer font-semibold text-sky-900"
              >
                <optgroup label="Metric">
                  {VOLUME_UNITS.slice(0, 4).map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="US Customary">
                  {VOLUME_UNITS.slice(4, 11).map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Imperial (UK)">
                  {VOLUME_UNITS.slice(11).map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name}
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>
          </div>

          {/* Swap Button */}
          <div className="md:col-span-1 flex justify-center py-4 md:py-0">
            <button
              onClick={handleSwap}
              className="bg-sky-600 hover:bg-sky-700 text-white rounded-full p-4 shadow-lg transform transition hover:scale-110 active:scale-95 border-4 border-white"
              title="Swap Units"
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

          {/* Output */}
          <div className="md:col-span-2 space-y-2">
            <label className="block text-xs font-bold text-sky-800 uppercase tracking-widest">
              To
            </label>
            <div className="relative border border-sky-200 shadow-sm rounded-xl bg-sky-900 overflow-hidden transition-all">
              <div className="w-full p-4 rounded-t-xl font-bold text-2xl text-white overflow-x-auto min-h-[64px] flex items-center">
                {result || "0"}
              </div>
              <select
                value={outputUnit}
                onChange={(e) => setOutputUnit(e.target.value)}
                className="w-full bg-sky-950 border-t border-sky-800 p-3 outline-none cursor-pointer font-semibold text-sky-200"
              >
                <optgroup label="Metric">
                  {VOLUME_UNITS.slice(0, 4).map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="US Customary">
                  {VOLUME_UNITS.slice(4, 11).map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Imperial (UK)">
                  {VOLUME_UNITS.slice(11).map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name}
                    </option>
                  ))}
                </optgroup>
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
            name: "Volume Converter",
            operatingSystem: "All",
            applicationCategory: "UtilitiesApplication",
          }),
        }}
      />

      <div className="mt-8 text-left">
        <CalculatorSEO
          title="Volume & Fluid Capacity Converter"
          whatIsIt={
            <p>
              Our <strong>Volume Converter</strong> instantly translates fluid
              capacities and 3D space measurements across Metric, US Customary,
              and British Imperial systems. Because different countries invented
              entirely different measurements for liquids (Liters vs. Gallons),
              baking (Milliliters vs. Cups), and science (Cubic Meters), this
              tool mathematically unifies them.
            </p>
          }
          formula={
            <>
              <p>
                To ensure perfect mathematical accuracy without continuous
                rounding errors, this calculator first converts your input into
                an absolute baseline <strong>Milliliters (mL)</strong>, and then
                scales that precise volume up or down into your requested target
                unit.
              </p>
              <div className="bg-sky-50 p-4 rounded-lg font-mono text-center text-[15px] shadow-sm my-4 flex flex-col gap-2 border border-sky-100 text-sky-900">
                <p>
                  <strong>1 Liter (L) = 1,000 Milliliters (mL)</strong>
                </p>
                <p className="mt-2 pt-2 border-t border-sky-200">
                  <strong>1 US Gallon = 3,785.41 mL (or ~3.78 Liters)</strong>
                </p>
                <p className="mt-2 pt-2 border-t border-sky-200">
                  <strong>1 US Cup = 236.58 mL</strong>
                </p>
              </div>
            </>
          }
          example={
            <>
              <p>
                Let's convert a European cake recipe requiring{" "}
                <strong>500 Milliliters (mL)</strong> of milk into standard
                American measuring cups.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-sky-800">
                <li>
                  <strong>The Input:</strong> 500 mL of milk.
                </li>
                <li>
                  <strong>The Conversion Ratio:</strong> We know that 1 standard
                  US Cup equates to exactly 236.588 mL.
                </li>
                <li>
                  <strong>The Math:</strong> 500 divided by 236.588.
                </li>
                <li>
                  <strong>The Result:</strong> Roughly{" "}
                  <strong>2.11 Cups</strong>. To make the recipe work perfectly
                  in an American kitchen, you would use 2 full cups plus 1-2
                  extra tablespoons.
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-sky-800">
              <li>
                <strong>Culinary Translations:</strong> Home chefs confidently
                converting complex European or British baking recipes
                mathematically into localized 'Cups' and 'Tablespoons' without
                ruining the delicate chemical ratios of the dough.
              </li>
              <li>
                <strong>Science & Engineering:</strong> Chemists translating
                fluid ounces into absolute liters to accurately measure molarity
                and chemical concentration in standard laboratory environments.
              </li>
              <li>
                <strong>International Travel:</strong> Americans renting cars in
                Europe or Canada calculating fuel economy by converting 40-Liter
                gas tanks back into familiar Gallons to predict their driving
                range.
              </li>
            </ul>
          }
          faqs={[
            {
              question:
                "Is there a difference between US Pints and UK Imperial Pints?",
              answer:
                "Yes, a massive one! The US broke away from the British system in 1824 before the British standardized their Imperial measurements. Today, a US Pint is 473 mL, but a UK Imperial Pint is exactly 20% larger at 568 mL.",
            },
            {
              question:
                "Are Milliliters (mL) and Cubic Centimeters (cm³) the exact same thing?",
              answer:
                "Yes. They are mathematically and physically identical. 1 mL of fluid fits perfectly inside a 1 cm³ box. In medicine, doctors often use 'cc' (cubic centimeters) to describe injections, which simply means milliliters.",
            },
            {
              question:
                "Why do 'Fluid Ounces' measure volume, but 'Ounces' measure weight?",
              answer:
                "This is a frustrating historical quirk of the Imperial system. A 'Fluid Ounce' measures how much SPACE a liquid occupies. A standard 'Ounce' measures how HEAVY a solid object is. They are completely different physics concepts.",
            },
          ]}
          relatedCalculators={[
            {
              name: "Cooking Measurement Converter",
              path: "/cooking-converter/",
              desc: "Instantly convert specialized kitchen and recipe ingredients.",
            },
            {
              name: "Gas Mileage Calculator",
              path: "/gas-mileage-calculator/",
              desc: "Calculate driving efficiency utilizing volume and distance.",
            },
            {
              name: "Weight Converter",
              path: "/weight-converter/",
              desc: "Convert mass metrics (Ounces to Grams) rather than volume.",
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
