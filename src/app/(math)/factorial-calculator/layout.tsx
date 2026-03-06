import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Factorial Calculator",
  description:
    "Free online Factorial Calculator. Calculate massive factorials (n!) perfectly using high-precision BigInt math. Including specialized USA tools like factorial calculator.",
  keywords: ["factorial calculator"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
