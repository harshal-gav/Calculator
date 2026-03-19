import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: '/due-date-calculator/',
  },
  title: "Due Date Calculator | Pregnancy Timeline Estimates",
  description:
    "Calculate your exact baby due date, current gestational age, and personalized pregnancy timeline milestones using medical formulas.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
