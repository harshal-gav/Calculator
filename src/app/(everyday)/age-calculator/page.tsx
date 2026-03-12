"use client";

import { useState, useEffect } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function AgeCalculator() {
  const today = new Date().toISOString().split("T")[0];
  const [birthDate, setBirthDate] = useState("1990-01-01");
  const [targetDate, setTargetDate] = useState(today);

  const [result, setResult] = useState({
    years: 0,
    months: 0,
    days: 0,
    totalMonths: 0,
    totalWeeks: 0,
    totalDays: 0,
    nextBirthdayDays: 0,
    isValid: true,
  });

  useEffect(() => {
    calculateAge();
  }, [birthDate, targetDate]);

  const calculateAge = () => {
    if (!birthDate || !targetDate) {
      setResult((prev) => ({ ...prev, isValid: false }));
      return;
    }

    const bDate = new Date(birthDate);
    const tDate = new Date(targetDate);

    if (bDate > tDate) {
      setResult((prev) => ({ ...prev, isValid: false }));
      return;
    }

    // Calculate exact Years, Months, Days
    let years = tDate.getFullYear() - bDate.getFullYear();
    let months = tDate.getMonth() - bDate.getMonth();
    let days = tDate.getDate() - bDate.getDate();

    if (days < 0) {
      months--;
      // Get days in the previous month
      const prevMonth = new Date(
        tDate.getFullYear(),
        tDate.getMonth(),
        0,
      ).getDate();
      days += prevMonth;
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    // Calculate Totals
    const diffTime = Math.abs(tDate.getTime() - bDate.getTime());
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;

    // Next Birthday
    const nextBday = new Date(bDate);
    nextBday.setFullYear(tDate.getFullYear());
    if (nextBday < tDate || nextBday.getTime() === tDate.getTime()) {
      nextBday.setFullYear(tDate.getFullYear() + 1);
    }
    const nextBdayDiff = Math.ceil(
      (nextBday.getTime() - tDate.getTime()) / (1000 * 60 * 60 * 24),
    );

    setResult({
      years,
      months,
      days,
      totalMonths,
      totalWeeks,
      totalDays,
      nextBirthdayDays: nextBdayDiff,
      isValid: true,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-pink-700 border-b pb-4">
        Age Calculator
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Calculate chronological age precisely in years, months, days, weeks, and
        total days. Also tracks days until your next birthday.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="bg-pink-50 p-6 rounded-xl border border-pink-100 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              value={birthDate}
              max={targetDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full rounded-xl border-gray-300 p-4 shadow-sm focus:border-pink-500 font-bold text-xl text-gray-800"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Age at the Date of
            </label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full rounded-xl border-gray-300 p-4 shadow-sm focus:border-pink-500 font-bold text-xl text-gray-800"
            />
            <button
              onClick={() => setTargetDate(today)}
              className="mt-2 text-sm text-pink-600 hover:text-pink-800 font-medium transition"
            >
              Set to Today
            </button>
          </div>
        </div>

        {/* Results Screen */}
        <div className="bg-white border-2 border-pink-100 rounded-xl overflow-hidden shadow-sm flex flex-col justify-center">
          {result.isValid ? (
            <div className="w-full flex flex-col h-full">
              <div className="p-8 pb-6 text-center bg-pink-600 border-b border-pink-700 text-white shadow-inner">
                <h3 className="text-pink-200 font-bold uppercase tracking-widest text-[11px] mb-2">
                  Exact Age
                </h3>
                <div className="text-4xl sm:text-5xl font-black drop-shadow-md tracking-tight">
                  {result.years}
                  <span className="text-xl sm:text-2xl text-pink-300 font-medium mx-1">
                    yrs
                  </span>
                  {result.months}
                  <span className="text-xl sm:text-2xl text-pink-300 font-medium mx-1">
                    mos
                  </span>
                  {result.days}
                  <span className="text-xl sm:text-2xl text-pink-300 font-medium ml-1">
                    days
                  </span>
                </div>
              </div>

              <div className="p-6 flex-grow space-y-3 bg-gray-50 flex flex-col justify-center">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white p-4 rounded-xl border border-gray-200 text-center shadow-sm">
                    <div className="font-bold text-gray-500 uppercase text-[10px] tracking-widest mb-1">
                      Total Months
                    </div>
                    <div className="font-black text-2xl text-gray-800">
                      {result.totalMonths.toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-gray-200 text-center shadow-sm">
                    <div className="font-bold text-gray-500 uppercase text-[10px] tracking-widest mb-1">
                      Total Weeks
                    </div>
                    <div className="font-black text-2xl text-gray-800">
                      {result.totalWeeks.toLocaleString()}
                    </div>
                  </div>
                  <div className="col-span-2 bg-white p-4 rounded-xl border border-gray-200 text-center shadow-sm">
                    <div className="font-bold text-gray-500 uppercase text-[10px] tracking-widest mb-1">
                      Total Days
                    </div>
                    <div className="font-black text-2xl text-pink-700">
                      {result.totalDays.toLocaleString()}
                    </div>
                  </div>
                </div>

                {result.nextBirthdayDays === 0 ? (
                  <div className="text-center font-bold text-pink-700 bg-pink-100 p-3 rounded-lg mt-2 border border-pink-200">
                    🎉 Happy Birthday! 🎂
                  </div>
                ) : (
                  <div className="flex justify-between items-center bg-gradient-to-r from-pink-50 to-white p-4 rounded-xl border border-pink-200">
                    <span className="font-bold text-pink-800 text-sm">
                      Days Until Next Birthday
                    </span>
                    <span className="font-black text-xl text-pink-600">
                      {result.nextBirthdayDays}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-center p-8 bg-red-50 text-red-800 border-2 border-red-200 rounded-xl m-4">
              <div>
                <h3 className="text-lg font-bold mb-2">Invalid Dates</h3>
                <p className="text-sm">
                  The birth date must be before or equal to the target date.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Age Calculator",
            operatingSystem: "All",
            applicationCategory: "UtilitiesApplication",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

      <CalculatorSEO
        title="Age Calculator"
        whatIsIt={
          <>
            <p>
              Our <strong>Age Calculator</strong> is a precision time-tracking
              tool designed to calculate your exact chronological age down to
              the day. While most people only know their age in years, this
              calculator provides a comprehensive breakdown of your lifespan in
              months, weeks, and total days.
            </p>
            <p>
              Beyond simple birth dates, the tool allows you to set a custom
              "Target Date". This means you can calculate exactly how old
              someone was on a specific date in history, or find out exactly how
              old you will be when a future event occurs.
            </p>

            <p className="mt-4 text-sm text-gray-500">
              <strong>Related Terms:</strong> Mileage Calculator, Body Fat
              Percentage Calculator, Voltage Drop Calculator, Square Footage
              Calculator, Percentage Formula, Age Calculator, Calendar
              Calculator, Percentage Calculator Online, Fat Percentage
              Calculator, Weight Loss Percentage Calculator, Percentage Increase
              Calculator, Find Percentage, Wattage Calculator, Voltage Divider
              Calculator, Percentage Calculator Formula
            </p>
          </>
        }
        formula={
          <>
            <p>
              Calculating exact age mathematically is more complex than simple
              subtraction due to leap years and months having variable lengths
              (28, 29, 30, or 31 days). Our algorithm follows standard Gregorian
              calendar rules:
            </p>
            <div className="bg-white p-4 rounded-lg font-mono text-center text-sm shadow-sm my-4 overflow-x-auto space-y-4 text-pink-900 border border-pink-100">
              <p>
                <strong>Years:</strong> Target Year - Birth Year
              </p>
              <p>
                <strong>Months:</strong> Target Month - Birth Month (Borrow 1
                year/12 months if negative)
              </p>
              <p>
                <strong>Days:</strong> Target Day - Birth Day (Borrow days from
                the previous month based on exactly how many days were in that
                specific historic month if negative)
              </p>
            </div>
          </>
        }
        example={
          <>
            <p>
              Let's calculate the exact age of someone born on{" "}
              <strong>July 15, 1990</strong>, if today's date is{" "}
              <strong>March 5, 2024</strong>.
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>
                <strong>Step 1 (Days):</strong> 5 - 15 = -10. Because it is
                negative, we borrow the number of days in the previous month
                (February 2024 had 29 days because it was a leap year). -10 + 29
                = <strong>19 Days</strong>.
              </li>
              <li>
                <strong>Step 2 (Months):</strong> Because we borrowed, March (3)
                becomes February (2). 2 - 7 = -5. We borrow 1 year (12 months).
                -5 + 12 = <strong>7 Months</strong>.
              </li>
              <li>
                <strong>Step 3 (Years):</strong> Because we borrowed, 2024
                becomes 2023. 2023 - 1990 = <strong>33 Years</strong>.
              </li>
              <li>
                <strong>Result:</strong> Exactly 33 Years, 7 Months, and 19 Days
                old.
              </li>
            </ul>
          </>
        }
        useCases={
          <ul className="list-disc pl-6 space-y-4">
            <li>
              <strong>Genealogy and Ancestry:</strong> Calculating the exact age
              of historical figures or ancestors at the time of significant
              events (e.g., "How old was Abraham Lincoln when the Civil War
              ended?").
            </li>
            <li>
              <strong>Medical Pedigree:</strong> Calculating precise infant
              ages. Pediatricians measure infant milestones in strict weeks and
              months, not years.
            </li>
            <li>
              <strong>Retirement Planning:</strong> Calculating exactly how many
              total days remain until you reach the legal age required to draw a
              pension or Social Security benefits.
            </li>
          </ul>
        }
        faqs={[
          {
            question:
              "Why does my age in 'Total Days' vary slightly from my own math?",
            answer:
              "If you simply multiply your age in years by 365 to find your total days alive, your math will be wrong. Our calculator is perfectly accurate because it automatically detects and accounts for every single Leap Day (February 29th) that has occurred since your exact year of birth.",
          },
          {
            question: "How does the 'Target Date' feature work?",
            answer:
              "The target date defaults to today. However, you can change it to any date in the past or future. If you change it to the year 2050, it will tell you exactly how old you will be. If you enter the birth dates of a historical figure and the date they died as the target, you can find their exact lifespan.",
          },
          {
            question: "Are weeks calculated as exactly 7 days?",
            answer:
              "Yes. Mathematically, one week is always exactly 7 days. Your 'Total Weeks' alive is calculated by finding your absolute total days alive, dividing by 7, and rounding down to the nearest whole week.",
          },
        ]}
        relatedCalculators={[
          {
            name: "Date Calculator",
            path: "/date-calculator",
            desc: "Add or subtract exact days, weeks, or months from any given date.",
          },
          {
            name: "Time Calculator",
            path: "/time-calculator",
            desc: "Add or subtract exact hours and minutes to find time durations.",
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
