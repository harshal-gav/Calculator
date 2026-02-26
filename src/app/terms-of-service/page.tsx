export const metadata = {
    title: 'Terms of Service',
    description: 'Terms of Service for Calculator.net',
};

export default function TermsOfService() {
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm my-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-900">Terms of Service</h1>
            <p className="mb-4 text-gray-700">Last updated: {new Date().toLocaleDateString()}</p>
            <div className="prose prose-blue text-gray-700">
                <h2 className="text-xl font-semibold mt-6 mb-2">1. Acceptance of Terms</h2>
                <p>By accessing our website, you agree to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>

                <h2 className="text-xl font-semibold mt-6 mb-2">2. Use License</h2>
                <p>Permission is granted to temporarily use the materials (information or software) on Calculator.net's website for personal, non-commercial transitory viewing only.</p>

                <h2 className="text-xl font-semibold mt-6 mb-2">3. Disclaimer</h2>
                <p>The materials on Calculator.net's website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
                <p>The calculators provide estimates and should not be considered financial or medical advice.</p>

                <h2 className="text-xl font-semibold mt-6 mb-2">4. Limitations</h2>
                <p>In no event shall Calculator.net or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website.</p>
            </div>
        </div>
    );
}
