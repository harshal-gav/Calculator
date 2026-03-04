import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Code Diff Checker | Compare Text & Code Instantly',
    description: 'Compare text and code files side-by-side to instantly find differences. A fast, line-by-line diff tool for developers and writers.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
