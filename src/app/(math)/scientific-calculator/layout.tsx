import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Scientific Calculator | Trigonometric & Logarithmic Math',
    description: 'Solve advanced STEM equations online. Execute trigonometry operations, calculate logarithms, and process exponents with strict order of operations.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
