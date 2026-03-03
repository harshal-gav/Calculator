import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'ROE Calculator',
    description: 'Free online Return on Equity (ROE) Calculator. Evaluate how efficiently a company generates profits from shareholder capital.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
