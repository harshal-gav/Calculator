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
        <div className="mt-12 bg-white border-t border-gray-100 pt-12 pb-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />

                <div className="prose prose-slate max-w-none prose-headings:text-slate-900 prose-p:text-slate-700 prose-li:text-slate-700">
                    <h2 className="text-3xl md:text-5xl font-black mb-10 pb-8 border-b border-slate-100 tracking-tight text-slate-900">
                        The Comprehensive Guide to {title}
                    </h2>

                    <section className="mb-12 md:mb-16">
                        <h3 className="text-2xl md:text-3xl font-bold mb-6 flex items-center text-slate-900">
                            <span className="bg-indigo-600 w-1.5 h-8 rounded-full mr-4"></span>
                            What is a {title}?
                        </h3>
                        <div className="space-y-4 md:space-y-6 text-lg md:text-xl leading-relaxed text-slate-700">
                            {whatIsIt}
                        </div>
                    </section>

                    {comparisonTable && (
                        <section className="mb-12 md:mb-16 bg-slate-50 border border-slate-200 rounded-2xl md:rounded-3xl p-5 md:p-10 overflow-hidden">
                            <h3 className="text-2xl font-bold mb-6 md:mb-8 text-slate-900">{comparisonTable.title}</h3>
                            <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-slate-50 border-b border-slate-200">
                                        <tr>
                                            {comparisonTable.headers.map((header, i) => (
                                                <th key={i} className="px-4 py-3 md:px-6 md:py-4 font-bold text-slate-700 text-sm md:text-base whitespace-nowrap">
                                                    {header}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {comparisonTable.rows.map((row, i) => (
                                            <tr key={i} className="hover:bg-indigo-50/30 transition-colors">
                                                {row.map((cell, j) => (
                                                    <td key={j} className="px-4 py-3 md:px-6 md:py-4 text-sm md:text-base">
                                                        <div className={j === 0 ? "font-bold text-slate-900" : "text-slate-700"}>
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

                    <section className="mb-12 md:mb-16 bg-indigo-50/50 p-6 md:p-12 rounded-2xl md:rounded-[2.5rem] border border-indigo-100 shadow-sm relative overflow-hidden">
                        <div className="absolute -right-20 -top-20 w-64 h-64 bg-indigo-200/20 rounded-full blur-3xl"></div>
                        <h3 className="text-2xl md:text-3xl font-bold mb-6 relative z-10 flex items-center text-slate-900">
                            <svg className="w-8 h-8 mr-3 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                            The Mathematical Formula
                        </h3>
                        <div className="text-lg md:text-xl leading-relaxed text-slate-700 relative z-10 prose-strong:text-slate-900 prose-p:text-slate-700">
                            {formula}
                        </div>
                    </section>

                    {deepDive && (
                        <section className="mb-16 md:mb-20 space-y-8 bg-indigo-50/30 border-l-4 border-indigo-600 px-6 md:px-12 py-8 rounded-r-3xl">
                            <h3 className="text-2xl md:text-3xl font-black mb-6 tracking-tight text-slate-900">Expert Analysis & Deep Dive</h3>
                            <div className="space-y-4 md:space-y-6 text-lg md:text-xl leading-relaxed text-slate-700">
                                {deepDive}
                            </div>
                        </section>
                    )}

                    <section className="mb-12 md:mb-16">
                        <h3 className="text-2xl md:text-3xl font-bold mb-6 flex items-center text-slate-900">
                            <span className="bg-amber-500 w-1.5 h-8 rounded-full mr-4"></span>
                            Calculation Example
                        </h3>
                        <div className="space-y-4 md:space-y-6 text-lg md:text-xl bg-amber-50/50 p-6 md:p-12 rounded-2xl md:rounded-3xl border border-amber-100 leading-relaxed text-slate-700">
                            {example}
                        </div>
                    </section>

                    <section className="mb-12 md:mb-16">
                        <h3 className="text-2xl md:text-3xl font-bold mb-6 flex items-center text-slate-900">
                            <span className="bg-emerald-500 w-1.5 h-8 rounded-full mr-4"></span>
                            Strategic Use Cases
                        </h3>
                        <div className="space-y-4 md:space-y-6 text-lg md:text-xl leading-relaxed text-slate-700">
                            {useCases}
                        </div>
                    </section>

                    {glossary && (
                        <section className="mb-16 md:mb-20 bg-slate-50 p-6 md:p-12 rounded-2xl md:rounded-[2.5rem] border border-slate-200">
                            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-slate-900">Glossary of Key Terms</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                                {glossary.map((term, idx) => (
                                    <div key={idx} className="group">
                                        <dt className="font-bold text-slate-900 text-lg mb-2 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{term.term}</dt>
                                        <dd className="text-slate-600 leading-relaxed text-base">{term.definition}</dd>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    <section className="mb-12 md:mb-16">
                        <h3 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-center text-slate-900">Frequently Asked Questions</h3>
                        <div className="grid grid-cols-1 gap-4 md:gap-6">
                            {faqs.map((faq, index) => (
                                <details key={index} className="group bg-white border border-slate-200 rounded-2xl p-5 md:p-8 [&_summary::-webkit-details-marker]:hidden hover:border-indigo-300 transition-all duration-300">
                                    <summary className="flex cursor-pointer items-center justify-between gap-1.5 font-bold text-slate-900">
                                        <h4 className="text-lg md:text-xl pr-4 tracking-tight leading-snug">{faq.question}</h4>
                                        <span className="shrink-0 rounded-xl bg-slate-50 p-2 text-slate-500 group-open:bg-indigo-600 group-open:text-white transition-all duration-300">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="size-5 md:size-6 transition-transform duration-300 group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </span>
                                    </summary>
                                    <div className="mt-6 leading-relaxed text-slate-600 text-lg border-t border-slate-100 pt-6">
                                        <p>{faq.answer}</p>
                                    </div>
                                </details>
                            ))}
                        </div>
                    </section>

                    {relatedCalculators.length > 0 && (
                        <section className="p-8 md:p-16 bg-slate-50 border border-slate-200 rounded-2xl md:rounded-[3rem]">
                            <h3 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 border-b border-slate-200 pb-6 text-slate-900">Related Strategic Tools</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                                {relatedCalculators.map((calc, idx) => (
                                    <Link key={idx} href={calc.path} className="block group p-6 md:p-8 rounded-2xl md:rounded-3xl bg-white border border-slate-200 hover:bg-slate-100 hover:border-indigo-500 transition-all duration-300 shadow-sm">
                                        <h4 className="font-bold text-xl text-slate-900 group-hover:text-indigo-600 transition mb-3">{calc.name}</h4>
                                        <p className="text-slate-600 leading-relaxed group-hover:text-slate-800 transition text-sm md:text-base">{calc.desc}</p>
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
