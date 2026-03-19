import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: '/capm-calculator/',
  },
  title: "CAPM Calculator",
  description:
    "Free online Capital Asset Pricing Model (CAPM) Calculator. Evaluate the expected return on an investment by factoring in the Risk-Free Rate, Beta, and Market Risk Premium.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
