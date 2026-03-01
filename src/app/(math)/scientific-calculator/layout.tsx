import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Scientific Calculator',
    description: 'Free online scientific calculator with advanced features like trigonometric functions, logarithms, and more.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
