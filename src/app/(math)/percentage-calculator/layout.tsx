import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Percentage Calculator',
    description: 'Free online percentage calculator simplifies math computation. Includes "what is % of", "is what % of", and percentage increase/decrease.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
