import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: '/ellipse-calculator/',
  },
  title: "Ellipse Calculator | Area, Perimeter & Eccentricity",
  description:
    "Free online Ellipse Calculator. Instantly calculate the area, perimeter (circumference), and eccentricity of an ellipse using axes measurements.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
