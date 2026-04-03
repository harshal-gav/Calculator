"use client";

import { useState, useEffect } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function OnlineNotepad() {
  const [text, setText] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [saveStatus, setSaveStatus] = useState("Saved to browser");

  // Load from local storage on mount
  useEffect(() => {
    const savedText = localStorage.getItem("onlineNotepadContent");
    if (savedText) {
      setText(savedText);
    }
    setIsLoaded(true);
  }, []);

  // Save to local storage whenever text changes
  useEffect(() => {
    if (!isLoaded) return;

    setSaveStatus("Saving...");
    const timeout = setTimeout(() => {
      localStorage.setItem("onlineNotepadContent", text);
      setSaveStatus("Saved locally ✓");
    }, 500);

    return () => clearTimeout(timeout);
  }, [text, isLoaded]);

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setSaveStatus("Copied ✓");
    setTimeout(() => setSaveStatus("Saved locally ✓"), 2000);
  };

  const handleDownload = () => {
    if (!text) return;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "notepad-export.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    if (
      confirm("Are you sure you want to clear all text? This cannot be undone.")
    ) {
      setText("");
      localStorage.removeItem("onlineNotepadContent");
    }
  };

  const charCount = text.length;
  const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const lineCount = text === "" ? 0 : text.split(/\r\n|\r|\n/).length;

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 flex items-center">
            <svg
              className="w-8 h-8 mr-3 text-sky-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Online Notepad
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            A simple, auto-saving workspace for your thoughts.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-full border border-emerald-100 flex items-center mr-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
            {saveStatus}
          </span>
          <button
            onClick={handleCopy}
            title="Copy to Clipboard"
            className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center shadow-sm"
          >
            Copy
          </button>
          <button
            onClick={handleDownload}
            title="Download as .txt"
            className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center shadow-sm"
          >
            Download
          </button>
          <button
            onClick={handleClear}
            title="Clear all text"
            className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-100 px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center shadow-sm"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col h-[70vh] min-h-[500px]">
        {/* Editor Area */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-grow w-full h-full p-6 md:p-8 bg-transparent resize-none outline-none font-sans text-lg text-slate-800 leading-relaxed placeholder-slate-300"
          placeholder="Start typing your notes here..."
          spellCheck="false"
        />

        {/* Status Bar */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex justify-between items-center text-xs font-bold text-slate-500 uppercase tracking-widest">
          <div className="flex space-x-6">
            <span>{wordCount} Words</span>
            <span>{charCount} Characters</span>
            <span className="hidden sm:inline">{lineCount} Lines</span>
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Free Online Notepad",
            operatingSystem: "All",
            applicationCategory: "UtilitiesApplication",
          }),
        }}
      />

      <div className="mt-12">
        <CalculatorSEO
          title="Distraction-Free Online Notepad"
          whatIsIt={
            <>
              <p>
                The <strong>Online Notepad</strong> is a fast, web-based text
                editor designed for quick writing, temporary syntax pasting, and
                distraction-free drafting.
              </p>
              <p>
                Unlike heavy word processors, this tool loads instantly directly
                in your browser. It behaves exactly like standard desktop
                Notepad applications but adds the crucial fail-safe of
                automatically saving every keystroke immediately into your
                browser's local storage.
              </p>
            </>
          }
          formula={
          <>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 font-mono text-lg text-indigo-700 text-center shadow-sm my-6">
              Online Notepad Analysis Model
            </div>
            <p className="text-sm text-slate-500 text-center">
              This tool utilize standardized mathematical formulas and logic to calculate precise Online Notepad results.
            </p>
          </>
        }
          example={
            <>
              <p>
                <strong>Scenario: The Temporary Clipboard</strong>
              </p>
              <p>
                You are moving data between two spreadsheets and need to strip
                out all complex formatting (hyperlinks, bolded text, embedded
                images).
              </p>
              <p>
                By pasting your rich text into this Online Notepad, it acts as a
                "Plain Text" filter. When you copy it back out, all hidden HTML
                and rich-text markup is permanently scrubbed, leaving you with
                entirely clean ASCII/UTF-8 characters.
              </p>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-gray-700">
              <li>
                <strong>To-Do Lists:</strong> Keeping a tab pinned throughout
                the workday to quickly jot down phone numbers, confirmation
                codes, and meeting notes without opening a heavy word processor.
              </li>
              <li>
                <strong>Formatting Scrub:</strong> Developers copying text from
                PDF documents and pasting it here to strip away unpredictable
                line-breaks and rich formatting artifacts.
              </li>
              <li>
                <strong>Drafting Emails:</strong> Writing out high-stakes emails
                or social media posts in this neutral environment to prevent
                accidentally hitting 'Send' or 'Tweet' prematurely.
              </li>
            </ul>
          }
          faqs={[
            {
              question: "Are my notes private?",
              answer:
                "Yes, entirely private. We do not have a backend database for this tool. Everything you type remains locally on your machine within your browser's cache data.",
            },
            {
              question: "If I clear my browser history, will I lose my notes?",
              answer:
                "Yes. The notepad relies on browser 'Local Storage'. If you run a deep system cleaner or manually clear your browser's website data and cookies, the saved text will be erased. Use the 'Download' button to permanently save.",
            },
            {
              question: "Can I format text (Bold, Italics, Colors)?",
              answer:
                "No, this tool acts as a strict plain-text (TXT) editor. If you specifically need formatting, headers, or bullet points, use our more advanced Markdown Editor instead.",
            },
          ]}
          relatedCalculators={[
            {
              name: "Markdown Editor",
              path: "/markdown-editor/",
              desc: "A robust editor allowing for headers, bold text, links, and HTML exports.",
            },
            {
              name: "Word Count Calculator",
              path: "/word-count-calculator/",
              desc: "Analyze massive text documents for reading time, keyword density, and syllable counts.",
            },
            {
              name: "Text Case Converter",
              path: "/case-converter/",
              desc: "Instantly transform your notes between UPPERCASE, lowercase, and Title Case.",
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
