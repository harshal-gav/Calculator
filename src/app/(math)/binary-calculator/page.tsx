"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import binarySeoData from "@/data/seo-content/official/binary-calculator.json";

export default function BinaryCalculator() {
  const [num1, setNum1] = useState("1010");
  const [num2, setNum2] = useState("1101");
  const [operation, setOperation] = useState("+");

  const [result, setResult] = useState<{
    binary: string;
    decimal: number;
    hex?: string;
  } | null>(null);

  const [errorMsg, setErrorMsg] = useState("");

  const calculateBinary = () => {
    setErrorMsg("");

    // Validate inputs are binary or empty
    if (!/^[01]*$/.test(num1) || !/^[01]*$/.test(num2)) {
      setErrorMsg("Inputs must only contain 0s and 1s.");
      return;
    }

    const dec1 = parseInt(num1 || "0", 2);
    const dec2 = parseInt(num2 || "0", 2);
    let decResult = 0;

    switch (operation) {
      case "+":
        decResult = dec1 + dec2;
        break;
      case "-":
        decResult = dec1 - dec2;
        break;
      case "×":
        decResult = dec1 * dec2;
        break;
      case "÷":
        if (dec2 === 0) {
          setErrorMsg("Cannot divide by zero.");
          return;
        }
        decResult = Math.floor(dec1 / dec2);
        break;
      case "AND":
        decResult = dec1 & dec2;
        break;
      case "OR":
        decResult = dec1 | dec2;
        break;
      case "XOR":
        decResult = dec1 ^ dec2;
        break;
    }

    setResult({
      binary: (decResult >>> 0).toString(2), // Unsigned shift correctly formats negative to binary in JS if needed
      decimal: decResult,
      hex: decResult.toString(16).toUpperCase(),
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-teal-900 flex items-center justify-center font-serif">
          <span className="mr-3">01</span> Binary Calculator
        </h1>
        <p className="text-teal-700 text-lg max-w-2xl mx-auto">
          Perform addition, subtraction, multiplication, division, and logical
          bitwise operations on binary strings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Inputs */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-200 space-y-6">
          <div>
            <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">
              Binary Number 1
            </label>
            <input
              type="text"
              value={num1}
              onChange={(e) => setNum1(e.target.value.replace(/[^01]/g, ""))} // Auto-filter non-binary
              className="w-full rounded-xl border-zinc-300 p-4 font-mono text-2xl shadow-sm focus:border-teal-500 tracking-widest bg-zinc-50 uppercase outline-none transition-all"
              placeholder="e.g. 1010"
            />
            <div className="text-[10px] text-zinc-400 mt-2 font-bold uppercase tracking-tighter">
              Decimal Value: <span className="text-teal-600">{num1 ? parseInt(num1, 2).toLocaleString() : 0}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">
              Select Operation
            </label>
            <select
              value={operation}
              onChange={(e) => setOperation(e.target.value)}
              className="w-full rounded-xl border-zinc-300 p-4 shadow-sm focus:border-teal-500 font-bold text-lg bg-zinc-50 cursor-pointer outline-none transition-all"
            >
              <option value="+">+ Addition</option>
              <option value="-">- Subtraction</option>
              <option value="×">× Multiplication</option>
              <option value="÷">÷ Division</option>
              <option value="AND">& AND (Bitwise)</option>
              <option value="OR">| OR (Bitwise)</option>
              <option value="XOR">^ XOR (Bitwise)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">
              Binary Number 2
            </label>
            <input
              type="text"
              value={num2}
              onChange={(e) => setNum2(e.target.value.replace(/[^01]/g, ""))}
              className="w-full rounded-xl border-zinc-300 p-4 font-mono text-2xl shadow-sm focus:border-teal-500 tracking-widest bg-zinc-50 uppercase outline-none transition-all"
              placeholder="e.g. 1101"
            />
            <div className="text-[10px] text-zinc-400 mt-2 font-bold uppercase tracking-tighter">
              Decimal Value: <span className="text-teal-600">{num2 ? parseInt(num2, 2).toLocaleString() : 0}</span>
            </div>
          </div>

          {errorMsg && (
            <div className="text-red-600 text-sm font-bold bg-red-50 p-4 rounded-xl border border-red-100 text-center">
              {errorMsg}
            </div>
          )}

          <button
            onClick={calculateBinary}
            className="w-full bg-teal-600 text-white font-black py-5 rounded-xl hover:bg-teal-700 transition shadow-xl shadow-teal-600/30 uppercase tracking-widest text-lg"
          >
            Calculate Result
          </button>
        </div>

        {/* Results Screen */}
        <div className="bg-slate-900 rounded-2xl p-8 border border-white/5 shadow-2xl flex flex-col justify-center text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500 rounded-full mix-blend-screen filter blur-[60px] opacity-20 pointer-events-none"></div>
          
          {result !== null ? (
            <div className="space-y-8 z-10">
              <div>
                <h3 className="text-teal-400 font-bold uppercase tracking-widest text-xs mb-4">
                  Binary Output
                </h3>
                <div className="text-4xl md:text-5xl font-black font-mono text-white break-all bg-black/40 py-6 px-4 rounded-2xl border border-white/5 shadow-inner">
                  {result.binary}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
                  <h4 className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-2">
                    Decimal
                  </h4>
                  <div className="text-2xl font-black text-white">
                    {result.decimal.toLocaleString()}
                  </div>
                </div>
                <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
                  <h4 className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-2">
                    Hexadecimal
                  </h4>
                  <div className="text-2xl font-black font-mono text-white">
                    0x{result.hex}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-teal-400 font-bold opacity-30 text-xl animate-pulse tracking-widest uppercase">
              Awaiting Input
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
            name: "Binary Calculator",
            operatingSystem: "All",
            applicationCategory: "UtilitiesApplication",
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title={binarySeoData.title}
          whatIsIt={binarySeoData.whatIsIt}
          formula={binarySeoData.formula}
          example={binarySeoData.example}
          useCases={binarySeoData.useCases}
          faqs={binarySeoData.faqs}
          deepDive={binarySeoData.deepDive}
          glossary={binarySeoData.glossary}
          relatedCalculators={[
            {
              name: "Hex Calculator",
              path: "/hex-calculator/",
              desc: "Perform arithmetic on Base-16 values used in memory architecture.",
            },
            {
              name: "Base Converter",
              path: "/base-converter/",
              desc: "Translate values between Hexadecimal, Decimal, Octal, and Binary.",
            },
            {
              name: "Scientific Calculator",
              path: "/scientific-calculator/",
              desc: "Apply advanced transcendental functions and constants to your digital logic.",
            },
            {
              name: "Average Calculator",
              path: "/average-calculator/",
              desc: "Find the mathematical mean of any structured technical dataset.",
            }
          ]}
        />
      </div>
    </div>
  );
}
