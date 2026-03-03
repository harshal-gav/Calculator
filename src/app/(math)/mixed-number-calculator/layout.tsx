import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Mixed Number Calculator | Convert & Decimal Equivalents',
    description: 'Convert mixed numbers (whole number + fraction) into improper fractions and decimals instantly. Perfect for algebra, recipes, and construction.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
