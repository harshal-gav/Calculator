import { ReactNode } from "react";

export const metadata = {
  title: "Mutual Fund Calculator - Project Returns After Fees",
  description: "Calculate mutual fund returns accounting for expense ratios, front-end loads, and monthly contributions. See the long-term impact of investment fees.",
};

export default function MutualFundLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
