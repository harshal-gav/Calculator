'use client';

import { useState } from 'react';
import CalculatorSEO from '@/components/CalculatorSEO';
export default function CreditCardPayoffCalculator() {
    const [balance, setBalance] = useState('5000');
    const [interestRate, setInterestRate] = useState('18.99');

    // modes: "fixedPayment" or "fixedTime"
    const [mode, setMode] = useState('fixedPayment');

    // Fixed Payment variables
    const [monthlyPayment, setMonthlyPayment] = useState('250');

    // Fixed Time variables
    const [monthsToPayoff, setMonthsToPayoff] = useState('24');

    // Results
    const [resultMonths, setResultMonths] = useState<number | null>(null);
    const [resultPayment, setResultPayment] = useState<number | null>(null);
    const [totalInterest, setTotalInterest] = useState<number | null>(null);

    const calculatePayoff = () => {
        const b = parseFloat(balance) || 0;
        const r = parseFloat(interestRate) || 0;

        if (b <= 0) return;

        const monthlyRate = r / 100 / 12;

        if (mode === 'fixedPayment') {
            const p = parseFloat(monthlyPayment) || 0;

            // Check if payment is too small to cover interest
            if (p <= b * monthlyRate) {
                alert('Your monthly payment must be greater than the monthly interest charge to pay off the balance.');
                return;
            }

            // N = -(ln(1 - (B * r) / P)) / ln(1 + r)
            const numerator = Math.log(1 - (b * monthlyRate) / p);
            const denominator = Math.log(1 + monthlyRate);
            const n = -(numerator / denominator);

            const totalMonths = Math.ceil(n);
            const totalPaid = p * totalMonths;
            const interest = totalPaid - b;

            setResultMonths(totalMonths);
            setResultPayment(p);
            setTotalInterest(interest);

        } else {
            const m = parseInt(monthsToPayoff, 10) || 0;
            if (m <= 0) return;

            // P = B * (r * (1 + r)^n) / ((1 + r)^n - 1)
            let p = 0;
            if (r === 0) {
                p = b / m;
            } else {
                p = b * (monthlyRate * Math.pow(1 + monthlyRate, m)) / (Math.pow(1 + monthlyRate, m) - 1);
            }

            const totalPaid = p * m;
            const interest = totalPaid - b;

            setResultMonths(m);
            setResultPayment(p);
            setTotalInterest(interest);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-slate-50 rounded-2xl shadow-xl border border-slate-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-indigo-900 flex items-center justify-center">
                    <span className="mr-3">💳</span> Credit Card Payoff
                </h1>
                <p className="text-indigo-700 text-lg max-w-2xl mx-auto">
                    Determine how long it takes to pay off your balance, or find out exactly how much to pay extra to become debt-free by a specific date.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

                {/* Inputs */}
                <div className="lg:col-span-3 space-y-6 bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm relative">
                    <div className="absolute top-0 left-0 w-2 h-full bg-indigo-500 rounded-l-2xl"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">Current Balance</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 font-bold text-xl">$</span>
                                <input
                                    type="number" step="100" min="0"
                                    value={balance}
                                    onChange={(e) => setBalance(e.target.value)}
                                    className="w-full rounded-xl border-slate-300 pl-10 p-4 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all font-bold text-2xl text-slate-800"
                                />
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">Interest Rate (APR)</label>
                            <div className="relative">
                                <input
                                    type="number" step="0.1" min="0" max="99"
                                    value={interestRate}
                                    onChange={(e) => setInterestRate(e.target.value)}
                                    className="w-full rounded-xl border-slate-300 p-4 shadow-sm focus:border-indigo-500 font-bold text-xl text-slate-800"
                                />
                                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 font-bold text-xl">%</span>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 mt-2 border-t border-slate-100">
                        <div className="flex space-x-2 mb-6 p-1 bg-slate-100 rounded-xl">
                            <button
                                onClick={() => setMode('fixedPayment')}
                                className={`flex-1 py-3 px-4 rounded-lg text-sm font-bold transition-all ${mode === 'fixedPayment' ? 'bg-white shadow-sm text-indigo-700' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                I know my Monthly Payment
                            </button>
                            <button
                                onClick={() => setMode('fixedTime')}
                                className={`flex-1 py-3 px-4 rounded-lg text-sm font-bold transition-all ${mode === 'fixedTime' ? 'bg-white shadow-sm text-indigo-700' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                I want an Exact Payoff Date
                            </button>
                        </div>

                        {mode === 'fixedPayment' ? (
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">Planned Monthly Payment</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-500 font-bold">$</span>
                                    <input
                                        type="number" step="10" min="0"
                                        value={monthlyPayment}
                                        onChange={(e) => setMonthlyPayment(e.target.value)}
                                        className="w-full rounded-xl border-indigo-200 bg-indigo-50/30 pl-10 p-4 shadow-sm focus:border-indigo-500 font-bold text-xl text-indigo-900"
                                    />
                                </div>
                            </div>
                        ) : (
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">Desired Months to Payoff</label>
                                <div className="relative">
                                    <input
                                        type="number" step="1" min="1" max="120"
                                        value={monthsToPayoff}
                                        onChange={(e) => setMonthsToPayoff(e.target.value)}
                                        className="w-full rounded-xl border-indigo-200 bg-indigo-50/30 p-4 pr-20 shadow-sm focus:border-indigo-500 font-bold text-xl text-indigo-900"
                                    />
                                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-indigo-400 font-bold uppercase text-sm tracking-wider">Months</span>
                                </div>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={calculatePayoff}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-indigo-600/30 uppercase tracking-widest text-sm mt-8"
                    >
                        Calculate Payoff
                    </button>
                </div>

                {/* Dashboard Output */}
                <div className="lg:col-span-2">
                    {resultMonths !== null && resultPayment !== null ? (
                        <div className="h-full bg-indigo-950 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden flex flex-col justify-center text-white border border-indigo-800">
                            {/* Decorative element */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

                            <div className="relative z-10 w-full">
                                {mode === 'fixedPayment' ? (
                                    <>
                                        <h2 className="text-indigo-300 font-bold uppercase tracking-widest text-xs mb-4 text-center">Time to Debt-Free</h2>
                                        <div className="text-center mb-10">
                                            <div className="text-6xl font-black tracking-tight text-white mb-2 drop-shadow-lg">
                                                {resultMonths}
                                            </div>
                                            <div className="text-indigo-400 font-bold text-xl uppercase tracking-widest">
                                                Months
                                            </div>
                                            <div className="text-slate-400 text-sm mt-2">
                                                ({(resultMonths / 12).toFixed(1)} years)
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <h2 className="text-indigo-300 font-bold uppercase tracking-widest text-xs mb-4 text-center">Required Monthly Payment</h2>
                                        <div className="text-center mb-10">
                                            <div className="text-6xl font-black tracking-tight text-white mb-2 drop-shadow-lg flex items-start justify-center">
                                                <span className="text-3xl mt-2 text-indigo-400">$</span>
                                                {resultPayment.toFixed(2)}
                                            </div>
                                            <div className="text-indigo-400 font-bold text-sm uppercase tracking-widest">
                                                Per Month
                                            </div>
                                        </div>
                                    </>
                                )}

                                <div className="space-y-4 w-full pt-6 border-t border-indigo-800/50">
                                    <div className="bg-slate-900/60 p-4 rounded-xl border border-indigo-800/30">
                                        <div className="text-indigo-200 text-xs font-bold uppercase tracking-wider mb-1">Total Interest Paid</div>
                                        <div className="font-bold font-mono text-2xl text-rose-400">
                                            ${(totalInterest || 0).toFixed(2)}
                                        </div>
                                    </div>

                                    <div className="bg-indigo-900/60 p-4 rounded-xl border-2 border-indigo-500/30">
                                        <div className="text-indigo-100 text-xs font-bold uppercase tracking-wider mb-1">Total Principal + Interest</div>
                                        <div className="font-bold font-mono text-xl text-white">
                                            ${((parseFloat(balance) || 0) + (totalInterest || 0)).toFixed(2)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full rounded-2xl border-2 border-dashed border-indigo-200 bg-indigo-50/40 flex flex-col items-center justify-center p-8 text-center text-indigo-600">
                            <span className="text-6xl mb-4 opacity-50 grayscale pt-6">✂️</span>
                            <h3 className="font-bold text-xl mb-2 text-indigo-800">Cut the Plastic</h3>
                            <p className="text-sm font-medium opacity-80">Calculate your payoff strategy to eliminate high-interest debt.</p>
                        </div>
                    )}
                </div>

            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Credit Card Payoff Calculator", "operatingSystem": "All", "applicationCategory": "FinanceApplication" }) }} />

            <CalculatorSEO
                title="Credit Card Payoff Calculator"
                whatIsIt={
                    <>
                        <p>A <strong>Credit Card Payoff Calculator</strong> is an essential personal finance tool designed to help you build a strategy to eliminate high-interest credit card debt. It shows you the math behind your debt repayment.</p>
                        <p>You can use it in two distinct modes: seeing how long it will take to pay off a balance using a fixed monthly payment, or discovering exactly how much you need to pay each month to be completely debt-free by a specific target date.</p>
                    </>
                }
                formula={
                    <>
                        <p>When calculating the required fixed monthly payment (P) to pay off a balance (B) in a specific number of months (n), with an annual interest rate (R), the calculator uses the standard amortization formula:</p>
                        <div className="bg-white p-4 rounded-lg font-mono text-center text-xl shadow-sm my-4 overflow-x-auto">
                            P = B * [ r(1 + r)^n ] / [ (1 + r)^n - 1 ]
                        </div>
                        <ul className="list-disc pl-6 space-y-2 mt-4">
                            <li><strong>P:</strong> Target fixed monthly payment</li>
                            <li><strong>B:</strong> Total current credit card balance</li>
                            <li><strong>r:</strong> Monthly interest rate (APR / 12)</li>
                            <li><strong>n:</strong> Number of months until desired payoff</li>
                        </ul>
                    </>
                }
                example={
                    <>
                        <p>Let’s say you have a <strong>$5,000</strong> balance on a card with a <strong>18.99% APR</strong>.</p>
                        <ul className="list-disc pl-6 space-y-2 mt-4">
                            <li><strong>Scenario A:</strong> You pledge to pay exactly <strong>$250</strong> per month. It will take you exactly <strong>25 months</strong> to pay it off, and you will pay <strong>$1,053.40</strong> in total interest.</li>
                            <li><strong>Scenario B:</strong> You want to be debt-free in exactly <strong>12 months</strong>. You must make a fixed monthly payment of exactly <strong>$460.84</strong>, resulting in only <strong>$530.04</strong> in paid interest.</li>
                        </ul>
                    </>
                }
                useCases={
                    <ul className="list-disc pl-6 space-y-4">
                        <li><strong>Snowball/Avalanche Method Planning:</strong> Figure out the exact numbers needed to aggressively tackle your highest-interest debts first.</li>
                        <li><strong>Avoiding Minimum Payment Traps:</strong> Credit card companies calculate minimum payments to keep you in debt for years; use this calculator to establish a real payoff timeline.</li>
                        <li><strong>Budgeting for Financial Freedom:</strong> Adjust the "Desired Months to Payoff" slider to see how much room you need to make in your monthly budget to hit your debt-free target.</li>
                    </ul>
                }
                faqs={[
                    {
                        question: "Why should I pay more than the minimum?",
                        answer: "Minimum payments are often set to cover the month's interest plus just 1% to 2% of your principal balance. Paying only the minimum on thousands of dollars in debt can literally take decades to pay off, costing you double or triple the original amount in interest alone."
                    },
                    {
                        question: "Does the calculator account for new purchases on the card?",
                        answer: "No, this calculator assumes a fixed starting balance and assumes you will completely stop using the card for new purchases. If you continue adding new charges to the card, your timeline will significantly increase."
                    }
                ]}
                relatedCalculators={[
                    { name: "Debt Payoff Calculator", path: "/debt-payoff-calculator", desc: "Compare Snowball vs Avalanche payoff strategies for multiple debts." },
                    { name: "Amortization Calculator", path: "/amortization-calculator", desc: "Generate full amortization schedules for structured loans." },
                    { name: "Compound Interest Calculator", path: "/compound-interest-calculator", desc: "See how investing that monthly payment instead builds immense wealth." }
                ]}
            />
        </div>
    );
}
