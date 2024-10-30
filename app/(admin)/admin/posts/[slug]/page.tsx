import { getPost } from "@/lib/data";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import EditPost from "./EditPostForm";
import { redirect } from "next/navigation";

const page = async ({ params }: Params) => {
  const { slug } = params;
  const post = await getPost(slug);
  if (!post) redirect("/admin/posts");
  return <EditPost post={post} />;
};

export default page;
