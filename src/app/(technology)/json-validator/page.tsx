"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function JsonValidator() {
  const [jsonInput, setJsonInput] = useState(
    '{\n  "property": "value",\n  "array": [1, 2, 3]\n}',
  );
  const [result, setResult] = useState<{
    isValid: boolean;
    parsed: string | null;
    error: string | null;
  } | null>(null);

  const validateJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      const formatted = JSON.stringify(parsed, null, 4);
      setResult({ isValid: true, parsed: formatted, error: null });
    } catch (e: any) {
      setResult({ isValid: false, parsed: null, error: e.message });
    }
  };

  const reformatJson = () => {
    validateJson();
    if (result?.isValid && result.parsed) {
      setJsonInput(result.parsed);
    }
  };

  const clearInput = () => {
    setJsonInput("");
    setResult(null);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-emerald-900 flex items-center justify-center font-mono">
          <span className="mr-3">&#123; &#125;</span> JSON Validator
        </h1>
        <p className="text-emerald-700 text-lg max-w-2xl mx-auto">
          Instantly validate, format, and debug JSON data structures.
        </p>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-zinc-200 mb-8 mx-auto flex flex-col h-full">
        <div className="flex justify-between items-center mb-4">
          <label className="block text-sm font-bold text-zinc-700 uppercase tracking-wide">
            Enter JSON String
          </label>
          <div className="flex gap-2">
            <button
              onClick={clearInput}
              className="px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-600 text-xs font-bold uppercase tracking-widest rounded transition-colors"
            >
              Clear
            </button>
            <button
              onClick={reformatJson}
              className="px-3 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-widest rounded transition-colors"
            >
              Format Output
            </button>
          </div>
        </div>

        <textarea
          value={jsonInput}
          onChange={(e) => {
            setJsonInput(e.target.value);
            setResult(null); // Reset result on change
          }}
          className="w-full flex-1 min-h-[400px] bg-zinc-900 text-emerald-300 rounded-xl border-zinc-300 shadow-sm p-4 border focus:bg-zinc-950 focus:border-emerald-500 font-medium font-mono text-lg transition-all outline-none resize-y"
          placeholder="Paste your JSON here..."
          spellCheck="false"
        />

        <div className="mt-6 flex justify-center">
          <button
            onClick={validateJson}
            className="w-full md:w-auto md:min-w-[300px] bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 px-8 rounded-xl transition-colors shadow-lg shadow-emerald-600/30 uppercase tracking-widest text-lg"
          >
            Validate JSON
          </button>
        </div>
      </div>

      {result !== null && (
        <div
          className={`rounded-2xl p-6 md:p-10 shadow-lg relative overflow-hidden flex flex-col ${result.isValid ? "bg-emerald-50 border-2 border-emerald-500" : "bg-red-50 border-2 border-red-500"}`}
        >
          <div className="flex items-start gap-6">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center font-black text-3xl shadow-inner shrink-0 ${result.isValid ? "bg-emerald-200 text-emerald-600" : "bg-red-200 text-red-600"}`}
            >
              {result.isValid ? "✓" : "✗"}
            </div>

            <div className="flex-1">
              <h2
                className={`font-black uppercase tracking-widest text-2xl mb-2 ${result.isValid ? "text-emerald-700" : "text-red-700"}`}
              >
                {result.isValid ? "Valid JSON" : "Invalid JSON"}
              </h2>

              {!result.isValid && result.error && (
                <div className="bg-red-100 p-4 rounded-xl border border-red-200 mt-4">
                  <span className="text-red-500 text-[10px] uppercase font-bold tracking-widest block mb-1">
                    Error Message
                  </span>
                  <div className="font-mono text-red-800 font-bold">
                    {result.error}
                  </div>
                </div>
              )}

              {result.isValid && (
                <p className="text-emerald-600 font-medium">
                  The provided string is well-formed JSON. Use the "Format
                  Output" button above to pretty-print it.
                </p>
              )}
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
            name: "JSON Validator",
            operatingSystem: "All",
            applicationCategory: "DeveloperApplication",
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title="JSON Validator & Formatter"
          whatIsIt={
            <>
              <p>
                The <strong>JSON Validator</strong> instantly checks your JSON
                (JavaScript Object Notation) strings for structural errors,
                missing commas, and unmatched brackets, while also allowing you
                to format (pretty-print) the data into a highly readable
                structure.
              </p>
              <p>
                JSON is the universal language of the web. It is how almost
                every modern website, mobile app, and database sends data back
                and forth. A single missing quote mark in a 10,000-line JSON
                file can completely crash an application.
              </p>
            </>
          }
          formula={
          <>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 font-mono text-lg text-indigo-700 text-center shadow-sm my-6">
              Json Validator Analysis Model
            </div>
            <p className="text-sm text-slate-500 text-center">
              This tool utilize standardized mathematical formulas and logic to calculate precise Json Validator results.
            </p>
          </>
        }
          example={
            <>
              <p>
                You receive an API response that is failing to load on your
                website. The raw data looks like this:{" "}
                <strong>{`{ id: 101, name: 'John Doe', inactive: False, }`}</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                <li>
                  <strong>Error 1 (Keys):</strong> The keys <code>id</code>,{" "}
                  <code>name</code>, and <code>inactive</code> are missing
                  double quotes.
                </li>
                <li>
                  <strong>Error 2 (Strings):</strong> The string{" "}
                  <code>'John Doe'</code> uses single quotes instead of double.
                </li>
                <li>
                  <strong>Error 3 (Booleans):</strong> Depending on the parser,{" "}
                  <code>False</code> should usually be lowercase{" "}
                  <code>false</code>.
                </li>
                <li>
                  <strong>Error 4 (Trailing Comma):</strong> The comma after{" "}
                  <code>False,</code> is invalid because there are no more items
                  following it.
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-gray-700">
              <li>
                <strong>API Debugging:</strong> Developers testing a new backend
                server connection use this tool to verify the server is
                outputting perfect JSON before attempting to parse it in their
                frontend app.
              </li>
              <li>
                <strong>Configuration Files:</strong> Many massive software
                applications (like VS Code or Docker) use JSON for configuration
                settings. A validator ensures you haven't broken the syntax
                before saving the file.
              </li>
              <li>
                <strong>Data Extraction:</strong> Analysts pasting a massive
                wall of squished, minified JSON text can use the "Format Output"
                feature to instantly expand it into thousands of readable,
                indented lines.
              </li>
            </ul>
          }
          faqs={[
            {
              question:
                "Why does JSON use double quotes instead of single quotes?",
              answer:
                "It is simply the strict standard defined by Douglas Crockford when creating JSON. While Javascript allows single quotes for objects, JSON was designed to be language-independent, and adhering strictly to double quotes ensures it can be parsed universally by Python, Java, PHP, etc.",
            },
            {
              question: "What is 'Minified' JSON?",
              answer:
                "Minified JSON has all spaces, tabs, and line breaks removed to make the file size as small as mathematically possible for faster internet transmission. Our tool can un-minify (format) it back into readable text.",
            },
            {
              question: "Can JSON handle Date objects or functions?",
              answer:
                "No. JSON is strictly for storing raw data (Strings, Numbers, Booleans, Arrays, Objects, and Null). It cannot store executable code, functions, or native Date objects (dates must be converted to standard text strings).",
            },
          ]}
          relatedCalculators={[
            {
              name: "JSON to CSV Converter",
              path: "/json-to-csv/",
              desc: "Convert your validated JSON arrays directly into Excel-ready CSV sheets.",
            },
            {
              name: "Regex Tester",
              path: "/regex-tester/",
              desc: "Extract specific string patterns from inside massive JSON files.",
            },
            {
              name: "Diff Checker",
              path: "/diff-checker/",
              desc: "Compare two JSON payloads to see exactly what API data changed.",
            },
            {
              name: "Bandwidth Calculator",
              path: "/bandwidth-calculator/",
              desc: "Calculate download and upload times for various data sizes.",
            }]}
        />
      </div>
    </div>
  );
}
