import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Loan Repayment Calculator | Interest & Payoff Calculator',
  description: 'Calculate loan repayment with extra monthly payments. See total interest and exact payoff date.',
  keywords: ['loan repayment calculator', 'payoff calculator', 'loan payment calculator', 'interest calculator'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
