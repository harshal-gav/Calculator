export const metadata = {
  title: "Terms of Service",
  description: "Terms of Service and Conditions of Use for Calculator All",
};

export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-sm border border-gray-100 my-8">
      <h1 className="text-4xl font-bold mb-4 text-gray-900">
        Terms of Service
      </h1>
      <p className="text-sm text-gray-500 mb-8 pb-4 border-b border-gray-200">
        Last updated: {new Date().toLocaleDateString()}
      </p>

      <div className="prose prose-blue prose-lg text-gray-700 max-w-none">
        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
          1. Acceptance of Terms
        </h2>
        <p>
          By accessing and using <strong>Calculator All</strong> (&quot;the
          Website&quot;), you accept and agree to be bound by the terms and
          provision of this agreement. In addition, when using these particular
          services, you shall be subject to any posted guidelines or rules
          applicable to such services. Any participation in this service will
          constitute acceptance of this agreement. If you do not agree to abide
          by the above, please do not use this service.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
          2. Description of Service
        </h2>
        <p>
          Calculator All provides users with access to a rich collection of
          resources, including various numerical, financial, health, fitness,
          and everyday utility calculators. You understand and agree that the
          Service is provided &quot;AS-IS&quot; and that Calculator All assumes
          no responsibility for the timeliness, deletion, mis-delivery, or
          failure to store any user communications or personalization settings.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
          3. Use License and Restrictions
        </h2>
        <p>
          Permission is granted to temporarily use the materials and calculators
          on Calculator All&apos;s website for personal, non-commercial
          transitory viewing only. This is the grant of a license, not a
          transfer of title, and under this license you may not:
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
          <li>Modify or copy the materials;</li>
          <li>
            Use the materials for any commercial purpose, or for any public
            display (commercial or non-commercial);
          </li>
          <li>
            Attempt to decompile or reverse engineer any software contained on
            Calculator All&apos;s website;
          </li>
          <li>
            Remove any copyright or other proprietary notations from the
            materials; or
          </li>
          <li>
            Transfer the materials to another person or &quot;mirror&quot; the
            materials on any other server.
          </li>
        </ul>
        <p className="mt-4">
          This license shall automatically terminate if you violate any of these
          restrictions and may be terminated by Calculator All at any time.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
          4. Disclaimers of Warranties (Medical &amp; Financial Warning)
        </h2>
        <p>
          The materials and calculations on Calculator All&apos;s website are
          provided on an &apos;as is&apos; basis. Calculator All makes no
          warranties, expressed or implied, and hereby disclaim and negate all
          other warranties including, without limitation, implied warranties or
          conditions of merchantability, fitness for a particular purpose, or
          non-infringement of intellectual property or other violation of
          rights.
        </p>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6">
          <p className="font-bold text-yellow-800 m-0">
            Crucial Disclaimer regarding Health and Finance:
          </p>
          <p className="text-yellow-700 mt-2 text-sm">
            <strong>Health Calculators:</strong> The health, fitness, and
            medical calculators provided on this site are for informational and
            educational purposes only. They are not intended as a substitute for
            professional medical advice, diagnosis, or treatment. Always seek
            the advice of your physician or other qualified health provider with
            any questions you may have regarding a medical condition.
          </p>
          <p className="text-yellow-700 mt-2 text-sm mb-0">
            <strong>Financial Calculators:</strong> The financial calculators
            are provided for estimation and illustrative purposes only. They do
            not constitute financial, investment, or legal advice. Calculator
            All cannot guarantee the absolute accuracy of these tools or their
            applicability to your individual circumstances. We highly highly
            recommend consulting a qualified financial advisor before making any
            major financial decisions.
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
          5. Limitations of Liability
        </h2>
        <p>
          In no event shall Calculator All, its developers, or its suppliers be
          liable for any damages (including, without limitation, damages for
          loss of data or profit, physical injury, financial ruin, or due to
          business interruption) arising out of the use or inability to use the
          materials and results on Calculator All&apos;s website, even if
          Calculator All or a Calculator All authorized representative has been
          notified orally or in writing of the possibility of such damage.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
          6. Revisions and Errata
        </h2>
        <p>
          The materials appearing on Calculator All&apos;s website could include
          technical, typographical, or photographic errors. Calculator All does
          not warrant that any of the materials on its website are accurate,
          complete or current. We may make changes to the materials contained on
          its website at any time without notice, but make no commitment to
          update the materials.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
          7. External Links and Advertising
        </h2>
        <p>
          Calculator All has not reviewed all of the sites linked to its website
          and is not responsible for the contents of any such linked site. The
          appearance of advertisements or links on our website does not imply
          endorsement by Calculator All of the site or the products depicted.
          Use of any such linked website or interaction with advertisements is
          at the user&apos;s own risk.
        </p>
        <p>
          Our website displays advertisements served by third-party networks
          such as Google AdSense. Please review our{" "}
          <a href="/privacy-policy/" className="text-blue-600 hover:underline">
            Privacy Policy
          </a>{" "}
          for more information on how data is collected for targeted advertising
          and how you can opt out.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
          8. Modifications to Terms of Service
        </h2>
        <p>
          Calculator All may revise these terms of service for its website at
          any time without notice. By using this website you are agreeing to be
          bound by the then current version of these terms of service.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
          9. Contact Information
        </h2>
        <p>
          If you have any questions regarding our Terms of Service, please
          contact us at{" "}
          <a
            href="mailto:harshal.cloud.aws@gmail.com"
            className="text-blue-600 hover:underline"
          >
            harshal.cloud.aws@gmail.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}
