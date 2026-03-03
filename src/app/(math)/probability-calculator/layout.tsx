import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Probability Calculator',
    description: 'Free online Probability Calculator. Calculate single events, odds, and complex independent multi-event probabilities.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
