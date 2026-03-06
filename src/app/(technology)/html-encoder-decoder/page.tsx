"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function HtmlEncoderDecoder() {
  const [inputStr, setInputStr] = useState('<h1>Hello World & "Welcome"!</h1>');
  const [outputStr, setOutputStr] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  // Very simple encode/decode using browser's built-in DOM parsing for accurate representation
  const processHtml = (action: "encode" | "decode") => {
    if (!inputStr) {
      setOutputStr("");
      return;
    }

    if (action === "encode") {
      // Encode: convert reserved characters to entities
      let str = inputStr;
      str = str.replace(/&/g, "&amp;");
      str = str.replace(/</g, "&lt;");
      str = str.replace(/>/g, "&gt;");
      str = str.replace(/"/g, "&quot;");
      str = str.replace(/'/g, "&#39;");
      setOutputStr(str);
    } else {
      // Decode: convert back to standard characters using DOM technique
      const txt = document.createElement("textarea");
      txt.innerHTML = inputStr;
      setOutputStr(txt.value);
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
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-orange-900 flex items-center justify-center font-mono">
          <span className="mr-3">&lt;/&gt;</span> HTML Encoder/Decoder
        </h1>
        <p className="text-orange-700 text-lg max-w-2xl mx-auto">
          Safely encode HTML tags to escape characters, or decode HTML entities
          back to readable text.
        </p>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-zinc-200 mb-8 mx-auto flex flex-col lg:flex-row gap-8">
        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <label className="block text-sm font-bold text-zinc-700 uppercase tracking-wide">
              Input Text
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
            className="w-full flex-1 min-h-[300px] bg-zinc-50 rounded-xl border border-zinc-300 shadow-inner p-4 focus:bg-white focus:border-orange-500 font-medium font-mono text-lg transition-all outline-none resize-y"
            placeholder="Paste text here..."
            spellCheck="false"
          />
        </div>

        <div className="flex flex-col items-center justify-center gap-4 py-4 lg:py-0">
          <button
            onClick={() => {
              setMode("encode");
              processHtml("encode");
            }}
            className="w-full lg:w-32 bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-lg shadow-orange-600/30 uppercase tracking-widest text-sm"
          >
            Encode HTML ➡️
          </button>
          <button
            onClick={() => {
              setMode("decode");
              processHtml("decode");
            }}
            className="w-full lg:w-32 bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-lg shadow-sky-600/30 uppercase tracking-widest text-sm"
          >
            Decode HTML ➡️
          </button>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <label className="block text-sm font-bold text-zinc-700 uppercase tracking-wide">
              Output Text
            </label>
            <button
              onClick={copyToClipboard}
              disabled={!outputStr}
              className="text-xs bg-orange-100 disabled:opacity-50 disabled:cursor-not-allowed px-3 py-1 rounded font-bold uppercase text-orange-800 hover:bg-orange-200"
            >
              Copy Result
            </button>
          </div>
          <textarea
            value={outputStr}
            readOnly
            className="w-full flex-1 min-h-[300px] bg-slate-900 text-orange-300 rounded-xl border border-zinc-300 shadow-inner p-4 focus:bg-slate-800 font-medium font-mono text-lg transition-all outline-none resize-y"
            placeholder="Output will appear here..."
            spellCheck="false"
          />
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "HTML Encoder/Decoder",
            operatingSystem: "All",
            applicationCategory: "DeveloperApplication",
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title="HTML Entity Encoder & Decoder"
          whatIsIt={
            <>
              <p>
                The <strong>HTML Encoder/Decoder</strong> safely converts
                reserved HTML characters (like angle brackets and ampersands)
                into their corresponding safe "Entities", or conversely,
                translates those entities back into readable text.
              </p>
              <p>
                Every web browser relies on characters like <code>&lt;</code>{" "}
                and <code>&gt;</code> to understand where structural tags begin
                and end. If a user tries to type those literal characters into a
                comment box or blog post, the browser will become confused and
                try to execute them as code, ruining the page entirely.
              </p>
            </>
          }
          formula={
            <>
              <p>
                HTML Encoding is essentially a rigorous Find-and-Replace
                operation focusing on these 5 hyper-critical characters:
              </p>
              <div className="bg-orange-50 p-4 rounded-lg font-mono text-[14px] shadow-sm my-4 text-orange-900 border border-orange-100 grid grid-cols-2 gap-2 text-center">
                <div>
                  <span className="font-bold text-lg">&amp;</span> →{" "}
                  <code>&amp;amp;</code>
                </div>
                <div>
                  <span className="font-bold text-lg">&lt;</span> →{" "}
                  <code>&amp;lt;</code>
                </div>
                <div>
                  <span className="font-bold text-lg">&gt;</span> →{" "}
                  <code>&amp;gt;</code>
                </div>
                <div>
                  <span className="font-bold text-lg">"</span> →{" "}
                  <code>&amp;quot;</code>
                </div>
                <div className="col-span-2">
                  <span className="font-bold text-lg">'</span> →{" "}
                  <code>&amp;#39;</code>
                </div>
              </div>
            </>
          }
          example={
            <>
              <p>
                Imagine you are a teacher writing an article on how to code
                Javascript. You want to display this literal sentence on your
                website:
              </p>
              <div className="p-3 bg-zinc-100 rounded my-2 font-mono text-sm">
                Use the &lt;script&gt; tag.
              </div>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                <li>
                  <strong>Without Encoding (Disaster):</strong> The web browser
                  sees <code>&lt;script&gt;</code>, assumes you are trying to
                  execute actual code, hides the word entirely from the screen,
                  and potentially causes a massive security vulnerability.
                </li>
                <li>
                  <strong>With Encoding (Safe):</strong> Using this tool, you
                  encode the sentence into{" "}
                  <code>Use the &amp;lt;script&amp;gt; tag.</code> The browser
                  safely displays the angle brackets to the user without trying
                  to execute them.
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-gray-700">
              <li>
                <strong>Preventing XSS Attacks:</strong> Cross-Site Scripting
                (XSS) is the most common web hack in the world. Encoding
                absolutely all user input forces malicious{" "}
                <code>&lt;script&gt;</code> tags to render as harmless text
                instead of executing in the database.
              </li>
              <li>
                <strong>Writing Documentation:</strong> Developers creating
                tutorials on "How to build a website" must constantly encode
                their examples, otherwise the browser will just render their
                tutorial as a website rather than displaying the raw code.
              </li>
              <li>
                <strong>Data Extraction Validation:</strong> Decoding massive
                XML or HTML payloads scraped from older websites that
                aggressively encoded every single punctuation mark, returning
                them to a readable state.
              </li>
            </ul>
          }
          faqs={[
            {
              question: "What exactly is an 'Entity' in HTML?",
              answer:
                "An entity is safely-formatted text beginning with an ampersand (&) and ending with a semicolon (;). When the browser sees this specific wrapper, it knows to draw a literal symbol on the screen instead of trying to process it as HTML code.",
            },
            {
              question: "Does this tool encode every single character?",
              answer:
                "No. While it is technically possible to encode every letter (turning 'a' into '&#97;'), this calculator specifically targets only the structurally 'dangerous' characters that break HTML rendering.",
            },
            {
              question: "Is HTML Encoding the same as URL Encoding?",
              answer:
                "No. URL Encoding (percent-encoding) is used to safely transmit data across the internet via a web address (turning a space into '%20'). HTML Encoding specifically protects the internal structure of web pages.",
            },
          ]}
          relatedCalculators={[
            {
              name: "URL Encoder/Decoder",
              path: "/url-encoder-decoder",
              desc: "Format unsafe characters specifically for transmission in web browser address bars.",
            },
            {
              name: "Base64 Converter",
              path: "/base64-converter",
              desc: "Completely obfuscate entire files or strings into pure, safe ASCII characters.",
            },
            {
              name: "Regex Tester",
              path: "/regex-tester",
              desc: "Use Regex to search massive documents specifically for un-encoded angle brackets.",
            },
          ]}
        />
      </div>
    </div>
  );
}
