import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: '/density-calculator/',
  },
  title: "Density Calculator",
  description:
    "Free online Density Calculator. Quickly solve for volumetric mass density, exact physical mass, or total volume.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
