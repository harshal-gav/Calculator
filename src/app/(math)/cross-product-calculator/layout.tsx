import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Cross Product Calculator | 3D Vector Multiplication',
    description: 'Calculate the cross product of two 3D vectors. Instantly find the resultant vector (w), Cartesian components (i, j, k), and magnitude.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
