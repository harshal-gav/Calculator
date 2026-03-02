'use client';

import { useState } from 'react';
import CalculatorSEO from '@/components/CalculatorSEO';

type AssetLiability = {
    id: number;
    name: string;
    amount: string;
};

export default function NetWorthCalculator() {
    const [assets, setAssets] = useState<AssetLiability[]>([
        { id: 1, name: 'Checking Account', amount: '5000' },
        { id: 2, name: 'Savings Account', amount: '15000' },
        { id: 3, name: 'Home Value', amount: '350000' },
    ]);

    const [liabilities, setLiabilities] = useState<AssetLiability[]>([
        { id: 4, name: 'Mortgage Remaining', amount: '280000' },
        { id: 5, name: 'Credit Card Debt', amount: '2500' },
    ]);

    const [result, setResult] = useState<{
        totalAssets: number;
        totalLiabilities: number;
        netWorth: number;
    } | null>(null);

    const addAsset = () => setAssets([...assets, { id: Date.now(), name: '', amount: '0' }]);
    const addLiability = () => setLiabilities([...liabilities, { id: Date.now(), name: '', amount: '0' }]);

    const removeAsset = (id: number) => setAssets(assets.filter(a => a.id !== id));
    const removeLiability = (id: number) => setLiabilities(liabilities.filter(l => l.id !== id));

    const updateItem = (list: 'assets' | 'liabilities', id: number, field: 'name' | 'amount', value: string) => {
        if (list === 'assets') {
            setAssets(assets.map(a => a.id === id ? { ...a, [field]: value } : a));
        } else {
            setLiabilities(liabilities.map(l => l.id === id ? { ...l, [field]: value } : l));
        }
    };

    const calculate = () => {
        const totalAssets = assets.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
        const totalLiabilities = liabilities.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);

        setResult({
            totalAssets,
            totalLiabilities,
            netWorth: totalAssets - totalLiabilities
        });
    };

    return (
        <div className="max-w-5xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-emerald-900 flex items-center justify-center font-serif">
                    <span className="mr-3">💎</span> Net Worth Calculator
                </h1>
                <p className="text-emerald-700 text-lg max-w-2xl mx-auto">
                    Track your true wealth. Enter your assets (what you own) and liabilities (what you owe) to calculate your net worth.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Assets */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100 h-full">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold border-b-2 border-emerald-500 pb-2 inline-block text-emerald-900">Assets (+)</h2>
                        <button onClick={addAsset} className="text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-lg px-3 py-1 font-bold text-sm transition-colors">+ Add Asset</button>
                    </div>
                    <div className="space-y-3">
                        {assets.map((asset) => (
                            <div key={asset.id} className="flex gap-2 items-center">
                                <input
                                    type="text" value={asset.name} onChange={e => updateItem('assets', asset.id, 'name', e.target.value)}
                                    className="w-1/2 rounded-lg border-zinc-200 p-2 text-sm focus:border-emerald-500 bg-zinc-50" placeholder="Asset Name"
                                />
                                <div className="relative w-1/2">
                                    <span className="absolute left-3 top-2 text-zinc-400">$</span>
                                    <input
                                        type="number" step="any" min="0" value={asset.amount} onChange={e => updateItem('assets', asset.id, 'amount', e.target.value)}
                                        className="w-full rounded-lg border-zinc-200 p-2 pl-7 text-sm focus:border-emerald-500 font-mono font-bold"
                                    />
                                </div>
                                <button onClick={() => removeAsset(asset.id)} className="text-rose-400 hover:text-rose-600 p-1">✕</button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Liabilities */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-rose-100 h-full">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold border-b-2 border-rose-500 pb-2 inline-block text-rose-900">Liabilities (-)</h2>
                        <button onClick={addLiability} className="text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg px-3 py-1 font-bold text-sm transition-colors">+ Add Debt</button>
                    </div>
                    <div className="space-y-3">
                        {liabilities.map((liability) => (
                            <div key={liability.id} className="flex gap-2 items-center">
                                <input
                                    type="text" value={liability.name} onChange={e => updateItem('liabilities', liability.id, 'name', e.target.value)}
                                    className="w-1/2 rounded-lg border-zinc-200 p-2 text-sm focus:border-rose-500 bg-zinc-50" placeholder="Debt Name"
                                />
                                <div className="relative w-1/2">
                                    <span className="absolute left-3 top-2 text-zinc-400">$</span>
                                    <input
                                        type="number" step="any" min="0" value={liability.amount} onChange={e => updateItem('liabilities', liability.id, 'amount', e.target.value)}
                                        className="w-full rounded-lg border-zinc-200 p-2 pl-7 text-sm focus:border-rose-500 font-mono font-bold"
                                    />
                                </div>
                                <button onClick={() => removeLiability(liability.id)} className="text-rose-400 hover:text-rose-600 p-1">✕</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex justify-center mb-10">
                <button
                    onClick={calculate}
                    className="w-full max-w-md bg-zinc-900 hover:bg-black text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-xl uppercase tracking-widest text-lg"
                >
                    Calculate Net Worth
                </button>
            </div>

            {result !== null && (
                <div className={`rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center border ${result.netWorth >= 0 ? 'bg-emerald-950 border-emerald-800' : 'bg-rose-950 border-rose-800'}`}>
                    <div className={`absolute top-0 right-0 w-64 h-64 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none ${result.netWorth >= 0 ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>

                    <h2 className="text-white/60 font-bold uppercase tracking-widest text-xs mb-8 z-10 text-center">Your Total Net Worth</h2>

                    <div className="z-10 relative mb-10 w-full max-w-lg">
                        <div className={`p-8 rounded-3xl border text-center shadow-inner ${result.netWorth >= 0 ? 'bg-emerald-900/40 border-emerald-500/30' : 'bg-rose-900/40 border-rose-500/30'}`}>
                            <div className={`font-mono font-black text-6xl md:text-7xl break-all drop-shadow-lg ${result.netWorth >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                                ${result.netWorth.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl z-10">
                        <div className="bg-black/30 p-4 rounded-xl border border-white/5 flex justify-between items-center">
                            <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest">Total Assets</span>
                            <span className="font-mono text-emerald-100 font-bold text-xl">${result.totalAssets.toLocaleString()}</span>
                        </div>
                        <div className="bg-black/30 p-4 rounded-xl border border-white/5 flex justify-between items-center">
                            <span className="text-rose-400 text-xs font-bold uppercase tracking-widest">Total Liabilities</span>
                            <span className="font-mono text-rose-100 font-bold text-xl">${result.totalLiabilities.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            )}

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Net Worth Calculator", "operatingSystem": "All", "applicationCategory": "FinancialApplication" }) }} />

            <div className="mt-8">
                <CalculatorSEO
                    title="Net Worth Calculator"
                    whatIsIt={
                        <>
                            <p>Our <strong>Net Worth Calculator</strong> provides an immediate, high-level snapshot of your overall financial health. Your net worth is arguably the most important metric in personal finance—far more important than your salary. It is the exact measure of all the wealth you have actually retained.</p>
                            <p>It explicitly forces you to balance your <strong>Assets</strong> (everything you tangibly own, like cash, investments, and property equity) against your <strong>Liabilities</strong> (everything you owe, like mortgages, student loans, and credit card debt).</p>
                        </>
                    }
                    formula={
                        <>
                            <p>The mathematical equation for calculating your Net Worth is elegantly simple and forms the foundation of modern accounting.</p>
                            <div className="bg-zinc-100 p-4 rounded-lg font-mono text-center text-[15px] shadow-sm my-4 flex flex-col gap-2 border border-zinc-200 text-zinc-900">
                                <p><strong>Net Worth</strong> = Total Assets - Total Liabilities</p>
                            </div>
                        </>
                    }
                    example={
                        <>
                            <p>Let's map out a standard financial scenario for a middle-class homeowner.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4 text-zinc-700">
                                <li><strong>Step 1 (Sum Assets):</strong> You have $5,000 in Checking, $20,000 in your 401(k), and your house is currently appraised at $400,000. <em>Total Assets = $425,000.</em></li>
                                <li><strong>Step 2 (Sum Liabilities):</strong> You still owe $320,000 on your mortgage, you have a $15,000 auto loan, and $2,000 in credit card debt. <em>Total Liabilities = $337,000.</em></li>
                                <li><strong>Step 3 (Calculate):</strong> $425,000 - $337,000 = $88,000.</li>
                                <li><strong>Result:</strong> Your true financial Net Worth is exactly <strong>$88,000</strong>.</li>
                            </ul>
                        </>
                    }
                    useCases={
                        <ul className="list-disc pl-6 space-y-4 text-zinc-700">
                            <li><strong>Financial Independence (FIRE):</strong> Tracking your net worth month-over-month to map your trajectory toward early retirement. When your net worth reaches 25x your annual expenses, you are mathematically financially independent.</li>
                            <li><strong>Mortgage Applications:</strong> Banks will aggressively scrutinize your net worth to determine if you have the liquidity and financial discipline required to take on a massive new liability like a mortgage.</li>
                            <li><strong>Debt Snowball Strategy:</strong> Watching your net worth increase purely by paying down debt. Every time you pay off $1,000 of student loans, your net worth instantly increases by $1,000, even if your bank account balance drops.</li>
                        </ul>
                    }
                    faqs={[
                        {
                            question: "Is it normal to have a negative Net Worth?",
                            answer: "Yes, it is incredibly common for recent college graduates. Due to massive student loans and auto loans paired with low starting salaries, many people start their careers at 'Negative Net Worth'. The goal is usually to race back to '$0' as fast as possible."
                        },
                        {
                            question: "Should I include my car as an asset?",
                            answer: "Yes, but be careful. Cars are depreciating assets. You should only list the realistic Kelley Blue Book 'trade-in' value of the car as an Asset, and then you must list the exact remaining balance of your auto loan under Liabilities."
                        },
                        {
                            question: "Does my income or salary affect my Net Worth?",
                            answer: "Directly? No. You could make $500,000 a year, but if you spend $500,000 a year, your net worth will never grow. Income is just the shovel; Net Worth is the size of the hole you actually dug."
                        }
                    ]}
                    relatedCalculators={[
                        { name: "Investment Calculator", path: "/investment-calculator", desc: "Project the future value of your stock portfolio." },
                        { name: "Debt Payoff Calculator", path: "/debt-payoff-calculator", desc: "Calculate the fastest way to become debt-free." },
                        { name: "Savings Goal Calculator", path: "/savings-goal-calculator", desc: "Figure out exactly how much you need to save each month." }
                    ]}
                />
            </div>
        </div>
    );
}
