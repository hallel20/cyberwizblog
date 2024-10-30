import { getPosts, postCount } from "@/lib/data";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import DeletePost from "./DeletePost";
import Pagination from "@/components/Pagination";
import { pageSize } from "@/lib/global";

const page = async ({ searchParams }: any) => {
  const total = await postCount();
  const page = `${searchParams.page || 1}`;
  const posts = await getPosts(page);

  if (!posts)
    return (
      <>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-700">Manage Posts</h2>
          <Link
            href="/admin/posts/create"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Add New Post
          </Link>
        </div>
        <div className="container w-screen h-screen flex justify-center items-center mx-auto">
          <p className="text-center text-3xl font-bold">
            <FaSearch size="30px" /> Oops. There are no posts yet!
          </p>
        </div>
      </>
    );
  return (
    <div className="container mx-auto py-10">
      {/* Table Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-700">Manage Posts</h2>
        <Link
          href="/admin/posts/create"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Add New Post
        </Link>
      </div>

      {/* Responsive Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Post Title
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Author
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Category
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Date Created
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Row 1 */}
            {posts.map((post) => (
              <tr key={post.id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {post.title}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-600 whitespace-no-wrap">
                    {post.user.firstname + " " + post.user.lastname}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-600 whitespace-no-wrap">
                    {post.category.name}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {post.status == "published" ? (
                    <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                      <span className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                      <span className="relative capitalize">{post.status}</span>
                    </span>
                  ) : (
                    <span className="relative inline-block px-3 py-1 font-semibold text-yellow-900 leading-tight">
                      <span className="absolute inset-0 bg-yellow-200 opacity-50 rounded-full"></span>
                      <span className="relative capitalize">{post.status}</span>
                    </span>
                  )}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-600 whitespace-no-wrap">
                    {post.createdAt.toLocaleDateString()}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  <Link
                    href={`/admin/posts/${post.slug}`}
                    className="text-blue-500 hover:text-blue-700 mr-3"
                  >
                    Edit
                  </Link>
                  <DeletePost id={post.id} name={post.title} />
                </td>
              </tr>
            ))}

            {/* Add more rows as needed */}
          </tbody>
        </table>
        <Pagination totalPages={total! / pageSize} />
      </div>
    </div>
  );
};

export default page;
