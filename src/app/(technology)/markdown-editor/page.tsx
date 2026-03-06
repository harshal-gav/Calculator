"use client";

import { useState, useMemo } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

// Extremely basic markdown parser for a completely dependency-free previewer
const parseMarkdown = (md: string) => {
  let html = md;

  // Headings
  html = html.replace(
    /^### (.*$)/gim,
    '<h3 class="text-xl font-bold mt-4 mb-2">$1</h3>',
  );
  html = html.replace(
    /^## (.*$)/gim,
    '<h2 class="text-2xl font-bold mt-6 mb-3 border-b pb-2">$1</h2>',
  );
  html = html.replace(
    /^# (.*$)/gim,
    '<h1 class="text-4xl font-extrabold mt-8 mb-4 border-b pb-2">$1</h1>',
  );

  // Bold & Italic
  html = html.replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>");
  html = html.replace(/\*(.*?)\*/gim, "<em>$1</em>");
  html = html.replace(/__(.*?)__/gim, "<strong>$1</strong>");
  html = html.replace(/_(.*?)_/gim, "<em>$1</em>");

  // Strikethrough
  html = html.replace(/~~(.*?)~~/gim, "<del>$1</del>");

  // Inline Code
  html = html.replace(
    /`(.*?)`/gim,
    '<code class="bg-zinc-200 text-rose-600 px-1 py-0.5 rounded font-mono text-sm">$1</code>',
  );

  // Links
  html = html.replace(
    /\[(.*?)\]\((.*?)\)/gim,
    '<a href="$2" class="text-blue-600 hover:underline" target="_blank">$1</a>',
  );

  // Blockquotes
  html = html.replace(
    /^> (.*$)/gim,
    '<blockquote class="border-l-4 border-zinc-300 pl-4 italic text-zinc-600 my-4">$1</blockquote>',
  );

  // Unordered Lists
  html = html.replace(/^\s*\*(.*$)/gim, '<li class="ml-4 list-disc">$1</li>');
  html = html.replace(/^\s*\-(.*$)/gim, '<li class="ml-4 list-disc">$1</li>');

  // Convert newlines to breaks (very simple approach, usually MD ignores single lines but we want simple live preview)
  html = html.replace(/\n$/gim, "<br />");

  return html;
};

export default function MarkdownEditor() {
  const [markdown, setMarkdown] = useState(
    "# Hello World\n\nWrite your **Markdown** here and see the preview instantly.\n\n## Features\n- Headings\n- *Italics* and **Bold**\n- `Inline Code`\n- [Links](https://example.com)\n- > Blockquotes\n\n*Note: This is a basic raw viewer without heavy dependencies.*",
  );

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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Markdown Editor",
            operatingSystem: "All",
            applicationCategory: "DeveloperApplication",
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title="Markdown Editor & Live Preview"
          whatIsIt={
            <>
              <p>
                The <strong>Markdown Editor</strong> provides a real-time,
                side-by-side workspace to write standard plain-text Markdown and
                instantly visualize exactly how it will render as formatted HTML
                on the web.
              </p>
              <p>
                Markdown is the undisputed standard for writing on the internet.
                Instead of clicking cumbersome buttons for bolding or headers
                (like in Microsoft Word), you simply add lightweight punctuation
                marks to your text. It is fast, platform-independent, and
                developer-friendly.
              </p>
            </>
          }
          formula={
            <>
              <p>
                Markdown strictly avoids complex tags in favor of intuitive,
                visual syntax that can be read even in its completely raw state:
              </p>
              <div className="bg-violet-50 p-4 rounded-lg font-mono text-[14px] shadow-sm my-4 text-violet-900 border border-violet-100 flex flex-col gap-2">
                <div># H1 Main Header</div>
                <div>## H2 Sub-header</div>
                <div>**Bold Text** and *Italic Text*</div>
                <div>- Unordered List Item</div>
                <div>1. Ordered List Item</div>
                <div>[Link Text](https://example.com)</div>
              </div>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                <li>
                  <strong>Zero Lock-in:</strong> Because Markdown is just pure
                  text, a file created in 2004 will open perfectly in any editor
                  built in 2040. proprietary formats like .docx do not have this
                  guarantee.
                </li>
                <li>
                  <strong>HTML Conversion:</strong> Under the hood, parsers
                  instantly strip the asterisks and hashes and silently convert
                  them into standard HTML <code>&lt;strong&gt;</code> and{" "}
                  <code>&lt;h1&gt;</code> tags.
                </li>
              </ul>
            </>
          }
          example={
            <>
              <p>
                You need to write documentation for a new open-source project on
                GitHub (a README.md file). You want a professional layout but
                don't want to code raw HTML.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                <li>
                  <strong>The Input:</strong> You type{" "}
                  <code>`console.log("Hello")`</code> on the left side of the
                  editor.
                </li>
                <li>
                  <strong>The Output:</strong> Almost instantly, the right side
                  of the screen renders it as a distinct, colored block of
                  inline code, exactly as it will appear on GitHub or Slack.
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-gray-700">
              <li>
                <strong>Software Documentation:</strong> Nearly every major
                software explicitly requires a `README.md` file. Developers use
                live editors to ensure their complex code blocks and tables
                format correctly before publishing.
              </li>
              <li>
                <strong>Blogging (Static Sites):</strong> Modern web publishing
                platforms (like Hugo, Next.js, or Ghost) use pure Markdown files
                for all their articles instead of storing HTML in heavy
                databases.
              </li>
              <li>
                <strong>Note Taking apps:</strong> Obsidian, Notion, and Roam
                Research all natively utilize Markdown syntax to allow users
                perfectly seamless, keyboard-only deep formatting.
              </li>
            </ul>
          }
          faqs={[
            {
              question:
                "Is there an official, universal standard for Markdown?",
              answer:
                "Yes and No. John Gruber created the original specification in 2004, but it was heavily limited. 'CommonMark' is the attempt to standardize it, while 'GitHub Flavored Markdown (GFM)' is the most widely used extension that adds support for things like tables and task lists.",
            },
            {
              question: "Can I just put standard HTML inside a Markdown file?",
              answer:
                "Absolutely. Standard Markdown allows you to drop literal raw HTML anywhere inside the document (like an iframe or a complex div), and the parser will simply pass it straight through to the final output.",
            },
            {
              question:
                "Why not just use a standard WYSIWYG editor like Word/Docs?",
              answer:
                "Speed and portability. You never have your hands leave the keyboard to use your mouse. Furthermore, Word documents inject thousands of lines of hidden XML garbage into the background; Markdown is 100% clean text.",
            },
          ]}
          relatedCalculators={[
            {
              name: "Diff Checker",
              path: "/diff-checker",
              desc: "Compare two massive versions of your documentation file to identify changes.",
            },
            {
              name: "JSON Validator",
              path: "/json-validator",
              desc: "Ensure your front-matter metadata configuration is structurally valid.",
            },
            {
              name: "Word Count Calculator",
              path: "/word-count-calculator",
              desc: "Analyze the exact length, density, and reading time of your written article.",
            },
          ]}
        />
      </div>
    </div>
  );
}
