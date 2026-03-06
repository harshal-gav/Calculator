import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Molar Mass Calculator – Chemical Formula Weight",
  description:
    "Free Molar Mass Calculator. Quickly calculate the exact molecular weight and elemental composition breakdown of any chemical formula.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
