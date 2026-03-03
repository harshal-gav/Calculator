'use client';

import { useState, useEffect } from 'react';
import CalculatorSEO from '@/components/CalculatorSEO';
// Fallback rates just in case API fails
const FALLBACK_RATES: Record<string, number> = {
    USD: 1, EUR: 0.92, GBP: 0.79, JPY: 150.1, AUD: 1.52, CAD: 1.35,
    CHF: 0.88, CNH: 7.20, HKD: 7.82, NZD: 1.63, INR: 82.8, MXN: 17.1,
    SGD: 1.34, ZAR: 19.0, BRL: 4.98
};

const CURRENCIES = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
    { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
    { code: 'CNH', name: 'Chinese Yuan', symbol: '¥' },
    { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$' },
    { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$' },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
    { code: 'MXN', name: 'Mexican Peso', symbol: '$' },
    { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$' },
    { code: 'ZAR', name: 'South African Rand', symbol: 'R' },
    { code: 'BRL', name: 'Brazilian Real', symbol: 'R$' }
];

export default function CurrencyConverter() {
    const [amount, setAmount] = useState('100');
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EUR');

    const [rates, setRates] = useState<Record<string, number>>(FALLBACK_RATES);
    const [loading, setLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState<string>('');
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchRates = async () => {
            try {
                // Free, no-key-required API endpoint
                const response = await fetch('https://open.er-api.com/v6/latest/USD');
                if (response.ok) {
                    const data = await response.json();
                    setRates(data.rates);

                    const date = new Date(data.time_last_update_utc);
                    setLastUpdated(date.toLocaleString());
                    setError(false);
                } else {
                    throw new Error('Failed to fetch');
                }
            } catch (err) {
                console.error('Error fetching rates, using fallbacks', err);
                setRates(FALLBACK_RATES);
                setLastUpdated('Fallback (Static data)');
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchRates();
    }, []);

    const handleSwap = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    const getConvertedAmount = () => {
        const val = parseFloat(amount);
        if (isNaN(val) || val <= 0) return 0;

        // Convert to USD first (base), then to target
        const fromRate = rates[fromCurrency] || 1;
        const toRate = rates[toCurrency] || 1;

        const inUSD = val / fromRate;
        const result = inUSD * toRate;
        return result;
    };

    const convertedVal = getConvertedAmount();

    // Find symbols
    const fromSymbol = CURRENCIES.find(c => c.code === fromCurrency)?.symbol || '';
    const toSymbol = CURRENCIES.find(c => c.code === toCurrency)?.symbol || '';

    // Exchange rate string for UI
    const rateText = `1 ${fromCurrency} = ${((1 / (rates[fromCurrency] || 1)) * (rates[toCurrency] || 1)).toFixed(4)} ${toCurrency}`;

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-slate-800 flex items-center justify-center">
                    <span className="mr-3">💱</span> Currency Converter
                </h1>
                <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                    Live foreign exchange rates for popular global currencies.
                </p>
                {!loading && (
                    <p className={`text-xs mt-3 ${error ? 'text-amber-600' : 'text-emerald-600'}`}>
                        {error ? '⚠ Using fallback static rates. ' : '✓ Live rates fetched. '}
                        Last Updated: {lastUpdated}
                    </p>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

                {/* Inputs */}
                <div className="lg:col-span-2 space-y-6">

                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-2 h-full bg-blue-500"></div>
                        <h3 className="font-bold text-slate-800 uppercase tracking-wider text-sm mb-4">You Have</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 mb-1 tracking-wide">Amount</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 font-bold text-xl">{fromSymbol}</span>
                                    <input
                                        type="number" step="any" min="0" placeholder="0.00"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        className="w-full rounded-xl border-slate-200 pl-10 p-4 shadow-sm focus:border-blue-500 font-bold text-2xl bg-slate-50 text-slate-800"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 mb-1 tracking-wide">From Currency</label>
                                <select
                                    value={fromCurrency}
                                    onChange={(e) => setFromCurrency(e.target.value)}
                                    className="w-full rounded-xl border-slate-200 p-4 shadow-sm focus:border-blue-500 font-bold text-lg bg-slate-50 text-slate-800 cursor-pointer"
                                >
                                    {CURRENCIES.map(c => (
                                        <option key={`from-${c.code}`} value={c.code}>
                                            {c.code} - {c.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center -my-3 relative z-10">
                        <button
                            onClick={handleSwap}
                            className="bg-slate-800 hover:bg-slate-900 text-white rounded-full p-4 shadow-xl transform transition hover:scale-110 active:scale-95 border-4 border-slate-50"
                            title="Swap Currencies"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                            </svg>
                        </button>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500"></div>
                        <h3 className="font-bold text-slate-800 uppercase tracking-wider text-sm mb-4">You Want</h3>

                        <div>
                            <label className="block text-xs font-bold text-slate-500 mb-1 tracking-wide">To Currency</label>
                            <select
                                value={toCurrency}
                                onChange={(e) => setToCurrency(e.target.value)}
                                className="w-full rounded-xl border-slate-200 p-4 shadow-sm focus:border-emerald-500 font-bold text-lg bg-slate-50 text-slate-800 cursor-pointer"
                            >
                                {CURRENCIES.map(c => (
                                    <option key={`to-${c.code}`} value={c.code}>
                                        {c.code} - {c.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                </div>

                {/* Output */}
                <div className="lg:col-span-3">
                    <div className="h-full bg-slate-900 rounded-2xl p-8 shadow-2xl relative overflow-hidden flex flex-col justify-center text-white border border-slate-800">
                        {/* Decorative element map dots */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>

                        <div className="relative z-10 text-center">
                            {loading ? (
                                <div className="animate-pulse">
                                    <h2 className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-8 border-b border-slate-800/50 pb-4">Fetching live rates...</h2>
                                    <div className="h-16 bg-slate-800 rounded-xl mb-4 w-3/4 mx-auto"></div>
                                    <div className="h-4 bg-slate-800 rounded w-1/2 mx-auto"></div>
                                </div>
                            ) : (
                                <>
                                    <h2 className="text-emerald-400 font-bold uppercase tracking-widest text-xs mb-8 border-b border-slate-700/50 pb-4">Converted Value</h2>

                                    <div className="text-5xl md:text-6xl font-black tracking-tight text-white mb-4 drop-shadow-lg flex justify-center items-start break-all px-2">
                                        <span className="text-3xl mt-2 mr-2 text-emerald-400 font-bold opacity-80">{toSymbol}</span>
                                        {convertedVal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </div>
                                    <div className="text-slate-300 font-bold text-xl md:text-2xl tracking-wide mb-10">
                                        {toCurrency}
                                    </div>

                                    <div className="bg-black/40 backdrop-blur-md rounded-xl p-4 border border-white/10 inline-block px-8 py-4">
                                        <div className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-2">Exchange Rate</div>
                                        <div className="text-lg font-bold font-mono text-slate-200">
                                            {rateText}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Currency Converter", "operatingSystem": "All", "applicationCategory": "FinanceApplication" }) }} />

            <div className="mt-8">
                <CalculatorSEO
                    title="Currency Converter"
                    whatIsIt={
                        <>
                            <p>A <strong>Currency Converter</strong> is a fast, reliable tool utilized by travelers, investors, and international business owners to instantly translate the value of one currency into another based on current foreign exchange (forex) market rates.</p>
                            <p>Our tool directly queries live global exchange rates to provide accurate conversions across major fiat currencies such as USD, EUR, GBP, JPY, and many more, giving you absolute clarity on international purchasing power.</p>
                        </>
                    }
                    formula={
                        <>
                            <p>Converting currencies relies on an Exchange Rate multiplier. The standard mathematical conversion is incredibly simple:</p>
                            <div className="bg-white p-4 rounded-lg font-mono text-center text-xl shadow-sm my-4 overflow-x-auto">
                                Target Amount = Base Amount × Exchange Rate
                            </div>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Base Amount:</strong> The quantity of the currency you currently own.</li>
                                <li><strong>Exchange Rate:</strong> The live market ratio indicating how much of the target currency 1 unit of the base currency buys.</li>
                                <li><strong>Target Amount:</strong> The final converted value.</li>
                            </ul>
                        </>
                    }
                    example={
                        <>
                            <p>Suppose you are traveling to Europe from the United States with <strong>$1,000 USD</strong> in your budget.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Current Exchange Rate:</strong> Let's say 1 USD buys exactly 0.92 EUR.</li>
                                <li><strong>Calculation:</strong> $1,000 × 0.92 = <strong>€920.00</strong>.</li>
                            </ul>
                            <p className="mt-4">You now know that your $1,000 USD gives you exactly €920.00 in European purchasing power.</p>
                        </>
                    }
                    useCases={
                        <ul className="list-disc pl-6 space-y-4">
                            <li><strong>Travel Planning:</strong> Travelers use currency converters to accurately budget for hotels, meals, and excursions in foreign countries.</li>
                            <li><strong>International E-Commerce:</strong> Small business owners and online shoppers rely on conversion rates to price goods for international audiences and calculate true import costs.</li>
                            <li><strong>Remittances:</strong> Expats comparing rates before sending money home to ensure their family receives the highest possible yield.</li>
                        </ul>
                    }
                    faqs={[
                        {
                            question: "Why do exchange rates constantly fluctuate?",
                            answer: "Currencies are traded 24/5 on the global Forex market. Exchange rates fluctuate based on supply and demand, which are influenced by a nation's inflation rates, interest rates, public debt, political stability, and overall economic performance."
                        },
                        {
                            question: "Is this the exact rate a bank will give me?",
                            answer: "No. Our calculator provides the 'mid-market' rate—the true, unbiased exchange rate between global banks. Retail banks, credit cards, and airport kiosks always add a 'spread' markup (usually 1% to 5%) to make a profit. Use our rate as a baseline to negotiate or choose the cheapest transfer service."
                        }
                    ]}
                    relatedCalculators={[
                        { name: "ROI Calculator", path: "/roi-calculator", desc: "Calculate your overall return on investments, including forex trades." },
                        { name: "Salary Calculator", path: "/salary-calculator", desc: "Convert hourly rates to an annual salary, useful for remote global teams." }
                    ]}
                />
            </div>
        </div>
    );
}
