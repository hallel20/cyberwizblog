"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaList, FaUsers } from "react-icons/fa";
import { FaHouseChimney, FaMessage } from "react-icons/fa6";
import { MdCategory } from "react-icons/md";

const links = [
  { path: "/admin/posts", label: "Posts", icon: <FaList size="15" /> },
  { path: "/admin/comments", label: "Comments", icon: <FaMessage size="15" /> },
  {
    path: "/admin/categories",
    label: "Categories",
    icon: <MdCategory size="15" />,
  },
  {
    path: "/admin/users",
    label: "Users",
    icon: <FaUsers size="15" />,
  },
  {
    path: "/admin/messages",
    label: "Messages",
    icon: <FaMessage size="15" />,
  },
];

const DashboardNav = () => {
  const pathname = usePathname();
  return (
    <nav>
      <Link href="/admin">
        <div
          className={`flex items-center px-3 gap-2 py-2 mb-1 w-full ${
            pathname === "/admin" && "bg-blue-900"
          } hover:bg-blue-900 rounded-md`}
        >
          <FaHouseChimney size="15" />
          Home
        </div>
      </Link>
      {links.map((link, i) => (
        <Link href={link.path} key={i}>
          <div
            className={`flex items-center px-3 gap-2 py-2 mb-1 w-full ${
              pathname.startsWith(link.path) ? "bg-blue-900" : null
            } hover:bg-blue-900 rounded-md`}
          >
            {link.icon}
            {link.label}
          </div>
        </Link>
      ))}
    </nav>
  );
};

export default DashboardNav;
