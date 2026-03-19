import { Metadata } from "next";
export const metadata: Metadata = {
  alternates: {
    canonical: '/power-calculator/',
  },
  title: "Physics Power Calculator - Watts, Joules & Seconds",
  description:
    "Calculate mechanical power (Watts or Horsepower), total work done (Joules), or elapsed time (Seconds) based on classical physics formulas.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
