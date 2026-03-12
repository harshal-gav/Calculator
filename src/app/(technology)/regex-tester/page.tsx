"use client";

import { useState, useMemo } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function RegexTester() {
  const [regexStr, setRegexStr] = useState("[A-Z]\\w+");
  const [flags, setFlags] = useState("g");
  const [testStr, setTestStr] = useState(
    "Hello World! This is a Regex Tester.",
  );

  const result = useMemo(() => {
    if (!regexStr)
      return { matches: [], error: "Please enter a Regular Expression." };

    try {
      const re = new RegExp(regexStr, flags);
      const isGlobal = flags.includes("g");

      if (!testStr) return { matches: [], error: "" };

      if (!isGlobal) {
        const m = re.exec(testStr);
        return { matches: m ? [m] : [], error: "" };
      }

      const matches: RegExpExecArray[] = [];
      let m;
      let infiniteLoopGuard = 0;

      while ((m = re.exec(testStr)) !== null) {
        matches.push(m);
        // Prevent infinite loops with zero-length matches
        if (m.index === re.lastIndex) {
          re.lastIndex++;
        }
        infiniteLoopGuard++;
        if (infiniteLoopGuard > 10000) break; // Guard
      }

      return { matches, error: "" };
    } catch (e: any) {
      return { matches: [], error: e.message || "Invalid Regular Expression" };
    }
  }, [regexStr, flags, testStr]);

  // Highlighting matches
  const highlightedText = useMemo(() => {
    if (result.error || result.matches.length === 0 || !testStr) {
      return testStr || " ";
    }

    const elements = [];
    let lastIndex = 0;

    // Since it's global, we can slice linearly
    // For non-global, matches length is 1 at most
    result.matches.forEach((m, idx) => {
      const matchStr = m[0];
      const start = m.index;
      const end = start + matchStr.length;

      if (start > lastIndex) {
        elements.push(
          <span key={`text-${idx}`}>
            {testStr.substring(lastIndex, start)}
          </span>,
        );
      }

      elements.push(
        <span
          key={`match-${idx}`}
          className="bg-sky-300 text-sky-900 font-bold rounded px-0.5"
        >
          {matchStr}
        </span>,
      );

      lastIndex = end;
    });

    if (lastIndex < testStr.length) {
      elements.push(<span key="text-end">{testStr.substring(lastIndex)}</span>);
    }

    return elements;
  }, [testStr, result]);

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-sky-900 flex items-center justify-center font-mono">
          <span className="mr-3">/</span> Regex Tester
        </h1>
        <p className="text-sky-700 text-lg max-w-2xl mx-auto">
          Write, test, and debug your Regular Expressions in real-time.
        </p>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-zinc-200 mb-8 max-w-4xl mx-auto">
        {/* Regex Input Row */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">
              Regular Expression
            </label>
            <div className="flex items-center bg-zinc-100 rounded-xl overflow-hidden border border-zinc-300 focus-within:border-sky-500 transition-colors shadow-sm">
              <span className="px-4 text-zinc-400 font-bold text-xl font-mono">
                /
              </span>
              <input
                type="text"
                value={regexStr}
                onChange={(e) => setRegexStr(e.target.value)}
                className="w-full bg-transparent p-4 font-bold font-mono text-xl text-sky-900 outline-none"
                placeholder="pattern"
              />
              <span className="px-4 text-zinc-400 font-bold text-xl font-mono">
                /
              </span>
            </div>
          </div>

          <div className="md:w-32">
            <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">
              Flags
            </label>
            <input
              type="text"
              value={flags}
              onChange={(e) => setFlags(e.target.value)}
              className="w-full rounded-xl bg-zinc-100 border-zinc-300 shadow-sm p-4 border focus:border-sky-500 font-bold font-mono text-xl text-zinc-700 outline-none"
              placeholder="gmi"
            />
          </div>
        </div>

        {/* Error Banner */}
        {result.error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl font-bold font-mono text-sm">
            {result.error}
          </div>
        )}

        {/* Test String Input */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-4">
          <div className="flex flex-col h-full">
            <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">
              Test String
            </label>
            <textarea
              value={testStr}
              onChange={(e) => setTestStr(e.target.value)}
              className="w-full flex-1 min-h-[200px] rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-sky-500 font-medium font-mono text-lg transition-all outline-none resize-y leading-relaxed"
              placeholder="Type test strings here..."
            />
          </div>

          <div className="flex flex-col h-full">
            <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide flex justify-between">
              <span>Match Preview</span>
              <span className="text-sky-600 bg-sky-100 px-2 py-0.5 rounded-full text-xs">
                {result.matches.length} matches
              </span>
            </label>
            <div className="w-full flex-1 min-h-[200px] rounded-xl border border-zinc-300 bg-zinc-900 shadow-sm p-4 font-medium font-mono text-lg text-white/80 whitespace-pre-wrap break-words leading-relaxed overflow-y-auto">
              {highlightedText}
            </div>
          </div>
        </div>
      </div>

      {/* Detailed matches */}
      {result.matches.length > 0 && (
        <div className="bg-slate-900 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

          <h2 className="text-sky-400 font-bold uppercase tracking-widest text-xs mb-8 z-10 text-center">
            Match Details
          </h2>

          <div className="z-10 relative w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[500px] overflow-y-auto pr-2">
            {result.matches.map((m, idx) => (
              <div
                key={idx}
                className="bg-black/30 border border-white/10 rounded-xl p-4 flex flex-col hover:bg-black/40 transition-colors"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-white/40 font-bold text-xs uppercase tracking-widest">
                    Match #{idx + 1}
                  </span>
                  <span className="bg-sky-900/50 text-sky-300 font-mono text-xs px-2 py-1 rounded border border-sky-500/30">
                    Index: {m.index}
                  </span>
                </div>

                <div className="bg-black/50 p-3 rounded-lg mb-4">
                  <span className="text-white/30 text-[10px] uppercase font-bold mb-1 block">
                    Full Match
                  </span>
                  <div className="font-mono text-sky-400 font-bold text-lg break-all">
                    {m[0]}
                  </div>
                </div>

                {m.length > 1 && (
                  <div className="mt-auto">
                    <span className="text-white/30 text-[10px] uppercase font-bold mb-2 block">
                      Capture Groups
                    </span>
                    <div className="space-y-2">
                      {m.slice(1).map((group, gIdx) => (
                        <div
                          key={gIdx}
                          className="flex flex-col bg-white/5 px-3 py-2 rounded break-all font-mono text-sm leading-snug"
                        >
                          <span className="text-white/50 text-[10px] mb-0.5">
                            Group {gIdx + 1}
                          </span>
                          <span className="text-emerald-300">
                            {group !== undefined ? (
                              group
                            ) : (
                              <span className="text-rose-400 italic">
                                undefined
                              </span>
                            )}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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
            name: "Regex Tester",
            operatingSystem: "All",
            applicationCategory: "DeveloperApplication",
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title="Regular Expression (Regex) Tester & Debugger"
          whatIsIt={
            <>
              <p>
                The <strong>Regex Tester</strong> evaluates and debugs Regular
                Expressions (Regex) in real-time. It highlights exact matches,
                extracts specific capture groups, and identifies syntax errors
                within complex text patterns.
              </p>
              <p>
                Regex is essentially a "supercharged" Find-and-Replace. Instead
                of searching for exactly the word "cat," you can write a Regex
                pattern to find "any 3-letter word starting with c and ending
                with t" or "any valid email address hidden inside a 500-page
                document."
              </p>
            </>
          }
          formula={
            <>
              <p>
                Regex patterns are built using literal characters alongside
                special "Metacharacters" that act as wildcards or quantifiers. A
                standard structure looks like this:
              </p>
              <div className="bg-sky-50 p-4 rounded-lg font-mono text-[14px] shadow-sm my-4 text-sky-900 border border-sky-100 flex flex-col gap-2 center">
                /pattern/flags
              </div>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                <li>
                  <strong>\d or \w:</strong> Wildcards for matching any single
                  Digit (0-9) or any single Word Character (A-Z).
                </li>
                <li>
                  <strong>+ or *:</strong> Quantifiers meaning "match 1 or more"
                  (+) or "match 0 or more" (*).
                </li>
                <li>
                  <strong>[...] or (...):</strong> Square brackets define a
                  character set (match anything inside). Parentheses define a
                  Capture Group (extract this specific part).
                </li>
                <li>
                  <strong>Flags (g, i, m):</strong> Global (find all, not just
                  the first), Ignore Case (case-insensitive), and Multi-line.
                </li>
              </ul>
            </>
          }
          example={
            <>
              <p>
                You need to extract all North American phone numbers from a
                massive block of raw text. You write the pattern:{" "}
                <strong>
                  /\(\d{`{3}`}\) \d{`{3}`}-\d{`{4}`}/g
                </strong>
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                <li>
                  <strong>\( and \):</strong> Match exact literal parenthesis
                  characters by escaping them with a backslash.
                </li>
                <li>
                  <strong>\d{`{3}`}:</strong> Match exactly 3 digits in a row
                  (e.g., the area code).
                </li>
                <li>
                  <strong>[Space] and -:</strong> Match an exact space character
                  and an exact hyphen character.
                </li>
                <li>
                  <strong>/g Flag:</strong> The Global flag ensures the tester
                  sweeps the entire document, highlighting every single phone
                  number, rather than stopping after it finds the very first
                  one.
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-gray-700">
              <li>
                <strong>Form Validation:</strong> Web developers use Regex to
                instantly block users from submitting forms if an email address
                lacks an "@" symbol or if a password doesn't contain a number
                and a special character.
              </li>
              <li>
                <strong>Data Scraping:</strong> Analysts use Regex to scan
                thousands of unformatted HTML pages, instantly extracting highly
                specific data like '$[Price]' tags or ZIP codes.
              </li>
              <li>
                <strong>Log Analysis:</strong> Server admins write Regex scripts
                to instantly parse through gigabytes of raw server error logs,
                isolating and extracting only "CRITICAL" timeout errors from the
                noise.
              </li>
            </ul>
          }
          faqs={[
            {
              question: "Why is my regex matching the entire sentence?",
              answer:
                "You are likely suffering from 'Greedy' quantifiers. A symbol like * or + will match as MUCH text as possible by default. If you add a ? after it (e.g., *?), it becomes 'Lazy' and will stop at the very first valid match.",
            },
            {
              question: "What is a 'Capture Group'?",
              answer:
                "When you wrap part of your pattern in parentheses (like this), the regex engine not only matches the text but actively plucks that specific sub-string out into an isolated array variable so you can easily reference or save it later.",
            },
            {
              question:
                "Do Regex patterns work exactly the same in all coding languages?",
              answer:
                "Mostly, but not entirely. Javascript, Python, PCRE (PHP), and Java all have slightly different 'flavors' of Regex. This tool evaluates Regex natively via JavaScript's V8 engine.",
            },
          ]}
          relatedCalculators={[
            {
              name: "Cron Job Generator",
              path: "/cron-job-generator",
              desc: "Write perfectly formatted server scheduling expressions.",
            },
            {
              name: "JSON Validator",
              path: "/json-validator",
              desc: "Test, format, and debug your JSON data payloads.",
            },
            {
              name: "Random String Generator",
              path: "/random-string-generator",
              desc: "Generate random data to test your complex regex rules against.",
            },
            {
              name: "Bandwidth Calculator",
              path: "/bandwidth-calculator",
              desc: "Calculate download and upload times for various data sizes.",
            }]}
        />
      </div>
    </div>
  );
}
