import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/apr-calculator/',
  },
  title: 'APR Calculator | Loan Fee & Interest Analysis',
  description: 'Calculate the true cost of borrowing. Find your effective Annual Percentage Rate (APR) by accounting for origination fees and closing costs.',
  keywords: ['apr calculator', 'effective interest rate', 'loan fees', 'mortgage apr', 'borrowing cost tool'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
