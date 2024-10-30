import Button from "@/components/reusable/Button";
import Spinner from "@/components/reusable/Spinner";
import { updateCategory } from "@/lib/actions";
import { getCategory } from "@/lib/data";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
// import { useFormStatus } from "react-dom";
import ImageInput from "./ImageInput";
import { FaArrowCircleLeft } from "react-icons/fa";
import Link from "next/link";
import { notFound } from "next/navigation";

const page = async ({ params }: Params) => {
  const { slug } = params;
  try {
    const category = await getCategory(slug);
    if (!category) return notFound();
    // const status = useFormStatus();
    // console.log(category);

    return (
      <div className="container mx-auto py-7">
        {/* Page Header */}
        <div className="flex gap-3 items-center mb-6">
          <Link href="/admin/categories">
            <button className="bg-gray-200 p-2 rounded-lg">
              <FaArrowCircleLeft size="30" />
            </button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-700">
            Update {category?.name}
          </h1>
        </div>

        {/* Form Container */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <form action={updateCategory}>
            {/* Category Name */}
            <div className="mb-4">
              <label
                htmlFor="category_name"
                className="block text-gray-700 font-bold mb-2"
              >
                Category Name
              </label>
              <input type="hidden" name="id" value={category.id} />
              <input
                type="text"
                id="category_name"
                name="name"
                defaultValue={category?.name}
                placeholder="Enter category name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Category Description */}
            <div className="mb-4">
              <label
                htmlFor="category_description"
                className="block text-gray-700 font-bold mb-2"
              >
                Category Description
              </label>
              <textarea
                id="category_description"
                name="description"
                rows={4}
                defaultValue={category?.description!}
                placeholder="Enter category description"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            {/* Category Slug */}
            <div className="mb-4">
              <label
                htmlFor="slug"
                className="block text-gray-700 font-bold mb-2"
              >
                Category Slug
              </label>
              <input
                type="text"
                id="slug"
                name="slug"
                defaultValue={category?.slug}
                placeholder="Enter category slug (URL-friendly)"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <small className="text-gray-600">Example: technology-news</small>
            </div>

            {/* Category Image */}
            <ImageInput defaultImage={category.image} />

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button
                type="submit"
                // disabled={status.pending}
                className="flex items-center"
              >
                Update Category
                {/* {status.pending && <Spinner />} */}
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  } catch (ex) {
    return notFound();
  }
};

export default page;
