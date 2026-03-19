import { Metadata } from "next";
export const metadata: Metadata = {
  alternates: {
    canonical: '/case-converter/',
  },
  title: "Text Case Converter | Change to Uppercase, Lowercase, Title Case",
  description:
    "Instantly convert text between UPPERCASE, lowercase, Title Case, Sentence case, camelCase, snake_case, and more. Free online text formatting tool.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
