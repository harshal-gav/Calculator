import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: '/volume-calculator/',
  },
  title: "Volume Calculator",
  description:
    "Free online volume calculator. Quickly calculate the volume of cubes, cylinders, cones, spheres, and rectangular prisms.",
  keywords: [
    "cubic meter calculator",
    "cubic equation solver",
    "ml to l conversion",
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
