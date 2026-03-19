import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: '/annuity-pv-calculator/',
  },
  title: "Annuity PV Calculator | Calculate Present Value of Annuity",
  description:
    "Calculate the Present Value (PV) of an annuity stream. Analyze pension buyouts, lottery payments, and retirement income streams using exact discount rates.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
