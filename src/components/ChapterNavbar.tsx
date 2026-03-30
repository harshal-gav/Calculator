"use client";

import React from 'react';
import Link from 'next/link';

const ChapterNavbar = () => {
  const chapters = [
    { id: 'chapter-1', title: 'Logic', icon: '🏛️', color: 'from-amber-400 to-orange-600' },
    { id: 'chapter-2', title: 'Synthesis', icon: '🕌', color: 'from-emerald-400 to-teal-600' },
    { id: 'chapter-3', title: 'Industrial', icon: '⚙️', color: 'from-blue-400 to-indigo-600' },
    { id: 'chapter-4', title: 'Silicon', icon: '💻', color: 'from-purple-400 to-fuchsia-600' },
    { id: 'chapter-5', title: 'Quantum', icon: '⚛️', color: 'from-pink-400 to-rose-600' },
    { id: 'faq-section', title: 'Encyclopedia', icon: '📚', color: 'from-slate-700 to-slate-900' },
  ];

  return (
    <div className="bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-16 z-40 transition-all duration-300" style={{ transform: 'translateZ(0)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between overflow-x-auto no-scrollbar py-4 gap-4">
          <div className="flex-shrink-0 flex items-center gap-2">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest hidden sm:block">Master Chapters</span>
            <div className="h-4 w-px bg-gray-200 hidden sm:block mx-2"></div>
          </div>
          
          <div className="flex items-center gap-3 sm:gap-6">
            {chapters.map((ch) => (
              <button
                key={ch.id}
                onClick={() => {
                  document.getElementById(ch.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group flex items-center gap-2 whitespace-nowrap transition-all hover:scale-105 active:scale-95"
              >
                <span className={`text-lg sm:text-xl group-hover:rotate-12 transition-transform duration-300`}>{ch.icon}</span>
                <span className="text-[10px] sm:text-xs font-bold text-gray-600 group-hover:text-indigo-600 uppercase tracking-wider">{ch.title}</span>
              </button>
            ))}
          </div>

          <div className="flex-shrink-0 flex items-center gap-2 ml-4">
            <div className="h-4 w-px bg-gray-200 hidden lg:block mr-2"></div>
            <span className="text-[9px] font-black text-indigo-500 uppercase tracking-[0.3em] hidden lg:block">20k+ Word Manifesto</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterNavbar;
