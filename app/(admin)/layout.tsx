import DashboardNav from "@/components/DashboardNav";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import Image from "next/image";
import md5 from "md5";
import { redirect } from "next/navigation";
import "easymde/dist/easymde.min.css";
import Logout from "@/components/Logout";
import "../globals.css";
import { getUser } from "@/lib/data";
import Link from "next/link";
import { FaEye } from "react-icons/fa6";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Manage - Cyberwizdev blog",
};

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession();
  if (!session) {
    redirect("/auth/login");
  }
  const user = await getUser(session.user.email);

  if (!user) redirect("/auth/login");
  if (user.role != "admin") redirect("/");
  const emailHash = md5(`${session?.user?.email}`);

  return (
    <html>
      <body>
        <Toaster position="top-right" />
        <div className="min-h-screen flex">
          {/* Sidebar */}
          <aside className="bg-blue-950 text-white text-sm w-60 h-screen py-6 px-3 lg:fixed flex flex-col justify-between">
            <div>
              <div className="text-center mb-10">
                <Image
                  src={
                    `https://www.gravatar.com/avatar/${emailHash}` ||
                    "/noavatar.png"
                  }
                  width="250"
                  height="250"
                  alt=""
                  className="w-24 h-24 object-cover mx-auto rounded-full"
                />
                <h2 className="text-xl mt-4">{session?.user?.name}</h2>
                <p className="text-gray-400">{session?.user?.email}</p>
              </div>
              <DashboardNav />
            </div>
            <div>
              <Link href="/">
                <div className="flex items-center px-3 gap-2 py-2 mb-1 w-full hover:bg-blue-900 rounded-md">
                  <FaEye size="15" />
                  Visit Site
                </div>
              </Link>
            </div>
          </aside>
          {/* Main Dashboard */}
          <main className="ms-0 lg:ms-60 p-6">
            <div className="flex justify-end">
              <Logout />
            </div>
            <div className="w-full">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
};

export default layout;
