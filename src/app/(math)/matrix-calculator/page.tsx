"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
export default function MatrixCalculator() {
  // 2x2 Matrix A
  const [a, setA] = useState([
    ["1", "2"],
    ["3", "4"],
  ]);
  // 2x2 Matrix B
  const [b, setB] = useState([
    ["2", "0"],
    ["1", "2"],
  ]);

  const [operation, setOperation] = useState("add");
  const [result, setResult] = useState<number[][] | null>(null);
  const [scalarRes, setScalarRes] = useState<number | null>(null);

  const parseMat = (m: string[][]) => [
    [parseFloat(m[0][0]) || 0, parseFloat(m[0][1]) || 0],
    [parseFloat(m[1][0]) || 0, parseFloat(m[1][1]) || 0],
  ];

  const calculate = () => {
    const matA = parseMat(a);
    const matB = parseMat(b);

    if (operation === "add") {
      setResult([
        [matA[0][0] + matB[0][0], matA[0][1] + matB[0][1]],
        [matA[1][0] + matB[1][0], matA[1][1] + matB[1][1]],
      ]);
      setScalarRes(null);
    } else if (operation === "sub") {
      setResult([
        [matA[0][0] - matB[0][0], matA[0][1] - matB[0][1]],
        [matA[1][0] - matB[1][0], matA[1][1] - matB[1][1]],
      ]);
      setScalarRes(null);
    } else if (operation === "mult") {
      // Dot product
      setResult([
        [
          matA[0][0] * matB[0][0] + matA[0][1] * matB[1][0],
          matA[0][0] * matB[0][1] + matA[0][1] * matB[1][1],
        ],
        [
          matA[1][0] * matB[0][0] + matA[1][1] * matB[1][0],
          matA[1][0] * matB[0][1] + matA[1][1] * matB[1][1],
        ],
      ]);
      setScalarRes(null);
    } else if (operation === "detA") {
      setScalarRes(matA[0][0] * matA[1][1] - matA[0][1] * matA[1][0]);
      setResult(null);
    } else if (operation === "detB") {
      setScalarRes(matB[0][0] * matB[1][1] - matB[0][1] * matB[1][0]);
      setResult(null);
    }
  };

  const handleAChange = (row: number, col: number, val: string) => {
    const newA = [...a];
    newA[row][col] = val;
    setA(newA);
  };

  const handleBChange = (row: number, col: number, val: string) => {
    const newB = [...b];
    newB[row][col] = val;
    setB(newB);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-emerald-900 font-serif">
          <span className="mr-3">🔢</span> 2x2 Matrix Calculator
        </h1>
        <p className="text-emerald-700 text-lg max-w-2xl mx-auto">
          Add, subtract, multiply, and find the determinant of 2x2 matrices
          instantly.
        </p>
      </div>

      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-zinc-200">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-10">
          {/* Matrix A */}
          <div className="flex flex-col items-center">
            <div className="text-emerald-800 font-bold mb-2 tracking-widest text-sm uppercase">
              Matrix A
            </div>
            <div className="relative p-2 flex">
              {/* Brackets */}
              <div className="border-l-4 border-t-4 border-b-4 border-zinc-800 w-4 rounded-l"></div>
              <div className="grid grid-cols-2 gap-2 px-2">
                <input
                  type="number"
                  step="any"
                  value={a[0][0]}
                  onChange={(e) => handleAChange(0, 0, e.target.value)}
                  className="w-16 h-16 text-center text-xl font-bold font-mono rounded bg-zinc-100 border-none focus:ring-2 focus:ring-emerald-500"
                />
                <input
                  type="number"
                  step="any"
                  value={a[0][1]}
                  onChange={(e) => handleAChange(0, 1, e.target.value)}
                  className="w-16 h-16 text-center text-xl font-bold font-mono rounded bg-zinc-100 border-none focus:ring-2 focus:ring-emerald-500"
                />
                <input
                  type="number"
                  step="any"
                  value={a[1][0]}
                  onChange={(e) => handleAChange(1, 0, e.target.value)}
                  className="w-16 h-16 text-center text-xl font-bold font-mono rounded bg-zinc-100 border-none focus:ring-2 focus:ring-emerald-500"
                />
                <input
                  type="number"
                  step="any"
                  value={a[1][1]}
                  onChange={(e) => handleAChange(1, 1, e.target.value)}
                  className="w-16 h-16 text-center text-xl font-bold font-mono rounded bg-zinc-100 border-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div className="border-r-4 border-t-4 border-b-4 border-zinc-800 w-4 rounded-r"></div>
            </div>
          </div>

          {/* Operator Select */}
          <div className="flex flex-col">
            <select
              value={operation}
              onChange={(e) => setOperation(e.target.value)}
              className="p-4 rounded-xl border-2 border-emerald-200 bg-emerald-50 font-bold text-emerald-900 shadow-sm cursor-pointer hover:border-emerald-400 transition"
            >
              <option value="add">A + B</option>
              <option value="sub">A - B</option>
              <option value="mult">A × B</option>
              <option value="detA">Determinant |A|</option>
              <option value="detB">Determinant |B|</option>
            </select>
          </div>

          {/* Matrix B */}
          <div
            className={`flex flex-col items-center transition-opacity ${operation === "detA" || operation === "detB" ? "opacity-30 pointer-events-none grayscale" : ""}`}
          >
            <div className="text-emerald-800 font-bold mb-2 tracking-widest text-sm uppercase">
              Matrix B
            </div>
            <div className="relative p-2 flex">
              <div className="border-l-4 border-t-4 border-b-4 border-zinc-800 w-4 rounded-l"></div>
              <div className="grid grid-cols-2 gap-2 px-2">
                <input
                  type="number"
                  step="any"
                  value={b[0][0]}
                  onChange={(e) => handleBChange(0, 0, e.target.value)}
                  className="w-16 h-16 text-center text-xl font-bold font-mono rounded bg-zinc-100 border-none focus:ring-2 focus:ring-emerald-500"
                />
                <input
                  type="number"
                  step="any"
                  value={b[0][1]}
                  onChange={(e) => handleBChange(0, 1, e.target.value)}
                  className="w-16 h-16 text-center text-xl font-bold font-mono rounded bg-zinc-100 border-none focus:ring-2 focus:ring-emerald-500"
                />
                <input
                  type="number"
                  step="any"
                  value={b[1][0]}
                  onChange={(e) => handleBChange(1, 0, e.target.value)}
                  className="w-16 h-16 text-center text-xl font-bold font-mono rounded bg-zinc-100 border-none focus:ring-2 focus:ring-emerald-500"
                />
                <input
                  type="number"
                  step="any"
                  value={b[1][1]}
                  onChange={(e) => handleBChange(1, 1, e.target.value)}
                  className="w-16 h-16 text-center text-xl font-bold font-mono rounded bg-zinc-100 border-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div className="border-r-4 border-t-4 border-b-4 border-zinc-800 w-4 rounded-r"></div>
            </div>
          </div>
        </div>

        <div className="flex justify-center border-t border-zinc-100 pt-8 mt-2">
          <button
            onClick={calculate}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-12 rounded-xl transition-colors shadow-xl shadow-emerald-600/30 uppercase tracking-widest text-sm group"
          >
            Calculate{" "}
            <span className="inline-block transform group-hover:translate-x-1 transition-transform">
              →
            </span>
          </button>
        </div>
      </div>

      {(result || scalarRes !== null) && (
        <div className="mt-8 bg-zinc-900 rounded-2xl p-6 md:p-12 shadow-2xl relative overflow-hidden text-center flex flex-col items-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600 rounded-full mix-blend-screen filter blur-[100px] opacity-20 pointer-events-none"></div>

          <h2 className="text-emerald-400 font-bold uppercase tracking-widest text-sm mb-6 relative z-10">
            Result
          </h2>

          <div className="relative z-10 flex text-white">
            {result && (
              <div className="flex items-center text-3xl md:text-5xl font-mono">
                <div className="border-l-[6px] border-t-[6px] border-b-[6px] border-emerald-500 w-4 md:w-6 h-full rounded-l"></div>
                <div className="grid grid-cols-2 gap-x-8 md:gap-x-16 gap-y-4 px-4 py-2 bg-black/30 backdrop-blur-md font-bold">
                  <div className="text-right">
                    {Number.isInteger(result[0][0])
                      ? result[0][0]
                      : result[0][0].toFixed(3)}
                  </div>
                  <div className="text-right">
                    {Number.isInteger(result[0][1])
                      ? result[0][1]
                      : result[0][1].toFixed(3)}
                  </div>
                  <div className="text-right">
                    {Number.isInteger(result[1][0])
                      ? result[1][0]
                      : result[1][0].toFixed(3)}
                  </div>
                  <div className="text-right">
                    {Number.isInteger(result[1][1])
                      ? result[1][1]
                      : result[1][1].toFixed(3)}
                  </div>
                </div>
                <div className="border-r-[6px] border-t-[6px] border-b-[6px] border-emerald-500 w-4 md:w-6 h-full rounded-r"></div>
              </div>
            )}

            {scalarRes !== null && (
              <div className="text-6xl font-black font-mono tracking-tight text-white drop-shadow-xl p-8 bg-black/40 rounded-3xl border border-white/10">
                {Number.isInteger(scalarRes) ? scalarRes : scalarRes.toFixed(4)}
              </div>
            )}
          </div>
        </div>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Matrix Calculator",
            operatingSystem: "All",
            applicationCategory: "EducationalApplication",
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title="2x2 Matrix Calculator"
          whatIsIt={
            <>
              <p>
                A <strong>Matrix Calculator</strong> is an advanced linearity
                tool that performs operations on multi-dimensional grids of
                numbers (matrices). This specific calculator handles 2x2 square
                matrices.
              </p>
              <p>
                It supports matrix addition, subtraction, matrix multiplication
                (dot product), and finding the determinant of either matrix to
                help students and engineers solve complex systems of linear
                equations.
              </p>

              <p className="mt-4 text-sm text-gray-500">
                <strong>Related Terms:</strong> Matrix Calculator
              </p>
            </>
          }
          formula={
            <>
              <p>
                Matrix operations follow very specific grid-based mathematics:
              </p>
              <ul className="list-disc pl-6 space-y-4 mt-4 text-zinc-700">
                <li>
                  <strong>Addition / Subtraction:</strong> Elements are added or
                  subtracted by their corresponding position in the grid. <br />{" "}
                  <code className="bg-zinc-100 p-1 px-2 rounded">
                    (A₁₁ + B₁₁)
                  </code>
                </li>
                <li>
                  <strong>Determinant |A|:</strong> For a 2x2 matrix{" "}
                  <code>[a, b; c, d]</code>, the determinant determines if the
                  matrix is strictly invertible. <br />{" "}
                  <strong className="font-mono bg-zinc-100 p-1 rounded">
                    |A| = (a × d) - (b × c)
                  </strong>
                </li>
                <li>
                  <strong>Multiplication (A × B):</strong> Dot product
                  calculated by multiplying rows of the first matrix by columns
                  of the second. <br />{" "}
                  <code className="bg-zinc-100 p-1 px-2 rounded">
                    C₁₁ = (A₁₁ × B₁₁) + (A₁₂ × B₂₁)
                  </code>
                </li>
              </ul>
            </>
          }
          example={
            <>
              <p className="mb-2">
                <strong>Finding the Determinant of Matrix A:</strong>
              </p>
              <div className="flex gap-4 items-center bg-zinc-50 p-4 rounded-xl border border-zinc-200 overflow-x-auto">
                <div className="font-mono text-center">
                  <div className="border-l-2 border-r-2 border-zinc-800 px-3 py-1">
                    5 &nbsp; 2
                  </div>
                  <div className="border-l-2 border-r-2 border-zinc-800 px-3 py-1 mt-1">
                    3 &nbsp; 4
                  </div>
                </div>
                <span className="font-bold text-xl text-emerald-700">→</span>
                <div className="font-mono bg-white p-3 rounded shadow-sm">
                  |A| = (5 × 4) - (2 × 3)
                  <br />
                  |A| = 20 - 6 = <strong>14</strong>
                </div>
              </div>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4">
              <li>
                <strong>Computer Graphics:</strong> Matrices are the fundamental
                math behind rotating, scaling, and translating 2D and 3D objects
                on a computer screen.
              </li>
              <li>
                <strong>Physics & Engineering:</strong> Used to model electronic
                circuits, quantum mechanics, and calculating forces in
                structural design.
              </li>
              <li>
                <strong>Solving Linear Equations:</strong> Cramer's Rule
                utilizes the determinant of 2x2 matrices to efficiently solve
                systems of two variables.
              </li>
            </ul>
          }
          faqs={[
            {
              question:
                "Does the order of multiplication matter (A × B vs B × A)?",
              answer:
                "Yes, absolutely! Unlike basic multiplication (where 3×4 is exactly the same as 4×3), matrix multiplication is NOT commutative. A × B will almost always yield a completely different matrix result than B × A.",
            },
            {
              question: "What does a determinant of 0 mean?",
              answer:
                "If the determinant of a matrix equals 0, the matrix is 'singular'. This means the matrix cannot be inverted (it has no inverse), and if it represents a system of linear equations, those equations have either entirely no solution or infinite solutions.",
            },
            {
              question: "How accurate is this calculator?",
              answer: "Our calculator uses industry-standard formulas to provide the most accurate results possible. However, it should be used for informational purposes only and not as a basis for formal calculations or legal advice.",
            }]}
          relatedCalculators={[
            {
              name: "Order of Operations Calculator",
              path: "/order-of-operations-calculator/",
              desc: "Evaluate basic arithmetic operations step-by-step.",
            },
            {
              name: "Quadratic Formula Calculator",
              path: "/quadratic-formula-calculator/",
              desc: "Solve polynomials up to the second degree safely.",
            },
            {
              name: "LCM Calculator",
              path: "/lcm-calculator/",
              desc: "Find the Least Common Multiple of large datasets.",
            },
            {
              name: "Percentage Calculator",
              path: "/percentage-calculator/",
              desc: "Easily calculate percentages, increases, and decreases.",
            }]}
        />
      </div>
    </div>
  );
}
