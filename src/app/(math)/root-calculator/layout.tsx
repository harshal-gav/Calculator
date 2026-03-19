import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/root-calculator/',
  },
  title: 'Root Calculator | Square, Cube, and Nth Root',
  description: 'Calculate the specific Nth root of any real number. Instantly solves square roots (2nd), cube roots (3rd), or any custom polynomial sequence.',
  keywords: ['root calculator', 'square root calculator', 'cube root calculator', 'nth root calculator', 'math root finder'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
