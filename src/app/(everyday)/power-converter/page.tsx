"use client";

import { useState, useEffect } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

const units = [
  { id: "watt", name: "Watt (W)", factor: 1 },
  { id: "kilowatt", name: "Kilowatt (kW)", factor: 1000 },
  { id: "megawatt", name: "Megawatt (MW)", factor: 1000000 },
  {
    id: "horsepower_mech",
    name: "Horsepower (Mechanical - HP)",
    factor: 745.69987158227022,
  },
  {
    id: "horsepower_metric",
    name: "Horsepower (Metric - PS)",
    factor: 735.49875,
  },
  { id: "btu_per_hour", name: "BTU per hour (BTU/h)", factor: 0.293071 },
  {
    id: "calorie_per_second",
    name: "Calorie per second (cal/s)",
    factor: 4.184,
  },
];

export default function PowerConverter() {
  const [inputValue, setInputValue] = useState("1");
  const [fromUnit, setFromUnit] = useState("kilowatt");
  const [toUnit, setToUnit] = useState("horsepower_mech");
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
      // Convert everything to base (Watts), then to target
      const valueInWatts = val * fromNode.factor;
      const finalValue = valueInWatts / toNode.factor;

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
      <h1 className="text-4xl font-extrabold mb-4 text-yellow-600 border-b pb-4">
        Power Converter
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Convert electrical and mechanical power ratings between Watts,
        Kilowatts, Horsepower, and BTUs instantly.
      </p>

      <div className="bg-yellow-50 p-6 md:p-10 rounded-2xl border border-yellow-200 relative">
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
                className="w-full rounded-xl border-gray-300 p-4 shadow-inner focus:border-yellow-500 font-black text-3xl text-gray-800 bg-white"
              />
            </div>
            <div>
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-yellow-500 font-bold bg-white text-gray-700 hover:border-yellow-300 cursor-pointer"
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
              className="bg-yellow-500 text-white p-4 rounded-full shadow-lg hover:bg-yellow-600 hover:scale-110 active:scale-95 transition-all focus:outline-none focus:ring-4 focus:ring-yellow-200"
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
                className="w-full rounded-xl border-transparent p-4 shadow-inner font-black text-3xl text-yellow-800 bg-yellow-100/60 focus:outline-none"
                placeholder="0"
              />
            </div>
            <div>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-yellow-500 font-bold bg-white text-gray-700 hover:border-yellow-300 cursor-pointer"
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
            name: "Power Converter",
            operatingSystem: "All",
            applicationCategory: "UtilitiesApplication",
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title="Electrical & Mechanical Power Converter"
          whatIsIt={
            <p>
              Our <strong>Power Converter</strong> establishes parity between
              modern industrial, electrical, and mechanical energy flows. It
              translates the raw output speeds of motors, engines, and heaters
              into their corresponding mathematical equivalents across Watts,
              Kilowatts, Horsepower, and BTUs/hour.
            </p>
          }
          formula={
          <>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 font-mono text-lg text-indigo-700 text-center shadow-sm my-6">
              Result = Input × Conversion_Factor
            </div>
            <p className="text-sm text-slate-500 text-center">
              Precise unit translation for Power Converter using industry-standard conversion constants.
            </p>
          </>
        }
          example={
            <>
              <p>
                Let's convert a high-performance Italian sports car's engine
                power into household electricity flow.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                <li>
                  <strong>The Scenario:</strong> A massive V8 engine produces a
                  peak output of exactly{" "}
                  <strong>500 Mechanical Horsepower (HP)</strong>.
                </li>
                <li>
                  <strong>The Calculation:</strong> We select "Horsepower
                  (Mechanical)" as our From-value and "Kilowatt" as our
                  To-value. 500 HP × 0.7457 (the conversion scalar).
                </li>
                <li>
                  <strong>Result:</strong> That screaming V8 engine is producing
                  exactly <strong>372.8 Kilowatts (kW)</strong> of pure
                  mechanical transfer speed—equivalent to powering roughly three
                  hundred high-end gaming computers simultaneously.
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-gray-700">
              <li>
                <strong>Automotive Exports:</strong> While the US and UK rate
                cars strictly in Brake Horsepower (HP), mainland Europe often
                rates cars in Kilowatts (kW) or Metric Horsepower (PS /
                Pferdestärke). Dealerships rely on rapid conversions to legally
                standardize international import data.
              </li>
              <li>
                <strong>HVAC Industrial Systems:</strong> Modern industrial
                boiler ratings are incredibly complex, often mixing BTUs/hour
                (heat combustion) with required heavy electrical Kilowatts (pump
                power). Translating these systems prevents blown fuses and
                catastrophic overheating.
              </li>
              <li>
                <strong>Solar & Wind Farms:</strong> Renewable energy is often
                captured in millions of tiny increments. Green energy grids must
                calculate the total real-time "Megawatt" generation (an
                electrical flow rate) to ensure the local city has enough
                immediate grid tension to run without suffering rolling
                blackouts.
              </li>
            </ul>
          }
          faqs={[
            {
              question: "Is Horsepower literally the strength of one horse?",
              answer:
                "Originally, yes! In the 1700s, engineer James Watt needed a marketing gimmick to sell his new steam engines to coal miners, so he mathematically proved that his machine could reliably substitute the continuous, specific daily labor of one strong draft horse.",
            },
            {
              question: "What is a Watt?",
              answer:
                "A Watt is the foundational metric measurement of power (the speed at which energy is used). Biologically, a human brain resting operates at about 20 Watts. A lightbulb burns 60 Watts. A Formula 1 racecar burns 750,000 Watts.",
            },
            {
              question: "If I buy a 1000W generator, can I run a 1HP motor?",
              answer:
                "In a perfect universe, yes—1HP is only 746W. In reality, absolutely not. Physical electric motors suffer from induction friction and demand a massive 'surge' of initial starting power that far exceeds their continuous running average.",
            },
          ]}
          relatedCalculators={[
            {
              name: "Energy Converter",
              path: "/energy-converter/",
              desc: "Convert total accumulated physical energy rather than live transfer speeds.",
            },
            {
              name: "Work Calculator",
              path: "/work-calculator/",
              desc: "Calculate mechanical tasks successfully accomplished over physical distances.",
            },
            {
              name: "Ohm's Law Calculator",
              path: "/ohms-law-calculator/",
              desc: "Solve complex circuit formulas to determine live electrical Wattage.",
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
