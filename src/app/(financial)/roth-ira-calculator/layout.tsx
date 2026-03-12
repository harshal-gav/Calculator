import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Roth IRA Calculator | Tax-Free Retirement Growth',
  description: 'Project how your Roth IRA will grow over time through tax-free compound interest, and visualize your future retirement wealth.',
  keywords: ['roth ira calculator', 'retirement calculator', 'tax free growth', 'ira compound interest', 'retirement savings calculator'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
