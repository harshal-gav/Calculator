import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: '/markdown-editor/',
  },
  title: "Markdown Editor & Live Previewer",
  description:
    "A fast, lightweight, real-time Markdown editor. Write plain-text Markdown and instantly visualize exactly how it renders as HTML.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
