import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: '/love-calculator/',
  },
  title: "Love Calculator - Check Your Compatibility Score",
  description:
    "Free online Love Calculator. Find out your compatibility score with your crush using our fun and interactive algorithm.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
