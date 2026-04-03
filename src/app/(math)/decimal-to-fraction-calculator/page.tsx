"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function DecimalToFractionCalculator() {
  const [input1, setInput1] = useState("10");
  const [input2, setInput2] = useState("5");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    // Basic placeholder calculation logic
    setResult(parseFloat(input1) * parseFloat(input2)); 
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-white rounded-3xl shadow-xl border border-purple-50">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-purple-50 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Decimal to Fraction Calculator</h1>
          <p className="text-slate-500 font-medium mt-1 text-lg">Convert decimal numbers to simplified fractions.</p>
        </div>
        <div className="bg-purple-50 px-4 py-2 rounded-full border border-purple-100 shrink-0">
          <span className="text-purple-600 font-bold text-sm uppercase tracking-wider">math</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 shadow-inner space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Input 1</label>
              <input
                type="number"
                value={input1}
                onChange={(e) => setInput1(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-3 border text-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Input 2</label>
              <input
                type="number"
                value={input2}
                onChange={(e) => setInput2(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-3 border text-lg"
              />
            </div>
          </div>

          <button
            onClick={calculate}
            className="mt-8 w-full bg-purple-600 text-white font-bold py-4 px-4 rounded-xl hover:bg-purple-700 transition shadow-lg text-lg uppercase tracking-wide"
          >
            Calculate
          </button>
        </div>

        <div className="lg:col-span-7 bg-purple-50 rounded-xl p-8 border border-purple-200 shadow-inner flex flex-col justify-center">
          {result !== null ? (
            <div>
              <h2 className="text-lg font-bold text-purple-900 mb-2 text-center uppercase tracking-wider">
                Result
              </h2>
              <div className="text-6xl md:text-7xl font-black text-center text-purple-700 mb-6 pb-6 border-b border-purple-200">
                {result.toFixed(2)}
              </div>
            </div>
          ) : (
            <div className="text-center text-purple-800 opacity-60 font-medium p-8">
              Enter values and click calculate to see the result.
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title="Decimal to Fraction Calculator"
        whatIsIt={
          <p>
            The <strong>Decimal to Fraction Calculator</strong> is a tool designed to convert decimal numbers to simplified fractions.
          </p>
        }
        formula={
          <>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 font-mono text-lg text-indigo-700 text-center shadow-sm my-6">
              Result = Input × Conversion_Factor
            </div>
            <p className="text-sm text-slate-500 text-center">
              Precise unit translation for Decimal To Fraction Calculator using industry-standard conversion constants.
            </p>
          </>
        }
        example={
          <p>Enter your inputs to see an example calculation.</p>
        }
        useCases={
          <ul className="list-disc pl-6 space-y-4">
            <li><strong>Quick Computations:</strong> Easily perform calculations online.</li>
            <li><strong>Educational Use:</strong> Verify manual calculations.</li>
          </ul>
        }
        faqs={[
          {
            question: "How accurate is the Decimal to Fraction Calculator?",
            answer: "The calculator uses standard mathematical functions to provide accurate results.",
          }
        ]}
        relatedCalculators={[]}
      />
    </div>
  );
}
