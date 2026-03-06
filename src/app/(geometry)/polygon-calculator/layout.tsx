import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Polygon Calculator – Area, Angles, Apothem & Perimeter",
  description:
    "Free Polygon Calculator. Calculate precise properties for any regular polygon with 3 or more sides including interior angles and circumradius.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
