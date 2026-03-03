import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Sphere Volume & Surface Area Calculator',
    description: 'Free online Sphere Calculator. Instantly calculate the volume, surface area, circumference, and diameter of a perfect sphere given its radius.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
