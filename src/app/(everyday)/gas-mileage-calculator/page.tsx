"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function GasMileageCalculator() {
  const [distance, setDistance] = useState("350");
  const [gasUsed, setGasUsed] = useState("14");

  const [result, setResult] = useState<{
    mpg: number;
    lp100km: number;
    kmpl: number;
  } | null>(null);

  const calculate = () => {
    const d = parseFloat(distance); // typically miles
    const g = parseFloat(gasUsed); // typically gallons

    if (isNaN(d) || isNaN(g) || d <= 0 || g <= 0) {
      setResult(null);
      return;
    }

    // Base: miles per gallon (US)
    const mpg = d / g;

    // Convert miles to km (1 mile = 1.60934 km)
    const km = d * 1.60934;

    // Convert US gallons to Liters (1 gal = 3.78541 L)
    const liters = g * 3.78541;

    // Derived metrics
    const lp100km = (liters / km) * 100;
    const kmpl = km / liters;

    setResult({
      mpg,
      lp100km,
      kmpl,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-slate-900 flex items-center justify-center font-serif">
          <span className="mr-3">⛽</span> Gas Mileage Calculator
        </h1>
        <p className="text-slate-700 text-lg max-w-2xl mx-auto">
          Calculate your exact vehicle fuel efficiency (MPG, L/100km, km/L)
          based on distance driven and gas consumed.
        </p>
      </div>

      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-zinc-200 mb-8 max-w-2xl mx-auto border-t-8 border-t-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">
              Distance Driven (Miles)
            </label>
            <input
              type="number"
              step="any"
              min="0"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-slate-500 font-bold bg-zinc-50 text-xl"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">
              Gas Consumed (Gallons)
            </label>
            <input
              type="number"
              step="any"
              min="0"
              value={gasUsed}
              onChange={(e) => setGasUsed(e.target.value)}
              className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-slate-500 font-bold bg-zinc-50 text-xl"
              onKeyDown={(e) => e.key === "Enter" && calculate()}
            />
          </div>
        </div>

        <div>
          <button
            onClick={calculate}
            className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-slate-800/30 uppercase tracking-widest text-lg"
          >
            Calculate Mileage
          </button>
        </div>
      </div>

      {result !== null && (
        <div className="bg-slate-900 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-slate-700 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

          <div className="bg-black/40 p-10 w-full max-w-md rounded-2xl border border-slate-700 flex flex-col items-center text-center shadow-inner z-10 mb-6">
            <span className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Fuel Efficiency
            </span>
            <div className="font-mono text-white tracking-tight font-black text-6xl mt-2 truncate w-full">
              {result.mpg.toLocaleString("en-US", { maximumFractionDigits: 1 })}{" "}
              <span className="text-2xl text-slate-400 ml-1">MPG</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl z-10 relative">
            <div className="bg-slate-800/60 p-5 rounded-xl border border-slate-600/30 flex justify-between items-center px-8 shadow-sm">
              <span className="text-slate-400 text-xs font-bold uppercase tracking-wide">
                Litres per 100km
              </span>
              <div className="font-mono text-zinc-100 font-bold text-2xl truncate">
                {result.lp100km.toLocaleString("en-US", {
                  maximumFractionDigits: 2,
                })}{" "}
                L
              </div>
            </div>
            <div className="bg-slate-800/60 p-5 rounded-xl border border-slate-600/30 flex justify-between items-center px-8 shadow-sm">
              <span className="text-slate-400 text-xs font-bold uppercase tracking-wide">
                Kilometers per Litre
              </span>
              <div className="font-mono text-zinc-100 font-bold text-2xl truncate">
                {result.kmpl.toLocaleString("en-US", {
                  maximumFractionDigits: 2,
                })}{" "}
                km/L
              </div>
            </div>
          </div>
        </div>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Gas Mileage Calculator",
            operatingSystem: "All",
            applicationCategory: "UtilitiesApplication",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

      <CalculatorSEO
        title="Gas Mileage Calculator"
        whatIsIt={
          <>
            <p>
              Our <strong>Gas Mileage Calculator</strong> is a precise
              automotive tool that helps drivers determine their vehicle's exact
              fuel efficiency. Rather than relying on the manufacturer's often
              optimistic "estimated MPG", this tool uses your real-world driving
              data to calculate how efficiently your engine is currently
              operating.
            </p>
            <p>
              It instantly processes the raw data of Distance and Gas Consumed
              to output your efficiency in three major global formats:{" "}
              <strong>Miles Per Gallon (MPG)</strong> for the US,{" "}
              <strong>Litres per 100km (L/100km)</strong> for Europe, and{" "}
              <strong>Kilometers per Litre (km/L)</strong> for other metric
              systems.
            </p>

            <p className="mt-4 text-sm text-gray-500">
              <strong>Related Terms:</strong> Gas Mileage Calculator
            </p>
          </>
        }
        formula={
          <>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 font-mono text-lg text-indigo-700 text-center shadow-sm my-6">
              Gas Mileage Analysis Model
            </div>
            <p className="text-sm text-slate-500 text-center">
              This tool utilize standardized mathematical formulas and logic to calculate precise Gas Mileage results.
            </p>
          </>
        }
        example={
          <>
            <p>
              Let's say you take a road trip and drive exactly{" "}
              <strong>350 miles</strong>. When you stop at the gas station, it
              takes exactly <strong>14 gallons</strong> to fill your tank back
              up.
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>
                <strong>Step 1 (Identify Distance):</strong> 350 Miles
              </li>
              <li>
                <strong>Step 2 (Identify Volume):</strong> 14 Gallons
              </li>
              <li>
                <strong>Step 3 (Divide):</strong> 350 ÷ 14 = <strong>25</strong>
              </li>
              <li>
                <strong>Result:</strong> Your vehicle achieved exactly{" "}
                <strong>25.0 MPG</strong> on that specific trip.
              </li>
              <li>
                <strong>Metric Equivalents:</strong> This is roughly equal to
                9.41 Litres per 100km, or 10.63 Kilometers per Litre.
              </li>
            </ul>
          </>
        }
        useCases={
          <ul className="list-disc pl-6 space-y-4">
            <li>
              <strong>Vehicle Health Diagnostics:</strong> A sudden, unexplained
              drop in your vehicle's MPG is often the first mechanical warning
              sign of failing spark plugs, clogged air filters, or
              under-inflated tires.
            </li>
            <li>
              <strong>Road Trip Budgeting:</strong> By knowing your exact MPG,
              you can multiply it against the total distance of an upcoming road
              trip and current local gas prices to perfectly budget your fuel
              costs.
            </li>
            <li>
              <strong>Comparing New Cars:</strong> Calculating the long-term
              financial difference in fuel costs between buying a heavy SUV
              versus a highly efficient hybrid commuter car.
            </li>
          </ul>
        }
        faqs={[
          {
            question: "How do I accurately measure my gas consumed?",
            answer:
              "The 'Trip Odometer' method is the most accurate. 1. Fill your gas tank until the pump clicks off automatically. 2. Reset your trip odometer to zero. 3. Drive normally for several days. 4. Return to the gas station and fill the tank until it clicks off again. 5. The number of gallons displayed on the pump's receipt is your exact 'Gas Consumed', and the number on your dashboard is your 'Distance'.",
          },
          {
            question: "Why is my city MPG so much worse than my highway MPG?",
            answer:
              "Highway driving is a steady, continuous momentum with very little braking. City driving requires constant stopping and accelerating from zero. The physical act of moving a 4,000lb vehicle from a dead stop requires vastly more fuel and engine effort than keeping it moving at a sustained speed.",
          },
          {
            question: "Why do Europeans measure L/100km instead of km/L?",
            answer:
              "MPG and km/L measure 'Efficiency' (how far you can go on a strict unit of fuel). L/100km measures 'Consumption' (how much fuel it costs you to travel a strict distance). Many scientists argue that measuring Consumption is intuitively better for evaluating how much pollution or greenhouse gas a vehicle generates for a given journey.",
          },
        ]}
        relatedCalculators={[
          {
            name: "Speed Converter",
            path: "/speed-converter/",
            desc: "Instantly convert velocities like MPH, KM/H, and Knots.",
          },
          {
            name: "Percentage Calculator",
            path: "/percentage-calculator/",
            desc: "Calculate exact percentage increases or decreases.",
          },
          {
            name: "Volume Calculator",
            path: "/volume-calculator/",
            desc: "Calculate the geometric volume of 3D objects.",
          },
            {
              name: "Age Calculator",
              path: "/age-calculator/",
              desc: "Calculate your exact age in years, months, and days.",
            }]}
      />
    </div>
  );
}
