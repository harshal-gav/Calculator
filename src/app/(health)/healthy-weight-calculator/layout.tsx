import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Healthy Weight Calculator | Ideal Body Weight (IBW)',
  description: 'Calculate your true healthy weight range based on your height and gender using scientifically backed formulas.',
  keywords: ['healthy weight calculator', 'ideal body weight calculator', 'ibw calculator', 'healthy bmi range', 'target weight'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
