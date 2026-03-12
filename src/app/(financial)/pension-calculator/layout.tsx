import { ReactNode } from "react";

export const metadata = {
  title: "Pension Calculator - Estimate Your Defined Benefit Income",
  description: "Calculate your future monthly and annual pension income based on years of service, salary, and multiplier. Includes inflation adjustments.",
};

export default function PensionLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
