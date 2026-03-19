import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: '/area-converter/',
  },
  title: "Area Converter",
  description:
    "Free online Area Converter. Convert instantly between square meters, square feet, acres, hectares, and more. Including specialized USA tools like area converter.",
  keywords: ["area converter"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
