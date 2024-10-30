import { getCategories } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const page = async () => {
  const categories = await getCategories();
  if (!categories) return notFound();
  if (categories.length == 0)
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          No Categories Available
        </h2>
        <p className="text-gray-600 mb-8">
          It looks like there are currently no categories available to explore.
          Please check back later or reach out for more information.
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
    <div className="p-8 font-sans min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Explore by Category
      </h1>
      <p className="text-lg text-gray-600 mb-10">
        Browse through our categories to discover content tailored to your
        interests.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category: any) => (
          <div
            className="flex gap-2 items-center border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
            key={category.id}
          >
            <Image
              src={category.image}
              width="150"
              height="150"
              alt={category.slug}
              className="rounded-md"
            />
            <Link href={`/categories/${category.slug}`} className="">
              <h2 className="text-xl font-semibold text-blue-600 mb-2">
                {category.name}
              </h2>
              <p className="text-gray-600">{category.description}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
