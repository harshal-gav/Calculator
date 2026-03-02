import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Fraction Calculator',
    description: 'Free online fraction calculator. Add, subtract, multiply, divide, and simplify fractions effortlessly with step-by-step results.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
