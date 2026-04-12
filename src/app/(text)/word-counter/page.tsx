"use client";

import { useState, useEffect } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";
import wordData from "@/data/seo-content/official/word-counter.json";

export default function WordCounter() {
  const [text, setText] = useState("");
  const [stats, setStats] = useState({
    words: 0,
    chars: 0,
    charsNoSpaces: 0,
    sentences: 0,
    readingTime: 0,
    speakingTime: 0
  });

  useEffect(() => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s/g, "").length;
    const sentences = text.trim() ? text.split(/[.!?]+/).filter(Boolean).length : 0;
    
    // Average reading speed: 225 WPM
    // Average speaking speed: 140 WPM
    const read = (words / 225);
    const speak = (words / 140);

    setStats({
      words,
      chars,
      charsNoSpaces,
      sentences,
      readingTime: read,
      speakingTime: speak
    });
  }, [text]);

  const StatBox = ({ label, value, unit }: { label: string, value: string | number, unit?: string }) => (
    <div className="bg-white border-2 border-slate-100 p-6 rounded-[2rem] shadow-sm flex flex-col items-center justify-center text-center group hover:border-indigo-500 transition-all duration-300">
      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 italic">{label}</span>
      <div className="text-4xl font-black text-slate-900 tracking-tighter italic leading-none">
        {value}
        {unit && <span className="text-sm text-slate-300 ml-1">{unit}</span>}
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(79,70,229,0.1)] border border-indigo-50 font-sans">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-indigo-50 pb-8 mb-10 gap-6">
        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-200">Aa</div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase italic">
              Lexical <span className="text-indigo-600 font-black">Audit Engine</span>
            </h1>
          </div>
          <p className="text-slate-400 font-bold mt-1 tracking-tight text-sm uppercase italic">Content Density Processor</p>
        </div>
        <div className="hidden md:flex flex-col items-end text-right">
          <div className="bg-indigo-900 px-4 py-2 rounded-xl border border-indigo-700 mb-1 shadow-lg">
            <span className="text-indigo-300 font-black text-[10px] uppercase tracking-[0.3em]">Editorial Protocol 7.1</span>
          </div>
          <span className="text-[10px] text-slate-300 font-bold uppercase tracking-tighter italic">Linguistic Vector Verification</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
        {/* Editor Area */}
        <div className="lg:col-span-8 flex flex-col">
           <div className="grow bg-slate-50 border border-slate-200 rounded-[3rem] p-8 shadow-inner relative overflow-hidden flex flex-col min-h-[500px]">
              <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none"></div>
              
              <div className="relative z-10 flex flex-col h-full">
                 <div className="mb-6 flex justify-between items-center px-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400 italic">Universal Text Register</span>
                    <button 
                      onClick={() => setText("")}
                      className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-rose-500 transition-colors"
                    >
                      Clear Memory
                    </button>
                 </div>
                 
                 <textarea
                   value={text}
                   onChange={(e) => setText(e.target.value)}
                   placeholder="Enter or paste your content here for real-time lexical analysis..."
                   className="grow w-full bg-white border-2 border-slate-100 rounded-[2rem] p-8 font-medium text-lg text-slate-700 focus:border-indigo-500 shadow-sm outline-none transition-all resize-none leading-relaxed placeholder:italic placeholder:text-slate-200"
                 ></textarea>
              </div>
           </div>
        </div>

        {/* Analytics Dashboard */}
        <div className="lg:col-span-4 flex flex-col gap-6">
           <div className="grid grid-cols-2 gap-4">
              <StatBox label="Words" value={stats.words} />
              <StatBox label="Sentences" value={stats.sentences} />
              <StatBox label="Chars" value={stats.chars} />
              <StatBox label="Density" value={stats.chars > 0 ? (stats.charsNoSpaces / (stats.words || 1)).toFixed(1) : "0.0"} unit="c/w" />
           </div>

           <div className="p-10 bg-indigo-900 rounded-[3rem] text-white shadow-2xl relative overflow-hidden flex flex-col justify-center border border-indigo-800">
              <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "24px 24px" }}></div>
              <div className="relative z-10 space-y-8">
                 <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400 italic block mb-2">Est. Reading Time</span>
                    <div className="text-6xl font-black italic tracking-tighter text-white">
                       {stats.readingTime < 1 ? Math.ceil(stats.readingTime * 60) : stats.readingTime.toFixed(1)}
                       <span className="text-xl text-indigo-300 ml-2 uppercase font-black">{stats.readingTime < 1 ? "sec" : "min"}</span>
                    </div>
                 </div>
                 <div className="pt-8 border-t border-indigo-800">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400 italic block mb-2">Est. Speaking Time</span>
                    <div className="text-6xl font-black italic tracking-tighter text-white">
                       {stats.speakingTime < 1 ? Math.ceil(stats.speakingTime * 60) : stats.speakingTime.toFixed(1)}
                       <span className="text-xl text-emerald-400 ml-2 uppercase font-black">{stats.speakingTime < 1 ? "sec" : "min"}</span>
                    </div>
                 </div>
              </div>
           </div>

           <div className="p-8 bg-slate-900 rounded-[2.5rem] border border-slate-800 text-white flex flex-col gap-4 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl"></div>
              <span className="text-[10px] font-black uppercase text-indigo-400 tracking-widest italic leading-none">SEO Content Health</span>
              <p className="text-[10px] font-bold leading-relaxed italic text-white/50">
                 {stats.words < 300 ? "Caution: Thin Content. Aim for 1,000+ words to improve search engine authority and semantic depth." : "Healthy Density. Proceed with topical expansion."}
              </p>
           </div>
        </div>
      </div>

      <CalculatorSEO
        title={wordData.title}
        whatIsIt={wordData.whatIsIt}
        formula={wordData.formula}
        example={wordData.example}
        useCases={wordData.useCases}
        faqs={wordData.faqs}
        deepDive={wordData.deepDive}
        glossary={wordData.glossary}
        relatedCalculators={[
          {
            name: "Percentage",
            path: "/percentage-calculator/",
            desc: "Calculate keyword density and proportional distribution within your text dataset.",
          },
          {
            name: "Binary",
            path: "/binary-calculator/",
            desc: "Understand how textual strings are encoded as 8-bit digital byte sequences.",
          },
          {
            name: "RGB to HEX",
            path: "/rgb-to-hex-calculator/",
            desc: "Convert color metadata for UI highlighting and text aesthetic styling.",
          },
          {
            name: "GPA Calculator",
            path: "/gpa-calculator/",
            desc: "Analyze academic text volume relative to performance and grading standards.",
          }
        ]}
      />
    </div>
  );
}
