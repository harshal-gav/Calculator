'use client';

import { useState } from 'react';
import CalculatorSEO from '@/components/CalculatorSEO';
// Simplified helper for numbers up to 999,999,999,999,999 (15 digits)
const numberToWords = (numStr: string): string => {
    const cleanNumStr = numStr.replace(/,/g, '').trim();
    if (!/^\d+$/.test(cleanNumStr)) return 'Invalid number format. Please enter only digits.';

    let num = BigInt(cleanNumStr);
    if (num === BigInt(0)) return 'Zero';

    const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const scales = ['', 'Thousand', 'Million', 'Billion', 'Trillion', 'Quadrillion', 'Quintillion'];

    const convertChunk = (n: number): string => {
        let chunkStr = '';
        if (n >= 100) {
            chunkStr += ones[Math.floor(n / 100)] + ' Hundred ';
            n %= 100;
        }
        if (n >= 20) {
            chunkStr += tens[Math.floor(n / 10)] + ' ';
            n %= 10;
        }
        if (n > 0) {
            chunkStr += ones[n] + ' ';
        }
        return chunkStr;
    };

    if (num > BigInt('999999999999999999999')) return 'Number is too large to convert accurately in this tool.';

    let chunks = [];
    while (num > BigInt(0)) {
        chunks.push(Number(num % BigInt(1000)));
        num /= BigInt(1000);
    }

    let result = '';
    for (let i = 0; i < chunks.length; i++) {
        if (chunks[i] !== 0) {
            const chunkStr = convertChunk(chunks[i]);
            const scaleStr = scales[i] ? scales[i] + ' ' : '';
            result = chunkStr + scaleStr + result;
        }
    }

    return result.trim();
};

export default function NumberToWordsConverter() {
    const [num, setNum] = useState('');
    const [words, setWords] = useState('');

    const convert = () => {
        if (!num) {
            setWords('');
            return;
        }
        setWords(numberToWords(num));
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-indigo-900 flex items-center justify-center font-serif">
                    <span className="mr-3">🔢</span> Number to Words Converter
                </h1>
                <p className="text-indigo-700 text-lg max-w-2xl mx-auto">
                    Type any large number and instantly convert it into written English words. Perfect for writing checks, legal documents, or essays.
                </p>
            </div>

            <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-zinc-200 mb-8 w-full max-w-2xl mx-auto">

                <div className="mb-8">
                    <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">Enter a Number</label>
                    <input
                        type="text"
                        value={num}
                        onChange={(e) => setNum(e.target.value.replace(/[^0-9,]/g, ''))}
                        placeholder="e.g. 1,000,000"
                        className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-indigo-500 font-bold bg-zinc-50 text-xl font-mono"
                        onKeyDown={(e) => e.key === 'Enter' && convert()}
                    />
                    <p className="text-xs text-zinc-400 mt-2 font-mono ml-2">Supports up to Quintillions</p>
                </div>

                <div>
                    <button
                        onClick={convert}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-indigo-600/30 uppercase tracking-widest text-lg"
                    >
                        Convert to Words
                    </button>
                </div>
            </div>

            {words && (
                <div className="bg-indigo-950 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

                    <div className="flex justify-between w-full max-w-3xl items-center mb-6 z-10 border-b border-indigo-500/30 pb-4">
                        <h2 className="text-indigo-400 font-bold uppercase tracking-widest text-xs">Written Output</h2>
                        <button
                            onClick={() => navigator.clipboard.writeText(words)}
                            className="text-xs bg-indigo-500 hover:bg-indigo-400 text-indigo-950 font-bold px-4 py-2 rounded-lg transition-colors"
                        >
                            Copy Text
                        </button>
                    </div>

                    <div className="z-10 w-full max-w-3xl">
                        <p className="font-serif text-white text-2xl md:text-4xl font-bold leading-tight break-words py-4 capitalize">
                            {words}
                        </p>
                    </div>

                    <div className="w-full max-w-3xl mt-6 z-10 pt-4 border-t border-indigo-500/30">
                        <span className="text-indigo-400 font-mono text-xs block break-all tracking-widest opacity-60">
                            RAW: {num.replace(/,/g, '')}
                        </span>
                    </div>
                </div>
            )}

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Number to Words Converter", "operatingSystem": "All", "applicationCategory": "UtilitiesApplication" }) }} />

            <div className="mt-8">
                <CalculatorSEO
                    title="Number to Words Converter"
                    whatIsIt={
                        <>
                            <p>A <strong>Number to Words Converter</strong> is an automatic transcription utility that takes numerical digits natively and mathematically groups them into proper English phonetic syntax. It instantly translates dense strings of digits (like "1,050,402") into readable English ("One Million Fifty Thousand Four Hundred Two").</p>
                            <p>While small numbers are easy to read, human cognitive processing struggles rapidly above the millions. This tool prevents transcription errors in high-value finance and legal documentation.</p>
                        </>
                    }
                    formula={
                        <>
                            <p>To perform this translation, the algorithm heavily utilizes the mathematical <strong>modulo</strong> and <strong>division</strong> operators to split large numbers into standard 'chunks' of 1,000.</p>
                            <ul className="list-disc pl-6 space-y-3 mt-4 text-zinc-700">
                                <li>It first evaluates groups of three digits from right to left (Thousands, Millions, Billions).</li>
                                <li>Within each three-digit chunk, it further divides by 100 to extract the 'hundreds' place.</li>
                                <li>It uses hardcoded English linguistic arrays (e.g., matching "3" to "Thirty" if it's in the tens place) to build out the inner string before appending the massive scale identifier at the end.</li>
                            </ul>
                        </>
                    }
                    example={
                        <>
                            <p>How does the algorithm evaluate <strong>45,012</strong>?</p>
                            <ul className="list-none space-y-2 mt-4 font-mono text-sm bg-indigo-50 p-4 rounded-xl border border-indigo-200">
                                <li><strong>Step 1 (Chunking):</strong> The engine splits this into two chunks based on powers of 1,000 using modulo arithmetic: <code>[45]</code> and <code>[012]</code>.</li>
                                <li><strong>Step 2 (The Thousands):</strong> It analyzes the left-most chunk (45). It maps 4 in the tens column to "Forty" and 5 to "Five". Because it's chunk index 1, it appends "Thousand" resulting in "Forty Five Thousand".</li>
                                <li><strong>Step 3 (The Ones):</strong> It analyzes the right chunk (012). It skips the zero in the hundreds column. It views 12 as a native exception mapping to "Twelve".</li>
                                <li><strong>Step 4 (Assembly):</strong> It merges the strings cleanly.</li>
                                <li className="pt-2 mt-2 font-bold text-indigo-800 border-t border-indigo-200">Final Result: Forty Five Thousand Twelve</li>
                            </ul>
                        </>
                    }
                    useCases={
                        <ul className="list-disc pl-6 space-y-4 text-zinc-700">
                            <li><strong>Check Writing:</strong> The United States banking system strictly requires you to spell out the legal tender amount on physical checks to prevent fraudulent alterations (e.g., turning $100 into $1000 with a pen).</li>
                            <li><strong>Legal & Financial Documents:</strong> High-value settlement agreements, corporate contracts, and real estate deeds routinely require all massive monetary figures to be spelled out entirely to prevent any ambiguity in litigation.</li>
                            <li><strong>Linguistic Education:</strong> Young students or English-as-a-second-language (ESL) learners use this to understand the complex phonetic structures of Western counting systems.</li>
                        </ul>
                    }
                    faqs={[
                        {
                            question: "How high can this calculator count?",
                            answer: "This specific algorithm is designed to accurately translate numbers up to 15 digits long, stopping precisely at 999 Trillion (the bounds of standard JavaScript numerical memory stability without throwing floating-point syntax errors). It supports up to the Quintillions using BigInt."
                        },
                        {
                            question: "Does it add 'and' between hundreds and tens?",
                            answer: "Currently, it outputs standard formal US mathematical syntax, which generally omits the 'and'. For example, 'One Hundred One' instead of the British 'One Hundred and One'."
                        },
                        {
                            question: "Can it handle decimal places (cents)?",
                            answer: "Right now, it focuses purely on solid whole integers. If you are writing a check ending in .50, you should mentally append 'and 50/100' or 'and Fifty Cents' to the end of the text string generated here."
                        }
                    ]}
                    relatedCalculators={[
                        { name: "Roman Numeral Converter", path: "/roman-numeral-converter", desc: "Convert standard Arabic digits into historic Roman Numerals." },
                        { name: "Base Converter", path: "/base-converter", desc: "Translate numbers from Decimal format into Hex or Binaries." },
                        { name: "Word Count Calculator", path: "/word-count-calculator", desc: "Count how many words or characters are inside a massive document." }
                    ]}
                />
            </div>
        </div>
    );
}
