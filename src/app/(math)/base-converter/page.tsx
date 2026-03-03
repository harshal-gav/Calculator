'use client';

import { useState } from 'react';
import CalculatorSEO from '@/components/CalculatorSEO';

export default function BaseConverter() {
    const [inputValue, setInputValue] = useState('42');
    const [inputBase, setInputBase] = useState('10'); // '2', '8', '10', '16'

    const [result, setResult] = useState<{
        binary: string;
        octal: string;
        decimal: string;
        hex: string;
    } | null>(null);

    const [error, setError] = useState('');

    const calculate = () => {
        setError('');
        let raw = inputValue.trim();

        if (!raw) {
            setResult(null);
            return;
        }

        const baseMap: { [key: string]: number } = {
            '2': 2,
            '8': 8,
            '10': 10,
            '16': 16
        };

        const rBase = baseMap[inputBase];
        let decValue = 0;

        try {
            // Check validity before passing to parseInt (some browsers let '19' pass base 8 as 1)
            let regex = /^[0-9]+$/;
            if (rBase === 2) regex = /^[0-1]+$/;
            else if (rBase === 8) regex = /^[0-7]+$/;
            else if (rBase === 16) regex = /^[0-9A-Fa-f]+$/;

            if (!regex.test(raw)) {
                throw new Error("Invalid characters for the selected base.");
            }

            decValue = parseInt(raw, rBase);
            if (isNaN(decValue)) throw new Error("Could not parse number.");

            setResult({
                binary: decValue.toString(2),
                octal: decValue.toString(8),
                decimal: decValue.toString(10),
                hex: decValue.toString(16).toUpperCase()
            });
        } catch (e: any) {
            setError(e.message || "Invalid input.");
            setResult(null);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-sky-900 flex items-center justify-center font-serif">
                    <span className="mr-3">🔄</span> Base Converter
                </h1>
                <p className="text-sky-700 text-lg max-w-2xl mx-auto">
                    Convert numbers instantly between Decimal, Binary, Octal, and Hexadecimal.
                </p>
            </div>

            <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-zinc-200 mb-8 max-w-xl mx-auto">
                <div className="space-y-6 mb-8">
                    <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">Enter Number</label>
                        <input
                            type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)}
                            className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-sky-500 font-bold font-mono text-2xl text-center uppercase transition-all outline-none"
                            onKeyDown={(e) => e.key === 'Enter' && calculate()}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">Current Base</label>
                        <div className="grid grid-cols-2 gap-3 md:flex md:gap-4 justify-center">
                            {[
                                { val: '2', label: 'Binary (2)' },
                                { val: '8', label: 'Octal (8)' },
                                { val: '10', label: 'Decimal (10)' },
                                { val: '16', label: 'Hex (16)' }
                            ].map(base => (
                                <button
                                    key={base.val}
                                    onClick={() => { setInputBase(base.val); setResult(null); }}
                                    className={`flex-1 py-3 px-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-colors border ${inputBase === base.val ? 'bg-sky-100 border-sky-300 text-sky-800 shadow-sm' : 'bg-white border-zinc-200 text-zinc-500 hover:bg-zinc-50'}`}
                                >
                                    {base.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl font-bold text-center">
                        {error}
                    </div>
                )}

                <button
                    onClick={calculate}
                    className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-sky-600/30 uppercase tracking-widest text-lg"
                >
                    Convert Number
                </button>
            </div>

            {result !== null && (
                <div className="bg-slate-900 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-sky-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

                    <h2 className="text-white/60 font-bold uppercase tracking-widest text-xs mb-8 z-10 text-center">Conversion Results</h2>

                    <div className="w-full max-w-2xl z-10 grid grid-cols-1 gap-4">
                        <div className={`p-5 rounded-2xl border ${inputBase === '10' ? 'bg-sky-900/40 border-sky-400' : 'bg-black/40 border-white/5'} flex justify-between items-center transition-all`}>
                            <span className="text-sky-300 text-[10px] font-bold uppercase tracking-widest w-1/4">Decimal</span>
                            <div className="font-mono font-black text-2xl md:text-3xl text-white break-all text-right w-3/4 select-all">
                                {result.decimal}
                            </div>
                        </div>

                        <div className={`p-5 rounded-2xl border ${inputBase === '2' ? 'bg-indigo-900/40 border-indigo-400' : 'bg-black/40 border-white/5'} flex justify-between items-center transition-all`}>
                            <span className="text-indigo-300 text-[10px] font-bold uppercase tracking-widest w-1/4">Binary</span>
                            <div className="font-mono font-black text-2xl md:text-3xl text-white break-all text-right w-3/4 select-all">
                                {result.binary}
                            </div>
                        </div>

                        <div className={`p-5 rounded-2xl border ${inputBase === '16' ? 'bg-purple-900/40 border-purple-400' : 'bg-black/40 border-white/5'} flex justify-between items-center transition-all`}>
                            <span className="text-purple-300 text-[10px] font-bold uppercase tracking-widest w-1/4">Hexadecimal</span>
                            <div className="font-mono font-black text-2xl md:text-3xl text-white break-all text-right w-3/4 select-all">
                                {result.hex}
                            </div>
                        </div>

                        <div className={`p-5 rounded-2xl border ${inputBase === '8' ? 'bg-teal-900/40 border-teal-400' : 'bg-black/40 border-white/5'} flex justify-between items-center transition-all`}>
                            <span className="text-teal-300 text-[10px] font-bold uppercase tracking-widest w-1/4">Octal</span>
                            <div className="font-mono font-black text-2xl md:text-3xl text-white break-all text-right w-3/4 select-all">
                                {result.octal}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Base Converter", "operatingSystem": "All", "applicationCategory": "DeveloperApplication" }) }} />

            <div className="mt-8">
                <CalculatorSEO
                    title="Base Number System Converter"
                    whatIsIt={
                        <>
                            <p>The <strong>Base Converter</strong> instantly translates numbers between the four most common mathematical base systems used in computer science and mathematics: Decimal (Base 10), Binary (Base 2), Octal (Base 8), and Hexadecimal (Base 16).</p>
                            <p>While humans naturally count in Base 10 (using 0-9), computers process data exclusively in Base 2 (0 and 1). Base 8 and Base 16 are incredibly useful shorthand representations that allow programmers to compact long binary strings into readable formats.</p>
                        </>
                    }
                    formula={
                        <>
                            <p>Converting between bases involves continuous division by the target base and mapping the remainders.</p>
                            <div className="bg-sky-50 p-4 rounded-lg font-mono text-center text-[15px] shadow-sm my-4 text-sky-900 border border-sky-100">
                                <strong>Decimal to Binary Example:</strong>
                                <br />25 ÷ 2 = 12 R <strong>1</strong>
                                <br />12 ÷ 2 = 6 R <strong>0</strong>
                                <br />6 ÷ 2 = 3 R <strong>0</strong>
                                <br />3 ÷ 2 = 1 R <strong>1</strong>
                                <br />1 ÷ 2 = 0 R <strong>1</strong>
                                <br />Read remainders bottom-to-top = <strong>11001₂</strong>
                            </div>
                        </>
                    }
                    example={
                        <>
                            <p>Let's convert the Decimal number <strong>255</strong> into the other base formats.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4 text-zinc-700">
                                <li><strong>Binary (Base-2):</strong> 11111111</li>
                                <li><strong>Octal (Base-8):</strong> 377</li>
                                <li><strong>Hexadecimal (Base-16):</strong> FF</li>
                                <li>Notice how Hexadecimal condenses an 8-digit binary string into just 2 characters. This is why Hex is ubiquitous in color codes (e.g., #FFFFFF) and memory addresses.</li>
                            </ul>
                        </>
                    }
                    useCases={
                        <ul className="list-disc pl-6 space-y-4 text-zinc-700">
                            <li><strong>Networking and Subnetting:</strong> IT professionals constantly flip between binary and decimal when calculating IPv4 network masks and broadcast addresses.</li>
                            <li><strong>Web Development:</strong> Converting familiar RGB decimal color values (rgb(255, 0, 128)) into compact Hexadecimal strings (#FF0080) for CSS stylesheets.</li>
                            <li><strong>Assembly / Low-Level Programming:</strong> Interfacing directly with hardware registers or reading memory dumps, which are almost entirely displayed in compact Hex or raw Binary.</li>
                        </ul>
                    }
                    faqs={[
                        {
                            question: "Why does Hexadecimal use letters?",
                            answer: "Base-10 only has ten unique digits (0-9). Hexadecimal is Base-16, meaning it needs 16 unique single-digit symbols. We run out of numbers at 9, so we borrow the first six letters of the alphabet: A=10, B=11, C=12, D=13, E=14, F=15."
                        },
                        {
                            question: "Why do computers use binary?",
                            answer: "Hardware fundamentally consists of billions of microscopic transistors. A transistor essentially only has two states: ON (conducting current / 1) or OFF (blocking current / 0). Digital binary perfectly maps to this physical hardware reality."
                        }
                    ]}
                    relatedCalculators={[
                        { name: "Unit Converter", path: "/unit-converter", desc: "For converting between real-world measurement systems instead of number systems." },
                        { name: "Decimal to Fraction", path: "/fraction-simplifier-calculator", desc: "Convert standard decimals into exact simplified fractions." },
                        { name: "Hash Generator", path: "/hash-generator", desc: "Generate cryptographic hashes which are represented in hexadecimal strings." }
                    ]}
                />
            </div>
        </div>
    );
}
