import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: '/velocity-calculator/',
  },
  title: "Velocity Calculator",
  description:
    "Free online kinematics calculator. Instantly solve for velocity, speed, distance, or time using standard physics formulas.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
