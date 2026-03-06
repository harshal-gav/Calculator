import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work Calculator",
  description:
    "Free online Work Calculator. Calculate mechanical work, force, distance, and angle using standard physics formulas.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
