"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function LeanBodyMassCalculator() {
  const [gender, setGender] = useState("male");
  const [weight, setWeight] = useState("75"); // kg
  const [height, setHeight] = useState("175"); // cm

  const [result, setResult] = useState<{
    boer: number;
    james: number;
    hume: number;
    average: number;
    bodyFatPct: number;
  } | null>(null);

  const calculateLBM = () => {
    const w = parseFloat(weight) || 0;
    const h = parseFloat(height) || 0; // needs to be cm

    if (w > 0 && h > 0) {
      let boer = 0;
      let james = 0;
      let hume = 0;

      if (gender === "male") {
        boer = 0.407 * w + 0.267 * h - 19.2;
        james = 1.1 * w - 128 * Math.pow(w / h, 2);
        hume = 0.3281 * w + 0.33929 * h - 29.5336;
      } else {
        boer = 0.252 * w + 0.473 * h - 48.3;
        james = 1.07 * w - 148 * Math.pow(w / h, 2);
        hume = 0.29569 * w + 0.41813 * h - 43.2933;
      }

      const validBoer = Math.max(0, boer);
      const validJames = Math.max(0, james);
      const validHume = Math.max(0, hume);

      const avg = (validBoer + validJames + validHume) / 3;
      const fatMass = w - avg;
      const bfPct = (fatMass / w) * 100;

      setResult({
        boer: validBoer,
        james: validJames,
        hume: validHume,
        average: avg,
        bodyFatPct: Math.max(0, bfPct),
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-orange-600 border-b pb-4">
        Lean Body Mass Calculator
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Calculate the exact weight of your body minus all fat content using
        three different scientific formulas.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="bg-orange-50 p-6 rounded-xl border border-orange-100 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Biological Sex
            </label>
            <div className="flex gap-4">
              <label
                className={`flex-1 flex items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition ${gender === "male" ? "border-orange-500 bg-orange-100 text-orange-700 font-bold" : "border-gray-200 bg-white text-gray-600"}`}
              >
                <input
                  type="radio"
                  value="male"
                  checked={gender === "male"}
                  onChange={() => setGender("male")}
                  className="hidden"
                />
                Male
              </label>
              <label
                className={`flex-1 flex items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition ${gender === "female" ? "border-orange-500 bg-orange-100 text-orange-700 font-bold" : "border-gray-200 bg-white text-gray-600"}`}
              >
                <input
                  type="radio"
                  value="female"
                  checked={gender === "female"}
                  onChange={() => setGender("female")}
                  className="hidden"
                />
                Female
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Total Body Weight (kg)
            </label>
            <input
              type="number"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-orange-500 font-bold text-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Height (cm)
            </label>
            <input
              type="number"
              step="1"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-orange-500 font-bold text-lg"
            />
          </div>

          <button
            onClick={calculateLBM}
            className="w-full bg-orange-600 text-white font-bold py-4 rounded-xl hover:bg-orange-700 transition shadow-lg uppercase tracking-wide mt-2"
          >
            Calculate LBM
          </button>
        </div>

        {/* Results Screen */}
        <div className="bg-white border-2 border-orange-100 rounded-xl overflow-hidden shadow-sm flex flex-col justify-center p-8">
          {result !== null ? (
            <div className="w-full text-center space-y-6">
              <div>
                <h3 className="text-orange-800 font-bold uppercase tracking-widest text-[11px] mb-2">
                  Average Lean Body Mass
                </h3>
                <div className="text-6xl font-black text-gray-900 border-b border-orange-100 pb-4">
                  {result.average.toFixed(1)}{" "}
                  <span className="text-2xl text-gray-500 font-medium tracking-tight">
                    kg
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-left">
                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                  Formula Breakdown
                </h4>
                <div className="flex justify-between items-center bg-gray-50 p-2 rounded border border-gray-100">
                  <span className="text-sm font-semibold text-gray-600">
                    Boer Formula
                  </span>
                  <span className="font-bold text-gray-800">
                    {result.boer.toFixed(1)} kg
                  </span>
                </div>
                <div className="flex justify-between items-center bg-gray-50 p-2 rounded border border-gray-100">
                  <span className="text-sm font-semibold text-gray-600">
                    James Formula
                  </span>
                  <span className="font-bold text-gray-800">
                    {result.james.toFixed(1)} kg
                  </span>
                </div>
                <div className="flex justify-between items-center bg-gray-50 p-2 rounded border border-gray-100">
                  <span className="text-sm font-semibold text-gray-600">
                    Hume Formula
                  </span>
                  <span className="font-bold text-gray-800">
                    {result.hume.toFixed(1)} kg
                  </span>
                </div>
              </div>

              <div className="mt-4 bg-orange-50 border border-orange-200 p-3 rounded-lg flex justify-between items-center text-left">
                <span className="text-[11px] font-bold text-orange-800 uppercase tracking-widest">
                  Implied Body Fat
                </span>
                <span className="font-black text-orange-600 text-lg">
                  {result.bodyFatPct.toFixed(1)}%
                </span>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-center text-orange-300 px-6 font-medium text-lg leading-relaxed">
              Input your weight and height to break down your exact lean body
              mass using the Boer, James, and Hume algorithms.
            </div>
          )}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Lean Body Mass Calculator",
            operatingSystem: "All",
            applicationCategory: "HealthApplication",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title="Lean Body Mass (LBM) Calculator"
          whatIsIt={
            <>
              <p>
                The <strong>Lean Body Mass (LBM) Calculator</strong>{" "}
                mathematically separates your total body weight into two
                distinct categories: your fat mass and your lean mass.
              </p>
              <p>
                <strong>Lean Body Mass</strong> includes the weight of your
                bones, internal organs, muscles, blood, and skin—everything in
                your body minus the triglycerides stored in your fat tissues.
                Knowing your LBM is the most accurate way to prescribe
                medication doses, set protein targets, and monitor true athletic
                progression, rather than relying on a generic BMI scale that
                punishes muscular individuals.
              </p>

              <p className="mt-4 text-sm text-gray-500">
                <strong>Related Terms:</strong> Lean Body Mass Calculator
              </p>
            </>
          }
          formula={
            <>
              <p>
                This calculator aggregates the three most trusted biometric
                impedance formulas used in medical settings to find the most
                statistically sound average:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                <li>
                  <strong>The Boer Formula (1984):</strong> Often considered the
                  gold standard for clinical pharmacology (anesthesia dosing).
                </li>
                <li>
                  <strong>The James Formula (1976):</strong> Accurate for most
                  people, but known to break down scientifically if the
                  patient's body fat exceeds 40%.
                </li>
                <li>
                  <strong>The Hume Formula (1966):</strong> A classic model that
                  heavily weights the interaction between height and biological
                  sex.
                </li>
              </ul>
              <div className="bg-orange-50 p-4 rounded-lg font-mono text-center text-[15px] shadow-sm my-4 text-orange-900 border border-orange-100">
                <strong>Implied Body Fat %</strong> = [ (Total Weight − LBM) ÷
                Total Weight ] × 100
              </div>
            </>
          }
          example={
            <>
              <p>
                Consider a{" "}
                <strong>physically active male weighing 85 kg (187 lbs)</strong>{" "}
                who is <strong>180 cm (5'11")</strong> tall.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                <li>
                  The outdated BMI index simply flags him as nearly "Overweight"
                  with a score of 26.2.
                </li>
                <li>
                  Running his biometrics through the{" "}
                  <strong>Boer formula</strong> yields a Lean Body Mass of 63.5
                  kg.
                </li>
                <li>
                  This means his total fat mass is 21.5 kg (85 kg - 63.5 kg).
                </li>
                <li>
                  <strong>The Reality Check:</strong> The calculator correctly
                  identifies his <strong>Body Fat as ~25%</strong>, allowing him
                  to set a safer caloric deficit based on his true muscle
                  metrics rather than assuming he just needs to "drop weight."
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-gray-700">
              <li>
                <strong>Protein Prescription:</strong> Nutritionists calculate
                daily protein requirements specifically against{" "}
                <i>Lean Body Mass</i> (e.g., 2.2 grams per kg of LBM), not total
                body weight. This prevents obese individuals from dangerously
                over-consuming protein.
              </li>
              <li>
                <strong>Clinical Dosing:</strong> Doctors use LBM to precisely
                calculate the dosage of water-soluble medications and
                anesthetics, which only distribute into lean tissue, avoiding
                toxic overdoses.
              </li>
              <li>
                <strong>Body Recomposition Tracking:</strong> Verifying that the
                5 pounds you lost on the scale was actually 5 pounds of body
                fat, rather than dangerous muscle wasting caused by starving
                your system.
              </li>
            </ul>
          }
          faqs={[
            {
              question:
                "Why does biological sex dramatically change the LBM calculation?",
              answer:
                "Biological males and females have fundamentally different essential fat requirements driven by endocrinology and reproduction. For example, females generally require 10-13% essential body fat just to maintain healthy hormone production, whereas males require only 2-5%.",
            },
            {
              question: "Is this more accurate than a DEXA scan?",
              answer:
                "No. A DEXA (Dual-Energy X-ray Absorptiometry) scan physically measures the density of your exact tissues utilizing X-rays. This calculator relies on population-based statistical equations. However, these formulas are the most accurate non-invasive estimation tool available without medical hardware.",
            },
            {
              question:
                "Why are my results from the James Formula weirdly low?",
              answer:
                "The James formula contains an inherent mathematical flaw that breaks down for severe clinical obesity. If your true body fat percentage is greater than 42%, the James formula will paradoxically start calculating a negative number, pulling your overall average down. In such cases, rely entirely on the Boer formula.",
            },
          ]}
          relatedCalculators={[
            {
              name: "Protein Calculator",
              path: "/protein-calculator",
              desc: "Feed your newly calculated Lean Body Mass into this calculator to determine your precise daily protein needs.",
            },
            {
              name: "TDEE Calculator",
              path: "/tdee-calculator",
              desc: "Discover how your lean mass influences your overall basal metabolic burn rate.",
            },
            {
              name: "Macronutrient Calculator",
              path: "/macro-calculator",
              desc: "Design a diet capable of preserving your specific LBM while shedding the remaining fat weight.",
            },
          ]}
        />
      </div>
    </div>
  );
}
