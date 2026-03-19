import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: '/auto-lease-calculator/',
  },
  title: "Auto Lease Calculator",
  description:
    "Free online Auto Lease Calculator. Calculate your exact monthly car lease payment including depreciation, rent charges, and sales tax based on MSRP and Money Factor.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
