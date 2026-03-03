import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Octagon Calculator – Core Geometric Properties',
    description: 'Free Octagon Calculator. Calculate the core geometric properties like area, perimeter, and radii of a regular octagon instantly.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
