"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function RomanNumeralDateConverter() {
  const [month, setMonth] = useState("1");
  const [day, setDay] = useState("1");
  const [year, setYear] = useState("2024");
  const [format, setFormat] = useState("MM.DD.YYYY"); // MM.DD.YYYY, DD.MM.YYYY, YYYY.MM.DD

  const toRoman = (num: number): string => {
    if (num < 1 || num >= 4000) return num.toString();
    const romanNumerals: { value: number; numeral: string }[] = [
      { value: 1000, numeral: "M" },
      { value: 900, numeral: "CM" },
      { value: 500, numeral: "D" },
      { value: 400, numeral: "CD" },
      { value: 100, numeral: "C" },
      { value: 90, numeral: "XC" },
      { value: 50, numeral: "L" },
      { value: 40, numeral: "XL" },
      { value: 10, numeral: "X" },
      { value: 9, numeral: "IX" },
      { value: 5, numeral: "V" },
      { value: 4, numeral: "IV" },
      { value: 1, numeral: "I" },
    ];

    let result = "";
    for (let i = 0; i < romanNumerals.length; i++) {
      while (num >= romanNumerals[i].value) {
        result += romanNumerals[i].numeral;
        num -= romanNumerals[i].value;
      }
    }
    return result;
  };

  const m = parseInt(month, 10);
  const d = parseInt(day, 10);
  const y = parseInt(year, 10);

  let result = "";
  let isValid = false;

  if (
    !isNaN(m) &&
    !isNaN(d) &&
    !isNaN(y) &&
    m >= 1 &&
    m <= 12 &&
    d >= 1 &&
    d <= 31 &&
    y >= 1 &&
    y <= 3999
  ) {
    isValid = true;
    const rm = toRoman(m);
    const rd = toRoman(d);
    const ry = toRoman(y);

    if (format === "MM.DD.YYYY") {
      result = `${rm} . ${rd} . ${ry}`;
    } else if (format === "DD.MM.YYYY") {
      result = `${rd} . ${rm} . ${ry}`;
    } else if (format === "YYYY.MM.DD") {
      result = `${ry} . ${rm} . ${rd}`;
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-stone-50 rounded-2xl shadow-xl border border-stone-200">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-stone-900 flex items-center justify-center font-serif">
          <span className="mr-3">🏛️</span> Roman Numeral Date
        </h1>
        <p className="text-stone-600 text-lg max-w-2xl mx-auto">
          Convert any date from standard numbers into elegant Roman numerals for
          tattoos, engravings, and designs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Inputs */}
        <div className="lg:col-span-2 space-y-6 bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-2 uppercase tracking-wide">
              Format
            </label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="w-full rounded-xl border-stone-200 p-3 shadow-sm focus:border-stone-500 font-semibold bg-stone-50 cursor-pointer"
            >
              <option value="MM.DD.YYYY">MM . DD . YYYY (US)</option>
              <option value="DD.MM.YYYY">DD . MM . YYYY (EU/Global)</option>
              <option value="YYYY.MM.DD">YYYY . MM . DD (ISO)</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-2 uppercase tracking-wide">
                Month (1-12)
              </label>
              <input
                type="number"
                min="1"
                max="12"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="w-full rounded-xl border-stone-200 p-3 shadow-sm focus:border-stone-500 font-bold bg-stone-50"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-2 uppercase tracking-wide">
                Day (1-31)
              </label>
              <input
                type="number"
                min="1"
                max="31"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className="w-full rounded-xl border-stone-200 p-3 shadow-sm focus:border-stone-500 font-bold bg-stone-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-2 uppercase tracking-wide">
              Year (1-3999)
            </label>
            <input
              type="number"
              min="1"
              max="3999"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full rounded-xl border-stone-200 p-3 shadow-sm focus:border-stone-500 font-bold bg-stone-50 text-lg tracking-wider"
            />
          </div>
        </div>

        {/* Dashboard Output */}
        <div className="lg:col-span-3">
          {isValid ? (
            <div className="h-full bg-stone-900 rounded-2xl p-8 shadow-2xl relative overflow-hidden flex flex-col justify-center text-stone-100 border border-stone-700">
              {/* Decorative element */}
              <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                <span className="font-serif text-9xl">V</span>
              </div>

              <div className="relative z-10 text-center">
                <h2 className="text-stone-400 font-bold uppercase tracking-[0.3em] text-xs mb-8 border-b border-stone-700/50 pb-4">
                  Converted Date
                </h2>

                <div className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-serif tracking-[0.2em] text-amber-50 leading-relaxed py-8">
                  {result}
                </div>

                <div className="mt-8 pt-6 border-t border-stone-700/50">
                  <div className="flex justify-center space-x-6 text-stone-400 text-xs font-mono">
                    <div>M = 1000</div>
                    <div>D = 500</div>
                    <div>C = 100</div>
                    <div>L = 50</div>
                  </div>
                  <div className="flex justify-center space-x-6 text-stone-400 text-xs font-mono mt-2">
                    <div>X = 10</div>
                    <div>V = 5</div>
                    <div>I = 1</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full rounded-2xl border-2 border-dashed border-stone-300 bg-stone-100 flex flex-col items-center justify-center p-8 text-center">
              <h3 className="text-stone-500 font-bold text-xl mb-2">
                Invalid Date
              </h3>
              <p className="text-stone-400 text-sm">
                Please provide a valid month, day, and year.
              </p>
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
            name: "Roman Numeral Date Converter",
            operatingSystem: "All",
            applicationCategory: "UtilitiesApplication",
          }),
        }}
      />

      <div className="mt-8 text-left">
        <CalculatorSEO
          title="Aesthetic Roman Numeral Dates"
          whatIsIt={
            <p>
              The <strong>Roman Numeral Date Converter</strong> translates
              standard modern calendar dates into classical Roman numeral
              styling. Highly popular for designing personalized tattoos,
              wedding invitations, and engraved jewelry, this tool guarantees
              your important dates are mathematically translated correctly into
              perfect Latin script.
            </p>
          }
          formula={
            <>
              <p>
                Roman numerals operate by combining seven specific Latin letters
                (I, V, X, L, C, D, M). Rather than possessing a "Zero" or
                utilizing formal decimal places, the system involves adding
                characters left-to-right (XII = 12) or subtracting a smaller
                character placed before a larger one (IX = 9).
              </p>
              <div className="bg-stone-100 p-4 rounded-lg font-mono text-center text-[15px] shadow-sm my-4 flex flex-col gap-2 border border-stone-200 text-stone-900">
                <p>
                  <strong>Key Characters:</strong> I (1), V (5), X (10), L (50),
                  C (100), D (500), M (1000)
                </p>
                <p className="mt-2 pt-2 border-t border-stone-300">
                  <strong>Addition Rule:</strong> VII = 5 + 1 + 1 = 7
                </p>
                <p className="mt-2 pt-2 border-t border-stone-300">
                  <strong>Subtraction Rule:</strong> IV = 5 - 1 = 4
                </p>
              </div>
            </>
          }
          example={
            <>
              <p>
                Let's convert the iconic date format indicating Christmas Day in
                the year 2024: <strong>12 . 25 . 2024</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-stone-700">
                <li>
                  <strong>The Month (12):</strong> A '10' (X) plus two '1's (II)
                  = <strong>XII</strong>.
                </li>
                <li>
                  <strong>The Day (25):</strong> Two '10's (XX) plus a '5' (V) ={" "}
                  <strong>XXV</strong>.
                </li>
                <li>
                  <strong>The Year (2024):</strong> Two '1000's (MM), plus two
                  '10's (XX), plus a '4' (IV) = <strong>MMXXIV</strong>.
                </li>
                <li>
                  <strong>Final Result:</strong> XII . XXV . MMXXIV
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-stone-700">
              <li>
                <strong>Tattoo Artists & Clients:</strong> Eliminating the
                incredibly risky guesswork of trying to manually translate a
                child's birthdate into Roman Numerals for a permanent piece of
                body art.
              </li>
              <li>
                <strong>Graphic Design:</strong> Wedding planners and invitation
                designers creating elegant, sophisticated typography elements
                for high-end formal event documentation.
              </li>
              <li>
                <strong>Architecture & Monuments:</strong> Engravers and
                stonemasons accurately noting the founding date or construction
                year into cornerstones following ancient architectural
                traditions.
              </li>
            </ul>
          }
          faqs={[
            {
              question:
                "Why does the year 1999 look so strange in Roman Numerals (MCMXCIX)?",
              answer:
                "Because you cannot simply write 'IM' for 1999 (meaning 1 less than 2000). The strict subtraction rule dictates you must calculate each tens-place separately: 1000 (M), 900 (CM), 90 (XC), and 9 (IX) to form MCMXCIX.",
            },
            {
              question:
                "How do you write the concept of 'Zero' in Roman Numerals?",
              answer:
                "You cannot. The Roman Empire did not actually possess the mathematical concept of zero. Because of this, our calculator only supports non-zero, positive integers starting from the number 1.",
            },
            {
              question:
                "Is there a maximum number the Roman system can display?",
              answer:
                "Traditionally, yes. Because 'M' (1,000) is the largest standard letter, the system begins to visually break down after 3,999 (MMMCMXCIX). Romans used 'vinculum' overlines to multiply numbers by 1,000 for massive quantities, but it is rarely used in modern text.",
            },
          ]}
          relatedCalculators={[
            {
              name: "Roman Numeral Converter",
              path: "/roman-numeral-converter",
              desc: "Translate raw individual numbers back and forth without date formatting.",
            },
            {
              name: "Date Calculator",
              path: "/date-calculator",
              desc: "Subtract exact dates from each other to find durations.",
            },
            {
              name: "Age Calculator",
              path: "/age-calculator",
              desc: "Calculate exact chronological age in years and months.",
            },
          ]}
        />
      </div>
    </div>
  );
}
