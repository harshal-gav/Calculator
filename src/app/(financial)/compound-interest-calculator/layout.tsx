import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: '/compound-interest-calculator/',
  },
  title: "Compound Interest Calculator",
  description:
    "Free online Compound Interest Calculator. Project future investment growth using recursive compound interest with daily, monthly, or annual frequency. Including specialized USA tools like compound interest calculator, apy calculator, compound interest.",
  keywords: [
    "compound interest calculator",
    "apy calculator",
    "compound interest",
    "term deposit calculator",
    "forex compounding calculator",
    "compounding calculator",
    "compound interest formula",
    "daily compound interest calculator",
    "monthly compound interest calculator",
    "power of compounding calculator",
    "compound interest formula calculator",
    "compound annual growth rate",
    "continuous compound interest formula",
    "simple interest and compound interest",
    "cd calculator",
    "cd rate calculator",
    "cd interest calculator",
    "lcd calculator",
    "gcd calculator",
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
