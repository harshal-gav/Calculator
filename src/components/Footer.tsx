import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-8 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <p className="text-sm">&copy; {new Date().getFullYear()} Calculators All. All rights reserved.</p>
                    </div>
                    <div className="flex space-x-6 text-sm">
                        <Link href="/terms-of-service" className="hover:text-gray-300">Terms of Service</Link>
                        <Link href="/privacy-policy" className="hover:text-gray-300">Privacy Policy</Link>
                        <Link href="/contact-us" className="hover:text-gray-300">Contact Us</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
