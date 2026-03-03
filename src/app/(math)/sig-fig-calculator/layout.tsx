import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Significant Figures (Sig Fig) Calculator',
    description: 'Instantly count exact significant digits (sig figs) in any number based on strict scientific formatting rules and convert to scientific notation.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
