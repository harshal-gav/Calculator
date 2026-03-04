import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Complete Triangle Calculator | Solve Area & Angles',
    description: 'Enter three sides of any triangle to instantly calculate area, perimeter, and all three internal angles using Heron’s formula and the Law of Cosines.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
