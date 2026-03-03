import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Margin Calculator',
    description: 'Free online margin calculator. Calculate gross profit margin, profit dollars, and compare against markup percentages.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
