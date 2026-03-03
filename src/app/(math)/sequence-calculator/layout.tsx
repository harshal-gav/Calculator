import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Sequence Calculator | Arithmetic & Geometric Progressions',
    description: 'Find the Nth term and the exact sum of the first N terms for both Arithmetic and Geometric mathematical sequences.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
