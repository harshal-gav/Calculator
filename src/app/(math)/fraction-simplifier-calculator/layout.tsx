import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Fraction Simplifier | Reduce Fractions to Lowest Terms',
    description: 'Instantly reduce any complex mathematical fraction to its lowest terms. Automatically converts improper fractions into clean mixed numbers.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
