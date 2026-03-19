import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/body-surface-area-calculator/',
  },
  title: 'Body Surface Area Calculator (BSA) | Medical Dosage Calculator',
  description: 'Calculate your exact Body Surface Area (BSA) in square meters using the Mosteller and DuBois formulas. Essential for clinical dosing.',
  keywords: ['body surface area calculator', 'bsa calculator', 'mosteller formula', 'dubois formula', 'medical dosage calculator'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
