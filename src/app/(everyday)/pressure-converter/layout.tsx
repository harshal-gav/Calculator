import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pressure Converter",
  description:
    "Free online Pressure Converter. Convert pressure measurements between Pascals, PSI, Bar, and Atmospheres.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
