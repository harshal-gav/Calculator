import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Margin of Error Calculator | Find Survey Accuracy',
    description: 'Calculate the margin of error for polls, surveys, and research data. Understand your statistical confidence interval instantly with our accurate tool.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
