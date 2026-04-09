"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import groupSeoData from "@/data/seo-content/official/random-group-generator.json";

export default function RandomGroupGenerator() {
  const [namesInput, setNamesInput] = useState(
    "Alice, Bob, Charlie, Diana, Ethan, Fiona, George, Hannah, Ian, Jane",
  );
  const [numGroups, setNumGroups] = useState("3");

  const [result, setResult] = useState<string[][] | null>(null);
  const [error, setError] = useState("");

  const generateGroups = () => {
    setError("");

    // Parse list
    let items = namesInput
      .split(/\r?\n|,/)
      .map((s) => s.trim())
      .filter((s) => s !== "");

    if (items.length === 0) {
      setError("Please enter at least one name or item.");
      setResult(null);
      return;
    }

    const groupsCount = parseInt(numGroups);

    if (isNaN(groupsCount) || groupsCount <= 0) {
      setError("Please enter a valid number of groups (greater than 0).");
      setResult(null);
      return;
    }

    if (groupsCount > items.length) {
      setError("Number of groups cannot be larger than the number of items.");
      setResult(null);
      return;
    }

    // Shuffle items (Fisher-Yates)
    // Create a copy to not mutate original directly
    const shuffled = [...items];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // Distribute into groups
    const groups: string[][] = Array.from({ length: groupsCount }, () => []);

    shuffled.forEach((item, index) => {
      const groupIndex = index % groupsCount;
      groups[groupIndex].push(item);
    });

    setResult(groups);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-purple-900 flex items-center justify-center font-serif">
          <span className="mr-3">🎲</span> Random Group Generator
        </h1>
        <p className="text-purple-700 text-lg max-w-2xl mx-auto">
          Quickly shuffle and assign people, teams, or items into completely
          random groups.
        </p>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-zinc-200 mb-8 max-w-3xl mx-auto">
        <div className="space-y-6 mb-8">
          <div>
            <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">
              Names or Items
            </label>
            <p className="text-xs text-zinc-500 mb-3 font-medium">
              Separate by commas or put each item on a new line.
            </p>
            <textarea
              rows={5}
              value={namesInput}
              onChange={(e) => setNamesInput(e.target.value)}
              className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-purple-500 font-medium text-lg transition-all outline-none bg-zinc-50"
              placeholder="e.g. John, Sarah, Mark..."
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">
              Number of Groups
            </label>
            <input
              type="number"
              step="1"
              min="1"
              value={numGroups}
              onChange={(e) => setNumGroups(e.target.value)}
              className="w-full max-w-xs rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-purple-500 font-bold font-mono text-2xl transition-all outline-none bg-zinc-50"
              onKeyDown={(e) => e.key === "Enter" && generateGroups()}
            />
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl font-bold text-center text-sm">
            {error}
          </div>
        )}

        <button
          onClick={generateGroups}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-purple-600/30 uppercase tracking-widest text-lg"
        >
          Generate Random Groups
        </button>
      </div>

      {result !== null && (
        <div className="bg-slate-900 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-fuchsia-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

          <h2 className="text-purple-400 font-bold uppercase tracking-widest text-xs mb-8 z-10 text-center">
            Assigned Groups
          </h2>

          <div className="w-full max-w-4xl z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {result.map((group, idx) => (
              <div
                key={idx}
                className="bg-black/40 border-t-4 border-purple-500 rounded-xl border-x border-b border-white/5 overflow-hidden flex flex-col h-full shadow-lg"
              >
                <div className="bg-black/20 p-3 text-center border-b border-white/5">
                  <span className="text-purple-300 font-black uppercase tracking-widest text-sm">
                    Group {idx + 1}
                  </span>
                  <span className="text-white/30 text-[10px] block font-bold uppercase mt-1">
                    {group.length} members
                  </span>
                </div>
                <div className="p-4 flex-1">
                  <ul className="space-y-2">
                    {group.map((item, itemIdx) => (
                      <li
                        key={itemIdx}
                        className="bg-white/5 rounded-lg px-3 py-2 text-white font-medium flex items-center"
                      >
                        <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-300 text-xs flex items-center justify-center mr-3 font-bold border border-purple-500/30">
                          {itemIdx + 1}
                        </span>
                        <span className="break-all">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
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
            name: "Random Group Generator",
            operatingSystem: "All",
            applicationCategory: "UtilitiesApplication",
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title={groupSeoData.title}
          whatIsIt={groupSeoData.whatIsIt}
          formula={groupSeoData.formula}
          example={groupSeoData.example}
          useCases={groupSeoData.useCases}
          faqs={groupSeoData.faqs}
          deepDive={groupSeoData.deepDive}
          glossary={groupSeoData.glossary}
          relatedCalculators={[
            {
              name: "Random Item Picker",
              path: "/random-item-picker/",
              desc: "Spin a randomized wheel to select a single winner out of a large list.",
            },
            {
              name: "Random Number Generator",
              path: "/random-number-generator/",
              desc: "Quickly produce highly unpredictable numeric sequences.",
            },
            {
              name: "Dice Roller",
              path: "/dice-roller/",
              desc: "Simulate polyhedral dice for gaming and probability sessions.",
            },
            {
              name: "Age Calculator",
              path: "/age-calculator/",
              desc: "Calculate your exact age in years, months, and days.",
            }
          ]}
        />
      </div>
    </div>
  );
}
