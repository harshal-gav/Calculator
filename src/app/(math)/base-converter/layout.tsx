import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Base Converter | Decimal, Binary, Octal, Hexadecimal',
    description: 'Instantly convert numbers between Base-10 (Decimal), Base-2 (Binary), Base-8 (Octal), and Base-16 (Hexadecimal) formats.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
