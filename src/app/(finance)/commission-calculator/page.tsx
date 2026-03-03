'use client';

import { useState } from 'react';
import CalculatorSEO from '@/components/CalculatorSEO';

export default function CommissionCalculator() {
    const [salePrice, setSalePrice] = useState('150000');
    const [commissionRate, setCommissionRate] = useState('5.5');

    const [result, setResult] = useState<{
        commission: number;
        sellerRevenue: number;
    } | null>(null);

    const calculate = () => {
        const p = parseFloat(salePrice);
        const r = parseFloat(commissionRate);

        if (isNaN(p) || isNaN(r) || p < 0 || r < 0) {
            setResult(null);
            return;
        }

        const commission = p * (r / 100);
        const sellerRevenue = p - commission;

        setResult({
            commission,
            sellerRevenue
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-emerald-900 flex items-center justify-center font-serif">
                    <span className="mr-3">🤝</span> Commission Calculator
                </h1>
                <p className="text-emerald-700 text-lg max-w-2xl mx-auto">
                    Calculate agent commissions and net profit for real estate, sales, and affiliates.
                </p>
            </div>

            <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-zinc-200 mb-8 max-w-2xl mx-auto">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                        <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">Total Sale Price ($)</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-zinc-400 text-xl">$</span>
                            <input
                                type="number" step="any" min="0" value={salePrice} onChange={(e) => setSalePrice(e.target.value)}
                                className="w-full rounded-xl border-zinc-300 shadow-sm p-4 pl-10 border focus:border-emerald-500 font-bold bg-zinc-50 text-xl"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-zinc-600 mb-2 uppercase tracking-wide">Commission Rate (%)</label>
                        <div className="relative">
                            <input
                                type="number" step="any" min="0" value={commissionRate} onChange={(e) => setCommissionRate(e.target.value)}
                                className="w-full rounded-xl border-zinc-300 shadow-sm p-4 pr-10 border focus:border-emerald-500 font-bold bg-zinc-50 text-xl"
                                onKeyDown={(e) => e.key === 'Enter' && calculate()}
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-zinc-400 text-xl">%</span>
                        </div>
                    </div>
                </div>

                <div>
                    <button
                        onClick={calculate}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-emerald-600/30 uppercase tracking-widest text-lg"
                    >
                        Calculate Commission
                    </button>
                </div>
            </div>

            {result !== null && (
                <div className="bg-emerald-950 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full z-10 relative">
                        <div className="bg-emerald-900/60 p-6 rounded-xl border border-emerald-500/30 flex flex-col items-center text-center shadow-inner">
                            <span className="text-emerald-300 text-xs font-bold uppercase tracking-wide mb-2 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                Agent Commission
                            </span>
                            <div className="font-mono text-white tracking-tight font-black text-4xl mt-2 truncate w-full">
                                ${result.commission.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </div>
                        </div>

                        <div className="bg-black/30 p-6 rounded-xl border border-emerald-500/30 flex flex-col items-center text-center shadow-inner">
                            <span className="text-zinc-400 text-xs font-bold uppercase tracking-wide mb-2">Net to Seller</span>
                            <div className="font-mono text-zinc-300 tracking-tight font-bold text-4xl mt-2 truncate w-full">
                                ${result.sellerRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Commission Calculator", "operatingSystem": "All", "applicationCategory": "FinanceApplication" }) }} />

            <CalculatorSEO
                title="Commission Calculator"
                whatIsIt={
                    <p>
                        The <strong>Commission Calculator</strong> helps sales professionals, real estate agents, and business owners quickly determine their commission earnings and the net revenue received by the seller from a given sale price.
                    </p>
                }
                formula={
                    <>
                        <p>The commission and net revenue are calculated using these straightforward percentage formulas:</p>
                        <div className="bg-white p-4 rounded-lg font-mono text-center text-[15px] shadow-sm my-4 border border-zinc-200">
                            <strong>Commission = Sale Price × (Commission Rate / 100)</strong><br />
                            <strong>Net to Seller = Sale Price − Commission</strong>
                        </div>
                    </>
                }
                example={
                    <>
                        <p>If you sell a property for $150,000 with a 5.5% commission rate:</p>
                        <ul className="list-disc pl-6 space-y-2 mt-2">
                            <li>Commission: 150,000 × 0.055 = <strong>$8,250</strong></li>
                            <li>Net to Seller: 150,000 − 8,250 = <strong>$141,750</strong></li>
                        </ul>
                    </>
                }
                useCases={
                    <ul className="list-disc pl-6 space-y-4">
                        <li><strong>Real Estate Agents:</strong> Quickly determine standard fee structures before finalizing listing agreements and forecasting personal income.</li>
                        <li><strong>Sales Teams & Referrals:</strong> Calculate affiliate payouts or finder's fees easily for closed deals.</li>
                        <li><strong>Sellers:</strong> Understand exactly how much cash you will take away from the total sale after closing costs and agent fees are accounted for.</li>
                    </ul>
                }
                faqs={[
                    {
                        question: "Does this factor in taxes or broker splits?",
                        answer: "No, this is a gross commission calculator. For individuals working with a broker, you will often need to split the total commission amount further (e.g., a 50/50 broker split) and pay necessary income taxes on the remaining distribution."
                    },
                    {
                        question: "What is an average real estate commission rate?",
                        answer: "In the United States, customary real estate commission rates typically hover between 5% and 6% of the total home sale price, often split evenly between the buyer's agent and the listing agent."
                    }
                ]}
                relatedCalculators={[
                    { name: "Markup Calculator", path: "/markup-calculator", desc: "Calculate your product's selling price based on cost and markup." },
                    { name: "Margin Calculator", path: "/margin-calculator", desc: "Find your gross margin percentage and profit." },
                    { name: "Tip Calculator", path: "/tip-calculator", desc: "Easily split the bill and calculate gratuity percentages." }
                ]}
            />
        </div>
    );
}
