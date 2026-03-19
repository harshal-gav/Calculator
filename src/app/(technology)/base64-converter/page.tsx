"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function Base64Converter() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleInput = (val: string) => {
    setInput(val);
    setError("");

    if (!val) {
      setOutput("");
      return;
    }

    try {
      if (mode === "encode") {
        // To handle Unicode safely
        const encoded = btoa(unescape(encodeURIComponent(val)));
        setOutput(encoded);
      } else {
        // Decoding
        // First remove any whitespace that might cause DOMException
        const cleaned = val.replace(/\\s/g, "");
        const decoded = decodeURIComponent(escape(atob(cleaned)));
        setOutput(decoded);
      }
    } catch (err: any) {
      setOutput("");
      setError(
        mode === "encode"
          ? "Error encoding to Base64."
          : "Invalid Base64 string. Please ensure it is correctly formatted.",
      );
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const switchMode = (newMode: "encode" | "decode") => {
    setMode(newMode);
    setInput(output);
    if (output) {
      // Trigger recalculation with the swapped input
      try {
        if (newMode === "encode") {
          setOutput(btoa(unescape(encodeURIComponent(output))));
        } else {
          const cleaned = output.replace(/\\s/g, "");
          setOutput(decodeURIComponent(escape(atob(cleaned))));
        }
        setError("");
      } catch (err) {
        setOutput("");
        setError("Conversion error during swap.");
      }
    } else {
      setOutput("");
      setError("");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-900 rounded-xl shadow-2xl border border-zinc-800 text-zinc-100">
      <h1 className="text-4xl font-extrabold mb-4 text-sky-400 border-b border-zinc-800 pb-4 flex items-center">
        <span className="mr-3">⚙️</span> Base64 Encoder / Decoder
      </h1>
      <p className="mb-8 text-zinc-400 text-lg">
        Quickly encode text to Base64 format, or decode Base64 strings back into
        readable text. Local execution for privacy.
      </p>

      <div className="flex bg-zinc-800 rounded-xl p-1 mb-8">
        <button
          onClick={() => switchMode("encode")}
          className={`flex-1 py-3 px-6 rounded-lg font-bold transition-all ${mode === "encode" ? "bg-sky-500 text-white shadow-md" : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700/50"}`}
        >
          Encode to Base64
        </button>
        <button
          onClick={() => switchMode("decode")}
          className={`flex-1 py-3 px-6 rounded-lg font-bold transition-all ${mode === "decode" ? "bg-indigo-500 text-white shadow-md" : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700/50"}`}
        >
          Decode from Base64
        </button>
      </div>

      <div className="space-y-6">
        {/* Input Area */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-bold text-zinc-400 uppercase tracking-widest">
              {mode === "encode" ? "Plain Text Input" : "Base64 Input"}
            </label>
            <span className="text-xs text-zinc-500 font-mono">
              {input.length} chars
            </span>
          </div>
          <textarea
            value={input}
            onChange={(e) => handleInput(e.target.value)}
            placeholder={
              mode === "encode"
                ? "Paste or type your text here..."
                : "Paste your Base64 string here (e.g. SGVsbG8gd29ybGQ=)"
            }
            className="w-full h-40 bg-black border-2 border-zinc-800 rounded-xl p-4 text-white font-mono focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none resize-none transition-colors"
          />
        </div>

        {/* Arrow Icon */}
        <div className="flex justify-center -my-2 relative z-10">
          <div className="bg-zinc-800 border border-zinc-700 p-2 rounded-full text-zinc-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>

        {/* Output Area */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-bold text-zinc-400 uppercase tracking-widest">
              {mode === "encode" ? "Base64 Output" : "Plain Text Output"}
            </label>
          </div>

          {error ? (
            <div className="w-full text-center p-8 bg-red-900/20 border border-red-500/50 text-red-400 font-mono rounded-xl">
              {error}
            </div>
          ) : (
            <div className="relative group">
              <textarea
                readOnly
                value={output}
                className={`w-full h-48 bg-zinc-950 border-2 border-zinc-700 rounded-xl p-4 pr-16 text-emerald-400 font-mono focus:outline-none resize-none ${output ? "" : "opacity-50"}`}
                placeholder="Result will appear here..."
              />
              {output && (
                <button
                  onClick={handleCopy}
                  className={`absolute top-4 right-4 p-2 rounded-lg transition-colors ${copied ? "bg-emerald-500 text-white" : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white"}`}
                  title="Copy to clipboard"
                >
                  {copied ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                      />
                    </svg>
                  )}
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Base64 Converter",
            operatingSystem: "All",
            applicationCategory: "DeveloperApplication",
          }),
        }}
      />

      <div className="mt-8 text-left">
        <CalculatorSEO
          title="Local Base64 Encoder and Decoder"
          whatIsIt={
            <p>
              The <strong>Base64 Converter</strong> is a localized developer
              tool that translates raw, unstable binary data or plain text
              strings into a universally safe, 64-character ASCII
              representation. It allows you to freely encode logic or decode
              server payloads securely entirely within your device's browser.
            </p>
          }
          formula={
            <>
              <p>
                Base64 is not encryption; it is an encoding scheme. The original
                computer data is broken down into exactly 3-byte groups (24
                total bits). Those 24 bits are mathematically sliced into four
                6-bit groups. Each 6-bit group is then mapped explicitly to an
                index of 64 ultra-safe characters (A-Z, a-z, 0-9, +, /) that
                safely survive network transport protocols.
              </p>
              <div className="bg-zinc-800 p-4 rounded-lg font-mono text-center text-[15px] shadow-sm my-4 flex flex-col gap-2 border border-zinc-700 text-zinc-300">
                <p>
                  <strong>3 Bytes of Input Data = 24 total bits</strong>
                </p>
                <p className="mt-2 pt-2 border-t border-zinc-700">
                  <strong>24 bits / 4 chunks = Four 6-bit indices</strong>
                </p>
                <p className="mt-2 pt-2 border-t border-zinc-700">
                  <strong>Output = 4 Safe Base64 ASCII Characters</strong>
                </p>
              </div>
            </>
          }
          example={
            <>
              <p>Let's trace how the basic word "Hi" is expanded in Base64.</p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-zinc-400">
                <li>
                  <strong>The Input:</strong> The short string `Hi`.
                </li>
                <li>
                  <strong>The Binary:</strong> Translated to binary bytes, 'H'
                  is 01001000 and 'i' is 01101001.
                </li>
                <li>
                  <strong>The Mapping:</strong> By slicing those bits into 6-bit
                  arrays and mathematically padding the remainder, the system
                  queries the Base64 alphabet table.
                </li>
                <li>
                  <strong>Result:</strong> It results in the encoded string{" "}
                  <strong>SGk=</strong>. (The equals sign is used strictly as a
                  formatting pad character).
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-zinc-400">
              <li>
                <strong>Data URIs in CSS/HTML:</strong> Frontend developers use
                Base64 to convert tiny logo PNGs or custom SVG icons directly
                into long text strings, allowing images to exist inside CSS
                source files, bypassing separate external HTTP server requests.
              </li>
              <li>
                <strong>API Authentication Headers:</strong> When authenticating
                via `Basic Auth` in REST architectures, developer frameworks
                require combining the username, a colon, and the password, and
                instantly encoding it strictly into Base64 before attaching it
                to the Authorization HTTP header.
              </li>
              <li>
                <strong>Decoding JSON Web Tokens (JWTs):</strong> A modern JWT
                authentication token isn't encrypted, it's just digitally signed
                and encoded in URL-safe Base64! Developers paste network payload
                strings here to manually read what customer data is stored
                inside a stateless token.
              </li>
            </ul>
          }
          faqs={[
            {
              question: "Does Base64 hide or secure my data?",
              answer:
                "Absolutely NOT. Base64 offers zero cryptographic security. Anyone on earth who copies a Base64 string can instantly decode it and read the exact contents. It exists strictly to prevent older server gateways from corrupting complex Unicode symbols or image payloads during transit.",
            },
            {
              question: "Why do my Base64 strings always end in '==' or '='?",
              answer:
                "Padding! Base64 requires the output string length to be a perfect multiple of 4. If the original data doesn't divide perfectly into 3-byte chunks, the encoding algorithm simply slaps on '=' characters at the very end as filler blocks to keep the math aligned.",
            },
            {
              question: "Why does the output file size get bigger?",
              answer:
                "The mathematics of Base64 dictate that replacing 8-bit bytes with restrictive 6-bit characters permanently expands the overall size of the data snippet by approximately 33%.",
            },
          ]}
          relatedCalculators={[
            {
              name: "JWT Decoder",
              path: "/jwt-decoder/",
              desc: "Specifically parse and decode JSON Web Tokens and analyze their claims.",
            },
            {
              name: "URL Encoder",
              path: "/url-encoder-decoder/",
              desc: "Format URLs securely to prevent query parameter collisions.",
            },
            {
              name: "Password Generator",
              path: "/password-generator/",
              desc: "Generate true securely random cryptographic strings.",
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
