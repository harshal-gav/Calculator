"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function UrlEncoderDecoder() {
  const [inputStr, setInputStr] = useState(
    "https://example.com/search?query=hello world & test=123",
  );
  const [outputStr, setOutputStr] = useState("");
  const [error, setError] = useState("");

  const processUrl = (action: "encode" | "decode") => {
    setError("");
    if (!inputStr) {
      setOutputStr("");
      return;
    }

    try {
      if (action === "encode") {
        setOutputStr(encodeURIComponent(inputStr));
      } else {
        setOutputStr(decodeURIComponent(inputStr));
      }
    } catch (e: any) {
      setError(e.message || "Invalid formatting encountered during decoding.");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputStr).then(() => {
      alert("Copied to clipboard!");
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-pink-900 flex items-center justify-center font-mono">
          <span className="mr-3">🔗</span> URL Encoder/Decoder
        </h1>
        <p className="text-pink-700 text-lg max-w-2xl mx-auto">
          Safely encode URLs to escape special characters, or decode them back
          to standard text.
        </p>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-zinc-200 mb-8 mx-auto flex flex-col lg:flex-row gap-8">
        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <label className="block text-sm font-bold text-zinc-700 uppercase tracking-wide">
              Data Input
            </label>
            <button
              onClick={() => setInputStr("")}
              className="text-xs bg-zinc-100 px-3 py-1 rounded font-bold uppercase text-zinc-600 hover:bg-zinc-200"
            >
              Clear
            </button>
          </div>
          <textarea
            value={inputStr}
            onChange={(e) => setInputStr(e.target.value)}
            className="w-full flex-1 min-h-[300px] bg-zinc-50 rounded-xl border border-zinc-300 shadow-inner p-4 focus:bg-white focus:border-pink-500 font-medium font-mono text-lg transition-all outline-none resize-y break-all"
            placeholder="Paste text or URL here..."
            spellCheck="false"
          />
        </div>

        <div className="flex flex-col items-center justify-center gap-4 py-4 lg:py-0">
          <button
            onClick={() => processUrl("encode")}
            className="w-full lg:w-32 bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-lg shadow-pink-600/30 uppercase tracking-widest text-sm"
          >
            Encode URL ➡️
          </button>
          <button
            onClick={() => processUrl("decode")}
            className="w-full lg:w-32 bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-lg shadow-sky-600/30 uppercase tracking-widest text-sm"
          >
            Decode URL ➡️
          </button>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <label className="block text-sm font-bold text-zinc-700 uppercase tracking-wide">
              Processed Output
            </label>
            <button
              onClick={copyToClipboard}
              disabled={!outputStr}
              className="text-xs bg-pink-100 disabled:opacity-50 disabled:cursor-not-allowed px-3 py-1 rounded font-bold uppercase text-pink-800 hover:bg-pink-200"
            >
              Copy Result
            </button>
          </div>
          {error ? (
            <div className="w-full flex-1 min-h-[300px] bg-red-50 text-red-700 rounded-xl border border-red-200 p-4 font-bold font-mono text-sm">
              {error}
            </div>
          ) : (
            <textarea
              value={outputStr}
              readOnly
              className="w-full flex-1 min-h-[300px] bg-slate-900 text-pink-300 rounded-xl border border-zinc-300 shadow-inner p-4 focus:bg-slate-800 font-medium font-mono text-lg transition-all outline-none resize-y break-all"
              placeholder="Output will appear here..."
              spellCheck="false"
            />
          )}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "URL Encoder/Decoder",
            operatingSystem: "All",
            applicationCategory: "DeveloperApplication",
          }),
        }}
      />

      <CalculatorSEO
        title="URL Encoder/Decoder"
        whatIsIt={
          <p>
            The <strong>URL Encoder/Decoder</strong> is a developer utility
            designed to convert strings into a format that can be safely
            transmitted over the internet. This process, often called percent-encoding,
            replaces unsafe ASCII characters with a "%" followed by two
            hexadecimal digits.
          </p>
        }
        formula={
          <p>
            This tool uses standard JavaScript <code>encodeURIComponent</code> and 
            <code>decodeURIComponent</code> functions which follow the RFC 3986 
            standard for Uniform Resource Identifiers (URI).
          </p>
        }
        example={
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Input:</strong> <code>https://example.com?name=John Doe</code></li>
            <li><strong>Encoded:</strong> <code>https%3A%2F%2Fexample.com%3Fname%3DJohn%20Doe</code></li>
          </ul>
        }
        useCases={
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Form Submission:</strong> Ensuring special characters in form data don't break the URL structure.</li>
            <li><strong>API Requests:</strong> Encoding query parameters to safely pass data to backend services.</li>
            <li><strong>Web Scraping:</strong> Decoding URLs found in HTML to access the actual resource location.</li>
          </ul>
        }
        faqs={[
          {
            question: "Why do I need to encode URLs?",
            answer: "URLs can only contain a limited set of ASCII characters. Special characters like spaces, ampersands, and question marks have specific meanings in a URL and must be encoded if they are part of the data being sent."
          },
          {
            question: "What is percent-encoding?",
            answer: "It is a mechanism for encoding information in a Uniform Resource Identifier (URI) by replacing non-standard characters with a percent sign and their corresponding hexadecimal value."
          },
          {
            question: "Is this the same as Base64?",
            answer: "No. URL encoding is specifically for making characters safe for URLs, while Base64 is a general-purpose binary-to-text encoding scheme."
          }
        ]}
        relatedCalculators={[
          {
            name: "Base64 Converter",
            path: "/base64-converter/",
            desc: "Encode and decode data in Base64 format."
          },
          {
            name: "JSON Validator",
            path: "/json-validator/",
            desc: "Check if your JSON data is valid and well-formatted."
          },
          {
            name: "HTML Encoder/Decoder",
            path: "/html-encoder-decoder/",
            desc: "Convert characters to HTML entities and vice-versa."
          },
          {
            name: "JWT Decoder",
            path: "/jwt-decoder/",
            desc: "Decode JSON Web Tokens to see their payload."
          }
        ]}
      />
    </div>
  );
}
