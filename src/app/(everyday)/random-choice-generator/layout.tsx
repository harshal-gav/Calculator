import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Random Choice Generator | Pick an Item from a List",
  description:
    "Free online Random Choice Generator. Let the computer instantly pick a random winner, item, or choice from any custom list.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
