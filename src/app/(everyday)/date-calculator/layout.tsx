import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Date Calculator',
    description: 'Free online Date Calculator. Discover the exact duration between two dates, or add/subtract days, weeks, and months from a specific date.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
