import { ReactNode } from "react";

export const metadata = {
  title: "College Cost Calculator - Estimate Multi-Year Educational Expenses",
  description: "Project the total cost of a college degree. Account for tuition inflation, room and board, and financial aid to find your net cost.",
};

export default function CollegeCostLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
