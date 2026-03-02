'use client';

import { useState } from 'react';

export default function UuidGenerator() {
    const [count, setCount] = useState('1');
    const [uuids, setUuids] = useState<string[]>([]);

    const generateUUIDs = () => {
        const total = parseInt(count);
        if (isNaN(total) || total < 1 || total > 1000) {
            alert("Please enter a valid amount between 1 and 1000.");
            return;
        }

        const newUuids = [];
        for (let i = 0; i < total; i++) {
            // Very simple UUID v4 generator using crypto.randomUUID if available, fallback otherwise
            if (typeof crypto !== 'undefined' && crypto.randomUUID) {
                newUuids.push(crypto.randomUUID());
            } else {
                // Fallback for extremely old browsers or incomplete environments
                newUuids.push('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                }));
            }
        }
        setUuids(newUuids);
    };

    const copyAll = () => {
        navigator.clipboard.writeText(uuids.join('\n')).then(() => {
            alert('Copied to clipboard!');
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-fuchsia-900 flex items-center justify-center font-mono">
                    <span className="mr-3">🆔</span> UUID Generator
                </h1>
                <p className="text-fuchsia-700 text-lg max-w-2xl mx-auto">
                    Generate valid Version 4 Universally Unique Identifiers (UUIDs) instantly.
                </p>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-zinc-200 mb-8 max-w-xl mx-auto flex flex-col items-center">

                <div className="w-full flex flex-col md:flex-row gap-4 items-end mb-6">
                    <div className="flex-1 w-full">
                        <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">Number of UUIDs</label>
                        <input
                            type="number" min="1" max="1000" step="1"
                            value={count} onChange={(e) => setCount(e.target.value)}
                            className="w-full rounded-xl border border-zinc-300 shadow-sm p-4 focus:border-fuchsia-500 font-bold font-mono text-2xl transition-all outline-none"
                            onKeyDown={(e) => e.key === 'Enter' && generateUUIDs()}
                        />
                    </div>
                    <button
                        onClick={generateUUIDs}
                        className="w-full md:w-auto bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-black py-4 px-8 rounded-xl transition-colors shadow-lg shadow-fuchsia-600/30 uppercase tracking-widest text-lg"
                    >
                        Generate v4
                    </button>
                </div>
            </div>

            {uuids.length > 0 && (
                <div className="bg-slate-900 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

                    <div className="flex justify-between items-center mb-6 z-10 w-full border-b border-white/10 pb-4">
                        <h2 className="text-fuchsia-400 font-bold uppercase tracking-widest text-xs">Generated Output ({uuids.length})</h2>
                        <button
                            onClick={copyAll}
                            className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded text-xs uppercase font-bold tracking-widest transition-colors flex items-center"
                        >
                            <span className="mr-2">📋</span> Copy All
                        </button>
                    </div>

                    <div className="z-10 relative w-full flex flex-col space-y-2 max-h-[500px] overflow-y-auto pr-2">
                        {uuids.map((uid, idx) => (
                            <div key={idx} className="bg-black/40 hover:bg-black/60 border border-white/5 p-4 rounded-xl flex items-center transition-colors">
                                <span className="font-mono text-xl md:text-2xl font-bold text-white tracking-widest">{uid}</span>
                                <button
                                    onClick={() => navigator.clipboard.writeText(uid)}
                                    className="ml-auto text-fuchsia-400 opacity-50 hover:opacity-100 hover:text-fuchsia-300 p-2"
                                    title="Copy individually"
                                >
                                    📋
                                </button>
                            </div>
                        ))}
                    </div>

                </div>
            )}

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "UUID Generator", "operatingSystem": "All", "applicationCategory": "DeveloperApplication" }) }} />
        </div>
    );
}
