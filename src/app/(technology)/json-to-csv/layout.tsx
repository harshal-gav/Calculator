import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: '/json-to-csv/',
  },
  title: "JSON to CSV Converter | Export JSON to Excel Online",
  description:
    "Convert arrays of JSON objects into formatted Comma-Separated Values (CSV). Flatten nested data for easy Excel and Google Sheets importing.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
