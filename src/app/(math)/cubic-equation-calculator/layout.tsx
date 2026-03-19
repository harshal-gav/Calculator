import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: '/cubic-equation-calculator/',
  },
  title: "Cubic Equation Calculator | Solve For All Roots",
  description:
    "Instantly solve any third-degree polynomial using Cardano’s algebraic method. Find all real and complex roots (x-intercepts) without tedious trial-and-error factoring.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
