import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'BMI Calculator',
    description: 'Free Body Mass Index calculator gives out the BMI value and categorizes BMI based on provided information from WHO and CDC for both adults and children.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
