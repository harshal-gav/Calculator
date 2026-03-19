import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: '/tip-splitting-calculator/',
  },
  title: "Tip & Bill Splitting Calculator",
  description:
    "Free Tip Splitting Calculator. Quickly calculate tip percentages and easily divide the total restaurant bill equally among your group.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
