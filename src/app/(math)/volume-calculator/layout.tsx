import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Volume Calculator',
    description: 'Free online volume calculator. Quickly calculate the volume of cubes, cylinders, cones, spheres, and rectangular prisms.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
