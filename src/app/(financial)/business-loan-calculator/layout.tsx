import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Business Loan Calculator | Estimate Monthly Payments & APR',
  description: 'Calculate your true business loan costs including origination fees, interest rates, and effective APR. Perfect for SBA loans and commercial financing.',
  keywords: ['business loan calculator', 'commercial loan calculator', 'sba loan calculator', 'business financing costs', 'effective apr calculator'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
