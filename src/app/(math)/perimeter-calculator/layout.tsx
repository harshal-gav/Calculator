import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: '/perimeter-calculator/',
  },
  title: "Perimeter & Circumference Calculator | All 2D Shapes",
  description:
    "Calculate the exact outer perimeter and circumference of rectangles, squares, triangles, circles, and regular polygons instantly. Includes formulas and step-by-step logic. Including specialized USA tools like perimeter calculator.",
  keywords: ["perimeter calculator"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
