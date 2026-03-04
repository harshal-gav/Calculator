import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Midpoint Calculator | Find the Exact Center Coordinate',
    description: 'Instantly locate the perfect mathematical center point situated halfway between any two paired Cartesian coordinates, complete with the step-by-step averaging formula.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
