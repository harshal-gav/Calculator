'use client';

import { useState } from 'react';
import CalculatorSEO from '@/components/CalculatorSEO';
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

            <div className="mt-8">
                <CalculatorSEO
                    title="Random Choice Generator"
                    whatIsIt={
                        <>
                            <p>A <strong>Random Choice Generator</strong> is an completely unbiased, algorithmic tool designed to pick one or more random items from a custom list. You simply paste in your options, hit generate, and the computer makes a mathematically randomized decision for you.</p>
                            <p>It utilizes the <code>Math.random()</code> pseudorandom number generator native to JavaScript to ensure every single item on your list has an absolutely equal probability of being selected.</p>
                        </>
                    }
                    formula={
                        <>
                            <p>Instead of drawing names from a hat or flipping a coin, this tool operates in the background by assigning a unique numeric index to every single line of text you provide.</p>
                            <ul className="list-disc pl-6 space-y-3 mt-4 text-zinc-700">
                                <li>The algorithm counts exactly how many total items you entered.</li>
                                <li>It then generates a floating-point decimal between 0 and 1, and multiplies it by the total count.</li>
                                <li>Finally, it rounds down to the nearest integer, using that number to instantly fetch the corresponding "winning" item from your list.</li>
                            </ul>
                        </>
                    }
                    example={
                        <>
                            <p>Imagine you have <strong>5 names</strong> but only <strong>2 concert tickets</strong> to give away.</p>
                            <ul className="list-none space-y-2 mt-4 font-mono text-sm bg-violet-50 p-4 rounded-xl border border-violet-200">
                                <li><strong>The Input:</strong> Alice, Bob, Charlie, Dave, Eve (entered one per line)</li>
                                <li><strong>The Settings:</strong> Number of picks = 2, Allow Duplicates = OFF</li>
                                <li><strong>Step 1 (First Draw):</strong> The algorithm randomly lands on index #3.</li>
                                <li className="pl-4 text-zinc-600">Dave is randomly selected as Winner #1.</li>
                                <li><strong>Step 2 (Removal):</strong> Because duplicates are off, Dave is removed from the internal pool. Only 4 options remain.</li>
                                <li><strong>Step 3 (Second Draw):</strong> The algorithm lands on index #0 of the new, smaller list.</li>
                                <li className="pl-4 text-zinc-600">Alice is randomly selected as Winner #2.</li>
                                <li className="pt-2 mt-2 font-bold text-violet-800 border-t border-violet-200">Final Results: Dave, Alice</li>
                            </ul>
                        </>
                    }
                    useCases={
                        <ul className="list-disc pl-6 space-y-4 text-zinc-700">
                            <li><strong>Social Media Giveaways:</strong> Paste all the usernames of people who commented on your post to randomly and fairly select a prize winner.</li>
                            <li><strong>Classroom Management:</strong> Teachers can paste their class roster into the tool to randomly call on students, assign group leaders, or distribute chores without any perceived bias.</li>
                            <li><strong>Decision Fatigue:</strong> Cant decide what to eat for dinner or which movie to watch? Put your top 5 choices into the box and let the algorithm break the tie.</li>
                            <li><strong>QA Testing:</strong> Software developers often need to pull random elements from a database array to ensure rendering works correctly under stress.</li>
                        </ul>
                    }
                    faqs={[
                        {
                            question: "Is this truly a fair, random choice?",
                            answer: "Yes, for any everyday application, this is perfectly fair. It uses a high-entropy pseudorandom number generator (PRNG). While not technically 'true random' (which relies on measuring atomic radioactive decay or atmospheric noise), the mathematical distribution of choices made here is statistically indistinguishable from a perfectly fair dice roll."
                        },
                        {
                            question: "What does 'Allow Duplicates' mean?",
                            answer: "If 'Allow Duplicates' is turned ON, drawing an item does not remove it from the pool. For example, if you are drawing 5 times from [Apple, Banana], you might get [Apple, Apple, Banana, Apple, Banana]. If it is OFF, once an item is drawn, it cannot be drawn again."
                        },
                        {
                            question: "Is my list data saved to a server?",
                            answer: "No. This tool runs 100% locally in your web browser. The list you type or paste never leaves your device, making it completely secure for private or sensitive information (like emails or full names)."
                        }
                    ]}
                    relatedCalculators={[
                        { name: "Online Dice Roller", path: "/dice-roller", desc: "Roll virtual D6, D20, or custom dice for board games and RPGs." },
                        { name: "Random Letter Generator", path: "/random-letter-generator", desc: "Generate random alphabet letters for word games and categories." },
                        { name: "Random String Generator", path: "/random-string-generator", desc: "Generate secure, completely random alphanumeric passwords." }
                    ]}
                />
            </div>
        </div>
    );
}
