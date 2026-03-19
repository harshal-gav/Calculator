"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function RemoveDuplicates() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");

  // Options
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [trimWhitespace, setTrimWhitespace] = useState(true);
  const [removeEmptyLines, setRemoveEmptyLines] = useState(true);

  // Status
  const [duplicatesRemoved, setDuplicatesRemoved] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleRemove = () => {
    if (!inputText.trim()) {
      setOutputText("");
      setDuplicatesRemoved(0);
      return;
    }

    let lines = inputText.split(/\r\n|\r|\n/);
    const initialCount = lines.length;

    // Clean lines based on options
    if (trimWhitespace) {
      lines = lines.map((line) => line.trim());
    }

    if (removeEmptyLines) {
      lines = lines.filter((line) => line.length > 0);
    }

    // Remove duplicates using a Set
    let uniqueLines: string[] = [];

    if (caseSensitive) {
      uniqueLines = Array.from(new Set(lines));
    } else {
      const seen = new Set<string>();
      uniqueLines = lines.filter((line) => {
        const lowerLine = line.toLowerCase();
        if (seen.has(lowerLine)) {
          return false;
        }
        seen.add(lowerLine);
        return true;
      });
    }

    setOutputText(uniqueLines.join("\n"));

    // Calculate removed
    // Duplicates removed is total starting lines MINUS number of unique lines
    // However, if we removed empty lines, we should probably just count actual "duplicates" of content.
    let actualDuplicates = 0;
    if (caseSensitive) {
      actualDuplicates = lines.length - new Set(lines).size;
    } else {
      actualDuplicates =
        lines.length - new Set(lines.map((l) => l.toLowerCase())).size;
    }

    setDuplicatesRemoved(actualDuplicates);
  };

  const handleCopy = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInputText("");
    setOutputText("");
    setDuplicatesRemoved(0);
  };

  const inputLines =
    inputText === "" ? 0 : inputText.split(/\r\n|\r|\n/).length;
  const outputLines =
    outputText === "" ? 0 : outputText.split(/\r\n|\r|\n/).length;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-cyan-900 flex items-center justify-center font-serif">
          <svg
            className="w-10 h-10 mr-4 text-cyan-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          Remove Duplicate Lines
        </h1>
        <p className="text-cyan-700 text-lg max-w-2xl mx-auto">
          Instantly clean massive datasets by automatically finding and deleting
          all duplicate rows.
        </p>
      </div>

      {/* Main Editor Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Input Area */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-cyan-100 flex flex-col h-full">
          <div className="flex justify-between items-center mb-4">
            <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">
              Input List
            </label>
            <button
              onClick={handleClear}
              className="text-xs text-slate-400 hover:text-red-500 font-bold uppercase tracking-widest transition-colors flex items-center"
            >
              Clear
            </button>
          </div>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-grow w-full h-64 lg:h-96 rounded-xl border-slate-200 shadow-sm p-4 border focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 font-mono text-sm transition-all outline-none resize-none leading-relaxed text-slate-800"
            placeholder="Paste your messy data containing duplicates here (one item per line)..."
          />
          <div className="mt-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">
            {inputLines} {inputLines === 1 ? "Line" : "Lines"}
          </div>
        </div>

        {/* Output Area */}
        <div className="bg-cyan-50 p-6 rounded-2xl shadow-md border border-cyan-200 flex flex-col h-full relative">
          <div className="flex justify-between items-center mb-4">
            <label className="text-sm font-bold text-cyan-900 uppercase tracking-wide flex items-center gap-2">
              <span>Cleaned Output</span>
              {duplicatesRemoved > 0 && (
                <span className="bg-red-500 text-white px-2 py-0.5 rounded text-[10px] animate-bounce">
                  {duplicatesRemoved}{" "},
                  {duplicatesRemoved === 1 ? "Duplicate" : "Duplicates"}{" "}
                  Deleted!
                </span>
              )}
            </label>
            <button
              onClick={handleCopy}
              className={`text-xs px-4 py-1.5 rounded-md font-bold uppercase tracking-widest transition-all shadow-sm ${copied ? "bg-green-500 text-white" : "bg-cyan-600 text-white hover:bg-cyan-700 hover:shadow"}`}
            >
              {copied ? "Copied To Clipboard" : "Copy Result"}
            </button>
          </div>
          <textarea
            readOnly
            value={outputText}
            className="flex-grow w-full h-64 lg:h-96 rounded-xl border-cyan-200 bg-white shadow-inner border p-4 focus:outline-none font-mono text-sm leading-relaxed text-slate-800"
            placeholder="Your perfectly clean, unique list will appear here..."
          />
          <div className="mt-4 text-xs font-bold text-cyan-600 uppercase tracking-widest text-right">
            {outputLines} Unique {outputLines === 1 ? "Line" : "Lines"}
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-md border border-cyan-100 mb-8 max-w-4xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Options */}
        <div className="flex flex-col space-y-4">
          <label className="flex items-center space-x-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={caseSensitive}
              onChange={(e) => setCaseSensitive(e.target.checked)}
              className="w-5 h-5 text-cyan-600 rounded border-slate-300 focus:ring-cyan-500"
            />
            <span className="text-sm font-semibold text-slate-700 group-hover:text-cyan-700">
              Case Sensitive (Treat 'Apple' & 'apple' as unique)
            </span>
          </label>

          <label className="flex items-center space-x-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={trimWhitespace}
              onChange={(e) => setTrimWhitespace(e.target.checked)}
              className="w-5 h-5 text-cyan-600 rounded border-slate-300 focus:ring-cyan-500"
            />
            <span className="text-sm font-semibold text-slate-700 group-hover:text-cyan-700">
              Trim Whitespace (Highly Recommended)
            </span>
          </label>

          <label className="flex items-center space-x-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={removeEmptyLines}
              onChange={(e) => setRemoveEmptyLines(e.target.checked)}
              className="w-5 h-5 text-cyan-600 rounded border-slate-300 focus:ring-cyan-500"
            />
            <span className="text-sm font-semibold text-slate-700 group-hover:text-cyan-700">
              Delete Blank / Empty Lines
            </span>
          </label>
        </div>

        {/* Execute Button */}
        <button
          onClick={handleRemove}
          className="w-full md:w-auto bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-4 px-10 rounded-xl shadow-lg hover:shadow-xl transition-all uppercase tracking-widest text-sm flex-shrink-0"
        >
          Extract Unique Lines
        </button>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Remove Duplicate Lines",
            operatingSystem: "All",
            applicationCategory: "UtilitiesApplication",
          }),
        }}
      />

      <div className="mt-12">
        <CalculatorSEO
          title="Find and Delete Repeating Data Rows"
          whatIsIt={
            <>
              <p>
                The <strong>Remove Duplicate Lines</strong> tool is an instant
                client-side data cleansing utility. It accepts massive
                copy/pasted lists of information and algorithmically deletes any
                line that is an exact replica of a previous line.
              </p>
              <p>
                Used heavily by email marketers, software developers, and
                database administrators, this tool ensures absolute data purity
                before running a campaign, writing SQL queries, or finalizing a
                spreadsheet.
              </p>
            </>
          }
          formula={
            <>
              <p>
                Our duplication removal executes via a{" "}
                <code>JavaScript Set Object</code> which inherently enforces a
                strict mathematical uniqueness upon your data:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                <li>
                  <strong>The Set Operation:</strong> We pour your 10,000 lines
                  into an array array and then cast it into a <code>Set()</code>{" "}
                  natively in the browser. A Set mathematically rejects any
                  value that already exists within its collection.
                </li>
                <li>
                  <strong>Trimming Intelligence:</strong> A human might type
                  "Apple" and then accidentally type "Apple ". Those are
                  technically completely different strings to a computer.
                  Checking "Trim Whitespace" fixes these invisible human errors
                  before the deduplication process kicks in.
                </li>
                <li>
                  <strong>Preserved Order:</strong> The algorithm securely
                  preserves the very first instance of the line it discovers,
                  and deletes all subsequent clones, maintaining your general
                  list structure.
                </li>
              </ul>
            </>
          }
          example={
            <>
              <p>
                <strong>Scenario: The Cloned Email Database</strong>
              </p>
              <p>
                You export a comma-separated list of sales emails, but because
                some clients purchased 5 items, their email is listed 5 separate
                times on the spreadsheet column.
              </p>
              <p>
                If you copy that 5,000-cell column and paste it here, our tool
                instantly isolates the 1,200 unique customers and cleanly
                deletes the 3,800 redundant rows, preventing you from spamming a
                client 5 times.
              </p>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-gray-700">
              <li>
                <strong>Marketing Departments:</strong> Purging vast `.txt`
                files of customer email addresses or phone numbers to ensure
                absolutely zero double-spending on ad outreach campaigns.
              </li>
              <li>
                <strong>SEO & Webmasters:</strong> Dropping a massive scrape
                sheet of thousands of backlinks or competitors' URLs to
                accurately parse exactly how many unique root domains actually
                exist.
              </li>
              <li>
                <strong>Human Resources:</strong> Combining two separate event
                signup sheets into one central list, utilizing the deduplicator
                to catch those who accidentally registered on both lists.
              </li>
            </ul>
          }
          faqs={[
            {
              question: "What does 'Case Sensitive' actually do?",
              answer:
                "If unchecked, 'John@gmail.com' and 'JOHN@gmail.com' are viewed as identical duplicates, and one gets deleted. If checked, the tool treats them as two completely separate identities and assumes you need to legally keep both.",
            },
            {
              question: "Is there a limit on how big my list can be?",
              answer:
                "Your only limit is your device's RAM memory. Because all calculations are strictly client-side and nothing is sent to a server, modern browsers can natively handle hundreds of thousands of lines instantly.",
            },
            {
              question: "Can it highlight duplicates instead of deleting them?",
              answer:
                "Currently, this tool is designed for pure destruction. Its sole objective is to output a 100% clean, unique string array for immediate administrative use.",
            },
          ]}
          relatedCalculators={[
            {
              name: "List Sorter",
              path: "/list-sorter/",
              desc: "Now that you have uniquely clean rows, organize them perfectly alphabetically A-Z.",
            },
            {
              name: "Text Replacer",
              path: "/text-replacer/",
              desc: "Find any specific remaining anomalies within your un-duplicated dataset and instantly replace them.",
            },
            {
              name: "JSON Validator",
              path: "/json-validator/",
              desc: "If you're converting this duplicate-free list back into a database array, validate your JSON syntax first.",
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
