import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Distance Calculator | 2D Coordinate Point Lengths',
    description: 'Calculate the exact straight-line distance between two points on an x,y coordinate plane. Step-by-step solutions using the Euclidean distance formula.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
