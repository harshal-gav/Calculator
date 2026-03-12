import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Simple Interest Calculator",
  description:
    "Free online Simple Interest Calculator. Easily calculate total interest accrued on a loan or investment using the standard I = Prt formula over days, months, or years.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
