"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function TimeCardCalculator() {
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("17:00");
  const [breakMinutes, setBreakMinutes] = useState("30");
  const [hourlyRate, setHourlyRate] = useState("15.00");

  const [result, setResult] = useState<{
    grossHours: number;
    netHours: number;
    grossPay: number;
  } | null>(null);

  const [error, setError] = useState("");

  const calculate = () => {
    setError("");

    if (!startTime || !endTime) {
      setError("Please enter both start and end times.");
      setResult(null);
      return;
    }

    const [startH, startM] = startTime.split(":").map(Number);
    const [endH, endM] = endTime.split(":").map(Number);
    const breaks = parseInt(breakMinutes) || 0;
    const rate = parseFloat(hourlyRate) || 0;

    let startTotalMins = startH * 60 + startM;
    let endTotalMins = endH * 60 + endM;

    // Handle overnight shifts
    if (endTotalMins < startTotalMins) {
      endTotalMins += 24 * 60;
    }

    const grossMins = endTotalMins - startTotalMins;
    const netMins = grossMins - breaks;

    if (netMins < 0) {
      setError("Break duration is longer than the shift duration.");
      setResult(null);
      return;
    }

    const grossHours = grossMins / 60;
    const netHours = netMins / 60;
    const grossPay = netHours * rate;

    setResult({
      grossHours,
      netHours,
      grossPay,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-emerald-900 flex items-center justify-center font-serif">
          <span className="mr-3">⏱️</span> Time Card Calculator
        </h1>
        <p className="text-emerald-700 text-lg max-w-2xl mx-auto">
          Calculate your exact work hours, deduct unpaid break time, and
          estimate gross pay.
        </p>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-zinc-200 mb-8 max-w-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">
              Start Time
            </label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-emerald-500 font-bold font-mono text-2xl transition-all outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">
              End Time
            </label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-emerald-500 font-bold font-mono text-2xl transition-all outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">
              Unpaid Break (Minutes)
            </label>
            <input
              type="number"
              step="1"
              min="0"
              value={breakMinutes}
              onChange={(e) => setBreakMinutes(e.target.value)}
              className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-emerald-500 font-bold font-mono text-2xl transition-all outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">
              Hourly Rate ($)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-4 text-zinc-400 font-bold text-xl">
                $
              </span>
              <input
                type="number"
                step="any"
                min="0"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(e.target.value)}
                className="w-full rounded-xl border-zinc-300 shadow-sm p-4 pl-10 border focus:border-emerald-500 font-bold font-mono text-2xl transition-all outline-none"
                onKeyDown={(e) => e.key === "Enter" && calculate()}
              />
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl font-bold text-center text-sm">
            {error}
          </div>
        )}

        <button
          onClick={calculate}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-emerald-600/30 uppercase tracking-widest text-lg"
        >
          Calculate Timesheet
        </button>
      </div>

      {result !== null && (
        <div className="bg-slate-900 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

          <h2 className="text-emerald-400 font-bold uppercase tracking-widest text-xs mb-8 z-10 text-center">
            Calculated Shift
          </h2>

          <div className="w-full max-w-2xl z-10 grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Hours */}
            <div className="bg-black/40 border border-emerald-500/30 p-6 rounded-3xl shadow-inner text-center">
              <span className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-3 block">
                Total Net Hours
              </span>
              <div className="font-mono font-black text-5xl text-white tracking-tight drop-shadow-lg p-2">
                {result.netHours.toFixed(2)}
                <span className="text-xl text-white/50 ml-1">h</span>
              </div>
              <div className="text-white/40 text-xs mt-2 uppercase tracking-widest">
                Gross: {result.grossHours.toFixed(2)}h
              </div>
            </div>

            {/* Pay */}
            <div className="bg-emerald-900/40 border border-emerald-400/50 p-6 rounded-3xl shadow-inner text-center">
              <span className="text-emerald-300 text-[10px] font-bold uppercase tracking-widest mb-3 block">
                Gross Pay Estimator
              </span>
              <div className="font-mono font-black text-5xl text-emerald-400 tracking-tight drop-shadow-lg p-2 flex items-center justify-center">
                <span className="text-3xl mr-1">$</span>
                {result.grossPay.toFixed(2)}
              </div>
              <div className="text-emerald-200/50 text-[10px] mt-2 uppercase tracking-widest">
                Pre-tax estimation
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
            name: "Time Card Calculator",
            operatingSystem: "All",
            applicationCategory: "UtilitiesApplication",
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title="Employee Time Card & Payroll Calculator"
          whatIsIt={
            <>
              <p>
                The <strong>Time Card Calculator</strong> converts raw clock-in
                and clock-out hours into exact decimal time increments,
                instantly deducting unpaid breaks to determine your final
                billable hours and estimated gross paycheck.
              </p>
              <p>
                Time math is notoriously confusing because there are 60 minutes
                in an hour, not 100. If you work exactly 30 minutes, payroll
                software calculates that as "0.50" hours, not "0.30". This
                completely automates that tedious base-60 to base-10 conversion.
              </p>

              <p className="mt-4 text-sm text-gray-500">
                <strong>Related Terms:</strong> Payroll Calculator, Payroll Tax
                Calculator, Time Sheet Calculator, Time Card Calculator, Payroll
                Deductions Online Calculator, Work Hours Calculator, Payroll
                Hours Calculator, Online Payroll Calculator, Hours Calculator,
                Payroll Deduction Calculator, Time Card Calculator With Lunch,
                Time Calculator Hours, Hour Counter, Hours And Minutes
                Calculator, 65k A Year Is How Much An Hour
              </p>
            </>
          }
          formula={
            <>
              <p>
                To accurately calculate payroll hours, you must convert all time
                to a unified format (Total Minutes) before converting back into
                decimals.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                <li>
                  <strong>Step 1 (Find Total Initial Minutes):</strong> Subtract
                  the clock-in time from the clock-out time. E.g. 5:00 PM (1020
                  mins) - 8:30 AM (510 mins) = 510 total Gross Minutes.
                </li>
                <li>
                  <strong>Step 2 (The Deduction):</strong> Subtract any unpaid
                  meal or rest breaks. 510 mins - 30 min lunch = 480 Net
                  Minutes.
                </li>
                <li>
                  <strong>Step 3 (Decimal Conversion):</strong> Divide the Net
                  Minutes by 60 to find the billing decimal. 480 / 60 ={" "}
                  <strong>8.00 Net Hours</strong>.
                </li>
              </ul>
            </>
          }
          example={
            <>
              <p>
                An hourly employee works a split shift as a barista. They clock
                in at <strong>7:45 AM</strong> and clock out at{" "}
                <strong>4:15 PM</strong>, taking a <strong>45-minute</strong>{" "}
                unpaid lunch break. They make $18.50/hr.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                <li>
                  <strong>Total Span:</strong> 7:45 AM to 4:15 PM is exactly 8
                  hours and 30 minutes (510 minutes overall).
                </li>
                <li>
                  <strong>Deduct the Break:</strong> 510 mins - 45 mins = 465
                  Paid Minutes.
                </li>
                <li>
                  <strong>Decimal Conversion:</strong> 465 / 60 ={" "}
                  <strong>7.75 Billable Hours</strong>.
                </li>
                <li>
                  <strong>Gross Pay:</strong> 7.75 hours × $18.50 ={" "}
                  <strong>$143.38</strong> (Before taxes).
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-gray-700">
              <li>
                <strong>Freelancer Billing:</strong> Self-employed contractors
                building accurate client invoices, ensuring they bill for an
                exact 4.65 hours rather than guessing "around 4 and a half" and
                losing money.
              </li>
              <li>
                <strong>Payroll Dispute Resolution:</strong> Employees verifying
                that their employer's automated timecard system is accurately
                subtracting their lunch breaks and calculating their overtime
                effectively.
              </li>
              <li>
                <strong>Manager Budgeting:</strong> Store managers projecting
                the absolute gross daily payroll cost for an upcoming retail
                shift to ensure they stay under budget.
              </li>
            </ul>
          }
          faqs={[
            {
              question:
                "Does this handle 'graveyard' shifts that cross past Midnight?",
              answer:
                "Yes. The algorithm automatically detects if the End Time is numerically smaller than the Start Time (e.g. 10:00 PM to 6:00 AM) and accurately calculates the overnight span by adding a full 24 hours to the backend calculation.",
            },
            {
              question: "Why does 15 minutes equal 0.25 hours?",
              answer:
                "Because time is Base-60. 15 minutes is exactly one-quarter of a 60-minute hour (15/60). As a decimal, one-quarter is always written as 0.25.",
            },
            {
              question:
                "Is this amount exactly what will be deposited in my bank?",
              answer:
                "No. The output provides 'Gross Pay'. To find your 'Net Pay' (take-home cash), you will still need to manually subtract federal taxes, state taxes, insurance premiums, and retirement contributions.",
            },
          ]}
          relatedCalculators={[
            {
              name: "Salary Calculator",
              path: "/salary-calculator",
              desc: "Convert your calculated hourly wage into weekly, monthly, and yearly salary totals.",
            },
            {
              name: "Business Days Calculator",
              path: "/business-days-calculator",
              desc: "Count exactly how many working days fall within a specific month's payroll cycle.",
            },
            {
              name: "Commission Calculator",
              path: "/commission-calculator",
              desc: "Add variable commission and sales bonuses on top of your standard hourly base pay.",
            },
            {
              name: "Age Calculator",
              path: "/age-calculator",
              desc: "Calculate your exact age in years, months, and days.",
            }]}
        />
      </div>
    </div>
  );
}
