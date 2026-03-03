import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Regular Polygon Calculator | Area, Perimeter & Radii',
    description: 'Free online Regular Polygon Calculator. Calculate area, perimeter, internal angles, inradius, and circumradius for any regular polygon.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
