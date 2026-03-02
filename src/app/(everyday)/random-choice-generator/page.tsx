'use client';

import { useState } from 'react';

export default function RandomChoiceGenerator() {
    const [list, setList] = useState('Apple\nBanana\nOrange\nMango\nPineapple');
    const [count, setCount] = useState('1');
    const [allowDuplicates, setAllowDuplicates] = useState(false);

    const [results, setResults] = useState<string[]>([]);
    const [error, setError] = useState('');

    const generate = () => {
        setError('');
        const items = list.split('\n').map(item => item.trim()).filter(item => item.length > 0);

        if (items.length === 0) {
            setError('Please enter at least one item.');
            setResults([]);
            return;
        }

        const c = parseInt(count);
        if (isNaN(c) || c < 1 || c > 1000) return;

        if (!allowDuplicates && c > items.length) {
            setError(`Cannot pick ${c} unique items from a list of ${items.length} items.`);
            setResults([]);
            return;
        }

        const newResults = [];
        let availableItems = [...items];

        for (let i = 0; i < c; i++) {
            if (!allowDuplicates) {
                const index = Math.floor(Math.random() * availableItems.length);
                newResults.push(availableItems[index]);
                availableItems.splice(index, 1);
            } else {
                const index = Math.floor(Math.random() * items.length);
                newResults.push(items[index]);
            }
        }

        setResults(newResults);
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-violet-900 flex items-center justify-center font-serif">
                    <span className="mr-3">🎲</span> Random Choice Generator
                </h1>
                <p className="text-violet-700 text-lg max-w-2xl mx-auto">
                    Pick a random item, winner, or choice from any list instantly. Let the computer decide for you!
                </p>
            </div>

            <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-zinc-200 mb-8">

                <div className="mb-6">
                    <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">Enter the list of items (one per line)</label>
                    <textarea
                        rows={6}
                        value={list}
                        onChange={(e) => setList(e.target.value)}
                        className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-violet-500 font-bold bg-zinc-50 text-xl resize-y"
                        placeholder="Item 1&#10;Item 2&#10;Item 3"
                    ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 items-end">
                    <div>
                        <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">Number of picks</label>
                        <input
                            type="number" min="1" max="1000"
                            value={count} onChange={(e) => setCount(e.target.value)}
                            className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-violet-500 font-bold bg-zinc-50 text-xl"
                        />
                    </div>
                    <div className="p-4 border rounded-xl hover:bg-violet-50 transition-colors h-[68px] flex items-center">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" checked={allowDuplicates} onChange={(e) => setAllowDuplicates(e.target.checked)} className="w-5 h-5 text-violet-600 rounded" />
                            <span className="font-bold text-zinc-700">Allow Duplicates (Replacement)</span>
                        </label>
                    </div>
                </div>

                {error && <p className="text-rose-500 font-bold mb-4">{error}</p>}

                <div>
                    <button
                        onClick={generate}
                        className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-violet-600/30 uppercase tracking-widest text-lg"
                    >
                        Pick Choices 🚀
                    </button>
                </div>
            </div>

            {results.length > 0 && (
                <div className="bg-violet-950 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

                    <h2 className="text-violet-400 font-bold uppercase tracking-widest text-xs mb-6 z-10">Selected {results.length === 1 ? 'Choice' : 'Choices'}</h2>

                    <div className="z-10 w-full flex flex-col gap-4 max-h-[400px] overflow-y-auto">
                        {results.map((choice, index) => (
                            <div key={index} className="bg-white/10 p-4 md:p-6 rounded-xl border border-white/20 shadow-inner flex items-center justify-between gap-4 w-full backdrop-blur-sm transition-transform hover:scale-[1.01]">
                                <span className="bg-violet-600 text-white font-black rounded-full w-8 h-8 flex items-center justify-center text-sm shrink-0">
                                    {(index + 1)}
                                </span>
                                <span className="text-white font-bold text-2xl md:text-3xl truncate flex-1 text-center font-serif">
                                    {choice}
                                </span>
                                <div className="w-8 shrink-0"></div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Random Choice Generator", "operatingSystem": "All", "applicationCategory": "UtilitiesApplication" }) }} />
        </div>
    );
}
