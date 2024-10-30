import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6 mt-12 text-sm">
      <div className="container mx-auto flex flex-col md:flex-row space-y-3 justify-between items-center px-6">
        <p className="text-sm mb-4 md:mb-0">
          © {new Date().getFullYear()} Cyberwizdev Blog. All rights reserved.
        </p>
        <div>
          <Link href="/privacy-policy" className="hover:text-white">
            Privacy Policy
          </Link>
        </div>
        <div className="flex space-x-4 px-3 md:px-0 md:space-x-6">
          <a
            href="https://www.facebook.com/profile.php?id=61567082924778"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            Facebook
          </a>
          <a
            href="https://x.com/cyberwizdev"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            Twitter
          </a>
          <a
            href="https://instagram.com/cyberwizdev"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            Instagram
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
