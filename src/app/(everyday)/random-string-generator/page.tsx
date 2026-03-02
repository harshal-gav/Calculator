'use client';

import { useState } from 'react';

export default function RandomStringGenerator() {
    const [length, setLength] = useState('16');
    const [useUpper, setUseUpper] = useState(true);
    const [useLower, setUseLower] = useState(true);
    const [useNumbers, setUseNumbers] = useState(true);
    const [useSymbols, setUseSymbols] = useState(false);
    const [count, setCount] = useState('1');

    const [results, setResults] = useState<string[]>([]);

    const generate = () => {
        let chars = '';
        if (useUpper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (useLower) chars += 'abcdefghijklmnopqrstuvwxyz';
        if (useNumbers) chars += '0123456789';
        if (useSymbols) chars += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

        if (!chars) {
            setResults(['Please select at least one character set.']);
            return;
        }

        const len = parseInt(length);
        const c = parseInt(count);

        if (isNaN(len) || len < 1 || len > 2048) return;
        if (isNaN(c) || c < 1 || c > 1000) return;

        const newResults = [];
        for (let i = 0; i < c; i++) {
            let str = '';
            for (let j = 0; j < len; j++) {
                str += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            newResults.push(str);
        }

        setResults(newResults);
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-emerald-900 flex items-center justify-center font-serif">
                    <span className="mr-3">🔀</span> Random String Generator
                </h1>
                <p className="text-emerald-700 text-lg max-w-2xl mx-auto">
                    Generate secure, random alphanumeric strings for passwords, tokens, API keys, or testing.
                </p>
            </div>

            <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-zinc-200 mb-8">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div>
                        <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">String Length</label>
                        <input
                            type="number" min="1" max="2048"
                            value={length} onChange={(e) => setLength(e.target.value)}
                            className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-emerald-500 font-bold bg-zinc-50 text-xl"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">Number of Strings</label>
                        <input
                            type="number" min="1" max="1000"
                            value={count} onChange={(e) => setCount(e.target.value)}
                            className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-emerald-500 font-bold bg-zinc-50 text-xl"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                    <label className="flex items-center gap-3 p-4 border rounded-xl cursor-pointer hover:bg-emerald-50 transition-colors">
                        <input type="checkbox" checked={useUpper} onChange={(e) => setUseUpper(e.target.checked)} className="w-5 h-5 text-emerald-600 rounded" />
                        <span className="font-bold text-zinc-700">Uppercase (A-Z)</span>
                    </label>
                    <label className="flex items-center gap-3 p-4 border rounded-xl cursor-pointer hover:bg-emerald-50 transition-colors">
                        <input type="checkbox" checked={useLower} onChange={(e) => setUseLower(e.target.checked)} className="w-5 h-5 text-emerald-600 rounded" />
                        <span className="font-bold text-zinc-700">Lowercase (a-z)</span>
                    </label>
                    <label className="flex items-center gap-3 p-4 border rounded-xl cursor-pointer hover:bg-emerald-50 transition-colors">
                        <input type="checkbox" checked={useNumbers} onChange={(e) => setUseNumbers(e.target.checked)} className="w-5 h-5 text-emerald-600 rounded" />
                        <span className="font-bold text-zinc-700">Numbers (0-9)</span>
                    </label>
                    <label className="flex items-center gap-3 p-4 border rounded-xl cursor-pointer hover:bg-emerald-50 transition-colors">
                        <input type="checkbox" checked={useSymbols} onChange={(e) => setUseSymbols(e.target.checked)} className="w-5 h-5 text-emerald-600 rounded" />
                        <span className="font-bold text-zinc-700">Symbols (@#$%)</span>
                    </label>
                </div>

                <div>
                    <button
                        onClick={generate}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-emerald-600/30 uppercase tracking-widest text-lg"
                    >
                        Generate Strings
                    </button>
                </div>
            </div>

            {results.length > 0 && (
                <div className="bg-emerald-950 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

                    <div className="flex justify-between items-center mb-6 z-10">
                        <h2 className="text-emerald-400 font-bold uppercase tracking-widest text-xs">Generated Output</h2>
                        <button
                            onClick={() => navigator.clipboard.writeText(results.join('\n'))}
                            className="text-xs bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold px-4 py-2 rounded-lg transition-colors"
                        >
                            Copy All
                        </button>
                    </div>

                    <div className="z-10 bg-black/40 p-6 rounded-xl border border-emerald-500/30 shadow-inner max-h-[400px] overflow-y-auto">
                        <pre className="font-mono text-emerald-100 text-sm md:text-base whitespace-pre-wrap break-all">
                            {results.join('\n')}
                        </pre>
                    </div>
                </div>
            )}

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Random String Generator", "operatingSystem": "All", "applicationCategory": "UtilitiesApplication" }) }} />
        </div>
    );
}
