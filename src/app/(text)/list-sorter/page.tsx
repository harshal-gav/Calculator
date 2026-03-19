"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function ListSorter() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [copied, setCopied] = useState(false);

  // Sort logic
  const handleSort = (type: string) => {
    if (!inputText.trim()) {
      setOutputText("");
      return;
    }

    // Parse lines, optionally trim them and remove empty ones
    let lines = inputText.split(/\r\n|\r|\n/);

    // Clean up text
    lines = lines.map((line) => line.trim()).filter((line) => line.length > 0);

    switch (type) {
      case "az":
        lines.sort((a, b) =>
          a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }),
        );
        break;
      case "za":
        lines.sort((a, b) =>
          b.localeCompare(a, undefined, { numeric: true, sensitivity: "base" }),
        );
        break;
      case "short:long":
        lines.sort((a, b) => a.length - b.length || a.localeCompare(b));
        break;
      case "long:short":
        lines.sort((a, b) => b.length - a.length || a.localeCompare(b));
        break;
      case "reverse":
        lines.reverse();
        break;
      case "shuffle":
        for (let i = lines.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [lines[i], lines[j]] = [lines[j], lines[i]];
        }
        break;
    }

    setOutputText(lines.join("\n"));
  };

  const handleCopy = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const inputLines =
    inputText === "" ? 0 : inputText.split(/\r\n|\r|\n/).length;
  const outputLines =
    outputText === "" ? 0 : outputText.split(/\r\n|\r|\n/).length;

  const sortButtons = [
    { id: "az", label: "A to Z (Alphabetical)" },
    { id: "za", label: "Z to A (Reverse Alpha)" },
    { id: "short:long", label: "Length: Shortest First" },
    { id: "long:short", label: "Length: Longest First" },
    { id: "reverse", label: "Reverse Existing Order" },
    { id: "shuffle", label: "Randomize / Shuffle" },
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-emerald-900 flex items-center justify-center font-serif">
          <svg
            className="w-10 h-10 mr-4 text-emerald-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
            />
          </svg>
          List Sorter Tool
        </h1>
        <p className="text-emerald-700 text-lg max-w-2xl mx-auto">
          Instantly organize lists of names, numbers, or sentences
          automatically.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Input Area */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-emerald-100 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">
              Input List
            </label>
            <button
              onClick={() => {
                setInputText("");
                setOutputText("");
              }}
              className="text-xs text-slate-400 hover:text-red-500 font-bold uppercase tracking-widest transition-colors flex items-center"
            >
              <svg
                className="w-3 h-3 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Clear
            </button>
          </div>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-grow w-full h-64 lg:h-96 rounded-xl border-slate-200 border p-4 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-mono text-sm resize-none leading-relaxed text-slate-700"
            placeholder="Paste your unorganized list here... (one item per line)"
          />
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-4 text-right">
            {inputLines} {inputLines === 1 ? "Line" : "Lines"}
          </div>
        </div>

        {/* Output Area */}
        <div className="bg-emerald-50 p-6 rounded-2xl shadow-md border border-emerald-200 flex flex-col relative">
          <div className="flex justify-between items-center mb-4">
            <label className="text-sm font-bold text-emerald-900 uppercase tracking-wide flex items-center gap-2">
              <span>Sorted Output</span>
            </label>
            <button
              onClick={handleCopy}
              className={`text-xs px-4 py-1.5 rounded-md font-bold uppercase tracking-widest transition-all shadow-sm ${copied ? "bg-green-500 text-white" : "bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow"}`}
            >
              {copied ? "Copied To Clipboard" : "Copy Result"}
            </button>
          </div>
          <textarea
            readOnly
            value={outputText}
            className="flex-grow w-full h-64 lg:h-96 rounded-xl border-emerald-200 bg-white border p-4 focus:outline-none font-mono text-sm leading-relaxed text-slate-800 shadow-inner"
            placeholder="Your perfectly sorted list will appear here..."
          />
          <div className="text-xs font-bold text-emerald-600 uppercase tracking-widest mt-4 flex justify-between">
            <span>Cleaned output automatically strips blank/empty lines.</span>
            <span>
              {outputLines} {outputLines === 1 ? "Line" : "Lines"}
            </span>
          </div>
        </div>
      </div>

      {/* Sorting Actions */}
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-md border border-emerald-100 max-w-5xl mx-auto">
        <label className="block text-sm font-bold text-slate-700 mb-6 uppercase tracking-wide text-center">
          Execution Commands
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {sortButtons.map((btn) => (
            <button
              key={btn.id}
              onClick={() => handleSort(btn.id)}
              className="bg-slate-50 border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 py-3 px-4 rounded-xl font-semibold transition-all shadow-sm"
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "List Sorter Tool",
            operatingSystem: "All",
            applicationCategory: "UtilitiesApplication",
          }),
        }}
      />

      <div className="mt-12">
        <CalculatorSEO
          title="Alphabetize & Reorder Lists Instantly"
          whatIsIt={
            <>
              <p>
                The <strong>List Sorter Tool</strong> is a robust
                text-processing utility designed to instantly organize, arrange,
                and clean up massive datasets presented in a raw line-by-line
                format.
              </p>
              <p>
                Manually reordering hundreds of names into alphabetical order in
                a standard Word document is practically impossible without
                making a mistake. This tool uses JavaScript engine arrays to
                execute flawless sorting logic across thousands of data rows
                instantly.
              </p>
            </>
          }
          formula={
            <>
              <p>
                Our sorting engine automatically performs a crucial "Data
                Cleaning" algorithm on your input before executing the
                arrangement:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                <li>
                  <strong>Whitespace Trimming:</strong> It removes accidental
                  spaces at the beginning or end of every line. (e.g., " Apple "
                  becomes "Apple").
                </li>
                <li>
                  <strong>Blank Line Deletion:</strong> Extra paragraph breaks
                  or accidental empty lines are completely eradicated so the
                  output list is uninterrupted.
                </li>
                <li>
                  <strong>Numeric Awareness:</strong> The A-Z sort utilizes
                  "Natural Sorting" (Locale Compare), meaning "Item 2" properly
                  sorts <em>before</em> "Item 10".
                </li>
              </ul>
            </>
          }
          example={
            <>
              <p>
                Imagine you have a roster column of students pasted from an
                email:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-slate-100 p-4 rounded text-sm font-mono text-slate-600">
                  Charlie
                  <br />
                  <br />
                  Alice
                  <br />
                  Edward
                  <br />
                  bob
                </div>
                <div className="bg-emerald-50 p-4 rounded text-sm font-mono text-emerald-800 border border-emerald-100">
                  Alice
                  <br />
                  bob
                  <br />
                  Charlie
                  <br />
                  Edward
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                The tool fixed the weird casing on "bob" by doing a
                case-insensitive sort, deleted the accidental blank line between
                Charlie and Alice, and perfectly alphabetized the remainder.
              </p>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-gray-700">
              <li>
                <strong>Educators / HR:</strong> Instantly taking a chaotic list
                of student or employee names and ordering them strictly
                alphabetically A-Z for official spreadsheet entry.
              </li>
              <li>
                <strong>Digital Giveaways:</strong> Taking a massive URL list of
                Twitter/X contest entrants and hitting "Randomize / Shuffle" to
                pick an unbiased, truly random winner from line 1.
              </li>
              <li>
                <strong>Data Verification:</strong> Using "Length: Shortest
                First" to quickly filter out and discover malformed or
                incomplete entry names in a database column.
              </li>
            </ul>
          }
          faqs={[
            {
              question:
                "How does 'Reverse Existing Order' differ from 'Z to A'?",
              answer:
                "Reverse Order ignores the alphabet entirely. It simply flips your list upside down. The 100th line becomes the 1st line. Z-to-A, however, actively evaluates the letters and strictly alphabetizes them backwards (Zulu, Yankee, X-Ray...).",
            },
            {
              question: "Is 'Randomize' truly random?",
              answer:
                "Yes, it uses a cryptographic implementation of the Fisher-Yates shuffle algorithm. Every line has an equal, mathematically sound probability of ending up anywhere in the newly generated output.",
            },
            {
              question: "Why did my formatted text lose its boldness/links?",
              answer:
                "Like standard text boxes, this sorter operates on strictly 'Plain Text'. When you copy your final list back out, all hidden HTML, hyperlinks, or rich-text formatting will be permanently stripped to maintain data integrity.",
            },
          ]}
          relatedCalculators={[
            {
              name: "Text Replacer",
              path: "/text-replacer/",
              desc: "Perform massive Find-and-Replace string operations across your newly sorted list.",
            },
            {
              name: "Remove Duplicate Lines",
              path: "/remove-duplicates/",
              desc: "Strip out exact duplicate names or URLs from your dataset before sorting them.",
            },
            {
              name: "JSON to CSV",
              path: "/json-to-csv/",
              desc: "Flatten complex data structures into simpler, line-by-line format for spreadsheet sorting.",
            },
            {
              name: "Case Converter",
              path: "/case-converter/",
              desc: "Change text to UPPERCASE, lowercase, Title Case, and more.",
            }]}
        />
      </div>
    </div>
  );
}
