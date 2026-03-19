import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/number-sequence-calculator/',
  },
  title: 'Number Sequence Calculator | Pattern Finder & Next Term',
  description: 'Analyze number sequences and find patterns. Calculate the next terms in arithmetic, geometric, and Fibonacci sequences.',
  keywords: ['number sequence calculator', 'sequence pattern', 'next term calculator', 'arithmetic sequence', 'geometric sequence'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
