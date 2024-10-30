import Pagination from "@/components/Pagination";
import { approveComment, rejectComment } from "@/lib/actions";
import {
  commentCount,
  getAllComments,
  getMessageCount,
  getMessages,
} from "@/lib/data";
import { pageSize } from "@/lib/global";
import { FaSearch } from "react-icons/fa";
import DeleteMessage from "./DeleteMessage";

const page = async ({ searchParams }: any) => {
  const total = await getMessageCount();
  const page = `${searchParams.page || 1}`;
  const messages = await getMessages(page);

  if (!messages || messages.length == 0)
    return (
      <div className="container w-screen h-screen flex justify-center items-center mx-auto">
        <p className="text-center flex items-center text-3xl font-bold">
          <FaSearch size="30px" /> Oops. There are no messages yet!
        </p>
      </div>
    );
  return (
    <div className="container py-10">
      {/* Table Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-700">Manage Messages</h2>
      </div>

      {/* Responsive Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Email
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Message
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Row 1 */}
            {messages.map((message: any) => (
              <tr key={message.id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {message.name}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-600 whitespace-no-wrap">
                    {message.email}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-600 whitespace-no-wrap">
                    {message.message}
                  </p>
                </td>

                <td className="px-5 py-5 border-b flex border-gray-200 bg-white text-sm text-center">
                  <DeleteMessage name={message.message} id={message.id} />
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
