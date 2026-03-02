'use client';

import { useState } from 'react';

export default function RandomLetterGenerator() {
    const [count, setCount] = useState('1');
    const [allowDuplicates, setAllowDuplicates] = useState(true);
    const [caseType, setCaseType] = useState('upper'); // 'upper', 'lower', 'mixed'

    const [results, setResults] = useState<string[]>([]);

    const generate = () => {
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (caseType === 'lower') chars = chars.toLowerCase();
        if (caseType === 'mixed') chars = chars + chars.toLowerCase();

        const c = parseInt(count);
        if (isNaN(c) || c < 1 || c > 1000) return;

        if (!allowDuplicates && c > chars.length) {
            setResults(['Cannot generate unique letters: requested count exceeds available letters.']);
            return;
        }

        const newResults = [];
        let availableChars = chars.split('');

        for (let i = 0; i < c; i++) {
            if (!allowDuplicates) {
                const index = Math.floor(Math.random() * availableChars.length);
                newResults.push(availableChars[index]);
                availableChars.splice(index, 1);
            } else {
                newResults.push(chars.charAt(Math.floor(Math.random() * chars.length)));
            }
        }

        setResults(newResults);
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-sky-900 flex items-center justify-center font-serif">
                    <span className="mr-3">A</span> Random Letter Generator
                </h1>
                <p className="text-sky-700 text-lg max-w-2xl mx-auto">
                    Generate random letters from the English alphabet for games, testing, or education.
                </p>
            </div>

            <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-zinc-200 mb-8">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 items-end">
                    <div>
                        <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">Number of Letters</label>
                        <input
                            type="number" min="1" max="1000"
                            value={count} onChange={(e) => setCount(e.target.value)}
                            className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-sky-500 font-bold bg-zinc-50 text-xl"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">Letter Casing</label>
                        <select
                            value={caseType}
                            onChange={(e) => setCaseType(e.target.value)}
                            className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-sky-500 font-bold bg-zinc-50 text-xl cursor-pointer"
                        >
                            <option value="upper">Uppercase (A-Z)</option>
                            <option value="lower">Lowercase (a-z)</option>
                            <option value="mixed">Mixed Case</option>
                        </select>
                    </div>
                </div>

                <div className="mb-8 p-4 border rounded-xl hover:bg-sky-50 transition-colors">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" checked={allowDuplicates} onChange={(e) => setAllowDuplicates(e.target.checked)} className="w-5 h-5 text-sky-600 rounded" />
                        <span className="font-bold text-zinc-700">Allow Duplicate Letters</span>
                    </label>
                    {!allowDuplicates && <p className="text-xs text-zinc-500 mt-2 ml-8">Maximum: {caseType === 'mixed' ? '52' : '26'} characters</p>}
                </div>

                <div>
                    <button
                        onClick={generate}
                        className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-sky-600/30 uppercase tracking-widest text-lg"
                    >
                        Generate Letters
                    </button>
                </div>
            </div>

            {results.length > 0 && (
                <div className="bg-sky-950 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-sky-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

                    <div className="flex justify-between items-center mb-6 z-10">
                        <h2 className="text-sky-400 font-bold uppercase tracking-widest text-xs">Result</h2>
                        <button
                            onClick={() => navigator.clipboard.writeText(results.join(', '))}
                            className="text-xs bg-sky-500 hover:bg-sky-400 text-sky-950 font-bold px-4 py-2 rounded-lg transition-colors"
                        >
                            Copy All
                        </button>
                    </div>

                    <div className="z-10 bg-black/40 p-6 rounded-xl border border-sky-500/30 shadow-inner max-h-[400px] overflow-y-auto">
                        <div className="font-mono text-white text-3xl font-bold flex flex-wrap gap-4 justify-center">
                            {results.map((char, index) => (
                                <span key={index} className="bg-sky-800/50 w-16 h-16 flex items-center justify-center rounded-xl border border-sky-500/30 shadow-sm">
                                    {char}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Random Letter Generator", "operatingSystem": "All", "applicationCategory": "UtilitiesApplication" }) }} />
        </div>
    );
}
