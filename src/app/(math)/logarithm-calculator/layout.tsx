import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Logarithm Calculator | Base 10 & Natural Log (ln)",
  description:
    "Calculate base-10, base-2, and base-e (natural logarithm) exponents instantly. Determine exactly what power a base must be raised to in order to equal your target.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
