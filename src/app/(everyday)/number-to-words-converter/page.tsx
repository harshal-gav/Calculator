"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

import numberToWordsSeoData from "@/data/seo-content/official/number-to-words-converter.json";

// Simplified helper for numbers up to 999,999,999,999,999 (15 digits)
const numberToWords = (numStr: string): string => {
  const cleanNumStr = numStr.replace(/,/g, "").trim();
  if (!/^\d+$/.test(cleanNumStr))
    return "Invalid number format. Please enter only digits.";

  let num = BigInt(cleanNumStr);
  if (num === BigInt(0)) return "Zero";

  const ones = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];
  const scales = [
    "",
    "Thousand",
    "Million",
    "Billion",
    "Trillion",
    "Quadrillion",
    "Quintillion",
  ];

  const convertChunk = (n: number): string => {
    let chunkStr = "";
    if (n >= 100) {
      chunkStr += ones[Math.floor(n / 100)] + " Hundred ";
      n %= 100;
    }
    if (n >= 20) {
      chunkStr += tens[Math.floor(n / 10)] + " ";
      n %= 10;
    }
    if (n > 0) {
      chunkStr += ones[n] + " ";
    }
    return chunkStr;
  };

  if (num > BigInt("999999999999999999999"))
    return "Number is too large to convert accurately in this tool.";

  let chunks = [];
  while (num > BigInt(0)) {
    chunks.push(Number(num % BigInt(1000)));
    num /= BigInt(1000);
  }

  let result = "";
  for (let i = 0; i < chunks.length; i++) {
    if (chunks[i] !== 0) {
      const chunkStr = convertChunk(chunks[i]);
      const scaleStr = scales[i] ? scales[i] + " " : "";
      result = chunkStr + scaleStr + result;
    }
  }

  return result.trim();
};

export default function NumberToWordsConverter() {
  const [num, setNum] = useState("");
  const [words, setWords] = useState("");

  const convert = () => {
    if (!num) {
      setWords("");
      return;
    }
    setWords(numberToWords(num));
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-indigo-900 flex items-center justify-center font-serif">
          <span className="mr-3">🔢</span> Number to Words Converter
        </h1>
        <p className="text-indigo-700 text-lg max-w-2xl mx-auto">
          Type any large number and instantly convert it into written English
          words. Perfect for writing checks, legal documents, or essays.
        </p>
      </div>

      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-zinc-200 mb-8 w-full max-w-2xl mx-auto">
        <div className="mb-8">
          <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">
            Enter a Number
          </label>
          <input
            type="text"
            value={num}
            onChange={(e) => setNum(e.target.value.replace(/[^0-9,]/g, ""))}
            placeholder="e.g. 1,000,000"
            className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-indigo-500 font-bold bg-zinc-50 text-xl font-mono"
            onKeyDown={(e) => e.key === "Enter" && convert()}
          />
          <p className="text-xs text-zinc-400 mt-2 font-mono ml-2">
            Supports up to Quintillions
          </p>
        </div>

        <div>
          <button
            onClick={convert}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-indigo-600/30 uppercase tracking-widest text-lg"
          >
            Convert to Words
          </button>
        </div>
      </div>

      {words && (
        <div className="bg-indigo-950 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

          <div className="flex justify-between w-full max-w-3xl items-center mb-6 z-10 border-b border-indigo-500/30 pb-4">
            <h2 className="text-indigo-400 font-bold uppercase tracking-widest text-xs">
              Written Output
            </h2>
            <button
              onClick={() => navigator.clipboard.writeText(words)}
              className="text-xs bg-indigo-500 hover:bg-indigo-400 text-indigo-950 font-bold px-4 py-2 rounded-lg transition-colors"
            >
              Copy Text
            </button>
          </div>

          <div className="z-10 w-full max-w-3xl">
            <p className="font-serif text-white text-2xl md:text-4xl font-bold leading-tight break-words py-4 capitalize">
              {words}
            </p>
          </div>

          <div className="w-full max-w-3xl mt-6 z-10 pt-4 border-t border-indigo-500/30">
            <span className="text-indigo-400 font-mono text-xs block break-all tracking-widest opacity-60">
              RAW: {num.replace(/,/g, "")}
            </span>
          </div>
        </div>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Number to Words Converter",
            operatingSystem: "All",
            applicationCategory: "UtilitiesApplication",
          }),
        }}
      />

      <div className="mt-8">
      <CalculatorSEO
        title={numberToWordsSeoData.title}
        whatIsIt={numberToWordsSeoData.whatIsIt}
        formula={numberToWordsSeoData.formula}
        example={numberToWordsSeoData.example}
        useCases={numberToWordsSeoData.useCases}
        faqs={numberToWordsSeoData.faqs}
        deepDive={numberToWordsSeoData.deepDive}
        glossary={numberToWordsSeoData.glossary}
        relatedCalculators={[
          {
            name: "Roman Numeral Converter",
            path: "/roman-numeral-converter/",
            desc: "Translate standard Arabic digits into historic Roman Numerals.",
          },
          {
            name: "Base Converter",
            path: "/base-converter/",
            desc: "Convert numbers from Decimal format into Hex or Binary.",
          },
          {
            name: "Word Count Calculator",
            path: "/word-count-calculator/",
            desc: "Count how many words or characters are in a long document.",
          },
          {
            name: "Percentage Calculator",
            path: "/percentage-calculator/",
            desc: "Calculate precise ratios and percentage increases.",
          }]}
      />
      </div>
    </div>
  );
}
