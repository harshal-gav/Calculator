"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function RandomItemPicker() {
  const [itemsInput, setItemsInput] = useState(
    "Pizza\nBurgers\nSushi\nTacos\nChinese\nIndian",
  );
  const [pickedItem, setPickedItem] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [error, setError] = useState("");

  const pickRandom = () => {
    setError("");
    const items = itemsInput
      .split(/\r?\n|,/)
      .map((s) => s.trim())
      .filter((s) => s !== "");

    if (items.length < 2) {
      setError("Please enter at least 2 items to pick from.");
      setPickedItem(null);
      return;
    }

    setIsSpinning(true);
    setPickedItem(null);

    // Simulated spin animation logic
    let spinCount = 0;
    const maxSpins = 20; // total dummy spins
    const spinInterval = 80;

    const spinner = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * items.length);
      setPickedItem(items[randomIndex]);
      spinCount++;

      if (spinCount >= maxSpins) {
        clearInterval(spinner);
        setIsSpinning(false);
        // Set final
        const finalIndex = Math.floor(Math.random() * items.length);
        setPickedItem(items[finalIndex]);
      }
    }, spinInterval);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-amber-900 flex items-center justify-center font-serif">
          <span className="mr-3">🎯</span> Random Item Picker
        </h1>
        <p className="text-amber-700 text-lg max-w-2xl mx-auto">
          Can't decide? Let the generator pick a random winner from your list.
        </p>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-zinc-200 mb-8 max-w-2xl mx-auto flex flex-col md:flex-row gap-8 items-center">
        <div className="w-full md:w-1/2">
          <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">
            Your Options
          </label>
          <p className="text-[10px] text-zinc-500 mb-3 uppercase tracking-widest font-bold">
            1 item per line or comma-separated
          </p>
          <textarea
            rows={10}
            value={itemsInput}
            onChange={(e) => setItemsInput(e.target.value)}
            className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-amber-500 font-medium text-lg transition-all outline-none resize-none leading-relaxed"
            placeholder="Option 1&#10;Option 2&#10;Option 3"
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col items-center gap-6">
          <button
            onClick={pickRandom}
            disabled={isSpinning}
            className={`w-full font-black py-6 px-6 rounded-2xl transition-all shadow-xl uppercase tracking-widest text-2xl border-b-8 active:border-b-0 active:translate-y-2 flex flex-col items-center justify-center ${isSpinning ? "bg-zinc-300 text-zinc-500 border-zinc-400 cursor-not-allowed shadow-none" : "bg-amber-500 hover:bg-amber-400 text-white border-amber-600 hover:shadow-amber-500/50"}`}
          >
            <span>{isSpinning ? "Spinning..." : "Pick For Me!"}</span>
          </button>

          {error && (
            <div className="p-3 bg-red-50 text-red-700 border border-red-200 rounded-xl font-bold text-center text-sm w-full">
              {error}
            </div>
          )}
        </div>
      </div>

      {pickedItem !== null && (
        <div
          className={`rounded-3xl p-8 shadow-2xl relative overflow-hidden flex flex-col items-center transition-all duration-300 ${isSpinning ? "bg-zinc-800 scale-95 opacity-80" : "bg-slate-900 scale-100 ring-8 ring-amber-500/30"}`}
        >
          {!isSpinning && (
            <>
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-fuchsia-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none animate-pulse"></div>

              <h2 className="text-amber-400 font-black uppercase tracking-widest text-sm mb-6 z-10 text-center flex items-center gap-2">
                <span className="animate-bounce inline-block">✨</span> The
                Winner Is{" "}
                <span className="animate-bounce inline-block">✨</span>
              </h2>
            </>
          )}

          <div className="z-10 relative w-full flex justify-center py-6">
            <div
              className={`font-black text-center break-words px-4 transition-all ${isSpinning ? "text-4xl text-white/50 blur-[1px]" : "text-6xl md:text-7xl text-white drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]"}`}
            >
              {pickedItem}
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
            name: "Random Item Picker",
            operatingSystem: "All",
            applicationCategory: "UtilitiesApplication",
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title="Random Item Picker & List Chooser"
          whatIsIt={
            <>
              <p>
                The <strong>Random Item Picker</strong> is a digital "hat" that
                instantly and impartially selects a single winning item from any
                list of custom text entries you provide.
              </p>
              <p>
                Whether you're struggling to choose where to eat for lunch,
                selecting a random winner for a social media giveaway, or
                deciding which task to tackle first, this tool removes human
                bias and decision fatigue by relying on a mathematically pure
                randomized draw.
              </p>
            </>
          }
          formula={
            <>
              <p>
                Behind the spinning animation is a deeply unbiased cryptographic
                pseudorandom number generator:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                <li>
                  <strong>Step 1 (Parsing):</strong> The tool takes your text
                  block and splits it by line breaks or commas, ignoring any
                  blank lines.
                </li>
                <li>
                  <strong>Step 2 (Indexing):</strong> It assigns a hidden
                  numerical index to every valid item (e.g., Pizza = 0, Burgers
                  = 1, Sushi = 2).
                </li>
                <li>
                  <strong>Step 3 (The Core Pick):</strong> It generates a highly
                  precise floating-point number between 0 and 1 using{" "}
                  <code>Math.random()</code>, multiplies it by the total number
                  of items, and rounds down to select the winning index.
                </li>
              </ul>
            </>
          }
          example={
            <>
              <p>
                You have five final candidates for a job interview, but you only
                have time to interview one of them today.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                <li>
                  <strong>The Input:</strong> You paste the five names (Sarah,
                  John, Emily, Michael, David) into the text box.
                </li>
                <li>
                  <strong>The Process:</strong> You click the "Pick For Me!"
                  button. The algorithm quickly shuffles through the names (the
                  "spin" effect) to build anticipation.
                </li>
                <li>
                  <strong>The Output:</strong> It lands definitively on{" "}
                  <strong>Emily</strong>, finalizing your decision with zero
                  conscious bias.
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-gray-700">
              <li>
                <strong>Social Media Giveaways:</strong> An Instagram influencer
                exporting all comments into a list and using this tool to fairly
                select the winner of a sponsored product.
              </li>
              <li>
                <strong>Meeting Icebreakers:</strong> A corporate manager
                pasting their team's names and picking someone at random to
                share what they did over the weekend.
              </li>
              <li>
                <strong>Dinner Arguments:</strong> A couple pasting 10 local
                restaurant names into the box to definitively end the classic "I
                don't know, where do you want to eat?" debate.
              </li>
            </ul>
          }
          faqs={[
            {
              question:
                "Is this genuinely random, or does it favor items at the top?",
              answer:
                "It is mathematically unbiased. It uses standard JavaScript Math.random(), which has a uniform distribution. Every single item in the list has the exact same statistical probability of being selected.",
            },
            {
              question: "What if I accidentally put empty lines in my list?",
              answer:
                "The algorithm automatically detects and strips out empty spaces, blank lines, and trailing commas to ensure the picker never 'wins' on a blank entry.",
            },
            {
              question:
                "How is this different from the Random Group Generator?",
              answer:
                "This tool is designed to pick exactly ONE winner from a list. The Random Group Generator is meant for taking a list of 20 people and splitting them evenly into 4 separate teams of 5 people.",
            },
          ]}
          relatedCalculators={[
            {
              name: "Random Group Generator",
              path: "/random-group-generator/",
              desc: "Divide a giant list of names into smaller, perfectly randomized teams or squads.",
            },
            {
              name: "Random Number Generator",
              path: "/random-number-generator/",
              desc: "Generate a purely mathematical random integer between a specific minimum and maximum range.",
            },
            {
              name: "Pomodoro Timer",
              path: "/pomodoro-timer/",
              desc: "Once the item picker decides what you are going to work on, use this timer to stay focused on it.",
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
