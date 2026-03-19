"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function JwtDecoder() {
  const [jwtInput, setJwtInput] = useState("");
  const [decodedHeader, setDecodedHeader] = useState("");
  const [decodedPayload, setDecodedPayload] = useState("");
  const [error, setError] = useState("");

  const decodeJwt = () => {
    setError("");
    setDecodedHeader("");
    setDecodedPayload("");

    if (!jwtInput) return;

    try {
      const parts = jwtInput.split(".");
      if (parts.length !== 3) {
        setError("A valid JWT must contain exactly 3 parts separated by dots.");
        return;
      }

      const header = atob(parts[0].replace(/-/g, "+").replace(/_/g, "/"));
      const payload = atob(parts[1].replace(/-/g, "+").replace(/_/g, "/"));

      setDecodedHeader(JSON.stringify(JSON.parse(header), null, 4));
      setDecodedPayload(JSON.stringify(JSON.parse(payload), null, 4));
    } catch (e: any) {
      setError(
        "Failed to decode JWT. Ensure it is a valid Base64Url encoded string.",
      );
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-purple-900 flex items-center justify-center font-mono">
          <span className="mr-3">🔑</span> JWT Decoder
        </h1>
        <p className="text-purple-700 text-lg max-w-2xl mx-auto">
          Decode JSON Web Tokens instantly to view their header and payload
          information.
        </p>
        <div className="mt-4 inline-block bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full font-bold">
          100% Client-Side. Your tokens never leave your browser.
        </div>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-zinc-200 mb-8 mx-auto flex flex-col lg:flex-row gap-8">
        {/* Input */}
        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <label className="block text-sm font-bold text-zinc-700 uppercase tracking-wide">
              Encoded JWT
            </label>
            <button
              onClick={() => {
                setJwtInput("");
                setDecodedHeader("");
                setDecodedPayload("");
                setError("");
              }}
              className="text-xs bg-zinc-100 px-3 py-1 rounded font-bold uppercase text-zinc-600 hover:bg-zinc-200"
            >
              Clear
            </button>
          </div>
          <textarea
            value={jwtInput}
            onChange={(e) => {
              setJwtInput(e.target.value);
              // Auto trigger decode if it roughly looks like a JWT
              if (e.target.value.split(".").length === 3) {
                setTimeout(
                  () => document.getElementById("decodeBtn")?.click(),
                  100,
                );
              }
            }}
            className="w-full flex-1 min-h-[400px] bg-slate-900 text-purple-300 rounded-xl border border-zinc-300 shadow-inner p-4 focus:bg-slate-950 focus:border-purple-500 font-medium font-mono text-sm md:text-base transition-all outline-none resize-y break-all"
            placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
            spellCheck="false"
          />

          <button
            id="decodeBtn"
            onClick={decodeJwt}
            className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white font-black py-4 px-8 rounded-xl transition-colors shadow-lg shadow-purple-600/30 uppercase tracking-widest text-lg"
          >
            Decode Token ➡️
          </button>
          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-700 border border-red-200 rounded-xl font-bold text-center text-sm">
              {error}
            </div>
          )}
        </div>

        {/* Output */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex flex-col flex-1">
            <label className="block text-sm font-bold text-zinc-700 uppercase tracking-wide mb-2 text-rose-600">
              HEADER (Algorithm & Type)
            </label>
            <textarea
              value={decodedHeader}
              readOnly
              className="w-full flex-1 min-h-[150px] bg-rose-50 text-rose-900 rounded-xl border border-rose-200 p-4 font-medium font-mono text-sm transition-all outline-none resize-none"
              placeholder="{}"
              spellCheck="false"
            />
          </div>
          <div className="flex flex-col flex-[2]">
            <label className="block text-sm font-bold text-zinc-700 uppercase tracking-wide mb-2 text-indigo-600">
              PAYLOAD (Data)
            </label>
            <textarea
              value={decodedPayload}
              readOnly
              className="w-full flex-1 min-h-[250px] bg-indigo-50 text-indigo-900 rounded-xl border border-indigo-200 p-4 font-medium font-mono text-sm transition-all outline-none resize-none"
              placeholder="{}"
              spellCheck="false"
            />
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "JWT Decoder",
            operatingSystem: "All",
            applicationCategory: "DeveloperApplication",
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title="JSON Web Token (JWT) Decoder"
          whatIsIt={
            <>
              <p>
                The <strong>JWT Decoder</strong> instantly cracks open encoded
                JSON Web Tokens to reveal their hidden Header and Payload data
                structures.
              </p>
              <p>
                JWTs are the modern standard for securely transmitting identity
                information between a user and a server. When you log into
                almost any modern app, you are handed a JWT. This long,
                gibberish string acts as your digital "Passport," proving who
                you are without the server needing to check the primary database
                on every single click.
              </p>
            </>
          }
          formula={
            <>
              <p>
                A standard JWT is always constructed from exactly three distinct
                parts, separated by literal periods (<code>.</code>):
              </p>
              <div className="bg-purple-50 p-4 rounded-lg font-mono text-[14px] shadow-sm my-4 text-purple-900 border border-purple-100 flex flex-col gap-2 center font-bold text-center">
                Header.Payload.Signature
              </div>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                <li>
                  <strong className="text-rose-600">Header:</strong> Identifies
                  which encryption algorithm was used (e.g., HS256, RS256).
                </li>
                <li>
                  <strong className="text-indigo-600">Payload:</strong> The
                  actual JSON data (claims) being transmitted, such as user ID,
                  role (admin/user), and exact expiration time.
                </li>
                <li>
                  <strong className="text-emerald-600">Signature:</strong> A
                  cryptographic hash combining the Header, Payload, and a secret
                  server password to guarantee the token hasn't been altered by
                  hackers.
                </li>
              </ul>
            </>
          }
          example={
            <>
              <p>
                You are debugging a "401 Unauthorized" error on your website.
                Your code has generated a token that looks like this:{" "}
                <code>eyJhbGci...</code>
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                <li>
                  <strong>The Problem:</strong> The server keeps rejecting the
                  user, but you have no idea why just by looking at the
                  gibberish string.
                </li>
                <li>
                  <strong>The Solution:</strong> You paste the string into the
                  decoder. It instantly translates the Payload, revealing an
                  "exp" (expiration) timestamp that occurred 5 minutes ago. You
                  immediately realize your token refresh logic is broken.
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-gray-700">
              <li>
                <strong>API Authentication Debugging:</strong> Frontend
                developers constantly use decoders to verify if the backend
                server actually included their User ID or 'Admin' role flag
                inside the token payload before trying to render secure pages.
              </li>
              <li>
                <strong>Security Auditing:</strong> Cybersecurity experts
                inspect exposed tokens to see if careless developers
                accidentally hardcoded sensitive data (like plain-text passwords
                or credit cards) directly into the decoded payload.
              </li>
              <li>
                <strong>OAuth Integrations:</strong> Validating the structure of
                access tokens returned from massive third-party identity
                providers like Google Workspace or Auth0.
              </li>
            </ul>
          }
          faqs={[
            {
              question:
                "Does decoding a JWT mean I have hacked or decrypted it?",
              answer:
                "No. The Header and Payload of a standard JWT are ONLY 'Base64 Encoded' (which is just a translation of text), they are not 'Encrypted'. Anyone with a decoder can read the data. This is why you must never put passwords inside a JWT.",
            },
            {
              question: "If anyone can decode it, how is it secure?",
              answer:
                "The security comes entirely from the 3rd part of the token: the Signature. While hackers can decode and alter the Payload (e.g., changing 'role:user' to 'role:admin'), doing so mathematically invalidates the Signature. The server will reject the altered token entirely.",
            },
            {
              question: "Is it safe to paste my production tokens here?",
              answer:
                "Yes. This decoder runs 100% locally using Javascript in your browser. The token is never transmitted back to our servers. However, as a general security rule, you should always treat production JWTs as highly sensitive passwords.",
            },
          ]}
          relatedCalculators={[
            {
              name: "Base64 Converter",
              path: "/base64-converter/",
              desc: "Manually encode or decode specific strings without requiring the strict 3-part JWT structure.",
            },
            {
              name: "JSON Validator",
              path: "/json-validator/",
              desc: "Ensure the raw Javascript objects you plan to inject into a token payload are structurally valid.",
            },
            {
              name: "UUID Generator",
              path: "/uuid-generator/",
              desc: "Generate secure, random UUIDs to act as the primary 'Subject ID' (sub) inside your token claims.",
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
