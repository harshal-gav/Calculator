import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: '/margin-calculator/',
  },
  title: "Margin Calculator",
  description:
    "Free online margin calculator. Calculate gross profit margin, profit dollars, and compare against markup percentages. Including specialized USA tools like margin calculator.",
  keywords: [
    "margin calculator",
    "profit margin calculator",
    "gross margin calculator",
    "omni margin calculator",
    "margin formula",
    "markup formula",
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
