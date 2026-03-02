import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Net Worth Calculator',
    description: 'Free online Net Worth Calculator. Track your financial health by calculating your total assets (what you own) minus your total liabilities (what you owe).',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
