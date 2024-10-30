//@ts-nocheck
import CategoryBar from "@/components/CategoryBar";
import PostSlider from "@/components/PostSlider";
import { getFeaturedPosts, getPopularPosts, getPosts } from "@/lib/data";
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
    <div className="bg-gray-100 font-sans">
      {/* Navigation */}
      <CategoryBar />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 flex">
        {/* Left Column (Main Content) */}
        <div className="w-2/3 pr-6">
          {/* Featured Article */}
          <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <PostSlider
              posts={featuredPosts}
              //TODO: change to featured posts
            />
          </div>

          {/* Watch Section */}
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-4">Latest</h3>
            <div className="grid grid-cols-2 gap-4">
              {/* Watch article card */}

              {posts.map((post: any) => (
                <div
                  className="bg-white p-4 rounded-lg shadow-md"
                  key={post.id}
                >
                  <Image
                    width="400"
                    height="200"
                    src={post.images[0].url}
                    alt="Article"
                    className="rounded-lg mb-2"
                  />
                  <p className="text-gray-700 font-semibold">{post.title}</p>
                  <div
                    className="text-xs"
                    dangerouslySetInnerHTML={{
                      __html: marked(post.content.substring(0, 50)),
                    }}
                  />
                </div>
              ))}
            </div>
            <p className="flex justify-center my-4">
              <Link href="/posts" className="text-xl flex items-center">
                See all posts <FaChevronRight />
              </Link>
            </p>
          </div>
        </div>

        {/* Right Column (Sidebar) */}
        <div className="w-1/3">
          {/* Most Popular */}
          <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-bold mb-4">Most Popular</h3>
            <div className="space-y-2">
              {popularPosts?.map((post: any) => (
                <div className="text-gray-700 flex gap-2" key={post.id}>
                  <Image
                    src={post.images[0].url}
                    width="100"
                    height="100"
                    className="rounded-md shadow-sm"
                    alt=""
                  />
                  <div className="flex flex-col gap-3">
                    <Link href={`/posts/${post.slug}`} className="font-bold">
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
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Latest</h3>
            <div className="space-y-2">
              {posts?.map((post: any) => (
                <div className="text-gray-700 flex gap-2" key={post.id}>
                  <Image
                    src={post.images[0].url}
                    width="100"
                    height="100"
                    className="rounded-md shadow-sm"
                    alt=""
                  />
                  <div className="flex flex-col gap-3">
                    <Link href={`/posts/${post.slug}`} className="font-bold">
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
