import { getUsername } from "@/lib/data";
import EditUser from "./EditUser";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { notFound } from "next/navigation";

const page = async ({ params }: Params) => {
  const { username } = params;
  const user = await getUsername(username);
  if (!user) return notFound();
  return (
    <div className="">
      <h1 className="text-3xl font-bold">Edit User {user?.username}</h1>
      <EditUser user={user} />
    </div>
  );
};

export default page;
