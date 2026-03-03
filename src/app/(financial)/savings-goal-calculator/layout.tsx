import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Savings Goal Calculator – Time to Reach Goal',
    description: 'Free Savings Goal Calculator. Find out exactly how many months and years it will take to reach your target savings balance.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
