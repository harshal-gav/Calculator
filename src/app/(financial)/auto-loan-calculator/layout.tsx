import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Auto Loan Calculator',
  description: 'Estimate your monthly auto loan payments. Factor in car price, down payment, trade-in value, interest rate, and loan term instantly.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
