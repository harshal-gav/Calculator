import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Slope Calculator | Point Slope Form & Line Steepness",
  description:
    "Calculate the exact slope (m), y-intercept, and angle of a line from two coordinate points. Step-by-step solutions using the slope formula. Including specialized USA tools like slope calculator, point slope form calculator.",
  keywords: [
    "slope calculator",
    "point slope form calculator",
    "slope formula",
    "find the slope",
    "equation of a line",
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
