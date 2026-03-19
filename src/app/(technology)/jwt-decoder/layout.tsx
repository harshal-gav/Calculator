import { Metadata } from "next";
export const metadata: Metadata = {
  alternates: {
    canonical: '/jwt-decoder/',
  },
  title: "JWT Decoder - Decode JSON Web Tokens (Local & Secure)",
  description:
    "Instantly decode the Header and Payload of any standard JWT. Verify standard claims, inspect token structure, and troubleshoot authentication 100% locally.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
