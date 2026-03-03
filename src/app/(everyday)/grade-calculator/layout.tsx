import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Grade Calculator – Final & Current Course Grades',
    description: 'Free online Grade Calculator. Compute your current class grade based on weighted assignments and see what you need on the final exam.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
