import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Speed Converter",
  description:
    "Free online Speed and Velocity Converter. Instantly convert between mph, km/h, m/s, knots, and Mach speed. Including specialized USA tools like speed converter.",
  keywords: [
    "speed converter",
    "marathon pace calculator",
    "half marathon pace calculator",
    "running pace calculator",
    "speed calculator",
    "distance formula speed time",
    "formula for speed",
    "race pace calculator",
    "speed distance time calculator",
    "speed equation",
    "mph calculator",
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
