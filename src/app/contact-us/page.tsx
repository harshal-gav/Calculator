export const metadata = {
    title: 'Contact Us',
    description: 'Get in touch with Calculator.net',
};

export default function ContactUs() {
    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm my-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-900">Contact Us</h1>
            <p className="mb-6 text-gray-700">Have a question, feedback, or a suggestion for a new calculator? We'd love to hear from you.</p>

            <form className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input type="text" id="name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" id="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" />
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                    <textarea id="message" rows={5} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"></textarea>
                </div>
                <button type="button" className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition">
                    Send Message
                </button>
            </form>

            <div className="mt-8 pt-8 border-t border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Other ways to reach us</h2>
                <p className="text-gray-600">Email: <a href="mailto:contact@calculator.net.example" className="text-blue-600 hover:underline">contact@calculator.net.example</a></p>
            </div>
        </div>
    );
}
