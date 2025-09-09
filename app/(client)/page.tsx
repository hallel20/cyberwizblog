//@ts-nocheck
import CategoryBar from "@/components/CategoryBar";
import PostSlider from "@/components/PostSlider";
import { getFeaturedPosts, getPopularPosts, getPosts } from "@/lib/data";
import { host } from "@/lib/global";
import { marked } from "marked";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaChevronRight } from "react-icons/fa6";

export default async function Home() {
  const posts = await getPosts("1");
  const featuredPosts = await getFeaturedPosts();
  const popularPosts = await getPopularPosts();
  if (!posts) return notFound();
  return (
    <div className="bg-gray-100 font-sans min-h-screen">
      {/* Navigation */}
      <CategoryBar />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
        {/* Left Column (Main Content) */}
        <div className="w-full lg:w-2/3">
          {/* Featured Article */}
          <div className="bg-white p-4 rounded-lg shadow-md mb-6 transition-shadow hover:shadow-lg">
            <PostSlider posts={featuredPosts} />
          </div>

          {/* Watch Section */}
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Latest</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Latest article cards */}
              {posts.map((post: any) => (
                <div
                  className="bg-white p-4 rounded-lg shadow-md transition-shadow hover:shadow-lg"
                  key={post.id}
                >
                  <div className="relative w-full h-48 mb-2">
                    <Image
                      fill
                      src={`${post.images[0].url}`}
                      alt={post.title}
                      className="rounded-lg object-cover"
                    />
                  </div>
                  <Link
                    href={`/posts/${post.slug}`}
                    className="text-gray-800 font-semibold hover:text-blue-600 transition-colors"
                  >
                    {post.title}
                  </Link>
                  <div
                    className="text-xs text-gray-600 mt-1 line-clamp-2"
                    dangerouslySetInnerHTML={{
                      __html: marked(post.content.substring(0, 100)),
                    }}
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Comments: {post._count.comments}
                  </p>
                </div>
              ))}
            </div>
            <p className="flex justify-center my-4">
              <Link
                href="/posts"
                className="text-lg flex items-center text-blue-600 hover:text-blue-800 transition-colors"
              >
                See all posts <FaChevronRight className="ml-1" />
              </Link>
            </p>
          </div>
        </div>

        {/* Right Column (Sidebar) */}
        <div className="w-full lg:w-1/3">
          {/* Most Popular */}
          <div className="bg-white p-4 rounded-lg shadow-md mb-6 transition-shadow hover:shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              Most Popular
            </h3>
            <div className="space-y-4">
              {popularPosts?.map((post: any) => (
                <div
                  className="flex gap-3 items-start hover:bg-gray-50 p-2 rounded-md transition-colors"
                  key={post.id}
                >
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <Image
                      fill
                      src={`${post.images[0].url}`}
                      className="rounded-md object-cover shadow-sm"
                      alt={post.title}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <Link
                      href={`/posts/${post.slug}`}
                      className="font-bold text-gray-800 hover:text-blue-600 transition-colors line-clamp-2"
                    >
                      {post.title}
                    </Link>
                    <p className="text-xs text-gray-500">
                      Comments: {post._count.comments}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Latest Posts */}
          <div className="bg-white p-4 rounded-lg shadow-md transition-shadow hover:shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Latest</h3>
            <div className="space-y-4">
              {posts?.map((post: any) => (
                <div
                  className="flex gap-3 items-start hover:bg-gray-50 p-2 rounded-md transition-colors"
                  key={post.id}
                >
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <Image
                      fill
                      src={`${post.images[0].url}`}
                      className="rounded-md object-cover shadow-sm"
                      alt={post.title}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <Link
                      href={`/posts/${post.slug}`}
                      className="font-bold text-gray-800 hover:text-blue-600 transition-colors line-clamp-2"
                    >
                      {post.title}
                    </Link>
                    <p className="text-xs text-gray-500">
                      Comments: {post._count.comments}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}