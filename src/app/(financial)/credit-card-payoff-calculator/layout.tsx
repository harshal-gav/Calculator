import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Credit Card Payoff Calculator – Debt Free Strategy",
  description:
    "Free Credit Card Payoff Calculator. Determine exactly how long it takes to pay off your balance and how much interest you will owe. Including specialized USA tools like credit card payoff calculator.",
  keywords: ["credit card payoff calculator"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
