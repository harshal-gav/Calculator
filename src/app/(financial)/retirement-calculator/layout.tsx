import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Retirement Calculator – Nest Egg Planner',
    description: 'Free Retirement Calculator. Project your nest egg, test the 4% rule, and evaluate if you have enough savings to retire comfortably.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
