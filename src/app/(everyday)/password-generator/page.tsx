"use client";

import { useState, useEffect } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [avoidAmbiguous, setAvoidAmbiguous] = useState(false);

  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    generatePassword();
  }, [
    length,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols,
    avoidAmbiguous,
  ]);

  const generatePassword = () => {
    let chars = "";

    let upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let lower = "abcdefghijklmnopqrstuvwxyz";
    let numbers = "0123456789";
    let symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    if (avoidAmbiguous) {
      upper = upper.replace(/[ILO]/g, "");
      lower = lower.replace(/[ilo]/g, "");
      numbers = numbers.replace(/[10]/g, "");
      symbols = symbols.replace(/[{}()[\]]/g, "");
    }

    if (includeUppercase) chars += upper;
    if (includeLowercase) chars += lower;
    if (includeNumbers) chars += numbers;
    if (includeSymbols) chars += symbols;

    // Fallback if none selected
    if (!chars) {
      chars = "abcdefghijklmnopqrstuvwxyz0123456789";
      setIncludeLowercase(true);
      setIncludeNumbers(true);
    }

    let newPassword = "";
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);

    for (let i = 0; i < length; i++) {
      newPassword += chars[array[i] % chars.length];
    }

    setPassword(newPassword);
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Calculate strength locally for UI
  const getStrength = () => {
    let score = 0;
    if (length >= 8) score++;
    if (length >= 12) score++;
    if (length >= 16) score++;
    if (includeUppercase) score++;
    if (includeLowercase) score++;
    if (includeNumbers) score++;
    if (includeSymbols) score++;

    if (score <= 3)
      return {
        label: "Weak",
        color: "bg-red-500",
        rings: "focus:border-red-500",
      };
    if (score <= 5)
      return {
        label: "Good",
        color: "bg-yellow-500",
        rings: "focus:border-yellow-500",
      };
    return {
      label: "Strong",
      color: "bg-green-500",
      rings: "focus:border-green-500",
    };
  };

  const strength = getStrength();

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-900 rounded-xl shadow-2xl border border-zinc-800 text-zinc-100">
      <h1 className="text-4xl font-extrabold mb-4 text-emerald-400 border-b border-zinc-800 pb-4 flex items-center">
        <span className="mr-3">🔐</span> Random Password Generator
      </h1>
      <p className="mb-8 text-zinc-400 text-lg">
        Generate secure, highly-randomized passwords using cryptographic
        standards directly in your browser.
      </p>

      <div className="space-y-8">
        {/* Result Display */}
        <div className="relative group">
          <input
            type="text"
            readOnly
            value={password}
            className={`w-full bg-zinc-950 border-2 border-zinc-800 p-6 pr-32 rounded-2xl text-2xl md:text-3xl font-mono text-center tracking-wider text-white shadow-inner focus:outline-none transition-colors ${strength.rings}`}
          />
          <button
            onClick={copyToClipboard}
            className={`absolute right-3 top-1/2 -translate-y-1/2 px-4 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${copied ? "bg-green-500 text-white" : "bg-emerald-600 hover:bg-emerald-500 text-white"}`}
          >
            {copied ? "Copied!" : "Copy"}
            {!copied && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
              </svg>
            )}
          </button>

          {/* Strength Indicator */}
          <div className="absolute -bottom-6 right-2 flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
              Strength:
            </span>
            <div className="flex gap-1">
              <div className={`h-1 w-6 rounded-full ${strength.color}`}></div>
              <div
                className={`h-1 w-6 rounded-full ${strength.label === "Good" || strength.label === "Strong" ? strength.color : "bg-zinc-800"}`}
              ></div>
              <div
                className={`h-1 w-6 rounded-full ${strength.label === "Strong" ? strength.color : "bg-zinc-800"}`}
              ></div>
            </div>
          </div>
        </div>

        {/* Controls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-zinc-800/50 p-6 md:p-8 rounded-2xl border border-zinc-800">
          {/* Left Col: Length & Refresh */}
          <div className="space-y-8 flex flex-col justify-center">
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="text-sm font-bold text-zinc-300 uppercase tracking-wider">
                  Password Length
                </label>
                <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-lg font-black font-mono text-xl border border-emerald-500/30">
                  {length}
                </span>
              </div>
              <input
                type="range"
                min="6"
                max="64"
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value))}
                className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-xs text-zinc-500 mt-2 font-mono">
                <span>6</span>
                <span>32</span>
                <span>64</span>
              </div>
            </div>

            <button
              onClick={generatePassword}
              className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-4 rounded-xl border border-zinc-700 hover:border-zinc-500 transition-all shadow-md flex justify-center items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Generate New Password
            </button>
          </div>

          {/* Right Col: Options */}
          <div className="space-y-4">
            <label className="block text-sm font-bold text-zinc-300 uppercase tracking-wider mb-2">
              Character Types
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label
                className={`flex items-center p-4 rounded-xl cursor-pointer border transition-colors ${includeUppercase ? "bg-emerald-900/40 border-emerald-500/50" : "bg-zinc-900 border-zinc-800 hover:border-zinc-600"}`}
              >
                <input
                  type="checkbox"
                  className="form-checkbox text-emerald-500 rounded bg-zinc-800 border-zinc-600 h-5 w-5 mr-3 focus:ring-emerald-500 focus:ring-offset-zinc-900"
                  checked={includeUppercase}
                  onChange={() => setIncludeUppercase(!includeUppercase)}
                />
                <div>
                  <div className="font-bold text-sm text-zinc-200">
                    Uppercase
                  </div>
                  <div className="text-[10px] text-zinc-500 font-mono mt-1">
                    A-Z
                  </div>
                </div>
              </label>

              <label
                className={`flex items-center p-4 rounded-xl cursor-pointer border transition-colors ${includeLowercase ? "bg-emerald-900/40 border-emerald-500/50" : "bg-zinc-900 border-zinc-800 hover:border-zinc-600"}`}
              >
                <input
                  type="checkbox"
                  className="form-checkbox text-emerald-500 rounded bg-zinc-800 border-zinc-600 h-5 w-5 mr-3 focus:ring-emerald-500 focus:ring-offset-zinc-900"
                  checked={includeLowercase}
                  onChange={() => setIncludeLowercase(!includeLowercase)}
                />
                <div>
                  <div className="font-bold text-sm text-zinc-200">
                    Lowercase
                  </div>
                  <div className="text-[10px] text-zinc-500 font-mono mt-1">
                    a-z
                  </div>
                </div>
              </label>

              <label
                className={`flex items-center p-4 rounded-xl cursor-pointer border transition-colors ${includeNumbers ? "bg-emerald-900/40 border-emerald-500/50" : "bg-zinc-900 border-zinc-800 hover:border-zinc-600"}`}
              >
                <input
                  type="checkbox"
                  className="form-checkbox text-emerald-500 rounded bg-zinc-800 border-zinc-600 h-5 w-5 mr-3 focus:ring-emerald-500 focus:ring-offset-zinc-900"
                  checked={includeNumbers}
                  onChange={() => setIncludeNumbers(!includeNumbers)}
                />
                <div>
                  <div className="font-bold text-sm text-zinc-200">Numbers</div>
                  <div className="text-[10px] text-zinc-500 font-mono mt-1">
                    0-9
                  </div>
                </div>
              </label>

              <label
                className={`flex items-center p-4 rounded-xl cursor-pointer border transition-colors ${includeSymbols ? "bg-emerald-900/40 border-emerald-500/50" : "bg-zinc-900 border-zinc-800 hover:border-zinc-600"}`}
              >
                <input
                  type="checkbox"
                  className="form-checkbox text-emerald-500 rounded bg-zinc-800 border-zinc-600 h-5 w-5 mr-3 focus:ring-emerald-500 focus:ring-offset-zinc-900"
                  checked={includeSymbols}
                  onChange={() => setIncludeSymbols(!includeSymbols)}
                />
                <div>
                  <div className="font-bold text-sm text-zinc-200">Symbols</div>
                  <div className="text-[10px] text-zinc-500 font-mono mt-1">
                    !@#$%^&*
                  </div>
                </div>
              </label>
            </div>

            <label
              className={`mt-2 flex items-center p-4 rounded-xl cursor-pointer border transition-colors ${avoidAmbiguous ? "bg-orange-900/30 border-orange-500/50 text-orange-200" : "bg-zinc-900 border-zinc-800 hover:border-zinc-600 text-zinc-400"}`}
            >
              <input
                type="checkbox"
                className="form-checkbox text-orange-500 rounded bg-zinc-800 border-zinc-600 h-5 w-5 mr-3 focus:ring-orange-500 focus:ring-offset-zinc-900"
                checked={avoidAmbiguous}
                onChange={() => setAvoidAmbiguous(!avoidAmbiguous)}
              />
              <div>
                <div className="font-bold text-sm">
                  Avoid Ambiguous Characters
                </div>
                <div className="text-[10px] opacity-70 mt-1">
                  Removes similar looking chars like i, l, 1, L, o, 0, O
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Random Password Generator",
            operatingSystem: "All",
            applicationCategory: "SecurityApplication",
          }),
        }}
      />

      <div className="mt-8 text-left">
        <CalculatorSEO
          title="Cryptographically Secure Password Generator"
          whatIsIt={
            <p>
              Our <strong>Random Password Generator</strong> is a client-side
              security tool designed to instantly create mathematically complex,
              uncrackable passwords. Instead of reusing the same weak password
              across multiple websites, this tool allows you to generate highly
              randomized alphanumeric strings tailored to strict corporate or
              server requirements.
            </p>
          }
          formula={
            <>
              <p>
                Most basic random generators use `Math.random()`, which is
                physically predictable and highly vulnerable to advanced cyber
                attacks. Our tool exclusively uses{" "}
                <code>window.crypto.getRandomValues()</code>, a physically
                secure cryptographic API built directly into modern browsers
                that utilizes the operating system's true entropy pool.
              </p>
              <div className="bg-zinc-800 p-4 rounded-lg font-mono text-center text-[15px] shadow-sm my-4 flex flex-col gap-2 border border-zinc-700 text-zinc-300">
                <p>
                  <strong>6-character lowercase = Cracked Instantly</strong>
                </p>
                <p className="mt-2 pt-2 border-t border-zinc-700">
                  <strong>8-character mixed = Cracked in ~5 minutes</strong>
                </p>
                <p className="mt-2 pt-2 border-t border-zinc-700">
                  <strong>
                    16-character mixed w/ symbols = Uncrackable by modern
                    supercomputers
                  </strong>
                </p>
              </div>
            </>
          }
          example={
            <>
              <p>
                Let's create a highly secure password for a new banking
                application.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-zinc-400">
                <li>
                  <strong>The Requirements:</strong> The bank requires a minimum
                  of 12 characters, including uppercase, lowercase, numbers, and
                  symbols.
                </li>
                <li>
                  <strong>The Configuration:</strong> You set the slider to `16`
                  (exceeding minimums is safest), and check all four character
                  type boxes.
                </li>
                <li>
                  <strong>Result:</strong> The tool generates a string like{" "}
                  <code>k#9P@mQ$2vL!x8Yc</code>, which has so much entropy the
                  known universe would end before a hacker could brute-force
                  guess it.
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-zinc-400">
              <li>
                <strong>Securing Financial Accounts:</strong> Banking, crypto
                wallets, and investment portfolios are prime targets for
                automated credential stuffing attacks. You must use a unique,
                generated password for each one.
              </li>
              <li>
                <strong>Wi-Fi Network Setup:</strong> Securing a home or
                business router strictly requires a highly complex WPA2/WPA3
                password to prevent neighbors or malicious actors from sniffing
                your unencrypted local traffic.
              </li>
              <li>
                <strong>Software Development:</strong> Backend developers
                constantly need to quickly generate massive 32-character or
                64-character root master passwords for secure database clusters
                and AWS IAM user accounts.
              </li>
            </ul>
          }
          faqs={[
            {
              question: "Is this password saved or sent to a server?",
              answer:
                "Absolutely not. This entire calculator runs 100% locally on your specific device inside your browser using client-side JavaScript. No data is ever transmitted, logged, or saved to any database anywhere in the world.",
            },
            {
              question: "What does 'Avoid Ambiguous Characters' mean?",
              answer:
                "Certain characters look identical depending on the font used (like a lowercase 'l', an uppercase 'I', and the number '1'). If you physically have to write the password down on a sticky note, avoiding these characters prevents you from getting permanently locked out from misreading your own handwriting.",
            },
            {
              question: "How long should my password actually be?",
              answer:
                "Currently, cybersecurity experts mandate an absolute minimum of 12 characters, though 16 is heavily preferred. Length is exponentially more important than complexity. A 16-character password of pure random lowercase letters is vastly harder to crack than an 8-character password packed with symbols.",
            },
          ]}
          relatedCalculators={[
            {
              name: "UUID Generator",
              path: "/uuid-generator",
              desc: "Generate standardized unique identifier strings for database keys.",
            },
            {
              name: "QR Code Generator",
              path: "/qr-code-generator",
              desc: "Turn complex secure passwords into scannable QR images for mobile login.",
            },
            {
              name: "Random String Generator",
              path: "/random-string-generator",
              desc: "Generate plain text randomized data for testing purposes.",
            },
          ]}
        />
      </div>
    </div>
  );
}
