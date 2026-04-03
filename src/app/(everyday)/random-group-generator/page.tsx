"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

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
              className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-purple-500 font-medium text-lg transition-all outline-none"
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
              className="w-full max-w-xs rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-purple-500 font-bold font-mono text-2xl transition-all outline-none"
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
          title="Random Team & Group Generator"
          whatIsIt={
            <>
              <p>
                The <strong>Random Group Generator</strong> instantly divides a
                large list of names, students, or items into completely
                randomized, evenly distributed teams or groups.
              </p>
              <p>
                Whether you're a teacher splitting a classroom for a project, a
                manager forming breakout session groups, or a gamer assigning
                squads, human bias (even unintentional) ruins fair team
                creation. This tool relies on strict cryptographic randomization
                to ensure pure, unbiased groupings.
              </p>
            </>
          }
          formula={
          <>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 font-mono text-lg text-indigo-700 text-center shadow-sm my-6">
              Random Group Generator Analysis Model
            </div>
            <p className="text-sm text-slate-500 text-center">
              This tool utilize standardized mathematical formulas and logic to calculate precise Random Group Generator results.
            </p>
          </>
        }
          example={
            <>
              <p>
                You have 10 employees (Alice, Bob, Charlie... Jane) and need to
                create 3 random task force teams.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                <li>
                  <strong>The Input:</strong> You enter all 10 names and set the
                  target groups to "3".
                </li>
                <li>
                  <strong>The Shuffling:</strong> The algorithm instantly
                  scrambles the order:{" "}
                  <code>[Charlie, Jane, Alice, Bob, Fiona...]</code>
                </li>
                <li>
                  <strong>The Dealing:</strong>
                  <br />
                  Group 1 gets Charlie. Group 2 gets Jane. Group 3 gets Alice.
                  <br />
                  Group 1 gets Bob. Group 2 gets Fiona...
                </li>
                <li>
                  <strong>The Output:</strong> Groups 1 and 2 end up with 4
                  members, while Group 3 gets the final remaining 2 members.
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-gray-700">
              <li>
                <strong>Education & Classrooms:</strong> Teachers use team
                makers to prevent students from always partnering with their
                best friends, forcing them to interact and collaborate with new
                classmates.
              </li>
              <li>
                <strong>Corporate Workshops:</strong> Meeting facilitators use
                breakout-group generators for remote Zoom calls to randomly
                assign employees from entirely different departments to
                brainstorm together.
              </li>
              <li>
                <strong>Sports & Gaming:</strong> Quickly assigning balanced,
                randomized rosters for a casual pickup basketball game or an
                impromptu online gaming tournament.
              </li>
            </ul>
          }
          faqs={[
            {
              question:
                "What if my total number of people doesn't divide evenly by the number of groups?",
              answer:
                "The algorithm distributes exactly one person to each group in sequential order. If there are leftovers, the first few groups will simply end up with exactly one more member than the final groups. No one is left behind.",
            },
            {
              question:
                "Is this completely random, or does it try to balance things based on previous results?",
              answer:
                "It is 100% purely random every single time you hit generate. It has no memory of past results and does not attempt to mathematically 'balance' skill levels.",
            },
            {
              question:
                "How do I ensure a specific person doesn't end up on a specific team?",
              answer:
                "Pure randomization cannot guarantee separation constraints. If you have specific rules (e.g., 'Alice and Bob cannot be together'), you must generate the groups first and manually swap them afterward if a collision occurs.",
            },
          ]}
          relatedCalculators={[
            {
              name: "Random Name/Item Picker",
              path: "/random-item-picker/",
              desc: "Spin a randomized wheel to select a single winner out of a large list.",
            },
            {
              name: "List Sorter Tool",
              path: "/list-sorter/",
              desc: "Alphabetize or formally structure your list of names before randomizing.",
            },
            {
              name: "Online Dice Roller",
              path: "/dice-roller/",
              desc: "Generate purely random numbers or roll custom dice for tabletop gaming.",
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
