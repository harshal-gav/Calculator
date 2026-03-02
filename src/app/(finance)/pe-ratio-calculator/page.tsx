'use client';

import { useState } from 'react';
import CalculatorSEO from '@/components/CalculatorSEO';

export default function PERatioCalculator() {
    const [calcType, setCalcType] = useState('pe'); // pe, price, eps

    // Values
    const [peRatio, setPeRatio] = useState('15');
    const [stockPrice, setStockPrice] = useState('150');
    const [eps, setEps] = useState('10');

    const [result, setResult] = useState<{
        value: number;
        variable: string;
        evalMsg: string;
    } | null>(null);

    const evaluatePE = (pe: number) => {
        if (pe < 0) return "Negative P/E: The company is losing money.";
        if (pe === 0) return "No Earnings: P/E is undefined or 0.";
        if (pe < 10) return "Low P/E: Stock might be undervalued, or the market expects earnings to decline.";
        if (pe >= 10 && pe <= 20) return "Average P/E: Typically in line with historical market averages.";
        if (pe > 20 && pe <= 30) return "High P/E: Stock might be overvalued, or investors expect high growth rates.";
        return "Very High P/E: High expectations for future growth, or potentially a bubble.";
    };

    const calculate = () => {
        const pe = parseFloat(peRatio);
        const price = parseFloat(stockPrice);
        const e = parseFloat(eps);

        let resVal = 0;
        let varName = '';
        let msg = '';

        if (calcType === 'pe') {
            if (isNaN(price) || isNaN(e) || e === 0) { setResult(null); return; }
            resVal = price / e;
            varName = 'P/E Ratio';
            msg = evaluatePE(resVal);
        } else if (calcType === 'price') {
            if (isNaN(pe) || isNaN(e)) { setResult(null); return; }
            resVal = pe * e;
            varName = 'Stock Price';
        } else if (calcType === 'eps') {
            if (isNaN(pe) || isNaN(price) || pe === 0) { setResult(null); return; }
            resVal = price / pe;
            varName = 'Earnings Per Share (EPS)';
        }

        setResult({
            value: resVal,
            variable: varName,
            evalMsg: msg
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-sky-900 flex items-center justify-center font-serif">
                    <span className="mr-3">📈</span> P/E Ratio Calculator
                </h1>
                <p className="text-sky-700 text-lg max-w-2xl mx-auto">
                    Evaluate stock valuations. Calculate the Price-to-Earnings Ratio, Stock Price, or Earnings Per Share (EPS).
                </p>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-zinc-200 mb-8 max-w-3xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8">

                    {/* Controls */}
                    <div className="md:col-span-2 space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wide">Solve For</label>
                            <select
                                value={calcType}
                                onChange={(e) => {
                                    setCalcType(e.target.value);
                                    setResult(null);
                                }}
                                className="w-full rounded-xl border-zinc-300 p-3 shadow-sm focus:border-sky-500 bg-sky-50 font-bold text-sky-900 cursor-pointer"
                            >
                                <option value="pe">P/E Ratio</option>
                                <option value="price">Stock Price</option>
                                <option value="eps">Earnings Per Share (EPS)</option>
                            </select>
                        </div>

                        <div>
                            <button
                                onClick={calculate}
                                className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-sky-600/30 uppercase tracking-widest"
                            >
                                Calculate
                            </button>
                        </div>
                    </div>

                    {/* Inputs */}
                    <div className="md:col-span-3 space-y-5 bg-zinc-50 p-6 rounded-xl border border-zinc-200">
                        {calcType !== 'pe' && (
                            <div>
                                <label className="block text-xs font-bold text-zinc-500 mb-1 uppercase tracking-widest">P/E Ratio</label>
                                <input
                                    type="number" step="any" value={peRatio} onChange={(e) => setPeRatio(e.target.value)}
                                    className="w-full rounded-xl border-zinc-300 shadow-sm p-3 border focus:border-sky-500 font-bold font-mono"
                                />
                            </div>
                        )}
                        {calcType !== 'price' && (
                            <div>
                                <label className="block text-xs font-bold text-zinc-500 mb-1 uppercase tracking-widest">Stock Price</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-3 text-zinc-400 font-bold">$</span>
                                    <input
                                        type="number" step="any" min="0" value={stockPrice} onChange={(e) => setStockPrice(e.target.value)}
                                        className="w-full rounded-xl border-zinc-300 shadow-sm p-3 pl-8 border focus:border-sky-500 font-bold font-mono"
                                    />
                                </div>
                            </div>
                        )}
                        {calcType !== 'eps' && (
                            <div>
                                <label className="block text-xs font-bold text-zinc-500 mb-1 uppercase tracking-widest">Earnings Per Share (EPS)</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-3 text-zinc-400 font-bold">$</span>
                                    <input
                                        type="number" step="any" value={eps} onChange={(e) => setEps(e.target.value)}
                                        className="w-full rounded-xl border-zinc-300 shadow-sm p-3 pl-8 border focus:border-sky-500 font-bold font-mono"
                                        onKeyDown={(e) => e.key === 'Enter' && calculate()}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>

            {result !== null && (
                <div className="bg-sky-950 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

                    <h2 className="text-sky-300 font-bold uppercase tracking-widest text-xs mb-6 z-10 text-center">Calculated {result.variable}</h2>

                    <div className="z-10 relative mb-8 w-full max-w-sm">
                        <div className="p-8 rounded-full aspect-square border-4 bg-sky-900/40 border-sky-400/30 shadow-inner flex flex-col items-center justify-center">
                            <span className="text-white/60 text-xs uppercase tracking-widest mb-2 font-bold block text-center border-b border-sky-800 pb-2 w-3/4">Result</span>
                            <div className="font-bold text-4xl md:text-5xl text-sky-400 text-center drop-shadow-lg leading-tight font-mono break-all pt-2">
                                {calcType !== 'pe' ? '$' : ''}{result.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
                            </div>
                        </div>
                    </div>

                    {calcType === 'pe' && result.evalMsg && (
                        <div className="z-10 bg-black/40 border border-sky-500/30 p-5 rounded-xl text-center w-full max-w-xl">
                            <span className="text-sky-400 text-[10px] font-bold uppercase tracking-widest mb-1 block">Valuation Analysis</span>
                            <p className="text-sky-100/90 text-sm font-medium">{result.evalMsg}</p>
                        </div>
                    )}
                </div>
            )}

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "P/E Ratio Calculator", "operatingSystem": "All", "applicationCategory": "FinancialApplication" }) }} />

            <div className="mt-8">
                <CalculatorSEO
                    title="Price-to-Earnings (P/E) Ratio Calculator"
                    whatIsIt={
                        <>
                            <p>Our <strong>P/E Ratio Calculator</strong> helps investors determine if a stock is overvalued, undervalued, or priced correctly compared to its peers. The Price-to-Earnings ratio is the most famous, universally used valuation metric on Wall Street. It explicitly tells you exactly how much money investors are currently willing to pay for just $1 of a company's earnings.</p>
                            <p>For example, if a stock has a P/E of 20, it means investors are willing to pay $20 today for every $1 of profit the company makes. Value investors use the P/E ratio to hunt for "cheap" stocks that have been unfairly beaten down by the market, while growth investors use it to justify paying a premium for a company they believe will disrupt an industry.</p>
                        </>
                    }
                    formula={
                        <>
                            <p>The P/E ratio is calculated by taking the current stock price and dividing it by the company's Earnings Per Share (EPS).</p>
                            <div className="bg-zinc-100 p-4 rounded-lg font-mono text-center text-[15px] shadow-sm my-4 flex flex-col gap-2 border border-zinc-200 text-zinc-900">
                                <p><strong>P/E Ratio</strong> = Stock Price / Earnings Per Share</p>
                            </div>
                            <p>Our tool can also seamlessly solve for the other variables algebraically: <em>Price = P/E × EPS</em> or <em>EPS = Price / P/E</em>.</p>
                        </>
                    }
                    example={
                        <>
                            <p>Let's evaluate a hypothetical technology stock.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4 text-zinc-700">
                                <li><strong>Variables:</strong> The company's stock is currently trading at <strong>$150.00</strong> per share. Over the last 12 months, the company has officially reported earning <strong>$10.00 per share (EPS)</strong>.</li>
                                <li><strong>The Math:</strong> $150.00 / $10.00 = 15.</li>
                                <li><strong>Result:</strong> The stock has perfectly average <strong>15 P/E Ratio</strong>.</li>
                                <li><strong>Context:</strong> If the historical average for the overall stock market is around 16, this stock is technically trading at a slight discount to the broader market. The company is generating solid profits relative to its price tag.</li>
                            </ul>
                        </>
                    }
                    useCases={
                        <ul className="list-disc pl-6 space-y-4 text-zinc-700">
                            <li><strong>Relative Valuation:</strong> Directly comparing two companies in the exact same industry. If Ford and General Motors make similar cars, but Ford trades at a P/E of 8 and GM trades at a P/E of 12, a value investor might argue Ford is currently the cheaper, better buy.</li>
                            <li><strong>Identifying Bubbles:</strong> Looking at historical averages. If a sector of the economy suddenly begins trading at astronomical P/E ratios of 100 or higher (which happened frequently during the Dot-com Bubble), it is often a severe warning sign that the stock prices have become entirely disconnected from reality.</li>
                            <li><strong>Reverse Engineering Growth Constraints:</strong> Re-arranging the formula. If an investor firmly believes a company has a fair-value P/E of exactly 20, and the company projects an EPS of $5 next year, the investor can confidently calculate that the stock's future fair value "target price" is exactly $100 (20 × $5).</li>
                        </ul>
                    }
                    faqs={[
                        {
                            question: "Is a high P/E ratio good or bad?",
                            answer: "It depends entirely on the context. A high P/E (like 50 or 100) means the stock is mathematically very 'expensive'. Value investors hate high P/E stocks. However, growth investors love them, arguing that highly disruptive companies (like Amazon in the early 2010s) deserve massive P/E ratios because their future earnings will explode, eventually justifying the current high price."
                        },
                        {
                            question: "Can a company have a negative P/E?",
                            answer: "Yes, mechanically. If a company is actively losing money (negative EPS), the math will result in a negative P/E. However, in professional finance, negative P/Es are simply reported as 'N/A' (Not Applicable) because the metric loses all practical meaning when there are literally no earnings to compare the price against."
                        },
                        {
                            question: "What is Forward P/E vs Trailing P/E?",
                            answer: "'Trailing' P/E is calculated using the hard, locked-in earnings from the past 12 months. It relies on historical facts. 'Forward' P/E is calculated using the estimated, projected earnings for the next 12 months. It relies on Wall Street analysts making accurate predictions about the future."
                        }
                    ]}
                    relatedCalculators={[
                        { name: "Dividend Yield Calculator", path: "/dividend-yield-calculator", desc: "Evaluate the cash return on a stock." },
                        { name: "Investment Calculator", path: "/investment-calculator", desc: "Project the compounding growth of your stock portfolio." },
                        { name: "ROI Calculator", path: "/roi-calculator", desc: "Calculate your exact percentage return on a stock trade." }
                    ]}
                />
            </div>
        </div>
    );
}
