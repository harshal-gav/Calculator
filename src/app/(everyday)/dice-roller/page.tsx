"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import diceSeoData from "@/data/seo-content/official/dice-roller.json";

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
            Formula: {diceCount}d{diceType}{" "}
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
            {isRolling ? <span className="animate-spin">🌀</span> : "🎲"}
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
          title={diceSeoData.title}
          whatIsIt={diceSeoData.whatIsIt}
          formula={diceSeoData.formula}
          example={diceSeoData.example}
          useCases={diceSeoData.useCases}
          faqs={diceSeoData.faqs}
          deepDive={diceSeoData.deepDive}
          glossary={diceSeoData.glossary}
          relatedCalculators={[
            {
              name: "Random Choice Generator",
              path: "/random-choice-generator/",
              desc: "Select a random winner or item out of a custom text list.",
            },
            {
              name: "Probability Calculator",
              path: "/probability-calculator/",
              desc: "Calculate the exact mathematical odds of winning a dice roll.",
            },
            {
              name: "Random Number Generator",
              path: "/random-number-generator/",
              desc: "Instantly draw a number from any custom range.",
            },
            {
              name: "Age Calculator",
              path: "/age-calculator/",
              desc: "Calculate your exact age in years, months, and days.",
            }
          ]}
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
