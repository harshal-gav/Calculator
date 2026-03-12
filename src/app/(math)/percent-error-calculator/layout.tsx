import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Percent Error Calculator | Calculate Experimental Error',
  description: 'Easily calculate the percentage error between your experimental value and the accepted true value with our fast online Percent Error Calculator.',
  keywords: ['percent error calculator', 'experimental error formula', 'percentage error calculator', 'relative error'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
