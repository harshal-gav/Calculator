import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bond Yield Calculator | Calculate Yield to Maturity (YTM)',
  description: 'Calculate Current Yield and Yield to Maturity (YTM) for municipal, corporate, and government bonds based on their market price and coupon rate.',
  keywords: ['bond yield calculator', 'yield to maturity calculator', 'ytm calculator', 'bond pricing calculator', 'current yield'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
