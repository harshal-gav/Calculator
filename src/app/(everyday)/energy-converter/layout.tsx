import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Energy Converter",
  description:
    "Free online Energy Converter. Convert energy, heat, and work units including Joules, Calories, kWh, and BTUs.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
