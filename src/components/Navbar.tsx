import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="bg-blue-600 text-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row justify-between items-center py-4 sm:h-16 sm:py-0">
                    <div className="flex items-center mb-4 sm:mb-0 cursor-pointer">
                        <Link href="/" className="flex-shrink-0 flex items-center font-bold text-2xl tracking-tight">
                            Calculators All
                        </Link>
                    </div>
                    <div className="flex flex-wrap justify-center items-center gap-2 sm:space-x-4">
                        <Link href="/#financial" className="hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap">Financial</Link>
                        <Link href="/#health" className="hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap">Health</Link>
                        <Link href="/#math" className="hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap">Math</Link>
                        <Link href="/#everyday" className="hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap">Everyday</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
