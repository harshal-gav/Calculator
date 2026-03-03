import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'GPA Calculator – College & High School',
    description: 'Free cumulative GPA Calculator. Easily calculate your Grade Point Average from credits and letter grades for college or high school.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
