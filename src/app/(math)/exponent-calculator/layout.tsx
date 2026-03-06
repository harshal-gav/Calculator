import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Exponent Calculator | Raise Numbers to Powers",
  description:
    "Solve immense exponential equations accurately. Calculate integer powers, fractional root exponents, and negative exponent division with a robust mathematical engine. Including specialized USA tools like exponent calculator.",
  keywords: ["exponent calculator"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
