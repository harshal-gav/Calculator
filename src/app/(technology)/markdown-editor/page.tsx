'use client';

import { useState, useMemo } from 'react';

// Extremely basic markdown parser for a completely dependency-free previewer
const parseMarkdown = (md: string) => {
    let html = md;

    // Headings
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mt-4 mb-2">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-6 mb-3 border-b pb-2">$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-4xl font-extrabold mt-8 mb-4 border-b pb-2">$1</h1>');

    // Bold & Italic
    html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>');
    html = html.replace(/__(.*?)__/gim, '<strong>$1</strong>');
    html = html.replace(/_(.*?)_/gim, '<em>$1</em>');

    // Strikethrough
    html = html.replace(/~~(.*?)~~/gim, '<del>$1</del>');

    // Inline Code
    html = html.replace(/`(.*?)`/gim, '<code class="bg-zinc-200 text-rose-600 px-1 py-0.5 rounded font-mono text-sm">$1</code>');

    // Links
    html = html.replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" class="text-blue-600 hover:underline" target="_blank">$1</a>');

    // Blockquotes
    html = html.replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-zinc-300 pl-4 italic text-zinc-600 my-4">$1</blockquote>');

    // Unordered Lists
    html = html.replace(/^\s*\*(.*$)/gim, '<li class="ml-4 list-disc">$1</li>');
    html = html.replace(/^\s*\-(.*$)/gim, '<li class="ml-4 list-disc">$1</li>');

    // Convert newlines to breaks (very simple approach, usually MD ignores single lines but we want simple live preview)
    html = html.replace(/\n$/gim, '<br />');

    return html;
};

export default function MarkdownEditor() {
    const [markdown, setMarkdown] = useState('# Hello World\n\nWrite your **Markdown** here and see the preview instantly.\n\n## Features\n- Headings\n- *Italics* and **Bold**\n- `Inline Code`\n- [Links](https://example.com)\n- > Blockquotes\n\n*Note: This is a basic raw viewer without heavy dependencies.*');

    const htmlOutput = useMemo(() => parseMarkdown(markdown), [markdown]);

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-violet-900 flex items-center justify-center font-sans">
                    <span className="mr-3">📝</span> Markdown Editor
                </h1>
                <p className="text-violet-700 text-lg max-w-2xl mx-auto">
                    A lightweight, real-time Markdown editor and previewer.
                </p>
            </div>

            <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-zinc-200 mb-8 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-px bg-zinc-200">

                {/* Editor */}
                <div className="bg-white flex flex-col min-h-[600px]">
                    <div className="p-3 bg-zinc-100 border-b border-zinc-200 font-bold uppercase text-xs tracking-widest text-zinc-500">
                        Markdown Input
                    </div>
                    <textarea
                        value={markdown}
                        onChange={(e) => setMarkdown(e.target.value)}
                        className="w-full flex-1 p-6 font-medium font-mono text-sm transition-all outline-none resize-none leading-relaxed text-zinc-800 bg-zinc-50 focus:bg-white"
                        placeholder="# Write markdown here..."
                        spellCheck="false"
                    />
                </div>

                {/* Preview */}
                <div className="bg-white flex flex-col min-h-[600px]">
                    <div className="p-3 bg-zinc-100 border-b border-zinc-200 font-bold uppercase text-xs tracking-widest text-zinc-500">
                        Live Preview
                    </div>
                    <div
                        className="flex-1 p-6 prose max-w-none overflow-y-auto"
                        dangerouslySetInnerHTML={{ __html: htmlOutput }}
                    />
                </div>

            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "Markdown Editor", "operatingSystem": "All", "applicationCategory": "DeveloperApplication" }) }} />
        </div>
    );
}
