"use client";

import { useState, useEffect } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function DueDateCalculator() {
  const [calcMethod, setCalcMethod] = useState("lmp"); // 'lmp' (Last Menstrual Period), 'conception', 'ivf', 'ultrasound'
  const [dateInput, setDateInput] = useState("");
  const [cycleLength, setCycleLength] = useState("28"); // For LMP only
  const [ivfType, setIvfType] = useState("3"); // 3-day or 5-day transfer

  const [result, setResult] = useState<{
    dueDate: Date;
    gestationalAge: { weeks: number; days: number };
    trimester: number;
    conceptionDate: Date;
    firstTrimesterEnd: Date;
    secondTrimesterEnd: Date;
    daysRemaining: number;
  } | null>(null);

  // Set default date to today minus ~2 months to easily show a valid result
  useEffect(() => {
    const d = new Date();
    d.setMonth(d.getMonth() - 2);
    setDateInput(d.toISOString().split("T")[0]);
  }, []);

  const calculate = () => {
    if (!dateInput) return;

    const input = new Date(dateInput);
    let due = new Date(input);
    let conception = new Date(input);

    // Standard human gestation is ~280 days from LMP (with 28 day cycle)
    if (calcMethod === "lmp") {
      const cycleAdj = parseInt(cycleLength) - 28;
      due.setDate(due.getDate() + 280 + cycleAdj);
      conception.setDate(input.getDate() + 14 + cycleAdj);
    } else if (calcMethod === "conception") {
      due.setDate(due.getDate() + 266);
    } else if (calcMethod === "ivf") {
      const transferDays = parseInt(ivfType);
      due.setDate(input.getDate() + 266 - transferDays);
      conception.setDate(input.getDate() - transferDays);
    } else if (calcMethod === "ultrasound") {
      // Ultrasound gives exact current gestational age, but for UI simplicity let's treat dateInput as estimated due date
      due = new Date(input);
      conception.setDate(due.getDate() - 266);
    }

    const today = new Date();
    // Calculate gestational age based on conception date (gestational age = weeks from conception + 2 weeks)
    // More accurately, it's measuring exactly from LMP concept.
    const diffTime = Math.abs(
      today.getTime() - (conception.getTime() - 14 * 24 * 60 * 60 * 1000),
    );
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // If due date has passed, cap it conceptually
    const totalGestDays = Math.max(0, diffDays);

    let weeks = Math.floor(totalGestDays / 7);
    let days = totalGestDays % 7;

    // Safety bounds
    if (weeks > 42) {
      weeks = 42;
      days = 0;
    }

    let trimester = 1;
    if (weeks >= 13) trimester = 2;
    if (weeks >= 27) trimester = 3;

    const firstEnd = new Date(conception.getTime() - 14 * 24 * 60 * 60 * 1000);
    firstEnd.setDate(firstEnd.getDate() + 13 * 7); // End of week 13

    const secondEnd = new Date(conception.getTime() - 14 * 24 * 60 * 60 * 1000);
    secondEnd.setDate(secondEnd.getDate() + 27 * 7); // End of week 27

    const daysRem = Math.ceil(
      (due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
    );

    setResult({
      dueDate: due,
      gestationalAge: { weeks, days },
      trimester,
      conceptionDate: conception,
      firstTrimesterEnd: firstEnd,
      secondTrimesterEnd: secondEnd,
      daysRemaining: Math.max(0, daysRem),
    });
  };

  const formatDate = (d: Date) => {
    return d.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-pink-900 flex items-center justify-center font-serif">
          <span className="mr-3">👶</span> Due Date Calculator
        </h1>
        <p className="text-pink-700 text-lg max-w-2xl mx-auto">
          Calculate your exact baby due date, current gestational age, and
          personalized pregnancy timeline milestones.
        </p>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-zinc-200 mb-8 max-w-2xl mx-auto">
        <div className="space-y-6 mb-8">
          <div>
            <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">
              Calculation Method
            </label>
            <select
              value={calcMethod}
              onChange={(e) => setCalcMethod(e.target.value)}
              className="w-full rounded-xl border-zinc-300 p-4 shadow-sm focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all font-bold bg-zinc-50 cursor-pointer text-pink-900"
            >
              <option value="lmp">First Day of Last Period (LMP)</option>
              <option value="conception">Exact Date of Conception</option>
              <option value="ivf">IVF Transfer Date</option>
              <option value="ultrasound">I already know my Due Date</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">
              {calcMethod === "lmp" && "First Day of Last Period"},
              {calcMethod === "conception" && "Date of Conception"},
              {calcMethod === "ivf" && "Date of IVF Transfer"},
              {calcMethod === "ultrasound" && "Estimated Due Date"}
            </label>
            <input
              type="date"
              value={dateInput}
              onChange={(e) => setDateInput(e.target.value)}
              className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-pink-500 font-bold bg-zinc-50"
            />
          </div>

          {calcMethod === "lmp" && (
            <div>
              <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">
                Average Cycle Length (Days)
              </label>
              <input
                type="number"
                min="20"
                max="45"
                value={cycleLength}
                onChange={(e) => setCycleLength(e.target.value)}
                className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-pink-500 font-bold bg-zinc-50"
              />
            </div>
          )}

          {calcMethod === "ivf" && (
            <div>
              <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">
                Type of Embryo Transfer
              </label>
              <div className="flex bg-zinc-100 p-1 rounded-xl">
                <button
                  onClick={() => setIvfType("3")}
                  className={`flex-1 py-3 rounded-lg font-bold transition-all ${ivfType === "3" ? "bg-pink-600 text-white shadow" : "text-zinc-500 hover:text-zinc-700"}`}
                >
                  3-Day Embryo
                </button>
                <button
                  onClick={() => setIvfType("5")}
                  className={`flex-1 py-3 rounded-lg font-bold transition-all ${ivfType === "5" ? "bg-pink-600 text-white shadow" : "text-zinc-500 hover:text-zinc-700"}`}
                >
                  5-Day Embryo
                </button>
              </div>
            </div>
          )}
        </div>

        <div>
          <button
            onClick={calculate}
            className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-pink-600/30 uppercase tracking-widest text-lg"
          >
            Calculate My Due Date
          </button>
        </div>
      </div>

      {result !== null && (
        <div className="bg-gradient-to-br from-pink-900 to-rose-950 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

          <h2 className="text-pink-300 font-bold uppercase tracking-widest text-xs mb-8 z-10 text-center">
            Your Estimated Due Date
          </h2>

          <div className="z-10 relative mb-10 w-full max-w-sm">
            <div className="p-8 rounded-full aspect-square border-4 bg-pink-900/40 border-pink-400/30 shadow-inner flex flex-col items-center justify-center">
              <span className="text-white/60 text-xs uppercase tracking-widest mb-2 font-bold block text-center">
                Baby Arrives Around
              </span>
              <div className="font-bold text-3xl md:text-4xl text-white text-center drop-shadow-lg leading-tight">
                {result.dueDate.toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                })}
                <br />
                <span className="text-pink-300 text-2xl">
                  {result.dueDate.getFullYear()}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl z-10 mb-8">
            <div className="bg-black/30 p-5 rounded-xl border border-white/10 flex flex-col items-center justify-center text-center">
              <span className="text-pink-400 text-[10px] font-bold uppercase tracking-widest mb-2">
                Current Gestational Age
              </span>
              <div className="font-mono text-white text-2xl font-bold">
                {result.gestationalAge.weeks}{" "}
                <span className="text-sm text-pink-300 tracking-normal font-sans">
                  wks
                </span>{" "},
                {result.gestationalAge.days}{" "}
                <span className="text-sm text-pink-300 tracking-normal font-sans">
                  days
                </span>
              </div>
            </div>
            <div className="bg-black/30 p-5 rounded-xl border border-white/10 flex flex-col items-center justify-center text-center">
              <span className="text-pink-400 text-[10px] font-bold uppercase tracking-widest mb-2">
                Current Trimester
              </span>
              <div className="font-mono text-white text-2xl font-bold">
                {result.trimester}
                {result.trimester === 1
                  ? "st"
                  : result.trimester === 2
                    ? "nd"
                    : "rd"}{" "}
                <span className="text-sm text-pink-300 tracking-normal font-sans">
                  Trimester
                </span>
              </div>
            </div>
            <div className="bg-black/30 p-5 rounded-xl border border-white/10 flex flex-col items-center justify-center text-center">
              <span className="text-pink-400 text-[10px] font-bold uppercase tracking-widest mb-2">
                Days Remaining
              </span>
              <div className="font-mono text-white text-2xl font-bold">
                {result.daysRemaining}{" "}
                <span className="text-sm text-pink-300 tracking-normal font-sans">
                  Days
                </span>
              </div>
            </div>
          </div>

          <div className="w-full max-w-4xl z-10 bg-black/40 p-6 rounded-2xl border border-pink-500/20">
            <h3 className="text-pink-300 font-bold uppercase tracking-widest text-xs mb-6 text-center border-b border-pink-500/20 pb-3">
              Pregnancy Timeline Milestones
            </h3>

            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-white/80 font-medium tracking-wide">
                  Estimated Conception
                </span>
                <span className="text-white font-bold bg-white/10 px-3 py-1 rounded-full">
                  {formatDate(result.conceptionDate)}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-white/80 font-medium tracking-wide">
                  End of 1st Trimester (Week 13)
                </span>
                <span className="text-white font-bold bg-white/10 px-3 py-1 rounded-full">
                  {formatDate(result.firstTrimesterEnd)}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-white/80 font-medium tracking-wide">
                  End of 2nd Trimester (Week 27)
                </span>
                <span className="text-white font-bold bg-white/10 px-3 py-1 rounded-full">
                  {formatDate(result.secondTrimesterEnd)}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm pb-1">
                <span className="text-pink-300 font-bold tracking-wide">
                  Estimated Due Date (Week 40)
                </span>
                <span className="text-pink-100 font-bold bg-pink-600/50 px-3 py-1 rounded-full border border-pink-500">
                  {formatDate(result.dueDate)}
                </span>
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
            name: "Due Date Calculator",
            operatingSystem: "All",
            applicationCategory: "HealthApplication",
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title="Due Date Calculator"
          whatIsIt={
            <>
              <p>
                Our <strong>Due Date Calculator</strong> provides a
                scientifically estimated date for when your baby will arrive.
                While naturally occurring human pregnancies vary, this tool uses
                established obstetric formulas to calculate your most likely due
                date, current gestational age, and exact trimester milestones.
              </p>
              <p>
                Whether you know the exact date of conception, the first day of
                your last menstrual period (LMP), or your IVF transfer date, the
                calculator adapts to provide the standard 40-week timeline
                utilized by doctors and midwives globally.
              </p>
            </>
          }
          formula={
            <>
              <p>
                The calculation depends entirely on which medical method you
                choose:
              </p>
              <div className="bg-white p-4 rounded-lg font-mono text-center text-[15px] shadow-sm my-4 border border-zinc-200">
                <strong>LMP Rule (Naegele's Rule):</strong>
                <br />
                <em>LMP Date + 280 Days (adjusted for cycle length)</em>
                <br />
                <br />
                <strong>Conception Rule:</strong>
                <br />
                <em>Conception Date + 266 Days</em>
                <br />
                <br />
                <strong>IVF Transfer Rule:</strong>
                <br />
                <em>Transfer Date + 266 Days - Age of Embryo (3 or 5 days)</em>
              </div>
            </>
          }
          example={
            <>
              <p>
                Let's calculate using Naegele's Rule (the standard LMP method)
                assuming a normal 28-day menstrual cycle:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>
                  The first day of your last menstrual period was{" "}
                  <strong>January 1st</strong>.
                </li>
                <li>
                  The formula simply adds <strong>280 total days</strong>{" "}
                  (exactly 40 weeks) to January 1st.
                </li>
                <li>
                  Your estimated due date is mathematically{" "}
                  <strong>October 8th</strong>.
                </li>
                <li>
                  Your gestational age is calculated from January 1st, even
                  though conception didn't technically happen until roughly
                  January 15th.
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4">
              <li>
                <strong>Medical Planning:</strong> Ensuring you schedule your
                crucial anatomy scans (around 20 weeks) and glucose tolerance
                tests (around 24-28 weeks) during the correct medical windows.
              </li>
              <li>
                <strong>IVF Tracking:</strong> Accurately calculating
                gestational age for IVF pregnancies, which is notoriously
                confusing because it must account for the exact age of the
                embryo (usually 3 or 5 days old) at the time of uterine
                transfer.
              </li>
              <li>
                <strong>Maternity Leave prep:</strong> Providing HR and your
                employer with an accurate "Expected Date of Confinement" (EDC)
                to mathematically trigger FMLA or legally mandated maternity
                leave timelines.
              </li>
            </ul>
          }
          faqs={[
            {
              question: "How accurate is an estimated due date?",
              answer:
                "It is exactly that—an estimate. Statistically, only about 4% to 5% of babies are born exactly on their mathematically predicted due date. The vast majority of spontaneous labors safely occur anywhere within a two-week window before or after the date.",
            },
            {
              question: "Why do doctors measure pregnancy from my Last Period?",
              answer:
                "Because historically, the exact moment of ovulation and fertilization was completely unknowable. The only verifiable, objective date a woman could provide a doctor was the start of her last period. Thus, the 40-week timeline we use today artificially includes the two weeks before you were actually pregnant.",
            },
            {
              question: "What if my ultrasound date is different?",
              answer:
                "An early dating ultrasound (usually done between 7 to 12 weeks) is medically considered the most accurate way to date a pregnancy. If your ultrasound due date differs from your LMP due date by more than a week, your doctor will officially change your due date to match the ultrasound measurements.",
            },
          ]}
          relatedCalculators={[
            {
              name: "Ovulation Calculator",
              path: "/ovulation-calculator/",
              desc: "Find your prime fertile window for conception.",
            },
            {
              name: "Weight Converter",
              path: "/weight-converter/",
              desc: "Convert standard baby weights between lbs/oz and kg/grams.",
            },
            {
              name: "BMI Calculator",
              path: "/bmi-calculator/",
              desc: "Track health metrics during pregnancy.",
            },
            {
              name: "Calorie Calculator",
              path: "/calorie-calculator/",
              desc: "Estimate the number of calories you need to maintain or lose weight.",
            }]}
        />
      </div>
    </div>
  );
}
