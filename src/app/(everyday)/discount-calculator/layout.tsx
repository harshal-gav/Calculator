import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Discount Calculator | Calculate Stacked Retail Savings',
    description: 'Calculate final out-of-pocket costs and total dollars saved during retail sales. Easily handle complex stacked discounts and clearance coupons.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
