"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function SlopeCalculator() {
  const [x1, setX1] = useState("0");
  const [y1, setY1] = useState("0");
  const [x2, setX2] = useState("5");
  const [y2, setY2] = useState("10");

  const [result, setResult] = useState<{
    slope: number | "Undefined (Vertical line)";
    yIntercept: number | null;
    distance: number;
    angleDegrees: number;
    equation: string;
  } | null>(null);

  const calculateSlope = () => {
    const pX1 = parseFloat(x1);
    const pY1 = parseFloat(y1);
    const pX2 = parseFloat(x2);
    const pY2 = parseFloat(y2);

    if (!isNaN(pX1) && !isNaN(pY1) && !isNaN(pX2) && !isNaN(pY2)) {
      const deltaY = pY2 - pY1;
      const deltaX = pX2 - pX1;
      
      let slope: number | "Undefined (Vertical line)";
      let yIntercept: number | null = null;
      let equation = "";

      if (deltaX === 0) {
         slope = "Undefined (Vertical line)";
         equation = `x = ${pX1}`;
      } else {
         slope = deltaY / deltaX;
         yIntercept = pY1 - (slope * pX1);
         
         if (slope === 0) {
            equation = `y = ${yIntercept}`;
         } else {
            const bSign = yIntercept >= 0 ? "+" : "-";
            const bStr = Math.abs(yIntercept) === 0 ? "" : ` ${bSign} ${Math.abs(yIntercept)}`;
            equation = `y = ${slope}x${bStr}`;
         }
      }

      // Distance Math.sqrt(dx^2 + dy^2)
      const distance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));

      // Angle -> arctangent of slope
      let angleDegrees = 90;
      if (typeof slope === "number") {
         const angleRadians = Math.atan(slope);
         angleDegrees = angleRadians * (180 / Math.PI);
      }

      setResult({
        slope,
        yIntercept,
        distance,
        angleDegrees,
        equation,
      });
    } else {
        setResult(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-4xl font-extrabold mb-4 text-gray-900 border-b pb-4">
        Slope & Line Equation Calculator
      </h1>
      <p className="mb-8 text-gray-600 text-lg">
        Input Cartesian coordinates (X, Y) to calculate the precise slope, y-intercept, exact distance, and angle of trajectory.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-5 bg-gray-50 p-6 rounded-xl border border-gray-200">
          
          <div className="space-y-6">
            <div className="bg-white p-4 border border-blue-200 rounded-lg shadow-sm">
              <h2 className="text-sm font-bold mb-3 text-blue-800 uppercase tracking-wider">Point 1 Coordinates</h2>
              <div className="flex gap-4">
                 <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">X1 Value</label>
                    <input type="number" value={x1} onChange={e => setX1(e.target.value)} className="w-full rounded border-gray-300 p-2 focus:ring-blue-500" />
                 </div>
                 <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Y1 Value</label>
                    <input type="number" value={y1} onChange={e => setY1(e.target.value)} className="w-full rounded border-gray-300 p-2 focus:ring-blue-500" />
                 </div>
              </div>
            </div>

            <div className="bg-white p-4 border border-blue-200 rounded-lg shadow-sm">
              <h2 className="text-sm font-bold mb-3 text-blue-800 uppercase tracking-wider">Point 2 Coordinates</h2>
              <div className="flex gap-4">
                 <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">X2 Value</label>
                    <input type="number" value={x2} onChange={e => setX2(e.target.value)} className="w-full rounded border-gray-300 p-2 focus:ring-blue-500" />
                 </div>
                 <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Y2 Value</label>
                    <input type="number" value={y2} onChange={e => setY2(e.target.value)} className="w-full rounded border-gray-300 p-2 focus:ring-blue-500" />
                 </div>
              </div>
            </div>
          </div>

          <button
            onClick={calculateSlope}
            className="mt-8 w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition shadow-lg text-lg uppercase tracking-wide"
          >
            Calculate Line Data
          </button>
        </div>

        <div className="lg:col-span-7 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {result !== null ? (
            <div>
                <div className="bg-blue-50 p-4 border-b border-blue-100 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-blue-900 uppercase">Analysis Results</h2>
                </div>
                
                <div className="p-8">
                  <div className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-100 shadow-inner">
                    <div className="text-sm text-gray-500 font-bold uppercase mb-2 tracking-wider text-center">
                        Gradient Slope (m)
                    </div>
                    <div className="text-4xl md:text-5xl font-black text-center text-blue-600">
                        {typeof result.slope === 'number' ? result.slope.toPrecision(6) : result.slope}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-lg bg-white p-4 rounded-lg shadow-sm border border-gray-100 border-l-4 border-blue-500">
                      <span className="text-gray-600 font-semibold">Standard Equation:</span>
                      <span className="font-bold text-gray-900 font-mono text-xl bg-gray-100 px-3 py-1 rounded">
                         {result.equation}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-lg bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                      <span className="text-gray-600 font-semibold">Y-Intercept (b):</span>
                      <span className="font-bold text-gray-900">
                         {result.yIntercept !== null ? `(0, ${parseFloat(result.yIntercept.toPrecision(6))})` : "None"}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                      <span className="text-gray-500 font-semibold">Absolute Distance (d):</span>
                      <span className="font-bold text-gray-600">
                         {result.distance.toFixed(4)} units
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-sm bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                      <span className="text-gray-500 font-semibold">Trajectory Angle (θ):</span>
                      <span className="font-bold text-gray-600">
                         {result.angleDegrees.toFixed(4)}°
                      </span>
                    </div>
                  </div>
                </div>
            </div>
          ) : (
             <div className="text-center text-blue-800 opacity-60 font-medium p-12 my-auto">
                Supply two geometric (x,y) points extending along a linear plane.
             </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title="Slope & Coordinates Calculator"
        whatIsIt={
          <>
            <p>
              In mathematics, the <strong>slope</strong> (or abstract gradient) characterizes the absolute steepness and specific direction of a straight line connecting two exact coordinates on a Cartesian plane.
            </p>
          </>
        }
        formula={
          <>
            <p>We dictate the slope as mathematical <code>m</code> inside algebra. The formula to calculate it relies strictly on "Rise over Run":</p>
            <p className="mt-4 font-mono text-lg bg-gray-50 py-3 font-bold text-gray-800 px-6 inline-block rounded-lg shadow-sm">
               m = (y₂ - y₁) / (x₂ - x₁)
            </p>
            <p className="mt-4">Furthermore, to express the entire infinite geometric line, we rely on standard Slope-Intercept form:</p>
            <p className="mt-2 font-mono text-lg bg-gray-50 py-3 font-bold text-gray-800 px-6 inline-block rounded-lg shadow-sm">
               y = mx + b
            </p>
          </>
        }
        example={<></>}
        useCases={<ul className="list-disc pl-6 space-y-4"><li><strong>Civil Contracting:</strong> Estimating precise road gradients, sewer runoff angles, and roofing pitches so construction perfectly matches blueprints.</li></ul>}
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
              path: "/percentage-calculator",
              desc: "Easily calculate percentages, increases, and decreases.",
            },
            {
              name: "Scientific Calculator",
              path: "/scientific-calculator",
              desc: "Perform advanced mathematical operations and functions.",
            },
            {
              name: "Quadratic Formula Calculator",
              path: "/quadratic-formula-calculator",
              desc: "Solve quadratic equations instantly.",
            },
            {
              name: "Matrix Calculator",
              path: "/matrix-calculator",
              desc: "Perform addition, subtraction, and multiplication on matrices.",
            }]}
      />
    </div>
  );
}
