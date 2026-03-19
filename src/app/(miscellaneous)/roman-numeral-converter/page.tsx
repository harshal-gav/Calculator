"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

const ROMAN_MAP: [string, number][] = [
  ["M", 1000],
  ["CM", 900],
  ["D", 500],
  ["CD", 400],
  ["C", 100],
  ["XC", 90],
  ["L", 50],
  ["XL", 40],
  ["X", 10],
  ["IX", 9],
  ["V", 5],
  ["IV", 4],
  ["I", 1],
];

export default function RomanNumeralConverter() {
  const [numberInput, setNumberInput] = useState("2024");
  const [romanInput, setRomanInput] = useState("MMXXIV");
  const [error, setError] = useState("");

  const convertToRoman = (numStr: string) => {
    setNumberInput(numStr);
    setError("");

    if (!numStr) {
      setRomanInput("");
      return;
    }

    const num = parseInt(numStr, 10);
    if (isNaN(num) || num < 1) {
      setError("Please enter a positive integer greater than 0.");
      setRomanInput("");
      return;
    }
    if (num > 3999) {
      setError("Standard Roman numerals only support up to 3999.");
      setRomanInput("");
      return;
    }

    let tempNum = num;
    let result = "";

    for (const [roman, value] of ROMAN_MAP) {
      while (tempNum >= value) {
        result += roman;
        tempNum -= value;
      }
    }

    setRomanInput(result);
  };

  const convertToNumber = (romStr: string) => {
    const cleanStr = romStr.toUpperCase().replace(/[^IVXLCDM]/g, "");
    setRomanInput(cleanStr);
    setError("");

    if (!cleanStr) {
      setNumberInput("");
      return;
    }

    // Basic Roman validation regex
    const validRomanRegex =
      /^(M{0,3})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;
    if (!validRomanRegex.test(cleanStr)) {
      setError("Invalid Roman numeral sequence.");
      setNumberInput("");
      return;
    }

    let result = 0;
    let p = 0;

    for (const [roman, value] of ROMAN_MAP) {
      while (cleanStr.substring(p, p + roman.length) === roman) {
        result += value;
        p += roman.length;
      }
    }

    setNumberInput(result.toString());
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-amber-50 rounded-xl shadow-lg border border-amber-200">
      <h1 className="text-4xl font-extrabold mb-4 text-amber-900 border-b border-amber-200 pb-4 flex items-center">
        <span className="mr-3">🏛️</span> Roman Numeral Converter
      </h1>
      <p className="mb-8 text-amber-800 text-lg">
        Convert standard numbers to Roman numerals (I, V, X, L, C, D, M) and
        vice versa instantly.
      </p>

      <div className="bg-white p-6 md:p-10 rounded-2xl border border-amber-200 shadow-sm relative overflow-hidden">
        {/* Ancient Rome columns background design */}
        <div className="absolute inset-0 opacity-10 pointer-events-none flex justify-between px-8">
          <div className="w-12 h-full border-x-4 border-amber-900 flex justify-center">
            <div className="w-4 h-full border-x-2 border-amber-900"></div>
          </div>
          <div className="w-12 h-full border-x-4 border-amber-900 flex justify-center">
            <div className="w-4 h-full border-x-2 border-amber-900"></div>
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Arabic Number Input */}
          <div>
            <label className="block text-sm font-bold text-amber-700 uppercase tracking-widest text-center mb-4 border-b border-amber-100 pb-2">
              Number Input (1 - 3999)
            </label>
            <input
              type="number"
              min="1"
              max="3999"
              value={numberInput}
              onChange={(e) => convertToRoman(e.target.value)}
              className="w-full rounded-xl border-4 border-amber-100 p-6 text-5xl font-black text-slate-800 outline-none focus:border-amber-400 transition-colors text-center shadow-inner"
              placeholder="e.g. 2024"
            />
          </div>

          {/* Roman Numeral Input */}
          <div>
            <label className="block text-sm font-bold text-amber-700 uppercase tracking-widest text-center mb-4 border-b border-amber-100 pb-2">
              Roman Numeral Input
            </label>
            <input
              type="text"
              value={romanInput}
              onChange={(e) => convertToNumber(e.target.value)}
              className="w-full rounded-xl border-4 border-amber-100 p-6 text-5xl font-black text-slate-800 outline-none focus:border-amber-400 transition-colors text-center shadow-inner uppercase tracking-widest font-serif"
              placeholder="e.g. MMXXIV"
            />
          </div>
        </div>

        {error && (
          <div className="mt-8 text-center text-red-600 bg-red-50 p-4 rounded-xl border border-red-200 font-bold">
            {error}
          </div>
        )}
      </div>

      {/* Reference Table */}
      <div className="mt-8 bg-white p-6 rounded-2xl border border-amber-200 shadow-sm">
        <h3 className="font-bold text-amber-900 mb-4 uppercase tracking-wider text-sm border-b border-amber-100 pb-2">
          Roman Numeral Values
        </h3>
        <div className="grid grid-cols-7 gap-2 text-center">
          <div className="bg-amber-50 p-2 rounded-lg border border-amber-100">
            <div className="font-serif text-2xl font-black text-amber-900 mb-1">
              M
            </div>
            <div className="text-xs font-bold text-amber-700">1000</div>
          </div>
          <div className="bg-amber-50 p-2 rounded-lg border border-amber-100">
            <div className="font-serif text-2xl font-black text-amber-900 mb-1">
              D
            </div>
            <div className="text-xs font-bold text-amber-700">500</div>
          </div>
          <div className="bg-amber-50 p-2 rounded-lg border border-amber-100">
            <div className="font-serif text-2xl font-black text-amber-900 mb-1">
              C
            </div>
            <div className="text-xs font-bold text-amber-700">100</div>
          </div>
          <div className="bg-amber-50 p-2 rounded-lg border border-amber-100">
            <div className="font-serif text-2xl font-black text-amber-900 mb-1">
              L
            </div>
            <div className="text-xs font-bold text-amber-700">50</div>
          </div>
          <div className="bg-amber-50 p-2 rounded-lg border border-amber-100">
            <div className="font-serif text-2xl font-black text-amber-900 mb-1">
              X
            </div>
            <div className="text-xs font-bold text-amber-700">10</div>
          </div>
          <div className="bg-amber-50 p-2 rounded-lg border border-amber-100">
            <div className="font-serif text-2xl font-black text-amber-900 mb-1">
              V
            </div>
            <div className="text-xs font-bold text-amber-700">5</div>
          </div>
          <div className="bg-amber-50 p-2 rounded-lg border border-amber-100">
            <div className="font-serif text-2xl font-black text-amber-900 mb-1">
              I
            </div>
            <div className="text-xs font-bold text-amber-700">1</div>
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Roman Numeral Converter",
            operatingSystem: "All",
            applicationCategory: "EducationalApplication",
          }),
        }}
      />

      <div className="mt-8 text-left">
        <CalculatorSEO
          title="Classical Roman Numeral Translator"
          whatIsIt={
            <p>
              The <strong>Roman Numeral Converter</strong> is a historical and
              educational translation tool. It systematically converts absolute
              integer values (Arabic Digits) into the ancient, non-place-value
              classical Latin numerical sequence—utilizing the standard 7
              character alphabet (I, V, X, L, C, D, M)—and perfectly translates
              those sequences backward.
            </p>
          }
          formula={
            <>
              <p>
                Roman numerals act as an additive and subtractive tally system,
                not a positional decimal system like modern math. To convert an
                Arabic number, the algorithm cascades downward globally,
                subtracting the largest possible Roman letter value until the
                baseline reaches zero. If a smaller numeral strictly precedes a
                larger one, it triggers a unified subtraction rule (e.g., IX
                means 10 minus 1).
              </p>
              <div className="bg-amber-100/50 p-4 rounded-lg font-mono text-center text-[15px] shadow-sm my-4 flex flex-col gap-2 border border-amber-200 text-amber-900">
                <p>
                  <strong>
                    Primary Tokens: I=1, V=5, X=10, L=50, C=100, D=500, M=1000
                  </strong>
                </p>
                <p className="mt-2 pt-2 border-t border-amber-200">
                  <strong>
                    Subtractive Tokens: IV=4, IX=9, XL=40, XC=90, CD=400, CM=900
                  </strong>
                </p>
              </div>
            </>
          }
          example={
            <>
              <p>
                Let's break down the year <strong>1984</strong> mathematically
                using the descending allocation rule.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-amber-900">
                <li>
                  <strong>Extract 1000:</strong> Remaining is 984. Output so
                  far: <code>M</code>
                </li>
                <li>
                  <strong>Extract 900:</strong> By using the block token{" "}
                  <code>CM</code> (1000 - 100), the remainder is 84. Output:{" "}
                  <code>M CM</code>
                </li>
                <li>
                  <strong>Extract 50:</strong> Remaining is 34. Output:{" "}
                  <code>M CM L</code>
                </li>
                <li>
                  <strong>Extract 30:</strong> Pulling three 10s (
                  <code>XXX</code>). Remaining is 4. Output:{" "}
                  <code>M CM L XXX</code>
                </li>
                <li>
                  <strong>Extract 4:</strong> Using block token <code>IV</code>{" "}
                  (5 - 1). Remaining is 0.
                </li>
                <li>
                  <strong>Result:</strong> 1984 as a connected Roman string is
                  exactly <strong>MCMLXXXIV</strong>.
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-amber-900">
              <li>
                <strong>Copyright & Dedication Dates:</strong> Translating
                modern publication years into Roman sequences for use at the
                credits screen of independent films, copyright footers of
                traditional literature books, or cornerstones of architectural
                buildings.
              </li>
              <li>
                <strong>Tattoos and Engravings:</strong> Ensuring an important
                personal date (like an anniversary or birthday) is
                mathematically accurate and properly formatted before committing
                it permanently to skin or jewelry.
              </li>
              <li>
                <strong>Event Sequencing:</strong> Organizing Super Bowls,
                Olympic Games, or academic chapters correctly based on
                historical naming conventions without struggling over the
                subtractive notation of numbers like 39 (XXXIX).
              </li>
            </ul>
          }
          faqs={[
            {
              question: "Why is there no zero in Roman Numerals?",
              answer:
                "The Roman numerical system was originally designed strictly to track physical, tangible commerce (like bags of grain or legions of men), not for abstract theoretical math. The concept of 'Zero' (Nothingness) wasn't widely introduced to European mathematics until Arabic scholars brought it from India roughly a thousand years later.",
            },
            {
              question: "Why does the tool stop at 3,999?",
              answer:
                "Standard Roman typography relies on 'M' as its absolute largest single character (1000). To write '4000', you cannot write 'MMMM' because Roman rules dictate a character cannot naturally repeat more than three times sequentially. Historically, the Romans used an 'overline' drawn above a character to multiply it by 1000 to solve this, but standard ASCII computer keyboards cannot easily format this symbol.",
            },
            {
              question: "Can I do algebra or fractions with Roman Numerals?",
              answer:
                "Fractions? Slightly. The Romans used a base-12 fraction system reliant on 'Suncia' (dots). Algebra? Absolutely not. Because Roman characters lack positional value notation (where the '1' in '10' means ten, but the '1' in '100' means hundred), doing long-division or algebraic multiplication using raw Roman sequences is considered practically impossible.",
            },
          ]}
          relatedCalculators={[
            {
              name: "Base Converter",
              path: "/base-converter/",
              desc: "Translate digits into modern computational Base formats like Binary and Hexadecimal.",
            },
            {
              name: "Roman Numeral Date Converter",
              path: "/roman-numeral-date-converter/",
              desc: "Format full MM/DD/YYYY calendar dates entirely in Roman notation.",
            },
            {
              name: "Number to Words",
              path: "/number-to-words-converter/",
              desc: "Convert massive numerical digits mathematically out into spoken English.",
            },
            {
              name: "Word Count Calculator",
              path: "/word-count-calculator/",
              desc: "Count the number of words, characters, and sentences in your text.",
            }]}
        />
      </div>
    </div>
  );
}
