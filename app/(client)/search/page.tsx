//@ts-nocheck
import Pagination from "@/components/Pagination";
import { searchCount, searchPosts } from "@/lib/data";
import { pageSize } from "@/lib/global";
import { marked } from "marked";
import { FaSearch } from "react-icons/fa";
import PostActions from "../posts/PostActions";
import Link from "next/link";
import Image from "next/image";

export default async function page({ searchParams }: any) {
  const query = searchParams.q;
  const page = `${searchParams.page || 1}`;
  const posts = await searchPosts(query, page);
  const count = await searchCount(query);

  if (posts?.length == 0)
    return (
      <div className="h-screen w-screen flex mx-auto justify-center items-center">
        <p className="flex items-center text-3xl font-bold gap-3">
          <FaSearch />
          No posts found!
        </p>
      </div>
    );

  return (
    <div className="p-6 font-sans">
      <h1 className="text-3xl font-bold my-6">Search Results for {query}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts?.map((post: any) => (
          <div
            key={post.id}
            className="border border-gray-300 rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            {/* Thumbnail */}
            {post.images[0] && (
              <Image
                width="400"
                height="400"
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
}
