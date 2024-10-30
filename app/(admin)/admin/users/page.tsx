import { getUsers, userCount } from "@/lib/data";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import DeleteUser from "./DeleteUser";
import Pagination from "@/components/Pagination";
import { pageSize } from "@/lib/global";

const page = async ({ searchParams }: any) => {
  const total = await userCount();
  const page = `${searchParams.page || 1}`;
  const users = await getUsers(page);
  if (!users)
    return (
      <>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-700">Manage Users</h2>
          <Link
            href="/admin/posts/create"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Add New User
          </Link>
        </div>
        <div className="container w-screen h-screen flex justify-center items-center mx-auto">
          <p className="text-center flex items-center text-3xl font-bold">
            <FaSearch size="30px" /> Oops. There are no users yet!
          </p>
        </div>
      </>
    );
  return (
    <div className="container mx-auto py-10">
      {/* Table Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-700">Manage Users</h2>
        <Link
          href="/admin/users/add"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
        >
          Add New User
        </Link>
      </div>

      {/* Responsive Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Username
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Email
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Role
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Row 1 */}
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {user.username}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-600 whitespace-no-wrap">
                    {user.email}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-600 whitespace-no-wrap capitalize">
                    {user.role}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  <Link
                    href={`/admin/users/${user.username}`}
                    className="text-blue-500 hover:text-blue-700 mr-3"
                  >
                    Edit
                  </Link>
                  <DeleteUser id={user.id} name={user.username} />
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
