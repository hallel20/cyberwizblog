import Pagination from "@/components/Pagination";
import { host, pageSize } from "@/lib/global";
import PostActions from "../../posts/PostActions";
import { marked } from "marked";
import Image from "next/image";
import Link from "next/link";
import { categoryPostCount, getCategory, getCategoryPosts } from "@/lib/data";
import { notFound } from "next/navigation";

const page = async ({ searchParams, params }: any) => {
  const slug = params.slug;
  const category = await getCategory(slug);
  const page = `${searchParams.page || 1}`;
  const posts = await getCategoryPosts(page, slug);
  const count = await categoryPostCount(slug);
  if (!posts) return notFound();
  else if (posts.length == 0)
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          No Posts Available
        </h2>
        <p className="text-gray-600 mb-8">
          It looks like there are currently no posts in this category to
          explore. Please check back later or reach out for more information.
        </p>
        <div className="flex space-x-4">
          <Link
            href="/contact"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-150"
          >
            Contact Support
          </Link>
          <Link
            href="/"
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition duration-150"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );

  return (
    <div className="p-6 font-sans">
      <h1 className="text-3xl font-bold my-6">{category?.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post: any) => (
          <div
            key={post.id}
            className="border border-gray-300 rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            {/* Thumbnail */}
            {post.images[0] && (
              <Image
                width="200"
                height="200"
                src={`${host}/${post.images[0].url}`} // Assuming each image object has a `url` field
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
              {post.tags.split(",").map((tag: any, index: number) => (
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
                //@ts-ignore
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
