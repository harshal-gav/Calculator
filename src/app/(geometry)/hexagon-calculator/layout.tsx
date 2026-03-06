import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hexagon Calculator – Area, Perimeter, Side & Radii",
  description:
    "Free Hexagon Calculator. Calculate the area, perimeter, side length, and radii of a regular hexagon instantly.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
