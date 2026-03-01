'use client';

import { useState } from 'react';

export default function TipSplittingCalculator() {
    const [billAmount, setBillAmount] = useState('100');
    const [tipPercentage, setTipPercentage] = useState('15');
    const [numberOfPeople, setNumberOfPeople] = useState('4');

    const bill = parseFloat(billAmount);
    const tip = parseFloat(tipPercentage);
    const people = parseInt(numberOfPeople, 10);

    let totalTip = 0;
    let totalBill = 0;
    let tipPerPerson = 0;
    let totalPerPerson = 0;
    let isValid = false;

    if (!isNaN(bill) && !isNaN(tip) && !isNaN(people) && bill >= 0 && tip >= 0 && people > 0) {
        isValid = true;
        totalTip = bill * (tip / 100);
        totalBill = bill + totalTip;
        tipPerPerson = totalTip / people;
        totalPerPerson = totalBill / people;
    }

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-sky-50 rounded-xl shadow-lg border border-sky-100">
            <h1 className="text-4xl font-extrabold mb-4 text-sky-900 border-b pb-4 flex items-center">
                <span className="mr-3">🧾</span> Tip Splitting Calculator
            </h1>
            <p className="mb-8 text-sky-700 text-lg">
                Quickly calculate the tip and easily divide the total bill among your group.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Inputs */}
                <div className="bg-white p-6 rounded-xl border border-sky-200 shadow-sm space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-sky-800 mb-2">Total Bill Amount ($)</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-sky-500 font-bold">$</span>
                            <input
                                type="number" min="0" step="0.01"
                                value={billAmount}
                                onChange={(e) => setBillAmount(e.target.value)}
                                className="w-full rounded-xl border-sky-200 pl-8 p-3 shadow-inner focus:border-sky-500 font-bold text-xl text-slate-800 bg-sky-50"
                                placeholder="0.00"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-sky-800 mb-2 flex justify-between">
                            <span>Tip Percentage (%)</span>
                            <span className="text-sky-600 font-black">{tipPercentage}%</span>
                        </label>
                        <input
                            type="range" min="0" max="50" step="1"
                            value={tipPercentage}
                            onChange={(e) => setTipPercentage(e.target.value)}
                            className="w-full h-2 bg-sky-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
                        />
                        <div className="flex justify-between mt-2">
                            <button onClick={() => setTipPercentage('10')} className="text-xs font-bold text-sky-600 bg-sky-100 px-3 py-1 rounded-full hover:bg-sky-200">10%</button>
                            <button onClick={() => setTipPercentage('15')} className="text-xs font-bold text-sky-600 bg-sky-100 px-3 py-1 rounded-full hover:bg-sky-200">15%</button>
                            <button onClick={() => setTipPercentage('18')} className="text-xs font-bold text-sky-600 bg-sky-100 px-3 py-1 rounded-full hover:bg-sky-200">18%</button>
                            <button onClick={() => setTipPercentage('20')} className="text-xs font-bold text-sky-600 bg-sky-100 px-3 py-1 rounded-full hover:bg-sky-200">20%</button>
                            <button onClick={() => setTipPercentage('25')} className="text-xs font-bold text-sky-600 bg-sky-100 px-3 py-1 rounded-full hover:bg-sky-200">25%</button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-sky-800 mb-2 flex justify-between">
                            <span>Number of People</span>
                            <span className="text-sky-600 font-black">{numberOfPeople} 👤</span>
                        </label>
                        <input
                            type="range" min="1" max="20" step="1"
                            value={numberOfPeople}
                            onChange={(e) => setNumberOfPeople(e.target.value)}
                            className="w-full h-2 bg-sky-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
                        />
                    </div>
                </div>

                {/* Results breakdown */}
                <div className="bg-sky-900 border border-sky-800 rounded-xl p-6 md:p-8 flex flex-col justify-center text-white relative overflow-hidden shadow-xl">
                    <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-48 w-48" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </div>

                    {isValid ? (
                        <div className="relative z-10 space-y-6">
                            <div className="flex justify-between items-end border-b border-sky-700 pb-3">
                                <div>
                                    <div className="text-xs font-bold uppercase tracking-widest text-sky-300">Total Tip</div>
                                    <div className="text-2xl font-black">${totalTip.toFixed(2)}</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-xs font-bold uppercase tracking-widest text-sky-300">Total Bill</div>
                                    <div className="text-2xl font-black">${totalBill.toFixed(2)}</div>
                                </div>
                            </div>

                            <div className="bg-sky-800 p-6 rounded-xl border border-sky-700 shadow-inner text-center">
                                <div className="text-sm font-bold uppercase tracking-widest text-sky-300 mb-2">Amount Per Person</div>
                                <div className="text-5xl font-black text-white flex items-center justify-center">
                                    <span className="text-3xl font-bold text-sky-400 mr-1">$</span>
                                    {totalPerPerson.toFixed(2)}
                                </div>
                                <div className="text-sm mt-3 text-sky-200">
                                    (Includes ${(totalTip / people).toFixed(2)} tip)
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="relative z-10 text-center text-sky-300 font-medium italic">
                            Awaiting valid input...
                        </div>
                    )}
                </div>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Tip Splitting Calculator", "operatingSystem": "All", "applicationCategory": "FinanceApplication" }) }} />
        </div>
    );
}
