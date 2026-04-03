"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function RootCalculator() {
  const [baseNumber, setBaseNumber] = useState("125");
  const [rootDegree, setRootDegree] = useState("3");

  const [result, setResult] = useState<{
    calculatedRoot: number;
    isComplex: boolean;
  } | null>(null);

  const calculateRoot = () => {
    const base = parseFloat(baseNumber);
    const degree = parseFloat(rootDegree);

    if (!isNaN(base) && !isNaN(degree) && degree !== 0) {
      if (base < 0 && degree % 2 === 0) {
         // Even root of a negative number yields a complex/imaginary number.
         setResult({ calculatedRoot: NaN, isComplex: true });
      } else if (base < 0 && degree % 2 !== 0) {
         // Odd root of a negative natural number
         const root = -Math.pow(Math.abs(base), 1 / degree);
         setResult({ calculatedRoot: root, isComplex: false });
      } else {
         const root = Math.pow(base, 1 / degree);
         setResult({ calculatedRoot: root, isComplex: false });
      }
    } else {
        setResult(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-gray-900 border-b pb-4">
        Root Calculator
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Calculate the exact Square Root, Cube Root, or custom Nth root of any mathematical integer or decimal.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Root Degree (Nth):
              </label>
              <div className="flex gap-2">
                 <button onClick={() => { setRootDegree("2"); }} className="px-4 border border-gray-300 rounded font-bold hover:bg-gray-100 transition shadow-sm text-gray-700 bg-white">2nd (Square)</button>
                 <button onClick={() => { setRootDegree("3"); }} className="px-4 border border-gray-300 rounded font-bold hover:bg-gray-100 transition shadow-sm text-gray-700 bg-white">3rd (Cube)</button>
              </div>
              <input
                type="number"
                value={rootDegree}
                onChange={(e) => setRootDegree(e.target.value)}
                className="w-full mt-3 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 p-3 border text-lg font-mono text-emerald-900"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Radicand (Base Number x):
              </label>
              <input
                type="number"
                value={baseNumber}
                onChange={(e) => setBaseNumber(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 p-3 border text-lg font-mono"
                placeholder="e.g. 16, 144, 125"
              />
            </div>
          </div>

          <button
            onClick={calculateRoot}
            className="mt-8 w-full bg-emerald-600 text-white font-bold py-4 rounded-xl hover:bg-emerald-700 transition shadow-lg text-lg uppercase tracking-wide"
          >
            Extract Root
          </button>
        </div>

        <div className="bg-emerald-50 rounded-xl p-8 border border-emerald-200 shadow-inner flex flex-col justify-center items-center">
          {result !== null ? (
            <div className="text-center w-full">
               {result.isComplex ? (
                 <div className="text-red-500 font-bold p-4 bg-red-50 rounded-lg border border-red-200">
                    Calculates to a non-real Imaginary Number (<i>i</i>)
                 </div>
               ) : (
                <>
                  <div className="text-lg font-bold text-emerald-900 mb-4 uppercase tracking-wider">
                    {rootDegree === "2" ? "Square Root" : rootDegree === "3" ? "Cube Root" : `${rootDegree}th Root`} Result
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-emerald-100 flex items-center justify-center space-x-4 mb-4">
                     <div className="text-2xl font-mono text-gray-400">
                        <sup>{rootDegree}</sup>√<span className="border-t-2 border-gray-400 ml-1 py-1 px-2 text-gray-800">{baseNumber}</span>
                     </div>
                     <span className="text-2xl text-gray-400">=</span>
                     <div className="text-3xl md:text-5xl font-black text-emerald-600 overflow-x-auto">
                        {result.calculatedRoot}
                     </div>
                  </div>
                </>
               )}
            </div>
          ) : (
             <div className="text-center text-emerald-800 opacity-60 font-medium p-8">
                Input your root sequence parameters to compute.
             </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title="Nth Root Calculator"
        whatIsIt={
          <>
            <p>
              The <strong>Root Calculator</strong> finds the principal <code>n</code>-th root of any real number. The root of a number <em>x</em> is another number which, when multiplied by itself <em>n</em> times, equals <em>x</em>.
            </p>
          </>
        }
        formula={
          <>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 font-mono text-lg text-indigo-700 text-center shadow-sm my-6">
              ⁿ√x = y ⇔ yⁿ = x
            </div>
            <p className="text-sm text-slate-500 text-center">
              Calculating the n-th root of a given value.
            </p>
          </>
        }
        example={
          <>
            <p>Taking the <strong>3rd (Cube) Root</strong> of <strong>125</strong>:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
              <li>125<sup>(1/3)</sup></li>
              <li>Wait, we know that 5 × 5 × 5 = 125.</li>
              <li>Therefore, the Cube Root of 125 is exactly <strong>5</strong>.</li>
            </ul>
          </>
        }
        useCases={<ul className="list-disc pl-6 space-y-4"><li><strong>Advanced Geometry:</strong> Used extensively to find the straight side length of a volumetric cube when only strictly the volume is known.</li></ul>}
        faqs={[
            {
              question: "How accurate is this calculator?",
              answer: "Our calculator uses industry-standard formulas to provide the most accurate results possible. However, it should be used for informational purposes only and not as a basis for formal calculations or legal advice.",
            },
            {
              question: "Is this tool free to use?",
              answer: "Yes, all our calculators are 100% free to use. We do not require any registration, personal information, or subscriptions.",
            },
            {
              question: "Can I use this on my mobile device?",
              answer: "Absolutely! Our website is fully responsive and optimized for all screen sizes, including smartphones and tablets, so you can calculate on the go.",
            }]}
        relatedCalculators={[
            {
              name: "Percentage Calculator",
              path: "/percentage-calculator/",
              desc: "Easily calculate percentages, increases, and decreases.",
            },
            {
              name: "Scientific Calculator",
              path: "/scientific-calculator/",
              desc: "Perform advanced mathematical operations and functions.",
            },
            {
              name: "Quadratic Formula Calculator",
              path: "/quadratic-formula-calculator/",
              desc: "Solve quadratic equations instantly.",
            },
            {
              name: "Matrix Calculator",
              path: "/matrix-calculator/",
              desc: "Perform addition, subtraction, and multiplication on matrices.",
            }]}
      />
    </div>
  );
}
