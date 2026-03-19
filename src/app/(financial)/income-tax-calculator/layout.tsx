import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/income-tax-calculator/',
  },
  title: 'Income Tax Calculator | Free Online Tax Estimator',
  description: 'Estimate your Federal Income Tax, FICA, and take-home pay with our free online Income Tax Calculator. Updated with 2024 US tax brackets.',
  keywords: ['income tax calculator', 'tax estimator', 'take home pay calculator', 'federal tax calculator', 'irs tax calculator', 'hr block tax calculator'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
