import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Pregnancy Calculator',
    description: 'Free online Pregnancy Calculator. Calculate your estimated due date, conception date, and see your current trimester timeline based on your LMP and cycle length.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
