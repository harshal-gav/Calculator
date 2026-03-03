'use client';

import { useState } from 'react';
import CalculatorSEO from '@/components/CalculatorSEO';
export default function PrimeFactorizationCalculator() {
    const [number, setNumber] = useState('84');
    const [factors, setFactors] = useState<{ prime: number; power: number }[] | null>(null);
    const [isError, setIsError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const calculate = () => {
        setIsError(false);
        const num = parseInt(number, 10);

        if (isNaN(num)) {
            setIsError(true);
            setErrorMsg('Please enter a valid integer.');
            setFactors(null);
            return;
        }

        if (num < 2) {
            setIsError(true);
            setErrorMsg('Prime factorization applies to integers greater than 1.');
            setFactors(null);
            return;
        }

        // Extremely large number guard
        if (num > Number.MAX_SAFE_INTEGER || num > 999999999999) {
            setIsError(true);
            setErrorMsg('Number is too large or outside safe integer bounds for client-side processing.');
            setFactors(null);
            return;
        }

        let n = num;
        const res: Record<number, number> = {};

        // Extract 2
        while (n % 2 === 0) {
            res[2] = (res[2] || 0) + 1;
            n /= 2;
        }

        // Extract odd primes
        for (let i = 3; i * i <= n; i += 2) {
            while (n % i === 0) {
                res[i] = (res[i] || 0) + 1;
                n /= i;
            }
        }

        // If n falls down to a prime > 2
        if (n > 2) {
            res[n] = (res[n] || 0) + 1;
        }

        const out = Object.keys(res).map(k => ({
            prime: parseInt(k, 10),
            power: res[parseInt(k, 10)]
        }));

        setFactors(out);
    };

    return (
        <div className="max-w-3xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-emerald-900 font-serif">
                    <span className="mr-3">🌳</span> Prime Factorization
                </h1>
                <p className="text-emerald-700 text-lg max-w-xl mx-auto">
                    Decompose any integer into a product of its prime factors instantly.
                </p>
            </div>

            <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-zinc-200">
                <label className="block text-sm font-bold text-zinc-500 mb-2 uppercase tracking-widest text-center">Enter a Number</label>

                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                    <input
                        type="number" step="1" min="2"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        className="w-full md:w-64 text-center rounded-xl border-2 border-zinc-300 focus:border-emerald-500 focus:ring-emerald-500 font-mono text-3xl font-bold bg-zinc-50 py-4 shadow-inner"
                        placeholder="e.g. 84"
                        onKeyDown={(e) => e.key === 'Enter' && calculate()}
                    />
                    <button
                        onClick={calculate}
                        className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-5 px-8 rounded-xl transition-colors shadow-lg shadow-emerald-600/30 uppercase tracking-widest text-sm"
                    >
                        Factorize
                    </button>
                </div>

                {isError && (
                    <div className="mt-6 text-center text-red-600 bg-red-50 p-3 rounded-lg border border-red-200 font-medium">
                        {errorMsg}
                    </div>
                )}
            </div>

            {factors && (
                <div className="mt-8 bg-emerald-950 rounded-2xl p-6 md:p-12 shadow-2xl relative overflow-hidden text-center border border-emerald-800">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

                    <div className="relative z-10 w-full flex flex-col items-center">
                        <h2 className="text-emerald-400 font-bold uppercase tracking-widest text-sm mb-6">Prime Factors</h2>

                        {factors.length === 1 && factors[0].power === 1 ? (
                            <div className="bg-zinc-800/80 backdrop-blur border border-emerald-500/50 p-6 rounded-2xl">
                                <span className="text-3xl text-emerald-300 font-bold block mb-2">{number} is a Prime Number!</span>
                                <span className="text-zinc-400">It can only be divided by 1 and itself.</span>
                            </div>
                        ) : (
                            <div className="flex flex-wrap items-center justify-center gap-3 text-4xl md:text-5xl font-mono font-bold text-white tracking-widest bg-black/40 p-8 rounded-2xl border border-white/10 shadow-inner break-all">
                                {factors.map((f, i) => (
                                    <div key={f.prime} className="flex items-center">
                                        <span className="text-emerald-400">{f.prime}</span>
                                        {f.power > 1 && (
                                            <sup className="text-2xl md:text-3xl ml-1 text-emerald-200">{f.power}</sup>
                                        )}
                                        {i < factors.length - 1 && (
                                            <span className="mx-3 text-zinc-500 text-3xl">×</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Expanded notation */}
                        {factors.length > 0 && !(factors.length === 1 && factors[0].power === 1) && (
                            <div className="mt-8 pt-6 border-t border-emerald-800 w-full max-w-lg">
                                <div className="text-emerald-600 text-xs font-bold uppercase tracking-widest mb-3">Expanded Form</div>
                                <div className="text-xl md:text-2xl font-mono text-emerald-200/80 break-all leading-loose">
                                    {factors.map(f => Array(f.power).fill(f.prime).join(' × ')).join(' × ')}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Prime Factorization Calculator", "operatingSystem": "All", "applicationCategory": "EducationalApplication" }) }} />

            <div className="mt-8">
                <CalculatorSEO
                    title="Prime Factorization Calculator"
                    whatIsIt={
                        <>
                            <p>A <strong>Prime Factorization Calculator</strong> is an analytical math tool designed to break down any composite integer into the fundamental prime numbers that, when multiplied together, produce the original number.</p>
                            <p>Every integer greater than 1 is either a standalone prime or can be decomposed into a unique set of prime factors. Our tool automatically displays both the standard multiplied visual representation (e.g., 2 × 2 × 3) and the elegant algebraic exponential form.</p>
                        </>
                    }
                    formula={
                        <>
                            <p>The Fundamental Theorem of Arithmetic states that every integer greater than 1 has exactly one unique prime factorization.</p>
                            <div className="bg-zinc-100 p-4 rounded-lg text-center text-lg md:text-xl shadow-inner my-4 text-emerald-900 border border-zinc-200">
                                N = (p₁)<sup>a</sup> × (p₂)<sup>b</sup> × (p₃)<sup>c</sup> ...
                            </div>
                            <p>Where <strong>p</strong> represents strictly prime numbers (2, 3, 5, 7, 11...) and the superscript (<strong>a, b, c</strong>) represents how many times that exact prime is multiplied.</p>
                        </>
                    }
                    example={
                        <>
                            <p>Let’s determine the prime factorization of <strong>84</strong> using the factor tree method:</p>
                            <ol className="list-decimal pl-6 space-y-2 mt-4 font-mono text-sm bg-black/5 p-4 rounded-xl border border-black/10">
                                <li>Divide by 2 (the smallest prime): 84 ÷ 2 = <strong>42</strong></li>
                                <li>Divide by 2 again: 42 ÷ 2 = <strong>21</strong></li>
                                <li>21 isn't divisible by 2. Next smallest prime is 3: 21 ÷ 3 = <strong>7</strong></li>
                                <li>7 is a prime number, so we stop.</li>
                            </ol>
                            <p className="mt-4 text-emerald-700 font-bold border-t border-emerald-100 pt-4 text-center">
                                Prime Factors: 2 × 2 × 3 × 7 <br />
                                Exponential Form: 2² × 3 × 7
                            </p>
                        </>
                    }
                    useCases={
                        <ul className="list-disc pl-6 space-y-4">
                            <li><strong>Finding GCF and LCM:</strong> Prime factorization is the foolproof underpinning method used to manually calculate the Greatest Common Factor and Least Common Multiple of multiple numbers.</li>
                            <li><strong>Simplifying Fractions:</strong> Decomposing large numerators and denominators into primes makes canceling shared factors trivial, allowing you to instantly reduce fractions to their lowest terms.</li>
                            <li><strong>Cryptography:</strong> Prime numbers and factorization form the absolute mathematical foundation for RSA encryption algorithms that secure modern internet communications.</li>
                        </ul>
                    }
                    faqs={[
                        {
                            question: "Is 1 a prime factor?",
                            answer: "No, the number 1 is specifically excluded from being prime because a prime number must have exactly two distinct positive divisors: 1 and itself. Furthermore, including 1 would violate the Fundamental Theorem of Arithmetic regarding unique factorization."
                        },
                        {
                            question: "What happens if I put a prime number into the calculator?",
                            answer: "The calculator will immediately identify and explicitly inform you that your inputted number is already a prime number, meaning its only prime factor is itself raised to the power of 1."
                        }
                    ]}
                    relatedCalculators={[
                        { name: "LCM Calculator", path: "/lcm-calculator", desc: "Determine the Least Common Multiple of up to 5 integers." },
                        { name: "GCF Calculator", path: "/gcf-calculator", desc: "Find the Greatest Common Factor using prime components." },
                        { name: "Fraction Simplifier", path: "/fraction-simplifier-calculator", desc: "Use common factor division to reduce fractions automatically." }
                    ]}
                />
            </div>
        </div>
    );
}
