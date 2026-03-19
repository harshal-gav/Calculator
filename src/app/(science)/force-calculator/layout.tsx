import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: '/force-calculator/',
  },
  title: "Force Calculator",
  description:
    "Free online Force Calculator. Use Newton's Second Law to calculate force, mass, and acceleration in diverse units.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
