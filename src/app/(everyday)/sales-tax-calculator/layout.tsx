import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sales Tax Calculator | Forward Add & Reverse Extract",
  description:
    "Rapidly calculate total checkout cost by adding local sales tax, or reverse-calculate a receipt to find the original pre-tax base cost of an item.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
