import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: '/ip-subnet-calculator/',
  },
  title: "IP Subnet Calculator - IPv4 CIDR Network Tool",
  description:
    "Free online IP Subnet Calculator. Easily calculate network boundaries, broadcast addresses, wildcard masks, and usable host ranges using CIDR notation.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
