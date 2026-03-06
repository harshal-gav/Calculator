"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
export default function RandomStringGenerator() {
  const [length, setLength] = useState("16");
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(false);
  const [count, setCount] = useState("1");

  const [results, setResults] = useState<string[]>([]);

  const generate = () => {
    let chars = "";
    if (useUpper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (useLower) chars += "abcdefghijklmnopqrstuvwxyz";
    if (useNumbers) chars += "0123456789";
    if (useSymbols) chars += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    if (!chars) {
      setResults(["Please select at least one character set."]);
      return;
    }

    const len = parseInt(length);
    const c = parseInt(count);

    if (isNaN(len) || len < 1 || len > 2048) return;
    if (isNaN(c) || c < 1 || c > 1000) return;

    const newResults = [];
    for (let i = 0; i < c; i++) {
      let str = "";
      for (let j = 0; j < len; j++) {
        str += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      newResults.push(str);
    }

    setResults(newResults);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-emerald-900 flex items-center justify-center font-serif">
          <span className="mr-3">🔀</span> Random String Generator
        </h1>
        <p className="text-emerald-700 text-lg max-w-2xl mx-auto">
          Generate secure, random alphanumeric strings for passwords, tokens,
          API keys, or testing.
        </p>
      </div>

      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-zinc-200 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">
              String Length
            </label>
            <input
              type="number"
              min="1"
              max="2048"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-emerald-500 font-bold bg-zinc-50 text-xl"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">
              Number of Strings
            </label>
            <input
              type="number"
              min="1"
              max="1000"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-emerald-500 font-bold bg-zinc-50 text-xl"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <label className="flex items-center gap-3 p-4 border rounded-xl cursor-pointer hover:bg-emerald-50 transition-colors">
            <input
              type="checkbox"
              checked={useUpper}
              onChange={(e) => setUseUpper(e.target.checked)}
              className="w-5 h-5 text-emerald-600 rounded"
            />
            <span className="font-bold text-zinc-700">Uppercase (A-Z)</span>
          </label>
          <label className="flex items-center gap-3 p-4 border rounded-xl cursor-pointer hover:bg-emerald-50 transition-colors">
            <input
              type="checkbox"
              checked={useLower}
              onChange={(e) => setUseLower(e.target.checked)}
              className="w-5 h-5 text-emerald-600 rounded"
            />
            <span className="font-bold text-zinc-700">Lowercase (a-z)</span>
          </label>
          <label className="flex items-center gap-3 p-4 border rounded-xl cursor-pointer hover:bg-emerald-50 transition-colors">
            <input
              type="checkbox"
              checked={useNumbers}
              onChange={(e) => setUseNumbers(e.target.checked)}
              className="w-5 h-5 text-emerald-600 rounded"
            />
            <span className="font-bold text-zinc-700">Numbers (0-9)</span>
          </label>
          <label className="flex items-center gap-3 p-4 border rounded-xl cursor-pointer hover:bg-emerald-50 transition-colors">
            <input
              type="checkbox"
              checked={useSymbols}
              onChange={(e) => setUseSymbols(e.target.checked)}
              className="w-5 h-5 text-emerald-600 rounded"
            />
            <span className="font-bold text-zinc-700">Symbols (@#$%)</span>
          </label>
        </div>

        <div>
          <button
            onClick={generate}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-emerald-600/30 uppercase tracking-widest text-lg"
          >
            Generate Strings
          </button>
        </div>
      </div>

      {results.length > 0 && (
        <div className="bg-emerald-950 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

          <div className="flex justify-between items-center mb-6 z-10">
            <h2 className="text-emerald-400 font-bold uppercase tracking-widest text-xs">
              Generated Output
            </h2>
            <button
              onClick={() => navigator.clipboard.writeText(results.join("\n"))}
              className="text-xs bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold px-4 py-2 rounded-lg transition-colors"
            >
              Copy All
            </button>
          </div>

          <div className="z-10 bg-black/40 p-6 rounded-xl border border-emerald-500/30 shadow-inner max-h-[400px] overflow-y-auto">
            <pre className="font-mono text-emerald-100 text-sm md:text-base whitespace-pre-wrap break-all">
              {results.join("\n")}
            </pre>
          </div>
        </div>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Random String Generator",
            operatingSystem: "All",
            applicationCategory: "UtilitiesApplication",
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title="Random String Generator"
          whatIsIt={
            <>
              <p>
                A <strong>Random String Generator</strong> is an algorithmic
                utility that constructs long, unpredictable mathematical
                sequences of text. By mixing uppercase letters, lowercase
                letters, numbers, and special symbols, it builds complex data
                strings that are virtually impossible to guess.
              </p>
              <p>
                This tool is primarily utilized by web developers, database
                administrators, and cybersecurity professionals to instantly
                generate highly secure passwords, cryptographic salts, API
                authorization bearer tokens, or dummy testing data.
              </p>
            </>
          }
          formula={
            <>
              <p>
                The system builds strings by executing a recursive loop against
                a permitted "character pool."
              </p>
              <ul className="list-disc pl-6 space-y-3 mt-4 text-zinc-700">
                <li>
                  First, it checks your checkboxes to build an array of every
                  allowed character. (e.g., if you only select "Numbers", the
                  pool is strictly <code>[0,1,2,3,4,5,6,7,8,9]</code>).
                </li>
                <li>
                  It then enters a loop set to your requested "String Length."
                </li>
                <li>
                  During every loop iteration, it uses a random number generator
                  to pick exactly one index from the permitted pool, appending
                  that character to the final result.
                </li>
              </ul>
            </>
          }
          example={
            <>
              <p>
                Let's simulate the generation of a{" "}
                <strong>6-character authorization code</strong> restricted only
                to Uppercase Letters and Numbers.
              </p>
              <ul className="list-none space-y-2 mt-4 font-mono text-sm bg-emerald-50 p-4 rounded-xl border border-emerald-200">
                <li>
                  <strong>The Pool:</strong> 36 characters (A-Z, 0-9)
                </li>
                <li>
                  <strong>Loop 1:</strong> System randomly lands on index 14
                  ('O'). String: <code>O</code>
                </li>
                <li>
                  <strong>Loop 2:</strong> System randomly lands on index 32
                  ('6'). String: <code>O6</code>
                </li>
                <li>
                  <strong>Loop 3:</strong> System randomly lands on index 2
                  ('C'). String: <code>O6C</code>
                </li>
                <li>
                  <strong>Loop 4:</strong> System randomly lands on index 28
                  ('2'). String: <code>O6C2</code>
                </li>
                <li>
                  <strong>Loop 5:</strong> System randomly lands on index 21
                  ('V'). String: <code>O6C2V</code>
                </li>
                <li>
                  <strong>Loop 6:</strong> System randomly lands on index 35
                  ('9'). String: <code>O6C2V9</code>
                </li>
                <li className="pt-2 mt-2 font-bold text-emerald-800 border-t border-emerald-200">
                  Final Result: O6C2V9
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-zinc-700">
              <li>
                <strong>Password Security:</strong> Generate incredibly secure,
                16-to-32 character Wi-Fi passwords, master vault passwords, or
                server passwords that will defeat any modern brute-force
                dictionary attack.
              </li>
              <li>
                <strong>Software Development:</strong> Web developers routinely
                need random 64-character alphanumeric strings to use as JSON Web
                Token (JWT) secrets, session IDs, or database salts.
              </li>
              <li>
                <strong>Marketing Campaigns:</strong> Generate thousands of
                unique 8-character strings to use as single-use discount codes
                on Shopify or WooCommerce stores.
              </li>
            </ul>
          }
          faqs={[
            {
              question: "How long should a secure password be?",
              answer:
                "Currently, cybersecurity experts strongly recommend a minimum of 16 characters. As modern graphics cards (GPUs) get faster, hackers can guess short passwords incredibly quickly. A random 8-character password might be cracked in a few days; a random 16-character password would take modern computers several billion years to brute-force.",
            },
            {
              question: "Are these strings saved anywhere?",
              answer:
                "Absolutely not. This entire generator operates exclusively via client-side JavaScript. The strings exist uniquely inside your immediate browser tab memory and vanish the second you close the page. No network requests are made, ensuring complete data privacy.",
            },
            {
              question: "What is entropy?",
              answer:
                "Entropy is the mathematical measure of 'randomness' and uncertainty. A string with high entropy (like a 32-character string mixing all symbols, numbers, and cases) has a vast pool of potential combinations, making it exponentially harder for a computer algorithm to guess the pattern.",
            },
          ]}
          relatedCalculators={[
            {
              name: "UUID Generator",
              path: "/uuid-generator",
              desc: "Generate standardized Universal Unique Identifiers (v4) for database keys.",
            },
            {
              name: "Base64 Converter",
              path: "/base64-converter",
              desc: "Encode or decode strings using Base64 encryption.",
            },
            {
              name: "Random Letter Generator",
              path: "/random-letter-generator",
              desc: "Generate alphabetical characters randomly instead of data strings.",
            },
          ]}
        />
      </div>
    </div>
  );
}
