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

interface GlossaryTerm {
    term: string;
    definition: string;
}

interface ComparisonTable {
    title: string;
    headers: string[];
    rows: string[][];
}

interface CalculatorSEOProps {
    title: string;
    whatIsIt: React.ReactNode;
    formula: React.ReactNode;
    example: React.ReactNode;
    useCases: React.ReactNode;
    faqs: FAQ[];
    relatedCalculators?: RelatedCalculator[];
    deepDive?: React.ReactNode; // New: For 3000+ word deep-dive content
    glossary?: GlossaryTerm[]; // New: For glossary of terms
    comparisonTable?: ComparisonTable; // New: For data comparison
}

export default function CalculatorSEO({ 
    title, 
    whatIsIt, 
    formula, 
    example, 
    useCases, 
    faqs, 
    relatedCalculators = [],
    deepDive,
    glossary,
    comparisonTable
}: CalculatorSEOProps) {
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

                <div className="prose prose-blue max-w-none prose-headings:text-black prose-p:text-black prose-li:text-black">
                    <h2 className="text-4xl font-extrabold mb-12 pb-6 border-b-2 border-gray-100 tracking-tight">
                        The Comprehensive Guide to {title}
                    </h2>

                    <section className="mb-16">
                        <h3 className="text-2xl font-bold mb-6 flex items-center">
                            <span className="bg-blue-600 w-2 h-8 rounded-full mr-4"></span>
                            What is a {title}?
                        </h3>
                        <div className="space-y-6 text-xl leading-relaxed text-gray-800">{whatIsIt}</div>
                    </section>

                    {comparisonTable && (
                        <section className="mb-16 bg-gray-50 border border-gray-200 rounded-3xl p-8 overflow-hidden shadow-inner">
                            <h3 className="text-2xl font-bold mb-8 text-center">{comparisonTable.title}</h3>
                            <div className="overflow-x-auto rounded-xl border border-gray-200">
                                <table className="w-full text-left bg-white">
                                    <thead className="bg-gray-100 border-b border-gray-200">
                                        <tr>
                                            {comparisonTable.headers.map((header, i) => (
                                                <th key={i} className="px-6 py-4 font-bold text-gray-700">
                                                    {header}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {comparisonTable.rows.map((row, i) => (
                                            <tr key={i} className="hover:bg-blue-50/30 transition-colors">
                                                {row.map((cell, j) => (
                                                    <td key={j} className="px-6 py-4">
                                                        <div className={j === 0 ? "font-bold text-gray-900" : "text-gray-700"}>
                                                            {cell}
                                                        </div>
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    )}

                    <section className="mb-16 bg-gradient-to-br from-blue-600 to-indigo-700 p-10 rounded-3xl text-white shadow-xl relative overflow-hidden group">
                        <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition duration-700"></div>
                        <h3 className="text-2xl font-bold mb-6 relative z-10 flex items-center">
                            <svg className="w-8 h-8 mr-3 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                            The Mathematical Formula
                        </h3>
                        <div className="text-xl leading-relaxed text-blue-50 opacity-95 relative z-10">{formula}</div>
                    </section>

                    {deepDive && (
                        <section className="mb-20 space-y-8 bg-white border-l-4 border-blue-600 pl-10 py-4">
                            <h3 className="text-3xl font-black mb-8 tracking-tight">Expert Analysis & Deep Dive</h3>
                            <div className="deep-dive-content space-y-8 text-xl leading-loose text-gray-800 font-serif italic">
                                {deepDive}
                            </div>
                        </section>
                    )}

                    <section className="mb-16">
                        <h3 className="text-2xl font-bold mb-6 flex items-center">
                            <span className="bg-amber-500 w-2 h-8 rounded-full mr-4"></span>
                            Calculation Example
                        </h3>
                        <div className="space-y-6 text-xl bg-amber-50/50 p-10 rounded-3xl border border-amber-100 leading-relaxed shadow-sm">{example}</div>
                    </section>

                    <section className="mb-16">
                        <h3 className="text-2xl font-bold mb-6 flex items-center">
                            <span className="bg-emerald-500 w-2 h-8 rounded-full mr-4"></span>
                            Strategic Use Cases
                        </h3>
                        <div className="space-y-6 text-xl leading-relaxed text-gray-800">{useCases}</div>
                    </section>

                    {glossary && (
                        <section className="mb-20 bg-gray-50 p-10 rounded-3xl border border-gray-200">
                            <h3 className="text-2xl font-bold mb-8">Glossary of Key Terms</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                                {glossary.map((term, idx) => (
                                    <div key={idx} className="group">
                                        <dt className="font-black text-gray-900 text-lg mb-2 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{term.term}</dt>
                                        <dd className="text-gray-600 leading-relaxed">{term.definition}</dd>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    <section className="mb-16">
                        <h3 className="text-3xl font-bold mb-10 text-center">Frequently Asked Questions</h3>
                        <div className="grid grid-cols-1 gap-6">
                            {faqs.map((faq, index) => (
                                <details key={index} className="group bg-white border-2 border-gray-100 rounded-3xl p-8 [&_summary::-webkit-details-marker]:hidden shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300">
                                    <summary className="flex cursor-pointer items-center justify-between gap-1.5 font-bold text-black">
                                        <h4 className="text-xl pr-4 tracking-tight leading-snug">{faq.question}</h4>
                                        <span className="shrink-0 rounded-2xl bg-blue-50 p-3 text-blue-600 group-open:bg-blue-600 group-open:text-white shadow-sm transition-all duration-500 transform group-open:rotate-180">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </span>
                                    </summary>
                                    <div className="mt-8 leading-relaxed text-gray-700 text-xl border-t border-blue-50 pt-8 animate-in fade-in slide-in-from-top-4">
                                        <p>{faq.answer}</p>
                                    </div>
                                </details>
                            ))}
                        </div>
                    </section>

                    {relatedCalculators.length > 0 && (
                        <section className="mb-8 p-10 bg-slate-900 rounded-[3rem] text-white">
                            <h3 className="text-2xl font-bold mb-10 border-b border-white/10 pb-6 opacity-90">Related Strategic Tools</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {relatedCalculators.map((calc, idx) => (
                                    <Link key={idx} href={calc.path} className="block group p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-500 transition-all duration-300">
                                        <h4 className="font-bold text-xl group-hover:text-blue-400 transition mb-3">{calc.name}</h4>
                                        <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition">{calc.desc}</p>
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
