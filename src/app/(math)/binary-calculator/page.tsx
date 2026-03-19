"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
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
      binary: (decResult >>> 0).toString(2), // Unsigned shift correctly formats negative to binary in JS if needed, though mostly standard 32 bit
      decimal: decResult,
      hex: decResult.toString(16).toUpperCase(),
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-teal-900 border-b pb-4">
        Binary Calculator
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Perform addition, subtraction, multiplication, division, and logical
        operations on binary numbers.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="bg-teal-50 p-6 rounded-xl border border-teal-100">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Binary Number 1
              </label>
              <input
                type="text"
                value={num1}
                onChange={(e) => setNum1(e.target.value.replace(/[^01]/g, ""))} // Auto-filter non-binary
                className="w-full rounded-lg border-gray-300 p-3 font-mono text-xl shadow-sm focus:border-teal-500 tracking-widest"
              />
              <div className="text-xs text-gray-500 mt-1 text-right">
                Decimal: {num1 ? parseInt(num1, 2) : 0}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Operation
              </label>
              <select
                value={operation}
                onChange={(e) => setOperation(e.target.value)}
                className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-teal-500 font-bold text-lg bg-white"
              >
                <option value="+">+ Add</option>
                <option value="-">- Subtract</option>
                <option value="×">× Multiply</option>
                <option value="÷">÷ Divide</option>
                <option value="AND">AND (Bitwise)</option>
                <option value="OR">OR (Bitwise)</option>
                <option value="XOR">XOR (Bitwise)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Binary Number 2
              </label>
              <input
                type="text"
                value={num2}
                onChange={(e) => setNum2(e.target.value.replace(/[^01]/g, ""))}
                className="w-full rounded-lg border-gray-300 p-3 font-mono text-xl shadow-sm focus:border-teal-500 tracking-widest"
              />
              <div className="text-xs text-gray-500 mt-1 text-right">
                Decimal: {num2 ? parseInt(num2, 2) : 0}
              </div>
            </div>

            {errorMsg && (
              <div className="text-red-600 text-sm font-bold bg-red-50 p-3 rounded-lg">
                {errorMsg}
              </div>
            )}

            <button
              onClick={calculateBinary}
              className="w-full bg-teal-600 text-white font-bold py-4 rounded-xl hover:bg-teal-700 transition shadow-lg uppercase tracking-wide"
            >
              Calculate Binary
            </button>
          </div>
        </div>

        {/* Results Screen */}
        <div className="bg-white border-2 border-teal-100 rounded-xl overflow-hidden shadow-sm flex flex-col justify-center text-center p-8">
          {result !== null ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-teal-800 font-semibold uppercase tracking-wider text-sm mb-2">
                  Binary Result
                </h3>
                <div className="text-3xl md:text-5xl font-black font-mono text-gray-900 break-all bg-gray-50 py-4 px-2 rounded-lg border border-gray-200">
                  {result.binary}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-teal-50 p-4 rounded-lg">
                  <h4 className="text-gray-500 text-xs font-bold uppercase mb-1">
                    Decimal
                  </h4>
                  <div className="text-2xl font-bold text-gray-800">
                    {result.decimal}
                  </div>
                </div>
                <div className="bg-teal-50 p-4 rounded-lg">
                  <h4 className="text-gray-500 text-xs font-bold uppercase mb-1">
                    Hexadecimal
                  </h4>
                  <div className="text-2xl font-bold font-mono text-gray-800">
                    {result.hex}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-teal-300 font-medium opacity-50 text-xl">
              Awaiting Computation
            </div>
          )}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Binary Calculator",
            operatingSystem: "All",
            applicationCategory: "EducationalApplication",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title="Binary Calculator"
          whatIsIt={
            <>
              <p>
                A <strong>Binary Calculator</strong> performs mathematical and
                logical operations on numbers written entirely in Base-2 format
                (which consists exclusively of the digits 1 and 0).
              </p>
              <p>
                Binary is the foundational machine language of all modern
                computing systems. Because electronic transistors can only exist
                in two physical states (On or Off), every single image, video,
                program, and text file on your computer boils down to a massive
                chain of binary operations.
              </p>

              <p className="mt-4 text-sm text-gray-500">
                <strong>Related Terms:</strong> Binary Calculator, Binary
                Subtraction Calculator, 2's Complement Calculator, 2s Complement
                Calculator, Binary Addition Calculator, Decimal To Hexadecimal
                Converter, Hexadecimal Calculator
              </p>
            </>
          }
          formula={
            <>
              <p>
                This calculator supports standard arithmetic as well as bitwise
                logic gates that mirror actual hardware circuits.
              </p>
              <ul className="list-disc pl-6 space-y-3 mt-4 text-zinc-700">
                <li>
                  <strong>Addition &amp; Subtraction:</strong> Standard math
                  carrying rules apply, but the base is 2 instead of 10. E.g., 1
                  + 1 = 10 (which is 2 in decimal).
                </li>
                <li>
                  <strong>AND Gate:</strong> Compares two binary numbers. The
                  output bit is '1' ONLY if both input bits in that position are
                  '1'.
                </li>
                <li>
                  <strong>OR Gate:</strong> The output bit is '1' if EITHER of
                  the input bits is '1'.
                </li>
                <li>
                  <strong>XOR Gate (Exclusive OR):</strong> The output bit is
                  '1' ONLY if the input bits are different (one is '1' and the
                  other is '0').
                </li>
              </ul>
            </>
          }
          example={
            <>
              <p>
                Let's perform binary addition: <strong>1010 + 1101</strong>.
              </p>
              <ul className="list-none space-y-2 mt-4 font-mono text-sm bg-teal-50 p-4 rounded-xl border border-teal-200">
                <li>
                  <strong>Step 1:</strong> Align the numbers right-to-left.
                </li>
                <li className="pl-4"> 1 0 1 0 (This is 10 in Decimal)</li>
                <li className="pl-4">+ 1 1 0 1 (This is 13 in Decimal)</li>
                <li>
                  <strong>Step 2:</strong> Add column by column from the right.
                </li>
                <li className="pl-4 text-zinc-600">Col 1: 0 + 1 = 1</li>
                <li className="pl-4 text-zinc-600">Col 2: 1 + 0 = 1</li>
                <li className="pl-4 text-zinc-600">Col 3: 0 + 1 = 1</li>
                <li className="pl-4 text-zinc-600">
                  Col 4: 1 + 1 = 10 (Write 0, carry over 1)
                </li>
                <li className="pt-2 mt-2 font-bold text-teal-800 border-t border-teal-200">
                  Result: 1 0 1 1 1
                </li>
              </ul>
              <p className="mt-4 text-sm text-zinc-700">
                Checking our work in decimal: 10 + 13 = 23. Binary '10111'
                equals 23 (16+0+4+2+1). The math holds up perfectly!
              </p>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4">
              <li>
                <strong>Subnet Masking:</strong> Network administrators use
                bitwise AND operations constantly to determine if two IP
                addresses exist on the same local network subnet.
              </li>
              <li>
                <strong>Embedded Systems:</strong> Engineers programming
                microcontrollers (like Arduinos or Raspberry Pis) write binary
                flags to turn physical hardware pins on and off.
              </li>
              <li>
                <strong>Cryptography:</strong> Modern encryption hashes deeply
                rely on the XOR logical operation to scramble data securely.
              </li>
            </ul>
          }
          faqs={[
            {
              question: "How do you read a binary number?",
              answer:
                "You read from right to left. The furthest right digit represents the 1s place. The next digit is the 2s place, then 4s, 8s, 16s, 32s, scaling by powers of 2. For the number '110', there is a '1' in the 4s place, a '1' in the 2s place, and a '0' in the 1s place. So, 4 + 2 = 6.",
            },
            {
              question: "What is a bit vs. a byte?",
              answer:
                "A 'bit' is a single binary digit (either a 1 or a 0). A 'byte' is a collection of exactly 8 bits. An 8-bit sequence can represent any decimal number from 0 to 255.",
            },
            {
              question: "Why does 1+1 equal 10 in binary?",
              answer:
                "Because binary only has two numbers available (0 and 1). In our normal base-10 system, after you count 7, 8, 9, you run out of digits, so you carry over a '1' into the tens column to make 10. In Base-2, you run out of digits immediately after counting 0, 1. So adding one more forces a carry over to the twos column, writing '10'.",
            },
          ]}
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
              name: "IP Subnet Calculator",
              path: "/ip-subnet-calculator/",
              desc: "Calculate IPv4 networks exactly how routers do it behind the scenes.",
            },
            {
              name: "Percentage Calculator",
              path: "/percentage-calculator/",
              desc: "Easily calculate percentages, increases, and decreases.",
            }]}
        />
      </div>
    </div>
  );
}
