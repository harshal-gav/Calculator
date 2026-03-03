'use client';

import { useState } from 'react';
import CalculatorSEO from '@/components/CalculatorSEO';

export default function AnnuityPVCalculator() {
    const [payment, setPayment] = useState('1000');
    const [rate, setRate] = useState('5');
    const [periods, setPeriods] = useState('10');
    const [isDue, setIsDue] = useState(false); // Ordinary vs Due

    const [result, setResult] = useState<{
        pv: number;
        totalPayout: number;
    } | null>(null);

    const calculate = () => {
        const pmt = parseFloat(payment);
        const r = parseFloat(rate) / 100;
        const t = parseFloat(periods);

        if (isNaN(pmt) || isNaN(r) || isNaN(t) || r === 0 || t === 0) {
            setResult(null);
            return;
        }

        // PV = PMT * [1 - (1 + r)^-n] / r
        let pv = pmt * ((1 - Math.pow(1 + r, -t)) / r);

        // Annuity Due: multiply by (1 + r)
        if (isDue) {
            pv = pv * (1 + r);
        }

        setResult({
            pv,
            totalPayout: pmt * t
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-emerald-900 flex items-center justify-center font-serif">
                    <span className="mr-3">⏱️</span> Annuity PV Calculator
                </h1>
                <p className="text-emerald-700 text-lg max-w-2xl mx-auto">
                    Calculate the Present Value of an annuity, representing the current total value of a future stream of payments.
                </p>
            </div>

            <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-zinc-200 mb-8 max-w-2xl mx-auto">
                <div className="space-y-6 mb-8">
                    <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">Payment Amount per Period (PMT)</label>
                        <div className="relative">
                            <span className="absolute left-4 top-4 text-zinc-400 font-bold">$</span>
                            <input
                                type="number" step="any" min="0" value={payment} onChange={(e) => setPayment(e.target.value)}
                                className="w-full rounded-xl border-zinc-300 shadow-sm p-4 pl-8 border focus:border-emerald-500 font-bold font-mono text-xl transition-all"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">Interest Rate per Period (%)</label>
                            <input
                                type="number" step="any" min="0" value={rate} onChange={(e) => setRate(e.target.value)}
                                className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-emerald-500 font-bold font-mono text-xl transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">Number of Periods (N)</label>
                            <input
                                type="number" step="any" min="1" value={periods} onChange={(e) => setPeriods(e.target.value)}
                                className="w-full rounded-xl border-zinc-300 shadow-sm p-4 border focus:border-emerald-500 font-bold font-mono text-xl transition-all"
                                onKeyDown={(e) => e.key === 'Enter' && calculate()}
                            />
                        </div>
                    </div>

                    <div className="pt-4">
                        <label className="block text-sm font-bold text-zinc-700 mb-4 uppercase tracking-wide">Payment Timing</label>
                        <div className="flex bg-zinc-100 rounded-xl p-1">
                            <button
                                onClick={() => { setIsDue(false); setResult(null); }}
                                className={`flex-1 py-3 px-4 rounded-lg font-bold text-sm transition-all ${!isDue ? 'bg-white text-emerald-800 shadow-sm border border-emerald-200' : 'text-zinc-500 hover:bg-zinc-200'}`}
                            >
                                Ordinary Annuity (End of Period)
                            </button>
                            <button
                                onClick={() => { setIsDue(true); setResult(null); }}
                                className={`flex-1 py-3 px-4 rounded-lg font-bold text-sm transition-all ${isDue ? 'bg-white text-emerald-800 shadow-sm border border-emerald-200' : 'text-zinc-500 hover:bg-zinc-200'}`}
                            >
                                Annuity Due (Beginning of Period)
                            </button>
                        </div>
                    </div>
                </div>

                <button
                    onClick={calculate}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-emerald-600/30 uppercase tracking-widest text-lg"
                >
                    Calculate Present Value
                </button>
            </div>

            {result !== null && (
                <div className="bg-emerald-950 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

                    <h2 className="text-emerald-300 font-bold uppercase tracking-widest text-xs mb-8 z-10 text-center">Results</h2>

                    <div className="z-10 relative mb-8 w-full max-w-sm">
                        <div className="p-8 rounded-3xl border-4 bg-emerald-900/60 border-emerald-400/30 shadow-inner flex flex-col items-center justify-center">
                            <span className="text-white/60 text-[10px] uppercase tracking-widest mb-2 font-bold block text-center border-b border-emerald-800 pb-2 w-3/4">Present Value (PV)</span>
                            <div className="font-bold text-4xl md:text-5xl text-white text-center drop-shadow-lg leading-tight font-mono break-all pt-2">
                                ${result.pv.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </div>
                        </div>
                    </div>

                    <div className="w-full max-w-lg z-10 bg-black/40 border border-emerald-500/30 p-5 rounded-xl flex justify-between items-center">
                        <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest">Total Nominal Payout</span>
                        <div className="font-mono text-white text-xl font-bold">
                            ${result.totalPayout.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                    </div>
                </div>
            )}

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Annuity Present Value Calculator", "operatingSystem": "All", "applicationCategory": "FinancialApplication" }) }} />

            <div className="mt-12 max-w-4xl mx-auto">
                <CalculatorSEO
                    title="Annuity Present Value Calculator"
                    whatIsIt={
                        <>
                            <p>The <strong>Annuity Present Value (PV) Calculator</strong> determines the current worth of a predefined series of future cash flows, discounted at a specific interest rate.</p>
                            <p>Time is money. A dollar received today is intrinsically worth more than a dollar received ten years from now because today's dollar can be invested to earn interest. "Present Value" strips away that time distortion, revealing exactly how much a stream of future payments is worth in today's money.</p>
                        </>
                    }
                    formula={
                        <>
                            <p>The calculation uses the standard Time Value of Money (TVM) formula for an <strong>Ordinary Annuity</strong> (payments at the end of the period):</p>
                            <div className="bg-emerald-50 p-4 rounded-lg font-mono text-center text-[15px] shadow-sm my-4 text-emerald-900 border border-emerald-100">
                                <strong>PV</strong> = PMT × [ 1 − (1 + r)<sup>−n</sup> ] / r
                            </div>
                            <p className="text-sm mt-2">For an <strong>Annuity Due</strong> (payments at the beginning of the period), the entire result is multiplied by <code>(1 + r)</code>.</p>
                            <p className="text-sm mt-2"><strong>PMT</strong> = Payment per period, <strong>r</strong> = Interest rate per period, <strong>n</strong> = Total number of periods.</p>
                        </>
                    }
                    example={
                        <>
                            <p>Let's say you just won the lottery and are offered two choices: <strong>$1,000 a month for 10 years</strong>, or a lump sum of cash today.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                                <li>The total nominal payout of $1k/mo over 120 months is $120,000.</li>
                                <li>However, assuming an expected market return (discount rate) of <strong>5% annually</strong> (or 0.416% monthly).</li>
                                <li>Inputting PMT=$1,000, r=0.416%, n=120... the Present Value is <strong>$94,228</strong>.</li>
                                <li><strong>The Reality Check:</strong> If the lottery offers you a lump sum greater than $94,228 today, you should mathematically take the lump sum. If they offer less, you should take the monthly payments.</li>
                            </ul>
                        </>
                    }
                    useCases={
                        <ul className="list-disc pl-6 space-y-4 text-gray-700">
                            <li><strong>Lottery & Settlement Scenarios:</strong> Analyzing court settlements or lottery payouts to mathematically determine whether taking the lump sum or the annuity stream is more profitable.</li>
                            <li><strong>Pension Valuation:</strong> Determining the absolute cash value of a corporate pension that guarantees $2,500 a month for 20 years to see if a buyout offer is fair.</li>
                            <li><strong>Retirement Planning:</strong> Calculating exactly how large of a lump sum you need saved on the day you retire to safely generate a required monthly income stream.</li>
                        </ul>
                    }
                    faqs={[
                        {
                            question: "What is the difference between an Ordinary Annuity and an Annuity Due?",
                            answer: "Timing. Ordinary annuities pay at the END of the period (like most loan payments). Annuities Due pay at the BEGINNING of the period (like rent). Because you get the money sooner with an Annuity Due, its Present Value is always slightly higher."
                        },
                        {
                            question: "How do I choose the 'Discount Rate'?",
                            answer: "The discount rate is your 'opportunity cost.' For most personal finance scenarios, use a conservative expected return of the stock market (e.g., 5% to 7%) or the rate of a safe alternative like a treasury bond (e.g., 4%)."
                        },
                        {
                            question: "Does this account for inflation?",
                            answer: "Only indirectly. If you want to find the real purchasing power of the annuity, you should reduce your discount rate by the expected inflation rate (e.g., if market return is 8% and inflation is 3%, use a 5% 'real' discount rate)."
                        }
                    ]}
                    relatedCalculators={[
                        { name: "Present Value Calculator", path: "/present-value-calculator", desc: "Calculate the PV of a single future lump sum, rather than a stream of payments." },
                        { name: "Retirement Calculator", path: "/retirement-calculator", desc: "Project the broader macroeconomic feasibility of your entire nest egg." },
                        { name: "Compound Interest Calculator", path: "/compound-interest-calculator", desc: "Run the math in reverse to see Future Value." }
                    ]}
                />
            </div>
        </div>
    );
}
