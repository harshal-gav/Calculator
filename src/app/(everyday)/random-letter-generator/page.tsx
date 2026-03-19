"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
export default function RandomLetterGenerator() {
  const [count, setCount] = useState("1");
  const [allowDuplicates, setAllowDuplicates] = useState(true);
  const [caseType, setCaseType] = useState("upper"); // 'upper', 'lower', 'mixed'

  const [results, setResults] = useState<string[]>([]);

  const generate = () => {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (caseType === "lower") chars = chars.toLowerCase();
    if (caseType === "mixed") chars = chars + chars.toLowerCase();

    const c = parseInt(count);
    if (isNaN(c) || c < 1 || c > 1000) return;

    if (!allowDuplicates && c > chars.length) {
      setResults([
        "Cannot generate unique letters: requested count exceeds available letters.",
      ]);
      return;
    }

    const newResults = [];
    let availableChars = chars.split("");

    for (let i = 0; i < c; i++) {
      if (!allowDuplicates) {
        const index = Math.floor(Math.random() * availableChars.length);
        newResults.push(availableChars[index]);
        availableChars.splice(index, 1);
      } else {
        newResults.push(chars.charAt(Math.floor(Math.random() * chars.length)));
      }
    }

    setResults(newResults);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-sky-900 flex items-center justify-center font-serif">
          <span className="mr-3">A</span> Random Letter Generator
        </h1>
        <p className="text-sky-700 text-lg max-w-2xl mx-auto">
          Generate random letters from the English alphabet for games, testing,
          or education.
        </p>
      </div>

      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-zinc-200 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 items-end">
          <div>
            <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">
              Number of Letters
            </label>
            <input
              type="number"
              min="1"
              max="1000"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-sky-500 font-bold bg-zinc-50 text-xl"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">
              Letter Casing
            </label>
            <select
              value={caseType}
              onChange={(e) => setCaseType(e.target.value)}
              className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-sky-500 font-bold bg-zinc-50 text-xl cursor-pointer"
            >
              <option value="upper">Uppercase (A-Z)</option>
              <option value="lower">Lowercase (a-z)</option>
              <option value="mixed">Mixed Case</option>
            </select>
          </div>
        </div>

        <div className="mb-8 p-4 border rounded-xl hover:bg-sky-50 transition-colors">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={allowDuplicates}
              onChange={(e) => setAllowDuplicates(e.target.checked)}
              className="w-5 h-5 text-sky-600 rounded"
            />
            <span className="font-bold text-zinc-700">
              Allow Duplicate Letters
            </span>
          </label>
          {!allowDuplicates && (
            <p className="text-xs text-zinc-500 mt-2 ml-8">
              Maximum: {caseType === "mixed" ? "52" : "26"} characters
            </p>
          )}
        </div>

        <div>
          <button
            onClick={generate}
            className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-sky-600/30 uppercase tracking-widest text-lg"
          >
            Generate Letters
          </button>
        </div>
      </div>

      {results.length > 0 && (
        <div className="bg-sky-950 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col">
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

          <div className="flex justify-between items-center mb-6 z-10">
            <h2 className="text-sky-400 font-bold uppercase tracking-widest text-xs">
              Result
            </h2>
            <button
              onClick={() => navigator.clipboard.writeText(results.join(", "))}
              className="text-xs bg-sky-500 hover:bg-sky-400 text-sky-950 font-bold px-4 py-2 rounded-lg transition-colors"
            >
              Copy All
            </button>
          </div>

          <div className="z-10 bg-black/40 p-6 rounded-xl border border-sky-500/30 shadow-inner max-h-[400px] overflow-y-auto">
            <div className="font-mono text-white text-3xl font-bold flex flex-wrap gap-4 justify-center">
              {results.map((char, index) => (
                <span
                  key={index}
                  className="bg-sky-800/50 w-16 h-16 flex items-center justify-center rounded-xl border border-sky-500/30 shadow-sm"
                >
                  {char}
                </span>
              ))}
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
            name: "Random Letter Generator",
            operatingSystem: "All",
            applicationCategory: "UtilitiesApplication",
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title="Random Letter Generator"
          whatIsIt={
            <>
              <p>
                Our <strong>Random Letter Generator</strong> instantly outputs
                completely randomized characters from the standard 26-letter
                English alphabet. It is a digital, unbiased alternative to
                drawing Scrabble tiles out of a bag or spinning a letter wheel.
              </p>
              <p>
                You can strictly request uppercase letters, lowercase letters,
                or a mixed bag of both. The tool uses a high-entropy
                pseudo-random number generator (PRNG) to ensure that every
                letter has a perfectly equal 1-in-26 chance of appearing on
                every single draw.
              </p>
            </>
          }
          formula={
            <>
              <p>
                Behind the scenes, the generator maps the alphabet to an array
                index from 0 to 25:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-zinc-700">
                <li>
                  <code>A = 0, B = 1, C = 2 ... Z = 25</code>
                </li>
                <li>
                  The program generates a random decimal between 0.0 and 1.0.
                </li>
                <li>
                  It multiplies that decimal by 26 (the length of the alphabet).
                </li>
                <li>It rounds down to get a clean integer between 0 and 25.</li>
                <li>
                  It returns the specific letter assigned to that resulting
                  number.
                </li>
              </ul>
            </>
          }
          example={
            <>
              <p>
                Imagine you are playing a quick game of <em>Scattergories</em>{" "}
                or <em>Stop!</em> and need <strong>3 unique letters</strong> to
                start the rounds.
              </p>
              <ul className="list-none space-y-2 mt-4 font-mono text-sm bg-sky-50 p-4 rounded-xl border border-sky-200">
                <li>
                  <strong>The Settings:</strong> Number = 3, Duplicates = OFF,
                  Casing = Uppercase
                </li>
                <li>
                  <strong>Round 1 Math:</strong> The engine selects random index
                  #12 (M).
                </li>
                <li>
                  <strong>Update Pool:</strong> 'M' is removed. 25 letters
                  remain.
                </li>
                <li>
                  <strong>Round 2 Math:</strong> The engine selects random index
                  #2 from the new smaller array (C).
                </li>
                <li>
                  <strong>Update Pool:</strong> 'C' is removed. 24 letters
                  remain.
                </li>
                <li>
                  <strong>Round 3 Math:</strong> The engine selects random index
                  #23 (X).
                </li>
                <li className="pt-2 mt-2 font-bold text-sky-800 border-t border-sky-200">
                  Final Results: M, C, X
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-zinc-700">
              <li>
                <strong>Word & Party Games:</strong> Instantly generate the
                starting letter for games like Scattergories, Word on the
                Street, or improvisational prompts without needing physical
                dice.
              </li>
              <li>
                <strong>Classroom Activities:</strong> Teachers use letter
                generators to call out spelling prompts, assign letter tracing
                exercises for kindergarteners, or group students by their last
                initial.
              </li>
              <li>
                <strong>Creative Naming:</strong> Struggling to name a new
                character in a book or a new tech startup? Generating a few
                random letters can spark unique, unexpected phonetic
                combinations.
              </li>
              <li>
                <strong>Programming & Testing:</strong> Generating dummy
                placeholder data to ensure databases and search/sort algorithms
                can properly handle alphabetical strings.
              </li>
            </ul>
          }
          faqs={[
            {
              question: "Are the vowels weighted differently than consonants?",
              answer:
                "No. Every single letter has perfectly uniform probability. 'E' (the most common English letter) has exactly the same 3.84% chance of being drawn as 'Z' (the least common English letter).",
            },
            {
              question:
                "What happens if I turn off duplicates but ask for 30 letters?",
              answer:
                "The calculator will immediately throw a mathematical error. Because there are only 26 unique letters in the English alphabet, it is impossible to draw 30 unique letters without replacing them back into the bag. If you include lowercase letters (Mixed Case), the pool expands to 52.",
            },
            {
              question: "Is this tool 'true' random?",
              answer:
                "It utilizes Javascript's native PRNG. For everyday human use, games, and basic scripts, it is statistically indistinguishable from physical randomness. However, it should not be used to generate cryptographic security keys, as PRNGs are fundamentally deterministic at the hardware level.",
            },
          ]}
          relatedCalculators={[
            {
              name: "Random Choice Generator",
              path: "/random-choice-generator/",
              desc: "Select a random winner or item out of a custom list.",
            },
            {
              name: "Random String Generator",
              path: "/random-string-generator/",
              desc: "Generate secure, long strings of random alphanumeric characters.",
            },
            {
              name: "Number to Words Converter",
              path: "/number-to-words-converter/",
              desc: "Convert numeric digits into alphabetical English spelled-out words.",
            },
            {
              name: "Age Calculator",
              path: "/age-calculator/",
              desc: "Calculate your exact age in years, months, and days.",
            }]}
        />
      </div>
    </div>
  );
}
