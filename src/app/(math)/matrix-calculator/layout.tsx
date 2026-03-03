import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Matrix Calculator – Add, Subtract, Multiply & Determinant',
    description: 'Free Matrix Calculator. Add, subtract, multiply, and find the determinant of 2x2 matrices instantly with step-by-step solutions.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
