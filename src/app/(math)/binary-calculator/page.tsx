"use client";

import { useState, useEffect } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import binaryData from "@/data/seo-content/official/binary-calculator.json";

export default function BinaryCalculator() {
  const [mode, setMode] = useState<"arithmetic" | "converter" | "bitwise">("converter");
  
  // Converter State
  const [binaryVal, setBinaryVal] = useState("10110");
  const [decimalVal, setDecimalVal] = useState("22");
  
  // Arithmetic State
  const [op1, setOp1] = useState("1010");
  const [op2, setOp2] = useState("1100");
  const [operator, setOperator] = useState("+");
  const [arithmeticRes, setArithmeticRes] = useState("");

  // Bitwise State
  const [bit1, setBit1] = useState("1100");
  const [bit2, setBit2] = useState("1010");
  const [bitwiseOp, setBitwiseOp] = useState("&");
  const [bitwiseRes, setBitwiseRes] = useState("");

  const handleBinaryChange = (val: string) => {
    const active = val.replace(/[^01]/g, "");
    setBinaryVal(active);
    if (active) setDecimalVal(parseInt(active, 2).toString());
    else setDecimalVal("");
  };

  const handleDecimalChange = (val: string) => {
    setDecimalVal(val);
    const num = parseInt(val, 10);
    if (!isNaN(num)) setBinaryVal(num.toString(2));
    else setBinaryVal("");
  };

  useEffect(() => {
    // Arithmetic
    try {
      const n1 = parseInt(op1, 2);
      const n2 = parseInt(op2, 2);
      if (isNaN(n1) || isNaN(n2)) {
         setArithmeticRes("");
      } else {
         let res = 0;
         if (operator === "+") res = n1 + n2;
         if (operator === "-") res = n1 - n2;
         if (operator === "*") res = n1 * n2;
         if (operator === "/") res = Math.floor(n1 / n2);
         setArithmeticRes(res.toString(2));
      }
    } catch { setArithmeticRes(""); }

    // Bitwise
    try {
      const b1 = parseInt(bit1, 2);
      const b2 = parseInt(bit2, 2);
      if (isNaN(b1) || isNaN(b2)) {
         setBitwiseRes("");
      } else {
         let br = 0;
         if (bitwiseOp === "&") br = b1 & b2;
         if (bitwiseOp === "|") br = b1 | b2;
         if (bitwiseOp === "^") br = b1 ^ b2;
         setBitwiseRes(br.toString(2).padStart(Math.max(bit1.length, bit2.length), "0"));
      }
    } catch { setBitwiseRes(""); }
  }, [binaryVal, decimalVal, op1, op2, operator, bit1, bit2, bitwiseOp]);

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(79,70,229,0.1)] border border-indigo-50 font-sans">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-indigo-50 pb-8 mb-10 gap-6">
        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-indigo-400 font-black text-xs shadow-lg shadow-indigo-200 uppercase tracking-tighter">0101</div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase italic">
              Bitwise <span className="text-indigo-600 font-black">Binary Matrix</span>
            </h1>
          </div>
          <p className="text-slate-400 font-bold mt-1 tracking-tight text-sm uppercase italic">Logic Gate Processing Unit</p>
        </div>
        <div className="hidden md:flex gap-2">
           {["converter", "arithmetic", "bitwise"].map((m) => (
             <button
               key={m}
               onClick={() => setMode(m as any)}
               className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${mode === m ? "bg-indigo-600 text-white shadow-lg" : "bg-slate-50 text-slate-400 hover:bg-slate-100"}`}
             >
               {m}
             </button>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
        {/* Module Area */}
        <div className="lg:col-span-8 flex flex-col">
           <div className="grow bg-slate-50 border border-slate-200 rounded-[3rem] p-8 md:p-12 shadow-inner relative overflow-hidden flex flex-col min-h-[500px]">
              <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none"></div>
              
              <div className="relative z-10 flex flex-col h-full">
                 <div className="mb-10 flex justify-between items-center">
                    <span className="inline-block px-4 py-1.5 bg-indigo-100 border border-indigo-200 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-[0.4em] italic">Active Module: {mode}</span>
                    <div className="flex md:hidden gap-1">
                       <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-ping"></div>
                       <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-ping delay-100"></div>
                    </div>
                 </div>

                 {mode === "converter" && (
                   <div className="space-y-12 grow flex flex-col justify-center">
                      <div className="space-y-4">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block italic ml-4">Binary Data String (0-1)</label>
                         <input 
                           type="text" 
                           value={binaryVal}
                           onChange={(e) => handleBinaryChange(e.target.value)}
                           className="w-full bg-white border-2 border-slate-100 rounded-3xl px-8 py-6 font-black text-4xl text-slate-900 focus:border-indigo-500 shadow-sm tracking-[0.2em] outline-none transition-all"
                         />
                      </div>
                      <div className="flex justify-center flex-col items-center gap-4">
                         <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xl shadow-lg ring-4 ring-indigo-50">⇅</div>
                      </div>
                      <div className="space-y-4">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block italic ml-4">Decimal Integer (Standard)</label>
                         <input 
                           type="number" 
                           value={decimalVal}
                           onChange={(e) => handleDecimalChange(e.target.value)}
                           className="w-full bg-white border-2 border-slate-100 rounded-3xl px-8 py-6 font-black text-4xl text-indigo-600 focus:border-indigo-500 shadow-sm outline-none transition-all"
                         />
                      </div>
                   </div>
                 )}

                 {mode === "arithmetic" && (
                   <div className="space-y-10 grow flex flex-col justify-center">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                         <div className="md:col-span-5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block italic mb-2">Operand A</label>
                            <input type="text" value={op1} onChange={(e) => setOp1(e.target.value.replace(/[^01]/g, ""))} className="w-full bg-white border-2 border-slate-100 rounded-2xl px-6 py-4 font-black text-3xl tracking-widest outline-none focus:border-indigo-500" />
                         </div>
                         <div className="md:col-span-2 flex justify-center">
                            <select value={operator} onChange={(e) => setOperator(e.target.value)} className="bg-slate-900 text-white rounded-xl px-4 py-2 font-black text-xl appearance-none text-center min-w-[60px]">
                               <option value="+">+</option>
                               <option value="-">-</option>
                               <option value="*">×</option>
                               <option value="/">÷</option>
                            </select>
                         </div>
                         <div className="md:col-span-5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block italic mb-2">Operand B</label>
                            <input type="text" value={op2} onChange={(e) => setOp2(e.target.value.replace(/[^01]/g, ""))} className="w-full bg-white border-2 border-slate-100 rounded-2xl px-6 py-4 font-black text-3xl tracking-widest outline-none focus:border-indigo-500" />
                         </div>
                      </div>
                      
                      <div className="bg-indigo-600 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden text-center">
                         <span className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-200 mb-4 block italic">Arithmetic Sum</span>
                         <div className="text-6xl md:text-7xl font-black tracking-[0.1em] italic leading-none truncate h-[1.1em]">{arithmeticRes || "0"}</div>
                         <p className="mt-4 text-[10px] font-bold uppercase tracking-widest text-indigo-300">Base-2 Digital Calculation</p>
                      </div>
                   </div>
                 )}

                 {mode === "bitwise" && (
                    <div className="space-y-10 grow flex flex-col justify-center">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                         <div className="md:col-span-5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block italic mb-2">Input Vector 1</label>
                            <input type="text" value={bit1} onChange={(e) => setBit1(e.target.value.replace(/[^01]/g, ""))} className="w-full bg-white border-2 border-slate-100 rounded-2xl px-6 py-4 font-black text-3xl tracking-widest outline-none focus:border-indigo-500" />
                         </div>
                         <div className="md:col-span-2 flex justify-center">
                            <select value={bitwiseOp} onChange={(e) => setBitwiseOp(e.target.value)} className="bg-indigo-600 text-white rounded-xl px-6 py-2 font-black text-xl appearance-none text-center">
                               <option value="&">AND</option>
                               <option value="|">OR</option>
                               <option value="^">XOR</option>
                            </select>
                         </div>
                         <div className="md:col-span-5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block italic mb-2">Input Vector 2</label>
                            <input type="text" value={bit2} onChange={(e) => setBit2(e.target.value.replace(/[^01]/g, ""))} className="w-full bg-white border-2 border-slate-100 rounded-2xl px-6 py-4 font-black text-3xl tracking-widest outline-none focus:border-indigo-500" />
                         </div>
                      </div>
                      
                      <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden text-center">
                         <span className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-400 mb-4 block italic">Bitwise Logic Result</span>
                         <div className="text-6xl md:text-7xl font-black tracking-[0.2em] text-emerald-400 italic leading-none h-[1.1em]">{bitwiseRes || "0"}</div>
                         <div className="flex justify-center gap-2 mt-6">
                            {bitwiseRes.split('').map((b, i) => (
                               <div key={i} className={`w-3 h-3 rounded-full ${b === '1' ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-slate-800'}`}></div>
                            ))}
                         </div>
                      </div>
                   </div>
                 )}
              </div>
           </div>
        </div>

        {/* Info Sidebar */}
        <div className="lg:col-span-4 space-y-6">
           <div className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-xl shadow-indigo-50 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
              <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-6 border-b border-slate-50 pb-4 italic">Register Status</h2>
              
              <div className="space-y-6">
                 <div>
                    <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest block mb-2 italic leading-none">Bit Depth</span>
                    <div className="text-3xl font-black italic text-slate-900">{binaryVal.length} bits</div>
                 </div>
                 <div className="pt-4 border-t border-slate-50">
                    <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest block mb-2 italic leading-none">Hexadecimal</span>
                    <div className="text-3xl font-black italic text-slate-900 uppercase">
                       {decimalVal ? parseInt(decimalVal).toString(16) : "0"}
                    </div>
                 </div>
                 <div className="pt-4 border-t border-slate-50">
                    <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest block mb-1 italic leading-none">Octal Mapping</span>
                    <div className="text-3xl font-black italic text-slate-900">
                       {decimalVal ? parseInt(decimalVal).toString(8) : "0"}
                    </div>
                 </div>
              </div>
           </div>

           <div className="p-8 bg-indigo-900 rounded-[2.5rem] text-white flex flex-col gap-4 shadow-xl">
              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 italic">Instruction Set</span>
              <p className="text-xs font-bold leading-relaxed italic text-white/70">Modern 64-bit processors handle binary data in 'registers' at frequencies exceeding 5GHz, executing billions of bitwise operations per second.</p>
           </div>
        </div>
      </div>

      <CalculatorSEO
        title={binaryData.title}
        whatIsIt={binaryData.whatIsIt}
        formula={binaryData.formula}
        example={binaryData.example}
        useCases={binaryData.useCases}
        faqs={binaryData.faqs}
        deepDive={binaryData.deepDive}
        glossary={binaryData.glossary}
        relatedCalculators={[
          {
            name: "RGB to HEX",
            path: "/rgb-to-hex-calculator/",
            desc: "Convert pixel color data from standard integer triplets to hexadecimal bitstrings.",
          },
          {
            name: "Scientific",
            path: "/scientific-calculator/",
            desc: "Perform advanced logarithmic and exponential mathematical operations.",
          },
          {
            name: "Grade Calculator",
            path: "/grade-calculator/",
            desc: "Calculate academic performance percentages and weighted averages.",
          },
          {
            name: "Time",
            path: "/time-calculator/",
            desc: "Compute duration between timestamps and analyze temporal datasets.",
          }
        ]}
      />
    </div>
  );
}
