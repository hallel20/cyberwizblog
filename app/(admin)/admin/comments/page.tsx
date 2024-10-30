import Pagination from "@/components/Pagination";
import { approveComment, rejectComment } from "@/lib/actions";
import { commentCount, getAllComments } from "@/lib/data";
import { pageSize } from "@/lib/global";
import { FaSearch } from "react-icons/fa";
import DeleteComment from "./DeleteComment";

const page = async ({ searchParams }: any) => {
  const total = await commentCount();
  const page = `${searchParams.page || 1}`;
  const comments = await getAllComments(page);

  if (!comments || comments.length == 0)
    return (
      <div className="container w-screen h-screen flex justify-center items-center mx-auto">
        <p className="text-center flex items-center text-3xl font-bold">
          <FaSearch size="30px" /> Oops. There are no comments yet!
        </p>
      </div>
    );
  return (
    <div className="container mx-auto py-10">
      {/* Table Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-700">Manage Comments</h2>
      </div>

      {/* Responsive Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
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
                Post
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Date
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Row 1 */}
            {comments.map((comment: any) => (
              <tr key={comment.id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {comment.user.firstname + " " + comment.user.lastname}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-600 whitespace-no-wrap">
                    {comment.content}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-600 whitespace-no-wrap">
                    {comment.post.title}
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
                      <span className="absolute inset-0 bg-yellow-200 opacity-50 rounded-full"></span>
                      <span className="relative">Pending</span>
                    </span>
                  ) : (
                    <span className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                      <span className="absolute inset-0 bg-red-200 opacity-50 rounded-full"></span>
                      <span className="relative">Rejected</span>
                    </span>
                  )}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-600 whitespace-no-wrap">
                    {comment.createdAt.toDateString()}
                  </p>
                </td>
                <td className="px-5 py-5 border-b flex border-gray-200 bg-white text-sm text-center">
                  <form action={approveComment}>
                    <input type="hidden" name="id" value={comment.id} />
                    <button
                      type="submit"
                      className="text-blue-500 hover:text-blue-700 mr-3"
                    >
                      Approve
                    </button>
                  </form>
                  <form action={rejectComment}>
                    <input type="hidden" name="id" value={comment.id} />
                    <button
                      type="submit"
                      className="text-red-500 hover:text-red-700 mr-3"
                    >
                      Reject
                    </button>
                  </form>
                  <DeleteComment name={comment.content} id={comment.id} />
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
