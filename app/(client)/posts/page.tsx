import { getPosts, postCount } from "@/lib/data";
import { marked } from "marked";
import Link from "next/link";
import DeletePost from "../../(admin)/admin/posts/DeletePost";
import { getServerSession } from "next-auth";
import PostActions from "./PostActions";
import Pagination from "@/components/Pagination";
import { pageSize } from "@/lib/global";
import Image from "next/image";

const page = async ({ searchParams }: any) => {
  const page = `${searchParams.page || 1}`;
  const posts = await getPosts(page);
  const count = await postCount();
  if (!posts)
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <p className="text-3xl font-bold">There are no posts yet!</p>
      </div>
    );

  return (
    <div className="p-6 font-sans">
      <h1 className="text-3xl font-bold my-6">All Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="border border-gray-300 rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            {/* Thumbnail */}
            {post.images[0] && (
              <Image
                width="200"
                height="200"
                src={post.images[0].url} // Assuming each image object has a `url` field
                alt={post.title}
                className="w-full h-48 object-cover rounded mb-4"
              />
            )}

            {/* Post details */}
            <Link href={`/posts/${post.slug}`}>
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            </Link>
            <p className="text-gray-500 text-sm mb-2">
              By {post.user.username} in {post.category.name} •{" "}
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.split(",").map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-500 px-2 py-1 rounded-full text-xs"
                >
                  {tag.trim()}
                </span>
              ))}
            </div>

            {/* Markdown content preview */}
            <div
              className="text-gray-700 text-sm mb-4"
              dangerouslySetInnerHTML={{
                __html: marked(post.content.substring(0, 100) + "..."),
              }}
            />

            {/* Edit & Delete Buttons */}
            <PostActions post={post} />
          </div>
        ))}
      </div>
      {count! / pageSize > 1 && <Pagination totalPages={count! / pageSize} />}
    </div>
  );
};

export default page;
