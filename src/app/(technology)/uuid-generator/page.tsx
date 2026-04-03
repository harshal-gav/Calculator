"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function UuidGenerator() {
  const [count, setCount] = useState("1");
  const [uuids, setUuids] = useState<string[]>([]);

  const generateUUIDs = () => {
    const total = parseInt(count);
    if (isNaN(total) || total < 1 || total > 1000) {
      alert("Please enter a valid amount between 1 and 1000.");
      return;
    }

    const newUuids = [];
    for (let i = 0; i < total; i++) {
      // Very simple UUID v4 generator using crypto.randomUUID if available, fallback otherwise
      if (typeof crypto !== "undefined" && crypto.randomUUID) {
        newUuids.push(crypto.randomUUID());
      } else {
        // Fallback for extremely old browsers or incomplete environments
        newUuids.push(
          "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
            const r = (Math.random() * 16) | 0,
              v = c == "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
          }),
        );
      }
    }
    setUuids(newUuids);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join("\n")).then(() => {
      alert("Copied to clipboard!");
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-fuchsia-900 flex items-center justify-center font-mono">
          <span className="mr-3">🆔</span> UUID Generator
        </h1>
        <p className="text-fuchsia-700 text-lg max-w-2xl mx-auto">
          Generate valid Version 4 Universally Unique Identifiers (UUIDs)
          instantly.
        </p>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-zinc-200 mb-8 max-w-xl mx-auto flex flex-col items-center">
        <div className="w-full flex flex-col md:flex-row gap-4 items-end mb-6">
          <div className="flex-1 w-full">
            <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">
              Number of UUIDs
            </label>
            <input
              type="number"
              min="1"
              max="1000"
              step="1"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              className="w-full rounded-xl border border-zinc-300 shadow-sm p-4 focus:border-fuchsia-500 font-bold font-mono text-2xl transition-all outline-none"
              onKeyDown={(e) => e.key === "Enter" && generateUUIDs()}
            />
          </div>
          <button
            onClick={generateUUIDs}
            className="w-full md:w-auto bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-black py-4 px-8 rounded-xl transition-colors shadow-lg shadow-fuchsia-600/30 uppercase tracking-widest text-lg"
          >
            Generate v4
          </button>
        </div>
      </div>

      {uuids.length > 0 && (
        <div className="bg-slate-900 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col">
          <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

          <div className="flex justify-between items-center mb-6 z-10 w-full border-b border-white/10 pb-4">
            <h2 className="text-fuchsia-400 font-bold uppercase tracking-widest text-xs">
              Generated Output ({uuids.length})
            </h2>
            <button
              onClick={copyAll}
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded text-xs uppercase font-bold tracking-widest transition-colors flex items-center"
            >
              <span className="mr-2">📋</span> Copy All
            </button>
          </div>

          <div className="z-10 relative w-full flex flex-col space-y-2 max-h-[500px] overflow-y-auto pr-2">
            {uuids.map((uid, idx) => (
              <div
                key={idx}
                className="bg-black/40 hover:bg-black/60 border border-white/5 p-4 rounded-xl flex items-center transition-colors"
              >
                <span className="font-mono text-xl md:text-2xl font-bold text-white tracking-widest">
                  {uid}
                </span>
                <button
                  onClick={() => navigator.clipboard.writeText(uid)}
                  className="ml-auto text-fuchsia-400 opacity-50 hover:opacity-100 hover:text-fuchsia-300 p-2"
                  title="Copy individually"
                >
                  📋
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "UUID Generator",
            operatingSystem: "All",
            applicationCategory: "DeveloperApplication",
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title="UUID (v4) Generator & Bulk Creator"
          whatIsIt={
            <>
              <p>
                The <strong>UUID Generator</strong> instantly creates
                mathematically random Universally Unique Identifiers
                (specifically Version 4). These are 36-character alphanumeric
                strings universally used in software to give data records a
                perfectly unique ID.
              </p>
              <p>
                Unlike sequential database IDs (1, 2, 3) which can be easily
                guessed or run into conflicts when merging databases, UUIDs are
                generated randomly. The mathematical chance of generating the
                exact same UUID twice is physically impossible.
              </p>
            </>
          }
          formula={
          <>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 font-mono text-lg text-indigo-700 text-center shadow-sm my-6">
              Uuid Generator Analysis Model
            </div>
            <p className="text-sm text-slate-500 text-center">
              This tool utilize standardized mathematical formulas and logic to calculate precise Uuid Generator results.
            </p>
          </>
        }
          example={
            <>
              <p>
                Imagine you are building a globally distributed chat app where
                millions of messages are sent every second.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                <li>
                  <strong>The Problem:</strong> If Server A assigns ID #1000 to
                  a message, and Server B also assigns ID #1000 to a different
                  message, merging those servers later will cause a massive data
                  collision.
                </li>
                <li>
                  <strong>The Solution:</strong> The app relies on UUIDs
                  instead. Server A creates message <code>527a...</code> and
                  Server B creates message <code>9f3c...</code>. There is zero
                  risk of collision, regardless of how many servers are running.
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-gray-700">
              <li>
                <strong>Database Primary Keys:</strong> Developers use UUIDs
                instead of auto-incrementing integers to obscure how many
                users/products are stored in their database from public view.
              </li>
              <li>
                <strong>Session Tokens:</strong> Automatically assigning a
                unique cookie to every anonymous visitor on an e-commerce
                website to track their exact shopping cart path over time.
              </li>
              <li>
                <strong>Distributed Systems (Microservices):</strong> Passing a
                single "Trace ID" (a UUID) through a massive spiderweb of 50
                different microservices so developers can track the exact path
                of a single failing request.
              </li>
            </ul>
          }
          faqs={[
            {
              question: "Are UUIDs completely secure to use for passwords?",
              answer:
                "No. While they are statistically impossible to guess by brute force, they are solely designed to be 'Unique', not 'Secret'. If you need a secure, encrypted token for authorization, use JWTs or standard cryptographic hashes instead.",
            },
            {
              question: "What is the difference between UUID v1 and v4?",
              answer:
                "Version 1 generates an ID based on your computer's MAC address and the exact current time. Version 4 (this generator) relies 100% on pure random number generation, making it the overwhelming modern standard.",
            },
            {
              question: "What are the exact odds of a collision?",
              answer:
                "There are 340 undecillion (3.4 × 10^38) possible v4 UUIDs. To even reach a 50% chance of a collision, you would need to generate 1 billion UUIDs every single second... for 85 years.",
            },
          ]}
          relatedCalculators={[
            {
              name: "Random String Generator",
              path: "/random-string-generator/",
              desc: "Generate purely random strings without being restricted to the UUID hexadecimal format.",
            },
            {
              name: "Base64 Converter",
              path: "/base64-converter/",
              desc: "Convert generated IDs into transmission-safe Base64 encoding.",
            },
            {
              name: "JWT Decoder",
              path: "/jwt-decoder/",
              desc: "Inspect JSON Web Tokens to see if they utilize UUIDs in their payload.",
            },
            {
              name: "Bandwidth Calculator",
              path: "/bandwidth-calculator/",
              desc: "Calculate download and upload times for various data sizes.",
            }]}
        />
      </div>
    </div>
  );
}
