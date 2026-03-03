import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Vector Addition Calculator | Resultant Magnitude & Direction',
    description: 'Calculate the resultant magnitude and direction of two vectors added together. Complete with Cartesian component breakdown (Rx, Ry).',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
