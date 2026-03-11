"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function SlopeCalculator() {
  const [x1, setX1] = useState("0");
  const [y1, setY1] = useState("0");
  const [x2, setX2] = useState("3");
  const [y2, setY2] = useState("4");

  const [result, setResult] = useState<{
    slope: string;
    angleDecimal: string;
    yIntercept: string;
    equation: string;
    steps: string;
  } | null>(null);

  const calculate = () => {
    const p1x = parseFloat(x1);
    const p1y = parseFloat(y1);
    const p2x = parseFloat(x2);
    const p2y = parseFloat(y2);

    if (isNaN(p1x) || isNaN(p1y) || isNaN(p2x) || isNaN(p2y)) {
      setResult(null);
      return;
    }

    const dx = p2x - p1x;
    const dy = p2y - p1y;
    
    let slope = "";
    let angleDecimal = "";
    let yIntercept = "";
    let equation = "";
    let steps = "";

    if (dx === 0) {
      slope = "Undefined";
      angleDecimal = "90° or -90°";
      yIntercept = "None";
      equation = `x = ${p1x}`;
      steps = `m = (y₂ - y₁) / (x₂ - x₁)
m = (${p2y} - ${p1y}) / (${p2x} - ${p1x})
m = ${dy} / 0
m = Undefined (Vertical Line)

A vertical line does not cross the y-axis, therefore the y-intercept is undefined.
The equation of this line is simply x = ${p1x}.`;
    } else {
      const m = dy / dx;
      const b = p1y - m * p1x;
      const angle = (Math.atan(m) * 180) / Math.PI;

      slope = m.toFixed(4).replace(/\.0000$/, "");
      angleDecimal = angle.toFixed(4) + "°";
      yIntercept = b.toFixed(4).replace(/\.0000$/, "");
      
      const bSign = b >= 0 ? "+" : "-";
      const bAbs = Math.abs(b).toFixed(4).replace(/\.0000$/, "");
      equation = `y = ${slope}x ${b === 0 ? "" : `${bSign} ${bAbs}`}`.trim();

      steps = `Step 1: Find the Slope (m)
m = (y₂ - y₁) / (x₂ - x₁)
m = (${p2y} - ${p1y}) / (${p2x} - ${p1x})
m = ${dy} / ${dx}
m = ${slope}

Step 2: Find the y-intercept (b)
b = y₁ - m * x₁
b = ${p1y} - (${slope} * ${p1x})
b = ${yIntercept}

Step 3: Write the Equation of the Line
y = mx + b
${equation}

Step 4: Find the Angle (θ)
θ = arctan(m)
θ = arctan(${slope})
θ ≈ ${angleDecimal}`;
    }

    setResult({
      slope,
      angleDecimal,
      yIntercept,
      equation,
      steps,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-emerald-900 flex items-center justify-center font-serif">
          <span className="mr-3">📈</span> Slope Calculator
        </h1>
        <p className="text-emerald-700 text-lg max-w-2xl mx-auto">
          Calculate the exact slope (m), y-intercept, and angle of a line from two coordinate points.
        </p>
      </div>

      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-zinc-200 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
            <h3 className="font-bold text-emerald-900 mb-4 uppercase tracking-widest text-sm border-b border-emerald-200 pb-2">
              Point 1 (x₁, y₁)
            </h3>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-xs font-bold text-zinc-500 mb-1">
                  X₁ Coordinate
                </label>
                <input
                  type="number"
                  step="any"
                  value={x1}
                  onChange={(e) => setX1(e.target.value)}
                  className="w-full rounded-lg border-zinc-300 shadow-sm p-3 border focus:border-emerald-500 font-bold bg-white text-lg"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-bold text-zinc-500 mb-1">
                  Y₁ Coordinate
                </label>
                <input
                  type="number"
                  step="any"
                  value={y1}
                  onChange={(e) => setY1(e.target.value)}
                  className="w-full rounded-lg border-zinc-300 shadow-sm p-3 border focus:border-emerald-500 font-bold bg-white text-lg"
                />
              </div>
            </div>
          </div>

          <div className="bg-amber-50 p-6 rounded-xl border border-amber-100">
            <h3 className="font-bold text-amber-900 mb-4 uppercase tracking-widest text-sm border-b border-amber-200 pb-2">
              Point 2 (x₂, y₂)
            </h3>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-xs font-bold text-zinc-500 mb-1">
                  X₂ Coordinate
                </label>
                <input
                  type="number"
                  step="any"
                  value={x2}
                  onChange={(e) => setX2(e.target.value)}
                  className="w-full rounded-lg border-zinc-300 shadow-sm p-3 border focus:border-emerald-500 font-bold bg-white text-lg"
                  onKeyDown={(e) => e.key === "Enter" && calculate()}
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-bold text-zinc-500 mb-1">
                  Y₂ Coordinate
                </label>
                <input
                  type="number"
                  step="any"
                  value={y2}
                  onChange={(e) => setY2(e.target.value)}
                  className="w-full rounded-lg border-zinc-300 shadow-sm p-3 border focus:border-emerald-500 font-bold bg-white text-lg"
                  onKeyDown={(e) => e.key === "Enter" && calculate()}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={calculate}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-emerald-600/30 uppercase tracking-widest text-lg"
          >
            Calculate Slope
          </button>
        </div>
      </div>

      {result !== null && (
        <div className="bg-emerald-950 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center gap-8 mb-8">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

          <div className="z-10 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="bg-black/40 p-6 rounded-xl border border-white/10">
              <h2 className="text-emerald-400 font-bold uppercase tracking-widest text-xs mb-2">Slope (m)</h2>
              <div className="font-mono text-white font-black text-3xl break-all">{result.slope}</div>
            </div>
            <div className="bg-black/40 p-6 rounded-xl border border-white/10">
              <h2 className="text-emerald-400 font-bold uppercase tracking-widest text-xs mb-2">Equation</h2>
              <div className="font-mono text-white font-black text-2xl break-all flex items-center justify-center h-full pb-2">{result.equation}</div>
            </div>
            <div className="bg-black/40 p-6 rounded-xl border border-white/10">
              <h2 className="text-emerald-400 font-bold uppercase tracking-widest text-xs mb-2">Angle (θ)</h2>
              <div className="font-mono text-white font-black text-3xl break-all">{result.angleDecimal}</div>
            </div>
            <div className="bg-black/40 p-6 rounded-xl border border-white/10">
              <h2 className="text-emerald-400 font-bold uppercase tracking-widest text-xs mb-2">Y-Intercept (b)</h2>
              <div className="font-mono text-white font-black text-3xl break-all">{result.yIntercept}</div>
            </div>
          </div>

          <div className="z-10 w-full bg-black/40 p-6 rounded-xl border border-white/10">
            <h3 className="text-emerald-300 font-bold uppercase tracking-wider text-[10px] mb-3">
              Step-by-step Solution
            </h3>
            <pre className="font-mono text-zinc-300 text-sm whitespace-pre-wrap">
              {result.steps}
            </pre>
          </div>
        </div>
      )}

      <div className="bg-zinc-100 p-6 rounded-xl border border-zinc-200 text-sm text-zinc-600 max-w-2xl mx-auto space-y-2 text-center">
        <p className="font-bold text-zinc-800 uppercase tracking-widest mb-2">
          Slope Formula
        </p>
        <div className="inline-block bg-white p-4 rounded-lg shadow-sm font-mono border border-zinc-200 mb-2">
          m = (y₂ - y₁) / (x₂ - x₁)
        </div>
        <p>
          Derived from the ratio of the change in y (rise) to the change in x (run) between any two distinct points on a line.
        </p>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Slope Calculator",
            operatingSystem: "All",
            applicationCategory: "EducationalApplication",
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title="Line Slope & Intercept Calculator"
          whatIsIt={
            <>
              <p>
                The <strong>Slope Calculator</strong> computes the exact slope, angle, and y-intercept of a straight line connecting two distinct points on a standard 2D Cartesian coordinate plane.
              </p>
              <p>
                In mathematics, the slope (m) of a line describes its steepness and direction. It is a fundamental concept in algebra and calculus that characterizes the rate of change of a linear function. A positive slope indicates the line rises from left to right, while a negative slope indicates the line falls from left to right. A horizontal line has a slope of zero, and a vertical line has an undefined slope.
              </p>
            </>
          }
          formula={
            <>
              <p>
                To find the slope (m) between two points P₁ = (x₁, y₁) and P₂ = (x₂, y₂), you calculate the ratio of the "rise" (change in y) over the "run" (change in x):
              </p>
              <div className="bg-emerald-50 p-4 rounded-lg font-mono text-center text-[15px] shadow-sm my-4 text-emerald-900 border border-emerald-100">
                m = (y₂ - y₁) / (x₂ - x₁)
              </div>
              <p>
                Using the slope, the Point-Slope Form of the line is y - y₁ = m(x - x₁), which is then algebraicly manipulated into the Slope-Intercept Form:
              </p>
              <div className="bg-emerald-50 p-4 rounded-lg font-mono text-center text-[15px] shadow-sm my-4 text-emerald-900 border border-emerald-100">
                y = mx + b
              </div>
              <p>
                Where 'm' is the slope and 'b' is the y-intercept.
              </p>
            </>
          }
          example={
            <>
              <p>
                Suppose you want to find the exact slope and equation for a line connecting <strong>Point A (0, 0)</strong> and <strong>Point B (3, 4)</strong>.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                <li>
                  <strong>Step 1 (Find Differences):</strong> Change in y = (4 - 0) = 4. Change in x = (3 - 0) = 3.
                </li>
                <li>
                  <strong>Step 2 (Divide):</strong> Slope (m) = 4 / 3 ≈ 1.3333.
                </li>
                <li>
                  <strong>Step 3 (Find Y-Intercept):</strong> Setup y = mx + b using Point A. 0 = 1.3333*(0) + b. b = 0.
                </li>
                <li>
                  <strong>Step 4 (Line Equation):</strong> The equation is exactly <strong>y = 1.3333x</strong>.
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-gray-700">
              <li>
                <strong>Architecture:</strong> Calculating roof pitches (rise over run) for safe home additions.
              </li>
              <li>
                <strong>Economics:</strong> Defining the marginal rates of substitution on a straight line demand curve.
              </li>
              <li>
                <strong>Algebra Homework:</strong> Stepping through point-slope homework assignments efficiently.
              </li>
            </ul>
          }
          faqs={[
            {
              question: "What is an undefined slope?",
              answer:
                "An undefined slope occurs when x₁ and x₂ are the same value. Because the difference between the x's is 0, the denominator of the slope formula is zero. Since division by zero is undefined in mathematics, the slope is undefined, forming a perfectly vertical line.",
            },
            {
              question: "Does the order of the points matter?",
              answer:
                "No. As long as you consistently subtract the first point's values from the second point's values (or vice versa) for both x and y, the resulting slope ratio will be exactly identical. For instance, -4 / -3 is exactly the same as 4 / 3.",
            },
          ]}
          relatedCalculators={[
            {
              name: "Distance Calculator",
              path: "/distance-calculator",
              desc: "Calculate the geometric distance between two coordinate points.",
            },
            {
              name: "Midpoint Calculator",
              path: "/midpoint-calculator",
              desc: "Easily identify the exact midpoint crossing between your two selected coordinates.",
            },
          ]}
        />
      </div>
    </div>
  );
}
