"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function GFRCalculator() {
  const [creatinine, setCreatinine] = useState("1.1");
  const [age, setAge] = useState("45");
  const [gender, setGender] = useState("male");
  const [race, setRace] = useState("other");

  const cr = parseFloat(creatinine) || 0;
  const ageVal = parseFloat(age) || 0;

  let gfr = 0;
  let stage = "";
  let stageColor = "";
  let isValid = false;

  if (cr > 0 && ageVal > 0) {
    isValid = true;

    // CKD-EPI 2021 equation (race-free)
    const isFemale = gender === "female";
    const kappa = isFemale ? 0.7 : 0.9;
    const alpha = isFemale ? -0.241 : -0.302;
    const femaleMult = isFemale ? 1.012 : 1;

    const crKappa = cr / kappa;
    const minCr = Math.min(crKappa, 1);
    const maxCr = Math.max(crKappa, 1);

    gfr = 142 * Math.pow(minCr, alpha) * Math.pow(maxCr, -1.200) * Math.pow(0.9938, ageVal) * femaleMult;

    if (gfr >= 90) {
      stage = "Stage 1 — Normal or high";
      stageColor = "text-green-600 bg-green-50 border-green-200";
    } else if (gfr >= 60) {
      stage = "Stage 2 — Mildly ↓";
      stageColor = "text-lime-600 bg-lime-50 border-lime-200";
    } else if (gfr >= 45) {
      stage = "Stage 3a — Mild-Moderate ↓";
      stageColor = "text-yellow-600 bg-yellow-50 border-yellow-200";
    } else if (gfr >= 30) {
      stage = "Stage 3b — Moderate-Severe ↓";
      stageColor = "text-orange-600 bg-orange-50 border-orange-200";
    } else if (gfr >= 15) {
      stage = "Stage 4 — Severely ↓";
      stageColor = "text-red-500 bg-red-50 border-red-200";
    } else {
      stage = "Stage 5 — Kidney Failure";
      stageColor = "text-red-700 bg-red-100 border-red-300";
    }
  }

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-white rounded-3xl shadow-xl border border-teal-50">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-teal-50 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">GFR Calculator</h1>
          <p className="text-slate-500 font-medium mt-1 text-lg">Estimate your Glomerular Filtration Rate for kidney function.</p>
        </div>
        <div className="bg-teal-50 px-4 py-2 rounded-full border border-teal-100 shrink-0">
          <span className="text-teal-600 font-bold text-sm uppercase tracking-wider">Health</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 shadow-inner space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Serum Creatinine (mg/dL)</label>
              <input type="number" step="0.1" value={creatinine} onChange={(e) => setCreatinine(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 p-3 border text-lg" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Age (years)</label>
              <input type="number" value={age} onChange={(e) => setAge(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 p-3 border text-lg" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Biological Sex</label>
              <select value={gender} onChange={(e) => setGender(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-teal-500 p-3 border text-lg font-semibold cursor-pointer">
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 bg-teal-50 rounded-xl p-8 border border-teal-200 shadow-inner flex flex-col justify-center">
          {isValid ? (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-teal-900 text-center uppercase tracking-wider">eGFR Result</h2>
              <div className="text-center">
                <div className="text-6xl md:text-7xl font-black text-teal-700 mb-2">{gfr.toFixed(1)}</div>
                <div className="text-teal-600 font-semibold">mL/min/1.73 m²</div>
              </div>
              <div className={`text-center py-4 px-6 rounded-lg border font-bold text-xl ${stageColor}`}>
                {stage}
              </div>
              <div className="bg-white p-5 rounded-xl border border-teal-100 shadow-sm">
                <h3 className="font-bold text-gray-800 mb-3 text-center">CKD Stage Reference</h3>
                <div className="space-y-2 text-sm">
                  {[
                    { label: "Stage 1", range: "≥ 90", desc: "Normal or High" },
                    { label: "Stage 2", range: "60–89", desc: "Mildly Decreased" },
                    { label: "Stage 3a", range: "45–59", desc: "Mild-Moderate ↓" },
                    { label: "Stage 3b", range: "30–44", desc: "Moderate-Severe ↓" },
                    { label: "Stage 4", range: "15–29", desc: "Severely Decreased" },
                    { label: "Stage 5", range: "< 15", desc: "Kidney Failure" },
                  ].map((s) => (
                    <div key={s.label} className="flex justify-between items-center px-3 py-1 rounded bg-gray-50">
                      <span className="font-bold text-gray-700">{s.label}</span>
                      <span className="text-gray-500">{s.range} mL/min</span>
                      <span className="text-gray-600 text-xs">{s.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-teal-800 opacity-60 font-medium p-8">
              Enter your creatinine level and age to estimate kidney function.
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title="GFR Calculator — Kidney Function"
        whatIsIt={<p>The <strong>GFR Calculator</strong> estimates your Glomerular Filtration Rate — a measure of how well your kidneys are filtering waste from your blood. It uses the CKD-EPI 2021 equation, the current clinical standard.</p>}
        formula={<><p>Uses the CKD-EPI 2021 race-free equation:</p><div className="bg-teal-50 p-4 rounded-lg font-mono text-center my-4 border border-teal-100 text-teal-900 text-sm"><strong>eGFR = 142 × min(Cr/κ, 1)^α × max(Cr/κ, 1)^-1.200 × 0.9938^Age × (1.012 if female)</strong></div><p className="text-sm text-gray-600">Where κ = 0.7 (female) or 0.9 (male), α = -0.241 (female) or -0.302 (male).</p></>}
        example={<><p>A 45-year-old male with creatinine of 1.1 mg/dL:</p><ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700"><li>eGFR ≈ 84.5 mL/min/1.73 m²</li><li>Stage 2 — Mildly Decreased (but generally acceptable)</li></ul></>}
        useCases={<ul className="list-disc pl-6 space-y-4"><li><strong>CKD Screening:</strong> Early detection of declining kidney function.</li><li><strong>Drug Dosing:</strong> Many medications require dose adjustments based on renal function.</li></ul>}
        faqs={[
          { question: "How accurate is this calculator?", answer: "This uses the CKD-EPI 2021 formula, the current clinical standard. However, lab-measured GFR may differ. Always consult your doctor." },
          { question: "Is this tool free to use?", answer: "Yes, all our calculators are 100% free to use." },
        ]}
        relatedCalculators={[
          { name: "BMI Calculator", path: "/bmi-calculator/", desc: "Calculate your Body Mass Index." },
          { name: "Blood Pressure Calculator", path: "/blood-pressure-calculator/", desc: "Classify cardiovascular health." },
          { name: "Blood Volume Calculator", path: "/blood-volume-calculator/", desc: "Estimate total blood volume." },
          { name: "Body Surface Area Calculator", path: "/body-surface-area-calculator/", desc: "Calculate BSA for clinical dosing." },
        ]}
      />
    </div>
  );
}
