import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'GCF Calculator',
    description: 'Free online Greatest Common Factor (GCF / HCF) Calculator. Calculate the largest common divisor of two or more numbers.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
