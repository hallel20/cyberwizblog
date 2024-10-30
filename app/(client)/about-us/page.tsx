const page = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 mt-10 space-y-8">
      {/* Company Introduction Section */}
      <section className="space-y-4 text-center">
        <h1 className="text-4xl font-bold text-blue-600">About CyberWizDev</h1>
        <p className="text-gray-700 text-lg">
          Welcome to <span className="font-semibold">CyberWizDev</span> – your
          trusted partner in innovative web solutions! We&apos;re a team of
          passionate developers, designers, and digital strategists dedicated to
          empowering businesses through the art of technology.
        </p>
      </section>

      {/* Mission Section */}
      <section className="bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-blue-500 mb-2">
          Our Mission
        </h2>
        <p className="text-gray-600">
          At CyberWizDev, we aim to help our clients unlock their full digital
          potential by creating robust, scalable, and user-centric web
          applications and platforms. From startup websites to large-scale
          applications, we deliver fast, reliable, and tailor-made solutions
          that meet and exceed expectations.
        </p>
      </section>

      {/* Expertise Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-blue-500 mb-2">
          Our Expertise
        </h2>
        <p className="text-gray-700">
          Our expertise covers full-stack web development, mobile applications,
          e-commerce solutions, SEO, and web architecture optimization. We
          specialize in building modern, efficient, and SEO-friendly
          applications that drive growth and engagement for businesses of all
          sizes.
        </p>
      </section>

      {/* Blog Purpose Section */}
      <section className="bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-blue-500 mb-2">
          About the CyberWizDev Blog
        </h2>
        <p className="text-gray-600">
          Our blog is where we share our journey, insights, and the latest in
          web technology with you. Whether you&apos;re a developer, a business
          owner, or a tech enthusiast, you&apos;ll find valuable resources on
          front-end and back-end development, emerging tools, SEO, and industry
          best practices.
        </p>
      </section>

      {/* Closing Statement */}
      <section className="text-center">
        <p className="text-lg text-gray-700">
          Thank you for joining us on this journey – let&apos;s build something
          remarkable together!
        </p>
      </section>
    </div>
  );
};

export default page;
