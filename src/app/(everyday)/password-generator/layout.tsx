import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: '/password-generator/',
  },
  title: "Random Password Generator - Secure & Cryptographic",
  description:
    "Free online Random Password Generator. Generate secure, highly-randomized passwords using cryptographic standards directly in your browser.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
