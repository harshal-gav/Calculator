"use client";

import { useState, useEffect } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

const units = [
  { id: "mpg_us", name: "Miles per US Gallon (mpg)", factorId: "mpg_us" },
  { id: "mpg_uk", name: "Miles per UK Gallon (mpg)", factorId: "mpg_uk" },
  { id: "l100km", name: "Liters per 100 km (L/100km)", factorId: "l100km" },
  { id: "km_l", name: "Kilometers per Liter (km/L)", factorId: "km_l" },
];

export default function FuelEconomyConverter() {
  const [fromValue, setFromValue] = useState("25");
  const [fromUnit, setFromUnit] = useState("mpg_us");
  const [toValue, setToValue] = useState("");
  const [toUnit, setToUnit] = useState("l100km");
  const [editing, setEditing] = useState<"from" | "to">("from");

  useEffect(() => {
    calculate();
  }, [fromValue, toValue, fromUnit, toUnit, editing]);

  // Conversion formulas:
  // mpg (US) to L/100km = 235.214583 / mpg
  // mpg (UK) to L/100km = 282.481 / mpg
  // km/L to L/100km = 100 / kmL

  // Everything converts to L/100km first, then to the target
  const convertToL100km = (val: number, unit: string) => {
    if (unit === "l100km") return val;
    if (unit === "mpg_us") return 235.214583 / val;
    if (unit === "mpg_uk") return 282.481 / val;
    if (unit === "km_l") return 100 / val;
    return 0;
  };

  const convertFromL100km = (val_l100km: number, targetUnit: string) => {
    if (targetUnit === "l100km") return val_l100km;
    if (targetUnit === "mpg_us") return 235.214583 / val_l100km;
    if (targetUnit === "mpg_uk") return 282.481 / val_l100km;
    if (targetUnit === "km_l") return 100 / val_l100km;
    return 0;
  };

  const calculate = () => {
    if (editing === "from") {
      const val = parseFloat(fromValue);
      if (!isNaN(val) && val > 0) {
        const asL100 = convertToL100km(val, fromUnit);
        const result = convertFromL100km(asL100, toUnit);
        setToValue(result.toFixed(2));
      } else {
        setToValue("");
      }
    } else {
      const val = parseFloat(toValue);
      if (!isNaN(val) && val > 0) {
        const asL100 = convertToL100km(val, toUnit);
        const result = convertFromL100km(asL100, fromUnit);
        setFromValue(result.toFixed(2));
      } else {
        setFromValue("");
      }
    }
  };

  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromValue(e.target.value);
    setEditing("from");
  };

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToValue(e.target.value);
    setEditing("to");
  };

  const swapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
    setEditing("from");
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-slate-800 rounded-xl shadow-2xl border border-slate-700 text-slate-100">
      <h1 className="text-4xl font-extrabold mb-4 text-emerald-400 border-b border-slate-700 pb-4 flex items-center">
        <span className="mr-3">⛽</span> Fuel Economy Converter
      </h1>
      <p className="mb-8 text-slate-300 text-lg">
        Convert gas mileage values between US MPG, UK MPG, L/100km, and km/L.
      </p>

      <div className="bg-slate-900 p-6 md:p-10 rounded-2xl border border-slate-700 shadow-inner">
        <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-6 items-center">
          {/* From Input */}
          <div className="space-y-4">
            <select
              value={fromUnit}
              onChange={(e) => {
                setFromUnit(e.target.value);
                setEditing("from");
              }}
              className="w-full bg-slate-800 text-white font-bold p-4 rounded-xl border border-slate-600 outline-none focus:border-emerald-500 transition-colors shadow-sm"
            >
              {units.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              step="any"
              min="0.1"
              value={fromValue}
              onChange={handleFromChange}
              className={`w-full rounded-xl border-2 p-6 text-4xl font-black text-center text-white outline-none transition-colors ${editing === "from" ? "bg-emerald-900 border-emerald-500" : "bg-slate-800 border-slate-600"}`}
              placeholder="0"
            />
          </div>

          {/* Swap Icon */}
          <div className="flex justify-center py-4">
            <button
              className="bg-slate-700 rounded-full p-4 text-slate-300 hover:bg-slate-600 hover:text-white transition-colors shadow-md border border-slate-500"
              onClick={swapUnits}
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

          {/* To Input */}
          <div className="space-y-4">
            <select
              value={toUnit}
              onChange={(e) => {
                setToUnit(e.target.value);
                setEditing("to");
              }}
              className="w-full bg-slate-800 text-white font-bold p-4 rounded-xl border border-slate-600 outline-none focus:border-emerald-500 transition-colors shadow-sm"
            >
              {units.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              step="any"
              min="0.1"
              value={toValue}
              onChange={handleToChange}
              className={`w-full rounded-xl border-2 p-6 text-4xl font-black text-center text-white outline-none transition-colors ${editing === "to" ? "bg-emerald-900 border-emerald-500" : "bg-slate-800 border-slate-600"}`}
              placeholder="0"
            />
          </div>
        </div>
      </div>

      {/* Quick Chart */}
      <div className="mt-8 bg-slate-900 p-6 rounded-2xl border border-slate-700">
        <h3 className="font-bold text-slate-400 tracking-wider text-sm mb-4 border-b border-slate-800 pb-2 uppercase">
          Quick Reference
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm font-mono text-center">
          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
            <div className="text-white font-bold text-lg mb-1">10 L/100km</div>
            <div className="text-slate-400">= 23.5 MPG (US)</div>
          </div>
          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
            <div className="text-white font-bold text-lg mb-1">5 L/100km</div>
            <div className="text-slate-400">= 47.0 MPG (US)</div>
          </div>
          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
            <div className="text-white font-bold text-lg mb-1">30 MPG (US)</div>
            <div className="text-slate-400">= 7.8 L/100km</div>
          </div>
          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
            <div className="text-white font-bold text-lg mb-1">40 MPG (US)</div>
            <div className="text-slate-400">= 5.9 L/100km</div>
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Fuel Economy Converter",
            operatingSystem: "All",
            applicationCategory: "UtilitiesApplication",
          }),
        }}
      />

      <div className="mt-8 text-left">
        <CalculatorSEO
          title="Vehicle Gas Mileage & Efficiency Converter"
          whatIsIt={
            <p>
              The <strong>Fuel Economy Converter</strong> is an automotive
              utility that bridges the gap between competing global efficiency
              standards. It translates 'distance-based' metrics like Miles per
              Gallon (US and UK) into 'volume-based' consumption metrics like
              Liters per 100 Kilometers (L/100km).
            </p>
          }
          formula={
            <>
              <p>
                Because the US system measures "How far can I go on one unit of
                fuel?" while the European system measures "How much fuel is
                required to go a fixed distance?", the conversion requires an
                inverse mathematical translation anchored against the metric
                constants of the mile and the specific gallon variant.
              </p>
              <div className="bg-slate-800 p-4 rounded-lg font-mono text-center text-[15px] shadow-sm my-4 flex flex-col gap-2 border border-slate-700 text-slate-300">
                <p>
                  <strong>MPG (US) to L/100km = 235.215 ÷ Math.Abs(MPG)</strong>
                </p>
                <p className="mt-2 pt-2 border-t border-slate-700">
                  <strong>MPG (UK) to L/100km = 282.481 ÷ Math.Abs(MPG)</strong>
                </p>
                <p className="mt-2 pt-2 border-t border-slate-700">
                  <strong>km/L to L/100km = 100 ÷ Math.Abs(km/L)</strong>
                </p>
              </div>
            </>
          }
          example={
            <>
              <p>
                Let's convert a standard European rating of{" "}
                <strong>8.0 L/100km</strong> into a recognizable American US MPG
                figure.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-slate-400">
                <li>
                  <strong>The Input:</strong> 8.0 Liters consumed over a 100km
                  distance.
                </li>
                <li>
                  <strong>The Inversion Constant:</strong> We divide the US
                  constant 235.215 by our input number.
                </li>
                <li>
                  <strong>The Math:</strong> 235.215 / 8.0
                </li>
                <li>
                  <strong>Result:</strong> An efficiency rating of 8.0 L/100km
                  equals roughly <strong>29.4 MPG (US)</strong>.
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-slate-400">
              <li>
                <strong>Buying Imported Vehicles:</strong> Comparing the
                advertised fuel efficiency of a German or Japanese import
                (displayed strictly in L/100km or km/L) directly against
                domestic American car MPG ratings on a dealership lot.
              </li>
              <li>
                <strong>International Road Trips:</strong> An American driving a
                rental car across Europe needs to estimate the cost of a long
                journey, requiring a mental conversion from the car's metric
                dashboard display into familiar imperial fuel constraints.
              </li>
              <li>
                <strong>Automotive Journalism:</strong> Reviewers evaluating
                global cars must rapidly translate mechanical specs so their
                diverse audience demographic inherently understands the
                vehicle's economy without doing the mental math.
              </li>
            </ul>
          }
          faqs={[
            {
              question: "Why is a US Gallon different from a UK Gallon?",
              answer:
                "Historical standardization! A US liquid gallon legally contains exactly 3.78541 liters. A UK 'Imperial' gallon legally contains exactly 4.54609 liters. Because the UK Gallon is ~20% physically larger, UK MPG numbers always appear artificially higher/better than US MPG for the exact same car.",
            },
            {
              question: "Why is L/100km inverted compared to MPG?",
              answer:
                "MPG asks 'Distance per Fuel' (higher is better). L/100km asks 'Fuel per Distance' (lower is better). The European system inherently measures active consumption rate, making it far more mathematically proportional when calculating exact trip costs compared to the abstract fraction of MPG.",
            },
            {
              question: "Do hybrid cars calculate efficiency differently?",
              answer:
                "Yes, modern EVs and Hybrids use MPGe (Miles Per Gallon Equivalent). It uses an EPA energy baseline metric stating that 33.7 kilowatt-hours (kWh) of electricity contains exactly the equivalent thermal energy pool as one physical gallon of gasoline.",
            },
          ]}
          relatedCalculators={[
            {
              name: "Gas Mileage Calculator",
              path: "/gas-mileage-calculator/",
              desc: "Calculate your vehicle's actual real-world MPG based on your odometer.",
            },
            {
              name: "Distance Calculator",
              path: "/distance-calculator/",
              desc: "Calculate exact travel distance to plan fuel requirements.",
            },
            {
              name: "Speed Converter",
              path: "/speed-converter/",
              desc: "Convert dashboard speeds between MPH and KPH seamlessly.",
            },
            {
              name: "Roman Numeral Converter",
              path: "/roman-numeral-converter/",
              desc: "Convert between standard numbers and Roman numerals.",
            }]}
        />
      </div>
    </div>
  );
}
