import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Order of Operations Calculator – Step-by-Step PEMDAS',
    description: 'Free Order of Operations Calculator. Evaluate mathematical expressions step-by-step using PEMDAS/BODMAS rules instantly.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
