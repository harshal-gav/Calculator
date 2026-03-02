'use client';

import { useState } from 'react';

export default function DiffChecker() {
    // Very naive diff checker: highlights completely identical lines or completely different lines
    // A fully robust diff checker requires longest common subsequence algorithms which is too complex for this scale
    const [original, setOriginal] = useState('const a = 1;\nconst b = 2;\nconsole.log(a + b);');
    const [modified, setModified] = useState('const a = 1;\nconst c = 3;\nconsole.log(a + c);');

    const [diffResult, setDiffResult] = useState<{ originalLines: string[]; modifiedLines: string[] } | null>(null);

    const compareTexts = () => {
        const lines1 = original.split(/\r?\n/);
        const lines2 = modified.split(/\r?\n/);

        // This is extremely simple: exact line by line matching. 
        // Real diffs use Myers diff algorithm, but for a simple line by line visualizer:
        setDiffResult({
            originalLines: lines1,
            modifiedLines: lines2
        });
    };

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-indigo-900 flex items-center justify-center font-mono">
                    <span className="mr-3">±</span> Diff Checker
                </h1>
                <p className="text-indigo-700 text-lg max-w-2xl mx-auto">
                    Compare two text snippets side-by-side to find line differences instantly.
                </p>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-zinc-200 mb-8 mx-auto">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 mb-6">
                    <div className="flex flex-col">
                        <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">Original Text</label>
                        <textarea
                            value={original}
                            onChange={(e) => setOriginal(e.target.value)}
                            className="w-full flex-1 min-h-[300px] bg-zinc-50 rounded-xl border border-zinc-300 shadow-inner p-4 focus:bg-white focus:border-indigo-500 font-medium font-mono text-sm transition-all outline-none resize-y whitespace-pre"
                            placeholder="Paste original text here..."
                            spellCheck="false"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">Modified Text</label>
                        <textarea
                            value={modified}
                            onChange={(e) => setModified(e.target.value)}
                            className="w-full flex-1 min-h-[300px] bg-zinc-50 rounded-xl border border-zinc-300 shadow-inner p-4 focus:bg-white focus:border-indigo-500 font-medium font-mono text-sm transition-all outline-none resize-y whitespace-pre"
                            placeholder="Paste modified text here..."
                            spellCheck="false"
                        />
                    </div>
                </div>

                <div className="flex justify-center">
                    <button
                        onClick={compareTexts}
                        className="w-full md:w-auto md:min-w-[400px] bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 px-8 rounded-xl transition-colors shadow-lg shadow-indigo-600/30 uppercase tracking-widest text-lg"
                    >
                        Compare Texts SIDE-BY-SIDE
                    </button>
                </div>
            </div>

            {diffResult !== null && (
                <div className="bg-slate-900 rounded-2xl p-4 md:p-8 shadow-2xl relative overflow-hidden flex flex-col">
                    <h2 className="text-indigo-400 font-bold uppercase tracking-widest text-xs mb-6 z-10 text-center">Diff Viewer (Line-by-Line Match)</h2>

                    <div className="grid grid-cols-2 gap-px bg-zinc-700 border border-zinc-700 rounded overflow-hidden text-sm md:text-base font-mono">

                        <div className="bg-zinc-800 flex flex-col overflow-x-auto min-h-[200px]">
                            {diffResult.originalLines.map((line, idx) => {
                                const isDiff = diffResult.modifiedLines[idx] !== line;
                                return (
                                    <div key={idx} className={`flex px-2 py-0.5 whitespace-pre ${isDiff ? 'bg-red-900/30 text-red-200' : 'text-zinc-400'}`}>
                                        <span className="w-8 text-right pr-2 select-none opacity-50 border-r border-zinc-700 mr-2 shrink-0">{idx + 1}</span>
                                        <span>{line || ' '}</span>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="bg-zinc-800 flex flex-col overflow-x-auto min-h-[200px]">
                            {diffResult.modifiedLines.map((line, idx) => {
                                const isDiff = diffResult.originalLines[idx] !== line;
                                return (
                                    <div key={idx} className={`flex px-2 py-0.5 whitespace-pre ${isDiff ? 'bg-emerald-900/40 text-emerald-300' : 'text-zinc-400'}`}>
                                        <span className="w-8 text-right pr-2 select-none opacity-50 border-r border-zinc-700 mr-2 shrink-0">{idx + 1}</span>
                                        <span>{line || ' '}</span>
                                    </div>
                                );
                            })}
                        </div>

                    </div>
                    <div className="text-center mt-4">
                        <span className="text-xs text-white/40 uppercase tracking-widest">Only exact line-by-line index match is performed</span>
                    </div>
                </div>
            )}

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Diff Checker", "operatingSystem": "All", "applicationCategory": "DeveloperApplication" }) }} />
        </div>
    );
}
