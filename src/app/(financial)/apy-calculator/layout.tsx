import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: '/apy-calculator/',
  },
  title: "APY Calculator",
  description:
    "Free online Annual Percentage Yield (APY) Calculator. Calculate the real rate of return earned on an investment taking into account the effect of compounding interest.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
