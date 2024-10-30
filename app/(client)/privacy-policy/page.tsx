const page = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
      {/* Page Title  */}
      <section className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-blue-600">Privacy Policy</h1>
        <p className="text-gray-700 text-lg">
          Your privacy is important to us. This policy explains how we collect,
          use, and safeguard your information.
        </p>
      </section>

      {/* Information Collection Section  */}
      <section className="bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-blue-500 mb-2">
          1. Information We Collect
        </h2>
        <p className="text-gray-600">
          We collect information that you provide directly to us, such as when
          you create an account, fill out a form, or subscribe to our
          newsletter. This may include your name, email address, and other
          contact information.
        </p>
      </section>

      {/* Usage of Information Section  */}
      <section className="p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-blue-500 mb-2">
          2. How We Use Your Information
        </h2>
        <p className="text-gray-600">
          We use the information we collect to provide, maintain, and improve
          our services. This includes personalizing your experience, responding
          to inquiries, and sending periodic emails or updates regarding our
          services.
        </p>
      </section>

      {/* Information Sharing Section  */}
      <section className="bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-blue-500 mb-2">
          3. Information Sharing and Disclosure
        </h2>
        <p className="text-gray-600">
          We do not share your personal information with third parties without
          your consent, except as necessary to provide our services or as
          required by law.
        </p>
      </section>

      {/* Security Section  */}
      <section className="p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-blue-500 mb-2">
          4. Security of Your Information
        </h2>
        <p className="text-gray-600">
          We implement appropriate security measures to protect your personal
          information from unauthorized access, alteration, or disclosure.
          However, no internet transmission is fully secure, and we cannot
          guarantee absolute security.
        </p>
      </section>

      {/* Cookies Section  */}
      <section className="bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-blue-500 mb-2">
          5. Cookies and Tracking Technologies
        </h2>
        <p className="text-gray-600">
          Our website uses cookies to enhance your experience, gather analytics,
          and for marketing purposes. You can manage your cookie preferences
          through your browser settings.
        </p>
      </section>

      {/* Your Rights Section  */}
      <section className="p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-blue-500 mb-2">
          6. Your Rights
        </h2>
        <p className="text-gray-600">
          You have the right to access, update, or delete your personal
          information. To make a request, please contact us using the
          information provided at the end of this policy.
        </p>
      </section>

      {/* Contact Information Section  */}
      <section className="bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-blue-500 mb-2">
          7. Contact Us
        </h2>
        <p className="text-gray-600">
          If you have any questions about this Privacy Policy, please reach out
          to us at{" "}
          <a
            href="mailto:support@cyberwizdev.com.ng"
            className="text-blue-600 hover:underline"
          >
            support@cyberwizdev.com.ng
          </a>
          .
        </p>
      </section>
    </div>
  );
};

export default page;
