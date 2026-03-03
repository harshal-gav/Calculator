import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Rent Affordability Calculator | 30% Rule & 40x Rule',
    description: 'Find out exactly how much apartment rent you can afford based on the landlord 40x gross income rule and your current debt-to-income (DTI) ratio.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
