import { categoryCount, getCategories } from "@/lib/data";
import CategoryModal from "./Modal";
import Link from "next/link";
import DeleteCategory from "./DeleteCategory";
import { FaSearch } from "react-icons/fa";
import Pagination from "@/components/Pagination";
import { pageSize } from "@/lib/global";

const page = async ({ searchParams }: any) => {
  const total = await categoryCount();
  const page = `${searchParams.page || 1}`;
  const categories = await getCategories(page);
  // console.log(categories);

  if (!categories)
    return (
      <>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-700">
            Manage Categories
          </h2>
          <CategoryModal />
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
        <h2 className="text-2xl font-bold text-gray-700">Manage Categories</h2>
        <CategoryModal />
      </div>

      {/* Responsive Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
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
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Row 1 */}
            {categories.map((category: any) => (
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
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  <Link
                    href={`/admin/categories/${category.slug}`}
                    className="text-blue-500 hover:text-blue-700 mr-3"
                  >
                    Edit
                  </Link>
                  <DeleteCategory name={category.name} id={category.id} />
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
