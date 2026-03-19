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
            <p className="text-lg leading-relaxed mb-4">
              Our <strong>Age Calculator</strong> is a professional-grade chronological tracking tool engineered to provide precise, multi-dimensional calculations of your lifespan. While most standard birthday trackers only output your age in whole years, this sophisticated engine deconstructs your time on earth into years, months, days, weeks, and even total hours or minutes if desired.
            </p>
            <p className="leading-relaxed mb-4">
              The concept of "Age" is more than just a number; it is the fundamental metric used across medical, legal, and actuarial sciences to determine eligibility, health risks, and development milestones. Our tool uses the <strong>Gregorian Calendar standard</strong> to account for the irregularities of the solar year, ensuring that leap years and variable month lengths are factored into every calculation.
            </p>
            <p className="leading-relaxed">
              Whether you are calculating a <strong>medical pedigree</strong> for a newborn infant, determining exact eligibility for <strong>retirement benefits</strong>, or simply curious about your 10,000th day on earth, this calculator provides the granular precision required for both official documentation and personal curiosity.
            </p>
          </>
        }
        comparisonTable={{
          title: "Age Milestones & Legal Frameworks",
          headers: ["Milestone", "Traditional Age", "Significance", "Global Variation"],
          rows: [
            ["Infancy (Pediatric)", "0-2 Years", "Critical brain development & motor skills monitoring", "Standard across WHO"],
            ["School Age", "5-6 Years", "Beginning of formal education & neuro-linguistic growth", "Varies by jurisdiction (4-7)"],
            ["Legal Majority", "18 Years", "Rights to vote, contract, and full legal accountability", "Global standard (varies 15-21)"],
            ["Silver Jubilees", "25 Years", "Quarter-century mark; peak physical/metabolic performance", "Cultural celebration"],
            ["Early Retirement", "55-62 Years", "Eligibility for specific vocational/private pension drawdowns", "Highly country-specific"],
            ["Senior / Golden Age", "65+ Years", "Standard geriatric threshold for universal state benefits", "Increasing in longevity regions"],
          ]
        }}
        formula={
          <>
            <p className="mb-4">
              Chronological age calculation is mathematically deceptive because the "length" of a month and a year is not constant. Our algorithm solves this using a <strong>Recursive Subtraction Methodology</strong>:
            </p>
            <div className="bg-gradient-to-br from-pink-50 to-white p-6 rounded-xl border border-pink-100 shadow-sm mb-6">
              <h4 className="font-bold text-pink-800 mb-3"> The Logic Core:</h4>
              <ul className="space-y-3 font-mono text-sm">
                <li className="flex gap-2">
                  <span className="text-pink-500 font-bold">1.</span>
                  <span>Years = (Target Year - Birth Year) - Correction(if month/day not reached)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-pink-500 font-bold">2.</span>
                  <span>Months = (Target Month - Birth Month) mod 12</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-pink-500 font-bold">3.</span>
                  <span>Days = Target Day - Birth Day (With dynamic borrowing from the specific preceding month's maximum capacity: 28-31)</span>
                </li>
              </ul>
            </div>
            <p className="text-sm text-gray-600 italic">
              Note: This calculator specifically accounts for <strong>Leap Years</strong> (divisible by 4, except for years divisible by 100 but not 400), ensuring that people born on February 29th receive 100% accurate results.
            </p>
          </>
        }
        deepDive={
          <div className="space-y-6">
            <section>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">The Science of Chronological vs. Biological Age</h3>
              <p className="text-gray-700 leading-relaxed">
                While this calculator measures <strong>Chronological Age</strong>—the literal time passed since birth—modern science increasingly focuses on <strong>Biological Age (Epigenetic Age)</strong>. This refers to how well your cells and organs are functioning relative to your years. Factors like telomere length, DNA methylation (the 'Horvath Clock'), and inflammatory markers can cause a '30-year-old' to have a biological age of 25 or 40.
              </p>
            </section>
            
            <section>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Cultural Variations in Age Counting</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Not all cultures count age the same way. The <strong>International Standard</strong> starts age at zero on the day of birth. However, in traditional <strong>East Asian Age Reckoning</strong>, a person is considered one year old at birth (accounting for the time in the womb) and turns a year older on the Lunar New Year rather than their birthday.
              </p>
              <div className="bg-pink-50 p-4 rounded-lg border-l-4 border-pink-500">
                <p className="text-sm font-medium text-pink-900">
                  <strong>Did you know?</strong> In many Western traditions, premature babies may have a "Corrected Age" used for development tracking during their first two years, subtracting the weeks since their original due date from their chronological age.
                </p>
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Data Privacy in Age Calculation</h3>
              <p className="text-gray-700 leading-relaxed">
                Your birth date is a PII (Personally Identifiable Information) data point. Our age calculator is built with <strong>Local-Only Logic</strong>. We do not store, log, or transmit your birth date to any server. All calculations happen entirely within your browser's memory, ensuring your privacy is maintained while you calculate your personal data.
              </p>
            </section>
          </div>
        }
        example={
          <>
            <p className="mb-4">
              <strong>Case Study: Calculating a Precise Milestone (The Half-Year Mark)</strong>
            </p>
            <p className="mb-4">
              Imagine an individual born on <strong>August 20, 1985</strong>, who wants to know their exact age as of <strong>February 15, 2024</strong>.
            </p>
            <div className="space-y-3 border-l-2 border-gray-200 pl-4 py-2">
              <p><strong>1. Year Calculation:</strong> 2024 - 1985 = 39. However, February hasn't reached August, so we subtract 1. <span className="text-pink-700 font-bold">Current Years: 38</span>.</p>
              <p><strong>2. Month Calculation:</strong> February is the 2nd month. August is the 8th. Because we borrowed a year, we calculate (14 - 8) = <span className="text-pink-700 font-bold">5 Months</span>.</p>
              <p><strong>3. Day Calculation:</strong> Day 15 minus Day 20 is negative (-5). We borrow from January (31 days). 31 - 5 = <span className="text-pink-700 font-bold">26 Days</span>.</p>
              <p><strong>Final Verdict:</strong> The person is exactly 38 years, 5 months, and 26 days old.</p>
            </div>
          </>
        }
        useCases={
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
              <h4 className="font-bold text-gray-800 mb-2">Legal Adulthood</h4>
              <p className="text-sm text-gray-600">Calculating the exact day an individual turns 18 or 21 to gain legal rights like voting, property ownership, or the legal drinking age.</p>
            </div>
            <div className="p-4 bg-pink-50 rounded-xl border border-pink-100">
              <h4 className="font-bold text-pink-800 mb-2">Pediatric Milestones</h4>
              <p className="text-sm text-gray-600">Parents and doctors use precise age in months and weeks to track growth charts and timing for vaccinations or developmental tests.</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
              <h4 className="font-bold text-gray-800 mb-2">Insurance & Annuities</h4>
              <p className="text-sm text-gray-600">Actuaries and insurance brokers require exact age to calculate risk premiums, life expectancy, and annuity payout schedules.</p>
            </div>
            <div className="p-4 bg-pink-50 rounded-xl border border-pink-100">
              <h4 className="font-bold text-pink-800 mb-2">Travel & Visas</h4>
              <p className="text-sm text-gray-600">Calculating exact age on the date of travel for visa applications or child-fare eligibility on airlines and trains.</p>
            </div>
          </div>
        }
        glossary={[
          { term: "Chronological Age", definition: "The total time elapsed from birth to a given date, usually measured in years, months, and days." },
          { term: "Leap Year", definition: "A year containing one additional day (Feb 29) to keep the calendar year synchronized with the astronomical year." },
          { term: "Gregorian Calendar", definition: "The internationally accepted civil calendar used for standard date and time keeping." },
          { term: "Corrected Age", definition: "An age calculation for premature infants that adjusts for their early birth relative to their due date." },
          { term: "Anniversary", definition: "The annual recurrence of a date that marks an event or occasion of importance, such as a birthday." },
          { term: "Longevity", definition: "Long life or the length of individual life; often used in the context of statistical life expectancy." },
          { term: "PII", definition: "Personally Identifiable Information—data that can be used to distinguish or trace an individual's identity." },
          { term: "Actuarial Science", definition: "The discipline that applies mathematical and statistical methods to assess risk in insurance and finance." },
          { term: "Circadian Rhythm", definition: "The natural internal process that regulates the sleep-wake cycle and repeats on each rotation of the Earth." },
          { term: "Solar Year", definition: "The time it takes for the Earth to complete one orbit around the Sun (approximately 365.24 days)." },
        ]}
        faqs={[
          {
            question: "Why does my age stay the same even on my birthday?",
            answer: "Technically, you turn a year older at the exact time of your birth. Most people celebrate the entire 'day' of their birthday, but mathematically, you are X years and 0 days old the moment the date changes to your birth date."
          },
          {
            question: "How are months calculated if they have different days?",
            answer: "Our calculator uses a 'Borrowing Logic.' If the target day is less than the birth day, we borrow the total days from the month immediately preceding the target month. This accounts for the 28, 30, or 31 day variability."
          },
          {
            question: "How many days are in a scientific year?",
            answer: "While the calendar year is 365 days, a scientific (tropical) year is approximately 365.24219 days. Leap years are added to compensate for this extra quarter-day accumulation."
          },
          {
            question: "Can I calculate the age of a historical event?",
            answer: "Yes. Simply set the 'Birth Date' to the event/document creation date and the 'Target Date' to today or any other marker to find the 'Age' of that event."
          },
          {
            question: "Is there a maximum age limit for this calculator?",
            answer: "No. The calculator uses standard JavaScript Date objects which can handle dates thousands of years in the past or future, though accuracy for very ancient dates may vary due to several calendar reforms in history."
          },
          {
            question: "Is calculating age 'at the date of' different from 'today'?",
            answer: "Only in the choice of the second date. The 'today' option is just a shortcut to your current system clock time. The calculation logic remains identical."
          }
        ]}
        relatedCalculators={[
          {
            name: "Date Calculator",
            path: "/date-calculator/",
            desc: "Perform advanced date math, adding or subtracting days, months, and years to find specific future or past milestones.",
          },
          {
            name: "Days Until Calculator",
            path: "/days-until-calculator/",
            desc: "Focus specifically on the countdown to upcoming events like weddings, vacations, or product launches.",
          },
          {
            name: "Retirement Calculator",
            path: "/retirement-calculator/",
            desc: "Project your financial future based on your exact age, current savings, and expected investment growth.",
          },
          {
            name: "Birthday Calculator",
            path: "/birthday-calculator/",
            desc: "Explore fun facts about your birth day, including your zodiac sign, birthstone, and famous people born on the same date.",
          }
        ]}
      />
    </div>
  );
}
