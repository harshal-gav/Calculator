import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Home Equity Calculator | Calculate HELOC Borrowing Power',
    description: 'Calculate your total home equity and find out your absolute maximum borrowing power for a Home Equity Line of Credit (HELOC) or Home Equity Loan.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
