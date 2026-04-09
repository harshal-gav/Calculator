"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import basicSeoData from "@/data/seo-content/official/basic-calculator.json";

export default function BasicCalculator() {
  const [display, setDisplay] = useState("0");
  const [equation, setEquation] = useState("");
  const [isNewNumber, setIsNewNumber] = useState(true);

  const handleNumber = (n: string) => {
    if (isNewNumber) {
      setDisplay(n);
      setIsNewNumber(false);
    } else {
      setDisplay(display === "0" ? n : display + n);
    }
  };

  const handleOperator = (op: string) => {
    setEquation(display + " " + op + " ");
    setIsNewNumber(true);
  };

  const calculate = () => {
    try {
      // Basic math evaluation for 2-term expressions
      const parts = equation.trim().split(" ");
      if (parts.length < 2) return;
      
      const num1 = parseFloat(parts[0]);
      const op = parts[1];
      const num2 = parseFloat(display);
      
      let res = 0;
      if (op === "+") res = num1 + num2;
      else if (op === "-") res = num1 - num2;
      else if (op === "×" || op === "*") res = num1 * num2;
      else if (op === "÷" || op === "/") res = num1 / num2;
      
      setEquation(equation + display + " =");
      setDisplay(res.toString());
      setIsNewNumber(true);
    } catch (e) {
      setDisplay("Error");
    }
  };

  const clear = () => {
    setDisplay("0");
    setEquation("");
    setIsNewNumber(true);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-zinc-100 rounded-3xl shadow-xl border border-zinc-200">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-zinc-200 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black text-zinc-900 tracking-tight">Basic Calculator</h1>
          <p className="text-zinc-600 font-medium mt-1 text-lg">Everyday arithmetic for quick and accurate results.</p>
        </div>
        <div className="bg-zinc-200 px-4 py-2 rounded-full border border-zinc-300 shrink-0">
          <span className="text-zinc-700 font-bold text-sm uppercase tracking-wider">everyday</span>
        </div>
      </div>

      <div className="max-w-md mx-auto mb-16">
        <div className="bg-zinc-800 rounded-3xl p-6 shadow-2xl border-4 border-zinc-700">
          {/* Display */}
          <div className="bg-zinc-900 rounded-2xl p-6 mb-6 text-right overflow-hidden border border-zinc-700 shadow-inner">
            <div className="text-zinc-500 text-xs font-bold h-6 mb-1 truncate font-mono uppercase tracking-widest">{equation}</div>
            <div className="text-white text-5xl md:text-6xl font-black truncate font-mono leading-tight">{display}</div>
          </div>

          {/* Keypad */}
          <div className="grid grid-cols-4 gap-4">
            <button onClick={clear} className="col-span-2 bg-zinc-600 hover:bg-zinc-500 text-white font-black py-4 rounded-xl text-xl shadow-lg transition-all active:scale-95 uppercase tracking-tighter">Clear</button>
            <button onClick={() => setDisplay(display.startsWith("-") ? display.slice(1) : "-" + display)} className="bg-zinc-600 hover:bg-zinc-500 text-white font-black py-4 rounded-xl text-xl shadow-lg transition-all active:scale-95">±</button>
            <button onClick={() => handleOperator("÷")} className="bg-orange-500 hover:bg-orange-400 text-white font-black py-4 rounded-xl text-2xl shadow-lg transition-all active:scale-95">÷</button>

            {[7, 8, 9].map(n => (
              <button key={n} onClick={() => handleNumber(n.toString())} className="bg-zinc-700 hover:bg-zinc-600 text-white font-black py-4 rounded-xl text-2xl shadow-lg transition-all active:scale-95">{n}</button>
            ))}
            <button onClick={() => handleOperator("×")} className="bg-orange-500 hover:bg-orange-400 text-white font-black py-4 rounded-xl text-2xl shadow-lg transition-all active:scale-95">×</button>

            {[4, 5, 6].map(n => (
              <button key={n} onClick={() => handleNumber(n.toString())} className="bg-zinc-700 hover:bg-zinc-600 text-white font-black py-4 rounded-xl text-2xl shadow-lg transition-all active:scale-95">{n}</button>
            ))}
            <button onClick={() => handleOperator("-")} className="bg-orange-500 hover:bg-orange-400 text-white font-black py-4 rounded-xl text-2xl shadow-lg transition-all active:scale-95">-</button>

            {[1, 2, 3].map(n => (
              <button key={n} onClick={() => handleNumber(n.toString())} className="bg-zinc-700 hover:bg-zinc-600 text-white font-black py-4 rounded-xl text-2xl shadow-lg transition-all active:scale-95">{n}</button>
            ))}
            <button onClick={() => handleOperator("+")} className="bg-orange-500 hover:bg-orange-400 text-white font-black py-4 rounded-xl text-2xl shadow-lg transition-all active:scale-95">+</button>

            <button onClick={() => handleNumber("0")} className="col-span-2 bg-zinc-700 hover:bg-zinc-600 text-white font-black py-4 rounded-xl text-2xl shadow-lg transition-all active:scale-95">0</button>
            <button onClick={() => !display.includes(".") && setDisplay(display + ".")} className="bg-zinc-700 hover:bg-zinc-600 text-white font-black py-4 rounded-xl text-2xl shadow-lg transition-all active:scale-95">.</button>
            <button onClick={calculate} className="bg-orange-600 hover:bg-orange-500 text-white font-black py-4 rounded-xl text-3xl shadow-lg transition-all active:scale-95 shadow-orange-600/30">=</button>
          </div>
        </div>
      </div>

      <CalculatorSEO
        title={basicSeoData.title}
        whatIsIt={basicSeoData.whatIsIt}
        formula={basicSeoData.formula}
        example={basicSeoData.example}
        useCases={basicSeoData.useCases}
        faqs={basicSeoData.faqs}
        deepDive={basicSeoData.deepDive}
        glossary={basicSeoData.glossary}
        relatedCalculators={[
          {
            name: "Scientific Calculator",
            path: "/scientific-calculator/",
            desc: "Move beyond the basics with trigonometry, logarithms, and advanced physics constants.",
          },
          {
            name: "Percentage Calculator",
            path: "/percentage-calculator/",
            desc: "Calculate ratios and percentage changes across different values.",
          },
          {
            name: "Average Calculator",
            path: "/average-calculator/",
            desc: "Find the mathematical mean of any structured dataset.",
          },
          {
            name: "Financial Calculator",
            path: "/loan-calculator/",
            desc: "Apply basic math to complex real-world loan and interest scenarios.",
          }
        ]}
      />
    </div>
  );
}
