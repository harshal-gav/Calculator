"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
export default function DiceRoller() {
  const [diceType, setDiceType] = useState(6);
  const [diceCount, setDiceCount] = useState(2);
  const [modifier, setModifier] = useState(0);

  const [results, setResults] = useState<{
    rolls: number[];
    total: number;
  } | null>(null);

  const [isRolling, setIsRolling] = useState(false);

  const rollDice = () => {
    setIsRolling(true);
    setResults(null);

    // Simple animation delay effect
    setTimeout(() => {
      const rolls = [];
      let total = 0;

      for (let i = 0; i < diceCount; i++) {
        const roll = Math.floor(Math.random() * diceType) + 1;
        rolls.push(roll);
        total += roll;
      }

      total += modifier;

      setResults({ rolls, total });
      setIsRolling(false);
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-red-900 flex items-center justify-center font-serif">
          <span className="mr-3">🎲</span> Online Dice Roller
        </h1>
        <p className="text-red-700 text-lg max-w-2xl mx-auto">
          Roll virtual 3D dice for tabletop gaming, RPGs (D&D), board games, or
          random statistics.
        </p>
      </div>

      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-zinc-200 mb-8 max-w-3xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 items-end">
          <div>
            <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">
              Number of Dice
            </label>
            <div className="flex bg-zinc-50 border border-zinc-200 rounded-xl overflow-hidden shadow-sm">
              <button
                onClick={() => setDiceCount(Math.max(1, diceCount - 1))}
                className="w-12 bg-white font-bold text-xl hover:bg-zinc-100 transition-colors"
              >
                -
              </button>
              <input
                type="number"
                min="1"
                max="100"
                value={diceCount}
                onChange={(e) => setDiceCount(parseInt(e.target.value) || 1)}
                className="flex-1 w-full text-center bg-transparent font-bold text-xl outline-none"
              />
              <button
                onClick={() => setDiceCount(Math.min(100, diceCount + 1))}
                className="w-12 bg-white font-bold text-xl hover:bg-zinc-100 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">
              Dice Type
            </label>
            <select
              value={diceType}
              onChange={(e) => setDiceType(parseInt(e.target.value))}
              className="w-full rounded-xl border-zinc-300 shadow-sm p-3 h-[52px] border focus:border-red-500 font-bold bg-zinc-50 text-xl cursor-pointer"
            >
              <option value="4">D4 (Tetrahedron)</option>
              <option value="6">D6 (Cube)</option>
              <option value="8">D8 (Octahedron)</option>
              <option value="10">D10 (Decahedron)</option>
              <option value="12">D12 (Dodecahedron)</option>
              <option value="20">D20 (Icosahedron)</option>
              <option value="100">D100 (Percentile)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">
              Modifier (+/-)
            </label>
            <input
              type="number"
              value={modifier}
              onChange={(e) => setModifier(parseInt(e.target.value) || 0)}
              className="w-full rounded-xl border-zinc-300 shadow-sm p-3 h-[52px] border focus:border-red-500 font-bold bg-zinc-50 text-xl"
            />
          </div>
        </div>

        <div className="flex justify-center mb-6">
          <span className="font-mono bg-red-50 text-red-900 border border-red-200 px-6 py-2 rounded-full font-bold shadow-sm tracking-widest uppercase">
            Formula: {diceCount}d{diceType}{" "},
            {modifier > 0
              ? `+ ${modifier}`
              : modifier < 0
                ? `- ${Math.abs(modifier)}`
                : ""}
          </span>
        </div>

        <div>
          <button
            onClick={rollDice}
            disabled={isRolling}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-bold py-5 px-6 rounded-xl transition-all shadow-lg shadow-red-600/30 uppercase tracking-widest text-xl transform active:scale-95 flex items-center justify-center gap-3"
          >
            {isRolling ? <span className="animate-spin">🌀</span> : "🎲"},
            {isRolling ? "Rolling..." : "Roll Dice"}
          </button>
        </div>
      </div>

      {results !== null && !isRolling && (
        <div className="bg-red-950 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center animate-[popIn_0.3s_ease-out]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

          <h2 className="text-red-400 font-bold uppercase tracking-widest text-xs mb-6 z-10">
            Total Result
          </h2>

          <div className="z-10 font-black text-7xl md:text-9xl text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.4)] tracking-tight font-serif mb-8 bg-black/30 px-10 py-4 rounded-3xl border border-red-500/20">
            {results.total}
          </div>

          <div className="z-10 w-full max-w-2xl">
            <h3 className="text-red-400/60 font-bold uppercase tracking-widest text-xs mb-4 text-center border-b border-red-500/20 pb-2">
              Individual Rolls
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {results.rolls.map((roll, i) => (
                <div
                  key={i}
                  className="bg-white text-red-900 font-black text-xl w-14 h-14 rounded-lg flex items-center justify-center shadow-[inset_0_-4px_0_rgba(0,0,0,0.1)] border-2 border-red-200 relative"
                >
                  {roll}
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-mono">
                    d{diceType}
                  </span>
                </div>
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
            name: "Online Dice Roller",
            operatingSystem: "All",
            applicationCategory: "GameApplication",
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title="Online Dice Roller"
          whatIsIt={
            <>
              <p>
                An <strong>Online Dice Roller</strong> is a digital utility that
                simulates throwing physical polyhedral dice. It calculates the
                resulting sum identically to throwing real dice on a table,
                completely immune to human bias or weighted plastic.
              </p>
              <p>
                Whether you need a simple D6 for a quick game of Monopoly, or a
                complex <code>3d20 + 5</code> roll for a Dungeons & Dragons boss
                fight, this tool generates instant, statistically fair results
                utilizing cryptographic or high-entropy mathematical functions.
              </p>
            </>
          }
          formula={
            <>
              <p>
                This roller operates on the standard tabletop gaming notation,
                often written as <strong>NdX + M</strong>, where:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-zinc-700">
                <li>
                  <strong>N (Number of Dice):</strong> How many dice are being
                  thrown.
                </li>
                <li>
                  <strong>X (Dice Type):</strong> The number of faces on the die
                  (e.g., 6, 20).
                </li>
                <li>
                  <strong>M (Modifier):</strong> Any flat numeric bonus or
                  penalty added to the final sum.
                </li>
              </ul>
              <p className="mt-4">
                Under the hood, it executes a random number generator bounded
                between 1 and X for every single die thrown, sums those
                individual results, and finally applies the modifier.
              </p>
            </>
          }
          example={
            <>
              <p>
                Let's simulate a standard attack roll in a tabletop RPG,
                specifically rolling <strong>2d8 + 4</strong>.
              </p>
              <ul className="list-none space-y-2 mt-4 font-mono text-sm bg-red-50 p-4 rounded-xl border border-red-200">
                <li>
                  <strong>The Input:</strong> Number of Dice = 2, Dice Type = 8,
                  Modifier = 4
                </li>
                <li>
                  <strong>Step 1 (First Roll):</strong> The generator picks a
                  random number from 1 to 8. It lands on 6.
                </li>
                <li>
                  <strong>Step 2 (Second Roll):</strong> The generator picks
                  another random number from 1 to 8. It lands on 3.
                </li>
                <li>
                  <strong>Step 3 (Base Sum):</strong> 6 + 3 = 9.
                </li>
                <li>
                  <strong>Step 4 (Modifier):</strong> 9 + 4 = 13.
                </li>
                <li className="pt-2 mt-2 font-bold text-red-800 border-t border-red-200">
                  Final Result: 13
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-zinc-700">
              <li>
                <strong>Tabletop Roleplaying Games:</strong> Essential for
                generating stats, executing attacks, or resolving skill checks
                in games like D&D, Pathfinder, or Call of Cthulhu without
                carrying bags of heavy dice.
              </li>
              <li>
                <strong>Board Games:</strong> A perfect backup when you lose the
                physical dice that came with classic games like Catan, Risk, or
                Yahtzee.
              </li>
              <li>
                <strong>Statistical Modeling:</strong> Teachers use dice rollers
                to demonstrate probability curves, expected values, and standard
                deviation to math students in real-time.
              </li>
            </ul>
          }
          faqs={[
            {
              question: "Are these virtual dice fair?",
              answer:
                "Yes, they are exceptionally fair. Because this relies on JavaScript's native pseudo-random number generator, the results are statistically unweighted. Unlike physical cheap plastic dice, which often have minor air bubbles inside them that weight them heavily toward certain numbers, this algorithm's distribution profile is perfectly flat over thousands of rolls.",
            },
            {
              question: "What does 'D6' or 'D20' mean?",
              answer:
                "The 'D' stands for 'Die' or 'Dice', and the number represents how many flat geometric sides the shape has. A D6 is a standard six-sided cube, while a D20 is a twenty-sided icosahedron widely used in adventure games.",
            },
            {
              question: "Can I roll negative modifiers?",
              answer:
                "Yes! If you have a penalty to a roll, simply type a negative number into the modifier field, and it will be properly subtracted from the total sum.",
            },
          ]}
          relatedCalculators={[
            {
              name: "Random Choice Generator",
              path: "/random-choice-generator",
              desc: "Select a random winner or item out of a custom text list.",
            },
            {
              name: "Probability Calculator",
              path: "/probability-calculator",
              desc: "Calculate the exact mathematical odds of winning a dice roll.",
            },
            {
              name: "Random Letter Generator",
              path: "/random-letter-generator",
              desc: "Generate alphabetical characters randomly instead of numbers.",
            },
            {
              name: "Age Calculator",
              path: "/age-calculator",
              desc: "Calculate your exact age in years, months, and days.",
            }]}
        />
      </div>

      <style jsx>{`
        @keyframes popIn {
          0% {
            transform: scale(0.95);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
