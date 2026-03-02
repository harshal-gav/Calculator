import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Amortization Calculator',
  description: 'Generate a complete amortization schedule. See exactly how much of your monthly payment goes to principal versus interest over time.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
