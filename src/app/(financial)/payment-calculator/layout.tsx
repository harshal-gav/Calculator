import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Payment Calculator',
  description: 'Calculate exact monthly payments for any fixed-term loan including personal loans, student loans, and business financing.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
