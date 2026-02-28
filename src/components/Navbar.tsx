import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="bg-blue-600 text-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex-shrink-0 flex items-center font-bold text-xl tracking-tight">
                            Calculators All
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link href="/financial/mortgage-calculator" className="hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">Mortgage</Link>
                        <Link href="/health/bmi-calculator" className="hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">BMI</Link>
                        <Link href="/math/scientific-calculator" className="hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">Scientific</Link>
                        <Link href="/math/percentage-calculator" className="hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">Percentage</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
