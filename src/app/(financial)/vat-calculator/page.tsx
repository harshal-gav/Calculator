'use client';

import { useState, useEffect } from 'react';

export default function VatCalculator() {
    const [amount, setAmount] = useState('100');
    const [vatRate, setVatRate] = useState('20');
    const [calculationType, setCalculationType] = useState('add'); // 'add' or 'remove'

    const [result, setResult] = useState({
        netAmount: 0,
        vatAmount: 0,
        grossAmount: 0
    });

    useEffect(() => {
        calculateVat();
    }, [amount, vatRate, calculationType]);

    const calculateVat = () => {
        const val = parseFloat(amount) || 0;
        const rate = parseFloat(vatRate) || 0;

        let net = 0;
        let vat = 0;
        let gross = 0;

        if (calculationType === 'add') {
            // "Adding VAT" - The entered amount is the Net Amount
            net = val;
            vat = val * (rate / 100);
            gross = net + vat;
        } else {
            // "Removing VAT" - The entered amount is the Gross Amount
            gross = val;
            // gross = net * (1 + rate/100)  =>  net = gross / (1 + rate/100)
            net = val / (1 + (rate / 100));
            vat = gross - net;
        }

        setResult({
            netAmount: net,
            vatAmount: vat,
            grossAmount: gross
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <h1 className="text-4xl font-extrabold mb-4 text-orange-700 border-b pb-4">VAT Calculator</h1>
            <p className="mb-8 text-gray-600 text-lg">
                Quickly add VAT to a net price or extract VAT from a gross price to find the pre-VAT cost.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="bg-orange-50 p-6 rounded-xl border border-orange-100 space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Calculation Type</label>
                        <select
                            value={calculationType}
                            onChange={(e) => setCalculationType(e.target.value)}
                            className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-orange-500 font-bold bg-white text-gray-800"
                        >
                            <option value="add">Add VAT (Exclusive → Inclusive)</option>
                            <option value="remove">Remove VAT (Inclusive → Exclusive)</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Amount</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-600 font-bold text-lg">£</span>
                            <input
                                type="number" min="0" step="0.01"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full rounded-xl border-gray-300 p-4 pl-10 shadow-sm focus:border-orange-500 font-black text-2xl text-gray-800"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">VAT Rate (%)</label>
                        <div className="flex flex-wrap gap-2 mb-3">
                            {[5, 12, 20, 23].map(pct => (
                                <button
                                    key={pct}
                                    onClick={() => setVatRate(pct.toString())}
                                    className={`flex-1 py-2 px-3 rounded-lg font-bold text-sm transition ${parseFloat(vatRate) === pct ? 'bg-orange-600 text-white shadow-md' : 'bg-white text-orange-700 border border-orange-200 hover:bg-orange-100'}`}
                                >
                                    {pct}%
                                </button>
                            ))}
                        </div>
                        <div className="relative">
                            <input
                                type="number" min="0" step="0.1"
                                value={vatRate}
                                onChange={(e) => setVatRate(e.target.value)}
                                className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-orange-500 font-bold text-gray-800 pr-10"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">%</span>
                        </div>
                    </div>
                </div>

                {/* Results Screen */}
                <div className="bg-white border-2 border-orange-100 rounded-xl overflow-hidden shadow-sm flex flex-col justify-center">
                    <div className="w-full flex flex-col h-full">
                        <div className="p-8 pb-6 text-center bg-orange-600 border-b border-orange-700 text-white">
                            <h3 className="text-orange-200 font-bold uppercase tracking-widest text-[11px] mb-2">
                                {calculationType === 'add' ? 'Gross Price (Inc. VAT)' : 'Net Price (Excl. VAT)'}
                            </h3>
                            <div className="text-5xl font-black drop-shadow-sm">
                                <span className="text-3xl text-orange-300 mr-1">£</span>
                                {calculationType === 'add' ? result.grossAmount.toFixed(2) : result.netAmount.toFixed(2)}
                            </div>
                        </div>

                        <div className="p-6 flex-grow space-y-4 bg-gray-50 flex flex-col justify-center">
                            <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-200">
                                <span className="font-bold text-gray-500 uppercase text-[10px] tracking-widest">
                                    {calculationType === 'add' ? 'Original Net Amount' : 'Original Gross Amount'}
                                </span>
                                <span className="font-bold text-xl text-gray-700">
                                    £{calculationType === 'add' ? result.netAmount.toFixed(2) : result.grossAmount.toFixed(2)}
                                </span>
                            </div>
                            <div className="flex justify-between items-center bg-white p-4 rounded-xl border flex-col sm:flex-row border-gray-200 shadow-inner">
                                <span className="font-bold text-gray-500 uppercase text-[10px] tracking-widest sm:mb-0 mb-1">
                                    VAT Amount ({vatRate}%)
                                </span>
                                <span className="font-black text-2xl text-orange-700">£{result.vatAmount.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "VAT Calculator", "operatingSystem": "All", "applicationCategory": "FinanceApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } }) }} />
        </div>
    );
}
