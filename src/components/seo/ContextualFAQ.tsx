export function ContextualFAQ({ faqs }: { faqs: { question: string, answer: string }[] }) {
  return (
    <div className="space-y-6">
      <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-6">
        Frequently Asked Questions
      </h3>
      <dl className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition">
            <dt className="text-lg font-semibold text-gray-900 mb-2">
              {faq.question}
            </dt>
            <dd className="text-gray-600 leading-relaxed">
              {faq.answer}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
