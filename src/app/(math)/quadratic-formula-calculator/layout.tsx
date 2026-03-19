import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: '/quadratic-formula-calculator/',
  },
  title: "Quadratic Formula Calculator – Find Real & Complex Roots",
  description:
    "Free Quadratic Formula Calculator. Solve quadratic equations in the form ax² + bx + c = 0 to find real and complex roots completely instantly. Including specialized USA tools like quadratic formula calculator.",
  keywords: ["quadratic formula calculator"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
