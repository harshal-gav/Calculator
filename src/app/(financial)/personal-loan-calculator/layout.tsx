import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Personal Loan Calculator | Monthly Payment Estimator',
  description: 'Calculate your exact monthly payments for any unsecured personal loan. See total interest paid and your full payoff schedule.',
  keywords: ['personal loan calculator', 'loan calculator online', 'unsecured loan calculator', 'monthly payment calculator personal loan'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
