import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Covariance Calculator | Sample & Population",
  description:
    "Calculate the Sample Covariance and Population Covariance to determine the directional relationship and variance between two numerical datasets.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
