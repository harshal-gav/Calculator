import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Calories Burned Calculator | Accurate MET Exercise Energy Expenditure",
  description:
    "Calculate exactly how many calories you burn during various exercises and activities using standardized MET (Metabolic Equivalent of Task) values.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
