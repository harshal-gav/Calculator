import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'LCM Calculator',
    description: 'Free online Least Common Multiple (LCM) Calculator. Find the lowest common multiple of two or more numbers instantly.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
