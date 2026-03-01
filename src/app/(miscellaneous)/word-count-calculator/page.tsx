'use client';

import { useState, useEffect, useRef } from 'react';

export default function WordCountCalculator() {
    const [text, setText] = useState('');
    const [stats, setStats] = useState({
        words: 0,
        characters: 0,
        charactersNoSpaces: 0,
        sentences: 0,
        paragraphs: 0,
        readingTime: 0,
        speakingTime: 0
    });

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        analyzeText();
    }, [text]);

    const analyzeText = () => {
        const trimmed = text.trim();

        if (!trimmed) {
            setStats({
                words: 0,
                characters: 0,
                charactersNoSpaces: 0,
                sentences: 0,
                paragraphs: 0,
                readingTime: 0,
                speakingTime: 0
            });
            return;
        }

        // Use regex to find words (handling hyphenated words, ignoring punctuation acting as standalone items)
        const wordMatch = trimmed.match(/\\b[-?(\\w+)?]+\\b/gi);
        const words = wordMatch ? wordMatch.length : 0;

        const characters = text.length;
        const charactersNoSpaces = text.replace(/\\s+/g, '').length;

        // Approximate sentences using punctuation marks
        const sentenceMatch = trimmed.match(/[^.!?]+[.!?]+/gi);
        // Fallback: if there's text but no punctuation marks, it's at least 1 sentence
        const sentences = sentenceMatch ? sentenceMatch.length : (trimmed.length > 0 ? 1 : 0);

        // Paragraphs split by 1 or more newlines
        const paragraphs = trimmed.split(/\\n+/).filter(p => p.trim().length > 0).length;

        // Avg reading speed: 238 words per minute
        const readingTime = Math.ceil(words / 238);

        // Avg speaking speed: 130 words per minute
        const speakingTime = Math.ceil(words / 130);

        setStats({
            words,
            characters,
            charactersNoSpaces,
            sentences,
            paragraphs,
            readingTime,
            speakingTime
        });
    };

    const handleClear = () => {
        setText('');
        if (textareaRef.current) {
            textareaRef.current.focus();
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-xl shadow-lg border border-zinc-200">
            <h1 className="text-4xl font-extrabold mb-4 text-rose-700 border-b pb-4 flex items-center">
                <span className="mr-3">📝</span> Word Count Calculator
            </h1>
            <p className="mb-8 text-zinc-600 text-lg">
                Instantly track words, characters, sentences, and estimated reading time as you type or paste text.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

                {/* Text Input Area */}
                <div className="lg:col-span-3 space-y-4 shadow-sm border border-zinc-200 rounded-xl bg-white overflow-hidden flex flex-col">
                    <div className="bg-zinc-100 p-3 border-b border-zinc-200 flex justify-between items-center">
                        <div className="flex space-x-2">
                            <div className="w-3 h-3 rounded-full bg-red-400"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                            <div className="w-3 h-3 rounded-full bg-green-400"></div>
                        </div>
                        <button
                            onClick={handleClear}
                            className="text-xs font-bold uppercase tracking-wider text-zinc-500 hover:text-rose-600 transition-colors bg-white px-3 py-1 rounded shadow-sm border border-zinc-200"
                        >
                            Clear Text
                        </button>
                    </div>

                    <textarea
                        ref={textareaRef}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Start typing, or paste your document here..."
                        className="w-full flex-grow min-h-[400px] p-6 text-lg text-zinc-800 outline-none resize-y font-serif leading-relaxed"
                        spellCheck="false"
                    />
                </div>

                {/* Stats Panel */}
                <div className="lg:col-span-1 space-y-4">
                    <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-rose-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150"></div>
                        <div className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-1 relative z-10">Words</div>
                        <div className="text-4xl font-black text-rose-600 relative z-10">{stats.words.toLocaleString()}</div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
                        <div className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-1">Characters</div>
                        <div className="text-3xl font-black text-zinc-800">{stats.characters.toLocaleString()}</div>
                        <div className="text-xs text-zinc-400 mt-2 font-mono">({stats.charactersNoSpaces.toLocaleString()} without spaces)</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-xl border border-zinc-200 shadow-sm text-center">
                            <div className="text-2xl font-black text-zinc-800">{stats.sentences.toLocaleString()}</div>
                            <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">Sentences</div>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-zinc-200 shadow-sm text-center">
                            <div className="text-2xl font-black text-zinc-800">{stats.paragraphs.toLocaleString()}</div>
                            <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">Paragraphs</div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-rose-500 to-pink-600 p-6 rounded-xl border border-rose-600 shadow-md text-white mt-8">
                        <h3 className="font-bold uppercase tracking-widest text-xs mb-4 border-b border-rose-400 pb-2 text-rose-100">Estimated Times</h3>

                        <div className="flex justify-between items-end mb-4">
                            <div>
                                <div className="text-[10px] uppercase font-bold text-rose-200 tracking-wider mb-1">Reading Time</div>
                                <div className="text-2xl font-black">
                                    {stats.readingTime} <span className="text-sm font-medium opacity-80 uppercase tracking-wider">min</span>
                                </div>
                            </div>
                            <div className="text-rose-200 opacity-50">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                        </div>

                        <div className="flex justify-between items-end">
                            <div>
                                <div className="text-[10px] uppercase font-bold text-rose-200 tracking-wider mb-1">Speaking Time</div>
                                <div className="text-2xl font-black">
                                    {stats.speakingTime} <span className="text-sm font-medium opacity-80 uppercase tracking-wider">min</span>
                                </div>
                            </div>
                            <div className="text-rose-200 opacity-50">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Word Count Calculator", "operatingSystem": "All", "applicationCategory": "UtilitiesApplication" }) }} />
        </div>
    );
}
