"use client";

import { useState, useEffect } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function TextReplacer() {
  const [inputText, setInputText] = useState("");
  const [findText, setFindText] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const [outputText, setOutputText] = useState("");

  // Options
  const [matchCase, setMatchCase] = useState(false);
  const [useRegex, setUseRegex] = useState(false);
  const [matchWholeWord, setMatchWholeWord] = useState(false);

  // Status
  const [replacementCount, setReplacementCount] = useState(0);
  const [regexError, setRegexError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!inputText) {
      setOutputText("");
      setReplacementCount(0);
      setRegexError("");
      return;
    }

    if (!findText) {
      setOutputText(inputText);
      setReplacementCount(0);
      setRegexError("");
      return;
    }

    try {
      setRegexError("");
      let searchPattern: RegExp;
      let flags = "g"; // Global replace

      if (!matchCase) {
        flags += "i"; // Case insensitive
      }

      if (useRegex) {
        // If using regex, parse the user's string into a RegExp directly
        searchPattern = new RegExp(findText, flags);
      } else {
        // Escape special regex characters in plain text mode
        const escapedFindText = findText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

        if (matchWholeWord) {
          searchPattern = new RegExp(`\\b${escapedFindText}\\b`, flags);
        } else {
          searchPattern = new RegExp(escapedFindText, flags);
        }
      }

      // Count total matches before replacing
      const matches = inputText.match(searchPattern);
      setReplacementCount(matches ? matches.length : 0);

      // Perform the replacement
      const newText = inputText.replace(searchPattern, replaceText);
      setOutputText(newText);
    } catch (err: any) {
      setRegexError(`Invalid Regular Expression: ${err.message}`);
      setOutputText(inputText);
      setReplacementCount(0);
    }
  }, [inputText, findText, replaceText, matchCase, useRegex, matchWholeWord]);

  const handleCopy = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-rose-900 flex items-center justify-center font-serif">
          <svg
            className="w-10 h-10 mr-4 text-rose-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          Text Find & Replace
        </h1>
        <p className="text-rose-700 text-lg max-w-2xl mx-auto">
          Instantly swap specific words, phrases, or complex regex patterns in
          massive documents.
        </p>
      </div>

      {/* Main Editor Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Input Area */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200 flex flex-col h-full">
          <div className="flex justify-between items-center mb-4">
            <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">
              Original Text
            </label>
            <button
              onClick={() => setInputText("")}
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
            className="flex-grow w-full h-64 lg:h-96 rounded-xl border-slate-200 shadow-sm p-4 border focus:ring-2 focus:ring-rose-500 focus:border-rose-500 font-mono text-sm transition-all outline-none resize-none leading-relaxed text-slate-800"
            placeholder="Paste the text you want to modify here..."
          />
        </div>

        {/* Output Area */}
        <div className="bg-rose-50 p-6 rounded-2xl shadow-md border border-rose-100 flex flex-col h-full relative">
          <div className="flex justify-between items-center mb-4">
            <label className="text-sm font-bold text-rose-900 uppercase tracking-wide flex items-center gap-2">
              <span>Modified Result</span>
              {replacementCount > 0 && (
                <span className="bg-rose-600 text-white px-2 py-0.5 rounded text-[10px] animate-pulse">
                  {replacementCount}{" "},
                  {replacementCount === 1 ? "Replacement" : "Replacements"} Made
                </span>
              )}
            </label>
            <button
              onClick={handleCopy}
              className={`text-xs px-4 py-1.5 rounded-md font-bold uppercase tracking-widest transition-all shadow-sm ${copied ? "bg-green-500 text-white" : "bg-rose-600 text-white hover:bg-rose-700 hover:shadow"}`}
            >
              {copied ? "Copied To Clipboard" : "Copy Result"}
            </button>
          </div>
          <textarea
            readOnly
            value={outputText}
            className="flex-grow w-full h-64 lg:h-96 rounded-xl border-rose-200 bg-white shadow-inner border p-4 focus:outline-none font-mono text-sm leading-relaxed text-slate-800"
            placeholder="Your modified text will appear in real-time here..."
          />
        </div>
      </div>

      {/* Control Panel */}
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-md border border-slate-200 mb-8 max-w-4xl mx-auto mt-[-2rem] relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Find */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">
              Find What:
            </label>
            <input
              type="text"
              value={findText}
              onChange={(e) => setFindText(e.target.value)}
              placeholder={
                useRegex ? "^[A-Z][A-Za-z0-9_-]+$" : "Word or phrase to find..."
              }
              className={`w-full p-3 rounded-lg border focus:ring-2 focus:outline-none font-mono ${regexError ? "border-red-500 focus:ring-red-500" : "border-slate-300 focus:ring-rose-500 focus:border-rose-500"}`}
            />
            {regexError && (
              <p className="text-red-500 text-xs mt-2 font-bold">
                {regexError}
              </p>
            )}
          </div>

          {/* Replace */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">
              Replace With:
            </label>
            <input
              type="text"
              value={replaceText}
              onChange={(e) => setReplaceText(e.target.value)}
              placeholder="Replacement text..."
              className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 focus:outline-none font-mono"
            />
          </div>
        </div>

        {/* Options Toolbar */}
        <div className="mt-6 pt-6 border-t border-slate-100 flex flex-wrap gap-6 justify-center md:justify-start">
          <label className="flex items-center space-x-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={matchCase}
              onChange={(e) => setMatchCase(e.target.checked)}
              className="w-5 h-5 text-rose-600 rounded border-slate-300 focus:ring-rose-500"
            />
            <span className="text-sm font-semibold text-slate-600 group-hover:text-rose-700">
              Match Case (Aa)
            </span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={matchWholeWord}
              onChange={(e) => {
                setMatchWholeWord(e.target.checked);
                if (e.target.checked) setUseRegex(false); // Mutually exclusive for simplicity in standard view
              }}
              disabled={useRegex}
              className="w-5 h-5 text-rose-600 rounded border-slate-300 focus:ring-rose-500 disabled:opacity-50"
            />
            <span
              className={`text-sm font-semibold group-hover:text-rose-700 ${useRegex ? "text-slate-400" : "text-slate-600"}`}
            >
              Whole Word Only
            </span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={useRegex}
              onChange={(e) => {
                setUseRegex(e.target.checked);
                if (e.target.checked) setMatchWholeWord(false);
              }}
              className="w-5 h-5 text-rose-600 rounded border-slate-300 focus:ring-rose-500"
            />
            <span className="text-sm font-semibold text-slate-600 group-hover:text-rose-700">
              Use Regex (.*)
            </span>
          </label>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Text Find & Replace",
            operatingSystem: "All",
            applicationCategory: "UtilitiesApplication",
          }),
        }}
      />

      <div className="mt-12">
        <CalculatorSEO
          title="Real-Time Mass Word string Replacer"
          whatIsIt={
            <>
              <p>
                The <strong>Text Find and Replace</strong> tool is an instant
                client-side string manipulation utility that searches large
                blocks of prose or code and perfectly swaps specific target
                phrases with automated replacements.
              </p>
              <p>
                Unlike standard word processors that require you to click "Find
                Next" a hundred times, this editor executes bulk replacements
                instantly across the entire text array, providing a real-time
                preview of the outcome.
              </p>
            </>
          }
          formula={
          <>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 font-mono text-lg text-indigo-700 text-center shadow-sm my-6">
              Text Replacer Analysis Model
            </div>
            <p className="text-sm text-slate-500 text-center">
              This tool utilize standardized mathematical formulas and logic to calculate precise Text Replacer results.
            </p>
          </>
        }
          example={
            <>
              <p>
                <strong>Scenario: The Company Rebranding</strong>
              </p>
              <p>
                You have a 5,000-word Wikipedia document that refers to the
                company "Facebook". You need to rebrand it to "Meta".
              </p>
              <p>
                You paste the document, type "Facebook" into the Find box, type
                "Meta" into the Replace box, and toggle "Match Case" ON so that
                you don't accidentally replace lower-case references inside URLs
                (like facebook.com/about). The tool instantly states "42
                Replacements Made" and outputs the exact, clean document.
              </p>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-gray-700">
              <li>
                <strong>Legal & Contracts:</strong> Instantly replacing "John
                Doe" with a client's actual name across a massive 20-page NDA or
                legal agreement template.
              </li>
              <li>
                <strong>Database Migration:</strong> Developers utilizing Regex
                strings to dynamically find-and-replace specific SQL syntax
                formats before importing a raw database dump.
              </li>
              <li>
                <strong>Formatting Corrections:</strong> Fixing document-wide
                spelling errors or swapping British English spelling (colour,
                organise) to American English (color, organize) aggressively.
              </li>
            </ul>
          }
          faqs={[
            {
              question: "Can I use advanced Regex capture groups?",
              answer:
                "Yes. In Regex mode, you can use capture groups in your Find string (e.g., '(hello) (world)') and reference them in your Replace string using standard JavaScript notation (e.g., '$2 $1' to reverse them).",
            },
            {
              question:
                "Why did my text change instantly as I was still typing?",
              answer:
                "This is a real-time 'live' replacer. It executes the replacement engine on every single keystroke. This allows you to immediately see if your Find string is too broad and accidentally destroying unintended words.",
            },
            {
              question: "Can it find paragraph breaks or new lines?",
              answer:
                "Yes, you can enable Regex mode and use the standard escape character \\n to target physical line breaks within your document.",
            },
          ]}
          relatedCalculators={[
            {
              name: "List Sorter",
              path: "/list-sorter/",
              desc: "After cleaning your text, automatically organize lists alphabetically or by length.",
            },
            {
              name: "Regex Tester",
              path: "/regex-tester/",
              desc: "Need to build a complex Regular Expression string to use here? Test it safely first.",
            },
            {
              name: "Remove Duplicate Lines",
              path: "/remove-duplicates/",
              desc: "Automatically scan your text and delete entire rows that perfectly duplicate previous ones.",
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
