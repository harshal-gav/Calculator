import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: '/area-calculator/',
  },
  title: "2D Surface Area Calculator | Rectangles, Circles, Triangles",
  description:
    "Instantly calculate the exact square unit surface area of common 2D shapes. Find the area of rectangles, squares, triangles, and circles with perfectly formatted formulas. Including specialized USA tools like area calculator.",
  keywords: [
    "area calculator",
    "square root calculator",
    "concrete yard calculator",
    "cubic yard calculator",
    "cubic feet calculator",
    "square feet calculator",
    "sq ft calculator",
    "land area calculator",
    "square meter calculator",
    "surface area calculator",
    "completing the square calculator",
    "find the area of a triangle",
    "feet and inches calculator",
    "square calculator",
    "area of a circle calculator",
    "area of a circle formula",
    "area of a circle with diameter",
    "area of a triangle calculator",
    "area of cylinder formula",
    "body surface area",
    "body surface area calculator",
    "cms to feet",
    "cubic feet to square feet",
    "cubic inches to cubic feet",
    "feet calculator",
    "feet to inches calculator",
    "feet to meter converter",
    "feet to square feet",
    "inches to square feet",
    "linear feet",
    "sq feet to sq yard",
    "microsoft math solver",
    "after tax calculator",
    "shift calculator",
    "rafter calculator",
    "pay after tax",
    "40k after tax",
    "45000 after tax",
    "microsoft calculator",
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
