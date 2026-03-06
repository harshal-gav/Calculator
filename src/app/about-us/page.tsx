export const metadata = {
  title: "About Us | Calculator All",
  description:
    "Learn about Calculator All, our mission to provide free, accurate, and easy-to-use calculators for everyday life, finance, health, and more.",
};

export default function AboutUs() {
  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10 bg-white rounded-xl shadow-sm border mt-8 mb-16">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 border-b pb-6">
        About Us
      </h1>

      <div className="prose prose-blue max-w-none text-gray-700">
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Welcome to Calculator All
          </h2>
          <p className="mb-4 leading-relaxed">
            At <strong className="text-gray-900">Calculator All</strong>, we
            believe that complex calculations shouldn't require a degree in
            mathematics or finance. Our platform is dedicated to providing you
            with an extensive suite of over 150+ free, highly accurate, and
            incredibly fast calculators designed to simplify your daily life.
          </p>
          <p className="leading-relaxed">
            Whether you are a student tackling complex geometry, a professional
            analyzing financial margins, a health enthusiast tracking fitness
            metrics, or simply someone trying to calculate a quick tip at a
            restaurant, we have the right tool for you.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Our Mission
          </h2>
          <p className="mb-4 leading-relaxed">
            Our mission is simple:{" "}
            <strong>
              To make accurate, specialized calculation tools universally
              accessible and entirely free.
            </strong>
          </p>
          <p className="leading-relaxed">
            We aim to eliminate the friction from everyday problem-solving by
            offering a clean, user-friendly interface that delivers instant
            results across a vast array of topics including Finance, Health,
            Mathematics, Technology, Chemistry, and Geometry.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Why Choose Us?
          </h2>
          <ul className="list-disc pl-6 space-y-3 mt-4">
            <li>
              <strong>Accuracy & Trust:</strong> Our calculators are built using
              industry-standard formulas and rigorously verified to ensure you
              get precise results every time.
            </li>
            <li>
              <strong>100% Free & Unrestricted:</strong> We believe essential
              tools should be free. There are no paywalls, hidden fees, or
              subscription requirements to use any of our calculators.
            </li>
            <li>
              <strong>Privacy First:</strong> Your calculations remain
              completely private. We do not store your personal input data on
              our servers. All calculations are performed instantly either on
              your device or ephemerally.
            </li>
            <li>
              <strong>Lightning Fast:</strong> Optimized for speed on desktop,
              tablet, and mobile browsers, ensuring you get your answers without
              waiting.
            </li>
            <li>
              <strong>Constantly Evolving:</strong> We regularly update our
              formulas, add new tools, and improve our interface based strictly
              on user feedback and changing mathematical standards.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Our Commitment to Content Quality
          </h2>
          <p className="leading-relaxed">
            We are committed to maintaining a high-quality, safe, and
            family-friendly environment. Our platform strictly adheres to the
            highest standards of web publishing. We strive to provide
            transparent, valuable, and original content that genuinely helps our
            users make informed decisions in their personal, financial, and
            educational lives.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Contact Information
          </h2>
          <p className="mb-4 leading-relaxed">
            Calculator All is proudly developed and maintained by a dedicated
            team of developers who are passionate about data transparency and
            utility.
          </p>
          <p className="leading-relaxed">
            We are always open to connecting with our users! If you have
            suggestions for a new calculator, feedback on an existing one, or
            business inquiries, please don't hesitate to reach out.
          </p>
          <div className="mt-6 bg-gray-50 p-6 rounded-lg border">
            <p className="font-medium text-gray-900 mb-2">
              Reach out to us at:
            </p>
            <a
              href="mailto:harshal.cloud.aws@gmail.com"
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              harshal.cloud.aws@gmail.com
            </a>
            <br />
            <span className="inline-block mt-4 text-sm text-gray-500">
              Or use our dedicated{" "}
              <a href="/contact-us" className="text-blue-600 hover:underline">
                Contact Form
              </a>
              .
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}
