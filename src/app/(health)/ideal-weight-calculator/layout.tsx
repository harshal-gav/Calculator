import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ideal Weight Calculator",
  description:
    "Free online Ideal Weight Calculator. Discover your medically recommended ideal body weight based on multiple popular scientific formulas, including Robinson, Miller, Devine, and Hamwi. Including specialized USA tools like ideal weight calculator.",
  keywords: ["ideal weight calculator"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
