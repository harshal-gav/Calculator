import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: '/mortgage-payoff-calculator/',
  },
  title: "Mortgage Payoff Calculator – Calculate Extra Payments",
  description:
    "Free Mortgage Payoff Calculator. Discover how much time and interest you can save by making extra monthly payments toward your mortgage principal. Including specialized USA tools like mortgage payoff calculator.",
  keywords: ["mortgage payoff calculator"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
