"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function CaseConverter() {
  const [inputText, setInputText] = useState("");
  const [activeCase, setActiveCase] = useState("sentence");
  const [copied, setCopied] = useState(false);

  // Case Conversion Logic
  const convertToSentenceCase = (text: string) => {
    return text
      .toLowerCase()
      .replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
  };

  const convertToTitleCase = (text: string) => {
    const smallWords =
      /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|v.?|vs.?|via)$/i;
    return text
      .toLowerCase()
      .split(/[ \t]+/)
      .map((word, index, arr) => {
        if (index !== 0 && index !== arr.length - 1 && word.match(smallWords)) {
          return word;
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
  };

  const convertToCamelCase = (text: string) => {
    return text
      .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
        if (+match === 0) return "";
        return index === 0 ? match.toLowerCase() : match.toUpperCase();
      })
      .replace(/\s+/g, "");
  };

  const convertToPascalCase = (text: string) => {
    return text
      .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match) => {
        if (+match === 0) return "";
        return match.toUpperCase();
      })
      .replace(/\s+/g, "");
  };

  const convertToSnakeCase = (text: string) => {
    return (
      text
        .match(
          /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g,
        )
        ?.map((x) => x.toLowerCase())
        .join("_") || ""
    );
  };

  const convertToKebabCase = (text: string) => {
    return (
      text
        .match(
          /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g,
        )
        ?.map((x) => x.toLowerCase())
        .join("-") || ""
    );
  };

  const convertToAlternatingCase = (text: string) => {
    let result = "";
    for (let i = 0; i < text.length; i++) {
      result += i % 2 === 0 ? text[i].toLowerCase() : text[i].toUpperCase();
    }
    return result;
  };

  let convertedText = inputText;
  switch (activeCase) {
    case "upper":
      convertedText = inputText.toUpperCase();
      break;
    case "lower":
      convertedText = inputText.toLowerCase();
      break;
    case "sentence":
      convertedText = convertToSentenceCase(inputText);
      break;
    case "title":
      convertedText = convertToTitleCase(inputText);
      break;
    case "camel":
      convertedText = convertToCamelCase(inputText);
      break;
    case "pascal":
      convertedText = convertToPascalCase(inputText);
      break;
    case "snake":
      convertedText = convertToSnakeCase(inputText);
      break;
    case "kebab":
      convertedText = convertToKebabCase(inputText);
      break;
    case "alternating":
      convertedText = convertToAlternatingCase(inputText);
      break;
  }

  const handleCopy = () => {
    if (!convertedText) return;
    navigator.clipboard.writeText(convertedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const charCount = inputText.length;
  const wordCount =
    inputText.trim() === "" ? 0 : inputText.trim().split(/\s+/).length;
  const lineCount = inputText === "" ? 0 : inputText.split(/\r\n|\r|\n/).length;

  const caseOptions = [
    { id: "sentence", label: "Sentence case" },
    { id: "lower", label: "lower case" },
    { id: "upper", label: "UPPER CASE" },
    { id: "title", label: "Title Case" },
    { id: "camel", label: "camelCase" },
    { id: "pascal", label: "PascalCase" },
    { id: "snake", label: "snake_case" },
    { id: "kebab", label: "kebab-case" },
    { id: "alternating", label: "aLtErNaTiNg CaSe" },
  ];

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-indigo-900 flex items-center justify-center font-serif">
          <span className="mr-3">Aa</span> Text Case Converter
        </h1>
        <p className="text-indigo-700 text-lg max-w-2xl mx-auto">
          Instantly transform your text between all standard casing styles.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Input Area */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-200 flex flex-col h-full">
          <div className="flex justify-between items-center mb-4">
            <label className="text-sm font-bold text-zinc-700 uppercase tracking-wide">
              Input Text
            </label>
            <button
              onClick={() => setInputText("")}
              className="text-xs text-zinc-500 hover:text-red-500 font-bold uppercase tracking-widest transition-colors"
            >
              Clear
            </button>
          </div>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-grow w-full h-64 lg:h-80 rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-indigo-500 font-mono text-base transition-all outline-none resize-none leading-relaxed"
            placeholder="Type or paste your text here..."
          />
          <div className="flex justify-between items-center mt-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">
            <span>{charCount} Characters</span>
            <span>{wordCount} Words</span>
            <span>{lineCount} Lines</span>
          </div>
        </div>

        {/* Output Area */}
        <div className="bg-indigo-50/50 p-6 rounded-2xl shadow-sm border border-indigo-100 flex flex-col h-full relative">
          <div className="flex justify-between items-center mb-4">
            <label className="text-sm font-bold text-indigo-900 uppercase tracking-wide flex items-center gap-2">
              <span>Output</span>
              <span className="bg-indigo-600 text-white px-2 py-0.5 rounded text-[10px]">
                {caseOptions.find((o) => o.id === activeCase)?.label}
              </span>
            </label>
            <button
              onClick={handleCopy}
              className={`text-xs px-3 py-1 rounded font-bold uppercase tracking-widest transition-all ${copied ? "bg-green-500 text-white" : "bg-indigo-200 text-indigo-800 hover:bg-indigo-300"}`}
            >
              {copied ? "Copied ✓" : "Copy"}
            </button>
          </div>
          <textarea
            readOnly
            value={convertedText}
            className="flex-grow w-full h-64 lg:h-80 rounded-xl border-indigo-200 shadow-inner p-4 border bg-white focus:outline-none font-mono text-base leading-relaxed text-indigo-950"
            placeholder="Converted text will appear here..."
          />
        </div>
      </div>

      {/* Case Controls */}
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-zinc-200 mb-8">
        <label className="block text-sm font-bold text-zinc-700 mb-4 uppercase tracking-wide text-center">
          Select Formatting Style
        </label>
        <div className="flex flex-wrap justify-center gap-3">
          {caseOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setActiveCase(option.id)}
              className={`py-3 px-4 rounded-xl font-bold transition-all shadow-sm border ${activeCase === option.id ? "bg-indigo-600 text-white border-indigo-700 shadow-md transform scale-[1.02]" : "bg-zinc-50 text-zinc-600 border-zinc-200 hover:bg-zinc-100"}`}
            >
              {option.label}
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
            name: "Text Case Converter",
            operatingSystem: "All",
            applicationCategory: "UtilitiesApplication",
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title="Online Text Case Converter Tool"
          whatIsIt={
            <>
              <p>
                The <strong>Text Case Converter</strong> is a free online
                writing and programming tool that instantly transforms large
                blocks of text into various standard capitalization formats.
              </p>
              <p>
                Whether you accidentally left your CAPS LOCK key on, need to
                format a movie title correctly, or are a software developer
                converting string variables into camelCase or snake_case for a
                codebase, this tool completely automates the tedious re-typing
                process.
              </p>
            </>
          }
          formula={
            <>
              <p>
                Our tool uses advanced regular expressions (Regex) to correctly
                identify word boundaries and sentence terminations:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                <li>
                  <strong>Sentence case:</strong> Capitalizes only the first
                  letter of the first word in a sentence, and converts the rest
                  to lowercase.
                </li>
                <li>
                  <strong>Title Case:</strong> Capitalizes the first letter of
                  every word <em>except</em> common prepositions and
                  conjunctions (and, the, of, in).
                </li>
                <li>
                  <strong>Code Cases:</strong> Programmatically strips all
                  spaces and punctuation, capitalizing specific letters
                  depending on standard syntax styles (camelCase, snake_case,
                  PascalCase, kebab-case).
                </li>
              </ul>
            </>
          }
          example={
            <>
              <p>
                Imagine you have the messy text string: "
                <code>the quick brown fox JUMPS over THE lazy dog.</code>"
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                <li>
                  <strong>Sentence:</strong> "The quick brown fox jumps over the
                  lazy dog."
                </li>
                <li>
                  <strong>Title:</strong> "The Quick Brown Fox Jumps Over the
                  Lazy Dog."
                </li>
                <li>
                  <strong>camelCase:</strong>{" "}
                  "theQuickBrownFoxJumpsOverTheLazyDog."
                </li>
                <li>
                  <strong>snake_case:</strong>{" "}
                  "the_quick_brown_fox_jumps_over_the_lazy_dog."
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-gray-700">
              <li>
                <strong>Copywriting & Editing:</strong> Taking a block of text
                sent by a client entirely in UPPERCASE and safely converting it
                back to readable Sentence case for a website layout.
              </li>
              <li>
                <strong>Software Development:</strong> Quickly transforming
                plain English database column names into strict snake_case
                (e.g., "First Name" to "first_name") for SQL compatibility.
              </li>
              <li>
                <strong>Academic Writing:</strong> Assuring that an essay title
                accurately meets the strict "Title Case" APA formatting logic,
                ignoring minor prepositions natively.
              </li>
            </ul>
          }
          faqs={[
            {
              question: "Does Title Case capitalize every single word?",
              answer:
                "No, a proper Title Case algorithm (like the one used here) deliberately skips minor conjunctions, articles, and prepositions that are 3 letters or fewer (like 'a', 'an', 'the', 'but', 'for') unless they are the very first or last word.",
            },
            {
              question:
                "What happens to punctuation when converting to code formats?",
              answer:
                "Formats like camelCase, PascalCase, snake_case, and kebab-case are designed exclusively for programming variables. This tool will aggressively strip out all punctuation and spaces to ensure the output is code-safe.",
            },
            {
              question: "Is there a limit to how much text I can paste?",
              answer:
                "This tool runs entirely locally in your browser using JavaScript. You can paste massive documents with hundreds of thousands of words, and it will process them almost instantly without needing an active internet connection.",
            },
          ]}
          relatedCalculators={[
            {
              name: "Word Count Calculator",
              path: "/word-count-calculator",
              desc: "Get an incredibly detailed breakdown of your characters, words, paragraphs, and reading time.",
            },
            {
              name: "Markdown Editor",
              path: "/markdown-editor",
              desc: "Write and format rich-text HTML documents quickly using simple markdown syntax.",
            },
            {
              name: "Regex Tester",
              path: "/regex-tester",
              desc: "Build and test the complex Regular Expressions often used to natively parse text strings.",
            },
            {
              name: "Remove Duplicates",
              path: "/remove-duplicates",
              desc: "Effortlessly remove duplicate lines or items from your list.",
            }]}
        />
      </div>
    </div>
  );
}
