"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

import businessDaysSeoData from "@/data/seo-content/official/business-days-calculator.json";

export default function BusinessDaysCalculator() {
  const today = new Date();
  const localTodayStr = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000,
  )
    .toISOString()
    .split("T")[0];

  const [startDate, setStartDate] = useState(localTodayStr);
  const [endDate, setEndDate] = useState(localTodayStr);
  const [excludeSaturday, setExcludeSaturday] = useState(true);
  const [excludeSunday, setExcludeSunday] = useState(true);

  const [result, setResult] = useState<{
    businessDays: number;
    totalDays: number;
    weekendDays: number;
  } | null>(null);

  const [error, setError] = useState("");

  const calculate = () => {
    setError("");
    if (!startDate || !endDate) return;

    const start = new Date(startDate);
    const end = new Date(endDate);

    // Normalize to local timezone midnight
    start.setMinutes(start.getMinutes() + start.getTimezoneOffset());
    end.setMinutes(end.getMinutes() + end.getTimezoneOffset());

    if (start > end) {
      setError("End date must be on or after the start date.");
      setResult(null);
      return;
    }

    const diffTime = end.getTime() - start.getTime();
    const totalDays = Math.round(diffTime / (1000 * 60 * 60 * 24)); // NOT including end date by default in span counts

    // Loop through days and count
    let bDays = 0;
    let wDays = 0;

    // We include the start date, typically. Let's include start date and exclude end date (standard span).
    // If they want inclusive of end date, we add 1 to the loop. Let's make it inclusive.
    const totalLoopDays = totalDays + 1;

    let currentDate = new Date(start);

    for (let i = 0; i < totalLoopDays; i++) {
      const dayOfWeek = currentDate.getDay(); // 0 is Sunday, 6 is Saturday
      let isBusinessDay = true;

      if (dayOfWeek === 0 && excludeSunday) isBusinessDay = false;
      if (dayOfWeek === 6 && excludeSaturday) isBusinessDay = false;

      if (isBusinessDay) {
        bDays++;
      } else {
        wDays++;
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    setResult({
      businessDays: bDays,
      totalDays: totalLoopDays,
      weekendDays: wDays,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-blue-900 flex items-center justify-center font-serif">
          <span className="mr-3">💼</span> Business Days
        </h1>
        <p className="text-blue-700 text-lg max-w-2xl mx-auto">
          Calculate the exact number of working days between two dates,
          excluding weekends.
        </p>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-zinc-200 mb-8 max-w-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-blue-500 font-bold font-mono text-xl transition-all outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-blue-500 font-bold font-mono text-xl transition-all outline-none"
            />
          </div>
        </div>

        <div className="mb-8 bg-zinc-50 p-4 rounded-xl border border-zinc-200 space-y-3">
          <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-200 pb-2 mb-3">
            Exclusions
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <div
              className={`w-6 h-6 rounded flex items-center justify-center border-2 transition-colors ${excludeSaturday ? "bg-blue-500 border-blue-500" : "border-zinc-300 bg-white group-hover:border-blue-300"}`}
            >
              {excludeSaturday && (
                <span className="text-white text-sm font-bold">✓</span>
              )}
            </div>
            <input
              type="checkbox"
              checked={excludeSaturday}
              onChange={(e) => setExcludeSaturday(e.target.checked)}
              className="hidden"
            />
            <span className="text-zinc-700 font-medium">
              Exclude Saturdays from working days
            </span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <div
              className={`w-6 h-6 rounded flex items-center justify-center border-2 transition-colors ${excludeSunday ? "bg-blue-500 border-blue-500" : "border-zinc-300 bg-white group-hover:border-blue-300"}`}
            >
              {excludeSunday && (
                <span className="text-white text-sm font-bold">✓</span>
              )}
            </div>
            <input
              type="checkbox"
              checked={excludeSunday}
              onChange={(e) => setExcludeSunday(e.target.checked)}
              className="hidden"
            />
            <span className="text-zinc-700 font-medium">
              Exclude Sundays from working days
            </span>
          </label>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl font-bold text-center text-sm">
            {error}
          </div>
        )}

        <button
          onClick={calculate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-blue-600/30 uppercase tracking-widest text-lg"
        >
          Calculate Working Days
        </button>
      </div>

      {result !== null && (
        <div className="bg-slate-900 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

          <h2 className="text-blue-400 font-bold uppercase tracking-widest text-xs mb-8 z-10 text-center">
            Date Span Results
          </h2>

          <div className="z-10 relative mb-8 w-full max-w-sm">
            <div className="p-8 rounded-3xl border-4 bg-blue-900/40 border-blue-500/30 shadow-inner flex flex-col items-center justify-center">
              <span className="text-blue-300 text-[10px] font-bold uppercase tracking-widest mb-3 block border-b border-blue-500/50 pb-2 w-full text-center">
                Business Days
              </span>
              <div className="font-mono font-black text-6xl text-white break-all tracking-tight drop-shadow-lg p-2 flex items-baseline">
                {result.businessDays.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="w-full max-w-2xl z-10 grid grid-cols-2 gap-4">
            <div className="bg-black/30 p-4 rounded-xl border border-white/5 text-center flex flex-col justify-center">
              <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-1 block">
                Total Combined Days
              </span>
              <div className="font-mono text-white font-bold text-2xl">
                {result.totalDays.toLocaleString()}
              </div>
            </div>
            <div className="bg-black/30 p-4 rounded-xl border border-white/5 text-center flex flex-col justify-center border-l-4 border-l-rose-500/50">
              <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-1 block">
                Excluded Days
              </span>
              <div className="font-mono text-rose-300 font-bold text-2xl">
                {result.weekendDays.toLocaleString()}
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
            name: "Business Days Calculator",
            operatingSystem: "All",
            applicationCategory: "UtilitiesApplication",
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title={businessDaysSeoData.title}
          whatIsIt={businessDaysSeoData.whatIsIt}
          formula={businessDaysSeoData.formula}
          example={businessDaysSeoData.example}
          useCases={businessDaysSeoData.useCases}
          faqs={businessDaysSeoData.faqs}
          deepDive={businessDaysSeoData.deepDive}
          glossary={businessDaysSeoData.glossary}
          relatedCalculators={[
            {
              name: "Days Calculator",
              path: "/days-calculator/",
              desc: "Add or subtract exact chronological time (including weekends) to find a target date.",
            },
            {
              name: "Time Card Calculator",
              path: "/time-card-calculator/",
              desc: "Sum up daily clocked hours to determine total weekly work time and gross pay.",
            },
            {
              name: "Salary Calculator",
              path: "/salary-calculator/",
              desc: "Convert an hourly wage into an annual salary assuming standard 260 yearly business days.",
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
