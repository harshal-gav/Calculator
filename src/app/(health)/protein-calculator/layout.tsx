import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: '/protein-calculator/',
  },
  title: "Protein Calculator – Daily Grams Needed",
  description:
    "Free Protein Calculator. Determine exactly how many grams of protein you need daily to build muscle, lose fat, or maintain weight. Including specialized USA tools like protein calculator.",
  keywords: ["protein calculator"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
