import {
  categoryCount,
  commentCount,
  getAllComments,
  getCategories,
  getPosts,
  postCount,
  userCount,
} from "@/lib/data";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

const page = async () => {
  const postsCount = await postCount();
  const commentsCount = await commentCount();
  const categoriesCount = await categoryCount();
  const usersCount = await userCount();
  const posts = await getPosts("1");
  const comments = await getAllComments("1");
  const categories = await getCategories("1");

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Cyberwizdev blog Admin</h1>
      {/* Top Stats */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-500">Posts</p>
          <p className="text-3xl font-bold">{postsCount}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-500">Comments</p>
          <p className="text-3xl font-bold">{commentsCount}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-500">Categories</p>
          <p className="text-3xl font-bold">{categoriesCount}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-500">Users</p>
          <p className="text-3xl font-bold">{usersCount}</p>
        </div>
      </div>

      {/* Graphs */}
      <div className="grid grid-cols-3 gap-6 mt-6">
        {/* Bar Chart */}
        <div className="col-span-2 bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <p className="text-gray-500">Recent Posts</p>
          </div>
          <div className="mt-4 bg-gray-200 rounded-lg">
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
                    Status
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Date Created
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Row 1 */}
                {posts?.map((post: any) => (
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
                      {post.status == "published" ? (
                        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                          <span className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                          <span className="relative capitalize">
                            {post.status}
                          </span>
                        </span>
                      ) : (
                        <span className="relative inline-block px-3 py-1 font-semibold text-yellow-900 leading-tight">
                          <span className="absolute inset-0 bg-yellow-200 opacity-50 rounded-full"></span>
                          <span className="relative capitalize">
                            {post.status}
                          </span>
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-600 whitespace-no-wrap">
                        {post.createdAt.toLocaleDateString()}
                      </p>
                    </td>
                  </tr>
                ))}

                {/* Add more rows as needed */}
              </tbody>
            </table>
          </div>
        </div>

        {/* Circular Progress Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="h-48 w-48 mx-auto">
            <div className="flex justify-center items-center h-full">
              <div className="relative">
                <svg className="w-40 h-40" viewBox="0 0 36 36">
                  <path
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="4"
                    d="M18 2.0845a 15.9155 15.9155 0 1 1 0 31.831 15.9155 15.9155 0 1 1 0-31.831"
                  />
                  <path
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="4"
                    strokeDasharray="45,100"
                    d="M18 2.0845a 15.9155 15.9155 0 1 1 0 31.831 15.9155 15.9155 0 1 1 0-31.831"
                  />
                </svg>
                <p className="absolute top-0 left-0 text-center w-full h-full flex justify-center items-center text-2xl">
                  45%
                </p>
              </div>
            </div>
          </div>
          <div className="text-center mt-4">
            <p className="text-gray-500">Getting Popular</p>
            <Link
              href="/"
              className="bg-yellow-400 text-white px-4 py-1 mt-4 rounded-md"
            >
              Visit Site
            </Link>
          </div>
        </div>

        <div className="col-span-3 bg-white p-6 rounded-lg shadow-md mt-6">
          <div className="grid grid-cols-2 gap-4">
            <>
              <div className="bg-gray-200 rounded-lg">
                <div className="flex justify-between items-center">
                  <p className="text-gray-500">Recent Comments</p>
                </div>
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Commenter
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Comment
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Row 1 */}
                    {comments?.map((comment: any) => (
                      <tr key={comment.id}>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {comment.user.firstname +
                              " " +
                              comment.user.lastname}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-600 whitespace-no-wrap">
                            {comment.content}
                          </p>
                        </td>

                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {comment.status == "approved" ? (
                            <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                              <span className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                              <span className="relative">Approved</span>
                            </span>
                          ) : comment.status == "pending" ? (
                            <span className="relative inline-block px-3 py-1 font-semibold text-yellow-900 leading-tight">
                              <span className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                              <span className="relative">Pending</span>
                            </span>
                          ) : (
                            <span className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                              <span className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                              <span className="relative">Rejected</span>
                            </span>
                          )}
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-600 whitespace-no-wrap">
                            {comment.createdAt.toDateString()}
                          </p>
                        </td>
                      </tr>
                    ))}

                    {/* Add more rows as needed */}
                  </tbody>
                </table>
              </div>
            </>
            <div className="bg-gray-200 rounded-lg">
              <div className="flex justify-between items-center">
                <p className="text-gray-500">Categories</p>
              </div>
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Category Name
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Post Count
                    </th>
                    {/* <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th> */}
                  </tr>
                </thead>
                <tbody>
                  {/* Row 1 */}
                  {categories?.map((category: any) => (
                    <tr key={category.id}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {category.name}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-600 whitespace-no-wrap">
                          {category.description}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-600 whitespace-no-wrap">
                          {category._count.posts} posts
                        </p>
                      </td>
                      {/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                    <span className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                    <span className="relative">Active</span>
                  </span>
                </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
