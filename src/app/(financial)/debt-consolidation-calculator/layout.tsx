import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/debt-consolidation-calculator/',
  },
  title: 'Debt Consolidation Calculator | Compare Loan Payoff Options',
  description: 'Calculate your massive interest savings and lower your monthly payments by combining multiple high-interest credit cards into one Debt Consolidation Loan.',
  keywords: ['debt consolidation calculator', 'debt payoff calculator', 'credit card consolidation', 'personal loan for debt'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
