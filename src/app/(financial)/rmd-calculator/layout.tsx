import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RMD Calculator | Required Minimum Distribution 2024',
  description: 'Calculate your exact Required Minimum Distribution (RMD) from your Traditional IRA or 401(k) based on current IRS Uniform Lifetime Tables.',
  keywords: ['rmd calculator', 'required minimum distribution 2024', 'ira withdrawal calculator', '401k rmd'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
