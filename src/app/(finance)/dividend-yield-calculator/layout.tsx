import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Dividend Yield Calculator',
    description: 'Free online Dividend Yield Calculator. Evaluate the annual return on investment from a company\'s dividend payments relative to its current stock price.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
