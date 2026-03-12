"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function SignificantFiguresCalculator() {
  const [inputNum, setInputNum] = useState("0.004050");

  const [result, setResult] = useState<{
    sigFigs: number;
    scientific: string;
    roundedPlaces: string[];
  } | null>(null);

  const calculate = () => {
    let val = inputNum.trim();
    if (!val || isNaN(Number(val))) {
      setResult(null);
      return;
    }

    // Logic for counting Sig Figs
    // Rules:
    // 1. Non-zero digits are significant.
    // 2. Zeros between non-zeros are significant.
    // 3. Leading zeros are NEVER significant.
    // 4. Trailing zeros are ONLY significant if there is a decimal point in the number.

    // Remove negative sign
    if (val.startsWith("-")) {
      val = val.substring(1);
    }

    let sigFigCount = 0;

    if (val.includes(".")) {
      // Has decimal
      // Strip leading zeros
      const stripped = val.replace(/^0+\.?0*/, "");
      if (stripped.length === 0) {
        sigFigCount = 0; // It was just "0.000"
        if (val !== "." && parseFloat(val) === 0) {
          // "0.0" actually has trailing zeros
          const decimalPart = val.split(".")[1] || "";
          sigFigCount = decimalPart.length; // e.g. 0.00 -> 2 sig figs if written like that, actually usually "0" is 1 sig fig.
          // Let's use a simpler robust approach for string parsing.
        }
      } else {
        // Count remaining digits (ignoring the decimal point itself)
        sigFigCount = stripped.replace(".", "").length;
      }
    } else {
      // No decimal. Trailing zeros are generally NOT significant unless marked.
      // We strip trailing zeros.
      const stripped = val.replace(/0+$/, "");
      sigFigCount = stripped.length;
    }

    // Special case for exact 0
    if (parseFloat(val) === 0 && val.includes(".")) {
      sigFigCount = val.split(".")[1].length || 1;
    } else if (parseFloat(val) === 0) {
      sigFigCount = val.length; // e.g., "00" is weird but we'll say 1. Usually just 1.
      if (sigFigCount > 0) sigFigCount = 1;
    }

    // Scientific Notation
    const num = parseFloat(inputNum);
    const scientific = num.toExponential();

    // Rounding examples
    const roundedList = [];
    if (num !== 0) {
      roundedList.push(`1 Sig Fig: ${Number(num.toPrecision(1)).toString()}`);
      if (sigFigCount > 2)
        roundedList.push(
          `2 Sig Figs: ${Number(num.toPrecision(2)).toString()}`,
        );
      if (sigFigCount > 3)
        roundedList.push(
          `3 Sig Figs: ${Number(num.toPrecision(3)).toString()}`,
        );
    }

    setResult({
      sigFigs: sigFigCount,
      scientific,
      roundedPlaces: roundedList,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-cyan-900 flex items-center justify-center font-serif">
          <span className="mr-3">🎯</span> Significant Figures
        </h1>
        <p className="text-cyan-700 text-lg max-w-2xl mx-auto">
          Count exact significant digits (sig figs) in any number and convert it
          to scientific notation instantly.
        </p>
      </div>

      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-zinc-200 mb-8 max-w-xl mx-auto">
        <div className="mb-6">
          <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide text-center">
            Enter a Number
          </label>
          <input
            type="text"
            value={inputNum}
            onChange={(e) => setInputNum(e.target.value)}
            className="w-full text-center rounded-xl py-5 text-4xl font-mono font-bold bg-zinc-50 border-2 border-zinc-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 transition-all outline-none"
            placeholder="e.g. 0.00405"
            onKeyDown={(e) => e.key === "Enter" && calculate()}
          />
        </div>

        <button
          onClick={calculate}
          className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-cyan-600/30 uppercase tracking-widest text-lg"
        >
          Extract Sig Figs
        </button>
      </div>

      {result !== null && (
        <div className="bg-cyan-950 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

          <h2 className="text-cyan-300 font-bold uppercase tracking-widest text-xs mb-8 z-10 text-center">
            Analysis Results
          </h2>

          <div className="z-10 relative mb-8 w-full max-w-sm">
            <div className="p-8 rounded-full aspect-square border-4 bg-cyan-900/40 border-cyan-400/30 shadow-inner flex flex-col items-center justify-center">
              <div className="font-bold text-7xl md:text-8xl text-cyan-400 text-center drop-shadow-lg leading-tight font-mono break-all pt-2">
                {result.sigFigs}
              </div>
              <span className="text-white/60 text-xs uppercase tracking-widest mt-2 font-bold block text-center border-t border-cyan-800 pt-2 w-3/4">
                Significant Figures
              </span>
            </div>
          </div>

          <div className="w-full max-w-2xl z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-black/30 p-6 rounded-2xl border border-white/5 flex flex-col items-center text-center">
              <span className="text-cyan-400 text-[10px] font-bold uppercase tracking-widest mb-3">
                Scientific Notation
              </span>
              <div className="font-mono text-white text-3xl font-bold break-all">
                {result.scientific
                  .replace("e+", " × 10^")
                  .replace("e-", " × 10^-")}
              </div>
            </div>

            <div className="bg-black/30 p-6 rounded-2xl border border-white/5">
              <span className="text-cyan-400 text-[10px] font-bold uppercase tracking-widest mb-3 block text-center">
                Rounding Examples
              </span>
              <div className="font-mono text-white text-sm space-y-2">
                {result.roundedPlaces.length > 0 ? (
                  result.roundedPlaces.map((txt, i) => (
                    <div
                      key={i}
                      className="bg-white/5 p-2 rounded border border-white/10 text-center"
                    >
                      {txt}
                    </div>
                  ))
                ) : (
                  <div className="text-center text-white/40 italic">
                    Not applicable.
                  </div>
                )}
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
            name: "Significant Figures Calculator",
            operatingSystem: "All",
            applicationCategory: "EducationalApplication",
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title="Significant Figures (Sig Fig) Calculator"
          whatIsIt={
            <>
              <p>
                Our <strong>Significant Figures Calculator</strong> analyzes any
                number and instantly tells you exactly how many significant
                digits (sig figs) it contains based on strict scientific
                formatting rules. It also automatically converts your raw number
                into proper standard Scientific Notation.
              </p>
              <p>
                Significant figures are critical in chemistry, physics, and
                engineering because they mathematically represent the precision
                of a measurement. You cannot report a final answer that implies
                more precision than your least precise initial measurement tool
                allows.
              </p>

              <p className="mt-4 text-sm text-gray-500">
                <strong>Related Terms:</strong> Sig Fig Calculator
              </p>
            </>
          }
          formula={
            <>
              <p>
                Counting significant figures requires following four strict,
                sequential rules:
              </p>
              <div className="bg-white p-4 rounded-lg font-mono text-left text-[15px] shadow-sm my-4 border border-zinc-200">
                <ul className="list-decimal pl-6 space-y-2">
                  <li>
                    <strong>Rule 1:</strong> All non-zero numbers are ALWAYS
                    significant.
                  </li>
                  <li>
                    <strong>Rule 2:</strong> Zeros trapped <em>between</em> two
                    non-zero numbers are ALWAYS significant.
                  </li>
                  <li>
                    <strong>Rule 3:</strong> Leading zeros (zeros before the
                    first non-zero number) are NEVER significant.
                  </li>
                  <li>
                    <strong>Rule 4:</strong> Trailing zeros (zeros at the very
                    end of a number) are ONLY significant if the number contains
                    a written decimal point.
                  </li>
                </ul>
              </div>
            </>
          }
          example={
            <>
              <p>
                Let's analyze a difficult number like <strong>0.004050</strong>:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>
                  The three leading zeros (
                  <span className="text-red-600 font-bold">0.00</span>4050) are
                  just placeholders marking the decimal. Not significant.
                </li>
                <li>
                  The non-zero digits (4 and 5) are ALWAYS significant. (2 sig
                  figs so far).
                </li>
                <li>
                  The zero trapped in the middle (0.004
                  <span className="text-green-600 font-bold">0</span>50)
                  connects two significant numbers. It is significant. (3 sig
                  figs so far).
                </li>
                <li>
                  There is a trailing zero at the end (0.00405
                  <span className="text-green-600 font-bold">0</span>). Because
                  the number contains a decimal point, this trailing zero is
                  significant. (4 total sig figs).
                </li>
                <li>
                  <strong>Result:</strong> 0.004050 has exactly{" "}
                  <strong>4 Significant Figures</strong> and is written as 4.050
                  × 10^-3 in scientific notation.
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4">
              <li>
                <strong>Chemistry & Physics Labs:</strong> Calculating the final
                molarity of a solution without accidentally over-reporting the
                precision of your cheap digital scale.
              </li>
              <li>
                <strong>Engineering Design:</strong> Reporting tolerances on CAD
                blueprints. A metal rod listed as "5 cm" implies it could be
                anywhere from 4.5 to 5.4 cm. A rod listed as "5.00 cm"
                explicitly implies extremely high manufacturing precision.
              </li>
              <li>
                <strong>Standardized Tests:</strong> AP Chemistry, SAT Math, and
                MCAT exams frequently feature "gotcha" questions testing rule #4
                regarding trailing zeros.
              </li>
            </ul>
          }
          faqs={[
            {
              question: "Why do 'trapped' zeros count?",
              answer:
                "Because they are part of the actual measured value. If a digital thermometer reads 101 degrees, that middle zero isn't a placeholder; it's a specific, measured piece of data proving the temperature isn't 111 or 121.",
            },
            {
              question:
                "Are trailing zeros significant if there is no decimal point?",
              answer:
                "Generally, no. In the number 5,000, those three trailing zeros are usually considered ambiguous placeholders, meaning the number only has 1 sig fig. However, if written as 5,000. (with a hard decimal at the end), it legally has 4 sig figs.",
            },
            {
              question: "What is an 'exact number'?",
              answer:
                "An exact number is something physically counted, not measured. For example, '3 apples'. You cannot have 3.01 apples. Because they have infinite precision, exact numbers have an infinite number of significant figures and do not limit your calculations.",
            },
          ]}
          relatedCalculators={[
            {
              name: "Scientific Notation Converter",
              path: "/scientific-notation-converter",
              desc: 'Instantly convert massive numbers to and from scientific "E" notation.',
            },
            {
              name: "Fraction Simplifier",
              path: "/fraction-simplifier-calculator",
              desc: "Reduce complex mathematical fractions to lowest terms.",
            },
            {
              name: "Decimal to Fraction",
              path: "/decimal-to-fraction-calculator",
              desc: "Convert any decimal exactly into a standard fraction.",
            },
            {
              name: "Percentage Calculator",
              path: "/percentage-calculator",
              desc: "Easily calculate percentages, increases, and decreases.",
            }]}
        />
      </div>
    </div>
  );
}
