"use client";

import { useState, useEffect } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

const rates: Record<string, number> = {
  bit: 1,
  byte: 8,
  kilobyte: 8 * 1024,
  megabyte: 8 * 1024 ** 2,
  gigabyte: 8 * 1024 ** 3,
  terabyte: 8 * 1024 ** 4,
  petabyte: 8 * 1024 ** 5,
};

const labels: Record<string, string> = {
  bit: "Bit (b)",
  byte: "Byte (B)",
  kilobyte: "Kilobyte (KB)",
  megabyte: "Megabyte (MB)",
  gigabyte: "Gigabyte (GB)",
  terabyte: "Terabyte (TB)",
  petabyte: "Petabyte (PB)",
};

export default function DataConverter() {
  const [amount, setAmount] = useState("1");
  const [fromUnit, setFromUnit] = useState("gigabyte");
  const [toUnit, setToUnit] = useState("megabyte");
  const [result, setResult] = useState("");

  useEffect(() => {
    calculateConversion();
  }, [amount, fromUnit, toUnit]);

  const calculateConversion = () => {
    const val = parseFloat(amount);
    if (isNaN(val)) {
      setResult("");
      return;
    }

    // Convert whatever we have to bits first (the base), then to the target
    const inBits = val * rates[fromUnit];
    const finalValue = inBits / rates[toUnit];

    // Formatting
    if (finalValue < 0.0001 || finalValue > 9999999) {
      setResult(finalValue.toExponential(4));
    } else {
      setResult(
        finalValue.toLocaleString("en-US", { maximumFractionDigits: 4 }),
      );
    }
  };

  const handleSwap = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-emerald-700 border-b pb-4">
        Data Storage Converter
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Convert digital storage units between bits, bytes, kilobytes, megabytes,
        gigabytes, and more.
      </p>

      <div className="bg-emerald-50 rounded-2xl p-6 md:p-10 border border-emerald-100 shadow-inner">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
          {/* From Section */}
          <div className="md:col-span-2 space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Value
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full rounded-xl border-gray-300 p-4 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 font-black text-2xl"
                placeholder="Enter amount"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                From
              </label>
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full rounded-xl border-gray-300 p-4 shadow-sm focus:border-emerald-500 font-semibold bg-white cursor-pointer text-gray-700"
              >
                {Object.keys(rates).map((key) => (
                  <option key={`from-${key}`} value={key}>
                    {labels[key]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Swap Button */}
          <div className="md:col-span-1 flex justify-center py-4 md:py-0">
            <button
              onClick={handleSwap}
              className="bg-white p-4 rounded-full shadow hover:shadow-md border border-gray-200 transition-all hover:rotate-180 hover:bg-emerald-100 text-emerald-600 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                />
              </svg>
            </button>
          </div>

          {/* To Section */}
          <div className="md:col-span-2 space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Result
              </label>
              <input
                type="text"
                readOnly
                value={result}
                className="w-full rounded-xl border-emerald-300 bg-emerald-100/50 p-4 shadow-sm font-black text-2xl text-emerald-900 outline-none"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                To
              </label>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="w-full rounded-xl border-gray-300 p-4 shadow-sm focus:border-emerald-500 font-semibold bg-white cursor-pointer text-gray-700"
              >
                {Object.keys(rates).map((key) => (
                  <option key={`to-${key}`} value={key}>
                    {labels[key]}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Data Storage Converter",
            operatingSystem: "All",
            applicationCategory: "UtilityApplication",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title="Digital Data Storage Converter"
          whatIsIt={
            <>
              <p>
                Our <strong>Data Storage Converter</strong> is a specialized
                mathematical tool that instantly translates digital memory
                measurements across the entire computational scale—ranging from
                single microscopic Bits to massive logical Petabytes.
              </p>
              <p>
                Unlike standard physical metrics (like meters or grams) which
                scale perfectly by 1,000, computer architecture is fundamentally
                built on binary (base-2) mathematics. Because computers count in
                zeroes and ones, digital storage officially scales by multiples
                of 1,024, not 1,000. Our calculator automatically handles this
                binary translation to give you the exact, true storage capacity.
              </p>

              <p className="mt-4 text-sm text-gray-500">
                <strong>Related Terms:</strong> Currency Converter Calculator,
                Money Conversion Calculator, Conversion Calculator, Currency
                Converter Online, Measurement Converter, Metric Conversion
                Calculator, Unit Converter, Metric Converter, Unit Conversion
                Chart, Scale Converter, Unit Conversion Calculator, Time
                Converter Calculator, Gpa Converter, Height Converter, Julian
                Date Converter
              </p>
            </>
          }
          formula={
            <>
              <p>
                To move up the modern digital storage scale, you mathematically
                divide your value by exactly 1,024. To move down the scale, you
                multiply by 1,024.
              </p>
              <div className="bg-emerald-50 p-4 rounded-lg font-mono text-center text-[15px] shadow-sm my-4 flex flex-col gap-2 border border-emerald-100 text-emerald-900">
                <p>
                  <strong>1 Megabyte (MB) = 1,024 Kilobytes (KB)</strong>
                </p>
                <p className="mt-2 pt-2 border-t border-emerald-200">
                  <strong>1 Gigabyte (GB) = 1,024 Megabytes (MB)</strong>
                </p>
                <p className="mt-2 pt-2 border-t border-emerald-200">
                  <strong>1 Terabyte (TB) = 1,024 Gigabytes (GB)</strong>
                </p>
              </div>
            </>
          }
          example={
            <>
              <p>
                Let's look at why buying a "1 Terabyte" hard drive often leaves
                people feeling shortchanged by the manufacturer.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                <li>
                  <strong>The Setup:</strong> You buy a hard drive advertised
                  loudly on the box as <strong>1 Terabyte (TB)</strong>. The
                  marketing department used the decimal system (base-10),
                  meaning they just gave you 1,000,000,000,000 bytes.
                </li>
                <li>
                  <strong>The Computer's Readout:</strong> When you plug it into
                  a Windows PC, Windows reads the drive strictly in binary
                  (base-2), dividing exactly by 1,024 for every step.
                </li>
                <li>
                  <strong>The Math:</strong> 1,000,000,000,000 Bytes ÷ 1024 ÷
                  1024 ÷ 1024 = <strong>931.3</strong>.
                </li>
                <li>
                  <strong>Result:</strong> Your computer says your "1 TB" drive
                  actually only holds <strong>931 Gigabytes (GB)</strong>. This
                  discrepancy causes massive confusion, but the math is 100%
                  correct.
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-gray-700">
              <li>
                <strong>Internet Speed vs. Download Time:</strong> Internet
                speeds are sold in Mega<strong>bits</strong> per second (Mbps),
                but file sizes are measured in Mega<strong>bytes</strong> (MB).
                Because there are 8 bits in a single byte, a standard "100 Mbps"
                internet connection actually only downloads roughly 12.5
                Megabytes of a file per second.
              </li>
              <li>
                <strong>Cloud Storage Management:</strong> If you are paying for
                2 TB of Google Drive or iCloud storage, and your raw 4K video
                files average 25 Gigabytes each, converting between the units
                reveals exactly how many videos you can safely upload before
                hitting a paywall.
              </li>
              <li>
                <strong>Software Engineering & Database Architecture:</strong>{" "}
                Developers must perfectly calculate exactly how many bytes a
                specific data structure consumes to predict when a massive SQL
                database will overflow its assigned server partition.
              </li>
            </ul>
          }
          faqs={[
            {
              question: "What is the difference between a Bit and a Byte?",
              answer:
                "A Bit (short for 'binary digit') is the smallest possible slice of computer data: a single, fundamental '1' or '0'. A Byte is a sequence of exactly 8 Bits strung together. One Byte is roughly enough information to store a single letter of text on a screen (like the letter 'A').",
            },
            {
              question: "Why do we use KB/MB/GB instead of KiB/MiB/GiB?",
              answer:
                "Technically, the 'i' notation is the IEC standard for binary math (e.g., Gibibyte/GiB means exactly 1,024 scale). However, the general public and decades of older computer hardware stubbornly stuck with using the KB/MB labels even when explicitly doing base-2 binary math. Our calculator reflects this normalized real-world usage.",
            },
            {
              question: "How big is a Petabyte?",
              answer:
                "A Petabyte is 1,024 Terabytes. To visualize it, if you took enough high-definition video to fill exactly 1 Petabyte, that video would play continuously, 24/7, for over 3.5 years.",
            },
          ]}
          relatedCalculators={[
            {
              name: "Bandwidth Calculator",
              path: "/bandwidth-calculator",
              desc: "Calculate exact download times using data conversion metrics.",
            },
            {
              name: "IP Subnet Calculator",
              path: "/ip-subnet-calculator",
              desc: "Manage server networks, binary subnet masks, and broadcast architecture.",
            },
            {
              name: "Base64 Converter",
              path: "/base64-converter",
              desc: "See how binary data gets encoded directly into text.",
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
