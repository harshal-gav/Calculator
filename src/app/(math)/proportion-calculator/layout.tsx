import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Proportion Calculator | Solve Ratios & Fractions Instantly',
    description: 'Solve ratio and proportion equations instantly using cross-multiplication. Leave exactly one field blank to calculate its missing value.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
