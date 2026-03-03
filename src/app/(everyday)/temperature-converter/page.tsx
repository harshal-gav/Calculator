'use client';

import { useState, useEffect } from 'react';
import CalculatorSEO from '@/components/CalculatorSEO';

const labels: Record<string, string> = {
    'celsius': 'Celsius (°C)',
    'fahrenheit': 'Fahrenheit (°F)',
    'kelvin': 'Kelvin (K)',
};

export default function TemperatureConverter() {
    const [amount, setAmount] = useState('0');
    const [fromUnit, setFromUnit] = useState('celsius');
    const [toUnit, setToUnit] = useState('fahrenheit');
    const [result, setResult] = useState('');

    useEffect(() => {
        calculateConversion();
    }, [amount, fromUnit, toUnit]);

    const calculateConversion = () => {
        const val = parseFloat(amount);
        if (isNaN(val)) {
            setResult('');
            return;
        }

        let inCelsius = 0;

        // Convert to Celsius first
        if (fromUnit === 'celsius') inCelsius = val;
        else if (fromUnit === 'fahrenheit') inCelsius = (val - 32) * (5 / 9);
        else if (fromUnit === 'kelvin') inCelsius = val - 273.15;

        let finalValue = 0;

        // Convert from Celsius to Target
        if (toUnit === 'celsius') finalValue = inCelsius;
        else if (toUnit === 'fahrenheit') finalValue = (inCelsius * (9 / 5)) + 32;
        else if (toUnit === 'kelvin') finalValue = inCelsius + 273.15;

        setResult(finalValue.toLocaleString('en-US', { maximumFractionDigits: 3 }));
    };

    const handleSwap = () => {
        const temp = fromUnit;
        setFromUnit(toUnit);
        setToUnit(temp);
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <h1 className="text-4xl font-extrabold mb-4 text-emerald-700 border-b pb-4">Temperature Converter</h1>
            <p className="mb-8 text-gray-600 text-lg">
                Instantly convert degrees between Celsius, Fahrenheit, and Kelvin scales.
            </p>

            <div className="bg-emerald-50 rounded-2xl p-6 md:p-10 border border-emerald-100 shadow-inner">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">

                    {/* From Section */}
                    <div className="md:col-span-2 space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Value</label>
                            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full rounded-xl border-gray-300 p-4 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 font-black text-2xl" placeholder="Enter amount" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">From</label>
                            <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} className="w-full rounded-xl border-gray-300 p-4 shadow-sm focus:border-emerald-500 font-semibold bg-white cursor-pointer text-gray-700">
                                {Object.keys(labels).map(key => (
                                    <option key={`from-${key}`} value={key}>{labels[key]}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Swap Button */}
                    <div className="md:col-span-1 flex justify-center py-4 md:py-0">
                        <button onClick={handleSwap} className="bg-white p-4 rounded-full shadow hover:shadow-md border border-gray-200 transition-all hover:rotate-180 hover:bg-emerald-100 text-emerald-600 focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                            </svg>
                        </button>
                    </div>

                    {/* To Section */}
                    <div className="md:col-span-2 space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Result</label>
                            <input type="text" readOnly value={result} className="w-full rounded-xl border-emerald-300 bg-emerald-100/50 p-4 shadow-sm font-black text-2xl text-emerald-900 outline-none" placeholder="0" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">To</label>
                            <select value={toUnit} onChange={(e) => setToUnit(e.target.value)} className="w-full rounded-xl border-gray-300 p-4 shadow-sm focus:border-emerald-500 font-semibold bg-white cursor-pointer text-gray-700">
                                {Object.keys(labels).map(key => (
                                    <option key={`to-${key}`} value={key}>{labels[key]}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                </div>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Temperature Converter", "operatingSystem": "All", "applicationCategory": "UtilityApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } }) }} />

            <div className="mt-8">
                <CalculatorSEO
                    title="Temperature Converter"
                    whatIsIt={
                        <>
                            <p>Our <strong>Temperature Converter</strong> is a precision algorithmic tool that seamlessly translates heat measurements between the world's three primary temperature scales: Fahrenheit (°F), Celsius (°C), and Kelvin (K).</p>
                            <p>While almost the entire globe utilizes Celsius for daily weather and cooking, the United States still operates heavily on Fahrenheit. Concurrently, engineers, chemists, and astronomers use Kelvin because it is an "absolute" thermodynamic scale. Attempting to convert these in your head is notoriously difficult because they use totally different baseline numbers for the freezing and boiling points of water.</p>
                        </>
                    }
                    formula={
                        <>
                            <p>Unlike length or weight conversions which just use simple multiplication, temperature conversion requires multi-step algebra involving fractions and addition/subtraction.</p>
                            <div className="bg-emerald-50 p-4 rounded-lg font-mono text-center text-[15px] shadow-sm my-4 flex flex-col gap-2 border border-emerald-100 text-emerald-900">
                                <p><strong>°C to °F:</strong> (°C × 9/5) + 32</p>
                                <p className="mt-2 pt-2 border-t border-emerald-200"><strong>°F to °C:</strong> (°F - 32) × 5/9</p>
                                <p className="mt-2 pt-2 border-t border-emerald-200"><strong>°C to Kelvin:</strong> °C + 273.15</p>
                            </div>
                        </>
                    }
                    example={
                        <>
                            <p>Let's convert a perfectly normal human body temperature from Fahrenheit to Celsius.</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                                <li><strong>The Setup:</strong> In the US, the standard baseline for a healthy human body temperature is <strong>98.6 °F</strong>. If a European doctor sees this number, they need to know what it equates to in Celsius.</li>
                                <li><strong>The Math:</strong> Use the formula <code>(°F - 32) × 5/9</code>.</li>
                                <li><strong>The Calculation:</strong> First subtract 32 from 98.6 to get 66.6. Then, multiply 66.6 by exactly 5/9 (which is 0.5555...).</li>
                                <li><strong>Result:</strong> 66.6 × 0.5555 = exactly <strong>37.0 °C</strong>. Both numbers represent identical levels of heat.</li>
                            </ul>
                        </>
                    }
                    useCases={
                        <ul className="list-disc pl-6 space-y-4 text-gray-700">
                            <li><strong>International Weather Forecasts:</strong> To a European used to Celsius, hearing a forecast of "100 degrees" sounds like the air is literally boiling. Converting it to ~37°C makes intuitive sense. Unversely, an American hearing "it's 20 degrees outside" thinks it is freezing, but 20°C is actually a beautiful 68°F.</li>
                            <li><strong>Baking and Ovens:</strong> The vast majority of European recipes tell you to pre-heat an oven to "200°C". If an American sets their US oven to 200°F instead, the food will barely get warm. Converting 200°C to ~400°F is essentially mandatory before cooking.</li>
                            <li><strong>PC Hardware Monitoring:</strong> When checking the temperature of your computer's CPU or Graphics Card using diagnostic software, the sensors almost universally output the heat in Celsius, which gamers frequently need to translate.</li>
                        </ul>
                    }
                    faqs={[
                        {
                            question: "At what temperature are Fahrenheit and Celsius exactly the same?",
                            answer: "Negative 40 degrees (-40). Due to the intersecting mathematics of both formulas, -40°F is the identical thermodynamic temperature as -40°C. It is the only point on the thermometer where the two scales perfectly cross."
                        },
                        {
                            question: "What actually is 0 on the Celsius scale?",
                            answer: "Anders Celsius designed the scale around the physical phases of water at standard sea-level pressure. Exactly 0°C is the freezing point of water, and exactly 100°C is the boiling point of water. It makes logical sense compared to Fahrenheit, where water freezes at the seemingly random number of 32."
                        },
                        {
                            question: "Why does the Kelvin scale exist?",
                            answer: "Kelvin is used exclusively for scientific equations because it has no 'negative' numbers. Exactly 0 Kelvin ('Absolute Zero') is the theoretical state where all atomic and molecular movement physically stops. Because the scale starts at true zero, scientists can use it in thermodynamic multiplication and division equations without breaking the math."
                        }
                    ]}
                    relatedCalculators={[
                        { name: "Length Converter", path: "/length-converter", desc: "Instantly translate miles, kilometers, feet, and meters." },
                        { name: "Cooking Measurement Converter", path: "/cooking-converter", desc: "Convert cups, fluid ounces, tablespoons, and milliliters." },
                        { name: "Speed Converter", path: "/speed-converter", desc: "Convert mph to km/h or knots seamlessly." }
                    ]}
                />
            </div>
        </div>
    );
}
