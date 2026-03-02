'use client';

import { useState } from 'react';
import CalculatorSEO from '@/components/CalculatorSEO';

export default function FractionCalculator() {
    const [num1, setNum1] = useState('');
    const [den1, setDen1] = useState('');
    const [num2, setNum2] = useState('');
    const [den2, setDen2] = useState('');
    const [operation, setOperation] = useState('+');

    const [result, setResult] = useState<{
        numerator: number;
        denominator: number;
        decimal: number;
        mixedWhole?: number;
        mixedNumerator?: number;
    } | null>(null);

    // Helper: Greatest Common Divisor
    const gcd = (a: number, b: number): number => {
        return b === 0 ? a : gcd(b, a % b);
    };

    const calculateFraction = () => {
        const n1 = parseInt(num1) || 0;
        const d1 = parseInt(den1) || 1;
        const n2 = parseInt(num2) || 0;
        const d2 = parseInt(den2) || 1;

        if (d1 === 0 || d2 === 0) return; // Prevent division by zero

        let rn = 0;
        let rd = 0;

        switch (operation) {
            case '+':
                rn = n1 * d2 + n2 * d1;
                rd = d1 * d2;
                break;
            case '-':
                rn = n1 * d2 - n2 * d1;
                rd = d1 * d2;
                break;
            case '×':
                rn = n1 * n2;
                rd = d1 * d2;
                break;
            case '÷':
                rn = n1 * d2;
                rd = d1 * n2;
                break;
        }

        if (rd === 0) return;

        // Simplify
        const divisor = Math.abs(gcd(rn, rd));
        rn = rn / divisor;
        rd = rd / divisor;

        // Ensure denominator is positive
        if (rd < 0) {
            rn = -rn;
            rd = -rd;
        }

        const decimal = rn / rd;
        let mixedWhole = 0;
        let mixedNumerator = 0;

        if (Math.abs(rn) >= Math.abs(rd) && rd !== 1 && rn !== 0) {
            mixedWhole = Math.trunc(rn / rd);
            mixedNumerator = Math.abs(rn % rd);
        }

        setResult({
            numerator: rn,
            denominator: rd,
            decimal,
            mixedWhole: mixedWhole !== 0 ? mixedWhole : undefined,
            mixedNumerator: mixedNumerator !== 0 ? mixedNumerator : undefined
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <h1 className="text-4xl font-extrabold mb-4 text-orange-900 border-b pb-4">Fraction Calculator</h1>
            <p className="mb-8 text-gray-600 text-lg">
                Add, subtract, multiply, and divide fractions. Results are provided in simplified, mixed, and decimal forms.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="bg-orange-50 p-6 rounded-xl border border-orange-100 flex flex-col items-center justify-center">
                    <div className="flex items-center gap-4 text-2xl font-bold">
                        {/* Fraction 1 */}
                        <div className="flex flex-col items-center gap-2">
                            <input type="number" value={num1} onChange={(e) => setNum1(e.target.value)} className="w-20 text-center rounded-lg border-gray-300 p-2 shadow-sm focus:border-orange-500 focus:ring-orange-500" placeholder="0" />
                            <div className="w-full h-1 bg-gray-400 rounded-full"></div>
                            <input type="number" value={den1} onChange={(e) => setDen1(e.target.value)} className="w-20 text-center rounded-lg border-gray-300 p-2 shadow-sm focus:border-orange-500 focus:ring-orange-500" placeholder="1" />
                        </div>

                        {/* Operation */}
                        <select value={operation} onChange={(e) => setOperation(e.target.value)} className="text-3xl bg-transparent border-none focus:ring-0 cursor-pointer text-orange-600 px-2 outline-none">
                            <option value="+">+</option>
                            <option value="-">-</option>
                            <option value="×">×</option>
                            <option value="÷">÷</option>
                        </select>

                        {/* Fraction 2 */}
                        <div className="flex flex-col items-center gap-2">
                            <input type="number" value={num2} onChange={(e) => setNum2(e.target.value)} className="w-20 text-center rounded-lg border-gray-300 p-2 shadow-sm focus:border-orange-500 focus:ring-orange-500" placeholder="0" />
                            <div className="w-full h-1 bg-gray-400 rounded-full"></div>
                            <input type="number" value={den2} onChange={(e) => setDen2(e.target.value)} className="w-20 text-center rounded-lg border-gray-300 p-2 shadow-sm focus:border-orange-500 focus:ring-orange-500" placeholder="1" />
                        </div>
                    </div>

                    <button onClick={calculateFraction} className="mt-8 w-full bg-orange-600 text-white font-bold py-4 rounded-xl hover:bg-orange-700 transition shadow-lg uppercase tracking-wide">
                        Calculate Fraction
                    </button>
                </div>

                {/* Results Screen */}
                <div className="bg-white border-2 border-orange-100 rounded-xl p-8 flex flex-col justify-center items-center shadow-sm">
                    {result !== null ? (
                        <div className="w-full text-center space-y-8 text-orange-900">

                            <div>
                                <h3 className="text-gray-400 font-semibold uppercase tracking-wider text-xs mb-4">Simplified Result</h3>
                                <div className="text-5xl font-black flex items-center justify-center gap-4">
                                    {result.denominator === 1 ? (
                                        <span>{result.numerator}</span>
                                    ) : (
                                        <div className="flex flex-col items-center">
                                            <span>{result.numerator}</span>
                                            <div className="w-16 h-1 bg-orange-900 rounded-full my-1"></div>
                                            <span>{result.denominator}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {result.mixedWhole !== undefined && result.mixedNumerator !== undefined && (
                                <div className="pt-6 border-t border-orange-100">
                                    <h3 className="text-gray-400 font-semibold uppercase tracking-wider text-xs mb-2">Mixed Number</h3>
                                    <div className="text-3xl font-bold flex items-center justify-center gap-2">
                                        <span>{result.mixedWhole}</span>
                                        <div className="flex flex-col items-center text-xl">
                                            <span>{result.mixedNumerator}</span>
                                            <div className="w-8 h-px bg-orange-900 my-1"></div>
                                            <span>{result.denominator}</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="pt-6 border-t border-orange-100">
                                <h3 className="text-gray-400 font-semibold uppercase tracking-wider text-xs mb-1">Decimal Form</h3>
                                <div className="text-2xl font-bold text-gray-700">
                                    {parseFloat(result.decimal.toFixed(6))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-orange-300 font-medium text-center">
                            Enter your fractions to see the step-by-step simplification.
                        </div>
                    )}
                </div>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Fraction Calculator", "operatingSystem": "All", "applicationCategory": "EducationalApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } }) }} />

            <CalculatorSEO
                title="Fraction Calculator"
                whatIsIt={
                    <>
                        <p>Our <strong>Fraction Calculator</strong> is an advanced mathematical tool that handles the complex arithmetic of adding, subtracting, multiplying, and dividing standard fractions. Instead of manually finding lowest common denominators or struggling with improper fractions, this tool solves the equation and automatically reduces the final answer to its simplest form.</p>
                        <p>In addition to the core fraction result, it automatically generates the equivalent Mixed Number (if the fraction is improper) and the exact Decimal Form.</p>
                    </>
                }
                formula={
                    <>
                        <p>Calculating fractions requires utilizing the numerator (top number) and the denominator (bottom number) according to the order of operations. Let's look at the basic rules:</p>
                        <div className="bg-white p-4 rounded-lg font-mono text-center text-lg shadow-sm my-4 overflow-x-auto space-y-4">
                            <p><strong>Addition:</strong> (a/b) + (c/d) = (ad + bc) / bd</p>
                            <p><strong>Multiplication:</strong> (a/b) × (c/d) = (ac) / (bd)</p>
                            <p><strong>Division:</strong> (a/b) ÷ (c/d) = (ad) / (bc)</p>
                        </div>
                    </>
                }
                example={
                    <>
                        <p>Let's perform a classic fraction division: <strong>2/3 ÷ 4/5</strong>.</p>
                        <ul className="list-disc pl-6 space-y-2 mt-4">
                            <li><strong>Step 1 (Keep, Change, Flip):</strong> To divide fractions, you multiply the first fraction by the reciprocal of the second. This changes the equation to 2/3 × 5/4.</li>
                            <li><strong>Step 2 (Multiply straight across):</strong> 2 × 5 = 10 (Numerator). 3 × 4 = 12 (Denominator). The raw result is 10/12.</li>
                            <li><strong>Step 3 (Simplify):</strong> Find the greatest common divisor of 10 and 12, which is 2. Divide both by 2 to get the final simplified result of <strong>5/6</strong>.</li>
                        </ul>
                    </>
                }
                useCases={
                    <ul className="list-disc pl-6 space-y-4">
                        <li><strong>Carpentry & Construction:</strong> Adding fractional lengths of lumber like 3/8" and 5/16" to get perfectly precise measurements.</li>
                        <li><strong>Baking & Cooking Recipes:</strong> Scaling up a recipe that calls for 3/4 cup of sugar so it serves exactly 1.5 times as many people, requiring fraction multiplication.</li>
                        <li><strong>School Homework:</strong> Verifying middle school math homework and learning the correct step-by-step simplification logic.</li>
                        <li><strong>Stock Market Historical Data:</strong> Analyzing historical stock prices which used to be quoted in fractions like 1/8 instead of decimals.</li>
                    </ul>
                }
                faqs={[
                    {
                        question: "What is an improper fraction?",
                        answer: "An improper fraction is any fraction where the top number (numerator) is equal to or greater than the bottom number (denominator). For example, 5/3 or 8/8. These can be converted into mixed numbers."
                    },
                    {
                        question: "What is a mixed number?",
                        answer: "A mixed number combines a whole number and a proper fraction. For example, the improper fraction 5/3 is exactly equal to the mixed number 1 2/3."
                    },
                    {
                        question: "How do I find a common denominator?",
                        answer: "The easiest way to find a common denominator is to simply multiply the two denominators together. However, to find the 'Lowest Common Denominator' (LCD), you look for the smallest multiple that both individual denominators share."
                    }
                ]}
                relatedCalculators={[
                    { name: "Percentage Calculator", path: "/percentage-calculator", desc: "Easily compute advanced percentage problems in one click." },
                    { name: "Volume Calculator", path: "/volume-calculator", desc: "Calculate the geometric volume of 3D shapes." },
                    { name: "Standard Deviation Calculator", path: "/standard-deviation-calculator", desc: "Compute population and sample standard deviation." }
                ]}
            />
        </div>
    );
}
