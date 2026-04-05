'use client';

import React, { useState } from 'react';

interface ExpandableSectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  maxHeight?: string;
  buttonText: string;
  activeColor: string;
}

export default function ExpandableSection({ 
  id, 
  children, 
  maxHeight = '800px', 
  buttonText,
  activeColor
}: ExpandableSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div id={id} className="scroll-mt-32 space-y-16">
      <div className="prose prose-xl max-w-none text-slate-700 leading-loose space-y-10 relative text-justify">
        <div 
          className={`space-y-10 transition-all duration-700 overflow-hidden ${
            isExpanded ? 'max-h-[none] opacity-100' : `max-h-[${maxHeight}] mask-fade`
          }`}
          style={{ maxHeight: isExpanded ? 'none' : maxHeight }}
        >
          {children}
        </div>

        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className={`mt-8 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest hover:${activeColor} transition-colors shadow-xl`}
        >
          {isExpanded ? 'Show Less' : buttonText}
        </button>
      </div>
    </div>
  );
}
