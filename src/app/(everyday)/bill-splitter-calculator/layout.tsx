import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: '/bill-splitter-calculator/',
  },
  title: "Bill Splitter & Tip Calculator",
  description:
    "Instantly split restaurant bills and calculate exact tips evenly among your group. Ensure everyone pays their fair share down to the penny.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
