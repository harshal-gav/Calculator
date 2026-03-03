import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Word Count Calculator - Text Length & Reading Time',
    description: 'Free online Word Count Calculator. Instantly track words, characters, sentences, paragraphs, and estimated reading time directly in your browser.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
