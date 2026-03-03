import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'FHA Loan Calculator | Exact UFMIP & MIP Tool',
    description: 'Calculate accurate FHA mortgage payments, automatically modeling both the Upfront Mortgage Insurance Premium (UFMIP) and Annual MIP layers correctly.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
