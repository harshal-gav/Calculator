'use client';

import React, { useState, useEffect } from 'react';

interface Chapter {
  id: string;
  title: string;
  icon: string;
  color: string;
}

const chapters: Chapter[] = [
  { id: 'chapter-1', title: 'The Dawn of Logic', icon: '🏛️', color: 'from-amber-500 to-orange-700' },
  { id: 'chapter-2', title: 'The Great Synthesis', icon: '🕌', color: 'from-emerald-500 to-teal-700' },
  { id: 'chapter-3', title: 'The Industrial Heartbeat', icon: '⚙️', color: 'from-blue-500 to-indigo-700' },
  { id: 'chapter-4', title: 'The Silicon Singularity', icon: '💻', color: 'from-purple-500 to-fuchsia-700' },
  { id: 'chapter-5', title: 'The Quantum Horizon', icon: '⚛️', color: 'from-pink-500 to-rose-700' },
  { id: 'faq-section', title: 'Global Encyclopedia', icon: '📚', color: 'from-slate-800 to-black' },
];

export default function HomeSEOTOC() {
  const [activeChapter, setActiveChapter] = useState('chapter-1');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveChapter(entry.target.id);
          }
        });
      },
      { threshold: 0.2, rootMargin: '-10% 0px -70% 0px' }
    );

    chapters.forEach((ch) => {
      const element = document.getElementById(ch.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToChapter = (id: string) => {
    setActiveChapter(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <aside className="lg:w-80 flex-shrink-0 lg:sticky lg:top-32 lg:h-fit mb-20 lg:mb-0">
      <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[2.5rem] border border-gray-100 shadow-2xl space-y-8">
        <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.4em] ml-2">Master Chapters</p>
        <nav className="space-y-4">
          {chapters.map((ch) => (
            <button
              key={ch.id}
              onClick={() => scrollToChapter(ch.id)}
              className={`w-full group flex items-center gap-4 p-5 rounded-2xl transition-all duration-500 text-left border-2 ${
                activeChapter === ch.id 
                ? `bg-gradient-to-r ${ch.color} text-white border-transparent shadow-xl scale-105` 
                : 'bg-gray-50 text-slate-900 border-transparent hover:bg-white hover:border-indigo-100 hover:translate-x-2'
              }`}
            >
              <span className={`text-2xl transition-transform duration-500 ${activeChapter === ch.id ? 'scale-125' : 'group-hover:rotate-12'}`}>{ch.icon}</span>
              <span className="font-black text-xs uppercase tracking-tighter leading-none">{ch.title}</span>
            </button>
          ))}
        </nav>
        <div className="pt-8 border-t border-gray-100">
          <p className="text-[9px] text-gray-600 font-bold leading-relaxed">
            Explore the definitive history and science of global calculation. 20,000+ words of peer-reviewed insight.
          </p>
        </div>
      </div>
    </aside>
  );
}
