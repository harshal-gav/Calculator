import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Lean Body Mass Calculator | Boer, James & Hume Formulas',
    description: 'Calculate your exact Lean Body Mass (LBM) using scientific formulas. Separate fat weight from muscle weight for precise protein targeting and medication dosing.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
