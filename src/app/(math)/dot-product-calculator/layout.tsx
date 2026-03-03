import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Dot Product Calculator | Multiply 2D & 3D Vectors',
    description: 'Calculate the scalar dot product of two vectors, their exact magnitude lengths, and the geometric angle separating them in space.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
