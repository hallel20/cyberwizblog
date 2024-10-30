"use client";
import { Session } from "next-auth";
import { getSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa6";
import Search from "./Search";

const links = [
  { path: "/", label: "Home" },
  { path: "/about-us", label: "About" },
  { path: "/posts", label: "Blog" },
  { path: "/contact", label: "Contact" },
];

const Header = () => {
  // console.log(session);
  const [navOpen, setNavOpen] = useState(false);
  const [session, setSession] = useState<Session | null>();
  const [profileOpen, setProfileOpen] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const effect = async () => {
      const session = await getSession();
      // console.log(session);
      setSession(session);
    };

    effect();
  }, []);

  return (
    <header className="bg-blue-700 text-white py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-6">
        <Link href="/" className="md:text-3xl text-xl font-bold">
          Cyberwizdev Blog
        </Link>
        <Search />
        <nav className="space-x-4 hidden md:block">
          {links.map((link, i) => (
            <Link key={i} href={link.path} className="hover:text-blue-300">
              {link.label}
            </Link>
          ))}
          {session?.user?.role == "admin" ? (
            <>
              <Link href="/admin" className="hover:text-blue-300 py-2">
                Manage
              </Link>
              <button
                onClick={() => signOut()}
                className="hover:text-blue-300 py-2"
              >
                Logout
              </button>
            </>
          ) : session?.user ? (
            <button
              onClick={() => signOut()}
              className="hover:text-blue-300 py-2"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                href={
                  pathname == "/"
                    ? "/auth/login"
                    : `/auth/login?next=${pathname}`
                }
                className="hover:text-blue-300 py-2"
              >
                Login
              </Link>
              <Link href="/auth/signup" className="hover:text-blue-300 py-2">
                Sign Up
              </Link>
            </>
          )}
        </nav>
        {/* Mobile Menu */}
        <div className="md:hidden">
          <button
            onClick={() => setNavOpen((prev) => !prev)}
            id="menuButton"
            className="text-white hover:text-blue-300"
          >
            <FaBars size="25" />
          </button>
        </div>
      </div>
      <div
        className={`absolute top-16 z-50 bg-white shadow-lg text-black transition-all duration-300 ease-out transform overflow-hidden ${
          navOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="w-screen flex flex-col py-3 items-center justify-center">
          {links.map((link, i) => (
            <Link
              key={i}
              href={link.path}
              className="hover:text-blue-300 block py-2"
            >
              {link.label}
            </Link>
          ))}
          {session?.user?.role == "admin" ? (
            <>
              <Link href="/admin" className="hover:text-blue-300 block py-2">
                Manage
              </Link>
              <button
                onClick={() => signOut()}
                className="hover:text-blue-300 block py-2"
              >
                Logout
              </button>
            </>
          ) : session?.user ? (
            <button
              onClick={() => signOut()}
              className="hover:text-blue-300 block py-2"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                href={
                  pathname == "/"
                    ? "/auth/login"
                    : `/auth/login?next=${pathname}`
                }
                className="hover:text-blue-300 block py-2"
              >
                Login
              </Link>
              <Link
                href="/auth/signup"
                className="hover:text-blue-300 block py-2"
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
