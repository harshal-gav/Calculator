export const metadata = {
    title: 'Privacy Policy',
    description: 'Privacy Policy for Calculators All',
};

export default function PrivacyPolicy() {
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm my-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-900">Privacy Policy</h1>
            <p className="mb-4 text-gray-700">Last updated: {new Date().toLocaleDateString()}</p>
            <div className="prose prose-blue text-gray-700">
                <p>Your privacy is important to us. It is Calculators All's policy to respect your privacy regarding any information we may collect from you across our website.</p>

                <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
                <p>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent.</p>

                <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Information</h2>
                <p>The calculators on our website perform math in your browser. We do not store or transmit your calculations to our servers. We may use anonymous analytics to understand how our tools are used.</p>

                <h2 className="text-xl font-semibold mt-6 mb-2">3. Third-Party Services</h2>
                <p>We use Google AdSense to display advertisements. Google uses cookies to serve ads based on your prior visits. You can opt out of personalized advertising by visiting Google Ads Settings.</p>

                <h2 className="text-xl font-semibold mt-6 mb-2">4. Contact Us</h2>
                <p>If you have any questions about how we handle user data and personal information, feel free to contact us.</p>
            </div>
        </div>
    );
}
