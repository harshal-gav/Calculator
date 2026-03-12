"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function TimeCalculator() {
  const [h1, setH1] = useState("0");
  const [m1, setM1] = useState("0");
  const [s1, setS1] = useState("0");

  const [h2, setH2] = useState("0");
  const [m2, setM2] = useState("0");
  const [s2, setS2] = useState("0");

  const [operation, setOperation] = useState("+");

  const [result, setResult] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
    totalSeconds: number;
    isNegative: boolean;
  } | null>(null);

  const calculateTime = () => {
    // Convert everything to seconds first
    const t1Seconds =
      (parseInt(h1) || 0) * 3600 +
      (parseInt(m1) || 0) * 60 +
      (parseInt(s1) || 0);
    const t2Seconds =
      (parseInt(h2) || 0) * 3600 +
      (parseInt(m2) || 0) * 60 +
      (parseInt(s2) || 0);

    let finalSeconds = 0;

    if (operation === "+") {
      finalSeconds = t1Seconds + t2Seconds;
    } else {
      finalSeconds = t1Seconds - t2Seconds;
    }

    const isNeg = finalSeconds < 0;
    let absSeconds = Math.abs(finalSeconds);

    const hours = Math.floor(absSeconds / 3600);
    absSeconds %= 3600;
    const minutes = Math.floor(absSeconds / 60);
    const seconds = absSeconds % 60;

    setResult({
      hours,
      minutes,
      seconds,
      totalSeconds: finalSeconds,
      isNegative: isNeg,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-violet-900 border-b pb-4">
        Time Calculator
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Add or subtract blocks of time easily in hours, minutes, and seconds.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="bg-violet-50 p-6 rounded-xl border border-violet-100 space-y-6">
          {/* Time 1 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Time 1
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={h1}
                onChange={(e) => setH1(e.target.value)}
                className="w-1/3 rounded-lg border-gray-300 p-3 shadow-sm focus:border-violet-500 text-center font-bold"
                placeholder="H"
              />
              <span className="font-bold text-violet-400">:</span>
              <input
                type="number"
                value={m1}
                onChange={(e) => setM1(e.target.value)}
                className="w-1/3 rounded-lg border-gray-300 p-3 shadow-sm focus:border-violet-500 text-center font-bold"
                placeholder="M"
              />
              <span className="font-bold text-violet-400">:</span>
              <input
                type="number"
                value={s1}
                onChange={(e) => setS1(e.target.value)}
                className="w-1/3 rounded-lg border-gray-300 p-3 shadow-sm focus:border-violet-500 text-center font-bold"
                placeholder="S"
              />
            </div>
            <div className="flex gap-2 mt-1 px-1 text-xs text-gray-500 font-semibold uppercase tracking-wider text-center">
              <div className="w-1/3">Hrs</div>
              <div className="w-4"></div>
              <div className="w-1/3">Min</div>
              <div className="w-4"></div>
              <div className="w-1/3">Sec</div>
            </div>
          </div>

          {/* Operation */}
          <div className="flex justify-center my-4">
            <select
              value={operation}
              onChange={(e) => setOperation(e.target.value)}
              className="rounded-full px-6 py-2 border-2 border-violet-300 bg-white font-black text-2xl text-violet-700 focus:outline-none focus:ring-4 focus:ring-violet-200 cursor-pointer text-center"
            >
              <option value="+">+</option>
              <option value="-">-</option>
            </select>
          </div>

          {/* Time 2 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Time 2
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={h2}
                onChange={(e) => setH2(e.target.value)}
                className="w-1/3 rounded-lg border-gray-300 p-3 shadow-sm focus:border-violet-500 text-center font-bold"
                placeholder="H"
              />
              <span className="font-bold text-violet-400">:</span>
              <input
                type="number"
                value={m2}
                onChange={(e) => setM2(e.target.value)}
                className="w-1/3 rounded-lg border-gray-300 p-3 shadow-sm focus:border-violet-500 text-center font-bold"
                placeholder="M"
              />
              <span className="font-bold text-violet-400">:</span>
              <input
                type="number"
                value={s2}
                onChange={(e) => setS2(e.target.value)}
                className="w-1/3 rounded-lg border-gray-300 p-3 shadow-sm focus:border-violet-500 text-center font-bold"
                placeholder="S"
              />
            </div>
            <div className="flex gap-2 mt-1 px-1 text-xs text-gray-500 font-semibold uppercase tracking-wider text-center">
              <div className="w-1/3">Hrs</div>
              <div className="w-4"></div>
              <div className="w-1/3">Min</div>
              <div className="w-4"></div>
              <div className="w-1/3">Sec</div>
            </div>
          </div>

          <button
            onClick={calculateTime}
            className="w-full bg-violet-600 text-white font-bold py-4 rounded-xl hover:bg-violet-700 transition shadow-lg uppercase tracking-wide mt-2"
          >
            Calculate Time
          </button>
        </div>

        {/* Results Screen */}
        <div className="bg-white border-2 border-violet-100 rounded-xl overflow-hidden shadow-sm flex flex-col items-center justify-center p-8 min-h-[300px]">
          {result !== null ? (
            <div className="w-full text-center space-y-6">
              <div>
                <h3 className="text-violet-800 font-semibold uppercase tracking-wider text-sm mb-4">
                  Calculated Result
                </h3>
                <div className="text-5xl md:text-6xl font-black text-gray-900 drop-shadow-sm font-mono tracking-tighter">
                  {result.isNegative && (
                    <span className="text-red-500 mr-2">-</span>
                  )}
                  {String(result.hours).padStart(2, "0")}:
                  {String(result.minutes).padStart(2, "0")}:
                  {String(result.seconds).padStart(2, "0")}
                </div>
              </div>

              <div className="h-px w-full bg-violet-100"></div>

              <div className="grid grid-cols-2 gap-4 text-left">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <h4 className="text-gray-500 font-bold uppercase text-xs mb-1">
                    Total Hours
                  </h4>
                  <p className="text-xl font-bold text-gray-800">
                    {(result.totalSeconds / 3600).toFixed(4)}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <h4 className="text-gray-500 font-bold uppercase text-xs mb-1">
                    Total Minutes
                  </h4>
                  <p className="text-xl font-bold text-gray-800">
                    {(result.totalSeconds / 60).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-violet-300 font-medium text-center text-lg max-w-xs">
              Define two blocks of time to add or subtract them directly.
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
            name: "Time Calculator",
            operatingSystem: "All",
            applicationCategory: "UtilitiesApplication",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

      <CalculatorSEO
        title="Time Calculator"
        whatIsIt={
          <>
            <p>
              Our <strong>Time Calculator</strong> is a specialized utility
              designed to instantly add or subtract two distinct blocks of time.
              While standard calculators struggle with the sexagesimal (base-60)
              number system used for modern clocks, our tool processes hours,
              minutes, and seconds natively.
            </p>
            <p>
              Whether you need to calculate total hours worked on a timesheet,
              subtract splits during a marathon, or determine the total runtime
              of a video playlist, this calculator instantly outputs the exact
              duration in a standard HH:MM:SS format.
            </p>

            <p className="mt-4 text-sm text-gray-500">
              <strong>Related Terms:</strong> Time Calculator
            </p>
          </>
        }
        formula={
          <>
            <p>
              Time mathematics requires converting all values into their
              smallest base unit (seconds), performing standard arithmetic, and
              then breaking the result back out into base-60 chunks.
            </p>
            <div className="bg-white p-4 rounded-lg font-mono text-center text-[15px] shadow-sm my-4 overflow-x-auto space-y-4 text-violet-900 border border-violet-100">
              <p>
                <strong>Total Seconds =</strong> (Hours × 3600) + (Minutes × 60)
                + Seconds
              </p>
              <p className="border-t border-violet-100 pt-4 mt-4 text-sm font-sans text-left text-gray-700">
                <strong>Conversion Back:</strong>
                <br />
                1. Hours = Floor(Total Seconds ÷ 3600)
                <br />
                2. Minutes = Floor(Remaining Seconds ÷ 60)
                <br />
                3. Seconds = Remaining Seconds
              </p>
            </div>
          </>
        }
        example={
          <>
            <p>
              Let's find the total time of an audio project by adding{" "}
              <strong>2 hours, 45 minutes, and 30 seconds</strong> to{" "}
              <strong>1 hour, 30 minutes, and 45 seconds</strong>.
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>
                <strong>Step 1 (Combine Seconds):</strong> 30 + 45 = 75 seconds.
                Because this is over 60, we keep <strong>15 seconds</strong> and
                carry 1 minute over.
              </li>
              <li>
                <strong>Step 2 (Combine Minutes):</strong> 45 + 30 + 1 (carried)
                = 76 minutes. We keep <strong>16 minutes</strong> and carry 1
                hour over.
              </li>
              <li>
                <strong>Step 3 (Combine Hours):</strong> 2 + 1 + 1 (carried) ={" "}
                <strong>4 hours</strong>.
              </li>
              <li>
                <strong>Result:</strong> Exactly 4 hours, 16 minutes, and 15
                seconds (04:16:15).
              </li>
            </ul>
          </>
        }
        useCases={
          <ul className="list-disc pl-6 space-y-4">
            <li>
              <strong>Payroll and Hourly Billing:</strong> Accurately summing up
              timestamps across a two-week period to invoice clients or process
              employee timesheets without losing money to rounding errors.
            </li>
            <li>
              <strong>Media Editing:</strong> Video editors determining exact
              frame cut-points or calculating the total runtime of a multi-scene
              film sequence.
            </li>
            <li>
              <strong>Aviation Logbooks:</strong> Pilots logging flight time
              natively in hours and minutes to meet strict FAA regulatory hours
              requirements.
            </li>
            <li>
              <strong>Athletic Training:</strong> Runners and cyclists adding
              interval laps together to determine their total active workout
              duration.
            </li>
          </ul>
        }
        faqs={[
          {
            question:
              "Can I enter more than 60 minutes or 60 seconds into the inputs?",
            answer:
              "Yes! If you enter '0 Hours, 90 Minutes', our calculator will automatically interpret and reformat it as 1 Hour and 30 Minutes behind the scenes before performing the requested calculation.",
          },
          {
            question:
              "What happens if I subtract a larger time from a smaller time?",
            answer:
              "The calculator natively handles negative time outcomes. For example, subtracting 2 hours from 1 hour will mathematically result in '-1 Hours'. This mathematical flexibility is crucial for calculating complex offset differences and countdown timers.",
          },
          {
            question: "Why do standard calculators fail at time math?",
            answer:
              "Standard calculators use a base-10 (decimal) system, meaning they roll over every 10, 100, or 1000. Time uses a base-60 system (60 seconds, 60 minutes). If you try to add 1.30 + 1.45 on a normal calculator, it gives you 2.75, rather than the correct time of 3 hours and 15 minutes.",
          },
        ]}
        relatedCalculators={[
          {
            name: "Date Calculator",
            path: "/date-calculator",
            desc: "Add or subtract exact days, weeks, or months from any given date.",
          },
          {
            name: "Age Calculator",
            path: "/age-calculator",
            desc: "Calculate your chronological age in exact days and weeks.",
          },
          {
            name: "Time Zone Converter",
            path: "/time-zone-converter",
            desc: "Convert times across hundreds of global time zones instantly.",
          },
            {
              name: "Temperature Converter",
              path: "/temperature-converter",
              desc: "Convert between Celsius, Fahrenheit, and Kelvin.",
            }]}
      />
    </div>
  );
}
