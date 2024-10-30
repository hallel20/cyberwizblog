import ContactForm from "./ContactForm";

const page = () => {
  return (
    <div className="flex flex-col items-center py-12 px-4 md:px-8 lg:px-16">
      {/* Page Header */}
      <header className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-blue-600">Get in Touch</h1>
        <p className="text-gray-700 text-lg">
          Have questions or need assistance? We&apos;re here to help! Reach out
          to the CyberWizDev team, and we&apos;ll get back to you as soon as
          possible.
        </p>
      </header>

      {/* Contact Information */}
      <section className="mt-8 w-full max-w-2xl bg-gray-50 rounded-lg p-6 text-gray-800 space-y-4 shadow-lg">
        <h2 className="text-2xl font-semibold text-blue-500">
          Contact Information
        </h2>
        <p>
          If you prefer direct communication, feel free to use the information
          below:
        </p>
        <ul className="space-y-2">
          <li>
            <strong>Email:</strong>{" "}
            <a
              href="mailto:support@cyberwizdev.com"
              className="text-blue-600 hover:underline"
            >
              support@cyberwizdev.com
            </a>
          </li>
          <li>
            <strong>Phone:</strong> +123 456 7890
          </li>
          <li>
            <strong>Address:</strong> 123 CyberWizDev Street, Tech City,
            Innovation State
          </li>
        </ul>
      </section>

      <ContactForm />
    </div>
  );
};

export default page;
