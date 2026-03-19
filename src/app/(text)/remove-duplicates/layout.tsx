import { Metadata } from "next";
export const metadata: Metadata = {
  alternates: {
    canonical: '/remove-duplicates/',
  },
  title: "Remove Duplicate Lines - Free List Cleaner & Dupe Finder",
  description:
    "Instantly scan massive lists of text, emails, or URLs to find and delete every exact duplicate line. Clean your datasets automatically for free.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
