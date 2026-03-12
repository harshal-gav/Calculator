"use client";

import { useState, useEffect } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function PxRemConverter() {
  const [baseSize, setBaseSize] = useState("16"); // Default root font size is 16px
  const [pxValue, setPxValue] = useState("16");
  const [remValue, setRemValue] = useState("1");
  const [activeInput, setActiveInput] = useState<"px" | "rem">("px");

  useEffect(() => {
    calculateConversion();
  }, [baseSize, pxValue, remValue, activeInput]);

  const calculateConversion = () => {
    const root = parseFloat(baseSize) || 16;

    if (activeInput === "px") {
      const px = parseFloat(pxValue);
      if (!isNaN(px)) {
        setRemValue((px / root).toString());
      } else {
        setRemValue("");
      }
    } else if (activeInput === "rem") {
      const rem = parseFloat(remValue);
      if (!isNaN(rem)) {
        setPxValue((rem * root).toString());
      } else {
        setPxValue("");
      }
    }
  };

  const handlePxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPxValue(e.target.value);
    setActiveInput("px");
  };

  const handleRemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRemValue(e.target.value);
    setActiveInput("rem");
  };

  const handleBaseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBaseSize(e.target.value);
    // Recalculate based on whichever input was last active
  };

  const presetPx = [8, 12, 14, 16, 20, 24, 32, 40, 48, 64];

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-slate-50 rounded-xl shadow-lg border border-slate-200">
      <h1 className="text-4xl font-extrabold mb-4 text-slate-800 border-b pb-4 flex items-center">
        <span className="mr-3">📏</span> PX to REM Converter
      </h1>
      <p className="mb-8 text-slate-600 text-lg">
        Convert CSS pixels (px) to relative root ems (rem) based on your
        project's root font size.
      </p>

      <div className="bg-white p-6 md:p-10 rounded-2xl border border-slate-200 shadow-sm mb-8">
        {/* Base Size Selector */}
        <div className="mb-8 border-b border-slate-100 pb-8">
          <label className="block text-sm font-bold text-slate-500 mb-3 uppercase tracking-wider text-center">
            Root Font Size (Base Value)
          </label>
          <div className="flex justify-center flex-wrap gap-2 mb-4">
            {[10, 14, 16, 18, 20].map((val) => (
              <button
                key={val}
                onClick={() => setBaseSize(val.toString())}
                className={`px-4 py-2 rounded-lg font-bold transition-all text-sm ${parseFloat(baseSize) === val ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
              >
                {val}px
              </button>
            ))}
          </div>
          <div className="max-w-xs mx-auto relative group flex items-center">
            <span className="bg-slate-100 border border-slate-300 border-r-0 rounded-l-lg p-3 text-slate-500 font-mono text-sm leading-none flex items-center">
              1 REM =
            </span>
            <input
              type="number"
              min="1"
              value={baseSize}
              onChange={handleBaseChange}
              className="w-full border border-slate-300 p-3 bg-white focus:border-indigo-500 text-xl font-mono font-bold text-center text-slate-800 outline-none transition-all leading-none m-0"
              style={{ paddingTop: "0.75rem", paddingBottom: "0.75rem" }}
            />
            <span className="bg-slate-100 border border-slate-300 border-l-0 rounded-r-lg p-3 text-slate-500 font-bold text-sm leading-none flex items-center">
              px
            </span>
          </div>
        </div>

        {/* Conversion Grid */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-6 items-center">
          {/* PX Input */}
          <div>
            <label className="block text-sm font-bold text-indigo-600 mb-3 uppercase tracking-wider text-center">
              Pixels (PX)
            </label>
            <div className="relative">
              <input
                type="number"
                value={pxValue}
                onChange={handlePxChange}
                className={`w-full rounded-xl border-2 p-4 pr-16 text-3xl font-mono font-black text-slate-800 outline-none transition-all ${activeInput === "px" ? "bg-indigo-50 border-indigo-400 ring-4 ring-indigo-500/10" : "bg-slate-50 border-slate-200 focus:border-indigo-400"}`}
                placeholder="16"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold uppercase tracking-widest text-sm">
                px
              </span>
            </div>
          </div>

          {/* Swap Icon */}
          <div className="flex justify-center py-4">
            <div className="bg-slate-100 rounded-full p-3 text-slate-400">
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
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                />
              </svg>
            </div>
          </div>

          {/* REM Input */}
          <div>
            <label className="block text-sm font-bold text-emerald-600 mb-3 uppercase tracking-wider text-center">
              Relative Ems (REM)
            </label>
            <div className="relative">
              <input
                type="number"
                step="any"
                value={remValue}
                onChange={handleRemChange}
                className={`w-full rounded-xl border-2 p-4 pr-16 text-3xl font-mono font-black text-slate-800 outline-none transition-all ${activeInput === "rem" ? "bg-emerald-50 border-emerald-400 ring-4 ring-emerald-500/10" : "bg-slate-50 border-slate-200 focus:border-emerald-400"}`}
                placeholder="1"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold uppercase tracking-widest text-sm">
                rem
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Chart */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200">
        <h3 className="font-bold text-slate-700 tracking-wider text-sm mb-4 border-b border-slate-100 pb-2">
          Quick Reference (Base {baseSize}px)
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {presetPx.map((px) => {
            const root = parseFloat(baseSize) || 16;
            return (
              <div
                key={px}
                className="bg-slate-50 hover:bg-slate-100 p-3 rounded-xl border border-slate-200 text-center cursor-pointer transition-colors"
                onClick={() => {
                  setPxValue(px.toString());
                  setActiveInput("px");
                }}
              >
                <div className="font-black text-slate-800 font-mono text-lg">
                  {px}px
                </div>
                <div className="text-emerald-600 font-bold text-xs font-mono">
                  {parseFloat((px / root).toFixed(4))}rem
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "PX to REM Converter",
            operatingSystem: "All",
            applicationCategory: "DeveloperApplication",
          }),
        }}
      />

      <div className="mt-8 text-left">
        <CalculatorSEO
          title="CSS Pixel to REM Converter"
          whatIsIt={
            <p>
              The <strong>PX to REM Converter</strong> is an essential frontend
              web development utility that translates hardcoded, absolute Pixel
              (px) values into flexible, relative Root EM (rem) units. This
              conversion is the foundational mathematical technique used to
              build highly responsive, accessible web interfaces.
            </p>
          }
          formula={
            <>
              <p>
                Unlike absolute pixels, a `rem` is strictly a scalable
                multiplier based on the root `&lt;html&gt;` font size set by the
                user's browser (which is almost universally 16px by default). To
                find the REM equivalent, you simply divide your target pixel
                size by this root absolute pixel size.
              </p>
              <div className="bg-slate-50 p-4 rounded-lg font-mono text-center text-[15px] shadow-sm my-4 flex flex-col gap-2 border border-slate-200 text-slate-700">
                <p>
                  <strong>
                    Target Pixels (px) ÷ Root Size (px) = Value in REM
                  </strong>
                </p>
                <p className="mt-2 pt-2 border-t border-slate-200">
                  <strong>
                    Value in REM × Root Size (px) = Target Pixels (px)
                  </strong>
                </p>
              </div>
            </>
          }
          example={
            <>
              <p>
                Let's convert a standard 24px heading into a responsive root EM
                unit.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-slate-700">
                <li>
                  <strong>The Input:</strong> You want a subtitle to be 24px
                  tall, and your CSS framework assumes the standard 16px browser
                  base font.
                </li>
                <li>
                  <strong>The Division:</strong> 24 divided by 16.
                </li>
                <li>
                  <strong>Result:</strong> Your CSS definition should be written
                  as <code>font-size: 1.5rem;</code>.
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-slate-700">
              <li>
                <strong>Web Accessibility (a11y):</strong> Visually impaired
                users often change their browser's default font size from 16px
                to 24px. If a developer hardcodes a button text to `14px`, it
                will never grow, breaking accessibility logic. If they instead
                code it as `0.875rem`, the button text automatically scales up
                proportionally to match the user's preference!
              </li>
              <li>
                <strong>Responsive Design Frameworks:</strong> Modern CSS
                frameworks like Tailwind CSS or Bootstrap primarily use `rem`
                for margins, padding, and typography to ensure entire layouts
                can scale fluidly across desktop and mobile gracefully.
              </li>
              <li>
                <strong>Figma to CSS Handoff:</strong> UI Designers almost
                exclusively work in static `px` units on their canvas. Frontend
                engineers use this calculator to translate those static design
                system values into fluid CSS code.
              </li>
            </ul>
          }
          faqs={[
            {
              question: "What is the difference between EM and REM?",
              answer:
                "Both are relative, but they scale differently. `rem` stands for 'Root EM' and strictly cascades down from the absolute `<html>` tag font-size. A standard `em` cascades dynamically based on the font size of its immediate parent container, making compound math very difficult to track in nested DOM structures.",
            },
            {
              question: "Why is 16px the default root size?",
              answer:
                "In the early 1990s, the engineers building the first graphical web browsers (like Netscape) determined that 16 pixels was the most legible standard distance for reading black text on a low-resolution white computer monitor. That standard was universally adopted and remains the baseline today.",
            },
            {
              question: "Should I use REM for media queries?",
              answer:
                "Yes! Using 'em' or 'rem' inside `@media` queries is considered best practice. If a user zooms their browser in 200%, absolute pixel breakpoints will fail to trigger, but relative breakpoints will gracefully reflow the grid.",
            },
          ]}
          relatedCalculators={[
            {
              name: "RGB to HEX Converter",
              path: "/rgb-hex-converter",
              desc: "Convert digital screen light values to CSS color strings.",
            },
            {
              name: "Proportion Calculator",
              path: "/proportion-calculator",
              desc: "Mathematical tool to ensure images scale at precise aspect ratios.",
            },
            {
              name: "Bandwidth Calculator",
              path: "/bandwidth-calculator",
              desc: "Calculate exact network transmission times.",
            },
            {
              name: "Base64 Converter",
              path: "/base64-converter",
              desc: "Encode and decode data in Base64 format securely.",
            }]}
        />
      </div>
    </div>
  );
}
