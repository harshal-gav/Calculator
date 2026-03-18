import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const calculators = [
  { id: 'chi-square-calculator', title: 'Chi-Square Calculator', cat: '(math)', desc: 'Calculate chi-square statistics for categorical data.' },
  { id: 'sum-calculator', title: 'Sum Calculator', cat: '(math)', desc: 'Quickly calculate the sum of a series of numbers.' },
  { id: 'trigonometry-calculator', title: 'Trigonometry Calculator', cat: '(math)', desc: 'Calculate sine, cosine, tangent and other trigonometric functions.' },
  { id: 'average-calculator', title: 'Average Calculator', cat: '(math)', desc: 'Calculate the mean, median, and mode of a dataset.' },
  { id: 'fibonacci-calculator', title: 'Fibonacci Sequence Calculator', cat: '(math)', desc: 'Generate Fibonacci numbers and sequences.' },
  { id: 'antilog-calculator', title: 'Antilog Calculator', cat: '(math)', desc: 'Calculate the antilogarithm of a given number.' },
  { id: 'square-root-calculator', title: 'Square Root Calculator', cat: '(math)', desc: 'Calculate the square root and nth roots of any number.' },
  { id: 'decimal-to-fraction-calculator', title: 'Decimal to Fraction Calculator', cat: '(math)', desc: 'Convert decimal numbers to simplified fractions.' },
  { id: 't-test-calculator', title: 'T-Test Calculator', cat: '(math)', desc: 'Perform independent and paired sample t-tests.' },
  { id: 'revenue-calculator', title: 'Revenue Calculator', cat: '(financial)', desc: 'Calculate total revenue, gross revenue, and net revenue.' },
  { id: 'cagr-calculator', title: 'CAGR Calculator', cat: '(financial)', desc: 'Calculate Compound Annual Growth Rate for investments.' },
  { id: 'percentage-change-calculator', title: 'Percentage Change Calculator', cat: '(financial)', desc: 'Calculate the percentage increase or decrease between two values.' },
  { id: 'exponential-calculator', title: 'Exponential Calculator', cat: '(math)', desc: 'Calculate exponential growth, decay, and powers.' },
  { id: 'wire-gauge-calculator', title: 'Wire Gauge Calculator', cat: '(technology)', desc: 'Calculate American Wire Gauge (AWG) properties and current capacity.' },
  { id: 'capacitor-calculator', title: 'Capacitor Calculator', cat: '(technology)', desc: 'Calculate capacitance, charge, and energy stored in a capacitor.' },
  { id: 'unit-circle-calculator', title: 'Unit Circle Calculator', cat: '(geometry)', desc: 'Find coordinates and angles on the unit circle.' }
];

function generateBoilerplate(calc) {
  return `"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function ${calc.id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('')}() {
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
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">${calc.title}</h1>
          <p className="text-slate-500 font-medium mt-1 text-lg">${calc.desc}</p>
        </div>
        <div className="bg-purple-50 px-4 py-2 rounded-full border border-purple-100 shrink-0">
          <span className="text-purple-600 font-bold text-sm uppercase tracking-wider">${calc.cat.replace(/[()]/g, '')}</span>
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
        title="${calc.title}"
        whatIsIt={
          <p>
            The <strong>${calc.title}</strong> is a tool designed to ${calc.desc.toLowerCase()}
          </p>
        }
        formula={
          <p>The exact formula depends on the parameters provided.</p>
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
            question: "How accurate is the ${calc.title}?",
            answer: "The calculator uses standard mathematical functions to provide accurate results.",
          }
        ]}
        relatedCalculators={[]}
      />
    </div>
  );
}
`;
}

const targetDir = path.join(__dirname, '../src/app');

calculators.forEach(calc => {
  const dirPath = path.join(targetDir, calc.cat, calc.id);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  
  const filePath = path.join(dirPath, 'page.tsx');
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, generateBoilerplate(calc));
    console.log("Created " + calc.id);
  } else {
    console.log(calc.id + " already exists");
  }
});

console.log('Finished generating missing calculators.');
