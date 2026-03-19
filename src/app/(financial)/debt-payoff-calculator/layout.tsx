import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: '/debt-payoff-calculator/',
  },
  title: "Debt Payoff Calculator | Avalanche & Snowball Strategy",
  description:
    "Calculate exactly how many months it will take to become totally debt-free and understand the true cost of interest based on your monthly payment. Including specialized USA tools like debt payoff calculator.",
  keywords: ["debt payoff calculator", "debt calculator", "debt ratio formula"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
