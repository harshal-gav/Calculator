import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/va-mortgage-calculator/',
  },
  title: 'VA Mortgage Calculator | Veteran Loan Estimator',
  description: 'Calculate monthly payments for VA loans. Includes VA funding fee estimates and 0% down payment analysis specifically for US Veterans.',
  keywords: ['va mortgage calculator', 'veteran loan calculator', 'va funding fee', 'military home loan', '0 down mortgage'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
