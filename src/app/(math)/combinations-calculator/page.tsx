'use client';

import { useState } from 'react';
import CalculatorSEO from '@/components/CalculatorSEO';

export default function CombinationsCalculator() {
    const [nVal, setNVal] = useState('10');
    const [rVal, setRVal] = useState('3');

    const [result, setResult] = useState<{
        combinations: string;
        formula: string;
    } | null>(null);

    const [error, setError] = useState('');

    // Safe factorial using BigInt for large numbers
    const factorial = (num: number): bigint => {
        let res = BigInt(1);
        for (let i = BigInt(2); i <= BigInt(num); i++) {
            res *= i;
        }
        return res;
    };

    const calculate = () => {
        setError('');
        const n = parseInt(nVal);
        const r = parseInt(rVal);

        if (isNaN(n) || isNaN(r)) {
            setResult(null);
            return;
        }

        if (n < 0 || r < 0) {
            setError("n and r must be non-negative integers.");
            setResult(null);
            return;
        }

        if (r > n) {
            setError("r cannot be greater than n.");
            setResult(null);
            return;
        }

        if (n > 1000) {
            setError("For performance reasons, n is limited to 1000.");
            setResult(null);
            return;
        }

        try {
            // nCr = n! / (r! * (n-r)!)
            // To avoid huge intermediate factorials, we calculate carefully

            let numerator = BigInt(1);
            let denominator = BigInt(1);

            // Optimization: nCr is symmetric. nCr(10, 8) == nCr(10, 2). 
            // So we use the smaller r to do fewer multiplications.
            const k = Math.min(r, n - r);

            for (let i = 1; i <= k; i++) {
                numerator *= BigInt(n - i + 1);
                denominator *= BigInt(i);
            }

            const combinations = numerator / denominator;

            let displayVal = combinations.toString();
            // Format with commas if it's huge, but Number.toLocaleString() might lose precision beyond SafeInteger.
            // Custom string formatting for large numbers:
            if (displayVal.length > 21) {
                // Approximate scientific notation
                const num = Number(combinations);
                displayVal = num.toExponential(4) + ` (Exact: ${displayVal})`;
            } else if (displayVal.length > 3) {
                displayVal = displayVal.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }

            setResult({
                combinations: displayVal,
                formula: `C(${n}, ${r}) = \frac{${n}!}{${r}! \times (${n}-${r})!}`
            });

        } catch (e) {
            setError("Error calculating combinations. Result may be too large.");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-pink-900 flex items-center justify-center font-serif">
                    <span className="mr-3">🤝</span> Combinations
                </h1>
                <p className="text-pink-700 text-lg max-w-2xl mx-auto">
                    Calculate nCr: The number of ways to choose <span className="font-bold italic">r</span> items from a set of <span className="font-bold italic">n</span> items without repetition, where order does <strong className="uppercase underline">not</strong> matter.
                </p>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-zinc-200 mb-8 max-w-xl mx-auto">

                <div className="flex justify-center items-center gap-6 mb-8 mt-4">
                    <div className="text-center font-mono font-bold text-4xl md:text-6xl text-pink-300">
                        C(
                    </div>

                    <div className="flex flex-col gap-4 items-center">
                        <div className="w-full">
                            <label className="block text-[10px] font-bold text-zinc-500 mb-1 text-center uppercase tracking-widest">Total Items (n)</label>
                            <input
                                type="number" step="1" min="0" value={nVal} onChange={(e) => setNVal(e.target.value)}
                                className="w-24 text-center rounded-xl py-3 text-2xl font-bold bg-zinc-50 border-2 border-zinc-200 focus:border-pink-500 outline-none"
                            />
                        </div>
                        <div className="text-zinc-400 font-bold text-xl">,</div>
                        <div className="w-full">
                            <label className="block text-[10px] font-bold text-zinc-500 mb-1 text-center uppercase tracking-widest">Choose (r)</label>
                            <input
                                type="number" step="1" min="0" value={rVal} onChange={(e) => setRVal(e.target.value)}
                                className="w-24 text-center rounded-xl py-3 text-2xl font-bold bg-zinc-50 border-2 border-zinc-200 focus:border-pink-500 outline-none"
                                onKeyDown={(e) => e.key === 'Enter' && calculate()}
                            />
                        </div>
                    </div>

                    <div className="text-center font-mono font-bold text-4xl md:text-6xl text-pink-300">
                        )
                    </div>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl font-bold text-center">
                        {error}
                    </div>
                )}

                <button
                    onClick={calculate}
                    className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-pink-600/30 uppercase tracking-widest text-lg"
                >
                    Calculate nCr
                </button>
            </div>

            {result !== null && (
                <div className="bg-slate-900 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-pink-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

                    <h2 className="text-pink-400 font-bold uppercase tracking-widest text-xs mb-8 z-10 text-center">Total Combinations</h2>

                    <div className="z-10 relative mb-8 w-full max-w-lg bg-black/40 border border-pink-500/30 p-8 rounded-3xl shadow-inner text-center">
                        <div className="font-mono font-black text-4xl md:text-5xl text-white break-all tracking-tight drop-shadow-lg">
                            {result.combinations}
                        </div>
                    </div>

                    <div className="bg-black/30 p-5 rounded-xl border border-white/5 text-center flex flex-col items-center z-10">
                        <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-3 block">Formula Notation</span>
                        <div className="flex items-center text-white/80 font-mono text-xl">
                            <span className="mr-4">C({nVal}, {rVal}) = </span>
                            <div className="flex flex-col items-center">
                                <span>{nVal}!</span>
                                <div className="w-full h-px bg-white/50 my-1"></div>
                                <span>{rVal}!({nVal}-{rVal})!</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Combinations Calculator", "operatingSystem": "All", "applicationCategory": "EducationalApplication" }) }} />

            <div className="mt-8">
                <CalculatorSEO
                    title="Combinations Calculator (nCr)"
                    whatIsIt={
                        <>
                            <p>The <strong>Combinations Calculator</strong> determines the total number of unique ways exactly <em>r</em> items can be selected from a larger pool of <em>n</em> total items, specifically under the rule that <strong>order does not matter</strong>.</p>
                            <p>For example, if you are choosing a team of 3 people from a department of 10, choosing "Alice, Bob, and Charlie" is mathematically identical to choosing "Charlie, Alice, and Bob." That is a combination.</p>
                        </>
                    }
                    formula={
                        <>
                            <p>The standard combinations formula utilizes factorials (!) to eliminate redundant, out-of-order duplicates. It is written as:</p>
                            <div className="bg-pink-50 p-4 rounded-lg font-mono text-center text-[15px] shadow-sm my-4 text-pink-900 border border-pink-100">
                                C(n, r) = n! / [r! × (n - r)!]
                            </div>
                            <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                                <li><strong>n:</strong> The total number of items available to pick from in the set.</li>
                                <li><strong>r:</strong> The number of items you are actually selecting.</li>
                                <li><strong>!:</strong> The factorial symbol (e.g., 5! = 5 × 4 × 3 × 2 × 1).</li>
                            </ul>
                        </>
                    }
                    example={
                        <>
                            <p>Imagine a local pizza shop offers <strong>8 different toppings (n)</strong>, and you want to order a pizza with exactly <strong>3 toppings (r)</strong>. Assuming you cannot order double pepperoni (no repetition), how many unique pizzas can you build?</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                                <li><strong>The Setup:</strong> C(8, 3) = 8! / [3! × (8 - 3)!]</li>
                                <li><strong>Simplifying:</strong> 8! / (3! × 5!) = (8 × 7 × 6) / (3 × 2 × 1)</li>
                                <li><strong>The Math:</strong> 336 / 6</li>
                                <li><strong>The Result:</strong> There are exactly <strong>56 unique combination</strong> pizzas you could possibly order.</li>
                            </ul>
                        </>
                    }
                    useCases={
                        <ul className="list-disc pl-6 space-y-4 text-gray-700">
                            <li><strong>Lottery Odds:</strong> Calculating the exact probability of winning the Powerball or Mega Millions based on choosing 5 numbers out of a drum of 69 options.</li>
                            <li><strong>Tournament Bracket Creation:</strong> Calculating how many total games need to be played in a "round-robin" sports tournament where every team must play every other team exactly once.</li>
                            <li><strong>Menu & Product Design:</strong> Determining how many unique combo meals a restaurant can market based on offering a choice of 2 sides out of 10 options.</li>
                        </ul>
                    }
                    faqs={[
                        {
                            question: "What is the difference between Combinations and Permutations?",
                            answer: "It all comes down to order. A Combination is like a fruit salad: apples, grapes, and bananas is the exact same salad as bananas, grapes, and apples. A Permutation is like a combination lock: 1-2-3 is completely different from 3-2-1."
                        },
                        {
                            question: "Why does the number shrink so fast compared to factorials?",
                            answer: "Because we divide out the redundant orders. If you pick 5 cards from a 52 card deck, there are millions of ways to pull those 5 cards one by one (Permutations). But since we don't care about the order you pulled them, we divide by 5! (120) to remove the duplicates, making Combinations much smaller."
                        },
                        {
                            question: "What does C(n, n) equal?",
                            answer: "Exactly 1. If you have 10 employees and you need to select a team of 10 people, there is only 1 possible combination: you just take everybody."
                        }
                    ]}
                    relatedCalculators={[
                        { name: "Permutations Calculator", path: "/permutation-calculator", desc: "Calculate scenarios where the exact sequence and order of the selection matter." },
                        { name: "Factorial Calculator", path: "/factorial-calculator", desc: "Calculate the base n! values that power these statistical probability formulas." },
                        { name: "Probability Calculator", path: "/probability-calculator", desc: "Turn these raw combination counts into actual percentage odds of winning or losing." },
                    ]}
                />
            </div>
        </div>
    );
}
