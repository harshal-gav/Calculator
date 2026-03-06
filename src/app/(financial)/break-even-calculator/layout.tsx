import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Break Even Calculator",
  description:
    "Free online Break Even Calculator. Discover exactly how many units you must sell to cover fixed costs and achieve profitability.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
