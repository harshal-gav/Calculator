import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: '/random-string-generator/',
  },
  title: "Random String Generator | Generate Secure Passwords",
  description:
    "Free online Random String Generator. Create secure, randomized alphanumeric strings for passwords, tokens, API keys, or testing environments.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
