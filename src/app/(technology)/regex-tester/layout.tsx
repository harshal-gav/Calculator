import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: '/regex-tester/',
  },
  title: "Regex Tester & Debugger | Live Regular Expression Matching",
  description:
    "Test, evaluate, and debug Regular Expressions (Regex) in real-time. Highlight matches, extract capture groups, and identify errors instantly.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
