import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cash Back vs Low Interest Calculator | Car Finance',
  description: 'Compare taking a dealer cash rebate vs 0% or low APR financing. Find out which auto loan option saves you the most money overall.',
  keywords: ['cash back vs low interest calculator', 'rebate or low apr', 'auto loan calculator', '0 apr vs cash back', 'car finance comparison'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
