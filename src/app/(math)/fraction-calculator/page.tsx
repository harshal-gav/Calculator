"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import fractionSeoData from "@/data/seo-content/official/fraction-calculator.json";

export default function FractionCalculator() {
  const [num1, setNum1] = useState("");
  const [den1, setDen1] = useState("");
  const [num2, setNum2] = useState("");
  const [den2, setDen2] = useState("");
  const [operation, setOperation] = useState("+");

  const [result, setResult] = useState<{
    numerator: number;
    denominator: number;
    decimal: number;
    mixedWhole?: number;
    mixedNumerator?: number;
  } | null>(null);

  // Helper: Greatest Common Divisor
  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };

  const calculateFraction = () => {
    const n1 = parseInt(num1);
    const d1 = parseInt(den1);
    const n2 = parseInt(num2);
    const d2 = parseInt(den2);

    // Require valid numbers and non-zero denominators
    if (isNaN(n1) || isNaN(d1) || isNaN(n2) || isNaN(d2) || d1 === 0 || d2 === 0) {
      setResult(null);
      return;
    }

    let rn = 0;
    let rd = 0;

    switch (operation) {
      case "+":
        rn = n1 * d2 + n2 * d1;
        rd = d1 * d2;
        break;
      case "-":
        rn = n1 * d2 - n2 * d1;
        rd = d1 * d2;
        break;
      case "×":
        rn = n1 * n2;
        rd = d1 * d2;
        break;
      case "÷":
        if (n2 === 0) {
           setResult(null);
           return;
        }
        rn = n1 * d2;
        rd = d1 * n2;
        break;
    }

    if (rd === 0) {
        setResult(null);
        return;
    }

    // Simplify
    const divisor = Math.abs(gcd(rn, rd));
    rn = rn / divisor;
    rd = rd / divisor;

    // Ensure denominator is positive
    if (rd < 0) {
      rn = -rn;
      rd = -rd;
    }

    const decimal = rn / rd;
    let mixedWhole = 0;
    let mixedNumerator = 0;

    if (Math.abs(rn) >= Math.abs(rd) && rd !== 1 && rn !== 0) {
      mixedWhole = Math.trunc(rn / rd);
      mixedNumerator = Math.abs(rn % rd);
    }

    setResult({
      numerator: rn,
      denominator: rd,
      decimal,
      mixedWhole: mixedWhole !== 0 ? mixedWhole : undefined,
      mixedNumerator: mixedNumerator !== 0 ? mixedNumerator : undefined,
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-3xl shadow-xl border border-orange-50">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-orange-100 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Fraction Calculator</h1>
          <p className="text-slate-600 font-medium mt-1 text-lg">Perform arithmetic operations and simplify rational numbers perfectly.</p>
        </div>
        <div className="bg-orange-50 px-4 py-2 rounded-full border border-orange-100 shrink-0">
          <span className="text-orange-600 font-bold text-sm uppercase tracking-wider font-mono">Arithmetic</span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 mb-12">
        <div className="xl:col-span-6 space-y-6">
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-orange-100 shadow-sm space-y-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Fraction 1 */}
              <div className="flex flex-col items-center flex-1 w-full bg-zinc-50 border border-zinc-200 p-4 rounded-2xl">
                 <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest mb-3">Fraction A</span>
                 <input
                   type="number"
                   value={num1}
                   onChange={(e) => setNum1(e.target.value)}
                   className="w-24 text-center bg-white rounded-xl border border-zinc-200 p-3 shadow-sm focus:border-orange-500 font-black text-2xl outline-none"
                   placeholder="1"
                 />
                 <div className="w-full max-w-[6rem] h-1 bg-zinc-300 rounded-full my-3"></div>
                 <input
                   type="number"
                   value={den1}
                   onChange={(e) => setDen1(e.target.value)}
                   className="w-24 text-center bg-white rounded-xl border border-zinc-200 p-3 shadow-sm focus:border-orange-500 font-black text-2xl outline-none"
                   placeholder="2"
                 />
              </div>

              {/* Operator */}
              <div className="bg-orange-100 rounded-xl p-2 shrink-0 shadow-sm">
                <select
                  value={operation}
                  onChange={(e) => {
                     setOperation(e.target.value);
                     // Auto calc if inputs exist
                     if (num1 && den1 && num2 && den2) {
                         setTimeout(calculateFraction, 50);
                     }
                  }}
                  className="bg-transparent text-4xl font-black text-orange-600 cursor-pointer outline-none border-none py-2 px-3 text-center appearance-none"
                  style={{ textAlignLast: "center" }}
                >
                  <option value="+">+</option>
                  <option value="-">-</option>
                  <option value="×">×</option>
                  <option value="÷">÷</option>
                </select>
              </div>

              {/* Fraction 2 */}
              <div className="flex flex-col items-center flex-1 w-full bg-zinc-50 border border-zinc-200 p-4 rounded-2xl">
                 <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest mb-3">Fraction B</span>
                 <input
                   type="number"
                   value={num2}
                   onChange={(e) => setNum2(e.target.value)}
                   className="w-24 text-center bg-white rounded-xl border border-zinc-200 p-3 shadow-sm focus:border-orange-500 font-black text-2xl outline-none"
                   placeholder="3"
                 />
                 <div className="w-full max-w-[6rem] h-1 bg-zinc-300 rounded-full my-3"></div>
                 <input
                   type="number"
                   value={den2}
                   onChange={(e) => setDen2(e.target.value)}
                   onKeyDown={(e) => e.key === "Enter" && calculateFraction()}
                   className="w-24 text-center bg-white rounded-xl border border-zinc-200 p-3 shadow-sm focus:border-orange-500 font-black text-2xl outline-none"
                   placeholder="8"
                 />
              </div>
            </div>

            <button
              onClick={calculateFraction}
              className="w-full bg-orange-600 text-white font-black py-5 px-4 rounded-2xl hover:bg-orange-700 transition shadow-xl shadow-orange-200 text-xl uppercase tracking-widest active:scale-[0.98]"
            >
              Evaluate Fractions
            </button>
          </div>
        </div>

        <div className="xl:col-span-6 bg-slate-900 rounded-3xl p-8 border border-white/5 shadow-2xl flex flex-col justify-center relative overflow-hidden min-h-[400px]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500 rounded-full mix-blend-screen filter blur-[80px] opacity-10 pointer-events-none"></div>
          
          {result !== null ? (
            <div className="relative z-10 w-full flex flex-col items-center space-y-6">
                
                <div className="flex flex-col items-center bg-black/40 p-6 rounded-2xl border border-white/5 w-full">
                   <h3 className="text-orange-400/80 font-bold uppercase tracking-widest text-[10px] mb-4">Simplified Result</h3>
                   
                   <div className="text-6xl font-black text-white font-mono flex items-center justify-center">
                     {result.denominator === 1 ? (
                       <span>{result.numerator}</span>
                     ) : (
                       <div className="flex flex-col items-center">
                         <span>{result.numerator}</span>
                         <div className="w-24 h-1 bg-orange-500 rounded-full my-2"></div>
                         <span>{result.denominator}</span>
                       </div>
                     )}
                   </div>
                </div>

                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                    {result.mixedWhole !== undefined && result.mixedNumerator !== undefined ? (
                        <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex flex-col items-center justify-center">
                           <span className="text-zinc-500 font-bold uppercase tracking-widest text-[10px] mb-2">Mixed Number</span>
                           
                           <div className="text-3xl font-bold font-mono text-white flex items-center gap-3">
                              <span>{result.mixedWhole}</span>
                              <div className="flex flex-col items-center text-2xl">
                                 <span>{result.mixedNumerator}</span>
                                 <div className="w-8 h-px bg-orange-400 my-1"></div>
                                 <span>{result.denominator}</span>
                              </div>
                           </div>
                        </div>
                    ) : (
                         <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex flex-col items-center justify-center opacity-50">
                           <span className="text-zinc-500 font-bold uppercase tracking-widest text-[10px] mb-2">Mixed Number</span>
                           <span className="text-xs font-bold text-zinc-400 uppercase">N/A</span>
                        </div>
                    )}
                    
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex flex-col items-center justify-center">
                       <span className="text-zinc-500 font-bold uppercase tracking-widest text-[10px] mb-2">Decimal Form</span>
                       <span className="font-mono text-white font-bold text-2xl">
                          {parseFloat(result.decimal.toFixed(6))}
                       </span>
                    </div>
                </div>
                
            </div>
          ) : (
            <div className="text-center py-10 opacity-40 uppercase italic font-black text-4xl text-orange-400 tracking-tighter">
              Awaiting Math
            </div>
          )}
        </div>
      </div>

      <CalculatorSEO
        title={fractionSeoData.title}
        whatIsIt={fractionSeoData.whatIsIt}
        formula={fractionSeoData.formula}
        example={fractionSeoData.example}
        useCases={fractionSeoData.useCases}
        faqs={fractionSeoData.faqs}
        deepDive={fractionSeoData.deepDive}
        glossary={fractionSeoData.glossary}
        relatedCalculators={[
          {
            name: "Fraction Simplifier",
            path: "/fraction-simplifier-calculator/",
            desc: "Instantly reduce massive fractions down to their lowest common integer terms.",
          },
          {
            name: "Mixed Number Calculator",
            path: "/mixed-number-calculator/",
            desc: "Perform arithmetic operations strictly utilizing complex mixed fractions.",
          },
          {
            name: "Fraction to Decimal Converter",
            path: "/fraction-to-decimal-calculator/",
            desc: "Convert rational proportions into standardized decimal values.",
          },
          {
            name: "Decimal to Fraction Converter",
            path: "/decimal-to-fraction-calculator/",
            desc: "Map ugly, repeating decimals back into perfect, integer-based whole parts.",
          }
        ]}
      />
    </div>
  );
}
