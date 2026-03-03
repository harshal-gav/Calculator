import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Cone Volume & Surface Area Calculator',
    description: 'Free online Cone Calculator. Instantly calculate the volume, lateral surface area, total surface area, and slant height of a right circular cone.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
