import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: '/json-validator/',
  },
  title: "JSON Validator & Formatter | Debug JSON Data Online",
  description:
    "Instantly validate, format, and debug your JSON data structures. Find syntax errors, missing commas, and unmatched brackets in your payload.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
