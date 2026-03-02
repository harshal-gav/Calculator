'use client';

import { useState } from 'react';
import CalculatorSEO from '@/components/CalculatorSEO';

export default function SalaryCalculator() {
    const [amount, setAmount] = useState('50000');
    const [period, setPeriod] = useState('year'); // hour, day, week, month, year
    const [hoursPerWeek, setHoursPerWeek] = useState('40');
    const [daysPerWeek, setDaysPerWeek] = useState('5');

    const [results, setResults] = useState<{
        hourly: number;
        daily: number;
        weekly: number;
        biweekly: number;
        monthly: number;
        yearly: number;
    } | null>(null);

    const calculateSalary = () => {
        const val = parseFloat(amount) || 0;
        const hpw = parseFloat(hoursPerWeek) || 40;
        const dpw = parseFloat(daysPerWeek) || 5;

        // Convert everything to a yearly baseline first
        let yearly = 0;
        if (period === 'year') yearly = val;
        if (period === 'month') yearly = val * 12;
        if (period === 'week') yearly = val * 52;
        if (period === 'day') yearly = val * dpw * 52;
        if (period === 'hour') yearly = val * hpw * 52;

        setResults({
            yearly: yearly,
            monthly: yearly / 12,
            biweekly: yearly / 26,
            weekly: yearly / 52,
            daily: yearly / (dpw * 52),
            hourly: yearly / (hpw * 52)
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <h1 className="text-4xl font-extrabold mb-4 text-emerald-900 border-b pb-4">Salary Calculator</h1>
            <p className="mb-8 text-gray-600 text-lg">
                Convert your salary equivalent between hourly, daily, weekly, monthly, and annual amounts.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Salary Amount ($)</label>
                            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 border focus:border-emerald-500 font-bold text-lg" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Earned Per</label>
                            <select value={period} onChange={(e) => setPeriod(e.target.value)} className="w-full rounded-lg border-gray-300 p-3 border focus:border-emerald-500">
                                <option value="hour">Hour</option>
                                <option value="day">Day</option>
                                <option value="week">Week</option>
                                <option value="month">Month</option>
                                <option value="year">Year</option>
                            </select>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="block text-sm text-gray-600 mb-1">Hours/Week</label>
                                <input type="number" value={hoursPerWeek} onChange={(e) => setHoursPerWeek(e.target.value)} className="w-full rounded-lg border-gray-300 p-2 border" />
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm text-gray-600 mb-1">Days/Week</label>
                                <input type="number" value={daysPerWeek} onChange={(e) => setDaysPerWeek(e.target.value)} className="w-full rounded-lg border-gray-300 p-2 border" />
                            </div>
                        </div>

                        <button onClick={calculateSalary} className="w-full bg-emerald-600 text-white font-bold py-4 mt-4 rounded-lg hover:bg-emerald-700 shadow-md transition uppercase tracking-wider text-sm">
                            Convert Salary
                        </button>
                    </div>
                </div>

                {/* Results Table */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                    {results !== null ? (
                        <table className="min-w-full text-left">
                            <tbody className="divide-y divide-gray-100 text-lg">
                                <tr className="bg-emerald-50">
                                    <td className="px-6 py-4 font-semibold text-gray-600">Hourly</td>
                                    <td className="px-6 py-4 font-black text-emerald-800 text-right">${results.hourly.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-medium text-gray-500">Daily</td>
                                    <td className="px-6 py-4 font-bold text-gray-800 text-right">${results.daily.toFixed(2)}</td>
                                </tr>
                                <tr className="bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-500">Weekly</td>
                                    <td className="px-6 py-4 font-bold text-gray-800 text-right">${results.weekly.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-medium text-gray-500">Bi-Weekly</td>
                                    <td className="px-6 py-4 font-bold text-gray-800 text-right">${results.biweekly.toFixed(2)}</td>
                                </tr>
                                <tr className="bg-gray-50">
                                    <td className="px-6 py-4 font-semibold text-gray-600">Monthly</td>
                                    <td className="px-6 py-4 font-black text-gray-900 text-right">${results.monthly.toFixed(2)}</td>
                                </tr>
                                <tr className="bg-emerald-100">
                                    <td className="px-6 py-5 font-bold text-emerald-900">Yearly</td>
                                    <td className="px-6 py-5 font-black text-emerald-900 text-right text-2xl">${results.yearly.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                </tr>
                            </tbody>
                        </table>
                    ) : (
                        <div className="h-full flex items-center justify-center p-8 text-center text-gray-400">
                            Click Convert to view the salary breakdown.
                        </div>
                    )}
                </div>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Salary Calculator", "operatingSystem": "All", "applicationCategory": "FinanceApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } }) }} />

            <CalculatorSEO
                title="Salary Calculator"
                whatIsIt={
                    <>
                        <p>Our <strong>Salary Calculator</strong> is a direct and powerful tool designed to easily convert your income between different time periods. Need to know exactly what a $65,000 annual salary translates to per hour? Or maybe you want to find out what $35 an hour equals if you worked a full year? This tool handles the conversion instantly.</p>
                        <p>It acts as a universal income translator, producing the equivalent hourly, daily, weekly, bi-weekly, monthly, and yearly income amounts based on whatever input you provide.</p>
                    </>
                }
                formula={
                    <>
                        <p>To convert any income into another timeframe, the key is strictly standardizing everything to a <strong>Yearly Baseline</strong> first, assuming 52 weeks in a year.</p>
                        <div className="bg-white p-4 rounded-lg font-mono text-center text-xl shadow-sm my-4 overflow-x-auto space-y-2 text-emerald-800">
                            <p>Yearly = Hourly Rate * Hours per Week * 52</p>
                            <p>Hourly Rate = Yearly / 52 / Hours per Week</p>
                            <p>Monthly Rate = Yearly / 12</p>
                        </div>
                        <ul className="list-disc pl-6 space-y-2 mt-4 text-emerald-900">
                            <li><strong>Standard Work Year:</strong> The default calculation uses 40 hours per week and 52 weeks a year, meaning a standard work year contains exactly 2,080 working hours.</li>
                            <li><strong>Customizing:</strong> You can adjust the hours per week and days per week to match your actual work schedule if you work part-time or do 4-day workweeks.</li>
                        </ul>
                    </>
                }
                example={
                    <>
                        <p>Let's say you receive a job offer for <strong>$25.00 per hour</strong> and they guarantee you <strong>40 hours per week</strong>.</p>
                        <ul className="list-disc pl-6 space-y-2 mt-4">
                            <li><strong>Yearly Salary:</strong> $25 * 40 * 52 = <strong>$52,000.00</strong></li>
                            <li><strong>Monthly Income:</strong> $52,000 / 12 = <strong>$4,333.33</strong></li>
                            <li><strong>Bi-weekly Paycheck:</strong> $52,000 / 26 = <strong>$2,000.00</strong> (Before taxes)</li>
                        </ul>
                        <p className="mt-4">Knowing your exact gross pay breakdown is the first critical step to effective budgeting.</p>
                    </>
                }
                useCases={
                    <ul className="list-disc pl-6 space-y-4">
                        <li><strong>Evaluating Job Offers:</strong> Quickly comparing two different job offers where one employer quotes an annual salary ($50,000) and the other offers an hourly wage ($24/hour).</li>
                        <li><strong>Freelance Pricing:</strong> Determining what hourly rate you need to charge your clients to hit your target $100,000 annual income goal.</li>
                        <li><strong>Budget Planning:</strong> Finding out exactly how much "gross" income you make every two weeks so you can plug it into a rent calculator to see what apartments you can afford.</li>
                    </ul>
                }
                faqs={[
                    {
                        question: "Are taxes included in this calculation?",
                        answer: "No. This calculator strictly shows Gross Income (your earnings before taxes or deductions are removed). To find your 'take-home' pay, you'll need to use an after-tax paycheck calculator that factors in your specific state and federal tax brackets."
                    },
                    {
                        question: "How many working hours are in a year?",
                        answer: "For a standard full-time employee working 40 hours a week for 52 weeks a year, there are exactly 2,080 total working hours in one year."
                    },
                    {
                        question: "What does Bi-Weekly mean?",
                        answer: "Bi-weekly means you are paid every two weeks. There are 52 weeks in a year, which means there are 26 bi-weekly pay periods in a year. This is different from 'semi-monthly', where you are paid exactly twice a month (24 times a year)."
                    }
                ]}
                relatedCalculators={[
                    { name: "Rent Calculator", path: "/rent-calculator", desc: "Discover exactly how much rent you can afford based on your calculated income." },
                    { name: "Auto Loan Calculator", path: "/auto-loan-calculator", desc: "See what monthly car payment fits into your new salary budget." },
                    { name: "Payment Calculator", path: "/payment-calculator", desc: "Calculate exact monthly loan payments to see how much debt you can handle." }
                ]}
            />
        </div>
    );
}
