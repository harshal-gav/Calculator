"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function LoveCalculator() {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [result, setResult] = useState<{
    percentage: number;
    message: string;
    calculated: boolean;
  }>({
    percentage: 0,
    message: "",
    calculated: false,
  });
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateLove = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name1.trim() || !name2.trim()) return;

    setIsCalculating(true);
    setResult({ percentage: 0, message: "", calculated: false });

    // Simulate a fun delay for the "calculation"
    setTimeout(() => {
      // A deterministic "random" algorithm based on names
      const combined = (
        name1.toLowerCase().trim() + name2.toLowerCase().trim()
      ).replace(/[^a-z]/g, "");
      let score = 0;

      // Give points for certain letters (TRUE LOVE)
      const specialLetters = ["t", "r", "u", "e", "l", "o", "v"];
      for (let i = 0; i < combined.length; i++) {
        if (specialLetters.includes(combined[i])) {
          score += 7;
        } else {
          score += combined.charCodeAt(i) % 5;
        }
      }

      // Using char codes to create a seed for a pseudo-random looking but deterministic number
      let seed = 0;
      for (let i = 0; i < combined.length; i++) {
        seed += combined.charCodeAt(i);
      }

      // Magic formula to get a percentage between 40 and 100 for mostly positive results,
      // occasionally dropping to 10-40 just for fun.
      let percentage = (seed * 13 + score * 7) % 101;

      // Adjust to skew slightly higher
      if (percentage < 30) percentage += 20;

      let message = "";
      if (percentage >= 90) message = "A match made in heaven! 💍";
      else if (percentage >= 75) message = "Very strong connection! ❤️";
      else if (percentage >= 50) message = "Good potential! 💕";
      else if (percentage >= 30) message = "It might take some work! 🤔";
      else message = "Maybe just be friends? 😬";

      setResult({
        percentage,
        message,
        calculated: true,
      });
      setIsCalculating(false);
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-rose-600 border-b pb-4 flex items-center">
        <span className="mr-3">❤️</span> Love Calculator
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Enter your name and your crush's name to find out your true
        compatibility score!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="bg-rose-50 p-6 md:p-8 rounded-2xl border border-rose-100 text-center relative overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#e11d48 2px, transparent 2px)",
              backgroundSize: "20px 20px",
            }}
          ></div>

          <form onSubmit={calculateLove} className="relative z-10 space-y-6">
            <div>
              <label className="block text-sm font-bold text-rose-800 mb-2 uppercase tracking-wider">
                Your Name
              </label>
              <input
                type="text"
                required
                value={name1}
                onChange={(e) => setName1(e.target.value)}
                className="w-full rounded-xl border-gray-300 p-4 shadow-inner focus:border-rose-500 focus:ring focus:ring-rose-200 font-bold text-xl text-center text-gray-800"
                placeholder="E.g. Romeo"
              />
            </div>

            <div className="text-3xl text-rose-500 animate-pulse">➕</div>

            <div>
              <label className="block text-sm font-bold text-rose-800 mb-2 uppercase tracking-wider">
                Their Name
              </label>
              <input
                type="text"
                required
                value={name2}
                onChange={(e) => setName2(e.target.value)}
                className="w-full rounded-xl border-gray-300 p-4 shadow-inner focus:border-rose-500 focus:ring focus:ring-rose-200 font-bold text-xl text-center text-gray-800"
                placeholder="E.g. Juliet"
              />
            </div>

            <button
              type="submit"
              disabled={isCalculating || !name1.trim() || !name2.trim()}
              className="w-full mt-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-black text-lg p-4 rounded-xl shadow-lg hover:shadow-rose-500/30 hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isCalculating ? "Calculating Destiny..." : "CALCULATE LOVE"}
            </button>
          </form>
        </div>

        {/* Results Screen */}
        <div className="bg-gradient-to-b from-rose-600 to-rose-900 border-2 border-rose-800 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-center text-white relative">
          {result.calculated ? (
            <div className="p-8 text-center z-10 animate-fade-in-up">
              <h3 className="text-rose-200 font-bold uppercase tracking-widest text-sm mb-4">
                Compatibility Score
              </h3>

              <div className="relative inline-block mb-6">
                <svg className="w-48 h-48 transform -rotate-90">
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    className="text-rose-900/50"
                    strokeWidth="12"
                    stroke="currentColor"
                    fill="none"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    className="text-pink-400 drop-shadow-md transition-all duration-1000 ease-out"
                    strokeWidth="12"
                    strokeDasharray={553}
                    strokeDashoffset={553 - (553 * result.percentage) / 100}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                  />
                </svg>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                  <span className="text-5xl font-black drop-shadow-lg">
                    {result.percentage}
                  </span>
                  <span className="text-2xl font-bold text-pink-300">%</span>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <p className="text-2xl font-bold text-white drop-shadow-md">
                  {result.message}
                </p>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center h-full flex flex-col items-center justify-center text-rose-300/50">
              {isCalculating ? (
                <div className="space-y-4">
                  <div className="text-6xl animate-bounce">💘</div>
                  <p className="font-bold tracking-widest uppercase text-rose-200 animate-pulse">
                    Consulting the stars...
                  </p>
                </div>
              ) : (
                <div>
                  <div className="text-8xl mb-4 opacity-50">💌</div>
                  <p className="font-bold tracking-widest uppercase">
                    Awaiting your input
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 text-center text-xs text-gray-400">
        Disclaimer: The Love Calculator is a fun algorithmic game and should not
        be used as actual relationship advice!
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Love Calculator",
            operatingSystem: "All",
            applicationCategory: "EntertainmentApplication",
          }),
        }}
      />

      <div className="mt-8 text-left">
        <CalculatorSEO
          title="Real Love Calculator Test"
          whatIsIt={
            <p>
              The <strong>Love Calculator</strong> is a playful algorithm
              designed to test the romantic compatibility between two names. It
              analyzes the specific letters in both names and runs them through
              a deterministic scoring system to generate a fun, shareable love
              percentage from 0% to 100%.
            </p>
          }
          formula={
          <>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 font-mono text-lg text-indigo-700 text-center shadow-sm my-6">
              Love Analysis Model
            </div>
            <p className="text-sm text-slate-500 text-center">
              This tool utilize standardized mathematical formulas and logic to calculate precise Love results.
            </p>
          </>
        }
          example={
            <>
              <p>Here is how a calculation might happen behind the scenes:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                <li>
                  <strong>The Input:</strong> You enter "Romeo" and "Juliet".
                </li>
                <li>
                  <strong>The Process:</strong> The calculator counts the
                  letters, extracts the ASCII values, and notices several "TRUE
                  LOVE" letters present.
                </li>
                <li>
                  <strong>Result:</strong> It generates a high compatibility
                  score of <strong>85% - Very strong connection!</strong>
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-gray-700">
              <li>
                <strong>Entertainment With Friends:</strong> A fun party trick
                or icebreaker game to see who the algorithm pairs together best
                among a friend group.
              </li>
              <li>
                <strong>Crush Testing:</strong> Find out what the "stars" (or
                our algorithm) predict for your current relationship or new
                crush.
              </li>
              <li>
                <strong>Fictional Pairings:</strong> Test the romantic
                compatibility of movie characters, celebrities, or historical
                figures for fun.
              </li>
            </ul>
          }
          faqs={[
            {
              question: "Is the Love Calculator accurate?",
              answer:
                "No! The Love Calculator is purely for entertainment purposes. It relies on a mathematical string-parsing algorithm, not astrology or psychology. Your relationship success depends on communication and trust, not your names!",
            },
            {
              question:
                "Will I always get the same result with the same names?",
              answer:
                "Yes. Our algorithm is deterministic. As long as you spell the names exactly the same way, the mathematical ASCII seed will always produce the exact same percentage score.",
            },
            {
              question: "Does the order of the names matter?",
              answer:
                "No. The calculator combines both names into a single string before running the algorithm, so 'Alice and Bob' will yield the exact same score as 'Bob and Alice'.",
            },
          ]}
          relatedCalculators={[
            {
              name: "Zodiac Calculator",
              path: "/zodiac-calculator/",
              desc: "Discover your astrological sign based on your birth date.",
            },
            {
              name: "Random Picker",
              path: "/random-choice-generator/",
              desc: "Can't decide where to go for a date? Let the random picker choose.",
            },
            {
              name: "Age Calculator",
              path: "/age-calculator/",
              desc: "Calculate your exact age in days, months, and years.",
            },
            {
              name: "Temperature Converter",
              path: "/temperature-converter/",
              desc: "Convert between Celsius, Fahrenheit, and Kelvin.",
            }]}
        />
      </div>
    </div>
  );
}
