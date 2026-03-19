import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/gfr-calculator/',
  },
  title: 'GFR Calculator | Kidney Function & Glomerular Filtration Rate',
  description: 'Calculate glomerular filtration rate (GFR) using the CKD-EPI equation to assess kidney function.',
  keywords: ['GFR calculator', 'kidney function calculator', 'glomerular filtration rate', 'CKD calculator'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
