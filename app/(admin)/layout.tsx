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
        <div className="min-h-screen flex">
          {/* Sidebar */}
          <aside className="bg-blue-950 text-white w-60 h-screen p-6 lg:fixed">
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
          </aside>
          <aside className="bg-blue-900 text-white w-60 h-screen p-6 hidden lg:block"></aside>
          {/* Main Dashboard */}
          <main className="flex-1 p-6">
            <div className="flex justify-end">
              <Logout />
            </div>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
};

export default layout;
