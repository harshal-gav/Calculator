import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Retirement Calculator – Nest Egg Planner",
  description:
    "Free Retirement Calculator. Project your nest egg, test the 4% rule, and evaluate if you have enough savings to retire comfortably. Including specialized USA tools like retirement calculator, roth ira calculator, pension calculator.",
  keywords: [
    "retirement calculator",
    "roth ira calculator",
    "pension calculator",
    "401k calculator",
    "ira calculator",
    "retirement savings calculator",
    "social security calculator",
    "social security benefits calculator",
    "retirement income calculator",
    "social security retirement calculator",
    "social security estimator",
    "fers retirement calculator",
    "social security cola 2023 calculator",
    "retirement withdrawal calculator",
    "military retirement calculator",
    "tsp calculator",
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
