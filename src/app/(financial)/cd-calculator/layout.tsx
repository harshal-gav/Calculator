import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/cd-calculator/',
  },
  title: 'CD Calculator | Certificate of Deposit Growth',
  description: 'Calculate the future value of a Certificate of Deposit (CD). Compare standard savings against fixed-rate CD yields with annual compounding.',
  keywords: ['cd calculator', 'certificate of deposit', 'fixed deposit calculator', 'apy calculator', 'savings yield tool'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
