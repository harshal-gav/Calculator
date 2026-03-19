import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/lease-calculator/',
  },
  title: 'Lease Calculator | Auto Lease Payment Estimator',
  description: 'Calculate your exact auto lease monthly payment based on MSRP, negotiated price, money factor, and residual value. Avoid dealership tricks.',
  keywords: ['lease calculator', 'auto lease calculator', 'car lease estimator', 'money factor calculator', 'lease payment calculator'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
