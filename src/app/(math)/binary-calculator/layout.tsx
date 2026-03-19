import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: '/binary-calculator/',
  },
  title: "Binary Calculator | Compute 1s and 0s",
  description:
    "Free online Binary Calculator. Perform mathematical addition, subtraction, division, and logic tests on Base-2 binary numbers. Including specialized USA tools like binary calculator.",
  keywords: [
    "binary calculator",
    "binary subtraction calculator",
    "binary addition calculator",
    "decimal to hexadecimal converter",
    "hexadecimal calculator",
    "2's complement calculator",
    "2s complement calculator",
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
