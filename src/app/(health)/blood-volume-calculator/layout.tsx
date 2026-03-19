import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: '/blood-volume-calculator/',
  },
  title: "Blood Volume Calculator – Estimate Total Liters",
  description:
    "Free Blood Volume Calculator. Estimate your total blood volume in liters and milliliters using the Nadler and Lemmens medical formulas.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
