'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const categories = [
        { name: 'Financial', href: '/#financial' },
        { name: 'Health', href: '/#health' },
        { name: 'Everyday', href: '/#everyday' },
        { name: 'Math', href: '/#math' },
        { name: 'Technology', href: '/#technology' },
        { name: 'Geometry', href: '/#geometry' },
        { name: 'Chemistry', href: '/#chemistry' },
        { name: 'Miscellaneous', href: '/#miscellaneous' },
    ];

    return (
        <nav className="bg-blue-600 text-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="font-bold text-2xl tracking-tight hover:text-blue-100 transition-colors">
                            Calculator All
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
                        {categories.map((category) => (
                            <Link
                                key={category.name}
                                href={category.href}
                                className="hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap"
                            >
                                {category.name}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-blue-700 shadow-inner overflow-hidden transition-all duration-300`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 animate-fadeIn">
                    {categories.map((category) => (
                        <Link
                            key={category.name}
                            href={category.href}
                            onClick={() => setIsOpen(false)}
                            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-800 transition-all duration-200 active:scale-95"
                        >
                            {category.name}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}
