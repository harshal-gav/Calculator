'use client';

import { useState } from 'react';
import CalculatorSEO from '@/components/CalculatorSEO';

export default function MarginOfErrorCalculator() {
    const [sampleSize, setSampleSize] = useState('1000');
    const [populationSize, setPopulationSize] = useState('');
    const [confidenceLevel, setConfidenceLevel] = useState('95');
    const [proportion, setProportion] = useState('50'); // Typical worst-case 50%

    const [result, setResult] = useState<{
        marginOfErrorParams: number; // The +/- %
        confidenceVal: number;
    } | null>(null);

    const [error, setError] = useState('');

    const calculate = () => {
        setError('');

        const n = parseInt(sampleSize);
        const pop = populationSize ? parseInt(populationSize) : Infinity;
        const conf = parseFloat(confidenceLevel);
        const p = parseFloat(proportion) / 100;

        if (isNaN(n) || n <= 0) {
            setError('Sample size must be a positive integer.');
            setResult(null);
            return;
        }

        if (isNaN(conf) || conf <= 0 || conf >= 100) {
            setError('Confidence level must be between 0 and 100.');
            setResult(null);
            return;
        }

        if (isNaN(p) || p < 0 || p > 1) {
            setError('Proportion must be between 0 and 100%.');
            setResult(null);
            return;
        }

        // Find Z-score for common confidence levels
        let z = 1.96; // 95% default
        if (conf === 99) z = 2.576;
        else if (conf === 90) z = 1.645;
        else if (conf === 95) z = 1.96;
        else if (conf === 98) z = 2.326;
        else if (conf === 80) z = 1.282;
        else if (conf === 85) z = 1.440;
        else {
            setError('For this calculator, please use standard confidence levels: 80, 85, 90, 95, 98, or 99.');
            setResult(null);
            return;
        }

        // Standard Error for proportion: SE = sqrt( p*(1-p) / n )
        let standardError = Math.sqrt((p * (1 - p)) / n);

        // Finite Population Correction
        if (pop !== Infinity && pop > n) {
            const fpc = Math.sqrt((pop - n) / (pop - 1));
            standardError *= fpc;
        } else if (pop !== Infinity && pop <= n) {
            setError('Population size must be larger than sample size.');
            setResult(null);
            return;
        }

        const marginOfError = z * standardError;

        setResult({
            marginOfErrorParams: marginOfError * 100, // convert back to percentage
            confidenceVal: conf
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-fuchsia-900 flex items-center justify-center font-serif">
                    <span className="mr-3">📊</span> Margin of Error
                </h1>
                <p className="text-fuchsia-700 text-lg max-w-2xl mx-auto">
                    Calculate the expected margin of error for survey results and polling data.
                </p>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-zinc-200 mb-8 max-w-2xl mx-auto">
                <div className="space-y-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">Sample Size (n)</label>
                            <input
                                type="number" step="1" min="1" value={sampleSize} onChange={(e) => setSampleSize(e.target.value)}
                                className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-fuchsia-500 font-bold font-mono text-xl transition-all outline-none"
                            />
                            <p className="text-[10px] text-zinc-500 mt-2">Number of respondents.</p>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">Population (Optional)</label>
                            <input
                                type="number" step="1" min="1" value={populationSize} onChange={(e) => setPopulationSize(e.target.value)} placeholder="e.g. 100000"
                                className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-fuchsia-500 font-bold font-mono text-xl transition-all outline-none"
                            />
                            <p className="text-[10px] text-zinc-500 mt-2">Leave blank if total population is huge or unknown.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">Confidence Level (%)</label>
                            <select
                                value={confidenceLevel} onChange={(e) => setConfidenceLevel(e.target.value)}
                                className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-fuchsia-500 font-bold font-mono text-xl transition-all outline-none bg-white"
                            >
                                <option value="80">80%</option>
                                <option value="85">85%</option>
                                <option value="90">90%</option>
                                <option value="95">95% (Standard)</option>
                                <option value="98">98%</option>
                                <option value="99">99%</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">Expected Proportion (%)</label>
                            <div className="relative">
                                <input
                                    type="number" step="any" min="0" max="100" value={proportion} onChange={(e) => setProportion(e.target.value)}
                                    className="w-full rounded-xl border-zinc-300 shadow-sm p-4 pr-10 border focus:border-fuchsia-500 font-bold font-mono text-xl transition-all outline-none"
                                    onKeyDown={(e) => e.key === 'Enter' && calculate()}
                                />
                                <span className="absolute right-4 top-4 text-zinc-400 font-bold">%</span>
                            </div>
                            <p className="text-[10px] text-zinc-500 mt-2">Defaults to 50% for the most conservative (widest) margin of error.</p>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl font-bold text-center text-sm">
                        {error}
                    </div>
                )}

                <button
                    onClick={calculate}
                    className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-fuchsia-600/30 uppercase tracking-widest text-lg"
                >
                    Calculate Margin of Error
                </button>
            </div>

            {result !== null && (
                <div className="bg-slate-900 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

                    <h2 className="text-fuchsia-400 font-bold uppercase tracking-widest text-xs mb-8 z-10 text-center">Results</h2>

                    <div className="z-10 relative mb-8 w-full max-w-sm">
                        <div className="p-8 rounded-3xl border-4 bg-fuchsia-900/40 border-fuchsia-500/30 shadow-inner flex flex-col items-center justify-center">
                            <span className="text-fuchsia-300 text-[10px] font-bold uppercase tracking-widest mb-3 block border-b border-fuchsia-500/50 pb-2 w-full text-center">Margin of Error</span>
                            <div className="font-mono font-black text-5xl md:text-6xl text-white break-all tracking-tight drop-shadow-lg p-2 flex items-center">
                                <span className="text-3xl text-fuchsia-300 mr-2">±</span>
                                {result.marginOfErrorParams.toLocaleString('en-US', { maximumFractionDigits: 3 })}%
                            </div>
                        </div>
                    </div>

                    <div className="bg-black/30 px-6 py-4 rounded-xl border border-white/5 text-center flex flex-col items-center z-10 text-sm w-full max-w-md">
                        <span className="text-white/80 font-medium leading-relaxed">
                            You can be <strong className="text-fuchsia-300">{result.confidenceVal}% confident</strong> that the true population parameter falls within <strong className="text-fuchsia-300">±{result.marginOfErrorParams.toFixed(2)}%</strong> of your survey results.
                        </span>
                    </div>

                </div>
            )}

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Margin of Error Calculator", "operatingSystem": "All", "applicationCategory": "EducationalApplication" }) }} />

            <div className="mt-8">
                <CalculatorSEO
                    title="Margin of Error Calculator & Polling Precision"
                    whatIsIt={
                        <>
                            <p>The <strong>Margin of Error Calculator</strong> determines the statistical "wiggle room" or exact range of uncertainty surrounding a survey, poll, or sample dataset.</p>
                            <p>Because it is almost impossible to survey every single person in a population, researchers survey a smaller "sample." The Margin of Error tells you precisely how many percentage points your sample's result might differ from the true, real-world population's result.</p>
                        </>
                    }
                    formula={
                        <>
                            <p>The standard formula for calculating the margin of error of a proportion is driven by the Z-Score of your designated confidence level, multiplied by the standard error:</p>
                            <div className="bg-fuchsia-50 p-4 rounded-lg font-mono text-center text-[15px] shadow-sm my-4 text-fuchsia-900 border border-fuchsia-100">
                                MoE = z * √ [ (p * (1 - p)) / n ]
                            </div>
                            <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                                <li><strong>z:</strong> The Z-Score tied to your Confidence Level (e.g., 1.96 for 95% confidence).</li>
                                <li><strong>p:</strong> The sample proportion (usually set at 0.50 for the most conservative, widest margin).</li>
                                <li><strong>n:</strong> The sample size (the absolute number of people you actually surveyed).</li>
                            </ul>
                        </>
                    }
                    example={
                        <>
                            <p>Imagine you poll <strong>1,000 voters (n)</strong>, and 60% say they will vote for Candidate A. You want a <strong>95% Confidence Level (z = 1.96)</strong>.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                                <li><strong>The Setup:</strong> MoE = 1.96 * √ [ (0.50 * 0.50) / 1000 ]</li>
                                <li><strong>The Math:</strong> MoE = 1.96 * √ [ 0.25 / 1000 ] = 1.96 * √0.00025 = 1.96 * 0.0158</li>
                                <li><strong>The Result:</strong> MoE = <strong>0.031 (or ±3.1%)</strong>.</li>
                                <li><strong>Conclusion:</strong> You are 95% confident that the true number of voters who support Candidate A sits exactly between 56.9% and 63.1%.</li>
                            </ul>
                        </>
                    }
                    useCases={
                        <ul className="list-disc pl-6 space-y-4 text-gray-700">
                            <li><strong>Political Polling:</strong> News networks use MoE to declare if an election race is a "statistical tie." If Candidate A is winning by 2%, but the MoE is ±4%, the race is officially too close to call.</li>
                            <li><strong>Market Research:</strong> Companies launching a new product survey 500 potential customers to estimate total market demand before spending millions on manufacturing.</li>
                            <li><strong>Medical Trials:</strong> Researchers testing the efficacy of a new drug must define the margin of error to prove the drug's success rate is mathematically legitimate, not a random fluke.</li>
                        </ul>
                    }
                    faqs={[
                        {
                            question: "How do I make my Margin of Error smaller?",
                            answer: "The absolute best mathematical way to shrink your Margin of Error is to increase your Sample Size (survey more people). A secondary way is to tolerate a lower Confidence Level (e.g., dropping from 99% to 90%), but this makes your study less reliable."
                        },
                        {
                            question: "Why do we default the proportion to 50%?",
                            answer: "Statistically, 50% (0.50) creates the maximum possible uncertainty equation: 0.50 × 0.50 = 0.25. If you use 0.90 × 0.10, the result is only 0.09. Using 50% guarantees the calculator generates the safest, most conservative 'worst-case scenario' margin."
                        },
                        {
                            question: "Does the size of the total Population matter?",
                            answer: "Surprisingly, almost never. Surveying 1,000 random people yields practically the exact same Margin of Error whether your total population is 100,000 citizens or 330 million citizens. The math relies almost entirely on the absolute sample size, not the fraction."
                        }
                    ]}
                    relatedCalculators={[
                        { name: "Confidence Interval Calculator", path: "/confidence-interval-calculator", desc: "Calculate the exact upper and lower bounds based on your Margin of Error." },
                        { name: "Variance Calculator", path: "/variance-calculator", desc: "Measure the underlying spread and volatility of your raw survey data." },
                        { name: "Z-Score Calculator", path: "/z-score-calculator", desc: "Calculate the exact Standard Score used as the base multiplier for the MoE formula." }
                    ]}
                />
            </div>
        </div>
    );
}
