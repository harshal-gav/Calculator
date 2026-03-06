"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
export default function HexCalculator() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [operation, setOperation] = useState("+");

  const [result, setResult] = useState<{
    hex: string;
    decimal: number;
  } | null>(null);

  const calculate = () => {
    if (!num1 || (!num2 && operation !== "NOT")) {
      setResult(null);
      return;
    }

    try {
      const val1 = parseInt(num1, 16);
      const val2 = parseInt(num2, 16);

      if (isNaN(val1) || (isNaN(val2) && operation !== "NOT")) {
        setResult(null);
        return;
      }

      let decResult = 0;

      switch (operation) {
        case "+":
          decResult = val1 + val2;
          break;
        case "-":
          decResult = val1 - val2;
          break;
        case "*":
          decResult = val1 * val2;
          break;
        case "/":
          if (val2 === 0) return setResult(null); // div by zero
          decResult = Math.floor(val1 / val2);
          break;
        case "AND":
          decResult = val1 & val2;
          break;
        case "OR":
          decResult = val1 | val2;
          break;
        case "XOR":
          decResult = val1 ^ val2;
          break;
        case "NOT":
          // Bitwise NOT in 32-bit signed int, then map back to positive hex representation
          decResult = ~val1 >>> 0;
          break;
      }

      // Handle negative values for display if needed
      let hexResult = "";
      if (decResult < 0) {
        // Return 32-bit two's complement hex
        hexResult = (decResult >>> 0).toString(16).toUpperCase();
      } else {
        hexResult = decResult.toString(16).toUpperCase();
      }

      setResult({
        hex: hexResult,
        decimal: decResult,
      });
    } catch (error) {
      setResult(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-purple-900 flex items-center justify-center font-serif">
          <span className="mr-3">#️⃣</span> Hex Calculator
        </h1>
        <p className="text-purple-700 text-lg max-w-2xl mx-auto">
          Perform addition, subtraction, multiplication, division, and bitwise
          operations on Hexadecimal numbers.
        </p>
      </div>

      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-zinc-200 mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="w-full">
            <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">
              Hex Value 1
            </label>
            <input
              type="text"
              value={num1}
              onChange={(e) =>
                setNum1(e.target.value.replace(/[^0-9a-fA-F]/g, ""))
              }
              placeholder="e.g. 1A3F"
              className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-purple-500 font-bold bg-zinc-50 text-xl font-mono uppercase"
            />
          </div>

          <div className="w-full md:w-auto shrink-0 flex flex-col justify-end h-full pt-8 md:pt-0">
            <select
              value={operation}
              onChange={(e) => setOperation(e.target.value)}
              className="w-full md:w-32 rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-purple-500 font-bold bg-purple-50 text-purple-900 text-center text-xl cursor-pointer"
            >
              <option value="+">+</option>
              <option value="-">-</option>
              <option value="*">×</option>
              <option value="/">÷</option>
              <option value="AND">AND</option>
              <option value="OR">OR</option>
              <option value="XOR">XOR</option>
              <option value="NOT">NOT</option>
            </select>
          </div>

          <div
            className={`w-full ${operation === "NOT" ? "opacity-30 pointer-events-none" : ""}`}
          >
            <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">
              Hex Value 2
            </label>
            <input
              type="text"
              value={num2}
              onChange={(e) =>
                setNum2(e.target.value.replace(/[^0-9a-fA-F]/g, ""))
              }
              placeholder={operation === "NOT" ? "N/A" : "e.g. B2C"}
              disabled={operation === "NOT"}
              className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-purple-500 font-bold bg-zinc-50 text-xl font-mono uppercase"
              onKeyDown={(e) => e.key === "Enter" && calculate()}
            />
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={calculate}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-purple-600/30 uppercase tracking-widest text-lg"
          >
            Calculate Hex
          </button>
        </div>
      </div>

      {result !== null && (
        <div className="bg-purple-950 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center text-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

          <h2 className="text-purple-400 font-bold uppercase tracking-widest text-xs mb-6 z-10">
            Equivalent Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl z-10">
            <div className="bg-purple-900/60 p-6 rounded-xl border border-purple-500/30 shadow-inner flex flex-col items-center">
              <span className="text-purple-300 text-xs font-bold uppercase tracking-wide mb-2">
                Hexadecimal (Base 16)
              </span>
              <div className="font-mono text-white font-bold text-4xl mt-2 break-all">
                {result.hex}
              </div>
            </div>

            <div className="bg-black/30 p-6 rounded-xl border border-white/10 flex flex-col items-center">
              <span className="text-zinc-400 text-xs font-bold uppercase tracking-wide mb-2">
                Decimal (Base 10)
              </span>
              <div className="font-mono text-zinc-300 font-bold text-4xl mt-2 break-all">
                {result.decimal}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 bg-zinc-100 p-6 rounded-xl border border-zinc-200 text-sm text-zinc-600 max-w-2xl mx-auto space-y-2 text-center">
        <p className="font-bold text-zinc-800 uppercase tracking-widest mb-2">
          Hexadecimal Info
        </p>
        <p>
          Hexadecimal represents numbers using base 16. It uses digits 0-9 and
          letters A-F to represent 10-15.
        </p>
        <p>
          This calculator supports standard arithmetic (+, -, ×, ÷) as well as
          bitwise operations (AND, OR, XOR, NOT).
        </p>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Hex Calculator",
            operatingSystem: "All",
            applicationCategory: "EducationalApplication",
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title="Hexadecimal Calculator"
          whatIsIt={
            <>
              <p>
                A <strong>Hexadecimal Calculator</strong> is a specialized tool
                built for computer scientists, programmers, and electrical
                engineers. It performs mathematical operations directly on
                numbers written in Base-16 (hex) notation.
              </p>
              <p>
                Unlike our standard decimal system (Base-10), which uses digits
                0-9, the hexadecimal system uses 16 distinct symbols: 0-9 to
                represent values zero to nine, and A-F to represent values ten
                to fifteen.
              </p>

              <p className="mt-4 text-sm text-gray-500">
                <strong>Related Terms:</strong> Hex Calculator
              </p>
            </>
          }
          formula={
            <>
              <p>
                Hex calculations involve standard arithmetic or binary bitwise
                logic. This tool immediately converts both hex inputs into
                standard decimal numbers, performs your selected operation, and
                then translates the integer result back into an uppercase
                hexadecimal string.
              </p>
              <ul className="list-disc pl-6 space-y-3 mt-4 text-zinc-700">
                <li>
                  <strong>Arithmetic:</strong> Standard addition (+),
                  subtraction (-), multiplication (×), and integer division (÷).
                </li>
                <li>
                  <strong>Bitwise AND (&amp;):</strong> Compares two hex numbers
                  bit-by-bit. The output bit is 1 only if <em>both</em>{" "}
                  corresponding input bits are 1.
                </li>
                <li>
                  <strong>Bitwise OR (|):</strong> The output bit is 1 if{" "}
                  <em>either</em> of the corresponding input bits is 1.
                </li>
                <li>
                  <strong>Bitwise XOR (^):</strong> The output bit is 1 if the
                  corresponding input bits are <em>different</em>.
                </li>
                <li>
                  <strong>Bitwise NOT (~):</strong> Inverts the bits of the
                  first input value (turns 0s to 1s and 1s to 0s), returning the
                  two's complement.
                </li>
              </ul>
            </>
          }
          example={
            <>
              <p>
                Let's add two hexadecimal numbers together:{" "}
                <strong>1A3F + B2C</strong>.
              </p>
              <ul className="list-none space-y-2 mt-4 font-mono text-sm bg-purple-50 p-4 rounded-xl border border-purple-200">
                <li>
                  <strong>Step 1:</strong> Convert to Decimal
                </li>
                <li className="pl-4 text-zinc-600">
                  1A3F (Hex) = 6719 (Decimal)
                </li>
                <li className="pl-4 text-zinc-600">
                  B2C (Hex) = 2860 (Decimal)
                </li>
                <li className="mt-2">
                  <strong>Step 2:</strong> Add the Decimals
                </li>
                <li className="pl-4 text-zinc-600">6719 + 2860 = 9579</li>
                <li className="mt-2">
                  <strong>Step 3:</strong> Convert back to Hex
                </li>
                <li className="pl-4 text-zinc-600">
                  9579 ÷ 16 = 598 remainder 11 (B)
                </li>
                <li className="pl-4 text-zinc-600">
                  598 ÷ 16 = 37 remainder 6 (6)
                </li>
                <li className="pl-4 text-zinc-600">
                  37 ÷ 16 = 2 remainder 5 (5)
                </li>
                <li className="pl-4 text-zinc-600">
                  2 ÷ 16 = 0 remainder 2 (2)
                </li>
                <li className="pt-2 mt-2 font-bold text-purple-800 border-t border-purple-200">
                  Result: 256B
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4">
              <li>
                <strong>Memory Addresses:</strong> Computer RAM and pointers are
                displayed in hexadecimal formats (e.g., <code>0x7FFF5FBFF</code>
                ). Programmers use hex calculators to calculate exact memory
                offsets.
              </li>
              <li>
                <strong>Color Codes:</strong> Web developers use hex to define
                RGB colors. You can calculate shifts in color gradients by
                performing hex subtraction between two color values.
              </li>
              <li>
                <strong>Subnet Masks:</strong> Network engineers often calculate
                IPv6 addresses and masks which are written entirely in
                hexadecimal blocks.
              </li>
            </ul>
          }
          faqs={[
            {
              question:
                "Why do programmers use Hexadecimal instead of Decimal?",
              answer:
                "Because computers operate in Binary (Base-2), and Hexadecimal (Base-16) matches perfectly with binary architecture. A single hex digit represents exactly 4 binary bits (a nibble). Two hex digits represent exactly 8 bits (one byte). It is simply a human-readable shorthand for enormous binary numbers.",
            },
            {
              question: "What does the 0x prefix mean?",
              answer:
                "In programming languages like C, C++, Java, and JavaScript, placing '0x' in front of a number literally tells the compiler 'this next number is formatted in hexadecimal, not standard decimal'. Example: 0xFF is the same as the decimal number 255.",
            },
            {
              question: "How are negative hex numbers handled?",
              answer:
                "In this calculator, subtraction that results in a negative number will return the 32-bit Two's Complement representation of that negative value, which is the standard way modern CPUs handle negative integers.",
            },
          ]}
          relatedCalculators={[
            {
              name: "Binary Calculator",
              path: "/binary-calculator",
              desc: "Perform arithmetic directly on 1s and 0s.",
            },
            {
              name: "Base Converter",
              path: "/base-converter",
              desc: "Convert numbers instantly between Decimal, Binary, Octal, and Hexadecimal.",
            },
            {
              name: "RGB to Hex Converter",
              path: "/rgb-hex-converter",
              desc: "Convert visual web colors between decimal RGB and hex format.",
            },
          ]}
        />
      </div>
    </div>
  );
}
