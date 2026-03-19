import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: '/lean-body-mass-calculator/',
  },
  title: "Lean Body Mass Calculator | Boer, James & Hume Formulas",
  description:
    "Calculate your exact Lean Body Mass (LBM) using scientific formulas. Separate fat weight from muscle weight for precise protein targeting and medication dosing. Including specialized USA tools like lean body mass calculator.",
  keywords: ["lean body mass calculator"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
