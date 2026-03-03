import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Interest Rate Calculator | Compound Growth & Yield',
    description: 'Calculate the accurate future value of investments or debt by applying various annual percentage yields (APY) and compounding frequencies.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
