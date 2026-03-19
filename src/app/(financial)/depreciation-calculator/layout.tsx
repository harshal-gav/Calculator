import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: '/depreciation-calculator/',
  },
  title: "Depreciation Calculator",
  description:
    "Free online Depreciation Calculator. Generate a full depreciation schedule for business assets using Straight-Line or Double Declining Balance methods.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
