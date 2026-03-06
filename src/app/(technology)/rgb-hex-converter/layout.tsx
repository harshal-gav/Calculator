import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RGB to HEX Converter - Color Code Translator",
  description:
    "Free online RGB to HEX Converter. Instantly translate color codes between Hexadecimal string formats and Red Green Blue values for web design and CSS.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
