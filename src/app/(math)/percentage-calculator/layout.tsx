import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: '/percentage-calculator/',
  },
  title: "Percentage Calculator",
  description:
    "Free online percentage calculator simplifies math computation. Includes specialized USA tools like percentage calculator, percent off calculator, weight percentile calculator. 'what is % of",
  keywords: [
    "percentage calculator",
    "percent off calculator",
    "weight percentile calculator",
    "decimal to percent calculator",
    "height percentile calculator",
    "percent change",
    "percent change formula",
    "percent difference",
    "percent difference formula",
    "percent increase",
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
