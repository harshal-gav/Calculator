import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Base64 Encoder / Decoder - Secure Data Converter",
  description:
    "Free online Base64 Converter. Quickly encode raw text to Base64 format or decode Base64 strings back into readable text locally in your browser.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
