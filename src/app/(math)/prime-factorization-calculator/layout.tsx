import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Prime Factorization Calculator – Find Prime Factors',
    description: 'Free Prime Factorization Calculator. Decompose any integer into a product of its prime factors instantly with this free math tool.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
