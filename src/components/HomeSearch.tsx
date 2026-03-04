'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';

interface Calculator {
    name: string;
    path: string;
    desc: string;
}

interface Category {
    name: string;
    calculators: Calculator[];
}

export default function HomeSearch({ categories }: { categories: Category[] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsClient(true);
    }, []);

    const filteredCategories = useMemo(() => {
        if (!searchTerm) return categories;

        const lowerSearch = searchTerm.toLowerCase();

        return categories.map(cat => {
            // Check if category name matches
            if (cat.name.toLowerCase().includes(lowerSearch)) {
                return cat;
            }

            // Filter calculators inside category
            const filteredCalcs = cat.calculators.filter(
                c => c.name.toLowerCase().includes(lowerSearch) || c.desc.toLowerCase().includes(lowerSearch)
            );

            return {
                ...cat,
                calculators: filteredCalcs
            };
        }).filter(cat => cat.calculators.length > 0);
    }, [searchTerm, categories]);

    // Don't render interactive bits until client-side hydration is complete
    // to avoid potential mismatch issues with Next.js specific logic
    if (!isClient) return null;

    return (
        <div className="w-full">
            {/* Search Bar */}
            <div className="max-w-4xl mx-auto mb-16 px-4">
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="h-6 w-6 text-gray-400 group-focus-within:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        type="search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="block w-full pl-12 pr-4 py-4 rounded-full border-2 border-gray-200 focus:ring-0 focus:border-blue-500 bg-white text-lg shadow-sm focus:shadow-md transition-all outline-none text-gray-800 placeholder-gray-400"
                        placeholder="Search for any calculator (e.g., 'BMI', 'Mortgage', 'Volume')..."
                    />
                </div>
            </div>

            {/* No Results Fallback */}
            {filteredCategories.length === 0 && (
                <div className="text-center py-20 bg-gray-50 rounded-2xl mx-4 shadow-inner border border-gray-200">
                    <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-xl font-bold text-gray-700">No calculators found</h3>
                    <p className="text-gray-500 mt-2">Try adjusting your search terms or browsing the categories below.</p>
                    <button
                        onClick={() => setSearchTerm('')}
                        className="mt-6 text-blue-600 font-semibold hover:text-blue-800 focus:outline-none underline"
                    >
                        Clear Search
                    </button>
                </div>
            )}

            {/* Responsive Masonry / Stack Layout */}
            <div className="px-4">
                {filteredCategories.map((cat) => (
                    <div key={cat.name} id={cat.name.split(' ')[0].toLowerCase()} className="mb-12 scroll-mt-24">
                        <h2 className="text-3xl font-bold text-gray-900 border-b-2 border-slate-100 pb-4 mb-6 flex items-center">
                            <span className="w-2 h-8 bg-blue-600 rounded-r-full mr-3 inline-block"></span>
                            {cat.name}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                            {cat.calculators.map((calc) => (
                                <Link
                                    href={calc.path}
                                    key={calc.name}
                                    className="group bg-white p-5 rounded-xl border border-gray-200 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex flex-col h-full shadow-sm hover:shadow-lg transition-all transform hover:-translate-y-1"
                                >
                                    <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 mb-2 transition-colors flex items-start justify-between">
                                        {calc.name}
                                        <svg className="w-5 h-5 text-gray-300 group-hover:text-blue-500 transition-colors shrink-0 mt-0.5 ml-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </h3>
                                    <p className="text-sm text-slate-500 leading-relaxed group-hover:text-slate-600 mt-auto">
                                        {calc.desc}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
