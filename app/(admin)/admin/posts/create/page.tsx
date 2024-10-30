import Link from "next/link";
import UploadImage from "@/components/UploadImage";
import PostForm from "./PostForm";

const page = () => {
  return (
    <div className="container mx-auto py-10">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-700">Create New Post</h1>
        <Link
          href="/admin/posts"
          className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-600"
        >
          Back to Posts
        </Link>
      </div>

      {/* Form Container */}
      <div className="bg-white shadow-xl flex w-full rounded-lg p-6">
        <div className="w-7/12">
          <PostForm />
        </div>
        <div className="w-5/12">
          <UploadImage />
        </div>
      </div>
    </div>
  );
};

export default page;
