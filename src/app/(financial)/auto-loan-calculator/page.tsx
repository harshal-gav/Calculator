'use client';

import { useState } from 'react';
import CalculatorSEO from '@/components/CalculatorSEO';

export default function AutoLoanCalculator() {
    const [price, setPrice] = useState('25000');
    const [downPayment, setDownPayment] = useState('5000');
    const [tradeIn, setTradeIn] = useState('0');
    const [term, setTerm] = useState('60'); // Months
    const [rate, setRate] = useState('5.5'); // Annual %
    const [salesTaxRate, setSalesTaxRate] = useState('6.25'); // %
    const [fees, setFees] = useState('500');

    // Results
    const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);
    const [totalInterest, setTotalInterest] = useState<number | null>(null);
    const [totalCost, setTotalCost] = useState<number | null>(null);

    const calculateLoan = () => {
        const p = parseFloat(price) || 0;
        const dp = parseFloat(downPayment) || 0;
        const ti = parseFloat(tradeIn) || 0;
        const t = parseFloat(term) || 0;
        const r = parseFloat(rate) || 0;
        const taxRate = parseFloat(salesTaxRate) || 0;
        const f = parseFloat(fees) || 0;

        // Total Tax (usually applied to price after trade-in in many states, we'll assume standard taxable amount = price - tradeIn)
        const taxableAmount = Math.max(0, p - ti);
        const taxAmount = taxableAmount * (taxRate / 100);

        // Principal Amount
        const principal = (p + taxAmount + f) - dp - ti;

        if (principal <= 0) {
            setMonthlyPayment(0);
            setTotalInterest(0);
            setTotalCost(p + taxAmount + f);
            return;
        }

        if (t <= 0) return;

        if (r === 0) {
            const payment = principal / t;
            setMonthlyPayment(payment);
            setTotalInterest(0);
            setTotalCost(p + taxAmount + f);
            return;
        }

        // Standard Amortization Formula
        const monthlyRate = r / 100 / 12;
        const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, t)) / (Math.pow(1 + monthlyRate, t) - 1);

        const totalInt = (payment * t) - principal;

        setMonthlyPayment(payment);
        setTotalInterest(totalInt);
        // Total cost includes everything paid out of pocket: down payment, trade value, total loan payments
        setTotalCost((payment * t) + dp + ti);
    };

    return (
        <div className="max-w-5xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-emerald-900 flex items-center justify-center">
                    <span className="mr-3">🚗</span> Auto Loan Calculator
                </h1>
                <p className="text-emerald-700 text-lg max-w-2xl mx-auto">
                    Estimate your monthly car payments, total interest, and the true cost of your vehicle.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

                {/* Inputs */}
                <div className="lg:col-span-3 space-y-6 bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm relative">
                    <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500 rounded-l-2xl"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-xs font-bold text-emerald-800 mb-2 uppercase tracking-wide">Car Price</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-500 font-bold">$</span>
                                <input
                                    type="number" step="100" min="0"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    className="w-full rounded-xl border-zinc-300 pl-8 p-4 shadow-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all font-bold text-lg"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-emerald-800 mb-2 uppercase tracking-wide">Down Payment</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-500 font-bold">$</span>
                                <input
                                    type="number" step="100" min="0"
                                    value={downPayment}
                                    onChange={(e) => setDownPayment(e.target.value)}
                                    className="w-full rounded-xl border-zinc-300 pl-8 p-3 shadow-sm focus:border-emerald-500 font-bold"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-emerald-800 mb-2 uppercase tracking-wide">Trade-in Value</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-500 font-bold">$</span>
                                <input
                                    type="number" step="100" min="0"
                                    value={tradeIn}
                                    onChange={(e) => setTradeIn(e.target.value)}
                                    className="w-full rounded-xl border-zinc-300 pl-8 p-3 shadow-sm focus:border-emerald-500 font-bold"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-emerald-800 mb-2 uppercase tracking-wide">Term (Months)</label>
                            <select
                                value={term}
                                onChange={(e) => setTerm(e.target.value)}
                                className="w-full rounded-xl border-zinc-300 p-3 shadow-sm focus:border-emerald-500 font-bold bg-white"
                            >
                                <option value="12">12 Months (1 yr)</option>
                                <option value="24">24 Months (2 yrs)</option>
                                <option value="36">36 Months (3 yrs)</option>
                                <option value="48">48 Months (4 yrs)</option>
                                <option value="60">60 Months (5 yrs)</option>
                                <option value="72">72 Months (6 yrs)</option>
                                <option value="84">84 Months (7 yrs)</option>
                                <option value="96">96 Months (8 yrs)</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-emerald-800 mb-2 uppercase tracking-wide">Interest Rate</label>
                            <div className="relative">
                                <input
                                    type="number" step="0.1" min="0" max="30"
                                    value={rate}
                                    onChange={(e) => setRate(e.target.value)}
                                    className="w-full rounded-xl border-zinc-300 p-3 shadow-sm focus:border-emerald-500 font-bold"
                                />
                                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-zinc-500 font-bold">%</span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-emerald-800 mb-2 uppercase tracking-wide">Sales Tax Rate</label>
                            <div className="relative">
                                <input
                                    type="number" step="0.1" min="0" max="25"
                                    value={salesTaxRate}
                                    onChange={(e) => setSalesTaxRate(e.target.value)}
                                    className="w-full rounded-xl border-zinc-300 p-3 shadow-sm focus:border-emerald-500 font-bold"
                                />
                                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-zinc-500 font-bold">%</span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-emerald-800 mb-2 uppercase tracking-wide">Dealer/Reg Fees</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-500 font-bold">$</span>
                                <input
                                    type="number" step="50" min="0"
                                    value={fees}
                                    onChange={(e) => setFees(e.target.value)}
                                    className="w-full rounded-xl border-zinc-300 pl-8 p-3 shadow-sm focus:border-emerald-500 font-bold"
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={calculateLoan}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-emerald-600/30 uppercase tracking-widest text-sm mt-4"
                    >
                        Calculate Payments
                    </button>
                </div>

                {/* Dashboard Output */}
                <div className="lg:col-span-2">
                    {monthlyPayment !== null ? (
                        <div className="h-full bg-emerald-950 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center text-white border border-emerald-800">
                            {/* Decorative element */}
                            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500 rounded-full mix-blend-screen filter blur-[60px] opacity-20 pointer-events-none"></div>

                            <div className="relative z-10 w-full text-center">
                                <h2 className="text-emerald-300 font-bold uppercase tracking-widest text-xs mb-4">Estimated Monthly Payment</h2>

                                <div className="text-5xl lg:text-6xl font-black tracking-tight text-white mb-2 drop-shadow-lg">
                                    ${monthlyPayment.toFixed(2)}
                                </div>
                                <p className="text-emerald-400 text-sm font-semibold mb-8">for {term} months</p>

                                <div className="space-y-4 w-full pt-6 border-t border-emerald-800/50 text-left">
                                    <div className="flex justify-between items-center bg-emerald-900/50 p-3 rounded-lg border border-emerald-800/30">
                                        <span className="text-emerald-200 text-sm font-medium">Principal Amount</span>
                                        <span className="font-bold font-mono text-zinc-100">${((parseFloat(price) || 0) + ((parseFloat(price) || 0) - (parseFloat(tradeIn) || 0)) * ((parseFloat(salesTaxRate) || 0) / 100) + (parseFloat(fees) || 0) - (parseFloat(downPayment) || 0) - (parseFloat(tradeIn) || 0)).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center bg-emerald-900/50 p-3 rounded-lg border border-emerald-800/30">
                                        <span className="text-emerald-200 text-sm font-medium">Total Interest</span>
                                        <span className="font-bold font-mono text-rose-400">${(totalInterest || 0).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center bg-emerald-800/50 p-4 rounded-lg border-2 border-emerald-600/30 shadow-inner">
                                        <span className="text-emerald-100 font-bold uppercase tracking-wider text-xs">Total Cost (incl. car)</span>
                                        <span className="font-bold font-mono text-xl text-white">${(totalCost || 0).toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full rounded-2xl border-2 border-dashed border-emerald-200 bg-emerald-50/50 flex flex-col items-center justify-center p-8 text-center text-emerald-600">
                            <span className="text-6xl mb-4 opacity-70">🔑</span>
                            <h3 className="font-bold text-lg mb-2 text-emerald-800">Ready to Calculate</h3>
                            <p className="text-sm font-medium opacity-80">Enter your loan details and click calculate to view your prospective monthly payment.</p>
                        </div>
                    )}
                </div>

            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Auto Loan Calculator", "operatingSystem": "All", "applicationCategory": "FinanceApplication" }) }} />

            <CalculatorSEO
                title="Auto Loan Calculator"
                whatIsIt={
                    <>
                        <p>An <strong>Auto Loan Calculator</strong> is a specialized financial tool designed to help you determine your exact monthly car payment before heading to the dealership. By factoring in the total car price, your down payment, the value of your trade-in, interest rate, and term length, it reveals the true cost of your vehicle.</p>
                        <p>Unlike simple calculators, our auto loan calculator also accounts for state sales tax and dealer fees to give you a highly accurate, out-the-door monthly payment estimate so you can negotiate with confidence.</p>
                    </>
                }
                formula={
                    <>
                        <p>The core mathematical formula used to calculate your monthly auto loan payment (for an amortized loan) is the standard payment formula:</p>
                        <div className="bg-white p-4 rounded-lg font-mono text-center text-xl shadow-sm my-4 overflow-x-auto">
                            A = P [ r(1 + r)^n ] / [ (1 + r)^n - 1 ]
                        </div>
                        <ul className="list-disc pl-6 space-y-2 mt-4">
                            <li><strong>A:</strong> Total monthly payment</li>
                            <li><strong>P:</strong> Principal loan amount (Car Price + Tax + Fees - Down Payment - Trade-in)</li>
                            <li><strong>r:</strong> Monthly interest rate (Annual Percentage Rate divided by 12)</li>
                            <li><strong>n:</strong> Number of months (Loan Term)</li>
                        </ul>
                    </>
                }
                example={
                    <>
                        <p>Imagine you are buying a car for <strong>$25,000</strong>. You have a <strong>$5,000</strong> down payment and no trade-in.</p>
                        <p>You secure a <strong>60-month loan</strong> at a <strong>5.5% interest rate</strong>. You also live in a state with <strong>6.25% sales tax</strong> and the dealer charges <strong>$500</strong> in fees.</p>
                        <ul className="list-disc pl-6 space-y-2 mt-4">
                            <li><strong>Tax Amount:</strong> $25,000 * 6.25% = $1,562.50</li>
                            <li><strong>Total Financed (Principal):</strong> $25,000 + $1,562.50 + $500 - $5,000 = <strong>$22,062.50</strong></li>
                            <li><strong>Monthly Payment:</strong> Using the formula, your payment is exactly <strong>$421.43 per month</strong>.</li>
                        </ul>
                        <p className="mt-4 font-semibold text-rose-700">Over the 60-month term, you will pay $3,223.36 in interest, making the true total cost of the car $30,285.86.</p>
                    </>
                }
                useCases={
                    <ul className="list-disc pl-6 space-y-4">
                        <li><strong>Dealership Negotiation:</strong> Walking into a dealership knowing exactly what your payments should be ensures you don't fall for "creative finance" tricks where dealers hide fees by extending the loan term.</li>
                        <li><strong>Budget Planning:</strong> Finding out what maximum car price fits your target monthly budget of $300 or $400.</li>
                        <li><strong>Comparing Loan Offers:</strong> Instantly seeing if taking a cash rebate with a higher bank interest rate is cheaper than the dealer's 0% APR financing offer.</li>
                        <li><strong>Trade-In Value Impact:</strong> Understanding exactly how much your old car's trade-in value lowers your monthly payment.</li>
                    </ul>
                }
                faqs={[
                    {
                        question: "Does a longer loan term save me money?",
                        answer: "No. While a longer auto loan term (like 72 or 84 months) will significantly lower your monthly payment, it actually costs you substantially more money in the long run due to compounding interest. Furthermore, cars depreciate rapidly, meaning a long loan term increases the risk of being 'upside-down' (owing more than the car is worth)."
                    },
                    {
                        question: "How does my down payment affect the auto loan?",
                        answer: "A larger down payment immediately reduces the principal amount you are financing. This has a dual benefit: it lowers your monthly payment and decreases the total amount of interest you will pay over the life of the loan."
                    },
                    {
                        question: "Are dealer fees and sales tax included in my loan?",
                        answer: "Usually, yes. Most buyers roll their state sales tax and dealer documentation fees directly into standard auto loans. Our calculator allows you to enter these metrics so you get an accurate 'Out the Door' monthly payment."
                    },
                    {
                        question: "Should I lease or buy a car?",
                        answer: "Buying a car builds equity and you eventually own the vehicle outright. Leasing a car usually offers a lower monthly payment and allows you to drive a newer car every few years, but you never gain ownership equity. Use our Auto Lease Calculator to compare specific numbers."
                    }
                ]}
                relatedCalculators={[
                    { name: "Payment Calculator", path: "/payment-calculator", desc: "Calculate exact monthly payments for any fixed-term loan." },
                    { name: "Auto Lease Calculator", path: "/auto-lease-calculator", desc: "Calculate your exact monthly car lease payment including depreciation." },
                    { name: "Amortization Calculator", path: "/amortization-calculator", desc: "View a month-by-month breakdown of your loan payoff schedule." }
                ]}
            />
        </div>
    );
}
