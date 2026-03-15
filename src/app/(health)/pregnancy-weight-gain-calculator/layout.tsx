import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pregnancy Weight Gain Calculator | IOM Guidelines',
  description: 'Calculate recommended pregnancy weight gain based on pre-pregnancy BMI using IOM guidelines.',
  keywords: ['pregnancy weight gain calculator', 'gestational weight gain', 'IOM pregnancy guidelines'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
