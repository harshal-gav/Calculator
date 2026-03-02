import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Compound Interest Calculator',
    description: 'Free online Compound Interest Calculator. Project future investment growth using recursive compound interest with daily, monthly, or annual frequency.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
