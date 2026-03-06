import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rhombus Area & Perimeter Calculator",
  description:
    "Free online Rhombus Calculator. Calculate area, perimeter, and side lengths instantly using the lengths of the two intersecting diagonals.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
