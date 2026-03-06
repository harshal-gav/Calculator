import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pregnancy Calculator",
  description:
    "Free online Pregnancy Calculator. Calculate your estimated due date, conception date, and see your current trimester timeline based on your LMP and cycle length. Including specialized USA tools like gestational age calculator, reverse due date calculator, birth calculator.",
  keywords: [
    "gestational age calculator",
    "reverse due date calculator",
    "birth calculator",
    "date of birth calculator",
    "birth date calculator",
    "age calculator by date of birth",
    "age calculator online by date of birth",
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
