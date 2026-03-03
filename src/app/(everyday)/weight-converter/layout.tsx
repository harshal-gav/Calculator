import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Weight Converter',
    description: 'Free online Weight and Mass Converter. Convert accurately between kilograms, pounds, ounces, grams, tons, and stones.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
