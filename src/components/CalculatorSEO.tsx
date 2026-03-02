import React from 'react';
import Link from 'next/link';

interface FAQ {
    question: string;
    answer: string;
}

interface RelatedCalculator {
    name: string;
    path: string;
    desc: string;
}

interface CalculatorSEOProps {
    title: string;
    whatIsIt: React.ReactNode;
    formula: React.ReactNode;
    example: React.ReactNode;
    useCases: React.ReactNode;
    faqs: FAQ[];
    relatedCalculators?: RelatedCalculator[];
}

export default function CalculatorSEO({ title, whatIsIt, formula, example, useCases, faqs, relatedCalculators = [] }: CalculatorSEOProps) {
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map((faq) => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };

    return (
        <div className="mt-16 bg-white border-t border-gray-200 pt-16 pb-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />

                <div className="prose prose-blue max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700">
                    <h2 className="text-3xl font-extrabold mb-8 pb-4 border-b border-gray-100">Understanding the {title}</h2>

                    <section className="mb-12">
                        <h3 className="text-2xl font-bold mb-4">What is it?</h3>
                        <div className="space-y-4 text-lg leading-relaxed">{whatIsIt}</div>
                    </section>

                    <section className="mb-12 bg-blue-50/50 p-8 rounded-2xl border border-blue-100/50">
                        <h3 className="text-2xl font-bold mb-4 text-blue-900">The Formula</h3>
                        <div className="space-y-4 text-lg text-blue-800">{formula}</div>
                    </section>

                    <section className="mb-12">
                        <h3 className="text-2xl font-bold mb-4">Example Calculation</h3>
                        <div className="space-y-4 text-lg bg-gray-50 p-8 rounded-2xl border border-gray-100 leading-relaxed">{example}</div>
                    </section>

                    <section className="mb-12">
                        <h3 className="text-2xl font-bold mb-4">Common Use Cases</h3>
                        <div className="space-y-4 text-lg leading-relaxed">{useCases}</div>
                    </section>

                    <section className="mb-16">
                        <h3 className="text-2xl font-bold mb-6">Frequently Asked Questions</h3>
                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <details key={index} className="group bg-white border border-gray-200 rounded-xl p-6 [&_summary::-webkit-details-marker]:hidden shadow-sm hover:shadow-md transition">
                                    <summary className="flex cursor-pointer items-center justify-between gap-1.5 font-bold text-gray-900">
                                        <h4 className="text-lg pr-4">{faq.question}</h4>
                                        <span className="shrink-0 rounded-full bg-blue-50 p-2 text-blue-600 sm:p-3 group-open:bg-blue-600 group-open:text-white transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="size-5 shrink-0 transition duration-300 group-open:-rotate-45" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                            </svg>
                                        </span>
                                    </summary>
                                    <div className="mt-4 leading-relaxed text-gray-700 text-lg border-t pt-4">
                                        <p>{faq.answer}</p>
                                    </div>
                                </details>
                            ))}
                        </div>
                    </section>

                    {relatedCalculators.length > 0 && (
                        <section className="mb-8">
                            <h3 className="text-2xl font-bold mb-6">Related Core Calculators</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {relatedCalculators.map((calc, idx) => (
                                    <Link key={idx} href={calc.path} className="block group bg-white border border-gray-200 p-6 rounded-xl hover:border-blue-300 hover:shadow-md transition">
                                        <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition mb-2 text-lg">{calc.name}</h4>
                                        <p className="text-sm text-gray-500 line-clamp-2">{calc.desc}</p>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
}
