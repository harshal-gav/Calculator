"use client";

import { useState, useEffect } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import sciData from "@/data/seo-content/official/scientific-calculator.json";

export default function ScientificCalculator() {
  const [display, setDisplay] = useState("0");
  const [history, setHistory] = useState<string[]>([]);
  const [mode, setMode] = useState<"DEG" | "RAD">("DEG");

  const append = (char: string) => {
    setDisplay(prev => (prev === "0" ? char : prev + char));
  };

  const clear = () => {
    setDisplay("0");
  };

  const backspace = () => {
    setDisplay(prev => (prev.length > 1 ? prev.slice(0, -1) : "0"));
  };

  const calculate = () => {
    try {
      // Basic math handler
      let expr = display
        .replace(/π/g, Math.PI.toString())
        .replace(/e/g, Math.E.toString())
        .replace(/sin\(/g, mode === "DEG" ? "Math.sin(Math.PI/180*" : "Math.sin(")
        .replace(/cos\(/g, mode === "DEG" ? "Math.cos(Math.PI/180*" : "Math.cos(")
        .replace(/tan\(/g, mode === "DEG" ? "Math.tan(Math.PI/180*" : "Math.tan(")
        .replace(/log\(/g, "Math.log10(")
        .replace(/ln\(/g, "Math.log(")
        .replace(/\^/g, "**")
        .replace(/√\(/g, "Math.sqrt(");

      // Handle missing closing parentheses for the replaces (extremely basic heuristic)
      const openCount = (expr.match(/\(/g) || []).length;
      const closeCount = (expr.match(/\)/g) || []).length;
      for (let i = 0; i < openCount - closeCount; i++) {
        expr += ")";
      }

      const res = eval(expr);
      const roundedRes = Number.isInteger(res) ? res.toString() : parseFloat(res.toFixed(8)).toString();
      
      setHistory([`${display} = ${roundedRes}`, ...history.slice(0, 4)]);
      setDisplay(roundedRes);
    } catch (e) {
      setDisplay("Error");
      setTimeout(() => setDisplay("0"), 1000);
    }
  };

  const Btn = ({ label, onClick, className = "", variant = "standard" }: { label: string, onClick: any, className?: string, variant?: "standard" | "op" | "sci" | "accent" }) => {
    const variants = {
      standard: "bg-white text-slate-900 border-slate-100 hover:border-indigo-500",
      op: "bg-slate-900 text-indigo-400 border-slate-800 hover:bg-black",
      sci: "bg-indigo-50 text-indigo-600 border-indigo-100 hover:bg-indigo-100",
      accent: "bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200"
    };

    return (
      <button 
        onClick={onClick}
        className={`h-14 md:h-16 flex items-center justify-center rounded-2xl border-2 font-black text-sm md:text-md transition-all active:scale-95 ${variants[variant]} ${className}`}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(79,70,229,0.1)] border border-indigo-50 font-sans">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-indigo-50 pb-8 mb-10 gap-6">
        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-200">f(x)</div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase italic">
              Advanced <span className="text-indigo-600 font-black">Analytical Core</span>
            </h1>
          </div>
          <p className="text-slate-400 font-bold mt-1 tracking-tight text-sm uppercase italic">Scientific Transcendental Matrix</p>
        </div>
        <div className="hidden md:flex flex-col items-end text-right">
          <div className="bg-indigo-900 px-4 py-2 rounded-xl border border-indigo-700 mb-1 shadow-lg">
            <span className="text-indigo-300 font-black text-[10px] uppercase tracking-[0.3em]">Module π-99</span>
          </div>
          <span className="text-[10px] text-slate-300 font-bold uppercase tracking-tighter italic">Floating-Point Precision Engine</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
        {/* Calculator Body */}
        <div className="lg:col-span-8 flex flex-col">
           <div className="grow bg-slate-900 rounded-[3rem] p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col border border-slate-800">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
              
              {/* Screen */}
              <div className="mb-8 rounded-[2rem] bg-[#0c0c0e] p-8 md:p-10 flex flex-col items-end justify-center min-h-[160px] shadow-inner border border-white/5 relative">
                 <div className="absolute top-6 left-8 flex gap-2">
                    <button onClick={() => setMode("DEG")} className={`text-[10px] font-black tracking-widest px-2 py-0.5 rounded ${mode === "DEG" ? "bg-indigo-600 text-white" : "text-slate-600"}`}>DEG</button>
                    <button onClick={() => setMode("RAD")} className={`text-[10px] font-black tracking-widest px-2 py-0.5 rounded ${mode === "RAD" ? "bg-indigo-600 text-white" : "text-slate-600"}`}>RAD</button>
                 </div>
                 <div className="text-indigo-400 text-[10px] font-bold mb-2 uppercase tracking-widest h-4 overflow-hidden text-right max-w-full">
                    {history[0] || "Ready"}
                 </div>
                 <div className="text-white text-5xl md:text-7xl font-black tracking-tighter truncate w-full text-right h-[1.1em]">
                    {display}
                 </div>
              </div>

              {/* Buttons Grid */}
              <div className="grid grid-cols-4 md:grid-cols-5 gap-3 md:gap-4">
                 {/* Row 1 (Sci Functions) */}
                 <div className="col-span-1 hidden md:block">
                    <Btn label="sin" onClick={() => append("sin(")} variant="sci" />
                 </div>
                 <Btn label="AC" onClick={clear} variant="op" className="text-rose-400" />
                 <Btn label="(" onClick={() => append("(")} variant="op" />
                 <Btn label=")" onClick={() => append(")")} variant="op" />
                 <Btn label="÷" onClick={() => append("/")} variant="op" />

                 {/* Row 2 */}
                 <div className="col-span-1 hidden md:block">
                    <Btn label="cos" onClick={() => append("cos(")} variant="sci" />
                 </div>
                 <Btn label="7" onClick={() => append("7")} />
                 <Btn label="8" onClick={() => append("8")} />
                 <Btn label="9" onClick={() => append("9")} />
                 <Btn label="×" onClick={() => append("*")} variant="op" />

                 {/* Row 3 */}
                 <div className="col-span-1 hidden md:block">
                    <Btn label="tan" onClick={() => append("tan(")} variant="sci" />
                 </div>
                 <Btn label="4" onClick={() => append("4")} />
                 <Btn label="5" onClick={() => append("5")} />
                 <Btn label="6" onClick={() => append("6")} />
                 <Btn label="-" onClick={() => append("-")} variant="op" />

                 {/* Row 4 */}
                 <div className="col-span-1 hidden md:block">
                    <Btn label="log" onClick={() => append("log(")} variant="sci" />
                 </div>
                 <Btn label="1" onClick={() => append("1")} />
                 <Btn label="2" onClick={() => append("2")} />
                 <Btn label="3" onClick={() => append("3")} />
                 <Btn label="+" onClick={() => append("+")} variant="op" />

                 {/* Row 5 */}
                 <div className="col-span-1 hidden md:block">
                    <Btn label="ln" onClick={() => append("ln(")} variant="sci" />
                 </div>
                 <Btn label="0" onClick={() => append("0")} />
                 <Btn label="." onClick={() => append(".")} />
                 <Btn label="⌫" onClick={backspace} variant="standard" className="text-slate-400" />
                 <Btn label="=" onClick={calculate} variant="accent" />

                 {/* Mobile Sci Functions Show up in extra rows if needed, or simplified */}
                 <div className="md:hidden contents">
                    <Btn label="sin" onClick={() => append("sin(")} variant="sci" className="text-xs" />
                    <Btn label="cos" onClick={() => append("cos(")} variant="sci" className="text-xs" />
                    <Btn label="tan" onClick={() => append("tan(")} variant="sci" className="text-xs" />
                    <Btn label="√" onClick={() => append("√(")} variant="sci" className="text-xs" />
                 </div>
              </div>

              {/* Advanced Controls Row */}
              <div className="hidden md:grid grid-cols-5 gap-4 mt-4">
                 <Btn label="π" onClick={() => append("π")} variant="standard" />
                 <Btn label="e" onClick={() => append("e")} variant="standard" />
                 <Btn label="x^y" onClick={() => append("^")} variant="standard" />
                 <Btn label="√x" onClick={() => append("√(")} variant="standard" />
                 <Btn label="FACT" onClick={() => setDisplay(prev => prev + "!")} variant="standard" />
              </div>
           </div>
        </div>

        {/* History / Info Sidebar */}
        <div className="lg:col-span-4 space-y-6 flex flex-col">
           <div className="p-8 bg-slate-50 border border-slate-200 rounded-[2.5rem] shadow-inner grow relative overflow-hidden flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400 italic block mb-6 leading-none">Calculation History</span>
              <div className="space-y-4 grow font-mono overflow-y-auto max-h-[300px] pr-2 scrollbar-hide">
                 {history.length > 0 ? history.map((h, i) => (
                   <div key={i} className="bg-white p-4 rounded-xl border border-slate-100 text-xs text-slate-500 font-bold italic animate-in slide-in-from-right-2">
                      {h}
                   </div>
                 )) : (
                   <div className="h-full flex flex-col items-center justify-center text-center opacity-30">
                      <div className="w-12 h-12 bg-slate-200 rounded-full mb-4"></div>
                      <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">Memory clear</p>
                   </div>
                 )}
              </div>
           </div>

           <div className="p-8 bg-indigo-900 rounded-[3rem] text-white space-y-4 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 italic leading-none block">System Logic</span>
              <p className="text-[10px] font-bold leading-relaxed italic text-white/60">PEMDAS validation active. Transcendental inputs are evaluated in {mode} mode. Precision rounded to 8 decimal places.</p>
           </div>
        </div>
      </div>

      <CalculatorSEO
        title={sciData.title}
        whatIsIt={sciData.whatIsIt}
        formula={sciData.formula}
        example={sciData.example}
        useCases={sciData.useCases}
        faqs={sciData.faqs}
        deepDive={sciData.deepDive}
        glossary={sciData.glossary}
        relatedCalculators={[
          {
            name: "Binary Calculator",
            path: "/binary-calculator/",
            desc: "Understand the base-2 logic underlying digital hardware.",
          },
          {
            name: "Percentage",
            path: "/percentage-calculator/",
            desc: "Calculate proportional growth and statistical change metrics.",
          },
          {
            name: "Acceleration",
            path: "/acceleration-calculator/",
            desc: "Analyze kinematic change distributions in physics modeling.",
          },
          {
            name: "GPA Calculator",
            path: "/gpa-calculator/",
            desc: "Perform weighted academic achievement analysis.",
          }
        ]}
      />
    </div>
  );
}
