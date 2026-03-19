import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/estate-tax-calculator/',
  },
  title: 'Estate Tax Calculator | Federal Exemption Estimator',
  description: 'Calculate your potential federal estate tax liability. Instantly see how the current federal exemption applies to your net worth and marital status.',
  keywords: ['estate tax calculator', 'federal estate tax', 'death tax calculator', 'inheritance tax estimator', 'estate exemption 2024'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
