import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Online Dice Roller | Roll Virtual D6, D20, and Custom Dice',
    description: 'Free online Dice Roller. Instantly roll virtual 3D dice for tabletop gaming, RPGs like D&D, board games, or random statistics.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
