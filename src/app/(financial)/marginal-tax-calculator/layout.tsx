import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: '/marginal-tax-calculator/',
  },
  title: "Marginal Tax Rate vs Effective Tax Calculator",
  description:
    "Calculate your true effective income tax rate compared to your top marginal tax bracket using standard progressive tax bracket examples.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
