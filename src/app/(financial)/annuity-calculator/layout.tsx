import { ReactNode } from "react";

export const metadata = {
  title: "Annuity Calculator - Calculate Payouts and Future Value",
  description: "Project your annuity growth or calculate guaranteed monthly payouts from a lump sum investment. Includes accumulation and distribution phase logic.",
};

export default function AnnuityLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
