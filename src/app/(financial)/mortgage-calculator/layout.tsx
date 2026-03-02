import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mortgage Calculator',
  description: 'Calculate your monthly mortgage payments precisely. Our free mortgage calculator includes principal, interest, property taxes, home insurance, and HOA fees.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
