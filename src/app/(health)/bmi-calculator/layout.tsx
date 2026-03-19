import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/bmi-calculator/',
  },
  title: 'BMI Calculator | Body Mass Index for Men & Women',
  description: 'Calculate your Body Mass Index (BMI) to see if you are underweight, normal weight, overweight, or obese based on your height and weight.',
  keywords: ['bmi calculator', 'body mass index calculator', 'bmi formula', 'healthy bmi range', 'check bmi'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
