import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Hex Calculator | Hexadecimal Math',
    description: 'Free online Hexadecimal Calculator. Add, subtract, multiply, divide, and perform bitwise operations on base-16 hex numbers.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
