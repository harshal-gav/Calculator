"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function PaceCalculator() {
  // Distance
  const [distance, setDistance] = useState("5");
  const [distanceUnit, setDistanceUnit] = useState("km"); // 'km' or 'miles'

  // Time
  const [hours, setHours] = useState("0");
  const [minutes, setMinutes] = useState("30");
  const [seconds, setSeconds] = useState("0");

  const [result, setResult] = useState<{
    paceMinPerKm: string;
    paceMinPerMile: string;
    speedKmH: number;
    speedMph: number;
  } | null>(null);

  const calculatePace = () => {
    const h = parseInt(hours) || 0;
    const m = parseInt(minutes) || 0;
    const s = parseInt(seconds) || 0;
    const dist = parseFloat(distance) || 0;

    const totalMinutes = h * 60 + m + s / 60;
    const totalHours = totalMinutes / 60;

    if (totalMinutes > 0 && dist > 0) {
      let distKm = dist;
      let distMiles = dist;

      if (distanceUnit === "km") {
        distMiles = dist * 0.621371;
      } else {
        distKm = dist * 1.60934;
      }

      // Pace = Time / Distance
      const minPerKm = totalMinutes / distKm;
      const minPerMile = totalMinutes / distMiles;

      // Speed = Distance / Time (in hours)
      const speedKmH = distKm / totalHours;
      const speedMph = distMiles / totalHours;

      // Format pace (e.g. 5.5 minutes -> 5:30)
      const formatPace = (decimalMinutes: number) => {
        const mins = Math.floor(decimalMinutes);
        const secs = Math.round((decimalMinutes - mins) * 60);
        return `${mins}:${secs.toString().padStart(2, "0")}`;
      };

      setResult({
        paceMinPerKm: formatPace(minPerKm),
        paceMinPerMile: formatPace(minPerMile),
        speedKmH,
        speedMph,
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-sky-600 border-b pb-4">
        Pace Calculator
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Calculate your running pace and speed per kilometer and per mile based
        on a specific race distance and time.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="bg-sky-50 p-6 rounded-xl border border-sky-100 space-y-6 flex flex-col justify-center">
          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Distance
              </label>
              <input
                type="number"
                step="0.01"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-sky-500 font-bold text-lg"
              />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Unit
              </label>
              <select
                value={distanceUnit}
                onChange={(e) => setDistanceUnit(e.target.value)}
                className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-sky-500 font-bold bg-white text-gray-700 h-[52px]"
              >
                <option value="km">Km</option>
                <option value="miles">Miles</option>
              </select>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-sky-100 shadow-sm relative pt-6 mt-4">
            <div className="absolute top-0 left-0 -mt-3 ml-4 bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-widest px-2 py-1 rounded shadow-sm">
              Total Time
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">
                  Hours
                </label>
                <input
                  type="number"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  className="w-full rounded-lg border-gray-300 p-2 text-center shadow-sm focus:border-sky-500 font-bold text-lg"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">
                  Mins
                </label>
                <input
                  type="number"
                  value={minutes}
                  onChange={(e) => setMinutes(e.target.value)}
                  className="w-full rounded-lg border-gray-300 p-2 text-center shadow-sm focus:border-sky-500 font-bold text-lg"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">
                  Secs
                </label>
                <input
                  type="number"
                  value={seconds}
                  onChange={(e) => setSeconds(e.target.value)}
                  className="w-full rounded-lg border-gray-300 p-2 text-center shadow-sm focus:border-sky-500 font-bold text-lg"
                />
              </div>
            </div>
          </div>

          <button
            onClick={calculatePace}
            className="w-full bg-sky-600 text-white font-bold py-4 rounded-xl hover:bg-sky-700 transition shadow-lg uppercase tracking-wide"
          >
            Calculate Target Pace
          </button>
        </div>

        {/* Results Screen */}
        <div className="bg-white border-2 border-sky-100 rounded-xl overflow-hidden shadow-sm flex flex-col justify-center">
          {result !== null ? (
            <>
              <div className="p-8 text-center space-y-4 bg-sky-50 border-b border-sky-100">
                <div>
                  <h3 className="text-sky-800 font-bold uppercase tracking-widest text-[11px] mb-2">
                    Target Pace (Per Km)
                  </h3>
                  <div className="text-6xl font-black text-gray-900 drop-shadow-sm">
                    {result.paceMinPerKm}{" "}
                    <span className="text-xl text-gray-500 font-medium tracking-tight">
                      /km
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-3 bg-white flex-grow">
                <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50 border border-gray-100">
                  <span className="font-bold text-gray-500 uppercase text-xs tracking-widest">
                    Pace Per Mile
                  </span>
                  <span className="font-black text-lg text-gray-800">
                    {result.paceMinPerMile}{" "}
                    <span className="text-xs font-normal">/mi</span>
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg border border-gray-100">
                  <span className="font-bold text-gray-500 uppercase text-xs tracking-widest">
                    Speed (Km/h)
                  </span>
                  <span className="font-bold text-md text-gray-800">
                    {result.speedKmH.toFixed(2)} km/h
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg border border-gray-100 shadow-inner">
                  <span className="font-bold text-gray-500 uppercase text-xs tracking-widest">
                    Speed (Mph)
                  </span>
                  <span className="font-bold text-md text-gray-800">
                    {result.speedMph.toFixed(2)} mph
                  </span>
                </div>
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center text-center text-sky-300 font-medium px-8 text-lg leading-relaxed">
              Input your exact race distance and goal time to reveal your
              required running splits and average speed.
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
            name: "Pace Calculator",
            operatingSystem: "All",
            applicationCategory: "HealthApplication",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title="Running Pace & Speed Calculator"
          whatIsIt={
            <>
              <p>
                The <strong>Pace Calculator</strong> breaks down exact running
                splits by calculating the precise minute-per-mile or
                minute-per-kilometer pace necessary to hit a target race time.
              </p>
              <p>
                Whether you are trying to break 2 hours in a half-marathon or
                trying to pass a military fitness test, relying on 'feel' is
                dangerous. This tool translates your ultimate time goal into the
                strict mathematical rhythm your smartwatch needs to display.
              </p>

              <p className="mt-4 text-sm text-gray-500">
                <strong>Related Terms:</strong> Pace Calculator
              </p>
            </>
          }
          formula={
            <>
              <p>
                Pace is simply the mathematical inversion of speed, representing
                Time over Distance rather than Distance over Time:
              </p>
              <div className="bg-sky-50 p-4 rounded-lg font-mono text-center text-[15px] shadow-sm my-4 text-sky-900 border border-sky-100">
                <strong>Pace = Total Time ÷ Total Distance</strong>
              </div>
              <p className="text-sm mt-2">
                The calculator then runs a strict conversion matrix (1 mile =
                1.60934 kilometers) to ensure athletes can translate splits
                across metric and imperial race standards.
              </p>
            </>
          }
          example={
            <>
              <p>
                Suppose your goal is to break the mythical{" "}
                <strong>4-hour barrier</strong> for a full marathon (
                <strong>26.2 miles</strong>).
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                <li>
                  <strong>The Input:</strong> Distance = 26.2 Miles, Time = 3 hr
                  59 min 59 sec.
                </li>
                <li>
                  <strong>The Math:</strong> 239.98 total minutes ÷ 26.2.
                </li>
                <li>
                  <strong>The Required Pace:</strong> You must maintain exactly{" "}
                  <strong>9 minutes and 9 seconds per mile (9:09/mi)</strong>.
                </li>
                <li>
                  <strong>The Metric Translation:</strong> If your watch is set
                  to metric, you must run exactly{" "}
                  <strong>
                    5 minutes and 41 seconds per kilometer (5:41/km)
                  </strong>{" "}
                  across the entire 42.195 km course.
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-gray-700">
              <li>
                <strong>Race Day Pacing Plans:</strong> Programming a GPS watch
                with strict upper and lower pace boundaries to prevent "blowing
                up" (running too fast in the first 3 miles due to adrenaline).
              </li>
              <li>
                <strong>Treadmill Translations:</strong> Most treadmills display
                speed in MPH (e.g., 7.0 mph). The calculator instantly
                translates that 7.0 mph into an 8:34/mi outdoor tracking pace.
              </li>
              <li>
                <strong>Track Workout Splits:</strong> Calculating the exact
                pace required for 400m intervals based on a 5k personal best
                goal.
              </li>
            </ul>
          }
          faqs={[
            {
              question: "What is a 'Negative Split'?",
              answer:
                "A negative split is a pacing strategy where you run the second half of a race faster than the first half. Many elite athletes aim for an average pace that accommodates starting slightly slower and finishing strongly.",
            },
            {
              question:
                "Why does my GPS watch say I ran further than the official race distance?",
              answer:
                "Official race distances (like a 26.2 mile marathon) measure the absolute shortest possible path 'as the crow flies' on the corners. Because it is impossible for humans to run the perfect 'blue line', runners always weave and run slightly further (e.g., 26.4 miles). Always pace for a slightly longer distance than the official marker.",
            },
            {
              question: "What is a good pace for a beginner?",
              answer:
                "For most adult beginners, maintaining a continuous running pace between 10:00/mile (6:12/km) and 12:00/mile (7:27/km) is an excellent aerobic baseline.",
            },
          ]}
          relatedCalculators={[
            {
              name: "Calories Burned Calculator",
              path: "/calories-burned-calculator",
              desc: "Calculate the exact metabolic cost of hitting that specific pace.",
            },
            {
              name: "TDEE Calculator",
              path: "/tdee-calculator",
              desc: "See how your rigorous training plan impacts your total daily caloric baseline.",
            },
            {
              name: "Velocity Calculator",
              path: "/velocity-calculator",
              desc: "For raw physics kinematics without the running-specific split formatting.",
            },
          ]}
        />
      </div>
    </div>
  );
}
