import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: '/probability-calculator/',
  },
  title: "Probability Calculator",
  description:
    "Free online Probability Calculator. Calculate single events, odds, and complex independent multi-event probabilities.",
  keywords: ["probability distribution calculator"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
