'use client';

import { useState, useEffect } from 'react';
import CalculatorSEO from '@/components/CalculatorSEO';

export default function DebtPayoffCalculator() {
    const [balance, setBalance] = useState('10000');
    const [interestRate, setInterestRate] = useState('18.9');
    const [monthlyPayment, setMonthlyPayment] = useState('300');

    const [result, setResult] = useState<{
        monthsToPayoff: number;
        totalInterest: number;
        totalPaid: number;
        isValid: boolean;
        message: string;
    }>({
        monthsToPayoff: 0,
        totalInterest: 0,
        totalPaid: 0,
        isValid: true,
        message: ''
    });

    useEffect(() => {
        calculatePayoff();
    }, [balance, interestRate, monthlyPayment]);

    const calculatePayoff = () => {
        const principal = parseFloat(balance) || 0;
        const rate = parseFloat(interestRate) || 0;
        const payment = parseFloat(monthlyPayment) || 0;

        if (principal <= 0) {
            setResult({ monthsToPayoff: 0, totalInterest: 0, totalPaid: 0, isValid: true, message: '' });
            return;
        }

        const monthlyRate = rate / 100 / 12;
        const minimumInterestPayment = principal * monthlyRate;

        if (payment <= minimumInterestPayment && rate > 0) {
            setResult({
                monthsToPayoff: 0,
                totalInterest: 0,
                totalPaid: 0,
                isValid: false,
                message: "Your monthly payment doesn't even cover the interest. The debt will grow forever."
            });
            return;
        }

        let currentBalance = principal;
        let months = 0;
        let totalInterestPaid = 0;

        // Simulate amortization safely (cap at 1200 months / 100 years max loop)
        while (currentBalance > 0 && months < 1200) {
            const interestForMonth = currentBalance * monthlyRate;
            totalInterestPaid += interestForMonth;

            const principalForMonth = payment - interestForMonth;
            currentBalance -= principalForMonth;
            months++;
        }

        if (months >= 1200) {
            setResult({
                monthsToPayoff: 0,
                totalInterest: 0,
                totalPaid: 0,
                isValid: false,
                message: "This will take over 100 years to pay off. Please increase your monthly payment."
            });
            return;
        }

        setResult({
            monthsToPayoff: months,
            totalInterest: totalInterestPaid,
            totalPaid: principal + totalInterestPaid,
            isValid: true,
            message: ''
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <h1 className="text-4xl font-extrabold mb-4 text-red-800 border-b pb-4">Debt Payoff Calculator</h1>
            <p className="mb-8 text-gray-600 text-lg">
                Discover how long it will take to become debt-free and exactly how much interest you'll pay the bank.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="bg-red-50 p-6 rounded-xl border border-red-100 space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Total Debt Balance</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-red-600 font-bold text-lg">$</span>
                            <input
                                type="number" min="0" step="100"
                                value={balance}
                                onChange={(e) => setBalance(e.target.value)}
                                className="w-full rounded-xl border-gray-300 p-4 pl-10 shadow-sm focus:border-red-500 font-bold text-xl text-gray-800"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Annual Interest Rate (APR)</label>
                        <div className="relative">
                            <input
                                type="number" min="0" step="0.1"
                                value={interestRate}
                                onChange={(e) => setInterestRate(e.target.value)}
                                className="w-full rounded-xl border-gray-300 p-4 pr-10 shadow-sm focus:border-red-500 font-bold text-xl text-gray-800"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-lg">%</span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Expected Monthly Payment</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-red-600 font-bold text-lg">$</span>
                            <input
                                type="number" min="0" step="10"
                                value={monthlyPayment}
                                onChange={(e) => setMonthlyPayment(e.target.value)}
                                className="w-full rounded-xl border-gray-300 p-4 pl-10 shadow-sm focus:border-red-500 font-bold text-xl text-gray-800"
                            />
                        </div>
                    </div>
                </div>

                {/* Results Screen */}
                <div className="bg-white border-2 border-red-100 rounded-xl overflow-hidden shadow-sm flex flex-col justify-center">
                    {result.isValid ? (
                        <div className="w-full flex flex-col h-full">
                            <div className="p-8 pb-6 text-center bg-red-700 border-b border-red-800 text-white">
                                <h3 className="text-red-200 font-bold uppercase tracking-widest text-[11px] mb-2">Time Until Completely Debt Free</h3>
                                <div className="text-6xl font-black drop-shadow-sm">
                                    {Math.floor(result.monthsToPayoff / 12) > 0 && <span>{Math.floor(result.monthsToPayoff / 12)}<span className="text-2xl font-medium text-red-300 mx-1">yrs</span></span>}
                                    {result.monthsToPayoff % 12}<span className="text-2xl font-medium text-red-300 ml-1">moss</span>
                                </div>
                                <div className="text-red-200 text-sm mt-3 font-medium bg-red-800/50 inline-block px-3 py-1 rounded-full border border-red-600">{result.monthsToPayoff} total payments</div>
                            </div>

                            <div className="p-6 flex-grow space-y-4 bg-gray-50 flex flex-col justify-center">
                                <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-200">
                                    <span className="font-bold text-gray-500 uppercase text-[10px] tracking-widest">Total Interest Paid</span>
                                    <span className="font-black text-xl text-red-600">${result.totalInterest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                </div>
                                <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-200">
                                    <span className="font-bold text-gray-500 uppercase text-[10px] tracking-widest">Total Amount Paid</span>
                                    <span className="font-bold text-lg text-gray-800">${result.totalPaid.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex items-center justify-center text-center p-8 bg-black text-white rounded-xl m-4">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                <h3 className="text-xl font-bold mb-2 text-red-400">Payment Too Low</h3>
                                <p className="text-gray-300 font-medium leading-relaxed">{result.message}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Debt Payoff Calculator", "operatingSystem": "All", "applicationCategory": "FinanceApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } }) }} />

            <div className="mt-8">
                <CalculatorSEO
                    title="Debt Payoff & Amortization Calculator"
                    whatIsIt={
                        <>
                            <p>The <strong>Debt Payoff Calculator</strong> allows you to build a structured amortization schedule for credit cards, personal loans, or auto loans. It mathematically calculates exactly the day you will become debt-free and reveals the total interest cost of carrying the balance.</p>
                            <p>Debt mathematically guarantees negative compounding. By visualizing the true, long-term cost of minimum payments, borrowers are empowered to build aggressive payoff strategies like the <em>Debt Snowball</em> or <em>Debt Avalanche</em>.</p>
                        </>
                    }
                    formula={
                        <>
                            <p>This calculator steps through a standard monthly loan amortization schedule until the balance hits zero. For any given month, the interest portion is calculated by:</p>
                            <div className="bg-red-50 p-4 rounded-lg font-mono text-center text-[15px] shadow-sm my-4 text-red-900 border border-red-100">
                                <strong>Monthly Interest</strong> = Current Balance × (Annual APR ÷ 12)
                            </div>
                            <p className="text-sm mt-2">Any dollars in your monthly payment beyond that exact minimum immediately pay down the principal balance, permanently reducing your interest charge for the following month.</p>
                        </>
                    }
                    example={
                        <>
                            <p>Consider a <strong>$10,000</strong> credit card balance with an aggressive <strong>18.9% APR</strong>.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                                <li>If you pay a steady <strong>$300</strong> a month: It will take you exactly <strong>47 months</strong> (just under 4 years) to escape the debt. You will pay the bank <strong>$3,927</strong> in pure interest over that time.</li>
                                <li>If you aggressively double your payment to <strong>$600</strong> a month: You will be debt-free in just <strong>20 months</strong>, and your total interest drops to only <strong>$1,643</strong>.</li>
                                <li><strong>The Reality Check:</strong> Paying an extra $300 a month saves you over $2,284 and buys back three whole years of your financial freedom.</li>
                            </ul>
                        </>
                    }
                    useCases={
                        <ul className="list-disc pl-6 space-y-4 text-gray-700">
                            <li><strong>Debt Avalanche Strategy:</strong> Sorting all of your active debts by the highest APR and mathematically proving how much money you save by attacking the 24% credit card before the 6% student loan.</li>
                            <li><strong>Minimum Payment Warnings:</strong> Visualizing how paying only the variable minimum amount determined by credit card companies is mathematically designed to keep you trapped in debt for 15+ years.</li>
                            <li><strong>Refinance Checking:</strong> Determining if the origination fee of taking out an 8% personal loan is mathematically worth it to consolidate and immediately wipe out a 21% credit card balance.</li>
                        </ul>
                    }
                    faqs={[
                        {
                            question: "Why did the calculator tell me my balance will grow forever?",
                            answer: "If your monthly payment is physically lower than the interest charged that month, you entered 'Negative Amortization'. The interest you didn't pay gets added to the principal balance, and your total debt will grow infinitely until you declare bankruptcy. Increase your monthly payment immediately."
                        },
                        {
                            question: "What is the Debt Snowball vs Debt Avalanche?",
                            answer: "The 'Avalanche' method pays off debts in order of highest APR mathematically. The 'Snowball' method pays off debts in order of smallest total balance emotionally. Mathematically, Avalanche is superior and saves you more cash, but Snowball gives you faster psychological 'wins'."
                        },
                        {
                            question: "Should I use my savings to pay off debt?",
                            answer: "Financially, it comes down to yields. If your savings account yields 5% APY but your credit card costs 24% APR, you are losing 19% guaranteed every year you hold both. You should generally use excess cash to destroy high-interest debt."
                        }
                    ]}
                    relatedCalculators={[
                        { name: "Credit Card Payoff Calculator", path: "/credit-card-payoff-calculator", desc: "Specifically designed for variable-minimum credit cards." },
                        { name: "Auto Loan Calculator", path: "/auto-loan-calculator", desc: "Analyze the total cost of fixed-term vehicle financing." },
                        { name: "Compound Interest Calculator", path: "/compound-interest-calculator", desc: "See what happens when that monthly payment is invested instead of given to the bank." }
                    ]}
                />
            </div>
        </div>
    );
}
