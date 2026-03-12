import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Body Type Calculator | Somatotype Classification',
  description: 'Discover your body type (Ectomorph, Mesomorph, or Endomorph) using the Sheldon somatotype classification system.',
  keywords: ['body type calculator', 'somatotype', 'ectomorph', 'mesomorph', 'endomorph', 'body shape'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
