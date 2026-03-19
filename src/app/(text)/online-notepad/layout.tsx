import { Metadata } from "next";
export const metadata: Metadata = {
  alternates: {
    canonical: '/online-notepad/',
  },
  title: "Free Online Notepad - Write & Save Text in Your Browser",
  description:
    "A fast, distraction-free online notepad. Auto-saves your text locally in your browser. Download as a .txt file, copy to clipboard, or count words instantly.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
