'use client';

import { useState } from 'react';
import CalculatorSEO from '@/components/CalculatorSEO';

export default function PresentValueCalculator() {
    const [futureValue, setFutureValue] = useState('10000');
    const [interestRate, setInterestRate] = useState('5');
    const [years, setYears] = useState('10');
    const [autoFormat, setAutoFormat] = useState(true);

    const [result, setResult] = useState<{
        pv: number;
        discountedAmount: number;
    } | null>(null);

    const calculatePV = () => {
        const fv = parseFloat(futureValue) || 0;
        const r = (parseFloat(interestRate) || 0) / 100;
        const n = parseFloat(years) || 0;

        if (n > 0 || n < 0) { // Time can theoretically be negative for projection mechanics, but standard is positive
            // PV = FV / (1 + r)^n
            const pv = fv / Math.pow(1 + r, n);
            const discounted = fv - pv;

            setResult({
                pv,
                discountedAmount: discounted
            });
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <h1 className="text-4xl font-extrabold mb-4 text-emerald-900 border-b pb-4">Present Value Calculator</h1>
            <p className="mb-8 text-gray-600 text-lg">
                Calculate the current worth of a future sum of money given a specific rate of return.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100 space-y-6 flex flex-col justify-center">
                    <div>
                        <label className="block text-sm font-semibold text-emerald-900 mb-1">Expected Future Value ($)</label>
                        <input type="number" value={futureValue} onChange={(e) => setFutureValue(e.target.value)} className="w-full rounded-lg border-gray-300 p-4 shadow-sm focus:border-emerald-500 font-black text-2xl text-gray-800 tracking-wide" />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Discount Rate / Interest (%)</label>
                        <input type="number" step="0.1" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-emerald-500 font-bold text-lg" />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Number of Periods (Years)</label>
                        <input type="number" step="1" value={years} onChange={(e) => setYears(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-emerald-500 font-bold text-lg" />
                    </div>

                    <button onClick={calculatePV} className="w-full bg-emerald-600 text-white font-black py-4 rounded-xl hover:bg-emerald-700 transition shadow-lg uppercase tracking-widest text-lg">
                        Calculate PV
                    </button>

                    <p className="text-xs text-emerald-700 text-center uppercase font-bold tracking-widest opacity-60">
                        Formula: PV = FV / (1 + r)^n
                    </p>
                </div>

                {/* Results Screen */}
                <div className="bg-white border-2 border-emerald-100 rounded-xl overflow-hidden shadow-sm flex flex-col justify-center p-8">
                    {result !== null ? (
                        <div className="w-full text-center space-y-8">
                            <div>
                                <h3 className="text-emerald-800 font-bold uppercase tracking-widest text-sm mb-2">Required Present Value</h3>
                                <div className="text-5xl lg:text-6xl font-black text-gray-900 tracking-tighter">
                                    ${result.pv.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </div>
                                <p className="text-sm font-medium text-gray-500 mt-4 leading-relaxed px-4">
                                    You must invest <strong className="text-emerald-600">${result.pv.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong> today at exactly a <strong className="text-emerald-600">{interestRate}%</strong> interest rate to reach <strong className="text-gray-900">${parseFloat(futureValue).toLocaleString()}</strong> in {years} years.
                                </p>
                            </div>

                            <div className="h-px border-b border-dashed border-gray-300 w-full"></div>

                            <div className="text-left bg-gray-50 p-4 rounded-lg border border-gray-100 flex justify-between items-center shadow-inner">
                                <h4 className="text-gray-500 font-bold uppercase text-[10px] tracking-wider">Total Investment Return</h4>
                                <p className="text-xl font-black text-green-600">+${result.discountedAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex items-center justify-center text-center text-emerald-400 font-medium p-4">
                            Determine exactly how much you need to invest today to reach a target financial goal in the future.
                        </div>
                    )}
                </div>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Present Value Calculator", "operatingSystem": "All", "applicationCategory": "FinanceApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } }) }} />

            <CalculatorSEO
                title="Present Value Calculator"
                whatIsIt={
                    <>
                        <p>Our <strong>Present Value (PV) Calculator</strong> is a foundational tool in finance used to determine the exact current worth of a future sum of money. Because of inflation and the potential to earn interest, a dollar today is always inherently worth more than a dollar tomorrow. This concept is called the "Time Value of Money."</p>
                        <p>This calculator allows you to work backwards. By inputting your future financial goal, your expected time frame, and a realistic interest rate (discount rate), it calculates the exact lump sum of cash you need to deposit <em>right now</em> to mathematically guarantee you hit that goal.</p>
                    </>
                }
                formula={
                    <>
                        <p>The Present Value formula simply reverses the standard compound interest equation.</p>
                        <div className="bg-emerald-50 p-4 rounded-lg font-mono text-center text-[15px] shadow-sm my-4 flex flex-col gap-2 border border-emerald-100 text-emerald-900">
                            <p><strong>PV</strong> = FV ÷ (1 + r)<sup>n</sup></p>
                            <p className="border-t border-emerald-100 pt-3 mt-2 text-sm font-sans text-left text-gray-700"><strong>Where:</strong><br />FV = Future Value<br />r = Discount Rate / Interest Rate per period<br />n = Number of periods (Years)</p>
                        </div>
                    </>
                }
                example={
                    <>
                        <p>Let's assume you want to have exactly <strong>$100,000</strong> saved for your child's college tuition in exactly <strong>18 years</strong>. You can safely invest money into an index fund that reliably returns <strong>7% annually</strong>.</p>
                        <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                            <li><strong>Step 1 (Variables):</strong> FV = 100,000. r = 0.07. n = 18.</li>
                            <li><strong>Step 2 (The Math):</strong> PV = 100,000 ÷ (1 + 0.07)<sup>18</sup></li>
                            <li><strong>Step 3 (The Exponent):</strong> 1.07<sup>18</sup> = 3.3799</li>
                            <li><strong>Step 4 (Divide):</strong> 100,000 ÷ 3.3799 = <strong>29,586.67</strong>.</li>
                            <li><strong>Result:</strong> Assuming a 7% return, if you invest just <strong>$29,586.67</strong> the day your child is born, it will naturally compound into $100,000 by their 18th birthday.</li>
                        </ul>
                    </>
                }
                useCases={
                    <ul className="list-disc pl-6 space-y-4 text-gray-700">
                        <li><strong>Retirement Benchmarking:</strong> Working backwards from a goal of $2,000,000 to figure out exactly what your current brokerage account balance needs to be right now so that you don't have to save another dime.</li>
                        <li><strong>Evaluating Lottery Winnings:</strong> Deciding mathematically whether to take a $500,000 lump sum today, or an annuity that pays out $1,000,000 spread over 30 years. (Hint: Depending on the discount rate, the lump sum is almost always better).</li>
                        <li><strong>Business Acquisitions:</strong> Corporations use Present Value to determine exactly how much cash to offer to buyout a competitor today, based on the competitor's projected future cash flows.</li>
                    </ul>
                }
                faqs={[
                    {
                        question: "What is a 'Discount Rate'?",
                        answer: "In Present Value calculations, the 'Discount Rate' is functionally identical to an interest rate or return rate. It is the percentage rate used to discount the future cash flow back to its current value. Higher risk investments demand a higher discount rate."
                    },
                    {
                        question: "Why is taking money today better than taking the same amount tomorrow?",
                        answer: "This is the core of the 'Time Value of Money'. If someone hands you $100 today, you can instantly put it in a 5% Savings Account. In one year, you have $105. If you let them wait a year to hand you that $100, you have permanently lost the opportunity to earn that $5."
                    },
                    {
                        question: "How does inflation affect Present Value?",
                        answer: "Inflation actively decreases the purchasing power of money over time. If you use the expected inflation rate (e.g., 3%) as your Discount Rate, the Present Value calculator will show you exactly how much your future money is worth in today's purchasing power."
                    }
                ]}
                relatedCalculators={[
                    { name: "Investment Calculator", path: "/investment-calculator", desc: "A broader tool for projecting overall stock portfolio growth." },
                    { name: "Compound Interest Calculator", path: "/compound-interest-calculator", desc: "Project future investment growth using recursive compound interest." },
                    { name: "ROI Calculator", path: "/roi-calculator", desc: "Calculate your exact annualized percentage returns on recent sales." }
                ]}
            />
        </div>
    );
}
