import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: '/rectangle-calculator/',
  },
  title: "Rectangle Area, Perimeter & Diagonal Calculator",
  description:
    "Free online Rectangle Calculator. Instantly calculate the area, perimeter, and diagonal length of any rectangle by entering length and width.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
